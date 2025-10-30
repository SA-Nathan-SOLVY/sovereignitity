from http.server import BaseHTTPRequestHandler
import json
import os

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))
        
        income = float(data.get('income', 0))
        expenses = float(data.get('expenses', 0))
        
        # Calculate net income
        net_income = income - expenses
        
        # Self-employment tax (15.3%)
        se_tax = net_income * 0.153
        
        # Income tax (simplified 22% bracket)
        income_tax = net_income * 0.22
        
        # Total tax
        total_tax = se_tax + income_tax
        
        # Effective rate
        effective_rate = (total_tax / net_income * 100) if net_income > 0 else 0
        
        # Take home
        take_home = net_income - total_tax
        
        # Tax optimization suggestions
        suggestions = []
        if expenses < income * 0.3:
            suggestions.append("Consider tracking more business expenses - many self-employed miss 30-40% of deductible expenses")
        if net_income > 50000:
            suggestions.append("You may benefit from S-Corp election to reduce self-employment tax")
        if income > 100000:
            suggestions.append("Consider setting up a SEP-IRA or Solo 401(k) for additional tax savings")
        
        result = {
            'netIncome': round(net_income, 2),
            'selfEmploymentTax': round(se_tax, 2),
            'incomeTax': round(income_tax, 2),
            'totalTax': round(total_tax, 2),
            'effectiveRate': round(effective_rate, 2),
            'takeHome': round(take_home, 2),
            'suggestions': suggestions
        }
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(result).encode())
        return
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        return

