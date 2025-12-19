// import { useSelector } from "react-redux";
// import useFetchCustomerEnquiry from "../../../hooks/useFetchCustomerEnquiry";
// import CustomerHistoryCard from "./CustomerHistoryCard";

// export default function CustomerMyHistoryPage() {
//   useFetchCustomerEnquiry();
//   const enquiries = useSelector((state) => state.customerEnquiry.customerEnquiry);
  
//   return (
//     <div className="min-h-screen bg-white text-black px-6 py-10">
//       <div className="max-w-6xl mx-auto space-y-10 animate-fade-in">
//         <div className="text-center">
//           <h1 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-800 to-black mb-2">
//             My Inspection History
//           </h1>
//           <p className="text-sm text-gray-600">
//             Track your past inspections, savings, and inspector details
//           </p>
//         </div>

//         {!Array.isArray(enquiries) || enquiries.length === 0 ? (
//           <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-center text-gray-500 shadow-sm animate-fade-in-slow">
//             <p className="text-lg font-semibold mb-2">No inspection history found</p>
//             <p className="text-sm">Once you complete inspections, they’ll appear here.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {enquiries.map((e, index) => {
//               const bid = e.confirmedBid;
//               const formatted = {
//                 _id: e._id,
//                 title: `${e.category} - ${e.commodity}`,
//                 status: e.status,
//                 category: e.subcategory,
//                 location: e.location,
//                 date: e.dateFrom || e.createdAt,
//                 cost: e.inspectionBudget,
//                 bidClosed: bid?.customerViewAmount || 0,
//                 savings: e.inspectionBudget - (bid?.customerViewAmount || 0),
//                 inspector: bid?.inspector,
//                 country: e.country,
//                 currency:e.currency
//               };

//               return (
//                 <div
//                   key={e._id}
//                   className="animate-slide-up"
//                   style={{ animationDelay: `${index * 0.1}s` }}
//                 >
//                   <CustomerHistoryCard enquiry={formatted} />
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         .animate-fade-in {
//           animation: fadeIn 0.8s ease-out forwards;
//         }
//         .animate-fade-in-slow {
//           animation: fadeIn 1.2s ease-out forwards;
//         }
//         .animate-slide-up {
//           opacity: 0;
//           transform: translateY(20px);
//           animation: slideUp 0.6s ease-out forwards;
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
//         @keyframes slideUp {
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }


import { useSelector } from "react-redux";
import useFetchCustomerEnquiry from "../../../hooks/useFetchCustomerEnquiry";
import CustomerHistoryCard from "./CustomerHistoryCard";

export default function CustomerMyHistoryPage() {
  useFetchCustomerEnquiry();

  const enquiries = useSelector((state) => state.customerEnquiry.customerEnquiry) || [];

  const activeHistory = enquiries.filter((e) => e.status !== "cancelled");
  const deletedHistory = enquiries.filter((e) => e.status === "cancelled");

  return (
    <div className="min-h-screen bg-white text-black px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-12 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-800 to-black mb-2">
            My Inspection History
          </h1>
          <p className="text-sm text-gray-600">
            Track your past inspections, savings, and inspector details
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Active Enquiries</h2>
          {activeHistory.length === 0 ? (
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-center text-gray-500 shadow-sm animate-fade-in-slow">
              <p className="text-lg font-semibold mb-2">No inspection history found</p>
              <p className="text-sm">Once you complete inspections, they’ll appear here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeHistory.map((e, index) => {
                const bid = e.confirmedBid;
                const formatted = {
                  _id: e._id,
                  title: `${e.category} - ${e.commodity}`,
                  status: e.status,
                  category: e.subcategory,
                  location: e.location,
                  date: e.dateFrom || e.createdAt,
                  cost: e.inspectionBudget,
                  bidClosed: bid?.customerViewAmount || 0,
                  savings: e.inspectionBudget - (bid?.customerViewAmount || 0),
                  inspector: bid?.inspector,
                  country: e.country,
                  currency: e.currency,
                };

                return (
                  <div
                    key={e._id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CustomerHistoryCard enquiry={formatted} />
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Deleted Enquiries</h2>
          {deletedHistory.length === 0 ? (
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-center text-gray-500 shadow-sm animate-fade-in-slow">
              <p className="text-lg font-semibold mb-2">No deleted enquiries</p>
              <p className="text-sm">Deleted enquiries will appear here for reference.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {deletedHistory.map((e, index) => {
                const formatted = {
                  _id: e._id,
                  title: `${e.category} - ${e.commodity}`,
                  status: e.status,
                  category: e.subcategory,
                  location: e.location,
                  date: e.dateFrom || e.createdAt,
                  cost: e.inspectionBudget,
                  bidClosed: e.confirmedBid?.customerViewAmount || 0,
                  savings: e.inspectionBudget - (e.confirmedBid?.customerViewAmount || 0),
                  inspector: e.confirmedBid?.inspector,
                  country: e.country,
                  currency: e.currency,
                };

                return (
                  <div
                    key={e._id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CustomerHistoryCard enquiry={formatted} />
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-fade-in-slow {
          animation: fadeIn 1.2s ease-out forwards;
        }
        .animate-slide-up {
          opacity: 0;
          transform: translateY(20px);
          animation: slideUp 0.6s ease-out forwards;
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
        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
 