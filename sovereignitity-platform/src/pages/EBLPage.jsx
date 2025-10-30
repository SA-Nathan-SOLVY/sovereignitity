import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Phone, MessageSquare, MapPin, CreditCard, Smartphone } from 'lucide-react';
import eblLogo from '../assets/ebl-logo.png';

const EBLPage = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('solvy');

  const locations = [
    {
      id: 'overture',
      name: 'HBL Overture Highlands',
      address: '250 W Arbrook Blvd, Arlington, TX',
      services: 'Nail services only'
    },
    {
      id: 'seleno',
      name: 'Seleno Location',
      address: '1205 W Harris Rd, Arlington, TX',
      services: 'Full service location'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-40 h-40 shadow-2xl">
              <img src={eblLogo} alt="Evergreen Beauty Lounge" className="w-full h-full object-cover" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Evergreen Beauty Lounge</h1>
          <p className="text-xl text-purple-200 mb-6">Premium Beauty Services - Pay with Your SOLVY Card</p>
          
          <div className="inline-flex items-center gap-2 bg-purple-800/50 backdrop-blur-sm px-6 py-3 rounded-full border border-purple-400/30">
            <CreditCard className="w-5 h-5 text-purple-300" />
            <span className="text-purple-100">Use your SOLVY Card for all EBL services and earn rewards with every transaction!</span>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 text-green-400">
              <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm">SOLVY Payment Partner</span>
            </div>
          </div>
        </div>

        {/* Locations */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {locations.map((location) => (
            <Card key={location.id} className="bg-black/40 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  {location.name}
                </CardTitle>
                <CardDescription className="text-purple-200">
                  {location.address}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-purple-300 mb-4">{location.services}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white">
                    <Phone className="w-4 h-4 text-green-400" />
                    <span className="text-sm">Call: (817) 555-BEAUTY</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <MessageSquare className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">Text: (817) 555-0123</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Section */}
        <Card className="bg-black/40 border-purple-500/30 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Make a Payment</CardTitle>
            <CardDescription className="text-purple-200">
              Pay for your EBL services using your SOLVY Card
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Location Selection */}
            <div className="space-y-2">
              <Label className="text-white">Select Location</Label>
              <RadioGroup value={selectedLocation} onValueChange={setSelectedLocation}>
                {locations.map((location) => (
                  <div key={location.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={location.id} id={location.id} />
                    <Label htmlFor={location.id} className="text-purple-200 cursor-pointer">
                      {location.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-white">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300">$</span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8 bg-black/20 border-purple-500/30 text-white"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <Label className="text-white">Payment Method</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
                  <RadioGroupItem value="solvy" id="solvy" />
                  <Label htmlFor="solvy" className="text-white cursor-pointer flex items-center gap-2 flex-1">
                    <CreditCard className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="font-semibold">SOLVY Card</div>
                      <div className="text-sm text-purple-300">Crypto-native debit card</div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 bg-black/20 rounded-lg border border-purple-500/30">
                  <RadioGroupItem value="mobile" id="mobile" />
                  <Label htmlFor="mobile" className="text-white cursor-pointer flex items-center gap-2 flex-1">
                    <Smartphone className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="font-semibold">Mobile Wallet</div>
                      <div className="text-sm text-purple-300">Apple Pay, Google Pay</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Submit Button */}
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg py-6"
              disabled={!selectedLocation || !amount}
            >
              Pay with {paymentMethod === 'solvy' ? 'SOLVY Card' : 'Mobile Wallet'}
            </Button>

            {/* Info */}
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <p className="text-sm text-blue-200">
                <strong>New to SOLVY?</strong> Get your SOLVY Card to enjoy seamless payments, 
                data sovereignty, and rewards on all your EBL services.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Services Info */}
        <div className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-black/40 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white">💅 Nail Services</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-purple-200">
                  <li>• Manicures & Pedicures</li>
                  <li>• Gel & Acrylic Nails</li>
                  <li>• Nail Art & Design</li>
                  <li>• Spa Treatments</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white">💇 Hair Services</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-purple-200">
                  <li>• Cuts & Styling</li>
                  <li>• Color & Highlights</li>
                  <li>• Treatments & Care</li>
                  <li>• Special Occasions</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white">✨ Spa Services</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-purple-200">
                  <li>• Facials & Skincare</li>
                  <li>• Waxing Services</li>
                  <li>• Massage Therapy</li>
                  <li>• Body Treatments</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EBLPage;

