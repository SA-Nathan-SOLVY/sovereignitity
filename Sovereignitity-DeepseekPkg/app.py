import os
from flask import Flask, render_template, jsonify
from flask_cors import CORS
from tax_assistant import tax_bp

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

# Create Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')

# Enable CORS for frontend integration
CORS(app, origins=['http://localhost:3000', 'http://localhost:5173'])

# Register the tax assistant blueprint
app.register_blueprint(tax_bp)

@app.route('/')
def index():
    """Main index route"""
    return jsonify({
        "message": "SOVEREIGNITITY™ Tax Assistant API",
        "status": "running",
        "endpoints": [
            "/api/tax/analyze - POST - Analyze tax situation",
            "/api/tax/scenarios - GET - Get available scenarios", 
            "/api/tax/health - GET - Health check",
            "/tax-assistant - GET - Tax assistant page"
        ]
    })

@app.route('/tax-assistant')
def tax_assistant_page():
    """Tax assistant page route"""
    return jsonify({
        "message": "Tax Assistant Interface",
        "description": "DeepSeek AI-powered tax optimization",
        "api_status": "ready"
    })

@app.route('/health')
def health():
    """General health check"""
    return jsonify({
        "status": "healthy",
        "service": "SOVEREIGNITITY™ Tax Assistant",
        "deepseek_configured": bool(os.getenv('DEEPSEEK_API_KEY'))
    })

if __name__ == '__main__':
    # Set environment variables
    os.environ['DEEPSEEK_API_KEY'] = 'sk-a2a594aeb4d745e0ba1a4e21c499884f'
    
    print("🚀 Starting SOVEREIGNITITY™ Tax Assistant API...")
    print("📊 DeepSeek AI Integration: ENABLED")
    print("🔑 API Key Configured:", "✅" if os.getenv('DEEPSEEK_API_KEY') else "❌")
    print("🌐 Server starting on http://localhost:5001")
    print("\n📋 Test with:")
    print("curl -X POST http://localhost:5001/api/tax/analyze \\")
    print("  -H \"Content-Type: application/json\" \\")
    print("  -d '{\"financial_data\": \"W2 income $65,000, mortgage interest $12,000, self-employment income $20,000 with $5,000 expenses\"}'")
    
    app.run(debug=True, host='0.0.0.0', port=5001)

