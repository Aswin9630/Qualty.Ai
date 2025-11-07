import { FaLinkedin, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { SiSubstack } from "react-icons/si";
import { Link } from "react-router-dom";

export default function NewFooter() {
  return (
    <footer className="bg-black text-white py-10 px-6 sm:px-12 lg:px-20 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-10">
        <div>
          <h3 className="text-sm sm:text-base font-semibold mb-4">Register</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link to="/login" className="hover:text-white">
                Customer
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white">
                Inspector
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm sm:text-base font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link to="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Help Center
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm sm:text-base font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link to="/privacy-policy" className="hover:text-white">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/how-safe-is-your-data" className="hover:text-white">
                How Safe Is Your Data
              </Link>
            </li>
          </ul>
        </div>

        <div>
  <h3 className="text-sm sm:text-base font-semibold mb-4">Social Media</h3>
  <div className="flex flex-wrap gap-4 sm:gap-6">
    <a href="https://www.linkedin.com/company/qualty-ai-inspection" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
      <FaLinkedin className="text-xl" />
    </a>
    <a href="https://www.instagram.com/qualty.ai?igsh=d2ppcmRzY2U0dzl5&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
      <FaInstagram className="text-xl" />
    </a>
    <a href="https://www.youtube.com/@qualty_ai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
      <FaYoutube className="text-xl" />
    </a>
    <a href="https://qualtyai.substack.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
      <SiSubstack className="text-xl" />
    </a>
    <a href="https://twitter.com/qualty_ai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
      <FaTwitter className="text-xl" />
    </a>
  </div>
</div>

      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center pt-4">
        <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
          &copy; {new Date().getFullYear()} Qualty.ai. (in association with
          CargoFirst QAHO Corporation Pvt. Ltd.) All rights reserved. | CIN:
          U51909KA2022PTC161277
        </p>
      </div>
    </footer>
  );
}
