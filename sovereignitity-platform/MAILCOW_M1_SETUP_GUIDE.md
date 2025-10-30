# Mailcow Setup Guide for M1 Mac
**SOVEREIGNITITY™ Email Infrastructure**

---

## 🍎 M1 Mac Specific Setup

### Prerequisites

#### 1. Install Docker Desktop for Apple Silicon
```bash
# Download from Docker website
# https://www.docker.com/products/docker-desktop/

# Or install via Homebrew
brew install --cask docker
```

**Important for M1:**
- Use Docker Desktop 4.0+ (native Apple Silicon support)
- Enable "Use Rosetta for x86/amd64 emulation" in Docker settings
- Allocate at least 4GB RAM to Docker

#### 2. Install Required Tools
```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install git
brew install git

# Install docker-compose (if not included with Docker Desktop)
brew install docker-compose
```

---

## 📦 Mailcow Installation on M1 Mac

### Step 1: Clone Mailcow Repository
```bash
# Navigate to your preferred directory
cd ~/Projects

# Clone Mailcow
git clone https://github.com/mailcow/mailcow-dockerized
cd mailcow-dockerized
```

---

### Step 2: Generate Configuration
```bash
# Run the configuration generator
./generate_config.sh
```

**You'll be prompted for:**

1. **Mail server hostname (FQDN):**
   ```
   mail.solvy.chain
   ```

2. **Timezone:**
   ```
   America/New_York
   ```
   (Or your local timezone)

3. **Which branch to use:**
   ```
   master
   ```
   (Press Enter for default)

---

### Step 3: M1-Specific Configuration

#### Edit mailcow.conf
```bash
nano mailcow.conf
```

**Key Settings to Verify:**
```bash
# Mailcow hostname
MAILCOW_HOSTNAME=mail.solvy.chain

# Timezone
TZ=America/New_York

# HTTP/HTTPS ports (change if needed)
HTTP_PORT=80
HTTP_BIND=0.0.0.0
HTTPS_PORT=443
HTTPS_BIND=0.0.0.0

# Database password (auto-generated, keep secure)
DBPASS=[auto-generated]
DBROOT=[auto-generated]

# Additional domains (optional)
ADDITIONAL_SAN=solvy.chain
```

**M1-Specific Settings:**
Add these lines if not present:
```bash
# Enable ARM64 compatibility
DOCKER_DEFAULT_PLATFORM=linux/amd64
```

---

### Step 4: Pull and Build Docker Images
```bash
# Pull images (this may take 10-20 minutes on M1)
docker-compose pull

# Build images
docker-compose build
```

**M1 Note:** Some images may need to run under Rosetta emulation. This is normal and handled automatically.

---

### Step 5: Start Mailcow
```bash
# Start all containers
docker-compose up -d

# Check status
docker-compose ps
```

**Expected Output:**
All services should show "Up" status:
- nginx-mailcow
- postfix-mailcow
- dovecot-mailcow
- redis-mailcow
- mysql-mailcow
- rspamd-mailcow
- clamd-mailcow
- sogo-mailcow
- php-fpm-mailcow
- acme-mailcow
- netfilter-mailcow
- watchdog-mailcow
- solr-mailcow
- olefy-mailcow
- ofelia-mailcow

---

### Step 6: Access Mailcow Admin Panel

**Local Access (for testing):**
```
https://localhost
```

**Production Access (after DNS setup):**
```
https://mail.solvy.chain
```

**Default Credentials:**
- Username: `admin`
- Password: `moohoo`

**⚠️ CHANGE PASSWORD IMMEDIATELY AFTER FIRST LOGIN**

---

## 🔧 M1 Mac Troubleshooting

### Issue 1: Docker Containers Won't Start
```bash
# Check Docker is running
docker info

# Restart Docker Desktop
# Go to Docker Desktop → Preferences → Restart

# Check logs
docker-compose logs
```

---

