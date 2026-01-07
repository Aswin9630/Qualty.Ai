// import { Shield, Globe, Zap, Users, FileCheck, TrendingUp } from 'lucide-react';

// const features = [
//   {
//     icon: Shield,
//     title: 'Certified Inspectors',
//     description: 'Access a network of pre-vetted, certified quality inspectors across 150+ countries.',
//     gradient: 'from-purple-400 to-pink-400',
//   },
//   {
//     icon: Globe,
//     title: 'Global Marketplace',
//     description: 'Connect with inspection providers worldwide in seconds. Real-time availability and instant booking.',
//     gradient: 'from-blue-400 to-cyan-400',
//   },
//   {
//     icon: Zap,
//     title: 'Lightning Fast',
//     description: 'Get inspection reports within 24-48 hours. AI-powered quality analysis for instant insights.',
//     gradient: 'from-pink-400 to-orange-400',
//   },
//   {
//     icon: FileCheck,
//     title: 'Comprehensive Reports',
//     description: 'Detailed inspection reports with photos, videos, and compliance documentation.',
//     gradient: 'from-green-400 to-emerald-400',
//   },
//   {
//     icon: Users,
//     title: 'Transparent Process',
//     description: 'Track every step of your inspection in real-time. Full visibility from booking to completion.',
//     gradient: 'from-violet-400 to-purple-400',
//   },
//   {
//     icon: TrendingUp,
//     title: 'Data Analytics',
//     description: 'Make informed decisions with quality trends, supplier scorecards, and predictive insights.',
//     gradient: 'from-orange-400 to-red-400',
//   },
// ];

// export function Features() {
//   return (
//     <section className="py-18 bg-gradient-to-b from-black to-zinc-950">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-16 max-w-3xl mx-auto">
//           <h2 className="mb-4 font-medium text-4xl">
//             <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
//               Everything You Need
//             </span>
//             <span className="block text-white mt-2">To Ensure Quality at Scale</span>
//           </h2>
//           <p className="text-xl text-gray-400">
//             Streamline your quality control process with cutting-edge technology and global expertise.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
//           {features.map(({ icon: Icon, title, description, gradient }, i) => (
//             <div
//               key={i}
//               className="group p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300"
//             >
//               <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient} mb-4`}>
//                 <Icon className="w-6 h-6 text-white" />
//               </div>
//               <h3 className="text-white mb-3 font-semibold">{title}</h3>
//               <p className="text-gray-400">{description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



// import { Globe, TrendingUp, Users, FileCheck } from "lucide-react";

// const features = [
//   { 
//     icon: Globe,
//     title: "Global Inspection Queries",
//     description:
//       "Receive inspection requirements from verified global traders across multiple industries and locations, all in one unified marketplace.",
//     gradient: "from-purple-400 to-pink-400"
//   },
//   {
//     icon: TrendingUp,
//     title: "Bidding against budget",
//     description:
//       "Place competitive bids aligned with trader budgets and win projects based on expertise, timeline, and quality commitment.",
//     gradient: "from-blue-400 to-cyan-400"
//   },
//   {
//     icon: Users,
//     title: "Real-time Collaboration & Updates",
//     description:
//       "Track inspection progress live. Communicate directly with traders through instant chat, updates, and evidence sharing.",
//     gradient: "from-violet-400 to-purple-400"
//   },
//   {
//     icon: FileCheck,
//     title: "Transparent Reports & Documentation",
//     description:
//       "Complete audit trail and documentation for compliance with structured reports, photos, and verification records.",
//     gradient: "from-green-400 to-emerald-400"
//   }
// ];

// export function Features() {
//   return (
//     <section className="relative py-24 md:py-32 lg:py-40 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl opacity-20 animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }}></div>
//       </div>

//       <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16 md:mb-20 lg:mb-24 max-w-3xl mx-auto">
//           <div className="inline-block mb-4 md:mb-6">
//             <span className="text-sm font-semibold text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text uppercase tracking-widest">
//               What You'll Get
//             </span>
//           </div>

//           <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 md:mb-8">
//             <span className="block">Everything You Need</span>
//             <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
//               To Ensure Quality at Scale
//             </span>
//           </h2>

//           <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
//             Streamline your quality control process with cutting-edge technology
//             and global expertise.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
//           {features.map(
//             ({ icon: Icon, title, description, gradient }, i) => (
//               <div
//                 key={i}
//                 className="group relative h-full"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

