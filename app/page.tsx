"use client";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Search, 
  Activity, 
  Zap, 
  ShieldCheck, 
  Filter, 
  Mail, 
  Github, 
  Twitter,
  ChevronDown,
  ArrowRight,
  Database,
  Globe,
  TrendingUp,
  FileText
} from 'lucide-react';

// --- STYLES & THEME ---
const colors = {
  bg: 'bg-[#0a0a0b]',
  surface: 'bg-[#121214]',
  accentCyan: 'text-cyan-400',
  accentAmber: 'text-amber-500',
  border: 'border-white/10',
  textMuted: 'text-slate-400',
  textHeading: 'text-slate-100',
};

const typography = {
  heading: 'font-serif font-bold tracking-tight',
  body: 'font-sans font-light tracking-wide',
  mono: 'font-mono uppercase text-[10px] tracking-[0.2em]',
};

// --- MOCK DATA ---
const INVESTIGATIONS = [
  {
    id: 1,
    title: "The Ghost of the Housing Crisis",
    description: "Analyzing the discrepancy between viral rent-hike narratives and actual regional inflation indices.",
    tags: ["Data Analysis", "Narrative Mapping"],
    stats: { emotion: 8, factual: 3, sources: 12 },
    category: "Economy"
  },
  {
    id: 2,
    title: "The Energy Transition Gap",
    description: "Fact-checking claims about grid stability during peak solar hours in Western Europe.",
    tags: ["Fact Check", "Energy"],
    stats: { emotion: 4, factual: 9, sources: 45 },
    category: "Climate"
  },
  {
    id: 3,
    title: "Automated Outrage",
    description: "How algorithmic bots amplified specific tweets to create the illusion of a national boycott.",
    tags: ["Emotion Analysis", "NLP"],
    stats: { emotion: 10, factual: 2, sources: 8 },
    category: "Social Media"
  }
];

// --- SUB-COMPONENTS ---

