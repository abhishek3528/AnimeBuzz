import { useState, useEffect } from 'react'
import { FaFilter, FaTimes, FaSearch } from 'react-icons/fa'
import ProductCard from '../components/shop/ProductCard'
import { shopApiService } from '../services/api'

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: "Demon Slayer Tanjiro Kamado Figure",
    description: "High-quality PVC figure of Tanjiro Kamado from Demon Slayer.",
    price: 49.99,
    originalPrice: 59.99,
    discount: 16,
    image: "https://images.pexels.com/photos/5082584/pexels-photo-5082584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    category: "Figures",
    isNew: true,
    inStock: true
  },
  {
    id: 2,
    name: "Attack on Titan Levi T-Shirt",
    description: "Black t-shirt featuring Captain Levi from Attack on Titan.",
    price: 24.99,
    originalPrice: null,
    discount: 0,
    image: "https://images.pexels.com/photos/5600050/pexels-photo-5600050.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    category: "Clothing",
    isNew: false,
    inStock: true
  },
  {
    id: 3,
    name: "My Hero Academia Manga Box Set",
    description: "Complete manga box set of My Hero Academia volumes 1-10.",
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    image: "https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    category: "Manga",
    isNew: false,
    inStock: true
  },
  {
    id: 4,
    name: "One Piece Luffy Straw Hat",
    description: "Replica of Monkey D. Luffy's iconic straw hat from One Piece.",
    price: 29.99,
    originalPrice: null,
    discount: 0,
    image: "https://images.pexels.com/photos/5708072/pexels-photo-5708072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    category: "Accessories",
    isNew: true,
    inStock: true
  },
  {
    id: 5,
    name: "Naruto Shippuden Complete Series Blu-ray",
    description: "Complete Naruto Shippuden anime series on Blu-ray.",
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    image: "https://images.pexels.com/photos/5708069/pexels-photo-5708069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    category: "Blu-ray & DVD",
    isNew: false,
    inStock: true
  },
  {
    id: 6,
    name: "Jujutsu Kaisen Gojo Satoru Hoodie",
    description: "Comfortable hoodie featuring Gojo Satoru from Jujutsu Kaisen.",
    price: 44.99,
    originalPrice: 54.99,
    discount: 18,
    image: "https://images.pexels.com/photos/8480812/pexels-photo-8480812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    category: "Clothing",
    isNew: true,
    inStock: true
  },
  {
    id: 7,
    name: "Dragon Ball Z Goku Spirit Bomb Lamp",
    description: "LED lamp featuring Goku's Spirit Bomb from Dragon Ball Z.",
    price: 39.99,
    originalPrice: null,
    discount: 0,
    image: "https://images.pexels.com/photos/5011647/pexels-photo-5011647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    category: "Home & Decor",
    isNew: false,
    inStock: true
  },
  {
    id: 8,
    name: "Chainsaw Man Pochita Plush",
    description: "Soft plush toy of Pochita from Chainsaw Man.",
    price: 19.99,
    originalPrice: 24.99,
    discount: 20,
    image: "https://images.pexels.com/photos/5708057/pexels-photo-5708057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    category: "Plushies",
    isNew: true,
    inStock: true
  }
]

// Categories for filtering
const categories = ["All", "Figures", "Clothing", "Manga", "Accessories", "Blu-ray & DVD", "Home & Decor", "Plushies"]

// Sort options
const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" }
]

