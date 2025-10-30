import requests
import json
from typing import Dict, Any, List
from datetime import datetime

class SOLVYDebitCardConnector:
    def __init__(self):
        self.base_urls = {
            'primary': 'https://ebl.beauty',
            'backup': 'https://sovereignitity.vercel.app'
        }
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'SOLVY-Manus-Connector/1.0',
            'Content-Type': 'application/json'
        })

    def test_connection(self) -> Dict[str, Any]:
        """Test connection to both endpoints"""
        results = {}
        
        for name, url in self.base_urls.items():
            try:
                full_url = f"{url}/debit-card"
                response = self.session.get(full_url, timeout=10)
                
                results[name] = {
                    'status': 'success' if response.status_code == 200 else 'failed',
                    'status_code': response.status_code,
                    'url': full_url,
                    'response_time': response.elapsed.total_seconds(),
                    'accessible': response.status_code == 200
                }
                
            except requests.exceptions.RequestException as e:
                results[name] = {
                    'status': 'error',
                    'error': str(e),
                    'url': full_url,
                    'accessible': False
                }
        
        return results

    def get_debit_card_data(self, use_backup: bool = False) -> Dict[str, Any]:
        """Fetch debit card data from the active endpoint"""
        base_url = self.base_urls['backup'] if use_backup else self.base_urls['primary']
        
        try:
            response = self.session.get(f"{base_url}/debit-card", timeout=10)
            
            if response.status_code == 200:
                return {
                    'success': True,
                    'endpoint_used': base_url,
                    'status_code': 200,
                    'content_type': response.headers.get('content-type', ''),
                    'accessible': True,
                    'timestamp': datetime.now().isoformat()
                }
            else:
                return {
                    'success': False,
                    'endpoint_used': base_url,
                    'status_code': response.status_code,
                    'error': f"HTTP {response.status_code}",
                    'accessible': False,
                    'timestamp': datetime.now().isoformat()
                }
                
        except requests.exceptions.RequestException as e:
            return {
                'success': False,
                'endpoint_used': base_url,
                'error': str(e),
                'accessible': False,
                'timestamp': datetime.now().isoformat()
            }

    def generate_connection_report(self) -> Dict[str, Any]:
        """Generate comprehensive connection report"""
        connection_test = self.test_connection()
        primary_data = self.get_debit_card_data(use_backup=False)
        
        if not primary_data.get('success'):
            backup_data = self.get_debit_card_data(use_backup=True)
        else:
            backup_data = {'success': False, 'reason': 'Primary endpoint working'}
        
        report = {
            'generated_at': datetime.now().isoformat(),
            'connection_test': connection_test,
            'primary_endpoint_data': primary_data,
            'backup_endpoint_data': backup_data,
            'recommendations': self._generate_recommendations(connection_test, primary_data)
        }
        
        return report

    def _generate_recommendations(self, connection_test: Dict, primary_data: Dict) -> List[str]:
        """Generate connection recommendations"""
        recommendations = []
        
        primary_status = connection_test.get('primary', {})
        backup_status = connection_test.get('backup', {})
        
        if primary_status.get('accessible'):
            recommendations.append("✅ Primary endpoint (ebl.beauty) is accessible and working")
        else:
            recommendations.append("❌ Primary endpoint is not accessible - check DNS or hosting")
        
        if backup_status.get('accessible'):
            recommendations.append("✅ Backup endpoint (sovereignitity.vercel.app) is accessible")
        else:
            recommendations.append("❌ Backup endpoint is not accessible")
        
        if primary_status.get('accessible') and backup_status.get('accessible'):
            recommendations.append("🎉 Both endpoints are working! You can use either for redundancy")
        elif backup_status.get('accessible'):
            recommendations.append("⚠️ Using backup endpoint only - consider fixing primary endpoint")
        else:
            recommendations.append("🚨 No endpoints accessible - check internet connection and URLs")
        
        return recommendations


class SOLVYDataIntegrator:
    """Integrate SOLVY debit card data with financial analysis"""
    
    def __init__(self):
        self.connector = SOLVYDebitCardConnector()
    
    def create_complete_financial_dashboard(self) -> Dict[str, Any]:
        """Create complete financial dashboard using SOLVY data"""
        report = self.connector.generate_connection_report()
        
        dashboard_data = {
            'dashboard_generated': datetime.now().isoformat(),
            'endpoint_status': report['connection_test'],
            'financial_overview': self._simulate_financial_overview(),
            'recent_activity': self._simulate_recent_activity(),
            'spending_analysis': self._simulate_spending_analysis(),
            'connection_quality': self._assess_connection_quality(report)
        }
        
        return dashboard_data
    
    def _simulate_financial_overview(self) -> Dict[str, Any]:
        """Simulate financial overview data"""
        return {
            'current_balance': 1284.75,
            'available_credit': 5000.00,
            'monthly_spending': 842.50,
            'budget_remaining': 457.25,
            'rewards_points': 1284,
            'account_status': 'Active',
            'last_updated': datetime.now().isoformat()
        }
    
    def _simulate_recent_activity(self) -> List[Dict[str, Any]]:
        """Simulate recent transaction activity"""
        return [
            {
                'date': '2024-10-16',
                'description': 'Whole Foods Market',
                'amount': -84.32,
                'category': 'Groceries',
                'status': 'Completed'
            },
            {
                'date': '2024-10-15',
                'description': 'Direct Deposit',
                'amount': 2500.00,
                'category': 'Income',
                'status': 'Completed'
            },
            {
                'date': '2024-10-14',
                'description': 'Netflix',
                'amount': -15.99,
                'category': 'Entertainment',
                'status': 'Completed'
            },
            {
                'date': '2024-10-13',
                'description': 'Starbucks',
                'amount': -5.75,
                'category': 'Dining',
                'status': 'Completed'
            }
        ]
    
    def _simulate_spending_analysis(self) -> Dict[str, Any]:
        """Simulate spending analysis"""
        return {
            'by_category': {
                'Groceries': 284.32,
                'Dining': 156.75,
                'Entertainment': 89.99,
                'Shopping': 212.44,
                'Utilities': 98.00
            },
            'monthly_trend': {
                'September': 789.50,
                'October': 842.50
            },
            'budget_vs_actual': {
                'budgeted': 1300.00,
                'actual': 842.50,
                'remaining': 457.50
            }
        }
    
    def _assess_connection_quality(self, report: Dict) -> Dict[str, Any]:
        """Assess the quality of the connection"""
        primary = report['connection_test'].get('primary', {})
        backup = report['connection_test'].get('backup', {})
        
        primary_accessible = primary.get('accessible', False)
        backup_accessible = backup.get('accessible', False)
        
        return {
            'overall_score': 85 if primary_accessible else 45,
            'primary_endpoint_health': 'Excellent' if primary_accessible else 'Poor',
            'backup_endpoint_health': 'Excellent' if backup_accessible else 'Poor',
            'recommendation': 'Use primary endpoint' if primary_accessible else 'Use backup endpoint',
            'reliability_score': 90 if primary_accessible and backup_accessible else 50
        }

