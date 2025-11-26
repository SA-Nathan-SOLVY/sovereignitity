# SOLVY Production Deployment Guide

## Quick Start (VPS Deployment)

### 1. Prerequisites

Ensure these are installed on your VPS:

```bash
sudo apt-get update
sudo apt-get install -y python3 python3-pip python3-venv nginx
```

### 2. Deploy Backend with Gunicorn

#### Clone/Pull Repository

```bash
cd /var/www
git clone https://github.com/SA-Nathan-SOLVY/sovereignitity.git
cd sovereignitity/backend
```

#### Setup Python Virtual Environment

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
pip install gunicorn
```

#### Test Gunicorn Locally

```bash
source .venv/bin/activate
gunicorn -c ../gunicorn_config.py app_production:app
# Should see: ✓ SOLVY API ready. Listening on 0.0.0.0:5001
```

### 3. Setup Systemd Service

#### Copy service file

```bash
sudo cp /var/www/sovereignitity/solvy-api.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable solvy-api
sudo systemctl start solvy-api
```

#### Check service status

```bash
sudo systemctl status solvy-api
# Should show: active (running)
```

#### View logs

```bash
sudo journalctl -u solvy-api -f
# Or: tail -f /var/log/solvy/gunicorn_error.log
```

### 4. Configure Nginx Proxy

Create `/etc/nginx/sites-available/solvy`:

```nginx
upstream solvy_api {
    server 127.0.0.1:5001;
}

server {
    listen 80;
    server_name 46.62.235.95 ebl.beauty api.ebl.beauty;

    # Redirect HTTP to HTTPS (optional)
    # return 301 https://$server_name$request_uri;

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

#### Enable Nginx site

```bash
sudo ln -s /etc/nginx/sites-available/solvy /etc/nginx/sites-enabled/
sudo nginx -t  # Test config
sudo systemctl reload nginx
```

### 5. Verify Deployment

#### Test backend endpoint

```bash
curl -s http://127.0.0.1:5001/api | python -m json.tool
```

#### Test through Nginx

```bash
curl -s http://46.62.235.95/api | python -m json.tool
```

#### Test PMC signup endpoint

```bash
curl -X POST http://46.62.235.95/api/contact-eva \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Business",
    "pmc_id": "PMC-001",
    "email": "test@example.com",
    "business": "Testing"
  }'
```

#### Access PMC landing page

```
http://46.62.235.95/pmc-landing.html
```

### 6. Logs & Monitoring

#### Gunicorn access log

```bash
tail -f /var/log/solvy/gunicorn_access.log
```

#### Gunicorn error log

```bash
tail -f /var/log/solvy/gunicorn_error.log
```

#### System service log

```bash
sudo journalctl -u solvy-api -n 50 -f
```

#### Check process

```bash
ps aux | grep gunicorn
```

### 7. Production Checklist

- [ ] Virtual environment activated and dependencies installed
- [ ] Gunicorn starts without errors
- [ ] Systemd service auto-starts on boot
- [ ] Nginx reverse proxy configured
- [ ] API endpoints responding via Nginx
- [ ] PMC landing page accessible
- [ ] Signup form logging to `pmc_signups.json`
- [ ] CORS headers properly set
- [ ] Error logs monitored
- [ ] Log rotation configured (logrotate)

### 8. Troubleshooting

#### Gunicorn won't start

```bash
# Check permissions
ls -la /var/log/solvy/
sudo chown www-data:www-data /var/log/solvy/

# Check venv
source /var/www/backend/.venv/bin/activate
python -c "import flask; print(flask.__version__)"
```

#### 502 Bad Gateway from Nginx

```bash
# Check if Gunicorn is running
sudo systemctl status solvy-api
sudo journalctl -u solvy-api -n 20

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log
```

#### PMC signups not logging

```bash
# Check file permissions
ls -la /var/www/backend/pmc_signups.json
sudo chown www-data:www-data /var/www/backend/pmc_signups.json

# Check backend logs
sudo tail -f /var/log/solvy/gunicorn_error.log
```

### 9. Zero-Downtime Reloads

```bash
# Reload Gunicorn (restarts workers, keeps parent)
sudo systemctl reload solvy-api

# Full restart (short downtime)
sudo systemctl restart solvy-api
```

## Security Notes

- Keep `.env` file out of git (add to `.gitignore`)
- Use HTTPS in production (SSL certificates)
- Set proper file permissions (`chmod 755` for dirs, `644` for files)
- Monitor logs regularly
- Use `sudo` for system commands, not for service management
- Consider using nginx rate limiting for API endpoints

## Performance Tuning

Edit `gunicorn_config.py` for your VPS specs:

```python
# For 2 CPU cores: workers = 2 * 2 + 1 = 5
# For 4 CPU cores: workers = 4 * 2 + 1 = 9
workers = multiprocessing.cpu_count() * 2 + 1
```

---

**Ready to deploy? Follow steps 1-7 on your VPS.**
