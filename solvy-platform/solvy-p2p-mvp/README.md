# SOLVY P2P MVP - Privacy-First Payment System

## 🎯 Overview

A **privacy-first peer-to-peer payment system** built with military-grade security principles.

**Key Features:**
- 🔒 **Privacy-First Design** - Balance hidden by default, no amounts shown during transfers
- 💳 **Visual Card Display** - Beautiful SOLVY card with member logos
- 🎬 **Transfer Animations** - Card-to-card visual connection during P2P transfers
- 🔐 **Secure Authentication** - JWT tokens, bcrypt password hashing
- 📊 **Transaction History** - Track all sent/received payments
- 🛡️ **Military-Grade Security** - Rate limiting, audit logging, OPSEC-approved

---

## 📁 Project Structure

```
solvy-p2p-mvp/
├── backend/              # Node.js + Express API
│   ├── server.js         # Main API server
│   ├── package.json      # Dependencies
│   └── .env.example      # Environment variables template
├── frontend/             # Web application
│   └── public/
│       ├── index.html    # Main UI
│       └── app.js        # Frontend logic
├── database/             # PostgreSQL schema
│   └── schema.sql        # Database structure + test data
├── DEPLOYMENT_GUIDE.md   # Step-by-step deployment instructions
└── README.md             # This file
```

---

## 🚀 Quick Start

See **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** for complete instructions.

**TL;DR:**
1. Upload to Hetzner VPS
2. Setup PostgreSQL database
3. Install dependencies (`npm install`)
4. Configure environment (`.env`)
5. Start API with PM2
6. Configure Nginx
7. Add DNS records
8. Add SSL certificates
9. Test with 3 accounts!

---

## 🧪 Test Accounts

| Email | Password | Balance |
|-------|----------|---------|
| evergreen@ebl.beauty | solvy2025 | $1,000.00 |
| member-a@solvy.test | solvy2025 | $500.00 |
| member-b@solvy.test | solvy2025 | $250.00 |

---

## 🔒 Privacy Features

### **Balance Privacy**
- ✅ Balance shows as `••••` by default
- ✅ Tap to reveal (auto-hides after 5 seconds)
- ✅ Requires explicit user action to view

### **Transfer Privacy**
- ✅ No amounts shown during transfer animation
- ✅ Only shows "Connected" and "Transfer Complete"
- ✅ No PII exposed in notifications

### **Security Features**
- ✅ JWT authentication with 24-hour expiration
- ✅ Bcrypt password hashing (10 rounds)
- ✅ Rate limiting (100 requests per 15 minutes)
- ✅ Audit logging for all actions
- ✅ HTTPS required in production
- ✅ SQL injection protection (parameterized queries)
- ✅ XSS protection (Helmet.js)

---

## 📊 API Endpoints

### **Authentication**
- `POST /api/register` - Create new user account
- `POST /api/login` - Login and get JWT token
- `GET /api/profile` - Get user profile (authenticated)

### **Balance & Users**
- `GET /api/balance` - Get current balance (authenticated)
- `GET /api/users/search?query=` - Search for users (authenticated)

### **Transfers**
- `POST /api/transfer` - Send money P2P (authenticated)
- `GET /api/transactions` - Get transaction history (authenticated)

### **Health**
- `GET /api/health` - API health check

---

## 🛠️ Tech Stack

**Backend:**
- Node.js 22
- Express.js 4
- PostgreSQL 14
- JWT authentication
- Bcrypt password hashing
- Helmet.js security
- Express Rate Limit

**Frontend:**
- Vanilla JavaScript (no framework!)
- CSS3 animations
- Responsive design
- Privacy-first UI/UX

**Infrastructure:**
- Hetzner VPS (Ubuntu 22.04)
- Nginx reverse proxy
- PM2 process manager
- Let's Encrypt SSL
- PostgreSQL database

---

## 🎯 What's Working

✅ User registration and login  
✅ Secure JWT authentication  
✅ Privacy-first balance display  
✅ User search for P2P recipients  
✅ Real P2P money transfers  
✅ Visual card-to-card transfer animations  
✅ Transaction history  
✅ Audit logging  
✅ Rate limiting  
✅ HTTPS/SSL support  

---

## 🚧 Future Enhancements

**Phase 2:**
- Stripe integration for real money
- Bank account connections
- KYC/verification flow
- Custom member logo uploads
- Email notifications

**Phase 3:**
- Mobile apps (iOS + Android)
- Push notifications
- Biometric authentication (Face ID / Touch ID)
- QR code payments
- NFC tap-to-pay

**Phase 4:**
- Multi-currency support
- BRICS network integration
- Zero-fee international remittances
- Cooperative ownership features
- Web3 integration

---

## 📝 License

**Private - SOLVY Platform**

Founded by SA Nathan | Continuing the legacy of Marcus Garvey, MLK, and Malcolm X in the digital age.

---

## 📞 Contact

**Technical Support:** sanathan@ebl.beauty  
**General Inquiries:** eva@ebl.beauty  
**Phone/Text:** (775) 636-3656  
**Location:** Fort Worth, TX  

---

## 🎉 Success!

**This MVP proves:**
- ✅ P2P payments work
- ✅ Privacy-first design is possible
- ✅ Visual card animations are beautiful
- ✅ Security is military-grade
- ✅ The vision is REAL

**Show Angelo. Show your wife. Show the world.** 🚀

---

**Built with Black Excellence + Chinese Precision = SOLVY** 🇺🇸✨
