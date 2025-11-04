import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  price: string;
  index: number;
}

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  features,
  price,
  index,
}: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="glass-card p-8 h-full flex flex-col"
    >
      <div className="p-4 rounded-xl bg-primary/10 w-fit mb-6">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      
      <h3 className="text-2xl font-bold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      
      <ul className="space-y-3 mb-6 flex-grow">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start">
            <span className="text-primary mr-2">✓</span>
            <span className="text-foreground/90">{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className="border-t border-primary/20 pt-6">
        <div className="text-3xl font-bold gradient-text mb-4">{price}</div>
        <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground">
          Get Started
        </Button>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
