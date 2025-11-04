import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Layers, Smartphone, Globe } from "lucide-react";

const LaserBeamTransition = () => {
  const [beamProgress, setBeamProgress] = useState(0);
  const [isReversing, setIsReversing] = useState(false);

  useEffect(() => {
    const forwardDuration = 2500;
    const pauseDuration = 1000;
    const reverseDuration = 2500;
    let animationFrameId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    
    const startForwardAnimation = () => {
      const startTime = Date.now();
      setIsReversing(false);
      
      const animateForward = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / forwardDuration, 1);
        setBeamProgress(progress);
        
        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animateForward);
        } else {
          // Pause, then reverse
          timeoutId = setTimeout(startReverseAnimation, pauseDuration);
        }
      };
      
      timeoutId = setTimeout(() => {
        animationFrameId = requestAnimationFrame(animateForward);
      }, 200);
    };
    
    const startReverseAnimation = () => {
      const startTime = Date.now();
      setIsReversing(true);
      
      const animateReverse = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.max(1 - (elapsed / reverseDuration), 0);
        setBeamProgress(progress);
        
        if (progress > 0) {
          animationFrameId = requestAnimationFrame(animateReverse);
        } else {
          // Pause, then start forward again
          timeoutId = setTimeout(startForwardAnimation, pauseDuration);
        }
      };
      
      animationFrameId = requestAnimationFrame(animateReverse);
    };
    
    // Start the animation
    startForwardAnimation();
    
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const codeCards = [
    {
      code: "const webApps = [\n  'E-Commerce',\n  'Dashboard',\n  'Analytics'\n];",
      gradient: "from-cyan-400 to-cyan-600"
    },
    {
      code: "const mobile = {\n  iOS: true,\n  Android: true,\n  React: 'Native'\n};",
      gradient: "from-cyan-500 to-cyan-700"
    },
    {
      code: "const saas = [\n  'CRM',\n  'Analytics',\n  'Automation'\n];",
      gradient: "from-cyan-300 to-cyan-600"
    },
  ];

  const projectCards = [
    { 
      icon: <Layers className="w-10 h-10" />, 
      title: "Web Apps",
      count: "12 Projects",
      gradient: "from-cyan-400 to-cyan-600"
    },
    { 
      icon: <Smartphone className="w-10 h-10" />, 
      title: "Mobile",
      count: "8 Projects",
      gradient: "from-cyan-500 to-cyan-700"
    },
    { 
      icon: <Globe className="w-10 h-10" />, 
      title: "SaaS",
      count: "6 Projects",
      gradient: "from-cyan-300 to-cyan-600"
    },
  ];

  const beamPosition = beamProgress * 100;

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden rounded-xl backdrop-blur-xl bg-gradient-to-br from-background/40 via-background/60 to-background/40 border border-white/10 shadow-2xl">
      
      {/* Glass overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />

      {/* Laser Beam - Vertical purple-pink gradient */}
      <motion.div
        style={{ left: `${beamPosition}%` }}
        className="absolute top-0 bottom-0 w-1 -translate-x-1/2 z-20"
      >
        {/* Core beam */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-cyan-300 via-cyan-400 to-transparent"
          style={{
            boxShadow: "0 0 20px 4px rgba(6, 182, 212, 0.8), 0 0 40px 8px rgba(34, 211, 238, 0.6)",
          }}
        />
        
        {/* Inner bright core */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-cyan-200 to-transparent w-[2px] blur-[1px]" />
        
        {/* Outer glow layers */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-cyan-400 via-cyan-500 to-transparent blur-md opacity-80"
          style={{ width: "8px", left: "-3px" }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-b from-cyan-400 via-cyan-500 to-transparent blur-xl opacity-60"
          style={{ width: "20px", left: "-9px" }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-b from-cyan-400 via-cyan-500 to-transparent blur-2xl opacity-40"
          style={{ width: "40px", left: "-19px" }}
        />

        {/* Light particles around beam */}
        {beamProgress > 0 && beamProgress < 0.95 && [...Array(25)].map((_, i) => {
          const side = i % 2 === 0 ? -1 : 1;
          const yPos = (i * 4) % 100;
          const xOffset = (Math.random() * 20 + 15) * side;
          
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0.8, 0],
                scale: [0, 1, 1.2, 0],
                x: [0, xOffset * 1.5],
                y: [0, (Math.random() - 0.5) * 30],
              }}
              transition={{
                duration: 0.8,
                delay: (i * 0.03) % 0.4,
                ease: "easeOut"
              }}
              className="absolute rounded-full"
              style={{
                top: `${yPos}%`,
                left: "50%",
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                background: "rgba(6, 182, 212, 0.9)",
                boxShadow: `0 0 ${Math.random() * 8 + 4}px rgba(6, 182, 212, 1)`,
              }}
            />
          );
        })}
      </motion.div>

      {/* Cards Layer - Both code and project cards */}
      <div className="absolute inset-0 flex items-center justify-center gap-4 px-8 z-10">
        <div className="flex flex-col gap-4">
          {projectCards.map((card, i) => {
            // Calculate card position in percentage (each card is at 1/3 intervals)
            const cardCenterX = 50; // All cards are centered horizontally
            
            // Determine if beam has crossed this card
            const beamHasCrossed = isReversing 
              ? beamProgress < 0.5 // When reversing, switch back to code when beam goes left
              : beamProgress > 0.5; // When forward, switch to projects when beam passes center
            
            return (
              <motion.div
                key={i}
                className="group cursor-pointer"
              >
                {/* Code Card */}
                <motion.div
                  style={{
                    opacity: beamHasCrossed ? 0 : 1,
                    scale: beamHasCrossed ? 0.9 : 1,
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(6, 182, 212, 0.3)",
                  }}
                  transition={{ duration: 0.3 }}
                  className={`absolute rounded-2xl p-6 backdrop-blur-xl bg-gradient-to-br ${codeCards[i].gradient} bg-opacity-90 border border-white/30 min-w-[220px] h-[140px] flex items-center justify-center overflow-hidden`}
                >
                  <pre className="text-white/90 text-xs font-mono leading-relaxed">
                    {codeCards[i].code}
                  </pre>
                </motion.div>

                {/* Project Card */}
                <motion.div
                  style={{
                    opacity: beamHasCrossed ? 1 : 0,
                    scale: beamHasCrossed ? 1 : 0.9,
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(6, 182, 212, 0.3)",
                  }}
                  transition={{ duration: 0.3 }}
                  className={`relative rounded-2xl p-6 backdrop-blur-xl bg-gradient-to-br ${card.gradient} bg-opacity-90 border border-white/30 hover:scale-105 transition-all duration-300 min-w-[220px] h-[140px] flex flex-col justify-between overflow-hidden`}
                >
                  <div className="relative z-10">
                    <div className="text-white mb-3 group-hover:scale-110 transition-transform">
                      {card.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-white mb-1">{card.title}</h4>
                      <p className="text-sm text-white/80">{card.count}</p>
                    </div>
                  </div>
                  
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: "linear"
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                  />
                  
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 rounded-2xl" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LaserBeamTransition;
