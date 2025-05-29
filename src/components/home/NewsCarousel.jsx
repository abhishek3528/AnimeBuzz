import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaClock, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

// Mock news data
const newsItems = [
  {
    id: 1,
    title: "Jujutsu Kaisen Season 3 Officially Announced",
    excerpt: "The popular anime based on Gege Akutami's manga will return for a third season covering the Culling Game arc.",
    image: "https://images.pexels.com/photos/12934492/pexels-photo-12934492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    date: "2 hours ago",
    category: "Announcements"
  },
  {
    id: 2,
    title: "One Piece Film: Red Breaks Box Office Records",
    excerpt: "The latest One Piece movie becomes the highest-grossing film in the franchise history.",
    image: "https://images.pexels.com/photos/2148222/pexels-photo-2148222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    date: "1 day ago",
    category: "Movies"
  },
  {
    id: 3,
    title: "Chainsaw Man Part 2 Manga Reaches New Sales Milestone",
    excerpt: "Tatsuki Fujimoto's dark fantasy manga continues to dominate sales charts worldwide.",
    image: "https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    date: "2 days ago",
    category: "Manga"
  },
  {
    id: 4,
    title: "Studio Ghibli Announces New Film Project",
    excerpt: "The legendary animation studio reveals details about their upcoming feature film.",
    image: "https://images.pexels.com/photos/7234213/pexels-photo-7234213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    date: "3 days ago",
    category: "Studio News"
  },
  {
    id: 5,
    title: "My Hero Academia Final Season Release Date Revealed",
    excerpt: "The climactic season of the superhero anime has officially been scheduled for release.",
    image: "https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    date: "4 days ago",
    category: "Announcements"
  },
  {
    id: 6,
    title: "New Demon Slayer Game Announced for Next-Gen Consoles",
    excerpt: "A new action RPG based on the popular anime is in development for PlayStation 5 and Xbox Series X.",
    image: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    date: "5 days ago",
    category: "Games"
  }
]

export default function NewsCarousel({ title = "Latest Anime News" }) {
  const carouselRef = useRef(null)

  const scroll = (direction) => {
    if (carouselRef.current) {
      const { current } = carouselRef
      const scrollAmount = direction === 'left' ? -current.offsetWidth * 0.75 : current.offsetWidth * 0.75
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="section-title">{title}</h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => scroll('left')}
              className="p-2 rounded-full bg-dark hover:bg-primary text-white transition-colors"
              aria-label="Scroll left"
            >
              <FaChevronLeft />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-2 rounded-full bg-dark hover:bg-primary text-white transition-colors"
              aria-label="Scroll right"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div 
          ref={carouselRef}
          className="carousel pb-4"
        >
          {newsItems.map((item) => (
            <div 
              key={item.id}
              className="inline-block w-full sm:w-[350px] md:w-[400px] mr-4 align-top"
            >
              <Link to={`/news/${item.id}`} className="block">
                <div className="card h-full">
                  <div className="relative h-48 overflow-hidden">
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
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-light mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-secondary mb-4 text-sm line-clamp-2">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center text-xs text-gray-400">
                      <FaClock className="mr-1" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}