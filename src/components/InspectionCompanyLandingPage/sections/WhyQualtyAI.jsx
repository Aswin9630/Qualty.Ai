// import { useInView } from "../Hooks/useInView";
// import { IconShield, IconZap, IconLock } from "../components/Icons";

// const problems = [
//   "Outdated traditional inspection methods",
//   "Fragmented, disconnected processes",
//   "Costly legacy enterprise systems",
//   "Lack of transparency & trust",
// ];

// const solutions = [
//   {
//     Icon: IconShield,
//     title: "Trust & Transparency",
//     desc: "Verified traders and inspectors with complete, immutable audit trails. Every inspection, every document, permanently recorded and accessible.",
//   },
//   {
//     Icon: IconZap,
//     title: "Streamlined Efficiency",
//     desc: "Automated workflows reduce inspection timelines by up to 60%. From initial query to final report submission in record time.",
//   },
//   {
//     Icon: IconLock,
//     title: "Secure Payments",
//     desc: "20% advance during analysis, 100% guaranteed payment after report submission. Zero payment disputes, built into the platform.",
//   },
// ];

// export default function WhyQualtyAI() {
//   const [titleRef, titleVisible] = useInView(0.2);

//   return (
//     <section
//       className="py-28 px-6"
//       style={{
//         background: "linear-gradient(145deg, #1a1a2e 0%, #2d3561 50%, #1a1a2e 100%)",
//       }}
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
//           <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
//             <span className="text-white/60 text-xs font-semibold tracking-widest uppercase">Why Qualty AI</span>
//           </div>
//           <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-5 leading-[1.1]">
//             Built for the Future
//             <br />
//             <span className="text-white/40">of Global Trade</span>
//           </h2>
//           <p className="text-white/50 text-lg max-w-2xl mx-auto">
//             Global trade requires trust, transparency, and efficiency. Traditional inspection methods are simply broken.
//           </p>
//         </div>

//         <div className="mb-14">
//           <div className="text-center mb-8">
//             <span className="text-white/30 text-sm font-semibold tracking-widest uppercase">The Problem</span>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//             {problems.map((p, i) => {
//               const [ref, visible] = useInView(0.2);
//               return (
//                 <div
//                   key={i}
//                   ref={ref}
//                   className="border border-red-500/20 bg-red-950/20 rounded-2xl p-5 text-center"
//                   style={{
//                     opacity: visible ? 1 : 0,
//                     transform: visible ? "scale(1)" : "scale(0.92)",
//                     transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 100}ms`,
//                   }}
//                 >
//                   <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-3">
//                     <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" className="w-4 h-4">
//                       <circle cx="12" cy="12" r="10" />
//                       <line x1="15" y1="9" x2="9" y2="15" />
//                       <line x1="9" y1="9" x2="15" y2="15" />
//                     </svg>
//                   </div>
//                   <span className="text-white/50 text-xs font-medium leading-snug">{p}</span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         <div className="flex items-center gap-4 mb-14">
//           <div className="flex-1 h-px bg-white/10" />
//           <div className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2">
//             <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-4 h-4">
//               <line x1="12" y1="5" x2="12" y2="19" />
//               <polyline points="19 12 12 19 5 12" />
//             </svg>
//             <span className="text-white/60 text-xs font-semibold tracking-widest uppercase">The Solution</span>
//           </div>
//           <div className="flex-1 h-px bg-white/10" />
//         </div>

//         <div className="grid md:grid-cols-3 gap-6">
//           {solutions.map(({ Icon, title, desc }, i) => {
//             const [ref, visible] = useInView(0.15);
//             return (
//               <div
//                 key={i}
//                 ref={ref}
//                 className="group bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/8 transition-all cursor-default"
//                 style={{
//                   opacity: visible ? 1 : 0,
//                   transform: visible ? "translateY(0)" : "translateY(30px)",
//                   transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 150}ms`,
//                 }}
//               >
//                 <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:bg-white/20 transition-colors">
//                   <Icon className="w-6 h-6" />
//                 </div>
//                 <h3 className="text-white font-bold text-xl mb-3">{title}</h3>
//                 <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }




import { useInView } from "../Hooks/useInView";
import { IconShield, IconZap, IconLock } from "../components/Icons";

const problems = [
  "Outdated traditional inspection methods",
  "Fragmented, disconnected processes",
  "Costly legacy enterprise systems",
  "Lack of transparency & trust",
];

