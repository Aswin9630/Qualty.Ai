import { Star, Smile, Headphones, Gift } from "lucide-react";
import company1 from "../../../../assets/company1.png"
import company6 from "../../../../assets/company6.png"
import company3 from "../../../../assets/company3.webp"
import company4 from "../../../../assets/company4.webp"
import company5 from "../../../../assets/company5.png"
import company7 from "../../../../assets/company7.jpg"
import company8 from "../../../../assets/company8.png"
import company9 from "../../../../assets/company9.jpg"

export function TrustedBy() {
  const companies = [
    {
      name: "EQUINOX",
      logo: company1
    },
    {
      name: "APEXCERT",
      logo:company6
    },
    {
      name: "HQTS",
      logo: company3
    },
    {
      name: "GCC",
      logo: company4
    },
    {
      name: "RINA",
      logo: company5
    },
    {
      name: "INTERTEK",
      logo: company7
    },
    {
      name: "TESTCOO",
      logo: company8
    },
    {
      name: "VSIX LABS",
      logo: company9
    },
  ];


  return (
    <section id="trusted-by" className="py-24 lg:py-32 bg-white border-t border-black/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-[800px] mx-auto text-center mb-20">
          <div className="text-sm text-black/40 mb-4 tracking-wide uppercase">
            Social Proof
          </div>
          <h2 className="text-4xl lg:text-5xl tracking-tight mb-6">
           Inspection Companies That Trust Us
          </h2>
          <p className="text-lg text-black/60 leading-relaxed">
            Global trade leaders rely on Qualty.AI for their quality inspection needs
          </p>
        </div>

        <div className="mb-20 overflow-hidden">
          <style>{`
            @keyframes scroll-left {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            
            .carousel-track {
              animation: scroll-left 40s linear infinite;
            }
            
            .carousel-track:hover {
              animation-play-state: paused;
            }
          `}</style>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />
            
            <div className="flex overflow-hidden">
              <div className="carousel-track flex gap-6">
                {companies.map((company, index) => (
                  <div
                    key={`original-${index}`}
                    className="flex-shrink-0 w-48 bg-black/[0.00] rounded-xl p-6 flex flex-col items-center justify-center border border-black/5 hover:border-black/10 transition-all cursor-pointer hover:shadow-lg"
                  >
                    <img 
                      src={company.logo} 
                      alt={company.name}
                      className="w-16 h-16 mb-4 object-contain"
                    />
                    <span className="text-sm text-center font-medium">{company.name}</span>
                  </div>
                ))}
                
                {companies.map((company, index) => (
                  <div
                    key={`duplicate-${index}`}
                    className="flex-shrink-0 w-48 bg-black/[0.00] rounded-xl p-6 flex flex-col items-center justify-center border border-black/5 hover:border-black/10 transition-all cursor-pointer hover:shadow-lg"
                  >
                    <img 
                      src={company.logo} 
                      alt={company.name}
                      className="w-16 h-16 mb-4 "
                    />
                    <span className="text-sm text-center font-medium">{company.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>


<div className="grid sm:grid-cols-4 gap-8 mt-20 pt-20 border-t border-black/5">
  <div className="text-center">
    <div className="flex justify-center gap-1 mb-3">
      {[...Array(4)].map((_, i) => (
        <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
      ))}
      <Star size={18} className="fill-yellow-400/50 text-yellow-400" />
    </div>
    <div className="text-4xl tracking-tight mb-2">4.9/5</div>
    <div className="text-black/60">Average Rating</div>
  </div>

  <div className="text-center">
    <div className="flex justify-center mb-3">
      <Smile size={28} className="text-green-500" />
    </div>
    <div className="text-4xl tracking-tight mb-2">98%</div>
    <div className="text-black/60">Customer Satisfaction</div>
  </div>

  <div className="text-center">
    <div className="flex justify-center mb-3">
      <Headphones size={28} className="text-blue-500" />
    </div>
    <div className="text-4xl tracking-tight mb-2">24/7</div>
    <div className="text-black/60">Support Available</div>
  </div>

  <div className="text-center">
    <div className="flex justify-center mb-3">
      <Gift size={28} className="text-purple-500" />
    </div>
    <div className="text-4xl tracking-tight mb-2">100%</div>
    <div className="text-black/60">Free Platform</div>
  </div>
</div>


      </div>
    </section>
  );
}