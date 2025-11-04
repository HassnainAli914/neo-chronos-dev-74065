import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Layers, Smartphone, Globe } from "lucide-react";

const LaserBeamTransition = () => {
  const [animationPhase, setAnimationPhase] = useState<"code" | "beam" | "cards">("code");

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationPhase("beam"), 800);
    const timer2 = setTimeout(() => setAnimationPhase("cards"), 2500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const codeSnippets = [
    "const projects = [",
    "  { name: 'E-Commerce', ",
    "    stack: 'MERN' },",
    "  { name: 'SaaS Dashboard',",
    "    tech: 'Next.js' },",
    "  { name: 'Social App',",
    "    db: 'MongoDB' }",
    "];",
  ];

  const projectMockups = [
    { icon: <Layers className="w-12 h-12" />, title: "Web Apps", gradient: "from-cyan-400 to-blue-500" },
    { icon: <Smartphone className="w-12 h-12" />, title: "Mobile", gradient: "from-purple-400 to-pink-500" },
    { icon: <Globe className="w-12 h-12" />, title: "SaaS", gradient: "from-green-400 to-emerald-500" },
  ];

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden rounded-lg">
      {/* Background code text - full screen */}
      <motion.div
        initial={{ opacity: 0.6 }}
        animate={{ 
          opacity: animationPhase === "code" ? 0.6 : animationPhase === "beam" ? 0.3 : 0,
        }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 font-mono text-xs text-muted-foreground/40 leading-relaxed overflow-hidden"
      >
        <div className="p-8 space-y-1">
          {codeSnippets.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              {line}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Laser Beam with Enhanced Effects */}
      <motion.div
        initial={{ x: "-120%", opacity: 0 }}
        animate={{
          x: animationPhase === "beam" || animationPhase === "cards" ? "120%" : "-120%",
          opacity: animationPhase === "beam" ? 1 : 0,
        }}
        transition={{ 
          duration: 1.8, 
          ease: [0.22, 1, 0.36, 1],
          opacity: { duration: 0.4 }
        }}
        className="absolute inset-y-0 w-2 z-30"
        style={{
          filter: "blur(0px)",
        }}
      >
        {/* Core beam - bright purple/cyan gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-400 via-cyan-400 to-purple-500 opacity-100" 
             style={{
               boxShadow: "0 0 40px 10px rgba(168, 85, 247, 0.8), 0 0 80px 20px rgba(6, 182, 212, 0.6)"
             }}
        />
        
        {/* Inner glow */}
        <div className="absolute inset-0 bg-white/40 blur-sm" />
        
        {/* Outer glow layers */}
        <div className="absolute inset-0 bg-purple-400 blur-xl opacity-70" 
             style={{ transform: "scaleX(3)" }} 
        />
        <div className="absolute inset-0 bg-cyan-400 blur-2xl opacity-50" 
             style={{ transform: "scaleX(5)" }} 
        />
        <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-40" 
             style={{ transform: "scaleX(7)" }} 
        />
        
        {/* Particles around the beam */}
        {[...Array(30)].map((_, i) => {
          const isLeft = i % 2 === 0;
          const yPos = (i * 3.5) % 100;
          const delay = i * 0.04;
          const xOffset = Math.random() * 40 + 20;
          
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={animationPhase === "beam" ? { 
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1.2, 0],
                x: isLeft ? [-xOffset, -xOffset - 30] : [xOffset, xOffset + 30],
                y: [0, Math.random() * 40 - 20],
              } : {}}
              transition={{
                duration: 1.2,
                delay: delay,
                ease: "easeOut"
              }}
              className="absolute rounded-full"
              style={{
                top: `${yPos}%`,
                left: isLeft ? -10 : 10,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                background: i % 3 === 0 
                  ? "rgba(168, 85, 247, 0.8)" 
                  : i % 3 === 1 
                  ? "rgba(6, 182, 212, 0.8)"
                  : "rgba(255, 255, 255, 0.9)",
                boxShadow: `0 0 ${Math.random() * 10 + 5}px ${i % 2 === 0 ? "rgba(168, 85, 247, 0.9)" : "rgba(6, 182, 212, 0.9)"}`,
              }}
            />
          );
        })}

        {/* Light streaks */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`streak-${i}`}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={animationPhase === "beam" ? {
              opacity: [0, 0.6, 0],
              scaleY: [0, 1, 0],
            } : {}}
            transition={{
              duration: 0.8,
              delay: i * 0.15,
              ease: "easeInOut"
            }}
            className="absolute w-[2px] bg-gradient-to-b from-transparent via-white to-transparent"
            style={{
              height: "60%",
              top: "20%",
              left: `${(i - 2) * 3}px`,
              opacity: 0.4,
            }}
          />
        ))}
      </motion.div>

      {/* Project Cards/Mockups - After beam passes */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, x: 100 }}
        animate={{
          opacity: animationPhase === "cards" ? 1 : 0,
          scale: animationPhase === "cards" ? 1 : 0.85,
          x: animationPhase === "cards" ? 0 : 100,
        }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4"
      >
        {projectMockups.map((mockup, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 80, rotateY: -20 }}
            animate={animationPhase === "cards" ? {
              opacity: 1,
              x: 0,
              rotateY: 0,
            } : {}}
            transition={{ 
              delay: 0.5 + i * 0.15, 
              duration: 0.6,
              ease: "easeOut"
            }}
            className="relative group"
          >
            <div className={`glass-card p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br ${mockup.gradient} bg-opacity-10 border border-white/20 hover:scale-105 transition-all duration-300 min-w-[240px]`}
                 style={{
                   boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1), 0 0 20px rgba(168, 85, 247, 0.2)",
                 }}
            >
              <div className="flex items-center gap-4">
                <div className="text-primary group-hover:scale-110 transition-transform">
                  {mockup.icon}
                </div>
                <div>
                  <h4 className="font-bold text-lg text-foreground">{mockup.title}</h4>
                  <p className="text-sm text-muted-foreground">View Projects</p>
                </div>
              </div>
              
              {/* Glow effect on hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${mockup.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Ambient glow background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: animationPhase === "beam" ? 0.4 : animationPhase === "cards" ? 0.2 : 0 
        }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-purple-500/20 blur-3xl z-0"
      />
    </div>
  );
};

export default LaserBeamTransition;
