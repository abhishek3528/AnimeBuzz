import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-light mt-4 mb-6">Page Not Found</h2>
        <p className="text-secondary max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        
        <Link to="/" className="btn btn-primary inline-block">
          Return to Home
        </Link>
      </div>
    </div>
  )
}