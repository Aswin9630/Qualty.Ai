// import { useEffect, useRef, useState } from "react";
// import { useInView } from "../Hooks/useInView";
// import { IconMapPin, IconUsers, IconGlobe } from "../components/Icons";

// const CITY_PINS = [
//   { lat: 51.5, lng: -0.1, label: "London" },
//   { lat: 52.5, lng: 13.4, label: "Berlin" },
//   { lat: 48.8, lng: 2.35, label: "Paris" },
//   { lat: 40.7, lng: -74.0, label: "New York" },
//   { lat: 34.0, lng: -118.2, label: "Los Angeles" },
//   { lat: 35.7, lng: 139.7, label: "Tokyo" },
//   { lat: 31.2, lng: 121.5, label: "Shanghai" },
//   { lat: 1.3, lng: 103.8, label: "Singapore" },
//   { lat: 19.1, lng: 72.9, label: "Mumbai" },
//   { lat: -33.9, lng: 18.4, label: "Cape Town" },
//   { lat: -23.5, lng: -46.6, label: "São Paulo" },
//   { lat: 25.2, lng: 55.3, label: "Dubai" },
//   { lat: 37.6, lng: 127.0, label: "Seoul" },
//   { lat: 55.7, lng: 37.6, label: "Moscow" },
//   { lat: -37.8, lng: 144.9, label: "Melbourne" },
//   { lat: 41.0, lng: 28.9, label: "Istanbul" },
//   { lat: 30.0, lng: 31.2, label: "Cairo" },
//   { lat: -1.3, lng: 36.8, label: "Nairobi" },
//   { lat: 43.7, lng: -79.4, label: "Toronto" },
//   { lat: -34.6, lng: -58.4, label: "Buenos Aires" },
// ];

// function WorldMap({ width, height }) {
//   const svgRef = useRef(null);
//   const [mapReady, setMapReady] = useState(false);
//   const [paths, setPaths] = useState([]);
//   const [projection, setProjection] = useState(null);

//   useEffect(() => {
//     const loadScripts = async () => {
//       const loadScript = (src) =>
//         new Promise((resolve, reject) => {
//           if (document.querySelector(`script[src="${src}"]`) && window.d3) { resolve(); return; }
//           const s = document.createElement("script");
//           s.src = src;
//           s.onload = resolve;
//           s.onerror = reject;
//           document.head.appendChild(s);
//         });

//       try {
//         if (!window.d3) await loadScript("https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js");
//         if (!window.topojson) await loadScript("https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js");

//         const response = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
//         const worldData = await response.json();

//         const d3 = window.d3;
//         const topojson = window.topojson;

//         const proj = d3.geoNaturalEarth1()
//           .scale(width / 6.2)
//           .translate([width / 2, height / 2]);

//         const pathGen = d3.geoPath().projection(proj);
//         const countries = topojson.feature(worldData, worldData.objects.countries);
//         const land = topojson.feature(worldData, worldData.objects.land);

//         const countryPaths = countries.features.map((f) => ({
//           d: pathGen(f),
//           id: f.id,
//         }));

//         const graticule = d3.geoGraticule()();
//         const sphere = { type: "Sphere" };

//         setPaths({
//           countries: countryPaths,
//           graticule: pathGen(graticule),
//           sphere: pathGen(sphere),
//           land: pathGen(land),
//         });
//         setProjection(() => proj);
//         setMapReady(true);
//       } catch (err) {
//         setMapReady("error");
//       }
//     };

//     loadScripts();
//   }, [width, height]);

//   const project = (lat, lng) => {
//     if (!projection) return null;
//     try {
//       const coords = projection([lng, lat]);
//       if (!coords) return null;
//       return { x: coords[0], y: coords[1] };
//     } catch {
//       return null;
//     }
//   };

//   if (mapReady === "error" || !mapReady) {
//     return (
//       <div style={{ width, height, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(180deg,#ddeeff 0%,#cce3f5 100%)", borderRadius: 24 }}>
//         <FallbackMap width={width} height={height} />
//       </div>
//     );
//   }

//   return (
//     <svg ref={svgRef} width={width} height={height} style={{ display: "block" }}>
//       <defs>
//         <radialGradient id="oceanGrad" cx="50%" cy="40%" r="60%">
//           <stop offset="0%" stopColor="#c8e4f5" />
//           <stop offset="100%" stopColor="#9ecbe8" />
//         </radialGradient>
//         <filter id="landShadow">
//           <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="rgba(0,0,0,0.12)" />
//         </filter>
//         <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
//           <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
//           <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
//         </radialGradient>
//       </defs>

//       {paths.sphere && (
//         <path d={paths.sphere} fill="url(#oceanGrad)" stroke="#a8ccde" strokeWidth="0.5" />
//       )}

//       {paths.graticule && (
//         <path d={paths.graticule} fill="none" stroke="rgba(150,195,225,0.3)" strokeWidth="0.4" />
//       )}

//       {paths.countries && paths.countries.map((c) => (
//         <path
//           key={c.id}
//           d={c.d}
//           fill="#c8ddb8"
//           stroke="#a8c898"
//           strokeWidth="0.5"
//           style={{ filter: "url(#landShadow)" }}
//         />
//       ))}

//       {paths.countries && paths.countries.map((c) => (
//         <path
//           key={`border-${c.id}`}
//           d={c.d}
//           fill="none"
//           stroke="#b8ccaa"
//           strokeWidth="0.4"
//         />
//       ))}

