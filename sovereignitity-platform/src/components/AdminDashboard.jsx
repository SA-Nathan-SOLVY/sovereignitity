import React, { useState, useEffect } from 'react'

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [stats, setStats] = useState({
    totalEnrollments: 0,
    earlyAccess: 0,
    waitlist: 0,
    justBrowsing: 0,
    selfEmployed: 0,
    personal: 0,
    ibcPolicies: 0,
    todayEnrollments: 0,
    weekEnrollments: 0
  })
  const [recentEnrollments, setRecentEnrollments] = useState([])
  const [systemHealth, setSystemHealth] = useState({
    nodeRed: 'checking',
    database: 'checking',
    email: 'checking',
    api: 'checking'
  })
  const [loading, setLoading] = useState(false)

  // Check if already authenticated (session storage)
  useEffect(() => {
    const auth = sessionStorage.getItem('admin_authenticated')
    if (auth === 'true') {
      setIsAuthenticated(true)
      fetchDashboardData()
    }
  }, [])

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(fetchDashboardData, 30000)
      return () => clearInterval(interval)
    }
  }, [isAuthenticated])

  const handleLogin = (e) => {
    e.preventDefault()
    // In production, verify against environment variable or backend
    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'SOLVY2026!'
    
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem('admin_authenticated', 'true')
      fetchDashboardData()
    } else {
      alert('Invalid password')
      setPassword('')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('admin_authenticated')
    setPassword('')
  }

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      // Fetch from Node-RED dashboard API endpoint
      // const response = await fetch('https://your-node-red-url/api/dashboard/stats', {
      //   headers: {
        //     'X-API-Key': import.meta.env.VITE_ADMIN_API_KEY
      //   }
      // })
      // const data = await response.json()
      
      // Mock data for now - replace with real API call
      const mockData = {
        totalEnrollments: 47,
        earlyAccess: 23,
        waitlist: 18,
        justBrowsing: 6,
        selfEmployed: 15,
        personal: 32,
        ibcPolicies: 12,
        todayEnrollments: 3,
        weekEnrollments: 14
      }
      
      const mockRecent = [
        { name: 'John Smith', email: 'john@example.com', tier: 'early-access', type: 'Self-Employed', timestamp: '2 hours ago' },
        { name: 'Sarah Johnson', email: 'sarah@example.com', tier: 'waitlist', type: 'Personal', timestamp: '5 hours ago' },
        { name: 'Michael Brown', email: 'michael@example.com', tier: 'early-access', type: 'Self-Employed', timestamp: '1 day ago' },
      ]
      
      setStats(mockData)
      setRecentEnrollments(mockRecent)
      
      // Check system health
      checkSystemHealth()
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const checkSystemHealth = async () => {
    // Check Node-RED
    try {
      // await fetch('https://your-node-red-url/health')
      setSystemHealth(prev => ({ ...prev, nodeRed: 'online' }))
    } catch {
      setSystemHealth(prev => ({ ...prev, nodeRed: 'offline' }))
    }
    
    // Mock other checks
    setSystemHealth(prev => ({
      ...prev,
      database: 'online',
      email: 'online',
      api: 'online'
    }))
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a0a2e] to-[#0a0a0a] flex items-center justify-center p-4">
        <div className="bg-black/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🔐</div>
            <h1 className="text-3xl font-bold text-purple-400 mb-2">Admin Access</h1>
            <p className="text-gray-400">SOVEREIGNITITY™ Management Dashboard</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
                placeholder="Enter admin password"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Access Dashboard
            </button>
          </form>
          
          <p className="text-xs text-gray-500 text-center mt-6">
            Unauthorized access is prohibited and logged
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a0a2e] to-[#0a0a0a] p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              🦅 SOVEREIGNITITY™ Admin Dashboard
            </h1>
            <p className="text-gray-400">Real-time enrollment monitoring & system health</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-600/30 transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* System Health */}
        <div className="bg-black/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-purple-400 mb-4">🔧 System Health</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(systemHealth).map(([key, status]) => (
              <div key={key} className="bg-black/30 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className={`text-2xl ${
                    status === 'online' ? '🟢' :
                    status === 'offline' ? '🔴' : '🟡'
                  }`}></span>
                </div>
                <p className={`text-sm mt-2 font-semibold ${
                  status === 'online' ? 'text-green-400' :
                  status === 'offline' ? 'text-red-400' : 'text-yellow-400'
                }`}>
                  {status.toUpperCase()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
            <div className="text-4xl mb-2">👥</div>
            <div className="text-3xl font-bold text-white">{stats.totalEnrollments}</div>
            <div className="text-purple-300 text-sm">Total Enrollments</div>
          </div>

          <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 backdrop-blur-sm border border-green-500/30 rounded-lg p-6">
            <div className="text-4xl mb-2">🥇</div>
            <div className="text-3xl font-bold text-white">{stats.earlyAccess}</div>
            <div className="text-green-300 text-sm">Early Access (Founding 100)</div>
          </div>

          <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 backdrop-blur-sm border border-blue-500/30 rounded-lg p-6">
            <div className="text-4xl mb-2">📋</div>
            <div className="text-3xl font-bold text-white">{stats.waitlist}</div>
            <div className="text-blue-300 text-sm">Waitlist Members</div>
          </div>

          <div className="bg-gradient-to-br from-orange-900/50 to-orange-800/30 backdrop-blur-sm border border-orange-500/30 rounded-lg p-6">
            <div className="text-4xl mb-2">🏦</div>
            <div className="text-3xl font-bold text-white">{stats.ibcPolicies}</div>
            <div className="text-orange-300 text-sm">IBC Policy Loans</div>
          </div>
        </div>

        {/* Enrollment Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-purple-400 mb-4">📊 Member Types</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">💼 Self-Employed Business</span>
                <span className="text-white font-bold">{stats.selfEmployed}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                  style={{ width: `${(stats.selfEmployed / stats.totalEnrollments) * 100}%` }}
                ></div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-300">👤 Personal Members</span>
                <span className="text-white font-bold">{stats.personal}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                  style={{ width: `${(stats.personal / stats.totalEnrollments) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-black/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-purple-400 mb-4">📈 Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Today</span>
                <span className="text-green-400 font-bold">+{stats.todayEnrollments}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">This Week</span>
                <span className="text-blue-400 font-bold">+{stats.weekEnrollments}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Avg per Day</span>
                <span className="text-purple-400 font-bold">{(stats.weekEnrollments / 7).toFixed(1)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">To Founding 100</span>
                <span className="text-orange-400 font-bold">{100 - stats.earlyAccess} spots left</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Enrollments */}
        <div className="bg-black/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-purple-400">📝 Recent Enrollments</h3>
            <button
              onClick={fetchDashboardData}
              disabled={loading}
              className="px-4 py-2 bg-purple-600/20 border border-purple-500/30 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-all disabled:opacity-50"
            >
              {loading ? '🔄 Refreshing...' : '🔄 Refresh'}
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Name</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Email</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Tier</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Type</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentEnrollments.map((enrollment, index) => (
                  <tr key={index} className="border-b border-gray-800 hover:bg-purple-900/10">
                    <td className="py-3 px-4 text-white">{enrollment.name}</td>
                    <td className="py-3 px-4 text-gray-300">{enrollment.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        enrollment.tier === 'early-access' ? 'bg-green-900/50 text-green-300' :
                        enrollment.tier === 'waitlist' ? 'bg-blue-900/50 text-blue-300' :
                        'bg-gray-900/50 text-gray-300'
                      }`}>
                        {enrollment.tier === 'early-access' ? '🥇 Early Access' :
                         enrollment.tier === 'waitlist' ? '📋 Waitlist' : '👀 Browsing'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-300">{enrollment.type}</td>
                    <td className="py-3 px-4 text-gray-400 text-sm">{enrollment.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-black/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
          <h3 className="text-xl font-bold text-purple-400 mb-4">⚡ Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="bg-purple-600/20 border border-purple-500/30 text-purple-300 py-3 rounded-lg hover:bg-purple-600/30 transition-all">
              📊 Export Data
            </button>
            <button className="bg-blue-600/20 border border-blue-500/30 text-blue-300 py-3 rounded-lg hover:bg-blue-600/30 transition-all">
              📧 Email Members
            </button>
            <button className="bg-green-600/20 border border-green-500/30 text-green-300 py-3 rounded-lg hover:bg-green-600/30 transition-all">
              🏦 IBC Requests
            </button>
            <button className="bg-orange-600/20 border border-orange-500/30 text-orange-300 py-3 rounded-lg hover:bg-orange-600/30 transition-all">
              ⚙️ Settings
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm py-4">
          <p>Last updated: {new Date().toLocaleString()}</p>
          <p className="mt-2">Auto-refreshes every 30 seconds</p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

