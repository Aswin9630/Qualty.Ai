import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {Link } from "react-router-dom"


const navLinks = [
  { label: "What You Get", link: "#what-you-get" },
  { label: "Why Qualty AI", link: "#why-qualtyAi" },
  { label: "How It Works", link: "#how-it-works" },
  { label: "Quick Service", link: "#quick-service" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 w-full z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0)",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 30px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/inspection-company/landingpage">
        <div
            className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
          >
            <span className="text-xl font-bold font-sans">Qualty.AI</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.link}
              className="text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors tracking-wide"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
          <a
            className="text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors px-4 py-2"
          >
            Sign In
          </a>
          </Link>
          <Link to="/signup/company">
          <button className="bg-gray-900 cursor-pointer text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-gray-900/20">
            Get Started
          </button>
          </Link>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="w-5 flex flex-col gap-1">
            <span
              className={`block h-0.5 bg-gray-900 transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
            />
            <span
              className={`block h-0.5 bg-gray-900 transition-all ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 bg-gray-900 transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            />
          </div>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 px-6 py-4 space-y-4">
          {["What You Get", "Why Qualty AI", "How It Works", "Sign In"].map((l) => (
            <a key={l} href="#" className="block text-gray-600 font-medium py-1">
              {l}
            </a>
          ))}
          <button className="w-full bg-gray-900 text-white font-bold py-3 rounded-full mt-2">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
}
