// import React from "react";

// export default function InfoCard({ icon, title, data, progress, glow = "blue" }) {
//   const glowColorMap = {
//     blue: "rgba(59,130,246,0.4)",
//     green: "rgba(34,197,94,0.4)",
//     purple: "rgba(168,85,247,0.4)",
//     cyan: "rgba(6,182,212,0.4)",
//     pink: "rgba(236,72,153,0.4)",
//     yellow: "rgba(250,204,21,0.4)",
//     orange: "rgba(249,115,22,0.4)",
//     red: "rgba(239,68,68,0.4)",
//     black: "rgba(0,0,0,0.15)",
//   };

//   const color = glowColorMap[glow] || "rgba(0,0,0,0.1)";

//   return (
//     <div
//       className="bg-white p-6 rounded-xl border border-gray-200 shadow-md transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-100"
//       style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
//       onMouseEnter={(e) => {
//         e.currentTarget.style.boxShadow = `
//           0 0 2px ${color},
//           0 0 6px ${color}
//         `;
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)";
//       }}
//     >
//       <h2 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
//         {icon} {title}
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800">
//         {Object.entries(data).map(([label, value], i) => (
//           <p key={i}>
//             <strong>{label}:</strong> {value}
//           </p>
//         ))}
//       </div>

//       {progress && (
//         <div className="mt-4">
//           <div className="text-sm text-gray-800 mb-1">{progress.label}</div>
//           <div className="w-full bg-gray-300 rounded-full h-3">
//             <div
//               className="bg-gray-800 h-3 rounded-full transition-all duration-500"
//               style={{ width: `${progress.value}%` }}
//             ></div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React from "react";
import { useNavigate } from "react-router-dom";

export default function InfoCard({ icon, title, data, progress, glow = "blue" }) {
  const navigate = useNavigate();

  const glowColorMap = {
    blue: "rgba(59,130,246,0.4)",
    green: "rgba(34,197,94,0.4)",
    purple: "rgba(168,85,247,0.4)",
    cyan: "rgba(6,182,212,0.4)",
    pink: "rgba(236,72,153,0.4)",
    yellow: "rgba(250,204,21,0.4)",
    orange: "rgba(249,115,22,0.4)",
    red: "rgba(239,68,68,0.4)",
    black: "rgba(0,0,0,0.15)",
  };

  const color = glowColorMap[glow] || "rgba(0,0,0,0.1)";

  const handleClick = () => {
    if (title.toLowerCase().includes("inspection")) {
      navigate("/customer/history");
    } else if (title.toLowerCase().includes("payment")) {
      navigate("/customer/payments");
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white p-6 rounded-xl border border-gray-200 shadow-md transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-100 cursor-pointer"
      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `
          0 0 2px ${color},
          0 0 6px ${color}
        `;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)";
      }}
    >
      <h2 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
        {icon} {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800">
        {Object.entries(data).map(([label, value], i) => (
          <p key={i}>
            <strong>{label}:</strong> {value}
          </p>
        ))}
      </div>

      {progress && (
        <div className="mt-4">
          <div className="text-sm text-gray-800 mb-1">{progress.label}</div>
          <div className="w-full bg-gray-300 rounded-full h-3">
            <div
              className="bg-gray-800 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress.value}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
