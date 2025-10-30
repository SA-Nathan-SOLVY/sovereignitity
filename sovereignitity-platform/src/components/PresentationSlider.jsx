import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { ChevronLeft, ChevronRight, TrendingUp, Users, Globe, Shield, Coins, Database, Award, Target } from 'lucide-react'

const slides = [
  {
    id: 1,
    title: "The Economic Challenge",
    subtitle: "Global Economic Disruption",
    content: "The world faces unprecedented economic challenges that disproportionately affect vulnerable communities:",
    points: [
      { icon: TrendingUp, text: "AI Displacement: Millions face job loss due to automation" },
      { icon: Users, text: "Financial Exclusion: 1.7 billion adults remain unbanked" },
      { icon: Globe, text: "High Remittance Costs: 6-8% globally" },
      { icon: Database, text: "Data Exploitation: Big Tech profits while individuals receive nothing" }
    ],
    quote: "Breaking free from economic entrapment requires a new approach to data, identity, and community wealth."
  },
  {
    id: 2,
    title: "SOVEREIGNITITY™ Vision",
    subtitle: "Data Sovereignty + Economic Autonomy",
    content: "Revolutionary concept combining self-sovereign identity with economic empowerment:",
    points: [
      { icon: Shield, text: "Own Your Data: Take control of your digital identity" },
      { icon: Coins, text: "Monetize Participation: Earn from your data and engagement" },
      { icon: Globe, text: "Global Connection: Connect diaspora wealth to development" },
      { icon: Target, text: "Economic Survival: Build generational wealth through cooperation" }
    ],
    quote: "Your identity is your sovereignty. Your data is your wealth."
  },
  {
    id: 3,
    title: "Global Diaspora Opportunity",
    subtitle: "Connecting Communities Worldwide",
    content: "Empowering diaspora communities through financial technology:",
    points: [
      { icon: Users, text: "African Diaspora: 200M+ people worldwide" },
      { icon: Globe, text: "Filipino Community: 12M+ overseas workers" },
      { icon: Coins, text: "Remittance Market: $700B+ annually" },
      { icon: TrendingUp, text: "Economic Impact: Direct continental development funding" }
    ],
    quote: "When diaspora wealth flows back to origin, entire economies transform."
  },
  {
    id: 4,
    title: "Platform Overview",
    subtitle: "Integrated Ecosystem Components",
    content: "Complete financial sovereignty through interconnected services:",
    points: [
      { icon: Shield, text: "SOVEREIGNITITY™: Self-sovereign identity and data monetization" },
      { icon: Coins, text: "SOLVY Payment: Crypto-native processing with rewards" },
      { icon: Award, text: "Reign Products: Nobel Prize-winning Graphene™ technology" },
      { icon: Users, text: "DECIDEY NGO: Digital rights and education advocacy" }
    ],
    quote: "One platform, complete economic autonomy."
  },
  {
    id: 5,
    title: "Blockchain Advantage",
    subtitle: "Polygon-Powered Infrastructure",
    content: "Built on Polygon leveraging existing Web3 TLD integration:",
    points: [
      { icon: TrendingUp, text: "Proven Infrastructure: Building on your existing Web3 foundation" },
      { icon: Coins, text: "Low Fees: ~$0.01 per transaction, 99.9% cheaper than Ethereum" },
      { icon: Shield, text: "EVM Compatible: Full Ethereum ecosystem access with lower costs" },
      { icon: Globe, text: "Guapcoin Ready: Community currency integration planned" }
    ],
    quote: "Smart infrastructure choices enable sustainable economic sovereignty."
  },
  {
    id: 6,
    title: "Data Sovereignty",
    subtitle: "Your Data, Your Wealth",
    content: "Revolutionary approach to personal data ownership:",
    points: [
      { icon: Database, text: "Data Ownership: Complete control over personal information" },
      { icon: Coins, text: "Monetization: Earn from data sharing on your terms" },
      { icon: Shield, text: "Privacy Protection: Zero-knowledge architecture" },
      { icon: Target, text: "Value Creation: Transform data into economic opportunity" }
    ],
    quote: "In the AI era, data sovereignty equals economic sovereignty."
  },
  {
    id: 7,
    title: "Membership Benefits",
    subtitle: "Three-Tier Empowerment Structure",
    content: "Designed for progressive economic empowerment:",
    points: [
      { icon: Award, text: "Basic: SOVEREIGNITITY™ Card + Data monetization" },
      { icon: Coins, text: "Premium: AI Tax Assistant + Enhanced rewards" },
      { icon: Shield, text: "Sovereign: Full ecosystem access + Governance rights" },
      { icon: TrendingUp, text: "Growth: Each tier builds toward complete autonomy" }
    ],
    quote: "Your journey to sovereignty, one tier at a time."
  },
  {
    id: 8,
    title: "Call to Action",
    subtitle: "Join the Economic Revolution",
    content: "The future of financial sovereignty starts with you:",
    points: [
      { icon: Users, text: "Community: Join thousands building economic freedom" },
      { icon: Target, text: "Mission: Break free from economic entrapment" },
      { icon: Globe, text: "Impact: Transform diaspora communities worldwide" },
      { icon: TrendingUp, text: "Future: Build generational wealth through cooperation" }
    ],
    quote: "Your sovereignty journey begins today. The revolution is now."
  }
]

export default function PresentationSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const slide = slides[currentSlide]

  return (
    <div className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Presentation Introduction */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Discover the Complete SOVEREIGNITITY™ Vision
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Explore how our integrated ecosystem empowers global communities through data sovereignty, 
            cooperative economics, and blockchain technology to achieve true economic autonomy.
          </p>
        </div>

        {/* Slide Container */}
        <Card className="bg-slate-800/50 border-slate-700 max-w-6xl mx-auto">
          <CardContent className="p-8">
            {/* Slide Counter */}
            <div className="text-center mb-8">
              <span className="text-purple-400 text-lg font-semibold">
                {currentSlide + 1} / {slides.length}
              </span>
            </div>

            {/* Slide Content */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-purple-400 mb-4">{slide.title}</h1>
              <h2 className="text-2xl font-semibold text-white mb-6">{slide.subtitle}</h2>
              <p className="text-lg text-gray-300 mb-8">{slide.content}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Points */}
              <div className="space-y-4">
                {slide.points.map((point, index) => {
                  const IconComponent = point.icon
                  return (
                    <div key={index} className="flex items-center text-white">
                      <IconComponent className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0" />
                      <span>{point.text}</span>
                    </div>
                  )
                })}
              </div>

              {/* Quote */}
              <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg p-6 border border-purple-500/20">
                <blockquote className="text-lg text-white italic text-center">
                  "{slide.quote}"
                </blockquote>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-12">
              <Button 
                onClick={prevSlide}
                className="bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-500 disabled:cursor-not-allowed"
                disabled={currentSlide === 0}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              {/* Slide Indicators */}
              <div className="flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-purple-400' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>

              <Button 
                onClick={nextSlide}
                className="bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-500 disabled:cursor-not-allowed"
                disabled={currentSlide === slides.length - 1}
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

