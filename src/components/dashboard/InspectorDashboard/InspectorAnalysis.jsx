// import { useSelector } from "react-redux";
// import useFetchInspectorAnalytics from "../../../hooks/useFetchInspectorAnalytics";
// import ShimmerUI from "../../ShimmerUI";

// const InspectorAnalysis = () => {
//   useFetchInspectorAnalytics();
//   const { analytics, loading, error } = useSelector(
//     (state) => state.inspectorAnalysis
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white px-6 py-10">
//         <ShimmerUI />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-500 text-sm">
//         {error}
//       </div>
//     );
//   }

//   if (!analytics) return null;

//   const { profile, totalBids, wonBids, totalEarnings, winRate, recentBids } =
//     analytics;

//   const getCurrencySymbol = (currency) => (currency === "USD" ? "$" : "₹");
//   const currency = analytics.currency || "INR";
//   const symbol = getCurrencySymbol(currency);

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-10 text-black animate-fade-in">
//       <h1 className="text-3xl font-bold mb-6">Inspector Performance Overview</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//         {[
//           { label: "Total Bids", value: totalBids },
//           { label: "Won Bids", value: wonBids },
//           { label: "Total Earnings", value: `${symbol}${totalEarnings}` },
//           { label: "Win Rate", value: `${winRate}%`, color: "text-blue-600" },
//         ].map((card, i) => (
//           <div key={i} className="bg-white shadow-md rounded-xl p-5 border border-gray-200">
//             <p className="text-sm text-gray-500">{card.label}</p>
//             <h2 className={`text-2xl font-bold ${card.color || "text-black"}`}>{card.value}</h2>
//           </div>
//         ))}
//       </div>

//       <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-10">
//         <h2 className="text-xl font-semibold mb-4">Inspector Profile</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
//           <p><strong>Name:</strong> {profile.name}</p>
//           <p><strong>Email:</strong> {profile.email}</p>
//           <p><strong>Mobile:</strong> {profile.mobileNumber}</p>
//           <p><strong>Type:</strong> {profile.inspectorType}</p>
//           <p>
//             <strong>Experience:</strong>{" "}
//             {profile.commodities?.[0]?.experienceYears
//               ? `${profile.commodities[0].experienceYears} years`
//               : "—"}
//           </p>
//           <p>
//             <strong>Commodities:</strong>{" "}
//             {profile.commodities?.map((c, i) => (
//               <span key={i} className="inline-block mr-2">{c.commodity}</span>
//             ))}
//           </p>
//           <p><strong>Accepts Requests:</strong> {profile.acceptsRequests ? "Yes" : "No"}</p>
//         </div>
//       </div>

//       <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
//         <h2 className="text-xl font-semibold mb-4">Recent Bids</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm text-left text-gray-700">
//             <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
//               <tr>
//                 <th className="px-4 py-2">Enquiry</th>
//                 <th className="px-4 py-2">Amount</th>
//                 <th className="px-4 py-2">Status</th>
//                 <th className="px-4 py-2">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentBids.map((bid) => (
//                 <tr key={bid._id} className="border-t hover:bg-gray-50 transition">
//                   <td className="px-4 py-2">{bid.enquiry?.commodity}</td>
//                   <td className="px-4 py-2">{symbol} {bid.amount}</td>
//                   <td className="px-4 py-2 capitalize">{bid.status}</td>
//                   <td className="px-4 py-2">{new Date(bid.createdAt).toLocaleDateString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fade-in {
//           animation: fade-in 0.4s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default InspectorAnalysis;




import { useSelector } from "react-redux";
import useFetchInspectorAnalytics from "../../../hooks/useFetchInspectorAnalytics";
import ShimmerUI from "../../ShimmerUI";
import { TrendingUp, Award, Wallet, BarChart2, User, Mail, Phone, Tag, Package, CheckCircle2, Clock, XCircle, ChevronRight, Loader2, AlertCircle } from "lucide-react";

