// import React, { useState } from "react";
// import { COMPANY_API, getCurrencySymbol } from "../../../utils/constants";
// import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { placeBidSuccess } from "../../../redux/slice/companySlice/companyBidSlice";

// export default function CompanyBidCard({ enquiry }) {
//   const dispatch = useDispatch();
//   const [amount, setAmount] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showFullRequirement, setShowFullRequirement] = useState(false);

//   const truncateRequirement = (text, limit = 5) => {
//   if (!text) return "";
//   return text.length > limit ? text.slice(0, limit) + "..." : text;
// };

//   const {
//     _id,
//     commodity,
//     category,
//     subcategory,
//     urgency,
//     inspectionBudget,
//     currency,
//     location,
//     volume,
//     dateFrom,
//     dateTo,
//     contact,
//     otherRequirements
//   } = enquiry;

//   const handleBid = async () => {
//     const bidAmount = Number(amount);
//     if (!bidAmount || bidAmount <= 0) return toast.error("Enter a valid bid amount");
//     try {
//       setLoading(true);
//       const res = await fetch(`${COMPANY_API}/bid/${_id}`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount: bidAmount }),
//       });
//       const data = await res.json();
//       if (res.ok && data.success) {
//         dispatch(placeBidSuccess(data.bid));
//         toast.success(data.message || "Bid placed successfully");
//         setAmount("");
//       } else {
//         toast.error(data.message || "Failed to place bid");
//       }
//     } catch (err) {
//       toast.error("Network error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
//       <div className="space-y-1 text-sm text-gray-700 mb-4">
//         {contact?.name && <p><span className="font-medium text-gray-500">Customer:</span> <span className="text-black">{contact.name}</span></p>}
//         <p><span className="font-medium text-gray-500">Commodity:</span> <span className="text-black">{commodity || category}</span></p>
//         <p><span className="font-medium text-gray-500">Subcategory:</span> <span className="text-black">{subcategory || "—"}</span></p>
//         <p><span className="font-medium text-gray-500">Location:</span> <span className="text-black">{location || "—"}</span></p>
// {enquiry.otherRequirements && (
//   <p>
//     <span className="font-medium text-gray-500">Requirement:</span>{" "}
//     <span className="text-black">
//       {showFullRequirement
//         ? otherRequirements
//         : truncateRequirement(otherRequirements, 5)}
//     </span>

//     {otherRequirements.length > 5 && (
//       <button
//         onClick={() => setShowFullRequirement((prev) => !prev)}
//         className="ml-2 text-blue-600 text-xs font-medium hover:underline cursor-pointer"
//       >
//         {showFullRequirement ? "Read less" : "Read more"}
//       </button>
//     )}
//   </p>
// )}

//         <p><span className="font-medium text-gray-500">Urgency:</span> <span className={`font-semibold ${urgency === "High" ? "text-red-500" : "text-yellow-500"}`}>{urgency || "—"}</span></p>
//         <p><span className="font-medium text-gray-500">Budget:</span> <span className="text-green-600 font-semibold">{currency==="INR"?"₹":"$"}{inspectionBudget}/-</span></p>
//         <p><span className="font-medium text-gray-500">Volume:</span> <span className="text-black">{volume || "—"}</span></p>
//         <p><span className="font-medium text-gray-500">Date:</span> <span className="text-black">{dateFrom ? new Date(dateFrom).toLocaleDateString() : "—"} → {dateTo ? new Date(dateTo).toLocaleDateString() : "—"}</span></p>
//       </div>

//       <div className="flex gap-2">
//         <input
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           placeholder={`${getCurrencySymbol(currency)} Enter bid`}
//           className="border border-gray-300 px-3 py-2 rounded-md w-full text-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
//         />
//         <button
//           onClick={handleBid}
//           disabled={loading || enquiry.hasPlacedBid}
//           className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 cursor-pointer ${
//             enquiry.hasPlacedBid
//               ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//               : "bg-black text-white hover:bg-gray-900"
//           }`}
//         >
//           {enquiry.hasPlacedBid ? "Bid Placed" : loading ? "Placing…" : "Place Bid"}
//         </button>
//       </div>
//     </div>
//   );
// }



import React, { useState } from "react";
import { COMPANY_API, getCurrencySymbol } from "../../../utils/constants";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { placeBidSuccess } from "../../../redux/slice/companySlice/companyBidSlice";
import { MapPin, Package, Tag, AlertTriangle, Calendar, Ruler, User, FileText, CheckCircle2, ChevronRight } from "lucide-react";

