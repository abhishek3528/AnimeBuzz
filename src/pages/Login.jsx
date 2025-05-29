import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FaEnvelope, FaLock, FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  
  const redirectPath = location.state?.from?.pathname || '/'

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || !password) {
      setError('Please enter both email and password')
      return
    }
    
    try {
      setError('')
      setLoading(true)
      await login(email, password)
      navigate(redirectPath, { replace: true })
    } catch (err) {
      setError('Failed to log in. Please check your credentials.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-dark rounded-lg overflow-hidden shadow-lg">
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-light mb-6 text-center">Welcome Back</h2>
            
            {error && (
              <div className="mb-4 bg-error/20 text-error px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-light text-sm font-medium mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-500" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-2 pl-10 pr-3 bg-background border border-gray-700 rounded-md text-light focus:outline-none focus:border-primary"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-light text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-500" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-2 pl-10 pr-3 bg-background border border-gray-700 rounded-md text-light focus:outline-none focus:border-primary"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-primary rounded focus:ring-primary" />
                  <span className="ml-2 text-sm text-secondary">Remember me</span>
                </label>
                <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-dark text-secondary">Or continue with</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-3">
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-background text-sm font-medium text-secondary hover:bg-gray-800">
                  <FaGoogle className="text-red-500" />
                </button>
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-background text-sm font-medium text-secondary hover:bg-gray-800">
                  <FaFacebook className="text-blue-600" />
                </button>
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-background text-sm font-medium text-secondary hover:bg-gray-800">
                  <FaTwitter className="text-blue-400" />
                </button>
              </div>
            </div>
            
            <p className="mt-8 text-center text-sm text-secondary">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}