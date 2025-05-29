import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaStar, FaEye } from 'react-icons/fa'

// Mock anime data
const animeData = [
  {
    id: 1,
    title: "Demon Slayer",
    image: "https://images.pexels.com/photos/6342452/pexels-photo-6342452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    rating: 9.2,
    genre: "Action, Fantasy",
    year: 2019,
    episodes: 26
  },
  {
    id: 2,
    title: "Attack on Titan",
    image: "https://images.pexels.com/photos/4040585/pexels-photo-4040585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    rating: 9.0,
    genre: "Action, Drama",
    year: 2013,
    episodes: 75
  },
  {
    id: 3,
    title: "My Hero Academia",
    image: "https://images.pexels.com/photos/1099087/pexels-photo-1099087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    rating: 8.5,
    genre: "Action, Comedy",
    year: 2016,
    episodes: 113
  },
  {
    id: 4,
    title: "Jujutsu Kaisen",
    image: "https://images.pexels.com/photos/5082631/pexels-photo-5082631.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    rating: 8.7,
    genre: "Action, Supernatural",
    year: 2020,
    episodes: 24
  },
  {
    id: 5,
    title: "One Piece",
    image: "https://images.pexels.com/photos/2507025/pexels-photo-2507025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    rating: 8.9,
    genre: "Action, Adventure",
    year: 1999,
    episodes: 1000
  },
  {
    id: 6,
    title: "Naruto",
    image: "https://images.pexels.com/photos/3331094/pexels-photo-3331094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    rating: 8.3,
    genre: "Action, Adventure",
    year: 2002,
    episodes: 220
  },
  {
    id: 7,
    title: "Spy x Family",
    image: "https://images.pexels.com/photos/3010803/pexels-photo-3010803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    rating: 8.6,
    genre: "Action, Comedy",
    year: 2022,
    episodes: 25
  },
  {
    id: 8,
    title: "Death Note",
    image: "https://images.pexels.com/photos/2084199/pexels-photo-2084199.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    rating: 9.0,
    genre: "Mystery, Psychological",
    year: 2006,
    episodes: 37
  }
]

// Genres for filtering
const genres = ["All", "Action", "Adventure", "Comedy", "Drama", "Fantasy", "Mystery", "Psychological", "Supernatural"]

export default function AnimeGrid({ title = "Popular Anime" }) {
  const [selectedGenre, setSelectedGenre] = useState("All")
  
  const filteredAnime = selectedGenre === "All" 
    ? animeData 
    : animeData.filter(anime => anime.genre.includes(selectedGenre))

  return (
    <section className="py-12 bg-background/50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">{title}</h2>
        
        {/* Genre filter */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedGenre === genre 
                    ? 'bg-primary text-white' 
                    : 'bg-dark text-secondary hover:text-white'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
        
        {/* Anime grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {filteredAnime.map(anime => (
            <Link to={`/anime/${anime.id}`} key={anime.id} className="block">
              <div className="card group">
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img 
                    src={anime.image} 
                    alt={anime.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <FaStar className="text-yellow-400 mr-1" />
                          <span className="text-white text-sm">{anime.rating}</span>
                        </div>
                        <span className="text-white text-sm">{anime.year}</span>
                      </div>
                      <p className="text-secondary text-xs">
                        {anime.episodes} Episodes
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 m-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-block bg-primary/80 text-white text-xs font-medium px-2 py-1 rounded">
                      {anime.genre.split(',')[0]}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-primary/80 rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                      <FaEye className="text-white" size={20} />
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-light font-medium text-sm sm:text-base truncate">
                    {anime.title}
                  </h3>
                  <p className="text-secondary text-xs truncate">
                    {anime.genre}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* View more button */}
        <div className="mt-8 text-center">
          <button className="btn btn-primary">
            View More Anime
          </button>
        </div>
      </div>
    </section>
  )
}