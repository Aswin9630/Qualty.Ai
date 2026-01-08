import { useState } from "react";
import { ChevronLeft, ChevronRight, Package, UserCheck, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import importer from "../../../../assets/importer.png";
import exporters from "../../../../assets/exporters.png";
import inspection from "../../../../assets/inspection.png";

const roles = [
  {
    id: "importers",
    title: "Importers",
    subtitle: "Global traders who demand quality",
    icon: Package,
    image: importer,
    benefits: [
      "PSI/Loading/Stuffing",
      "Compare bids from verified professionals",
      "Real-time tracking and instant reports",
      "Reduce risk before shipment",
      "Access to global inspector network"
    ]
  },
  {
    id: "exporters",
    title: "Exporters",
    subtitle: "Certified professionals expanding reach",
    icon: UserCheck,
    image: exporters,
    benefits: [
      "Find global inspection companies",
      "Bid on projects matching your expertise",
      "Build professional reputation and ratings",
      "Flexible work with international clients",
      "Secure your cargo in destination",
      "PSI/Unloading/Destination Inspection"
    ]
  },
  {
    id: "inspection-partners",
    title: "Inspection Partners",
    subtitle: "Scale operations globally",
    icon: Building2,
    image: inspection,
    individualBenefits: [
      "Increase your proffessional profile to global market",
      "Accept PSI & destination assignments",
      "No more side hustle",
      "Secure payments & training by Qualty.ai",
      "Mobile app for instant reports"
    ],
    companyBenefits: [
      "Expand business reach globally",
      "Steady stream of qualified projects",
      "Manage teams and assignments centrally",
      "Build corporate credibility",
      "Advanced project management tools"
    ]
  }
];

export function WhoWeServe() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % roles.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + roles.length) % roles.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const currentRole = roles[currentIndex];
  const Icon = currentRole.icon;

  return (
    <section id="who-we-serve" className="py-24 lg:py-32 bg-black/[0.02] border-t border-black/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-[800px] mb-20">
          <div className="text-lg md:text-2xl text-black/40 mb-4 tracking-wide uppercase">Solutions</div>
          <h2 className="text-4xl lg:text-5xl tracking-tight mb-6">Who We Built This For</h2>
          <p className="text-lg text-black/60 leading-relaxed">
            Three essential pillars of the global inspection ecosystem, connected on one platform.
          </p>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {roles.map((role, index) => {
            const RoleIcon = role.icon;
            return (
              <button
                key={role.id}
                onClick={() => setCurrentIndex(index)}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl border transition-all whitespace-nowrap ${
                  index === currentIndex ? "border-black bg-black text-white" : "border-black/10 hover:border-black/20"
                }`}
              >
                <RoleIcon size={20} strokeWidth={1.5} />
                <span className="text-sm">{role.title}</span>
              </button>
            );
          })}
        </div>

        <div className="relative bg-white rounded-2xl border border-black/10 overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <div className="relative h-[400px] lg:h-auto">
              <img src={currentRole.image} alt={currentRole.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <div className="w-14 h-14 rounded-xl bg-white backdrop-blur-sm flex items-center justify-center mb-4">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl mb-1">{currentRole.title}</h3>
                <p className="text-white/80">{currentRole.subtitle}</p>
              </div>
            </div>

            <div className="p-8 lg:p-12 flex flex-col justify-center min-h-[480px] lg:min-h-[520px]">
              {currentRole.id === "inspection-partners" ? (
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Individuals</h4>
                    <div className="space-y-4">
                      {currentRole.individualBenefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full border border-black/10 flex items-center justify-center mt-0.5">
                            <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                          </div>
                          <p className="text-black/80 leading-relaxed">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4">Inspection Companies</h4>
                    <div className="space-y-4">
                      {currentRole.companyBenefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full border border-black/10 flex items-center justify-center mt-0.5">
                            <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                          </div>
                          <p className="text-black/80 leading-relaxed">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 mb-8">
                  {currentRole.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full border border-black/10 flex items-center justify-center mt-0.5">
                        <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                      </div>
                      <p className="text-black/80 leading-relaxed">{benefit}</p>
                    </div>
                  ))}
                </div>
              )}

              <Link to="/login">
                <button className="cursor-pointer bg-black text-white px-6 py-3 rounded-lg hover:bg-black/90 transition-all inline-flex items-center justify-center w-full lg:w-auto">
                  Start for free
                </button>
              </Link>
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white hover:bg-black/5 rounded-full flex items-center justify-center shadow-lg transition-all border border-black/10"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white hover:bg-black/5 rounded-full flex items-center justify-center shadow-lg transition-all border transition-all border-black/10"
          >
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {roles.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? "bg-white w-6" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
