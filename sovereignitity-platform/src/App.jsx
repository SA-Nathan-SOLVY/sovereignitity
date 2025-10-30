import React, { useState } from 'react';
import './App.css';
import solvyLogo from './assets/solvy-logo.png';
import heroPaymentImage from './assets/hero-payment-image.webp';

// Tax Assistant Class
class TaxAssistant {
  constructor() {
    this.baseUrl = 'https://xlhyimcdv1l8.manus.space/api/tax';
  }

  async analyzeFinancialSituation(financialData, scenario = 'general') {
    try {
      const response = await fetch(`${this.baseUrl}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          financial_data: financialData,
          tax_scenario: scenario
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Tax analysis error:', error);
      return { error: error.message };
    }
  }

  async getAvailableScenarios() {
    try {
      const response = await fetch(`${this.baseUrl}/scenarios`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching scenarios:', error);
      return { scenarios: [] };
    }
  }
}

// Initialize tax assistant
const taxAssistant = new TaxAssistant();

import { Button } from './components/ui/button'
import AdminDashboard from './components/AdminDashboard'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { ChevronDown, Shield, CreditCard, Users, TrendingUp, Globe, Zap, Lock, GraduationCap, Building, Coins, Award, Target, MapPin, Calendar, DollarSign, Eye, Database, Brain, Banknote } from 'lucide-react'
import PresentationSlider from './components/PresentationSlider.jsx'
import './App.css'
import EnrollmentForm from './components/EnrollmentForm.jsx'
import EBLPage from './pages/EBLPage';
import SolvyCardPage from './pages/SolvyCardPage';
import DecideyPage from './pages/DecideyPage';
import RemittancePage from './pages/RemittancePage';
import EmailConfigPage from './pages/EmailConfigPage';

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [selectedCommunity, setSelectedCommunity] = useState('global')
  const [showCommunityDropdown, setShowCommunityDropdown] = useState(false)
  const [showFinancialDropdown, setShowFinancialDropdown] = useState(false)
  const [showProductsDropdown, setShowProductsDropdown] = useState(false)
  const [showPlatformDropdown, setShowPlatformDropdown] = useState(false)
  
  // Tax Assistant State
  const [taxScenario, setTaxScenario] = useState('general')
  const [financialInfo, setFinancialInfo] = useState('')
  const [taxResults, setTaxResults] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showTaxAssistant, setShowTaxAssistant] = useState(false)
  const [showEnrollment, setShowEnrollment] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')

  const communities = [
    { id: 'global', name: 'Global Diaspora', flag: '🌍', campaigns: 3 },
    { id: 'african', name: 'African Diaspora', flag: '🌍', campaigns: 4 },
    { id: 'filipino', name: 'Filipino Community', flag: '🇵🇭', campaigns: 2 },
    { id: 'caribbean', name: 'Caribbean', flag: '🏝️', campaigns: 3 },
    { id: 'latino', name: 'Latino Community', flag: '🌎', campaigns: 3 },
    { id: 'asian', name: 'Asian Community', flag: '🌏', campaigns: 3 }
  ]

  const campaigns = {
    global: [
      { name: 'Economic Sovereignty Awareness', status: 'Active', budget: '$15,000', reach: '50K+' },
      { name: 'Data Ownership Education', status: 'Active', budget: '$12,000', reach: '35K+' },
      { name: 'AI Liberation Campaign', status: 'Planning', budget: '$20,000', reach: 'TBD' }
    ],
    african: [
      { name: 'Diaspora Remittance Revolution', status: 'Active', budget: '$25,000', reach: '75K+' },
      { name: 'Nigeria Partnership Launch', status: 'Active', budget: '$18,000', reach: '40K+' },
      { name: 'Ghana Economic Hub', status: 'Planning', budget: '$22,000', reach: 'TBD' },
      { name: 'Kenya Cooperative Network', status: 'Planning', budget: '$20,000', reach: 'TBD' }
    ],
    filipino: [
      { name: 'OFW Financial Freedom', status: 'Active', budget: '$16,000', reach: '30K+' },
      { name: 'Philippines Partnership', status: 'Planning', budget: '$14,000', reach: 'TBD' }
    ],
    caribbean: [
      { name: 'Island Economic Network', status: 'Active', budget: '$13,000', reach: '25K+' },
      { name: 'Remittance Cost Reduction', status: 'Active', budget: '$11,000', reach: '20K+' },
      { name: 'Cooperative Banking Pilot', status: 'Planning', budget: '$15,000', reach: 'TBD' }
    ],
    latino: [
      { name: 'Mexico Corridor Optimization', status: 'Active', budget: '$19,000', reach: '45K+' },
      { name: 'Central America Network', status: 'Active', budget: '$17,000', reach: '35K+' },
      { name: 'South America Expansion', status: 'Planning', budget: '$21,000', reach: 'TBD' }
    ],
    asian: [
      { name: 'Southeast Asia Hub', status: 'Active', budget: '$18,000', reach: '40K+' },
      { name: 'India Partnership Development', status: 'Active', budget: '$16,000', reach: '38K+' },
      { name: 'China Market Entry', status: 'Planning', budget: '$25,000', reach: 'TBD' }
    ]
  }

  const currentCommunity = communities.find(c => c.id === selectedCommunity)
  const currentCampaigns = campaigns[selectedCommunity] || []

  // Tax Analysis Function
  const runTaxAnalysis = async () => {
    if (!financialInfo.trim()) {
      alert('Please describe your financial situation');
      return;
    }
    
    setIsAnalyzing(true);
    setTaxResults(null);
    
    try {
      const analysis = await taxAssistant.analyzeFinancialSituation(financialInfo, taxScenario);
      setTaxResults(analysis);
    } catch (error) {
      setTaxResults({ error: error.message });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatTaxAnalysis = (analysis) => {
    if (analysis.error) {
      return `<div class="text-red-400">Error: ${analysis.error}</div>`;
    }
    
    if (analysis.analysis && analysis.analysis.choices && analysis.analysis.choices[0]) {
      const content = analysis.analysis.choices[0].message.content;
      return content.replace(/\n/g, '<br>');
    }
    
    return '<div class="text-yellow-400">No analysis returned</div>';
  };

  
  // Admin Dashboard Route
  if (showAdmin) {
    return <AdminDashboard />
  }

  // Handle page routing
  if (currentPage === 'ebl') {
    return (
      <div>
        <EBLPage />
        <div className="fixed top-4 left-4 z-50">
          <Button onClick={() => setCurrentPage('home')} className="bg-green-600 hover:bg-green-700 text-white">
            ← Back to Home
          </Button>
        </div>
      </div>
    );
  }

  if (currentPage === 'solvy-card') {
    return (
      <div>
        <SolvyCardPage />
        <div className="fixed top-4 left-4 z-50">
          <Button onClick={() => setCurrentPage('home')} className="bg-green-600 hover:bg-green-700 text-white">
            ← Back to Home
          </Button>
        </div>
      </div>
    );
  }

  if (currentPage === 'decidey') {
    return (
      <div>
        <DecideyPage />
        <div className="fixed top-4 left-4 z-50">
          <Button onClick={() => setCurrentPage('home')} className="bg-green-600 hover:bg-green-700 text-white">
            ← Back to Home
          </Button>
        </div>
      </div>
    );
  }

  if (currentPage === 'remittance') {
    return (
      <div>
        <RemittancePage />
        <div className="fixed top-4 left-4 z-50">
          <Button onClick={() => setCurrentPage('home')} className="bg-green-600 hover:bg-green-700 text-white">
            ← Back to Home
          </Button>
        </div>
      </div>
    );
  }

  if (currentPage === 'email-config') {
    return (
      <div>
        <EmailConfigPage />
        <div className="fixed top-4 left-4 z-50">
          <Button onClick={() => setCurrentPage('home')} className="bg-green-600 hover:bg-green-700 text-white">
            ← Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <div className="flex items-center space-x-4">
              <img src={solvyLogo} alt="SOLVY" className="h-10 w-auto" />
              <div className="text-white">
                <h1 className="text-xl font-bold">SOVEREIGNITITY™</h1>
                <p className="text-xs text-purple-300">Economic Liberation Platform</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center justify-center flex-1 gap-6">
              <button 
                onClick={() => setShowEnrollment(true)}
                className={`text-white hover:text-purple-300 transition-colors ${activeSection === 'home' ? 'text-purple-400' : ''}`}
              >
                Home
              </button>
              
              <button 
                onClick={() => setActiveSection('tax-assistant')}
                className={`flex items-center text-white hover:text-purple-300 transition-colors ${activeSection === 'tax-assistant' ? 'text-purple-400' : ''}`}
              >
                <Brain className="mr-1 h-4 w-4" />
                AI Tax Assistant
              </button>
              
              {/* Financial Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setShowFinancialDropdown(!showFinancialDropdown)}
                  className="flex items-center text-white hover:text-purple-300 transition-colors"
                >
                  Financial <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {showFinancialDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-black/90 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl z-50">
                    <div className="p-2">
                      <button onClick={() => setCurrentPage('solvy-card')} className="flex items-center px-3 py-2 text-white hover:bg-white/10 rounded w-full text-left">
                        <CreditCard className="mr-2 h-4 w-4 text-green-400" />
                        <div>
                          <div className="font-medium">SOLVY Debit Card</div>
                          <div className="text-xs text-green-400">MVP - Entry to Sovereignty</div>
                        </div>
                      </button>
                      <button onClick={() => setCurrentPage('decidey')} className="flex items-center px-3 py-2 text-white hover:bg-white/10 rounded w-full text-left">
                        <GraduationCap className="mr-2 h-4 w-4 text-blue-400" />
                        <div>
                          <div className="font-medium">DECIDEY NGO</div>
                          <div className="text-xs text-blue-400">Education & Advocacy</div>
                        </div>
                      </button>
                      <a href="https://decidey-4bhjvq.manus.space/decidey" target="_blank" className="flex items-center px-3 py-2 text-white hover:bg-white/10 rounded">
                        <Building className="mr-2 h-4 w-4 text-purple-400" />
                        <div>
                          <div className="font-medium">IBC/BYOB Banking</div>
                          <div className="text-xs text-purple-400">Vision - 2026++</div>
                        </div>
                      </a>
                      <a href="https://decidey-4bhjvq.manus.space/moli" target="_blank" className="flex items-center px-3 py-2 text-white hover:bg-white/10 rounded">
                        <Shield className="mr-2 h-4 w-4 text-purple-400" />
                        <div>
                          <div className="font-medium">LIFE/MOLI Program</div>
                          <div className="text-xs text-purple-400">decidey-4bhjvq.manus.space/moli</div>
                        </div>
                      </a>
                      <button onClick={() => setCurrentPage('remittance')} className="flex items-center px-3 py-2 text-white hover:bg-white/10 rounded w-full text-left">
                        <Globe className="mr-2 h-4 w-4 text-orange-400" />
                        <div>
                          <div className="font-medium">Global Remittance</div>
                          <div className="text-xs text-orange-400">Vision - 2026+++</div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button onClick={() => setCurrentPage('ebl')} className="text-white hover:text-purple-300 transition-colors">
                Evergreen Beauty Lounge
              </button>
              
              <a href="https://ebl.jewelpads.com" target="_blank" className="text-white hover:text-purple-300 transition-colors">
                Reign Products
              </a>
              
              <button onClick={() => setCurrentPage('solvy-card')} className="text-white hover:text-purple-300 transition-colors">
                SOLVY Debit Card
              </button>
              
              <button 
                onClick={() => setActiveSection('about')}
                className={`text-white hover:text-purple-300 transition-colors ${activeSection === 'about' ? 'text-purple-400' : ''}`}
              >
                About
              </button>

              <button 
                onClick={() => setActiveSection('marketing')}
                className={`text-white hover:text-purple-300 transition-colors ${activeSection === 'marketing' ? 'text-purple-400' : ''}`}
              >
                Marketing
              </button>

              <button 
                onClick={() => setCurrentPage('email-config')}
                className="text-white hover:text-purple-300 transition-colors"
              >
                Email Config
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                Sign In
              </Button>
              <Button size="sm" onClick={() => setShowEnrollment(true)} className="bg-purple-600 hover:bg-purple-700">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-8">
                <img src={solvyLogo} alt="SOLVY Crown" className="w-20 h-20" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                <span className="text-blue-400">SOLUTIONS VALUED</span>{' '}
                <span className="text-pink-400">YOU</span>
              </h1>
              <h2 className="text-3xl font-semibold mb-6 text-white">Your Economic Declaration of Independence</h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                They're building digital cages with CBDCs, social scoring, and AI surveillance. We're building the keys: <span className="text-purple-400 font-semibold">data ownership</span>, <span className="text-blue-400">sovereign banking</span>, and <span className="text-yellow-400">AI empowerment</span>. Built on <span className="text-blue-400">Polygon blockchain</span> with <span className="text-yellow-400">DeepSeek AI</span> tax assistance for self-employed members.
              </p>
              <div className="bg-purple-600/10 border border-purple-500/20 rounded-lg p-4 mb-6">
                <p className="text-sm text-purple-200 text-center">
                  <span className="font-semibold">Your Journey:</span> Start with the SOLVY Debit Card → Progress to self-employment → Achieve data sovereignty → Build autonomous income
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => setShowEnrollment(true)}
                  size="lg" 
                  className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-3"
                >
                  Join the Parallel Economy →
                </Button>

              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl p-8 border border-purple-500/20">
                <h3 className="text-2xl font-bold text-white mb-4">SOLVY Payment Processing</h3>
                <p className="text-lg text-gray-300 mb-6">Your economic freedom requires payment freedom</p>
                <div className="bg-white/10 rounded-lg p-4">
                  <img 
                    src={heroPaymentImage} 
                    alt="Professional Payment Processing" 
                    className="w-full h-48 rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-24 bg-gradient-to-br from-red-900/20 to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">The SOVEREIGNITITY™ Manifesto</h2>
            <p className="text-xl text-gray-300">Your Economic Declaration of Independence</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border-red-500/20">
              <CardHeader>
                <div className="flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mx-auto mb-4">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-center">The Wake-Up Call</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-300">They told you this was freedom. A bank account that tracks your every purchase. A digital identity that can be switched off for wrongthink. The system isn't broken - it's working exactly as designed.</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/20">
              <CardHeader>
                <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-center">The Sovereign Solution</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-300">SOVEREIGNITITY™ isn't another app. It's your exit strategy. We're building parallel economic infrastructure that can't be turned off. Where your data becomes your property.</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/20">
              <CardHeader>
                <div className="flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-center">Join the Revolution</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-300">Stop being a user. Start being an owner. Stop being a consumer. Start being a sovereign. The SOLVY Card isn't just payment technology - it's your declaration of economic independence.</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-purple-600/20 to-red-600/20 rounded-lg p-8 border border-purple-500/20 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Our Core Principles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Database className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                <h4 className="text-lg font-semibold text-white mb-2">Data Sovereignty</h4>
                <p className="text-gray-300">"You are the product" ends now. Your data becomes YOUR property.</p>
              </div>
              <div>
                <Banknote className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                <h4 className="text-lg font-semibold text-white mb-2">Economic Autonomy</h4>
                <p className="text-gray-300">When AI takes your job, your data economy becomes your safety net.</p>
              </div>
              <div>
                <Brain className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                <h4 className="text-lg font-semibold text-white mb-2">AI Liberation</h4>
                <p className="text-gray-300">We use AI for empowerment, not displacement. DeepSeek works FOR you.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Statement Section - Economic Freedom Manifesto */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block mb-6">
                <div className="text-6xl mb-4">🦅</div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                SOVEREIGNITITY™ VISION STATEMENT
              </h2>
              <h3 className="text-2xl md:text-3xl text-purple-300 font-semibold mb-8">
                Our Economic Freedom Manifesto
              </h3>
            </div>

            <Card className="bg-white/5 border-purple-500/20 backdrop-blur-sm mb-8">
              <CardContent className="p-8">
                <p className="text-xl text-white text-center leading-relaxed mb-6">
                  <strong>We believe every American deserves true economic sovereignty.</strong>
                </p>
                <p className="text-lg text-gray-300 text-center leading-relaxed">
                  As a service member who defended this nation's freedoms, I'm now building the next frontier of liberty: 
                  <span className="text-purple-300 font-semibold"> economic independence through cooperative ownership.</span>
                </p>
              </CardContent>
            </Card>

            <div className="mb-12">
              <h3 className="text-2xl font-bold text-white text-center mb-8">Our Three-Pillar Mission:</h3>
              
              <div className="space-y-6">
                <Card className="bg-gradient-to-r from-blue-900/40 to-blue-800/40 border-blue-500/30">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">🛡️</div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-blue-300 mb-2">DATA SOVEREIGNTY</h4>
                        <p className="text-gray-300 italic">
                          Your digital identity, your rules. We're building tools that put you in control of your data, 
                          your communications, and your digital footprint.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-900/40 to-purple-800/40 border-purple-500/30">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">🤝</div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-purple-300 mb-2">COOPERATIVE ECONOMICS</h4>
                        <p className="text-gray-300 italic">
                          From Member-Owned Life Insurance (MOLI) to community capital recycling - we're creating wealth 
                          systems that benefit members, not distant corporations.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-yellow-900/40 to-yellow-800/40 border-yellow-500/30">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">🔗</div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-yellow-300 mb-2">SOVEREIGN CURRENCY</h4>
                        <p className="text-gray-300 italic">
                          Through Guapcoin blockchain integration, we're building toward true monetary independence - 
                          the ultimate expression of economic freedom.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="bg-gradient-to-br from-green-900/40 to-emerald-800/40 border-green-500/30 mb-8">
              <CardContent className="p-8">
                <h4 className="text-2xl font-bold text-green-300 text-center mb-4">Our Founding Principle:</h4>
                <p className="text-xl text-white text-center leading-relaxed">
                  <strong>This isn't about fighting the system - it's about building a better one.</strong> One that honors 
                  America's promise of life, liberty, and the pursuit of happiness through actual economic democracy.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm mb-8">
              <CardContent className="p-8">
                <h4 className="text-2xl font-bold text-white text-center mb-4">What We're Launching Now:</h4>
                <p className="text-lg text-gray-300 text-center leading-relaxed mb-6">
                  The <span className="text-purple-300 font-semibold">SOLVY Debit Card</span> is your entry point to economic sovereignty. 
                  For self-employed members, it includes <span className="text-blue-300 font-semibold">AI-powered tax optimization</span> - 
                  giving you immediate value while we build toward the larger vision of complete economic independence.
                </p>
                <div className="text-center">
                  <Button 
                    onClick={() => setShowEnrollment(true)}
                    size="lg" 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-3"
                  >
                    Join the Movement
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <h4 className="text-2xl font-bold text-white mb-6">Join Us In Building:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-gray-300">A future where your data works <span className="text-purple-300 font-semibold">for you</span>, not against you</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-gray-300">An economy where wealth <span className="text-blue-300 font-semibold">circulates within our community</span></p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-gray-300">A financial system that serves <span className="text-green-300 font-semibold">people first</span></p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-gray-300">The next chapter of <span className="text-yellow-300 font-semibold">American economic freedom</span></p>
                </div>
              </div>
              
              <Card className="bg-gradient-to-r from-red-900/30 via-white/10 to-blue-900/30 border-white/20">
                <CardContent className="p-6">
                  <p className="text-xl text-white font-semibold text-center">
                    This is more than an app - it's the beginning of an economic revolution built on cooperation, not extraction.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Development Roadmap - Inspired by Remittance Page */}
      <section className="py-24 bg-gradient-to-br from-slate-900/50 to-purple-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">🗓️ Development Roadmap</h2>
            <p className="text-xl text-gray-300">Building the future of economic sovereignty through strategic phases</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Phase 1: MVP Foundation */}
            <Card className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-500/20">
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-full mx-auto mb-4 p-2">
                  <img src={solvyLogo} alt="SOLVY Crown" className="w-full h-full object-contain filter brightness-0 invert" />
                </div>
                <CardTitle className="text-white">Phase 1: MVP Foundation</CardTitle>
                <CardDescription className="text-gray-300">2025 Q1-Q2</CardDescription>
              </CardHeader>
              <CardContent className="text-white">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    EBL Services integration (Current)
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    SOLVY Card deployment
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    DeepSeek AI Tax Assistant
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    Data monetization engine
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Phase 2: Education & Expansion */}
            <Card className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border-blue-500/20">
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full mx-auto mb-4 p-2">
                  <img src={solvyLogo} alt="SOLVY Crown" className="w-full h-full object-contain filter brightness-0 invert" />
                </div>
                <CardTitle className="text-white">Phase 2: Education & Expansion</CardTitle>
                <CardDescription className="text-gray-300">2025 Q3-Q4</CardDescription>
              </CardHeader>
              <CardContent className="text-white">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                    DECIDEY NGO education platform
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                    Sovereignty education campaigns
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                    Community network building
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                    Regional partnerships
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Phase 3: Banking Infrastructure */}
            <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/20">
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 bg-purple-600 rounded-full mx-auto mb-4 p-2">
                  <img src={solvyLogo} alt="SOLVY Crown" className="w-full h-full object-contain filter brightness-0 invert" />
                </div>
                <CardTitle className="text-white">Phase 3: Banking Infrastructure</CardTitle>
                <CardDescription className="text-gray-300">2026 Q1-Q2</CardDescription>
              </CardHeader>
              <CardContent className="text-white">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    IBC/BYOB banking education
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    LIFE/MOLI program launch
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    Cooperative bank infrastructure
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    Policy loan system
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Phase 4: Global Network */}
            <Card className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border-orange-500/20">
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 bg-orange-600 rounded-full mx-auto mb-4 p-2">
                  <img src={solvyLogo} alt="SOLVY Crown" className="w-full h-full object-contain filter brightness-0 invert" />
                </div>
                <CardTitle className="text-white">Phase 4: Global Network</CardTitle>
                <CardDescription className="text-gray-300">2026 Q3+</CardDescription>
              </CardHeader>
              <CardContent className="text-white">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                    Global remittance network
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                    Multi-currency support
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                    International partnerships
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                    Economic sovereignty achievement
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-purple-600/20 to-green-600/20 rounded-lg p-8 border border-purple-500/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center">
                <img src={solvyLogo} alt="SOLVY Crown" className="w-8 h-8 mr-2" />
                SOLVY Crown Status Legend
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mx-auto mb-4 p-3">
                    <img src={solvyLogo} alt="SOLVY Crown" className="w-full h-full object-contain filter brightness-0 invert" />
                  </div>
                  <span className="text-green-400 font-semibold text-lg">In Progress</span>
                  <p className="text-gray-300 mt-2">Current MVP development and active features available now</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 p-3">
                    <img src={solvyLogo} alt="SOLVY Crown" className="w-full h-full object-contain filter brightness-0 invert" />
                  </div>
                  <span className="text-blue-400 font-semibold text-lg">Planned</span>
                  <p className="text-gray-300 mt-2">Near-term development with confirmed timelines and funding</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mx-auto mb-4 p-3">
                    <img src={solvyLogo} alt="SOLVY Crown" className="w-full h-full object-contain filter brightness-0 invert" />
                  </div>
                  <span className="text-purple-400 font-semibold text-lg">Vision</span>
                  <p className="text-gray-300 mt-2">Future features pending MVP success and strategic partnerships</p>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-gray-300 text-sm">
                  <span className="text-yellow-400 font-semibold">Note:</span> Orange crowns represent extended vision phases (2026+) for global network expansion
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current MVP Focus */}
      <section className="py-24 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">🚀 Current MVP: Your Liberation Toolkit</h2>
            <p className="text-xl text-gray-300">Available now - your entry point to economic sovereignty</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/20">
              <CardHeader>
                <div className="flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-center">SOLVY Debit Card MVP</CardTitle>
                <CardDescription className="text-gray-300 text-center">
                  Your Entry Point to Economic Sovereignty
                </CardDescription>
              </CardHeader>
              <CardContent className="text-white">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl mb-4">💳</div>
                    <h4 className="text-lg font-semibold mb-3 text-purple-300">Crypto-Native Debit Card</h4>
                    <p className="text-gray-300">Built on Polygon blockchain for low-cost, fast transactions. Your gateway to data sovereignty and economic autonomy.</p>
                  </div>
                  <div className="bg-yellow-600/10 border border-yellow-500/20 rounded-lg p-4">
                    <div className="flex items-center justify-center mb-2">
                      <Brain className="w-6 h-6 text-yellow-400 mr-2" />
                      <h5 className="text-yellow-300 font-semibold">Includes: DeepSeek AI Tax Assistant</h5>
                    </div>
                    <p className="text-gray-300 text-sm text-center">For self-employed business members: AI-powered tax optimization that works FOR you, helping you keep more of what you earn.</p>
                  </div>
                  <div className="text-center pt-2">
                    <p className="text-sm text-purple-300 font-semibold">Member Journey:</p>
                    <p className="text-xs text-gray-400">Debit Card → Self-Employment → Data Sovereignty → Income Earning</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border-blue-500/20">
              <CardHeader>
                <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-center">Data Sovereignty Platform</CardTitle>
                <CardDescription className="text-gray-300 text-center">
                  Own Your Digital Identity
                </CardDescription>
              </CardHeader>
              <CardContent className="text-white">
                <div className="text-center">
                  <div className="text-4xl mb-4">🔐</div>
                  <h4 className="text-lg font-semibold mb-3 text-blue-300">SOVEREIGNITITY™ Interface</h4>
                  <p className="text-gray-300">Simple, powerful digital identity management. Control how you interact with the world on your terms.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/20">
              <CardHeader>
                <div className="flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mx-auto mb-4">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-center">Data Monetization Engine</CardTitle>
                <CardDescription className="text-gray-300 text-center">
                  Your Data, Your Money
                </CardDescription>
              </CardHeader>
              <CardContent className="text-white">
                <div className="text-center">
                  <div className="text-4xl mb-4">💰</div>
                  <h4 className="text-lg font-semibold mb-3 text-green-300">Get Paid for Being You</h4>
                  <p className="text-gray-300">Turn your digital footprint into your digital paycheck. Finally get paid for what's already being stolen.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button onClick={() => setShowEnrollment(true)} className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-3">
              Get Your SOVEREIGNITITY™ Card Now →
            </Button>
          </div>
        </div>
      </section>

      {/* Current Revenue Sources Integration */}
      <section className="py-24 bg-gradient-to-br from-green-900/20 to-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">💼 Revenue-Backed Sovereignty</h2>
            <p className="text-xl text-gray-300">Real businesses funding real liberation technology</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-r from-pink-900/20 to-purple-900/20 border-pink-500/20">
              <CardHeader>
                <div className="flex items-center justify-center w-16 h-16 bg-pink-600 rounded-full mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-center">EBL Evergreen Beauty Lounge</CardTitle>
                <CardDescription className="text-gray-300 text-center">
                  Live Revenue Source → SOVEREIGNITITY™ Integration
                </CardDescription>
              </CardHeader>
              <CardContent className="text-white">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Current Status:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center p-1">
                        <img src={solvyLogo} alt="SOLVY Crown" className="w-full h-full object-contain filter brightness-0 invert" />
                      </div>
                      <span className="text-green-400 text-sm font-semibold">Live & Operational</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Payment System:</span>
                    <span className="text-white">Secure Payment Processing</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Integration Phase:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center p-1">
                        <img src={solvyLogo} alt="SOLVY Crown" className="w-full h-full object-contain filter brightness-0 invert" />
                      </div>
                      <span className="text-blue-400 text-sm font-semibold">MVP Pilot Business</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-pink-500/20">
                    <p className="text-xs text-gray-400 text-center">
                      <span className="text-pink-300 font-semibold">Pilot Strategy:</span> Validating secure payment processing infrastructure. Future phases will integrate crypto-native card issuing and full SOLVY ecosystem.
                    </p>
                  </div>
                  <Button className="w-full bg-pink-600 hover:bg-pink-700" asChild>
                    <a href="https://ebl.beauty" target="_blank">Visit EBL Beauty →</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-500/20">
              <CardHeader>
                <div className="flex items-center justify-center w-16 h-16 bg-yellow-600 rounded-full mx-auto mb-4">
                  <Coins className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-center">Reign Products</CardTitle>
                <CardDescription className="text-gray-300 text-center">
                  Premium Revenue Stream → Ecosystem Participation
                </CardDescription>
              </CardHeader>
              <CardContent className="text-white">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Current Status:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center p-1">
                        <img src={solvyLogo} alt="SOLVY Crown" className="w-full h-full object-contain filter brightness-0 invert" />
                      </div>
                      <span className="text-green-400 text-sm font-semibold">Live & Operational</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Product Line:</span>
                    <span className="text-white">Premium Products & Services</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Integration Phase:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center p-1">
                        <img src={solvyLogo} alt="SOLVY Crown" className="w-full h-full object-contain filter brightness-0 invert" />
                      </div>
                      <span className="text-blue-400 text-sm font-semibold">Payment Upgrade</span>
                    </div>
                  </div>
                  <Button className="w-full bg-yellow-600 hover:bg-yellow-700" asChild>
                    <a href="https://ebl.jewelpads.com" target="_blank">Visit Reign Products →</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg p-8 border border-green-500/20">
              <h3 className="text-2xl font-bold text-white mb-4">Strategic Advantage</h3>
              <p className="text-lg text-gray-300 mb-6">
                "We're not seeking funding to prove a concept - we're scaling proven revenue sources into a complete sovereignty ecosystem."
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <span className="text-green-400 font-semibold">Proven Revenue:</span>
                  <p className="text-gray-300">Live businesses with established customer bases</p>
                </div>
                <div>
                  <span className="text-blue-400 font-semibold">Customer Trust:</span>
                  <p className="text-gray-300">Existing relationships provide migration foundation</p>
                </div>
                <div>
                  <span className="text-purple-400 font-semibold">Integration Ready:</span>
                  <p className="text-gray-300">Existing infrastructure to build upon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Presentation */}
      <section className="py-24 bg-gradient-to-br from-indigo-900/20 to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">📊 The SOVEREIGNITITY™ Vision</h2>
            <p className="text-xl text-gray-300">Interactive presentation explaining our economic liberation strategy</p>
          </div>
          
          <div className="bg-black/20 rounded-2xl p-8 border border-white/10">
            <PresentationSlider />
          </div>
        </div>
      </section>

      {/* About Section */}
      {activeSection === 'about' && (
        <section className="py-24 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">About SOVEREIGNITITY™</h2>
              <p className="text-xl text-gray-300">Building Economic Freedom Through Cooperative Ownership</p>
            </div>
            
            {/* Ownership Structure */}
            <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded-lg p-8 border border-purple-500/20 mb-12">
              <h3 className="text-3xl font-bold text-white mb-6 text-center">Ownership & Leadership</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <Card className="bg-black/40 border-purple-500/30">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-3xl">👑</span>
                      </div>
                    </div>
                    <CardTitle className="text-white text-center">Sean Maurice Mayo</CardTitle>
                    <CardDescription className="text-center text-purple-300">SA Nathan / Founder & CEO</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="mb-4">
                      <Badge className="bg-green-600 mb-2">Primary Owner</Badge>
                      <Badge className="bg-purple-600 ml-2">TDUI Protected</Badge>
                    </div>
                    <p className="text-gray-300 text-sm mb-4">
                      U.S. Military Veteran, Economic Sovereignty Advocate, and Builder of Parallel Financial Systems.
                    </p>
                    <p className="text-purple-400 text-sm font-semibold">
                      Vision: Economic independence through cooperative ownership and data sovereignty.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border-pink-500/30">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-3xl">🌸</span>
                      </div>
                    </div>
                    <CardTitle className="text-white text-center">Evergreen P. Mayo</CardTitle>
                    <CardDescription className="text-center text-pink-300">Co-Owner & EBL Director</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="mb-4">
                      <Badge className="bg-pink-600 mb-2">TDUI Co-Owner</Badge>
                      <Badge className="bg-purple-600 ml-2">Protected</Badge>
                    </div>
                    <p className="text-gray-300 text-sm mb-4">
                      Director of Evergreen Beauty Lounge, business operations expert, and strategic partner in building the SOLVY ecosystem.
                    </p>
                    <p className="text-pink-400 text-sm font-semibold">
                      Role: Revenue operations, EBL integration, family wealth protection.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border-blue-500/30">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                        <span className="text-3xl">🎯</span>
                      </div>
                    </div>
                    <CardTitle className="text-white text-center">Sean Marlon McDaniel II</CardTitle>
                    <CardDescription className="text-center text-blue-300">QA Lead & SCRUM Specialist</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="mb-4">
                      <Badge className="bg-blue-600 mb-2">TDUI Protected</Badge>
                      <Badge className="bg-cyan-600 ml-2">SCRUM Certified</Badge>
                    </div>
                    <p className="text-gray-300 text-sm mb-4">
                      Certified SCRUM professional responsible for quality assurance, testing protocols, and ensuring platform reliability.
                    </p>
                    <p className="text-blue-400 text-sm font-semibold">
                      Focus: QA testing, user story formation, platform quality control.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-6 text-center">
                <p className="text-yellow-400 font-bold text-lg mb-2">🛡️ TDUI Protection Structure</p>
                <p className="text-gray-300">
                  The SOVEREIGNITITY™ platform and all associated entities are protected under Trust During Undue Influence (TDUI) provisions, ensuring family wealth preservation and generational economic sovereignty for Sean Maurice Mayo, Evergreen P. Mayo, and Sean Marlon McDaniel II.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-gray-300 mb-4">
                  As a service member who defended this nation's freedoms, I'm now building the next frontier of liberty: <strong className="text-purple-400">economic independence through cooperative ownership</strong>.
                </p>
                <p className="text-gray-300">
                  SOVEREIGNITITY™ isn't just another tech platform - it's an economic freedom movement built on cooperation, not extraction.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Approach</h3>
                <p className="text-gray-300 mb-4">
                  We're building parallel economic infrastructure that can't be turned off. From the <strong className="text-green-400">SOLVY Debit Card</strong> to <strong className="text-blue-400">sovereign banking</strong>, every component serves member sovereignty.
                </p>
                <p className="text-gray-300">
                  With revenue-backed operations through EBL and Reign Products, we're proving the model works before scaling globally.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded-lg p-8 border border-purple-500/20 mb-12">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Our Three-Pillar Mission</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl mb-4">🛡️</div>
                  <h4 className="text-xl font-bold text-purple-400 mb-2">DATA SOVEREIGNTY</h4>
                  <p className="text-gray-300 text-sm">Your digital identity, your rules. Tools that put you in control of your data and communications.</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">🤝</div>
                  <h4 className="text-xl font-bold text-blue-400 mb-2">COOPERATIVE ECONOMICS</h4>
                  <p className="text-gray-300 text-sm">From MOLI to community capital recycling - wealth systems that benefit members, not corporations.</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">🔗</div>
                  <h4 className="text-xl font-bold text-yellow-400 mb-2">SOVEREIGN CURRENCY</h4>
                  <p className="text-gray-300 text-sm">Through Guapcoin blockchain integration - true monetary independence.</p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Our Founding Principle</h3>
              <p className="text-xl text-purple-400 italic mb-8">
                "This isn't about fighting the system - it's about building a better one."
              </p>
              <p className="text-gray-300 mb-8">
                One that honors America's promise of life, liberty, and the pursuit of happiness through actual economic democracy.
              </p>
              <Button 
                onClick={() => setShowEnrollment(true)}
                size="lg" 
                className="bg-purple-600 hover:bg-purple-700"
              >
                Join the Movement →
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Marketing Campaigns */}
      {activeSection === 'marketing' && (
        <section className="py-24 bg-gradient-to-br from-orange-900/20 to-red-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">📢 Liberation Marketing Campaigns</h2>
              <p className="text-xl text-gray-300">Spreading economic sovereignty across global communities</p>
            </div>
            
            <div className="mb-8">
              <div className="relative">
                <button 
                  onClick={() => setShowCommunityDropdown(!showCommunityDropdown)}
                  className="flex items-center justify-between w-full md:w-64 bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white hover:bg-black/30 transition-colors"
                >
                  <span className="flex items-center">
                    <span className="mr-2">{currentCommunity?.flag}</span>
                    {currentCommunity?.name}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {showCommunityDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-full md:w-64 bg-black/90 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl z-50">
                    {communities.map((community) => (
                      <button
                        key={community.id}
                        onClick={() => {
                          setSelectedCommunity(community.id)
                          setShowCommunityDropdown(false)
                        }}
                        className="flex items-center w-full px-4 py-3 text-white hover:bg-white/10 transition-colors"
                      >
                        <span className="mr-2">{community.flag}</span>
                        <span className="flex-1 text-left">{community.name}</span>
                        <Badge variant="secondary" className="ml-2">
                          {community.campaigns}
                        </Badge>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCampaigns.map((campaign, index) => (
                <Card key={index} className="bg-black/20 border-white/10">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-lg">{campaign.name}</CardTitle>
                      <Badge 
                        className={campaign.status === 'Active' ? 'bg-green-600' : 'bg-blue-600'}
                      >
                        {campaign.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Budget:</span>
                        <span className="text-white font-semibold">{campaign.budget}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Reach:</span>
                        <span className="text-white font-semibold">{campaign.reach}</span>
                      </div>

                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-lg p-8 border border-orange-500/20">
                <h3 className="text-2xl font-bold text-white mb-4">Campaign Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400">18</div>
                    <div className="text-gray-300">Total Campaigns</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">12</div>
                    <div className="text-gray-300">Active Campaigns</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">$283K</div>
                    <div className="text-gray-300">Total Budget</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">400K+</div>
                    <div className="text-gray-300">Total Reach</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Platform Ecosystem */}
      <section className="py-24 bg-gradient-to-br from-slate-800/50 to-purple-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">🏛️ Complete Sovereignty Ecosystem</h2>
            <p className="text-xl text-gray-300">Your pathway from economic dependency to complete autonomy</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mx-auto mb-4 p-3">
                  <img src={solvyLogo} alt="SOLVY Crown" className="w-full h-full object-contain filter brightness-0 invert" />
                </div>
                <CardTitle className="text-white text-center">SOVEREIGNITITY™</CardTitle>
                <CardDescription className="text-gray-300 text-center">
                  Self-sovereign identity meets economic empowerment
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-300 mb-4">The core platform enabling complete economic autonomy through data ownership and sovereign banking.</p>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <div className="text-xs">👑</div>
                  </div>
                  <span className="text-green-400 text-sm font-semibold">MVP - Core Platform</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-center">DECIDEY NGO</CardTitle>
                <CardDescription className="text-gray-300 text-center">
                  Economic sovereignty education and awareness
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-300 mb-4">Educational foundation teaching sovereignty principles and preparing people for their liberation journey.</p>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <div className="text-xs">👑</div>
                  </div>
                  <span className="text-blue-400 text-sm font-semibold">Planned - Education</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-center">MAN Network</CardTitle>
                <CardDescription className="text-gray-300 text-center">
                  Community-driven economic cooperation
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-300 mb-4">Mutual aid network connecting sovereign individuals for collective economic strength and resilience.</p>
                <div className="flex items-center justify-center space-x-2">
                      <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center p-1">
                        <img src={solvyLogo} alt="SOLVY Crown" className="w-full h-full object-contain filter brightness-0 invert" />
                      </div>
                  <span className="text-purple-400 text-sm font-semibold">Vision - Community</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* DeepSeek AI Tax Assistant Section */}
      {activeSection === 'tax-assistant' && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                🤖 DeepSeek AI Tax Assistant
              </h2>
              <p className="text-xl text-gray-300">
                Get personalized tax optimization strategies powered by advanced AI
              </p>
            </div>

            <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white text-center">AI-Powered Tax Analysis</CardTitle>
                <CardDescription className="text-gray-300 text-center">
                  Describe your financial situation and get expert tax advice
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Scenario Selector */}
                <div>
                  <label className="block text-white font-medium mb-2">Select Your Situation:</label>
                  <select 
                    value={taxScenario}
                    onChange={(e) => setTaxScenario(e.target.value)}
                    className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  >
                    <option value="general">General Tax Review</option>
                    <option value="self_employment">Self-Employment</option>
                    <option value="small_business">Small Business</option>
                    <option value="investor">Investor</option>
                    <option value="family">Family</option>
                  </select>
                </div>

                {/* Financial Info Input */}
                <div>
                  <label className="block text-white font-medium mb-2">Describe Your Financial Situation:</label>
                  <textarea 
                    value={financialInfo}
                    onChange={(e) => setFinancialInfo(e.target.value)}
                    placeholder="Examples:
• Income: W2 $60,000, 1099 side work $15,000
• Expenses: Home office 150 sq ft, business miles 5,000
• Deductions: Mortgage interest $8,000, student loan interest $2,500
• Investments: Crypto gains $3,000, stock dividends $500
• Family: Married, 2 children, childcare expenses $8,000"
                    rows="6"
                    className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-purple-500 focus:outline-none resize-none"
                  />
                </div>

                {/* Analyze Button */}
                <Button 
                  onClick={runTaxAnalysis}
                  disabled={isAnalyzing || !financialInfo.trim()}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 text-lg font-semibold"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Analyzing Your Tax Situation...
                    </div>
                  ) : (
                    'Analyze My Tax Situation'
                  )}
                </Button>

                {/* Results */}
                {taxResults && (
                  <div className="mt-8 p-6 bg-slate-800/50 border border-slate-600 rounded-lg">
                    <h4 className="text-white font-bold text-lg mb-4">Your Tax Analysis:</h4>
                    <div 
                      className="text-gray-300 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: formatTaxAnalysis(taxResults) }}
                    />
                    <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-500/20 rounded-lg">
                      <p className="text-yellow-400 text-sm">
                        💡 <strong>Disclaimer:</strong> This AI analysis is for educational purposes only. 
                        Please consult with a qualified tax professional for personalized advice.
                      </p>
                    </div>
                  </div>
                )}

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                    <Brain className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <h5 className="text-white font-semibold">AI-Powered</h5>
                    <p className="text-gray-400 text-sm">Advanced DeepSeek AI analysis</p>
                  </div>
                  <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                    <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <h5 className="text-white font-semibold">Privacy First</h5>
                    <p className="text-gray-400 text-sm">Your data stays secure</p>
                  </div>
                  <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <h5 className="text-white font-semibold">Optimization</h5>
                    <p className="text-gray-400 text-sm">Maximize your savings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

{/* Self-Banking Section */}
{activeSection === 'self-banking' && (
  <section className="py-20 px-6">
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-white mb-6">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">SOLVY Self-Banking System</span>
        </h2>
        <p className="text-2xl text-gray-300 mb-4">
          Stop Paying Banks. Start Paying Yourself.
        </p>
        <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
      </div>

      {/* The Problem */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-gradient-to-br from-red-900/20 to-red-800/10 border border-red-500/30 rounded-lg p-8">
          <h3 className="text-3xl font-bold text-red-400 mb-4 flex items-center">
            <span className="mr-3">❌</span> Traditional Banking Trap
          </h3>
          <div className="space-y-3 text-gray-300">
            <p><strong>You deposit money</strong> → Bank pays you 0.5% interest</p>
            <p><strong>Bank lends YOUR money</strong> → Charges borrowers 15-20%</p>
            <p><strong>You need a loan</strong> → Bank charges YOU 15-20%</p>
            <p><strong>Bank profits</strong> → You pay twice</p>
          </div>
          <div className="mt-6 p-4 bg-red-900/30 rounded">
            <p className="text-red-300 font-semibold">Credit Card APR: 18-25%</p>
            <p className="text-red-300 font-semibold">Personal Loan: 10-15%</p>
            <p className="text-red-300 font-semibold">Savings Rate: 0.5-2%</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-500/30 rounded-lg p-8">
          <h3 className="text-3xl font-bold text-green-400 mb-4 flex items-center">
            <span className="mr-3">✅</span> Self-Banking Solution
          </h3>
          <div className="space-y-3 text-gray-300">
            <p><strong>You build cash value</strong> → In your life insurance policy</p>
            <p><strong>You borrow from yourself</strong> → At 5-6% policy loan rate</p>
            <p><strong>Your cash value keeps growing</strong> → Uninterrupted</p>
            <p><strong>You profit</strong> → Interest stays in your family</p>
          </div>
          <div className="mt-6 p-4 bg-green-900/30 rounded">
            <p className="text-green-300 font-semibold">Policy Loan Rate: 5-6%</p>
            <p className="text-green-300 font-semibold">No Credit Check Required</p>
            <p className="text-green-300 font-semibold">Guaranteed Approval</p>
          </div>
        </div>
      </div>

      {/* What is IBC */}
      <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg p-10 mb-16">
        <h3 className="text-4xl font-bold text-white mb-6">What is Infinite Banking (IBC)?</h3>
        <p className="text-xl text-gray-300 mb-6">
          A strategy where you use a specially designed whole life insurance policy as your own personal banking system.
        </p>
        <blockquote className="border-l-4 border-purple-500 pl-6 italic text-gray-300 text-lg mb-6">
          "You finance everything you buy. You either pay interest to others, or you give up the interest you could have earned. The question is: where would you rather that interest end up?"
          <footer className="text-purple-400 mt-2">— R. Nelson Nash, Creator of IBC</footer>
        </blockquote>
        <div className="grid md:grid-cols-5 gap-4 mt-8">
          <div className="text-center">
            <div className="text-4xl mb-2">🏦</div>
            <p className="text-sm text-gray-300">Build Cash Value</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">💰</div>
            <p className="text-sm text-gray-300">Borrow Against It</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">💳</div>
            <p className="text-sm text-gray-300">Use for Purchases</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">🔄</div>
            <p className="text-sm text-gray-300">Repay Yourself</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">📈</div>
            <p className="text-sm text-gray-300">Value Keeps Growing</p>
          </div>
        </div>
      </div>

      {/* SOLVY Integration */}
      <div className="mb-16">
        <h3 className="text-4xl font-bold text-white mb-8 text-center">
          SOVEREIGNITITY™ + IBC = <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Self-Banking Freedom</span>
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-500/30 rounded-lg p-6">
            <div className="text-4xl mb-4">⚡</div>
            <h4 className="text-xl font-bold text-white mb-3">Direct Integration</h4>
            <p className="text-gray-300">Policy loan proceeds deposited directly to your SOLVY account. No waiting for checks or bank transfers.</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-500/30 rounded-lg p-6">
            <div className="text-4xl mb-4">💳</div>
            <h4 className="text-xl font-bold text-white mb-3">Instant Virtual Cards</h4>
            <p className="text-gray-300">Business and personal virtual cards issued immediately. Start using your policy loan funds right away.</p>
          </div>
          <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-500/30 rounded-lg p-6">
            <div className="text-4xl mb-4">🤖</div>
            <h4 className="text-xl font-bold text-white mb-3">AI Tax Optimization</h4>
            <p className="text-gray-300">AI tracks business expenses from policy loan funds and maximizes your tax deductions automatically.</p>
          </div>
        </div>
      </div>

      {/* Real Example */}
      <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700 rounded-lg p-10 mb-16">
        <h3 className="text-3xl font-bold text-white mb-6">Real-World Example: Sarah's Self-Banking Journey</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xl font-semibold text-purple-400 mb-4">Sarah - Freelance Graphic Designer</h4>
            <div className="space-y-3 text-gray-300">
              <p><strong>Situation:</strong> Has $50,000 cash value in OneAmerica policy</p>
              <p><strong>Need:</strong> $10,000 for equipment and marketing</p>
              <p><strong>Traditional Bank:</strong> Would charge 12% APR</p>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-green-400 mb-4">Her SOLVY Solution</h4>
            <div className="space-y-3 text-gray-300">
              <p>✅ $10,000 policy loan at 5.5%</p>
              <p>✅ Funds deposited to SOLVY account in 10 days</p>
              <p>✅ Business & personal cards issued instantly</p>
              <p>✅ AI tracks expenses for tax deductions</p>
              <p>✅ $50,000 cash value continues growing</p>
            </div>
          </div>
        </div>
        <div className="mt-8 p-6 bg-green-900/20 border border-green-500/30 rounded-lg">
          <h5 className="text-lg font-bold text-green-400 mb-3">The Savings:</h5>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-red-400">$1,200/year</p>
              <p className="text-sm text-gray-400">Traditional Bank Interest</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-400">$550/year</p>
              <p className="text-sm text-gray-400">Policy Loan Interest</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-400">$650/year</p>
              <p className="text-sm text-gray-400">Savings + Tax Benefits</p>
            </div>
          </div>
        </div>
      </div>

      {/* The Math */}
      <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-lg p-10 mb-16">
        <h3 className="text-4xl font-bold text-white mb-6 text-center">The Math That Changes Everything</h3>
        <p className="text-center text-xl text-gray-300 mb-8">$100,000 in Major Purchases Over 10 Years</p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
            <h4 className="text-2xl font-bold text-red-400 mb-4">Traditional Banking</h4>
            <div className="space-y-2 text-gray-300">
              <p>Borrow $100,000 at 10% APR</p>
              <p>Pay $50,000 in interest</p>
              <p className="text-xl font-bold text-red-400 mt-4">Total Cost: $150,000</p>
              <p className="text-lg text-red-300">Interest paid to banks: -$50,000</p>
            </div>
          </div>
          
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
            <h4 className="text-2xl font-bold text-green-400 mb-4">Self-Banking</h4>
            <div className="space-y-2 text-gray-300">
              <p>Borrow $100,000 at 5.5% policy loan</p>
              <p>Pay $27,500 in interest (to yourself)</p>
              <p className="text-xl font-bold text-green-400 mt-4">Policy grows: +$55,000</p>
              <p className="text-lg text-green-300">Net wealth increase: +$27,500</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-purple-900/30 rounded-lg text-center">
          <p className="text-3xl font-bold text-purple-400">Total Difference: $77,500</p>
          <p className="text-gray-300 mt-2">Over a lifetime (40 years): <span className="text-2xl font-bold text-green-400">$700,000</span> difference</p>
        </div>
      </div>

      {/* Who Should Use */}
      <div className="mb-16">
        <h3 className="text-4xl font-bold text-white mb-8 text-center">Is Self-Banking Right for You?</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border border-purple-500/30 rounded-lg p-6">
            <div className="text-4xl mb-3">👨‍💼</div>
            <h4 className="text-lg font-bold text-white mb-2">Self-Employed Professionals</h4>
            <p className="text-gray-300 text-sm">Need flexible capital without bank approval. Want tax-advantaged business funding.</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-500/30 rounded-lg p-6">
            <div className="text-4xl mb-3">🏢</div>
            <h4 className="text-lg font-bold text-white mb-2">Small Business Owners</h4>
            <p className="text-gray-300 text-sm">Need working capital quickly. Want to keep interest payments in-house.</p>
          </div>
          <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-500/30 rounded-lg p-6">
            <div className="text-4xl mb-3">🏠</div>
            <h4 className="text-lg font-bold text-white mb-2">Real Estate Investors</h4>
            <p className="text-gray-300 text-sm">Need down payment funds without hard money lenders. Building rental portfolio.</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border border-yellow-500/30 rounded-lg p-6">
            <div className="text-4xl mb-3">👨‍👩‍👧‍👦</div>
            <h4 className="text-lg font-bold text-white mb-2">Parents Planning Ahead</h4>
            <p className="text-gray-300 text-sm">Want to fund education without student loans. Building generational wealth.</p>
          </div>
          <div className="bg-gradient-to-br from-red-900/20 to-red-800/10 border border-red-500/30 rounded-lg p-6">
            <div className="text-4xl mb-3">💪</div>
            <h4 className="text-lg font-bold text-white mb-2">Anyone Tired of Banks</h4>
            <p className="text-gray-300 text-sm">Sick of paying high interest. Want control over their money and financial destiny.</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border border-purple-500/30 rounded-lg p-6">
            <div className="text-4xl mb-3">🚀</div>
            <h4 className="text-lg font-bold text-white mb-2">Entrepreneurs</h4>
            <p className="text-gray-300 text-sm">Need startup capital or business growth funds without giving up equity.</p>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-lg p-10">
        <h3 className="text-4xl font-bold text-white mb-8 text-center">Start Your Self-Banking Journey Today</h3>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-black/30 rounded-lg p-6 border border-purple-500/20">
            <div className="text-3xl mb-3 text-center">🏦</div>
            <h4 className="text-xl font-bold text-purple-400 mb-3 text-center">Path 1: I Have IBC Policy</h4>
            <ul className="space-y-2 text-gray-300 text-sm mb-4">
              <li>✅ Enroll in SOLVY as business member</li>
              <li>✅ Select "IBC Policy Loan" funding</li>
              <li>✅ Get virtual cards in 2-3 weeks</li>
              <li>✅ Start self-banking immediately</li>
            </ul>
            <button 
              onClick={() => setShowEnrollment(true)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Enroll Now →
            </button>
          </div>
          
          <div className="bg-black/30 rounded-lg p-6 border border-blue-500/20">
            <div className="text-3xl mb-3 text-center">📚</div>
            <h4 className="text-xl font-bold text-blue-400 mb-3 text-center">Path 2: I Want to Learn</h4>
            <ul className="space-y-2 text-gray-300 text-sm mb-4">
              <li>✅ Join IBC education webinar</li>
              <li>✅ Download "Self-Banking 101" guide</li>
              <li>✅ Connect with IBC-trained agent</li>
              <li>✅ Enroll in SOLVY when ready</li>
            </ul>
            <button 
              onClick={() => window.open('mailto:support@sovereignitity.com?subject=IBC Education Request', '_blank')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Learn More →
            </button>
          </div>
          
          <div className="bg-black/30 rounded-lg p-6 border border-green-500/20">
            <div className="text-3xl mb-3 text-center">👀</div>
            <h4 className="text-xl font-bold text-green-400 mb-3 text-center">Path 3: Just Exploring</h4>
            <ul className="space-y-2 text-gray-300 text-sm mb-4">
              <li>✅ Join SOLVY waitlist</li>
              <li>✅ Receive educational content</li>
              <li>✅ Access community forum</li>
              <li>✅ No pressure, no commitment</li>
            </ul>
            <button 
              onClick={() => setShowEnrollment(true)}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Join Waitlist →
            </button>
          </div>
        </div>
        
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-6 text-center">
          <p className="text-yellow-400 font-bold text-lg mb-2">🎉 Limited Time: Founding 100 Members</p>
          <p className="text-gray-300">No monthly fees for first year ($120 value) • Exclusive IBC consultation ($200 value) • 20% lifetime discount</p>
        </div>
      </div>
    </div>
  </section>
)}



      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <img src={solvyLogo} alt="SOLVY Crown" className="w-12 h-12" />
              <div className="text-white">
                <p className="font-bold text-lg">SOVEREIGNITITY™</p>
                <p className="text-sm text-gray-400">Economic Liberation Platform</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">Legal Structure</p>
              <p className="text-white text-sm">Singapore • Wyoming • Texas • Global</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm mb-2">Powered By</p>
              <p className="text-white text-sm">DeepSeek AI • Polygon • Community Currency</p>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 SOVEREIGNITITY™. Your Economic Declaration of Independence.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              "Stop being managed. Start being sovereign."
            </p>
          </div>
        </div>
      </footer>
      
      {/* Enrollment Form Modal */}
      {showEnrollment && (
        <EnrollmentForm onClose={() => setShowEnrollment(false)} />
      )}
    </div>
  )
}

export default App


