import React, { useEffect, useState } from "react";
import { Menu, X, User, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setRedirectAfterLogin } from "../redux/slice/userSlice";
import useFetchUser from "../hooks/useFetchUser";
import QualtyLogo from "../assets/QualtyLogo.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useFetchUser();

  const user = useSelector((state) => state?.user?.user);
  // const cartItems = useSelector((state) => state.cart.items);

  const navItems = [
    { label: "Why us", targetId: "why-us" },
    { label: "Services", targetId: "services" },
    { label: "Qualty.AI", targetId: "hero" },
    { label: "How it works", targetId: "how-it-works" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-black text-white transition-all duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 bg-black">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
            onClick={() => navigate("/")}
          >
            <img
              src={QualtyLogo}
              alt="Qualty.AI Logo"
              className="h-10 w-10 sm:h-12 sm:w-12"
            />
          </div>

          <ul className="hidden md:flex gap-6 items-center text-sm sm:text-xl font-medium bg-white rounded-full px-6 py-3 border border-gray-100">
            {navItems.map(({ label, targetId }) => (
              <li
                key={label}
                onClick={() => {
                  const section = document.getElementById(targetId);
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                    setIsOpen(false);
                  }
                }}
                className={`transition-colors ${
                  label === "Qualty.AI"
                    ? "text-black font-bold text-2xl"
                    : "text-gray-800 hover:text-black"
                } cursor-pointer`}
              >
                {label}
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            {cartItems.length > 0 && (
              <button
                onClick={() => navigate("/cart")}
                className="relative flex items-center bg-black text-white font-medium px-3 cursor-pointer py-2 rounded-full border border-gray-200 hover:bg-gray-100 transition"
              >
                <ShoppingCart size={18} />
                <span className="hidden sm:inline"></span>
                <span className="absolute -top-2 -right-2 bg-red-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              </button>
            )}

            {user ? (
              <button
                onClick={() => navigate(`/${user.role}/dashboard`)}
                className="flex items-center cursor-pointer gap-2 bg-white text-black font-medium px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-100 transition"
              >
                <User size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  dispatch(setRedirectAfterLogin("dashboard"));
                  navigate("/login");
                }}
                className="flex items-center cursor-pointer gap-2 bg-white text-black font-medium px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-100 transition"
              >
                <User size={18} />
                <span className="hidden sm:inline">Login</span>
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <ul className="mt-4 flex flex-col gap-4 items-start bg-white rounded-xl px-6 py-4 border border-gray-200 md:hidden">
            {navItems.map(({ label, targetId }) => (
              <li
                key={label}
                onClick={() => {
                  const section = document.getElementById(targetId);
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                    setIsOpen(false);
                  }
                }}
                className={`transition-colors ${
                  label === "Qualty.AI"
                    ? "text-black font-bold text-2xl"
                    : "text-gray-800 hover:text-black"
                } cursor-pointer`}
              >
                {label}
              </li>
            ))}

            {/* {cartItems.length > 0 && (
              <button
                onClick={() => {
                  navigate("/cart");
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 bg-white text-black font-medium px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-100 transition"
              >
                <ShoppingCart size={18} />
                 ({cartItems.length})
              </button>
            )} */}

            {user ? (
              <button
                onClick={() => {
                  navigate(`/${user.role}/dashboard`);
                  setIsOpen(false);
                }}
                className="flex items-center cursor-pointer gap-2 bg-white text-black font-medium px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-100 transition"
              >
                <User size={18} />
                Dashboard
              </button>
            ) : (
              <button
                onClick={() => {
                  dispatch(setRedirectAfterLogin("dashboard"));
                  navigate("/login");
                  setIsOpen(false);
                }}
                className="flex items-center cursor-pointer gap-2 bg-white text-black font-medium px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-100 transition"
              >
                <User size={18} />
                Login
              </button>
            )}
          </ul>
        )}
      </nav>
    </header>
  );
}
