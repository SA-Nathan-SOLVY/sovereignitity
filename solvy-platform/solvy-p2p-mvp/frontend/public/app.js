// SOLVY P2P - Privacy-First Frontend Application

// Local development API URL (points to backend Flask server)
const API_URL = 'http://localhost:5001';
let authToken = null;
let currentUser = null;
let balanceVisible = false;
let actualBalance = 0;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    // Check if already logged in
    authToken = localStorage.getItem('authToken');
    if (authToken) {
        loadUserProfile();
    }

    // Setup form handlers
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('sendMoneyForm').addEventListener('submit', handleSendMoney);
});

// Login
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }
        
        authToken = data.token;
        currentUser = data.user;
        localStorage.setItem('authToken', authToken);
        
        document.getElementById('loginError').classList.add('hidden');
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('appScreen').classList.remove('hidden');
        
        loadUserProfile();
    } catch (error) {
        document.getElementById('loginError').textContent = error.message;
        document.getElementById('loginError').classList.remove('hidden');
    }
}

// Load user profile
async function loadUserProfile() {
    try {
        const response = await fetch(`${API_URL}/profile`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        
        if (!response.ok) {
            throw new Error('Failed to load profile');
        }
        
        const data = await response.json();
        currentUser = data.user;
        
        document.getElementById('userName').textContent = currentUser.full_name;
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('appScreen').classList.remove('hidden');
        
        // Load balance (but keep hidden)
        loadBalance();
    } catch (error) {
        console.error('Profile load error:', error);
        logout();
    }
}

// Load balance (privacy-first: not displayed by default)
async function loadBalance() {
    try {
        const response = await fetch(`${API_URL}/balance`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        
        if (!response.ok) {
            throw new Error('Failed to load balance');
        }
        
        const data = await response.json();
        actualBalance = parseFloat(data.balance);
        
        // Balance stays hidden until user taps
        if (balanceVisible) {
            document.getElementById('balanceText').textContent = `$${actualBalance.toFixed(2)}`;
        }
    } catch (error) {
        console.error('Balance load error:', error);
    }
}

// Toggle balance visibility (privacy feature)
function toggleBalance() {
    balanceVisible = !balanceVisible;
    const balanceText = document.getElementById('balanceText');
    const balanceElement = document.getElementById('userBalance');
    
    if (balanceVisible) {
        balanceText.textContent = `$${actualBalance.toFixed(2)}`;
        balanceElement.classList.remove('hidden');
        
        // Auto-hide after 5 seconds (security feature)
        setTimeout(() => {
            if (balanceVisible) {
                balanceVisible = false;
                balanceText.textContent = '•••• (tap to view)';
                balanceElement.classList.add('hidden');
            }
        }, 5000);
    } else {
        balanceText.textContent = '•••• (tap to view)';
        balanceElement.classList.add('hidden');
    }
}

// Search users for P2P transfer
let searchTimeout;
async function searchUsers(query) {
    clearTimeout(searchTimeout);
    
    if (query.length < 2) {
        document.getElementById('recipientSelect').classList.add('hidden');
        return;
    }
    
    searchTimeout = setTimeout(async () => {
        try {
            const response = await fetch(`${API_URL}/users/search?query=${encodeURIComponent(query)}`, {
                headers: { 'Authorization': `Bearer ${authToken}` }
            });
            
            if (!response.ok) {
                throw new Error('Search failed');
            }
            
            const data = await response.json();
            const select = document.getElementById('recipientSelect');
            
            select.innerHTML = '<option value="">Select recipient</option>';
            
            data.users.forEach(user => {
                const option = document.createElement('option');
                option.value = user.id;
                option.textContent = `${user.full_name} (${user.email})`;
                option.dataset.name = user.full_name;
                select.appendChild(option);
            });
            
            if (data.users.length > 0) {
                select.classList.remove('hidden');
            }
        } catch (error) {
            console.error('Search error:', error);
        }
    }, 300);
}

// Send money (P2P transfer)
async function handleSendMoney(e) {
    e.preventDefault();
    
    const recipientId = document.getElementById('recipientSelect').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const description = document.getElementById('description').value;
    
    if (!recipientId) {
        document.getElementById('sendError').textContent = 'Please select a recipient';
        document.getElementById('sendError').classList.remove('hidden');
        return;
    }
    
    if (amount <= 0) {
        document.getElementById('sendError').textContent = 'Amount must be greater than 0';
        document.getElementById('sendError').classList.remove('hidden');
        return;
    }
    
    if (amount > actualBalance) {
        document.getElementById('sendError').textContent = 'Insufficient balance';
        document.getElementById('sendError').classList.remove('hidden');
        return;
    }
    
    // Show transfer animation
    const recipientName = document.getElementById('recipientSelect').selectedOptions[0].dataset.name;
    document.getElementById('recipientName').textContent = recipientName;
    document.getElementById('sendMoneyScreen').classList.add('hidden');
    document.getElementById('transferScreen').classList.remove('hidden');
    
    try {
        const response = await fetch(`${API_URL}/transfer`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to_user_id: parseInt(recipientId),
                amount: amount,
                description: description
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Transfer failed');
        }
        
        // Wait for animation
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Hide transfer screen
        document.getElementById('transferScreen').classList.add('hidden');
        
        // Show success message
        document.getElementById('sendSuccess').textContent = `Successfully sent $${amount.toFixed(2)} to ${recipientName}!`;
        document.getElementById('sendSuccess').classList.remove('hidden');
        document.getElementById('sendError').classList.add('hidden');
        
        // Reload balance
        await loadBalance();
        
        // Reset form
        document.getElementById('sendMoneyForm').reset();
        document.getElementById('recipientSelect').classList.add('hidden');
        
        // Auto-hide success message
        setTimeout(() => {
            document.getElementById('sendSuccess').classList.add('hidden');
            showMain();
        }, 3000);
        
    } catch (error) {
        document.getElementById('transferScreen').classList.add('hidden');
        document.getElementById('sendMoneyScreen').classList.remove('hidden');
        document.getElementById('sendError').textContent = error.message;
        document.getElementById('sendError').classList.remove('hidden');
    }
}

// Load transaction history
async function loadTransactions() {
    try {
        const response = await fetch(`${API_URL}/transactions`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        
        if (!response.ok) {
            throw new Error('Failed to load transactions');
        }
        
        const data = await response.json();
        const listElement = document.getElementById('transactionList');
        
        if (data.transactions.length === 0) {
            listElement.innerHTML = '<p style="text-align: center; opacity: 0.7;">No transactions yet</p>';
            return;
        }
        
        listElement.innerHTML = '';
        
        data.transactions.forEach(tx => {
            const item = document.createElement('div');
            item.className = `transaction-item ${tx.type}`;
            
            const date = new Date(tx.created_at).toLocaleDateString();
            const time = new Date(tx.created_at).toLocaleTimeString();
            
            item.innerHTML = `
                <div class="transaction-info">
                    <div style="font-weight: 600; margin-bottom: 0.25rem;">
                        ${tx.type === 'sent' ? '→' : '←'} ${tx.other_party}
                    </div>
                    <div style="font-size: 0.85rem; opacity: 0.7;">
                        ${date} ${time}
                    </div>
                    ${tx.description ? `<div style="font-size: 0.85rem; opacity: 0.8; margin-top: 0.25rem;">${tx.description}</div>` : ''}
                </div>
                <div class="transaction-amount ${tx.type}">
                    ${tx.type === 'sent' ? '-' : '+'}$${parseFloat(tx.amount).toFixed(2)}
                </div>
            `;
            
            listElement.appendChild(item);
        });
    } catch (error) {
        console.error('Transactions load error:', error);
        document.getElementById('transactionList').innerHTML = '<p style="text-align: center; color: #EF4444;">Failed to load transactions</p>';
    }
}

// Navigation functions
function showMain() {
    document.getElementById('sendMoneyScreen').classList.add('hidden');
    document.getElementById('transactionsScreen').classList.add('hidden');
    document.getElementById('transferScreen').classList.add('hidden');
}

function showSendMoney() {
    document.getElementById('sendMoneyScreen').classList.remove('hidden');
    document.getElementById('transactionsScreen').classList.add('hidden');
    document.getElementById('sendError').classList.add('hidden');
    document.getElementById('sendSuccess').classList.add('hidden');
}

function showTransactions() {
    document.getElementById('sendMoneyScreen').classList.add('hidden');
    document.getElementById('transactionsScreen').classList.remove('hidden');
    loadTransactions();
}

function logout() {
    localStorage.removeItem('authToken');
    authToken = null;
    currentUser = null;
    balanceVisible = false;
    actualBalance = 0;
    
    document.getElementById('appScreen').classList.add('hidden');
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('loginForm').reset();
}

// ===== Kimi chat widget integration =====
// Opens the chat panel
function openChat() {
    document.getElementById('chatPanel').style.display = 'flex';
    document.getElementById('chatPanel').setAttribute('aria-hidden', 'false');
    document.getElementById('chatInput').focus();
}

function closeChat() {
    document.getElementById('chatPanel').style.display = 'none';
    document.getElementById('chatPanel').setAttribute('aria-hidden', 'true');
}

function appendChatMessage(text, who='kimi') {
    const container = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = `chat-msg ${who}`;
    div.textContent = text;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

async function sendSupportMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text) return;

    // Show user's message
    appendChatMessage(text, 'user');
    input.value = '';

    // Show typing indicator
    const typing = document.createElement('div');
    typing.className = 'chat-typing kimi';
    typing.textContent = 'SOVEREIGNITITY™ Concierge is typing...';
    const messages = document.getElementById('chatMessages');
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;

    // Build payload
    const payload = {
        member_id: currentUser ? (currentUser.id || currentUser.email || 'member') : 'anonymous',
        message: text,
        channel: 'web'
    };

    try {
        const resp = await fetch(`${API_URL}/support/kimi`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {})
            },
            body: JSON.stringify(payload)
        });

        const data = await resp.json();

        // Remove typing
        typing.remove();

        if (!resp.ok || !data.success) {
            const err = (data && data.error) ? data.error : 'Support request failed';
            appendChatMessage(`Error: ${err}`, 'kimi');
            return;
        }

        // Append Kimi reply
        const reply = data.reply || (data.raw && JSON.stringify(data.raw)) || 'No reply';
        appendChatMessage(reply, 'kimi');
    } catch (e) {
        typing.remove();
        appendChatMessage('Network error while contacting support.', 'kimi');
        console.error('Support send error', e);
    }
}

// Wire chat UI events
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('chatToggle');
    const panel = document.getElementById('chatPanel');
    const closeBtn = document.getElementById('chatClose');
    const sendBtn = document.getElementById('chatSend');
    const input = document.getElementById('chatInput');

    if (toggle) toggle.addEventListener('click', () => {
        if (panel.style.display === 'flex') closeChat(); else openChat();
    });

    if (closeBtn) closeBtn.addEventListener('click', closeChat);
    if (sendBtn) sendBtn.addEventListener('click', sendSupportMessage);
    if (input) input.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendSupportMessage(); });
});
