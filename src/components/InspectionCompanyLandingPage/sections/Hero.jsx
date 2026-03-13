// import { useState, useEffect, Suspense } from "react";
// import { useInView } from "../Hooks/useInView";
// import { IconMapPin, IconUsers, IconStar } from "../components/Icons";
// import Globe3D from "../components/Globe3D";

// function StatCard({ icon: Icon, value, label, delay }) {
//   const [ref, visible] = useInView(0.2);
//   return ( 
//     <div
//       ref={ref}
//       className="flex items-center gap-3 bg-white rounded-2xl px-5 py-4 shadow-lg shadow-gray-900/8 border border-gray-100"
//       style={{
//         transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
//         opacity: visible ? 1 : 0,
//         transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.96)",
//       }}
//     >
//       <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-700 border border-gray-100">
//         <Icon className="w-5 h-5" />
//       </div>
//       <div>
//         <div className="text-xl font-black text-gray-900 leading-none">{value}</div>
//         <div className="text-xs text-gray-400 mt-0.5 font-medium">{label}</div>
//       </div>
//     </div>
//   );
// }

// export default function Hero() {
//   const [ref, visible] = useInView(0.05);

//   return (
//     <section
//       ref={ref}
//       className="relative min-h-screen flex items-center overflow-hidden pt-16"
//       style={{
//         background:
//           "linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 30%, #fafbff 60%, #f5f8ff 100%)",
//       }}
//     >
//       <div
//         className="absolute inset-0 opacity-40"
//         style={{
//           backgroundImage:
//             "radial-gradient(circle, #c8d0e8 1px, transparent 1px)",
//           backgroundSize: "32px 32px",
//         }}
//       />
//       <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/80 pointer-events-none" />

//       <div className="max-w-7xl mx-auto px-6 w-full py-20 relative z-10">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           <div>
//             <div
//               className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 mb-8 shadow-sm"
//               style={{
//                 opacity: visible ? 1 : 0,
//                 transform: visible ? "translateY(0)" : "translateY(20px)",
//                 transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
//               }}
//             >
//               <div className="w-2 h-2 rounded-full bg-green-500" style={{ animation: "pulse 2s infinite" }} />
//               <span className="text-gray-600 text-xs font-semibold tracking-widest uppercase">
//                 Global Inspection Marketplace
//               </span>
//             </div>

//             <h1
//               className="text-3xl md:text-6xl lg:text-[64px] font-black leading-[1.04] tracking-tight text-gray-900 mb-6"
//               style={{
//                 opacity: visible ? 1 : 0,
//                 transform: visible ? "translateY(0)" : "translateY(24px)",
//                 transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
//               }}
//             >
//               Cater Inspections
//               <br />
//               <span
//                 style={{
//                   background: "linear-gradient(135deg, #1a1a2e 0%, #4a6fa5 50%, #1a1a2e 100%)",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                 }}
//               >
//                 for Global Traders
//               </span>
//             </h1>

//             <p
//               className="text-gray-500 text-lg leading-relaxed mb-10 max-w-md"
//               style={{
//                 opacity: visible ? 1 : 0,
//                 transform: visible ? "translateY(0)" : "translateY(24px)",
//                 transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s",
//               }}
//             >
//               Get inspection queries from global traders on a one-stop platform.{" "}
//               <strong className="text-gray-700 font-semibold">
//                 Global Inspection Simplified.
//               </strong>
//             </p>

//             <div
//               className="flex flex-wrap items-center gap-4 mb-14"
//               style={{
//                 opacity: visible ? 1 : 0,
//                 transform: visible ? "translateY(0)" : "translateY(24px)",
//                 transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.45s",
//               }}
//             >
//               <button className="bg-gray-900 text-white font-bold px-8 py-4 rounded-2xl hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-gray-900/25 text-base flex items-center gap-2">
//                 Get Started Free
//                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
//                   <line x1="5" y1="12" x2="19" y2="12" />
//                   <polyline points="12 5 19 12 12 19" />
//                 </svg>
//               </button>
//               <button className="border border-gray-200 text-gray-700 font-semibold px-8 py-4 rounded-2xl hover:border-gray-300 hover:bg-gray-50 transition-all text-base flex items-center gap-2">
//                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
//                   <circle cx="12" cy="12" r="10" />
//                   <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
//                 </svg>
//                 Watch Demo
//               </button>
//             </div>

//             <div className="grid grid-cols-3 gap-3 max-w-sm">
//               <StatCard icon={IconMapPin} value="50+" label="Countries" delay={600} />
//               <StatCard icon={IconUsers} value="10K+" label="Traders" delay={750} />
//               <StatCard icon={IconStar} value="100%" label="Satisfaction" delay={900} />
//             </div>
//           </div>

