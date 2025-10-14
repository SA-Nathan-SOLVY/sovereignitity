'use client'
import { useState, useEffect } from 'react'

export function FinancialOverview() {
  const [financialData, setFinancialData] = useState(null)

  useEffect(() => {
    setFinancialData({
      vaPayment: 3751.59,
      availableLoans: 8414.76,
      businessRevenue: 2000.00,
      totalMonthlyIncome: 5751.59,
      sovereignCashFlow: 14166.35
    })
  }, [])

  if (!financialData) return <div className="text-center py-8">Loading financial data...</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <div className="bg-white rounded-lg shadow p-4 md:p-6 border-l-4 border-blue-500">
        <h3 className="text-lg font-semibold mb-2">VA Benefits</h3>
        <p className="text-2xl md:text-3xl font-bold text-blue-600">${financialData.vaPayment.toLocaleString()}</p>
        <p className="text-sm text-gray-600 mt-2">Monthly • Metro City Bank</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4 md:p-6 border-l-4 border-green-500">
        <h3 className="text-lg font-semibold mb-2">Policy Loans</h3>
        <p className="text-2xl md:text-3xl font-bold text-green-600">${financialData.availableLoans.toLocaleString()}</p>
        <p className="text-sm text-gray-600 mt-2">5.37% • OneAmerica</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4 md:p-6 border-l-4 border-purple-500">
        <h3 className="text-lg font-semibold mb-2">Business Revenue</h3>
        <p className="text-2xl md:text-3xl font-bold text-purple-600">${financialData.businessRevenue.toLocaleString()}</p>
        <p className="text-sm text-gray-600 mt-2">Evergreen Beauty Lounge</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4 md:p-6 border-l-4 border-orange-500">
        <h3 className="text-lg font-semibold mb-2">Sovereign Cash</h3>
        <p className="text-2xl md:text-3xl font-bold text-orange-600">${financialData.sovereignCashFlow.toLocaleString()}</p>
        <p className="text-sm text-gray-600 mt-2">Available This Month</p>
      </div>
    </div>
  )
}