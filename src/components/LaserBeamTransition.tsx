import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Layers, Smartphone, Globe } from "lucide-react";

const LaserBeamTransition = () => {
  const [beamProgress, setBeamProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2500;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setBeamProgress(progress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);

  const codeLines = [
    "const projects = [",
    "  { id: 1, name: 'E-Commerce Platform',",
    "    tech: ['React', 'Node.js', 'MongoDB'],",
    "    status: 'deployed', features: ['cart', 'payments'] },",
    "  { id: 2, name: 'SaaS Dashboard',",
    "    tech: ['Next.js', 'PostgreSQL', 'TypeScript'],",
    "    status: 'active', users: 2500 },",
    "  { id: 3, name: 'Social Media App',",
    "    tech: ['React', 'Socket.io', 'Redis'],",
    "    features: ['chat', 'notifications', 'sharing'] },",
    "  { id: 4, name: 'Task Manager',",
    "    tech: ['React', 'Express', 'MongoDB'],",
    "    boards: 'kanban', collab: true },",
    "];",
    "",
    "function renderProjects() {",
    "  return projects.map(project => {",
    "    return <ProjectCard key={project.id}",
    "                        data={project} />;",
    "  });",
    "}",
  ];

  const projectCards = [
    { 
      icon: <Layers className="w-10 h-10" />, 
      title: "Web Apps",
      count: "12 Projects",
      gradient: "from-cyan-500 to-blue-600"
    },
    { 
      icon: <Smartphone className="w-10 h-10" />, 
      title: "Mobile",
      count: "8 Projects",
      gradient: "from-purple-500 to-pink-600"
    },
    { 
      icon: <Globe className="w-10 h-10" />, 
      title: "SaaS",
      count: "6 Projects",
      gradient: "from-green-500 to-emerald-600"
    },
  ];

  const beamPosition = beamProgress * 100;
  const codeOpacity = Math.max(0, 1 - beamProgress * 1.5);
  const cardsOpacity = Math.max(0, (beamProgress - 0.6) * 2.5);
  const cardsScale = 0.85 + (Math.max(0, beamProgress - 0.6) * 0.375);

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden rounded-xl bg-black">
      
      {/* Code Layer - Green Matrix style */}
      <motion.div
        style={{ opacity: codeOpacity }}
        className="absolute inset-0 font-mono text-[10px] leading-tight text-green-400/80 p-6 overflow-hidden"
      >
        <div className="relative z-10">
          {codeLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="whitespace-pre"
              style={{
                textShadow: "0 0 10px rgba(34, 197, 94, 0.5)",
              }}
            >
              {line}
            </motion.div>
          ))}
        </div>
        
        {/* Subtle glow behind code */}
        <div className="absolute inset-0 bg-green-500/5 blur-3xl" />
      </motion.div>

      {/* Laser Beam - Vertical purple-pink gradient */}
      <motion.div
        style={{ left: `${beamPosition}%` }}
        className="absolute top-0 bottom-0 w-1 -translate-x-1/2 z-20"
      >
        {/* Core beam */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-purple-400 via-pink-500 to-transparent"
          style={{
            boxShadow: "0 0 20px 4px rgba(236, 72, 153, 0.8), 0 0 40px 8px rgba(168, 85, 247, 0.6)",
          }}
        />
        
        {/* Inner bright core */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-pink-300 to-transparent w-[2px] blur-[1px]" />
        
        {/* Outer glow layers */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-purple-500 via-pink-500 to-transparent blur-md opacity-80"
          style={{ width: "8px", left: "-3px" }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-b from-purple-500 via-pink-500 to-transparent blur-xl opacity-60"
          style={{ width: "20px", left: "-9px" }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-b from-purple-500 via-pink-500 to-transparent blur-2xl opacity-40"
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
                background: i % 2 === 0 
                  ? "rgba(236, 72, 153, 0.9)" 
                  : "rgba(168, 85, 247, 0.9)",
                boxShadow: `0 0 ${Math.random() * 8 + 4}px ${i % 2 === 0 ? "rgba(236, 72, 153, 1)" : "rgba(168, 85, 247, 1)"}`,
              }}
            />
          );
        })}
      </motion.div>

      {/* Project Cards Layer */}
      <motion.div
        style={{ 
          opacity: cardsOpacity,
          scale: cardsScale,
        }}
        className="absolute inset-0 flex items-center justify-center gap-4 px-8 z-10"
      >
        <div className="flex flex-col gap-4">
          {projectCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 60, rotateY: 15 }}
              animate={{
                opacity: cardsOpacity,
                x: cardsOpacity > 0 ? 0 : 60,
                rotateY: cardsOpacity > 0 ? 0 : 15,
              }}
              transition={{
                delay: 0.1 + i * 0.1,
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="group cursor-pointer"
            >
              <div 
                className={`relative rounded-2xl p-6 backdrop-blur-xl bg-gradient-to-br ${card.gradient} bg-opacity-90 border border-white/30 hover:scale-105 transition-all duration-300 min-w-[220px] h-[140px] flex flex-col justify-between overflow-hidden`}
                style={{
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(236, 72, 153, 0.3)",
                }}
              >
                {/* Card content */}
                <div className="relative z-10">
                  <div className="text-white mb-3 group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-white mb-1">{card.title}</h4>
                    <p className="text-sm text-white/80">{card.count}</p>
                  </div>
                </div>
                
                {/* Shimmer effect */}
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
                
                {/* Hover glow */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 rounded-2xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LaserBeamTransition;