//       {mapReady && CITY_PINS.map(({ lat, lng, label }, i) => {
//         const pt = project(lat, lng);
//         if (!pt) return null;
//         return (
//           <g key={i}>
//             <circle cx={pt.x} cy={pt.y} r={16} fill="url(#pinGlow)" opacity={0.4}>
//               <animate
//                 attributeName="r"
//                 values="6;18;6"
//                 dur={`${2.4 + i * 0.11}s`}
//                 repeatCount="indefinite"
//               />
//               <animate
//                 attributeName="opacity"
//                 values="0.4;0;0.4"
//                 dur={`${2.4 + i * 0.11}s`}
//                 repeatCount="indefinite"
//               />
//             </circle>
//             <circle cx={pt.x} cy={pt.y} r={4} fill="#dc2626" stroke="white" strokeWidth="1.2" />
//             <circle cx={pt.x} cy={pt.y} r={2} fill="white" />
//           </g>
//         );
//       })}
//     </svg>
//   );
// }

// function FallbackMap({ width, height }) {
//   const W = width, H = height;
//   const pins = [
//     { x: 0.215, y: 0.325 }, { x: 0.235, y: 0.31 }, { x: 0.226, y: 0.318 },
//     { x: 0.408, y: 0.356 }, { x: 0.361, y: 0.374 }, { x: 0.858, y: 0.348 },
//     { x: 0.833, y: 0.365 }, { x: 0.805, y: 0.508 }, { x: 0.739, y: 0.394 },
//     { x: 0.575, y: 0.756 }, { x: 0.472, y: 0.700 }, { x: 0.700, y: 0.361 },
//     { x: 0.200, y: 0.340 }, { x: 0.917, y: 0.812 }, { x: 0.845, y: 0.339 },
//   ];

//   return (
//     <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}>
//       <defs>
//         <radialGradient id="fbOcean" cx="50%" cy="40%" r="60%">
//           <stop offset="0%" stopColor="#c8e4f5" />
//           <stop offset="100%" stopColor="#9ecbe8" />
//         </radialGradient>
//         <radialGradient id="fbPin" cx="50%" cy="50%" r="50%">
//           <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
//           <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
//         </radialGradient>
//       </defs>
//       <rect width={W} height={H} fill="url(#fbOcean)" />
//       {[0.15, 0.3, 0.45, 0.6, 0.75, 0.9].map((f, i) => (
//         <line key={i} x1={W * f} y1={0} x2={W * f} y2={H} stroke="rgba(150,195,225,0.25)" strokeWidth="0.5" />
//       ))}
//       {[0.2, 0.4, 0.6, 0.8].map((f, i) => (
//         <line key={i} x1={0} y1={H * f} x2={W} y2={H * f} stroke="rgba(150,195,225,0.25)" strokeWidth="0.5" />
//       ))}
//       <path d={`M${W*0.07},${H*0.2} Q${W*0.15},${H*0.16} Q${W*0.22},${H*0.17} Q${W*0.28},${H*0.2} Q${W*0.32},${H*0.25} Q${W*0.31},${H*0.32} Q${W*0.25},${H*0.36} Q${W*0.18},${H*0.36} Q${W*0.11},${H*0.32} Z`} fill="#c8ddb8" stroke="#a8c898" strokeWidth="0.8" />
//       <path d={`M${W*0.13},${H*0.36} Q${W*0.17},${H*0.35} Q${W*0.2},${H*0.37} Q${W*0.2},${H*0.44} Q${W*0.17},${H*0.47} Q${W*0.13},${H*0.45} Z`} fill="#c8ddb8" stroke="#a8c898" strokeWidth="0.8" />
//       <path d={`M${W*0.37},${H*0.56} Q${W*0.42},${H*0.54} Q${W*0.45},${H*0.58} Q${W*0.44},${H*0.68} Q${W*0.41},${H*0.76} Q${W*0.37},${H*0.76} Q${W*0.33},${H*0.72} Q${W*0.32},${H*0.65} Q${W*0.34},${H*0.59} Z`} fill="#c8ddb8" stroke="#a8c898" strokeWidth="0.8" />
//       <path d={`M${W*0.42},${H*0.15} Q${W*0.5},${H*0.13} Q${W*0.58},${H*0.14} Q${W*0.61},${H*0.18} Q${W*0.59},${H*0.24} Q${W*0.53},${H*0.26} Q${W*0.45},${H*0.25} Q${W*0.41},${H*0.21} Z`} fill="#c8ddb8" stroke="#a8c898" strokeWidth="0.8" />
//       <path d={`M${W*0.5},${H*0.24} Q${W*0.6},${H*0.2} Q${W*0.67},${H*0.24} Q${W*0.72},${H*0.3} Q${W*0.72},${H*0.38} Q${W*0.68},${H*0.44} Q${W*0.6},${H*0.46} Q${W*0.53},${H*0.44} Q${W*0.49},${H*0.37} Z`} fill="#c8ddb8" stroke="#a8c898" strokeWidth="0.8" />
//       <path d={`M${W*0.55},${H*0.12} Q${W*0.72},${H*0.08} Q${W*0.9},${H*0.1} Q${W*0.98},${H*0.18} Q${W*0.98},${H*0.28} Q${W*0.9},${H*0.36} Q${W*0.78},${H*0.4} Q${W*0.65},${H*0.38} Q${W*0.57},${H*0.3} Z`} fill="#c8ddb8" stroke="#a8c898" strokeWidth="0.8" />
//       <path d={`M${W*0.82},${H*0.6} Q${W*0.9},${H*0.58} Q${W*0.96},${H*0.63} Q${W*0.96},${H*0.73} Q${W*0.91},${H*0.78} Q${W*0.84},${H*0.77} Q${W*0.8},${H*0.72} Z`} fill="#c8ddb8" stroke="#a8c898" strokeWidth="0.8" />
//       {pins.map(({ x, y }, i) => (
//         <g key={i}>
//           <circle cx={W * x} cy={H * y} r={12} fill="url(#fbPin)">
//             <animate attributeName="r" values="5;15;5" dur={`${2.4 + i * 0.12}s`} repeatCount="indefinite" />
//             <animate attributeName="opacity" values="0.5;0;0.5" dur={`${2.4 + i * 0.12}s`} repeatCount="indefinite" />
//           </circle>
//           <circle cx={W * x} cy={H * y} r={4} fill="#dc2626" stroke="white" strokeWidth="1.2" />
//           <circle cx={W * x} cy={H * y} r={2} fill="white" />
//         </g>
//       ))}
//     </svg>
//   );
// }

