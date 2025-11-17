// import React, { useEffect, useState } from "react";
// // import HomeWide from "../assets/heroFinal.mp4";
// import HomeWide from "../assets/last_hero.mp4";
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

//   return (
//     <section
//       id="home"
//       className="relative flex items-center justify-start overflow-hidden bg-black text-white min-h-screen mt-18 sm:mt-22"
//     >
//       <video
//         autoPlay
//         muted
//         loop
//         playsInline
//         className="absolute inset-0 z-0 w-full h-full object-cover md:object-contain bg-black brightness-[0.8]"
//       >
//         <source src={videoSrc} type="video/mp4" />
//       </video>

//       <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />

//       <div className="relative z-20 w-full px-6 sm:px-10 md:px-16 lg:px-24 max-w-6xl mx-auto">
//         <div className="flex flex-col items-start space-y-4 sm:space-y-6 overflow-hidden py-20 sm:py-28 md:py-32">
//           <h1 className="italic text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-500 to-gray-700 font-extrabold opacity-0 animate-fade-slide-slow"
//               style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}>
//             Global Inspections
//           </h1>

//           {visible.second && (
//             <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white font-semibold opacity-0 animate-fade-slide-slow delay-400"
//                 style={{ fontSize: "clamp(1.25rem, 4vw, 3rem)" }}>
//               Simplified
//             </h2>
//           )}

//           {visible.third && (
//             <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-white to-gray-200 font-normal opacity-0 animate-fade-slide-slow delay-800"
//                 style={{ fontSize: "clamp(1rem, 3vw, 2rem)" }}>
//               Where global trade <span className="font-bold italic ">meets quality</span>
//             </h3>
//           )}
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




// import React, { useEffect, useRef, useState } from "react";
// import HomeWide from "../assets/last_hero.mp4";
// import HomeMob from "../assets/heroFinalMob.mp4";

// export default function HeroSection() {
//   const [isMdUp, setIsMdUp] = useState(() => {
//     if (typeof window === "undefined") return true;
//     return window.matchMedia("(min-width: 768px)").matches;
//   });

//   const [visible, setVisible] = useState({ second: false, third: false });
//   const videoRef = useRef(null);

//   useEffect(() => {
//     const mq = window.matchMedia("(min-width: 768px)");
//     const onChange = (e) => setIsMdUp(e.matches);
//     mq.addEventListener("change", onChange);
//     return () => mq.removeEventListener("change", onChange);
//   }, []);

//   useEffect(() => {
//     const t1 = setTimeout(() => setVisible((p) => ({ ...p, second: true })), 900);
//     const t2 = setTimeout(() => setVisible((p) => ({ ...p, third: true })), 1600);
//     return () => {
//       clearTimeout(t1);
//       clearTimeout(t2);
//     };
//   }, []);

//   const videoSrc = isMdUp ? HomeWide : HomeMob;

//   // Ensure the <video> actually reloads when videoSrc changes (important on mobile)
//   useEffect(() => {
//     const v = videoRef.current;
//     if (!v) return;

//     // If the src is already the same, try a gentle reload; otherwise set new src then load/play.
//     // Setting src attribute and calling load() is reliable across browsers.
//     try {
//       // Pause, change source, load, then play
//       v.pause();
//       // update <source> child if present, else set src directly
//       const sourceEl = v.querySelector("source");
//       if (sourceEl) sourceEl.src = videoSrc;
//       else v.src = videoSrc;
//       v.load();
//       const playPromise = v.play();
//       if (playPromise && typeof playPromise.then === "function") {
//         playPromise.catch(() => {
//           // autoplay may be blocked; leave muted so it usually succeeds
//         });
//       }
//     } catch (err) {
//       // swallow errors (autoplay policies)
//       // fallback: set attribute and reload
//       v.src = videoSrc;
//       try { v.load(); } catch {}
//     }
//   }, [videoSrc]);

//   return (
//     <section id="home" className="relative w-full min-h-screen bg-black overflow-hidden">
//       <video
//         ref={videoRef}
//         autoPlay
//         muted
//         loop
//         playsInline
//         className="absolute inset-0 w-full h-full object-contain"
//         aria-hidden="true"
//       >
//         <source src={videoSrc} type="video/mp4" />
//       </video>

//       <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/55 via-black/30 to-transparent" />

//       <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 h-screen flex items-center">
//         <div className="w-full flex">
//           <div className="flex-1" />

//           <div className="w-full max-w-xl md:max-w-lg lg:max-w-2xl text-right">
//             <h1
//               className="font-extrabold italic text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500 opacity-0 animate-fade-slide"
//               style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", lineHeight: 1.02 }}
//             >
//               Global Inspections
//             </h1>

//             <div className="mt-3">
//               {visible.second && (
//                 <h2
//                   className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white opacity-0 animate-fade-slide delay-200"
//                   style={{ fontSize: "clamp(1.25rem, 3.2vw, 2.8rem)" }}
//                 >
//                   Simplified
//                 </h2>
//               )}
//             </div>

