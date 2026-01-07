// import { Check, Shield, Zap, Lock, TrendingUp, Award, ChevronLeft, ChevronRight } from "lucide-react";
// import { useState, useRef, useEffect } from "react";

// const benefits = [
//   {
//     icon: Shield,
//     title: "Trust & Transparency",
//     description: "Verified traders and inspectors with complete audit trails and transparent documentation."
//   },
//   {
//     icon: Zap,
//     title: "Streamlined Efficiency",
//     description: "Automated workflows eliminate fragmented processes and reduce inspection timelines."
//   },
//   {
//     icon: Lock,
//     title: "Secure Payments",
//     description: "20% advance while quality analysis, 100% payment at submitting reports."
//   },
//   {
//     icon: TrendingUp,
//     title: "Global Reach",
//     description: "Automated workflows eliminate fragmented processes and reduce inspection timelines."
//   },
//   {
//     icon: Award,
//     title: "Quality Assurance",
//     description: "Compliance with international standards and structured reporting mechanisms."
//   },
//   {
//     icon: Check,
//     title: "Cost Effective",
//     description: "Eliminate intermediaries and reduce operational costs through direct connections."
//   }
// ];

// const whyPoints = [
//   "Global trade demands trust, transparency, and efficiency",
//   "Traditional inspection methods are outdated and fragmented",
//   "Legacy systems are costly and inefficient",
//   "Need for unified digital inspection ecosystem"
// ];

// export default function WhyUs() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const carouselRef = useRef(null);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex(prev => (benefits.length - 1 === prev ? 0 : prev + 1));
//     }, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   const handlePrev = () => {
//     setCurrentIndex(prev => (prev === 0 ? benefits.length - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setCurrentIndex(prev => (benefits.length - 1 === prev ? 0 : prev + 1));
//   };

//   const itemsPerView = 3;
//   const visibleCards = [];
//   for (let i = 0; i < itemsPerView; i++) {
//     visibleCards.push(benefits[(currentIndex + i) % benefits.length]);
//   }

//   return (
//     <section className="py-20 md:py-28 bg-gray-50">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="mb-16 max-w-3xl">
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//             Why Us
//           </h2>

//           <p className="text-xl text-gray-700 leading-relaxed mb-8">
//             Global trade has a critical need for trust, transparency, and efficiency in the global inspection ecosystem. Traditional methods are outdated, fragmented, and costly.
//           </p>

//           <div className="space-y-4">
//             {whyPoints.map((point, i) => (
//               <div key={i} className="flex items-start gap-4">
//                 <div className="flex-shrink-0 mt-1">
//                   <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-600">
//                     <Check className="h-4 w-4 text-white" strokeWidth={3} />
//                   </div>
//                 </div>
//                 <p className="text-lg text-gray-700">{point}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="mb-16">
//           <div className="relative">
//             <div ref={carouselRef} className="overflow-hidden">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {visibleCards.map((benefit, i) => {
//                   const Icon = benefit.icon;
//                   return (
//                     <div
//                       key={i}
//                       className="p-8 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300 animate-fadeIn"
//                     >
//                       <div className="inline-flex p-3 rounded-lg bg-blue-100 mb-6">
//                         <Icon className="w-6 h-6 text-blue-600" strokeWidth={2} />
//                       </div>

//                       <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                         {benefit.title}
//                       </h3>

//                       <p className="text-gray-600 leading-relaxed">
//                         {benefit.description}
//                       </p>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             <button
//               onClick={handlePrev}
//               className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 md:-translate-x-20 p-3 rounded-full bg-white border border-gray-200 shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-300"
//             >
//               <ChevronLeft className="w-6 h-6 text-gray-700" />
//             </button>

//             <button
//               onClick={handleNext}
//               className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 md:translate-x-20 p-3 rounded-full bg-white border border-gray-200 shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-300"
//             >
//               <ChevronRight className="w-6 h-6 text-gray-700" />
//             </button>
//           </div>

//           <div className="flex justify-center gap-2 mt-10">
//             {benefits.map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrentIndex(i)}
//                 className={`h-2 rounded-full transition-all duration-300 ${
//                   i >= currentIndex && i < currentIndex + itemsPerView
//                     ? "bg-blue-600 w-8"
//                     : "bg-gray-300 w-2"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
//           <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
//             <div className="text-2xl font-semibold text-gray-900 mb-1">
//               20%
//             </div>
//             <h3 className="text-lg font-medium text-gray-800 mb-2">
//               Advance Payment
//             </h3>
//             <p className="text-gray-700 leading-relaxed">
//               Get 20% advance while quality analysis begins. Secure and transparent payment structure.
//             </p>
//           </div>

