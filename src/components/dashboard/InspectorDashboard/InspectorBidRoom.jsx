// import { useDispatch, useSelector } from "react-redux";
// import useFetchEnquiries from "../../../hooks/useFetchEnquiries";
// import { BASE_URL, getCurrencySymbol } from "../../../utils/constants";
// import { addPlaceBid } from "../../../redux/slice/bidSlice";
// import { toast } from "react-toastify";
// import { useState } from "react";
// import { BadgeCheck } from "lucide-react";


// const InspectorBidRoom = () => {
//   useFetchEnquiries();
//   const dispatch = useDispatch();
//   const enquiries = useSelector((state) => state.enquiry.raisedEnquiry);
//   console.log("enq",enquiries)

//   const isArray = Array.isArray(enquiries);
//   const [bidAmounts, setBidAmounts] = useState({});
//   const [expandedRequirements, setExpandedRequirements] = useState({});

//   const truncateText = (text, limit = 5) => {
//   if (!text) return "";
//   return text.length > limit ? text.slice(0, limit) + "..." : text;
// };


//   const handleAmountChange = (id, value) => {
//     setBidAmounts((prev) => ({ ...prev, [id]: value }));
//   };

//   const handleBid = async (id) => {
//     const bidAmount = Number(bidAmounts[id]);
//     if (!bidAmount || bidAmount <= 0) return alert("Enter a valid bid amount");

//     try {
//       const response = await fetch(`${BASE_URL}/inspector/bid/${id}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ amount: bidAmount }),
//       });

//       const data = await response.json();
//       if (response.ok && data.success) {
//         dispatch(addPlaceBid(data.bid));
//         toast.success(data.message);
//         setBidAmounts((prev) => ({ ...prev, [id]: "" }));
//       } else {
//         toast.error(data.message || "Bid failed");
//       }
//     } catch (err) {
//       console.error("Bid error:", err);
//       toast.error("Error placing bid");
//     }
//   };


//   return (
//     <div className="min-h-screen bg-white px-6 py-10">
//       <div className="max-w-7xl mx-auto space-y-10">
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-bold text-black">Bidding Room</h1>
//             <p className="text-sm text-gray-500 mt-1">
//               {isArray ? enquiries.length : 0} inspection opportunities available
//             </p>
//           </div>
//         </div>

//         {!isArray ? (
//           <p className="text-center text-gray-500">Loading enquiries...</p>
//         ) : enquiries.length === 0 ? (
//           <p className="text-center text-gray-500">No live enquiries available</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {enquiries.map((enquiry) => {
//               const isVerified =
//     enquiry.contact?.gstVerified === true ||
//     enquiry.contact?.gstVerified === "true" ||
//     enquiry.contact?.publishRequirements === true;
//     return (
//         <div
//                 key={enquiry._id}
//                 className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
//               >
//                 <div className="flex justify-between items-center mb-2">
//                   <h2 className="text-lg font-semibold text-black">
//                     {enquiry.category || "—"}
//                   </h2>
//                   <span
//                     className={`text-xs font-medium px-2 py-1 rounded-full ${
//                       enquiry.urgency === "High"
//                         ? "bg-red-100 text-red-600"
//                         : enquiry.urgency === "Medium"
//                         ? "bg-yellow-100 text-yellow-600"
//                         : "bg-green-100 text-green-600"
//                     }`}
//                   >
//                     {enquiry.urgency || "—"}
//                   </span>
//                 </div>

//                 <p className="text-sm text-gray-600 mb-1">
//                   <strong>Location:</strong>{" "}
//                   <span className="text-black">{enquiry.location || "—"}</span>
//                 </p>
//                 <p className="text-sm text-gray-600 mb-1">
//                   <strong>Customer:</strong>{" "}
//                   <span className="text-black">{enquiry.contact?.name || "—"}</span>
//                 </p>
//                 <p className="text-sm text-gray-600 mb-1">
//                   <strong>Inspection Type:</strong>{" "}
//                   <span className="text-black">
//                     {enquiry.physicalInspection ? "Physical" : ""}
//                     {enquiry.physicalInspection && enquiry.chemicalInspection ? ", " : ""}
//                     {enquiry.chemicalInspection ? "Chemical" : ""}
//                     {!enquiry.physicalInspection && !enquiry.chemicalInspection ? "—" : ""}
//                   </span>
//                 </p>
//                 <p className="text-sm text-gray-600 mb-1">
//   <strong>Budget:</strong>{" "}
//   <span className="text-green-600 font-semibold">
//     {getCurrencySymbol(enquiry.country)} {enquiry.inspectionBudget || "—"}
//   </span>
// </p>
//                 <p className="text-sm text-gray-600 mb-1">
//                   <strong>Deadline:</strong>{" "}
//                   <span className="text-black">
//                     {enquiry.dateTo
//                       ? new Date(enquiry.dateTo).toLocaleDateString()
//                       : "Not specified"}
//                   </span>
//                 </p>
//                 <p className="text-sm text-gray-600 mb-2">
//                   <strong>Volume:</strong>{" "}
//                   <span className="text-black">{enquiry.volume || "—"}</span>
//                 </p> 

