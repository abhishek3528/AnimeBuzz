import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrash, FaMinus, FaPlus, FaArrowLeft, FaCreditCard, FaPaypal } from 'react-icons/fa'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()
  const { currentUser } = useAuth()
  const [couponCode, setCouponCode] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [discount, setDiscount] = useState(0)
  const navigate = useNavigate()
  
  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === 'anime10') {
      setCouponApplied(true)
      setDiscount(getTotalPrice() * 0.1)
    } else {
      setCouponApplied(false)
      setDiscount(0)
    }
  }
  
  const handleCheckout = () => {
    // In a real app, this would navigate to a checkout page or process
    alert('Checkout functionality would be implemented here')
    // Clear cart after successful checkout
    clearCart()
    navigate('/')
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <div className="bg-dark p-8 rounded-lg text-center max-w-md">
          <h2 className="text-2xl font-bold text-light mb-4">Login Required</h2>
          <p className="text-secondary mb-6">
            Please log in to view and manage your shopping cart.
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
        <h1 className="text-3xl md:text-4xl font-bold text-light mb-8">Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="bg-dark p-8 rounded-lg text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-xl text-light mb-2">Your cart is empty</h3>
            <p className="text-secondary mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/shop" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart items */}
            <div className="lg:w-2/3">
              <div className="bg-dark rounded-lg overflow-hidden shadow-lg">
                <div className="p-4 sm:p-6">
                  <div className="flow-root">
                    <ul className="divide-y divide-gray-700">
                      {cartItems.map((item) => (
                        <li key={item.id} className="py-6 flex">
                          <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-md border border-gray-700">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="ml-4 flex-1 flex flex-col">
                            <div className="flex justify-between text-light font-medium">
                              <h3>
                                <Link to={`/shop/product/${item.id}`} className="hover:text-primary">
                                  {item.name}
                                </Link>
                              </h3>
                              <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <p className="mt-1 text-sm text-secondary">{item.category}</p>
                            
                            <div className="flex-1 flex items-end justify-between text-sm">
                              <div className="flex items-center border border-gray-700 rounded-md">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="px-3 py-1 text-gray-400 hover:text-primary"
                                  aria-label="Decrease quantity"
                                >
                                  <FaMinus size={12} />
                                </button>
                                <span className="px-3 py-1 text-light">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="px-3 py-1 text-gray-400 hover:text-primary"
                                  aria-label="Increase quantity"
                                >
                                  <FaPlus size={12} />
                                </button>
                              </div>
                              
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-600 flex items-center"
                              >
                                <FaTrash size={14} className="mr-1" />
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 px-4 py-4 sm:px-6">
                  <div className="flex justify-between text-light">
                    <Link to="/shop" className="flex items-center text-primary hover:underline">
                      <FaArrowLeft size={14} className="mr-2" />
                      Continue Shopping
                    </Link>
                    <button
                      onClick={() => clearCart()}
                      className="text-red-500 hover:text-red-600"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order summary */}
            <div className="lg:w-1/3">
              <div className="bg-dark rounded-lg shadow-lg divide-y divide-gray-700">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-light mb-4">Order Summary</h2>
                  <div className="flow-root">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <p className="text-secondary">Subtotal</p>
                        <p className="text-light">${getTotalPrice().toFixed(2)}</p>
                      </div>
                      
                      {couponApplied && (
                        <div className="flex justify-between text-green-500">
                          <p>Discount (10%)</p>
                          <p>-${discount.toFixed(2)}</p>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <p className="text-secondary">Shipping</p>
                        <p className="text-light">Free</p>
                      </div>
                      
                      <div className="flex justify-between text-lg font-bold">
                        <p className="text-light">Total</p>
                        <p className="text-primary">${(getTotalPrice() - discount).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <label htmlFor="coupon" className="block text-light text-sm font-medium mb-2">Coupon Code</label>
                    <div className="flex">
                      <input
                        type="text"
                        id="coupon"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                        className="flex-grow py-2 px-3 bg-background border border-gray-700 rounded-l-md text-light focus:outline-none focus:border-primary"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="bg-primary text-white py-2 px-4 rounded-r-md hover:bg-blue-600 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponApplied && (
                      <p className="mt-1 text-sm text-green-500">Coupon applied successfully!</p>
                    )}
                    {couponCode && !couponApplied && (
                      <p className="mt-1 text-sm text-red-500">Invalid coupon code.</p>
                    )}
                  </div>
                  
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3 bg-primary text-white rounded-md hover:bg-blue-600 transition-colors mb-4 flex items-center justify-center"
                  >
                    <FaCreditCard className="mr-2" />
                    Checkout Now
                  </button>
                  
                  <button className="w-full py-3 bg-[#0070ba] text-white rounded-md hover:bg-[#005ea6] transition-colors flex items-center justify-center">
                    <FaPaypal className="mr-2" />
                    Pay with PayPal
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}