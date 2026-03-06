import { useNavigate } from "react-router-dom";
import {
  Zap,
  ArrowRight,
  BadgeCheck,
  Clock3,
  Banknote,
  BarChart3,
  ChevronRight,
  IndianRupee,
} from "lucide-react";

const PILLARS = [
  {
    icon: Zap,
    title: "Instant Match",
    desc: "Customers find your services the moment they search — no bidding delays.",
  },
  {
    icon: Clock3,
    title: "24-Hour Payout",
    desc: "Complete the job, receive payment directly to your bank the same day.",
  },
  {
    icon: BarChart3,
    title: "3× More Reach",
    desc: "Quick Inspection listings appear first — ahead of standard bid results.",
  },
  {
    icon: Banknote,
    title: "Free to List",
    desc: "Set your price, publish your services, and start earning with zero upfront cost.",
  },
];

const STEPS = [
    "Set your area",
  "Add services & pricing",
  "Get matched",
  "Get paid in 24 hrs",
];

export default function QuickInspectionBanner() {
  const navigate = useNavigate();

  return (
    <div className="w-full mb-6">
      <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">

        <div className="flex flex-col lg:flex-row">

          <div className="flex-1 px-7 py-7 sm:px-8 sm:py-8 border-b lg:border-b-0 lg:border-r border-gray-100">

            <div className="inline-flex items-center gap-2 bg-gray-900 rounded-full px-3 py-1 mb-5">
              <Zap size={10} className="text-white" strokeWidth={2.5} fill="white" />
              <span className="text-[10px] font-bold text-white uppercase tracking-[0.12em]">
                Quick Inspection
              </span>
            </div>

            <h2 className="text-2xl sm:text-[28px] font-black text-gray-900 leading-[1.15] tracking-tight mb-3">
              List your services.
              <br />
              <span className="text-gray-400 font-black">Get paid within 24 hours.</span>
            </h2>

            <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-md">
              Stop waiting on bids. Add your inspection service once — when customers nearby
              search, they find and hire you directly. Faster work, predictable income.
            </p>

            <div className="flex items-center gap-2 mb-7 flex-wrap">
              {STEPS.map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-[18px] h-[18px] rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                      <span className="text-[9px] font-black text-white leading-none">{i + 1}</span>
                    </span>
                    <span className="text-[11px] font-semibold text-gray-600 whitespace-nowrap">
                      {step}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <ChevronRight size={11} className="text-gray-300 shrink-0" strokeWidth={2} />
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <button
                onClick={() => navigate("/inspection_company/quick-inspection")}
                className="group inline-flex items-center gap-2.5 bg-gray-900 hover:bg-gray-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-150 cursor-pointer"
              >
                <Zap size={14} strokeWidth={2.5} fill="white" />
                Add My Services
                <ArrowRight
                  size={14}
                  strokeWidth={2.5}
                  className="group-hover:translate-x-0.5 transition-transform duration-150"
                />
              </button>

              <div className="flex items-center gap-1.5">
                <BadgeCheck size={13} className="text-gray-400" strokeWidth={2} />
                <span className="text-xs text-gray-400 font-medium">
                  Free to list · No commission on quick jobs
                </span>
              </div>
            </div>
          </div>

          <div className="lg:w-[340px] shrink-0">

            <div className="grid grid-cols-2 divide-x divide-y divide-gray-100 h-full">
              {PILLARS.map(({ icon: Icon, title, desc }, i) => (
                <div
                  key={title}
                  className="px-5 py-5 flex flex-col gap-3 hover:bg-gray-50 transition-colors duration-150 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-gray-900 flex items-center justify-center transition-colors duration-150 shrink-0">
                    <Icon
                      size={14}
                      className="text-gray-500 group-hover:text-white transition-colors duration-150"
                      strokeWidth={1.75}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-900 mb-1">{title}</p>
                    <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        <div className="border-t border-gray-100 bg-gray-50 px-7 sm:px-8 py-3 flex flex-wrap items-center gap-x-5 gap-y-1.5">
          <div className="flex items-center gap-1.5 shrink-0">
            <IndianRupee size={11} className="text-gray-400" strokeWidth={2} />
            <span className="text-[11px] font-semibold text-gray-500">
              Paying directly to your bank
            </span>
          </div>
          <div className="w-px h-3 bg-gray-200 hidden sm:block" />
          {["Verified customers only", "Transparent pricing", "Cancel anytime"].map((b) => (
            <span key={b} className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-400">
              <BadgeCheck size={11} strokeWidth={2} />
              {b}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}