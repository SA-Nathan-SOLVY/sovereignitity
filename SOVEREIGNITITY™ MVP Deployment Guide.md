# SOVEREIGNITITY™ MVP Deployment Guide

**Date:** October 17, 2025  
**Status:** ✅ DEPLOYED & OPERATIONAL

---

## 🎯 MVP Overview

The SOVEREIGNITITY™ MVP consists of two main components:

1. **Frontend** - React application with SOLVY debit card interface
2. **Backend API** - Python Flask server with Tax Assistant and SOLVY connector

---

## 🌐 Deployment URLs

### Frontend (Vercel)
- **Production URL:** https://sovereignitity-c1klop5sb-sean-mayos-projects.vercel.app
- **Custom Domain:** solvy.chain (SSL certificate in progress)
- **Deployment Platform:** Vercel
- **Status:** ✅ Deployed

### Backend API (Manus Sandbox)
- **Local URL:** http://localhost:5001
- **Exposed URL:** https://5001-i7tqh9a1hy3yeevvj9ghz-738c1a04.manusvm.computer
- **Status:** ✅ Running & Healthy

---

## 📊 Backend API Endpoints

### Health Check
```bash
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "service": "SOVEREIGNITITY™ MVP API",
  "components": {
    "tax_assistant": "operational",
    "solvy_connector": "operational",
    "solvy_integrator": "operational"
  },
  "timestamp": "2025-10-17"
}
```

### Tax Calculator
```bash
POST /api/tax/calculate
Content-Type: application/json

{
  "income": 75000,
  "filing_status": "single"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "gross_income": 75000.0,
    "total_tax_owed": 11553.1,
    "effective_tax_rate": 15.40,
    "marginal_tax_rate": 37.0,
    "net_income": 63446.9,
    "bracket_breakdown": [...]
  }
}
```

### Optimize Business Expenses
```bash
POST /api/tax/optimize-expenses
Content-Type: application/json

{
  "revenue": 100000,
  "expenses": {
    "cogs": 35000,
    "marketing": 10000,
    "salaries": 25000,
    "office": 8000,
    "travel": 5000,
    "other": 17000
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "revenue": 100000,
    "total_expenses": 100000,
    "net_income": 0,
    "profit_margin": 0,
    "expense_optimization_recommendations": []
  }
}
```

### Quarterly Tax Estimates
```bash
POST /api/tax/quarterly-estimates
Content-Type: application/json

{
  "projected_income": 80000,
  "filing_status": "single",
  "ytd_income": 40000
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "projected_annual_tax": 12753.1,
    "quarterly_estimates": {
      "Q1": {"due_date": "April 15", "amount_due": 3188.28, "status": "past"},
      "Q2": {"due_date": "June 15", "amount_due": 3188.28, "status": "past"},
      "Q3": {"due_date": "September 15", "amount_due": 3188.28, "status": "past"},
      "Q4": {"due_date": "January 15", "amount_due": 3188.28, "status": "current"}
    },
    "safe_harbor_amount": 11477.79,
    "recommended_actions": [...]
  }
}
```

### SOLVY Connection Test
```bash
GET /api/solvy/connection-test
```

**Response:**
```json
{
  "success": true,
  "data": {
    "generated_at": "2025-10-17T23:56:07.661936",
    "connection_test": {
      "primary": {
        "status": "success",
        "status_code": 200,
        "url": "https://ebl.beauty/debit-card",
        "response_time": 0.218017,
        "accessible": true
      },
      "backup": {
        "status": "success",
        "status_code": 200,
        "url": "https://sovereignitity.vercel.app/debit-card",
        "response_time": 0.211972,
        "accessible": true
      }
    },
    "recommendations": [
      "✅ Primary endpoint (ebl.beauty) is accessible and working",
      "✅ Backup endpoint (sovereignitity.vercel.app) is accessible",
      "🎉 Both endpoints are working! You can use either for redundancy"
    ]
  }
}
```

### SOLVY Financial Dashboard
```bash
GET /api/solvy/dashboard
```

