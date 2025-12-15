import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Discount = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
   const user = useSelector((state) => state.user.user);
   const targetUrl = isHome
    ? user
      ? "/customer/raiseEnquiry"
      : "/login"
    : "/customer/raiseEnquiry";

  return (
    <section className="relative bg-white text-gray-900 rounded-2xl shadow-2xl overflow-hidden my-4 mx-4 md:mx-12">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-[1px] rounded-2xl pointer-events-none" />
      
      <div className="relative bg-white rounded-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-full blur-3xl opacity-60 -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-indigo-50 to-purple-50 rounded-full blur-3xl opacity-40 -ml-32 -mb-32" />

        <div className="absolute top-6 left-6 md:left-12 z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
            <span className="text-lg">🎉</span>
            Year-End Sale
          </div>
        </div>

        <div className="relative z-5 flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-16 md:py-20 gap-8 md:gap-12">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Year-End Special Offer
            </h2>
            
            <p className="text-xl md:text-2xl font-bold text-gray-900">
              Get <span className="text-transparent bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text">20% OFF</span> on Every Destination Inspection
            </p>
            
            <p className="text-base md:text-lg text-gray-600 font-medium">
              Unlock Exclusive Savings on Your Next Shipment
            </p>

            <div className="hidden md:block h-1 w-20 bg-gradient-to-r from-indigo-600 to-pink-600 mt-6" />
          </div>

          <div className="flex-shrink-0 w-full md:w-auto">
            <a
              href={targetUrl}
              className="w-full md:w-auto flex justify-center items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition duration-300" />
              <span className="relative flex items-center gap-2">
                Claim Offer
                <span className="text-lg">→</span>
              </span>
            </a>
          </div>
        </div>

        <div className="relative h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-30" />
      </div>
    </section>
  );
};

export default Discount;













// import { Link, useLocation } from "react-router-dom";
// const Discount = () => {
//   const location = useLocation();
//   const isHome = location.pathname === "/";
//   const targetUrl = isHome ? "/login" : "/customer/raiseEnquiry";
//   return (
//     <section className="relative bg-white text-gray-900 rounded-2xl shadow-2xl overflow-hidden my-4 mx-4 md:mx-12">
//       <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-green-600 to-red-600 p-[1px] rounded-2xl pointer-events-none" />
      
//       <div className="relative bg-white rounded-2xl">
//         <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-50 via-green-50 to-red-50 rounded-full blur-3xl opacity-60 -mr-40 -mt-40" />
//         <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-green-50 to-red-50 rounded-full blur-3xl opacity-40 -ml-32 -mb-32" />

//         <div className="absolute top-8 left-8 text-5xl opacity-70 animate-bounce" style={{animationDelay: '0s'}}>
//           🔔
//         </div>
//         <div className="absolute top-20 left-2 text-4xl opacity-60 animate-bounce" style={{animationDelay: '0.5s'}}>
//           🎅
//         </div>

//         <div className="absolute top-12 right-8 text-5xl opacity-70 animate-bounce" style={{animationDelay: '0.3s'}}>
//           🔔
//         </div>
//         <div className="absolute top-32 right-4 text-4xl opacity-60 animate-bounce" style={{animationDelay: '0.7s'}}>
//           🎄
//         </div>

//         <div className="absolute bottom-8 left-12 text-4xl opacity-50 animate-pulse">
//           🎄
//         </div>
//         <div className="absolute bottom-10 right-10 text-5xl opacity-70 animate-bounce" style={{animationDelay: '0.4s'}}>
//           🔔
//         </div>

//         <div className="absolute top-6 left-6 md:left-12 z-10">
//           <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
//             <span className="text-lg">🎅</span>
//             Christmas Special
//             <span className="text-lg">🎄</span>
//           </div>
//         </div>

//         <div className="relative z-5 flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-16 md:py-20 gap-8 md:gap-12">
//           <div className="flex-1 space-y-4 text-center md:text-left">
//             <div className="flex justify-center md:justify-start gap-2 items-center">
//               <span className="text-4xl">🎅</span>
//               <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-red-600 via-green-600 to-red-600 bg-clip-text text-transparent">
//                 Year-End Special Offer
//               </h2>
//               <span className="text-4xl">🎄</span>
//             </div>
            
//             <p className="text-xl md:text-2xl font-bold text-gray-900">
//               Get <span className="text-transparent bg-gradient-to-r from-red-600 to-green-600 bg-clip-text font-extrabold">20% OFF</span> on Every Destination Inspection
//             </p>
            
//             <p className="text-base md:text-lg text-gray-600 font-medium">
//               🎁 Unlock Exclusive Savings on Your Next Shipment 🎁
//             </p>

//             <div className="hidden md:block h-1 w-20 bg-gradient-to-r from-red-600 via-green-600 to-red-600 mt-6" />
//           </div>

//           <div className="flex-shrink-0 w-full md:w-auto">
//             <a
//               href={targetUrl}
//               className="w-full md:w-auto flex justify-center items-center px-8 py-4 bg-gradient-to-r from-red-600 to-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out relative overflow-hidden group"
//             >
//               <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-red-600 opacity-0 group-hover:opacity-100 transition duration-300" />
//               <span className="relative flex items-center gap-2">
//                 <span>🎁</span>
//                 Claim Offer
//                 <span>→</span>
//               </span>
//             </a>
//           </div>
//         </div>

//         <div className="relative h-1 bg-gradient-to-r from-red-600 via-green-600 to-red-600 opacity-30" />
//       </div>

//       <style jsx>{`
//         @keyframes bounce {
//           0%, 100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-20px);
//           }
//         }
//         @keyframes pulse {
//           0%, 100% {
//             opacity: 0.5;
//           }
//           50% {
//             opacity: 1;
//           }
//         }
//         .animate-bounce {
//           animation: bounce 2s infinite;
//         }
//         .animate-pulse {
//           animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Discount;