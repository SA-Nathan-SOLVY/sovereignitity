'use client'
import { useState, useEffect } from 'react'

export function BudgetOverview() {
  const [budget, setBudget] = useState(null)

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
    })
  }, [])

  if (!budget) return <div className="text-center py-8">Loading budget...</div>

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Budget Overview</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-lg md:text-2xl font-bold text-green-600">${budget.totalIncome.toLocaleString()}</div>
          <div className="text-xs md:text-sm text-gray-600">Income</div>
        </div>
        <div className="text-center p-3 bg-red-50 rounded-lg">
          <div className="text-lg md:text-2xl font-bold text-red-600">${budget.totalExpenses.toLocaleString()}</div>
          <div className="text-xs md:text-sm text-gray-600">Expenses</div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-lg md:text-2xl font-bold text-blue-600">${budget.netCashFlow.toLocaleString()}</div>
          <div className="text-xs md:text-sm text-gray-600">Cash Flow</div>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="text-lg md:text-2xl font-bold text-purple-600">{budget.savingsRate.toFixed(1)}%</div>
          <div className="text-xs md:text-sm text-gray-600">Savings Rate</div>
        </div>
      </div>

      <h3 className="font-semibold mb-3 md:mb-4">Monthly Expenses</h3>
      <div className="space-y-2 md:space-y-3">
        {Object.entries(budget.expensesByCategory).map(([category, amount]) => (
          <div key={category} className="flex justify-between items-center py-2 border-b">
            <span className="capitalize font-medium text-sm md:text-base">{category}</span>
            <span className="font-semibold text-sm md:text-base">${amount.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}