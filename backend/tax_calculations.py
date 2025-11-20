"""
SOLVY Tax Calculator - W-2 to Self-Employment Transition Tool
==============================================================

Purpose: Help members understand the tax implications of transitioning
from W-2 employment to self-employment (data sovereign income).

Key Features:
- W-2 vs Self-Employment comparison
- Real 2024 tax brackets
- Self-employment tax calculations (15.3%)
- Business expense optimization
- IBC (Infinite Banking Concept) integration
- Quarterly estimated payment calculations
- Educational output for member learning

Author: SOLVY Platform
Date: November 19, 2025
"""

# 2024 Federal Tax Brackets
TAX_BRACKETS = {
    'single': [
        (11600, 0.10),    # 10% up to $11,600
        (47150, 0.12),    # 12% from $11,601 to $47,150
        (100525, 0.22),   # 22% from $47,151 to $100,525
        (191950, 0.24),   # 24% from $100,526 to $191,950
        (243725, 0.32),   # 32% from $191,951 to $243,725
        (609350, 0.35),   # 35% from $243,726 to $609,350
        (float('inf'), 0.37)  # 37% above $609,350
    ],
    'married_jointly': [
        (23200, 0.10),    # 10% up to $23,200
        (94300, 0.12),    # 12% from $23,201 to $94,300
        (201050, 0.22),   # 22% from $94,301 to $201,050
        (383900, 0.24),   # 24% from $201,051 to $383,900
        (487450, 0.32),   # 32% from $383,901 to $487,450
        (731200, 0.35),   # 35% from $487,451 to $731,200
        (float('inf'), 0.37)  # 37% above $731,200
    ],
    'head_of_household': [
        (16550, 0.10),
        (63100, 0.12),
        (100500, 0.22),
        (191950, 0.24),
        (243700, 0.32),
        (609350, 0.35),
        (float('inf'), 0.37)
    ]
}

# Standard deductions for 2024
STANDARD_DEDUCTIONS = {
    'single': 14600,
    'married_jointly': 29200,
    'head_of_household': 21900
}

# Self-employment tax rate (Social Security + Medicare)
SELF_EMPLOYMENT_TAX_RATE = 0.153  # 15.3%
SELF_EMPLOYMENT_DEDUCTION = 0.9235  # 92.35% of net earnings subject to SE tax


def calculate_income_tax(taxable_income, filing_status='married_jointly'):
    """
    Calculate federal income tax using progressive tax brackets.
    
    Args:
        taxable_income: Income after deductions
        filing_status: 'single', 'married_jointly', or 'head_of_household'
    
    Returns:
        dict with tax breakdown by bracket
    """
    brackets = TAX_BRACKETS.get(filing_status, TAX_BRACKETS['single'])
    
    tax = 0
    prev_bracket = 0
    bracket_details = []
    
    for bracket_limit, rate in brackets:
        if taxable_income <= prev_bracket:
            break
        
        # Calculate taxable amount in this bracket
        taxable_in_bracket = min(taxable_income, bracket_limit) - prev_bracket
        
        if taxable_in_bracket > 0:
            bracket_tax = taxable_in_bracket * rate
            tax += bracket_tax
            
            bracket_details.append({
                'bracket': f"${prev_bracket:,.0f} - ${bracket_limit:,.0f}" if bracket_limit != float('inf') else f"${prev_bracket:,.0f}+",
                'rate': f"{rate * 100:.0f}%",
                'taxable_amount': round(taxable_in_bracket, 2),
                'tax': round(bracket_tax, 2)
            })
        
        prev_bracket = bracket_limit
    
    return {
        'total_income_tax': round(tax, 2),
        'bracket_details': bracket_details,
        'effective_rate': round((tax / taxable_income * 100), 2) if taxable_income > 0 else 0
    }


