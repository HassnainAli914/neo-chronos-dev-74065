import { motion } from "framer-motion";
import { Database, Server, Code2, Boxes, GitBranch, Braces, FileCode, Globe } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const SkillsOrbit = () => {
  const skills = [
    { name: "MongoDB", icon: Database, color: "text-green-500", glowColor: "rgba(34, 197, 94, 0.4)", delay: 0 },
    { name: "Express.js", icon: Server, color: "text-gray-300", glowColor: "rgba(209, 213, 219, 0.4)", delay: 0.5 },
    { name: "React", icon: Code2, color: "text-cyan-400", glowColor: "rgba(34, 211, 238, 0.4)", delay: 1 },
    { name: "Node.js", icon: Boxes, color: "text-green-400", glowColor: "rgba(74, 222, 128, 0.4)", delay: 1.5 },
    { name: "Git", icon: GitBranch, color: "text-orange-400", glowColor: "rgba(251, 146, 60, 0.4)", delay: 2 },
    { name: "JavaScript", icon: Braces, color: "text-yellow-400", glowColor: "rgba(250, 204, 21, 0.4)", delay: 2.5 },
    { name: "TypeScript", icon: FileCode, color: "text-blue-400", glowColor: "rgba(96, 165, 250, 0.4)", delay: 3 },
    { name: "HTML/CSS", icon: Globe, color: "text-purple-400", glowColor: "rgba(192, 132, 252, 0.4)", delay: 3.5 },
  ];

  const orbitRadius = 160;
  const angleStep = (2 * Math.PI) / skills.length;

  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[550px]">
      {/* Outer glow effect */}
      <motion.div
        className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Center glow effect */}
      <motion.div
        className="absolute w-40 h-40 bg-primary/30 rounded-full blur-2xl pointer-events-none"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Center core with glassmorphism */}
      <motion.div
        className="absolute w-24 h-24 glass-card rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,255,255,0.3)]"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <motion.div 
          className="w-16 h-16 bg-gradient-to-br from-primary via-accent to-primary rounded-full"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Orbiting skills */}
      <TooltipProvider>
        {skills.map((skill, index) => {
          const angle = index * angleStep;
          const x = Math.cos(angle) * orbitRadius;
          const y = Math.sin(angle) * orbitRadius;

          return (
            <Tooltip key={skill.name}>
              <TooltipTrigger asChild>
                <motion.div
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                  initial={{
                    x: -28,
                    y: -28,
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    x: x - 28,
                    y: y - 28,
                    opacity: 1,
                    scale: 1,
                    rotate: [0, 360],
                  }}
                  transition={{
                    opacity: { delay: skill.delay * 0.15, duration: 0.6 },
                    scale: { delay: skill.delay * 0.15, duration: 0.6, type: "spring" },
                    x: { delay: skill.delay * 0.15, duration: 0.9, type: "spring" },
                    y: { delay: skill.delay * 0.15, duration: 0.9, type: "spring" },
                    rotate: {
                      delay: skill.delay * 0.15 + 1,
                      duration: 30,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }}
                  whileHover={{
                    scale: 1.4,
                    rotate: 0,
                    transition: { duration: 0.3, type: "spring", stiffness: 300 },
                  }}
                >
                  <motion.div
                    className="glass-card p-4 rounded-2xl cursor-pointer relative group shadow-lg hover:shadow-2xl transition-shadow"
                    style={{
                      boxShadow: `0 4px 20px ${skill.glowColor}, 0 0 0 1px rgba(255,255,255,0.1)`,
                    }}
                    animate={{
                      y: [0, -12, 0],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      delay: skill.delay * 0.2,
                      ease: "easeInOut",
                    }}
                    whileHover={{
                      y: -5,
                      boxShadow: `0 8px 30px ${skill.glowColor}, 0 0 20px ${skill.glowColor}`,
                    }}
                  >
                    <skill.icon 
                      className={`w-14 h-14 ${skill.color} group-hover:drop-shadow-[0_0_12px_currentColor] transition-all duration-300`}
                    />
                    
                    {/* Enhanced glow effect on hover */}
                    <motion.div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none"
                      style={{
                        background: skill.glowColor,
                      }}
                    />

                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30"
                      style={{
                        background: `linear-gradient(45deg, transparent 30%, ${skill.glowColor} 50%, transparent 70%)`,
                      }}
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                    />
                  </motion.div>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent 
                side="top"
                className="bg-card/90 backdrop-blur-xl border-primary/30 text-foreground font-semibold px-4 py-2"
              >
                <p>{skill.name}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>

      {/* Orbit ring - outer */}
      <motion.div
        className="absolute rounded-full border border-primary/15"
        style={{
          width: orbitRadius * 2 + 40,
          height: orbitRadius * 2 + 40,
        }}
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Orbit ring - inner */}
      <motion.div
        className="absolute rounded-full border-2 border-primary/25 shadow-[0_0_20px_rgba(0,255,255,0.2)]"
        style={{
          width: orbitRadius * 2,
          height: orbitRadius * 2,
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Dotted orbit ring */}
      <motion.div
        className="absolute rounded-full border border-dashed border-primary/10"
        style={{
          width: orbitRadius * 2 - 40,
          height: orbitRadius * 2 - 40,
        }}
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default SkillsOrbit;
