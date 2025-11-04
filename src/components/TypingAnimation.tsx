import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenTool, FileText, BookOpen, Coffee } from "lucide-react";

const TypingAnimation = () => {
  const phrases = [
    "Writing Ideas…",
    "Crafting Stories…",
    "Exploring Creativity…",
    "Sharing Thoughts…",
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  // Typing effect
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];

    if (isTyping) {
      if (displayedText.length < currentPhrase.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        setIsTyping(true);
      }
    }
  }, [displayedText, isTyping, currentPhraseIndex, phrases]);

  const floatingElements = [
    { icon: PenTool, delay: 0, x: -20, y: -30 },
    { icon: FileText, delay: 0.2, x: 20, y: -20 },
    { icon: BookOpen, delay: 0.4, x: -15, y: 30 },
    { icon: Coffee, delay: 0.6, x: 25, y: 25 },
  ];

  return (
    <div className="w-full xl:w-96 h-[400px] xl:h-[500px] flex items-center justify-center px-4 xl:px-0">
      <div className="relative w-full max-w-md">
        {/* Floating elements */}
        {floatingElements.map((element, index) => {
          const Icon = element.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 0.15,
                scale: 1,
                y: [0, -10, 0],
              }}
              transition={{
                opacity: { delay: element.delay, duration: 0.5 },
                scale: { delay: element.delay, duration: 0.5 },
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: element.delay,
                },
              }}
              className="absolute"
              style={{
                left: `calc(50% + ${element.x}px)`,
                top: `calc(50% + ${element.y}px)`,
              }}
            >
              <Icon className="w-8 h-8 text-primary" />
            </motion.div>
          );
        })}

        {/* Main typing container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-8 rounded-2xl shadow-lg relative z-10"
        >
          <div className="min-h-[100px] flex items-center justify-center">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6"
              >
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <PenTool className="w-8 h-8 text-primary" />
                </div>
              </motion.div>

              <div className="text-2xl md:text-3xl font-bold gradient-text min-h-[40px] flex items-center justify-center">
                <span>{displayedText}</span>
                <AnimatePresence>
                  {showCursor && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="inline-block w-0.5 h-8 bg-primary ml-1"
                    />
                  )}
                </AnimatePresence>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-sm text-muted-foreground mt-4"
              >
                Every article tells a story
              </motion.p>
            </div>
          </div>

          {/* Decorative dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {phrases.map((_, index) => (
              <motion.div
                key={index}
                animate={{
                  scale: currentPhraseIndex === index ? 1.2 : 1,
                  opacity: currentPhraseIndex === index ? 1 : 0.3,
                }}
                className="w-2 h-2 rounded-full bg-primary"
              />
            ))}
          </div>
        </motion.div>

        {/* Ambient glow effect */}
        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-primary/5 rounded-3xl blur-3xl -z-10"
        />
      </div>
    </div>
  );
};

export default TypingAnimation;
