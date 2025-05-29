import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaPlay, FaInfoCircle } from 'react-icons/fa'

// Mock featured anime data
const featuredAnime = [
  {
    id: 1,
    title: "Demon Slayer: Kimetsu no Yaiba",
    description: "Tanjiro Kamado sets out to become a demon slayer after his family is slaughtered and his sister is turned into a demon.",
    image: "https://images.pexels.com/photos/6862365/pexels-photo-6862365.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    rating: 9.2,
    year: 2019,
    genre: "Action, Fantasy"
  },
  {
    id: 2,
    title: "Attack on Titan",
    description: "In a world where humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid creatures who devour humans seemingly without reason.",
    image: "https://images.pexels.com/photos/5022849/pexels-photo-5022849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    rating: 9.0,
    year: 2013,
    genre: "Action, Drama"
  },
  {
    id: 3,
    title: "My Hero Academia",
    description: "A superhero-loving boy without any powers is determined to enroll in a prestigious hero academy and learn what it really means to be a hero.",
    image: "https://images.pexels.com/photos/10772228/pexels-photo-10772228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    rating: 8.5,
    year: 2016,
    genre: "Action, Comedy"
  }
]

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  const currentAnime = featuredAnime[currentIndex]

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 8000)
    
    return () => clearInterval(interval)
  }, [currentIndex])

  const nextSlide = () => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredAnime.length)
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + featuredAnime.length) % featuredAnime.length)
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  return (
    <section className="relative h-screen max-h-[800px] overflow-hidden">
      {/* Slider */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`} 
        style={{ 
          backgroundImage: `url(${currentAnime.image})`,
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      
      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-end pb-24 md:pb-32 z-10">
        <div className="max-w-3xl animate-slide-up">
          <div className="flex items-center mb-3 space-x-3">
            <span className="bg-primary text-white px-2 py-1 text-xs font-semibold rounded">Featured</span>
            <span className="text-primary font-semibold">{currentAnime.rating}/10 ★</span>
            <span className="text-secondary">{currentAnime.year}</span>
            <span className="text-secondary">{currentAnime.genre}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {currentAnime.title}
          </h1>
          
          <p className="text-gray-300 text-lg mb-8 max-w-2xl">
            {currentAnime.description}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a href="#" className="btn btn-primary flex items-center gap-2">
              <FaPlay />
              <span>Watch Trailer</span>
            </a>
            <Link to={`/anime/${currentAnime.id}`} className="btn bg-dark border border-gray-700 text-white hover:bg-gray-800 flex items-center gap-2">
              <FaInfoCircle />
              <span>More Info</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Navigation arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-primary text-white p-3 rounded-full opacity-70 hover:opacity-100 transition-opacity z-20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-primary text-white p-3 rounded-full opacity-70 hover:opacity-100 transition-opacity z-20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
      
      {/* Indicator dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {featuredAnime.map((_, index) => (
          <button 
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === index ? 'bg-primary w-6' : 'bg-gray-500 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </section>
  )
}