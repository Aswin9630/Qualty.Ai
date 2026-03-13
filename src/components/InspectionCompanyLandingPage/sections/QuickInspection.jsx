import { useState } from "react";
import { useInView } from "../Hooks/useInView";
import { Link, useNavigate } from "react-router";

const PILLARS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Instant Match",
    desc: "Customers find your services the moment they search — no bidding delays.",
    accent: "#1a1a2e",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "24-Hour Payout",
    desc: "Complete the job, receive payment directly to your bank the same day.",
    accent: "#1a1a2e",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: "3× More Reach",
    desc: "Quick Inspection listings appear first — ahead of standard bid results.",
    accent: "#1a1a2e",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
    title: "Free to List",
    desc: "Set your price, publish your services, and start earning with zero upfront cost.",
    accent: "#1a1a2e",
  },
];

const STEPS = [
  { num: "01", label: "Set your area", detail: "Choose your city and service radius. We show you only relevant inspection queries." },
  { num: "02", label: "Add services & pricing", detail: "List exactly what you offer and your fixed rate. No negotiation required." },
  { num: "03", label: "Get matched", detail: "When traders search your area, your profile appears at the top of results instantly." },
  { num: "04", label: "Get paid in 24 hrs", detail: "Submit your report and receive payment directly to your bank within 24 hours." },
];

const TRUST_BADGES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    label: "Verified customers only",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    label: "Transparent pricing",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    label: "Cancel anytime",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    label: "No commission on quick jobs",
  },
];

