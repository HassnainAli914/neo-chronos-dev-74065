import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Code2, Folder, FileCode } from "lucide-react";

const LaserBeamTransition = () => {
  const [animationPhase, setAnimationPhase] = useState<"code" | "beam" | "cards">("code");

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationPhase("beam"), 500);
    const timer2 = setTimeout(() => setAnimationPhase("cards"), 2000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const codeSnippets = [
    "const project = {",
    "  name: 'Awesome App',",
    "  tech: ['React', 'Node'],",
    "  status: 'deployed'",
    "};",
  ];

  const projectCards = [
    { icon: <Code2 className="w-8 h-8" />, label: "Web Apps" },
    { icon: <Folder className="w-8 h-8" />, label: "SaaS" },
    { icon: <FileCode className="w-8 h-8" />, label: "E-Commerce" },
  ];

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
      {/* Code Layer - Left Side */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ 
          opacity: animationPhase === "code" ? 1 : 0,
          x: animationPhase === "cards" ? -50 : 0
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 font-mono text-sm text-primary/80 space-y-2"
      >
        {codeSnippets.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="whitespace-pre"
          >
            {line}
          </motion.div>
        ))}
      </motion.div>

      {/* Laser Beam Effect */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{
          x: animationPhase === "beam" || animationPhase === "cards" ? "100%" : "-100%",
          opacity: animationPhase === "beam" ? 1 : 0,
        }}
        transition={{ 
          duration: 1.5, 
          ease: "easeInOut",
          opacity: { duration: 0.3 }
        }}
        className="absolute inset-y-0 w-1 z-20"
      >
        {/* Main Beam */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent opacity-90" />
        
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-primary blur-xl opacity-60" />
        <div className="absolute inset-0 bg-primary blur-2xl opacity-40" />
        
        {/* Glass Effect */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
        
        {/* Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              y: [-20, 20],
              x: [-10, 10],
            }}
            transition={{
              duration: 1,
              delay: i * 0.15,
              repeat: 1,
              ease: "easeOut"
            }}
            className="absolute w-1 h-1 bg-primary rounded-full blur-sm"
            style={{
              top: `${(i + 1) * 12}%`,
              left: `${Math.random() * 20 - 10}px`,
            }}
          />
        ))}
      </motion.div>

      {/* Project Cards Layer - Right Side */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: animationPhase === "cards" ? 1 : 0,
          scale: animationPhase === "cards" ? 1 : 0.9,
          x: animationPhase === "cards" ? 0 : 50
        }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 grid grid-cols-1 gap-4"
      >
        {projectCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 50 }}
            animate={{
              opacity: animationPhase === "cards" ? 1 : 0,
              x: animationPhase === "cards" ? 0 : 50
            }}
            transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
            className="glass-card p-6 flex items-center gap-4 min-w-[200px] hover:scale-105 transition-transform"
          >
            <div className="text-primary">
              {card.icon}
            </div>
            <span className="font-semibold text-foreground">{card.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Ambient Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: animationPhase === "beam" ? 0.3 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-primary/10 blur-3xl z-0"
      />
    </div>
  );
};

export default LaserBeamTransition;
