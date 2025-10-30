export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold">SOLVY</span>
          </div>
          <div className="flex space-x-4">
            <button className="border border-blue-500 text-blue-400 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition">
              Sign In
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Financial Sovereignty
          <br />
          <span className="text-blue-400">Starts Here</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Own your data, control your finances, build your legacy. The SOLVY Card puts you in charge.
        </p>
        <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
          Get Your SOLVY Card
        </button>
      </section>

      {/* Debit Card Preview */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-blue-200 text-sm">SOLVY</p>
                <p className="text-lg font-semibold">Sovereign Banking</p>
              </div>
              <div className="text-right">
                <p className="text-blue-200 text-sm">Balance</p>
                <p className="text-2xl font-bold">$---</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-blue-200 text-sm mb-2">Card Number</p>
              <p className="text-xl font-mono tracking-widest">•••• •••• •••• ••••</p>
            </div>
            
            <div className="flex justify-between">
              <div>
                <p className="text-blue-200 text-sm">Expires</p>
                <p>••/••</p>
              </div>
              <div>
                <p className="text-blue-200 text-sm">CVV</p>
                <p>•••</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Data Ownership</h3>
            <p className="text-gray-300">Earn from your data instead of giving it away for free.</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">AI Tax Assistant</h3>
            <p className="text-gray-300">Automated expense tracking and tax optimization.</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Cooperative Banking</h3>
            <p className="text-gray-300">Member-owned financial services with shared benefits.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
