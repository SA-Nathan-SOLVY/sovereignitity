"""
PMC Founding Members signup endpoint.
Accepts POST requests with member details and logs/stores signups.
"""
from flask import Blueprint, request, jsonify
from datetime import datetime
import json
import os

contact_eva_bp = Blueprint('contact_eva', __name__)

# Log file for PMC signups
SIGNUPS_LOG = os.path.join(os.path.dirname(__file__), '../pmc_signups.json')

@contact_eva_bp.route('/contact-eva', methods=['POST'])
def contact_eva():
    """
    Receive PMC Founding Member signup requests.
    
    Expected JSON payload:
    {
        "name": "Business Name",
        "pmc_id": "PMC-001",
        "email": "contact@business.com",
        "business": "Service Type",
        "plan": "Founding 50",
        "price": 24.99
    }
    """
    try:
        data = request.get_json()
        
        # Validate required fields
        required = ['name', 'email', 'pmc_id', 'business']
        if not all(data.get(field) for field in required):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Create signup record with timestamp
        signup = {
            'timestamp': datetime.utcnow().isoformat(),
            'name': data.get('name', '').strip(),
            'pmc_id': data.get('pmc_id', '').strip(),
            'email': data.get('email', '').strip(),
            'business': data.get('business', '').strip(),
            'plan': data.get('plan', 'Founding 50'),
            'price': data.get('price', 24.99)
        }
        
        # Load existing signups or create new list
        signups = []
        if os.path.exists(SIGNUPS_LOG):
            try:
                with open(SIGNUPS_LOG, 'r') as f:
                    signups = json.load(f)
            except (json.JSONDecodeError, IOError):
                signups = []
        
        # Append new signup
        signups.append(signup)
        
        # Write back to file
        with open(SIGNUPS_LOG, 'w') as f:
            json.dump(signups, f, indent=2)
        
        # Log to console
        print(f"[PMC SIGNUP] {signup['name']} ({signup['pmc_id']}) - {signup['email']}")
        
        return jsonify({
            'status': 'success',
            'message': 'Thank you! Your PMC application has been received. We will contact you within 24 hours.',
            'signup_id': len(signups)
        }), 200
    
    except Exception as e:
        print(f"[PMC SIGNUP ERROR] {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500