export default function Shop() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [filterMenuOpen, setFilterMenuOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 200])
  const [onlyInStock, setOnlyInStock] = useState(false)
  const [onlyNew, setOnlyNew] = useState(false)
  const [onlyDiscount, setOnlyDiscount] = useState(false)

  useEffect(() => {
    // In a real app, this would be a call to the API service
    // For demo purposes, we're using mock data
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      try {
        let filteredProducts = mockProducts
        
        // Filter by category
        if (selectedCategory !== "All") {
          filteredProducts = filteredProducts.filter(item => item.category === selectedCategory)
        }
        
        // Filter by search query
        if (searchQuery) {
          const query = searchQuery.toLowerCase()
          filteredProducts = filteredProducts.filter(item => 
            item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
          )
        }
        
        // Filter by price range
        filteredProducts = filteredProducts.filter(item => 
          item.price >= priceRange[0] && item.price <= priceRange[1]
        )
        
        // Filter by stock
        if (onlyInStock) {
          filteredProducts = filteredProducts.filter(item => item.inStock)
        }
        
        // Filter by new
        if (onlyNew) {
          filteredProducts = filteredProducts.filter(item => item.isNew)
        }
        
        // Filter by discount
        if (onlyDiscount) {
          filteredProducts = filteredProducts.filter(item => item.discount > 0)
        }
        
        // Sort
        switch (sortBy) {
          case "price-low":
            filteredProducts.sort((a, b) => a.price - b.price)
            break
          case "price-high":
            filteredProducts.sort((a, b) => b.price - a.price)
            break
          case "popular":
            // In a real app, this would sort by popularity/ratings
            // For now, we'll just use a random order
            filteredProducts.sort(() => Math.random() - 0.5)
            break
          case "newest":
          default:
            // In a real app, this would sort by date added
            // For demo, we'll just use the isNew flag
            filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
            break
        }
        
        setProducts(filteredProducts)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch products. Please try again later.')
        setLoading(false)
      }
    }, 1000)
    
    // In a real implementation, this would be the API call:
    // shopApiService.getAllProducts()
    //   .then(response => {
    //     setProducts(response.data.products)
    //     setLoading(false)
    //   })
    //   .catch(err => {
    //     setError('Failed to fetch products. Please try again later.')
    //     setLoading(false)
    //   })
  }, [selectedCategory, searchQuery, sortBy, priceRange, onlyInStock, onlyNew, onlyDiscount])

  const handleSearch = (e) => {
    e.preventDefault()
    // The search is already handled by the useEffect
  }

  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange]
    newRange[index] = Number(e.target.value)
    setPriceRange(newRange)
  }

  const resetFilters = () => {
    setSelectedCategory("All")
    setSearchQuery("")
    setSortBy("newest")
    setPriceRange([0, 200])
    setOnlyInStock(false)
    setOnlyNew(false)
    setOnlyDiscount(false)
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-light">Anime Shop</h1>
        <p className="text-secondary mb-8">Find the best anime merchandise for your collection</p>
        
        {/* Search and Filter Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="w-full lg:w-1/3">
            <form onSubmit={handleSearch} className="relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..." 
                className="w-full py-2 px-4 pr-10 rounded-md bg-dark text-light border border-gray-700 focus:outline-none focus:border-primary"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary">
                <FaSearch size={18} />
              </button>
            </form>
          </div>
          
          {/* Category filter for desktop */}
          <div className="hidden lg:flex space-x-2 overflow-x-auto pb-2 flex-1">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category 
                    ? 'bg-primary text-white' 
                    : 'bg-dark text-secondary hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Sort and Filter buttons */}
          <div className="flex space-x-2">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-dark text-light border border-gray-700 rounded-md py-2 px-4 pr-8 focus:outline-none focus:border-primary cursor-pointer"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
            
            <button 
              onClick={() => setFilterMenuOpen(!filterMenuOpen)}
              className="lg:hidden bg-dark text-light border border-gray-700 rounded-md py-2 px-4 flex items-center space-x-2 hover:border-primary"
            >
              <FaFilter />
              <span>Filter</span>
            </button>
          </div>
        </div>
        
        {/* Mobile filter menu */}
        {filterMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-background/95 z-50 overflow-y-auto animate-fade-in">
            <div className="container mx-auto px-4 py-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-light">Filters</h2>
                <button 
                  onClick={() => setFilterMenuOpen(false)}
                  className="text-light hover:text-primary"
                >
                  <FaTimes size={24} />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="text-light font-medium mb-3">Categories</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                          selectedCategory === category 
                            ? 'bg-primary text-white' 
                            : 'bg-dark text-secondary hover:text-white'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Price range */}
                <div>
                  <h3 className="text-light font-medium mb-3">Price Range</h3>
                  <div className="flex items-center space-x-4">
                    <input 
                      type="number" 
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(e, 0)}
                      min="0"
                      max={priceRange[1]}
                      className="w-24 py-2 px-3 rounded-md bg-dark text-light border border-gray-700 focus:outline-none focus:border-primary"
                    />
                    <span className="text-light">to</span>
                    <input 
                      type="number" 
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(e, 1)}
                      min={priceRange[0]}
                      className="w-24 py-2 px-3 rounded-md bg-dark text-light border border-gray-700 focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
                
                {/* Other filters */}
                <div>
                  <h3 className="text-light font-medium mb-3">Other Filters</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-light">
                      <input 
                        type="checkbox" 
                        checked={onlyInStock}
                        onChange={() => setOnlyInStock(!onlyInStock)}
                        className="form-checkbox h-5 w-5 text-primary rounded focus:ring-primary"
                      />
                      <span>In Stock Only</span>
                    </label>
                    <label className="flex items-center space-x-2 text-light">
                      <input 
                        type="checkbox" 
                        checked={onlyNew}
                        onChange={() => setOnlyNew(!onlyNew)}
                        className="form-checkbox h-5 w-5 text-primary rounded focus:ring-primary"
                      />
                      <span>New Arrivals Only</span>
                    </label>
                    <label className="flex items-center space-x-2 text-light">
                      <input 
                        type="checkbox" 
                        checked={onlyDiscount}
                        onChange={() => setOnlyDiscount(!onlyDiscount)}
                        className="form-checkbox h-5 w-5 text-primary rounded focus:ring-primary"
                      />
                      <span>On Sale Only</span>
                    </label>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex space-x-4 pt-4">
                  <button 
                    onClick={resetFilters}
                    className="flex-1 py-2 bg-dark border border-gray-700 text-light rounded-md hover:bg-gray-800"
                  >
                    Reset
                  </button>
                  <button 
                    onClick={() => setFilterMenuOpen(false)}
                    className="flex-1 py-2 bg-primary text-white rounded-md hover:bg-blue-600"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Desktop sidebar and product grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters - desktop only */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-dark rounded-lg p-6 sticky top-24">
              <h3 className="text-light font-medium mb-4">Filters</h3>
              
              {/* Price range */}
              <div className="mb-6">
                <h4 className="text-light text-sm mb-3">Price Range</h4>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-secondary text-sm">${priceRange[0]}</span>
                    <span className="text-secondary text-sm">${priceRange[1]}</span>
                  </div>
                  <input 
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(e, 0)}
                    className="slider"
                  />
                  <input 
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(e, 1)}
                    className="slider"
                  />
                </div>
              </div>
              
              {/* Other filters */}
              <div className="space-y-3 mb-6">
                <label className="flex items-center space-x-2 text-light text-sm">
                  <input 
                    type="checkbox" 
                    checked={onlyInStock}
                    onChange={() => setOnlyInStock(!onlyInStock)}
                    className="form-checkbox h-4 w-4 text-primary rounded focus:ring-primary"
                  />
                  <span>In Stock Only</span>
                </label>
                <label className="flex items-center space-x-2 text-light text-sm">
                  <input 
                    type="checkbox" 
                    checked={onlyNew}
                    onChange={() => setOnlyNew(!onlyNew)}
                    className="form-checkbox h-4 w-4 text-primary rounded focus:ring-primary"
                  />
                  <span>New Arrivals Only</span>
                </label>
                <label className="flex items-center space-x-2 text-light text-sm">
                  <input 
                    type="checkbox" 
                    checked={onlyDiscount}
                    onChange={() => setOnlyDiscount(!onlyDiscount)}
                    className="form-checkbox h-4 w-4 text-primary rounded focus:ring-primary"
                  />
                  <span>On Sale Only</span>
                </label>
              </div>
              
              {/* Reset button */}
              <button 
                onClick={resetFilters}
                className="w-full py-2 bg-gray-800 text-light rounded-md hover:bg-gray-700 text-sm"
              >
                Reset Filters
              </button>
            </div>
          </div>
          
          {/* Products grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="bg-error/20 text-error px-4 py-3 rounded-md text-center">
                {error}
              </div>
            ) : products.length === 0 ? (
              <div className="bg-dark p-8 rounded-lg text-center">
                <h3 className="text-xl text-light mb-2">No products found</h3>
                <p className="text-secondary mb-4">Try adjusting your filters or search criteria.</p>
                <button 
                  onClick={resetFilters}
                  className="btn btn-primary"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}