// const STATS = [
//   { Icon: IconUsers, value: "10,000+", label: "Global Traders" },
//   { Icon: IconMapPin, value: "2,500+", label: "Inspection Partners" },
//   { Icon: IconGlobe, value: "50+", label: "Countries Covered" },
// ];

// export default function GlobalMarketplace() {
//   const [titleRef, titleVisible] = useInView(0.2);
//   const containerRef = useRef(null);
//   const [mapDims, setMapDims] = useState({ width: 900, height: 420 });

//   useEffect(() => {
//     const update = () => {
//       if (containerRef.current) {
//         const w = containerRef.current.clientWidth;
//         setMapDims({ width: w, height: Math.round(w * 0.46) });
//       }
//     };
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);

//   return (
//     <section
//       className="py-28 px-6"
//       style={{ background: "linear-gradient(180deg,#f5f8ff 0%,white 100%)" }}
//     >
//       <div className="max-w-6xl mx-auto">
//         <div
//           ref={titleRef}
//           className="text-center mb-16"
//           style={{
//             opacity: titleVisible ? 1 : 0,
//             transform: titleVisible ? "translateY(0)" : "translateY(30px)",
//             transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
//           }}
//         >
//           <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 mb-6">
//             <span className="text-gray-600 text-xs font-semibold tracking-widest uppercase">
//               Global Reach
//             </span>
//           </div>
//           <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-4 leading-tight">
//             A Truly Global<br />
//             <span className="text-gray-400">Marketplace</span>
//           </h2>
//           <p className="text-gray-500 text-lg">
//             Trusted by 500+ global businesses across 6 continents.
//           </p>
//         </div>

//         <div
//           ref={containerRef}
//           className="relative rounded-3xl overflow-hidden border border-gray-100 bg-white"
//           style={{ boxShadow: "0 12px 50px rgba(0,0,0,0.08)" }}
//         >
//           <WorldMap width={mapDims.width} height={mapDims.height} />

//           <div
//             className="absolute bottom-0 left-0 right-0 flex flex-wrap gap-3 justify-center pb-5 px-6"
//             style={{
//               background: "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.96) 55%, transparent 100%)",
//               paddingTop: 40,
//             }}
//           >
//             {STATS.map(({ Icon, value, label }, i) => (
//               <div
//                 key={i}
//                 className="flex items-center gap-2.5 bg-white border border-gray-100 rounded-2xl px-5 py-3"
//                 style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
//               >
//                 <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-gray-600 border border-gray-100">
//                   <Icon className="w-4 h-4" />
//                 </div>
//                 <div>
//                   <div className="text-gray-900 font-black text-base leading-none">{value}</div>
//                   <div className="text-gray-400 text-xs mt-0.5">{label}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="flex flex-wrap items-center justify-center gap-8 mt-8">
//           {["Global Traders", "Inspection Partners", "Verified Network", "500+ Businesses"].map((badge, i) => (
//             <div key={i} className="flex items-center gap-2 text-gray-400 text-sm font-medium">
//               <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
//               {badge}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }




// import { useEffect, useRef, useState } from "react";
// import { useInView } from "../Hooks/useInView";

// const CITY_PINS = [
//   { lat: 51.5, lng: -0.1 }, { lat: 52.5, lng: 13.4 }, { lat: 48.8, lng: 2.35 },
//   { lat: 40.7, lng: -74.0 }, { lat: 34.0, lng: -118.2 }, { lat: 35.7, lng: 139.7 },
//   { lat: 31.2, lng: 121.5 }, { lat: 1.3, lng: 103.8 }, { lat: 19.1, lng: 72.9 },
//   { lat: -33.9, lng: 18.4 }, { lat: -23.5, lng: -46.6 }, { lat: 25.2, lng: 55.3 },
//   { lat: 37.6, lng: 127.0 }, { lat: 55.7, lng: 37.6 }, { lat: -37.8, lng: 144.9 },
//   { lat: 41.0, lng: 28.9 }, { lat: 30.0, lng: 31.2 }, { lat: -1.3, lng: 36.8 },
//   { lat: 43.7, lng: -79.4 }, { lat: -34.6, lng: -58.4 },
// ];

// function useCountUp(target, active, duration = 1800) {
//   const [value, setValue] = useState(0);
//   useEffect(() => {
//     if (!active) return;
//     let start = null;
//     const step = ts => {
//       if (!start) start = ts;
//       const p = Math.min((ts - start) / duration, 1);
//       const eased = 1 - Math.pow(1 - p, 3);
//       setValue(Math.floor(eased * target));
//       if (p < 1) requestAnimationFrame(step);
//     };
//     requestAnimationFrame(step);
//   }, [active, target, duration]);
//   return value;
// }

