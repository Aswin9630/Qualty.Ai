// import React, { useEffect, useState } from "react";
// import HomeWide from "../assets/heroFinal.mp4";
// import HomeTall from "../assets/9_16.gif";
// import HomeMob from "../assets/heroFinalMob.mp4";

// export default function HeroSection() {
//   const [isMdUp, setIsMdUp] = useState(() => {
//     if (typeof window === "undefined") return true;
//     return window.matchMedia("(min-width: 768px)").matches;
//   });

//   const [visible, setVisible] = useState({
//     second: false,
//     third: false,
//   });

//   useEffect(() => {
//     const mq = window.matchMedia("(min-width: 768px)");
//     const onChange = (e) => setIsMdUp(e.matches);
//     mq.addEventListener("change", onChange);
//     return () => mq.removeEventListener("change", onChange);
//   }, []);

//   useEffect(() => {
//     const timers = [
//       setTimeout(() => setVisible((p) => ({ ...p, second: true })), 1800),
//       setTimeout(() => setVisible((p) => ({ ...p, third: true })), 3400),
//     ];
//     return () => timers.forEach(clearTimeout);
//   }, []);

//   const videoSrc = isMdUp ? HomeWide : HomeMob;
//   const fallbackImage = HomeTall;

//   return (
//     <section
//       id="home"
//       className="relative flex items-center justify-start overflow-hidden bg-black text-white min-h-screen"
//     >
//       {videoSrc ? (
//         <video
//           autoPlay
//           muted
//           loop
//           playsInline
//           className="absolute inset-0 z-0 w-full h-full object-contain object-center bg-black brightness-[0.8]"
//         >
//           <source src={videoSrc} type="video/mp4" />
//         </video>
//       ) : (
//         <img
//           src={fallbackImage}
//           alt="Background"
//           className="absolute inset-0 z-0 w-full h-full object-contain bg-black"
//         />
//       )}

//       <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />

//       <div className="relative z-20 px-[3.75rem] sm:px-[5rem] md:px-[7rem] lg:px-[9rem] max-w-5xl">
//         <div className="flex flex-col items-start space-y-4 sm:space-y-6 overflow-hidden">
//           <div className="h-[4.5rem] sm:h-[5rem] md:h-[6rem]">
//             <h1 className="bg-gradient-to-r from-white via-gray-400 to-gray-200 text-2xl sm:text-3xl md:text-7xl font-extrabold  bg-clip-text text-transparent opacity-0 animate-fade-slide-slow"> 
//               Global Inspections
//             </h1>
//           </div>

//           <div className="h-[3rem] sm:h-[3.5rem] md:h-[4rem]">
//             {visible.second && (
//               <h2 className="text-lg sm:text-xl md:text-5xl font-semibold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent opacity-0 animate-fade-slide-slow delay-400">
//                 Simplified
//               </h2>
//             )}
//           </div>

//           <div className="h-[2.5rem] sm:h-[3rem] md:h-[3.5rem]">
//             {visible.third && (
//               <h3 className="text-md sm:text-2xl md:text-3xl font-normal bg-gradient-to-r from-gray-200 via-white to-gray-200 bg-clip-text text-transparent opacity-0 animate-fade-slide-slow delay-800">
//                 Where global trade<span className="font-bold italic"> meets quality</span>
//               </h3>
//             )}
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fadeSlideSlow {
//           0% {
//             opacity: 0;
//             transform: translateY(30px);
//             filter: blur(3px);
//           }
//           60% {
//             opacity: 0.6;
//             transform: translateY(10px);
//             filter: blur(1px);
//           }
//           100% {
//             opacity: 1;
//             transform: translateY(0);
//             filter: blur(0);
//           }
//         }
//         .animate-fade-slide-slow {
//           animation: fadeSlideSlow 2s ease-in-out forwards;
//         }
//         .delay-400 {
//           animation-delay: 0.4s;
//         }
//         .delay-800 {
//           animation-delay: 0.8s;
//         }
//       `}</style>
//     </section>
//   );
// }


import React, { useEffect, useState } from "react";
import HomeWide from "../assets/heroFinal.mp4";
import HomeTall from "../assets/9_16.gif";
import HomeMob from "../assets/heroFinalMob.mp4";

export default function HeroSection() {
  const [isMdUp, setIsMdUp] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(min-width: 768px)").matches;
  });

  const [visible, setVisible] = useState({
    second: false,
    third: false,
  });

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e) => setIsMdUp(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setVisible((p) => ({ ...p, second: true })), 1800),
      setTimeout(() => setVisible((p) => ({ ...p, third: true })), 3400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const videoSrc = isMdUp ? HomeWide : HomeMob;

  return (
    <section
      id="home"
      className="relative flex items-center justify-start overflow-hidden bg-black text-white min-h-screen"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 z-0 w-full h-full object-cover md:object-contain bg-black brightness-[0.8]"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />

      <div className="relative z-20 w-full px-6 sm:px-10 md:px-16 lg:px-24 max-w-6xl mx-auto">
        <div className="flex flex-col items-start space-y-4 sm:space-y-6 overflow-hidden py-20 sm:py-28 md:py-32">
          <h1 className="italic text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-500 to-gray-700 font-extrabold opacity-0 animate-fade-slide-slow"
              style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}>
            Global Inspections
          </h1>

          {visible.second && (
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white font-semibold opacity-0 animate-fade-slide-slow delay-400"
                style={{ fontSize: "clamp(1.25rem, 4vw, 3rem)" }}>
              Simplified
            </h2>
          )}

          {visible.third && (
            <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-white to-gray-200 font-normal opacity-0 animate-fade-slide-slow delay-800"
                style={{ fontSize: "clamp(1rem, 3vw, 2rem)" }}>
              Where global trade <span className="font-bold italic bg-gradient-to-r from-white via-gray-200 to-gray-400 text-black">meets quality</span>
            </h3>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeSlideSlow {
          0% {
            opacity: 0;
            transform: translateY(30px);
            filter: blur(3px);
          }
          60% {
            opacity: 0.6;
            transform: translateY(10px);
            filter: blur(1px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
        .animate-fade-slide-slow {
          animation: fadeSlideSlow 2s ease-in-out forwards;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-800 {
          animation-delay: 0.8s;
        }
      `}</style>
    </section>
  );
}
