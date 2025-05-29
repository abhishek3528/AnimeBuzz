import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart, FaTimes, FaPlay, FaInfoCircle } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'

// Mock favorites data
const mockFavorites = [
  {
    id: 1,
    title: "Demon Slayer",
    image: "https://images.pexels.com/photos/6342452/pexels-photo-6342452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    rating: 9.2,
    type: "anime"
  },
  {
    id: 2,
    title: "Attack on Titan",
    image: "https://images.pexels.com/photos/4040585/pexels-photo-4040585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    rating: 9.0,
    type: "anime"
  },
  {
    id: 3,
    title: "Jujutsu Kaisen Season 3 Officially Announced",
    image: "https://images.pexels.com/photos/12934492/pexels-photo-12934492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    date: "2 hours ago",
    type: "news"
  },
  {
    id: 4,
    title: "Demon Slayer Tanjiro Kamado Figure",
    image: "https://images.pexels.com/photos/5082584/pexels-photo-5082584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    price: 49.99,
    type: "product"
  }
]

export default function Favorites() {
  const { currentUser } = useAuth()
  const [favorites, setFavorites] = useState([])
  const [activeTab, setActiveTab] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, we would fetch favorites from an API or local storage
    // For demo purposes, we'll use the mock data
    if (currentUser) {
      setLoading(true)
      setTimeout(() => {
        setFavorites(mockFavorites)
        setLoading(false)
      }, 1000)
    } else {
      setFavorites([])
      setLoading(false)
    }
  }, [currentUser])

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(item => item.id !== id))
  }

  const filteredFavorites = activeTab === "all" 
    ? favorites 
    : favorites.filter(item => item.type === activeTab)

  if (!currentUser) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <div className="bg-dark p-8 rounded-lg text-center max-w-md">
          <h2 className="text-2xl font-bold text-light mb-4">Login Required</h2>
          <p className="text-secondary mb-6">
            Please log in to view and manage your favorites.
          </p>
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-light mb-4 md:mb-0">My Favorites</h1>
          
          <div className="flex space-x-2 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === "all" 
                  ? 'bg-primary text-white' 
                  : 'bg-dark text-secondary hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("anime")}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === "anime" 
                  ? 'bg-primary text-white' 
                  : 'bg-dark text-secondary hover:text-white'
              }`}
            >
              Anime
            </button>
            <button
              onClick={() => setActiveTab("news")}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === "news" 
                  ? 'bg-primary text-white' 
                  : 'bg-dark text-secondary hover:text-white'
              }`}
            >
              News
            </button>
            <button
              onClick={() => setActiveTab("product")}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === "product" 
                  ? 'bg-primary text-white' 
                  : 'bg-dark text-secondary hover:text-white'
              }`}
            >
              Products
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : filteredFavorites.length === 0 ? (
          <div className="bg-dark p-8 rounded-lg text-center">
            <div className="flex justify-center mb-4">
              <FaHeart className="text-gray-600" size={48} />
            </div>
            <h3 className="text-xl text-light mb-2">No favorites found</h3>
            <p className="text-secondary mb-4">
              {activeTab === "all" 
                ? "You haven't added any favorites yet." 
                : `You haven't added any favorite ${activeTab === "anime" ? "anime" : activeTab === "news" ? "news articles" : "products"} yet.`}
            </p>
            <Link to="/" className="btn btn-primary">
              Browse {activeTab === "anime" ? "Anime" : activeTab === "news" ? "News" : activeTab === "product" ? "Shop" : "Content"}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFavorites.map(item => (
              <div key={item.id} className="relative group card">
                {/* Remove button */}
                <button 
                  onClick={() => removeFavorite(item.id)}
                  className="absolute top-2 right-2 z-10 bg-dark/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                  aria-label="Remove from favorites"
                >
                  <FaTimes className="text-white" size={14} />
                </button>
                
                {/* Content based on type */}
                {item.type === "anime" && (
                  <Link to={`/anime/${item.id}`} className="block">
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 w-full">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              <FaHeart className="text-red-500 mr-1" />
                              <span className="text-white text-sm">{item.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-primary/80 rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                          <FaPlay className="text-white" size={20} />
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="text-light font-medium text-sm sm:text-base truncate">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                )}
                
                {item.type === "news" && (
                  <Link to={`/news/${item.id}`} className="block">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-light font-medium mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      <div className="text-xs text-gray-400">
                        {item.date}
                      </div>
                    </div>
                  </Link>
                )}
                
                {item.type === "product" && (
                  <Link to={`/shop/product/${item.id}`} className="block">
                    <div className="relative aspect-square overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-light font-medium mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      <div className="text-primary font-bold">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}