/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion'; 
import { 
  TrophyIcon, 
  UserGroupIcon, 
  RocketLaunchIcon, 
  GiftIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  SparklesIcon,
  BuildingLibraryIcon,
  CheckCircleIcon,
  StarIcon,
  FireIcon,
  BoltIcon
} from '@heroicons/react/24/solid';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  }
};

const WhyParticipate = () => {
  const benefits = [
    {
      icon: GiftIcon,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      title: "Free ₹19,999 AI Kit",
      description: "Starter AI Kit with Python fundamentals, project ideas, and premium resume/LinkedIn templates.",
      highlight: "Includes IIT expert guest lectures.",
      tagline: "Learn. Build. Excel."
    },
    {
      icon: AcademicCapIcon,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      title: "Official Certificate (Co-branded with IIT-BHU)",
      description: "Official co-branded participation certificate and physical gift box delivered to your doorstep.",
      highlight: "Guaranteed portfolio-ready projects.",
      tagline: "Credibility Meets Excellence"
    },
    {
      icon: RocketLaunchIcon,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      title: "Career Acceleration",
      description: "Build resume-ready projects solving actual business problems from the EdTech industry.",
      highlight: "Bridge the gap between academia & industry.",
      tagline: "From Student to Industry Pro"
    },
    {
      icon: SparklesIcon,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      title: "Beginner-Friendly",
      description: "No coding? No problem. Zero-Code AI Workshop provided 7 days before the event starts.",
      highlight: "Value for everyone, not just winners.",
      tagline: "Start Your Journey Here"
    },
    {
      icon: BuildingLibraryIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      title: "Industry Problems",
      description: "Real-world challenges like Placement Intelligence and Content Automation tracking.",
      highlight: "Multiple tracks for No-Code & AI.",
      tagline: "Solve Real Challenges"
    }
  ];

  const achievements = [
    { icon: StarIcon, text: "Top 10 get internship interviews", color: "text-yellow-500" },
    { icon: FireIcon, text: "Top 20 get national media coverage", color: "text-orange-500" },
    { icon: BoltIcon, text: "Portfolio project for every participant", color: "text-pink-500" }
  ];

  return (
    <section className="relative py-10 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      {/* Blueprint Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1.5px, transparent 1.5px), linear-gradient(90deg, #000 1.5px, transparent 1.5px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HERO HEADER --- */}
        <motion.div 
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.span 
            variants={itemVariants}
            className="text-[12px] font-bold text-pink-500 uppercase tracking-widest mb-3 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Why Participate
          </motion.span>
          
          <motion.h1 
            variants={itemVariants} 
            className="text-2xl sm:text-3xl lg:text-5xl font-black tracking-tighter text-slate-900 mb-2 leading-tight"
          >
            Build Real Solutions, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D95] to-[#7030A0]">Launch Your Career</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-base md:text-lg text-slate-600 font-medium mb-6 max-w-2xl mx-auto"
          >
            Join India's most rewarding AI hackathon. Solve real industry problems, earn IIT-BHU certification, and unlock career opportunities with ₹2.2L+ prizes
          </motion.p>

          {/* Value Proposition Tagline */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-slate-700"
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-pink-50 rounded-full border border-pink-200">
              <CheckCircleIcon className="w-3.5 h-3.5 text-pink-600" />
              <span>No Coding Required</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 rounded-full border border-purple-200">
              <CheckCircleIcon className="w-3.5 h-3.5 text-purple-600" />
              <span>IIT-BHU Certificate</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 rounded-full border border-orange-200">
              <CheckCircleIcon className="w-3.5 h-3.5 text-orange-600" />
              <span>₹19,999 Free Kit</span>
            </div>
          </motion.div>
        </motion.div>

        {/* --- MAIN CONTENT BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
          
          {/* Prize Pool Card - Featured */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-8 p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden group shadow-xl"
          >
            {/* Animated background elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-pink-500/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-full blur-3xl" />
            
            <TrophyIcon className="absolute -right-12 -bottom-12 w-56 h-56 text-white/5 group-hover:text-white/10 transition-all duration-1000 group-hover:rotate-12" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-orange-400 font-bold text-[10px] uppercase tracking-widest mb-4">
                <StarIcon className="w-4 h-4" />
                <span>Most Rewarding Track</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black mb-3 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D95] to-[#7030A0]">₹2,20,000+</span>
                <br />
                <span className="text-white">Prize Pool</span>
              </h2>
              
              <p className="text-slate-300 max-w-lg text-sm font-medium mb-6 leading-relaxed">
                Compete for massive cash prizes while building your portfolio. Top performers get direct internship opportunities and national recognition.
              </p>

              {/* Prize breakdown */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">First Place</div>
                  <div className="text-xl font-black text-white">₹1,00,000</div>
                </div>
                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Second Place</div>
                  <div className="text-xl font-black text-white">₹70,000</div>
                </div>
                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Third Place</div>
                  <div className="text-xl font-black text-white">₹50,000</div>
                </div>
              </div>

              {/* Achievements */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
                {achievements.map((achievement, i) => {
                  const IconComponent = achievement.icon;
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <IconComponent className={`w-4 h-4 ${achievement.color}`} />
                      <span className="text-xs text-slate-300 font-medium">{achievement.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Smaller Vertical Benefit Cards */}
          <div className="md:col-span-4 grid grid-cols-1 gap-4">
            {benefits.slice(0, 2).map((b, i) => {
              const IconComponent = b.icon;
              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="p-6 rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 flex flex-col justify-between group hover:border-pink-300 hover:shadow-lg transition-all duration-300"
                >
                  <div>
                    <div className={`w-12 h-12 ${b.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-6 h-6 ${b.color}`} />
                    </div>
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                      {b.tagline}
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mb-2 leading-tight">
                      {b.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      {b.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100">
                    <p className="text-[10px] text-slate-500 font-medium italic">
                      {b.highlight}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* --- SECONDARY INFO ROW --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {benefits.slice(2).map((b, i) => {
            const IconComponent = b.icon;
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-sm hover:shadow-lg hover:border-pink-300 transition-all duration-300 relative overflow-hidden group"
              >
                
                <div className="relative z-10">
                  <div className={`w-10 h-10 ${b.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <IconComponent className={`w-5 h-5 ${b.color}`} />
                  </div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                    {b.tagline}
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-2 leading-tight">
                    {b.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {b.description}
                  </p>
                  <div className="pt-3 border-t border-slate-100">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider italic">
                      {b.highlight}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* --- CALL TO ACTION SECTION --- */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative p-6 md:p-8 rounded-2xl bg-gradient-to-r from-[#FF2D95] to-[#7030A0] overflow-hidden shadow-xl"
        >
          <div className="relative z-10 text-center text-white">
            <h3 className="text-2xl md:text-3xl font-black mb-3">
              Ready to Transform Your Career?
            </h3>
            <p className="text-sm md:text-base text-white/90 mb-6 max-w-2xl mx-auto">
              Join hundreds of students building the future with AI. Register now and get your ₹19,999 AI starter kit absolutely free!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-1.5 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                <CheckCircleIcon className="w-4 h-4" />
                <span className="text-xs font-bold">100% Beginner-Friendly</span>
              </div>
              <div className="flex items-center gap-1.5 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                <CheckCircleIcon className="w-4 h-4" />
                <span className="text-xs font-bold">IIT-BHU Certified</span>
              </div>
              <div className="flex items-center gap-1.5 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                <CheckCircleIcon className="w-4 h-4" />
                <span className="text-xs font-bold">Guaranteed Portfolio Project</span>
              </div>
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default WhyParticipate;
