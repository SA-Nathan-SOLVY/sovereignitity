# SOVEREIGNITITY™ Platform Architecture
**Comprehensive System Design & Microservices Documentation**

---

## 🏗️ System Overview

SOVEREIGNITITY™ is a modular, microservices-based platform for economic sovereignty, built on cooperative principles with data sovereignty at its core.

---

## 📐 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        solvy.chain                               │
│                   (Frontend - React/Vite)                        │
└────────────────────────┬────────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┬──────────────────┐
        │                │                │                  │
        ▼                ▼                ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Tax Service  │  │ Email System │  │  Huginn      │  │   Future     │
│ (Port 3001)  │  │  (Mailcow)   │  │ Automation   │  │  Services    │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
        │                │                │                  │
        └────────────────┴────────────────┴──────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                    ▼                         ▼
            ┌──────────────┐          ┌──────────────┐
            │  PostgreSQL  │          │   Blockchain │
            │   Database   │          │    Networks  │
            └──────────────┘          └──────────────┘
```

---

## 🎯 Core Components

### 1. Frontend Application (solvy.chain)

**Technology Stack:**
- React 18
- Vite 6
- TailwindCSS
- shadcn/ui components
- Lucide React icons

**Key Features:**
- SOLVY Debit Card interface
- Evergreen Beauty Lounge integration
- DECIDEY NGO platform
- Global Remittance calculator
- Email configuration dashboard
- AI Tax Assistant interface

**Deployment:**
- Platform: Vercel
- Domain: solvy.chain
- SSL: Automatic (Vercel)

---

### 2. Tax Assistance Microservice

**Location:** `/apps/tax-assistance/`

**Technology Stack:**
- Node.js + TypeScript
- Express.js
- CryptoJS (encryption)
- Ethers.js (blockchain)
- Axios (HTTP client)

**Core Modules:**

#### TaxCalculator Engine
- Capital gains/losses calculation
- Short-term vs. long-term classification
- Wash sale detection
- Income categorization (staking, airdrops)
- Tax form generation (8949, Schedule D, Schedule 1)
- Tax optimization strategies

#### DataIngestionService
- Multi-chain transaction import (Ethereum, Polygon, Arbitrum, etc.)
- Exchange API integration
- CSV import functionality
- Transaction normalization

#### SecurityService
- AES-256 encryption
- Data anonymization
- Audit logging
- Member data protection

**API Endpoints:**
```
GET  /health
POST /api/tax/calculate
POST /api/tax/import/wallet
POST /api/tax/import/csv
POST /api/tax/forms/generate
POST /api/tax/optimize
```

**Port:** 3001 (configurable)

---

### 3. Email System (Mailcow)

**Platform:** Self-hosted Docker (M1 Mac)

**Domain:** mail.solvy.chain

**Features:**
- SOGo Webmail
- IMAP/SMTP support
- Calendar & Contacts
- Mobile sync (ActiveSync)
- SPF/DKIM/DMARC authentication

**Email Addresses:**
- Leadership: sean@, evergreen@, marlon@solvy.chain
- Admin: admin@, support@, noreply@solvy.chain
- Departments: info@, sales@, qa@, dev@solvy.chain
- Business: ebl@, reign@, decidey@solvy.chain

**Security:**
- SSL/TLS encryption
- Two-factor authentication
- Fail2Ban protection
- Let's Encrypt certificates

---

### 4. Huginn Automation

**Purpose:** Sovereign communication automation

**Agents:**
- Website Agent (monitors contact forms)
- Auto-Responder (instant replies)
- Internal Notification (team alerts)
- Priority Detector (urgent messages)
- Priority Alert (leadership notification)
- Contact Logger (database storage)

**Integration:** SMTP via Mailcow

---

## 🔄 Data Flow

### Tax Calculation Flow

```
1. User connects wallet → Frontend
2. Frontend requests import → Tax Service API
3. Tax Service fetches blockchain data → Etherscan/Polygonscan
4. Transactions normalized → TaxCalculator
5. Tax summary calculated → Response to Frontend
6. User reviews summary → Request optimization
7. Optimization recommendations → Frontend display
8. Generate tax forms → Download/Email
```

### Contact Form Flow

```
1. User submits form → Frontend API
2. Form data stored → Database
3. Huginn monitors endpoint → Website Agent
4. Auto-responder triggered → Email to user
5. Internal notification → Team email
6. Priority detection → If urgent
7. Priority alert → Leadership email
```

---

## 🗄️ Data Architecture

### Tax Data Storage

**Encrypted Member Data:**
```json
{
  "memberId": "hashed-id",
  "transactions": [...],
  "taxSummaries": {
    "2024": {...},
    "2025": {...}
  },
  "preferences": {...}
}
```

**Anonymized Analytics:**
```json
{
  "memberId": "hash",
  "totalTransactions": 1234,
  "averageTaxRate": 0.18,
  "optimizationSavings": 5000
}
```

### Audit Logs

```json
{
  "timestamp": "2025-10-28T00:00:00Z",
  "memberId": "hash",
  "accessor": "hash",
  "action": "calculate_tax",
  "ipAddress": "0.0.0.0"
}
```

---

## 🔐 Security Architecture

### Encryption Layers

1. **Transport Layer**: HTTPS/TLS for all communications
2. **Application Layer**: AES-256 for member data
3. **Database Layer**: Encrypted at rest
4. **Blockchain Layer**: Public key cryptography

### Authentication Flow

```
1. User authenticates → Frontend
2. JWT token issued → Stored securely
3. API requests include token → Verified by microservice
4. Token expiration → Re-authentication required
```

### Data Privacy

- **Member Data**: Encrypted with member-specific keys
- **Analytics**: Fully anonymized, no PII
- **Audit Logs**: Hashed identifiers only
- **Blockchain Data**: Public data, no personal info

---

## 🌐 Network Architecture

### Production Environment

```
Internet
    │
    ▼
