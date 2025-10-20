import math
from typing import Dict, List, Tuple
from datetime import datetime, timedelta
import statistics

class TaxAssistant:
    def __init__(self):
        self.tax_brackets_2024 = {
            'single': [
                (0, 11600, 0.10),
                (11601, 47150, 0.12),
                (47151, 100525, 0.22),
                (100526, 191950, 0.24),
                (191951, 243725, 0.32),
                (243726, 609350, 0.35),
                (609351, float('inf'), 0.37)
            ],
            'married': [
                (0, 23200, 0.10),
                (23201, 94300, 0.12),
                (94301, 201050, 0.22),
                (201051, 383900, 0.24),
                (383901, 487450, 0.32),
                (487451, 731200, 0.35),
                (731201, float('inf'), 0.37)
            ]
        }
        
        self.standard_deductions = {
            'single': 14600,
            'married': 29200,
            'head_of_household': 21900
        }

    def calculate_marginal_tax(self, income: float, filing_status: str = 'single') -> Dict:
        """Calculate marginal tax liability with mathematical precision"""
        brackets = self.tax_brackets_2024[filing_status]
        tax_owed = 0.0
        remaining_income = income
        bracket_details = []
        
        for i, (bracket_min, bracket_max, rate) in enumerate(brackets):
            if remaining_income <= 0:
                break
                
            bracket_range = bracket_max - bracket_min
            taxable_in_bracket = min(remaining_income, bracket_range)
            
            if i == 0:  # First bracket
                taxable_in_bracket = min(remaining_income, bracket_max)
            elif bracket_max == float('inf'):  # Top bracket
                taxable_in_bracket = remaining_income
            
            tax_in_bracket = taxable_in_bracket * rate
            tax_owed += tax_in_bracket
            remaining_income -= taxable_in_bracket
            
            bracket_details.append({
                'bracket': i + 1,
                'range': f"${bracket_min:,.0f} - ${bracket_max:,.0f}" if bracket_max != float('inf') else f"${bracket_min:,.0f}+",
                'rate': f"{rate*100}%",
                'taxable_amount': taxable_in_bracket,
                'tax_contribution': tax_in_bracket
            })
        
        effective_tax_rate = (tax_owed / income) * 100 if income > 0 else 0
        
        return {
            'gross_income': income,
            'total_tax_owed': tax_owed,
            'effective_tax_rate': effective_tax_rate,
            'marginal_tax_rate': brackets[-1][2] * 100,
            'net_income': income - tax_owed,
            'bracket_breakdown': bracket_details
        }

    def optimize_business_expenses(self, revenue: float, expenses: Dict[str, float]) -> Dict:
        """Mathematical optimization of business expense categorization"""
        total_expenses = sum(expenses.values())
        net_income = revenue - total_expenses
        
        # Calculate optimal expense ratios
        industry_benchmarks = {
            'cogs': 0.35,  # Cost of Goods Sold
            'marketing': 0.10,
            'salaries': 0.25,
            'office': 0.08,
            'travel': 0.05,
            'other': 0.17
        }
        
        current_ratios = {}
        for category, amount in expenses.items():
            current_ratios[category] = amount / revenue if revenue > 0 else 0
        
        recommendations = []
        for category, benchmark in industry_benchmarks.items():
            current_ratio = current_ratios.get(category, 0)
            if current_ratio > benchmark * 1.2:  # 20% over benchmark
                recommendations.append({
                    'category': category,
                    'current_ratio': f"{current_ratio:.1%}",
                    'recommended_ratio': f"{benchmark:.1%}",
                    'potential_savings': revenue * (current_ratio - benchmark),
                    'action': f"Reduce {category} spending by ${revenue * (current_ratio - benchmark):,.0f}"
                })
        
        return {
            'revenue': revenue,
            'total_expenses': total_expenses,
            'net_income': net_income,
            'profit_margin': (net_income / revenue) * 100 if revenue > 0 else 0,
            'expense_optimization_recommendations': recommendations
        }

    def calculate_quarterly_estimates(self, projected_annual_income: float, 
                                    filing_status: str = 'single', 
                                    ytd_income: float = 0) -> Dict:
        """Calculate quarterly estimated tax payments with precision"""
        annual_tax = self.calculate_marginal_tax(projected_annual_income, filing_status)['total_tax_owed']
        
        quarters = {
            'Q1': {'months': (1, 3), 'due': 'April 15'},
            'Q2': {'months': (4, 6), 'due': 'June 15'},
            'Q3': {'months': (7, 9), 'due': 'September 15'},
            'Q4': {'months': (10, 12), 'due': 'January 15'}
        }
        
        current_quarter = (datetime.now().month - 1) // 3 + 1
        quarterly_amount = annual_tax / 4
        
        quarterly_payments = {}
        for q_num, q_data in quarters.items():
            q_number = int(q_num[1:])
            quarterly_payments[q_num] = {
                'due_date': q_data['due'],
                'amount_due': quarterly_amount,
                'status': 'past' if q_number < current_quarter else 'current' if q_number == current_quarter else 'future'
            }
        
        return {
            'projected_annual_tax': annual_tax,
            'quarterly_estimates': quarterly_payments,
            'safe_harbor_amount': annual_tax * 0.9,
            'recommended_actions': [
                f"Make Q{current_quarter} payment: ${quarterly_amount:,.2f}",
                "Consider increasing withholding if employed",
                "Track business expenses for deductions"
            ]
        }