//           <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
//             <div className="text-2xl font-semibold text-gray-900 mb-1">
//               100%
//             </div>
//             <h3 className="text-lg font-medium text-gray-800 mb-2">
//               Final Payment
//             </h3>
//             <p className="text-gray-700 leading-relaxed">
//               Receive 100% payment upon submitting comprehensive reports. No hidden deductions.
//             </p>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.2s ease-in;
//         }
//       `}</style>
//     </section>
//   );
// }




import { Check, Shield, Zap, Lock, TrendingUp, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const benefits = [
  {
    icon: Shield,
    title: "Trust & Transparency",
    description: "Verified traders and inspectors with complete audit trails and transparent documentation."
  },
  {
    icon: Zap,
    title: "Streamlined Efficiency",
    description: "Automated workflows eliminate fragmented processes and reduce inspection timelines."
  },
  {
    icon: Lock,
    title: "Secure Payments",
    description: "20% advance while quality analysis, 100% payment at submitting reports."
  },
  {
    icon: TrendingUp,
    title: "Global Reach",
    description: "Automated workflows eliminate fragmented processes and reduce inspection timelines."
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "Compliance with international standards and structured reporting mechanisms."
  },
  {
    icon: Check,
    title: "Cost Effective",
    description: "Eliminate intermediaries and reduce operational costs through direct connections."
  }
];

const whyPoints = [
  "Global trade demands trust, transparency, and efficiency",
  "Traditional inspection methods are outdated and fragmented",
  "Legacy systems are costly and inefficient",
  "Need for unified digital inspection ecosystem"
];

export default function WhyUs() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (benefits.length - 1 === prev ? 0 : prev + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? benefits.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (benefits.length - 1 === prev ? 0 : prev + 1));
  };

  const itemsPerView = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3 : typeof window !== 'undefined' && window.innerWidth >= 768 ? 2 : 1;
  const visibleCards = [];
  for (let i = 0; i < itemsPerView; i++) {
    visibleCards.push(benefits[(currentIndex + i) % benefits.length]);
  }

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-16 max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4 md:mb-6">
            Why Us
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-6 md:mb-8">
            Global trade has a critical need for trust, transparency, and efficiency in the global inspection ecosystem. Traditional methods are outdated, fragmented, and costly.
          </p>

          <div className="space-y-3 md:space-y-4">
            {whyPoints.map((point, i) => (
              <div key={i} className="flex items-start gap-3 md:gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center h-5 w-5 md:h-6 md:w-6 rounded-full bg-gradient-to-r from-purple-600 to-blue-600">
                    <Check className="h-3 md:h-4 w-3 md:w-4 text-white" strokeWidth={3} />
                  </div>
                </div>
                <p className="text-sm sm:text-base md:text-lg text-gray-300">{point}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12 md:mb-16">
          <div className="relative px-12 sm:px-14 md:px-20" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div ref={carouselRef} className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {visibleCards.map((benefit, i) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={i}
                      className="p-6 md:p-8 rounded-2xl border border-gray-800 bg-gray-950 shadow-sm hover:shadow-xl hover:border-gray-700 transition-all duration-300 animate-fadeIn"
                    >
                      <div className="inline-flex p-3 md:p-4 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 mb-4 md:mb-6 shadow-md">
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" strokeWidth={2} />
                      </div>

                      <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">
                        {benefit.title}
                      </h3>

                      <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-gray-950 border border-gray-800 shadow-md hover:shadow-lg hover:bg-gray-900 hover:border-gray-700 transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-gray-950 border border-gray-800 shadow-md hover:shadow-lg hover:bg-gray-900 hover:border-gray-700 transition-all duration-300"
            >
              <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-8 md:mt-10">
            {benefits.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i >= currentIndex && i < currentIndex + itemsPerView
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 w-6 md:w-8"
                    : "bg-gray-300 w-2"
                }`}
              />
            ))}
          </div>
        </div>

     
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in;
        }
      `}</style>
    </section>
  );
}