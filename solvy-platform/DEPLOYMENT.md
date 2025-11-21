# SOLVY Platform - Deployment Guide

## 🎯 Overview

Complete deployment guide for the SOLVY economic sovereignty platform with unified navigation, admin functions, and 24/7 AI customer service.

---

## 📦 What's Included

### **Public Pages** (6 files)
- `index.html` - Home/Hero page
- `decidey-ngo.html` - DECIDEY NGO education (softer tone)
- `communities.html` - Communities we serve
- `remittance.html` - Global remittance vision
- `solvy-card.html` - SOLVY Card features & pricing
- `contact.html` - Public contact form

### **Admin Pages** (4 files)
- `admin-dashboard.html` - Team dashboard with ticket system
- `operations-dashboard.html` - Real-time monitoring
- `invoice-management.html` - B2B payments & invoicing
- `email-config.html` - MailCow + Huginn setup guide
- `kimi-ai-setup.html` - 24/7 AI customer service guide

### **Shared Components**
- `navigation.js` - Unified navigation system (auto-loads on all pages)

---

## 🚀 Deployment Options

### **Option 1: Vercel (Recommended)**

1. **Create GitHub Repository**
   ```bash
   cd ~/solvy-platform
   git init
   git add .
   git commit -m "Initial SOLVY platform deployment"
   git remote add origin https://github.com/SA-Nathan-SOLVY/solvy-platform.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import from GitHub: `SA-Nathan-SOLVY/solvy-platform`
   - Framework: None (static site)
   - Click "Deploy"

3. **Configure Custom Domains**
   In Vercel dashboard:
   - `nitty.ebl.beauty` → index.html
   - `decidey.ebl.beauty` → decidey-ngo.html
   - `admin.ebl.beauty` → admin-dashboard.html

### **Option 2: Netlify**

1. **Create Netlify Site**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli
   
   # Deploy
   cd ~/solvy-platform
   netlify deploy --prod
   ```

2. **Configure Custom Domains**
   In Netlify dashboard → Domain settings

### **Option 3: Traditional Web Host (cPanel, etc.)**

1. **Upload Files**
   - FTP/SFTP all files to your web server
   - Ensure `navigation.js` is in the same directory as HTML files

2. **Configure Domains**
   - Point `nitty.ebl.beauty` to `/public_html/`
   - Point `decidey.ebl.beauty` to `/public_html/decidey-ngo.html`
   - Point `admin.ebl.beauty` to `/public_html/admin-dashboard.html`

---

## 🔧 Post-Deployment Configuration

### **1. Update Navigation Links**

Edit `navigation.js` and update domain URLs:

```javascript
// Change from relative paths to absolute URLs
const baseURL = 'https://nitty.ebl.beauty';

// Update all href values
{ text: 'Home', href: `${baseURL}/` }
{ text: 'DECIDEY NGO', href: `${baseURL}/decidey-ngo.html` }
// etc.
```

### **2. Configure Email (MailCow + Huginn)**

Follow the complete guide in `email-config.html`:

1. Set up MailCow at `mail.ebl.beauty`
2. Create mailboxes: `eva@ebl.beauty`, `sanathan@ebl.beauty`, `support@ebl.beauty`
3. Configure DNS records (MX, SPF, DKIM, DMARC)
4. Deploy Huginn for email automation
5. Connect contact form to `support@ebl.beauty`

**Estimated time:** 2-3 hours

### **3. Set Up Kimi AI (24/7 Customer Service)**

Follow the complete guide in `kimi-ai-setup.html`:

1. Get Kimi AI API access
2. Create knowledge base with SOLVY information
3. Integrate with Huginn for email routing
4. Add chat widget to all pages
5. Test escalation rules

**Estimated time:** 2-3 hours

### **4. Configure Monitoring (Raspberry Pi 5 MAN)**

Your Raspberry Pi 5 is already set up with Prometheus + Grafana:

1. Update Prometheus targets in `/etc/prometheus/prometheus.yml`:
   ```yaml
   - job_name: 'solvy-platform'
     static_configs:
       - targets: ['nitty.ebl.beauty:443']
   ```

2. Restart Prometheus:
   ```bash
   sudo systemctl restart prometheus
   ```

3. Access Grafana dashboards from `operations-dashboard.html`

### **5. Set Up Stripe for Invoice Management**

