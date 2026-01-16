// import { FaLinkedin, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
// import { SiSubstack } from "react-icons/si";
// import { Link } from "react-router-dom";
// import ISO9001 from "../assets/ISO_9001.png";
// import ISO22000 from "../assets/ISO_22000.png";
// import ISO27001 from "../assets/ISO_27001.png";

// export default function NewFooter() {
//   return (
//     <footer className="bg-white text-black py-10 px-6 sm:px-12 lg:px-20 text-xs sm:text-sm">
//       <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-10">
//         <div>
//           <h3 className="text-sm sm:text-base font-semibold mb-4">Register</h3>
//           <ul className="space-y-2 text-gray-400">
//             <li>
//               <Link to="/login" className="hover:text-black">
//                 Customer
//               </Link>
//             </li>
//             <li>
//               <Link to="/login" className="hover:text-black">
//                 Inspector
//               </Link>
//             </li>
//           </ul>
//         </div>

//         <div>
//           <h3 className="text-sm sm:text-base font-semibold mb-4">Support</h3>
//           <ul className="space-y-2 text-gray-400">
//             <li>
//               <Link to="/about" className="hover:text-black">
//                 About
//               </Link>
//             </li>

//             <li>
//               <Link to="/contact" className="hover:text-black">
//                 Help Center
//               </Link>
//             </li>
//           </ul>
//         </div>

//         <div>
//           <h3 className="text-sm sm:text-base font-semibold mb-4">Legal</h3>
//           <ul className="space-y-2 text-gray-400">
//             {/* <li>
//               <Link to="/privacy-policy" className="hover:text-black">
//                 Terms of Service
//               </Link>
//             </li> */}
//             <li>
//               <Link to="/privacy-policy" className="hover:text-black">
//                 Privacy Policy
//               </Link>
//             </li>
//             <li>
//               <Link to="/how-safe-is-your-data" className="hover:text-black">
//                 How Safe Is Your Data
//               </Link>
//             </li>
//           </ul>
//         </div>

//         <div>
//   <h3 className="text-sm sm:text-base font-semibold mb-4">Social Media</h3>
//   <div className="flex flex-wrap gap-4 sm:gap-6">
//     <a href="https://www.linkedin.com/company/qualty-ai-inspection" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition">
//       <FaLinkedin className="text-xl" />
//     </a>
//     <a href="https://www.instagram.com/qualty.ai?igsh=d2ppcmRzY2U0dzl5&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition">
//       <FaInstagram className="text-xl" />
//     </a>
//     <a href="https://www.youtube.com/@qualty_ai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition">
//       <FaYoutube className="text-xl" />
//     </a>
//     <a href="https://qualtyai.substack.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition">
//       <SiSubstack className="text-xl" />
//     </a>
//     <a href="https://twitter.com/qualty_ai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition">
//       <FaTwitter className="text-xl" />
//     </a>
//   </div>
// </div>

//       </div>

//       <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center pt-4">
//         <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
//           &copy; {new Date().getFullYear()} Qualty.ai. (in association with
//           CargoFirst QAHO Corporation Pvt. Ltd.) All rights reserved. | CIN:
//           U51909KA2022PTC161277
//         </p>
//       </div>
//     </footer>
//   );
// }






import { FaLinkedin, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { SiSubstack } from "react-icons/si";
import { Link } from "react-router-dom";
// import IREF from "../assets/IREF.avif";
// import ISO22000 from "../assets/ISO_22000.png";
// import ISO27001 from "../assets/ISO_27001.png";
 
export default function NewFooter() {
  return (
    <footer className="bg-white text-black py-10 px-6 sm:px-12 lg:px-20 text-xs sm:text-sm">

      <div className="max-w-7xl mx-auto py-8 border-b border-gray-200">
        <h3 className="text-sm sm:text-base font-semibold mb-6 text-center">
          Our Certifications
        </h3>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex flex-col items-center">
            <img
              src="https://d3fmssennfe86p.cloudfront.net/wp-content/uploads/2025/04/iso.svg"
              alt="ISO 9001:2015 Certification"
              className="h-16 object-contain"
            />
            <p className="font-semibold">9001:2015</p>
          </div>
          <div className="flex flex-col items-center">
            <img
                 src="https://d3fmssennfe86p.cloudfront.net/wp-content/uploads/2025/04/iso.svg"
              alt="ISO 22000:2018 Certification"
              className="h-16 object-contain"
            />
             <p className="font-semibold">22000:2018</p>
          </div>
          <div className="flex flex-col items-center">
            <img
                 src="https://d3fmssennfe86p.cloudfront.net/wp-content/uploads/2025/04/iso.svg"
              alt="ISO 27001:2022 Certification"
              className="h-15 object-contain"
            />
             <p className="font-semibold">27001:2022</p>
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-200 pb-10">
        <div>
          <h3 className="text-sm sm:text-base font-semibold mb-4">Register</h3>
          <ul className="space-y-2 text-gray-500">
            <li>
              <Link to="/login" className="hover:text-black">
                Customer
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-black">
                Inspector
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm sm:text-base font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-gray-500">
            <li>
              <Link to="/about" className="hover:text-black">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-black">
                Help Center
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm sm:text-base font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-gray-500">
            <li>
              <Link to="/privacy-policy" className="hover:text-black">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/how-safe-is-your-data" className="hover:text-black">
                How Safe Is Your Data
              </Link>
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
              className="text-gray-500 hover:text-black transition"
            >
              <FaLinkedin className="text-xl" />
            </a>
            <a
              href="https://www.instagram.com/qualty.ai?igsh=d2ppcmRzY2U0dzl5&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-black transition"
            >
              <FaInstagram className="text-xl" />
            </a>
            <a
              href="https://www.youtube.com/@qualty_ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-black transition"
            >
              <FaYoutube className="text-xl" />
            </a>
            <a
              href="https://qualtyai.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-black transition"
            >
              <SiSubstack className="text-xl" />
            </a>
            <a
              href="https://twitter.com/qualty_ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-black transition"
            >
              <FaTwitter className="text-xl" />
            </a>
          </div>
        </div>
      </div>

    

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
