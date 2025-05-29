import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FaStar, FaPlayCircle, FaHeart, FaRegHeart, FaShare } from 'react-icons/fa'
import NewsCarousel from '../components/home/NewsCarousel'
import { useAuth } from '../contexts/AuthContext'

// Mock anime data
const animeDetails = {
  1: {
    id: 1,
    title: "Demon Slayer: Kimetsu no Yaiba",
    description: "Tanjiro Kamado sets out to become a demon slayer after his family is slaughtered and his sister is turned into a demon. In Tanjiro's quest to fight demons and turn his sister human again, he joins the Demon Slayer Corps, facing dangerous supernatural foes and uncovering the truth behind the demon who killed his family.",
    image: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg?auto=compress&cs=tinysrgb&w=1260&h=750",
    banner: "https://img.youtube.com/vi/6vMuWuWlW4I/hqdefault.jpg",
    rating: 9.2,
    year: 2019,
    genres: ["Action", "Fantasy", "Adventure", "Supernatural"],
    studio: "ufotable",
    episodes: 26,
    status: "Completed",
    season: "Spring 2019",
    duration: "24 min per ep",
    popularity: "#5",
    trailer: "https://www.youtube.com/watch?v=VQGCKyvzIM4",
    characters: [
      {
        name: "Tanjiro Kamado",
        role: "Main",
        image: "https://cdn.myanimelist.net/images/characters/6/386735.webp?s=7327e90f2310ececd18696cd4aa2ff4e"
      },
      {
        name: "Nezuko Kamado",
        role: "Main",
        image: "https://cdn.myanimelist.net/images/characters/2/378254.webp?s=c3cdc50f2d9f3b30e4453c8ca1f8460f"
      },
      {
        name: "Zenitsu Agatsuma",
        role: "Main",
        image: "https://cdn.myanimelist.net/images/characters/10/459689.webp?s=d5ccecc4a7b9e2118acb849a2062a84c&auto=compress&cs=tinysrgb&w=1260&h=750"
      }
    ],
    related: [2, 3, 4]
  },
  2: {
    id: 2,
    title: "Attack on Titan",
    description: "In a world where humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid creatures who devour humans seemingly without reason, a young boy named Eren Yeager dreams of exploring the outside world beyond the walls. On the day the city wall is breached and his mother is eaten by a Titan, Eren vows revenge and enlists in the Survey Corps, an elite group of soldiers who fight Titans outside the walls.",
    image: "https://images.pexels.com/photos/4040585/pexels-photo-4040585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    banner: "https://images.pexels.com/photos/5022849/pexels-photo-5022849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    rating: 9.0,
    year: 2013,
    genres: ["Action", "Drama", "Fantasy", "Mystery"],
    studio: "MAPPA",
    episodes: 75,
    status: "Completed",
    season: "Spring 2013",
    duration: "24 min per ep",
    popularity: "#2",
    trailer: "https://www.youtube.com/watch?v=MGRm4IzK1SQ",
    characters: [
      {
        name: "Eren Yeager",
        role: "Main",
        image: "https://images.pexels.com/photos/5971279/pexels-photo-5971279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
      },
      {
        name: "Mikasa Ackerman",
        role: "Main",
        image: "https://images.pexels.com/photos/5971327/pexels-photo-5971327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
      },
      {
        name: "Armin Arlert",
        role: "Main",
        image: "https://images.pexels.com/photos/5971330/pexels-photo-5971330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
      }
    ],
    related: [1, 3, 5]
  }
}