const WordFlash = ({ text, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
    animate={{ 
      opacity: [0, 0.3, 0],
      scale: [0.9, 1.05, 0.95],
      filter: ['blur(10px)', 'blur(2px)', 'blur(10px)']
    }}
    transition={{ 
      duration: 4, 
      repeat: Infinity, 
      delay: delay,
      ease: "easeInOut"
    }}
    className={`${typography.heading} absolute text-white/30 text-xl md:text-3xl lg:text-5xl whitespace-nowrap pointer-events-none select-none`}
    style={{ 
      left: `${Math.random() * 70 + 15}%`, 
      top: `${Math.random() * 70 + 15}%`,
    }}
  >
    {text}
  </motion.div>
);

const Oscilloscope = () => (
  <div className="relative w-full h-24 flex items-center justify-center overflow-hidden pointer-events-none">
    <svg width="100%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none">
      <motion.path
        d="M 0 50 Q 250 50 500 50 T 1000 50"
        fill="none"
        stroke="rgba(34, 211, 238, 0.5)"
        strokeWidth="1.5"
        animate={{ 
          d: [
            "M 0 50 Q 250 10 500 90 T 1000 50",
            "M 0 50 Q 250 90 500 10 T 1000 50",
            "M 0 50 Q 250 50 500 50 T 1000 50"
          ]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        style={{ filter: "drop-shadow(0 0 4px rgba(34, 211, 238, 0.3))" }}
      />
    </svg>
  </div>
);

const InteractiveGraph = () => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const data = [
    { x: 50, y: 150, label: "Official Report", value: "98.2%" },
    { x: 150, y: 120, label: "Social Echo", value: "14.5%" },
    { x: 250, y: 160, label: "Peer Review", value: "91.0%" },
    { x: 350, y: 60, label: "Viral Claim", value: "0.4%" },
    { x: 450, y: 140, label: "Open Dataset", value: "87.9%" }
  ];

  return (
    <div className="relative p-8 bg-black/40 border border-white/5 rounded-2xl overflow-hidden group">
      <div className="flex justify-between items-center mb-8">
        <span className={typography.mono}>Live Data Verification</span>
        <div className="flex gap-2">
           <div className="w-2 h-2 rounded-full bg-cyan-400" />
           <div className="w-2 h-2 rounded-full bg-white/20" />
        </div>
      </div>
      
      <svg viewBox="0 0 500 200" className="w-full h-auto cursor-crosshair">
        {[0, 50, 100, 150].map(y => (
          <line key={y} x1="0" y1={y} x2="500" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        ))}
        
        <motion.path
          d={`M ${data.map(p => `${p.x},${p.y}`).join(' L ')}`}
          fill="none"
          stroke="rgba(34, 211, 238, 0.4)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2 }}
        />
        
        {data.map((p, i) => (
          <g key={i} onMouseEnter={() => setHoveredPoint(i)} onMouseLeave={() => setHoveredPoint(null)}>
            <motion.circle
              cx={p.x}
              cy={p.y}
              r={hoveredPoint === i ? 6 : 4}
              fill={hoveredPoint === i ? "#22d3ee" : "rgba(34, 211, 238, 0.6)"}
              className="transition-all duration-200"
            />
          </g>
        ))}
      </svg>
      
      <AnimatePresence>
        {hoveredPoint !== null && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-4 left-4 right-4 p-4 bg-cyan-950/80 backdrop-blur-md border border-cyan-500/30 rounded-lg flex justify-between items-center"
          >
            <div>
              <div className="text-[10px] text-cyan-400 font-mono uppercase">{data[hoveredPoint].label}</div>
              <div className="text-white font-bold">Integrity Level</div>
            </div>
            <div className="text-2xl font-serif text-cyan-400">{data[hoveredPoint].value}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  // Intro Transformations
  const introOpacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);
  const introScale = useTransform(smoothProgress, [0, 0.1], [1, 1.1]);
  const introPointerEvents = useTransform(smoothProgress, [0, 0.05], ["auto", "none"]);
  
  // Content Transformations
  const contentOpacity = useTransform(smoothProgress, [0.08, 0.15], [0, 1]);
  const contentY = useTransform(smoothProgress, [0.08, 0.15], [50, 0]);

  const noiseSnippets = [
    "Signal", "Noise", "Insight", "Evidence", "Clarity", "Context", "Truth", 
    "Depth", "Data", "Patterns", "Perspective", "Reality", "Narrative", 
    "Bias", "Distortion", "Pulse", "Lens", "Focus", "Integrity", 
    "Verification", "Analysis", "Exposure", "Deconstruction"
  ];

  return (
    <div ref={containerRef} className={`${colors.bg} min-h-[500vh] text-slate-100 selection:bg-cyan-500 selection:text-black`}>
      
      {/* --- INTRO SCREEN --- */}
      <motion.section 
        style={{ opacity: introOpacity, scale: introScale, pointerEvents: introPointerEvents }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-black"
      >
        <div className="absolute inset-0 pointer-events-none">
          {noiseSnippets.map((text, i) => (
            <WordFlash key={i} text={text} delay={i * 0.3} />
          ))}
        </div>

        <div className="w-full max-w-2xl px-12 relative z-20">
           <Oscilloscope />
        </div>

        <div className="text-center z-30 px-6 mt-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${typography.heading} text-5xl md:text-8xl text-white mb-2 tracking-tighter`}
          >
            SIGNAL OVER NOISE
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 0.6 }}
             transition={{ delay: 0.5 }}
             className={`${typography.body} text-cyan-400 text-xs md:text-sm tracking-[0.4em] uppercase`}
          >
            Statistical Journalism & Narrative Analysis
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 flex flex-col items-center gap-3 text-white/30"
        >
          <span className={typography.mono}>Scroll to Deconstruct</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown size={20} className="text-cyan-500" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 left-0 right-0 z-[110] p-6 flex justify-between items-center">
        <div className={`${typography.mono} text-[10px] flex items-center gap-2 bg-black/50 backdrop-blur-md p-2 px-3 rounded-full border border-white/5`}>
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>SON // SYSTEM_ACTIVE</span>
        </div>
        <div className="hidden md:flex gap-8 bg-black/50 backdrop-blur-md p-2 px-6 rounded-full border border-white/5">
          {['Analyses', 'Intelligence', 'OSINT', 'Contact'].map(item => (
            <a key={item} href="#" className={`${typography.mono} text-[10px] hover:text-cyan-400 transition-colors`}>{item}</a>
          ))}
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <motion.main 
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-[90] pt-[100vh] px-6"
      >
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto py-32 text-center">
          <h2 className={`${typography.heading} text-5xl md:text-8xl mb-8`}>
            DECONSTRUCTING<br />
            <span className="text-white/20">THE STATIC</span>
          </h2>
          <p className={`${typography.body} text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-16 leading-relaxed`}>
            We map bias, quantify outrage, and reveal context in the modern narrative stream. A data-driven laboratory using open-source intelligence and statistical modeling.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {/* Enhanced Explore Button */}
            <motion.button 
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 0px 30px rgba(34, 211, 238, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white text-black font-serif font-bold rounded-full hover:bg-cyan-400 transition-all duration-300 flex items-center gap-3 cursor-pointer group"
            >
              EXPLORE ANALYSES 
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Activity size={18} className="group-hover:text-black text-cyan-600 transition-colors" />
              </motion.div>
            </motion.button>
          </div>
        </section>

        {/* Global Search Section with Modern Animation */}
        <section className="max-w-5xl mx-auto py-24">
          <motion.div 
            onMouseEnter={() => setIsSearchHovered(true)}
            onMouseLeave={() => setIsSearchHovered(false)}
            animate={{ 
              scale: isSearchFocused ? 1.02 : 1,
              borderColor: isSearchFocused ? "rgba(34, 211, 238, 0.5)" : "rgba(255, 255, 255, 0.1)"
            }}
            className={`p-1 rounded-3xl bg-gradient-to-r transition-all duration-500 ${
              isSearchFocused || isSearchHovered 
              ? 'from-cyan-500/30 to-amber-500/20 shadow-[0_0_40px_rgba(34,211,238,0.15)]' 
              : 'from-white/5 to-transparent'
            }`}
          >
            <div className={`relative flex items-center gap-6 rounded-[calc(1.5rem-4px)] p-6 md:p-8 transition-all duration-500 overflow-hidden ${
              isSearchFocused ? 'bg-black' : 'bg-[#121214]'
            }`}>
              {/* Scanline Animation for Search */}
              {isSearchFocused && (
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent pointer-events-none"
                />
              )}
              
              <Search className={`transition-colors duration-300 ${isSearchFocused ? 'text-cyan-400' : 'text-slate-500'}`} size={28} />
              <input 
                type="text" 
                placeholder="Topic, headline, or claim..."
                className="bg-transparent border-none outline-none text-2xl md:text-4xl font-serif text-white w-full placeholder:text-white/10 focus:ring-0 relative z-10"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              
              {/* Pulsing indicator when focused */}
              {isSearchFocused && (
                <motion.div 
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-8 bg-cyan-500/50 rounded-full"
                />
              )}
            </div>
          </motion.div>
        </section>

        {/* Open-Source Section */}
        <section className="max-w-7xl mx-auto py-24 mb-32">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
             <div>
               <span className={typography.mono}>The Open-Source Layer</span>
               <h2 className={`${typography.heading} text-4xl md:text-6xl text-white mt-4 mb-8`}>OSINT & Evidence</h2>
               <p className={`${typography.body} text-slate-400 mb-8 leading-relaxed`}>
                 Our investigations are rooted in transparency. We leverage open-source datasets (OSINT), peer-reviewed academic studies, and public government records to build a factual foundation that survives the narrative churn.
               </p>
               <div className="grid grid-cols-2 gap-6">
                 <div className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-cyan-500/50 transition-colors">
                   <Database className="text-cyan-400 mb-4" size={24} />
                   <div className={`${typography.mono} text-[9px] text-white/40`}>Datasets</div>
                   <div className="text-lg font-serif">1,200+ Cleaned</div>
                 </div>
                 <div className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-cyan-500/50 transition-colors">
                   <FileText className="text-cyan-400 mb-4" size={24} />
                   <div className={`${typography.mono} text-[9px] text-white/40`}>Studies</div>
                   <div className="text-lg font-serif">Peer-Reviewed</div>
                 </div>
               </div>
             </div>
             
             <InteractiveGraph />
           </div>
        </section>

        {/* Investigative Grid */}
        <section className="max-w-7xl mx-auto py-24">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className={typography.mono}>ACTIVE INTELLIGENCE</span>
              <h2 className={`${typography.heading} text-3xl md:text-5xl text-white mt-2`}>Recent Dissections</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INVESTIGATIONS.map(article => (
              <motion.div
                key={article.id}
                whileHover={{ y: -8, borderColor: "rgba(34,211,238,0.3)" }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 rounded-xl border ${colors.surface} ${colors.border} transition-all duration-300 relative group overflow-hidden cursor-pointer`}
              >
                <div className="absolute top-0 left-0 w-1 h-0 bg-cyan-400 group-hover:h-full transition-all duration-500" />
                <div className="flex gap-2 mb-4">
                  {article.tags.map(tag => (
                    <span key={tag} className="text-[9px] px-2 py-0.5 rounded-full border border-white/5 text-white/40 uppercase font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className={`${typography.heading} text-xl text-white mb-2 group-hover:text-cyan-400 transition-colors`}>{article.title}</h3>
                <p className={`${typography.body} text-sm text-slate-400 mb-6 leading-relaxed`}>{article.description}</p>
                <div className="flex justify-between items-center mt-auto">
                  <div className="flex gap-4">
                    <div className="flex flex-col">
                      <span className="text-[8px] text-amber-500/60 font-mono">EMOTION</span>
                      <div className="w-10 h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500" style={{ width: `${article.stats.emotion * 10}%` }} />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] text-cyan-400/60 font-mono">INTEGRITY</span>
                      <div className="w-10 h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400" style={{ width: `${article.stats.factual * 10}%` }} />
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-white/20 group-hover:text-cyan-400 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-24 border-t border-white/5 bg-black/20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-slate-500">
            <div className="lg:col-span-2">
              <h3 className={`${typography.heading} text-white text-2xl mb-6`}>Signal Over Noise</h3>
              <p className="text-sm max-w-sm mb-8">Independent statistical journalism. Mapping the metrics of public discourse through OSINT and data transparency.</p>
              <div className="flex gap-4">
                <Twitter size={18} className="hover:text-cyan-400 cursor-pointer transition-colors" />
                <Github size={18} className="hover:text-cyan-400 cursor-pointer transition-colors" />
                <Mail size={18} className="hover:text-cyan-400 cursor-pointer transition-colors" />
              </div>
            </div>
            <div>
              <h4 className={`${typography.mono} text-white mb-6 text-[9px]`}>RESOURCES</h4>
              <ul className="space-y-2 text-xs">
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Open Data Repository</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Methodology Whitepaper</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h4 className={`${typography.mono} text-white mb-6 text-[9px]`}>STATUS</h4>
              <div className="flex items-center gap-2 text-[9px]">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                <span>ALL_SYSTEMS_OPERATIONAL</span>
              </div>
            </div>
          </div>
        </footer>
      </motion.main>

      {/* Global Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@300;400;600&display=swap');
        
        body { 
          margin: 0; 
          background: #0a0a0b; 
          scroll-behavior: auto;
          overflow-x: hidden;
        }
        
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        
        /* Hide scrollbar but keep function */
        ::-webkit-scrollbar { display: none; }
        html { scrollbar-width: none; -ms-overflow-style: none; }

        input::selection {
          background: rgba(34, 211, 238, 0.3);
          color: white;
        }
      `}} />
    </div>
  );
}