//                  {enquiry.otherRequirements && (
//   <p className="text-sm text-gray-600 mb-2">
//     <strong>Requirements:</strong>{" "}
//     <span className="text-black">
//       {expandedRequirements[enquiry._id]
//         ? enquiry.otherRequirements
//         : truncateText(enquiry.otherRequirements, 5)}
//     </span>

//     {enquiry.otherRequirements.length > 5 && (
//       <button
//         onClick={() =>
//           setExpandedRequirements((prev) => ({
//             ...prev,
//             [enquiry._id]: !prev[enquiry._id],
//           }))
//         }
//         className="ml-2 text-blue-600 text-xs font-medium hover:underline cursor-pointer"
//       >
//         {expandedRequirements[enquiry._id] ? "Read less" : "Read more"}
//       </button>
//     )}
//   </p>
// )}
//                 <div className="mt-4 flex gap-2 font-normal text-sm">
//                   <input
//                     type="number"
//                     value={bidAmounts[enquiry._id] || ""}
//                     onChange={(e) =>
//                       handleAmountChange(enquiry._id, e.target.value)
//                     }
//                     placeholder="Your bid (₹)"
//                     className="no-spinner bg-white border border-gray-300 text-black px-2 py-1 rounded-md w-full outline-none focus:ring-2 focus:ring-black text-sm"
//                     disabled={enquiry.hasPlacedBid}
//                   />
//                   <button
//                     onClick={() => handleBid(enquiry._id)}
//                     disabled={enquiry.hasPlacedBid}
//                     className={`px-3 py-1 rounded-md text-sm font-semibold transition-all duration-200 ${
//                       enquiry.hasPlacedBid
//                         ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                         : "bg-black text-white cursor-pointer hover:bg-gray-700"
//                     }`}
//                   >
//                     {enquiry.hasPlacedBid ? "Bid Placed" : "Place Bid"}
//                   </button>
//                 </div>
//               </div>
//     )})}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InspectorBidRoom;




