import { motion } from "framer-motion";
import { Database, Server, Code2, Boxes, GitBranch, Braces, FileCode, Globe } from "lucide-react";

const SkillsOrbit = () => {
  const skills = [
    { name: "MongoDB", icon: Database, color: "#4DB33D" },
    { name: "Express.js", icon: Server, color: "#68A063" },
    { name: "React", icon: Code2, color: "#61DAFB" },
    { name: "Node.js", icon: Boxes, color: "#68A063" },
    { name: "Git", icon: GitBranch, color: "#F05032" },
    { name: "JavaScript", icon: Braces, color: "#F7DF1E" },
    { name: "TypeScript", icon: FileCode, color: "#3178C6" },
    { name: "HTML/CSS", icon: Globe, color: "#E34F26" },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[500px] p-8">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-3xl" />
      
      {/* Animated grid background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary) / 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
        animate={{
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Skills grid */}
      <div className="relative grid grid-cols-4 gap-6 max-w-md">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.5,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            whileHover={{ 
              scale: 1.15,
              y: -8,
              transition: { duration: 0.2 }
            }}
            className="group relative"
          >
            {/* Glassmorphic card */}
            <motion.div
              className="relative bg-card/60 backdrop-blur-md border border-primary/20 rounded-2xl p-5 cursor-pointer overflow-hidden"
              whileHover={{
                borderColor: `${skill.color}40`,
                boxShadow: `0 8px 32px ${skill.color}30, 0 0 0 1px ${skill.color}20`,
              }}
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                y: {
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut",
                },
              }}
            >
              {/* Icon */}
              <skill.icon 
                className="w-10 h-10 transition-all duration-300"
                style={{ color: skill.color }}
              />

              {/* Hover glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${skill.color}15, transparent 70%)`,
                }}
              />

              {/* Skill name tooltip on hover */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-card/95 backdrop-blur-sm border border-primary/30 px-3 py-1 rounded-lg text-xs font-medium text-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              >
                {skill.name}
              </motion.div>

              {/* Particle effect on hover */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100"
                style={{ backgroundColor: skill.color }}
                animate={{
                  scale: [0, 20, 0],
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Central text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
      >
        <p className="text-sm font-medium text-muted-foreground">
          MERN Stack Developer
        </p>
        <motion.div
          className="h-0.5 w-16 mx-auto mt-2 bg-gradient-to-r from-transparent via-primary to-transparent"
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </motion.div>
    </div>
  );
};

export default SkillsOrbit;
