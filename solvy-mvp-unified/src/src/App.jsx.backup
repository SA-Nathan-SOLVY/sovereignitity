import { useState } from 'react'
import { CreditCard, Calculator, Users, Smartphone, TrendingUp, Shield, Zap, DollarSign, CheckCircle } from 'lucide-react'
import './App.css'

function App() {
  const [showTaxCalculator, setShowTaxCalculator] = useState(false)
  const [income, setIncome] = useState('')
  const [expenses, setExpenses] = useState('')
  const [taxResult, setTaxResult] = useState(null)

  const calculateTax = () => {
    const incomeNum = parseFloat(income) || 0
    const expensesNum = parseFloat(expenses) || 0
    const netIncome = incomeNum - expensesNum
    
    // Simplified tax calculation for self-employed
    const selfEmploymentTax = netIncome * 0.153 // 15.3% SE tax
    const incomeTax = netIncome * 0.22 // Approximate 22% bracket
    const totalTax = selfEmploymentTax + incomeTax
    const effectiveRate = (totalTax / netIncome) * 100
    
    setTaxResult({
      netIncome,
      selfEmploymentTax,
      incomeTax,
      totalTax,
      effectiveRate,
      takeHome: netIncome - totalTax
    })
  }

  return (
    <div className="app">
      {/* Hero Section */}
      <header className="hero">
        <nav className="nav">
          <div className="nav-brand">
            <img src="/solvy-logo.png" alt="SOLVY" className="logo" />
            <span className="brand-name">SOLVY</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#pilot">Live Pilot</a>
            <a href="#pricing">Pricing</a>
            <button className="cta-button">Get Started</button>
          </div>
        </nav>

        <div className="hero-content">
          <div className="hero-text">
            <h1>Turn Your Phone Into a Card Reader</h1>
            <p className="hero-subtitle">Get paid in seconds at <span className="highlight">1.99% per transaction</span></p>
            <p className="hero-description">
              No extra hardware. No surprises. No hidden costs. Plus AI-powered tax assistance for self-employed business owners.
            </p>
            
            <div className="hero-features">
              <div className="hero-feature">
                <CheckCircle className="check-icon" />
                <span>Virtual Debit Card (Business & Personal)</span>
              </div>
              <div className="hero-feature">
                <CheckCircle className="check-icon" />
                <span>AI Tax Assistant for Self-Employed</span>
              </div>
              <div className="hero-feature">
                <CheckCircle className="check-icon" />
                <span>Cooperative Ownership Model</span>
              </div>
            </div>

            <div className="cta-buttons">
              <button className="primary-button">Start Free Trial</button>
              <button className="secondary-button" onClick={() => setShowTaxCalculator(!showTaxCalculator)}>
                Try Tax Calculator
              </button>
            </div>
          </div>

          <div className="hero-image">
            <img src="/hero_payment_image.webp" alt="Payment Processing" />
            <div className="live-badge">
              <span className="pulse"></span>
              Live Pilot Running
            </div>
          </div>
        </div>
      </header>

      {/* Tax Calculator Modal */}
      {showTaxCalculator && (
        <div className="modal-overlay" onClick={() => setShowTaxCalculator(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2><Calculator /> AI Tax Assistant</h2>
              <button onClick={() => setShowTaxCalculator(false)}>×</button>
            </div>
            
            <div className="calculator-form">
              <div className="form-group">
                <label>Annual Income</label>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  placeholder="$75,000"
                />
              </div>
              
              <div className="form-group">
                <label>Business Expenses</label>
                <input
                  type="number"
                  value={expenses}
                  onChange={(e) => setExpenses(e.target.value)}
                  placeholder="$15,000"
                />
              </div>
              
              <button className="calculate-button" onClick={calculateTax}>
                Calculate Taxes
              </button>
              
              {taxResult && (
                <div className="tax-results">
                  <h3>Tax Breakdown</h3>
                  <div className="result-row">
                    <span>Net Income:</span>
                    <span>${taxResult.netIncome.toLocaleString()}</span>
                  </div>
                  <div className="result-row">
                    <span>Self-Employment Tax (15.3%):</span>
                    <span>${taxResult.selfEmploymentTax.toLocaleString()}</span>
                  </div>
                  <div className="result-row">
                    <span>Income Tax:</span>
                    <span>${taxResult.incomeTax.toLocaleString()}</span>
                  </div>
                  <div className="result-row highlight">
                    <span>Total Tax:</span>
                    <span>${taxResult.totalTax.toLocaleString()}</span>
                  </div>
                  <div className="result-row success">
                    <span>Take Home:</span>
                    <span>${taxResult.takeHome.toLocaleString()}</span>
                  </div>
                  <div className="result-row">
                    <span>Effective Rate:</span>
                    <span>{taxResult.effectiveRate.toFixed(2)}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Why Better Than Jim Card */}
      <section className="comparison-section">
        <h2>Why SOLVY Beats Jim Card</h2>
        <div className="comparison-grid">
          <div className="comparison-card">
            <div className="comparison-header">
              <h3>Jim Card</h3>
              <span className="price">1.99%</span>
            </div>
            <ul className="feature-list">
              <li>✓ Phone as card reader</li>
              <li>✓ Instant deposits</li>
              <li>✗ No tax assistance</li>
              <li>✗ No virtual debit cards</li>
              <li>✗ No cooperative ownership</li>
              <li>✗ No business accounts</li>
            </ul>
          </div>

          <div className="comparison-card featured">
            <div className="badge">Best Value</div>
            <div className="comparison-header">
              <h3>SOLVY</h3>
              <span className="price">1.99%</span>
            </div>
            <ul className="feature-list">
              <li>✓ Phone as card reader</li>
              <li>✓ Instant deposits</li>
              <li>✓ AI Tax Assistant</li>
              <li>✓ Virtual debit cards (Business & Personal)</li>
              <li>✓ Cooperative ownership</li>
              <li>✓ Business + Personal accounts</li>
              <li>✓ Future: Data sovereignty</li>
              <li>✓ Future: IBC/BYOB integration</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Live Pilot Section */}
      <section id="pilot" className="pilot-section">
        <div className="pilot-badge">
          <span className="pulse"></span>
          LIVE PILOT
        </div>
        <h2>Proven in Production</h2>
        <p className="pilot-description">
          EBL (Evergreen Beauty Lounge) is currently processing real payments through Stripe integration.
          This pilot demonstrates our payment infrastructure works in the real world.
        </p>
        
        <div className="pilot-stats">
          <div className="stat-card">
            <div className="stat-icon"><CheckCircle /></div>
            <div className="stat-number">Live</div>
            <div className="stat-label">Stripe Integration</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><TrendingUp /></div>
            <div className="stat-number">1.99%</div>
            <div className="stat-label">Transaction Fee</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><Zap /></div>
            <div className="stat-number">Instant</div>
            <div className="stat-label">Deposits</div>
          </div>
        </div>

        <div className="pilot-next">
          <h3>Next: Virtual Debit Cards</h3>
          <p>Phase 2 adds virtual debit cards for business and personal accounts, powered by Baanx integration.</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <h2>Complete Financial Solution</h2>
        <div className="features-grid">
          <div className="feature-card">
            <Smartphone className="feature-icon" />
            <h3>Phone as Card Reader</h3>
            <p>Turn any smartphone into a payment terminal. No extra hardware needed.</p>
          </div>

          <div className="feature-card">
            <CreditCard className="feature-icon" />
            <h3>Virtual Debit Cards</h3>
            <p>Separate business and personal accounts with virtual debit cards.</p>
          </div>

          <div className="feature-card">
            <Calculator className="feature-icon" />
            <h3>AI Tax Assistant</h3>
            <p>DeepSeek-powered tax calculations optimized for self-employed business owners.</p>
          </div>

          <div className="feature-card">
            <Users className="feature-icon" />
            <h3>Cooperative Ownership</h3>
            <p>Member-owned model means profits benefit the community, not just shareholders.</p>
          </div>

          <div className="feature-card">
            <Shield className="feature-icon" />
            <h3>Data Sovereignty</h3>
            <p>Your data belongs to you. Future features include data monetization.</p>
          </div>

          <div className="feature-card">
            <DollarSign className="feature-icon" />
            <h3>IBC/BYOB Integration</h3>
            <p>Future: Infinite Banking Concept integration for wealth building.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing-section">
        <h2>Simple, Transparent Pricing</h2>
        <div className="pricing-card">
          <div className="pricing-header">
            <h3>SOLVY MVP</h3>
            <div className="price-tag">
              <span className="price">1.99%</span>
              <span className="price-label">per transaction</span>
            </div>
          </div>
          
          <ul className="pricing-features">
            <li><CheckCircle /> Phone as card reader</li>
            <li><CheckCircle /> Instant deposits</li>
            <li><CheckCircle /> AI Tax Assistant</li>
            <li><CheckCircle /> Virtual debit cards (coming soon)</li>
            <li><CheckCircle /> Business & personal accounts</li>
            <li><CheckCircle /> Cooperative ownership</li>
            <li><CheckCircle /> No monthly fees</li>
            <li><CheckCircle /> No hidden costs</li>
          </ul>

          <button className="pricing-button">Get Started Now</button>
          
          <p className="pricing-note">
            Join the pilot program and help shape the future of financial sovereignty.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <img src="/solvy-logo.png" alt="SOLVY" className="footer-logo" />
            <p>Solutions Valued You</p>
            <p className="footer-tagline">Financial Sovereignty Through Cooperative Ownership</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#pilot">Live Pilot</a>
              <a href="#pricing">Pricing</a>
            </div>
            
            <div className="footer-column">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Blog</a>
              <a href="#">Careers</a>
            </div>
            
            <div className="footer-column">
              <h4>Support</h4>
              <a href="#">Help Center</a>
              <a href="#">Contact</a>
              <a href="#">API Docs</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2025 SOLVY - SOVEREIGNITITY™. All rights reserved.</p>
          <p>Created by SA Nathan</p>
        </div>
      </footer>
    </div>
  )
}

export default App

