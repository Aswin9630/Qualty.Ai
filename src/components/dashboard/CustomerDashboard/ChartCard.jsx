import React from "react";
import { Doughnut, Line } from "react-chartjs-2";

export default function ChartCard({ title, type = "doughnut", data, options, glow = "cyan" }) {
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

  return (
    <div
      className={`bg-white p-6 rounded-xl border border-gray-200 shadow-md transition-all duration-300 transform text-center hover:-translate-y-0.5 hover:scale-100`}
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
      <h2 className="text-2xl font-semibold text-black mb-4">{title}</h2>

      <div className="w-full h-60 flex items-center justify-center">
        {type === "doughnut" ? (
          <Doughnut data={data} options={{ ...options, maintainAspectRatio: false }} />
        ) : (
          <Line data={data} options={{ ...options, maintainAspectRatio: false }} />
        )}
      </div>
    </div>
  );
}