import { useDispatch, useSelector } from "react-redux";
import useFetchEnquiries from "../../../hooks/useFetchEnquiries";
import { BASE_URL, getCurrencySymbol } from "../../../utils/constants";
import { addPlaceBid } from "../../../redux/slice/bidSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import { BadgeCheck } from "lucide-react";
import { MapPin, Package, User, Calendar, Ruler, FileText, Wallet, Zap, CheckCircle2, ChevronRight, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";

const InspectorBidRoom = () => {
  useFetchEnquiries();
  const dispatch = useDispatch();
  const enquiries = useSelector((state) => state.enquiry.raisedEnquiry);

  const isArray = Array.isArray(enquiries);
  const [bidAmounts, setBidAmounts] = useState({});
  const [expandedRequirements, setExpandedRequirements] = useState({});

  const truncateText = (text, limit = 5) => {
    if (!text) return "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  const handleAmountChange = (id, value) => {
    setBidAmounts((prev) => ({ ...prev, [id]: value }));
  };

  const handleBid = async (id) => {
    const bidAmount = Number(bidAmounts[id]);
    if (!bidAmount || bidAmount <= 0) return alert("Enter a valid bid amount");
    try {
      const response = await fetch(`${BASE_URL}/inspector/bid/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ amount: bidAmount }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        dispatch(addPlaceBid(data.bid));
        toast.success(data.message);
        setBidAmounts((prev) => ({ ...prev, [id]: "" }));
      } else {
        toast.error(data.message || "Bid failed");
      }
    } catch (err) {
      console.error("Bid error:", err);
      toast.error("Error placing bid");
    }
  };

  const urgencyConfig = {
    High: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200", dot: "bg-red-500", bar: "bg-red-400" },
    Medium: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200", dot: "bg-amber-400", bar: "bg-amber-400" },
    Low: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", dot: "bg-emerald-500", bar: "bg-emerald-400" },
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">Inspector</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Bidding Room</h1>
            <p className="text-sm text-gray-500 mt-1">
              {isArray ? enquiries.length : 0} inspection {isArray && enquiries.length === 1 ? "opportunity" : "opportunities"} available
            </p>
          </div>
          {isArray && enquiries.length > 0 && (
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-gray-700">Live</span>
            </div>
          )}
        </div>

        {!isArray ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
            <div className="w-10 h-10 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm font-semibold text-gray-600">Loading enquiries…</p>
          </div>
        ) : enquiries.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Zap size={24} className="text-gray-400" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">No live enquiries</h3>
            <p className="text-sm text-gray-500">New inspection opportunities will appear here when available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {enquiries.map((enquiry) => {
              const isVerified =
                enquiry.contact?.gstVerified === true ||
                enquiry.contact?.gstVerified === "true" ||
                enquiry.contact?.publishRequirements === true;
              const uc = urgencyConfig[enquiry.urgency] || urgencyConfig.Low;

              return (
                <div
                  key={enquiry._id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className={`h-1 w-full ${uc.bar}`} />

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-gray-950 flex items-center justify-center flex-shrink-0">
                          <Package size={15} className="text-white" />
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase mb-0.5">Category</p>
                          <h2 className="text-sm font-bold text-gray-900">{enquiry.category || "—"}</h2>
                        </div>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${uc.bg} ${uc.text} ${uc.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${uc.dot} ${enquiry.urgency === "High" ? "animate-pulse" : ""}`} />
                        {enquiry.urgency || "—"}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin size={13} className="text-gray-400 flex-shrink-0" />
                        <span className="text-xs text-gray-600 truncate">{enquiry.location || "—"}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <User size={13} className="text-gray-400 flex-shrink-0" />
                        <span className="text-xs text-gray-600">
                          {enquiry.contact?.name || "—"}
                          {isVerified && (
                            <span className="ml-1.5 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[9px] font-bold">
                              <BadgeCheck size={9} /> Verified
                            </span>
                          )}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Zap size={13} className="text-gray-400 flex-shrink-0" />
                        <span className="text-xs text-gray-600">
                          {enquiry.physicalInspection ? "Physical" : ""}
                          {enquiry.physicalInspection && enquiry.chemicalInspection ? ", " : ""}
                          {enquiry.chemicalInspection ? "Chemical" : ""}
                          {!enquiry.physicalInspection && !enquiry.chemicalInspection ? "—" : ""}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar size={13} className="text-gray-400 flex-shrink-0" />
                        <span className="text-xs text-gray-600">
                          Deadline: {enquiry.dateTo ? new Date(enquiry.dateTo).toLocaleDateString() : "Not specified"}
                        </span>
                      </div>

                      {enquiry.volume && (
                        <div className="flex items-center gap-2">
                          <Ruler size={13} className="text-gray-400 flex-shrink-0" />
                          <span className="text-xs text-gray-600">{enquiry.volume}</span>
                        </div>
                      )}

                      {enquiry.otherRequirements && (
                        <div className="flex items-start gap-2">
                          <FileText size={13} className="text-gray-400 flex-shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <span className="text-xs text-gray-600">
                              {expandedRequirements[enquiry._id]
                                ? enquiry.otherRequirements
                                : truncateText(enquiry.otherRequirements, 5)}
                            </span>
                            {enquiry.otherRequirements.length > 5 && (
                              <button
                                onClick={() =>
                                  setExpandedRequirements((prev) => ({
                                    ...prev,
                                    [enquiry._id]: !prev[enquiry._id],
                                  }))
                                }
                                className="ml-1.5 text-blue-600 text-[10px] font-bold hover:underline cursor-pointer inline-flex items-center gap-0.5"
                              >
                                {expandedRequirements[enquiry._id] ? <><ChevronUp size={10} />less</> : <><ChevronDown size={10} />more</>}
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3 mb-4 border border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="text-[9px] font-semibold tracking-wider text-gray-400 uppercase mb-0.5">Budget</p>
                        <p className="text-base font-bold text-emerald-600">{getCurrencySymbol(enquiry.country)}{enquiry.inspectionBudget || "—"}/-</p>
                      </div>
                      <Wallet size={16} className="text-gray-300" />
                    </div>

                    <div className="mt-auto">
                      {enquiry.hasPlacedBid ? (
                        <div className="w-full py-3 px-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center justify-center gap-2">
                          <CheckCircle2 size={14} /> Bid Placed
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <input
                            type="number"
                            value={bidAmounts[enquiry._id] || ""}
                            onChange={(e) => handleAmountChange(enquiry._id, e.target.value)}
                            placeholder="Your bid"
                            className="no-spinner border border-gray-200 bg-gray-50 px-3 py-2.5 rounded-xl flex-1 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all placeholder:text-gray-400 placeholder:font-normal"
                          />
                          <button
                            onClick={() => handleBid(enquiry._id)}
                            className="px-4 py-2.5 rounded-xl bg-gray-950 hover:bg-gray-800 text-white text-xs font-bold flex items-center gap-1.5 transition-all duration-200 cursor-pointer whitespace-nowrap"
                          >
                            Bid <ChevronRight size={13} />
                          </button>
                        </div>
                      )}
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

export default InspectorBidRoom;