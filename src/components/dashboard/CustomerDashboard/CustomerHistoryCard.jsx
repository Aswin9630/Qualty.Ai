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
