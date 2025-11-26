# Raspberry Pi 5 Setup Guide - SIMPLIFIED
## MAN (Mandatory Audit Network) + Monitoring Dashboard

**For**: Sean Maurice Mayo (SA Nathan)  
**Date**: November 19, 2025  
**Goal**: Set up 24/7 monitoring for SOLVY platform  
**Style**: Learn by doing - just follow the steps!

---

## 🎯 What You're Building

```
Your M1 Mac ←→ Raspberry Pi 5 ←→ Hetzner VPS
(Development)    (Monitoring)     (Production)
```

**What it does:**
- 📊 Monitors your servers 24/7
- 📈 Beautiful dashboards (Grafana)
- 🔔 Alerts when something breaks
- 👥 Shows member metrics (MAN - transparency)
- 🗳️ Tracks governance (DAO)

---

## 📦 What You Need

- ✅ Raspberry Pi 5
- ✅ MicroSD card (32GB+)
- ✅ Power supply (USB-C)
- ✅ Your M1 Mac
- ✅ WiFi or Ethernet
- ✅ Monitor + keyboard (for initial setup only)

---

## 🚀 PHASE 1: Set Up Raspberry Pi OS

### **Step 1: Download Raspberry Pi Imager**

**On your Mac:**

1. Go to: https://www.raspberrypi.com/software/
2. Download **Raspberry Pi Imager**
3. Install it (drag to Applications)
4. Open it

---

### **Step 2: Flash the SD Card**

1. **Insert microSD card** into your Mac (use adapter if needed)

2. **Open Raspberry Pi Imager**

3. **Click "Choose Device"**
   - Select: **Raspberry Pi 5**

4. **Click "Choose OS"**
   - Select: **Raspberry Pi OS (64-bit)** - Recommended

5. **Click "Choose Storage"**
   - Select: Your microSD card

6. **Click the GEAR ICON ⚙️** (bottom right)
   - **Set hostname**: `solvy-monitor`
   - **Enable SSH**: ✅ Check this!
   - **Set username**: `solvy`
   - **Set password**: [choose a password]
   - **Configure WiFi**: (if using WiFi)
     - SSID: [your WiFi name]
     - Password: [your WiFi password]
     - Country: US
   - **Set timezone**: America/Chicago (or your timezone)

7. **Click "Save"**

8. **Click "Write"**
   - Confirm: Yes, erase everything
   - Wait 5-10 minutes

9. **When done**, eject the SD card

---

### **Step 3: Boot Your Raspberry Pi**

