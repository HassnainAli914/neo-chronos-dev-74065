import { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail("");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card p-8 md:p-12 text-center"
    >
      <div className="max-w-2xl mx-auto">
        <div className="inline-flex p-4 bg-primary/10 rounded-full mb-6">
          <Mail className="w-8 h-8 text-primary animate-glow-pulse" />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
          Stay Updated
        </h2>
        <p className="text-muted-foreground mb-8">
          Get the latest updates on web development, tech trends, and exclusive content delivered to your inbox.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-input border-primary/30 focus:border-primary"
            required
          />
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/80 text-primary-foreground"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </motion.section>
  );
};

export default Newsletter;