// function WorldMap({ width, height }) {
//   const [status, setStatus] = useState("loading");
//   const [paths, setPaths] = useState(null);
//   const [proj, setProj] = useState(null);

//   useEffect(() => {
//     if (!width || width < 10) return;
//     const loadScript = (src, check) => new Promise((res, rej) => {
//       if (check()) { res(); return; }
//       const ex = document.querySelector(`script[data-gmsrc="${src}"]`);
//       if (ex) { ex.addEventListener("load", res); ex.addEventListener("error", rej); return; }
//       const s = document.createElement("script");
//       s.src = src; s.dataset.gmsrc = src;
//       s.onload = res; s.onerror = rej;
//       document.head.appendChild(s);
//     });
//     const run = async () => {
//       try {
//         await loadScript("https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js", () => !!window.d3);
//         await loadScript("https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js", () => !!window.topojson);
//         const res = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
//         const world = await res.json();
//         const d3 = window.d3, topo = window.topojson;
//         const projection = d3.geoNaturalEarth1().scale(width / 6.2).translate([width / 2, height / 2]);
//         const pathGen = d3.geoPath().projection(projection);
//         const countries = topo.feature(world, world.objects.countries);
//         setPaths({
//           sphere: pathGen({ type: "Sphere" }),
//           graticule: pathGen(d3.geoGraticule()()),
//           countries: countries.features.map(f => ({ d: pathGen(f), id: f.id })),
//         });
//         setProj(() => projection);
//         setStatus("ready");
//       } catch { setStatus("fallback"); }
//     };
//     run();
//   }, [width, height]);

//   const project = (lat, lng) => {
//     if (!proj) return null;
//     try { const c = proj([lng, lat]); return c ? { x: c[0], y: c[1] } : null; } catch { return null; }
//   };

//   if (status === "loading") return (
//     <div style={{ width, height }} className="flex items-center justify-center bg-[#060a12]">
//       <div className="w-6 h-6 border-2 border-white/10 border-t-white/50 rounded-full animate-spin" />
//     </div>
//   );

//   if (status === "fallback" || !paths) return <FallbackWorldMap width={width} height={height} />;

//   return (
//     <svg width={width} height={height} style={{ display: "block" }}>
//       <defs>
//         <radialGradient id="gm-ocean" cx="50%" cy="35%" r="70%">
//           <stop offset="0%" stopColor="#0d1f35" /><stop offset="100%" stopColor="#060d18" />
//         </radialGradient>
//         <radialGradient id="gm-pin" cx="50%" cy="50%" r="50%">
//           <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" /><stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
//         </radialGradient>
//       </defs>
//       <path d={paths.sphere} fill="url(#gm-ocean)" />
//       <path d={paths.graticule} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.4" />
//       {paths.countries.map(c => <path key={c.id} d={c.d} fill="#1c3a28" stroke="#122219" strokeWidth="0.5" />)}
//       {paths.countries.map(c => <path key={`b${c.id}`} d={c.d} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.3" />)}
//       {CITY_PINS.map(({ lat, lng }, i) => {
//         const pt = project(lat, lng);
//         if (!pt) return null;
//         return (
//           <g key={i}>
//             <circle cx={pt.x} cy={pt.y} r={14} fill="url(#gm-pin)">
//               <animate attributeName="r" values="5;20;5" dur={`${2.5 + i * 0.1}s`} repeatCount="indefinite" />
//               <animate attributeName="opacity" values="0.7;0;0.7" dur={`${2.5 + i * 0.1}s`} repeatCount="indefinite" />
//             </circle>
//             <circle cx={pt.x} cy={pt.y} r={3.5} fill="#3b82f6" stroke="rgba(59,130,246,0.4)" strokeWidth="2" />
//             <circle cx={pt.x} cy={pt.y} r={1.5} fill="white" />
//           </g>
//         );
//       })}
//     </svg>
//   );
// }

