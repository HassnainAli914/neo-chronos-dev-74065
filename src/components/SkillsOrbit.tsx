import { motion } from "framer-motion";
import { Database, Server, Code2, Boxes, GitBranch, Braces, FileCode } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const SkillsOrbit = () => {
  const skills = [
    { name: "MongoDB", icon: Database, color: "text-green-500", delay: 0 },
    { name: "Express.js", icon: Server, color: "text-gray-400", delay: 0.5 },
    { name: "React", icon: Code2, color: "text-cyan-400", delay: 1 },
    { name: "Node.js", icon: Boxes, color: "text-green-600", delay: 1.5 },
    { name: "Git", icon: GitBranch, color: "text-orange-500", delay: 2 },
    { name: "JavaScript", icon: Braces, color: "text-yellow-400", delay: 2.5 },
    { name: "TypeScript", icon: FileCode, color: "text-blue-500", delay: 3 },
  ];

  const orbitRadius = 140;
  const angleStep = (2 * Math.PI) / skills.length;

  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[500px]">
      {/* Center glow effect */}
      <motion.div
        className="absolute w-32 h-32 bg-primary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Center core */}
      <motion.div
        className="absolute w-20 h-20 glass-card rounded-full flex items-center justify-center"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full" />
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
                    x: -24,
                    y: -24,
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    x: x - 24,
                    y: y - 24,
                    opacity: 1,
                    scale: 1,
                    rotate: [0, 360],
                  }}
                  transition={{
                    opacity: { delay: skill.delay * 0.2, duration: 0.5 },
                    scale: { delay: skill.delay * 0.2, duration: 0.5 },
                    x: { delay: skill.delay * 0.2, duration: 0.8 },
                    y: { delay: skill.delay * 0.2, duration: 0.8 },
                    rotate: {
                      delay: skill.delay * 0.2 + 1,
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }}
                  whileHover={{
                    scale: 1.3,
                    rotate: 0,
                    transition: { duration: 0.3 },
                  }}
                >
                  <motion.div
                    className="glass-card p-4 rounded-2xl cursor-pointer relative group"
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: skill.delay * 0.3,
                      ease: "easeInOut",
                    }}
                  >
                    <skill.icon 
                      className={`w-12 h-12 ${skill.color} group-hover:drop-shadow-[0_0_8px_currentColor] transition-all`}
                    />
                    
                    {/* Glow effect on hover */}
                    <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl ${skill.color.replace('text-', 'bg-')}/30`} />
                  </motion.div>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-semibold">{skill.name}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>

      {/* Orbit ring */}
      <motion.div
        className="absolute rounded-full border border-primary/20"
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
    </div>
  );
};

export default SkillsOrbit;
