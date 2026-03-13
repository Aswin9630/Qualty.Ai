import { useState } from "react";
import { useInView } from "../Hooks/useInView";
import { IconSearch, IconBid, IconReport, IconCheck } from "../components/Icons";

const steps = [
  {
    num: "01",
    Icon: IconSearch,
    title: "Choose Active Queries",
    subtitle: "Browse & Filter",
    desc: "Browse verified inspection enquiries matching your expertise and location. Filter by industry, budget, timeline, and certification requirements to find the perfect fit.",
    points: [
      "Verified trader profiles with audit history",
      "Industry-specific query categories",
      "Location-based smart filtering",
      "Real-time query notifications",
    ],
    visual: <QueryDashboard />,
  },
  {
    num: "02",
    Icon: IconBid,
    title: "Submit Your Quote",
    subtitle: "Bid Competitively",
    desc: "Place competitive quotes aligned with trader budgets. Showcase your certifications, turnaround time, and unique capabilities to win inspection contracts.",
    points: [
      "Transparent budget visibility",
      "Highlight your certifications",
      "Custom quote builder",
      "Instant bid confirmation",
    ],
    visual: <BidInterface />,
  },
  {
    num: "03",
    Icon: IconReport,
    title: "Inspect & Report",
    subtitle: "Deliver & Get Paid",
    desc: "Conduct thorough inspections, communicate real-time updates, and submit structured digital reports with photos, checklists, and verified documentation.",
    points: [
      "Live progress communication",
      "Structured digital checklists",
      "Photo evidence upload",
      "Automatic payment release",
    ],
    visual: <ReportDashboard />,
  },
];