export default function CompanyBidCard({ enquiry }) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFullRequirement, setShowFullRequirement] = useState(false);

  const truncateRequirement = (text, limit = 5) => {
    if (!text) return "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  const {
    _id, commodity, category, subcategory, urgency, inspectionBudget,
    currency, location, volume, dateFrom, dateTo, contact, otherRequirements,
  } = enquiry;

  const handleBid = async () => {
    const bidAmount = Number(amount);
    if (!bidAmount || bidAmount <= 0) return toast.error("Enter a valid bid amount");
    try {
      setLoading(true);
      const res = await fetch(`${COMPANY_API}/bid/${_id}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: bidAmount }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        dispatch(placeBidSuccess(data.bid));
        toast.success(data.message || "Bid placed successfully");
        setAmount("");
      } else {
        toast.error(data.message || "Failed to place bid");
      }
    } catch (err) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  const sym = currency === "INR" ? "₹" : "$";

  const urgencyConfig = {
    High: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200", dot: "bg-red-500", bar: "bg-red-50" },
    Medium: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200", dot: "bg-amber-400", bar: "bg-amber-50" },
    Low: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", dot: "bg-emerald-500", bar: "bg-emerald-50" },
  };
  
  const uc = urgencyConfig[urgency] || urgencyConfig.Low;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
      <div className={`h-1 w-full ${uc.bar}`} />

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gray-950 flex items-center justify-center flex-shrink-0">
              <Package size={16} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase mb-0.5">Commodity</p>
              <h3 className="text-sm font-bold text-gray-900">{commodity || category || "—"}</h3>
            </div>
          </div>

          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border flex-shrink-0 ${uc.bg} ${uc.text} ${uc.border}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${uc.dot} ${urgency === "High" ? "animate-pulse" : ""}`} />
            {urgency || "—"}
          </span>
        </div>

        <div className="space-y-2.5 mb-4">
          {contact?.name && (
            <div className="flex items-center gap-2">
              <User size={13} className="text-gray-400 flex-shrink-0" />
              <span className="text-xs text-gray-500">Customer:</span>
              <span className="text-xs font-semibold text-gray-900">{contact.name}</span>
            </div>
          )}

          {subcategory && (
            <div className="flex items-center gap-2">
              <Tag size={13} className="text-gray-400 flex-shrink-0" />
              <span className="text-xs text-gray-500">Subcategory:</span>
              <span className="text-xs font-semibold text-gray-900">{subcategory}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <MapPin size={13} className="text-gray-400 flex-shrink-0" />
            <span className="text-xs text-gray-500">Location:</span>
            <span className="text-xs font-semibold text-gray-900 truncate">{location || "—"}</span>
          </div>

          {volume && (
            <div className="flex items-center gap-2">
              <Ruler size={13} className="text-gray-400 flex-shrink-0" />
              <span className="text-xs text-gray-500">Volume:</span>
              <span className="text-xs font-semibold text-gray-900">{volume}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Calendar size={13} className="text-gray-400 flex-shrink-0" />
            <span className="text-xs text-gray-500">Date:</span>
            <span className="text-xs font-semibold text-gray-900">
              {dateFrom ? new Date(dateFrom).toLocaleDateString() : "—"} → {dateTo ? new Date(dateTo).toLocaleDateString() : "—"}
            </span>
          </div>

          {otherRequirements && (
            <div className="flex items-start gap-2">
              <FileText size={13} className="text-gray-400 flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-xs text-gray-500">Requirement: </span>
                <span className="text-xs font-semibold text-gray-900">
                  {showFullRequirement ? otherRequirements : truncateRequirement(otherRequirements, 5)}
                </span>
                {otherRequirements.length > 5 && (
                  <button
                    onClick={() => setShowFullRequirement((prev) => !prev)}
                    className="ml-1.5 text-blue-600 text-[10px] font-bold hover:underline cursor-pointer"
                  >
                    {showFullRequirement ? "Read less" : "Read more"}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-50 rounded-xl p-3 mb-4 flex items-center justify-between border border-gray-100">
          <div>
            <p className="text-[9px] font-semibold tracking-wider text-gray-400 uppercase mb-0.5">Customer Budget</p>
            <p className="text-base font-bold text-gray-900">{sym}{inspectionBudget}/-</p>
          </div>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${uc.bg} border ${uc.border}`}>
            <AlertTriangle size={14} className={uc.text} />
          </div>
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
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={`${getCurrencySymbol(currency)} Enter bid`}
                className="border border-gray-200 bg-gray-50 px-3 py-2.5 rounded-xl flex-1 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all placeholder:text-gray-400 placeholder:font-normal"
              />
              <button
                onClick={handleBid}
                disabled={loading}
                className="px-4 py-2.5 rounded-xl bg-gray-950 hover:bg-gray-800 text-white text-xs font-bold flex items-center gap-1.5 transition-all duration-200 cursor-pointer disabled:opacity-60 whitespace-nowrap"
              >
                {loading ? (
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Place Bid <ChevronRight size={13} /></>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}