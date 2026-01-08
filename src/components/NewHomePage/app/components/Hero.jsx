import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-white">
      <div className="absolute inset-0 opacity-[0.08]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, black 1px, transparent 1px),
            linear-gradient(to bottom, black 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
        <div className="max-w-[900px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white mb-8">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            <span className="text-sm">100% Free Platform</span>
          </div>

          <h1 className="text-[56px] lg:text-[72px] leading-[1.1] tracking-tight mb-6">
            Global Inspections.
            <br />
            <span className="text-black/40">Simplified.</span>
          </h1>

          <p className="text-xl lg:text-2xl text-black/60 mb-4 leading-relaxed">
            Where global trade meets quality.
          </p>

          <p className="text-base lg:text-lg text-black/50 mb-12 max-w-[700px] mx-auto leading-relaxed">
            Qualty.AI connects global traders with certified inspectors. Post your
            inspection needs, compare bids, and collaborate in real time — all in
            one seamless platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <a href="#finalCTA"><button className="bg-black cursor-pointer text-white px-8 py-4 rounded-lg hover:bg-black/90 transition-all inline-flex items-center gap-2 group">
              Get Started Free
              <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </button></a>
            <a href="/demo"><button className="border font-semibold cursor-pointer border-black/50 text-black px-8 py-4 rounded-lg hover:border-black/20 hover:bg-black/[0.02] transition-all">
              Start Demo
            </button></a>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-[600px] mx-auto pt-12 border-t border-black/5">
            <div>
              <div className="text-3xl tracking-tight mb-1">50+</div>
              <div className="text-sm text-black/40">Countries</div>
            </div>
            <div>
              <div className="text-3xl tracking-tight mb-1">2K+</div>
              <div className="text-sm text-black/40">Inspection Partners</div>
            </div>
            <div>
              <div className="text-3xl tracking-tight mb-1">50K+</div>
              <div className="text-sm text-black/40">Inspections</div>
            </div>
          </div>
        </div>
      </div>
    </section> 
  );
}