// function FallbackWorldMap({ width, height }) {
//   const W = width, H = height;
//   const pins = [[0.215,0.325],[0.235,0.31],[0.226,0.318],[0.408,0.356],[0.361,0.374],[0.858,0.348],[0.833,0.365],[0.805,0.508],[0.739,0.394],[0.575,0.756],[0.472,0.7],[0.7,0.361],[0.2,0.34],[0.917,0.812],[0.845,0.339],[0.568,0.295],[0.53,0.38],[0.394,0.298],[0.485,0.72],[0.538,0.42]];
//   return (
//     <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}>
//       <defs>
//         <radialGradient id="fb-o" cx="50%" cy="35%" r="70%"><stop offset="0%" stopColor="#0d1f35" /><stop offset="100%" stopColor="#060d18" /></radialGradient>
//         <radialGradient id="fb-p" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" /><stop offset="100%" stopColor="#3b82f6" stopOpacity="0" /></radialGradient>
//       </defs>
//       <rect width={W} height={H} fill="url(#fb-o)" />
//       {[0.15,0.3,0.45,0.6,0.75,0.9].map((f,i) => <line key={i} x1={W*f} y1={0} x2={W*f} y2={H} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />)}
//       {[0.25,0.5,0.75].map((f,i) => <line key={i} x1={0} y1={H*f} x2={W} y2={H*f} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />)}
//       <path d={`M${W*.07},${H*.18} Q${W*.15},${H*.14} ${W*.22},${H*.17} Q${W*.3},${H*.21} ${W*.32},${H*.29} Q${W*.3},${H*.36} ${W*.24},${H*.39} Q${W*.16},${H*.39} ${W*.1},${H*.34} Z`} fill="#1c3a28" stroke="#122219" strokeWidth="0.8" />
//       <path d={`M${W*.13},${H*.39} Q${W*.17},${H*.38} ${W*.2},${H*.4} Q${W*.2},${H*.48} ${W*.17},${H*.5} Q${W*.13},${H*.48} Z`} fill="#1c3a28" stroke="#122219" strokeWidth="0.8" />
//       <path d={`M${W*.37},${H*.58} Q${W*.43},${H*.56} ${W*.46},${H*.61} Q${W*.44},${H*.71} ${W*.41},${H*.79} Q${W*.37},${H*.79} ${W*.33},${H*.75} Q${W*.32},${H*.67} ${W*.35},${H*.61} Z`} fill="#1c3a28" stroke="#122219" strokeWidth="0.8" />
//       <path d={`M${W*.42},${H*.13} Q${W*.5},${H*.11} ${W*.59},${H*.14} Q${W*.62},${H*.19} ${W*.59},${H*.25} Q${W*.53},${H*.27} ${W*.45},${H*.26} Q${W*.41},${H*.21} Z`} fill="#1c3a28" stroke="#122219" strokeWidth="0.8" />
//       <path d={`M${W*.5},${H*.25} Q${W*.61},${H*.2} ${W*.68},${H*.25} Q${W*.73},${H*.31} ${W*.73},${H*.39} Q${W*.68},${H*.45} ${W*.6},${H*.47} Q${W*.5},${H*.44} ${W*.49},${H*.37} Z`} fill="#1c3a28" stroke="#122219" strokeWidth="0.8" />
//       <path d={`M${W*.56},${H*.1} Q${W*.73},${H*.06} ${W*.91},${H*.1} Q${W*.99},${H*.19} ${W*.99},${H*.29} Q${W*.91},${H*.37} ${W*.78},${H*.4} Q${W*.65},${H*.38} ${W*.57},${H*.31} Z`} fill="#1c3a28" stroke="#122219" strokeWidth="0.8" />
//       <path d={`M${W*.83},${H*.62} Q${W*.91},${H*.6} ${W*.97},${H*.65} Q${W*.97},${H*.76} ${W*.91},${H*.81} Q${W*.84},${H*.8} ${W*.8},${H*.74} Z`} fill="#1c3a28" stroke="#122219" strokeWidth="0.8" />
//       {pins.map(([x,y],i) => (
//         <g key={i}>
//           <circle cx={W*x} cy={H*y} r={14} fill="url(#fb-p)">
//             <animate attributeName="r" values="5;20;5" dur={`${2.5+i*.1}s`} repeatCount="indefinite" />
//             <animate attributeName="opacity" values="0.7;0;0.7" dur={`${2.5+i*.1}s`} repeatCount="indefinite" />
//           </circle>
//           <circle cx={W*x} cy={H*y} r={3.5} fill="#3b82f6" stroke="rgba(59,130,246,0.4)" strokeWidth="2" />
//           <circle cx={W*x} cy={H*y} r={1.5} fill="white" />
//         </g>
//       ))}
//     </svg>
//   );
// }

// function CountStat({ target, suffix, label, active, delay, duration }) {
//   const count = useCountUp(target, active, duration);
//   const [ref, vis] = useInView(0.2);
//   return (
//     <div
//       ref={ref}
//       style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms` }}
//     >
//       <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-none tracking-tight">
//         {count.toLocaleString()}<span className="text-blue-400">{suffix}</span>
//       </div>
//       <div className="text-gray-500 text-xs font-semibold tracking-widest uppercase mt-2">{label}</div>
//     </div>
//   );
// }

// export default function GlobalMarketplace() {
//   const [headerRef, headerVis] = useInView(0.1);
//   const [statsRef, statsVis] = useInView(0.2);
//   const mapRef = useRef(null);
//   const [dims, setDims] = useState({ w: 0, h: 0 });

//   useEffect(() => {
//     const update = () => {
//       if (!mapRef.current) return;
//       const w = mapRef.current.clientWidth;
//       const h = Math.round(Math.min(w * 0.5, window.innerHeight * 0.55, 500));
//       setDims({ w, h: Math.max(h, 200) });
//     };
//     update();
//     const ro = new ResizeObserver(update);
//     if (mapRef.current) ro.observe(mapRef.current);
//     return () => ro.disconnect();
//   }, []);

//   const networkTags = ["Verified Traders", "Escrow Payments", "Real-time Matching", "Digital Reports", "ISO Partners", "24/7 Global Ops"];

//   return (
//     <section className="bg-[#060a12] py-20 sm:py-28 px-4 sm:px-6">
//       <div className="max-w-7xl mx-auto">

//         <div ref={headerRef} className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-12 sm:mb-16">
//           <div style={{ opacity: headerVis ? 1 : 0, transform: headerVis ? "none" : "translateY(32px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
//             <div className="flex items-center gap-3 mb-5">
//               <div className="w-8 h-px bg-blue-500" />
//               <span className="text-blue-400 text-xs font-bold tracking-[0.18em] uppercase">Global Reach</span>
//             </div>
//             <h2
//               className="font-black text-white leading-[1.04] tracking-tight mb-5"
//               style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
//             >
//               A Truly Global
//               <br />
//               <span className="text-gray-600">Marketplace.</span>
//             </h2>
//             <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-md">
//               Trusted by 500+ businesses across 6 continents. Real inspections, verified partners, guaranteed payments.
//             </p>
//           </div>

