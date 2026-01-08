import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold font-sans">Qualty.Ai</a>
          </div>

          <nav className="hidden lg:flex items-center gap-10">
            <a href="#what-is" className="text-sm text-black/60 hover:text-black transition-colors">
              About
            </a>
            <a href="#who-we-serve" className="text-sm text-black/60 hover:text-black transition-colors">
              Solutions
            </a>
            <a href="#why-us" className="text-sm text-black/60 hover:text-black transition-colors">
              Why Qualty
            </a>
            <a href="#trusted-by" className="text-sm text-black/60 hover:text-black transition-colors">
              Trusted By
            </a>
            <a href="#journey" className="text-sm text-black/60 hover:text-black transition-colors">
              Our Journey
            </a>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Link to="/login"><button className="cursor-pointer text-sm text-black/60 hover:text-black transition-colors">
              Sign In
            </button></Link>
            <a href="#finalCTA"><button className="bg-black cursor-pointer text-white px-6 py-2.5 rounded-lg text-sm hover:bg-black/90 transition-all">
              Get Started Free
            </button></a>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-black/5">
          <nav className="px-6 py-6 space-y-1">
            <a
              href="#what-is"
              className="cursor-pointer block py-3 text-sm text-black/60 hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Platform
            </a>
            <a
              href="#who-we-serve"
              className="cursor-pointer block py-3 text-sm text-black/60 hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Solutions
            </a>
            <a
              href="#why-us"
              className="cursor-pointer block py-3 text-sm text-black/60 hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Why Qualty
            </a>
            <a
              href="#global-reach"
              className="cursor-pointer block py-3 text-sm text-black/60 hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Global Reach
            </a>
            <a
              href="#trusted-by"
              className="cursor-pointer block py-3 text-sm text-black/60 hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Trust
            </a>
            <div className="pt-4 space-y-3">
            <Link
                to="/login"
                className="cursor-pointer w-full text-sm text-black/60 hover:text-black transition-colors py-3 block"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <a href="#finalCTA"><button className="cursor-pointer w-full bg-black text-white px-6 py-3 rounded-lg text-sm hover:bg-black/90 transition-all">
                Get Started Free
              </button></a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
