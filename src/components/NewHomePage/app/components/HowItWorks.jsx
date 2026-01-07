import { FileText, Users, Search, CheckCircle, ArrowRight } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: FileText,
      title: "Post Inspection Requirement",
      description: "Submit detailed inspection needs with specifications, location, and timeline. Free and instant."
    },
    {
      number: "02",
      icon: Users,
      title: "Receive Competitive Bids",
      description: "Certified inspectors and companies submit proposals. Compare pricing, credentials, and reviews."
    },
    {
      number: "03",
      icon: Search,
      title: "Select Inspector & Collaborate",
      description: "Choose the best offer and coordinate directly. Track progress in real-time with live updates."
    },
    {
      number: "04",
      icon: CheckCircle,
      title: "Get Certified Inspection Reports",
      description: "Receive standardized, verified reports with complete documentation and quality certification."
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-white border-t border-black/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-[800px] mx-auto text-center mb-20">
          <div className="text-sm text-black/40 mb-4 tracking-wide uppercase">
            Process
          </div>
          <h2 className="text-4xl lg:text-5xl tracking-tight mb-6">
            How Qualty.AI Works
          </h2>
          <p className="text-lg text-black/60 leading-relaxed">
            A streamlined 4-step process that takes inspection coordination from
            weeks to hours.
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-black/10">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2">
                      <ArrowRight size={16} strokeWidth={1.5} className="text-black/20" />
                    </div>
                  </div>
                )}

                <div className="relative z-10">
                  {/* Step Number */}
                  <div className="text-5xl tracking-tighter text-black/10 mb-6">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl border border-black/10 flex items-center justify-center mb-6">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg mb-3">{step.title}</h3>
                  <p className="text-black/60 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <button className="bg-black text-white px-8 py-4 rounded-lg hover:bg-black/90 transition-all inline-flex items-center gap-2 group">
            Start Your First Inspection
            <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
