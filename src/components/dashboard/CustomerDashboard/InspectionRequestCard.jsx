import { useState } from "react";
import { FaMapMarkerAlt,FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../utils/constants";

export default function InspectionRequestCard({ request,onDeleted  }) {
  const {
    _id,
    category,
    location,
    urgency,
    inspectionBudget,
    status,
    createdAt,
    commodity,
    currency
  } = request;

  const navigate = useNavigate();
  const formatted = new Date(createdAt).toLocaleDateString("en-GB");
   const [showConfirm, setShowConfirm] = useState(false);

  const priorityStyles = {
    High: "bg-red-100 text-red-700 border border-red-300",
    Medium: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    Low: "bg-green-100 text-green-700 border border-green-300",
  };

    const handleDelete = async () => {
    try {
      const res = await fetch(`${BASE_URL}/customer/cancel-enquiry/${_id}`, {
        method: "PATCH",
        credentials: "include",
      });
      const data = await res.json();
      console.log("canceldata",data)
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
    <div className="bg-white text-black p-5 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      
       <button
        onClick={() => setShowConfirm(true)}
        className="cursor-pointer absolute top-3 right-3 text-red-500 hover:text-red-700"
        aria-label="Delete enquiry"
      >
        <FaTrash />
      </button> 
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Category: {category}</h3>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${priorityStyles[urgency]}`}
        >
          {urgency}
        </span>
      </div>

      <p className="text-sm text-gray-600 flex items-center gap-3 mb-2">
        <FaMapMarkerAlt className="text-gray-400" />
        {location}
      </p>

      <div className="text-sm text-gray-700 space-y-1 mb-4">
        <p>
          <strong>Budget:</strong> {currency==="INR"?"₹":"$"}{inspectionBudget}/-
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span className="text-xs px-2 py-1 rounded bg-gray-100 border border-gray-300">
            {status}
          </span>
        </p>
        <p>
          <strong>Commodity:</strong> {commodity}
        </p>
        <p>
          <strong>Date of Enquiry:</strong> {formatted}
        </p>
      </div>

      <div className="text-center">
        <button
          onClick={() => navigate(`/customer/inspection/${_id}`,{
      state: { inspectionBudget },
    })}
          className="px-6 py-2 bg-black hover:bg-gray-900 text-white text-sm w-full font-medium rounded-lg cursor-pointer transition-all"
        >
          View Bids
        </button>
      </div>


      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to remove this enquiry? It will move to Deleted Enquiries.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="cursor-pointer px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                No
              </button>
              <button
                onClick={handleDelete}
                className="cursor-pointer px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
