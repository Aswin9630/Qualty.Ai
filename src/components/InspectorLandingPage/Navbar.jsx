import { Menu, X } from "lucide-react";
import { Button } from "./UI/Button";
import { useState } from "react";
// import logo from "../../assets/QualtyAILogo.png";
import {Link} from "react-router-dom"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = ["What You Get", "Why Qualty.Ai", "How It Works",];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            {/* <img src={logo} alt="Cargofirst Logo" className="h-10 w-12" /> */}
            <a href="/" className="text-xl font-bold font-sans">Qualty.Ai</a>
          </div>

          <div className="hidden md:flex flex-1 justify-center items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-gray-300 font-semibold hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/login"><Button variant="ghost" className=" cursor-pointer text-white hover:bg-white/10">
              Sign In
            </Button></Link>
           <Link to="/signup"> <Button className="bg-gradient-to-r from-purple-600 to-blue-600 cursor-pointer hover:from-purple-700 hover:to-blue-700 text-white border-0">
              Get Started
            </Button></Link>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 w-full"
                >
                  Sign In
                </Button>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