//           <div
//             className="relative"
//             style={{
//               opacity: visible ? 1 : 0,
//               transform: visible ? "translateX(0)" : "translateX(30px)",
//               transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.3s",
//             }}
//           >
//             <div className="relative w-full" style={{ height: 500 }}>
//               <div
//                 className="absolute inset-0 rounded-full"
//                 style={{
//                   background:
//                     "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(100,140,220,0.12) 0%, transparent 70%)",
//                   transform: "scale(1.2)",
//                 }}
//               />
//               <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-gray-400">Loading globe...</div>}>
//                 <Globe3D />
//               </Suspense>
//             </div>

//             <div
//               className="absolute top-8 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100"
//               style={{ animation: "floatUp 4s ease-in-out infinite" }}
//             >
//               <div className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-1">New Query</div>
//               <div className="text-gray-900 font-bold text-sm">Electronics — Berlin</div>
//               <div className="flex items-center gap-1 mt-1">
//                 <div className="w-2 h-2 rounded-full bg-green-400" />
//                 <span className="text-gray-500 text-xs">Budget $3,200</span>
//               </div>
//             </div>

//             <div
//               className="absolute bottom-16 -right-4 bg-gray-900 text-white rounded-2xl p-4 shadow-xl"
//               style={{ animation: "floatUp 4.5s ease-in-out 0.8s infinite" }}
//             >
//               <div className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-1">Verified</div>
//               <div className="text-white font-bold text-sm">Textiles — New York</div>
//               <div className="text-gray-400 text-xs mt-1">Bid accepted</div>
//             </div>

//             <div
//               className="absolute top-1/2 -right-2 bg-white rounded-2xl p-4 shadow-xl border border-gray-100"
//               style={{ animation: "floatUp 3.8s ease-in-out 1.4s infinite" }}
//             >
//               <div className="text-2xl font-black text-gray-900">98%</div>
//               <div className="text-gray-400 text-xs">Report Score</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes floatUp {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-10px); }
//         }
//         @keyframes pulse {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.5; }
//         }
//       `}</style>
//     </section>
//   );
// }



// import { Suspense } from "react";
// import { useInView } from "../Hooks/useInView";
// import { IconMapPin, IconUsers, IconStar } from "../components/Icons";
// import Globe3D from "../components/Globe3D";

// function StatCard({ icon: Icon, value, label, delay }) {
//   const [ref, visible] = useInView(0.2);
//   return (
//     <div
//       ref={ref}
//       className="flex items-center gap-2 bg-white rounded-xl px-3 py-2.5 shadow-lg shadow-gray-900/8 border border-gray-100"
//       style={{
//         transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
//         opacity: visible ? 1 : 0,
//         transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.96)",
//       }}
//     >
//       <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-700 border border-gray-100 shrink-0">
//         <Icon className="w-4 h-4" />
//       </div>
//       <div>
//         <div className="text-sm font-black text-gray-900 leading-none">{value}</div>
//         <div className="text-[10px] text-gray-400 mt-0.5 font-medium">{label}</div>
//       </div>
//     </div>
//   );
// }

// export default function Hero() {
//   const [ref, visible] = useInView(0.05);

//   const fade = (delay) => ({
//     opacity: visible ? 1 : 0,
//     transform: visible ? "translateY(0)" : "translateY(24px)",
//     transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
//   });

//   return (
//     <section
//       ref={ref}
//       className="relative min-h-screen flex items-center overflow-hidden"
//       style={{ background: "linear-gradient(135deg,#f8f9ff 0%,#f0f4ff 30%,#fafbff 60%,#f5f8ff 100%)", paddingTop: "64px" }}
//     >
//       <div
//         className="absolute inset-0 opacity-40 pointer-events-none"
//         style={{ backgroundImage: "radial-gradient(circle,#c8d0e8 1px,transparent 1px)", backgroundSize: "32px 32px" }}
//       />
//       <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/80 pointer-events-none" />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full py-10 sm:py-16 lg:py-20 relative z-10">
//         <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

//           <div className="order-2 lg:order-1 text-center lg:text-left">
//             <div
//               className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 mb-6 shadow-sm"
//               style={fade(100)}
//             >
//               <div className="w-2 h-2 rounded-full bg-green-500" style={{ animation: "heroPulse 2s infinite" }} />
//               <span className="text-gray-600 text-xs font-semibold tracking-widest uppercase">Global Inspection Marketplace</span>
//             </div>

//             <h1
//               className="font-black leading-[1.04] tracking-tight text-gray-900 mb-5"
//               style={{ ...fade(200), fontSize: "clamp(36px, 5.5vw, 64px)" }}
//             >
//               Cater Inspections
//               <br />
//               <span style={{ background: "linear-gradient(135deg,#1a1a2e 0%,#4a6fa5 50%,#1a1a2e 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
//                 for Global Traders
//               </span>
//             </h1>

