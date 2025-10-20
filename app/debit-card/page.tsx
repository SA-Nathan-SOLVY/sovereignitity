export default function DebitCard() {
  const transactions = [
    { id: 1, name: "Whole Foods", amount: -84.32, date: "Today" },
    { id: 2, name: "Direct Deposit", amount: 2500.00, date: "Yesterday" },
    { id: 3, name: "Netflix", amount: -15.99, date: "Oct 15" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">SOLVY Card</h1>
        
        {/* Card Display */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white shadow-2xl mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-blue-200 text-sm">SOLVY</p>
              <p className="text-lg font-semibold">Sovereign Banking</p>
            </div>
            <div className="text-right">
              <p className="text-blue-200 text-sm">Balance</p>
              <p className="text-2xl font-bold">$1,284.75</p>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-blue-200 text-sm mb-2">Card Number</p>
            <p className="text-xl font-mono tracking-widest">•••• 4832</p>
          </div>
          
          <div className="flex justify-between">
            <div>
              <p className="text-blue-200 text-sm">Expires</p>
              <p>12/26</p>
            </div>
            <div>
              <p className="text-blue-200 text-sm">CVV</p>
              <p>•••</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800 p-4 rounded-xl">
            <p className="text-gray-400 text-sm">Spent</p>
            <p className="text-xl font-bold">$842.50</p>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl">
            <p className="text-gray-400 text-sm">Budget</p>
            <p className="text-xl font-bold text-green-400">$457.25</p>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl">
            <p className="text-gray-400 text-sm">Rewards</p>
            <p className="text-xl font-bold text-purple-400">1,284</p>
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex justify-between items-center p-3 hover:bg-slate-700 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    transaction.amount > 0 ? 'bg-green-900' : 'bg-red-900'
                  }`}>
                    <span>{transaction.amount > 0 ? '💰' : '🛒'}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{transaction.name}</p>
                    <p className="text-sm text-gray-400">{transaction.date}</p>
                  </div>
                </div>
                <p className={`font-semibold ${
                  transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
