/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckIcon, UserIcon, UsersIcon, ArrowRightIcon } from '@heroicons/react/24/outline';


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    }
  }
};

const cardVariants = {
  hidden: { y: 50, opacity: 0, scale: 0.95 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 50, damping: 15 } 
  }
};

const featureVariants = {
  hidden: { x: -10, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.3 } }
};

const PricingSection = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-transparent z-10 overflow-hidden">
      <style>{`
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .clip-corner {
          clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%);
        }
      `}</style>

      <motion.div 
        className="max-w-7xl mx-auto mb-20 text-center relative z-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.5 }}
        variants={containerVariants}
      >
        <motion.div variants={cardVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-widest mb-4">
           <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
           Registration
        </motion.div>
        <motion.h2 variants={cardVariants} className="text-5xl md:text-7xl font-black uppercase text-white tracking-tighter leading-none">
          Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">Participation</span>
        </motion.h2>
        <motion.p variants={cardVariants} className="text-gray-400 mt-4 text-center">
          31st January 2026 | Maharashtra Level | Online Continuous
        </motion.p>
      </motion.div>

      {/* --- 7XL GRID CONTAINER --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-20">
        
        {/* === CARD 1: SOLO (ORANGE) === */}
        <motion.div 
          className="group relative h-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={cardVariants}
        >
          {/* Hover Glow Behind */}
          <div className="absolute -inset-1 bg-gradient-to-b from-orange-500 to-transparent opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500 rounded-[2rem]"></div>
          
          <div className="relative h-full bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-1 overflow-hidden transition-transform duration-300 group-hover:-translate-y-2">
            
            {/* Inner Dark Container */}
            <div className="relative h-full bg-[#0f111a] rounded-[1.8rem] p-8 md:p-12 overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-transparent"></div>

              {/* HUD Corners */}
              <div className="absolute top-6 right-6 w-3 h-3 border-t-2 border-r-2 border-orange-500/30 group-hover:border-orange-500 transition-colors"></div>
              <div className="absolute bottom-6 left-6 w-3 h-3 border-b-2 border-l-2 border-orange-500/30 group-hover:border-orange-500 transition-colors"></div>

              {/* Content */}
              <motion.div className="relative z-10" variants={containerVariants}>
                <div className="flex justify-between items-start mb-8">
                  <div className="p-4 rounded-2xl bg-orange-500/10 text-orange-500 border border-orange-500/20">
                    <UserIcon className="w-10 h-10" />
                  </div>
                  <div className="text-right">
                    <h3 className="text-2xl font-black text-white uppercase italic">Solo Operator</h3>
                    <p className="text-orange-400 text-xs font-bold uppercase tracking-widest">Single Entry</p>
                  </div>
                </div>

                <div className="mb-10 p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
                  <span className="text-6xl font-black text-white tracking-tighter">₹499</span>
                  <span className="text-gray-400 font-mono text-sm ml-2">/ Individual</span>
                </div>

                <motion.ul className="space-y-4 mb-10" variants={containerVariants}>
                  {['24-Hour Full Access', 'Official Certificate (IIT Co-branded)', 'CloudBlitz AI Kit (Worth ₹19,999)', 'Choose Category (AI/ML, Web3, Mobile, Web Dev, No-Code)', 'Mentor Access & Workshops', 'Portfolio Project Templates', 'Participation Gift Box'].map((item, i) => (
                    <motion.li key={i} variants={featureVariants} className="flex items-center gap-3 group/item">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover/item:bg-orange-500 transition-colors"></div>
                      <span className="text-gray-300 font-medium group-hover/item:text-white transition-colors text-sm">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <Link 
                  to="/register"
                  state={{ plan: 'solo' }}
                  className="block w-full py-5 bg-transparent border border-orange-500/30 text-white font-bold uppercase tracking-widest hover:bg-orange-500 hover:border-orange-500 hover:text-black transition-all duration-300 clip-corner text-center"
                >
                  Initialize Solo
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* === CARD 2: SQUAD (PINK) === */}
        <motion.div 
          className="group relative h-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={cardVariants}
        >
          {/* Best Value Floater */}
          <motion.div 
            className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-pink-500/40"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Most Popular
          </motion.div>

          <div className="absolute -inset-1 bg-gradient-to-b from-pink-500 to-transparent opacity-20 blur-2xl group-hover:opacity-50 transition-opacity duration-500 rounded-[2rem]"></div>
          
          <div className="relative h-full bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-1 overflow-hidden transition-transform duration-300 group-hover:-translate-y-2">
            
            <div className="relative h-full bg-[#0f111a] rounded-[1.8rem] p-8 md:p-12 overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500"></div>

              {/* HUD Corners */}
              <div className="absolute top-6 right-6 w-3 h-3 border-t-2 border-r-2 border-pink-500/30 group-hover:border-pink-500 transition-colors"></div>
              <div className="absolute bottom-6 left-6 w-3 h-3 border-b-2 border-l-2 border-pink-500/30 group-hover:border-pink-500 transition-colors"></div>

              <motion.div className="relative z-10" variants={containerVariants}>
                <div className="flex justify-between items-start mb-8">
                  <div className="p-4 rounded-2xl bg-pink-500/10 text-pink-500 border border-pink-500/20">
                    <UsersIcon className="w-10 h-10" />
                  </div>
                  <div className="text-right">
                    <h3 className="text-2xl font-black text-white uppercase italic">Team</h3>
                    <p className="text-pink-400 text-xs font-bold uppercase tracking-widest">2-4 Members</p>
                  </div>
                </div>

                <div className="mb-10 p-6 rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20 backdrop-blur-sm relative overflow-hidden">
                  <div className="relative z-10">
                    <span className="text-6xl font-black text-white tracking-tighter">₹999</span>
                    <span className="text-gray-400 font-mono text-sm ml-2">/ TEAM</span>
                    <p className="text-xs text-green-400 font-mono mt-2">SAVINGS: ₹997 DETECTED (vs Individual)</p>
                  </div>
                </div>

                <motion.ul className="space-y-4 mb-10" variants={containerVariants}>
                  {['Everything in Solo', 'Team of 2-4 Members', 'Choose Category Together', 'Dedicated Team Workspace', 'Priority Mentor Channel', 'Team Badges & Certificates', 'Collaborative Portfolio Project', 'Team Gift Box'].map((item, i) => (
                    <motion.li key={i} variants={featureVariants} className="flex items-center gap-3 group/item">
                      <div className="w-1.5 h-1.5 rounded-full bg-pink-500 group-hover/item:shadow-[0_0_10px_#ec4899] transition-all"></div>
                      <span className="text-white font-bold text-sm">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <Link 
                  to="/register"
                  state={{ plan: 'team' }}
                  className="block w-full py-5 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold uppercase tracking-widest hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all duration-300 clip-corner text-center"
                >
                  Initialize Team
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* --- BOTTOM CTA (Full Width 7XL) --- */}
      <div 
        className="max-w-7xl mx-auto mt-16 px-0 md:px-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.5 }}
        variants={cardVariants}
      >
        <div className="relative group overflow-hidden rounded-[2rem]">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-orange-500 to-pink-500 opacity-80 blur-sm group-hover:opacity-100 transition-opacity"></div>
          
          <div className="relative m-[2px] bg-[#030712] rounded-[calc(2rem-2px)] py-12 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden">
             
             <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-pink-500/20 to-transparent blur-[80px]"></div>

             <div className="relative z-10 text-center md:text-left">
               <h3 className="text-3xl md:text-4xl font-black text-white uppercase italic leading-none mb-2">
                 Ready to Deploy?
               </h3>
               <p className="text-gray-400">Slots are filling up. Secure your access token now.</p>
             </div>

             <Link 
               to="/register"
               className="relative z-10 flex items-center gap-4 px-10 py-5 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-xl shadow-white/10"
             >
               Register Today
               <ArrowRightIcon className="w-6 h-6" />
             </Link>
          </div>
        </div>
      </div>

    </section>
  );
};

export default PricingSection;