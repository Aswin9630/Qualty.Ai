// import React, { useEffect, useState } from "react";
// import { COMPANY_API } from "../../../utils/constants";
// import Shimmer from "../../../components/ShimmerUI";
// import { useNavigate } from "react-router-dom";

// export default function CompanyHistory() {
//   const [bids, setBids] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await fetch(`${COMPANY_API}/history`, { credentials: "include" });
//         const data = await res.json();
       
//         if (res.ok) setBids(data.bids || []);
//         else { console.error(data.message || "Failed to load"); setBids([]); }
//       } catch (err) {
//         console.error("Network error");
//         setBids([]);
//       }
//     })();
//   }, []);

//   if (bids === null) {
//     return (
//       <div className="min-h-screen bg-white px-6 py-10">
//         <Shimmer className="h-8 w-1/3 rounded mb-6" />
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <Shimmer className="h-28 rounded" />
//           <Shimmer className="h-28 rounded" />
//           <Shimmer className="h-28 rounded" />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white px-6 py-10">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-2xl font-bold mb-6">My Bid History</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {bids.map((b) => {
//             const { enquiry } = b;
//             return (
//               <div key={b._id} className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
//                 <p className="text-sm text-gray-500 mb-1"><strong>Commodity:</strong> {enquiry?.commodity || enquiry?.category}</p>
//                 <p className="text-sm text-gray-500 mb-1"><strong>Location:</strong> {enquiry?.location || enquiry?.inspectionLocation}</p>
//                 <p className="text-sm text-gray-500 mb-1"><strong>Inspection Date:</strong> {new Date(enquiry?.dateFrom).toLocaleDateString()} → {new Date(enquiry?.dateTo).toLocaleDateString()}</p>
//                 <p className="text-sm text-gray-500 mb-1"><strong>Bid Amount:</strong> ₹{b.amount}</p>
//                 <p className="text-sm text-gray-500 mb-3"><strong>Status:</strong> {b.status}</p>
//                 <button
//                   onClick={() => navigate(`/inspection_company/history/${b._id}`)}
//                   className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-900 cursor-pointer"
//                 >
//                   View Details
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }





import React, { useEffect, useState } from "react";
import { COMPANY_API } from "../../../utils/constants";
import Shimmer from "../../../components/ShimmerUI";
import { useNavigate } from "react-router-dom";
import { MapPin, Package, Calendar, Wallet, CheckCircle2, XCircle, Clock, ChevronRight, History } from "lucide-react";

export default function CompanyHistory() {
  const [bids, setBids] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${COMPANY_API}/history`, { credentials: "include" });
        const data = await res.json();
        if (res.ok) setBids(data.bids || []);
        else { console.error(data.message || "Failed to load"); setBids([]); }
      } catch (err) {
        console.error("Network error");
        setBids([]);
      }
    })();
  }, []);

  const statusConfig = {
    won: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500", icon: <CheckCircle2 size={12} /> },
    lost: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200", dot: "bg-red-400", icon: <XCircle size={12} /> },
    pending: { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-200", dot: "bg-gray-400", icon: <Clock size={12} /> },
  };

  if (bids === null) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-6xl mx-auto">
          <Shimmer className="h-8 w-1/3 rounded-xl mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => <Shimmer key={i} className="h-48 rounded-2xl" />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">Activity</p>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Bid History</h1>
            {bids.length > 0 && (
              <span className="px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs font-bold text-gray-500">
                {bids.length} bid{bids.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>

        {bids.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <History size={24} className="text-gray-400" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">No bid history yet</h3>
            <p className="text-sm text-gray-500">Your completed and active bids will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {bids.map((b) => {
              const { enquiry } = b;
              const sc = statusConfig[b.status] || statusConfig.pending;
              const sym = enquiry?.currency === "INR" ? "₹" : "$";

              return (
                <div
                  key={b._id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className={`h-1 w-full ${b.status === "won" ? "bg-emerald-400" : b.status === "lost" ? "bg-red-300" : "bg-gray-200"}`} />

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-gray-950 flex items-center justify-center flex-shrink-0">
                          <Package size={16} className="text-white" />
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase mb-0.5">Commodity</p>
                          <h3 className="text-sm font-bold text-gray-900 truncate max-w-[120px]">
                            {enquiry?.commodity || enquiry?.category || "—"}
                          </h3>
                        </div>
                      </div>

                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${sc.bg} ${sc.text} ${sc.border}`}>
                        {sc.icon}
                        {String(b.status || "").toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-2.5 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin size={13} className="text-gray-400 flex-shrink-0" />
                        <span className="text-xs text-gray-500 truncate">{enquiry?.location || enquiry?.inspectionLocation || "—"}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar size={13} className="text-gray-400 flex-shrink-0" />
                        <span className="text-xs text-gray-500">
                          {enquiry?.dateFrom ? new Date(enquiry.dateFrom).toLocaleDateString() : "—"} → {enquiry?.dateTo ? new Date(enquiry.dateTo).toLocaleDateString() : "—"}
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3 mb-4 border border-gray-100">
                      <p className="text-[9px] font-semibold tracking-wider text-gray-400 uppercase mb-0.5">Bid Amount</p>
                      <p className="text-base font-bold text-gray-900">{sym}{b.amount}</p>
                    </div>

                    <div className="mt-auto">
                      <button
                        onClick={() => navigate(`/inspection_company/history/${b._id}`)}
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
}