def calculate_w2_scenario(gross_income, filing_status='married_jointly', dependents=0):
    """
    Calculate taxes for W-2 employee.
    
    W-2 employees:
    - Employer pays half of FICA (7.65%)
    - Employee pays half of FICA (7.65%)
    - Employer withholds income tax
    - Limited deductions (standard deduction only, usually)
    
    Args:
        gross_income: Total W-2 income
        filing_status: Tax filing status
        dependents: Number of dependents (affects child tax credit)
    
    Returns:
        dict with complete tax breakdown
    """
    # Standard deduction
    standard_deduction = STANDARD_DEDUCTIONS.get(filing_status, STANDARD_DEDUCTIONS['single'])
    
    # Taxable income after standard deduction
    taxable_income = max(0, gross_income - standard_deduction)
    
    # Calculate income tax
    income_tax_result = calculate_income_tax(taxable_income, filing_status)
    income_tax = income_tax_result['total_income_tax']
    
    # FICA taxes (employee portion only - employer pays the other half)
    social_security_tax = min(gross_income, 168600) * 0.062  # 6.2% up to $168,600 (2024 limit)
    medicare_tax = gross_income * 0.0145  # 1.45% on all income
    
    # Additional Medicare tax for high earners
    medicare_threshold = 250000 if filing_status == 'married_jointly' else 200000
    additional_medicare = max(0, gross_income - medicare_threshold) * 0.009  # 0.9% above threshold
    
    fica_tax = social_security_tax + medicare_tax + additional_medicare
    
    # Child tax credit (if applicable)
    child_tax_credit = min(dependents * 2000, income_tax)  # $2,000 per child, refundable up to $1,600
    
    # Total tax
    total_tax = income_tax + fica_tax - child_tax_credit
    
    # Take home pay
    take_home = gross_income - total_tax
    
    return {
        'scenario': 'W-2 Employee',
        'gross_income': round(gross_income, 2),
        'standard_deduction': round(standard_deduction, 2),
        'taxable_income': round(taxable_income, 2),
        'income_tax': round(income_tax, 2),
        'fica_tax': round(fica_tax, 2),
        'fica_breakdown': {
            'social_security': round(social_security_tax, 2),
            'medicare': round(medicare_tax, 2),
            'additional_medicare': round(additional_medicare, 2)
        },
        'child_tax_credit': round(child_tax_credit, 2),
        'total_tax': round(total_tax, 2),
        'effective_tax_rate': round((total_tax / gross_income * 100), 2),
        'take_home_pay': round(take_home, 2),
        'bracket_details': income_tax_result['bracket_details']
    }


def calculate_self_employment_scenario(gross_income, business_expenses, filing_status='married_jointly', 
                                      dependents=0, ibc_contribution=0, sep_ira_contribution=0):
    """
    Calculate taxes for self-employed individual.
    
    Self-employed individuals:
    - Pay BOTH halves of FICA (15.3% self-employment tax)
    - Can deduct business expenses
    - Can deduct half of self-employment tax
    - Can contribute to SEP IRA (tax-deductible)
    - Can use IBC for tax-advantaged wealth building
    - Must make quarterly estimated payments
    
    Args:
        gross_income: Total self-employment income
        business_expenses: Deductible business expenses
        filing_status: Tax filing status
        dependents: Number of dependents
        ibc_contribution: Contribution to Infinite Banking Concept policy
        sep_ira_contribution: Contribution to SEP IRA
    
    Returns:
        dict with complete tax breakdown
    """
    # Net income after business expenses
    net_income = gross_income - business_expenses
    
    # Self-employment tax (15.3% on 92.35% of net income)
    se_taxable_income = net_income * SELF_EMPLOYMENT_DEDUCTION
    self_employment_tax = se_taxable_income * SELF_EMPLOYMENT_TAX_RATE
    
    # Deduction for half of self-employment tax
    se_tax_deduction = self_employment_tax * 0.5
    
    # Standard deduction
    standard_deduction = STANDARD_DEDUCTIONS.get(filing_status, STANDARD_DEDUCTIONS['single'])
    
    # Adjusted Gross Income (AGI)
    agi = net_income - se_tax_deduction - sep_ira_contribution
    
    # Taxable income
    taxable_income = max(0, agi - standard_deduction)
    
    # Calculate income tax
    income_tax_result = calculate_income_tax(taxable_income, filing_status)
    income_tax = income_tax_result['total_income_tax']
    
    # Child tax credit
    child_tax_credit = min(dependents * 2000, income_tax)
    
    # Total tax
    total_tax = income_tax + self_employment_tax - child_tax_credit
    
    # Take home pay (after tax and retirement contributions)
    take_home = gross_income - business_expenses - total_tax - ibc_contribution - sep_ira_contribution
    
    # Quarterly estimated payments
    quarterly_payment = total_tax / 4
    
    return {
        'scenario': 'Self-Employed',
        'gross_income': round(gross_income, 2),
        'business_expenses': round(business_expenses, 2),
        'net_income': round(net_income, 2),
        'self_employment_tax': round(self_employment_tax, 2),
        'se_tax_deduction': round(se_tax_deduction, 2),
        'sep_ira_contribution': round(sep_ira_contribution, 2),
        'ibc_contribution': round(ibc_contribution, 2),
        'standard_deduction': round(standard_deduction, 2),
        'agi': round(agi, 2),
        'taxable_income': round(taxable_income, 2),
        'income_tax': round(income_tax, 2),
        'child_tax_credit': round(child_tax_credit, 2),
        'total_tax': round(total_tax, 2),
        'effective_tax_rate': round((total_tax / gross_income * 100), 2),
        'take_home_pay': round(take_home, 2),
        'quarterly_estimated_payment': round(quarterly_payment, 2),
        'bracket_details': income_tax_result['bracket_details']
    }


