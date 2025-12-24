/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import { motion } from 'framer-motion'; 
import { 
  TrophyIcon, 
  UserGroupIcon, 
  CpuChipIcon, 
  RocketLaunchIcon, 
  BoltIcon, 
  GiftIcon 
} from '@heroicons/react/24/outline';

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Stagger delay between cards
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 }, // Start 50px below
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 50, 
      damping: 20 
    } 
  }
};

// --- COMPONENT: TECH SPOTLIGHT CARD ---
const SpotlightCard = ({ children, className = "", span = "", label = "", variants }) => {
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div
      ref={divRef}
      variants={variants}
      onMouseMove={handleMouseMove}
      className={`relative rounded-xl bg-[#0a0a0a] border border-white/10 overflow-hidden group transition-all duration-300 hover:-translate-y-1 ${className} ${span}`}
    >
      {/* 1. MOUSE SPOTLIGHT GLOW (Border) */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(236, 72, 153, 0.4), rgba(249, 115, 22, 0.4), transparent 40%)`
        }}
      />

      {/* 2. INNER CARD CONTAINER (Masks the glow) */}
      <div className="absolute inset-[1px] rounded-[calc(0.75rem-1px)] bg-[#0f111a]/95 backdrop-blur-xl z-10">
         <div className="absolute inset-0 opacity-10" 
              style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
         </div>
      </div>

      {/* 3. MOUSE SPOTLIGHT (Inner Surface) */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 mix-blend-overlay"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.1), transparent 40%)`
        }}
      />

      {/* 4. HUD CORNERS */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/10 group-hover:border-pink-500/50 transition-colors z-20 rounded-tl-xl"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/10 group-hover:border-orange-500/50 transition-colors z-20 rounded-br-xl"></div>

      {/* 5. TECH LABEL */}
      {label && (
        <div className="absolute top-4 right-4 z-30">
          <span className="text-[10px] font-mono text-gray-600 group-hover:text-pink-400 transition-colors uppercase tracking-widest border border-white/5 px-2 py-1 rounded bg-black/50">
            {label}
          </span>
        </div>
      )}

      {/* 6. CONTENT */}
      <div className="relative z-30 h-full">
        {children}
      </div>
    </motion.div>
  );
};


const WhyParticipate = () => {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-transparent z-10 overflow-hidden">
      
      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-pink-600/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER (Animated) --- */}
        <motion.div 
          className="text-center mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }} /* CHANGE: once: false makes it repeat */
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-xs font-mono text-gray-300 uppercase tracking-[0.2em]">Why_Participate</span>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-black uppercase text-white tracking-tighter leading-none">
            Why Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">CloudBlitz</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto border-l-2 border-orange-500/50 pl-6 text-left md:text-center md:border-none md:pl-0">
            No coding experience required. Get ₹19,999 worth AI kit free, official IIT co-branded certificate, portfolio projects, and career opportunities.
          </motion.p>
        </motion.div>

        {/* --- GRID (Animated Stagger) --- */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }} /* CHANGE: once: false makes it repeat */
          variants={containerVariants}
        >
          
          {/* 1. PRIZES */}
          <SpotlightCard span="md:col-span-2" label="SYS_REWARD_POOL" variants={itemVariants}>
            <div className="p-8 md:p-12 h-full flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="relative group/icon">
                <div className="absolute inset-0 bg-pink-500/20 blur-xl rounded-full opacity-0 group-hover/icon:opacity-100 transition-opacity"></div>
                <div className="relative p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 text-white shadow-2xl">
                  <TrophyIcon className="w-12 h-12 text-pink-500" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-black text-white uppercase italic mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-orange-500 transition-all">
                  ₹2,20,000 Prize Pool
                </h3>
                <p className="text-gray-400 text-sm md:text-base max-w-lg leading-relaxed mb-2">
                  <span className="text-pink-400 font-bold">1st Prize:</span> ₹1,00,000 | <span className="text-orange-400 font-bold">2nd Prize:</span> ₹70,000 | <span className="text-yellow-400 font-bold">3rd Prize:</span> ₹50,000
                </p>
                <p className="text-gray-500 text-xs">
                  Plus side prizes (₹500-₹2,500), media spotlight for top 20, and internship pipeline for top 10.
                </p>
              </div>
            </div>
          </SpotlightCard>

          {/* 2. MENTORSHIP */}
          <SpotlightCard label="NET_ACCESS" variants={itemVariants}>
            <div className="p-8 h-full flex flex-col justify-between">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                   <UserGroupIcon className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold text-white uppercase mb-2">Elite Mentors</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  1:1 uplink with Senior Engineers from FAANG. Debug your logic in real-time.
                </p>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-orange-500 group-hover:w-full transition-all duration-700 ease-out"></div>
              </div>
            </div>
          </SpotlightCard>

          {/* 3. WORKSHOPS */}
          <SpotlightCard label="SKILL_UPLOAD" variants={itemVariants}>
            <div className="p-8 h-full flex flex-col justify-between">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center border border-pink-500/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                   <CpuChipIcon className="w-6 h-6 text-pink-500" />
                </div>
                <h3 className="text-xl font-bold text-white uppercase mb-2">Pre-Event Workshop</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Zero Code App Development Workshop. Live masterclasses on Job Finding with AI after the event.
                </p>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-pink-500 group-hover:w-full transition-all duration-700 ease-out"></div>
              </div>
            </div>
          </SpotlightCard>

          {/* 4. CAREER */}
          <SpotlightCard label="CAREER_MODE" variants={itemVariants}>
            <div className="p-8 h-full flex flex-col justify-between">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                   <RocketLaunchIcon className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold text-white uppercase mb-2">Internship Pipeline</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Top 10 get internship interviews, skill evaluation, career mentoring, and industry exposure.
                </p>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-purple-500 group-hover:w-full transition-all duration-700 ease-out"></div>
              </div>
            </div>
          </SpotlightCard>

          {/* 5. GAMING */}
          <SpotlightCard span="md:col-span-1" label="LOOT_BOX" variants={itemVariants}>
             <div className="p-8 h-full relative overflow-hidden flex flex-col justify-between">
               <div className="absolute -bottom-6 -right-6 text-9xl font-black text-white/5 select-none pointer-events-none group-hover:text-white/10 transition-colors">XP</div>
               <div className="relative z-10">
                 <div className="flex items-center gap-4 mb-6">
                   <div className="p-2 rounded bg-white/5 border border-white/10 group-hover:border-orange-500/50 transition-colors"><BoltIcon className="w-6 h-6 text-orange-400" /></div>
                   <div className="p-2 rounded bg-white/5 border border-white/10 group-hover:border-pink-500/50 transition-colors"><GiftIcon className="w-6 h-6 text-pink-400" /></div>
                 </div>
                 <h3 className="text-xl font-bold text-white uppercase mb-2">Side Prizes</h3>
                 <p className="text-gray-400 text-sm">₹500-₹2,500 for Best Meme, Best PPT, Best UI/UX, Best Team Name, Fastest Submission & more!</p>
               </div>
             </div>
          </SpotlightCard>

        </motion.div>
      </div>
    </section>
  );
};

export default WhyParticipate;