1. **Insert microSD card** into Raspberry Pi 5
2. **Connect power** (USB-C)
3. **Wait 2-3 minutes** for first boot
4. **Green LED** should blink (means it's working!)

---

### **Step 4: Find Your Pi's IP Address**

**From your Mac:**

```bash
# Try the hostname first
ping solvy-monitor.local

# If that doesn't work, scan your network
# Install nmap if you don't have it:
brew install nmap

# Scan your network (replace with your network range)
nmap -sn 192.168.1.0/24 | grep -B 2 "Raspberry"
```

**Write down the IP address!** Example: `192.168.1.100`

---

### **Step 5: SSH Into Your Pi**

```bash
# SSH using hostname
ssh solvy@solvy-monitor.local

# Or using IP address
ssh solvy@192.168.1.100

# Enter the password you set earlier
```

**You're now in your Raspberry Pi!** 🎉

---

## 📊 PHASE 2: Install Prometheus (Metrics Collection)

**Just copy/paste these commands one by one:**

### **Step 1: Update System**

```bash
# Update package lists
sudo apt update

# Upgrade packages (this takes 5-10 minutes)
sudo apt upgrade -y

# Reboot
sudo reboot

# Wait 1 minute, then SSH back in
ssh solvy@solvy-monitor.local
```

---

### **Step 2: Create Prometheus User**

```bash
# Create user
sudo useradd --no-create-home --shell /bin/false prometheus

# Create directories
sudo mkdir /etc/prometheus
sudo mkdir /var/lib/prometheus

# Set ownership
sudo chown prometheus:prometheus /etc/prometheus
sudo chown prometheus:prometheus /var/lib/prometheus
```

---

### **Step 3: Download Prometheus**

```bash
# Go to temp directory
cd /tmp

# Download Prometheus for ARM64 (Raspberry Pi 5)
wget https://github.com/prometheus/prometheus/releases/download/v2.48.0/prometheus-2.48.0.linux-arm64.tar.gz

# Extract
tar -xvf prometheus-2.48.0.linux-arm64.tar.gz

# Go into extracted folder
cd prometheus-2.48.0.linux-arm64
```

---

### **Step 4: Install Prometheus**

```bash
# Copy binaries
sudo cp prometheus /usr/local/bin/
sudo cp promtool /usr/local/bin/

# Set ownership
sudo chown prometheus:prometheus /usr/local/bin/prometheus
sudo chown prometheus:prometheus /usr/local/bin/promtool

# Copy config files
sudo cp -r consoles /etc/prometheus
sudo cp -r console_libraries /etc/prometheus

# Set ownership
sudo chown -R prometheus:prometheus /etc/prometheus/consoles
sudo chown -R prometheus:prometheus /etc/prometheus/console_libraries

# Clean up
cd ~
rm -rf /tmp/prometheus-2.48.0.linux-arm64*
```

---

### **Step 5: Configure Prometheus**

```bash
# Create config file
sudo nano /etc/prometheus/prometheus.yml
```

**Copy and paste this entire configuration:**

```yaml
global:
  scrape_interval: 15s

scrape_configs:
  # Prometheus itself
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  # Raspberry Pi
  - job_name: 'raspberry-pi'
    static_configs:
      - targets: ['localhost:9100']

  # Hetzner VPS (replace with your VPS IP)
  - job_name: 'hetzner-vps'
    static_configs:
      - targets: ['46.62.235.95:9100']
```

**Save and exit:**
- Press `Ctrl+X`
- Press `Y`
- Press `Enter`

**Set permissions:**

```bash
sudo chown prometheus:prometheus /etc/prometheus/prometheus.yml
```

---

### **Step 6: Create Prometheus Service**

```bash
# Create service file
sudo nano /etc/systemd/system/prometheus.service
```

**Copy and paste this:**

```ini
[Unit]
Description=Prometheus
Wants=network-online.target
After=network-online.target

[Service]
User=prometheus
Group=prometheus
Type=simple
ExecStart=/usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries

[Install]
WantedBy=multi-user.target
```

**Save and exit** (Ctrl+X, Y, Enter)

---

### **Step 7: Start Prometheus**

```bash
# Reload systemd
sudo systemctl daemon-reload

# Start Prometheus
sudo systemctl start prometheus

# Check status (should say "active (running)" in green)
sudo systemctl status prometheus

# Press Q to exit status view

# Enable on boot
sudo systemctl enable prometheus
```

---

### **Step 8: Test Prometheus**

**From your Mac, open browser:**

```
http://solvy-monitor.local:9090
```

**Or:**

```
http://[your-pi-ip]:9090
```

**You should see the Prometheus web interface!** 🎉

---

## 📈 PHASE 3: Install Node Exporter (System Metrics)

**This collects CPU, RAM, disk, network stats.**

### **Step 1: Install on Raspberry Pi**

```bash
# Download Node Exporter
cd /tmp
wget https://github.com/prometheus/node_exporter/releases/download/v1.7.0/node_exporter-1.7.0.linux-arm64.tar.gz

# Extract
tar -xvf node_exporter-1.7.0.linux-arm64.tar.gz

# Copy binary
sudo cp node_exporter-1.7.0.linux-arm64/node_exporter /usr/local/bin/

# Set ownership
sudo chown prometheus:prometheus /usr/local/bin/node_exporter

# Clean up
rm -rf /tmp/node_exporter-1.7.0.linux-arm64*
```

---

### **Step 2: Create Node Exporter Service**

```bash
# Create service file
sudo nano /etc/systemd/system/node_exporter.service
```

**Copy and paste:**

```ini
[Unit]
Description=Node Exporter
Wants=network-online.target
After=network-online.target

[Service]
User=prometheus
Group=prometheus
Type=simple
ExecStart=/usr/local/bin/node_exporter

[Install]
WantedBy=multi-user.target
```

**Save and exit** (Ctrl+X, Y, Enter)

---

### **Step 3: Start Node Exporter**

```bash
# Reload systemd
sudo systemctl daemon-reload

# Start Node Exporter
sudo systemctl start node_exporter

# Check status
sudo systemctl status node_exporter

# Enable on boot
sudo systemctl enable node_exporter
```

---

### **Step 4: Test Node Exporter**

```bash
# Test locally
curl http://localhost:9100/metrics | head -20
```

**You should see metrics!** 📊

---

## 🖥️ PHASE 4: Install Node Exporter on Hetzner VPS

**SSH into your Hetzner VPS from your Mac:**

```bash
ssh -i ~/.ssh/hetzner_key root@46.62.235.95
```

**Then run these commands:**

```bash
# Download Node Exporter (x86_64 for Hetzner)
cd /tmp
wget https://github.com/prometheus/node_exporter/releases/download/v1.7.0/node_exporter-1.7.0.linux-amd64.tar.gz

# Extract
tar -xvf node_exporter-1.7.0.linux-amd64.tar.gz

# Copy binary
sudo cp node_exporter-1.7.0.linux-amd64/node_exporter /usr/local/bin/

# Create user
sudo useradd --no-create-home --shell /bin/false node_exporter
sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter

# Create service
sudo cat > /etc/systemd/system/node_exporter.service << 'EOF'
[Unit]
Description=Node Exporter
Wants=network-online.target
After=network-online.target

[Service]
User=node_exporter
Group=node_exporter
Type=simple
ExecStart=/usr/local/bin/node_exporter

[Install]
WantedBy=multi-user.target
EOF

# Start service
sudo systemctl daemon-reload
sudo systemctl start node_exporter
sudo systemctl enable node_exporter

# Check status
sudo systemctl status node_exporter

# Clean up
rm -rf /tmp/node_exporter-1.7.0.linux-amd64*

# Exit VPS
exit
```

**Now Prometheus on your Pi can monitor your VPS!** 🚀

---

## 🎨 PHASE 5: Install Grafana (Beautiful Dashboards)

**Back on your Raspberry Pi:**

```bash
# SSH into Pi (if not already)
ssh solvy@solvy-monitor.local
```

### **Step 1: Install Grafana**

```bash
# Add Grafana repository
sudo apt install -y software-properties-common
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee /etc/apt/sources.list.d/grafana.list

# Update and install
sudo apt update
sudo apt install -y grafana

# Start Grafana
sudo systemctl start grafana-server

# Enable on boot
sudo systemctl enable grafana-server

# Check status
sudo systemctl status grafana-server
```

---

### **Step 2: Access Grafana**

**From your Mac, open browser:**

```
http://solvy-monitor.local:3000
```

**Or:**

```
http://[your-pi-ip]:3000
```

**Default login:**
- Username: `admin`
- Password: `admin`

**You'll be prompted to change the password - DO IT!**

---

### **Step 3: Add Prometheus as Data Source**

1. **Click the gear icon ⚙️** (left sidebar) → **Data Sources**
2. **Click "Add data source"**
3. **Select "Prometheus"**
4. **Configure:**
   - Name: `Prometheus`
   - URL: `http://localhost:9090`
   - Leave everything else default
5. **Click "Save & Test"**

**You should see "Data source is working"!** ✅

---

### **Step 4: Import Dashboard**

1. **Click the + icon** (left sidebar) → **Import**
2. **Enter dashboard ID**: `1860`
3. **Click "Load"**
4. **Select "Prometheus"** as data source
5. **Click "Import"**

**BOOM! You now have a beautiful dashboard!** 🎉

**You'll see:**
- CPU usage
- Memory usage
- Disk space
- Network traffic
- System uptime

---

### **Step 5: Add Hetzner VPS Dashboard**

1. **Click + icon** → **Import**
2. **Enter dashboard ID**: `1860` (same one)
3. **Click "Load"**
4. **Name it**: `Hetzner VPS`
5. **Select "Prometheus"** as data source
6. **In "Job" dropdown**, select: `hetzner-vps`
7. **Click "Import"**

**Now you're monitoring BOTH your Pi and your VPS!** 🚀

---

## 🏛️ PHASE 6: Create MAN Dashboard (Transparency)

**This is where you show cooperative members what's happening.**

### **Step 1: Create New Dashboard**

1. **Click + icon** → **Create** → **Dashboard**
2. **Click "Add visualization"**
3. **Select "Prometheus"** as data source

---

### **Step 2: Add Panels**

**Panel 1: System Health**

- **Query**: `up`
- **Title**: "System Health"
- **Visualization**: Stat
- **Thresholds**: 
  - Green: 1 (up)
  - Red: 0 (down)

**Panel 2: CPU Usage**

- **Query**: `100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)`
- **Title**: "CPU Usage %"
- **Visualization**: Time series
- **Unit**: Percent (0-100)

**Panel 3: Memory Usage**

- **Query**: `(1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100`
- **Title**: "Memory Usage %"
- **Visualization**: Gauge
- **Unit**: Percent (0-100)

**Panel 4: Disk Space**

- **Query**: `100 - ((node_filesystem_avail_bytes{mountpoint="/"} / node_filesystem_size_bytes{mountpoint="/"}) * 100)`
- **Title**: "Disk Usage %"
- **Visualization**: Gauge
- **Unit**: Percent (0-100)

---

### **Step 3: Save Dashboard**

1. **Click the save icon** (disk icon, top right)
2. **Name**: `MAN - Mandatory Audit Network`
3. **Click "Save"**

---

## 🗳️ PHASE 7: Create DAO Dashboard (Governance)

**For tracking proposals and voting.**

### **Step 1: Create New Dashboard**

1. **Click + icon** → **Create** → **Dashboard**
2. **Add panels** (similar to above)

**For now, use placeholder metrics:**

- **Active Proposals**: `count(up)` (placeholder)
- **System Uptime**: `time() - node_boot_time_seconds`
- **Total Transactions**: `rate(up[1h])` (placeholder)

**Later, you'll replace these with real SOLVY Card metrics!**

### **Step 2: Save Dashboard**

- **Name**: `DAO Control - Governance`
- **Click "Save"**

---

## 🔔 PHASE 8: Set Up Alerts

### **Step 1: Create Alert Rule**

1. **Click the bell icon** 🔔 (left sidebar) → **Alert rules**
2. **Click "New alert rule"**

**Alert: High CPU Usage**

- **Name**: High CPU Usage
- **Query**: `100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80`
- **Condition**: Alert when above 80%
- **For**: 5 minutes
- **Summary**: "CPU usage is above 80%"

3. **Click "Save"**

---

### **Step 2: Create Contact Point**

1. **Click bell icon** → **Contact points**
2. **Click "New contact point"**
3. **Choose**:
   - **Email** (enter your email)
   - Or **Webhook** (for custom notifications)
4. **Click "Save"**

---

## 📱 PHASE 9: Access from Anywhere

### **Option A: Local Network Only (Current Setup)**

**Already works!**

- From Mac: `http://solvy-monitor.local:3000`
- From phone (on same WiFi): `http://[pi-ip]:3000`

---

### **Option B: Secure Remote Access (Advanced)**

**Use Tailscale for secure remote access:**

```bash
# On Raspberry Pi
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up

# On your Mac
# Download Tailscale: https://tailscale.com/download
# Install and sign in with same account

# Now access from ANYWHERE:
# http://solvy-monitor:3000
```

---

## ✅ SUCCESS CHECKLIST

After completing this guide, you should have:

- [  ] Raspberry Pi 5 set up and running
- [  ] Prometheus collecting metrics
- [  ] Node Exporter on Pi
- [  ] Node Exporter on Hetzner VPS
- [  ] Grafana installed with dashboards
- [  ] Monitoring Raspberry Pi health
- [  ] Monitoring Hetzner VPS health
- [  ] MAN dashboard created
- [  ] DAO dashboard created
- [  ] Alerts configured
- [  ] Access from Mac working

---

## 🆘 TROUBLESHOOTING

### **"Can't access Grafana at :3000"**

```bash
# Check if Grafana is running
sudo systemctl status grafana-server

# Restart Grafana
sudo systemctl restart grafana-server

# Check firewall
sudo ufw allow 3000
```

---

### **"Prometheus not collecting metrics"**

```bash
# Check Prometheus logs
sudo journalctl -u prometheus -f

# Verify config
/usr/local/bin/promtool check config /etc/prometheus/prometheus.yml

# Restart Prometheus
sudo systemctl restart prometheus
```

---

### **"Can't SSH into Pi"**

```bash
# From Mac, try IP address instead of hostname
ssh solvy@192.168.1.100

# Check if Pi is on network
ping solvy-monitor.local

# Check router for Pi's IP address
```

---

### **"Node Exporter not working"**

```bash
# Check if running
sudo systemctl status node_exporter

# Test manually
curl http://localhost:9100/metrics

# Restart
sudo systemctl restart node_exporter
```

---

## 🎉 YOU DID IT!

**You now have:**

✅ **24/7 Monitoring** - Raspberry Pi watching everything  
✅ **Beautiful Dashboards** - Grafana showing real-time metrics  
✅ **Transparency** - MAN dashboard for cooperative members  
✅ **Governance Tracking** - DAO dashboard ready  
✅ **Alerts** - Get notified when things break  
✅ **Sovereign Infrastructure** - You control your own monitoring  

---

## 🚀 NEXT STEPS

### **After SOLVY Card Launches:**

1. Add SOLVY Card API metrics to Prometheus
2. Track member signups in real-time
3. Monitor transaction volume
4. Show profit distributions on MAN dashboard
5. Track DAO proposals and votes

### **Advanced (Later):**

1. Add Stripe metrics (revenue, transactions)
2. Add blockchain metrics (when you migrate to Web3)
3. Create mobile app for monitoring (Grafana has one!)
4. Set up email/SMS alerts
5. Add more dashboards for different audiences

---

## 📚 LEARN MORE

- **Prometheus**: https://prometheus.io/docs/
- **Grafana**: https://grafana.com/docs/
- **Node Exporter**: https://github.com/prometheus/node_exporter
- **Raspberry Pi**: https://www.raspberrypi.com/documentation/

---

**Prepared by**: Manus AI  
**For**: Sean Maurice Mayo (SA Nathan)  
**Date**: November 19, 2025  
**Purpose**: MAN + DAO Control Dashboard

*Solutions Valued You - Transparent, Sovereign, Unstoppable* 🚀
