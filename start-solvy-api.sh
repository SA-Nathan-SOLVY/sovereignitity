#!/bin/bash
# SOLVY Gunicorn startup script for VPS

set -e

BACKEND_DIR="/var/www/sovereignitity/backend"
VENV="${BACKEND_DIR}/.venv"
CONFIG="${BACKEND_DIR}/../gunicorn_config.py"
PID_FILE="/var/run/solvy/gunicorn.pid"
LOG_DIR="/var/log/solvy"

# Ensure directories exist
sudo mkdir -p /var/log/solvy /var/run/solvy
sudo chown www-data:www-data /var/log/solvy /var/run/solvy

echo "🚀 Starting SOLVY API with Gunicorn..."
echo "Backend directory: $BACKEND_DIR"
echo "Config file: $CONFIG"

# Activate venv and start Gunicorn
cd "$BACKEND_DIR"
source "${VENV}/bin/activate"

# Start Gunicorn
exec gunicorn \
  -c "${CONFIG}" \
  -u www-data \
  -g www-data \
  app_production:app

echo "✓ SOLVY API started"
