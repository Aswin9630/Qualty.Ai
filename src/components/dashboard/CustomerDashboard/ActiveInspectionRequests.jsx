import { useEffect, useState } from "react";
import InspectionRequestCard from "./InspectionRequestCard";

export default function ActiveInspectionRequests({ requests = [],onDeleted  }) {

  return (
    <section className="p-6 bg-white text-black rounded-xl shadow-xl animate-fade-in">
      <h2 className="text-3xl font-semibold text-center mb-6 bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent">
         Your Inspection Requests
      </h2>

      {requests.length === 0 ? (
        <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-xl border border-gray-300 shadow-inner animate-fade-in-slow">
          <p className="text-lg font-semibold mb-2">No active requests</p>
          <p className="text-sm">Once you create an inspection, it will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {requests.map((req, index) => (
            <div
              key={index}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <InspectionRequestCard request={req} onDeleted={onDeleted } />
            </div>
          ))}
        </div>
      )}

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
    </section>
  );
}
