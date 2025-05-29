import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Simulate checking for a saved user session
  useEffect(() => {
    const savedUser = localStorage.getItem('animeUser')
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  // Login function
  const login = (email, password) => {
    // In a real app, you would call an authentication API here
    // This is a simplified mock version
    return new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        if (email && password) {
          const user = { id: 1, email, name: email.split('@')[0] }
          setCurrentUser(user)
          localStorage.setItem('animeUser', JSON.stringify(user))
          resolve(user)
        } else {
          reject(new Error('Invalid credentials'))
        }
      }, 1000)
    })
  }

  // Logout function
  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('animeUser')
    return Promise.resolve()
  }

  // Register function
  const register = (email, password, name) => {
    // In a real app, you would call an API to create a new user
    // This is a simplified mock version
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password && name) {
          const user = { id: Date.now(), email, name }
          setCurrentUser(user)
          localStorage.setItem('animeUser', JSON.stringify(user))
          resolve(user)
        } else {
          reject(new Error('Invalid registration data'))
        }
      }, 1000)
    })
  }

  const value = {
    currentUser,
    login,
    logout,
    register,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}