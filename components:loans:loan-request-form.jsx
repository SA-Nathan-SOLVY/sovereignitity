'use client';
import { useState } from 'react';

export function LoanRequestForm() {
  const [step, setStep] = useState(1);
  const [loanData, setLoanData] = useState({
    amount: '',
    purpose: '',
    businessUse: ''
  });

  const availableLoan = 8414.76;

  const purposes = [
    { id: 'business-expansion', name: 'Business Expansion' },
    { id: 'equipment-purchase', name: 'Equipment Purchase' },
    { id: 'marketing', name: 'Marketing & Advertising' },
    { id: 'inventory', name: 'Inventory Purchase' },
    { id: 'debt-consolidation', name: 'Debt Consolidation' },
    { id: 'emergency', name: 'Emergency Funds' }
  ];

  const handleSubmit = async () => {
    alert('Loan request submitted! This would connect to OneAmerica API in production.');
    setStep(1);
    setLoanData({ amount: '', purpose: '', businessUse: '' });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Policy Loan Request</h2>
      
      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-800">
          <strong>Available Loan Value:</strong> ${availableLoan.toLocaleString()} at 5.37% interest
        </p>
      </div>

      {step === 1 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Loan Amount</h3>
          <input
            type="number"
            max={availableLoan}
            value={loanData.amount}
            onChange={(e) => setLoanData({...loanData, amount: e.target.value})}
            className="w-full p-3 border rounded-lg mb-4"
            placeholder="Enter loan amount"
          />
          <button 
            onClick={() => setStep(2)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Loan Purpose</h3>
          <select 
            value={loanData.purpose}
            onChange={(e) => setLoanData({...loanData, purpose: e.target.value})}
            className="w-full p-3 border rounded-lg mb-4"
          >
            <option value="">Select purpose</option>
            {purposes.map(purpose => (
              <option key={purpose.id} value={purpose.id}>
                {purpose.name}
              </option>
            ))}
          </select>
          <div className="flex space-x-4">
            <button 
              onClick={() => setStep(1)}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
            >
              Back
            </button>
            <button 
              onClick={() => setStep(3)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Review & Submit</h3>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p><strong>Amount:</strong> ${loanData.amount}</p>
            <p><strong>Purpose:</strong> {purposes.find(p => p.id === loanData.purpose)?.name}</p>
            <p><strong>Interest Rate:</strong> 5.37%</p>
            <p><strong>Monthly Interest:</strong> ${((parseFloat(loanData.amount) || 0) * 0.0537 / 12).toFixed(2)}</p>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={() => setStep(2)}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
            >
              Back
            </button>
            <button 
              onClick={handleSubmit}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Submit Loan Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
}