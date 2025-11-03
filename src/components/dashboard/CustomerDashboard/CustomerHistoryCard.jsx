import { FaMapMarkerAlt, FaUserTie, FaCheckCircle } from "react-icons/fa";
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
    inspector,
  } = enquiry;

  const navigate = useNavigate();

  const statusColor = {
    completed: "bg-green-100 text-green-800",
    "in progress": "bg-yellow-100 text-yellow-800",
    pending: "bg-gray-200 text-gray-800",
  };

  return (
    <div className="bg-white text-black p-6 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold">{title}</h3>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            statusColor[status.toLowerCase()] || "bg-gray-100 text-gray-800"
          } shadow-sm`}
        >
          {status.toUpperCase()}
        </span>
      </div>

      <div className="text-sm text-gray-700 space-y-1 mb-4">
        <p><strong>Category:</strong> {category}</p>
        <p>
          <strong>Location:</strong>{" "}
          <FaMapMarkerAlt className="inline mr-1 text-gray-500" />
          {location}
        </p>
        <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
        <p><strong>Cost:</strong> ₹{cost}</p>
        <p><strong>Bid Closed:</strong> ₹{bidClosed}</p>
        <p><strong>Savings:</strong> ₹{savings}</p>
        {inspector && (
          <p>
            <strong>Inspector:</strong>{" "}
            <FaUserTie className="inline mr-1 text-gray-500" />
            {inspector.name} - {inspector.company}
          </p>
        )}
      </div>

      {/* CTA */}
      <button
        onClick={() => navigate(`/customer/enquiry/${_id}`)}
        className="w-full cursor-pointer bg-black text-white px-4 py-2 rounded font-semibold text-sm hover:bg-gray-900 transition duration-200 flex items-center justify-center gap-2 shadow hover:shadow-md"
      >
        <FaCheckCircle />
        View Details
      </button>
    </div>
  );
}
