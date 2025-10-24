import React, { useState, useEffect } from "react";
import { FilePlus, BadgeCheck, Eye, Globe2 } from "lucide-react";

const values = [
  {
    title: "Raise Inspection Query",
    description:
      "Create your inspection requirements with budget and timeline specifications on our platform.",
    icon: <FilePlus size={36} className="text-white" />,
  },
  {
    title: "Choose the Best Quote",
    description:
      "Compare multiple quotes from verified global inspectors and select the best fit for your needs.",
    icon: <BadgeCheck size={36} className="text-white" />,
  },
  {
    title: "Better Transparency",
    description:
      "Track inspection progress with live updates and comprehensive reporting for complete visibility.",
    icon: <Eye size={36} className="text-white" />,
  },
  {
    title: "Global Inspector Network",
    description:
      "Access our vast network of certified inspectors across 50+ countries for worldwide coverage.",
    icon: <Globe2 size={36} className="text-white" />,
  },
];

export default function ProgressCard() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleClick = (index) => {
    if (isMobile) {
      setActiveIndex(index === activeIndex ? null : index);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-8 py-12 px-6 bg-black">
      {values.map((item, index) => {
        const isActive = activeIndex === index;
        return (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`group relative w-[220px] sm:w-[260px] md:w-[280px] min-h-[180px] bg-gradient-to-b from-white/10 to-transparent border border-white/10 shadow-[0_25px_25px_rgba(0,0,0,0.25)] text-white overflow-hidden transition-all duration-700 ease-out transform cursor-pointer rounded-xl p-6
              ${isMobile && isActive ? "h-auto" : ""}
              hover:scale-[1.06] hover:shadow-[0_0_35px_rgba(255,255,255,0.25)] hover:border-white/30 hover:-translate-y-2 hover:rotate-[0.5deg]`}
          >
            <div className="flex justify-center mt-2 mb-3 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-1">
              {item.icon}
            </div>

            <h2 className="text-center text-lg font-semibold text-[rgb(218,244,237)] mb-2 transition-all duration-700 ease-out group-hover:text-white">
              {item.title}
            </h2>

            <p
              className={`text-center text-sm text-gray-300 px-4 leading-relaxed transition-all duration-700 ease-in-out break-words
                ${isMobile
                  ? isActive
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                  : "opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
              }`}
            >
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}



