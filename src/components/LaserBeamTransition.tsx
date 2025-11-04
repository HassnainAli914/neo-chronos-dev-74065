import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Layers, Smartphone, Globe } from "lucide-react";

const LaserBeamTransition = () => {
  const [carouselProgress, setCarouselProgress] = useState(0);

  useEffect(() => {
    const duration = 12000; // 12 seconds for one complete loop (slower speed)
    let animationFrameId: number | undefined;
    
    const startAnimation = () => {
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = (elapsed % duration) / duration; // Loop from 0 to 1
        setCarouselProgress(progress);
        
        animationFrameId = requestAnimationFrame(animate);
      };
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    startAnimation();
    
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
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

  return (
    <div className="relative w-full h-[350px] flex items-center justify-center overflow-hidden rounded-xl backdrop-blur-xl bg-gradient-to-br from-background/40 via-background/60 to-background/40 border border-white/10 shadow-2xl">
      
      {/* Glass overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />

      {/* Before Container - Left of laser beam (Code Cards Zone) */}
      <div className="absolute top-0 bottom-0 left-0 w-[50%] z-10 pointer-events-none bg-gradient-to-r from-cyan-500/5 via-cyan-400/10 to-transparent overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/2 -translate-y-1/2 left-8 text-cyan-400/20 font-bold text-sm">
            CODE ZONE
          </div>
        </div>
      </div>
      
      {/* After Container - Right of laser beam (Project Cards Zone) */}
      <div className="absolute top-0 bottom-0 right-0 w-[50%] z-20 pointer-events-none bg-gradient-to-l from-primary/10 via-primary/5 to-transparent overflow-hidden backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-bl from-primary/10 to-transparent" />
        <div className="absolute top-0 right-0 w-full h-full">
          <div className="absolute top-1/2 -translate-y-1/2 right-8 text-primary/30 font-bold text-sm">
            PROJECT ZONE
          </div>
        </div>
      </div>

      {/* Laser Beam - Fixed at center (50%) */}
      <div
        className="absolute top-0 bottom-0 w-1 -translate-x-1/2 z-40"
        style={{ left: '50%' }}
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
        {[...Array(25)].map((_, i) => {
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
                ease: "easeOut",
                repeat: Infinity,
                repeatDelay: 0.2
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
      </div>

      {/* Cards Layer - Carousel moving horizontally */}
      <div className="absolute inset-0 flex items-center justify-center px-8 z-5">
        <div className="relative w-full max-w-5xl h-[200px] overflow-visible">
          {projectCards.map((card, i) => {
            // Calculate position for infinite loop carousel
            // Cards are spaced evenly across the width with padding
            const basePosition = (carouselProgress + (i / 3)) % 1;
            // Convert to percentage: -50% (off-screen right) to 150% (off-screen left)
            const cardXPosition = (basePosition * 200) - 50;
            
            // Determine if card has passed through the beam (50% position)
            // Cards move left to right: left side (<50) shows code, right side (>50) shows project
            const hasPassedBeam = cardXPosition > 50;
            
            // Determine which container zone the card is in (with buffer before beam)
            const isInAfterZone = cardXPosition >= 45;
            
            // Calculate dynamic z-index based on card type and position
            const getCardZIndex = () => {
              if (!hasPassedBeam) {
                // Code card: higher z in Before zone (z-25), lower when entering After zone (z-12) to slide under
                return isInAfterZone ? 'z-[12]' : 'z-[25]';
              } else {
                // Project card: very low in Before zone (z-5), very high in After zone (z-[35]) to appear on top
                return isInAfterZone ? 'z-[35]' : 'z-[5]';
              }
            };
            
            // Calculate opacity for smooth transitions
            const getCardOpacity = () => {
              if (!hasPassedBeam) {
                // Code card fades as it approaches and enters the beam
                if (cardXPosition > 45 && cardXPosition < 52) {
                  return Math.max(0, (52 - cardXPosition) / 7);
                }
                return cardXPosition < 52 ? 1 : 0;
              } else {
                // Project card fades in as it emerges from beam
                if (cardXPosition > 48 && cardXPosition < 55) {
                  return Math.min(1, (cardXPosition - 48) / 7);
                }
                return cardXPosition > 48 ? 1 : 0;
              }
            };
            
            const cardOpacity = getCardOpacity();

            return (
              <div
                key={i}
                className={`absolute top-1/2 -translate-y-1/2 ${getCardZIndex()} transition-opacity duration-300`}
                style={{
                  left: `${cardXPosition}%`,
                  opacity: cardOpacity,
                  transition: 'opacity 0.3s ease-out'
                }}
              >
                <div className="group cursor-pointer relative w-[280px]">
                  {/* Code Card */}
                  <div
                    className={`absolute inset-0 rounded-2xl p-6 backdrop-blur-xl bg-gradient-to-br ${codeCards[i].gradient} bg-opacity-90 border border-white/30 h-[160px] flex items-center justify-center overflow-hidden transition-all duration-300 ${!hasPassedBeam ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    style={{
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(6, 182, 212, 0.3)",
                    }}
                  >
                    <pre className="text-white/90 text-xs font-mono leading-relaxed">
                      {codeCards[i].code}
                    </pre>
                  </div>

                  {/* Project Card */}
                  <div
                    className={`relative rounded-2xl p-6 backdrop-blur-xl bg-gradient-to-br ${card.gradient} bg-opacity-90 border border-white/30 hover:scale-105 transition-all duration-300 h-[160px] flex flex-col justify-between overflow-hidden shadow-lg ${hasPassedBeam ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    style={{
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(6, 182, 212, 0.3)",
                    }}
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LaserBeamTransition;
