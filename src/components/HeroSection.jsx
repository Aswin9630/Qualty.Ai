import React, { useEffect, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import HomeWide from "../assets/16_91.gif"; 
import HomeTall from "../assets/9_16.gif"; 
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const stats = [
  { number: "1000+", label: "Global Inspectors" },
  { number: "98%", label: "Client Satisfaction" },
  { number: "50+", label: "Countries Covered" },
  { number: "24/7", label: "Platform Support" },
];

export default function HeroSection() {
  const navigate = useNavigate();

  const [isMdUp, setIsMdUp] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(min-width: 768px)").matches;
  });
 
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e) => setIsMdUp(e.matches);
    if (typeof mq.addEventListener === "function") mq.addEventListener("change", onChange);
    else mq.addListener(onChange);
    return () => {
      if (typeof mq.removeEventListener === "function") mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  const bgUrl = isMdUp ? HomeWide : HomeTall;

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-black text-white"
      style={{
        minHeight: isMdUp ? "100vh" : "540px",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 opacity-70"
        style={{
          backgroundImage: `url(${bgUrl})`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100%",
          height: "100%",
        }}
      />

      <div className="absolute inset-0 z-10 bg-black/20" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 my-54 md:py-24 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="max-w-xl">
          <h1 className="text-base sm:text-xl md:text-2xl font-bold leading-tight">
            Global <span className="text-white">Quality Inspections</span> for Global Trade
          </h1>

          <p className="text-white mt-3 text-sm sm:text-base md:text-lg font-light">
            Quality.ai is a marketplace for global quality inspections bringing together global traders and inspectors worldwide.
          </p>

          <div className="flex gap-4 flex-wrap items-center mt-6">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base cursor-pointer bg-white text-black font-semibold hover:bg-gray-200 transition-shadow shadow flex items-center gap-2"
            >
              Get Started Today <ArrowRight size={18} />
            </button>

            <Link to="https://youtu.be/utBbNCSVjhw?si=iXRIsK1Drf-aDwG1" target="_blank" rel="noreferrer">
              <button className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base cursor-pointer border border-white text-white hover:bg-white hover:text-black transition flex items-center gap-2">
                <Play size={18} />
                Watch Demo
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
