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
                <>
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
                <div className="mt-4 opacity-0 animate-fade-slide delay-600">
      <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold shadow-md">
        100% Free Platform
      </span>
    </div>
                </>
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
