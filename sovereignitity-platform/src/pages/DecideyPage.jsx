import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Shield, Globe, Brain, TrendingUp, Heart, Lightbulb } from 'lucide-react';

const DecideyPage = () => {
  const educators = {
    economic: [
      'Lena Petrova',
      'Professor Richard Wolff',
      'Professor Michael Hudson',
      'Ellen Brown',
      'Nelson Nash Institute'
    ],
    geopolitical: [
      'Professor Jeffrey Sachs',
      'Shahid Bolson',
      'Geopolitical Economy Report',
      'Cyrus Janssen',
      'Think globally'
    ],
    social: [
      'Tim Wise',
      'Carol Anderson',
      'PanaGenius TV/The Breakdown',
      'Sean Foo'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4">DECIDEY NGO</h1>
          <p className="text-xl text-purple-300 mb-8 italic">Pronunciation: dee-SEE-day</p>
          
          <div className="max-w-4xl mx-auto mb-8">
            <p className="text-2xl text-purple-100 mb-6 leading-relaxed">
              DECIDEY celebrates the wisdom that comes from both formal education and life experience. We believe knowledge should illuminate practical solutions and empower communities to build wealth and independence together.
            </p>
            <p className="text-lg text-purple-200 leading-relaxed">
              Digital rights advocacy and education for the African diaspora, promoting data sovereignty, financial literacy, and cooperative economics through inclusive learning that honors all paths to wisdom.
            </p>
          </div>
        </div>

        {/* YouTube Education Acknowledgment */}
        <Card className="mb-16 bg-gradient-to-br from-red-900/30 to-purple-900/50 backdrop-blur-sm border-red-500/30">
          <CardHeader>
            <CardTitle className="text-3xl text-white flex items-center gap-3">
              <span className="text-4xl">📺</span>
              Proudly Acknowledging YouTube Education
            </CardTitle>
            <CardDescription className="text-purple-200 text-lg">
              We recognize YouTube as a powerful educational platform that has democratized access to knowledge. Many of our insights come from brilliant educators who share their expertise freely.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-purple-800/30 backdrop-blur-sm p-6 rounded-lg border border-purple-400/20">
                <h3 className="text-white font-semibold mb-4 text-lg">Economic Education</h3>
                <ul className="space-y-2">
                  {educators.economic.map((educator, index) => (
                    <li key={index} className="text-purple-200 flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>{educator}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-purple-800/30 backdrop-blur-sm p-6 rounded-lg border border-purple-400/20">
                <h3 className="text-white font-semibold mb-4 text-lg">Geopolitical Analysis</h3>
                <ul className="space-y-2">
                  {educators.geopolitical.map((educator, index) => (
                    <li key={index} className="text-purple-200 flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>{educator}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-purple-800/30 backdrop-blur-sm p-6 rounded-lg border border-purple-400/20">
                <h3 className="text-white font-semibold mb-4 text-lg">Social & Financial</h3>
                <ul className="space-y-2">
                  {educators.social.map((educator, index) => (
                    <li key={index} className="text-purple-200 flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>{educator}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Connect Section */}
        <div className="text-center mb-16 bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-sm p-8 rounded-2xl border border-purple-400/20">
          <h2 className="text-2xl font-bold text-white mb-4">Connect with Our Thinking</h2>
          <p className="text-purple-200 mb-6 max-w-2xl mx-auto">
            For transparency and deeper understanding of our approach to cooperative economics and financial sovereignty, we invite you to explore our thought process and community discussions.
          </p>
          <Button 
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            onClick={() => window.open('https://www.facebook.com/SANathanLLC', '_blank')}
          >
            Follow SA Nathan LLC on Facebook
          </Button>
        </div>

        {/* Inclusive Education Philosophy */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Inclusive Education Philosophy</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-red-900/30 to-purple-900/50 backdrop-blur-sm border-red-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-3">
                  <Lightbulb className="w-8 h-8 text-red-400" />
                  Current Educational Challenges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 text-xl mt-1">•</span>
                    <span className="text-purple-200">Overemphasis on credentials without practical application</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 text-xl mt-1">•</span>
                    <span className="text-purple-200">Educational debt without corresponding income potential</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 text-xl mt-1">•</span>
                    <span className="text-purple-200">Disconnect between academic theory and real-world solutions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 text-xl mt-1">•</span>
                    <span className="text-purple-200">Limited recognition of alternative learning paths</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/30 to-blue-900/50 backdrop-blur-sm border-green-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-3">
                  <Heart className="w-8 h-8 text-green-400" />
                  DECIDEY's Inclusive Approach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl mt-1">•</span>
                    <span className="text-purple-200">Honor all forms of education and life experience</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl mt-1">•</span>
                    <span className="text-purple-200">Bridge academic knowledge with practical application</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl mt-1">•</span>
                    <span className="text-purple-200">Create pathways for knowledge to generate community wealth</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl mt-1">•</span>
                    <span className="text-purple-200">Welcome wisdom from all backgrounds and experiences</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Financial Education */}
        <Card className="mb-16 bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-sm border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-3xl text-white">Financial Education: Understanding the Banking System</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-purple-400" />
                Ellen Brown's "Web of Debt" Revelations
              </h3>
              <ul className="space-y-3 ml-8">
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">•</span>
                  <span className="text-purple-200">The Federal Reserve is privately owned, not a government institution</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">•</span>
                  <span className="text-purple-200">Money is created as debt, with interest that can never be fully repaid</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">•</span>
                  <span className="text-purple-200">Banks create money from nothing when they issue loans</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">•</span>
                  <span className="text-purple-200">The debt-based monetary system ensures perpetual scarcity</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-400" />
                SOLVY's Alternative Approach
              </h3>
              <ul className="space-y-3 ml-8">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">•</span>
                  <span className="text-purple-200">SOVEREIGNITITY™ creates data ownership and value</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">•</span>
                  <span className="text-purple-200">SOVEREIGNITITY™ LIFE PROGRAM democratizes wealth-building strategies</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">•</span>
                  <span className="text-purple-200">Cooperative economics breaks debt dependency</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">•</span>
                  <span className="text-purple-200">Community-owned financial infrastructure</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Future Collaborative Possibilities */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Future Collaborative Possibilities</h2>
          <p className="text-purple-200 text-center mb-12 max-w-3xl mx-auto">
            As SOLVY grows and demonstrates value, we envision exciting collaborations that could transform financial sovereignty for the African diaspora and beyond.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm border-blue-500/30">
              <CardHeader>
                <Globe className="w-12 h-12 text-blue-400 mb-3" />
                <CardTitle className="text-white">Web3 Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-200">
                  Leveraging our Ethereum-ready and Polygon-integrated infrastructure to create decentralized educational resources and community-driven learning platforms.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-sm border-purple-500/30">
              <CardHeader>
                <Brain className="w-12 h-12 text-purple-400 mb-3" />
                <CardTitle className="text-white">Blockchain Education</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-200">
                  Educational programs focused on blockchain technology, cryptocurrency literacy, and decentralized finance to empower community economic participation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Current SOLVY Ecosystem */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Current SOLVY Ecosystem</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-sm border-purple-500/30">
              <CardHeader>
                <BookOpen className="w-12 h-12 text-purple-400 mb-3" />
                <CardTitle className="text-white">DECIDEY NGO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-purple-200">
                  Digital rights advocacy and inclusive education that honors all forms of wisdom while building practical solutions for community empowerment.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-purple-200 text-sm">
                    <span className="text-purple-400">•</span>
                    <span>Financial literacy education</span>
                  </li>
                  <li className="flex items-start gap-2 text-purple-200 text-sm">
                    <span className="text-purple-400">•</span>
                    <span>Data sovereignty training</span>
                  </li>
                  <li className="flex items-start gap-2 text-purple-200 text-sm">
                    <span className="text-purple-400">•</span>
                    <span>Cooperative economics workshops</span>
                  </li>
                  <li className="flex items-start gap-2 text-purple-200 text-sm">
                    <span className="text-purple-400">•</span>
                    <span>Digital rights advocacy</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm border-blue-500/30">
              <CardHeader>
                <Globe className="w-12 h-12 text-blue-400 mb-3" />
                <CardTitle className="text-white">SOLVY Platform</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-purple-200">
                  The technological infrastructure providing SOVEREIGNITITY™, SOLVY Card, SOVEREIGNITITY™ LIFE PROGRAM, and cooperative financial services.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-purple-200 text-sm">
                    <span className="text-blue-400">•</span>
                    <span>Self-sovereign identity management</span>
                  </li>
                  <li className="flex items-start gap-2 text-purple-200 text-sm">
                    <span className="text-blue-400">•</span>
                    <span>Cooperative payment processing</span>
                  </li>
                  <li className="flex items-start gap-2 text-purple-200 text-sm">
                    <span className="text-blue-400">•</span>
                    <span>Data monetization platform</span>
                  </li>
                  <li className="flex items-start gap-2 text-purple-200 text-sm">
                    <span className="text-blue-400">•</span>
                    <span>Member-owned life insurance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-sm border-purple-500/30">
              <CardHeader>
                <Shield className="w-12 h-12 text-green-400 mb-3" />
                <CardTitle className="text-white">MAN Network</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-purple-200">
                  Security and audit network ensuring the integrity and transparency of all SOLVY ecosystem operations.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-purple-200 text-sm">
                    <span className="text-green-400">•</span>
                    <span>Security auditing and monitoring</span>
                  </li>
                  <li className="flex items-start gap-2 text-purple-200 text-sm">
                    <span className="text-green-400">•</span>
                    <span>Transparency verification</span>
                  </li>
                  <li className="flex items-start gap-2 text-purple-200 text-sm">
                    <span className="text-green-400">•</span>
                    <span>Community governance oversight</span>
                  </li>
                  <li className="flex items-start gap-2 text-purple-200 text-sm">
                    <span className="text-green-400">•</span>
                    <span>Risk assessment and mitigation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Join the DECIDEY Movement</h2>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Bring your education, experience, and wisdom to build cooperative solutions. Together, we can create financial sovereignty and community empowerment.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-purple-600 hover:bg-purple-50"
              onClick={() => {
                const enrollSection = document.getElementById('enroll');
                if (enrollSection) enrollSection.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Start Learning
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              onClick={() => {
                const enrollSection = document.getElementById('enroll');
                if (enrollSection) enrollSection.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Join Our Community
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecideyPage;

