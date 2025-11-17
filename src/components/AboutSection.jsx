import React from "react";
import { Globe2, MapPin, Clock, TrendingUp } from "lucide-react";
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
    <section className="bg-white text-black py-20 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-20 text-sm sm:text-base">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 lg:col-span-8 flex items-center justify-center ">
            <div className="space-y-6 max-w-xl">
              <div className="text-left p-6 sm:p-8 shadow-[inset_0_0_0.5px_rgba(255,255,255,0.05)] backdrop-blur-md rounded-lg transition hover:shadow-[0_0_30px_rgba(255,255,255,0.06)]">
                <h2 className="text-2xl sm:text-3xl font-semibold text-black ">
                  <span className="font-bold"  style={{ backgroundImage: "linear-gradient(90deg, #ff7a18 0%, #af00ff 100%)", WebkitBackgroundClip: "text", color: "transparent" }}>Qualty.AI</span> — Global Inspection Marketplace
                </h2>
                <p className="text-black font-semibold mt-4 leading-relaxed text-sm sm:text-base">
                  Qualty.AI connects global traders with certified inspectors. Post your inspection needs, compare bids, and collaborate in real-time — all in one seamless platform.
                </p>
              </div>
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

        <div  id="how-it-works" className="mt-10">
          <div className="text-center p-6 sm:p-8 shadow-[inset_0_0_0.5px_rgba(255,255,255,0.05)] backdrop-blur-md rounded-lg transition hover:shadow-[0_0_30px_rgba(255,255,255,0.06)]">
            <h3 className="text-3xl font-bold mb-3"  style={{ backgroundImage: "linear-gradient(90deg, #ff7a18 0%, #af00ff 100%)", WebkitBackgroundClip: "text", color: "transparent" }}>How it works</h3>
            <div className="w-full flex items-center justify-center">
              <ProgressCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