### Issue 2: Platform Compatibility Warnings
```bash
# Some images may show ARM64 warnings
# Solution: Enable Rosetta in Docker Desktop

# Docker Desktop → Settings → Features in Development
# ✅ Use Rosetta for x86/amd64 emulation on Apple Silicon
```

---

### Issue 3: Slow Performance
```bash
# Increase Docker resources
# Docker Desktop → Settings → Resources

# Recommended for M1:
# CPUs: 4
# Memory: 6 GB
# Swap: 2 GB
# Disk: 60 GB
```

---

### Issue 4: Port Conflicts
```bash
# Check if ports are in use
lsof -i :80
lsof -i :443

# If ports are occupied, edit mailcow.conf
nano mailcow.conf

# Change ports:
HTTP_PORT=8080
HTTPS_PORT=8443

# Restart Mailcow
docker-compose down
docker-compose up -d
```

---

## 🌐 DNS Configuration (Before Production Use)

### Required DNS Records
See `EMAIL_DNS_CONFIGURATION.md` for complete details.

**Quick Reference:**
```
A      mail.solvy.chain          [YOUR_SERVER_IP]
MX     solvy.chain               10 mail.solvy.chain
TXT    solvy.chain               "v=spf1 mx ~all"
TXT    _dmarc.solvy.chain        "v=DMARC1; p=none; rua=mailto:admin@solvy.chain"
```

---

## 📧 Initial Configuration Steps

### 1. Change Admin Password
```
https://mail.solvy.chain
Login → Admin → Edit → Change Password
```

---

### 2. Add Domain
```
Configuration → Mail setup → Domains → Add domain

Domain: solvy.chain
Description: SOVEREIGNITITY Email
Max. mailboxes: 100
Max. quota per mailbox: 10240 MB
Default quota per mailbox: 3072 MB
```

---

### 3. Create Mailboxes

#### Admin Mailbox
```
Configuration → Mail setup → Mailboxes → Add mailbox

Username: admin
Domain: solvy.chain
Full name: SOLVY Admin
Quota: 10240 MB
Password: [Strong Password]
```

#### Leadership Mailboxes
```
sean@solvy.chain - Sean Maurice Mayo (SA Nathan)
evergreen@solvy.chain - Evergreen P. Mayo
marlon@solvy.chain - Sean Marlon McDaniel II
```

#### Departmental Mailboxes
```
support@solvy.chain
info@solvy.chain
sales@solvy.chain
qa@solvy.chain
dev@solvy.chain
ebl@solvy.chain
reign@solvy.chain
decidey@solvy.chain
noreply@solvy.chain
```

---

### 4. Enable DKIM
```
Configuration → Configuration & Details → solvy.chain → DKIM

1. Click "Generate" to create DKIM key
2. Copy the public key
3. Add to DNS as TXT record:
   Name: dkim._domainkey.solvy.chain
   Value: [Paste public key]
```

---

### 5. Configure DMARC Reporting
```
Configuration → Configuration & Details → solvy.chain → DMARC

Enable DMARC reporting
Report email: admin@solvy.chain
```

---

## 🔐 Security Hardening

### 1. Enable Two-Factor Authentication
```
Admin → Edit → Enable Two-Factor Auth
```

### 2. Restrict Admin Access
```
System → Configuration → Admin

Allowed IPs: [Your IP addresses]
```

### 3. Enable Fail2Ban
```
System → Configuration → Fail2Ban

✅ Enable Fail2Ban
Ban time: 3600 seconds
Max. retry: 3
```

### 4. SSL/TLS Configuration
```
System → Configuration → TLS

✅ Enforce TLS encryption
✅ Require valid certificate
Certificate: Let's Encrypt (auto-generated)
```

---

## 📊 Monitoring & Maintenance

### Check Container Status
```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f postfix-mailcow
```

### Backup Mailcow
```bash
# Create backup
./helper-scripts/backup_and_restore.sh backup all

# Backups stored in:
# /var/lib/docker/volumes/mailcowdockerized_vmail-vol-1/_data/
```

### Update Mailcow
```bash
# Pull latest changes
git pull

# Update containers
docker-compose pull
docker-compose up -d
```

