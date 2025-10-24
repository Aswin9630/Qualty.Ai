import React from "react";
import image8 from "../assets/Maharashtra.jpg"
import China from "../assets/QualtyLogo.png"
import image1 from "../assets/Services1.png"
import image2 from "../assets/Services2.png"
import image3 from "../assets/services3.jpeg"
import image4 from "../assets/services4.webp"
import image5 from "../assets/UP.jpg"
import image6 from "../assets/USA.jpg"
import image7 from "../assets/Vietnam.jpg"

const images = [
  image1,
  China,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8
];

export default function Carousel() {
  return (
    <div className="w-full h-[300px] flex items-center justify-center overflow-hidden relative">
      <div
        className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[100px] h-[150px] animate-slow-rotate"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="absolute inset-0 w-full h-full rounded-xl overflow-hidden border-2"
            style={{
              transform: `rotateY(${(360 / images.length) * index}deg) translateZ(250px)`,
              borderColor: `rgba(${getColor(index)}, 0.6)`,
              background: `radial-gradient(circle, rgba(${getColor(index)}, 0.2) 0%, rgba(${getColor(index)}, 0.6) 80%, rgba(${getColor(index)}, 0.9) 100%)`,
            }}
          >
            <img
              src={src}
              alt={`card-${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes slow-rotate {
            from {
              transform: perspective(1000px) rotateX(-15deg) rotateY(0deg);
            }
            to {
              transform: perspective(1000px) rotateX(-15deg) rotateY(360deg);
            }
          }
          .animate-slow-rotate {
            animation: slow-rotate 60s linear infinite;
          }
        `}
      </style>
    </div>
  );
}

function getColor(index) {
  const colors = [
    "142,249,252",
    "142,252,204",
    "142,252,157",
    "215,252,142",
    "252,252,142",
    "252,208,142",
    "252,142,142",
    "252,142,239",
    "204,142,252",
    "142,202,252",
  ];
  return colors[index % colors.length];
}