//                 <div className="relative h-full p-6 sm:p-7 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 group">
//                   <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${gradient} mb-5 md:mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110`}>
//                     <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
//                   </div>

//                   <div className="flex flex-col h-full">
//                     <h3 className="text-lg sm:text-xl font-bold text-white mb-3 md:mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r from-purple-400 to-blue-400 group-hover:bg-clip-text transition-all duration-300">
//                       {title}
//                     </h3>
//                     <p className="text-gray-400 text-sm sm:text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300 flex-grow">
//                       {description}
//                     </p>
//                   </div>

//                   <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${gradient} rounded-b-2xl w-0 group-hover:w-full transition-all duration-500`}></div>
//                 </div>
//               </div>
//             )
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }


// import { Globe, TrendingUp, Users, FileCheck } from "lucide-react";

// const features = [
//   { 
//     icon: Globe,
//     title: "Global Inspection Queries",
//     description:
//       "Receive inspection requirements from verified global traders across multiple industries and locations, all in one unified marketplace.",
//     gradient: "from-purple-400 to-pink-400"
//   },
//   {
//     icon: TrendingUp,
//     title: "Bidding against budget",
//     description:
//       "Place competitive bids aligned with trader budgets and win projects based on expertise, timeline, and quality commitment.",
//     gradient: "from-blue-400 to-cyan-400"
//   },
//   {
//     icon: Users,
//     title: "Real-time Collaboration & Updates",
//     description:
//       "Track inspection progress live. Communicate directly with traders through instant chat, updates, and evidence sharing.",
//     gradient: "from-violet-400 to-purple-400"
//   },
//   {
//     icon: FileCheck,
//     title: "Transparent Reports & Documentation",
//     description:
//       "Complete audit trail and documentation for compliance with structured reports, photos, and verification records.",
//     gradient: "from-green-400 to-emerald-400"
//   }
// ];

// export function Features() {
//   return (
//     <section className="py-20 md:py-28 bg-white">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16 max-w-2xl mx-auto">
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             Everything You Need
//           </h2>
//           <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
//             To Ensure Quality at Scale
//           </h2>
//           <p className="text-lg text-gray-600">
//             Streamline your quality control process with cutting-edge technology and global expertise.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
//           {features.map(
//             ({ icon: Icon, title, description, gradient }, i) => (
//               <div key={i} className="group">
//                 <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${gradient} mb-4`}>
//                   <Icon className="w-6 h-6 text-white" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                   {title}
//                 </h3>
//                 <p className="text-gray-600 leading-relaxed">
//                   {description}
//                 </p>
//               </div>
//             )
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }


// import { Globe, TrendingUp, Users, FileCheck } from "lucide-react";

// const features = [
//   { 
//     icon: Globe,
//     title: "Global Inspection Queries",
//     description:
//       "Receive inspection requirements from verified global traders across multiple industries and locations, all in one unified marketplace.",
//     gradient: "from-purple-500 to-pink-500"
//   },
//   {
//     icon: TrendingUp,
//     title: "Bidding against budget",
//     description:
//       "Place competitive bids aligned with trader budgets and win projects based on expertise, timeline, and quality commitment.",
//     gradient: "from-blue-500 to-cyan-500"
//   },
//   {
//     icon: Users,
//     title: "Real-time Collaboration & Updates",
//     description:
//       "Track inspection progress live. Communicate directly with traders through instant chat, updates, and evidence sharing.",
//     gradient: "from-violet-500 to-purple-500"
//   },
//   {
//     icon: FileCheck,
//     title: "Transparent Reports & Documentation",
//     description:
//       "Complete audit trail and documentation for compliance with structured reports, photos, and verification records.",
//     gradient: "from-green-500 to-emerald-500"
//   }
// ];

// export function Features() {
//   return (
//     <section className="py-20 md:py-28 bg-white">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16 max-w-2xl mx-auto">
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             Everything You Need
//           </h2>
//           <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
//             To Ensure Quality at Scale
//           </h2>
//           <p className="text-lg text-gray-600">
//             Streamline your quality control process with cutting-edge technology and global expertise.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
//           {features.map(
//             ({ icon: Icon, title, description, gradient }, i) => (
//               <div 
//                 key={i} 
//                 className="group p-8 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-xl hover:border-gray-300 transition-all duration-300"
//               >
//                 <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${gradient} mb-5 shadow-lg`}>
//                   <Icon className="w-7 h-7 text-white stroke-[1.5]" strokeWidth={1.5} />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">
//                   {title}
//                 </h3>
//                 <p className="text-gray-600 text-xs leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
//                   {description}
//                 </p>
//               </div>
//             )
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }






