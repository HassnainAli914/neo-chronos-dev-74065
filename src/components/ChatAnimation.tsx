import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const messages = [
  {
    id: 1,
    author: 'visitor',
    content: 'Hi! I’d like to get in touch.',
    avatar: '/placeholder.svg',
  },
  { id: 2, author: 'user', content: 'Hello! I’d love to hear from you.' },
  {
    id: 3,
    author: 'user',
    content: 'Send me a message and lets connect.',
  },
];

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="flex items-center space-x-1 p-2"
  >
    <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
    <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
    <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground" />
  </motion.div>
);

const ChatBubble = ({ message, author, avatar }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className={cn(
      'flex items-start gap-3',
      author === 'user' ? 'flex-row-reverse' : ''
    )}
  >
    <Avatar className="h-8 w-8">
      <AvatarImage src={avatar} />
      <AvatarFallback>
        {author === 'visitor' ? 'V' : 'U'}
      </AvatarFallback>
    </Avatar>
    <div
      className={cn(
        'max-w-[75%] rounded-lg p-3 text-sm shadow-md',
        author === 'user'
          ? 'rounded-br-none bg-primary text-primary-foreground'
          : 'rounded-bl-none bg-muted'
      )}
    >
      {message}
    </div>
  </motion.div>
);

const ChatAnimation = () => {
  const [currentMessages, setCurrentMessages] = useState<typeof messages>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const animateChat = async () => {
      setCurrentMessages([]);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      for (let i = 0; i < messages.length; i++) {
        if (i > 0 && messages[i].author === 'user' && messages[i-1].author !== 'user') {
          setIsTyping(true);
          await new Promise((resolve) => setTimeout(resolve, 1500));
          setIsTyping(false);
        }
        
        setCurrentMessages((prev) => [...prev, messages[i]]);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      await new Promise((resolve) => setTimeout(resolve, 3000));
      animateChat();
    };

    animateChat();
  }, []);

  return (
    <div className="relative h-full w-full min-h-[400px]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[320px] h-[420px] glass-card p-4 rounded-xl shadow-2xl flex flex-col space-y-4 overflow-hidden shadow-primary/20">
          <AnimatePresence>
            {currentMessages.map((msg) => (
              <ChatBubble
                key={msg.id}
                message={msg.content}
                author={msg.author}
                avatar={msg.avatar}
              />
            ))}
          </AnimatePresence>
          {isTyping && <TypingIndicator />}
        </div>
      </div>
       <div className="absolute inset-0 -z-10 bg-primary/10 [filter:blur(120px)] rounded-full" />
    </div>
  );
};

export default ChatAnimation;