┌─────────────┐
│   Vercel    │ (Frontend CDN)
│  Edge Network│
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ solvy.chain │ (Main Application)
└──────┬──────┘
       │
       ├──────────────────┐
       │                  │
       ▼                  ▼
┌──────────────┐   ┌──────────────┐
│ Tax Service  │   │   Mailcow    │
│ localhost:3001│   │ mail.solvy.chain│
└──────────────┘   └──────────────┘
```

### Development Environment

```
localhost:5173 (Vite dev server)
    │
    ├─ localhost:3001 (Tax microservice)
    ├─ localhost:8080 (Huginn)
    └─ localhost:8443 (Mailcow)
```

---

## 📦 Deployment Strategy

### Frontend (Vercel)

```bash
# Automatic deployment on git push
git push origin branch-11

# Manual deployment
vercel --prod
```

### Tax Microservice

```bash
cd apps/tax-assistance
npm run build
npm start

# Or with PM2
pm2 start dist/index.js --name tax-service
```

### Mailcow (Docker)

```bash
cd ~/mailcow-dockerized
docker-compose up -d
```

---

## 🔄 CI/CD Pipeline

### Current Process

1. **Development**: Local testing
2. **Commit**: Git commit with descriptive message
3. **Build**: Vercel automatic build
4. **Deploy**: Automatic to production
5. **Verify**: Health checks and monitoring

### Future Enhancements

- Automated testing (Jest, Cypress)
- Staging environment
- Blue-green deployments
- Rollback automation

---

## 📊 Monitoring & Logging

### Application Monitoring

- **Health Checks**: `/health` endpoints
- **Error Tracking**: Console logs, error boundaries
- **Performance**: Vercel Analytics

### Security Monitoring

- **Audit Logs**: All data access logged
- **Failed Auth**: Login attempt tracking
- **Rate Limiting**: API request throttling

---

## 🚀 Scalability

### Horizontal Scaling

- **Frontend**: Vercel Edge Network (automatic)
- **Tax Service**: Multiple instances behind load balancer
- **Database**: Read replicas, connection pooling

### Vertical Scaling

- **Tax Service**: Increase CPU/RAM for complex calculations
- **Database**: Larger instance for growing data

---

## 🔮 Future Architecture

### Planned Additions

1. **Blockchain Integration**
   - Smart contracts (Solidity)
   - Polygon network deployment
   - Guapcoin currency system

2. **Database Layer**
   - PostgreSQL for persistent storage
   - Redis for caching
   - TimescaleDB for time-series data

3. **Additional Microservices**
   - Identity/Auth service
   - Payment processing service
   - Analytics service
   - Notification service

4. **Mobile Applications**
   - React Native apps
   - iOS/Android native features
   - Offline-first architecture

---

## 📚 Technology Decisions

### Why Microservices?

- **Modularity**: Independent development and deployment
- **Scalability**: Scale services independently
- **Resilience**: Failure isolation
- **Technology Flexibility**: Use best tool for each service

### Why TypeScript?

- **Type Safety**: Catch errors at compile time
- **Developer Experience**: Better IDE support
- **Maintainability**: Self-documenting code
- **Ecosystem**: Rich library support

### Why Vercel?

- **Performance**: Edge network, automatic optimization
- **Developer Experience**: Zero-config deployments
- **Scalability**: Automatic scaling
- **Cost**: Free tier for MVP

---

## 🛠️ Development Guidelines

### Code Organization

```
sovereignitity-platform/
├── src/                    # Frontend source
├── apps/                   # Microservices
│   └── tax-assistance/
├── backend/                # Legacy backend (to be migrated)
├── public/                 # Static assets
├── docs/                   # Documentation
└── scripts/                # Automation scripts
```

### Naming Conventions

- **Files**: PascalCase for components, camelCase for utilities
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Types/Interfaces**: PascalCase

### Git Workflow

```
main (protected)
  └── branch-11 (development)
        └── feature/* (feature branches)
```

---

## 📖 API Documentation

### Tax Service API

Full API documentation available at:
`/apps/tax-assistance/docs/api-reference.md`

### Frontend Integration

Example integration code:
`/apps/tax-assistance/docs/integration.md`

---

## 🎯 Performance Targets

- **Frontend Load Time**: < 2 seconds
- **API Response Time**: < 500ms (p95)
- **Tax Calculation**: < 3 seconds for 1000 transactions
- **Uptime**: 99.9% availability

---

## 📞 Support & Maintenance

**Technical Lead**: Sean Maurice Mayo (SA Nathan)  
**QA Lead**: Sean Marlon McDaniel II  
**Operations**: Evergreen P. Mayo

**Contact**: dev@solvy.chain

---

**Document Version**: 1.0  
**Last Updated**: October 28, 2025  
**Maintained By**: SOVEREIGNITITY™ Engineering Team

