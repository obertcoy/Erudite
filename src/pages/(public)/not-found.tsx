import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white relative overflow-hidden">
      {/* Starry background */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        opacity: '0.2'
      }}></div>

      {/* Animated astronaut */}
      <div className="w-64 h-64 mb-8 relative">
        <svg viewBox="0 0 100 100" className="w-full h-full animate-float">
          <circle cx="50" cy="50" r="30" fill="#e0e0e0" />
          <circle cx="50" cy="50" r="20" fill="#bdbdbd" />
          <rect x="45" y="45" width="10" height="15" fill="#9e9e9e" />
          <circle cx="50" cy="40" r="5" fill="#9e9e9e" />
          <line x1="50" y1="80" x2="50" y2="100" stroke="#e0e0e0" strokeWidth="2" />
          <line x1="40" y1="75" x2="30" y2="85" stroke="#e0e0e0" strokeWidth="2" />
          <line x1="60" y1="75" x2="70" y2="85" stroke="#e0e0e0" strokeWidth="2" />
        </svg>
      </div>

      <h1 className="text-4xl font-bold mb-4">404: Lost in Space</h1>
      <p className="text-xl mb-8 text-center max-w-md">
        Houston, we have a problem. The page you're looking for has floated off into the cosmic void.
      </p>
      <Button className="z-50">
        <Link to="/">
          Return to Earth (Home)
        </Link>
      </Button>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}