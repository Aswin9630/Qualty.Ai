import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from './UI/Button';
import { Link } from 'react-router-dom';


export function CTA() {
  return (
    <section className="py-18 bg-gradient-to-b from-zinc-950 to-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-pink-600/20 border border-white/10 backdrop-blur-sm p-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/30 rounded-full blur-3xl"></div>

          <div className="relative z-10 text-center">
            <h2 className="mb-6 text-3xl font-medium">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Ready to Transform Your Global Quality Inspection
              </span>
            </h2>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of quality partners across global offering service to millions of traders
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-10">
              
              <Link to="/signup"><Button size="lg" className="cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0">
             Start for Free
            
          </Button></Link>
 
            </div>

            <div className="flex flex-wrap gap-6 justify-center text-sm text-gray-400">
        
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>100% free platform</span>
              </div>
           
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}