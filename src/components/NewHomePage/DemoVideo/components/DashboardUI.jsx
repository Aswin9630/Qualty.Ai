import { useState } from "react";

import {
  BarChart3,
  Activity,
  CheckCircle2,
  CreditCard,
  Plus,
  FileText,
  Eye,
} from "lucide-react";

import psiImg from "../../../../assets/PSI.png";
import loadingImg from "../../../../assets/Loading.png";
import stuffingImg from "../../../../assets/Stuffing.png";
import destinationImg from "../../../../assets/Destination.png";


export default function DashboardMini() {
  const [runTour, setRunTour] = useState(false); 

  return (
    <div className="w-full h-screen overflow-hidden space-y-4 scale-[0.8] origin-top">
      <div className="grid grid-cols-4 gap-4 metrics-section">
        {[
          {
            title: "Total Inspections",
            value: "2",
            icon: BarChart3,
            link: "View Analysis →",
          },
          {
            title: "Active Orders",
            value: "2",
            icon: Activity,
            link: "Monitor Live →",
          },
          {
            title: "Completed",
            value: "0",
            icon: CheckCircle2,
            link: "View History →",
          },
          {
            title: "Total Paid",
            value: "2,438 /-",
            icon: CreditCard,
            link: "View Payments →",
          },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="bg-white rounded-lg shadow-sm px-4 py-3">
              <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                <Icon size={14} />
                {item.title}
              </div>

              <h2 className="text-xl font-bold text-black mt-1">{item.value}</h2>

              <p className="text-xs text-black mt-2 cursor-pointer hover:underline">
                {item.link}
              </p>
            </div>
          );
        })}
      </div>

      {/* ================= QUICK SERVICES ================= */}
      <div className="bg-black rounded-lg px-4 py-6 quick-services">
        <h2 className="text-white text-lg font-semibold text-center mb-6">
          Quick Services
        </h2>

        <div className="grid grid-cols-4 gap-5">
          {[
            { title: "PSI", img: psiImg, cls: "psi-card" },
            { title: "LOADING", img: loadingImg },
            { title: "STUFFING", img: stuffingImg },
            { title: "DESTINATION", img: destinationImg },
          ].map((service, i) => (
            <div
              key={i}
              className={`bg-white rounded-lg overflow-hidden shadow ${service.cls || ""}`}
            >
              <div className="h-28">
                <img
                  src={service.img}
                  alt={service.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="py-3 text-center">
                <h3 className="text-sm font-semibold text-black mb-2">{service.title}</h3>

                <button className="bg-black text-white text-xs px-4 py-1.5 rounded-md hover:opacity-90">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="bg-black rounded-lg px-4 py-6 mb-20 quick-actions">
        <h2 className="text-white text-lg font-semibold text-center mb-6">Quick Actions</h2>

        <div className="grid grid-cols-3 gap-4">
          {[
            {
              title: "New Inspection Request",
              desc: "Submit a new commodity inspection.",
              icon: Plus,
              cls: "new-inspection",
            },
            {
              title: "View All Reports",
              desc: "Access analytics and reports.",
              icon: FileText,
            },
            {
              title: "Live Inspection",
              desc: "Monitor inspections in real-time.",
              icon: Eye,
            },
          ].map((action, i) => {
            const Icon = action.icon;
            return (
              <div
                key={i}
                className={`bg-white rounded-lg shadow-sm px-4 py-4 flex gap-3 ${action.cls || ""}`}
              >
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                  <Icon size={14} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-black">{action.title}</h3>
                  <p className="text-xs text-gray-600 mt-0.5">{action.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
