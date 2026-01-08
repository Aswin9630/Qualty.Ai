import { AlertCircle, DollarSign, Mail, Clock, Eye } from "lucide-react";

export function ProblemSection() {
  const problems = [
    {
      icon: AlertCircle,
      title: "Lack of Trust",
      description: "No standardized verification of inspector credentials and quality"
    },
    { 
      icon: DollarSign,
      title: "No Price Transparency",
      description: "Price varying based on Customers and Volumes/Negotiation"
    },
    {
      icon: Mail,
      title: "Manual Coordination",
      description: "Endless email chains, phone calls, Whatsapp slow down operations"
    },
    {
      icon: Clock,
      title: "Delayed Inspections",
      description: "Scheduling conflicts and miscommunication cause shipment delays"
    },
    {
      icon: Eye,
      title: "No Real-time Visibility",
      description: "Lack of live tracking and status updates on inspection progress"
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-black/[0.02] border-t border-black/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-[800px] mx-auto text-center mb-20">
          <div className="text-lg md:text-2xl text-black/40 mb-4 tracking-wide uppercase">
            Industry Challenges
          </div>
          <h2 className="text-4xl lg:text-5xl tracking-tight mb-6">
            The Problem We Solve
          </h2>
          <p className="text-lg text-black/60 leading-relaxed">
            The global inspection ecosystem is fragmented, opaque, and inefficient.
            These challenges cost businesses billions annually and erode trust in
            international trade.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-black/10 hover:border-black/20 transition-all"
              >
                <div className="w-12 h-12 rounded-xl border border-black/10 flex items-center justify-center mb-6">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg mb-3">{problem.title}</h3>
                <p className="text-black/60 leading-relaxed">
                  {problem.description}
                </p>
              </div>
            );
          })}

          <div className="bg-black text-white rounded-2xl p-8 md:col-span-2 lg:col-span-1">
            <div className="text-sm text-white/60 mb-4 tracking-wide uppercase">
              Business Impact
            </div>
            <div className="text-3xl mb-2 tracking-tight font-bold">42 trillion $</div>
            <p className="text-white/70 leading-relaxed">
              Annual losses in global trade due to inspection inefficiencies and
              quality issues
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
