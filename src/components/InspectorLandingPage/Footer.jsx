import { Linkedin, Twitter, Youtube, Mail } from 'lucide-react';
import logo from '../../assets/QualtyAILogo.png';

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="px-20 grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">

          <div>
            <div className="flex items-center mb-4">
              <img src={logo} alt="Qualty.ai Logo" className="h-8" />
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Transform your quality inspections across global supply chains with AI-powered insights.
            </p>
            <div className="flex gap-4">
              {[Twitter, Linkedin, Youtube, Mail].map((Icon, i) => (
                <a key={i} href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Social link">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>


          <div>
            <h4 className="text-white mb-4 font-semibold">Product</h4>
            <ul className="space-y-2 text-sm">
              {['Features', 'Pricing', 'Marketplace', 'Integrations', 'API'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4 font-semibold">Company</h4>
            <ul className="space-y-2 text-sm">
              {['About Us', 'Careers', 'Blog', 'Press Kit', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4 font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm">
              {['Documentation', 'Help Center', 'Community', 'Status', 'Terms & Privacy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">© 2025 Qualty.ai. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-400">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a key={item} href="#" className="hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}