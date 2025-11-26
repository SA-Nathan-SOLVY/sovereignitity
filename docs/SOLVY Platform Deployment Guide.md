# SOLVY Platform Deployment Guide
**Updated Color Scheme - Purple/Navy Theme**

## ✅ What's Been Completed

### 1. Color Scheme Update
All pages now use the unified purple/navy color scheme from the remittance page:
- **Background**: `linear-gradient(135deg, #1e293b, #1e40af, #1e293b)` (Slate → Navy → Slate)
- **Primary Accent**: `#9333ea` (Purple)
- **Secondary Accent**: `#3b82f6` (Blue)
- **Button Gradients**: Purple → Blue
- **Card Backgrounds**: `rgba(255, 255, 255, 0.1)` with subtle borders

### 2. Updated Pages
✅ index.html - Main landing page
✅ decidey-ngo.html - DECIDEY NGO education
✅ communities.html - Communities served
✅ solvy-card.html - SOLVY Card features
✅ admin-dashboard.html - Admin dashboard
✅ contact.html - Contact page
✅ remittance.html - Global remittance (kept as-is)

### 3. GitHub Repository
✅ All files committed to: https://github.com/SA-Nathan-SOLVY/SOLVY-sovereignitity
✅ Commit: `9b8ece4` - Added deployment script
✅ Commit: `1f6b5da` - Updated color scheme

---

## 🚀 VPS Deployment Instructions

### Option 1: Automated Deployment (Recommended)

SSH into your VPS and run:

```bash
ssh root@46.62.235.95

# Download and run deployment script
cd /tmp
wget https://raw.githubusercontent.com/SA-Nathan-SOLVY/SOLVY-sovereignitity/main/deploy-to-vps.sh
chmod +x deploy-to-vps.sh
./deploy-to-vps.sh
```

### Option 2: Manual Deployment

```bash
# SSH into VPS
ssh root@46.62.235.95

# Navigate to web directory
cd /var/www

# If solvy-platform doesn't exist or isn't a git repo:
rm -rf solvy-platform  # Remove old files if needed
git clone https://github.com/SA-Nathan-SOLVY/SOLVY-sovereignitity.git solvy-platform

# If it already exists as a git repo:
cd solvy-platform
git pull origin main

# Set proper permissions
chown -R www-data:www-data /var/www/solvy-platform
chmod -R 755 /var/www/solvy-platform

# Test nginx configuration
nginx -t

# Reload nginx
systemctl reload nginx
```

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure these are in place:

### 1. Nginx Configuration
- [ ] File uploaded to: `/etc/nginx/sites-available/solvy-complete`
- [ ] Symlink created: `ln -s /etc/nginx/sites-available/solvy-complete /etc/nginx/sites-enabled/solvy-complete`
- [ ] Configuration tested: `nginx -t`

### 2. Admin Password File
- [ ] Created at: `/etc/nginx/.htpasswd`
- [ ] Username: `admin`
- [ ] Password: `solvy2025`

```bash
# Create password file
sudo apt-get install -y apache2-utils
sudo htpasswd -c /etc/nginx/.htpasswd admin
# Enter password: solvy2025
```

### 3. File Permissions
- [ ] Owner: `www-data:www-data`
- [ ] Permissions: `755` for directories, `644` for files

---

## 🧪 Testing After Deployment

### 1. Test Main Site
```bash
curl -I http://46.62.235.95
```
Should return: `HTTP/1.1 200 OK`

### 2. Test Pages
Visit these URLs in your browser:
- http://46.62.235.95/ (Main landing page)
- http://46.62.235.95/decidey-ngo.html
- http://46.62.235.95/remittance.html
- http://46.62.235.95/communities.html
- http://46.62.235.95/solvy-card.html
- http://46.62.235.95/contact.html
- http://46.62.235.95/admin-dashboard.html (requires login: admin/solvy2025)

### 3. Verify Color Scheme
Check that all pages display the purple/navy gradient background and purple accent colors.

---

## 🌐 DNS Configuration (Next Step)