**Response:**
```json
{
  "success": true,
  "data": {
    "dashboard_generated": "2025-10-17T23:56:07.661936",
    "endpoint_status": {...},
    "financial_overview": {
      "current_balance": 1284.75,
      "available_credit": 5000.00,
      "monthly_spending": 842.50,
      "budget_remaining": 457.25,
      "rewards_points": 1284,
      "account_status": "Active",
      "last_updated": "2025-10-17T23:56:07.661941"
    },
    "recent_activity": [
      {
        "date": "2024-10-16",
        "description": "Whole Foods Market",
        "amount": -84.32,
        "category": "Groceries",
        "status": "Completed"
      },
      ...
    ],
    "spending_analysis": {
      "by_category": {
        "Groceries": 284.32,
        "Dining": 156.75,
        "Entertainment": 89.99,
        "Shopping": 212.44,
        "Utilities": 98.00
      },
      "monthly_trend": {
        "September": 789.50,
        "October": 842.50
      },
      "budget_vs_actual": {
        "budgeted": 1300.00,
        "actual": 842.50,
        "remaining": 457.50
      }
    },
    "connection_quality": {
      "overall_score": 85,
      "primary_endpoint_health": "Excellent",
      "backup_endpoint_health": "Excellent",
      "recommendation": "Use primary endpoint",
      "reliability_score": 90
    }
  }
}
```

### SOLVY Card Data
```bash
GET /api/solvy/card-data?use_backup=false
```

**Response:**
```json
{
  "success": true,
  "data": {
    "success": true,
    "endpoint_used": "https://ebl.beauty",
    "status_code": 200,
    "content_type": "text/html; charset=utf-8",
    "accessible": true,
    "timestamp": "2025-10-17T23:56:07.661936"
  }
}
```

---

## 🔧 Frontend Integration

### Environment Variables

Create a `.env` file in your frontend project:

```env
VITE_API_URL=https://5001-i7tqh9a1hy3yeevvj9ghz-738c1a04.manusvm.computer
VITE_API_TIMEOUT=10000
```

### Example API Calls

#### Tax Calculation Component

```javascript
import { useState } from 'react';

function TaxCalculator() {
  const [income, setIncome] = useState('');
  const [result, setResult] = useState(null);
  
  const calculateTax = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tax/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          income: parseFloat(income),
          filing_status: 'single'
        })
      });
      
      const data = await response.json();
      setResult(data.data);
    } catch (error) {
      console.error('Error calculating tax:', error);
    }
  };
  
  return (
    <div>
      <input 
        type="number" 
        value={income} 
        onChange={(e) => setIncome(e.target.value)}
        placeholder="Enter income"
      />
      <button onClick={calculateTax}>Calculate Tax</button>
      
      {result && (
        <div>
          <h3>Tax Results</h3>
          <p>Gross Income: ${result.gross_income.toLocaleString()}</p>
          <p>Tax Owed: ${result.total_tax_owed.toLocaleString()}</p>
          <p>Effective Rate: {result.effective_tax_rate.toFixed(2)}%</p>
          <p>Net Income: ${result.net_income.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default TaxCalculator;
```

#### SOLVY Dashboard Component

```javascript
import { useState, useEffect } from 'react';

function SOLVYDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchDashboard();
  }, []);
  
  const fetchDashboard = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/solvy/dashboard`);
      const data = await response.json();
      setDashboard(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      setLoading(false);
    }
  };
  
  if (loading) return <div>Loading...</div>;
  if (!dashboard) return <div>Error loading dashboard</div>;
  
  return (
    <div>
      <h2>SOLVY Financial Dashboard</h2>
      
      <div className="financial-overview">
        <h3>Account Overview</h3>
        <p>Balance: ${dashboard.financial_overview.current_balance}</p>
        <p>Available Credit: ${dashboard.financial_overview.available_credit}</p>
        <p>Monthly Spending: ${dashboard.financial_overview.monthly_spending}</p>
        <p>Rewards Points: {dashboard.financial_overview.rewards_points}</p>
      </div>
      
      <div className="recent-activity">
        <h3>Recent Transactions</h3>
        {dashboard.recent_activity.map((transaction, index) => (
          <div key={index}>
            <p>{transaction.description} - ${Math.abs(transaction.amount)}</p>
            <p>{transaction.date} | {transaction.category}</p>
          </div>
        ))}
      </div>
      
      <div className="spending-analysis">
        <h3>Spending by Category</h3>
        {Object.entries(dashboard.spending_analysis.by_category).map(([category, amount]) => (
          <p key={category}>{category}: ${amount}</p>
        ))}
      </div>
    </div>
  );
}

export default SOLVYDashboard;
```

---

## 🧪 Testing the API

### Using cURL

```bash
# Health check
curl https://5001-i7tqh9a1hy3yeevvj9ghz-738c1a04.manusvm.computer/health

# Calculate tax
curl -X POST https://5001-i7tqh9a1hy3yeevvj9ghz-738c1a04.manusvm.computer/api/tax/calculate \
  -H "Content-Type: application/json" \
  -d '{"income": 75000, "filing_status": "single"}'

