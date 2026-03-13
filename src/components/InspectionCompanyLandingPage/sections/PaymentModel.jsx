import { useInView } from "../Hooks/useInView";
import { IconAdvance, IconPayment, IconExpand } from "../components/Icons";

const cards = [
  {
    Icon: IconAdvance,
    pct: "20%",
    title: "Advance on Analysis",
    desc: "Receive 20% advance payment while conducting your quality analysis — secured and confirmed before you begin work.",
    color: "#f0f4ff",
    accent: "#4a6fa5",
  },
  {
    Icon: IconPayment,
    pct: "100%",
    title: "Full Payment on Report",
    desc: "100% guaranteed payment upon submitting your completed inspection report. No delays, no disputes, no exceptions.",
    color: "#f8f9fa",
    accent: "#1a1a2e",
    featured: true,
  },
  {
    Icon: IconExpand,
    pct: "Global",
    title: "Expand Business Worldwide",
    desc: "Grow your inspection business to international markets with zero upfront investment. New countries, new clients.",
    color: "#f0f7f4",
    accent: "#2d6a4f",
  },
];

export default function PaymentModel() {
  const [titleRef, titleVisible] = useInView(0.2);

  return (
    <section id="what-you-get" className="py-28 px-6 bg-white">
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
          <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-gray-600 text-xs font-semibold tracking-widest uppercase">
              Payment Model
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-4 leading-[1.1]">
            No Credit —
            <br />
            <span className="text-gray-400">Assured Payment Model</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-lg mx-auto">
            Every inspection is backed by a guaranteed payment structure. You focus on quality, we handle the rest.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map(({ Icon, pct, title, desc, color, accent, featured }, i) => {
            const [ref, visible] = useInView(0.15);
            return (
              <div
                key={i}
                ref={ref}
                className="relative rounded-3xl p-8 overflow-hidden group cursor-default"
                style={{
                  background: featured
                    ? "linear-gradient(145deg, #1a1a2e 0%, #2d3561 100%)"
                    : color,
                  border: featured ? "none" : "1px solid rgba(0,0,0,0.06)",
                  boxShadow: featured
                    ? "0 20px 60px rgba(26,26,46,0.25)"
                    : "0 4px 24px rgba(0,0,0,0.05)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(40px)",
                  transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 150}ms`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background: featured ? "rgba(255,255,255,0.1)" : "white",
                    color: featured ? "white" : accent,
                    boxShadow: featured ? "none" : "0 2px 12px rgba(0,0,0,0.08)",
                  }}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <div
                  className="text-5xl font-black mb-3 tracking-tight"
                  style={{ color: featured ? "white" : accent }}
                >
                  {pct}
                </div>

                <h3
                  className="font-bold text-lg mb-3"
                  style={{ color: featured ? "white" : "#1a1a2e" }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: featured ? "rgba(255,255,255,0.6)" : "#6b7280" }}
                >
                  {desc}
                </p>

                <div
                  className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
                  style={{ background: featured ? "white" : accent }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
