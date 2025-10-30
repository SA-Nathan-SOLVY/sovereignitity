import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Shield, TrendingUp, Zap, Brain, Lock, Globe, Users } from 'lucide-react';

const SolvyCardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-5xl font-bold text-white mb-6">Your SOLVY Card</h1>
            <p className="text-xl text-purple-200 mb-8">
              Experience true financial sovereignty with your personalized SOLVY Card. Track your SOVEREIGNITITY™ score, and take control of your financial future.
            </p>
            <div className="flex gap-4">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
                onClick={() => {
                  const enrollSection = document.getElementById('enroll');
                  if (enrollSection) enrollSection.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get Your Card
              </Button>
              <Button 
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white border-green-500"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Video Section */}
          <div className="relative">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">See Your SOLVY Card in Action</h2>
              <p className="text-purple-200">Watch how easy it is to achieve financial sovereignty</p>
            </div>
            <div className="bg-black/40 rounded-2xl p-4 border border-purple-500/30 mb-8">
              <video 
                className="w-full rounded-lg"
                controls
                poster="/videos/solvy-card-video-poster.jpg"
              >
                <source src="/videos/solvy-card-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Card Mockup */}
            <div className="relative">
            <div className="bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <div className="flex justify-between items-start mb-12">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-3xl">☯️</span>
                </div>
                <div className="text-right">
                  <div className="text-white/80 text-sm mb-1">Status</div>
                  <div className="bg-green-400 text-green-900 px-3 py-1 rounded-full text-xs font-semibold inline-block">
                    Active
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="text-white/80 text-sm mb-2">Cardholder</div>
                <div className="text-white text-2xl font-semibold">Evergreen Nathan</div>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <div className="text-white/80 text-sm mb-1">Solutions Valued You</div>
                  <div className="flex items-center gap-2">
                    <span className="text-white text-lg">••••</span>
                    <span className="text-white text-lg">0000</span>
                  </div>
                </div>
                <div className="bg-purple-700/50 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <div className="text-white text-xs font-semibold">SOVEREIGNITITY™ Ready</div>
                </div>
              </div>

              <div className="absolute top-4 right-4 opacity-20">
                <div className="w-32 h-32 border-4 border-white rounded-full"></div>
              </div>
            </div>

            </div>

            <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-6 shadow-xl">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-white" />
                <div>
                  <div className="text-white text-sm font-semibold">SOVEREIGNITITY™ Ready</div>
                  <div className="text-blue-200 text-xs">Your data, your control</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MVP Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">SOLVY Card MVP Features</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-sm border-purple-500/30">
              <CardHeader>
                <CreditCard className="w-12 h-12 text-purple-400 mb-3" />
                <CardTitle className="text-white">Debit Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-200">
                  Full-featured debit card for everyday spending with SOVEREIGNITITY™ data ownership
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm border-purple-500/30">
              <CardHeader>
                <Brain className="w-12 h-12 text-blue-400 mb-3" />
                <CardTitle className="text-white">AI Tax Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-200">
                  DeepSeek AI-powered tax guidance for self-employed members and small business owners
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-sm border-purple-500/30">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-green-400 mb-3" />
                <CardTitle className="text-white">SOVEREIGNITITY™ Score</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-200">
                  Track your financial sovereignty score and build true economic independence
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm border-purple-500/30">
              <CardHeader>
                <Shield className="w-12 h-12 text-purple-400 mb-3" />
                <CardTitle className="text-white">Data Sovereignty</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-200">
                  You own your financial data. No selling to third parties, complete transparency
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* DeepSeek AI Tax Assistant Feature */}
        <Card className="mb-16 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-sm border-purple-500/30">
          <CardHeader>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-3xl text-white">DeepSeek AI Tax Assistant</CardTitle>
                <CardDescription className="text-purple-200 text-lg">
                  Integrated MVP Feature for Self-Employed Members
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-purple-100 text-lg">
              The SOLVY Card includes an AI-powered tax assistant specifically designed for self-employed members and small business owners. Get real-time guidance on deductions, quarterly estimates, and tax planning—all while maintaining complete data sovereignty.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-purple-800/30 backdrop-blur-sm p-6 rounded-lg border border-purple-400/20">
                <Zap className="w-8 h-8 text-yellow-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">Real-Time Guidance</h3>
                <p className="text-purple-200 text-sm">
                  Instant answers to tax questions as you manage your business expenses
                </p>
              </div>

              <div className="bg-purple-800/30 backdrop-blur-sm p-6 rounded-lg border border-purple-400/20">
                <Lock className="w-8 h-8 text-green-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">Private & Secure</h3>
                <p className="text-purple-200 text-sm">
                  Your financial data stays with you—never sold or shared with third parties
                </p>
              </div>

              <div className="bg-purple-800/30 backdrop-blur-sm p-6 rounded-lg border border-purple-400/20">
                <TrendingUp className="w-8 h-8 text-blue-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">Maximize Deductions</h3>
                <p className="text-purple-200 text-sm">
                  AI-powered insights help you identify all eligible tax deductions
                </p>
              </div>
            </div>

            <div className="bg-blue-900/30 backdrop-blur-sm p-6 rounded-lg border border-blue-400/20">
              <p className="text-blue-100 text-sm">
                <strong>Note:</strong> The DeepSeek AI Tax Assistant is positioned as a feature within the SOLVY Debit Card MVP, not a standalone product. This integration provides comprehensive financial sovereignty tools for our founding 100 members.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Video Section */}
        <Card className="mb-16 bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-sm border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-2xl text-white">SOLVY Card: Transforming Digital Finance</CardTitle>
            <CardDescription className="text-purple-200">
              Discover how SOLVY Card is revolutionizing financial services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-purple-800/30 rounded-lg flex items-center justify-center border border-purple-400/20">
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-600/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="text-purple-200">Video will be available after deployment</p>
                <p className="text-purple-300 text-sm mt-2">
                  Blockchain technology • SOVEREIGNITITY™ data ownership • Cooperative economics
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Complete Platform Section */}
        <Card className="mb-16 bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Complete SOLVY Platform</CardTitle>
            <CardDescription className="text-purple-200">
              Access the complete SOLVY ecosystem - all in one platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-purple-800/30 backdrop-blur-sm p-6 rounded-lg border border-purple-400/20">
                <Globe className="w-10 h-10 text-purple-400 mb-4" />
                <h3 className="text-white font-semibold mb-2">Education Platform</h3>
                <p className="text-purple-200 text-sm">
                  Financial literacy and cooperative economics education through DECIDEY NGO
                </p>
              </div>

              <div className="bg-purple-800/30 backdrop-blur-sm p-6 rounded-lg border border-purple-400/20">
                <span className="text-4xl mb-4 block">🌸</span>
                <h3 className="text-white font-semibold mb-2">Reign Products</h3>
                <p className="text-purple-200 text-sm">
                  Premium products and services including Evergreen Beauty Lounge
                </p>
              </div>

              <div className="bg-purple-800/30 backdrop-blur-sm p-6 rounded-lg border border-purple-400/20">
                <Lock className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-white font-semibold mb-2">MAN Network Security</h3>
                <p className="text-purple-200 text-sm">
                  Mandatory Audit Network for security and transparency
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Take Control?</h2>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Join the founding 100 members and experience true financial sovereignty with your SOLVY Card. Launch planned for 2026.
          </p>
          <Button 
            size="lg"
            className="bg-white text-purple-600 hover:bg-purple-50"
            onClick={() => {
              const enrollSection = document.getElementById('enroll');
              if (enrollSection) enrollSection.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Get Started Today
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SolvyCardPage;

