import HeroSection from '../components/home/HeroSection'
import NewsCarousel from '../components/home/NewsCarousel'
import AnimeGrid from '../components/home/AnimeGrid'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Latest News Section */}
      <NewsCarousel title="Hot & Latest News" />
      
      {/* Popular Anime Section */}
      <AnimeGrid title="Popular Anime" />
      
      {/* Trending Anime Section */}
      <NewsCarousel title="Industry Updates" />
      
      {/* Coming Soon Section */}
      <AnimeGrid title="Coming Soon" />
    </div>
  )
}