def compare_w2_vs_self_employment(gross_income, business_expenses=0, filing_status='married_jointly',
                                 dependents=0, ibc_contribution=0, sep_ira_contribution=0):
    """
    Compare W-2 employment vs self-employment side-by-side.
    
    This is the "aha! moment" calculator that shows members:
    - The self-employment tax shock (15.3% on top of income tax)
    - The power of business expense deductions
    - The value of tax-advantaged strategies (IBC, SEP IRA)
    - The importance of quarterly estimated payments
    
    Args:
        gross_income: Same income amount for both scenarios
        business_expenses: Business expenses (only applies to self-employment)
        filing_status: Tax filing status
        dependents: Number of dependents
        ibc_contribution: IBC policy contribution (self-employment only)
        sep_ira_contribution: SEP IRA contribution (self-employment only)
    
    Returns:
        dict with side-by-side comparison and key learnings
    """
    # Calculate both scenarios
    w2 = calculate_w2_scenario(gross_income, filing_status, dependents)
    se = calculate_self_employment_scenario(gross_income, business_expenses, filing_status, 
                                           dependents, ibc_contribution, sep_ira_contribution)
    
    # Calculate differences
    tax_difference = se['total_tax'] - w2['total_tax']
    take_home_difference = se['take_home_pay'] - w2['take_home_pay']
    
    # Key learnings
    learnings = [
        f"Self-employment tax is {SELF_EMPLOYMENT_TAX_RATE * 100}% on top of income tax (you pay both halves of FICA)",
        f"Business expenses of ${business_expenses:,.2f} reduce your taxable income",
        f"You must make quarterly estimated payments of ${se['quarterly_estimated_payment']:,.2f}",
        "Keep detailed records of ALL business expenses (mileage, supplies, home office, etc.)",
    ]
    
    if ibc_contribution > 0:
        learnings.append(f"IBC contribution of ${ibc_contribution:,.2f} builds tax-advantaged wealth")
    
    if sep_ira_contribution > 0:
        learnings.append(f"SEP IRA contribution of ${sep_ira_contribution:,.2f} reduces taxable income")
    
    if tax_difference > 0:
        learnings.append(f"⚠️  You'll pay ${tax_difference:,.2f} MORE in taxes as self-employed (before optimizations)")
    else:
        learnings.append(f"✅ You'll pay ${abs(tax_difference):,.2f} LESS in taxes as self-employed (with optimizations!)")
    
    return {
        'w2_scenario': w2,
        'self_employment_scenario': se,
        'comparison': {
            'tax_difference': round(tax_difference, 2),
            'take_home_difference': round(take_home_difference, 2),
            'tax_difference_percent': round((tax_difference / w2['total_tax'] * 100), 2) if w2['total_tax'] > 0 else 0
        },
        'key_learnings': learnings,
        'quarterly_payment_schedule': {
            'q1_due': 'April 15',
            'q1_amount': se['quarterly_estimated_payment'],
            'q2_due': 'June 15',
            'q2_amount': se['quarterly_estimated_payment'],
            'q3_due': 'September 15',
            'q3_amount': se['quarterly_estimated_payment'],
            'q4_due': 'January 15 (next year)',
            'q4_amount': se['quarterly_estimated_payment']
        }
    }


