/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircleIcon,
  PresentationChartBarIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  CodeBracketIcon,
  KeyIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/solid';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
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

const DeliverablesSection = () => {
  const deliverables = [
    {
      icon: PresentationChartBarIcon,
      iconColor: "text-pink-600",
      iconBg: "bg-pink-50",
      dotColor: "bg-pink-600",
      title: "Project Presentation (3–4 slides)",
      description: "3-4 slides covering problem statement, solution, and workflow. Include visual diagrams."
    },
    {
      icon: VideoCameraIcon,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-50",
      dotColor: "bg-purple-600",
      title: "Application Demo (3 minutes max)",
      description: "3-minute max video demo showcasing key features and user journey."
    },
    {
      icon: DocumentTextIcon,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-50",
      dotColor: "bg-orange-600",
      title: "Project Documentation (README)",
      description: "README explaining what the app does, setup instructions, and usage guide."
    },
    {
      icon: CodeBracketIcon,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
      dotColor: "bg-blue-600",
      title: "Source Code (Public GitHub Repository)",
      description: "Complete source code in a public GitHub repo. Well-organized and documented."
    },
    {
      icon: KeyIcon,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
      dotColor: "bg-emerald-600",
      title: "Test User Credentials (if applicable)",
      description: "If login required, provide test credentials (username/password) in README."
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
            className="text-overline text-pink-500 mb-3 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Deliverables & Submission Format
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="text-display-md text-slate-900 mb-2"
          >
            Submission <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D95] to-[#7030A0]">Requirements</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-body-xl text-slate-600 font-medium mb-6 max-w-2xl mx-auto"
          >
            Submit your demo-ready prototype with all required documentation.
          </motion.p>
        </motion.div>

        {/* Visual Deliverables Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {deliverables.map((deliverable, index) => {
            const IconComponent = deliverable.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                className="relative group"
              >
                <div className="relative p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm hover:shadow-lg hover:border-pink-300 transition-all duration-300 h-full flex flex-col items-center text-center">
                  {/* Number Badge */}
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white flex items-center justify-center shadow-lg">
                    <span className="text-caption-sm font-black">{index + 1}</span>
                  </div>

                  {/* Large Icon */}
                  <div className={`w-14 h-14 ${deliverable.iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <IconComponent className={`w-7 h-7 ${deliverable.iconColor}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-body-md font-black text-slate-900 mb-2">
                    {deliverable.title.split('(')[0].trim()}
                  </h3>

                  {/* Description */}
                  <p className="text-label-sm text-slate-600 font-medium mb-3 flex-grow">
                    {deliverable.description}
                  </p>

                  {/* Visual Indicator Dots */}
                  <div className="mt-auto flex items-center gap-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${deliverable.dotColor}`}></div>
                    <div className={`w-1.5 h-1.5 rounded-full ${deliverable.dotColor} opacity-60`}></div>
                    <div className={`w-1.5 h-1.5 rounded-full ${deliverable.dotColor} opacity-40`}></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Professional Notes Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 border-2 border-pink-200 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full -mr-12 -mt-12"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center">
                  <ExclamationCircleIcon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-body-md font-black text-slate-900">Important</h4>
              </div>
              <p className="text-body-md text-slate-700 font-medium">
                All deliverables must be included in a single public GitHub repository and submitted through the official submission portal.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-sm relative overflow-hidden group hover:border-emerald-300 transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full -mr-12 -mt-12"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                  <CheckCircleIcon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-body-md font-black text-slate-900">Note</h4>
              </div>
              <p className="text-body-md text-slate-700 font-medium">
                No-code and partial implementations are allowed. Teams will be evaluated based on idea clarity, execution, and impact, not code complexity.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default DeliverablesSection;

