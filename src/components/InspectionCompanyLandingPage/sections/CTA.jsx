import { useInView } from "../Hooks/useInView";
import { Link } from "react-router-dom";

export default function CTA() {
  const [ref, visible] = useInView(0.2);

  return (
    <section className="py-28 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div
          ref={ref}
          className="relative rounded-3xl overflow-hidden text-center px-8 py-20"
          style={{
            background: "linear-gradient(145deg, #1a1a2e 0%, #2d3561 50%, #1a1a2e 100%)",
            boxShadow: "0 40px 100px rgba(26,26,46,0.35)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/3 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-white/3 blur-3xl" />

          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 rounded-full bg-green-400" style={{ animation: "pulse 2s infinite" }} />
              <span className="text-white/70 text-xs font-semibold tracking-widest uppercase">
                Now Accepting Partners
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-[1.05]">
              Ready to Transform
              <br />
              <span className="text-white/50">Your Global Quality</span>
              <br />
              Inspection Business?
            </h2>

            <p className="text-white/50 text-xl mb-12 max-w-xl mx-auto leading-relaxed">
              Join thousands of quality partners offering services to millions of traders worldwide.
            </p>

            <div className="flex flex-col items-center gap-4">
              <Link to="/login">
              <button className="bg-white text-gray-900 font-black px-12 py-5 rounded-2xl hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 text-lg shadow-xl shadow-black/30 flex items-center gap-2">
                Start for Free
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              </Link>
              <div className="flex items-center gap-2 text-white/30 text-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                100% free platform — No credit card required
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}
