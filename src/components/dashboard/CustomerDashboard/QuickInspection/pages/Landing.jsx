import { ServiceCard } from "../components/ServiceCard.jsx";
import { motion } from "framer-motion";

const services = [
  {
    id: "psi",
    title: "PSI (Pre-Shipment Inspection)",
    imageUrl: "https://images.unsplash.com/photo-1768796372882-8b67936af681?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBpbnNwZWN0aW9uJTIwcXVhbGl0eXxlbnwxfHx8fDE3NzA3MTYwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "loading",
    title: "Loading/Unloading Supervision",
    imageUrl: "https://images.unsplash.com/photo-1633412954774-f8f565acd208?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGlwcGluZyUyMGNvbnRhaW5lciUyMGxvYWRpbmclMjBwb3J0fGVufDF8fHx8MTc3MDcxMDI4MXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "stuffing",
    title: "Stuffing Supervision",
    imageUrl: "https://images.unsplash.com/photo-1680869545527-ead94e7a78cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJnbyUyMHN0dWZmaW5nJTIwc3VwZXJ2aXNpb258ZW58MXx8fHwxNzcwNzE2MDgwfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "destination",
    title: "Destination Inspection",
    imageUrl: "https://images.unsplash.com/photo-1762818105976-fecf28a04c37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dpc3RpY3MlMjBkZXN0aW5hdGlvbiUyMGFycml2YWx8ZW58MXx8fHwxNzcwNzE2MDgwfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function Landing() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="fixed inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)`,
        backgroundSize: '100px 100px'
      }}></div>

      <div className="fixed inset-0 bg-gradient-radial from-black/5 via-transparent to-transparent opacity-30"></div>
      
      <main className="relative max-w-[1600px] mx-auto px-8 lg:px-12 py-20">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-block mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-black/5 border border-black/20 backdrop-blur-sm">
              <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
              <span className="text-xs text-black/60 tracking-widest uppercase font-medium">Premium Services</span>
            </div>
          </motion.div>

          <motion.h1 
            className="text-7xl font-bold text-black mb-6 tracking-tighter leading-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            QUICK INSPECTION
            <br />
            <span className="text-black/40">SERVICES</span>
          </motion.h1>

          <motion.p 
            className="text-xl text-black/50 max-w-2xl mx-auto font-light tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Next-generation logistics inspection powered by advanced technology
          </motion.p>

          <motion.div 
            className="h-px bg-gradient-to-r from-transparent via-black/20 to-transparent max-w-md mx-auto mt-12"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          ></motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
            >
              <ServiceCard
                id={service.id}
                title={service.title}
                imageUrl={service.imageUrl}
              />
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-24 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-4 text-black/30 text-sm">
            <div className="h-px w-12 bg-black/20"></div>
            <span className="tracking-widest uppercase font-light">Trusted by 500+ Companies Worldwide</span>
            <div className="h-px w-12 bg-black/20"></div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
