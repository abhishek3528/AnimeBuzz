import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { register } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    try {
      setError('')
      setLoading(true)
      await register(email, password, name)
      navigate('/', { replace: true })
    } catch (err) {
      setError('Failed to create an account')
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
            <h2 className="text-2xl font-bold text-light mb-6 text-center">Create an Account</h2>
            
            {error && (
              <div className="mb-4 bg-error/20 text-error px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-light text-sm font-medium mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-500" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full py-2 pl-10 pr-3 bg-background border border-gray-700 rounded-md text-light focus:outline-none focus:border-primary"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
              
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
              
              <div>
                <label htmlFor="confirmPassword" className="block text-light text-sm font-medium mb-2">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-500" />
                  </div>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full py-2 pl-10 pr-3 bg-background border border-gray-700 rounded-md text-light focus:outline-none focus:border-primary"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary rounded focus:ring-primary"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-secondary">
                  I agree to the <a href="#" className="text-primary hover:underline">Terms</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                </label>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-dark text-secondary">Or sign up with</span>
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
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}