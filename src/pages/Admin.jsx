import { useState, useEffect } from 'react'
import AdminAuth from '../components/Admin/AdminAuth'
import AdminDashboard from '../components/Admin/AdminDashboard'
import { initializeDefaultData } from '../utils/dataManager'

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem('admin_authenticated')
    const sessionTime = localStorage.getItem('admin_session_time')
    
    // Check if session is still valid (24 hours)
    if (authStatus === 'true' && sessionTime) {
      const sessionAge = Date.now() - parseInt(sessionTime)
      const twentyFourHours = 24 * 60 * 60 * 1000
      
      if (sessionAge < twentyFourHours) {
        setIsAuthenticated(true)
      } else {
        // Session expired
        localStorage.removeItem('admin_authenticated')
        localStorage.removeItem('admin_session_time')
      }
    }
    
    // Initialize default data if needed
    initializeDefaultData()
    
    setIsChecking(false)
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated')
    localStorage.removeItem('admin_session_time')
    setIsAuthenticated(false)
  }

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#e94560] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold gradient-text">Loading...</p>
        </div>
      </div>
    )
  }

  return isAuthenticated ? (
    <AdminDashboard onLogout={handleLogout} />
  ) : (
    <AdminAuth onLogin={handleLogin} />
  )
}

export default Admin

