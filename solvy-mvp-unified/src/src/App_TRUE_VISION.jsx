import { useState } from 'react'
import { CreditCard, Shield, TrendingUp, Users, Globe, Brain, CheckCircle, Zap, Calculator, Smartphone, ChevronLeft, ChevronRight, Database, Lock, Network } from 'lucide-react'
import './App.css'

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showTaxModal, setShowTaxModal] = useState(false)
  const [taxData, setTaxData] = useState({ income: '', expenses: '' })
  const [taxResult, setTaxResult] = useState(null)

  const slides = [
    {
      title: "The Economic Challenge",
      subtitle: "Global Economic Disruption",
      content: [
        "AI Displacement: Millions face job loss due to automation",
        "Financial Exclusion: 1.7 billion adults remain unbanked",
        "High Remittance Costs: 6-8% globally",
        "Data Exploitation: Big Tech profits while individuals receive nothing"
      ],
      quote: "Breaking free from economic entrapment requires a new approach to data, identity, and community wealth."
    }
  ]

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <img src="/solvy-logo.png" alt="SOLVY Crown" className="logo" />
          </div>
        </div>
      </header>
      
      <section className="hero-section">
        <h1>SOLUTIONS VALUED YOU</h1>
      </section>
      
      <footer className="footer">
        <p>© 2025 SA Nathan LLC - SOLVY - SOVEREIGNITITY™</p>
      </footer>
    </div>
  )
}

export default App
