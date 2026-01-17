/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/refs */
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';

// --- DATA: THE CODE TO TYPE ---
const CODE_LINES = [
  [{ text: "// Initialize Protocol V2", color: "gray" }],
  [{ text: "// Target: Global Innovation", color: "gray" }],
  [],
  [
    { text: "import", color: "purple" }, { text: " ", color: "white" }, { text: "{ Future }", color: "orange" }, { text: " ", color: "white" },
    { text: "from", color: "purple" }, { text: " ", color: "white" }, { text: "'@hackathon/core'", color: "green" }, { text: ";", color: "white" },
  ],
  [],
  [
    { text: "const", color: "purple" }, { text: " ", color: "white" }, { text: "Participant", color: "blue" }, { text: " ", color: "white" },
    { text: "=", color: "white" }, { text: " ", color: "white" }, { text: "{", color: "white" },
  ],
  [
    { text: "  id:", color: "white" }, { text: " ", color: "white" }, { text: "'0x1337'", color: "green" }, { text: ",", color: "white" },
  ],
  [
    { text: "  status:", color: "white" }, { text: " ", color: "white" }, { text: "'READY_TO_DEPLOY'", color: "green" }, { text: ",", color: "white" },
  ],
  [
    { text: "  skills:", color: "white" }, { text: " ", color: "white" }, { text: "[", color: "white" }, { text: "'React'", color: "green" },
    { text: ", ", color: "white" }, { text: "'AI'", color: "green" }, { text: ", ", color: "white" }, { text: "'Web3'", color: "green" },
    { text: "]", color: "white" }, { text: ",", color: "white" },
  ],
  [{ text: "};", color: "white" }],
  [],
  [
    { text: "async", color: "purple" }, { text: " ", color: "white" }, { text: "function", color: "purple" }, { text: " ", color: "white" },
    { text: "init()", color: "blue" }, { text: " ", color: "white" }, { text: "{", color: "white" },
  ],
  [
    { text: "  await", color: "purple" }, { text: " ", color: "white" }, { text: "deploy(", color: "blue" }, { text: "Participant", color: "orange" }, { text: ");", color: "blue" },
  ],
  [
    { text: "  console", color: "blue" }, { text: ".", color: "white" }, { text: "log(", color: "blue" }, { text: "'System Online 🚀'", color: "green" }, { text: ");", color: "white" },
  ],
  [{ text: "}", color: "white" }],
];

const HeroSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // --- PHYSICS STATE ---
  const physics = useRef({
    scrollY: 0, mouseX: 0, mouseY: 0, targetMouseX: 0, targetMouseY: 0
  });

  const [frame, setFrame] = useState(0); 
  const [binaryRain, setBinaryRain] = useState([]);

  // --- TYPING STATE ---
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);

  // --- ROTATING HEADING STATE ---
  const rotatingTexts = [
    "Smarter Building Without Code",
    "Beginner-Friendly AI Hackathon",
    "Learning Builds Career Opportunities"
  ];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isFirstRender, setIsFirstRender] = useState(true);

  // --- 1. PHYSICS LOOP ---
  useEffect(() => {
    let animationFrameId;
    const loop = () => {
      const targetScroll = window.scrollY;
      const scrollDiff = targetScroll - physics.current.scrollY;
      physics.current.scrollY += scrollDiff * 0.08;

      const mouseXDiff = physics.current.targetMouseX - physics.current.mouseX;
      const mouseYDiff = physics.current.targetMouseY - physics.current.mouseY;
      physics.current.mouseX += mouseXDiff * 0.05;
      physics.current.mouseY += mouseYDiff * 0.05;

      setFrame(prev => prev + 1);
      animationFrameId = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // --- 2. MOUSE HANDLERS ---
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    physics.current.targetMouseX = x * 15;
    physics.current.targetMouseY = y * 15;
  };

  const handleMouseLeave = () => {
    physics.current.targetMouseX = 0;
    physics.current.targetMouseY = 0;
  };

  // --- 3. BINARY RAIN GENERATION ---
  useEffect(() => {
    const drops = [...Array(20)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${10 + Math.random() * 15}s`,
      animationDelay: `-${Math.random() * 10}s`, 
      opacity: Math.random() * 0.3 + 0.1,
      text: Array(30).fill(0).map(() => Math.round(Math.random())).join('\n')
    }));
    setBinaryRain(drops);
  }, []);

  // --- 4. TYPING ENGINE ---
  useEffect(() => {
    if (isWaiting) return;
    const timeout = setTimeout(() => {
      const currentLineData = CODE_LINES[lineIndex];
      const totalCharsInLine = currentLineData.reduce((acc, token) => acc + token.text.length, 0);

      if (charIndex < totalCharsInLine) {
        setCharIndex(prev => prev + 1);
      } else {
        if (lineIndex < CODE_LINES.length - 1) {
          setLineIndex(prev => prev + 1);
          setCharIndex(0);
        } else {
          setIsWaiting(true);
          setTimeout(() => {
            setLineIndex(0);
            setCharIndex(0);
            setIsWaiting(false);
          }, 3000); 
        }
      }
    }, 30);
    return () => clearTimeout(timeout);
  }, [charIndex, lineIndex, isWaiting]);

  // --- 5. ROTATING TEXT ANIMATION ---
  useEffect(() => {
    // Mark first render as complete after a short delay
    const initialTimeout = setTimeout(() => {
      setIsFirstRender(false);
    }, 100);
    
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 5000); // Change text every 5 seconds
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [rotatingTexts.length]);

  // --- RENDER HELPER ---
  const renderCode = () => {
    return CODE_LINES.map((lineTokens, lIdx) => {
      if (lIdx > lineIndex) return null;
      if (lIdx < lineIndex) {
        return (
          <div key={lIdx} className="whitespace-pre flex flex-wrap">
            <span className="line-number mr-4 text-gray-600 select-none w-6 text-right inline-block">{lIdx + 1}</span>
            {lineTokens.map((token, tIdx) => (
              <span key={tIdx} className={`syntax-${token.color}`}>{token.text}</span>
            ))}
          </div>
        );
      }
      let charsPrintedSoFar = 0;
      return (
        <div key={lIdx} className="whitespace-pre flex flex-wrap">
          <span className="line-number mr-4 text-gray-600 select-none w-6 text-right inline-block">{lIdx + 1}</span>
          {lineTokens.map((token, tIdx) => {
            const remainingChars = charIndex - charsPrintedSoFar;
            if (remainingChars <= 0) return null;
            const textToPrint = token.text.slice(0, remainingChars);
            charsPrintedSoFar += token.text.length;
            return <span key={tIdx} className={`syntax-${token.color}`}>{textToPrint}</span>;
          })}
          <span className="cursor-blink ml-1"></span>
        </div>
      );
    });
  };

  const { scrollY, mouseX, mouseY } = physics.current;
  const scrollRotateY = -20 + (scrollY * 0.03); 
  const scrollRotateX = 10 - (scrollY * 0.015);
  const finalRotateX = Math.max(scrollRotateX, 0) - mouseY; 
  const finalRotateY = Math.min(Math.max(scrollRotateY, -25), 0) + mouseX;

  // --- FRAMER MOTION VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger effect for children
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 50, damping: 20 }
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-[#030712] overflow-hidden flex flex-col justify-center px-4 sm:px-6 lg:px-8 perspective-1000 pt-20">
      
      {/* --- STYLES --- */}
      <style>{`
        .terminal-window {
          background: rgba(13, 17, 23, 0.95);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 50px 100px -20px rgba(0, 0, 0, 0.7), 0 0 60px -10px rgba(236, 72, 153, 0.15);
          border-radius: 12px;
          transform-style: preserve-3d;
          will-change: transform;
        }
        .syntax-gray { color: #6b7280; font-style: italic; }
        .syntax-white { color: #e5e7eb; }
        .syntax-purple { color: #c084fc; }
        .syntax-blue { color: #60a5fa; }
        .syntax-green { color: #4ade80; }
        .syntax-orange { color: #fb923c; }
        .cursor-blink { display: inline-block; width: 10px; height: 18px; background: #ec4899; animation: blink 1s step-end infinite; vertical-align: middle; margin-bottom: 2px; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .glitch-text { 
          position: relative; 
          color: white; 
          display: inline-block;
          text-shadow: 2px 0 white;
        }
        .glitch-text::before, 
        .glitch-text::after { 
          content: attr(data-text); 
          position: absolute; 
          top: 0; 
          left: 0;
          width: 100%; 
          height: 100%;
          background: transparent;
          overflow: hidden;
        }
        .glitch-text::before { 
          left: -2px; 
          color: #ec4899;
          text-shadow: 2px 0 #ec4899;
          animation: glitch-1 2.5s infinite linear alternate-reverse; 
          z-index: -1;
          clip-path: inset(0 0 0 0);
        }
        .glitch-text::after { 
          left: 2px; 
          color: #f97316;
          text-shadow: -2px 0 #f97316;
          animation: glitch-2 2s infinite linear alternate-reverse; 
          z-index: -2;
          clip-path: inset(0 0 0 0);
        }
        @keyframes glitch-1 { 
          0% { clip-path: inset(40% 0 61% 0); transform: translate(0); }
          10% { clip-path: inset(92% 0 1% 0); transform: translate(-2px, 2px); }
          20% { clip-path: inset(43% 0 1% 0); transform: translate(-2px, -2px); }
          30% { clip-path: inset(25% 0 58% 0); transform: translate(2px, 0px); }
          40% { clip-path: inset(54% 0 7% 0); transform: translate(-1px, 2px); }
          50% { clip-path: inset(58% 0 43% 0); transform: translate(1px, -2px); }
          60% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
          70% { clip-path: inset(75% 0 5% 0); transform: translate(2px, -1px); }
          80% { clip-path: inset(35% 0 65% 0); transform: translate(-1px, -2px); }
          90% { clip-path: inset(88% 0 2% 0); transform: translate(1px, 2px); }
          100% { clip-path: inset(50% 0 50% 0); transform: translate(0); }
        }
        @keyframes glitch-2 { 
          0% { clip-path: inset(80% 0 1% 0); transform: translate(0); }
          10% { clip-path: inset(54% 0 1% 0); transform: translate(2px, 2px); }
          20% { clip-path: inset(60% 0 1% 0); transform: translate(2px, -2px); }
          30% { clip-path: inset(10% 0 1% 0); transform: translate(-2px, 2px); }
          40% { clip-path: inset(28% 0 1% 0); transform: translate(-2px, -2px); }
          50% { clip-path: inset(80% 0 1% 0); transform: translate(2px, 2px); }
          60% { clip-path: inset(15% 0 85% 0); transform: translate(-1px, -1px); }
          70% { clip-path: inset(65% 0 35% 0); transform: translate(1px, 1px); }
          80% { clip-path: inset(45% 0 55% 0); transform: translate(-2px, 1px); }
          90% { clip-path: inset(90% 0 10% 0); transform: translate(1px, -2px); }
          100% { clip-path: inset(30% 0 70% 0); transform: translate(0); }
        }
        .binary-column { position: absolute; top: -50%; color: #ec4899; font-family: monospace; font-weight: bold; font-size: 16px; line-height: 28px; letter-spacing: 6px; white-space: pre; animation: binary-fall linear infinite; user-select: none; pointer-events: none; z-index: 0; }
        @keyframes binary-fall { 0% { transform: translateY(0); } 100% { transform: translateY(150vh); } }
        .cyber-floor { position: absolute; bottom: -20%; left: -50%; width: 200%; height: 80%; background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px); background-size: 60px 60px; transform: perspective(500px) rotateX(60deg); -webkit-mask-image: linear-gradient(to top, black, transparent 80%); mask-image: linear-gradient(to top, black, transparent 80%); animation: move-grid 10s linear infinite; z-index: 0; }
        @keyframes move-grid { 0% { background-position: 0 0; } 100% { background-position: 0 60px; } }
        .rotating-heading { 
          position: relative; 
          width: 100%; 
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
          will-change: transform, opacity;
          z-index: 10;
          display: block;
        }
        .rotating-heading.slide-in { 
          animation: slideInFromBottom 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; 
        }
        @keyframes slideInFromBottom { 
          0% { 
            transform: translateY(50%); 
            opacity: 0; 
            filter: blur(6px);
          } 
          60% {
            opacity: 1;
            filter: blur(2px);
          }
          100% { 
            transform: translateY(0); 
            opacity: 1; 
            filter: blur(0);
          } 
        }
      `}</style>

      {/* --- LAYERS --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {binaryRain.map((drop) => (
          <div key={drop.id} className="binary-column" style={{ left: drop.left, animationDuration: drop.animationDuration, animationDelay: drop.animationDelay, opacity: drop.opacity }}>
            {drop.text}
          </div>
        ))}
      </div>
      <div className="cyber-floor"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* --- MAIN CONTENT WITH ANIMATION --- */}
      <motion.div 
        className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }} // Repeats animation every time you scroll to it
      >
        
        {/* Left Column */}
        <div className="flex flex-col items-start pt-10 lg:pt-0">

          <motion.div variants={itemVariants} className="mb-8">
            <div className="relative min-h-[200px] sm:min-h-[240px] lg:min-h-[300px] overflow-visible">
              <div 
                key={currentTextIndex}
                className={`rotating-heading ${!isFirstRender ? 'slide-in' : ''} text-5xl sm:text-6xl lg:text-8xl font-black leading-[1.1] tracking-tighter`}
              >
                <span 
                  className="block text-white glitch-text relative z-10" 
                  data-text={rotatingTexts[currentTextIndex]}
                >
                  {rotatingTexts[currentTextIndex]}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Clear Value Proposition Section */}
          <motion.div variants={itemVariants} className="w-full max-w-2xl mb-10">
            <div className="border-l-4 border-pink-500 pl-6 py-2">
              <p className="text-white text-xl font-bold mb-2 leading-tight">
                24-Hour Online AI Hackathon • <span className="text-pink-400">No Coding Required</span>
              </p>
              <p className="text-gray-300 text-base leading-relaxed">
                Win <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D95] to-[#7030A0] font-bold">₹2.2 LAC</span> + <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D95] to-[#7030A0] font-bold">₹19,999 AI Starter Kit</span>. 
                Every participant gets <span className="text-pink-400 font-semibold">Official Certificate (Co-branded with IIT-BHU)</span>, internships & career acceleration.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Link 
              to="/register"
              className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-gray-200 transition-colors rounded-sm shadow-lg hover:shadow-pink-500/50 cursor-pointer inline-block"
            >
              Launch Your Solution
            </Link>
            <button 
              onClick={() => {
                if (location.pathname !== '/') {
                  navigate('/');
                  setTimeout(() => {
                    const element = document.querySelector('#about');
                    if (element) {
                      const offset = 80;
                      const elementPosition = element.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.scrollY - offset;
                      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                  }, 100);
                } else {
                  const element = document.querySelector('#about');
                  if (element) {
                    const offset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }
              }}
              className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold uppercase tracking-widest hover:border-pink-500 hover:text-pink-500 transition-colors rounded-sm cursor-pointer"
            >
              Learn More
            </button>
          </motion.div>
        </div>

        {/* Right Column: 3D Living Terminal */}
        {/* We animate the wrapper, keeping the inner physics independent */}
        <motion.div 
          variants={itemVariants}
          className="hidden lg:flex justify-center items-center relative h-[600px] perspective-[1200px]"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            className="terminal-window w-full max-w-lg"
            style={{ transform: `rotateY(${finalRotateY}deg) rotateX(${finalRotateX}deg)` }}
          >
            {/* Header */}
            <div className="flex items-center px-4 py-3 border-b border-white/10 bg-white/5 rounded-t-lg">
              <div className="flex gap-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs font-mono text-gray-400 flex-1 text-center">main.tsx — HACKATHON_PROJECT</div>
            </div>

            {/* Dynamic Code Body */}
            <div className="p-6 font-mono text-sm sm:text-base leading-relaxed h-[400px] overflow-hidden">
              {renderCode()}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-white/10 bg-black/20 rounded-b-lg flex justify-between text-[10px] font-mono text-gray-500">
              <div className="flex gap-4"><span>master*</span><span>Ln {lineIndex + 1}, Col {charIndex}</span></div>
              <div className="flex gap-4"><span className="text-pink-500">Prettier: ✓</span><span>TypeScript React</span></div>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default HeroSection;