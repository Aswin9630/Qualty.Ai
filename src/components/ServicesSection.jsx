import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import QuickInspection from "./QuickInspection";
import Destination1 from "../assets/Destination1.mp4";
import Sourcing from "../assets/Sourcing.mp4";
import { useRef } from "react";

export default function ServicesSection() {
  // const navigate = useNavigate();
  // const destinationRef = useRef(null);
  // const sourcingRef = useRef(null);

  // const handlePlay = (ref) => {
  //   if (ref.current) {
  //     ref.current.currentTime = 0;
  //     ref.current.play();
  //   }
  // };

  // const handleVideoEnd = (ref) => {
  //   if (ref.current) {
  //     ref.current.pause();
  //     ref.current.currentTime = 0;
  //   }
  // };

  return (
    <section className="bg-black text-white py-5 md:py-16 px-6 sm:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="p-8 shadow-[inset_0_0_0.5px_rgba(255,255,255,0.1)] backdrop-blur-md transition-all duration-300 space-y-16">
          
          {/* Section Heading */}
          <div className="text-center">
            <span className="inline-block bg-white text-black text-base sm:text-lg font-normal px-4 py-2 mb-14 shadow-md">
              Our Services
            </span>
            <h2 className="text-xl sm:text-2xl font-normal mb-4">
              Comprehensive Quality <span className="text-white">Inspection Services</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
              We offer a complete suite of inspection services to ensure your cargo
              meets the highest standards across global markets.
            </p>
          </div>

          {/* Quick Inspection Section */}
          <QuickInspection />

          {/* Videos */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            
            <div
              className="rounded-xl overflow-hidden shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              onMouseEnter={() => handlePlay(destinationRef)}
            >
              <video
                ref={destinationRef}
                src={Destination1}
                muted
                playsInline
                onEnded={() => handleVideoEnd(destinationRef)}
                className="w-full h-auto object-cover"
              />
            </div>

            <div
              className="rounded-xl overflow-hidden shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              onMouseEnter={() => handlePlay(sourcingRef)}
            >
              <video
                ref={sourcingRef}
                src={Sourcing}
                muted
                playsInline
                onEnded={() => handleVideoEnd(sourcingRef)}
                className="w-full h-auto object-cover"
              />
            </div>
          </div> */}

          {/* Optional button */}
          {/* <div className="text-center">
            <button
              onClick={() => navigate("/services")}
              className="cursor-pointer text-sm sm:text-base inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-white text-black font-normal shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.03]"
            >
              View All Services <ChevronRight size={18} />
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
}
