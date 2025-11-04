import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SkillCardProps {
  icon: LucideIcon;
  name: string;
  level: number;
  index: number;
  totalCards: number;
  activeIndex: number;
  onActivate: () => void;
}

const SkillCard = ({ icon: Icon, name, level, index, totalCards, activeIndex, onActivate }: SkillCardProps) => {
  // Calculate position relative to active card (circular)
  let relativePosition = index - activeIndex;
  
  // Adjust for circular navigation
  if (relativePosition > totalCards / 2) {
    relativePosition -= totalCards;
  } else if (relativePosition < -totalCards / 2) {
    relativePosition += totalCards;
  }
  
  const isActive = relativePosition === 0;
  
  // Fan parameters
  const rotationPerCard = 8; // degrees of rotation per card position
  const horizontalSpacing = 80; // horizontal offset between cards
  const verticalSpacing = 15; // vertical drop per card from center
  
  // Calculate card transformations
  const rotation = isActive ? 0 : relativePosition * rotationPerCard;
  const xOffset = isActive ? 0 : relativePosition * horizontalSpacing;
  const yOffset = isActive ? -50 : Math.abs(relativePosition) * verticalSpacing;
  const scale = isActive ? 1.15 : 0.9;
  const zIndex = isActive ? 50 : 40 - Math.abs(relativePosition);
  const opacity = isActive ? 1 : Math.max(0.6, 1 - Math.abs(relativePosition) * 0.15);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 100 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      animate={{
        rotate: rotation,
        scale: scale,
        y: yOffset,
        x: xOffset,
        opacity: opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 25,
        mass: 0.5,
      }}
      style={{
        position: 'absolute',
        left: '50%',
        bottom: '50px',
        marginLeft: '-120px',
        transformOrigin: 'center bottom',
        zIndex: zIndex,
        pointerEvents: 'none',
      }}
      className={`glass-card p-6 w-[240px] transition-shadow duration-500 ${
        isActive ? 'shadow-[0_0_50px_rgba(var(--primary-rgb),0.5)] border-primary/50' : 'border-border/30'
      } border backdrop-blur-xl`}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <motion.div 
          animate={{
            scale: isActive ? 1.15 : 1,
            rotate: isActive ? [0, 360] : 0,
          }}
          transition={{ 
            scale: { duration: 0.5 },
            rotate: { duration: 0.8, ease: "easeInOut" }
          }}
          className={`p-4 rounded-xl transition-colors duration-500 ${
            isActive ? 'bg-primary/20' : 'bg-primary/10'
          }`}
        >
          <Icon className={`w-8 h-8 transition-all duration-500 ${
            isActive ? 'text-primary drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.8)]' : 'text-primary/70'
          }`} />
        </motion.div>
        
        <motion.h3 
          animate={{
            scale: isActive ? 1.05 : 0.95,
            opacity: isActive ? 1 : 0.8,
          }}
          transition={{ duration: 0.4 }}
          className={`font-semibold transition-colors duration-500 ${
            isActive ? 'text-foreground' : 'text-foreground/70'
          }`}
        >
          {name}
        </motion.h3>
        
        <motion.div 
          className="w-full"
          animate={{
            opacity: isActive ? 1 : 0.7,
          }}
        >
          <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
            <motion.div
              animate={{ 
                width: isActive ? `${level}%` : `${level * 0.6}%`,
                opacity: isActive ? 1 : 0.8,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary via-primary/80 to-accent"
            />
          </div>
          <motion.p 
            animate={{
              scale: isActive ? 1.1 : 0.95,
              opacity: isActive ? 1 : 0.7,
            }}
            className={`text-sm mt-2 font-semibold transition-colors duration-500 ${
              isActive ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            {level}%
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SkillCard;
