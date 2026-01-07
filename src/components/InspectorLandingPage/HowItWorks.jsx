import { useEffect, useRef, useState } from "react";
import step1 from "../../assets/inspectorStep1.jpeg";
import step2 from "../../assets/inspectorStep2.jpeg";
import step3 from "../../assets/Step3.png";

const steps = [
  {
    image: step1,
    title: "Choose Active Queries",
    description:
      "Browse and select verified global inspection enquiries that match your expertise and preferred locations",
  },
  {
    image: step2,
    title: "Submit your Inspection Quote",
    description:
      "Place competitive inspection quotes aligned with trader budgets. Bid against budget and win projects based on timeline and quality commitment.",
  },
  {
    image: step3,
    title: "Live updates & reports",
    description:
      "Accept enquiry, communicate updates, conduct inspection, and submit structured reports with full transparency to receive assured payment.",
  },
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      const relativeScroll = scrollPosition - sectionTop;
      const stepHeight = sectionHeight / steps.length;
      const currentStep = Math.floor(relativeScroll / stepHeight);

      setActiveStep(Math.max(0, Math.min(steps.length - 1, currentStep)));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-black"
      style={{ minHeight: `${steps.length * 100}vh` }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl mb-4 text-white font-semibold">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-gray-200">
            Quality inspections made simple in three easy steps
          </p>
        </div>

        <div className="hidden md:block m-20 sticky top-20 md:top-32 max-w-6xl mx-auto">
          <div className="relative h-[560px] md:h-[760px]">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className="absolute inset-0 transition-all duration-700 ease-out"
                style={{
                  transform: `translateY(${(index - activeStep) * 20}px) scale(${
                    index <= activeStep ? 1 : 0.96
                  })`,
                  opacity: index <= activeStep ? 1 : 0,
                  zIndex: steps.length - Math.abs(index - activeStep),
                  pointerEvents: index === activeStep ? "auto" : "none",
                }}
              >
                <div className="bg-white rounded-2xl shadow-2xl overflow-visible h-full flex flex-col md:flex-row border border-black">
                  <div className="relative w-full md:w-1/2 h-[300px] md:h-[560px] flex items-center justify-center bg-white">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover md:object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/10 to-transparent"></div>
                    <div className="absolute top-4 left-4 w-12 h-12 bg-black rounded-full flex items-center justify-center border border-white shadow-lg">
                      <span className="text-lg text-white font-bold">
                        {activeStep + 1}
                      </span>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center bg-white">
                    <div className="space-y-2">
                      <div className="inline-block px-4 py-1 bg-black text-white rounded-full text-sm font-medium">
                        Step {activeStep + 1}
                      </div>

                      <h3 className="text-2xl md:text-3xl text-black font-semibold">
                        {step.title}
                      </h3>

                      <p className="text-base md:text-lg text-black leading-relaxed font-normal">
                        {step.description}
                      </p>

                      <div className="flex gap-2 pt-4">
                        {steps.map((_, idx) => (
                          <div
                            key={idx}
                            className={`h-1 rounded-full transition-all duration-500 ${
                              idx <= activeStep
                                ? "bg-black flex-1"
                                : "bg-gray-400 w-4"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="block md:hidden max-w-3xl mx-auto space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="p-2">
              <h3 className="text-xl text-white font-semibold mb-2">
                Step {index + 1} – {step.title}
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div style={{ height: `${(steps.length - 1) * 100}vh` }} />
      </div>
    </section>
  );
}
