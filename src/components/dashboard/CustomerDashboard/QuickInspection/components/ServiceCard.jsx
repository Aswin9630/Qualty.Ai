import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router";

export function ServiceCard({ id, title, imageUrl }) {
  return (
    <Link to={`/customer/marketplace/${id}`}>
      <motion.div
        className="group relative h-[500px] overflow-hidden cursor-pointer border border-black/10 bg-white"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="absolute inset-0">
          <motion.div
            className="w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
          <div className="absolute inset-0 bg-white/30"></div>
        </div>

        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>

        <div className="relative h-full flex flex-col justify-end p-8">
          <div className="absolute top-8 left-8">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-black/10 border border-black/20 backdrop-blur-sm">
              <Sparkles className="w-3 h-3 text-black" />
              <span className="text-xs text-black/80 tracking-widest uppercase font-medium">Premium</span>
            </div>
          </div>

          <h3 className="text-3xl font-bold text-black mb-8 tracking-tight leading-tight">
            {title}
          </h3>
          
          <motion.button
            className="w-full bg-black text-white py-4 font-semibold flex items-center justify-between px-6 group-hover:bg-white group-hover:text-black border border-black/20 transition-colors duration-300"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="tracking-wide cursor-pointer">EXPLORE SERVICE</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>

        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        />
      </motion.div>
    </Link>
  );
}
