import React from "react";
import { FilePlus, BadgeCheck, Eye, Globe2 } from "lucide-react";

const values = [
  {
    title: "Raise Inspection Query",
    description:
      "Create your inspection requirements with budget and timeline specifications on our platform.",
    icon: <FilePlus size={28} className="text-white" />,
  },
  {
    title: "Choose the Best Quote",
    description:
      "Compare multiple quotes from verified global inspectors and select the best fit for your needs.",
    icon: <BadgeCheck size={28} className="text-white" />,
  },
  {
    title: "Better Transparency",
    description:
      "Track inspection progress with live updates and comprehensive reporting for complete visibility.",
    icon: <Eye size={28} className="text-white" />,
  },
  {
    title: "Global Inspector Network",
    description:
      "Access our vast network of certified inspectors across 50+ countries for worldwide coverage.",
    icon: <Globe2 size={28} className="text-white" />,
  },
];

const Carousal = () => {
  return (
    <div className="w-full h-[400px] flex items-center justify-center relative overflow-hidden bg-black">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[200px] animate-rotate3d"
        style={{
          transformStyle: "preserve-3d",
          perspective: "800px",
        }}
      >
        {values.map((item, index) => (
          <div
            key={index}
            className="absolute inset-0 rounded-xl border border-gray-700 overflow-hidden bg-gradient-to-b from-neutral-900 via-black to-neutral-800 flex flex-col items-center justify-center text-center p-3 shadow-md"
            style={{
              transform: `rotateY(${(360 / values.length) * index}deg) translateZ(180px)`,
            }}
          >
            <div className="mb-2">{item.icon}</div>
            <h3 className="text-base font-semibold text-white mb-1">
              {item.title}
            </h3>
            <p className="text-gray-300 text-xs leading-snug">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* CSS for 3D rotation */}
      <style>{`
        @keyframes rotate3d {
          from {
            transform: rotateX(-10deg) rotateY(360deg);
          }
          to {
            transform: rotateX(-10deg) rotateY(0deg);
          }
        }
        .animate-rotate3d {
          animation: rotate3d 18s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Carousal;
