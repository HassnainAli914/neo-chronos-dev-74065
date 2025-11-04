import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("ai-assistant-messages");
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error("Failed to load messages:", e);
      }
    } else {
      // Welcome message
      setMessages([
        {
          role: "assistant",
          content: "Hi! I'm your AI assistant. I can help you learn more about my services, skills, projects, and how I can help with your web development needs. What would you like to know?",
        },
      ]);
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("ai-assistant-messages", JSON.stringify(messages));
    }
  }, [messages]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const apiKey = "AIzaSyBnn3doYyc0Ai4ZyLzmA9F8cfnrenNfzi4";
      
      if (!apiKey) {
        throw new Error("API key not configured.");
      }

      const systemPrompt = `You are a helpful AI assistant for a MERN Stack Developer portfolio website. 
      
Your role is to help visitors learn about:
- Skills: React, Next.js, Node.js, Express, MongoDB, PostgreSQL, TypeScript, TailwindCSS, API Development
- Services: Full-Stack Development (from $5,000), UI/UX Design & Development (from $3,000), Backend Development (from $4,000), Mobile App Development (from $8,000), Cloud Deployment & DevOps (from $2,500), Consultation & Support (from $150/hr)
- Projects: E-Commerce Platform (MERN + Stripe), SaaS Dashboard (Next.js + TypeScript + PostgreSQL), Social Media App (React + Socket.io + Express + Redis)
- Experience: Professional MERN stack developer specializing in full-stack web development, modern UI/UX design, and scalable cloud solutions
- Process: Discovery → Planning → Development → Launch
- Contact: Available for consultation and project inquiries

IMPORTANT RULES:
1. ONLY answer questions related to the website content above
2. If asked about anything unrelated to the website, politely decline and redirect to website topics
3. Be concise and helpful
4. Encourage visitors to contact or schedule a consultation for detailed discussions
5. Never make up information - only use the details provided above

Keep responses brief and friendly.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: systemPrompt }],
              },
              ...messages.map((msg) => ({
                role: msg.role === "user" ? "user" : "model",
                parts: [{ text: msg.content }],
              })),
              {
                role: "user",
                parts: [{ text: input }],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API Error: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I apologize, but I couldn't generate a response. Please try again.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantMessage },
      ]);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: error instanceof Error 
            ? `Error: ${error.message}` 
            : "I'm having trouble connecting right now. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Hi! I'm your AI assistant. I can help you learn more about my services, skills, projects, and how I can help with your web development needs. What would you like to know?",
      },
    ]);
    localStorage.removeItem("ai-assistant-messages");
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "h-12 w-12 rounded-full shadow-lg",
            "bg-primary hover:bg-primary/90 text-primary-foreground",
            "shadow-[0_0_20px_rgba(0,255,255,0.5)]",
            "transition-all duration-300 hover:scale-110"
          )}
        >
          {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        </Button>
      </motion.div>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-4 z-50 w-[90vw] max-w-[320px] sm:max-w-[360px]"
          >
            <div className="glass-card overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="bg-primary/10 border-b border-primary/30 p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <MessageCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">AI Assistant</h3>
                      <p className="text-[10px] text-muted-foreground">Ask about services</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearChat}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Clear
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="h-64 p-3" ref={scrollRef}>
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex",
                        message.role === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl px-4 py-2.5",
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted/50 text-foreground border border-border"
                        )}
                      >
                        <div className="text-sm max-w-none markdown-content">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              p: ({ children }) => <p className="leading-relaxed break-words mb-2 last:mb-0">{children}</p>,
                              code: ({ className, children }) => {
                                const isInline = !className;
                                return isInline ? (
                                  <code className={cn(
                                    "px-1.5 py-0.5 rounded text-xs font-mono",
                                    message.role === "user" 
                                      ? "bg-primary-foreground/20" 
                                      : "bg-primary/20"
                                  )}>
                                    {children}
                                  </code>
                                ) : (
                                  <code className={cn(
                                    "block p-3 rounded text-xs font-mono overflow-x-auto my-2",
                                    message.role === "user"
                                      ? "bg-primary-foreground/20"
                                      : "bg-primary/10"
                                  )}>
                                    {children}
                                  </code>
                                );
                              },
                              a: ({ href, children }) => (
                                <a 
                                  href={href} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="underline hover:no-underline font-medium"
                                >
                                  {children}
                                </a>
                              ),
                              strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                              em: ({ children }) => <em className="italic">{children}</em>,
                              ul: ({ children }) => <ul className="list-disc list-inside my-2 space-y-1">{children}</ul>,
                              ol: ({ children }) => <ol className="list-decimal list-inside my-2 space-y-1">{children}</ol>,
                              li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-muted/50 text-foreground border border-border rounded-2xl px-4 py-3 flex items-center gap-2">
                        <div className="flex gap-1">
                          <motion.div
                            className="h-2 w-2 rounded-full bg-primary"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: 0,
                            }}
                          />
                          <motion.div
                            className="h-2 w-2 rounded-full bg-primary"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: 0.2,
                            }}
                          />
                          <motion.div
                            className="h-2 w-2 rounded-full bg-primary"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: 0.4,
                            }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">Thinking...</span>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="border-t border-primary/30 p-3">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    className="flex-1 bg-background/50 border-primary/30"
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={isLoading || !input.trim()}
                    size="icon"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