def optimize_business_expenses(gross_income, current_expenses=0):
    """
    Recommend optimal business expense deductions based on income.
    
    Common business expenses for SOLVY members:
    - Home office (% of rent/mortgage, utilities)
    - Vehicle expenses (mileage or actual expenses)
    - Supplies and materials
    - Professional development (courses, books, conferences)
    - Technology (computer, phone, software)
    - Marketing and advertising
    - Professional services (legal, accounting)
    
    Args:
        gross_income: Total self-employment income
        current_expenses: Current business expenses
    
    Returns:
        dict with recommended expense categories and amounts
    """
    # Recommended expense percentages (conservative estimates)
    recommendations = {
        'home_office': {
            'percentage': 0.10,  # 10% of income
            'description': 'Home office deduction (% of rent/mortgage, utilities)',
            'amount': gross_income * 0.10
        },
        'vehicle': {
            'percentage': 0.05,  # 5% of income
            'description': 'Vehicle expenses (mileage or actual expenses)',
            'amount': gross_income * 0.05
        },
        'supplies': {
            'percentage': 0.03,  # 3% of income
            'description': 'Supplies and materials for business',
            'amount': gross_income * 0.03
        },
        'technology': {
            'percentage': 0.02,  # 2% of income
            'description': 'Computer, phone, software, internet',
            'amount': gross_income * 0.02
        },
        'professional_development': {
            'percentage': 0.02,  # 2% of income
            'description': 'Courses, books, conferences, training',
            'amount': gross_income * 0.02
        },
        'marketing': {
            'percentage': 0.03,  # 3% of income
            'description': 'Marketing, advertising, website',
            'amount': gross_income * 0.03
        }
    }
    
    # Calculate total recommended expenses
    total_recommended = sum(cat['amount'] for cat in recommendations.values())
    
    # Tax savings from recommended expenses (assuming 35% effective rate)
    tax_savings = total_recommended * 0.35
    
    return {
        'current_expenses': round(current_expenses, 2),
        'recommended_expenses': {k: round(v['amount'], 2) for k, v in recommendations.items()},
        'total_recommended': round(total_recommended, 2),
        'expense_details': recommendations,
        'potential_tax_savings': round(tax_savings, 2),
        'tips': [
            "Keep receipts for ALL business expenses",
            "Use SOLVY Card to automatically track and categorize expenses",
            "Mileage: Track every business trip (57.5¢ per mile in 2024)",
            "Home office: Measure your office space and calculate % of home",
            "Technology: Deduct business use % of phone, internet, computer",
            "Professional development: Courses and books related to your business"
        ]
    }


