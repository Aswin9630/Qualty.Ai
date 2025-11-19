// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { BASE_URL } from "../../../utils/constants";

// export default function QuickRequestDetailPage() {
//   const { id } = useParams();
//   const [request, setRequest] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/quick-services/quick-requests/${id}`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         if (data.success) {
//           setRequest(data.request);
//         } else {
//           setError(data.message || "Failed to load details");
//         }
//       } catch (err) {
//         setError(err.message || "Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDetails();
//   }, [id]);

//   if (loading) return <p className="text-center text-gray-500">Loading...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;
//   if (!request) return null;

//   return (
//     <div className="min-h-screen bg-white text-black px-4 sm:px-6 lg:px-10 py-10">
//       <h2 className="text-4xl font-bold text-center mb-12 animate-fade-in tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-800 to-black">
//         📄 Request Details
//       </h2>

//       <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in space-y-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <DetailItem label="📍 Location" value={request.location} />
//           <DetailItem label="🗓️ Inspection Date" value={new Date(request.inspectionDate).toLocaleDateString()} />
//           <DetailItem label="📦 Commodity Category" value={request.commodityCategory} />
//           <DetailItem label="🧪 Volume" value={request.volume} />
//           <DetailItem label="🔬 Inspection Type" value={request.inspectionTypes} />
//           <DetailItem label="🛠️ Service" value={request.inspectionService} />
//           <DetailItem label="📞 Contact" value={request.contact} />
//           <DetailItem label="📌 Status" value={request.status} highlight="blue" />
//           <DetailItem label="💰 Price" value={`₹${request.price}`} />
//           {request.paymentId && <DetailItem label="💳 Payment ID" value={request.paymentId._id} />}
//         </div>
//       </div>

//       {/* Animations */}
//       <style jsx>{`
//         .animate-fade-in {
//           animation: fadeIn 0.8s ease-out forwards;
//         }
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// function DetailItem({ label, value, highlight }) {
//   const highlightClass = highlight === "blue" ? "text-blue-600" : "text-black";
//   return (
//     <p className="text-sm sm:text-base text-gray-700">
//       <span className="font-semibold text-gray-500">{label}:</span>{" "}
//       <span className={`font-medium ${highlightClass}`}>
//         {value || "—"}
//       </span>
//     </p>
//   );
// }


import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils/constants";

export default function QuickRequestDetailPage() {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`${BASE_URL}/quick-services/quick-requests/${id}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setRequest(data.request);
        } else {
          setError(data.message || "Failed to load details");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!request) return null;

  const getCurrencySymbol = (c) => (c === "USD" ? "$" : "₹");
  const symbol = getCurrencySymbol(request.currency || "INR");

  return (
    <div className="min-h-screen bg-white text-black px-4 sm:px-6 lg:px-10 py-10">
      <h2 className="text-4xl font-bold text-center mb-12 animate-fade-in tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-800 to-black">
        📄 Request Details
      </h2>

      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DetailItem label="📍 Location" value={request.location} />
          <DetailItem label="🗓️ Inspection Date" value={new Date(request.inspectionDate).toLocaleDateString()} />
          <DetailItem label="📦 Commodity Category" value={request.commodityCategory} />
          <DetailItem label="🧪 Volume" value={request.volume} />
          <DetailItem label="🔬 Inspection Type" value={request.inspectionTypes} />
          <DetailItem label="🛠️ Service" value={request.inspectionService} />
          <DetailItem label="📞 Contact" value={request.contact} />
          <DetailItem label="📌 Status" value={request.status} highlight="blue" />
          <DetailItem label="💰 Price" value={`${symbol}${request.price}`} />
          {request.paymentId && <DetailItem label="💳 Payment ID" value={request.paymentId._id} />}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

function DetailItem({ label, value, highlight }) {
  const highlightClass = highlight === "blue" ? "text-blue-600" : "text-black";
  return (
    <p className="text-sm sm:text-base text-gray-700">
      <span className="font-semibold text-gray-500">{label}:</span>{" "}
      <span className={`font-medium ${highlightClass}`}>
        {value || "—"}
      </span>
    </p>
  );
}
