"""
SOLVY MVP Backend API
Flask application serving SOVEREIGNITITY™ platform data
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
from tax_calculations import calculate_self_employment_tax, optimize_expenses, quarterly_estimates
from solvy_connector import (
    get_dashboard_data,
    get_roadmap_data,
    get_pilot_data,
    get_remittances_data,
    get_competitive_data,
    test_connections
)

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

# Health check
@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        "status": "healthy",
        "service": "SOLVY MVP API",
        "version": "1.0.0"
    })

# Dashboard data
@app.route('/api/dashboard', methods=['GET'])
def dashboard():
    """Get complete financial dashboard with real business data"""
    return jsonify(get_dashboard_data())

# Roadmap
@app.route('/api/roadmap', methods=['GET'])
def roadmap():
    """Get phased rollout roadmap"""
    return jsonify(get_roadmap_data())

# Live pilot data
@app.route('/api/pilot', methods=['GET'])
def pilot():
    """Get live pilot program data"""
    return jsonify(get_pilot_data())

# Remittances vision
@app.route('/api/remittances', methods=['GET'])
def remittances():
    """Get remittances program vision"""
    return jsonify(get_remittances_data())

# Competitive analysis
@app.route('/api/competitive', methods=['GET'])
def competitive():
    """Get competitive analysis vs Jim Card, Square, etc."""
    return jsonify(get_competitive_data())

# Connection test
@app.route('/api/connections', methods=['GET'])
def connections():
    """Test connections to payment providers"""
    return jsonify(test_connections())

# Tax calculations
@app.route('/api/tax/calculate', methods=['POST'])
def calculate_tax():
    """Calculate self-employment taxes"""
    data = request.json
    income = data.get('income', 0)
    expenses = data.get('expenses', 0)
    
    result = calculate_self_employment_tax(income, expenses)
    return jsonify(result)

# Expense optimization
@app.route('/api/tax/optimize', methods=['POST'])
def optimize():
    """Get expense optimization suggestions"""
    data = request.json
    income = data.get('income', 0)
    current_expenses = data.get('expenses', 0)
    
    result = optimize_expenses(income, current_expenses)
    return jsonify(result)

# Quarterly estimates
@app.route('/api/tax/quarterly', methods=['POST'])
def quarterly():
    """Calculate quarterly tax estimates"""
    data = request.json
    annual_income = data.get('annual_income', 0)
    
    result = quarterly_estimates(annual_income)
    return jsonify(result)

# SOVEREIGNITITY explanation
@app.route('/api/about/sovereignitity', methods=['GET'])
def sovereignitity_concept():
    """Explain the SOVEREIGNITITY concept"""
    return jsonify({
        "name": "SOVEREIGNITITY™",
        "tagline": "Solutions Valued You",
        "concept": "A new word created from 'Sovereign' + 'Identity'",
        "meaning": "Self-sovereign data identity in financial systems",
        "core_principles": [
            "You own your data",
            "You control your financial identity",
            "You benefit from cooperative ownership",
            "No intermediaries exploiting your information"
        ],
        "vision": {
            "current": "Tax-first approach with Stripe virtual cards for self-employed",
            "near_term": "Cooperative banking system with real-time settlements",
            "future": "Global remittances - ship cards overseas to connect families and eliminate fees"
        },
        "real_world_demo": [
            "Evergreen Beauty Lounge - Wife's cosmetology business",
            "VA Contracts - Virtual assistant payments",
            "Family Network - Cooperative payment system"
        ],
        "creator": "SA Nathan"
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=False)

