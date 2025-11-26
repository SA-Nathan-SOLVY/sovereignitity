"""
Gunicorn configuration for SOLVY production deployment
"""
import multiprocessing
import os

# Ensure working directory is set correctly for imports
os.chdir('/var/www/sovereignitity/backend')

# Server socket
bind = "0.0.0.0:5001"  # Listen on all interfaces, port 5001
backlog = 2048

# Worker processes
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = "sync"
worker_connections = 1000
timeout = 30
keepalive = 2

# Logging
accesslog = "/var/log/solvy/gunicorn_access.log"
errorlog = "/var/log/solvy/gunicorn_error.log"
loglevel = "info"

# Process naming
proc_name = "solvy-api"

# Server mechanics
daemon = False
pidfile = "/var/run/solvy/gunicorn.pid"
umask = 0
user = None
group = None
tmp_upload_dir = None

# SSL (optional, for HTTPS)
# keyfile = "/etc/ssl/private/solvy.key"
# certfile = "/etc/ssl/certs/solvy.crt"

# Server hooks
def on_starting(server):
    print("🚀 SOLVY API starting with Gunicorn...")

def when_ready(server):
    print("✓ SOLVY API ready. Listening on 0.0.0.0:5001")
