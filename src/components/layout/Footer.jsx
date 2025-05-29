import { Link } from 'react-router-dom'
import { FaTwitter, FaInstagram, FaYoutube, FaDiscord } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">AnimeBuzz</h3>
            <p className="text-secondary mb-4">Your ultimate destination for anime news, reviews, and merchandise.</p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors">
                <FaYoutube size={20} />
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors">
                <FaDiscord size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-light font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-secondary hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/news" className="text-secondary hover:text-primary transition-colors">News</Link></li>
              <li><Link to="/favorites" className="text-secondary hover:text-primary transition-colors">Favorites</Link></li>
              <li><Link to="/shop" className="text-secondary hover:text-primary transition-colors">Shop</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-light font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-secondary hover:text-primary transition-colors">Top Anime</a></li>
              <li><a href="#" className="text-secondary hover:text-primary transition-colors">Seasonal Anime</a></li>
              <li><a href="#" className="text-secondary hover:text-primary transition-colors">Genres</a></li>
              <li><a href="#" className="text-secondary hover:text-primary transition-colors">Studios</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-light font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-secondary hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-secondary hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-secondary hover:text-primary transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-secondary hover:text-primary transition-colors">DMCA</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary text-sm">&copy; {currentYear} AnimeBuzz. All rights reserved.</p>
            <p className="text-secondary text-sm mt-2 md:mt-0">
              Designed with <span className="text-red-500">❤</span> for anime fans
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}