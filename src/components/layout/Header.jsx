import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useCart } from '../../contexts/CartContext'
import { FaBars, FaTimes, FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa'

export default function Header({ scrolled }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { currentUser, logout } = useAuth()
  const { getItemCount } = useCart()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    // You would implement actual search functionality here
    console.log('Searching for:', searchQuery)
    setSearchQuery('')
    // Example navigation to search results:
    // navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
      setIsMenuOpen(false)
    } catch (error) {
      console.error('Failed to log out', error)
    }
  }

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background shadow-lg' : 'bg-gradient-to-b from-background to-transparent'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-primary text-2xl font-bold font-heading">Anime<span className="text-light">Buzz</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-light hover:text-primary transition-colors">Home</Link>
            <Link to="/news" className="text-light hover:text-primary transition-colors">News</Link>
            <Link to="/favorites" className="text-light hover:text-primary transition-colors">Favorites</Link>
            <Link to="/shop" className="text-light hover:text-primary transition-colors">Shop</Link>
          </nav>

          {/* Search and User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anime..." 
                className="py-1 px-3 pr-8 rounded-full bg-dark text-light border border-gray-700 focus:outline-none focus:border-primary text-sm"
              />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary">
                <FaSearch size={14} />
              </button>
            </form>

            {currentUser ? (
              <div className="flex items-center space-x-4">
                <Link to="/cart" className="relative">
                  <FaShoppingCart className="text-light hover:text-primary transition-colors" size={20} />
                  {getItemCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getItemCount()}
                    </span>
                  )}
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-light hover:text-primary">
                    <FaUser size={18} />
                    <span className="text-sm">{currentUser.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-dark border border-gray-700 rounded-md shadow-lg py-1 hidden group-hover:block">
                    <Link to="/favorites" className="block px-4 py-2 text-sm text-light hover:bg-primary hover:text-white">My Favorites</Link>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-light hover:bg-primary hover:text-white">Profile</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-light hover:bg-primary hover:text-white">
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="text-sm text-light hover:text-primary transition-colors">Login</Link>
                <span className="text-gray-500">|</span>
                <Link to="/register" className="text-sm text-light hover:text-primary transition-colors">Register</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-light hover:text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark border-t border-gray-800 animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search anime..." 
                  className="w-full py-2 px-4 pr-10 rounded-full bg-background text-light border border-gray-700 focus:outline-none focus:border-primary"
                />
                <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary">
                  <FaSearch size={18} />
                </button>
              </div>
            </form>

            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-light hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/news" className="text-light hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>News</Link>
              <Link to="/favorites" className="text-light hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Favorites</Link>
              <Link to="/shop" className="text-light hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Shop</Link>
              
              {currentUser ? (
                <>
                  <div className="pt-2 border-t border-gray-700">
                    <div className="flex items-center space-x-2 mb-2">
                      <FaUser size={16} className="text-primary" />
                      <span className="text-light">{currentUser.name}</span>
                    </div>
                    <Link to="/profile" className="text-light hover:text-primary transition-colors block py-2" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                    <Link to="/cart" className="text-light hover:text-primary transition-colors block py-2" onClick={() => setIsMenuOpen(false)}>
                      Cart ({getItemCount()})
                    </Link>
                    <button 
                      onClick={handleLogout} 
                      className="text-light hover:text-primary transition-colors block py-2"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="pt-2 border-t border-gray-700 flex space-x-4">
                  <Link to="/login" className="text-light hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Login</Link>
                  <Link to="/register" className="text-light hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Register</Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}