---

## 🧪 Testing Email Functionality

### Send Test Email
```bash
# From command line
echo "Test email from Mailcow" | mail -s "Test" your-email@gmail.com
```

### Test Authentication
1. Send email to: `check-auth@verifier.port25.com`
2. Check response for SPF, DKIM, DMARC results

### Test Deliverability
1. Visit: https://www.mail-tester.com/
2. Send email to provided address
3. Check score (aim for 10/10)

---

## 🚀 Production Deployment Checklist

Before going live:
- [ ] Docker Desktop installed and running
- [ ] Mailcow cloned and configured
- [ ] All containers running (docker-compose ps)
- [ ] Admin password changed from default
- [ ] Domain added (solvy.chain)
- [ ] DNS records configured and propagated
- [ ] DKIM key generated and added to DNS
- [ ] SSL certificate obtained (Let's Encrypt)
- [ ] Test mailboxes created
- [ ] Test emails sent and received
- [ ] Email authentication passing (SPF, DKIM, DMARC)
- [ ] Deliverability score 10/10
- [ ] Two-factor authentication enabled
- [ ] Fail2Ban enabled
- [ ] Backup configured
- [ ] Monitoring set up

---

## 📱 Mobile Access

### iOS Mail Setup
```
Server: mail.solvy.chain
IMAP Port: 993 (SSL/TLS)
SMTP Port: 587 (STARTTLS)
Username: your-email@solvy.chain
Password: [Your password]
```

### Android Mail Setup
```
Incoming Server: mail.solvy.chain
Protocol: IMAP
Port: 993
Security: SSL/TLS

Outgoing Server: mail.solvy.chain
Port: 587
Security: STARTTLS
```

---

## 🌐 Webmail Access

**SOGo Webmail:**
```
https://mail.solvy.chain/SOGo
```

**Features:**
- Email client
- Calendar
- Contacts
- Mobile-responsive
- ActiveSync support

---

## 🔄 Integration with SOVEREIGNITITY™ Platform

### SMTP Settings for Platform
```javascript
// For sending emails from platform
const emailConfig = {
  host: 'mail.solvy.chain',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'noreply@solvy.chain',
    pass: process.env.EMAIL_PASSWORD
  }
};
```

### Example: Send Welcome Email
```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'mail.solvy.chain',
  port: 587,
  secure: false,
  auth: {
    user: 'noreply@solvy.chain',
    pass: process.env.EMAIL_PASSWORD
  }
});

async function sendWelcomeEmail(userEmail, userName) {
  await transporter.sendMail({
    from: '"SOVEREIGNITITY" <noreply@solvy.chain>',
    to: userEmail,
    subject: 'Welcome to SOVEREIGNITITY™',
    html: `
      <h1>Welcome, ${userName}!</h1>
      <p>Thank you for joining the economic liberation movement.</p>
    `
  });
}
```

---

## 📞 Support Resources

### Mailcow Community
- Forum: https://community.mailcow.email/
- GitHub Issues: https://github.com/mailcow/mailcow-dockerized/issues
- Documentation: https://docs.mailcow.email/

### M1 Mac Docker
- Docker Desktop: https://docs.docker.com/desktop/mac/apple-silicon/
- Docker Forums: https://forums.docker.com/

---

## 🎯 Next Steps

1. **Complete DNS Setup** - Add all records from EMAIL_DNS_CONFIGURATION.md
2. **Create Email Accounts** - Set up all planned mailboxes
3. **Test Thoroughly** - Send/receive emails, check spam scores
4. **Integrate with Platform** - Add email functionality to SOVEREIGNITITY™
5. **Monitor Performance** - Set up logging and alerts
6. **Plan Backup Strategy** - Regular automated backups

---

**Document Version:** 1.0  
**Last Updated:** October 25, 2025  
**Maintained By:** Sean Maurice Mayo (SA Nathan)  
**Platform:** SOVEREIGNITITY™  
**Target:** M1 Mac (Apple Silicon)

