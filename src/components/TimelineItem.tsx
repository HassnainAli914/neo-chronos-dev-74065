import { motion } from "framer-motion";

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  index: number;
}

const TimelineItem = ({ year, title, description, index }: TimelineItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="flex gap-4 md:gap-8"
    >
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 rounded-full bg-primary animate-glow-pulse" />
        <div className="w-0.5 h-full bg-gradient-to-b from-primary to-transparent" />
      </div>
      
      <div className="pb-8">
        <div className="glass-card p-6">
          <div className="text-sm text-primary font-semibold mb-2">{year}</div>
          <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineItem;
