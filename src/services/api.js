import axios from 'axios'

// Base URLs for different APIs
const JIKAN_API_URL = 'https://api.jikan.moe/v4'
const NEWS_API_URL = 'https://api.jikan.moe/v4/anime/news'
const MOCK_SHOP_API_URL = 'https://dummyjson.com/products'

// Create axios instances for different APIs
const jikanApi = axios.create({
  baseURL: JIKAN_API_URL,
  timeout: 10000,
})

const newsApi = axios.create({
  baseURL: NEWS_API_URL,
  timeout: 10000,
})

const shopApi = axios.create({
  baseURL: MOCK_SHOP_API_URL,
  timeout: 10000,
})

// Add response interceptor for error handling
const handleApiError = (error) => {
  console.error('API Error:', error)
  
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('Response data:', error.response.data)
    console.error('Response status:', error.response.status)
  } else if (error.request) {
    // The request was made but no response was received
    console.error('No response received:', error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Request error:', error.message)
  }
  
  return Promise.reject(error)
}

jikanApi.interceptors.response.use(response => response, handleApiError)
newsApi.interceptors.response.use(response => response, handleApiError)
shopApi.interceptors.response.use(response => response, handleApiError)

// Anime API calls
export const animeApi = {
  // Get top anime
  getTopAnime: (page = 1, limit = 10) => 
    jikanApi.get(`/top/anime?page=${page}&limit=${limit}`),
  
  // Search anime
  searchAnime: (query, page = 1, limit = 10) => 
    jikanApi.get(`/anime?q=${query}&page=${page}&limit=${limit}`),
  
  // Get anime by ID
  getAnimeById: (id) => 
    jikanApi.get(`/anime/${id}`),
  
  // Get anime recommendations
  getAnimeRecommendations: (id) => 
    jikanApi.get(`/anime/${id}/recommendations`),
  
  // Get seasonal anime
  getSeasonalAnime: (year, season, page = 1, limit = 10) => 
    jikanApi.get(`/seasons/${year}/${season}?page=${page}&limit=${limit}`),
}

// News API calls
export const newsApiService = {
  // Get latest anime news
  getLatestNews: (page = 1, limit = 10) => 
    newsApi.get(`?page=${page}&limit=${limit}`),
  
  // Get news by anime ID
  getNewsByAnimeId: (animeId, page = 1, limit = 10) => 
    jikanApi.get(`/anime/${animeId}/news?page=${page}&limit=${limit}`),
}

// Shop API calls (using mock data from dummyjson)
export const shopApiService = {
  // Get all products
  getAllProducts: (limit = 10, skip = 0) => 
    shopApi.get(`?limit=${limit}&skip=${skip}`),
  
  // Search products
  searchProducts: (query) => 
    shopApi.get(`/search?q=${query}`),
  
  // Get product by ID
  getProductById: (id) => 
    shopApi.get(`/${id}`),
  
  // Get products by category
  getProductsByCategory: (category) => 
    shopApi.get(`/category/${category}`),
}

export default {
  anime: animeApi,
  news: newsApiService,
  shop: shopApiService,
}