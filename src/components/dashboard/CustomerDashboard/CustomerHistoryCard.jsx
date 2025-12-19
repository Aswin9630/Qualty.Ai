// import { FaMapMarkerAlt, FaUserTie, FaCheckCircle } from "react-icons/fa";
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
//     currency
//   } = enquiry;

//   console.log("currency",currency); 

//   const navigate = useNavigate();

//   const statusColor = {
//     completed: "bg-green-100 text-green-800",
//     "in progress": "bg-yellow-100 text-yellow-800",
//     pending: "bg-gray-200 text-gray-800",
//   };

//   return (
//     <div className="bg-white text-black p-6 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
//       <div className="flex justify-between items-center mb-3">
//         <h3 className="text-lg font-bold">{title}</h3>
//         <span 
//           className={`px-3 py-1 text-xs font-semibold rounded-full ${
//             statusColor[status.toLowerCase()] || "bg-gray-100 text-gray-800"
//           } shadow-sm`}
//         > 
//           {status.toUpperCase()}
//         </span> 
//       </div> 

//       <div className="text-sm text-gray-700 space-y-1 mb-4">
//         <p><strong>Category:</strong> {category}</p>
//         <p> 
//           <strong>Location:</strong>{" "}
//           <FaMapMarkerAlt className="inline mr-1 text-gray-500" />
//           {location}
//         </p> 
//         <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
//         <p><strong>Cost:</strong> {currency==="INR"?"₹":"$"}{cost}</p>
//         <p><strong>Bid Closed:</strong> {currency==="INR"?"₹":"$"}{bidClosed}</p>
//         <p><strong>Savings:</strong> {currency==="INR"?"₹":"$"}{savings}</p>
//       </div>

//       <button
//         onClick={() => navigate(`/customer/enquiry/${_id}`)}
//         className="w-full cursor-pointer bg-black text-white px-4 py-2 rounded font-semibold text-sm hover:bg-gray-900 transition duration-200 flex items-center justify-center gap-2 shadow hover:shadow-md"
//       >
//         <FaCheckCircle />
//         View Details
//       </button>
//     </div>
//   );
// }



import { FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
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

  const statusColor = {
    completed: "bg-green-100 text-green-800",
    "in progress": "bg-yellow-100 text-yellow-800",
    pending: "bg-gray-200 text-gray-800",
    cancelled: "bg-gray-300 text-gray-600",
  };

  const cardStyle =
    status.toLowerCase() === "cancelled"
      ? "bg-gray-100 text-gray-500 border border-gray-300"
      : "bg-white text-black border border-gray-200";

  return (
    <div
      className={`${cardStyle} p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-base font-semibold truncate">{title}</h3>
        <span
          className={`px-2 py-0.5 text-xs font-medium rounded-full ${
            statusColor[status.toLowerCase()] || "bg-gray-100 text-gray-800"
          }`}
        >
          {status.toUpperCase()}
        </span>
      </div>

      <div className="text-xs space-y-1 mb-3">
        <p>
          <strong>Category:</strong> {category}
        </p>
        <p>
          <strong>Location:</strong>{" "}
          <FaMapMarkerAlt className="inline mr-1 text-gray-400" />
          {location}
        </p>
        <p>
          <strong>Date:</strong> {new Date(date).toLocaleDateString()}
        </p>
        <p>
          <strong>Cost:</strong> {currency === "INR" ? "₹" : "$"}
          {cost}
        </p>
        <p>
          <strong>Bid Closed:</strong> {currency === "INR" ? "₹" : "$"}
          {bidClosed}
        </p>
        <p>
          <strong>Savings:</strong> {currency === "INR" ? "₹" : "$"}
          {savings}
        </p>
      </div>

      <button
        onClick={() => navigate(`/customer/enquiry/${_id}`)}
        className={`w-full cursor-pointer px-3 py-1.5 rounded text-xs font-medium flex items-center justify-center gap-1 transition duration-200 shadow-sm
          ${
            status.toLowerCase() === "cancelled"
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-900"
          }`}
        // disabled={status.toLowerCase() === "cancelled"}
      >
        <FaCheckCircle />
        View Details
      </button>
    </div>
  );
}
