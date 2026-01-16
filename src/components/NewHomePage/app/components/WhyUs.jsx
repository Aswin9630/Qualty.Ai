import { ArrowRight } from "lucide-react";
import {Link} from "react-router-dom"

export function WhyUs() {
  return (
    <section id="why-us" className="py-24 lg:py-32 bg-white border-t border-black/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-[800px] mb-20">
          <div className="text-sm text-black/40 mb-4 tracking-wide uppercase">
            Our Mission
          </div>
          <h2 className="text-4xl lg:text-5xl tracking-tight mb-6">
            Why We Built Qualty AI
          </h2>
          <p className="text-lg text-black/60 leading-relaxed">
           Global trade has a critical need for trust, transparency, and efficiency
            in the global inspection ecosystem. Traditional methods are outdated,
            fragmented, and costly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-6">
            <div className="inline-flex px-4 py-2 rounded-full bg-black/5 text-sm">
              Traditional Method
            </div>

            <div className="space-y-4">
              {[
                "Email back-and-forth to find inspectors",
                "Negotiate pricing without transparency",
                "Manual scheduling and coordination",
                "Wait for reports via email/Whatsapp",
                "Limited visibility and accountability"
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-black/20 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-black/20 rounded-full"></div>
                  </div>
                  <div className="pt-1">
                    <p className="text-black/60">{step}</p>
                    {index < 4 && (
                      <div className="w-px h-8 bg-black/10 ml-3.5 mt-2"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-black/[0.02] rounded-xl p-6 border border-black/10">
              <div className="text-sm text-black/40 mb-2">Average Timeline</div>
              <div className="text-2xl tracking-tight">7-14 days</div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex px-4 py-2 rounded-full bg-black text-white text-sm">
              With Qualty AI
            </div>

            <div className="space-y-4">
              {[
                "Post requirement in minutes",
                "Receive competitive bids instantly",
                "Compare and select best offer",
                "Real-time collaboration and tracking",
                "Instant certified reports"
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="pt-1">
                    <p className="text-black">{step}</p>
                    {index < 4 && (
                      <div className="w-px h-8 bg-black/20 ml-3.5 mt-2"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-black text-white rounded-xl p-6">
              <div className="text-sm text-white/60 mb-2">Average Timeline</div>
              <div className="text-2xl tracking-tight">24-48 hours</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20 pt-20 border-t border-black/5">
          <div>
            <div className="text-3xl mb-3 tracking-tight">20%</div>
            <div className="text-black/60 leading-relaxed">
              Faster inspection coordination and completion
            </div>
          </div>
          <div>
            <div className="text-3xl mb-3 tracking-tight">40%</div>
            <div className="text-black/60 leading-relaxed">
              Average cost savings through competitive bidding
            </div>
          </div>
          <div>
            <div className="text-3xl mb-3 tracking-tight">100%</div>
            <div className="text-black/60 leading-relaxed">
              Transparency in pricing, credentials, and progress
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link to="/demo"><button className="cursor-pointer font-semibold bg-black text-white px-8 py-4 rounded-lg hover:bg-black/90 transition-all inline-flex items-center gap-2 group">
            Start Demo
            <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
          </button></Link>
        </div>
      </div>
    </section>
  );
}
