/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import {
  SparklesIcon,
  UserGroupIcon,
  AcademicCapIcon,
  BuildingLibraryIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  CheckCircleIcon,
  CodeBracketIcon,
  LightBulbIcon,
  DocumentTextIcon
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

const ProblemStatementsSection = () => {
  const problemStatements = [
    {
      id: 1,
      icon: UserGroupIcon,
      iconColor: "text-pink-600",
      iconBg: "bg-pink-50",
      title: "AI-Powered Lead Management & Follow-Up Intelligence",
      description: "Build intelligent systems to track, manage, and follow up with leads automatically using AI-powered insights and automation. Transform sales processes with smart lead scoring and personalized follow-up strategies.",
      tracks: ["Beginner/No-Code Track", "Advanced/AI Track"],
      skills: ["CRM Systems", "Automation", "AI Integration", "Data Analytics"],
      impact: "Streamline sales operations and increase conversion rates"
    },
    {
      id: 2,
      icon: AcademicCapIcon,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-50",
      title: "Student Study Tracking & Dropout Prediction",
      description: "Develop predictive analytics systems to track student progress and identify at-risk students for early intervention. Help educational institutions reduce dropout rates through data-driven insights.",
      tracks: ["Beginner/No-Code Track", "Advanced/AI Track"],
      skills: ["Predictive Analytics", "Student Analytics", "Machine Learning", "Data Visualization"],
      impact: "Improve student retention and academic success rates"
    },
    {
      id: 3,
      icon: Cog6ToothIcon,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-50",
      title: "Smart Fee Collection & Defaulter Detection",
      description: "Create automated fee management systems with intelligent defaulter detection and payment reminders. Simplify financial operations for educational institutions with AI-powered payment tracking.",
      tracks: ["Beginner/No-Code Track", "Advanced/AI Track"],
      skills: ["Payment Systems", "Automation", "Notification Systems", "Financial Analytics"],
      impact: "Reduce payment delays and improve cash flow management"
    },
    {
      id: 4,
      icon: CodeBracketIcon,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
      title: "Automated Notes, Quiz & Question Bank Generator",
      description: "Build AI-driven content generation systems that create study notes, quizzes, and comprehensive question banks automatically. Revolutionize educational content creation with intelligent automation.",
      tracks: ["Beginner/No-Code Track", "Advanced/AI Track"],
      skills: ["Content Generation", "NLP", "Educational Technology", "AI Models"],
      impact: "Save hours of manual content creation and enhance learning materials"
    },
    {
      id: 5,
      icon: BuildingLibraryIcon,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
      title: "Job Vacancy Aggregator & Placement Intelligence Platform",
      description: "Develop intelligent job aggregation platforms with placement analytics and career matching algorithms. Connect students with opportunities through AI-powered job recommendations.",
      tracks: ["Beginner/No-Code Track", "Advanced/AI Track"],
      skills: ["Job Matching", "Data Aggregation", "Career Analytics", "Recommendation Systems"],
      impact: "Bridge the gap between students and employment opportunities"
    },
    {
      id: 6,
      icon: DocumentTextIcon,
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-50",
      title: "Automated Attendance & Performance Analytics System",
      description: "Create comprehensive attendance tracking systems with performance analytics and automated reporting. Help institutions monitor student engagement and identify patterns for better academic outcomes.",
      tracks: ["Beginner/No-Code Track", "Advanced/AI Track"],
      skills: ["Attendance Systems", "Performance Analytics", "Automated Reporting", "Data Insights"],
      impact: "Improve student engagement tracking and academic performance monitoring"
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
      
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
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
            Problem Statements
          </motion.span>
          
          <motion.h1 
            variants={itemVariants} 
            className="text-2xl sm:text-3xl lg:text-5xl font-black tracking-tighter text-slate-900 mb-2 leading-tight"
          >
            Transform Ideas Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D95] to-[#7030A0]">Real Impact</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-base md:text-lg text-slate-700 font-medium mb-4 max-w-2xl mx-auto leading-relaxed"
          >
            Build portfolio-ready solutions for real EdTech challenges
          </motion.p>

          {/* Key Features */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-slate-700"
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-pink-50 rounded-full border border-pink-200">
              <span>No-Code Track Available</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 rounded-full border border-purple-200">
              <span>Industry-Driven Problems</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 rounded-full border border-orange-200">
              <span>Portfolio-Ready Projects</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-full border border-blue-200">
              <span>Real-World Impact</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Problem Statements Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {problemStatements.map((problem, index) => {
            const IconComponent = problem.icon;
            return (
              <motion.div
                key={problem.id}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.01 }}
                className="relative p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-sm hover:shadow-lg hover:border-pink-300 transition-all duration-300 group h-full flex flex-col"
              >
                
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon and Number */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${problem.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <IconComponent className={`w-6 h-6 ${problem.iconColor}`} />
                    </div>
                    <div className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200">
                      <span className="text-[10px] font-black text-slate-600">#{problem.id}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-black text-slate-900 mb-3 leading-tight">
                    {problem.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 flex-grow">
                    {problem.description}
                  </p>

                  {/* Tracks */}
                  <div className="mb-4">
                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-wider mb-2">
                      Available Tracks
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {problem.tracks.map((track, i) => (
                        <span 
                          key={i}
                          className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          {track}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="pt-4 border-t border-slate-100 mt-auto">
                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-wider mb-2">
                      Key Skills You'll Build
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {problem.skills.map((skill, i) => (
                        <span 
                          key={i}
                          className="px-2 py-0.5 text-[9px] font-bold rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Judging Criteria Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative p-10 md:p-14 rounded-[2.5rem] bg-gradient-to-br from-slate-50 via-white to-slate-50 border-2 border-slate-200 shadow-xl"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 mb-6">
              <ChartBarIcon className="w-5 h-5 text-purple-600" />
              <span className="text-[11px] font-black uppercase tracking-widest text-purple-600">How We Evaluate</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Judging Criteria
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-medium">
              Fair and transparent evaluation ensuring both beginners and advanced participants get equal opportunities to showcase their work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Technical Execution", weight: "40%", color: "pink", description: "Code quality, architecture, and implementation excellence", icon: CodeBracketIcon },
              { label: "Business Impact", weight: "25%", color: "orange", description: "Practical usefulness and real-world value creation", icon: LightBulbIcon },
              { label: "Innovation & Creativity", weight: "25%", color: "purple", description: "Unique solutions and creative problem-solving", icon: SparklesIcon },
              { label: "Presentation & Demo", weight: "10%", color: "blue", description: "Clear communication and effective demonstration", icon: DocumentTextIcon }
            ].map((criterion, index) => {
              const IconComponent = criterion.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="p-6 rounded-2xl bg-white border-2 border-slate-200 hover:border-pink-300 transition-all shadow-sm hover:shadow-lg group"
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                    criterion.color === 'pink' ? 'bg-pink-50' :
                    criterion.color === 'orange' ? 'bg-orange-50' :
                    criterion.color === 'purple' ? 'bg-purple-50' :
                    'bg-blue-50'
                  }`}>
                    <IconComponent className={`w-7 h-7 ${
                      criterion.color === 'pink' ? 'text-pink-600' :
                      criterion.color === 'orange' ? 'text-orange-600' :
                      criterion.color === 'purple' ? 'text-purple-600' :
                      'text-blue-600'
                    }`} />
                  </div>
                  <div className={`text-3xl font-black mb-3 ${
                    criterion.color === 'pink' ? 'text-pink-600' :
                    criterion.color === 'orange' ? 'text-orange-600' :
                    criterion.color === 'purple' ? 'text-purple-600' :
                    'text-blue-600'
                  }`}>
                    {criterion.weight}
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-2">
                    {criterion.label}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {criterion.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-r from-pink-50 via-purple-50 to-orange-50 border-2 border-pink-200">
            <div className="flex items-start gap-3">
              <CheckCircleIcon className="w-6 h-6 text-pink-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm md:text-base text-slate-700 font-semibold">
                <span className="font-black text-slate-900">Important Note:</span> Beginner and advanced submissions are evaluated separately to ensure fairness and equal opportunities. Your project will be judged against others in your skill level category.
              </p>
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default ProblemStatementsSection;