export default function QuickInspection() {
  const [activeStep, setActiveStep] = useState(0);
  const [headerRef, headerVis] = useInView(0.1);
  const [pillarsRef, pillarsVis] = useInView(0.1);
  const [stepsRef, stepsVis] = useInView(0.1);
  const [ctaRef, ctaVis] = useInView(0.15);
  const navigate = useNavigate()

  return (
    <section
      className="py-16 sm:py-24 px-4 sm:px-6"
      style={{ background: "linear-gradient(180deg,#ffffff 0%,#f5f8ff 50%,#f0f4ff 100%)" }}
    >
      <div className="max-w-7xl mx-auto">

        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14"
          style={{
            opacity: headerVis ? 1 : 0,
            transform: headerVis ? "translateY(0)" : "translateY(28px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div>
            <div className="inline-flex items-center gap-2 bg-gray-900 rounded-full px-4 py-1.5 mb-5">
              <svg viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" className="w-3 h-3">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              <span className="text-[10px] font-black text-white uppercase tracking-[0.15em]">
                Quick Inspection
              </span>
            </div>

            <h2
              className="font-black tracking-tight text-gray-900 leading-[1.06] mb-4"
              style={{ fontSize: "clamp(30px, 4.5vw, 52px)" }}
            >
              List your services.
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg,#1a1a2e 0%,#4a6fa5 50%,#1a1a2e 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Get paid within 24 hours.
              </span>
            </h2>

            <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-lg">
              Stop waiting on bids. Add your inspection service once — when customers nearby
              search, they find and hire you directly. Faster work, predictable income.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            {["Free to list", "No upfront cost", "Instant activation"].map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3.5 py-1.5 shadow-sm"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-xs font-semibold text-gray-600">{tag}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={pillarsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6"
        >
          {PILLARS.map(({ icon, title, desc }, i) => (
            <div
              key={title}
              className="group bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
              style={{
                boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                opacity: pillarsVis ? 1 : 0,
                transform: pillarsVis ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
                transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms`,
              }}
            >
              <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-gray-900 flex items-center justify-center text-gray-600 group-hover:text-white transition-all duration-300 mb-4 shrink-0">
                {icon}
              </div>
              <p className="text-sm font-black text-gray-900 mb-2 leading-tight">{title}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div
          className="grid lg:grid-cols-2 gap-4 mb-6"
        >
          <div
            ref={stepsRef}
            className="bg-white border border-gray-100 rounded-2xl overflow-hidden"
            style={{
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              opacity: stepsVis ? 1 : 0,
              transform: stepsVis ? "translateY(0)" : "translateY(28px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div className="px-6 pt-6 pb-4 border-b border-gray-100">
              <p className="text-xs font-black text-gray-400 uppercase tracking-[0.14em] mb-1">How it works</p>
              <p className="text-lg font-black text-gray-900 leading-tight">Four steps to your first payout</p>
            </div>

            <div className="divide-y divide-gray-100">
              {STEPS.map((step, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className="w-full text-left px-6 py-4 flex items-start gap-4 hover:bg-gray-50 transition-colors duration-150 group"
                >
                  <div
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black transition-all duration-300"
                    style={{
                      background: activeStep === i ? "#1a1a2e" : "#f3f4f6",
                      color: activeStep === i ? "white" : "#6b7280",
                    }}
                  >
                    {step.num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-black leading-tight mb-1 transition-colors duration-200"
                      style={{ color: activeStep === i ? "#1a1a2e" : "#374151" }}
                    >
                      {step.label}
                    </p>
                    <div
                      className="overflow-hidden transition-all duration-500"
                      style={{ maxHeight: activeStep === i ? 80 : 0, opacity: activeStep === i ? 1 : 0 }}
                    >
                      <p className="text-xs text-gray-400 leading-relaxed pt-0.5">{step.detail}</p>
                    </div>
                  </div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-4 h-4 text-gray-300 shrink-0 mt-0.5 transition-transform duration-200"
                    style={{ transform: activeStep === i ? "rotate(90deg)" : "rotate(0deg)" }}
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              ))}
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <div className="flex gap-1.5">
                {STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className="h-1 rounded-full transition-all duration-300"
                    style={{
                      width: activeStep === i ? 24 : 8,
                      background: activeStep === i ? "#1a1a2e" : "#d1d5db",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            className="bg-gray-900 rounded-2xl overflow-hidden relative flex flex-col"
            style={{
              boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
              opacity: stepsVis ? 1 : 0,
              transform: stepsVis ? "translateY(0)" : "translateY(28px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 120ms",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.025) 1px,transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)" }}
            />

            <div className="relative z-10 flex-1 px-7 py-7 sm:px-8 sm:py-8 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-3 py-1.5 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ animation: "qiPulse 2s infinite" }} />
                  <span className="text-[10px] font-bold text-white/70 uppercase tracking-[0.14em]">
                    Paying directly to your bank
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight mb-3">
                  Zero commission
                  <br />
                  <span className="text-gray-400">on every quick job.</span>
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
                  Unlike standard bids, Quick Inspection jobs carry no platform commission.
                  Every rupee your customer pays goes straight to you.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { label: "Avg. first job", value: "< 48hrs" },
                    { label: "Payout speed", value: "24 hrs" },
                    { label: "Commission", value: "0%" },
                    { label: "Listing cost", value: "Free" },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="bg-white/5 border border-white/8 rounded-xl px-4 py-3"
                    >
                      <div className="text-xl font-black text-white leading-none mb-1">{value}</div>
                      <div className="text-[11px] text-gray-500 font-medium">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {TRUST_BADGES.map(({ icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 bg-white/6 border border-white/8 rounded-full px-3 py-1.5"
                  >
                    <span className="text-gray-400">{icon}</span>
                    <span className="text-[11px] font-semibold text-gray-400">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          ref={ctaRef}
          className="bg-white border border-gray-100 rounded-2xl px-6 sm:px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
          style={{
            boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
            opacity: ctaVis ? 1 : 0,
            transform: ctaVis ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div className="flex-1 min-w-0">
            <p className="text-base font-black text-gray-900 mb-1">
              Ready to get your first quick inspection job?
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              It takes less than 5 minutes to set up your profile and go live.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-gray-400">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span className="text-xs text-gray-400 font-medium">
                Free to list · No commission on quick jobs
              </span>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes qiPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}