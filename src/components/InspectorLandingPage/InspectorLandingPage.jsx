import { CTA } from "./CTA";
import { Features } from "./Features";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { MarketPlace } from "./MarketPlace";
import { Navbar } from "./Navbar";
import { Footer } from "../NewHomePage/app/components/Footer";
import { CheckCircle2 } from "lucide-react";
import WhyUs from "./WhyUs";

export default function InspectorLandingPage() {
  return (
    <div className="min-h-screen bg-black font-sans text-white">
      <Navbar />
      <main>
        <Hero />
        <section className="max-w-4xl mx-auto px-4 mb-16">
          <div className="bg-white/6 backdrop-blur-md border border-white/15 rounded-2xl p-8 text-center shadow-lg">
            <h2 className="text-2xl font-medium text-white mb-6">
              No Credit – Assured Payment Model
            </h2>

            <div className="space-y-4 text-gray-300 text-left max-w-2xl mx-auto mb-6">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-1" />
                <span>20% advance while quality analysis</span>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-1" />
                <span>100% payment at submitting reports</span>
              </div>
            </div>

            <div className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600/90 to-blue-600/90 px-5 py-3 rounded-xl border border-white/20 text-white font-medium hover:scale-[1.02] transition-transform">
              Expand your business in Global locations
            </div>
          </div>
        </section>

        <section id="features">
          <Features />
        </section>
        <section id="how-it-works">
          <HowItWorks />
        </section>
        <section id="why-qualty.ai">
          <WhyUs />
        </section>
        <CTA />
      </main>
  <Footer/>
    </div>
  );
}
