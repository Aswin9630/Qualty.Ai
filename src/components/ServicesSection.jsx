import { Package, MapPin, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import QuickInspection from "./QuickInspection";

const featuredServices = [
  {
    icon: <Package size={32} />,
    title: "Sourcing Inspection",
    description:
      "Get your cargo inspected at time of loading or production with comprehensive quality checks and documentation.",
    features: [
      "Commodity quality inspection",
      "Loading & stuffing inspections",
      "Packaging, fumigation & more",
      "Physical & chemical testing",
    ],
  },
  {
    icon: <MapPin size={32} />,
    title: "Destination Inspection",
    description:
      "Your cargo & commodity quality details at destination locations with comprehensive quality validation.",
    features: [
      "Unloading inspections",
      "Physical & chemical testing",
      "Quality validation at destination",
      "Documentation & reporting",
    ],
  },
];

export default function ServicesSection() {
  const navigate = useNavigate();

  return (
    <section className="bg-black text-white py-5 md:py-16 px-6 sm:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="  p-8 shadow-[inset_0_0_0.5px_rgba(255,255,255,0.1)] backdrop-blur-md transition-all duration-300  space-y-16">
          
          <div className="text-center">
            <span className="inline-block bg-white text-black text-base sm:text-lg font-normal px-4 py-2  mb-14 shadow-md">
              Our Services
            </span>
            <h2 className="text-xl sm:text-2xl font-normal mb-4">
              Comprehensive Quality <span className="text-white">Inspection Services</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
              We offer a complete suite of inspection services to ensure your cargo
              meets the highest standards across global markets.
            </p>
          </div>

          <QuickInspection />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {featuredServices.map((service, index) => (
              <div
                key={index}
                className=" p-6 shadow-[inset_0_0_0.5px_rgba(255,255,255,0.1)] backdrop-blur-md transition-all duration-300  hover:scale-[1.02]"
              >
                <div className="flex items-center mb-4 text-white">
                  {service.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-normal tracking-wide mb-2">
                  {service.title}
                </h3>
                <p className="mb-4 text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {service.description}
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-1 pl-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-xs sm:text-sm leading-snug">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate("/services")}
              className="cursor-pointer text-sm sm:text-base inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-white text-black font-normal  shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.03]"
            >
              View All Services <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
