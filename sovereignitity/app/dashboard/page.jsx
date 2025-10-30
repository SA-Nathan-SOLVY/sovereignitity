export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">SOVEREIGNITITY™</h1>
        <p className="text-gray-600 text-lg">Sovereign Banking Platform</p>
        <p className="text-gray-500 text-sm mt-2">VA Benefits + IBC Policy Loans + Business Integration</p>
      </header>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Financial Overview</h3>
          <p>VA Benefits + IBC Policy Loans + Business Integration</p>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span>Available Balance:</span>
              <span className="font-semibold">$--</span>
            </div>
            <div className="flex justify-between">
              <span>Monthly Budget:</span>
              <span className="font-semibold">$--</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Budget Overview</h3>
          <p>Real-time sovereign financial tracking</p>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span>This Month:</span>
              <span className="font-semibold">$--</span>
            </div>
            <div className="flex justify-between">
              <span>Remaining:</span>
              <span className="font-semibold text-green-600">$--</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg md:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Sovereign Loan Services</h3>
          <p>IBC Policy Loans & Business Financing</p>
          <div className="mt-4 flex gap-4">
            <button className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition">
              Apply for Policy Loan
            </button>
            <button className="border border-gray-300 text-gray-700 py-2 px-6 rounded hover:bg-gray-50 transition">
              Business Financing
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
