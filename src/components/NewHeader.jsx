// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Menu, X } from "lucide-react";
// import QualtyLogo from "../assets/QualtyLogo.png";
// import { useSelector } from "react-redux";

// const NewHeader = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const user = useSelector((state) => state?.user?.user);
//   const [showHeader, setShowHeader] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       if (currentScrollY > lastScrollY && currentScrollY > 100) {
//         setShowHeader(false);
//       } else {
//         setShowHeader(true);
//       }
//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);

//   const navLinks = [
//     { label: "Home", href: "/" },
//     { label: "Services", href: "/services" },
//   ];

//   return (
//     <header
//       className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
//         showHeader ? "translate-y-0" : "-translate-y-full"
//       }`}
//     >
//       <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 backdrop-blur-md border-b border-gray-700 shadow-[inset_0_0_0.5px_rgba(255,255,255,0.1)]">
//         <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
//           <div
//             className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
//             onClick={() => navigate("/")}
//           >
//             <img
//               src={QualtyLogo}
//               alt="Qualty.AI Logo"
//               className="h-16 w-16  shadow-md"
//             />
//             <span className="text-white font-normal text-lg hidden sm:inline-block">
//               Qualty.AI
//             </span>
//           </div>

//           <nav className="hidden md:flex gap-6 items-center">
//             {navLinks.map(({ label, href }) => (
//               <Link
//                 key={label}
//                 to={href}
//                 className="text-sm sm:text-base font-normal text-white hover:text-gray-300 transition-colors px-3 py-1"
//               >
//                 {label}
//               </Link>
//             ))}

//             {user ? (
//               <button
//                 onClick={() => navigate(`/${user.role}/dashboard`)}
//                 className="px-4 py-2 bg-white text-black  text-sm font-normal shadow hover:bg-gray-200 transition-transform hover:scale-105"
//               >
//                 Dashboard
//               </button>
//             ) : (
//               <button
//                 onClick={() => navigate("/login")}
//                 className="px-4 py-2 bg-white text-black  text-sm font-normal shadow hover:bg-gray-200 transition-transform hover:scale-105"
//               >
//                 Login
//               </button>
//             )}
//           </nav>

//           <button
//             className="md:hidden p-2 bg-gray-800 hover:bg-gray-700 transition"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         <div
//           className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
//             isMenuOpen ? "max-h-[500px] py-4 px-6 opacity-100" : "max-h-0 opacity-0"
//           }`}
//         >
//           <div className="flex flex-col gap-4 animate-fade-in">
//             {navLinks.map(({ label, href }) => (
//               <Link
//                 key={label}
//                 to={href}
//                 onClick={() => setIsMenuOpen(false)}
//                 className="text-base text-white hover:text-gray-300 transition-colors"
//               >
//                 {label}
//               </Link>
//             ))}

//             {user ? (
//               <button
//                 onClick={() => {
//                   navigate(`/${user.role}/dashboard`);
//                   setIsMenuOpen(false);
//                 }}
//                 className="px-4 py-2 bg-white text-black  text-sm font-normal shadow hover:bg-gray-200 transition-transform hover:scale-105"
//               >
//                 Dashboard
//               </button>
//             ) : (
//               <button
//                 onClick={() => {
//                   navigate("/login");
//                   setIsMenuOpen(false);
//                 }}
//                 className="px-4 py-2 bg-white text-black  text-sm font-normal shadow hover:bg-gray-200 transition-transform hover:scale-105"
//               >
//                 Login
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fade-in {
//           animation: fade-in 0.4s ease-out forwards;
//         }
//       `}</style>
//     </header>
//   );
// };

// export default NewHeader;


import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function NewHeader() {
  const navItems = ["Why us", "Services", "Qualty.AI", "How it works", "FAQs"];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-black py-4 shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">

          <ul className="hidden md:flex gap-6 items-center text-sm sm:text-base font-medium bg-white rounded-full px-6 py-3 border border-gray-200">
            {navItems.map((item) => (
              <li
                key={item}
                className={`transition-colors ${
                  item === "Qualty.AI"
                    ? "text-black font-bold text-2xl"
                    : "text-gray-800 hover:text-black"
                } cursor-pointer`}
              >
                {item}
              </li>
            ))}
          </ul>

          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <ul className="mt-4 flex flex-col gap-4 items-start bg-white rounded-xl px-6 py-4 border border-gray-200 md:hidden">
            {navItems.map((item) => (
              <li
                key={item}
                className={`transition-colors ${
                  item === "Qualty.AI"
                    ? "text-black font-bold text-lg"
                    : "text-gray-800 hover:text-black"
                } cursor-pointer`}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}

