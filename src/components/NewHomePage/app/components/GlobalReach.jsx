import { Globe, MapPin, TrendingUp } from "lucide-react";

export function GlobalReach() {
  const regions = [
    { name: "Asia Pacific", count: "4,800+", percentage: "48%" },
    { name: "Europe", count: "3,200+", percentage: "32%" },
    { name: "North America", count: "2,500+", percentage: "25%" },
    { name: "Middle East", count: "1,500+", percentage: "15%" },
    { name: "Latin America", count: "1,200+", percentage: "12%" },
    { name: "Africa", count: "900+", percentage: "9%" }
  ];

  return (
    <section id="global-reach" className="py-24 lg:py-32 bg-black/[0.02] border-t border-black/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-[800px] mx-auto text-center mb-20">
          <div className="text-sm text-black/40 mb-4 tracking-wide uppercase">
            Global Network
          </div>
          <h2 className="text-4xl lg:text-5xl tracking-tight mb-6">
            Trusted Worldwide
          </h2>
          <p className="text-lg text-black/60 leading-relaxed">
            Used by traders and inspectors across Asia, Europe, Middle East, Africa,
            and the Americas. Operating in over 150 countries.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-8 border border-black/10 text-center">
            <Globe size={32} strokeWidth={1.5} className="mx-auto mb-4 text-black/40" />
            <div className="text-4xl tracking-tight mb-2">150+</div>
            <div className="text-black/60">Countries Served</div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-black/10 text-center">
            <MapPin size={32} strokeWidth={1.5} className="mx-auto mb-4 text-black/40" />
            <div className="text-4xl tracking-tight mb-2">25+</div>
            <div className="text-black/60">Inspection Categories</div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-black/10 text-center">
            <TrendingUp size={32} strokeWidth={1.5} className="mx-auto mb-4 text-black/40" />
            <div className="text-4xl tracking-tight mb-2">10,000+</div>
            <div className="text-black/60">Global Professionals</div>
          </div>
        </div>

        {/* World Map Visualization */}
        <div className="bg-white rounded-2xl border border-black/10 p-8 lg:p-12 mb-12">
          <div className="relative">
            {/* Map Image */}
            <img
              src="https://images.unsplash.com/photo-1586448911122-f74aa8e3e4b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JsZCUyMG1hcCUyMGNvbm5lY3Rpb25zfGVufDF8fHx8MTc2NjM5MDM1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Global Network"
              className="w-full rounded-xl opacity-30"
            />
            
            {/* Live badge */}
            <div className="absolute top-4 left-4 bg-white rounded-lg px-4 py-2 border border-black/10 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm">Live Inspections Worldwide</span>
            </div>
          </div>
        </div>

        {/* Regional Breakdown */}
        <div>
          <h3 className="text-2xl tracking-tight mb-8">Users by Region</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {regions.map((region, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-black/10 hover:border-black/20 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg">{region.name}</h4>
                  <div className="text-sm text-black/40">{region.percentage}</div>
                </div>
                <div className="text-2xl tracking-tight mb-3">{region.count}</div>
                <div className="h-1 bg-black/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black rounded-full"
                    style={{ width: region.percentage }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
