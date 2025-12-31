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
      description: "",
      highlight: "Includes IIT expert guest lectures.",
      tagline: "Learn. Build. Excel.",
      items: [
        "Python Fundamentals (Videos + PDFs)",
        "Mastering with AI (Videos + PDFs)",
        "10 Beginner AI Project Ideas",
        "Resume & LinkedIn Templates",
        "No-Code AI Tools Guide"
      ]
    },
    {
      icon: GiftIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      title: "Participation Gift Box",
      description: "",
      highlight: "Delivered to your doorstep.",
      tagline: "Premium Recognition Package",
      items: [
        "Official Certificate (Co-branded with IIT)",
        "IIT logo",
        "CloudBlitz logo",
        "QR Verification",
        "Official Learning Partner – IIT mentioned clearly",
        "Official Hackathon Badge (Magnet/Pinned)",
        "AI & DevOps Sticker Pack",
        "Motivational Card"
      ]
    },
    {
      icon: AcademicCapIcon,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      title: "Official Certificate (Co-branded with IIT-BHU)",
      description: "",
      highlight: "Guaranteed portfolio-ready projects.",
      tagline: "Credibility Meets Excellence",
      items: [
        "Official co-branded participation certificate",
        "Physical gift box delivered to your doorstep",
        "IIT-BHU verified credentials",
        "Digital certificate for LinkedIn",
        "Lifetime validity and recognition"
      ]
    },
    {
      icon: RocketLaunchIcon,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      title: "Live Masterclasses After the Event",
      description: "",
      highlight: "Continuous learning opportunities.",
      tagline: "Post-Event Excellence",
      items: [
        "Job Finding with AI (Hands-on session)",
        "Guest Lectures by IIT Experts & Industry Leaders",
        "Side Prizes (₹500 – ₹2,500 vouchers/cash)",
        "Best Meme about Hackathon",
        "Best Team Intro Video",
        "Best LinkedIn Post About Hackathon",
        "And Many More..."
      ]
    },
    {
      icon: SparklesIcon,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      title: "Media Spotlight for Top 20",
      description: "",
      highlight: "Get recognized nationally and internationally.",
      tagline: "National Recognition",
      items: [
        "National and International Media Coverage"
      ]
    },
    {
      icon: BuildingLibraryIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      title: "Guaranteed Portfolio Project",
      description: "",
      highlight: "Build your portfolio with professional templates.",
      tagline: "Portfolio Ready",
      items: [
        "An AI Project Template",
        "GitHub README Template",
        "PPT Template",
        "Submission Format"
      ]
    },
    {
      icon: BriefcaseIcon,
      color: "text-green-600",
      bgColor: "bg-green-50",
      title: "Career Acceleration",
      description: "Build resume-ready projects solving actual business problems from the EdTech industry.",
      highlight: "Bridge the gap between academia & industry.",
      tagline: "From Student to Industry Pro"
    }
  ];

  const achievements = [
    { icon: StarIcon, text: "Top 10 get internship interviews", color: "text-yellow-500" },
    { icon: FireIcon, text: "Top 20 get national media coverage", color: "text-orange-500" },
    { icon: BoltIcon, text: "Portfolio project for every participant", color: "text-pink-500" },
    { icon: GiftIcon, text: "Free ₹19,999 AI Starter Kit for all", color: "text-orange-400" },
    { icon: AcademicCapIcon, text: "IIT-BHU Co-branded Certificate", color: "text-purple-400" },
    { icon: BriefcaseIcon, text: "Direct internship opportunities", color: "text-blue-400" },
    { icon: RocketLaunchIcon, text: "Career mentorship sessions", color: "text-pink-400" },
    { icon: SparklesIcon, text: "Exclusive networking events", color: "text-amber-400" },
    { icon: UserGroupIcon, text: "IIT Expert Guest Lectures", color: "text-indigo-400" },
    { icon: TrophyIcon, text: "Side Prizes ₹500-₹2,500", color: "text-green-400" },
    { icon: BuildingLibraryIcon, text: "Physical Gift Box Delivery", color: "text-cyan-400" },
    { icon: CheckCircleIcon, text: "No Coding Required", color: "text-emerald-400" },
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
            Solve real industry problems. Earn IIT-BHU certification. Win ₹2.2L+ prizes.
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
          
          {/* Prize Pool Card - Featured */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-8 p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden group shadow-xl"
          >
            {/* Animated background elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-pink-500/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-full blur-3xl" />
            
            <TrophyIcon className="absolute -right-12 -bottom-12 w-56 h-56 text-white/5 group-hover:text-white/10 transition-all duration-1000 group-hover:rotate-12" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-orange-400 font-bold text-[9px] uppercase tracking-widest mb-2">
                <StarIcon className="w-3.5 h-3.5" />
                <span>Most Rewarding Track</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black mb-2 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D95] to-[#7030A0]">₹2,20,000+</span>
                <br />
                <span className="text-white">Prize Pool</span>
              </h2>
              
              <p className="text-slate-300 max-w-lg text-xs font-medium mb-4 leading-snug">
                Compete for massive cash prizes while building your portfolio. Top performers get direct internship opportunities and national recognition.
              </p>

              {/* Prize breakdown */}
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all">
                  <div className="text-[9px] text-slate-400 uppercase tracking-wider mb-0.5">First Place</div>
                  <div className="text-lg font-black text-white">₹1,00,000</div>
                </div>
                <div className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all">
                  <div className="text-[9px] text-slate-400 uppercase tracking-wider mb-0.5">Second Place</div>
                  <div className="text-lg font-black text-white">₹70,000</div>
                </div>
                <div className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all">
                  <div className="text-[9px] text-slate-400 uppercase tracking-wider mb-0.5">Third Place</div>
                  <div className="text-lg font-black text-white">₹50,000</div>
                </div>
              </div>

              {/* Achievements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-3 border-t border-white/10 mb-0">
                {achievements.map((achievement, i) => {
                  const IconComponent = achievement.icon;
                  return (
                    <div key={i} className="flex items-center gap-2 px-3 py-2">
                      <IconComponent className={`w-4 h-4 ${achievement.color} shrink-0`} />
                      <span className="text-xs text-slate-300 font-medium">{achievement.text}</span>
                    </div>
                  );
                })}
              </div>

            </div>
          </motion.div>

          {/* Smaller Vertical Benefit Cards */}
          <div className="md:col-span-4 grid grid-cols-1 gap-3">
            {benefits.slice(0, 3).map((b, i) => {
              const IconComponent = b.icon;
              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="p-3 rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 flex flex-col justify-between "
                >
                  <div>
                    <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                      {b.tagline}
                    </div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className={`w-8 h-8 ${b.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                        <IconComponent className={`w-3.5 h-3.5 ${b.color}`} />
                      </div>
                      <h3 className="text-sm font-black text-slate-900 leading-tight">
                        {b.title}
                      </h3>
                    </div>
                    <p className="text-[10px] text-slate-600 leading-snug mb-1.5">
                      {b.description}
                    </p>
                    {b.items && (
                      <div className="mt-1.5 mb-1.5">
                        <p className="text-[10px] text-slate-600 font-semibold leading-tight">
                          {b.items.join(', ')}.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="pt-1.5 border-t border-slate-100">
                    <p className="text-[11px] text-slate-500 font-bold italic">
                      {b.highlight}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* --- SECONDARY INFO ROW --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {benefits.slice(2, 6).map((b, i) => {
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
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    {b.tagline}
                  </div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className={`w-9 h-9 ${b.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex-shrink-0`}>
                      <IconComponent className={`w-4 h-4 ${b.color}`} />
                    </div>
                    <h4 className="text-base font-black text-slate-900 leading-tight">
                      {b.title}
                    </h4>
                  </div>
                  {b.items && (
                    <div className="mb-2">
                      <ul className="space-y-1">
                        {b.items.slice(0, 4).map((item, idx) => (
                          <li key={idx} className="text-[10px] text-slate-600 leading-tight flex items-start gap-1.5">
                            <span className="text-slate-400 mt-0.5 shrink-0">•</span>
                            <span className="font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {!b.items && b.description && (
                    <p className="text-[11px] text-slate-600 leading-relaxed mb-2">
                      {b.description}
                    </p>
                  )}
                  <div className="pt-2 border-t border-slate-100">
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

