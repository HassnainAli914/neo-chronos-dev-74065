import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Circle } from "lucide-react";

interface CodeTab {
  name: string;
  language: string;
  code: string;
}

const CodeEditor = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [displayedCode, setDisplayedCode] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const tabs: CodeTab[] = [
    {
      name: "React.tsx",
      language: "typescript",
      code: `import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        '/api/users'
      );
      setData(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      {loading ? 'Loading...' : data.map(item => (
        <Card key={item.id} data={item} />
      ))}
    </div>
  );
};`
    },
    {
      name: "server.js",
      language: "javascript",
      code: `const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

// Routes
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`
    },
    {
      name: "database.js",
      language: "javascript",
      code: `const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(
    this.password, salt
  );
  next();
});

module.exports = mongoose.model('User', UserSchema);`
    }
  ];

  // Auto-rotate tabs
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabs.length);
      setDisplayedCode("");
      setIsTyping(true);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Typing animation
  useEffect(() => {
    if (!isTyping) return;

    const currentCode = tabs[activeTab].code;
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex <= currentCode.length) {
        setDisplayedCode(currentCode.slice(0, currentIndex));
        currentIndex += 2;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [activeTab, isTyping]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    setDisplayedCode("");
    setIsTyping(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <motion.div
        className="relative rounded-lg overflow-hidden shadow-2xl"
        style={{
          background: "linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--secondary) / 0.1))",
          backdropFilter: "blur(10px)",
          border: "1px solid hsl(var(--primary) / 0.2)"
        }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 0 40px hsl(var(--primary) / 0.3)"
        }}
      >
        {/* Terminal Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center gap-2">
            <Circle className="w-3 h-3 fill-red-500 text-red-500" />
            <Circle className="w-3 h-3 fill-yellow-500 text-yellow-500" />
            <Circle className="w-3 h-3 fill-green-500 text-green-500" />
          </div>
          <div className="text-xs text-gray-400 font-mono">MERN Stack Developer</div>
        </div>

        {/* Tabs */}
        <div className="bg-gray-900 px-2 py-1 flex gap-1 border-b border-gray-700">
          {tabs.map((tab, index) => (
            <button
              key={tab.name}
              onClick={() => handleTabClick(index)}
              className={`px-4 py-2 text-xs font-mono rounded-t transition-all ${
                activeTab === index
                  ? "bg-gray-800 text-primary border-t-2 border-primary"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Code Display */}
        <div className="bg-gray-900 p-6 min-h-[400px] max-h-[400px] overflow-auto">
          <AnimatePresence mode="wait">
            <motion.pre
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm font-mono leading-relaxed"
            >
              <code className="text-gray-300">
                {displayedCode.split('\n').map((line, i) => (
                  <div key={i} className="whitespace-pre">
                    <span className="text-gray-600 select-none mr-4">{String(i + 1).padStart(2, ' ')}</span>
                    {line.split(/(const|let|var|function|return|import|from|export|default|async|await|try|catch|if|else|require|module|mongoose|express|app|useState|useEffect|type|interface|enum|String|Number|Boolean|Date)/g).map((part, j) => {
                      if (['const', 'let', 'var', 'function', 'return', 'import', 'from', 'export', 'default', 'async', 'await', 'try', 'catch', 'if', 'else', 'type', 'interface', 'enum'].includes(part)) {
                        return <span key={j} className="text-purple-400">{part}</span>;
                      } else if (['require', 'module', 'mongoose', 'express', 'app', 'useState', 'useEffect'].includes(part)) {
                        return <span key={j} className="text-blue-400">{part}</span>;
                      } else if (['String', 'Number', 'Boolean', 'Date'].includes(part)) {
                        return <span key={j} className="text-green-400">{part}</span>;
                      } else if (part.includes("'")) {
                        return <span key={j} className="text-orange-400">{part}</span>;
                      } else {
                        return <span key={j}>{part}</span>;
                      }
                    })}
                  </div>
                ))}
                {isTyping && <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1" />}
              </code>
            </motion.pre>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CodeEditor;
