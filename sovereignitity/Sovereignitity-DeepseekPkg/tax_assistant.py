import os
import requests
from flask import Blueprint, request, jsonify, current_app
from functools import wraps
import json

# Create blueprint for tax assistant routes
tax_bp = Blueprint('tax_assistant', __name__)

class DeepSeekTaxAssistant:
    def __init__(self):
        self.api_key = os.getenv('DEEPSEEK_API_KEY', 'sk-a2a594aeb4d745e0ba1a4e21c499884f')
        self.base_url = "https://api.deepseek.com/v1/chat/completions"
        self.headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}"
        }
    
    def analyze_tax_situation(self, user_data, tax_scenario="general"):
        """Main tax analysis method"""
        
        tax_prompts = {
            "self_employment": """
            As a tax expert specializing in self-employment, analyze this financial data:
            
            KEY FOCUS AREAS:
            1. Home Office Deduction - Calculate square footage percentage
            2. Vehicle & Mileage - Standard vs actual expense method
            3. Business Supplies & Equipment - Section 179 deductions
            4. Health Insurance Premiums - Self-employed deduction
            5. Retirement Contributions - SEP IRA vs Solo 401k options
            6. Quarterly Estimated Taxes - Calculate safe harbor payments
            
            Provide specific dollar estimates and IRS form references.
            """,
            
            "small_business": """
            As a small business tax specialist, analyze this LLC/partnership data:
            
            KEY FOCUS AREAS:
            1. Business Structure Optimization - LLC vs S-Corp analysis
            2. Qualified Business Income (QBI) Deduction - 20% pass-through
            3. Reasonable Salary Requirements - S-Corp optimization
            4. Employee Benefits - Health reimbursement arrangements
            5. Business Credit Opportunities - R&D, Work Opportunity credits
            6. Depreciation Strategies - Bonus depreciation vs Section 179
            
            Provide actionable recommendations with tax form references.
            """,
            
            "general": """
            As a comprehensive tax advisor, analyze this financial situation:
            
            Provide a structured analysis covering:
            1. INCOME OPTIMIZATION - W2, 1099, investment income structuring
            2. DEDUCTION MAXIMIZATION - Standard vs itemized comparison
            3. CREDIT IDENTIFICATION - Child tax credit, education credits
            4. RETIREMENT PLANNING - Traditional vs Roth optimization
            5. TAX LIABILITY ESTIMATE - Federal and state projections
            6. DOCUMENT CHECKLIST - Required forms and receipts
            
            Focus on practical, actionable advice.
            """
        }
        
        prompt = f"""
        USER FINANCIAL DATA:
        {user_data}
        
        SPECIALIZED ANALYSIS REQUEST:
        {tax_prompts.get(tax_scenario, tax_prompts['general'])}
        
        REQUIREMENTS:
        - Return structured JSON format
        - Include specific dollar amounts where possible
        - Reference relevant IRS forms and schedules
        - Provide confidence level for recommendations
        - Include potential audit flags to avoid
        """
        
        payload = {
            "model": "deepseek-chat",
            "messages": [
                {
                    "role": "system", 
                    "content": "You are a certified tax professional (CPA) with 20 years experience. Provide accurate, conservative tax advice. Always recommend consulting with a local tax professional for final decisions. Return responses in structured JSON format."
                },
                {
                    "role": "user", 
                    "content": prompt
                }
            ],
            "temperature": 0.1,
            "max_tokens": 2000
        }
        
        try:
            response = requests.post(self.base_url, headers=self.headers, json=payload, timeout=30)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return {"error": f"API request failed: {str(e)}"}
        except Exception as e:
            return {"error": f"Unexpected error: {str(e)}"}

# Initialize the tax assistant
tax_ai = DeepSeekTaxAssistant()

# Rate limiting decorator (simple version)
def limit_requests(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Add your rate limiting logic here
        # For now, we'll just pass through
        return f(*args, **kwargs)
    return decorated_function

@tax_bp.route('/api/tax/analyze', methods=['POST'])
@limit_requests
def analyze_taxes():
    """Main tax analysis endpoint"""
    try:
        data = request.get_json()
        
        if not data or 'financial_data' not in data:
            return jsonify({"error": "Missing financial_data"}), 400
        
        financial_data = data['financial_data']
        tax_scenario = data.get('tax_scenario', 'general')
        
        # Validate input data
        if len(financial_data.strip()) < 10:
            return jsonify({"error": "Please provide more detailed financial information"}), 400
        
        # Call DeepSeek API
        analysis_result = tax_ai.analyze_tax_situation(financial_data, tax_scenario)
        
        if "error" in analysis_result:
            return jsonify({"error": analysis_result["error"]}), 500
            
        return jsonify({
            "success": True,
            "analysis": analysis_result,
            "disclaimer": "This AI analysis is for educational purposes only. Please consult with a qualified tax professional for personalized advice."
        })
        
    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500

@tax_bp.route('/api/tax/scenarios', methods=['GET'])
def get_tax_scenarios():
    """Get available tax analysis scenarios"""
    return jsonify({
        "scenarios": [
            {"id": "general", "name": "General Tax Analysis", "description": "Comprehensive personal tax review"},
            {"id": "self_employment", "name": "Self-Employment", "description": "1099, freelancers, independent contractors"},
            {"id": "small_business", "name": "Small Business", "description": "LLC, partnerships, S-Corp optimization"},
            {"id": "investor", "name": "Investor", "description": "Stocks, crypto, rental properties"},
            {"id": "family", "name": "Family", "description": "Married filing jointly, dependents, education"}
        ]
    })

@tax_bp.route('/api/tax/health', methods=['GET'])
def health_check():
    """Check if tax assistant is working"""
    try:
        test_data = "Test health check - single W2 income $50,000, standard deduction"
        result = tax_ai.analyze_tax_situation(test_data)
        return jsonify({"status": "healthy", "api_connected": "error" not in result})
    except Exception as e:
        return jsonify({"status": "unhealthy", "error": str(e)}), 500