1. Create Stripe account: [stripe.com](https://stripe.com)
2. Get API keys from Stripe dashboard
3. Add to environment variables:
   ```bash
   export STRIPE_SECRET_KEY="sk_live_..."
   export STRIPE_PUBLISHABLE_KEY="pk_live_..."
   ```
4. Update `invoice-management.html` with Stripe integration

---

## 🔐 Security Considerations

### **Admin Dashboard Authentication**

Current setup uses demo credentials (`admin / solvy2025`). **Change immediately!**

**Option A: Add Real Authentication**
```javascript
// In admin-dashboard.html, replace demo auth with real backend
const response = await fetch('/api/admin/login', {
  method: 'POST',
  body: JSON.stringify({ username, password })
});
```

**Option B: Use Basic Auth (Quick)**
```nginx
# In Nginx config
location /admin-dashboard.html {
    auth_basic "Admin Access";
    auth_basic_user_file /etc/nginx/.htpasswd;
}
```

### **HTTPS/SSL**

Ensure all domains use HTTPS:
- Vercel/Netlify: Automatic
- Traditional host: Get Let's Encrypt certificate

### **API Keys**

Store securely:
- Kimi AI API key
- Stripe API keys
- MailCow credentials

**Never commit to Git!** Use environment variables.

---

## 📊 Domain Structure

```
nitty.ebl.beauty (Main Site)
├── / (index.html) - Home
├── /decidey-ngo.html - DECIDEY NGO
├── /communities.html - Communities
├── /remittance.html - Remittance
├── /solvy-card.html - SOLVY Card
├── /contact.html - Contact Form
└── /admin/ (Protected)
    ├── /admin-dashboard.html - Team Dashboard
    ├── /operations-dashboard.html - Operations
    ├── /invoice-management.html - Invoicing
    ├── /email-config.html - Email Setup Guide
    └── /kimi-ai-setup.html - AI Setup Guide

decidey.ebl.beauty → /decidey-ngo.html (alias)
admin.ebl.beauty → /admin-dashboard.html (alias)
shop.ebl.beauty → External (existing shop)
mail.ebl.beauty → MailCow server
```

---

## ✅ Pre-Launch Checklist

### **Content**
- [ ] All pages load correctly
- [ ] Navigation works on all pages
- [ ] Contact form submits successfully
- [ ] All links work (no 404s)
- [ ] Images load (if any added)

### **Email**
- [ ] MailCow is running at mail.ebl.beauty
- [ ] DNS records configured (MX, SPF, DKIM, DMARC)
- [ ] Test emails sent and received
- [ ] Huginn automation working
- [ ] Contact form emails route correctly

### **Admin**
- [ ] Admin dashboard login works
- [ ] Changed default password
- [ ] Operations dashboard shows metrics
- [ ] Invoice management functional
- [ ] Stripe integration tested

### **AI Customer Service**
- [ ] Kimi AI API key configured
- [ ] Knowledge base uploaded
- [ ] Chat widget appears on pages
- [ ] Responses are accurate
- [ ] Escalation rules work

### **Monitoring**
- [ ] Raspberry Pi 5 MAN operational
- [ ] Prometheus collecting metrics
- [ ] Grafana dashboards visible
- [ ] Operations dashboard shows data

### **Security**
- [ ] All domains use HTTPS
- [ ] Admin pages protected
- [ ] API keys stored securely
- [ ] No sensitive data in Git

---

## 🎯 Quick Start (5 Minutes)

**Just want to see it live?**

1. **Deploy to Vercel:**
   ```bash
   cd ~/solvy-platform
   npx vercel --prod
   ```

2. **Access your site:**
   - Main site: `https://[your-vercel-url].vercel.app`
   - Admin: `https://[your-vercel-url].vercel.app/admin-dashboard.html`

3. **Configure domains later** in Vercel dashboard

---

## 📞 Support

**Questions during deployment?**

- **Technical:** sanathan@ebl.beauty
- **General:** eva@ebl.beauty
- **Phone:** (775) 636-3656

---

## 🎉 Next Steps After Deployment

1. **Test everything thoroughly**
2. **Set up email (MailCow + Huginn)** - Follow `email-config.html`
3. **Integrate Kimi AI** - Follow `kimi-ai-setup.html`
4. **Configure Stripe** for invoice management
5. **Monitor performance** via Operations Dashboard
6. **Collect user feedback** and iterate

---

**Founded by SA Nathan, Service Member Veteran**  
*Continuing the legacy of Marcus Garvey, MLK, and Malcolm X in the digital age*

© 2025 SOLVY Platform. All rights reserved.
