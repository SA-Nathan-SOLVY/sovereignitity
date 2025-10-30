# Tax Assistance Microservice
**SOVEREIGNITITY™ Cooperative Tax System**

---

## 🎯 Overview

The Tax Assistance Microservice provides comprehensive cryptocurrency tax calculation, optimization, and reporting for SOVEREIGNITITY™ platform members. Built with data sovereignty and cooperative principles at its core.

---

## ✨ Features

### Core Capabilities
- **Multi-Chain Transaction Import**: Ethereum, Polygon, Arbitrum, Optimism, Base
- **Exchange Integration**: Import from major exchanges
- **CSV Import**: Manual transaction upload
- **Tax Calculations**: Accurate capital gains/losses, income, wash sales
- **Form Generation**: IRS Form 8949, Schedule D, Schedule 1
- **Tax Optimization**: AI-powered strategies for minimizing tax liability
- **Data Encryption**: Member data protected with AES-256
- **Audit Logging**: Complete audit trail for compliance

### Tax Calculation Features
- Short-term vs. long-term capital gains
- Wash sale detection (30-day rule)
- Cost basis tracking (FIFO, LIFO, specific ID)
- Staking rewards and airdrops as income
- Tax loss harvesting recommendations
- Charitable donation optimization

---

## 🏗️ Architecture

```
tax-assistance/
├── src/
│   ├── engines/
│   │   └── TaxCalculator.ts      # Core tax calculation engine
│   ├── services/
│   │   ├── DataIngestionService.ts  # Import transactions
│   │   └── SecurityService.ts       # Encryption & security
│   ├── utils/
│   └── index.ts                   # Express API server
├── frontend/
│   ├── components/
│   └── hooks/
├── contracts/                     # Future: Smart contracts
├── docs/
└── package.json
```

---

## 🚀 Quick Start

### Installation

```bash
cd apps/tax-assistance
npm install
```

### Configuration

```bash
cp .env.example .env
# Edit .env with your configuration
```

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

---

## 📡 API Endpoints

### Health Check
```
GET /health
```

### Calculate Tax Summary
```
POST /api/tax/calculate
Body: {
  "transactions": Transaction[],
  "taxYear": 2025
}
```

### Import from Wallet
```
POST /api/tax/import/wallet
Body: {
  "address": "0x...",
  "chains": ["ethereum", "polygon"]
}
```

### Import from CSV
```
POST /api/tax/import/csv
Body: {
  "csvData": "id,timestamp,type,..."
}
```

### Generate Tax Forms
```
POST /api/tax/forms/generate
Body: {
  "transactions": Transaction[],
  "taxYear": 2025,
  "memberInfo": {...}
}
```

### Optimize Tax Strategy
```
POST /api/tax/optimize
Body: {
  "transactions": Transaction[],
  "goals": {...}
}
```

---

## 📊 Transaction Format

```typescript
interface Transaction {
  id: string;
  timestamp: number;
  type: 'TRADE' | 'TRANSFER' | 'INCOME' | 'EXPENSE' | 'STAKING' | 'AIRDROP';
  fromAsset: string;
  toAsset: string;
  fromAmount: number;
  toAmount: number;
  usdValue: number;
  costBasis?: number;
  fee?: number;
}
```

---

## 🔐 Security

### Data Encryption
- AES-256 encryption for member data
- SHA-256 hashing for anonymization
- Asymmetric encryption support for member keys

### Audit Logging
- All data access logged
- Anonymized audit trails
- Compliance-ready records

### Privacy
- Member data never shared
- Cooperative ownership model
- Data sovereignty principles

---

## 🧪 Testing

```bash
npm test
```

---

## 📚 Documentation

### Tax Calculation Logic
See `docs/tax-calculations.md` for detailed tax calculation methodology.

### API Reference
See `docs/api-reference.md` for complete API documentation.

### Integration Guide
See `docs/integration.md` for frontend integration examples.

---

## 🔗 Integration with solvy.chain

### Frontend Integration

```javascript
// Example: Calculate tax summary
const response = await fetch('http://localhost:3001/api/tax/calculate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    transactions: userTransactions,
    taxYear: 2025
  })
});

const { data } = await response.json();
console.log('Tax Summary:', data);
```

---

## 🛠️ Development

### Tech Stack
- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Encryption**: CryptoJS
- **Blockchain**: Ethers.js, Axios
- **Testing**: Jest

### Code Style
- ESLint for linting
- Prettier for formatting
- TypeScript strict mode

---

## 📈 Roadmap

### Phase 1 (Current)
- ✅ Core tax calculations
- ✅ Multi-chain import
- ✅ CSV import
- ✅ Basic form generation

### Phase 2 (Q1 2026)
- 🔮 AI-powered optimization
- 🔮 Real-time price feeds
- 🔮 Exchange API integrations
- 🔮 Advanced cost basis methods

### Phase 3 (Q2 2026)
- 🔮 Smart contract integration
- 🔮 Automated tax filing
- 🔮 Professional CPA network
- 🔮 International tax support

---

## 🤝 Cooperative Principles

This microservice embodies SOVEREIGNITITY™ values:
- **Data Sovereignty**: Members own their data
- **Transparency**: Open calculations, no black boxes
- **Cooperation**: Shared knowledge, collective benefit
- **Privacy**: Encrypted, anonymized, secure

---

## 📄 License

© 2025 Evergreen Beauty Lounge. All rights reserved.

Proprietary software for SOVEREIGNITITY™ platform.

---

## 📞 Support

**Technical Issues**: dev@solvy.chain  
**Tax Questions**: support@solvy.chain  
**General Inquiries**: info@solvy.chain

---

**Built with 💜 for economic sovereignty**

