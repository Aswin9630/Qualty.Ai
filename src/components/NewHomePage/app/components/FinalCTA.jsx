import { ArrowRight } from "lucide-react";
import {Link} from "react-router-dom"

export function FinalCTA() {
  return (
    <section id="finalCTA" className="py-24 lg:py-32 bg-white border-t border-black/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl tracking-tight mb-8">
            Build Trust into
            <br />
            Every Shipment.
          </h2>
          
          <p className="text-xl text-black/60 mb-12 leading-relaxed">
            Join thousands of importers, inspectors, and inspection companies
            transforming global trade through transparent quality inspections.
          </p>
            
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/customer/landingpage"><button className="cursor-pointer bg-black text-white px-8 py-4 rounded-lg hover:bg-black/90 transition-all inline-flex items-center gap-2 group">
              Join as Importer/Exporter
              <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </button></Link>
           <Link to="/inspector/landingpage"><button className="cursor-pointer bg-black text-white px-8 py-4 rounded-lg hover:bg-black/90 transition-all inline-flex items-center gap-2 group">
              Join as Inspector
              <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </button></Link> 
            <Link to="/inspector/landingpage"><button className="cursor-pointer border border-black/10 text-black px-8 py-4 rounded-lg hover:border-black/20 hover:bg-black/[0.02] transition-all">
              Join as Inspection Company
            </button></Link> 
          </div>

          <div className="mt-12 pt-12 border-t border-black/5">
            <p className="text-sm text-black/40">
              100% Free to join • No credit card required • Start in minutes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
