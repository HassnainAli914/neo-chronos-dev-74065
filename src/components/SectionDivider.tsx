import { motion } from "framer-motion";

const SectionDivider = () => {
  return (
    <div className="relative w-full h-px my-8 overflow-hidden">
      {/* Base line */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      {/* Animated glow line */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1,
          ease: "easeInOut"
        }}
      />
      
      {/* Decorative dots */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary animate-pulse" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary animate-pulse" />
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary animate-pulse" />
    </div>
  );
};

export default SectionDivider;
