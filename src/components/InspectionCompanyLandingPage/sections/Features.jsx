import { useState } from "react";
import { useInView } from "../Hooks/useInView";
import { IconGlobe, IconBid, IconChat, IconReport } from "../components/Icons";

const features = [
  {
    Icon: IconGlobe,
    title: "Global Inspection Queries",
    desc: "Receive inspection requirements from verified global traders across industries — electronics, textiles, auto parts, and more. Filtered to match your expertise and location.",
    tag: "Worldwide Coverage",
  },
  {
    Icon: IconBid,
    title: "Bidding Against Budget",
    desc: "Place competitive bids aligned with trader budgets. Transparent pricing, fair competition, and no hidden fees. Win contracts based purely on merit and capability.",
    tag: "Competitive Pricing",
  },
  {
    Icon: IconChat,
    title: "Real-time Collaboration",
    desc: "Track inspection progress with instant messaging, status updates, and milestone tracking. Keep traders informed at every step of the inspection process.",
    tag: "Live Updates",
  },
  {
    Icon: IconReport,
    title: "Transparent Reports",
    desc: "Structured digital reports, photographic evidence, and immutable verification records. Every submission builds your reputation on the platform.",
    tag: "Documentation",
  },
];

function FeatureCard({ Icon, title, desc, tag, delay }) {
  const [ref, visible] = useInView(0.15);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="group relative bg-white rounded-3xl p-8 cursor-default overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: "1px solid rgba(0,0,0,0.07)",
        boxShadow: hovered
          ? "0 20px 60px rgba(0,0,0,0.1)"
          : "0 2px 20px rgba(0,0,0,0.04)",
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered
            ? "translateY(-4px)"
            : "translateY(0)"
          : "translateY(30px)",
        transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full"
        style={{
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
        style={{
          background: hovered ? "#1a1a2e" : "#f3f4f6",
          color: hovered ? "white" : "#374151",
          transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
          boxShadow: hovered ? "0 8px 24px rgba(26,26,46,0.3)" : "none",
        }}
      >
        <Icon className="w-6 h-6" />
      </div>

      <div className="inline-flex items-center bg-gray-50 text-gray-500 text-xs font-semibold px-3 py-1 rounded-full mb-3 tracking-wide border border-gray-100">
        {tag}
      </div>

      <h3 className="text-gray-900 font-bold text-xl mb-3 tracking-tight">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>

    </div>
  );
}

export default function Features() {
  const [titleRef, titleVisible] = useInView(0.2);

  return (
    <section
      className="py-28 px-6"
      style={{ background: "linear-gradient(180deg, #f8faff 0%, #f3f6ff 100%)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div
          ref={titleRef}
          className="text-center mb-16"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 mb-6 shadow-sm">
            <span className="text-gray-600 text-xs font-semibold tracking-widest uppercase">
              Platform Features
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-4 leading-[1.1]">
            Everything You Need To
            <br />
            <span className="text-gray-400">Ensure Quality at Scale</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Streamline your quality control process with cutting-edge technology and global expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
