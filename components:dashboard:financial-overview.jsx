'use client';
import { useState, useEffect } from 'react';

export function FinancialOverview() {
  const [financialData, setFinancialData] = useState(null);

  useEffect(() => {
    setFinancialData({
      vaPayment: 3751.59,
      availableLoans: 8414.76,
      businessRevenue: 2000.00,
      totalMonthlyIncome: 5751.59,
      sovereignCashFlow: 14166.35
    });
  }, []);

  if (!financialData) return <div>Loading financial data...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-blue-50 rounded-lg shadow p-6 border-l-4 border-blue-500">
        <h3 className="text-lg font-semibold mb-2">VA Monthly Benefits</h3>
        <p className="text-3xl font-bold text-blue-600">${financialData.vaPayment.toLocaleString()}</p>
        <p className="text-sm text-gray-600 mt-2">Next: Nov 1, 2025 • METRO CITY BANK</p>
      </div>
      
      <div className="bg-green-50 rounded-lg shadow p-6 border-l-4 border-green-500">
        <h3 className="text-lg font-semibold mb-2">Available Policy Loans</h3>
        <p className="text-3xl font-bold text-green-600">${financialData.availableLoans.toLocaleString()}</p>
        <p className="text-sm text-gray-600 mt-2">Rate: 5.37% • OneAmerica Policy</p>
      </div>
      
      <div className="bg-purple-50 rounded-lg shadow p-6 border-l-4 border-purple-500">
        <h3 className="text-lg font-semibold mb-2">Business Revenue</h3>
        <p className="text-3xl font-bold text-purple-600">${financialData.businessRevenue.toLocaleString()}</p>
        <p className="text-sm text-gray-600 mt-2">Evergreen Beauty Lounge</p>
      </div>
      
      <div className="bg-orange-50 rounded-lg shadow p-6 border-l-4 border-orange-500">
        <h3 className="text-lg font-semibold mb-2">Sovereign Cash Flow</h3>
        <p className="text-3xl font-bold text-orange-600">${financialData.sovereignCashFlow.toLocaleString()}</p>
        <p className="text-sm text-gray-600 mt-2">Available this month</p>
      </div>
    </div>
  );
}