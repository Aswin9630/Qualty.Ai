import { FileCheck, Users, Clock, Shield } from "lucide-react";

export function WhatIsQualty() {

  const inspections = [
  {
    title: "Textile Inspection",
    location: "Shanghai, China",
    bids: 5,
    progress: 70,
  },
  {
    title: "Electronics Inspection",
    location: "Shenzhen, China",
    bids: 8,
    progress: 50,
  },
  {
    title: "Food Quality Inspection",
    location: "Mumbai, India",
    bids: 3,
    progress: 80,
  },
];

  return (
    <section id="what-is" className="py-24 lg:py-32 bg-white border-t border-black/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-[800px] mb-20">
          <div className="text-sm text-black/40 mb-4 tracking-wide uppercase">
            Platform Overview
          </div>
          <h2 className="text-4xl lg:text-5xl tracking-tight mb-6">
            Qualty.AI — Global Inspection Marketplace
          </h2>
          <p className="text-lg text-black/60 leading-relaxed">
            A centralized platform that revolutionizes quality inspections in
            international trade through transparency, efficiency, and trust.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-20">
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl border border-black/10 flex items-center justify-center">
                <FileCheck size={20} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-lg mb-2">Centralized Inspection Demand Posting</h3>
                <p className="text-black/60 leading-relaxed">
                  Post inspection requirements with detailed specifications. Reach
                  thousands of certified professionals instantly.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl border border-black/10 flex items-center justify-center">
                <Users size={20} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-lg mb-2">Competitive Bidding from Certified Inspectors</h3>
                <p className="text-black/60 leading-relaxed">
                  Compare proposals from verified inspectors and inspection companies.
                  Full transparency on pricing and credentials.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl border border-black/10 flex items-center justify-center">
                <Clock size={20} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-lg mb-2">Real-time Collaboration & Updates</h3>
                <p className="text-black/60 leading-relaxed">
                  Track inspection progress live. Communicate directly with inspectors.
                  Receive instant notifications and updates.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl border border-black/10 flex items-center justify-center">
                <Shield size={20} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-lg mb-2">Transparent Reports & Documentation</h3>
                <p className="text-black/60 leading-relaxed">
                  Receive standardized, certified inspection reports. Complete audit
                  trail and documentation for compliance.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl border border-black/10 bg-gradient-to-br from-black/[0.02] to-black/[0.06] p-8 lg:p-12">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-black/10">
                  <div className="text-sm">Active Inspections</div>
                  <div className="text-xs text-black/40">Live</div>
                </div>

                <div className="space-y-3">
  {inspections.map((inspection, index) => (
    <div
      key={index}
      className="bg-white rounded-lg p-4 border border-black/5"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="text-sm">{inspection.title}</div>
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      </div>
      <div className="text-xs text-black/40 mb-3">
        {inspection.location} • {inspection.bids} bids received
      </div>
      <div className="flex gap-2">
        <div className="h-1.5 flex-1 bg-black/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-black"
            style={{ width: `${inspection.progress}%` }}
          ></div>
        </div>
        <div className="text-xs text-black/40">{inspection.progress}%</div>
      </div>
    </div>
  ))}
</div>


                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-black/10">
                  <div>
                    <div className="text-xs text-black/40 mb-1">Total</div>
                    <div className="text-lg">24</div>
                  </div>
                  <div>
                    <div className="text-xs text-black/40 mb-1">Active</div>
                    <div className="text-lg">12</div>
                  </div>
                  <div>
                    <div className="text-xs text-black/40 mb-1">Complete</div>
                    <div className="text-lg">9</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl border border-black/10 px-6 py-4 shadow-lg">
              <div className="text-sm text-black/40 mb-1">Platform Status</div>
              <div className="text-xl tracking-tight">Active Worldwide</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
