import random
from datetime import datetime, timedelta

class SOLVYDebitCardConnector:
    def __init__(self):
        self.connected = True
    
    def generate_connection_report(self):
        status = "connected" if self.connected else "disconnected"
        return {
            "status": status,
            "timestamp": datetime.now().isoformat(),
            "message": f"SOLVY API {status} successfully",
            "response_time": f"{random.uniform(0.1, 0.5):.2f}s"
        }
    
    def get_debit_card_data(self, use_backup=False):
        # Mock debit card data - replace with real API calls
        cards = [
            {
                "id": 1,
                "card_number": "**** **** **** 1234",
                "balance": round(random.uniform(1000, 5000), 2),
                "currency": "USD",
                "status": "active",
                "transactions_this_month": random.randint(5, 25)
            },
            {
                "id": 2, 
                "card_number": "**** **** **** 5678",
                "balance": round(random.uniform(500, 2000), 2),
                "currency": "USD",
                "status": "active",
                "transactions_this_month": random.randint(2, 15)
            }
        ]
        
        return {
            "cards": cards,
            "total_balance": sum(card['balance'] for card in cards),
            "as_of": datetime.now().isoformat()
        }

class SOLVYDataIntegrator:
    def create_complete_financial_dashboard(self):
        connector = SOLVYDebitCardConnector()
        card_data = connector.get_debit_card_data()
        
        # Generate mock financial data
        revenue = random.randint(50000, 150000)
        expenses = random.randint(30000, 80000)
        
        return {
            "financial_overview": {
                "revenue": revenue,
                "expenses": expenses,
                "profit": revenue - expenses,
                "profit_margin": round(((revenue - expenses) / revenue) * 100, 2)
            },
            "card_data": card_data,
            "recent_activity": {
                "transactions_today": random.randint(0, 5),
                "weekly_spending": round(random.uniform(500, 2000), 2),
                "monthly_spending": round(random.uniform(2000, 8000), 2)
            },
            "last_updated": datetime.now().isoformat()
        }
