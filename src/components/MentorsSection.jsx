/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';

// --- HACKATHON CORE TEAM ---
const mentors = [
  { 
    id: 1, 
    name: "Shubham K", 
    role: "Hackathon Lead", 
    tag: "LEAD", 
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    socials: { twitter: "#", linkedin: "#" }
  },
  { 
    id: 2, 
    name: "Rahul N", 
    role: "Offline Marketing Lead", 
    tag: "MARKETING", 
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    socials: { twitter: "#", linkedin: "#" }
  },
  { 
    id: 3, 
    name: "Atul W", 
    role: "Social Media Lead", 
    tag: "SOCIAL", 
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    socials: { twitter: "#", linkedin: "#" }
  },
  { 
    id: 4, 
    name: "Prashik B", 
    role: "Support Lead", 
    tag: "SUPPORT", 
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    socials: { twitter: "#", linkedin: "#" }
  },
  { 
    id: 5, 
    name: "Developers Panel", 
    role: "Mentors", 
    tag: "MENTORS", 
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    socials: { twitter: "#", linkedin: "#" }
  },
];

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { x: 50, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1, 
    transition: { type: "spring", stiffness: 60, damping: 20 }
  }
};

const MentorsSection = () => {
  const [activeMentor, setActiveMentor] = useState(mentors[0]);

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-transparent z-10 overflow-hidden">
      
      {/* --- INJECTED STYLES --- */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .scan-grid {
          background-image: linear-gradient(0deg, transparent 24%, rgba(236, 72, 153, .1) 25%, rgba(236, 72, 153, .1) 26%, transparent 27%, transparent 74%, rgba(236, 72, 153, .1) 75%, rgba(236, 72, 153, .1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(236, 72, 153, .1) 25%, rgba(236, 72, 153, .1) 26%, transparent 27%, transparent 74%, rgba(236, 72, 153, .1) 75%, rgba(236, 72, 153, .1) 76%, transparent 77%, transparent);
          background-size: 50px 50px;
        }

        .clip-corner {
          clip-path: polygon(
            0 0, 
            100% 0, 
            100% calc(100% - 15px), 
            calc(100% - 15px) 100%, 
            0 100%
          );
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-pink-500/30 bg-pink-500/10 text-pink-400 text-xs font-mono font-bold uppercase tracking-widest mb-4">
               <span className="w-1.5 h-1.5 bg-pink-500 animate-pulse"></span>
               Core_Team
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tight leading-none">
              Hackathon <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">Core Team</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl">
              Meet the team behind CloudBlitz AI HackFest - 2026. Our dedicated organizers and mentors are here to make this event extraordinary.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="hidden md:block h-px flex-1 bg-white/10 mx-8 mt-8"></motion.div>
          <motion.button variants={itemVariants} className="hidden md:flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-pink-500 hover:text-pink-500 transition-all text-gray-400 font-mono text-xs uppercase tracking-widest group">
            [ View_All_Records ]
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- LEFT: FEATURED MENTOR (HOLO-VIEWER) --- */}
          <motion.div 
            className="lg:col-span-5 relative group"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
          >
            {/* Cyber Frame */}
            <div className="absolute -inset-1 bg-gradient-to-b from-pink-500/20 to-orange-500/20 clip-corner"></div>
            
            <div className="relative h-[600px] w-full bg-[#050505] border border-white/10 clip-corner flex flex-col overflow-hidden">
              
              {/* Image Container */}
              <div className="relative flex-1 overflow-hidden group-hover:saturate-150 transition-all duration-500">
                <div className="absolute inset-0 scan-grid opacity-30 z-10 pointer-events-none"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-pink-500/50 z-20 shadow-[0_0_15px_#ec4899]"></div>
                
                <img 
                  key={activeMentor.id}
                  src={activeMentor.img} 
                  alt={activeMentor.name} 
                  className="relative z-0 w-full h-full object-cover object-top transition-transform duration-700 animate-fade-in"
                />
                
                {/* Tech Overlays */}
                <div className="absolute top-4 right-4 z-20 text-[10px] font-mono text-pink-500 bg-black/50 px-2 py-1 border border-pink-500/30">
                  ID: {activeMentor.tag}
                </div>
                
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-8 z-20">
                  <h3 className="text-4xl font-black text-white uppercase leading-none mb-2 tracking-tighter">
                    {activeMentor.name}
                  </h3>
                  <p className="text-gray-400 font-mono text-sm border-l-2 border-orange-500 pl-3">
                    {activeMentor.role}
                  </p>
                </div>
              </div>

              {/* Bottom Data & Socials */}
              <div className="h-24 bg-[#0a0a0a] border-t border-white/10 flex items-center justify-between px-8 relative z-30">
                <div className="flex flex-col">
                   <span className="text-[10px] font-mono text-gray-500 uppercase">Status</span>
                   <div className="flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                     <span className="text-white text-xs font-bold uppercase tracking-wider">Online</span>
                   </div>
                </div>

                <div className="flex gap-3">
                   {/* X (Twitter) Icon */}
                   <a href={activeMentor.socials.twitter} className="w-10 h-10 border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-pink-500 hover:bg-pink-500/10 transition-all clip-corner">
                     <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                   </a>
                   {/* LinkedIn Icon */}
                   <a href={activeMentor.socials.linkedin} className="w-10 h-10 border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-orange-500 hover:bg-orange-500/10 transition-all clip-corner">
                     <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                   </a>
                </div>
              </div>

            </div>
          </motion.div>

          {/* --- RIGHT: MENTOR LIST (SERVER BLADES) --- */}
          <motion.div 
            className="lg:col-span-7 flex flex-col justify-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <div className="flex flex-col gap-4 h-[600px] overflow-y-auto no-scrollbar pr-2">
              {mentors.map((mentor) => (
                <motion.div 
                  key={mentor.id}
                  variants={itemVariants}
                  onClick={() => setActiveMentor(mentor)}
                  className={`relative p-1 transition-all duration-300 cursor-pointer group ${activeMentor.id === mentor.id ? 'pl-6' : 'pl-0 hover:pl-2'}`}
                >
                  {/* Selection Indicator Line */}
                  {activeMentor.id === mentor.id && (
                    <motion.div 
                      layoutId="active-indicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500 to-orange-500"
                    />
                  )}

                  <div className={`
                    flex items-center gap-6 p-4 border rounded-sm transition-all
                    ${activeMentor.id === mentor.id 
                      ? 'bg-[#0f111a] border-pink-500/30' 
                      : 'bg-[#0a0a0a] border-white/5 hover:border-white/10 hover:bg-[#0f111a]'
                    }
                  `}>
                    {/* Small Avatar */}
                    <div className="relative w-16 h-16 shrink-0 overflow-hidden rounded-sm border border-white/10">
                      <img src={mentor.img} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                    </div>

                    {/* Text Info */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className={`text-lg font-bold uppercase ${activeMentor.id === mentor.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                          {mentor.name}
                        </h4>
                        <span className="text-[10px] font-mono text-gray-600 border border-white/5 px-1 bg-black/50">
                          {mentor.tag}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 font-mono mt-1">{mentor.role}</p>
                    </div>

                    {/* Arrow Icon */}
                    <div className={`text-gray-600 ${activeMentor.id === mentor.id ? 'text-pink-500' : 'group-hover:text-white'}`}>
                       →
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default MentorsSection;