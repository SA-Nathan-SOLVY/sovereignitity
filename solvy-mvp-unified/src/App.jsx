import { useState } from 'react'
import { CreditCard, Shield, TrendingUp, Users, Globe, Brain, CheckCircle, Zap, Calculator, Smartphone, ChevronLeft, ChevronRight, Database, Lock, Network, DollarSign, Heart } from 'lucide-react'
import './App.css'

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showTaxModal, setShowTaxModal] = useState(false)
  const [taxData, setTaxData] = useState({ income: '', expenses: '' })
  const [taxResult, setTaxResult] = useState(null)

  const slides = [
    {
      title: "The Economic Challenge",
      subtitle: "The Data-Surveilled Captive Marketplace",
      content: [
        "Big Tech profits from YOUR data while you get nothing",
        "Your digital identity is controlled by corporations",
        "Traditional financial systems exclude and exploit communities",
        "African diaspora wealth doesn't flow back to continental development"
      ],
      quote: "Breaking free from economic entrapment requires a new approach to data, identity, and community wealth."
    },
    {
      title: "The SOVEREIGNITITY™ Solution",
      subtitle: "Self-Sovereign Data Income Earning Identity",
      content: [
        "You OWN your digital identity completely",
        "You EARN from your data and participation",
        "You CONNECT to African development through cooperative rewards",
        "You CONTROL your financial sovereignty"
      ]
    },
    {
      title: "What is SOVEREIGNITITY™?",
      subtitle: "A Revolutionary Concept",
      definition: {
        sovereign: "Self-governing",
        identity: "Who you are",
        tity: "Economic entity"
      },
      result: "= Complete Self-Ownership + Income from YOUR Data"
    }
  ]

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  const calculateTax = async () => {
    const income = parseFloat(taxData.income) || 0
    const expenses = parseFloat(taxData.expenses) || 0
    const netIncome = income - expenses
    const totalTax = netIncome * 0.25
    setTaxResult({
      netIncome: netIncome.toFixed(2),
      totalTax: totalTax.toFixed(2),
      takeHome: (netIncome - totalTax).toFixed(2),
      effectiveRate: netIncome > 0 ? ((totalTax / income) * 100).toFixed(2) : 0,
      suggestions: ["Maximize deductions for home office", "Contribute to a SEP IRA", "Track all business expenses"]
    })
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <img src="/solvy-logo.png" alt="SOLVY Crown" className="logo" />
            <div className="logo-text">
              <strong>SOLVY</strong>
              <span>Solutions Valued You</span>
            </div>
          </div>
          <nav className="nav">
            <a href="#home">Home</a>
            <a href="#vision">Vision</a>
            <a href="#ecosystem">Ecosystem</a>
            <a href="#team">Team</a>
            <a href="#pricing">Get Started</a>
          </nav>
        </div>
      </header>

      <section id="home" className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1><span className="hero-title-main">SOVEREIGNITITY™</span></h1>
            <h2>Your Onramp to the Sovereign Data Economy</h2>
            <p className="hero-description">
              The SOVEREIGNITITY™ Card is more than a debit card—it's your entry point to a cooperative economy where <strong>your data earns you income</strong>. 
              Break free from the data-surveilled captive marketplace and build true financial sovereignty.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <Database className="stat-icon" />
                <div><strong>Own Your Data</strong><span>Monetize your digital identity</span></div>
              </div>
              <div className="stat">
                <Users className="stat-icon" />
                <div><strong>Cooperative Model</strong><span>Member-owned economy</span></div>
              </div>
              <div className="stat">
                <Globe className="stat-icon" />
                <div><strong>Global Impact</strong><span>African diaspora connection</span></div>
              </div>
            </div>
            <div className="hero-buttons">
              <button className="btn-primary">Get Your SOVEREIGNITITY™ Card</button>
              <button className="btn-secondary" onClick={() => setShowTaxModal(true)}>
                <Calculator size={20} /> Try Tax Calculator
              </button>
            </div>
          </div>
          <div className="hero-image">
            <img src="/hero_payment_image.webp" alt="SOVEREIGNITITY Card in action" />
          </div>
        </div>
      </section>

      {/* Slideshow Section */}
      <section id="vision" className="slideshow-section">
        <div className="container">
          <h2>Understanding SOVEREIGNITITY™</h2>
          <p className="section-description">Learn about self-sovereign identity and economic empowerment</p>
          <div className="slideshow">
            <div className="slide-content">
              <h3>{slides[currentSlide].title}</h3>
              <h4>{slides[currentSlide].subtitle}</h4>
              
              {slides[currentSlide].content && (
                <ul className="slide-list">
                  {slides[currentSlide].content.map((item, idx) => (
                    <li key={idx}><CheckCircle className="check-icon" /> {item}</li>
                  ))}
                </ul>
              )}
              
              {slides[currentSlide].definition && (
                <div className="definition-box">
                  <div className="definition-parts">
                    <div className="def-part">
                      <strong>SOVEREIGN</strong>
                      <span>{slides[currentSlide].definition.sovereign}</span>
                    </div>
                    <span className="plus">+</span>
                    <div className="def-part">
                      <strong>IDENTITY</strong>
                      <span>{slides[currentSlide].definition.identity}</span>
                    </div>
                    <span className="plus">+</span>
                    <div className="def-part">
                      <strong>TITY</strong>
                      <span>{slides[currentSlide].definition.tity}</span>
                    </div>
                  </div>
                  <div className="definition-result">{slides[currentSlide].result}</div>
                </div>
              )}
              
              {slides[currentSlide].quote && (
                <blockquote className="slide-quote">"{slides[currentSlide].quote}"</blockquote>
              )}
            </div>
            
            <div className="slide-controls">
              <button onClick={prevSlide} className="slide-btn">
                <ChevronLeft /> Previous
              </button>
              <div className="slide-indicators">
                {slides.map((_, idx) => (
                  <span
                    key={idx}
                    className={`indicator ${idx === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(idx)}
                  />
                ))}
              </div>
              <button onClick={nextSlide} className="slide-btn">
                Next <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="features-section">
        <div className="container">
          <h2>The SOVEREIGNITITY™ Difference</h2>
          <div className="features-grid">
            <div className="feature-card">
              <Database className="feature-icon" />
              <h3>Self-Sovereign Identity</h3>
              <p>You own and control your digital identity completely. No corporation can exploit or sell your data without your consent.</p>
            </div>
            <div className="feature-card">
              <DollarSign className="feature-icon" />
              <h3>Data Monetization</h3>
              <p>Earn income from your data and participation in the cooperative economy. Your data has value—you should benefit from it.</p>
            </div>
            <div className="feature-card">
              <Lock className="feature-icon" />
              <h3>Privacy First</h3>
              <p>Break free from the data-surveilled captive marketplace. Your privacy is protected by design, not an afterthought.</p>
            </div>
            <div className="feature-card">
              <Network className="feature-icon" />
              <h3>Global Network</h3>
              <p>Connect to African diaspora development through cooperative rewards. Your participation drives global economic empowerment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section id="ecosystem" className="ecosystem-section">
        <div className="container">
          <h2>Our Cooperative Ecosystem</h2>
          <p className="section-description">Powered by SA Nathan LLC, our ecosystem is built on real business integration and a clear path to global independence.</p>
          
          <div className="ecosystem-grid">
            <div className="ecosystem-card featured">
              <CreditCard className="ecosystem-icon" />
              <h3>EBL Live Pilot</h3>
              <p><strong>Evergreen Beauty Lounge</strong>, owned by SA Nathan LLC, serves as our live pilot, processing real payments via Stripe and demonstrating our cooperative model in action.</p>
              <span className="status-badge live">Live & Processing Payments</span>
            </div>
            
            <div className="ecosystem-card">
              <Brain className="ecosystem-icon" />
              <h3>AI Tax Assistant</h3>
              <p>Powered by DeepSeek AI, our tax assistant provides real-time optimization for self-employed members—a core feature, not the main mission.</p>
              <span className="status-badge live">Feature Live</span>
            </div>
            
            <div className="ecosystem-card">
              <Globe className="ecosystem-icon" />
              <h3>Singapore Independence</h3>
              <p>Our future headquarters, <strong>SOVEREIGNITITY PTE. LTD.</strong>, will provide global infrastructure independent of US payment rails.</p>
              <span className="status-badge planned">2025 Roadmap</span>
            </div>
            
            <div className="ecosystem-card">
              <Heart className="ecosystem-icon" />
              <h3>DECIDEY NGO</h3>
              <p>Our educational mission: teaching economic sovereignty and cooperative principles to break cycles of financial exploitation.</p>
              <span className="status-badge planned">Education Mission</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <h2>About SA Nathan LLC</h2>
          <div className="about-content">
            <div className="about-text">
              <h3>US Foundation Phase</h3>
              <p>SA Nathan LLC, established in Texas in 2023, is the product owner of SOLVY and SOVEREIGNITITY™. We're building a cooperative business model that puts members first.</p>
              
              <h3>Singapore Independence Strategy</h3>
              <p>SOVEREIGNITITY PTE. LTD. (planned 2025) will serve as our global headquarters, providing infrastructure independent of US payment systems. Stripe is our onboarding strategy—enterprise partnerships with Baanx and Alchemy Pay will enable true global independence.</p>
              
              <h3>IP Licensing Structure</h3>
              <p>Our Singapore entity will license technology to SA Nathan LLC, creating a sustainable global structure that protects member interests and enables worldwide growth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="team-section">
        <div className="container">
          <h2>Leadership</h2>
          <div className="team-grid">
            <div className="team-card">
              <h3>Evergreen Mayo</h3>
              <p className="team-role">Managing Member & CEO (51%)</p>
              <p className="team-desc">TDLR Licensed Professional, leading operations and member services</p>
            </div>
            <div className="team-card">
              <h3>Sean Mayo</h3>
              <p className="team-role">Passive Member & Founder (49%)</p>
              <p className="team-desc">Strategic vision and technical architecture</p>
            </div>
            <div className="team-card">
              <h3>Sean M. McDaniel II</h3>
              <p className="team-role">Senior Decision Maker</p>
              <p className="team-desc">Future leadership and strategic guidance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing-section">
        <div className="container">
          <h2>Get Started with SOVEREIGNITITY™</h2>
          <div className="pricing-card">
            <h3>SOVEREIGNITITY™ Card</h3>
            <div className="price"><span className="price-amount">1.99%</span><span className="price-period">per transaction</span></div>
            <ul className="pricing-features">
              <li><CheckCircle /> Virtual & Physical Debit Card</li>
              <li><CheckCircle /> Data Sovereignty & Monetization</li>
              <li><CheckCircle /> AI Tax Assistant (DeepSeek Powered)</li>
              <li><CheckCircle /> Cooperative Membership</li>
              <li><CheckCircle /> African Diaspora Connection</li>
              <li><CheckCircle /> Business & Personal Accounts</li>
            </ul>
            <button className="btn-primary">Apply for Your Card</button>
          </div>
        </div>
      </section>

      {/* Tax Modal */}
      {showTaxModal && (
        <div className="modal-overlay" onClick={() => setShowTaxModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>AI Tax Calculator</h2>
            <p>Quick estimate for self-employed individuals</p>
            <div className="form-group">
              <label>Annual Income</label>
              <input
                type="number"
                placeholder="$75,000"
                value={taxData.income}
                onChange={(e) => setTaxData({...taxData, income: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Business Expenses</label>
              <input
                type="number"
                placeholder="$15,000"
                value={taxData.expenses}
                onChange={(e) => setTaxData({...taxData, expenses: e.target.value})}
              />
            </div>
            <button className="btn-primary" onClick={calculateTax}>Calculate</button>
            
            {taxResult && (
              <div className="tax-results">
                <h3>Your Tax Estimate</h3>
                <div className="result-grid">
                  <div><strong>Net Income:</strong> ${taxResult.netIncome}</div>
                  <div><strong>Estimated Tax:</strong> ${taxResult.totalTax}</div>
                  <div><strong>Take Home:</strong> ${taxResult.takeHome}</div>
                  <div><strong>Effective Rate:</strong> {taxResult.effectiveRate}%</div>
                </div>
                <div className="suggestions">
                  <h4>Optimization Tips:</h4>
                  <ul>{taxResult.suggestions.map((s, i) => <li key={i}>{s}</li>)}</ul>
                </div>
              </div>
            )}
            
            <button className="btn-secondary" onClick={() => setShowTaxModal(false)}>Close</button>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>SOVEREIGNITITY™</h4>
            <p>Self-Sovereign Identity + Economic Sovereignty</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="#vision">Vision</a>
            <a href="#ecosystem">Ecosystem</a>
            <a href="#team">Team</a>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <p>SA Nathan LLC (Texas)</p>
            <p>Est. 2023</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 SA Nathan LLC - SOLVY - SOVEREIGNITITY™. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App

/* Force rebuild */
/* Updated */
/* Updated */
