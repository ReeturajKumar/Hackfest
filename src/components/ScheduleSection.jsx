/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon, 
  ClockIcon, 
  CodeBracketIcon,
  SparklesIcon,
  AcademicCapIcon,
  GiftIcon,
  CalendarIcon,
  PlayIcon
} from '@heroicons/react/24/solid';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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
    transition: { type: "spring", stiffness: 80, damping: 15 } 
  }
};

const ScheduleSection = () => {
  const phases = [
    {
      phase: "Phase 1",
      title: "Registration & Onboarding",
      period: "Jan 1 - 20, 2026",
      icon: CalendarIcon,
      color: "pink",
      items: [
        "Open registration for individuals and teams",
        "Access to official communication channels",
        "Team formation support for solo participants"
      ]
    },
    {
      phase: "Phase 2",
      title: "Pre-Event Workshop",
      period: "7 Days Before Hackathon",
      icon: AcademicCapIcon,
      color: "purple",
      items: [
        "Zero-Code AI App Development Workshop",
        "Live, beginner-friendly sessions",
        "Build your first AI application",
        "No coding experience required"
      ]
    },
    {
      phase: "Phase 3",
      title: "24-Hour Hackathon",
      period: "Jan 31 - Feb 1, 2026",
      icon: CodeBracketIcon,
      color: "orange",
      items: [
        "Opening Ceremony & Orientation",
        "Problem Statement Release",
        "Core Development Phase",
        "Mentor Check-ins Available",
        "Side Challenges (Reels, Memes, Videos)",
        "Final Submission"
      ]
    },
    {
      phase: "Phase 4",
      title: "Post-Event Resources",
      period: "After Hackathon",
      icon: GiftIcon,
      color: "blue",
      items: [
        "Free ₹19,999 CloudBlitz Starter AI Kit",
        "Python & AI fundamentals (PDFs + Videos)",
        "Guest lectures by IIT experts",
        "Live session: How to Find Jobs Using AI",
        "Resume & LinkedIn templates"
      ]
    }
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
      
      {/* Gradient overlays */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-pink-100/30 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-orange-100/30 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
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
            Schedule & Timeline
          </motion.span>
          
          <motion.h1 
            variants={itemVariants}
            className="text-2xl sm:text-3xl lg:text-5xl font-black tracking-tighter text-slate-900 mb-2 leading-tight"
          >
            Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-orange-500">Timeline</span>, Win the Future
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-base md:text-lg text-slate-600 font-medium mb-4 max-w-2xl mx-auto"
          >
            From registration to post-event resources - everything you need to know about the CloudBlitz AI HackFest 2026 timeline
          </motion.p>
        </motion.div>

        {/* Event Phases Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {phases.map((phase, index) => {
              const IconComponent = phase.icon;
              const isLast = index === phases.length - 1;
              
              return (
                <React.Fragment key={index}>
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="relative p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 group"
                  >
                    {/* Phase Number Badge */}
                    <div className={`absolute -top-3 left-5 px-3 py-1 rounded-full font-black text-[10px] ${
                      phase.color === 'pink' ? 'bg-pink-500 text-white' :
                      phase.color === 'purple' ? 'bg-purple-500 text-white' :
                      phase.color === 'orange' ? 'bg-orange-500 text-white' :
                      'bg-blue-500 text-white'
                    }`}>
                      {phase.phase}
                    </div>

                    {/* Icon */}
                    <div className={`w-12 h-12 ${
                      phase.color === 'pink' ? 'bg-pink-50' :
                      phase.color === 'purple' ? 'bg-purple-50' :
                      phase.color === 'orange' ? 'bg-orange-50' :
                      'bg-blue-50'
                    } rounded-xl flex items-center justify-center mb-4 mt-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <IconComponent className={`w-6 h-6 ${
                        phase.color === 'pink' ? 'text-pink-600' :
                        phase.color === 'purple' ? 'text-purple-600' :
                        phase.color === 'orange' ? 'text-orange-600' :
                        'text-blue-600'
                      }`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-black text-slate-900 mb-2">
                      {phase.title}
                    </h3>

                    {/* Period */}
                    <p className={`text-xs font-bold mb-4 ${
                      phase.color === 'pink' ? 'text-pink-600' :
                      phase.color === 'purple' ? 'text-purple-600' :
                      phase.color === 'orange' ? 'text-orange-600' :
                      'text-blue-600'
                    }`}>
                      {phase.period}
                    </p>

                    {/* Items */}
                    <ul className="space-y-2">
                      {phase.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircleIcon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                            phase.color === 'pink' ? 'text-pink-500' :
                            phase.color === 'purple' ? 'text-purple-500' :
                            phase.color === 'orange' ? 'text-orange-500' :
                            'text-blue-500'
                          }`} />
                          <span className="text-xs text-slate-600 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Connector Line */}
                  {!isLast && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-slate-300 to-transparent z-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ScheduleSection;
