import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function useCart() {
  return useContext(CartContext)
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('animeCart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
    setLoading(false)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('animeCart', JSON.stringify(cartItems))
  }, [cartItems])

  // Add item to cart
  const addToCart = (item) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItem = prevItems.find(i => i.id === item.id)
      
      if (existingItem) {
        // Increase quantity if item exists
        return prevItems.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...item, quantity: 1 }]
      }
    })
  }

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  // Update item quantity
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  // Calculate total price
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  // Get total number of items
  const getItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  // Clear cart
  const clearCart = () => {
    setCartItems([])
  }

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getItemCount,
    clearCart,
    loading
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}