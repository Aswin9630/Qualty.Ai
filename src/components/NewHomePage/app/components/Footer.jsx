import {Link} from "react-router-dom"
import { FaLinkedin, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { SiSubstack } from "react-icons/si";

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">

          <div>
            <div className="text-sm text-white/40 mb-4 tracking-wide uppercase">
              Platform
            </div>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="#what-is" className="text-white/60 hover:text-white transition-colors text-sm">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#why-us" className="text-white/60 hover:text-white transition-colors text-sm">
                  Why Qualty
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-sm text-white/40 mb-4 tracking-wide uppercase">
              Who We Built This For
            </div>
            <ul className="space-y-3">
              <li>
                <a href="/customer/landingpage" className="text-white/60 hover:text-white transition-colors text-sm">
                  For Importers/Exporters
                </a>
              </li>
              <li>
                <a href="/inspector/landingpage" className="text-white/60 hover:text-white transition-colors text-sm">
                  For Inspectors
                </a>
              </li>
              <li>
                <a href="/inspector/landingpage" className="text-white/60 hover:text-white transition-colors text-sm">
                  For Companies
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-sm text-white/40 mb-4 tracking-wide uppercase">
              Legal & Trust
            </div>
            <ul className="space-y-3">
              <li>
                <a href="/privacy-policy" className="text-white/60 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/how-safe-is-your-data" className="text-white/60 hover:text-white transition-colors text-sm">
                  How Safe Is Your Data
                </a>
              </li>
            </ul>
          </div>

           <div>
                    <h3 className="text-sm sm:text-base font-semibold mb-4">Social Media</h3>
                    <div className="flex flex-wrap gap-4 sm:gap-6">
                      <a
                        href="https://www.linkedin.com/company/qualty-ai-inspection"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white transition"
                      >
                        <FaLinkedin className="text-xl" />
                      </a>
                      <a
                        href="https://www.instagram.com/qualty.ai?igsh=d2ppcmRzY2U0dzl5&utm_source=qr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white transition"
                      >
                        <FaInstagram className="text-xl" />
                      </a>
                      <a
                        href="https://www.youtube.com/@qualty_ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white transition"
                      >
                        <FaYoutube className="text-xl" />
                      </a>
                      <a
                        href="https://qualtyai.substack.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white transition"
                      >
                        <SiSubstack className="text-xl" />
                      </a>
                      <a
                        href="https://twitter.com/qualty_ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white transition"
                      >
                        <FaTwitter className="text-xl" />
                      </a>
                    </div>
                  </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-white/40">
              Built for global trade. Trusted worldwide.
            </div>
            <div className="flex items-center gap-6 text-sm text-white/40">
              <a className="hover:text-white transition-colors">
                ISO 9001:2015
              </a>
              <a className="hover:text-white transition-colors">
                ISO 27001:2022
              </a>
              <a className="hover:text-white transition-colors">
               ISO 22000:2018
              </a>
            </div>
             <div className="text-sm text-white/40">
              © 2024 Qualty.AI • All Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
