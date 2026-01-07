import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from './UI/Button';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 py-20 relative z-10 text-center max-w-5xl">
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mx-auto max-w-max">
          <CheckCircle2 className="w-4 h-4 text-green-400" />
          <span className="text-sm text-gray-300">Trusted by 500+ global businesses</span>
        </div>

        <h1 className="mb-6 font-medium text-5xl leading-tight">
          <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Cater Inspections for Global Traders
          </span>
        </h1>

        <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
          Get inspection queries from global traders on a one-stop platform - Global Inspection Simplified
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <Link to="/signup"><Button size="lg" className="cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0">
            Get Started Free
            
          </Button></Link>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">50+</div>
            <p className="text-sm text-gray-400">Countries Covered</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-medium bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">10K+</div>
            <p className="text-sm text-gray-400">Traders</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-medium bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent mb-2">100%</div>
            <p className="text-sm text-gray-400">Customer Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
}

