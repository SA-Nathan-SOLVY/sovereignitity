'use client'
import { useState } from 'react'

export function LoanRequestForm() {
  const [step, setStep] = useState(1)
  const [loanData, setLoanData] = useState({
    amount: '',
    purpose: '',
    businessUse: ''
  })

  const availableLoan = 8414.76

  const purposes = [
    { id: 'business-expansion', name: 'Business Expansion' },
    { id: 'equipment-purchase', name: 'Equipment Purchase' },
    { id: 'marketing', name: 'Marketing & Advertising' },
    { id: 'inventory', name: 'Inventory Purchase' },
    { id: 'debt-consolidation', name: 'Debt Consolidation' },
    { id: 'emergency', name: 'Emergency Funds' }
  ]

  const handleSubmit = async () => {
    alert('✅ Loan request submitted!\n\nIn production, this would automatically:\n• Generate OneAmerica PDF forms\n• Submit via email/fax\n• Route funds to your account')
    setStep(1)
    setLoanData({ amount: '', purpose: '', businessUse: '' })
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Policy Loan Request</h2>
      
      <div className="mb-4 p-3 md:p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-blue-800 text-sm md:text-base">
          <strong>Available:</strong> ${availableLoan.toLocaleString()} • <strong>Rate:</strong> 5.37%
        </p>
      </div>

      {/* Step 1: Amount */}
      {step === 1 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 md:mb-4">Loan Amount</h3>
          <input
            type="number"
            max={availableLoan}
            value={loanData.amount}
            onChange={(e) => setLoanData({...loanData, amount: e.target.value})}
            className="w-full p-3 border rounded-lg mb-4 text-sm md:text-base"
            placeholder="Enter loan amount"
          />
          <button 
            onClick={() => setStep(2)}
            disabled={!loanData.amount}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
          >
            Continue
          </button>
        </div>
      )}

      {/* Step 2: Purpose */}
      {step === 2 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 md:mb-4">Loan Purpose</h3>
          <select 
            value={loanData.purpose}
            onChange={(e) => setLoanData({...loanData, purpose: e.target.value})}
            className="w-full p-3 border rounded-lg mb-4 text-sm md:text-base"
          >
            <option value="">Select purpose</option>
            {purposes.map(purpose => (
              <option key={purpose.id} value={purpose.id}>
                {purpose.name}
              </option>
            ))}
          </select>
          <div className="flex space-x-3 md:space-x-4">
            <button 
              onClick={() => setStep(1)}
              className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 text-sm md:text-base"
            >
              Back
            </button>
            <button 
              onClick={() => setStep(3)}
              disabled={!loanData.purpose}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 md:mb-4">Review & Submit</h3>
          <div className="bg-gray-50 p-3 md:p-4 rounded-lg mb-4 border">
            <p className="mb-2"><strong>Amount:</strong> ${loanData.amount}</p>
            <p className="mb-2"><strong>Purpose:</strong> {purposes.find(p => p.id === loanData.purpose)?.name}</p>
            <p className="mb-2"><strong>Interest Rate:</strong> 5.37%</p>
            <p><strong>Monthly Interest:</strong> ${((parseFloat(loanData.amount) || 0) * 0.0537 / 12).toFixed(2)}</p>
          </div>
          <div className="flex space-x-3 md:space-x-4">
            <button 
              onClick={() => setStep(2)}
              className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 text-sm md:text-base"
            >
              Back
            </button>
            <button 
              onClick={handleSubmit}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 text-sm md:text-base"
            >
              Submit Request
            </button>
          </div>
        </div>
      )}
    </div>
  )
}