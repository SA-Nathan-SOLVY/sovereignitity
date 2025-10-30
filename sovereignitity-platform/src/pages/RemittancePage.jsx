import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, TrendingUp, Users, Shield, ArrowRight, Calculator } from 'lucide-react';

const RemittancePage = () => {
  const [sendAmount, setSendAmount] = useState(500);
  const [sendCurrency, setSendCurrency] = useState('USD');
  const [receiveCurrency, setReceiveCurrency] = useState('PHP');

  // Exchange rates (simulated)
  const exchangeRates = {
    'BRL': 4.95, 'RUB': 89.50, 'INR': 83.10, 'CNY': 7.18, 'ZAR': 19.05,
    'EGP': 30.90, 'ETB': 56.50, 'IRR': 42000, 'AED': 3.67,
    'BYN': 2.60, 'BOB': 6.86, 'KZT': 450.25, 'CUP': 24.00, 'MYR': 4.60,
    'THB': 35.25, 'UGX': 3700, 'UZS': 10800, 'NGN': 780,
    'MXN': 17.15, 'PHP': 56.43, 'PKR': 279.50, 'EUR': 0.92, 'BDT': 109.75
  };

  const calculateConversion = () => {
    if (receiveCurrency === 'USD') return sendAmount;
    const rate = exchangeRates[receiveCurrency] || 1;
    return (sendAmount * rate).toFixed(2);
  };

  const calculateAnnualSavings = () => {
    const monthlyFee = sendAmount * 0.18; // 18% traditional fee
    return (monthlyFee * 12).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <Globe className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Global Remittance Vision & Roadmap</h1>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Building the future of diaspora financial sovereignty through strategic partnership goals
          </p>
        </div>

        {/* Future Vision */}
        <Card className="mb-16 bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-sm border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-3xl text-white flex items-center gap-3">
              <span className="text-4xl">💡</span>
              Future Vision: Self-Determined Economic Liberation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-purple-100 text-lg leading-relaxed">
              While HR 40 represents important progress, the African Diaspora cannot wait for institutional action. SOLVY's roadmap envisions <strong className="text-white">zero-fee family remittances</strong> connecting diaspora communities globally through our <strong className="text-white">Ethereum-ready and Polygon-integrated Web3 infrastructure</strong>. This comprehensive network will enable <strong className="text-white">immediate economic sovereignty</strong> through cooperative wealth-building, supporting all communities exploited in the post-WW2 American empire.
            </p>
          </CardContent>
        </Card>

        {/* Development Roadmap */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12 flex items-center justify-center gap-3">
            <span className="text-4xl">📅</span>
            Development Roadmap
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Phase 1 */}
            <Card className="bg-gradient-to-br from-green-900/30 to-blue-900/50 backdrop-blur-sm border-green-500/30">
              <CardHeader>
                <div className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3">
                  In Progress
                </div>
                <CardTitle className="text-white">Phase 1: Foundation</CardTitle>
                <CardDescription className="text-purple-200">2025 Q1-Q2</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-purple-200 text-sm">
                    <span className="text-green-400 mt-1">●</span>
                    <span>EBL Services integration (Current)</span>
                  </li>
                  <li className="flex items-start gap-2 text-purple-200 text-sm">
                    <span className="text-green-400 mt-1">●</span>
                    <span>SOLVY Card deployment</span>
                  </li>
                  <li className="flex items-start gap-2 text-purple-200 text-sm">
                    <span className="text-green-400 mt-1">●</span>
                    <span>DECIDEY NGO education platform</span>
                  </li>
                  <li className="flex items-start gap-2 text-purple-200 text-sm">
                    <span className="text-green-400 mt-1">●</span>
                    <span>SOVEREIGNITITY™ LIFE PROGRAM wealth-building strategies</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Phase 2 */}
            <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/50 backdrop-blur-sm border-blue-500/30">
              <CardHeader>
                <div className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3">
                  Planned
                </div>
                <CardTitle className="text-white">Phase 2: Regional Expansion</CardTitle>
                <CardDescription className="text-purple-200">2025 Q3-Q4</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-purple-200 text-sm">
                    <span className="text-blue-400 mt-1">●</span>
                    <span>African Diaspora remittance pilot</span>
                  </li>
                  <li className="flex items-start gap-2 text-purple-200 text-sm">
                    <span className="text-blue-400 mt-1">●</span>
                    <span>Nigeria, Ghana, Kenya partnerships</span>
                  </li>
                  <li className="flex items-start gap-2 text-purple-200 text-sm">
                    <span className="text-blue-400 mt-1">●</span>
                    <span>Family card network testing</span>
                  </li>
                  <li className="flex items-start gap-2 text-purple-200 text-sm">
                    <span className="text-blue-400 mt-1">●</span>
                    <span>Cooperative economics education</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Phase 3 */}
            <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/50 backdrop-blur-sm border-purple-500/30">
              <CardHeader>
                <div className="inline-block bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3">
                  Vision
                </div>
                <CardTitle className="text-white">Phase 3: Global Integration</CardTitle>
                <CardDescription className="text-purple-200">2026 Q1-Q2</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-purple-200 text-sm">
                    <span className="text-purple-400 mt-1">●</span>
                    <span>Web3 infrastructure deployment</span>
                  </li>
                  <li className="flex items-start gap-2 text-purple-200 text-sm">
                    <span className="text-purple-400 mt-1">●</span>
                    <span>Ethereum and Polygon network integration</span>
                  </li>
                  <li className="flex items-start gap-2 text-purple-200 text-sm">
                    <span className="text-purple-400 mt-1">●</span>
                    <span>International partnership development</span>
                  </li>
                  <li className="flex items-start gap-2 text-purple-200 text-sm">
                    <span className="text-purple-400 mt-1">●</span>
                    <span>Cross-border payment infrastructure</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Phase 4 */}
            <Card className="bg-gradient-to-br from-orange-900/30 to-purple-900/50 backdrop-blur-sm border-orange-500/30">
              <CardHeader>
                <div className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3">
                  Vision
                </div>
                <CardTitle className="text-white">Phase 4: Global Network</CardTitle>
                <CardDescription className="text-purple-200">2026 Q3+</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-purple-200 text-sm">
                    <span className="text-orange-400 mt-1">●</span>
                    <span>Top remittance market integration</span>
                  </li>
                  <li className="flex items-start gap-2 text-purple-200 text-sm">
                    <span className="text-orange-400 mt-1">●</span>
                    <span>Multi-currency support expansion</span>
                  </li>
                  <li className="flex items-start gap-2 text-purple-200 text-sm">
                    <span className="text-orange-400 mt-1">●</span>
                    <span>Global cooperative network</span>
                  </li>
                  <li className="flex items-start gap-2 text-purple-200 text-sm">
                    <span className="text-orange-400 mt-1">●</span>
                    <span>Economic sovereignty achievement</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Savings Calculator */}
        <Card className="mb-16 bg-gradient-to-br from-green-900/30 to-blue-900/50 backdrop-blur-sm border-green-500/30">
          <CardHeader>
            <CardTitle className="text-3xl text-white flex items-center gap-3">
              <Calculator className="w-8 h-8" />
              Future Savings Calculator
            </CardTitle>
            <CardDescription className="text-purple-200 text-lg">
              See how much you could save with SOLVY's zero-fee family remittance network
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <Label className="text-white mb-3 block">Send Amount (USD)</Label>
                <Input
                  type="number"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(Number(e.target.value))}
                  className="bg-purple-800/30 border-purple-400/30 text-white text-lg"
                />
              </div>
              <div>
                <Label className="text-white mb-3 block">Destination Country</Label>
                <Select value={receiveCurrency} onValueChange={setReceiveCurrency}>
                  <SelectTrigger className="bg-purple-800/30 border-purple-400/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PHP">🇵🇭 Philippines (PHP)</SelectItem>
                    <SelectItem value="MXN">🇲🇽 Mexico (MXN)</SelectItem>
                    <SelectItem value="INR">🇮🇳 India (INR)</SelectItem>
                    <SelectItem value="NGN">🇳🇬 Nigeria (NGN)</SelectItem>
                    <SelectItem value="PKR">🇵🇰 Pakistan (PKR)</SelectItem>
                    <SelectItem value="BDT">🇧🇩 Bangladesh (BDT)</SelectItem>
                    <SelectItem value="EGP">🇪🇬 Egypt (EGP)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Traditional Remittance */}
              <div className="bg-red-900/30 backdrop-blur-sm p-6 rounded-lg border border-red-400/30">
                <h3 className="text-xl font-semibold text-white mb-4">Traditional Remittance</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-purple-200">
                    <span>Send Amount:</span>
                    <span className="font-semibold">${sendAmount}</span>
                  </div>
                  <div className="flex justify-between text-red-300">
                    <span>Fees (18%):</span>
                    <span className="font-semibold">-${(sendAmount * 0.18).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-red-400/30 pt-3 flex justify-between text-white text-lg">
                    <span>Recipient Gets:</span>
                    <span className="font-bold">${(sendAmount * 0.82).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* SOLVY Family Network */}
              <div className="bg-green-900/30 backdrop-blur-sm p-6 rounded-lg border border-green-400/30">
                <h3 className="text-xl font-semibold text-white mb-4">SOLVY Family Network (Future)</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-purple-200">
                    <span>Send Amount:</span>
                    <span className="font-semibold">${sendAmount}</span>
                  </div>
                  <div className="flex justify-between text-green-300">
                    <span>Fees:</span>
                    <span className="font-semibold">$0.00 (Family Cards)</span>
                  </div>
                  <div className="border-t border-green-400/30 pt-3 flex justify-between text-white text-lg">
                    <span>Recipient Gets:</span>
                    <span className="font-bold">${sendAmount}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-green-600/30 to-blue-600/30 backdrop-blur-sm p-6 rounded-lg border border-green-400/20">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">
                  ${calculateAnnualSavings()}
                </div>
                <div className="text-purple-200">
                  Projected Annual Savings
                </div>
                <div className="text-purple-300 text-sm mt-1">
                  Per year (monthly transfers)
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-sm border-purple-500/30">
            <CardHeader>
              <Shield className="w-12 h-12 text-purple-400 mb-3" />
              <CardTitle className="text-white">Economic Sovereignty</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-purple-200 text-sm">
                  <span className="text-purple-400">•</span>
                  <span>Self-determined financial independence</span>
                </li>
                <li className="flex items-start gap-2 text-purple-200 text-sm">
                  <span className="text-purple-400">•</span>
                  <span>Bypass traditional banking exploitation</span>
                </li>
                <li className="flex items-start gap-2 text-purple-200 text-sm">
                  <span className="text-purple-400">•</span>
                  <span>Data sovereignty and privacy</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm border-blue-500/30">
            <CardHeader>
              <Users className="w-12 h-12 text-blue-400 mb-3" />
              <CardTitle className="text-white">Diaspora Unity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-purple-200 text-sm">
                  <span className="text-blue-400">•</span>
                  <span>Connect families across continents</span>
                </li>
                <li className="flex items-start gap-2 text-purple-200 text-sm">
                  <span className="text-blue-400">•</span>
                  <span>Strengthen cultural and economic bonds</span>
                </li>
                <li className="flex items-start gap-2 text-purple-200 text-sm">
                  <span className="text-blue-400">•</span>
                  <span>Build cooperative wealth networks</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-sm border-purple-500/30">
            <CardHeader>
              <Globe className="w-12 h-12 text-green-400 mb-3" />
              <CardTitle className="text-white">Global Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-purple-200 text-sm">
                  <span className="text-green-400">•</span>
                  <span>Deploy Web3 infrastructure globally</span>
                </li>
                <li className="flex items-start gap-2 text-purple-200 text-sm">
                  <span className="text-green-400">•</span>
                  <span>Advance blockchain-based financial systems</span>
                </li>
                <li className="flex items-start gap-2 text-purple-200 text-sm">
                  <span className="text-green-400">•</span>
                  <span>Create decentralized economic networks</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Join the Global Network</h2>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Be part of the founding 100 members building the future of diaspora financial sovereignty. Zero-fee family remittances coming in 2026.
          </p>
          <Button 
            size="lg"
            className="bg-white text-purple-600 hover:bg-purple-50"
            onClick={() => {
              const enrollSection = document.getElementById('enroll');
              if (enrollSection) enrollSection.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Get Early Access
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Note */}
        <div className="mt-8 text-center">
          <p className="text-purple-300 text-sm">
            Note: Exchange rates are simulated for development purposes. Live rates will be integrated in production.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RemittancePage;

