import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'

const AdminAuth = ({ onLogin }) => {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Admin password - in production, this should be in environment variable
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        // Store session in localStorage
        localStorage.setItem('admin_authenticated', 'true')
        localStorage.setItem('admin_session_time', Date.now().toString())
        onLogin()
      } else {
        setError('Incorrect password. Please try again.')
      }
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-8 max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#e94560]/20 rounded-full mb-4">
            <FaLock className="text-[#e94560]" size={24} />
          </div>
          <h2 className="text-3xl font-bold mb-2 gradient-text">Admin Login</h2>
          <p className="text-gray-400">Enter your password to access the admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e94560] transition-all"
                placeholder="Enter admin password"
                required
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={isLoading || !password}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-6 py-3 bg-gradient-to-r from-[#e94560] to-[#ff6b7a] text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Verifying...
              </>
            ) : (
              <>
                <FaLock />
                Login
              </>
            )}
          </motion.button>
        </form>

        <p className="text-center text-gray-500 text-xs mt-6">
          For security, change the default password in production
        </p>
      </motion.div>
    </div>
  )
}

export default AdminAuth

