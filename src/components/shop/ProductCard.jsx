import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa'
import { useCart } from '../../contexts/CartContext'
import { useAuth } from '../../contexts/AuthContext'

export default function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const { addToCart } = useCart()
  const { currentUser } = useAuth()

  const toggleFavorite = (e) => {
    e.preventDefault()
    if (!currentUser) {
      // Redirect to login or show login prompt
      return
    }
    setIsFavorite(!isFavorite)
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  return (
    <div className="card group">
      <Link to={`/shop/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {product.isNew && (
            <div className="absolute top-0 left-0 m-2">
              <span className="inline-block bg-primary text-white text-xs font-medium px-2 py-1 rounded">
                New
              </span>
            </div>
          )}
          
          {product.discount > 0 && (
            <div className="absolute top-0 right-0 m-2">
              <span className="inline-block bg-error text-white text-xs font-medium px-2 py-1 rounded">
                -{product.discount}%
              </span>
            </div>
          )}
          
          <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={handleAddToCart}
              className="w-full py-2 bg-primary text-white rounded-md flex items-center justify-center space-x-2 hover:bg-blue-600 transition-colors"
            >
              <FaShoppingCart />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-light font-medium line-clamp-2">
              {product.name}
            </h3>
            <button 
              onClick={toggleFavorite}
              className="text-gray-400 hover:text-red-500 transition-colors focus:outline-none"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-primary font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through text-sm">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          
          <p className="text-secondary text-sm mt-2 line-clamp-1">
            {product.category}
          </p>
        </div>
      </Link>
    </div>
  )
}