//             <div className="mt-3">
//               {visible.third && (
//                 <p
//                   className="text-gray-200 opacity-0 animate-fade-slide delay-400"
//                   style={{ fontSize: "clamp(0.95rem, 2.2vw, 1.4rem)" }}
//                 >
//                   Where global trade{" "}
//                   <span className="font-bold italic text-white">meets quality</span>
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="absolute left-0 right-0 bottom-0 h-24 bg-gradient-to-t from-black/75 to-transparent pointer-events-none" />

//       <style jsx>{`
//         @keyframes fadeSlide {
//           0% {
//             opacity: 0;
//             transform: translateY(18px);
//             filter: blur(2px);
//           }
//           60% {
//             opacity: 0.7;
//             transform: translateY(6px);
//             filter: blur(0.6px);
//           }
//           100% {
//             opacity: 1;
//             transform: translateY(0);
//             filter: blur(0);
//           }
//         }
//         .animate-fade-slide {
//           animation: fadeSlide 800ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
//         }
//         .delay-200 {
//           animation-delay: 200ms;
//         }
//         .delay-400 {
//           animation-delay: 400ms;
//         }

//         @media (max-width: 767px) {
//           .animate-fade-slide {
//             animation-duration: 650ms;
//           }
//           section#home .max-w-7xl > .flex > .flex-1 {
//             display: none;
//           }
//           section#home .max-w-7xl .text-right {
//             text-align: center;
//             max-width: 90%;
//             margin: 0 auto;
//           }
//         }
//       `}</style>
//     </section>
//   );
// }



import React, { useEffect, useRef, useState } from "react";
import HomeWide from "../assets/last_hero.mp4";
import HomeMob from "../assets/heroFinalMob.mp4";

export default function HeroSection() {
  const [isMdUp, setIsMdUp] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(min-width: 768px)").matches;
  });

  const [visible, setVisible] = useState({ second: false, third: false });
  const videoRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e) => setIsMdUp(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible((p) => ({ ...p, second: true })), 900);
    const t2 = setTimeout(() => setVisible((p) => ({ ...p, third: true })), 1600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const videoSrc = isMdUp ? HomeWide : HomeMob;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    try {
      v.pause();
      const sourceEl = v.querySelector("source");
      if (sourceEl) sourceEl.src = videoSrc;
      else v.src = videoSrc;
      v.load();
      const playPromise = v.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => {
        });
      }
    } catch {
      v.src = videoSrc;
      try { v.load(); } catch {}
    }
  }, [videoSrc]);

  return (
    <section id="home" className="relative w-full min-h-screen bg-black overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-contain"
        aria-hidden="true"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/55 via-black/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 h-screen flex items-center">
        <div className="w-full flex">
          <div className="flex-1 hidden md:block" />

          <div className="w-full max-w-xl md:max-w-lg lg:max-w-2xl text-left md:text-right">
            <h1
              className="font-extrabold italic bg-clip-text text-transparent opacity-0 animate-fade-slide"
              style={{
                fontSize: "clamp(2rem, 6vw, 4.5rem)",
                lineHeight: 1.02,
                backgroundImage: "linear-gradient(90deg, #ff7a18 0%, #af00ff 100%)",
              }}
            >
              Global Inspections
            </h1>

            <div className="mt-3">
              {visible.second && (
                <h2
                  className="font-semibold bg-clip-text text-white opacity-0 animate-fade-slide delay-200"
                  style={{
                    fontSize: "clamp(1.25rem, 3.2vw, 2.8rem)",
                    backgroundImage: "linear-gradient(90deg, #ff7a18 0%, #af00ff 100%)",
                  }}
                >
                  Simplified
                </h2>
              )}
            </div>

            <div className="mt-3">
              {visible.third && (
                <p
                  className="text-gray-200 opacity-0 animate-fade-slide delay-400"
                  style={{ fontSize: "clamp(0.95rem, 2.2vw, 1.4rem)" }}
                >
                  Where global trade{" "}
                  <span
                    className="font-bold italic"
                    style={{ backgroundImage: "linear-gradient(90deg, #ff7a18 0%, #af00ff 100%)", WebkitBackgroundClip: "text", color: "transparent" }}
                  >
                    meets quality
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-0 right-0 bottom-0 h-24 bg-gradient-to-t from-black/75 to-transparent pointer-events-none" />

      <style jsx>{`
        @keyframes fadeSlide {
          0% {
            opacity: 0;
            transform: translateY(18px);
            filter: blur(2px);
          }
          60% {
            opacity: 0.7;
            transform: translateY(6px);
            filter: blur(0.6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
        .animate-fade-slide {
          animation: fadeSlide 800ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .delay-200 {
          animation-delay: 200ms;
        }
        .delay-400 {
          animation-delay: 400ms;
        }

        /* small responsive tweak */
        @media (max-width: 767px) {
          .animate-fade-slide {
            animation-duration: 650ms;
          }
          /* ensure spacer hidden and text left on mobile */
          section#home .flex-1 {
            display: none;
          }
          section#home .text-left {
            text-align: left;
            max-width: 92%;
            margin: 0;
          }
        }
      `}</style>
    </section>
  );
}
