import { useState, useEffect } from 'react'
import { FaClock, FaUser, FaTag } from 'react-icons/fa'
import { newsApiService } from '../services/api'

// Mock news categories
const categories = [
  "All", "Announcements", "Episodes", "Manga", "Movies", "Music", "Staff", "Studios", "Events"
]

export default function News() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  // Mock news data (would be replaced with API call in production)
  const mockNews = [
    {
      id: 1,
      title: "Jujutsu Kaisen Season 3 Officially Announced",
      excerpt: "The popular anime based on Gege Akutami's manga will return for a third season covering the Culling Game arc.",
      content: "MAPPA has officially announced that Jujutsu Kaisen will return for a third season, which will cover the Culling Game arc from Gege Akutami's original manga. The announcement was made following the conclusion of Season 2, which adapted the Shibuya Incident arc. The new season is expected to premiere in 2024, though no specific date has been confirmed yet.",
      image: "https://images.pexels.com/photos/12934492/pexels-photo-12934492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      date: "November 12, 2023",
      author: "Anime News Network",
      category: "Announcements",
      tags: ["Jujutsu Kaisen", "Season 3", "MAPPA", "Anime"]
    },
    {
      id: 2,
      title: "One Piece Film: Red Breaks Box Office Records",
      excerpt: "The latest One Piece movie becomes the highest-grossing film in the franchise history.",
      content: "One Piece Film: Red has broken multiple box office records, becoming the highest-grossing film in the One Piece franchise. The film has earned over $160 million worldwide since its release, surpassing the previous record holder, One Piece: Stampede. The film's success has been attributed to its focus on the character Shanks and the introduction of his daughter, Uta, as well as the film's musical elements.",
      image: "https://images.pexels.com/photos/2148222/pexels-photo-2148222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      date: "November 10, 2023",
      author: "Crunchyroll News",
      category: "Movies",
      tags: ["One Piece", "Film Red", "Box Office", "Eiichiro Oda"]
    },
    {
      id: 3,
      title: "Chainsaw Man Part 2 Manga Reaches New Sales Milestone",
      excerpt: "Tatsuki Fujimoto's dark fantasy manga continues to dominate sales charts worldwide.",
      content: "Chainsaw Man Part 2 has reached a new sales milestone, with over 20 million copies in circulation worldwide. The series, created by Tatsuki Fujimoto, has seen a significant boost in popularity following the anime adaptation of Part 1 by MAPPA. The manga's second part, which follows new protagonist Yoru, has been praised for its fresh direction while maintaining the series' signature blend of horror, action, and dark humor.",
      image: "https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      date: "November 9, 2023",
      author: "Manga Plus",
      category: "Manga",
      tags: ["Chainsaw Man", "Tatsuki Fujimoto", "Manga", "Sales"]
    },
    {
      id: 4,
      title: "Studio Ghibli Announces New Film Project",
      excerpt: "The legendary animation studio reveals details about their upcoming feature film.",
      content: "Studio Ghibli has announced a new feature film project, set to be directed by Hayao Miyazaki's son, Goro Miyazaki. The film, currently titled 'How Do You Live?', will be an adaptation of the 1937 novel of the same name by Genzaburo Yoshino. While details about the plot and art direction remain scarce, Studio Ghibli has confirmed that production is already underway, with a tentative release date set for summer 2024.",
      image: "https://images.pexels.com/photos/7234213/pexels-photo-7234213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      date: "November 7, 2023",
      author: "Studio Ghibli Official",
      category: "Studios",
      tags: ["Studio Ghibli", "Goro Miyazaki", "How Do You Live", "New Film"]
    },
    {
      id: 5,
      title: "My Hero Academia Final Season Release Date Revealed",
      excerpt: "The climactic season of the superhero anime has officially been scheduled for release.",
      content: "The final season of My Hero Academia has been scheduled for release in April 2024. Studio Bones has confirmed that the season will adapt the remaining chapters of Kohei Horikoshi's manga, including the final war arc. The season will be split into two cours, with the first half airing from April to June 2024, and the second half scheduled for Fall 2024. A teaser trailer has been released, showing glimpses of the final confrontation between Deku and Shigaraki.",
      image: "https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      date: "November 5, 2023",
      author: "Weekly Shonen Jump",
      category: "Announcements",
      tags: ["My Hero Academia", "Final Season", "Studio Bones", "Kohei Horikoshi"]
    },
    {
      id: 6,
      title: "New Demon Slayer Game Announced for Next-Gen Consoles",
      excerpt: "A new action RPG based on the popular anime is in development for PlayStation 5 and Xbox Series X.",
      content: "CyberConnect2, the developer behind the Naruto Ultimate Ninja Storm series, has announced a new Demon Slayer game for PlayStation 5 and Xbox Series X. Titled 'Demon Slayer: Kimetsu no Yaiba - Hinokami Chronicles 2', the game will feature an expanded roster of playable characters and cover the Swordsmith Village and Hashira Training arcs. The game is scheduled for release in 2024 and will feature enhanced graphics and gameplay mechanics compared to its predecessor.",
      image: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      date: "November 3, 2023",
      author: "Aniplex Games",
      category: "Games",
      tags: ["Demon Slayer", "Video Game", "CyberConnect2", "PlayStation 5", "Xbox Series X"]
    },
    {
      id: 7,
      title: "Attack on Titan Creator Launches New Manga Series",
      excerpt: "Hajime Isayama returns with a new manga series after the conclusion of Attack on Titan.",
      content: "Hajime Isayama, the creator of the globally successful Attack on Titan, has announced a new manga series set to debut in early 2024. While details about the plot remain under wraps, Isayama has revealed that the new series will be a departure from Attack on Titan's dark fantasy setting, instead exploring science fiction themes. The series will be serialized in Bessatsu Shonen Magazine, the same publication that hosted Attack on Titan.",
      image: "https://images.pexels.com/photos/1493079/pexels-photo-1493079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      date: "November 1, 2023",
      author: "Kodansha Comics",
      category: "Manga",
      tags: ["Hajime Isayama", "New Manga", "Attack on Titan", "Kodansha"]
    }
  ];

  useEffect(() => {
    // In a real app, this would be a call to the API service
    // For demo purposes, we're using mock data
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      try {
        let filteredNews = mockNews
        if (selectedCategory !== "All") {
          filteredNews = mockNews.filter(item => item.category === selectedCategory)
        }
        
        setNews(filteredNews)
        setHasMore(false) // For mock data, there's no more to load
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch news. Please try again later.')
        setLoading(false)
      }
    }, 1000)
    
    // In a real implementation, this would be the API call:
    // newsApiService.getLatestNews(page, 10)
    //   .then(response => {
    //     setNews(prevNews => [...prevNews, ...response.data.data])
    //     setHasMore(response.data.pagination.has_next_page)
    //     setLoading(false)
    //   })
    //   .catch(err => {
    //     setError('Failed to fetch news. Please try again later.')
    //     setLoading(false)
    //   })
  }, [selectedCategory, page])

  const loadMore = () => {
    setPage(prevPage => prevPage + 1)
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-light">Latest Anime News</h1>
        
        {/* Categories filter */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
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
        </div>
        
        {/* News grid */}
        {loading && news.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="bg-error/20 text-error px-4 py-3 rounded-md text-center">
            {error}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map(item => (
                <div key={item.id} className="card h-full">
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-0 left-0 m-2">
                      <span className="inline-block bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h2 className="text-xl font-bold text-light mb-3">
                      {item.title}
                    </h2>
                    <p className="text-secondary mb-4">
                      {item.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center text-xs text-gray-400 gap-x-4 gap-y-2 mb-4">
                      <div className="flex items-center">
                        <FaClock className="mr-1" />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center">
                        <FaUser className="mr-1" />
                        <span>{item.author}</span>
                      </div>
                      <div className="flex items-center">
                        <FaTag className="mr-1" />
                        <span>{item.tags[0]}</span>
                      </div>
                    </div>
                    <button className="text-primary font-medium hover:underline">
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Load more button */}
            {hasMore && (
              <div className="mt-8 text-center">
                <button 
                  onClick={loadMore}
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Load More News'}
                </button>
              </div>
            )}
            
            {!hasMore && news.length > 0 && (
              <p className="text-center mt-8 text-secondary">
                You've reached the end of the news feed.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}