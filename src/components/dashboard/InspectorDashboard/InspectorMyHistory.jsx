// import React, { useEffect, useState } from "react";
// import { BASE_URL } from "../../../utils/constants";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const InspectorHistory = () => {
//   const [bids, setBids] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/inspector/history`, {
//           credentials: "include",
//         });
//         const data = await res.json();

//         if (data.success && Array.isArray(data.bids)) {
//           const cleanBids = data.bids.filter((bid) => bid && bid.enquiry);
//           setBids(cleanBids);
//         } else {
//           toast.error(data.message || "Invalid response");
//         }
//       } catch (err) {
//         toast.error("Failed to load history");
//       }
//     };
//     fetchHistory();
//   }, []);

//   const formatDateRange = (from, to) => {
//     if (!from || !to) return "—";
//     try {
//       const fromDate = new Date(from).toLocaleDateString("en-IN", {
//         day: "numeric",
//         month: "short",
//         year: "numeric",
//       });
//       const toDate = new Date(to).toLocaleDateString("en-IN", {
//         day: "numeric",
//         month: "short",
//         year: "numeric",
//       });
//       return `${fromDate} → ${toDate}`;
//     } catch {
//       return "—";
//     }
//   };

//   const getUrgencyBadge = (urgency) => {
//     const base = "absolute top-3 right-3 px-2 py-1 text-xs font-semibold rounded-full";
//     if (urgency === "High") return `${base} bg-red-100 text-red-700`;
//     if (urgency === "Medium") return `${base} bg-yellow-100 text-yellow-700`;
//     return `${base} bg-gray-100 text-gray-600`;
//   };

//   return (
//     <div className="min-h-screen bg-white text-black px-6 py-10">
//       <div className="max-w-6xl mx-auto space-y-10 animate-fade-in">
//         <div className="text-center">
//           <h1 className="text-4xl font-semibold text-black mb-2 tracking-wide">
//             My Bid History
//           </h1>
//           <p className="text-gray-600 text-sm">
//             All bids placed by you as an inspector
//           </p>
//         </div>

//         {bids.length === 0 ? (
//           <p className="text-center text-gray-500">No bids placed yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {bids.map((bid) => {
//               const { _id, amount, status, enquiry } = bid;
//               if (!enquiry) return null;

//               return (
//                 <div
//                   key={_id}
//                   className="relative bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 text-sm"
//                 >
//                   <span className={getUrgencyBadge(enquiry.urgency)}>
//                     {enquiry.urgency || "—"}
//                   </span>

//                   <div className="space-y-1 text-gray-700 mb-3">
//                     <p><strong>Commodity:</strong> {enquiry.commodity || "—"}</p>
//                     <p><strong>Location:</strong> {enquiry.location || "—"}</p>
//                     <p><strong>Inspection Date:</strong> {formatDateRange(enquiry.dateFrom, enquiry.dateTo)}</p>
//                     <p><strong>Bid Amount:</strong> {enquiry.currency==="INR"?"₹":"$"}{amount ?? "—"}</p>
//                     <p><strong>Status:</strong> <span className={`font-semibold ${
//                       status === "won" ? "text-green-600" : "text-yellow-500"
//                     }`}>{status || "—"}</span></p>
//                   </div>

//                   <button
//                     onClick={() => navigate(`/inspector/enquiry/${enquiry._id}`)}
//                     className="w-full mt-2 cursor-pointer bg-black text-white text-xs font-medium px-4 py-2 rounded hover:bg-gray-800 transition"
//                   >
//                     View Details
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         .animate-fade-in {
//           animation: fadeIn 0.6s ease-out forwards;
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default InspectorHistory;




import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils/constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MapPin, Package, Calendar, Wallet, CheckCircle2, XCircle, Clock, ChevronRight, History } from "lucide-react";

const InspectorHistory = () => {
  const [bids, setBids] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`${BASE_URL}/inspector/history`, { credentials: "include" });
        const data = await res.json();
        if (data.success && Array.isArray(data.bids)) {
          const cleanBids = data.bids.filter((bid) => bid && bid.enquiry);
          setBids(cleanBids);
        } else {
          toast.error(data.message || "Invalid response");
        }
      } catch (err) {
        toast.error("Failed to load history");
      }
    };
    fetchHistory();
  }, []);

  const formatDateRange = (from, to) => {
    if (!from || !to) return "—";
    try {
      const fromDate = new Date(from).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
      const toDate = new Date(to).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
      return `${fromDate} → ${toDate}`;
    } catch { return "—"; }
  };

  const urgencyConfig = {
    High: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200", dot: "bg-red-500", bar: "bg-red-400" },
    Medium: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200", dot: "bg-amber-400", bar: "bg-amber-400" },
    Low: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", dot: "bg-emerald-500", bar: "bg-emerald-400" },
  };

  const statusConfig = {
    won: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500", icon: <CheckCircle2 size={12} />, barColor: "bg-emerald-400" },
    lost: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200", dot: "bg-red-400", icon: <XCircle size={12} />, barColor: "bg-red-300" },
    pending: { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-200", dot: "bg-gray-400", icon: <Clock size={12} />, barColor: "bg-gray-200" },
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">Inspector</p>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Bid History</h1>
            {bids.length > 0 && (
              <span className="px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-bold text-gray-500 shadow-sm">
                {bids.length} bid{bids.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">All bids placed by you as an inspector</p>
        </div>

        {bids.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <History size={24} className="text-gray-400" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">No bids placed yet</h3>
            <p className="text-sm text-gray-500">Your bid history will appear here once you start placing bids.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {bids.map((bid) => {
              const { _id, amount, status, enquiry } = bid;
              if (!enquiry) return null;

              const sc = statusConfig[status] || statusConfig.pending;
              const uc = urgencyConfig[enquiry.urgency] || urgencyConfig.Low;
              const sym = enquiry.currency === "INR" ? "₹" : "$";

              return (
                <div
                  key={_id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className={`h-1 w-full ${sc.barColor}`} />

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-gray-950 flex items-center justify-center flex-shrink-0">
                          <Package size={15} className="text-white" />
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase mb-0.5">Commodity</p>
                          <h3 className="text-sm font-bold text-gray-900 truncate max-w-[110px]">{enquiry.commodity || "—"}</h3>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1.5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${uc.bg} ${uc.text} ${uc.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${uc.dot}`} />
                          {enquiry.urgency || "—"}
                        </span>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${sc.bg} ${sc.text} ${sc.border}`}>
                          {sc.icon}
                          {String(status || "").toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin size={13} className="text-gray-400 flex-shrink-0" />
                        <span className="text-xs text-gray-600 truncate">{enquiry.location || "—"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={13} className="text-gray-400 flex-shrink-0" />
                        <span className="text-xs text-gray-600">{formatDateRange(enquiry.dateFrom, enquiry.dateTo)}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3 mb-4 border border-gray-100">
                      <p className="text-[9px] font-semibold tracking-wider text-gray-400 uppercase mb-0.5">Bid Amount</p>
                      <p className="text-base font-bold text-gray-900">{sym}{amount ?? "—"}</p>
                    </div>

                    <div className="mt-auto">
                      <button
                        onClick={() => navigate(`/inspector/enquiry/${enquiry._id}`)}
                        className="w-full py-2.5 px-4 rounded-xl bg-gray-950 hover:bg-gray-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
                      >
                        View Details
                        <ChevronRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default InspectorHistory;