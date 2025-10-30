# 🤖 Huginn-Only Enrollment System for SOVEREIGNITITY™

## Complete Sovereign Automation - No Google Sheets, No Zapier, No Node-RED

**Pure self-hosted enrollment management powered by Huginn.**

---

## 🎯 What This System Does

### **Replaces:**
- ❌ Google Sheets + Zapier
- ❌ Node-RED
- ❌ Third-party automation services

### **Provides:**
- ✅ Enrollment form webhook receiver
- ✅ Built-in database storage (MySQL)
- ✅ Automatic email confirmations
- ✅ Admin notifications
- ✅ IBC policy loan processing
- ✅ Web-based dashboard to view enrollments
- ✅ Export to CSV anytime
- ✅ Scheduled reports

---

## 🚀 Complete Setup (30 Minutes)

### Part 1: Install Huginn on Mac M1 (10 min)

**1. Install Docker Desktop**
```bash
brew install --cask docker
# Open Docker Desktop and wait for it to start
```

**2. Create Huginn Directory**
```bash
mkdir -p ~/huginn-sovereignitity
cd ~/huginn-sovereignitity
```

**3. Create Docker Compose File**
```bash
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  huginn-db:
    image: mysql:8.0
    platform: linux/arm64
    container_name: sovereignitity-db
    environment:
      MYSQL_ROOT_PASSWORD: SOLVY_secure_2026!
      MYSQL_DATABASE: huginn_production
      MYSQL_USER: huginn
      MYSQL_PASSWORD: huginn_SOLVY_2026
    volumes:
      - ./data/mysql:/var/lib/mysql
    restart: unless-stopped
    networks:
      - sovereignitity-network

  huginn:
    image: huginn/huginn
    platform: linux/arm64
    container_name: sovereignitity-huginn
    depends_on:
      - huginn-db
    ports:
      - "3000:3000"
    environment:
      # Database
      - DATABASE_ADAPTER=mysql2
      - DATABASE_ENCODING=utf8mb4
      - DATABASE_RECONNECT=true
      - DATABASE_NAME=huginn_production
      - DATABASE_POOL=20
      - DATABASE_USERNAME=huginn
      - DATABASE_PASSWORD=huginn_SOLVY_2026
      - DATABASE_HOST=huginn-db
      - DATABASE_PORT=3306
      
      # Application
      - APP_SECRET_TOKEN=sovereignitity_secret_token_2026_economic_freedom
      - INVITATION_CODE=SOLVY2026
      - REQUIRE_CONFIRMED_EMAIL=false
      - SKIP_INVITATION_CODE=false
      
      # Admin Email (change this!)
      - ADMIN_EMAIL=your-email@example.com
      
      # Timezone
      - TIMEZONE=America/Chicago
      
      # SMTP (for sending emails - configure with your email)
      - SMTP_DOMAIN=smtp.gmail.com
      - SMTP_USER_NAME=your-email@gmail.com
      - SMTP_PASSWORD=your-app-password
      - SMTP_SERVER=smtp.gmail.com
      - SMTP_PORT=587
      - SMTP_AUTHENTICATION=plain
      - SMTP_ENABLE_STARTTLS_AUTO=true
      - EMAIL_FROM_ADDRESS=noreply@sovereignitity.com
      
    volumes:
      - ./data/huginn:/var/lib/huginn
      - ./logs:/app/log
    restart: unless-stopped
    networks:
      - sovereignitity-network

networks:
  sovereignitity-network:
    driver: bridge
EOF
```

**4. Start Huginn**
```bash
docker-compose up -d

# Wait 2-3 minutes for initialization
docker-compose logs -f huginn

# When you see "Listening on http://0.0.0.0:3000" - press Ctrl+C
```

**5. Access Huginn**
- Open: **http://localhost:3000**
- Login: `admin` / `password`
- **IMMEDIATELY change password!**

---

### Part 2: Configure Email (Gmail Example) (5 min)

**1. Get Gmail App Password**
- Go to: https://myaccount.google.com/apppasswords
- Generate app password for "Huginn"
- Copy the 16-character password