//           <div style={{ opacity: headerVis ? 1 : 0, transform: headerVis ? "none" : "translateY(32px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 150ms" }}>
//             <div className="grid grid-cols-2 gap-x-8 gap-y-3">
//               {networkTags.map((tag, i) => (
//                 <div key={i} className="flex items-center gap-2.5">
//                   <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
//                   <span className="text-gray-400 text-sm">{tag}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div
//           ref={mapRef}
//           className="relative rounded-2xl sm:rounded-3xl overflow-hidden mb-10 sm:mb-14"
//           style={{
//             border: "1px solid rgba(255,255,255,0.06)",
//             boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
//             opacity: headerVis ? 1 : 0,
//             transform: headerVis ? "scale(1)" : "scale(0.97)",
//             transition: "all 1s cubic-bezier(0.16,1,0.3,1) 200ms",
//           }}
//         >
//           {dims.w > 0 && <WorldMap width={dims.w} height={dims.h} />}

//           <div
//             className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2 rounded-full px-3 py-1.5"
//             style={{ background: "rgba(6,10,18,0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)" }}
//           >
//             <div className="w-2 h-2 rounded-full bg-green-400" style={{ animation: "gmBlink 2s infinite" }} />
//             <span className="text-white text-xs font-semibold">Live</span>
//           </div>

//           <div
//             className="absolute bottom-0 left-0 right-0 flex flex-wrap gap-2 sm:gap-3 justify-center items-center px-4 py-4 sm:py-5"
//             style={{ background: "linear-gradient(to top, rgba(6,10,18,1) 0%, rgba(6,10,18,0.95) 50%, transparent 100%)", paddingTop: 48 }}
//           >
//             {[{ v: "20 Active Cities" }, { v: "6 Continents" }, { v: "Real-time Queries" }].map(({ v }, i) => (
//               <div
//                 key={i}
//                 className="flex items-center gap-2 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5"
//                 style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
//               >
//                 <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
//                 <span className="text-white text-xs sm:text-sm font-semibold">{v}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 border-t pt-10 sm:pt-12" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
//           {[
//             { target: 10000, suffix: "+", label: "Global Traders", delay: 0, duration: 1800 },
//             { target: 2500, suffix: "+", label: "Inspection Partners", delay: 100, duration: 1600 },
//             { target: 50, suffix: "+", label: "Countries", delay: 200, duration: 1200 },
//             { target: 500, suffix: "+", label: "Businesses Served", delay: 300, duration: 1400 },
//           ].map(props => <CountStat key={props.label} {...props} active={statsVis} />)}
//         </div>

//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 sm:mt-10 pt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
//           <p className="text-gray-500 text-sm">
//             Active across every major trade corridor — from <span className="text-gray-300 font-medium">Europe to Asia</span>, Americas to Africa.
//           </p>
//           <button className="flex items-center gap-2 text-blue-400 text-sm font-bold hover:text-blue-300 transition-colors group self-start sm:self-auto">
//             Explore the network
//             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 transition-transform group-hover:translate-x-1">
//               <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
//             </svg>
//           </button>
//         </div>
//       </div>

//       <style>{`
//         @keyframes gmBlink { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
//       `}</style>
//     </section>
//   );
// }














import { useEffect, useRef, useState } from "react";
import { useInView } from "../Hooks/useInView";

const CITY_PINS = [
  { lat: 51.5, lng: -0.1 }, { lat: 52.5, lng: 13.4 }, { lat: 48.8, lng: 2.35 },
  { lat: 40.7, lng: -74.0 }, { lat: 34.0, lng: -118.2 }, { lat: 35.7, lng: 139.7 },
  { lat: 31.2, lng: 121.5 }, { lat: 1.3, lng: 103.8 }, { lat: 19.1, lng: 72.9 },
  { lat: -33.9, lng: 18.4 }, { lat: -23.5, lng: -46.6 }, { lat: 25.2, lng: 55.3 },
  { lat: 37.6, lng: 127.0 }, { lat: 55.7, lng: 37.6 }, { lat: -37.8, lng: 144.9 },
  { lat: 41.0, lng: 28.9 }, { lat: 30.0, lng: 31.2 }, { lat: -1.3, lng: 36.8 },
  { lat: 43.7, lng: -79.4 }, { lat: -34.6, lng: -58.4 },
];

function useCountUp(target, active, duration = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return value;
}