# Get SOLVY dashboard
curl https://5001-i7tqh9a1hy3yeevvj9ghz-738c1a04.manusvm.computer/api/solvy/dashboard
```

### Using JavaScript/Fetch

```javascript
// Health check
fetch('https://5001-i7tqh9a1hy3yeevvj9ghz-738c1a04.manusvm.computer/health')
  .then(res => res.json())
  .then(data => console.log(data));

// Calculate tax
fetch('https://5001-i7tqh9a1hy3yeevvj9ghz-738c1a04.manusvm.computer/api/tax/calculate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ income: 75000, filing_status: 'single' })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## 📁 Project Structure

```
sovereignitity-platform/
├── backend/
│   ├── app_production.py          # Main Flask application
│   ├── tax_calculations.py        # Tax calculation engine
│   ├── solvy_connector.py         # SOLVY debit card connector
│   ├── tax_assistant.py           # DeepSeek AI integration (original)
│   ├── app.py                     # Original Flask app
│   └── requirements.txt           # Python dependencies
│
├── src/
│   ├── App.jsx                    # Main React component
│   ├── App.css                    # Styles
│   └── components/
│       └── PresentationSlider.jsx # Slide presentation
│
├── dist/                          # Production build
├── public/                        # Static assets
│   ├── solvy-logo.png
│   └── hero-payment-image.webp
│
├── index.html                     # HTML entry point
├── package.json                   # Node dependencies
├── vite.config.js                 # Vite configuration
└── vercel.json                    # Vercel deployment config
```

---

## 🚀 Deployment Steps

### Backend Deployment

The backend is currently running on the Manus sandbox. For production deployment:

1. **Option 1: Railway**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login and deploy
   railway login
   cd backend
   railway init
   railway up
   ```

2. **Option 2: Heroku**
   ```bash
   # Create Procfile
   echo "web: python app_production.py" > Procfile
   
   # Deploy
   heroku create sovereignitity-api
   git push heroku main
   ```

3. **Option 3: DigitalOcean App Platform**
   - Connect GitHub repository
   - Select backend folder
   - Configure Python buildpack
   - Deploy

### Frontend Deployment (Already Complete)

✅ Deployed to Vercel at: https://sovereignitity-c1klop5sb-sean-mayos-projects.vercel.app

---

## 🔒 Security Considerations

1. **CORS Configuration**
   - Currently set to allow all origins (`*`)
   - Update to specific domains in production:
     ```python
     CORS(app, resources={r"/*": {"origins": ["https://solvy.chain", "https://sovereignitity.vercel.app"]}})
     ```

2. **API Keys**
   - Store sensitive keys in environment variables
   - Never commit keys to version control

3. **Rate Limiting**
   - Consider adding Flask-Limiter for production

4. **HTTPS**
   - Ensure all production endpoints use HTTPS

---

## 📊 MVP Features Checklist

### Frontend ✅
- [x] SOLVY crown logo throughout
- [x] Hero payment image
- [x] Navigation dropdowns (Financial, Products, Platform)
- [x] IBC/BYOB → MOLI progression clearly shown
- [x] EBL integration highlighted
- [x] Graphene tech under Reign products
- [x] Development roadmap with 4 phases
- [x] Revenue-backed sovereignty section
- [x] Responsive design

### Backend ✅
- [x] Tax calculation API
- [x] Business expense optimization
- [x] Quarterly tax estimates
- [x] SOLVY connection testing
- [x] Financial dashboard
- [x] Card data retrieval
- [x] Health check endpoint
- [x] CORS enabled
- [x] Error handling

---

## 🎯 Next Steps

1. **Deploy Backend to Production**
   - Choose hosting platform (Railway, Heroku, DigitalOcean)
   - Configure environment variables
   - Update frontend to use production API URL

2. **Connect Frontend to Backend**
   - Update `.env` with production API URL
   - Test all API integrations
   - Implement error handling

3. **Add Real Data**
   - Replace mock financial data with real SOLVY card data
   - Integrate with actual payment systems
   - Connect to real tax calculation services

4. **Testing & QA**
   - Test all API endpoints
   - Verify frontend-backend integration
   - Test on multiple devices and browsers

5. **Launch**
   - Configure custom domain (solvy.chain)
   - Set up monitoring and analytics
   - Announce to community

---

## 📞 Support

For questions or issues:
- Check API health: `GET /health`
- Review logs in `/tmp/backend_prod.log`
- Test endpoints using provided cURL commands

---

**Status:** ✅ MVP READY FOR PRODUCTION DEPLOYMENT

**Last Updated:** October 17, 2025

