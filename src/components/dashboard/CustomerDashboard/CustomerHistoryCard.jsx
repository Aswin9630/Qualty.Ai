// import { FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
// import { useNavigate } from "react-router";

// export default function CustomerHistoryCard({ enquiry }) {
//   const {
//     _id,
//     title,
//     status,
//     category,
//     location,
//     date,
//     cost,
//     bidClosed,
//     savings,
//     currency,
//   } = enquiry;

//   const navigate = useNavigate();

//   const statusColor = {
//     completed: "bg-green-100 text-green-800",
//     "in progress": "bg-yellow-100 text-yellow-800",
//     pending: "bg-gray-200 text-gray-800",
//     cancelled: "bg-gray-300 text-gray-600",
//   };

//   const cardStyle =
//     status.toLowerCase() === "cancelled"
//       ? "bg-gray-100 text-gray-500 border border-gray-300"
//       : "bg-white text-black border border-gray-200";

//   return (
//     <div
//       className={`${cardStyle} p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300`}
//     >
//       <div className="flex justify-between items-center mb-2">
//         <h3 className="text-base font-semibold truncate">{title}</h3>
//         <span
//           className={`px-2 py-0.5 text-xs font-medium rounded-full ${
//             statusColor[status.toLowerCase()] || "bg-gray-100 text-gray-800"
//           }`}
//         >
//           {status.toUpperCase()}
//         </span>
//       </div>

//       <div className="text-xs space-y-1 mb-3">
//         <p>
//           <strong>Category:</strong> {category}
//         </p>
//         <p>
//           <strong>Location:</strong>{" "}
//           <FaMapMarkerAlt className="inline mr-1 text-gray-400" />
//           {location}
//         </p>
//         <p>
//           <strong>Date:</strong> {new Date(date).toLocaleDateString()}
//         </p>
//         <p>
//           <strong>Cost:</strong> {currency === "INR" ? "₹" : "$"}
//           {cost}
//         </p>
//         <p>
//           <strong>Bid Closed:</strong> {currency === "INR" ? "₹" : "$"}
//           {bidClosed}
//         </p>
//         <p>
//           <strong>Savings:</strong> {currency === "INR" ? "₹" : "$"}
//           {savings}
//         </p>
//       </div>

//       <button
//         onClick={() => navigate(`/customer/enquiry/${_id}`)}
//         className={`w-full cursor-pointer px-3 py-1.5 rounded text-xs font-medium flex items-center justify-center gap-1 transition duration-200 shadow-sm
//           ${
//             status.toLowerCase() === "cancelled"
//               ? "bg-gray-300 text-gray-600 cursor-not-allowed"
//               : "bg-black text-white hover:bg-gray-900"
//           }`}
//         // disabled={status.toLowerCase() === "cancelled"}
//       >
//         <FaCheckCircle />
//         View Details
//       </button>
//     </div>
//   );
// }



import { useNavigate } from "react-router";

export default function CustomerHistoryCard({ enquiry }) {
  const {
    _id,
    title,
    status,
    category,
    location,
    date,
    cost,
    bidClosed,
    savings,
    currency,
  } = enquiry;

  const navigate = useNavigate();

  const isCancelled = status.toLowerCase() === "cancelled";
  const isCompleted = status.toLowerCase() === "completed";

  const statusConfig = {
    completed: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
    "in progress": { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-500" },
    pending: { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-200", dot: "bg-gray-400" },
    cancelled: { bg: "bg-gray-100", text: "text-gray-500", border: "border-gray-200", dot: "bg-gray-400" },
  };

  const sc = statusConfig[status.toLowerCase()] || statusConfig.pending;
  const sym = currency === "INR" ? "₹" : "$";

  return (
    <div
      className={`relative rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-400 overflow-hidden flex flex-col ${
        isCancelled
          ? "bg-gray-50 border-gray-200"
          : "bg-white border-gray-100"
      }`}
    >
      <div className={`h-0.5 w-full ${isCompleted ? "bg-emerald-400" : isCancelled ? "bg-gray-300" : "bg-amber-400"}`} />

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${isCancelled ? "bg-gray-200" : "bg-gray-950"}`}>
              <svg className={`w-4 h-4 ${isCancelled ? "text-gray-400" : "text-white"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
              </svg>
            </div>
            <h3 className={`text-sm font-bold truncate ${isCancelled ? "text-gray-400" : "text-gray-900"}`}>{title}</h3>
          </div>

          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border flex-shrink-0 ${sc.bg} ${sc.text} ${sc.border}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${sc.dot} ${status.toLowerCase() === "in progress" ? "animate-pulse" : ""}`} />
            {status.toUpperCase()}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
            </svg>
            <span className={`text-xs font-medium ${isCancelled ? "text-gray-400" : "text-gray-600"}`}>{category}</span>
          </div>

          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span className={`text-xs font-medium truncate ${isCancelled ? "text-gray-400" : "text-gray-600"}`}>{location}</span>
          </div>

          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
            </svg>
            <span className={`text-xs font-medium ${isCancelled ? "text-gray-400" : "text-gray-600"}`}>{new Date(date).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className={`rounded-xl p-2.5 text-center ${isCancelled ? "bg-gray-100" : "bg-gray-50"}`}>
            <p className="text-[9px] font-semibold tracking-wider text-gray-400 uppercase mb-0.5">Cost</p>
            <p className={`text-xs font-bold ${isCancelled ? "text-gray-400" : "text-gray-900"}`}>{sym}{cost}</p>
          </div>
          <div className={`rounded-xl p-2.5 text-center ${isCancelled ? "bg-gray-100" : "bg-gray-50"}`}>
            <p className="text-[9px] font-semibold tracking-wider text-gray-400 uppercase mb-0.5">Closed</p>
            <p className={`text-xs font-bold ${isCancelled ? "text-gray-400" : "text-gray-900"}`}>{sym}{bidClosed}</p>
          </div>
          <div className={`rounded-xl p-2.5 text-center ${isCancelled ? "bg-gray-100" : isCompleted ? "bg-emerald-50" : "bg-gray-50"}`}>
            <p className={`text-[9px] font-semibold tracking-wider uppercase mb-0.5 ${isCancelled ? "text-gray-400" : isCompleted ? "text-emerald-500" : "text-gray-400"}`}>Savings</p>
            <p className={`text-xs font-bold ${isCancelled ? "text-gray-400" : isCompleted ? "text-emerald-700" : "text-gray-900"}`}>{sym}{savings}</p>
          </div>
        </div>

        <div className="mt-auto">
          <button
            onClick={() => navigate(`/customer/enquiry/${_id}`)}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
              isCancelled
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gray-950 text-white hover:bg-gray-800 shadow-sm hover:shadow-md"
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}