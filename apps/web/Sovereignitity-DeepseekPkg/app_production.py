import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from tax_calculations import TaxAssistant
from solvy_connector import SOLVYDebitCardConnector, SOLVYDataIntegrator

# Create Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'solvy-mvp-secret-key-2025')

# Enable CORS for all origins
CORS(app, resources={r"/*": {"origins": "*"}})

# Initialize services
tax_assistant = TaxAssistant()
solvy_connector = SOLVYDebitCardConnector()
solvy_integrator = SOLVYDataIntegrator()

@app.route('/')
def index():
    """Main index route"""
    return jsonify({
        "service": "SOVEREIGNITITY™ MVP API",
        "version": "1.0.0",
        "status": "running",
        "features": [
            "DeepSeek AI Tax Assistant",
            "SOLVY Debit Card Integration",
            "Financial Dashboard"
        ],
        "endpoints": {
            "tax": [
                "/api/tax/calculate - POST - Calculate tax liability",
                "/api/tax/optimize-expenses - POST - Optimize business expenses",
                "/api/tax/quarterly-estimates - POST - Calculate quarterly estimates"
            ],
            "solvy": [
                "/api/solvy/connection-test - GET - Test SOLVY endpoints",
                "/api/solvy/dashboard - GET - Get financial dashboard",
                "/api/solvy/card-data - GET - Get debit card data"
            ],
            "health": [
                "/health - GET - Service health check"
            ]
        }
    })

# ===== TAX ASSISTANT ENDPOINTS =====

@app.route('/api/tax/calculate', methods=['POST', 'OPTIONS'])
def calculate_tax():
    """Calculate tax liability"""
    if request.method == 'OPTIONS':
        return '', 204
        
    try:
        data = request.json
        income = float(data.get('income', 0))
        filing_status = data.get('filing_status', 'single')
        
        result = tax_assistant.calculate_marginal_tax(income, filing_status)
        
        return jsonify({
            'success': True,
            'data': result
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@app.route('/api/tax/optimize-expenses', methods=['POST', 'OPTIONS'])
def optimize_expenses():
    """Optimize business expenses"""
    if request.method == 'OPTIONS':
        return '', 204
        
    try:
        data = request.json
        revenue = float(data.get('revenue', 0))
        expenses = data.get('expenses', {})
        
        # Convert expense values to float
        expenses = {k: float(v) for k, v in expenses.items()}
        
        result = tax_assistant.optimize_business_expenses(revenue, expenses)
        
        return jsonify({
            'success': True,
            'data': result
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@app.route('/api/tax/quarterly-estimates', methods=['POST', 'OPTIONS'])
def quarterly_estimates():
    """Calculate quarterly tax estimates"""
    if request.method == 'OPTIONS':
        return '', 204
        
    try:
        data = request.json
        projected_income = float(data.get('projected_income', 0))
        filing_status = data.get('filing_status', 'single')
        ytd_income = float(data.get('ytd_income', 0))
        
        result = tax_assistant.calculate_quarterly_estimates(
            projected_income, 
            filing_status, 
            ytd_income
        )
        
        return jsonify({
            'success': True,
            'data': result
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

# ===== SOLVY DEBIT CARD ENDPOINTS =====

@app.route('/api/solvy/connection-test', methods=['GET'])
def test_solvy_connection():
    """Test SOLVY endpoint connections"""
    try:
        report = solvy_connector.generate_connection_report()
        
        return jsonify({
            'success': True,
            'data': report
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/solvy/dashboard', methods=['GET'])
def get_solvy_dashboard():
    """Get complete SOLVY financial dashboard"""
    try:
        dashboard = solvy_integrator.create_complete_financial_dashboard()
        
        return jsonify({
            'success': True,
            'data': dashboard
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/solvy/card-data', methods=['GET'])
def get_card_data():
    """Get SOLVY debit card data"""
    try:
        use_backup = request.args.get('use_backup', 'false').lower() == 'true'
        card_data = solvy_connector.get_debit_card_data(use_backup)
        
        return jsonify({
            'success': True,
            'data': card_data
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# ===== HEALTH CHECK =====

@app.route('/health', methods=['GET'])
def health():
    """Service health check"""
    return jsonify({
        "status": "healthy",
        "service": "SOVEREIGNITITY™ MVP API",
        "components": {
            "tax_assistant": "operational",
            "solvy_connector": "operational",
            "solvy_integrator": "operational"
        },
        "timestamp": "2025-10-17"
    })

if __name__ == '__main__':
    print("🚀 SOVEREIGNITITY™ MVP API Starting...")
    print("📊 DeepSeek AI Tax Assistant: ENABLED")
    print("💳 SOLVY Debit Card Integration: ENABLED")
    print("🌐 Server: http://0.0.0.0:5001")
    
    # Run without debug mode for production
    app.run(host='0.0.0.0', port=5001, debug=False)