function QueryDashboard() {
  const items = [
    { tag: "Electronics", country: "Germany", budget: "$2,400", status: "Open", dot: "#22c55e" },
    { tag: "Textiles", country: "United States", budget: "$1,800", status: "Open", dot: "#22c55e" },
    { tag: "Auto Parts", country: "Japan", budget: "$3,200", status: "New", dot: "#3b82f6" },
    { tag: "Machinery", country: "South Korea", budget: "$4,100", status: "Open", dot: "#22c55e" },
  ];
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
        <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">Active Queries</span>
        <span className="text-xs bg-blue-50 text-blue-600 font-semibold px-2.5 py-1 rounded-full">24 new</span>
      </div>
      <div className="divide-y divide-gray-50">
        {items.map((q, i) => (
          <div key={i} className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ background: q.dot }} />
              <div>
                <div className="text-gray-900 font-semibold text-sm">{q.tag}</div>
                <div className="text-gray-400 text-xs mt-0.5">{q.country}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-gray-900 font-bold text-sm font-mono">{q.budget}</div>
              <div className="text-xs mt-0.5 text-gray-400">{q.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BidInterface() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-50">
        <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">Submit Quote</span>
      </div>
      <div className="p-5">
        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <div className="text-xs text-gray-400 mb-1 font-medium">Your Bid Amount</div>
          <div className="text-3xl font-black text-gray-900 font-mono">$2,100</div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
            <div className="bg-gray-900 h-1.5 rounded-full" style={{ width: "65%" }} />
          </div>
          <div className="flex justify-between text-gray-400 text-xs mt-1.5">
            <span>Min $1,200</span>
            <span>Budget $3,200</span>
          </div>
        </div>
        <div className="space-y-2 mb-4">
          {["ISO 9001 Certified", "2-day turnaround", "Digital reports included", "On-site photography"].map((f, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div className="w-4 h-4 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-2.5 h-2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="text-gray-600 text-sm">{f}</span>
            </div>
          ))}
        </div>
        <button className="w-full bg-gray-900 text-white rounded-xl py-3 text-sm font-bold hover:bg-gray-800 transition-colors">
          Submit Quote
        </button>
      </div>
    </div>
  );
}

function ReportDashboard() {
  const checks = [
    { label: "Pre-shipment check", done: true },
    { label: "Sample collection", done: true },
    { label: "Lab analysis", done: true },
    { label: "Final documentation", done: false },
  ];
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
        <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">Inspection Report</span>
        <span className="text-xs bg-amber-50 text-amber-600 font-semibold px-2.5 py-1 rounded-full">75% Done</span>
      </div>
      <div className="p-5">
        <div className="w-full bg-gray-100 rounded-full h-2 mb-5">
          <div className="bg-gray-900 h-2 rounded-full" style={{ width: "75%" }} />
        </div>
        <div className="divide-y divide-gray-50 mb-4">
          {checks.map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-2.5">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: item.done ? "#1a1a2e" : "transparent", border: item.done ? "none" : "2px solid #e5e7eb" }}
              >
                {item.done && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-3 h-3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <span className={`text-sm ${item.done ? "text-gray-900 font-medium" : "text-gray-400"}`}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [titleRef, titleVisible] = useInView(0.2);

  return (
    <section id="how-it-works" className="py-28 px-6 bg-white">
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
            <span className="text-gray-600 text-xs font-semibold tracking-widest uppercase">How It Works</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-4 leading-[1.1]">
            Quality Inspections
            <br />
            <span className="text-gray-400">Made Simple</span>
          </h2>
          <p className="text-gray-500 text-lg">Three steps to start earning from global inspection contracts.</p>
        </div>

        <div className="flex gap-3 mb-10 overflow-x-auto pb-2">
          {steps.map((s, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className="flex items-center gap-3 px-5 py-3.5 rounded-2xl font-semibold text-sm transition-all whitespace-nowrap flex-shrink-0"
              style={{
                background: activeStep === i ? "#1a1a2e" : "#f9fafb",
                color: activeStep === i ? "white" : "#6b7280",
                border: activeStep === i ? "none" : "1px solid #f3f4f6",
                boxShadow: activeStep === i ? "0 8px 24px rgba(26,26,46,0.25)" : "none",
                transform: activeStep === i ? "scale(1.02)" : "scale(1)",
              }}
            >
              <span className="font-mono text-xs opacity-60">{s.num}</span>
              {s.title}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div
            key={activeStep}
            style={{ animation: "fadeSlideIn 0.4s cubic-bezier(0.16,1,0.3,1)" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-gray-900/30">
                {(() => { const Icon = steps[activeStep].Icon; return <Icon className="w-5 h-5" />; })()}
              </div>
              <div>
                <div className="text-xs text-gray-400 font-semibold tracking-widest uppercase">
                  {steps[activeStep].subtitle}
                </div>
                <div className="text-gray-900 font-black text-xl">{steps[activeStep].title}</div>
              </div>
            </div>

            <p className="text-gray-600 text-base leading-relaxed mb-8">
              {steps[activeStep].desc}
            </p>

            <div className="space-y-3">
              {steps[activeStep].points.map((pt, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3"
                  style={{
                    animation: `fadeSlideIn 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms both`,
                  }}
                >
                  <div className="w-6 h-6 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" className="w-3 h-3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm font-medium">{pt}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-10">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className="rounded-full transition-all"
                  style={{
                    width: activeStep === i ? 28 : 8,
                    height: 8,
                    background: activeStep === i ? "#1a1a2e" : "#e5e7eb",
                  }}
                />
              ))}
              <button
                onClick={() => setActiveStep((p) => (p + 1) % steps.length)}
                className="ml-2 flex items-center gap-1 text-gray-400 text-xs font-medium hover:text-gray-700 transition-colors"
              >
                Next
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>

          <div
            key={`visual-${activeStep}`}
            className="lg:mt-0"
            style={{ animation: "fadeSlideIn 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s both" }}
          >
            <div
              className="rounded-3xl p-6"
              style={{ background: "linear-gradient(145deg, #f3f6ff 0%, #eff2ff 100%)", border: "1px solid rgba(74,111,165,0.1)" }}
            >
              {steps[activeStep].visual}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
