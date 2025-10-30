# SOLVY API - Deployment Guide

Complete guide to deploy the SOLVY Platform API to Hetzner VPS.

## Prerequisites

- ✅ Hetzner VPS (8GB RAM, Ubuntu 22.04)
- ✅ Domain pointing to VPS IP (solvy.chain)
- ✅ Stripe Business Account
- ✅ DeepSeek API Key
- ✅ Kimi API Key

---

## Step 1: Upload Files to GitHub

### 1.1 On Your Local Machine

```bash
# Navigate to your project
cd /path/to/sovereignitity-platform

# Add the new API files
git add api/

# Commit
git commit -m "Add FastAPI backend with Stripe Connect and AI services"

# Push to GitHub
git push origin main
```

---

## Step 2: Deploy to Hetzner VPS

### 2.1 SSH into Hetzner

```bash
ssh root@YOUR_HETZNER_IP
```

### 2.2 Install Dependencies

```bash
# Update system
apt update && apt upgrade -y

# Install required packages
apt install -y \
    python3.11 \
    python3-pip \
    python3.11-venv \
    postgresql \
    postgresql-contrib \
    nginx \
    git \
    certbot \
    python3-certbot-nginx

# Install Docker (optional, for containerized deployment)
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

### 2.3 Clone Repository

```bash
# Clone your repository
cd /opt
git clone https://github.com/YOUR_USERNAME/sovereignitity-platform.git
cd sovereignitity-platform/api
```

### 2.4 Set Up Python Environment

```bash
# Create virtual environment
python3.11 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 2.5 Configure Environment Variables

```bash
# Copy example env file
cp .env.example .env

# Edit with your credentials
nano .env
```

**Required variables:**
```bash
# Stripe
STRIPE_SECRET_KEY=sk_live_YOUR_KEY
STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET
UPLIFT_STRIPE_ACCOUNT_ID=acct_YOUR_UPLIFT_ACCOUNT

# AI Services
DEEPSEEK_API_KEY=your_deepseek_key
KIMI_API_KEY=your_kimi_key

# Database
DATABASE_URL=postgresql://solvy_user:YOUR_PASSWORD@localhost:5432/solvy

# Email
SMTP_HOST=mail.solvy.chain
SMTP_USER=orders@solvy.chain
SMTP_PASSWORD=YOUR_EMAIL_PASSWORD
```

### 2.6 Set Up PostgreSQL Database

```bash
# Switch to postgres user
sudo -u postgres psql

# In PostgreSQL prompt:
CREATE DATABASE solvy;
CREATE USER solvy_user WITH PASSWORD 'YOUR_SECURE_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE solvy TO solvy_user;
\q
```

### 2.7 Create Systemd Service

```bash
# Create service file
nano /etc/systemd/system/solvy-api.service
```