export default function AnimeDetail() {
  const { id } = useParams()
  const animeId = parseInt(id)
  const [anime, setAnime] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const { currentUser } = useAuth()

  useEffect(() => {
    // In a real app, this would be an API call
    // For demo purposes, we're using mock data
    setLoading(true)
    
    setTimeout(() => {
      if (animeDetails[animeId]) {
        setAnime(animeDetails[animeId])
        setLoading(false)
      } else {
        setError('Anime not found')
        setLoading(false)
      }
    }, 1000)
  }, [animeId])

  const toggleFavorite = () => {
    if (!currentUser) {
      // Redirect to login or show login prompt
      return
    }
    setIsFavorite(!isFavorite)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !anime) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <div className="bg-dark p-8 rounded-lg text-center max-w-md">
          <h2 className="text-2xl font-bold text-light mb-4">Anime Not Found</h2>
          <p className="text-secondary mb-6">
            {error || "The anime you're looking for doesn't exist or has been removed."}
          </p>
          <a href="/" className="btn btn-primary">
            Back to Home
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <div 
        className="relative h-[50vh] md:h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${anime.banner})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-8 md:pb-12">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
            <div className="w-32 md:w-48 mt-16 md:mt-0 shadow-lg rounded-lg overflow-hidden border-4 border-background">
              <img 
                src={anime.image} 
                alt={anime.title}
                className="w-full h-auto"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <span className="bg-primary text-white px-2 py-1 text-xs font-semibold rounded">
                  {anime.status}
                </span>
                <span className="text-primary font-semibold flex items-center">
                  <FaStar className="mr-1 text-yellow-400" />
                  {anime.rating}/10
                </span>
                <span className="text-secondary">{anime.year}</span>
              </div>
              
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
                {anime.title}
              </h1>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {anime.genres.map(genre => (
                  <span 
                    key={genre} 
                    className="text-xs bg-dark/80 text-light px-2 py-1 rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-3">
                <a 
                  href={anime.trailer} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary flex items-center gap-2"
                >
                  <FaPlayCircle />
                  <span>Watch Trailer</span>
                </a>
                
                <button 
                  onClick={toggleFavorite}
                  className={`btn flex items-center gap-2 ${
                    isFavorite 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-dark border border-gray-700 text-white hover:bg-gray-800'
                  }`}
                >
                  {isFavorite ? <FaHeart /> : <FaRegHeart />}
                  <span>{isFavorite ? 'Added to Favorites' : 'Add to Favorites'}</span>
                </button>
                
                <button className="btn bg-dark border border-gray-700 text-white hover:bg-gray-800 flex items-center gap-2">
                  <FaShare />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-700 mb-8">
          <div className="flex overflow-x-auto space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'overview' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-secondary hover:text-light'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('characters')}
              className={`py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'characters' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-secondary hover:text-light'
              }`}
            >
              Characters
            </button>
            <button
              onClick={() => setActiveTab('episodes')}
              className={`py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'episodes' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-secondary hover:text-light'
              }`}
            >
              Episodes
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'reviews' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-secondary hover:text-light'
              }`}
            >
              Reviews
            </button>
          </div>
        </div>
        
        {/* Tab content */}
        <div className="mb-12">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-xl font-bold text-light mb-4">Synopsis</h2>
                <p className="text-secondary mb-6 leading-relaxed">
                  {anime.description}
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-light font-medium mb-2">Type</h3>
                    <p className="text-secondary">TV</p>
                  </div>
                  <div>
                    <h3 className="text-light font-medium mb-2">Episodes</h3>
                    <p className="text-secondary">{anime.episodes}</p>
                  </div>
                  <div>
                    <h3 className="text-light font-medium mb-2">Duration</h3>
                    <p className="text-secondary">{anime.duration}</p>
                  </div>
                  <div>
                    <h3 className="text-light font-medium mb-2">Status</h3>
                    <p className="text-secondary">{anime.status}</p>
                  </div>
                  <div>
                    <h3 className="text-light font-medium mb-2">Studio</h3>
                    <p className="text-secondary">{anime.studio}</p>
                  </div>
                  <div>
                    <h3 className="text-light font-medium mb-2">Season</h3>
                    <p className="text-secondary">{anime.season}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-light mb-4">Characters</h2>
                <div className="space-y-4">
                  {anime.characters.slice(0, 3).map(character => (
                    <div key={character.name} className="flex bg-dark rounded-lg overflow-hidden">
                      <div className="w-16 h-16 flex-shrink-0">
                        <img 
                          src={character.image} 
                          alt={character.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2">
                        <h3 className="text-light font-medium text-sm">{character.name}</h3>
                        <p className="text-secondary text-xs">{character.role}</p>
                      </div>
                    </div>
                  ))}
                  
                  <button
                    onClick={() => setActiveTab('characters')}
                    className="text-primary hover:underline text-sm"
                  >
                    View all characters
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'characters' && (
            <div>
              <h2 className="text-xl font-bold text-light mb-6">Characters & Voice Actors</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...anime.characters, ...anime.characters, ...anime.characters].map((character, index) => (
                  <div key={`${character.name}-${index}`} className="bg-dark rounded-lg overflow-hidden shadow-lg">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={character.image} 
                        alt={character.name}
                        className="w-full h-full object-cover transition-transform hover:scale-110 duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-light font-medium">{character.name}</h3>
                      <p className="text-secondary text-sm">{character.role} Character</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'episodes' && (
            <div>
              <h2 className="text-xl font-bold text-light mb-6">Episode List</h2>
              <div className="space-y-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="bg-dark rounded-lg overflow-hidden shadow-lg">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-48 h-32 flex-shrink-0">
                        <img 
                          src={anime.image} 
                          alt={`Episode ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-light font-medium">Episode {i + 1}</h3>
                            <p className="text-primary text-sm">Title of Episode {i + 1}</p>
                          </div>
                          <span className="text-secondary text-sm">24 min</span>
                        </div>
                        <p className="text-secondary text-sm mt-2 line-clamp-2">
                          Episode description goes here. This is a brief summary of what happens in the episode.
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-xs text-gray-400">Aired: April {10 + i}, 2019</span>
                          <button className="flex items-center text-primary hover:underline text-sm">
                            <FaPlayCircle className="mr-1" />
                            <span>Watch</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="text-center mt-6">
                  <button className="btn btn-primary">
                    Load More Episodes
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-light">Reviews & Ratings</h2>
                <button className="btn btn-primary">Write a Review</button>
              </div>
              
              <div className="space-y-6">
                {Array.from({ length: 3 }, (_, i) => (
                  <div key={i} className="bg-dark rounded-lg p-6 shadow-lg">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          {String.fromCharCode(65 + i)}
                        </div>
                        <div className="ml-3">
                          <h3 className="text-light font-medium">User{i + 1}</h3>
                          <p className="text-xs text-gray-400">Posted on May {5 + i}, 2023</p>
                        </div>
                      </div>
                      <div className="flex items-center bg-primary/10 px-2 py-1 rounded">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span className="text-light font-medium">{9 - i * 0.5}/10</span>
                      </div>
                    </div>
                    <h4 className="text-light font-medium mb-2">
                      {i === 0 ? "Masterpiece of animation and storytelling" : 
                        i === 1 ? "Great anime with minor flaws" : 
                        "Good but could be better"}
                    </h4>
                    <p className="text-secondary text-sm">
                      {i === 0 ? 
                        "The animation quality is absolutely stunning, especially during fight scenes. The character development is excellent, and the story keeps you engaged throughout. Highly recommend watching this series!" : 
                        i === 1 ? 
                        "I really enjoyed this anime for its great art style and interesting characters. The pacing could be better in some episodes, but overall it's a great watch. The soundtrack is also incredible." : 
                        "While the animation is good and the premise is interesting, I found some characters to be underdeveloped. The middle episodes drag a bit, but the finale was satisfying. Worth watching but not a masterpiece."}
                    </p>
                    <div className="mt-4 flex items-center text-xs text-gray-400">
                      <button className="flex items-center mr-4 hover:text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        Helpful ({10 - i * 3})
                      </button>
                      <button className="hover:text-primary">
                        Report
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="text-center mt-6">
                  <button className="btn bg-dark border border-gray-700 text-white hover:bg-gray-800">
                    Load More Reviews
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Related anime */}
        <NewsCarousel title="Related Anime" />
      </div>
    </div>
  )
}