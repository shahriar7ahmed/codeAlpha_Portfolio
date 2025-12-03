import React from 'react'
import { FaExclamationTriangle, FaHome } from 'react-icons/fa'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console or error reporting service
    console.error('Error caught by boundary:', error, errorInfo)
    this.setState({
      error,
      errorInfo,
    })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] flex items-center justify-center p-4">
          <div className="glass rounded-2xl p-8 max-w-2xl w-full text-center">
            <div className="mb-6">
              <FaExclamationTriangle className="text-[#e94560] mx-auto" size={64} />
            </div>
            <h1 className="text-3xl font-bold mb-4 gradient-text">Something went wrong</h1>
            <p className="text-gray-400 mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page or return to the home page.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="text-left mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <summary className="cursor-pointer text-red-400 font-semibold mb-2">
                  Error Details (Development Only)
                </summary>
                <pre className="text-xs text-gray-300 overflow-auto">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
            <div className="flex gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="px-6 py-3 bg-[#e94560] hover:bg-[#ff6b7a] rounded-lg text-white font-semibold flex items-center gap-2 transition-colors"
              >
                <FaHome />
                Go Home
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-gray-300 font-semibold transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

