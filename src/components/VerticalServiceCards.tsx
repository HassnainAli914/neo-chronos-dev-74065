import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Code2, Layout, Server, Smartphone, Cloud, Zap, LucideIcon } from "lucide-react";

interface ServiceIntro {
  title: string;
  content: string;
  icon: LucideIcon;
}

const VerticalServiceCards = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const serviceIntros: ServiceIntro[] = [
    {
      title: "Full-Stack Development",
      content: "Building scalable MERN applications from concept to deployment.",
      icon: Code2,
    },
    {
      title: "UI/UX Design",
      content: "Creating beautiful, responsive interfaces that users love.",
      icon: Layout,
    },
    {
      title: "Backend APIs",
      content: "Robust server solutions with Node.js and Express.",
      icon: Server,
    },
    {
      title: "Mobile Apps",
      content: "Cross-platform development with React Native.",
      icon: Smartphone,
    },
    {
      title: "Cloud Deployment",
      content: "Seamless deployment on AWS, Azure, and GCP.",
      icon: Cloud,
    },
    {
      title: "Consultation",
      content: "Expert technical advice and code optimization.",
      icon: Zap,
    },
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const scroll = () => {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= scrollContainer.scrollHeight / 2) {
        scrollPosition = 0;
      }
      scrollContainer.scrollTop = scrollPosition;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full xl:w-80 h-[400px] xl:h-[500px] xl:sticky xl:top-24 px-4 xl:px-0">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="h-full"
      >
        <h3 className="text-lg xl:text-xl font-bold gradient-text mb-3 xl:mb-4">Service Highlights</h3>
        <div 
          ref={scrollRef}
          className="h-[350px] xl:h-[450px] overflow-hidden space-y-3 xl:space-y-4"
        >
          {[...serviceIntros, ...serviceIntros].map((intro, index) => {
            const Icon = intro.icon;
            return (
              <motion.div
                key={`${intro.title}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1 text-sm">
                      {intro.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {intro.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default VerticalServiceCards;