**2. Update docker-compose.yml**
```bash
nano docker-compose.yml

# Update these lines:
- SMTP_USER_NAME=your-actual-email@gmail.com
- SMTP_PASSWORD=your-16-char-app-password
- ADMIN_EMAIL=your-actual-email@gmail.com
```

**3. Restart Huginn**
```bash
docker-compose restart huginn
```

---

### Part 3: Create Enrollment Agents (15 min)

**Login to Huginn:** http://localhost:3000

#### Agent 1: Enrollment Webhook Receiver

**Click:** Agents → New Agent

**Settings:**
- **Type:** Webhook Agent
- **Name:** SOVEREIGNITITY Enrollment Webhook
- **Schedule:** Never
- **Keep Events:** 365 days

**Options:**
```json
{
  "secret": "SOLVY2026_enrollment",
  "expected_receive_period_in_days": 365,
  "payload_path": ".",
  "verbs": "post",
  "response": "{\"status\":\"success\",\"message\":\"Enrollment received\"}"
}
```

**Save Agent**

**Copy Webhook URL** (you'll need this for your website):
```
http://localhost:3000/users/1/web_requests/1/SOLVY2026_enrollment
```

---

#### Agent 2: Data Storage Agent

**Click:** Agents → New Agent

**Settings:**
- **Type:** Data Output Agent
- **Name:** Store Enrollment Data
- **Schedule:** Never
- **Sources:** SOVEREIGNITITY Enrollment Webhook

**Options:**
```json
{
  "secrets": [],
  "expected_receive_period_in_days": 2,
  "template": {
    "timestamp": "{{created_at}}",
    "full_name": "{{fullName}}",
    "email": "{{email}}",
    "phone": "{{phone}}",
    "referral_source": "{{referralSource}}",
    "interests": "{{interests}}",
    "current_status": "{{currentStatus}}",
    "enrollment_tier": "{{enrollmentTier}}",
    "communications": "{{communications}}",
    "business_type": "{{businessType}}",
    "ein": "{{ein}}",
    "has_ibc_policy": "{{hasIbcPolicy}}",
    "policy_company": "{{policyCompany}}",
    "policy_number": "{{policyNumber}}"
  }
}
```

**Save Agent**

---

#### Agent 3: Member Confirmation Email

**Click:** Agents → New Agent

**Settings:**
- **Type:** Email Agent
- **Name:** Send Member Confirmation
- **Schedule:** Never
- **Sources:** SOVEREIGNITITY Enrollment Webhook

**Options:**
```json
{
  "subject": "🦅 Welcome to SOVEREIGNITITY™ - Your Journey Begins!",
  "recipients": ["{{email}}"],
  "expected_receive_period_in_days": 2,
  "body": "Hi {{fullName}},\n\n🎉 Welcome to SOVEREIGNITITY™!\n\nThank you for joining the economic freedom movement. Your enrollment has been confirmed.\n\n📋 Your Enrollment Details:\n- Tier: {{enrollmentTier}}\n- Status: {{currentStatus}}\n- Interests: {{interests}}\n\n{{#hasIbcPolicy}}\n🏦 IBC Policy Loan Request:\nWe received your policy loan request for {{policyCompany}} policy #{{policyNumber}}. Our team will contact you within 24-48 hours to begin processing.\n{{/hasIbcPolicy}}\n\n{{#businessType}}\n💼 Business Account:\nAs a {{businessType}}, you'll receive both business and personal virtual cards. We'll send setup instructions within 3-5 business days.\n{{/businessType}}\n\n🎁 Your Founding Member Benefits:\n{{#enrollmentTier == 'early-access'}}\n✅ No monthly fees for first year ($120 value)\n✅ Exclusive AI tax consultation - 30 min ($200 value)\n✅ Founding member badge\n✅ 20% lifetime discount on EBL & Reign\n✅ Guapcoin bonus at Phase 3 launch\n{{/enrollmentTier}}\n\n{{#enrollmentTier == 'waitlist'}}\n✅ Priority access on launch day\n✅ Educational content library\n✅ Community forum access\n✅ Early partner announcements\n{{/enrollmentTier}}\n\n📱 Next Steps:\n1. Watch for email from our team (24-48 hours)\n2. Join our community forum (link coming soon)\n3. Follow us on social media for updates\n\n💪 You're now part of something bigger than a financial product - you're part of an economic freedom movement.\n\n\"This isn't about fighting the system - it's about building a better one.\"\n\nWelcome to economic sovereignty,\nThe SOVEREIGNITITY™ Team\n\n---\n🦅 SOVEREIGNITITY™\nYour Economic Declaration of Independence\n\nQuestions? Reply to this email.\nWebsite: https://sovereignitity-platform-kf9cpimtp-sean-mayos-projects.vercel.app"
}
```

**Save Agent**

---

#### Agent 4: Admin Notification Email

**Click:** Agents → New Agent

**Settings:**
- **Type:** Email Agent
- **Name:** Notify Admin of New Enrollment
- **Schedule:** Never
- **Sources:** SOVEREIGNITITY Enrollment Webhook

**Options:**
```json
{
  "subject": "🎉 New SOVEREIGNITITY™ Enrollment: {{fullName}}",
  "recipients": ["your-email@example.com"],
  "expected_receive_period_in_days": 2,
  "body": "New member enrolled!\n\n👤 MEMBER DETAILS:\nName: {{fullName}}\nEmail: {{email}}\nPhone: {{phone}}\nReferral: {{referralSource}}\n\n📊 ENROLLMENT INFO:\nTier: {{enrollmentTier}}\nStatus: {{currentStatus}}\nInterests: {{interests}}\nCommunications: {{communications}}\n\n{{#businessType}}\n💼 BUSINESS ACCOUNT:\nType: {{businessType}}\nEIN: {{ein}}\nBusiness Name: {{businessName}}\n\n⚠️ ACTION REQUIRED:\n- Verify business documentation\n- Issue business + personal cards\n- Send business account setup email\n{{/businessType}}\n\n{{#hasIbcPolicy}}\n🏦 IBC POLICY LOAN REQUEST:\nCompany: {{policyCompany}}\nPolicy #: {{policyNumber}}\nLoan Amount: {{desiredLoanAmount}}\nMarital Status: {{maritalStatus}}\n\n⚠️ ACTION REQUIRED:\n1. Generate OneAmerica Service Request form\n2. Generate Direct Deposit Authorization\n3. Contact member for policy documents\n4. {{#maritalStatus == 'married'}}Get spouse signature{{/maritalStatus}}\n5. Submit to {{policyCompany}}\n{{/hasIbcPolicy}}\n\n{{^hasIbcPolicy}}\n{{^businessType}}\n✅ STANDARD ENROLLMENT:\n- Issue personal virtual card\n- Send welcome package\n- Add to community forum\n{{/businessType}}\n{{/hasIbcPolicy}}\n\n🎯 FOUNDING 100 PROGRESS:\nTotal Enrollments: [View in Huginn Dashboard]\nEarly Access: [Count]\nWaitlist: [Count]\n\n---\nView full details: http://localhost:3000/agents\nTime to follow up! 💪"
}
```

**Save Agent**

---

#### Agent 5: Daily Enrollment Summary

**Click:** Agents → New Agent

**Settings:**
- **Type:** Email Digest Agent
- **Name:** Daily Enrollment Summary
- **Schedule:** 8am daily
- **Sources:** Store Enrollment Data

**Options:**
```json
{
  "subject": "📊 SOVEREIGNITITY™ Daily Enrollment Report - {{date}}",
  "recipients": ["your-email@example.com"],
  "expected_receive_period_in_days": 2,
  "headline": "Today's Enrollments",
  "body": "{{events}}"
}
```

**Save Agent**

---

### Part 4: Connect to Your Website (5 min)

**Update EnrollmentForm.jsx:**

```javascript
// File: /home/ubuntu/sovereignitity-platform/src/components/EnrollmentForm.jsx

// Find the handleSubmit function and update the fetch URL:

const handleSubmit = async (e) => {
  e.preventDefault()
  setIsSubmitting(true)

  try {
    // Combine all form data
    const enrollmentData = {
      ...formData,
      timestamp: new Date().toISOString(),
      enrollmentTier: selectedTier
    }

    // Send to Huginn webhook
    const response = await fetch('http://localhost:3000/users/1/web_requests/1/SOLVY2026_enrollment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enrollmentData)
    })

    if (response.ok) {
      setCurrentStep(5) // Show success screen
    } else {
      alert('Enrollment failed. Please try again.')
    }
  } catch (error) {
    console.error('Enrollment error:', error)
    alert('Network error. Please check your connection.')
  } finally {
    setIsSubmitting(false)
  }
}
```

**Rebuild and deploy:**
```bash
cd /home/ubuntu/sovereignitity-platform
pnpm run build
vercel --prod
```

---

## 📊 Viewing Your Enrollments

### In Huginn Dashboard

**1. View All Enrollments:**
- Go to: http://localhost:3000/agents
- Click: "Store Enrollment Data" agent
- Click: "Events" tab
- See all enrollments with full details

**2. Search Enrollments:**
- Use search box to find specific members
- Filter by date, tier, or status

**3. Export to CSV:**
- Click: "Export" button
- Download CSV file
- Open in Excel/Numbers

### Database Access (Advanced)

**Connect to MySQL:**
```bash
docker exec -it sovereignitity-db mysql -u huginn -phuginn_SOLVY_2026 huginn_production

# Query enrollments
SELECT * FROM events WHERE agent_id = 2 ORDER BY created_at DESC LIMIT 10;
```

---

## 🌐 Exposing to Internet (Production)

### Option 1: ngrok (Testing)

```bash
# Install ngrok
brew install ngrok

# Expose Huginn
ngrok http 3000

# Update website with ngrok URL:
# https://abc123.ngrok.io/users/1/web_requests/1/SOLVY2026_enrollment
```

### Option 2: Cloudflare Tunnel (Permanent)

```bash
# Install cloudflared
brew install cloudflare/cloudflare/cloudflared

# Create tunnel
cloudflared tunnel create sovereignitity-huginn

# Configure
cat > ~/.cloudflared/config.yml << 'EOF'
tunnel: sovereignitity-huginn
credentials-file: /Users/YOUR_USERNAME/.cloudflared/TUNNEL_ID.json

ingress:
  - hostname: huginn.yourdomain.com
    service: http://localhost:3000
  - service: http_status:404
EOF

# Run tunnel
cloudflared tunnel run sovereignitity-huginn

# Update website with tunnel URL:
# https://huginn.yourdomain.com/users/1/web_requests/1/SOLVY2026_enrollment
```

---

## 🔐 Security Checklist

- ✅ Change admin password immediately
- ✅ Use strong database passwords
- ✅ Enable HTTPS (via Cloudflare Tunnel)
- ✅ Set up regular backups
- ✅ Use Gmail app password (not main password)
- ✅ Restrict webhook access (add IP whitelist if needed)

---

## 💾 Backup & Restore

### Backup
```bash
cd ~/huginn-sovereignitity
docker-compose exec huginn-db mysqldump -u huginn -phuginn_SOLVY_2026 huginn_production > backup-$(date +%Y%m%d).sql
tar -czf huginn-backup-$(date +%Y%m%d).tar.gz data/ backup-*.sql
```

### Restore
```bash
cd ~/huginn-sovereignitity
docker-compose stop
docker-compose exec huginn-db mysql -u huginn -phuginn_SOLVY_2026 huginn_production < backup-YYYYMMDD.sql
docker-compose start
```

---

## 🎯 Complete Enrollment Flow

```
[Website Form] 
    ↓
[Huginn Webhook Receiver]
    ↓
[Store in Database] ← You can view/export anytime
    ↓
[Send Confirmation Email] → Member
    ↓
[Send Admin Notification] → You
    ↓
[Daily Summary Email] → You (8am daily)
```

---

## 🎉 You're Done!

**Your sovereign enrollment system is complete!**

✅ **No Google Sheets** - Data in your database  
✅ **No Zapier** - Huginn handles automation  
✅ **No Node-RED** - Single platform  
✅ **No third parties** - Complete sovereignty  
✅ **Free forever** - No subscriptions  
✅ **Your infrastructure** - Your control  

**Access:** http://localhost:3000  
**Login:** admin / [your-password]  
**Webhook:** http://localhost:3000/users/1/web_requests/1/SOLVY2026_enrollment  

---

*"Your data, your automation, your sovereignty."* 🤖🦅

**Pure sovereign enrollment management!** 🚀