//             <p className="text-gray-500 leading-relaxed mb-8 max-w-md mx-auto lg:mx-0" style={{ ...fade(340), fontSize: "clamp(15px, 2vw, 18px)" }}>
//               Get inspection queries from global traders on a one-stop platform.{" "}
//               <strong className="text-gray-700 font-semibold">Global Inspection Simplified.</strong>
//             </p>

//             <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-10" style={fade(440)}>
//               <button className="bg-gray-900 text-white font-bold px-6 sm:px-8 py-3.5 rounded-2xl hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-gray-900/25 text-sm sm:text-base flex items-center gap-2">
//                 Get Started Free
//                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
//                   <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
//                 </svg>
//               </button>
//               <button className="border border-gray-200 text-gray-700 font-semibold px-6 sm:px-8 py-3.5 rounded-2xl hover:border-gray-300 hover:bg-gray-50 transition-all text-sm sm:text-base flex items-center gap-2">
//                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
//                   <circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
//                 </svg>
//                 Watch Demo
//               </button>
//             </div>

//             <div className="grid grid-cols-3 gap-2 max-w-[300px] sm:max-w-xs mx-auto lg:mx-0" style={fade(540)}>
//               <StatCard icon={IconMapPin} value="50+" label="Countries" delay={600} />
//               <StatCard icon={IconUsers} value="10K+" label="Traders" delay={750} />
//               <StatCard icon={IconStar} value="100%" label="Satisfaction" delay={900} />
//             </div>
//           </div>

//           <div
//             className="order-1 lg:order-2 relative flex justify-center"
//             style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(20px)", transition: "all 1s cubic-bezier(0.16,1,0.3,1) 300ms" }}
//           >
//             <div className="relative w-full" style={{ height: "clamp(260px, 50vw, 500px)", maxWidth: 560 }}>
//               <div
//                 className="absolute inset-0 rounded-full pointer-events-none"
//                 style={{ background: "radial-gradient(ellipse 70% 70% at 50% 50%,rgba(100,140,220,0.12) 0%,transparent 70%)", transform: "scale(1.2)" }}
//               />
//               <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">Loading globe...</div>}>
//                 <Globe3D />
//               </Suspense>

//               <div
//                 className="absolute top-4 -left-2 sm:top-8 sm:-left-4 bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-xl border border-gray-100 z-10"
//                 style={{ animation: "heroFloat 4s ease-in-out infinite" }}
//               >
//                 <div className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase mb-1">New Query</div>
//                 <div className="text-gray-900 font-bold text-xs sm:text-sm">Electronics — Berlin</div>
//                 <div className="flex items-center gap-1 mt-1">
//                   <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
//                   <span className="text-gray-500 text-xs">Budget $3,200</span>
//                 </div>
//               </div>

//               <div
//                 className="absolute bottom-8 -right-2 sm:bottom-16 sm:-right-4 bg-gray-900 text-white rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-xl z-10"
//                 style={{ animation: "heroFloat 4.5s ease-in-out 800ms infinite" }}
//               >
//                 <div className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase mb-1">Verified</div>
//                 <div className="text-white font-bold text-xs sm:text-sm">Textiles — New York</div>
//                 <div className="text-gray-400 text-xs mt-1">Bid accepted</div>
//               </div>

//               <div
//                 className="absolute top-1/2 -translate-y-1/2 -right-1 sm:-right-2 bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-xl border border-gray-100 z-10 hidden xs:block"
//                 style={{ animation: "heroFloat 3.8s ease-in-out 1400ms infinite" }}
//               >
//                 <div className="text-xl sm:text-2xl font-black text-gray-900">98%</div>
//                 <div className="text-gray-400 text-xs">Report Score</div>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>

//       <style>{`
//         @keyframes heroFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
//         @keyframes heroPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
//       `}</style>
//     </section>
//   );
// }






import { Suspense } from "react";
import { useInView } from "../Hooks/useInView";
import { IconMapPin, IconUsers, IconStar } from "../components/Icons";
import Globe3D from "../components/Globe3D";
import { Link } from "react-router-dom";

function StatCard({ icon: Icon, value, label, delay }) {
  const [ref, visible] = useInView(0.2);
  return (
    <div
      ref={ref}
      className="flex items-center gap-2 bg-white rounded-xl px-3 py-2.5 shadow-lg border border-gray-100"
      style={{
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.96)",
      }}
    >
      <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-700 border border-gray-100 shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <div className="text-sm font-black text-gray-900 leading-none">{value}</div>
        <div className="text-[10px] text-gray-400 mt-0.5 font-medium">{label}</div>
      </div>
    </div>
  );
}