const InspectorAnalysis = () => {
  useFetchInspectorAnalytics();
  const { analytics, loading, error } = useSelector((state) => state.inspectorAnalysis);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={32} className="animate-spin text-gray-400 mx-auto mb-3" />
          <p className="text-sm font-semibold text-gray-600">Loading analytics…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 max-w-sm w-full text-center">
          <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={22} className="text-red-500" />
          </div>
          <p className="text-sm font-semibold text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!analytics) return null;

  const { profile, totalBids, wonBids, totalEarnings, winRate, recentBids } = analytics;
  const getCurrencySymbol = (currency) => (currency === "USD" ? "$" : "₹");
  const currency = analytics.currency || "INR";
  const symbol = getCurrencySymbol(currency);

  const statCards = [
    { label: "Total Bids", value: totalBids, icon: <BarChart2 size={18} className="text-white" />, accent: "bg-gray-950", lightBg: "bg-gray-50" },
    { label: "Won Bids", value: wonBids, icon: <Award size={18} className="text-white" />, accent: "bg-emerald-600", lightBg: "bg-emerald-50" },
    { label: "Total Earnings", value: `${symbol}${totalEarnings}`, icon: <Wallet size={18} className="text-white" />, accent: "bg-violet-600", lightBg: "bg-violet-50" },
    { label: "Win Rate", value: `${winRate}%`, icon: <TrendingUp size={18} className="text-white" />, accent: "bg-sky-600", lightBg: "bg-sky-50" },
  ];

  const statusConfig = {
    won: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500", icon: <CheckCircle2 size={11} /> },
    lost: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200", dot: "bg-red-400", icon: <XCircle size={11} /> },
    pending: { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-200", dot: "bg-gray-400", icon: <Clock size={11} /> },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">Analytics</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Performance Overview</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all duration-300 overflow-hidden relative">
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-full opacity-30 -translate-y-1/2 translate-x-1/2 ${card.lightBg}`} />
            <div className="relative">
              <div className={`w-10 h-10 rounded-xl ${card.accent} flex items-center justify-center mb-3 shadow-sm`}>
                {card.icon}
              </div>
              <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase mb-0.5">{card.label}</p>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-lg bg-gray-950 flex items-center justify-center">
            <User size={15} className="text-white" />
          </div>
          <h2 className="text-sm font-bold text-gray-900 tracking-widest uppercase">Inspector Profile</h2>
        </div>

        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          <div className="w-14 h-14 rounded-2xl bg-gray-950 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 shadow-md">
            {profile?.name?.charAt(0) || "?"}
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">{profile?.name || "—"}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{profile?.inspectorType || "Inspector"}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoCard icon={<Mail size={14} />} label="Email" value={profile?.email} />
          <InfoCard icon={<Phone size={14} />} label="Mobile" value={profile?.mobileNumber} />
          <InfoCard icon={<Tag size={14} />} label="Inspector Type" value={profile?.inspectorType} />
          <InfoCard
            icon={<Clock size={14} />}
            label="Experience"
            value={profile?.commodities?.[0]?.experienceYears ? `${profile.commodities[0].experienceYears} years` : "—"}
          />
          <InfoCard
            icon={<Package size={14} />}
            label="Commodities"
            value={profile?.commodities?.map((c) => c.commodity).join(", ") || "—"}
          />
          <InfoCard
            icon={<CheckCircle2 size={14} />}
            label="Accepts Requests"
            value={profile?.acceptsRequests ? "Yes" : "No"}
            badge
            badgeColor={profile?.acceptsRequests ? "emerald" : "gray"}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gray-950 flex items-center justify-center">
              <Clock size={15} className="text-white" />
            </div>
            <h2 className="text-sm font-bold text-gray-900 tracking-widest uppercase">Recent Bids</h2>
          </div>
          {recentBids?.length > 0 && (
            <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">{recentBids.length} bids</span>
          )}
        </div>

        <div className="overflow-x-auto -mx-2">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-4 py-2.5 text-left text-[10px] font-bold tracking-widest text-gray-400 uppercase">Enquiry</th>
                <th className="px-4 py-2.5 text-left text-[10px] font-bold tracking-widest text-gray-400 uppercase">Amount</th>
                <th className="px-4 py-2.5 text-left text-[10px] font-bold tracking-widest text-gray-400 uppercase">Status</th>
                <th className="px-4 py-2.5 text-left text-[10px] font-bold tracking-widest text-gray-400 uppercase">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentBids.map((bid) => {
                const sc = statusConfig[bid.status] || statusConfig.pending;
                return (
                  <tr key={bid._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">{bid.enquiry?.commodity || "—"}</td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-900">{symbol}{bid.amount}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${sc.bg} ${sc.text} ${sc.border}`}>
                        {sc.icon}
                        {bid.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{new Date(bid.createdAt).toLocaleDateString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, label, value, badge, badgeColor }) => (
  <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
    <div className="flex items-center gap-1.5 text-gray-400 mb-1.5">
      {icon}
      <span className="text-[10px] font-semibold tracking-wider uppercase">{label}</span>
    </div>
    {badge ? (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
        badgeColor === "emerald"
          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
          : "bg-gray-100 text-gray-600 border-gray-200"
      }`}>
        <span className={`w-1.5 h-1.5 rounded-full ${badgeColor === "emerald" ? "bg-emerald-500" : "bg-gray-400"}`} />
        {value}
      </span>
    ) : (
      <p className="text-sm font-bold text-gray-900">{value || "—"}</p>
    )}
  </div>
);

export default InspectorAnalysis;