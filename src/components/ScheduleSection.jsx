/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FlagIcon, 
  FireIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  PresentationChartLineIcon, 
  TrophyIcon,
  CodeBracketIcon,
  HashtagIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 50, damping: 15 } 
  }
};

const ScheduleSection = () => {
  const schedule = [
    { time: "00:00", title: "Hackathon Starts", desc: "31st Jan - 24-Hour Continuous Online Event Begins", icon: FlagIcon, type: "critical" },
    { time: "09:00", title: "Checkpoint 1", desc: "Team Formation & Problem Statement Selection", icon: CheckCircleIcon, type: "normal" },
    { time: "12:00", title: "Mentor Session", desc: "Live Mentorship & Guidance Available", icon: UserGroupIcon, type: "normal" },
    { time: "15:00", title: "Midway Review", desc: "Progress Check & Code Reviews", icon: CodeBracketIcon, type: "normal" },
    { time: "18:00", title: "Final Sprint", desc: "Last 6 Hours - Final Polish & Submission Prep", icon: ClockIcon, type: "warning" },
    { time: "23:59", title: "Submission Deadline", desc: "All Submissions Must Be Uploaded", icon: FireIcon, type: "critical" },
    { time: "04:00", title: "Awards Ceremony", desc: "Prize Distribution & Closing", icon: TrophyIcon, type: "winner" },
  ];

  return (
    <section className="relative py-24 bg-transparent z-10 overflow-hidden">
      
      {/* --- HEADER --- */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
              Live Sequence
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tight leading-none">
              24-Hour <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">Timeline</span>
            </h2>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-gray-400 font-mono text-sm">
              // DATE: 31st Jan 2026<br/>
              // FORMAT: Online Continuous
            </p>
          </div>
        </div>
      </motion.div>

      {/* --- THE HUD GRID --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          
          {schedule.map((item, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className={`
                group relative h-64 p-8 rounded-xl bg-[#0f111a]/40 backdrop-blur-md border border-white/10 overflow-hidden hover:bg-[#131620]/80 transition-all duration-300
                ${item.type === 'winner' ? 'col-span-1 md:col-span-2 lg:col-span-2 border-pink-500/50 bg-gradient-to-br from-pink-900/20 to-orange-900/20' : ''}
              `}
            >
              
              {/* 1. HUD CORNERS (The "Tech" Look) */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20 group-hover:border-pink-500 transition-colors"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20 group-hover:border-orange-500 transition-colors"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20 group-hover:border-orange-500 transition-colors"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20 group-hover:border-pink-500 transition-colors"></div>

              {/* 2. BACKGROUND BIG TIME (Visual Texture) */}
              <div className="absolute -right-4 -bottom-6 text-8xl font-black text-white/5 select-none font-mono group-hover:text-white/10 transition-colors">
                {item.time.split(':')[0]}
              </div>

              {/* 3. CONTENT */}
              <div className="relative z-10 h-full flex flex-col justify-between">
                
                {/* Top: Icon & Time */}
                <div className="flex justify-between items-start">
                   <div className={`p-3 rounded-lg border bg-white/5 ${
                     item.type === 'winner' ? 'border-pink-500/50 text-white' : 'border-white/10 text-gray-400 group-hover:text-white group-hover:border-white/30'
                   } transition-colors`}>
                     <item.icon className="w-6 h-6" />
                   </div>
                   <div className="text-sm font-mono text-gray-500 border border-white/10 px-2 py-1 rounded bg-black/20">
                     UTC {item.time}
                   </div>
                </div>

                {/* Bottom: Title & Desc */}
                <div>
                   <h3 className={`text-2xl font-black uppercase mb-2 leading-none ${
                     item.type === 'winner' 
                       ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500' 
                       : 'text-white group-hover:text-pink-200'
                   } transition-colors`}>
                     {item.title}
                   </h3>
                   <div className="h-1 w-12 bg-white/10 mb-3 group-hover:bg-gradient-to-r from-pink-500 to-orange-500 transition-all"></div>
                   <p className="text-sm text-gray-400 font-medium">
                     {item.desc}
                   </p>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

            </motion.div>
          ))}

        </motion.div>
      </div>
    </section>
  );
};

export default ScheduleSection;