// import { Globe, TrendingUp, Users, FileCheck } from "lucide-react";

// const features = [
//   { 
//     icon: Globe,
//     title: "Global Inspection Queries",
//     description:
//       "Receive inspection requirements from verified global traders across multiple industries and locations, all in one unified marketplace.",
//     gradient: "from-gray-700 to-gray-800"
//   },
//   {
//     icon: TrendingUp,
//     title: "Bidding against budget",
//     description:
//       "Place competitive bids aligned with trader budgets and win projects based on expertise, timeline, and quality commitment.",
//     gradient: "from-gray-600 to-gray-700"
//   },
//   {
//     icon: Users,
//     title: "Real-time Collaboration & Updates",
//     description:
//       "Track inspection progress live. Communicate directly with traders through instant chat, updates, and evidence sharing.",
//     gradient: "from-gray-700 to-gray-800"
//   },
//   {
//     icon: FileCheck,
//     title: "Transparent Reports & Documentation",
//     description:
//       "Complete audit trail and documentation for compliance with structured reports, photos, and verification records.",
//     gradient: "from-gray-600 to-gray-700"
//   }
// ];

// export function Features() {
//   return (
//     <section className="py-20 md:py-28 bg-black">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16 max-w-2xl mx-auto">
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
//             Everything You Need
//           </h2>
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-400 mb-6">
//             To Ensure Quality at Scale
//           </h2>
//           <p className="text-lg text-gray-400">
//             Streamline your quality control process with cutting-edge technology and global expertise.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
//           {features.map(
//             ({ icon: Icon, title, description, gradient }, i) => (
//               <div 
//                 key={i} 
//                 className="group p-8 rounded-2xl border border-gray-800 bg-gray-950 shadow-sm hover:shadow-2xl hover:border-gray-700 transition-all duration-300"
//               >
//                 <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${gradient} mb-5 shadow-lg`}>
//                   <Icon className="w-7 h-7 text-white stroke-[1.5]" strokeWidth={1.5} />
//                 </div>
//                 <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gray-200 transition-colors duration-300">
//                   {title}
//                 </h3>
//                 <p className="text-gray-400 text-xs leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
//                   {description}
//                 </p>
//               </div>
//             )
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }



import { Globe, TrendingUp, Users, FileCheck } from "lucide-react";

const features = [
  { 
    icon: Globe,
    title: "Global Inspection Queries",
    description:
      "Receive inspection requirements from verified global traders across multiple industries and locations, all in one unified marketplace.",
    gradient: "from-purple-600 to-pink-600"
  },
  {
    icon: TrendingUp,
    title: "Bidding against budget",
    description:
      "Place competitive bids aligned with trader budgets and win projects based on expertise, timeline, and quality commitment.",
    gradient: "from-pink-600 to-purple-600"
  },
  {
    icon: Users,
    title: "Real-time Collaboration & Updates",
    description:
      "Track inspection progress live. Communicate directly with traders through instant chat, updates, and evidence sharing.",
    gradient: "from-purple-600 to-pink-600"
  },
  {
    icon: FileCheck,
    title: "Transparent Reports & Documentation",
    description:
      "Complete audit trail and documentation for compliance with structured reports, photos, and verification records.",
    gradient: "from-pink-600 to-purple-600"
  }
];

export function Features() {
  return (
    <section className="py-20 md:py-28 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Everything You Need
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
            To Ensure Quality at Scale
          </h2>
          <p className="text-lg text-gray-400">
            Streamline your quality control process with cutting-edge technology and global expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map(
            ({ icon: Icon, title, description, gradient }, i) => (
              <div 
                key={i} 
                className="group p-8 rounded-2xl border border-gray-800 bg-gray-950 shadow-sm hover:shadow-2xl hover:border-gray-700 transition-all duration-300"
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${gradient} mb-5 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white stroke-[1.5]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gray-200 transition-colors duration-300">
                  {title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {description}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}