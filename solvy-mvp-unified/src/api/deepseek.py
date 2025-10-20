from http.server import BaseHTTPRequestHandler
import json
import os
import urllib.request
import urllib.error

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            question = data.get('question', '')
            context = data.get('context', {})
            
            # Get DeepSeek API key from environment
            api_key = os.environ.get('DEEPSEEK_API_KEY', '')
            
            if not api_key:
                self.send_error_response(500, 'DeepSeek API key not configured')
                return
            
            # Prepare prompt for tax assistance
            prompt = f"""You are a tax assistant for self-employed professionals. 
            
User Question: {question}

Context:
- Income: ${context.get('income', 0)}
- Expenses: ${context.get('expenses', 0)}
- Business Type: {context.get('businessType', 'Self-employed')}

Provide specific, actionable tax advice. Be concise and focus on practical steps."""

            # Call DeepSeek API
            deepseek_url = 'https://api.deepseek.com/v1/chat/completions'
            request_data = {
                'model': 'deepseek-chat',
                'messages': [
                    {'role': 'system', 'content': 'You are a helpful tax assistant for self-employed professionals.'},
                    {'role': 'user', 'content': prompt}
                ],
                'temperature': 0.7,
                'max_tokens': 500
            }
            
            req = urllib.request.Request(
                deepseek_url,
                data=json.dumps(request_data).encode('utf-8'),
                headers={
                    'Content-Type': 'application/json',
                    'Authorization': f'Bearer {api_key}'
                }
            )
            
            with urllib.request.urlopen(req) as response:
                result = json.loads(response.read().decode('utf-8'))
                answer = result['choices'][0]['message']['content']
                
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'answer': answer}).encode())
                
        except urllib.error.HTTPError as e:
            self.send_error_response(e.code, f'DeepSeek API error: {e.reason}')
        except Exception as e:
            self.send_error_response(500, f'Server error: {str(e)}')
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def send_error_response(self, code, message):
        self.send_response(code)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps({'error': message}).encode())