const solutions = [
  {
    Icon: IconShield,
    title: "Trust & Transparency",
    stat: "100%",
    statLabel: "verified network",
    desc: "Every trader verified. Every inspector rated. Every report immutable and permanently recorded. Trust is not a feature — it is the foundation.",
  },
  {
    Icon: IconZap,
    title: "Streamlined Efficiency",
    stat: "60%",
    statLabel: "faster delivery",
    desc: "Automated workflows replace email chains and phone calls. From initial query to final report submission in record time.",
  },
  {
    Icon: IconLock,
    title: "Secure Payments",
    stat: "0",
    statLabel: "payment disputes",
    desc: "20% advance during analysis, 100% guaranteed on report submission. Your earnings are protected before work even begins.",
  },
];

function ProblemCard({ text, index }) {
  const [ref, vis] = useInView(0.2);
  return (
    <div
      ref={ref}
      className="flex items-start gap-3 p-4 sm:p-5 rounded-2xl"
      style={{
        background: "rgba(239,68,68,0.05)",
        border: "1px solid rgba(239,68,68,0.12)",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms`,
      }}
    >
      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" className="w-3.5 h-3.5">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>
      <span className="text-gray-500 text-sm leading-relaxed">{text}</span>
    </div>
  );
}

function SolutionCard({ Icon, title, stat, statLabel, desc, index }) {
  const [ref, vis] = useInView(0.15);
  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-8"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(32px)",
        transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms`,
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%)", transition: "opacity 0.4s ease" }}
      />
      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)", transition: "opacity 0.4s ease" }} />

      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="text-right">
          <div className="text-3xl sm:text-4xl font-black text-white leading-none tracking-tight">{stat}</div>
          <div className="text-gray-600 text-xs font-semibold tracking-widest uppercase mt-1">{statLabel}</div>
        </div>
      </div>

      <h3 className="text-white font-bold text-lg sm:text-xl mb-3 tracking-tight">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

export default function WhyQualtyAI() {
  const [titleRef, titleVis] = useInView(0.15);
  const [dividerRef, dividerVis] = useInView(0.3);

  return (
    <section id="why-qualtyAi" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#0a0c14]">
      <div className="max-w-7xl mx-auto">

        <div
          ref={titleRef}
          className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-end mb-14 sm:mb-20"
        >
          <div style={{ opacity: titleVis ? 1 : 0, transform: titleVis ? "none" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-white/30" />
              <span className="text-gray-500 text-xs font-bold tracking-[0.18em] uppercase">Why Qualty AI</span>
            </div>
            <h2
              className="font-black text-white leading-[1.04] tracking-tight"
              style={{ fontSize: "clamp(36px, 5vw, 68px)" }}
            >
              The industry
              <br />
              is broken.
              <br />
              <span className="italic" style={{ color: "rgba(255,255,255,0.25)" }}>We fixed it.</span>
            </h2>
          </div>

          <div style={{ opacity: titleVis ? 1 : 0, transform: titleVis ? "none" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 150ms" }}>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-6">
              Global trade demands trust, speed, and accountability. Traditional inspection methods deliver none of these.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-white/10" />
              <span className="text-gray-600 text-xs font-semibold tracking-widest uppercase">Built for the future of trade</span>
            </div>
          </div>
        </div>

        <div className="mb-10 sm:mb-14">
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
            <span className="text-gray-600 text-xs font-bold tracking-[0.16em] uppercase">The old way</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {problems.map((p, i) => <ProblemCard key={i} text={p} index={i} />)}
          </div>
        </div>

        <div
          ref={dividerRef}
          className="flex items-center gap-4 sm:gap-6 mb-10 sm:mb-14"
          style={{ opacity: dividerVis ? 1 : 0, transition: "all 0.8s ease" }}
        >
          <div className="flex-1 h-px bg-white/8" />
          <div
            className="flex items-center gap-3 rounded-full px-5 py-2.5"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" className="w-4 h-4">
              <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
            </svg>
            <span className="text-gray-400 text-xs font-bold tracking-[0.14em] uppercase">The Qualty way</span>
          </div>
          <div className="flex-1 h-px bg-white/8" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {solutions.map((s, i) => <SolutionCard key={i} {...s} index={i} />)}
        </div>

        <div
          className="mt-10 sm:mt-14 pt-8 sm:pt-10 border-t grid sm:grid-cols-3 gap-6 sm:gap-8"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          {[
            { num: "500+", label: "Businesses trust Qualty" },
            { num: "50+", label: "Countries, one platform" },
            { num: "98%", label: "Report acceptance rate" },
          ].map(({ num, label }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none">{num}</div>
              <div className="w-px h-8 bg-white/10 shrink-0" />
              <div className="text-gray-500 text-xs sm:text-sm leading-snug">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}