export default function Hero() {
  const [ref, visible] = useInView(0.05);

  const fade = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(24px)",
    transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg,#f8f9ff 0%,#f0f4ff 30%,#fafbff 60%,#f5f8ff 100%)",
        paddingTop: "64px",
        minHeight: "100svh",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle,#c8d0e8 1px,transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.4,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/80 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full relative z-10">

        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center lg:min-h-[calc(100svh-64px)]">

          <div className="pt-10 sm:pt-14 lg:pt-0 pb-6 lg:pb-0 order-1 text-center lg:text-left">
            <div
              className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 mb-6 shadow-sm"
              style={fade(100)}
            >
              <div
                className="w-2 h-2 rounded-full bg-green-500 shrink-0"
                style={{ animation: "heroPulse 2s infinite" }}
              />
              <span className="text-gray-600 text-xs font-semibold tracking-widest uppercase">
                Global Inspection Marketplace
              </span>
            </div>

            <h1
              className="font-black leading-[1.04] tracking-tight text-gray-900 mb-5"
              style={{
                ...fade(200),
                fontSize: "clamp(34px, 5.5vw, 64px)",
              }}
            >
              Cater Inspections
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg,#1a1a2e 0%,#4a6fa5 50%,#1a1a2e 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                for Global Traders
              </span>
            </h1>

            <p
              className="text-gray-500 leading-relaxed mb-8 max-w-md mx-auto lg:mx-0"
              style={{ ...fade(340), fontSize: "clamp(15px, 2vw, 18px)" }}
            >
              Get inspection queries from global traders on a one-stop platform.{" "}
              <strong className="text-gray-700 font-semibold">
                Global Inspection Simplified.
              </strong>
            </p>

            <div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8"
              style={fade(440)}
            >
              <Link to="/login">
              <button  className="cursor-pointer bg-gray-900 text-white font-bold px-7 py-3.5 rounded-2xl hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-xl text-sm sm:text-base flex items-center gap-2">
                Get Started Free
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              </Link>
            </div>

            <div
              className="grid grid-cols-3 gap-2 max-w-[300px] sm:max-w-xs mx-auto lg:mx-0"
              style={fade(540)}
            >
              <StatCard icon={IconMapPin} value="50+" label="Countries" delay={600} />
              <StatCard icon={IconUsers} value="10K+" label="Traders" delay={750} />
              <StatCard icon={IconStar} value="100%" label="Satisfaction" delay={900} />
            </div>
          </div>

          <div
            className="order-2 relative flex justify-center lg:justify-end pb-8 lg:pb-0"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(20px)",
              transition: "all 1s cubic-bezier(0.16,1,0.3,1) 300ms",
            }}
          >
            <div
              className="relative w-full"
              style={{
                height: "clamp(280px, 80vw, 500px)",
                maxWidth: "min(100%, 560px)",
              }}
            >
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 70% at 50% 50%,rgba(100,140,220,0.12) 0%,transparent 70%)",
                  transform: "scale(1.2)",
                }}
              />

              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    Loading globe...
                  </div>
                }
              >
                <Globe3D />
              </Suspense>

              <div
                className="absolute z-10 bg-white rounded-xl shadow-xl border border-gray-100 p-2.5 sm:p-4"
                style={{
                  top: "8%",
                  left: "2%",
                  animation: "heroFloat 4s ease-in-out infinite",
                  maxWidth: 160,
                }}
              >
                <div className="text-gray-400 text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase mb-1">
                  New Query
                </div>
                <div className="text-gray-900 font-bold text-xs sm:text-sm leading-snug">
                  Electronics — Berlin
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                  <span className="text-gray-500 text-[10px] sm:text-xs">Budget $3,200</span>
                </div>
              </div>

              <div
                className="absolute z-10 bg-gray-900 text-white rounded-xl shadow-xl p-2.5 sm:p-4"
                style={{
                  bottom: "12%",
                  right: "2%",
                  animation: "heroFloat 4.5s ease-in-out 800ms infinite",
                  maxWidth: 155,
                }}
              >
                <div className="text-gray-400 text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase mb-1">
                  Verified
                </div>
                <div className="text-white font-bold text-xs sm:text-sm leading-snug">
                  Textiles — New York
                </div>
                <div className="text-gray-400 text-[10px] sm:text-xs mt-1">Bid accepted</div>
              </div>

              <div
                className="absolute z-10 bg-white rounded-xl shadow-xl border border-gray-100 p-2.5 sm:p-4 hidden sm:block"
                style={{
                  top: "42%",
                  right: "-2%",
                  transform: "translateY(-50%)",
                  animation: "heroFloat 3.8s ease-in-out 1400ms infinite",
                }}
              >
                <div className="text-xl sm:text-2xl font-black text-gray-900 leading-none">98%</div>
                <div className="text-gray-400 text-xs mt-0.5">Report Score</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes heroPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}