# SOLVY Production Deployment Guide

## The Problem You Saw

```
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
```

**This warning means Flask's dev server is running directly.** Flask dev server is single-threaded and should NOT be used in production.

## The Solution: Use Gunicorn WSGI Server

Gunicorn is a production-grade WSGI server that:
- ✅ Eliminates the warning
- ✅ Runs multiple worker processes (4+ workers)
- ✅ Handles concurrent requests efficiently
- ✅ Can be auto-managed by systemd
- ✅ Integrates seamlessly with nginx

---

## Quick Start (VPS Deployment)

### 1. Prerequisites
```bash
sudo apt-get update
sudo apt-get install -y python3 python3-pip python3-venv nginx git
```

### 2. Clone & Setup Backend

```bash
cd /var/www
sudo git clone https://github.com/SA-Nathan-SOLVY/sovereignitity.git
cd sovereignitity/backend

# Setup Python venv
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 3. Test Gunicorn Directly

```bash
cd /var/www/sovereignitity/backend
source .venv/bin/activate
gunicorn -w 4 -b 0.0.0.0:5001 app_production:app
```

**Expected output:**
```
[INFO] Starting gunicorn 23.0.0
[INFO] Listening at: http://0.0.0.0:5001 (1234)
[INFO] Using worker: sync
[INFO] Booting worker with pid: 1235
[INFO] Booting worker with pid: 1236
...
```

**Key point:** NO "WARNING: This is a development server" message! ✅

### 4. Setup Systemd Service (Auto-start)

```bash
sudo cp /var/www/sovereignitity/solvy-api.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable solvy-api
sudo systemctl start solvy-api
sudo systemctl status solvy-api  # Should show: active (running)
```

### 5. Configure Nginx Reverse Proxy

Create `/etc/nginx/sites-available/solvy`:

```nginx
upstream solvy_api {
    server 127.0.0.1:5001;
}

server {
    listen 80;
    server_name 46.62.235.95 ebl.beauty api.ebl.beauty;
    
    # API routes
    location /api/ {
        proxy_pass http://solvy_api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Static frontend files
    location / {
        root /var/www/solvy-platform;
        try_files $uri $uri/ /index.html;
    }
}
```

Enable it:
```bash
sudo ln -s /etc/nginx/sites-available/solvy /etc/nginx/sites-enabled/
sudo nginx -t  # Verify config
sudo systemctl reload nginx
```

### 6. Create Required Log Directories

```bash
sudo mkdir -p /var/log/solvy /var/run/solvy
sudo chown www-data:www-data /var/log/solvy /var/run/solvy
```

### 7. Verify Everything Works

```bash
# Test backend directly
curl -s http://127.0.0.1:5001/api | python -m json.tool

# Test through Nginx
curl -s http://46.62.235.95/api | python -m json.tool

# Test PMC signup endpoint
curl -X POST http://46.62.235.95/api/contact-eva \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "pmc_id": "PMC-001",
    "email": "test@example.com",
    "business": "Test"
  }'

# Access PMC landing page
# Open: http://46.62.235.95/pmc-landing.html
```

---

## Monitoring & Logs

### Check Gunicorn Status
```bash
ps aux | grep gunicorn
```

### View Logs
```bash
# Systemd journal
sudo journalctl -u solvy-api -f

# Gunicorn access log
sudo tail -f /var/log/solvy/gunicorn_access.log

# Gunicorn error log
sudo tail -f /var/log/solvy/gunicorn_error.log
```

### Restart Services
```bash
# Reload Gunicorn (zero downtime)
sudo systemctl reload solvy-api

# Full restart
sudo systemctl restart solvy-api

# Check status
sudo systemctl status solvy-api
```

---

## Troubleshooting

### Still seeing the development server warning?

This means Flask is still running directly, not Gunicorn.

```bash
# Stop any Flask processes
pkill -f "python.*app_production.py"
pkill -f gunicorn

# Verify it's stopped
ps aux | grep app_production

# Restart systemd service
sudo systemctl restart solvy-api

# Check it started correctly
sudo systemctl status solvy-api
```

### Gunicorn won't start

```bash
# Check logs
sudo journalctl -u solvy-api -n 20

# Check Python venv
source /var/www/sovereignitity/backend/.venv/bin/activate
python -c "import flask; print(flask.__version__)"

# Check dependencies
pip list | grep -E "flask|gunicorn|stripe"

# Try starting manually
cd /var/www/sovereignitity/backend
source .venv/bin/activate
gunicorn -w 4 -b 0.0.0.0:5001 app_production:app
```

### 502 Bad Gateway from Nginx

```bash
# Is Gunicorn running?
ps aux | grep gunicorn

# Is port 5001 listening?
sudo netstat -tlnp | grep 5001

# Check Nginx error log
sudo tail -f /var/log/nginx/error.log

# Verify Nginx config
sudo nginx -t
```

### PMC signups not saving

```bash
# Check file exists
ls -la /var/www/sovereignitity/backend/pmc_signups.json

# Fix permissions
sudo chown www-data:www-data /var/www/sovereignitity/backend/pmc_signups.json

# Check backend logs
sudo tail -f /var/log/solvy/gunicorn_error.log
```

---

## Performance Tuning

Edit `/var/www/sovereignitity/gunicorn_config.py`:

```python
# Check your VPS cores: nproc
# Rule: workers = (2 × cpu_count) + 1

# 2 cores  → 5 workers
# 4 cores  → 9 workers
# 8 cores  → 17 workers
workers = multiprocessing.cpu_count() * 2 + 1
```

---

## Security Checklist

- [ ] Gunicorn running (not Flask dev server)
- [ ] Systemd service auto-starts on boot
- [ ] Nginx reverse proxy configured
- [ ] Log directories have correct permissions
- [ ] `.env` file not in git
- [ ] HTTPS configured (Let's Encrypt)
- [ ] API rate limiting enabled (nginx)
- [ ] Regular log monitoring

---

## Summary: From Dev to Production

| Aspect | Development | Production |
|--------|-------------|------------|
| **Server** | `python app_production.py` | `gunicorn -w 4 app_production:app` |
| **Warning** | YES (intended) | NO (error if seen) |
| **Workers** | 1 (single) | 4+ (concurrent) |
| **Restart** | Manual | systemd (auto) |
| **Logging** | Console output | `/var/log/solvy/` |
| **Nginx** | Optional | Required |
| **Performance** | Slow | Fast |

**Bottom line:** Your message goes away when you use Gunicorn for production. ✅
