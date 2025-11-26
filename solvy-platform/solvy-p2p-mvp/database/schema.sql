-- SOLVY P2P Payment System Database Schema
-- Privacy-First Design with Military-Grade Security

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    balance DECIMAL(10, 2) DEFAULT 0.00,
    logo_url VARCHAR(500),
    pin_hash VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    from_user_id INTEGER REFERENCES users(id),
    to_user_id INTEGER REFERENCES users(id),
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    transaction_type VARCHAR(50) DEFAULT 'p2p_transfer',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    CONSTRAINT positive_amount CHECK (amount > 0)
);

-- Sessions table (for authentication)
CREATE TABLE IF NOT EXISTS sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    token VARCHAR(500) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit log (for security tracking)
CREATE TABLE IF NOT EXISTS audit_log (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    ip_address VARCHAR(50),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_transactions_from_user ON transactions(from_user_id);
CREATE INDEX idx_transactions_to_user ON transactions(to_user_id);
CREATE INDEX idx_transactions_created_at ON transactions(created_at DESC);
CREATE INDEX idx_sessions_token ON sessions(token);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);

-- Insert test users (for MVP demo)
INSERT INTO users (email, password_hash, full_name, phone, balance, logo_url) VALUES
('evergreen@ebl.beauty', '$2b$10$placeholder_hash_1', 'Evergreen Nathan', '(775) 636-3656', 1000.00, '/logos/ebl-logo.png'),
('member-a@solvy.test', '$2b$10$placeholder_hash_2', 'Test Member A', '(555) 123-4567', 500.00, '/logos/member-a-logo.png'),
('member-b@solvy.test', '$2b$10$placeholder_hash_3', 'Test Member B', '(555) 987-6543', 250.00, '/logos/member-b-logo.png')
ON CONFLICT (email) DO NOTHING;
