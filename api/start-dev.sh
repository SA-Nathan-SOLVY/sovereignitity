#!/bin/bash

# SOLVY API - Development Server Startup Script

echo "🚀 Starting SOLVY Platform API (Development Mode)"
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Copying from .env.example..."
    cp .env.example .env
    echo "⚠️  Please edit .env with your API keys before continuing!"
    echo ""
    read -p "Press Enter after editing .env file..."
fi

# Start the server
echo ""
echo "✅ Starting FastAPI server..."
echo "📊 API Documentation: http://localhost:8000/docs"
echo "🔍 Health Check: http://localhost:8000/health"
echo ""

uvicorn app.main:app --reload --port 8000

