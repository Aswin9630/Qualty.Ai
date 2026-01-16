import {
  Globe2,
  MapPin,
  Clock,
  TrendingUp,
  FilePlus,
  BadgeCheck,
  Eye,
  // Globe2,
} from "lucide-react";
import HomeScene from "../assets/HomeScene.mp4";
import Scene1 from "../assets/Scene1.mp4";
import CountUpOnView from "./CountUpOnView";  
import NewHeader from "./NewHeader";

const achievements = [
  { icon: <Globe2 size={32} />, number: 250, label: "Global Inspectors" },
  { icon: <MapPin size={32} />, number: 30, label: "Countries Covered" },
  { icon: <TrendingUp size={32} />, number: 69, label: "Productivity & Cost Saving (%)" },
  { icon: <Clock size={32} />, number: 24, label: "Platform Support (24/7)" },
];

const values = [
  {
    title: "Raise Inspection Query",
    description:
      "Create your inspection requirements with budget and timeline specifications on our platform.",
    icon: <FilePlus size={28} className="text-white" />,
  },
  {
    title: "Choose the Best Quote",
    description:
      "Compare multiple quotes from verified global inspectors and select the best fit for your needs.",
    icon: <BadgeCheck size={28} className="text-white" />,
  },
  {
    title: "Better Transparency",
    description:
      "Track inspection progress with live updates and comprehensive reporting for complete visibility.",
    icon: <Eye size={28} className="text-white" />,
  },
  {
    title: "Global Inspector Network",
    description:
      "Access our vast network of certified inspectors across 50+ countries for worldwide coverage.",
    icon: <Globe2 size={28} className="text-white" />,
  },
];

export default function About() {
  return (
    <div>
      <NewHeader />
      <section className="bg-black text-white py-20 px-6 sm:px-12 lg:px-20 text-sm sm:text-base">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* About Intro Card */}
          <div className="   p-8 shadow-[inset_0_0_0.5px_rgba(255,255,255,0.1)] backdrop-blur-md transition-all duration-300 ">
            <span className="inline-block bg-white text-black text-base sm:text-xl font-normal px-4 py-1  mb-6 shadow-md">
              About 
            </span>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2">
                <p className="text-gray-300 max-w-3xl mx-auto mb-6 leading-relaxed">
                  Qualty AI is a revolutionary B2B marketplace connecting global
                  traders with certified inspection firms and freelancers. We
                  eliminate the hassle of traditional communication methods by
                  providing a centralized platform where you can create inspection
                  demands and receive multiple competitive quotes.
                </p>
                <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Our platform maps the entire inspection process, providing status
                  updates and live tracking for complete transparency. Add
                  stakeholders to make quality decisions with instant updates and
                  comprehensive reporting. Quality Inspections simplified.
                </p>
              </div>
              <div className="w-full md:w-1/2 flex justify-center">
                <video
                  className=" shadow-xl w-full max-w-3xl transition-transform duration-300 hover:scale-[1.03]"
                  autoPlay
                  loop
                  muted
                  playsInline
                  src={HomeScene}
                />
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((item, index) => (
              <div
                key={index}
                className="   p-6 text-center shadow-[inset_0_0_0.5px_rgba(255,255,255,0.1)] backdrop-blur-md transition-all duration-300  hover:scale-[1.02]"
              >
                <div className="text-white mb-3 flex justify-center">{item.icon}</div>
                <CountUpOnView end={item.number} />
                <div className="text-gray-100 text-xs sm:text-sm font-medium mt-2">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Secondary Video */}
          <div className=" overflow-hidden shadow-xl transition-transform duration-300 hover:scale-[1.03]">
            <video
              className="w-full "
              autoPlay
              loop
              muted
              playsInline
              src={Scene1}
            />
          </div>

          {/* Value Proposition */}
          <div className="   p-8 shadow-[inset_0_0_0.5px_rgba(255,255,255,0.1)] backdrop-blur-md text-center transition-all duration-300 ">
            <h3 className="text-xl sm:text-2xl md:text-3xl mb-4">
              What You Get With Qualty AI
            </h3>
            <p className="text-gray-300 max-w-3xl mx-auto text-xs sm:text-sm leading-relaxed">
              Our platform provides comprehensive solutions for all your quality
              inspection needs with AI-based insights and market analytics for
              better trade decisions.
            </p>
          </div>

          {/* Value Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="rounded-full p-6 shadow-[inset_0_0_0.5px_rgba(255,255,255,0.1)] backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]  hover:scale-[1.02]"
              >
                <div className="mb-4 text-md flex items-center justify-center">
                  {value.icon}
                </div>
                <h4 className="text-base sm:text-lg font-normal mb-2 text-white text-center">
                  {value.title}
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm text-center leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
