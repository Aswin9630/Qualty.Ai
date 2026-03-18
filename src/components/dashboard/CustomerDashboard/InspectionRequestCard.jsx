// import { useState } from "react";
// import { FaMapMarkerAlt,FaTrash } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../../utils/constants";

// export default function InspectionRequestCard({ request,onDeleted  }) {
//   const {
//     _id,
//     category,
//     location,
//     urgency,
//     inspectionBudget,
//     status,
//     createdAt,
//     commodity,
//     currency
//   } = request;

//   const navigate = useNavigate();
//   const formatted = new Date(createdAt).toLocaleDateString("en-GB");
//    const [showConfirm, setShowConfirm] = useState(false);
//    const [showFullRequirements, setShowFullRequirements] = useState(false);

//   const MAX_WORDS = 10;

//   const getTruncatedText = (text) => {
//   const words = text.split(" ");
//   if (words.length <= MAX_WORDS) return text;
//   return words.slice(0, MAX_WORDS).join(" ") + "...";
// };


//   const priorityStyles = {
//     High: "bg-red-100 text-red-700 border border-red-300",
//     Medium: "bg-yellow-100 text-yellow-700 border border-yellow-300",
//     Low: "bg-green-100 text-green-700 border border-green-300",
//   };

//   const handleDelete = async () => {
//     try {
//       const res = await fetch(`${BASE_URL}/customer/cancel-enquiry/${_id}`, {
//         method: "PATCH",
//         credentials: "include",
//       });
//       const data = await res.json();
//       console.log("canceldata",data)
//       if (data.success) {
//         onDeleted(_id); 
//       }
//     } catch (err) {
//       console.error("Cancel failed", err);
//     } finally {
//       setShowConfirm(false);
//     }
//   };

//   return (
//     <div className="bg-white text-black p-5 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      
//        <button
//         onClick={() => setShowConfirm(true)}
//         className="cursor-pointer absolute top-3 right-3 text-red-500 hover:text-red-700"
//         aria-label="Delete enquiry"
//       >
//         <FaTrash />
//       </button> 
//       <div className="flex justify-between items-center mb-3">
//         <h3 className="text-lg font-semibold">Category: {category}</h3>
//         <span
//           className={`px-3 py-1 text-xs font-semibold rounded-full ${priorityStyles[urgency]}`}
//         >
//           {urgency}
//         </span>
//       </div>

//       <p className="text-sm text-gray-600 flex items-center gap-3 mb-2">
//         <FaMapMarkerAlt className="text-gray-400" />
//         {location}
//       </p>

//       <div className="text-sm text-gray-700 space-y-1 mb-4">
//         <p>
//           <strong>Budget:</strong> {currency==="INR"?"₹":"$"}{inspectionBudget}/-
//         </p>
//         <p>
//           <strong>Status:</strong>{" "}
//           <span className="text-xs px-2 py-1 rounded bg-gray-100 border border-gray-300">
//             {status}
//           </span>
//         </p>
//         <p>
//           <strong>Commodity:</strong> {commodity}
//         </p>

//        {request.otherRequirements && (
//   <p className="text-sm text-gray-700">
//     <strong>Requirements:</strong>{" "}
//     {showFullRequirements
//       ? request.otherRequirements
//       : getTruncatedText(request.otherRequirements)} 

//     {request.otherRequirements.split(" ").length > MAX_WORDS && (
//       <button
//         onClick={() => setShowFullRequirements(!showFullRequirements)}
//         className="ml-2 text-blue-600 text-xs font-medium hover:underline cursor-pointer"
//       >
//         {showFullRequirements ? "Read less" : "Read more"}
//       </button>
//     )}
//   </p>
// )}

//         <p>
//           <strong>Date of Enquiry:</strong> {formatted}
//         </p>
//       </div>

//       <div className="text-center">
//         <button
//           onClick={() => navigate(`/customer/inspection/${_id}`,{
//       state: { inspectionBudget },
//     })}
//           className="px-6 py-2 bg-black hover:bg-gray-900 text-white text-sm w-full font-medium rounded-lg cursor-pointer transition-all"
//         >
//           View Bids
//         </button>
//       </div>


