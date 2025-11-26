const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'solvy-secret-change-in-production';

// Database connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'solvy_p2p',
    password: 'solvy2025',
    port: 5432,
});

// Middleware
app.set('trust proxy', true); // Fix for proxied requests
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

// Audit logging
const logAction = async (userId, action, ipAddress, userAgent) => {
    try {
        await pool.query(
            'INSERT INTO audit_log (user_id, action, ip_address, user_agent) VALUES ($1, $2, $3, $4)',
            [userId, action, ipAddress, userAgent]
        );
    } catch (error) {
        console.error('Audit log error:', error);
    }
};

// ===== API ENDPOINTS =====

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'SOLVY P2P API', version: '1.0.0' });
});

// Register new user
app.post('/api/register', async (req, res) => {
    try {
        const { email, password, full_name, phone } = req.body;

        // Validation
        if (!email || !password || !full_name) {
            return res.status(400).json({ error: 'Email, password, and full name are required' });
        }

        // Check if user exists
        const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash password
        const password_hash = await bcrypt.hash(password, 10);

        // Create user
        const result = await pool.query(
            'INSERT INTO users (email, password_hash, full_name, phone, balance) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, full_name, balance',
            [email, password_hash, full_name, phone, 100.00] // Start with $100 for testing
        );

        const user = result.rows[0];

        // Generate token
        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });

        await logAction(user.id, 'REGISTER', req.ip, req.headers['user-agent']);

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user.id,
                email: user.email,
                full_name: user.full_name,
                balance: user.balance
            },
            token
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Get user
        const result = await pool.query('SELECT * FROM users WHERE email = $1 AND is_active = true', [email]);
        
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = result.rows[0];

        // Verify password
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });

        await logAction(user.id, 'LOGIN', req.ip, req.headers['user-agent']);

        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
                full_name: user.full_name,
                logo_url: user.logo_url
            },
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Get user profile (authenticated)
app.get('/api/profile', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, email, full_name, phone, logo_url FROM users WHERE id = $1',
            [req.user.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ user: result.rows[0] });
    } catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// Get balance (authenticated) - Privacy: requires explicit request
app.get('/api/balance', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT balance FROM users WHERE id = $1', [req.user.userId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        await logAction(req.user.userId, 'VIEW_BALANCE', req.ip, req.headers['user-agent']);

        res.json({ balance: result.rows[0].balance });
    } catch (error) {
        console.error('Balance error:', error);
        res.status(500).json({ error: 'Failed to fetch balance' });
    }
});

// Search users (for P2P recipient selection)
app.get('/api/users/search', authenticateToken, async (req, res) => {
    try {
        const { query } = req.query;

        if (!query || query.length < 2) {
            return res.status(400).json({ error: 'Search query must be at least 2 characters' });
        }

        const result = await pool.query(
            'SELECT id, full_name, email, logo_url FROM users WHERE (full_name ILIKE $1 OR email ILIKE $1) AND id != $2 AND is_active = true LIMIT 10',
            [`%${query}%`, req.user.userId]
        );

        res.json({ users: result.rows });
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ error: 'Search failed' });
    }
});

// P2P Transfer (authenticated)
app.post('/api/transfer', authenticateToken, async (req, res) => {
    const client = await pool.connect();
    
    try {
        const { to_user_id, amount, description } = req.body;
        const from_user_id = req.user.userId;

        // Validation
        if (!to_user_id || !amount) {
            return res.status(400).json({ error: 'Recipient and amount are required' });
        }

        if (amount <= 0) {
            return res.status(400).json({ error: 'Amount must be positive' });
        }

        if (from_user_id === to_user_id) {
            return res.status(400).json({ error: 'Cannot transfer to yourself' });
        }

        await client.query('BEGIN');

        // Check sender balance
        const senderResult = await client.query('SELECT balance, full_name FROM users WHERE id = $1', [from_user_id]);
        if (senderResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Sender not found' });
        }

        const senderBalance = parseFloat(senderResult.rows[0].balance);
        if (senderBalance < amount) {
            await client.query('ROLLBACK');
            return res.status(400).json({ error: 'Insufficient balance' });
        }

        // Check recipient exists
        const recipientResult = await client.query('SELECT id, full_name, logo_url FROM users WHERE id = $1 AND is_active = true', [to_user_id]);
        if (recipientResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Recipient not found' });
        }

        // Deduct from sender
        await client.query('UPDATE users SET balance = balance - $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [amount, from_user_id]);

        // Add to recipient
        await client.query('UPDATE users SET balance = balance + $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [amount, to_user_id]);

        // Record transaction
        const transactionResult = await client.query(
            'INSERT INTO transactions (from_user_id, to_user_id, amount, status, description, completed_at) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP) RETURNING id, created_at',
            [from_user_id, to_user_id, amount, 'completed', description]
        );

        await client.query('COMMIT');

        await logAction(from_user_id, 'P2P_TRANSFER_SENT', req.ip, req.headers['user-agent']);
        await logAction(to_user_id, 'P2P_TRANSFER_RECEIVED', req.ip, req.headers['user-agent']);

        res.json({
            message: 'Transfer successful',
            transaction: {
                id: transactionResult.rows[0].id,
                from: senderResult.rows[0].full_name,
                to: recipientResult.rows[0].full_name,
                to_logo: recipientResult.rows[0].logo_url,
                amount: amount,
                created_at: transactionResult.rows[0].created_at
            }
        });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Transfer error:', error);
        res.status(500).json({ error: 'Transfer failed' });
    } finally {
        client.release();
    }
});

// Get transaction history (authenticated)
app.get('/api/transactions', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT t.id, t.amount, t.status, t.description, t.created_at,
                    CASE 
                        WHEN t.from_user_id = $1 THEN 'sent'
                        ELSE 'received'
                    END as type,
                    CASE 
                        WHEN t.from_user_id = $1 THEN u2.full_name
                        ELSE u1.full_name
                    END as other_party,
                    CASE 
                        WHEN t.from_user_id = $1 THEN u2.logo_url
                        ELSE u1.logo_url
                    END as other_party_logo
             FROM transactions t
             JOIN users u1 ON t.from_user_id = u1.id
             JOIN users u2 ON t.to_user_id = u2.id
             WHERE t.from_user_id = $1 OR t.to_user_id = $1
             ORDER BY t.created_at DESC
             LIMIT 50`,
            [req.user.userId]
        );

        res.json({ transactions: result.rows });
    } catch (error) {
        console.error('Transactions error:', error);
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 SOLVY P2P API running on port ${PORT}`);
    console.log(`🔒 Privacy-first security enabled`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, closing server...');
    pool.end();
    process.exit(0);
});