**Service file content:**
```ini
[Unit]
Description=SOLVY Platform API
After=network.target postgresql.service

[Service]
Type=simple
User=root
WorkingDirectory=/opt/sovereignitity-platform/api
Environment="PATH=/opt/sovereignitity-platform/api/venv/bin"
ExecStart=/opt/sovereignitity-platform/api/venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

**Enable and start service:**
```bash
systemctl daemon-reload
systemctl enable solvy-api
systemctl start solvy-api
systemctl status solvy-api
```

### 2.8 Configure Nginx

```bash
# Create Nginx config
nano /etc/nginx/sites-available/solvy-api
```

**Nginx configuration:**
```nginx
server {
    listen 80;
    server_name api.solvy.chain;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Enable site:**
```bash
ln -s /etc/nginx/sites-available/solvy-api /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### 2.9 Set Up SSL Certificate

```bash
# Get SSL certificate
certbot --nginx -d api.solvy.chain

# Auto-renewal is configured automatically
```

---

## Step 3: Verify Deployment

### 3.1 Check API Health

```bash
curl https://api.solvy.chain/health
```

**Expected response:**
```json
{
  "status": "healthy",
  "database": "connected",
  "stripe": "configured",
  "ai_services": {
    "deepseek": "ready",
    "kimi": "ready"
  }
}
```

### 3.2 Access API Documentation

Visit: https://api.solvy.chain/docs

### 3.3 Test Endpoints

```bash
# Get products
curl https://api.solvy.chain/api/v1/products

# Calculate profit split
curl https://api.solvy.chain/api/v1/payments/profit-split/calculate?amount=3000

# Test AI services
curl -X POST https://api.solvy.chain/api/v1/ai/support/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, I need help with my card"}'
```

---

## Step 4: Set Up Stripe Webhooks

### 4.1 Create Webhook Endpoint

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. URL: `https://api.solvy.chain/api/v1/webhooks/stripe`
4. Select events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
5. Copy webhook signing secret to `.env`

---

## Step 5: Monitoring & Logs

### 5.1 View API Logs

```bash
# View service logs
journalctl -u solvy-api -f

# View Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### 5.2 Monitor System Resources

```bash
# CPU and memory
htop

# Disk usage
df -h

# API process
ps aux | grep uvicorn
```

---

## Step 6: Maintenance

### 6.1 Update Code

```bash
cd /opt/sovereignitity-platform
git pull origin main
cd api
source venv/bin/activate
pip install -r requirements.txt
systemctl restart solvy-api
```

### 6.2 Database Backups

```bash
# Create backup script
nano /opt/backup-solvy-db.sh
```

**Backup script:**
```bash
#!/bin/bash
BACKUP_DIR="/opt/backups"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

pg_dump -U solvy_user solvy > $BACKUP_DIR/solvy_$DATE.sql
gzip $BACKUP_DIR/solvy_$DATE.sql

# Keep only last 30 days
find $BACKUP_DIR -name "solvy_*.sql.gz" -mtime +30 -delete
```

**Make executable and schedule:**
```bash
chmod +x /opt/backup-solvy-db.sh
crontab -e

# Add daily backup at 2 AM
0 2 * * * /opt/backup-solvy-db.sh
```

---

## Troubleshooting

### API Won't Start

```bash
# Check logs
journalctl -u solvy-api -n 50

# Check if port is in use
netstat -tulpn | grep 8000

# Test manually
cd /opt/sovereignitity-platform/api
source venv/bin/activate
uvicorn app.main:app --reload
```

### Database Connection Issues

```bash
# Check PostgreSQL status
systemctl status postgresql

# Test connection
psql -U solvy_user -d solvy -h localhost

# Check DATABASE_URL in .env
```

### Stripe Errors

```bash
# Verify API keys
grep STRIPE /opt/sovereignitity-platform/api/.env

# Test Stripe connection
python3 -c "import stripe; stripe.api_key='YOUR_KEY'; print(stripe.Balance.retrieve())"
```

---

## Security Checklist

- [ ] Change default PostgreSQL password
- [ ] Set strong passwords in `.env`
- [ ] Enable UFW firewall (allow 80, 443, 22)
- [ ] Set up fail2ban for SSH protection
- [ ] Regular security updates (`apt update && apt upgrade`)
- [ ] Monitor logs for suspicious activity
- [ ] Backup `.env` file securely
- [ ] Use Stripe test keys for development

---

## Production Checklist

- [ ] SSL certificate installed
- [ ] Database backups scheduled
- [ ] Monitoring set up (Grafana/Prometheus)
- [ ] Error tracking configured
- [ ] API rate limiting enabled
- [ ] CORS properly configured
- [ ] Stripe webhooks configured
- [ ] Email notifications working
- [ ] Documentation updated
- [ ] Team trained on admin tools

---

## Support

For deployment issues:
- Email: dev@solvy.chain
- GitHub Issues: https://github.com/YOUR_USERNAME/sovereignitity-platform/issues

