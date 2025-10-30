import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle, ArrowRight, Users, Shield, Zap } from 'lucide-react';

const EnrollmentForm = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    referralSource: '',
    interests: [],
    currentStatus: '',
    enrollmentTier: '',
    communications: []
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // TODO: Send to backend API
    console.log('Enrollment Data:', formData);
    
    // For now, just show success
    setSubmitted(true);
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full bg-gradient-to-br from-purple-900/90 to-blue-900/90 border-purple-500/20">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </div>
            <CardTitle className="text-white text-3xl">Welcome to SOVEREIGNITITY™!</CardTitle>
            <CardDescription className="text-gray-300 text-lg">
              Your journey to economic liberation begins now
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-white text-lg">
              Thank you, <span className="text-purple-400 font-semibold">{formData.fullName}</span>!
            </p>
            <p className="text-gray-300">
              We've sent a confirmation email to <span className="text-blue-400">{formData.email}</span>
            </p>
            
            {formData.enrollmentTier === 'early-access' && (
              <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-lg p-4">
                <p className="text-yellow-300 font-semibold mb-2">🎉 Early Access Member!</p>
                <p className="text-gray-300 text-sm">
                  You're one of the first 100 founding members. Check your email for exclusive benefits and next steps.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/5 rounded-lg p-4">
                <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-white font-semibold">Join Community</p>
                <p className="text-gray-400 text-sm">Connect with other members</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-white font-semibold">Learn More</p>
                <p className="text-gray-400 text-sm">Data sovereignty resources</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-white font-semibold">Refer Friends</p>
                <p className="text-gray-400 text-sm">Share the movement</p>
              </div>
            </div>

            <Button 
              onClick={onClose}
              className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-3"
            >
              Continue Exploring
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <Card className="max-w-3xl w-full bg-gradient-to-br from-slate-900/95 to-purple-900/95 border-purple-500/20 my-8">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <CardTitle className="text-white text-2xl">Join SOVEREIGNITITY™</CardTitle>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= num ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400'
                }`}>
                  {num}
                </div>
                {num < 4 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    step > num ? 'bg-purple-600' : 'bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <CardDescription className="text-gray-300">
            {step === 1 && "Let's start with your basic information"}
            {step === 2 && "Tell us what interests you most"}
            {step === 3 && "Choose your enrollment tier"}
            {step === 4 && "How would you like to stay connected?"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-white mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-white mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-white mb-2">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div>
                  <label className="block text-white mb-2">How did you hear about SOVEREIGNITITY™? *</label>
                  <select
                    name="referralSource"
                    value={formData.referralSource}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="">Select one...</option>
                    <option value="personal">Personal referral from SA Nathan</option>
                    <option value="ebl">EBL Beauty Lounge customer</option>
                    <option value="social">Social media</option>
                    <option value="friend">Friend or family</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Interest Profile */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-white mb-3">What interests you most? (Select all that apply)</label>
                  <div className="space-y-2">
                    {[
                      { value: 'card', label: 'SOLVY Debit Card' },
                      { value: 'tax', label: 'AI Tax Assistant (Self-Employed)' },
                      { value: 'sovereignty', label: 'Data Sovereignty Tools' },
                      { value: 'ebl', label: 'EBL Beauty Services' },
                      { value: 'decidey', label: 'DECIDEY NGO Education' },
                      { value: 'all', label: 'All of the above' }
                    ].map((interest) => (
                      <label key={interest.value} className="flex items-center space-x-3 text-white cursor-pointer hover:bg-white/5 p-3 rounded-lg">
                        <input
                          type="checkbox"
                          checked={formData.interests.includes(interest.value)}
                          onChange={() => handleCheckboxChange('interests', interest.value)}
                          className="w-5 h-5 text-purple-600"
                        />
                        <span>{interest.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white mb-3">Current Status *</label>
                  <select
                    name="currentStatus"
                    value={formData.currentStatus}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="">Select one...</option>
                    <option value="self-employed">Self-Employed / Business Owner</option>
                    <option value="w2">W-2 Employee</option>
                    <option value="investor">Investor</option>
                    <option value="student">Student</option>
                    <option value="retired">Retired / Receiving Government Benefits</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Commitment Level */}
            {step === 3 && (
              <div className="space-y-4">
                <label className="block text-white mb-4 text-lg">Choose Your Enrollment Tier *</label>
                
                <div 
                  onClick={() => setFormData(prev => ({ ...prev, enrollmentTier: 'early-access' }))}
                  className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.enrollmentTier === 'early-access' 
                      ? 'border-yellow-500 bg-yellow-600/10' 
                      : 'border-white/20 bg-white/5 hover:border-purple-500'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-white text-xl font-bold">Early Access</h3>
                      <Badge className="bg-yellow-600 mt-2">First 100 Members</Badge>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 ${
                      formData.enrollmentTier === 'early-access'
                        ? 'border-yellow-500 bg-yellow-500'
                        : 'border-white/40'
                    }`} />
                  </div>
                  <ul className="text-gray-300 space-y-2">
                    <li>✓ No monthly fees for first year</li>
                    <li>✓ Exclusive AI tax consultation (30 min)</li>
                    <li>✓ Founding member badge</li>
                    <li>✓ 20% lifetime discount on EBL & Reign</li>
                    <li>✓ Guapcoin bonus at Phase 3 launch</li>
                  </ul>
                </div>

                <div 
                  onClick={() => setFormData(prev => ({ ...prev, enrollmentTier: 'waitlist' }))}
                  className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.enrollmentTier === 'waitlist' 
                      ? 'border-purple-500 bg-purple-600/10' 
                      : 'border-white/20 bg-white/5 hover:border-purple-500'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-white text-xl font-bold">Waitlist</h3>
                      <Badge className="bg-purple-600 mt-2">Launch Day Priority</Badge>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 ${
                      formData.enrollmentTier === 'waitlist'
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-white/40'
                    }`} />
                  </div>
                  <ul className="text-gray-300 space-y-2">
                    <li>✓ Priority access on launch day</li>
                    <li>✓ Educational content library</li>
                    <li>✓ Community forum access</li>
                    <li>✓ Early partnership notifications</li>
                  </ul>
                </div>

                <div 
                  onClick={() => setFormData(prev => ({ ...prev, enrollmentTier: 'updates' }))}
                  className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.enrollmentTier === 'updates' 
                      ? 'border-blue-500 bg-blue-600/10' 
                      : 'border-white/20 bg-white/5 hover:border-purple-500'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-white text-xl font-bold">Just Browsing</h3>
                      <Badge className="bg-blue-600 mt-2">Stay Informed</Badge>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 ${
                      formData.enrollmentTier === 'updates'
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-white/40'
                    }`} />
                  </div>
                  <ul className="text-gray-300 space-y-2">
                    <li>✓ Quarterly updates via email</li>
                    <li>✓ No commitment required</li>
                    <li>✓ Upgrade anytime</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Step 4: Communication Preferences */}
            {step === 4 && (
              <div className="space-y-4">
                <label className="block text-white mb-4 text-lg">How would you like to stay connected?</label>
                <div className="space-y-3">
                  {[
                    { value: 'email-updates', label: 'Email updates about SOLVY Card launch' },
                    { value: 'sms', label: 'SMS notifications for early access' },
                    { value: 'events', label: 'Invitations to exclusive events' },
                    { value: 'education', label: 'Educational content about data sovereignty' }
                  ].map((comm) => (
                    <label key={comm.value} className="flex items-center space-x-3 text-white cursor-pointer hover:bg-white/5 p-3 rounded-lg">
                      <input
                        type="checkbox"
                        checked={formData.communications.includes(comm.value)}
                        onChange={() => handleCheckboxChange('communications', comm.value)}
                        className="w-5 h-5 text-purple-600"
                      />
                      <span>{comm.label}</span>
                    </label>
                  ))}
                </div>

                <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-4 mt-6">
                  <p className="text-blue-300 text-sm">
                    <strong>Privacy Promise:</strong> Your data belongs to YOU. We'll never sell your information. 
                    That's the whole point of SOVEREIGNITITY™.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button
                  type="button"
                  onClick={prevStep}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Previous
                </Button>
              )}
              
              {step < 4 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-purple-600 hover:bg-purple-700 ml-auto"
                  disabled={
                    (step === 1 && (!formData.fullName || !formData.email || !formData.referralSource)) ||
                    (step === 2 && (!formData.currentStatus || formData.interests.length === 0)) ||
                    (step === 3 && !formData.enrollmentTier)
                  }
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 ml-auto"
                  disabled={formData.communications.length === 0}
                >
                  Complete Enrollment <CheckCircle className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnrollmentForm;

