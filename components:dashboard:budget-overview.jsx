'use client';
import { useState, useEffect } from 'react';

export function BudgetOverview() {
  const [budget, setBudget] = useState(null);

  useEffect(() => {
    setBudget({
      totalIncome: 5751.59,
      totalExpenses: 3820.05,
      netCashFlow: 1931.54,
      savingsRate: 33.6,
      expensesByCategory: {
        debt: 841.31,
        insurance: 1875.00,
        utilities: 524.65,
        subscriptions: 331.09,
        family: 150.00,
        business: 176.00
      }
    });
  }, []);

  if (!budget) return <div>Loading budget...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">Budget Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">${budget.totalIncome.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Monthly Income</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">${budget.totalExpenses.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Monthly Expenses</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">${budget.netCashFlow.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Net Cash Flow</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{budget.savingsRate.toFixed(1)}%</div>
          <div className="text-sm text-gray-600">Savings Rate</div>
        </div>
      </div>

      <h3 className="font-semibold mb-4">Expenses by Category</h3>
      <div className="space-y-2">
        {Object.entries(budget.expensesByCategory).map(([category, amount]) => (
          <div key={category} className="flex justify-between items-center py-2 border-b">
            <span className="capitalize font-medium">{category}</span>
            <span className="font-semibold">${amount.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}