After testing with IP address, add these DNS A records:

| Subdomain | Type | Value | TTL |
|-----------|------|-------|-----|
| nitty.ebl.beauty | A | 46.62.235.95 | 3600 |
| decidey.ebl.beauty | A | 46.62.235.95 | 3600 |
| admin.ebl.beauty | A | 46.62.235.95 | 3600 |
| p2p.ebl.beauty | A | 46.62.235.95 | 3600 |
| p2p-api.ebl.beauty | A | 46.62.235.95 | 3600 |

Wait 15-30 minutes for DNS propagation.

---

## 🔒 SSL Certificate Installation (After DNS)

Once DNS is propagated:

```bash
# Install Certbot
sudo apt-get update
sudo apt-get install -y certbot python3-certbot-nginx

# Get certificates for all domains
sudo certbot --nginx -d nitty.ebl.beauty -d decidey.ebl.beauty -d admin.ebl.beauty -d p2p.ebl.beauty -d p2p-api.ebl.beauty

# Test auto-renewal
sudo certbot renew --dry-run
```

---

## 🐛 Troubleshooting

### Issue: "Connection refused"
```bash
# Check if Nginx is running
systemctl status nginx

# Start Nginx if stopped
systemctl start nginx
```

### Issue: "403 Forbidden"
```bash
# Check file permissions
ls -la /var/www/solvy-platform/

# Fix permissions
chown -R www-data:www-data /var/www/solvy-platform
chmod -R 755 /var/www/solvy-platform
```

### Issue: "502 Bad Gateway"
```bash
# Check Nginx error logs
tail -f /var/log/nginx/error.log

# Check Nginx configuration
nginx -t
```

### Issue: Pages show old colors
```bash
# Clear browser cache or use incognito mode
# Force reload: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
```

---

## 📦 Files Included

### HTML Pages
- index.html - Main landing page with hero section
- decidey-ngo.html - DECIDEY NGO education platform
- remittance.html - Global remittance vision
- communities.html - Communities served
- solvy-card.html - SOLVY Card features
- contact.html - Contact form
- admin-dashboard.html - Admin dashboard
- operations-dashboard.html - Operations dashboard
- invoice-management.html - Invoice management
- email-config.html - Email configuration
- kimi-ai-setup.html - Kimi AI setup

### Assets
- navigation.js - Shared navigation component
- fulllogo.png - Full SOLVY logo
- SolvyLogo-1024.png - SOLVY logo (1024px)
- solvy-crown-icon.png - Crown icon
- SOLVYCard.png - SOLVY Card image
- hero_payment_image.webp - Hero payment image

### Configuration
- deploy-to-vps.sh - Automated deployment script
- README.md - Repository documentation
- DEPLOYMENT.md - Deployment instructions

---

## 📞 Support

**Contact Information:**
- Email: eva@ebl.beauty (daytime availability)
- Email: sanathan@ebl.beauty (SMTP/technical)
- Phone: (775) 636-3656
- Location: Fort Worth, TX
- Facebook: https://www.facebook.com/SANathanLLC/

---

## 🎯 Next Steps

1. **Tonight (10 minutes)**
   - [ ] Deploy to VPS using deployment script
   - [ ] Test at http://46.62.235.95
   - [ ] Verify all pages load correctly

2. **Tomorrow Morning (30 minutes)**
   - [ ] Add DNS A records
   - [ ] Wait for DNS propagation
   - [ ] Install SSL certificates

3. **Tomorrow Afternoon (2-3 hours)**
   - [ ] Deploy P2P MVP
   - [ ] Setup PostgreSQL database
   - [ ] Test P2P transfers

4. **Later This Week**
   - [ ] Connect Raspberry Pi 5 monitoring
   - [ ] Deploy MailCow + Huginn
   - [ ] Integrate Kimi AI
   - [ ] Prepare presentation for Angelo

---

**Last Updated:** November 23, 2025
**Deployment Status:** Ready for VPS deployment
**Color Scheme:** Purple/Navy (unified across all pages)
