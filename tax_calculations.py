class TaxAssistant:
    def calculate_marginal_tax(self, income, filing_status='single'):
        """Calculate marginal tax based on 2024 tax brackets"""
        # 2024 Tax brackets (single)
        brackets = [
            (11600, 0.10),   # 10% up to $11,600
            (47150, 0.12),   # 12% up to $47,150
            (100525, 0.22),  # 22% up to $100,525
            (191950, 0.24),  # 24% up to $191,950
            (243725, 0.32),  # 32% up to $243,725
            (609350, 0.35),  # 35% up to $609,350
            (float('inf'), 0.37)  # 37% above $609,350
        ]
        
        tax = 0
        remaining_income = income
        
        for i, (bracket, rate) in enumerate(brackets):
            if remaining_income <= 0:
                break
                
            if i == 0:
                taxable_in_bracket = min(remaining_income, bracket)
            else:
                prev_bracket = brackets[i-1][0]
                taxable_in_bracket = min(remaining_income, bracket - prev_bracket)
                
            tax += taxable_in_bracket * rate
            remaining_income -= taxable_in_bracket
        
        effective_rate = (tax / income) * 100 if income > 0 else 0
        
        return {
            'total_tax': round(tax, 2),
            'effective_rate': round(effective_rate, 2),
            'after_tax_income': round(income - tax, 2),
            'filing_status': filing_status,
            'income': income
        }
    
    def optimize_business_expenses(self, revenue, expenses):
        """Optimize business expenses for tax deductions"""
        total_expenses = sum(expenses.values())
        max_deductible = revenue * 0.8  # IRS reasonable business expense limit
        
        if total_expenses <= max_deductible:
            optimized = expenses
            savings = total_expenses * 0.25  # Estimated tax savings at 25% rate
        else:
            # Scale down expenses proportionally
            ratio = max_deductible / total_expenses
            optimized = {k: round(v * ratio, 2) for k, v in expenses.items()}
            savings = max_deductible * 0.25
        
        return {
            'current_expenses': expenses,
            'optimized_expenses': optimized,
            'estimated_tax_savings': round(savings, 2),
            'max_recommended_deductions': max_deductible
        }
    
    def calculate_quarterly_estimates(self, projected_income, filing_status='single', ytd_income=0):
        """Calculate quarterly estimated tax payments"""
        annual_tax = self.calculate_marginal_tax(projected_income, filing_status)['total_tax']
        remaining_tax = annual_tax - (ytd_income * 0.25)  # Simple estimate for YTD paid
        
        quarterly = remaining_tax / 4
        
        return {
            'q1_estimate': round(quarterly, 2),
            'q2_estimate': round(quarterly, 2),
            'q3_estimate': round(quarterly, 2),
            'q4_estimate': round(quarterly, 2),
            'total_annual_tax': round(annual_tax, 2),
            'remaining_tax': round(remaining_tax, 2)
        }