function WorldMap({ width, height }) {
  const [status, setStatus] = useState("loading");
  const [paths, setPaths] = useState(null);
  const [proj, setProj] = useState(null);

  useEffect(() => {
    if (!width || width < 10) return;
    const loadScript = (src, check) => new Promise((res, rej) => {
      if (check()) { res(); return; }
      const ex = document.querySelector(`script[data-gmsrc="${src}"]`);
      if (ex) { ex.addEventListener("load", res); ex.addEventListener("error", rej); return; }
      const s = document.createElement("script");
      s.src = src; s.dataset.gmsrc = src;
      s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
    const run = async () => {
      try {
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js", () => !!window.d3);
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js", () => !!window.topojson);
        const res = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
        const world = await res.json();
        const d3 = window.d3, topo = window.topojson;
        const projection = d3.geoNaturalEarth1().scale(width / 6.2).translate([width / 2, height / 2]);
        const pathGen = d3.geoPath().projection(projection);
        const countries = topo.feature(world, world.objects.countries);
        setPaths({
          sphere: pathGen({ type: "Sphere" }),
          graticule: pathGen(d3.geoGraticule()()),
          countries: countries.features.map(f => ({ d: pathGen(f), id: f.id })),
        });
        setProj(() => projection);
        setStatus("ready");
      } catch { setStatus("fallback"); }
    };
    run();
  }, [width, height]);

  const project = (lat, lng) => {
    if (!proj) return null;
    try { const c = proj([lng, lat]); return c ? { x: c[0], y: c[1] } : null; } catch { return null; }
  };

  if (status === "loading") return (
    <div style={{ width, height }} className="flex items-center justify-center bg-[#060a12]">
      <div className="w-6 h-6 border-2 border-white/10 border-t-white/50 rounded-full animate-spin" />
    </div>
  );

  if (status === "fallback" || !paths) return <FallbackWorldMap width={width} height={height} />;

  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      <defs>
        <radialGradient id="gm-ocean" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#0d1f35" /><stop offset="100%" stopColor="#060d18" />
        </radialGradient>
        <radialGradient id="gm-pin" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" /><stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d={paths.sphere} fill="url(#gm-ocean)" />
      <path d={paths.graticule} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.4" />
      {paths.countries.map((c, i) => <path key={`land-${i}`} d={c.d} fill="#1c3a28" stroke="#122219" strokeWidth="0.5" />)}
      {paths.countries.map((c, i) => <path key={`border-${i}`} d={c.d} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.3" />)}
      {CITY_PINS.map(({ lat, lng }, i) => {
        const pt = project(lat, lng);
        if (!pt) return null;
        return (
          <g key={i}>
            <circle cx={pt.x} cy={pt.y} r={14} fill="url(#gm-pin)">
              <animate attributeName="r" values="5;20;5" dur={`${2.5 + i * 0.1}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0;0.7" dur={`${2.5 + i * 0.1}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={pt.x} cy={pt.y} r={3.5} fill="#3b82f6" stroke="rgba(59,130,246,0.4)" strokeWidth="2" />
            <circle cx={pt.x} cy={pt.y} r={1.5} fill="white" />
          </g>
        );
      })}
    </svg>
  );
}

function FallbackWorldMap({ width, height }) {
  const W = width, H = height;
  const pins = [[0.215,0.325],[0.235,0.31],[0.226,0.318],[0.408,0.356],[0.361,0.374],[0.858,0.348],[0.833,0.365],[0.805,0.508],[0.739,0.394],[0.575,0.756],[0.472,0.7],[0.7,0.361],[0.2,0.34],[0.917,0.812],[0.845,0.339],[0.568,0.295],[0.53,0.38],[0.394,0.298],[0.485,0.72],[0.538,0.42]];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}>
      <defs>
        <radialGradient id="fb-o" cx="50%" cy="35%" r="70%"><stop offset="0%" stopColor="#0d1f35" /><stop offset="100%" stopColor="#060d18" /></radialGradient>
        <radialGradient id="fb-p" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" /><stop offset="100%" stopColor="#3b82f6" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width={W} height={H} fill="url(#fb-o)" />
      {[0.15,0.3,0.45,0.6,0.75,0.9].map((f,i) => <line key={i} x1={W*f} y1={0} x2={W*f} y2={H} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />)}
      {[0.25,0.5,0.75].map((f,i) => <line key={i} x1={0} y1={H*f} x2={W} y2={H*f} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />)}
      <path d={`M${W*.07},${H*.18} Q${W*.15},${H*.14} ${W*.22},${H*.17} Q${W*.3},${H*.21} ${W*.32},${H*.29} Q${W*.3},${H*.36} ${W*.24},${H*.39} Q${W*.16},${H*.39} ${W*.1},${H*.34} Z`} fill="#1c3a28" stroke="#122219" strokeWidth="0.8" />
      <path d={`M${W*.13},${H*.39} Q${W*.17},${H*.38} ${W*.2},${H*.4} Q${W*.2},${H*.48} ${W*.17},${H*.5} Q${W*.13},${H*.48} Z`} fill="#1c3a28" stroke="#122219" strokeWidth="0.8" />
      <path d={`M${W*.37},${H*.58} Q${W*.43},${H*.56} ${W*.46},${H*.61} Q${W*.44},${H*.71} ${W*.41},${H*.79} Q${W*.37},${H*.79} ${W*.33},${H*.75} Q${W*.32},${H*.67} ${W*.35},${H*.61} Z`} fill="#1c3a28" stroke="#122219" strokeWidth="0.8" />
      <path d={`M${W*.42},${H*.13} Q${W*.5},${H*.11} ${W*.59},${H*.14} Q${W*.62},${H*.19} ${W*.59},${H*.25} Q${W*.53},${H*.27} ${W*.45},${H*.26} Q${W*.41},${H*.21} Z`} fill="#1c3a28" stroke="#122219" strokeWidth="0.8" />
      <path d={`M${W*.5},${H*.25} Q${W*.61},${H*.2} ${W*.68},${H*.25} Q${W*.73},${H*.31} ${W*.73},${H*.39} Q${W*.68},${H*.45} ${W*.6},${H*.47} Q${W*.5},${H*.44} ${W*.49},${H*.37} Z`} fill="#1c3a28" stroke="#122219" strokeWidth="0.8" />
      <path d={`M${W*.56},${H*.1} Q${W*.73},${H*.06} ${W*.91},${H*.1} Q${W*.99},${H*.19} ${W*.99},${H*.29} Q${W*.91},${H*.37} ${W*.78},${H*.4} Q${W*.65},${H*.38} ${W*.57},${H*.31} Z`} fill="#1c3a28" stroke="#122219" strokeWidth="0.8" />
      <path d={`M${W*.83},${H*.62} Q${W*.91},${H*.6} ${W*.97},${H*.65} Q${W*.97},${H*.76} ${W*.91},${H*.81} Q${W*.84},${H*.8} ${W*.8},${H*.74} Z`} fill="#1c3a28" stroke="#122219" strokeWidth="0.8" />
      {pins.map(([x,y],i) => (
        <g key={i}>
          <circle cx={W*x} cy={H*y} r={14} fill="url(#fb-p)">
            <animate attributeName="r" values="5;20;5" dur={`${2.5+i*.1}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0;0.7" dur={`${2.5+i*.1}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={W*x} cy={H*y} r={3.5} fill="#3b82f6" stroke="rgba(59,130,246,0.4)" strokeWidth="2" />
          <circle cx={W*x} cy={H*y} r={1.5} fill="white" />
        </g>
      ))}
    </svg>
  );
}

function CountStat({ target, suffix, label, active, delay, duration }) {
  const count = useCountUp(target, active, duration);
  const [ref, vis] = useInView(0.2);
  return (
    <div
      ref={ref}
      style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms` }}
    >
      <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-none tracking-tight">
        {count.toLocaleString()}<span className="text-blue-400">{suffix}</span>
      </div>
      <div className="text-gray-500 text-xs font-semibold tracking-widest uppercase mt-2">{label}</div>
    </div>
  );
}

export default function GlobalMarketplace() {
  const [headerRef, headerVis] = useInView(0.1);
  const [statsRef, statsVis] = useInView(0.2);
  const mapRef = useRef(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const update = () => {
      if (!mapRef.current) return;
      const w = mapRef.current.clientWidth;
      const h = Math.round(Math.min(w * 0.5, window.innerHeight * 0.55, 500));
      setDims({ w, h: Math.max(h, 200) });
    };
    update();
    const ro = new ResizeObserver(update);
    if (mapRef.current) ro.observe(mapRef.current);
    return () => ro.disconnect();
  }, []);

  const networkTags = ["Verified Traders", "Escrow Payments", "Real-time Matching", "Digital Reports", "ISO Partners", "24/7 Global Ops"];

  return (
    <section className="bg-[#060a12] py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        <div ref={headerRef} className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-12 sm:mb-16">
          <div style={{ opacity: headerVis ? 1 : 0, transform: headerVis ? "none" : "translateY(32px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-blue-500" />
              <span className="text-blue-400 text-xs font-bold tracking-[0.18em] uppercase">Global Reach</span>
            </div>
            <h2
              className="font-black text-white leading-[1.04] tracking-tight mb-5"
              style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
            >
              A Truly Global
              <br />
              <span className="text-gray-600">Marketplace.</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-md">
              Trusted by 500+ businesses across 6 continents. Real inspections, verified partners, guaranteed payments.
            </p>
          </div>

          <div style={{ opacity: headerVis ? 1 : 0, transform: headerVis ? "none" : "translateY(32px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 150ms" }}>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {networkTags.map((tag, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  <span className="text-gray-400 text-sm">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={mapRef}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden mb-10 sm:mb-14"
          style={{
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
            opacity: headerVis ? 1 : 0,
            transform: headerVis ? "scale(1)" : "scale(0.97)",
            transition: "all 1s cubic-bezier(0.16,1,0.3,1) 200ms",
          }}
        >
          {dims.w > 0 && <WorldMap width={dims.w} height={dims.h} />}

          <div
            className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{ background: "rgba(6,10,18,0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="w-2 h-2 rounded-full bg-green-400" style={{ animation: "gmBlink 2s infinite" }} />
            <span className="text-white text-xs font-semibold">Live</span>
          </div>

          <div
            className="absolute bottom-0 left-0 right-0 flex flex-wrap gap-2 sm:gap-3 justify-center items-center px-4 py-4 sm:py-5"
            style={{ background: "linear-gradient(to top, rgba(6,10,18,1) 0%, rgba(6,10,18,0.95) 50%, transparent 100%)", paddingTop: 48 }}
          >
            {[{ v: "20 Active Cities" }, { v: "6 Continents" }, { v: "Real-time Queries" }].map(({ v }, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                <span className="text-white text-xs sm:text-sm font-semibold">{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 border-t pt-10 sm:pt-12" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          {[
            { target: 10000, suffix: "+", label: "Global Traders", delay: 0, duration: 1800 },
            { target: 2500, suffix: "+", label: "Inspection Partners", delay: 100, duration: 1600 },
            { target: 50, suffix: "+", label: "Countries", delay: 200, duration: 1200 },
            { target: 500, suffix: "+", label: "Businesses Served", delay: 300, duration: 1400 },
          ].map(props => <CountStat key={props.label} {...props} active={statsVis} />)}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 sm:mt-10 pt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <p className="text-gray-500 text-sm">
            Active across every major trade corridor — from <span className="text-gray-300 font-medium">Europe to Asia</span>, Americas to Africa.
          </p>
          <button className="flex items-center gap-2 text-blue-400 text-sm font-bold hover:text-blue-300 transition-colors group self-start sm:self-auto">
            Explore the network
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 transition-transform group-hover:translate-x-1">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes gmBlink { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
      `}</style>
    </section>
  );
}