//       {showConfirm && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//           <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
//             <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
//             <p className="text-sm text-gray-600 mb-6">
//               Are you sure you want to remove this enquiry? It will move to Deleted Enquiries.
//             </p>
//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={() => setShowConfirm(false)}
//                 className="cursor-pointer px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
//               >
//                 No
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="cursor-pointer px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
//               >
//                 Yes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }




import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../utils/constants";

export default function InspectionRequestCard({ request, onDeleted }) {
  const {
    _id,
    category,
    location,
    urgency,
    inspectionBudget,
    status,
    createdAt,
    commodity,
    currency,
  } = request;

  const navigate = useNavigate();
  const formatted = new Date(createdAt).toLocaleDateString("en-GB");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showFullRequirements, setShowFullRequirements] = useState(false);

  const MAX_WORDS = 10;

  const getTruncatedText = (text) => {
    const words = text.split(" ");
    if (words.length <= MAX_WORDS) return text;
    return words.slice(0, MAX_WORDS).join(" ") + "...";
  };

  const urgencyConfig = {
    High: {
      bg: "bg-red-50",
      text: "text-red-600",
      border: "border-red-200",
      dot: "bg-red-500",
      bar: "bg-red-400",
    },
    Medium: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      border: "border-amber-200",
      dot: "bg-amber-500",
      bar: "bg-amber-400",
    },
    Low: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      border: "border-emerald-200",
      dot: "bg-emerald-500",
      bar: "bg-emerald-400",
    },
  };

  const uc = urgencyConfig[urgency] || urgencyConfig.Low;

  const handleDelete = async () => {
    try {
      const res = await fetch(`${BASE_URL}/customer/cancel-enquiry/${_id}`, {
        method: "PATCH",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        onDeleted(_id);
      }
    } catch (err) {
      console.error("Cancel failed", err);
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <>
      <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col">
        <div className={`h-1 w-full ${uc.bar}`} />

        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-950 flex items-center justify-center shadow-md flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase mb-0.5">Category</p>
                <h3 className="text-base font-bold text-gray-900 leading-tight">{category}</h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${uc.bg} ${uc.text} ${uc.border}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${uc.dot}`} />
                {urgency}
              </span>
              <button
                onClick={() => setShowConfirm(true)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all duration-200 cursor-pointer"
                aria-label="Delete enquiry"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-5 text-gray-500">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span className="text-sm text-gray-600 font-medium truncate">{location}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase mb-1">Budget</p>
              <p className="text-base font-bold text-gray-900">{currency === "INR" ? "₹" : "$"}{inspectionBudget?.toLocaleString()}/-</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase mb-1">Status</p>
              <p className="text-sm font-semibold text-gray-700 capitalize">{status}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase mb-1">Commodity</p>
              <p className="text-sm font-semibold text-gray-700 truncate">{commodity}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase mb-1">Enquiry Date</p>
              <p className="text-sm font-semibold text-gray-700">{formatted}</p>
            </div>
          </div>

          {request.otherRequirements && (
            <div className="mb-5 px-3 py-3 rounded-xl bg-blue-50 border border-blue-100">
              <p className="text-[10px] font-semibold tracking-wider text-blue-400 uppercase mb-1">Requirements</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {showFullRequirements
                  ? request.otherRequirements
                  : getTruncatedText(request.otherRequirements)}
                {request.otherRequirements.split(" ").length > MAX_WORDS && (
                  <button
                    onClick={() => setShowFullRequirements(!showFullRequirements)}
                    className="ml-1.5 text-blue-600 text-xs font-semibold hover:underline cursor-pointer"
                  >
                    {showFullRequirements ? "Read less" : "Read more"}
                  </button>
                )}
              </p>
            </div>
          )}

          <div className="mt-auto">
            <button
              onClick={() =>
                navigate(`/customer/inspection/${_id}`, {
                  state: { inspectionBudget },
                })
              }
              className="w-full py-3 px-6 bg-gray-950 hover:bg-gray-800 text-white text-sm font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group-hover:shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
              </svg>
              View Bids
            </button>
          </div>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full border border-gray-100">
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Remove Enquiry?</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              This enquiry will be moved to Deleted Enquiries. This action can be reviewed later.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="cursor-pointer flex-1 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="cursor-pointer flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 font-semibold text-sm transition-all duration-200 shadow-sm"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}