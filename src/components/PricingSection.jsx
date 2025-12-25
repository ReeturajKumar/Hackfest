/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon,
  UserIcon,
  UserGroupIcon,
  GiftIcon,
  AcademicCapIcon,
  RocketLaunchIcon,
  StarIcon
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

const PricingSection = () => {
  const plans = [
    {
      name: "Individual",
      price: "₹499",
      originalPrice: null,
      icon: UserIcon,
      color: "orange",
      gradient: "from-orange-500 to-amber-500",
      bgGradient: "from-orange-50 to-amber-50",
      features: [
        "24-Hour Hackathon Access",
        "All Problem Statements Access",
        "Beginner & Advanced Tracks",
        "Live Mentor Support",
        "IIT-BHU Co-branded Certificate",
        "₹19,999 Free AI Starter Kit",
        "Portfolio Project Guarantee"
      ],
      popular: false
    },
    {
      name: "Team",
      price: "₹999",
      originalPrice: null,
      icon: UserGroupIcon,
      color: "pink",
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50",
      features: [
        "Everything in Individual Plan",
        "Team of 2-4 Members",
        "Team Collaboration Tools",
        "Priority Support"
      ],
      popular: true,
      savings: "Save ₹997"
    }
  ];

  const benefits = [
    {
      icon: GiftIcon,
      title: "Free ₹19,999 AI Kit",
      description: "CloudBlitz Starter AI Kit with Python & AI fundamentals"
    },
    {
      icon: AcademicCapIcon,
      title: "IIT-BHU Certificate",
      description: "Official co-branded participation certificate"
    },
    {
      icon: RocketLaunchIcon,
      title: "Portfolio Project",
      description: "Guaranteed resume-ready project for every participant"
    },
    {
      icon: StarIcon,
      title: "Career Opportunities",
      description: "Internships for Top 10, Media coverage for Top 20"
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
            Pricing & Registration
          </motion.span>
          
          <motion.h1 
            variants={itemVariants}
            className="text-2xl sm:text-3xl lg:text-5xl font-black tracking-tighter text-slate-900 mb-2 leading-tight"
          >
            Invest in Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-orange-500">Future</span>, Reap Unlimited Rewards
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-base md:text-lg text-slate-600 font-medium mb-3 max-w-2xl mx-auto"
          >
            Start with just ₹499 and unlock ₹19,999 worth of premium resources, IIT certification, and career-transforming opportunities
          </motion.p>

          <motion.p 
            variants={itemVariants}
            className="text-sm text-slate-500 max-w-2xl mx-auto"
          >
            Registration Period: <span className="font-bold text-slate-700">January 1 to January 20, 2026</span>
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-5xl mx-auto"
        >
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.01 }}
                className={`relative p-6 rounded-2xl border-2 shadow-sm hover:shadow-lg transition-all duration-300 ${
                  plan.popular 
                    ? 'border-pink-300 bg-gradient-to-br from-pink-50 to-rose-50' 
                    : 'border-slate-200 bg-white hover:border-orange-300'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black text-[10px] uppercase tracking-widest shadow-lg">
                    Most Popular
                  </div>
                )}

                {/* Savings Badge */}
                {plan.savings && (
                  <div className="absolute top-5 right-5 px-2.5 py-0.5 rounded-full bg-green-500 text-white text-[10px] font-black">
                    {plan.savings}
                  </div>
                )}

                {/* Icon */}
                <div className={`w-12 h-12 ${
                  plan.color === 'pink' ? 'bg-pink-100' : 'bg-orange-100'
                } rounded-xl flex items-center justify-center mb-4`}>
                  <IconComponent className={`w-6 h-6 ${
                    plan.color === 'pink' ? 'text-pink-600' : 'text-orange-600'
                  }`} />
                </div>

                {/* Plan Name */}
                <h3 className="text-2xl font-black text-slate-900 mb-3">
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="mb-5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-slate-900">
                      {plan.price}
                    </span>
                    {plan.originalPrice && (
                      <span className="text-lg text-slate-400 line-through">
                        {plan.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {plan.name === "Individual" ? "Per person" : "Per team (2-4 members)"}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircleIcon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                        plan.color === 'pink' ? 'text-pink-500' : 'text-orange-500'
                      }`} />
                      <span className="text-xs text-slate-700 leading-relaxed font-medium">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-lg hover:shadow-pink-500/50 hover:scale-105'
                    : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:shadow-lg hover:shadow-orange-500/50 hover:scale-105'
                }`}>
                  Register Now
                </button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
              What You Get
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl mx-auto">
              Incredible value included with every registration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -3 }}
                  className="p-5 rounded-xl bg-white border-2 border-slate-200 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-100 to-orange-100 flex items-center justify-center mb-3">
                    <IconComponent className="w-5 h-5 text-pink-600" />
                  </div>
                  <h3 className="text-base font-black text-slate-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Eligibility & Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          {/* Eligibility Card */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200">
            <h3 className="text-xl font-black text-slate-900 mb-3">
              Eligibility
            </h3>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <CheckCircleIcon className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700">BE / BTech / BCA / BCS / BSc (CS) / MCA students</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircleIcon className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700">No percentage requirement</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircleIcon className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700">No gap restriction</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircleIcon className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700">Beginners & non-coders welcome</span>
              </li>
            </ul>
          </div>

          {/* Additional Benefits Card */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200">
            <h3 className="text-xl font-black text-slate-900 mb-3">
              Additional Benefits
            </h3>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <CheckCircleIcon className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700">Physical participation gift box delivered</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircleIcon className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700">Side prizes (₹500 - ₹2,500) for various categories</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircleIcon className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700">Guest lectures by IIT experts</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircleIcon className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700">Job search guidance using AI</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 text-center"
        >
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 via-purple-600/20 to-orange-600/20" />
            <div className="relative z-10 text-white">
              <h3 className="text-2xl md:text-3xl font-black mb-3">
                Ready to Start Your Journey?
              </h3>
              <p className="text-sm md:text-base text-white/90 mb-6 max-w-2xl mx-auto">
                Join hundreds of students building the future with AI. Register now and get your ₹19,999 AI starter kit absolutely free!
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button className="px-6 py-3 bg-white text-pink-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 hover:scale-105 transition-all shadow-lg">
                  Register Individual
                </button>
                <button className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/30 hover:scale-105 transition-all">
                  Register Team
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
