// components/BankingDashboard.jsx
'use client';
import { useState } from 'react';

export default function BankingDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  // Your actual financial data
  const financialData = {
    vaPayment: 3751.59,
    availableLoans: 8414.76,
    businessRevenue: 2000.00,
    totalExpenses: 3820.05,
    netCashFlow: 1931.54,
    cashValue: 8826.35,
    deathBenefit: 122844.40
  };

  return (
    <div className="banking-dashboard">
      {/* Header matching your site's style */}
      <div className="dashboard-header text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          SOVEREIGN BANKING
        </h1>
        <p className="text-gray-600 text-lg">Integrated Financial Control</p>
      </div>

      {/* Financial Overview Cards */}
      <div className="financial-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="financial-card bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="card-icon">🏛️</div>
          <h3 className="text-lg font-semibold mb-2">VA Benefits</h3>
          <p className="text-3xl font-bold text-purple-600">${financialData.vaPayment.toLocaleString()}</p>
          <p className="text-sm text-gray-600 mt-2">Monthly • Metro City Bank</p>
        </div>
        
        <div className="financial-card bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="card-icon">📄</div>
          <h3 className="text-lg font-semibold mb-2">Policy Loans</h3>
          <p className="text-3xl font-bold text-green-600">${financialData.availableLoans.toLocaleString()}</p>
          <p className="text-sm text-gray-600 mt-2">5.37% • OneAmerica</p>
        </div>
        
        <div className="financial-card bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="card-icon">💼</div>
          <h3 className="text-lg font-semibold mb-2">Business Revenue</h3>
          <p className="text-3xl font-bold text-blue-600">${financialData.businessRevenue.toLocaleString()}</p>
          <p className="text-sm text-gray-600 mt-2">Evergreen Beauty Lounge</p>
        </div>
        
        <div className="financial-card bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500">
          <div className="card-icon">⚡</div>
          <h3 className="text-lg font-semibold mb-2">Net Cash Flow</h3>
          <p className="text-3xl font-bold text-orange-600">${financialData.netCashFlow.toLocaleString()}</p>
          <p className="text-sm text-gray-600 mt-2">Monthly Available</p>
        </div>
      </div>

      {/* Loan Automation Section */}
      <div className="loan-section bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Policy Loan Automation</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Instant Access to Capital</h3>
            <p className="text-gray-600 mb-4">
              Your OneAmerica policy has <strong>${financialData.availableLoans.toLocaleString()}</strong> available for business growth, investments, or opportunities.
            </p>
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all">
                Request Policy Loan
              </button>
              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all">
                View Policy Details
              </button>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="font-semibold mb-4 text-center">Policy Summary</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b">
                <span>Cash Value:</span>
                <span className="font-semibold">${financialData.cashValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Available Loans:</span>
                <span className="font-semibold text-green-600">${financialData.availableLoans.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Interest Rate:</span>
                <span className="font-semibold">5.37%</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Death Benefit:</span>
                <span className="font-semibold">${financialData.deathBenefit.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Status */}
      <div className="integration-status bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Sovereign Integration Status</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="status-card text-center p-6 bg-green-50 rounded-xl border border-green-200">
            <div className="status-icon w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">✓</span>
            </div>
            <h3 className="font-semibold mb-2 text-green-800">VA Benefits</h3>
            <p className="text-sm text-green-600">Integrated & Tracking</p>
            <div className="mt-2 text-xs text-green-500">$3,751.59/month</div>
          </div>
          
          <div className="status-card text-center p-6 bg-blue-50 rounded-xl border border-blue-200">
            <div className="status-icon w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">💳</span>
            </div>
            <h3 className="font-semibold mb-2 text-blue-800">IBC Policy</h3>
            <p className="text-sm text-blue-600">Loan Automation Ready</p>
            <div className="mt-2 text-xs text-blue-500">$8,414.76 available</div>
          </div>
          
          <div className="status-card text-center p-6 bg-purple-50 rounded-xl border border-purple-200">
            <div className="status-icon w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">⚡</span>
            </div>
            <h3 className="font-semibold mb-2 text-purple-800">Business Revenue</h3>
            <p className="text-sm text-purple-600">EBL Integration Live</p>
            <div className="mt-2 text-xs text-purple-500">$2,000+/month</div>
          </div>
        </div>
      </div>
    </div>
  );
}