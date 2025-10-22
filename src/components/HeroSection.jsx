import { ArrowRight, Play } from "lucide-react";
import HomeVideo from "../assets/HomeVideo.mp4";
import HomScene from "../assets/HomScene.mp4";
import { useNavigate } from "react-router";
import {Link} from "react-router-dom"

const stats = [
  { number: "1000+", label: "Global Inspectors" },
  { number: "98%", label: "Client Satisfaction" },
  { number: "50+", label: "Countries Covered" },
  { number: "24/7", label: "Platform Support" },
];

export default function HeroSection() {
  const navigate = useNavigate()
  return (
   <section className="bg-black text-white relative overflow-hidden min-h-[500px] sm:min-h-[600px] md:min-h-screen" id="home">
    <div className="absolute inset-0 z-0 overflow-hidden opacity-40 h-full">
  <video
    className="w-full h-full object-fill sm:object-cover"
    src={HomeVideo}
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
  />
</div>
      <div className="relative font-sans z-10 max-w-7xl mx-auto px-6 py-12 md:py-35 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="max-w-xl py-45">
          <h1 className="text-sm sm:text-lg font-bold font-sans sm:mb-6 leading-tight">
            Global <span className="text-white">Quality Inspections</span> for Global Trade
          </h1>
          <p className="text-white sm:mb-2 text-balance font-light font-sans py-2">
            Qualty.ai is a marketplace for global quality inspections bringing together global traders and inspectors worldwide.
          </p>

          <div className="flex gap-4 flex-wrap items-center">
            <button onClick={()=>navigate("/login")} className="px-3 py-2 sm:px-5 sm:py-3 text-sm sm:text-md bg-white text-black font-semibold cursor-pointer  hover:bg-gray-200 transition shadow hover:shadow-lg flex items-center gap-2">
              Get Started Today <ArrowRight size={20} />
            </button>
            <Link to="https://youtu.be/utBbNCSVjhw?si=iXRIsK1Drf-aDwG1">
            <button  className="px-3 py-2 sm:px-5 sm:py-3 text-sm sm:text-md border cursor-pointer border-white text-white  hover:bg-white hover:text-black hover:font-semibold transition flex items-center gap-2">
              <Play size={20} />
              Watch Demo
            </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className=" border border-white  p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="text-3xl font-bold text-white">{stat.number}</div>
            <div className="text-gray-300 text-sm mt-2">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
