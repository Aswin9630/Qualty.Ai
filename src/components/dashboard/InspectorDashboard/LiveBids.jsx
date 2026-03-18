// import React from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { getCurrencySymbol } from "../../../utils/constants";

// const LiveBids = () => {
//   const raisedEnquiries = useSelector((state) => state.enquiry.raisedEnquiry);
//   const navigate = useNavigate();

//   const limitedEnquiries = (raisedEnquiries || [])
//     .filter(
//       (e) =>
//         e.category &&
//         e.subcategory &&
//         e.commodity &&
//         e.location &&
//         e.inspectionBudget
//     )
//     .slice(0, 2);

//   return (
//     <section className="bg-white text-black p-6 rounded-xl shadow-md max-w-4xl mx-auto border border-gray-200">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">Live Bids</h2>
//         <span className="text-sm text-gray-500">
//           {raisedEnquiries?.length || 0} Active Bids
//         </span>
//       </div>

//       <section className="space-y-4">
//         {limitedEnquiries.length === 0 ? (
//           <p className="text-gray-500">No live enquiries available</p>
//         ) : (
//           limitedEnquiries.map((bid, index) => (
//             <div
//               key={bid._id || index}
//               className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm hover:shadow-md transition-all duration-300"
//             >
//               <div className="space-y-2 text-sm text-gray-700">
//                 <p>
//                   <span className="font-medium text-gray-500">Category:</span>{" "}
//                   <span className="text-black">{bid.category || "—"}</span>
//                 </p>
//                 <p>
//                   <span className="font-medium text-gray-500">Subcategory:</span>{" "}
//                   <span className="text-black">{bid.subcategory || "—"}</span>
//                 </p>
//                 <p>
//                   <span className="font-medium text-gray-500">Commodity:</span>{" "}
//                   <span className="text-black">{bid.commodity || "—"}</span>
//                 </p>
//                 <p>
//                   <span className="font-medium text-gray-500">Location:</span>{" "}
//                   <span className="text-black">{bid.location || "—"}</span>
//                 </p>
//                 <p>
//                   <span className="font-medium text-gray-500">Urgency:</span>{" "}
//                   <span
//                     className={`font-semibold ${
//                       bid.urgency === "High"
//                         ? "text-red-500"
//                         : bid.urgency === "Medium"
//                         ? "text-yellow-500"
//                         : "text-green-600"
//                     }`}
//                   >
//                     {bid.urgency || "—"}
//                   </span>
//                 </p>
//                 <p>
//                   <span className="font-medium text-gray-500">Budget:</span>{" "}
//                   <span className="text-green-600 font-semibold">
//   {getCurrencySymbol(bid.country)}{bid.inspectionBudget || "—"}/-
// </span>
//                 </p>
//               </div>

//               <div className="mt-4 md:mt-0 flex flex-col items-end gap-2 w-full md:w-auto">
//                 <button
//                   onClick={() => navigate("/inspector/bidding")}
//                   className="bg-black cursor-pointer hover:bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
//                 >
//                   View Request
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </section>

//       {raisedEnquiries?.length > 2 && (
//         <div className="mt-6 text-center">
//           <button
//             onClick={() => navigate("/inspector/bidding")}
//             className="bg-black cursor-pointer hover:bg-gray-900 px-6 py-2 rounded text-white font-medium transition-all duration-200 shadow-sm hover:shadow-md"
//           >
//             View All →
//           </button>
//         </div>
//       )}
//     </section>
//   );
// };

// export default LiveBids;






import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrencySymbol } from "../../../utils/constants";
import { MapPin, Package, Tag, AlertTriangle, Wallet, Zap, ChevronRight, ArrowRight } from "lucide-react";

const LiveBids = () => {
  const raisedEnquiries = useSelector((state) => state.enquiry.raisedEnquiry);
  const navigate = useNavigate();

  const limitedEnquiries = (raisedEnquiries || [])
    .filter((e) => e.category && e.subcategory && e.commodity && e.location && e.inspectionBudget)
    .slice(0, 2);

  const urgencyConfig = {
    High: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200", dot: "bg-red-500", bar: "bg-red-400" },
    Medium: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200", dot: "bg-amber-400", bar: "bg-amber-400" },
    Low: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", dot: "bg-emerald-500", bar: "bg-emerald-400" },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gray-950 flex items-center justify-center">
              <Zap size={15} className="text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900">Live Bids</h2>
              <p className="text-[10px] text-gray-400 font-semibold tracking-wide">Active opportunities</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 border border-gray-200">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-gray-600">{raisedEnquiries?.length || 0} Active</span>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {limitedEnquiries.length === 0 ? (
            <div className="py-10 text-center">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
                <Zap size={20} className="text-gray-400" />
              </div>
              <p className="text-sm font-semibold text-gray-600">No live enquiries available</p>
              <p className="text-xs text-gray-400 mt-1">New opportunities will appear here</p>
            </div>
          ) : (
            limitedEnquiries.map((bid, index) => {
              const uc = urgencyConfig[bid.urgency] || urgencyConfig.Low;
              return (
                <div
                  key={bid._id || index}
                  className="rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300"
                >
                  <div className={`h-1 w-full ${uc.bar}`} />
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-gray-950 flex items-center justify-center flex-shrink-0">
                          <Package size={15} className="text-white" />
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase mb-0.5">Commodity</p>
                          <h3 className="text-sm font-bold text-gray-900">{bid.commodity || "—"}</h3>
                        </div>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${uc.bg} ${uc.text} ${uc.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${uc.dot} ${bid.urgency === "High" ? "animate-pulse" : ""}`} />
                        {bid.urgency || "—"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Tag size={12} className="text-gray-400 flex-shrink-0" />
                        <span className="text-xs text-gray-500">Category: <span className="font-semibold text-gray-900">{bid.category || "—"}</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={12} className="text-gray-400 flex-shrink-0" />
                        <span className="text-xs text-gray-500 truncate">{bid.location || "—"}</span>
                      </div>
                      <div className="flex items-center gap-2 col-span-2">
                        <Wallet size={12} className="text-gray-400 flex-shrink-0" />
                        <span className="text-xs text-gray-500">Budget: <span className="font-bold text-emerald-600">{getCurrencySymbol(bid.country)}{bid.inspectionBudget || "—"}/-</span></span>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate("/inspector/bidding")}
                      className="w-full py-2.5 px-4 rounded-xl bg-gray-950 hover:bg-gray-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
                    >
                      View Request
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {raisedEnquiries?.length > 2 && (
          <div className="px-5 pb-5">
            <button
              onClick={() => navigate("/inspector/bidding")}
              className="w-full py-2.5 px-4 rounded-xl border-2 border-gray-200 hover:border-gray-950 hover:bg-gray-950 hover:text-white text-gray-700 text-xs font-bold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
            >
              View All Opportunities
              <ArrowRight size={13} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveBids;