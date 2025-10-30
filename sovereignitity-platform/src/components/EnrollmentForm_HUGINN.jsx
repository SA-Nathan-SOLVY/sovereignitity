// EnrollmentForm.jsx - Updated for Huginn Integration
// Replace the existing EnrollmentForm.jsx with this version

import { useState } from 'react'

export default function EnrollmentForm({ onClose }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedTier, setSelectedTier] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    fullName: '',
    email: '',
    phone: '',
    referralSource: '',
    
    // Step 2: Interest Profile
    interests: [],
    currentStatus: '',
    
    // Step 3: Enrollment Tier (set separately)
    
    // Step 4: Communication Preferences
    communications: [],
    
    // Business Information (if self-employed)
    businessType: '',
    businessName: '',
    ein: '',
    
    // IBC Policy Information (if applicable)
    hasIbcPolicy: false,
    policyCompany: '',
    policyNumber: '',
    desiredLoanAmount: '',
    maritalStatus: ''
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (type === 'checkbox') {
      const array = formData[name] || []
      if (checked) {
        setFormData({ ...formData, [name]: [...array, value] })
      } else {
        setFormData({ ...formData, [name]: array.filter(item => item !== value) })
      }
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleNext = () => {
    setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Combine all form data
      const enrollmentData = {
        ...formData,
        timestamp: new Date().toISOString(),
        enrollmentTier: selectedTier,
        interests: formData.interests.join(', '),
        communications: formData.communications.join(', ')
      }

      // HUGINN WEBHOOK URL
      // For local testing: http://localhost:3000/users/1/web_requests/1/SOLVY2026_enrollment
      // For production: Replace with your ngrok or Cloudflare Tunnel URL
      const HUGINN_WEBHOOK_URL = process.env.VITE_HUGINN_WEBHOOK_URL || 'http://localhost:3000/users/1/web_requests/1/SOLVY2026_enrollment'

      const response = await fetch(HUGINN_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enrollmentData)
      })

      if (response.ok) {
        setCurrentStep(5) // Show success screen
      } else {
        throw new Error('Enrollment submission failed')
      }
    } catch (error) {
      console.error('Enrollment error:', error)
      alert('❌ Enrollment failed. Please try again or contact support.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Rest of the component remains the same...
  // (Include all the existing JSX for steps 1-4 and success screen)
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Progress indicator */}
        {currentStep < 5 && (
          <div className="p-6 border-b">
            <div className="flex justify-between mb-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`flex-1 h-2 mx-1 rounded ${
                    step <= currentStep ? 'bg-purple-600' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600 text-center">
              Step {currentStep} of 4
            </p>
          </div>
        )}

        {/* Form content */}
        <div className="p-6">
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Basic Information</h2>
              <form className="space-y-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded"
                />
                <select
                  name="referralSource"
                  value={formData.referralSource}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded"
                  required
                >
                  <option value="">How did you hear about us?</option>
                  <option value="personal">Personal Referral</option>
                  <option value="social">Social Media</option>
                  <option value="ebl">EBL Beauty Lounge</option>
                  <option value="reign">Reign Products</option>
                  <option value="other">Other</option>
                </select>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full bg-purple-600 text-white py-3 rounded hover:bg-purple-700"
                >
                  Next →
                </button>
              </form>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Interest Profile</h2>
              <form className="space-y-4">
                <div>
                  <label className="block mb-2 font-semibold">What interests you most?</label>
                  {['SOLVY Debit Card', 'AI Tax Optimization', 'Self-Banking (IBC)', 'Data Sovereignty', 'Cooperative Economics'].map((interest) => (
                    <label key={interest} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        name="interests"
                        value={interest}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      {interest}
                    </label>
                  ))}
                </div>
                <select
                  name="currentStatus"
                  value={formData.currentStatus}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded"
                  required
                >
                  <option value="">Current Status</option>
                  <option value="employed">Employed (W-2)</option>
                  <option value="self-employed">Self-Employed</option>
                  <option value="business-owner">Business Owner</option>
                  <option value="unemployed">Seeking Opportunities</option>
                  <option value="retired">Retired</option>
                </select>
                
                {/* Business Information (if self-employed) */}
                {(formData.currentStatus === 'self-employed' || formData.currentStatus === 'business-owner') && (
                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-semibold mb-2">Business Information</h3>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded mb-3"
                    >
                      <option value="">Business Entity Type</option>
                      <option value="sole-proprietor">Sole Proprietor</option>
                      <option value="llc">LLC</option>
                      <option value="llp">LLP</option>
                      <option value="partnership">Partnership</option>
                      <option value="s-corp">S-Corp</option>
                      <option value="c-corp">C-Corp</option>
                    </select>
                    <input
                      type="text"
                      name="businessName"
                      placeholder="Business Legal Name"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded mb-3"
                    />
                    <input
                      type="text"
                      name="ein"
                      placeholder="EIN (XX-XXXXXXX)"
                      value={formData.ein}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded"
                    />
                  </div>
                )}
                
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded hover:bg-gray-400"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 bg-purple-600 text-white py-3 rounded hover:bg-purple-700"
                  >
                    Next →
                  </button>
                </div>
              </form>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Choose Your Tier</h2>
              <div className="space-y-4">
                <div
                  onClick={() => setSelectedTier('early-access')}
                  className={`p-4 border-2 rounded cursor-pointer ${
                    selectedTier === 'early-access' ? 'border-purple-600 bg-purple-50' : 'border-gray-300'
                  }`}
                >
                  <h3 className="font-bold text-lg">🥇 Early Access (Founding 100)</h3>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>✅ No monthly fees for first year ($120 value)</li>
                    <li>✅ Exclusive AI tax consultation - 30 min ($200 value)</li>
                    <li>✅ Founding member badge</li>
                    <li>✅ 20% lifetime discount on EBL & Reign</li>
                  </ul>
                </div>
                <div
                  onClick={() => setSelectedTier('waitlist')}
                  className={`p-4 border-2 rounded cursor-pointer ${
                    selectedTier === 'waitlist' ? 'border-purple-600 bg-purple-50' : 'border-gray-300'
                  }`}
                >
                  <h3 className="font-bold text-lg">🎫 Waitlist (Launch Day Priority)</h3>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>✅ Priority access on launch day</li>
                    <li>✅ Educational content library</li>
                    <li>✅ Community forum access</li>
                  </ul>
                </div>
                <div
                  onClick={() => setSelectedTier('updates')}
                  className={`p-4 border-2 rounded cursor-pointer ${
                    selectedTier === 'updates' ? 'border-purple-600 bg-purple-50' : 'border-gray-300'
                  }`}
                >
                  <h3 className="font-bold text-lg">📧 Just Browsing (Stay Informed)</h3>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>✅ Monthly newsletter</li>
                    <li>✅ Major announcements</li>
                  </ul>
                </div>
                
                {/* IBC Policy Loan Option */}
                <div className="border-t pt-4 mt-4">
                  <label className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      name="hasIbcPolicy"
                      checked={formData.hasIbcPolicy}
                      onChange={(e) => setFormData({ ...formData, hasIbcPolicy: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="font-semibold">I have an IBC policy and want to request a policy loan</span>
                  </label>
                  
                  {formData.hasIbcPolicy && (
                    <div className="space-y-3 mt-3">
                      <select
                        name="policyCompany"
                        value={formData.policyCompany}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded"
                      >
                        <option value="">Insurance Company</option>
                        <option value="OneAmerica">OneAmerica</option>
                        <option value="Mass Mutual">Mass Mutual</option>
                        <option value="Penn Mutual">Penn Mutual</option>
                        <option value="Other">Other</option>
                      </select>
                      <input
                        type="text"
                        name="policyNumber"
                        placeholder="Policy Number"
                        value={formData.policyNumber}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded"
                      />
                      <input
                        type="text"
                        name="desiredLoanAmount"
                        placeholder="Desired Loan Amount"
                        value={formData.desiredLoanAmount}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded"
                      />
                      <select
                        name="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded"
                      >
                        <option value="">Marital Status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                      </select>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded hover:bg-gray-400"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!selectedTier}
                    className="flex-1 bg-purple-600 text-white py-3 rounded hover:bg-purple-700 disabled:bg-gray-400"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Communication Preferences</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2 font-semibold">How should we contact you?</label>
                  {['Email', 'SMS', 'Phone Call'].map((method) => (
                    <label key={method} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        name="communications"
                        value={method}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      {method}
                    </label>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded hover:bg-gray-400"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-purple-600 text-white py-3 rounded hover:bg-purple-700 disabled:bg-gray-400"
                  >
                    {isSubmitting ? 'Submitting...' : 'Complete Enrollment →'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {currentStep === 5 && (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold mb-4">Welcome to SOVEREIGNITITY™!</h2>
              <p className="text-gray-600 mb-6">
                Your enrollment has been confirmed. Check your email for next steps.
              </p>
              <button
                onClick={onClose}
                className="bg-purple-600 text-white px-8 py-3 rounded hover:bg-purple-700"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

