# SOLVY Platform API

FastAPI backend for SOLVY cooperative banking platform with Reign products e-commerce and AI services.

## Features

### 🛍️ E-Commerce
- **Reign Products Catalog**: 12 menstrual products (bundles, individual, corporate, school packages)
- **Stripe Checkout**: Secure payment processing
- **Automatic Profit Splitting**: 10% to Uplift Education, 90% to EBL
- **Order Management**: Track orders, shipping, and fulfillment

### 🤖 AI Services
- **DeepSeek Tax Assistant**: AI-powered tax analysis and recommendations
- **Kimi Customer Service**: 24/7 AI customer support with escalation

### 💳 Payment Processing
- **Stripe Connect**: Platform payments with profit splitting
- **Real-time Transfers**: Automatic distribution to Uplift Education
- **Refunds**: Full refund support
- **Analytics**: Revenue tracking and profit split reporting

## Quick Start

### 1. Install Dependencies

```bash
cd api
pip install -r requirements.txt
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your API keys
```

### 3. Run Development Server

```bash
uvicorn app.main:app --reload --port 8000
```

### 4. Access API Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### Products

```
GET  /api/v1/products              # Get all products
GET  /api/v1/products/{id}         # Get product by ID
GET  /api/v1/products/sku/{sku}    # Get product by SKU
GET  /api/v1/products/categories/list  # Get categories
```

### Payments

```
POST /api/v1/payments/checkout/create      # Create checkout session
POST /api/v1/payments/intent/create        # Create payment intent
GET  /api/v1/payments/intent/{id}          # Get payment status
POST /api/v1/payments/refund/create        # Create refund
GET  /api/v1/payments/balance              # Get account balance
GET  /api/v1/payments/profit-split/calculate  # Calculate profit split
```

### Orders

```
POST  /api/v1/orders/create                # Create order
GET   /api/v1/orders/{id}                  # Get order
GET   /api/v1/orders/customer/{email}      # Get customer orders
PATCH /api/v1/orders/{id}/status           # Update order status
PATCH /api/v1/orders/{id}/tracking         # Update tracking number
GET   /api/v1/orders/analytics/summary     # Get analytics
```

### AI Services

```
POST /api/v1/ai/tax/analyze               # Analyze tax situation
POST /api/v1/ai/tax/upload-document       # Upload tax document
POST /api/v1/ai/support/chat              # Customer support chat
POST /api/v1/ai/support/escalate          # Escalate to human
GET  /api/v1/ai/support/faq               # Get FAQs
```

## Profit Splitting

Every payment automatically splits profits:

- **10%** → Uplift Education (Stripe Connected Account)
- **90%** → EBL (Platform Account)

Example for $30 sale:
- Uplift Education receives: $3.00
- EBL receives: $27.00

## Environment Variables

Required environment variables (see `.env.example`):

```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_...
UPLIFT_STRIPE_ACCOUNT_ID=acct_...
UPLIFT_PROFIT_SHARE=0.10

# AI Services
DEEPSEEK_API_KEY=your_key
KIMI_API_KEY=your_key

# Email
SMTP_HOST=mail.solvy.chain
SMTP_USER=orders@solvy.chain
SMTP_PASSWORD=your_password
```

## Testing

### Test Stripe Integration

```bash
# Calculate profit split
curl http://localhost:8000/api/v1/payments/profit-split/calculate?amount=3000

# Response:
{
  "total_amount": 3000,
  "uplift_share": 300,
  "ebl_share": 2700,
  "uplift_percentage": "10%"
}
```

### Test Products API

```bash
# Get all products
curl http://localhost:8000/api/v1/products

# Get specific product
curl http://localhost:8000/api/v1/products/sku/CD11155216
```

### Test AI Services

```bash
# Tax analysis
curl -X POST http://localhost:8000/api/v1/ai/tax/analyze \
  -H "Content-Type: application/json" \
  -d '{"financial_data": "W2 income $65,000, self-employment $20,000", "year": 2025}'

# Customer support
curl -X POST http://localhost:8000/api/v1/ai/support/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "How do I freeze my card?"}'
```

## Deployment

### Docker

```bash
docker build -t solvy-api .
docker run -p 8000:8000 --env-file .env solvy-api
```

### Production

```bash
# Install production server
pip install gunicorn

# Run with gunicorn
gunicorn app.main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## Architecture

```
api/
├── app/
│   ├── main.py                 # FastAPI application
│   ├── core/
│   │   └── config.py           # Configuration
│   ├── models/
│   │   └── database.py         # SQLAlchemy models
│   ├── services/
│   │   └── stripe_service.py   # Stripe integration
│   └── api/
│       └── v1/
│           ├── products.py     # Products endpoints
│           ├── payments.py     # Payments endpoints
│           ├── orders.py       # Orders endpoints
│           └── ai_services.py  # AI endpoints
├── requirements.txt
├── Dockerfile
└── README.md
```

## Next Steps

1. **Set up Stripe Connected Account** for Uplift Education
2. **Configure Mailcow** for order confirmation emails
3. **Deploy to Hetzner VPS** with Docker
4. **Integrate with frontend** (React checkout)
5. **Add database** (PostgreSQL)
6. **Set up monitoring** (Grafana + Prometheus)

## Support

For questions or issues:
- Email: dev@solvy.chain
- Documentation: https://docs.solvy.chain

