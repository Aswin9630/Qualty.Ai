// import React, { useEffect, useState } from "react";
// import { COMPANY_API } from "../../../utils/constants";
// import Shimmer from "../../../components/ShimmerUI";

// export default function CompanyAnalysis() {
//   const [loading, setLoading] = useState(true);
//   const [analytics, setAnalytics] = useState(null);

//   useEffect(() => {
//     let mounted = true;
//     (async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`${COMPANY_API}/analysis`, { credentials: "include" });
//         const data = await res.json()
//         console.log("dashData",data)
//         if (!mounted) return;
//         if (res.ok) setAnalytics(data.analytics || {});
//       } catch (err) {
//         console.error("Analytics error:", err);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     })();
//     return () => { mounted = false; };
//   }, []);

//   if (loading) {
//     return (
//       <div className="bg-white border rounded-xl p-6 shadow-sm">
//         <Shimmer className="h-8 w-1/3 rounded mb-4" />
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <Shimmer className="h-24 rounded" />
//           <Shimmer className="h-24 rounded" />
//           <Shimmer className="h-24 rounded" />
//           <Shimmer className="h-24 rounded" />
//         </div>
//       </div>
//     );
//   }

//   if (!analytics) return null;

//   const { profile, totalBids, wonBids, totalEarnings, winRate, recentBids } = analytics;
//   const symbol = "₹";

//   return (
//     <div className="bg-white border rounded-xl p-6 shadow-sm">
//       <h2 className="text-xl font-semibold mb-4">Company Performance</h2>
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <div className="p-4 border rounded text-center">
//           <div className="text-sm text-gray-500">Total Bids</div>
//           <div className="text-2xl font-bold">{totalBids}</div>
//         </div>
//         <div className="p-4 border rounded text-center">
//           <div className="text-sm text-gray-500">Won Bids</div>
//           <div className="text-2xl font-bold">{wonBids}</div>
//         </div>
//         <div className="p-4 border rounded text-center">
//           <div className="text-sm text-gray-500">Total Earnings</div>
//           <div className="text-2xl font-bold">{symbol}{totalEarnings}</div>
//         </div>
//         <div className="p-4 border rounded text-center">
//           <div className="text-sm text-gray-500">Win Rate</div>
//           <div className="text-2xl font-bold">{winRate}%</div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="p-4 border rounded">
//           <h3 className="text-sm text-gray-600 mb-2">Company</h3>
//           <div className="text-black font-medium">{profile.companyName || profile.name}</div>
//           <div className="text-xs text-gray-500">{profile.companyEmail || profile.email}</div>
//         </div>

//         <div className="p-4 border rounded">
//           <h3 className="text-sm text-gray-600 mb-2">Recent Bids</h3>
//           <div className="space-y-2">
//             {(recentBids || []).map((b) => (
//               <div key={b._id} className="text-sm text-gray-700">
//                 <div className="font-medium text-black">{b.enquiry?.commodity || "—"}</div>
//                 <div className="text-xs">{b.enquiry?.currency==="INR"?"₹":"$"}{b.amount} • {new Date(b.createdAt).toLocaleDateString()}</div>
//               </div>
//             ))}
//             {(!recentBids || recentBids.length === 0) && <div className="text-sm text-gray-500">No recent bids</div>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }








import React, { useEffect, useState } from "react";
import { COMPANY_API } from "../../../utils/constants";
import Shimmer from "../../../components/ShimmerUI";
import {
  Gavel, Trophy, TrendingUp, Target,
  Building2, Mail, Package, Calendar,
  ArrowUpRight, BarChart2, Layers, BadgeCheck
} from "lucide-react";

const StatCard = ({ icon: Icon, label, value, iconBg, sub }) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
    <div className="flex items-start justify-between mb-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}>
        <Icon size={20} className="text-white" />
      </div>
      <ArrowUpRight size={15} className="text-gray-300 group-hover:text-gray-400 transition-colors" />
    </div>
    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-[26px] font-black text-gray-900 tracking-tight leading-none">{value}</p>
    {sub && <p className="text-xs text-gray-400 mt-1.5">{sub}</p>}
  </div>
);

const SkeletonStatCard = () => (
  <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm animate-pulse">
    <div className="flex items-start justify-between mb-4">
      <div className="w-11 h-11 bg-gray-100 rounded-xl" />
    </div>
    <div className="h-2.5 bg-gray-100 rounded w-20 mb-2.5" />
    <div className="h-7 bg-gray-100 rounded w-28 mb-1.5" />
    <div className="h-2 bg-gray-100 rounded w-24" />
  </div>
);

export default function CompanyAnalysis() {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${COMPANY_API}/analysis`, { credentials: "include" });
        const data = await res.json();
        console.log("dashData", data);
        if (!mounted) return;
        if (res.ok) setAnalytics(data.analytics || {});
      } catch (err) {
        console.error("Analytics error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => <SkeletonStatCard key={i} />)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 animate-pulse">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 bg-gray-100 rounded-lg" />
                <div className="h-3 bg-gray-100 rounded w-28" />
              </div>
              <div className="space-y-3">
                <div className="h-10 bg-gray-100 rounded-xl" />
                <div className="h-10 bg-gray-100 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!analytics) return null;

  const { profile, totalBids, wonBids, totalEarnings, winRate, recentBids } = analytics;
  const symbol = "₹";

  const stats = [
    {
      icon: Gavel,
      label: "Total Bids",
      value: totalBids ?? 0,
      iconBg: "bg-slate-400",
      sub: "All-time bids placed"
    },
    {
      icon: Trophy,
      label: "Won Bids",
      value: wonBids ?? 0,
      iconBg: "bg-slate-400",
      sub: "Successfully awarded"
    },
    {
      icon: TrendingUp,
      label: "Earnings from Bids",
      value: `${symbol}${Number(totalEarnings || 0).toLocaleString("en-IN")}`,
      iconBg: "bg-slate-400",
      sub: "Revenue from won bids"
    },
    {
      icon: Target,
      label: "Win Rate",
      value: `${winRate ?? 0}%`,
      iconBg: "bg-slate-400",
      sub: "Won vs placed"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-7 h-7 bg-gray-900 rounded-lg flex items-center justify-center shrink-0">
              <Building2 size={14} className="text-white" />
            </div>
            <p className="text-sm font-bold text-gray-800">Company Profile</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center shrink-0">
                <Building2 size={14} className="text-gray-500" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider leading-none mb-0.5">Company Name</p>
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {profile?.companyName || profile?.name || "—"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center shrink-0">
                <Mail size={14} className="text-gray-500" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider leading-none mb-0.5">Email</p>
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {profile?.companyEmail || profile?.email || "—"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-7 h-7 bg-gray-900 rounded-lg flex items-center justify-center shrink-0">
              <Layers size={14} className="text-white" />
            </div>
            <p className="text-sm font-bold text-gray-800">Recent Bids</p>
          </div>

          {(!recentBids || recentBids.length === 0) ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
                <Gavel size={20} className="text-gray-400" />
              </div>
              <p className="text-sm font-semibold text-gray-600">No recent bids</p>
              <p className="text-xs text-gray-400 mt-1">Bids you place will appear here</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {recentBids.map((b) => (
                <div
                  key={b._id}
                  className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100/80 transition"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center shrink-0">
                      <Package size={13} className="text-gray-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {b.enquiry?.commodity || "—"}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                        <Calendar size={10} />
                        {new Date(b.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "numeric"
                        })}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-gray-900 shrink-0">
                    {b.enquiry?.currency === "INR" ? "₹" : "$"}
                    {Number(b.amount || 0).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}