def print_comparison_report(comparison):
    """
    Print a beautiful, educational comparison report.
    
    This is what members see when they use the calculator.
    """
    print("\n" + "="*70)
    print("SOLVY TAX CALCULATOR - W-2 vs Self-Employment Comparison")
    print("="*70)
    
    w2 = comparison['w2_scenario']
    se = comparison['self_employment_scenario']
    comp = comparison['comparison']
    
    print(f"\n📊 INCOME: ${w2['gross_income']:,.2f}")
    print(f"👨‍👩‍👧‍👦 FILING STATUS: {w2.get('filing_status', 'Married Jointly')}")
    
    print("\n" + "-"*70)
    print("W-2 EMPLOYEE SCENARIO")
    print("-"*70)
    print(f"Gross Income:           ${w2['gross_income']:>15,.2f}")
    print(f"Standard Deduction:    -${w2['standard_deduction']:>15,.2f}")
    print(f"Taxable Income:         ${w2['taxable_income']:>15,.2f}")
    print(f"Income Tax:            -${w2['income_tax']:>15,.2f}")
    print(f"FICA Tax (your half):  -${w2['fica_tax']:>15,.2f}")
    if w2['child_tax_credit'] > 0:
        print(f"Child Tax Credit:      +${w2['child_tax_credit']:>15,.2f}")
    print(f"Total Tax:             -${w2['total_tax']:>15,.2f}")
    print(f"Effective Rate:         {w2['effective_tax_rate']:>15.2f}%")
    print(f"TAKE HOME PAY:          ${w2['take_home_pay']:>15,.2f}")
    
    print("\n" + "-"*70)
    print("SELF-EMPLOYMENT SCENARIO")
    print("-"*70)
    print(f"Gross Income:           ${se['gross_income']:>15,.2f}")
    print(f"Business Expenses:     -${se['business_expenses']:>15,.2f}")
    print(f"Net Income:             ${se['net_income']:>15,.2f}")
    print(f"Self-Employment Tax:   -${se['self_employment_tax']:>15,.2f}")
    print(f"SE Tax Deduction:      +${se['se_tax_deduction']:>15,.2f}")
    if se['sep_ira_contribution'] > 0:
        print(f"SEP IRA Contribution:  -${se['sep_ira_contribution']:>15,.2f}")
    if se['ibc_contribution'] > 0:
        print(f"IBC Contribution:      -${se['ibc_contribution']:>15,.2f}")
    print(f"Standard Deduction:    -${se['standard_deduction']:>15,.2f}")
    print(f"Taxable Income:         ${se['taxable_income']:>15,.2f}")
    print(f"Income Tax:            -${se['income_tax']:>15,.2f}")
    if se['child_tax_credit'] > 0:
        print(f"Child Tax Credit:      +${se['child_tax_credit']:>15,.2f}")
    print(f"Total Tax:             -${se['total_tax']:>15,.2f}")
    print(f"Effective Rate:         {se['effective_tax_rate']:>15.2f}%")
    print(f"TAKE HOME PAY:          ${se['take_home_pay']:>15,.2f}")
    
    print("\n" + "-"*70)
    print("COMPARISON")
    print("-"*70)
    symbol = "📈" if comp['tax_difference'] > 0 else "📉"
    print(f"{symbol} Tax Difference:        ${comp['tax_difference']:>15,.2f}")
    print(f"   Take Home Difference:   ${comp['take_home_difference']:>15,.2f}")
    
    print("\n" + "-"*70)
    print("QUARTERLY ESTIMATED PAYMENTS")
    print("-"*70)
    schedule = comparison['quarterly_payment_schedule']
    print(f"Q1 ({schedule['q1_due']}):        ${schedule['q1_amount']:>15,.2f}")
    print(f"Q2 ({schedule['q2_due']}):         ${schedule['q2_amount']:>15,.2f}")
    print(f"Q3 ({schedule['q3_due']}):  ${schedule['q3_amount']:>15,.2f}")
    print(f"Q4 ({schedule['q4_due']}): ${schedule['q4_amount']:>15,.2f}")
    
    print("\n" + "-"*70)
    print("KEY LEARNINGS")
    print("-"*70)
    for i, learning in enumerate(comparison['key_learnings'], 1):
        print(f"{i}. {learning}")
    
    print("\n" + "="*70)
    print("💡 Want to optimize your taxes? Use SOLVY Card to track expenses!")
    print("="*70 + "\n")


# Example usage and test cases
if __name__ == "__main__":
    print("SOLVY Tax Calculator - Test Cases\n")
    
    # Test Case 1: Basic comparison
    print("TEST CASE 1: Basic W-2 vs Self-Employment ($85,000 income)")
    print("-" * 70)
    result1 = compare_w2_vs_self_employment(
        gross_income=85000,
        business_expenses=12000,
        filing_status='married_jointly',
        dependents=2
    )
    print_comparison_report(result1)
    
    # Test Case 2: With IBC and SEP IRA optimization
    print("\n\nTEST CASE 2: Optimized Self-Employment (with IBC + SEP IRA)")
    print("-" * 70)
    result2 = compare_w2_vs_self_employment(
        gross_income=85000,
        business_expenses=15000,
        filing_status='married_jointly',
        dependents=2,
        ibc_contribution=10000,
        sep_ira_contribution=12750  # 15% of net income
    )
    print_comparison_report(result2)
    
    # Test Case 3: Expense optimization
    print("\n\nTEST CASE 3: Business Expense Optimization")
    print("-" * 70)
    optimization = optimize_business_expenses(gross_income=85000, current_expenses=8000)
    print(f"\nCurrent Expenses: ${optimization['current_expenses']:,.2f}")
    print(f"Recommended Total: ${optimization['total_recommended']:,.2f}")
    print(f"Potential Tax Savings: ${optimization['potential_tax_savings']:,.2f}\n")
    print("Recommended Expense Breakdown:")
    for category, amount in optimization['recommended_expenses'].items():
        print(f"  - {category.replace('_', ' ').title()}: ${amount:,.2f}")
    print("\nTips:")
    for tip in optimization['tips']:
        print(f"  • {tip}")
