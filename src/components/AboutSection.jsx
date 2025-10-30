import React from "react";
import {
  Globe2,
  MapPin,
  Clock,
  TrendingUp,
} from "lucide-react";
import Scene2 from "../assets/scrollingVideo.gif";
import CountUpOnView from "./CountUpOnView";
import ProgressCard from "./WillGetCard";


const achievements = [
  { icon: <Globe2 size={32} />, number: 250, label: "Global Inspectors" },
  { icon: <MapPin size={32} />, number: 30, label: "Countries Covered" },
  { icon: <TrendingUp size={32} />, number: 69, label: "Productivity & Cost Saving (%)" },
  { icon: <Clock size={32} />, number: 24, label: "Platform Support (24/7)" },
];

export default function AboutSection() {
  return (
    <section className="bg-black text-white py-20 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-20 text-sm sm:text-base">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-7 lg:col-span-8 space-y-6">
            <div className="text-left  p-6 sm:p-8 shadow-[inset_0_0_0.5px_rgba(255,255,255,0.05)] backdrop-blur-md rounded-lg transition hover:shadow-[0_0_30px_rgba(255,255,255,0.06)]">

              <h2 className="text-xl sm:text-2xl font-normal mt-3">
                Qualty.AI — Global Inspection Marketplace
              </h2>

              <p className="text-gray-300 max-w-3xl mt-4 leading-relaxed">
               Qualty.AI is a revolutionary B2B marketplace connecting global traders with certified inspection firms and freelancers. It streamlines inspection demands by offering a centralized platform to create requests, get competitive quotes, track status, and receive live updates. With stakeholder collaboration and transparent reporting, Quality.AI simplifies the entire inspection process.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              {achievements.map((item, idx) => (
                <div
                  key={idx}
                  className=" p-4 text-center shadow-[inset_0_0_0.5px_rgba(255,255,255,0.04)] backdrop-blur rounded-lg transition hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-center mb-2 text-white">
                    {item.icon}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold">
                    <CountUpOnView end={item.number} />
                  </div>
                  <div className="text-gray-200 text-xs sm:text-sm mt-1">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-5 lg:col-span-4">
            <div className="sticky top-20"> 
              <div className="overflow-hidden rounded-lg shadow-xl transition-transform duration-300 hover:scale-[1.02]">
                <img
                  src={Scene2}
                  alt="Inspection process preview"
                  className="w-full h-64 sm:h-80 md:h-[420px] lg:h-[520px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="text-center  p-6 sm:p-8 shadow-[inset_0_0_0.5px_rgba(255,255,255,0.05)] backdrop-blur-md rounded-lg transition hover:shadow-[0_0_30px_rgba(255,255,255,0.06)]">
            <h3 className="text-lg sm:text-2xl font-normal mb-3">
              What You Get With Qualty.AI
            </h3>
            <p className="text-gray-300 max-w-3xl mx-auto text-xs sm:text-sm leading-relaxed">
              Our platform provides comprehensive solutions for all your quality inspection needs with AI-based insights and market analytics for better trade decisions.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <ProgressCard />
        </div>
      </div>
    </section>
  );
}