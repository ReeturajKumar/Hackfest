/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
        "Official Certificate (Co-branded with IIT-BHU)",
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
      title: "Official Certificate (Co-branded with IIT-BHU)",
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
            className="text-overline text-pink-500 mb-3 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Pricing & Registration
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="text-display-md text-slate-900 mb-2"
          >
            Invest in Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D95] to-[#7030A0]">Future</span>, Get Unlimited<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D95] to-[#7030A0]"> Rewards</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-body-xl text-slate-600 font-medium mb-3 max-w-2xl mx-auto"
          >
            Start with just ₹499 and unlock ₹19,999 worth of premium resources, Official Certificate (Co-branded with IIT-BHU), and career-transforming opportunities
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-body-md text-slate-500 max-w-2xl mx-auto"
          >
            Registration Period: <span className="font-bold text-slate-700">20 Jan - 26 Feb</span>
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
                className={`relative p-6 rounded-2xl border-2 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full ${plan.popular
                  ? 'border-pink-300 bg-white'
                  : 'border-slate-200 bg-white hover:border-pink-300'
                  }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FF2D95] to-[#7030A0] text-white font-black text-caption-sm uppercase tracking-widest shadow-lg">
                    Most Popular
                  </div>
                )}

                {/* Savings Badge */}
                {plan.savings && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-green-500 text-white text-caption-sm font-black shadow-md">
                    {plan.savings}
                  </div>
                )}

                {/* Icon */}
                <div className={`w-14 h-14 ${plan.color === 'pink' ? 'bg-pink-100' : 'bg-orange-100'
                  } rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-7 h-7 ${plan.color === 'pink' ? 'text-pink-600' : 'text-orange-600'
                    }`} />
                </div>

                {/* Plan Name */}
                <h3 className="text-heading-lg font-black text-slate-900 mb-3">
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-heading-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D95] to-[#7030A0]">
                      {plan.price}
                    </span>
                    {plan.originalPrice && (
                      <span className="text-heading-xs text-slate-400 line-through">
                        {plan.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-label-sm text-slate-500 mt-1.5">
                    {plan.name === "Individual" ? "Per person" : "Per team (2-4 members)"}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5 text-pink-500" />
                      <span className="text-body-md text-slate-700">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  to="/register"
                  className="w-full py-3.5 rounded-xl font-black text-label-sm uppercase tracking-widest transition-all duration-300 bg-gradient-to-r from-[#FF2D95] to-[#7030A0] text-white hover:shadow-lg hover:shadow-pink-500/50 hover:scale-105 active:scale-95 mt-auto flex items-center justify-center cursor-pointer"
                >
                  Register Now
                </Link>
              </motion.div>
            );
          })}
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
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -2 }}
            className="p-6 rounded-xl bg-white border-2 border-slate-200 shadow-sm hover:shadow-lg hover:border-pink-300 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <CheckCircleIcon className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-heading-sm font-black text-slate-900 mb-4">
              Eligibility
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                <span className="text-body-md text-slate-700">BE / BTech / BCA / BCS / BSc (CS) / MCA students</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                <span className="text-body-md text-slate-700">No percentage requirement</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                <span className="text-body-md text-slate-700">No gap restriction</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                <span className="text-body-md text-slate-700">Beginners & non-coders welcome</span>
              </li>
            </ul>
          </motion.div>

          {/* Additional Benefits Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -2 }}
            className="p-6 rounded-xl bg-white border-2 border-slate-200 shadow-sm hover:shadow-lg hover:border-pink-300 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <GiftIcon className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-heading-sm font-black text-slate-900 mb-4">
              Additional Benefits
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                <span className="text-body-md text-slate-700">Physical participation gift box delivered</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                <span className="text-body-md text-slate-700">Side prizes (₹500 - ₹2,500) for various categories</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                <span className="text-body-md text-slate-700">Guest lectures by IIT experts</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                <span className="text-body-md text-slate-700">Job search guidance using AI</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 text-center"
        >
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-[#FF2D95] to-[#7030A0] overflow-hidden relative">
            <div className="relative z-10 text-white">
              <h3 className="text-heading-lg font-black mb-3">
                Ready to Start Your Journey?
              </h3>
              <p className="text-body-md text-white/90 mb-6 max-w-2xl mx-auto">
                Join hundreds of students building the future with AI. Register now and get your ₹19,999 AI starter kit absolutely free!
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/register"
                  className="px-6 py-3 bg-white text-pink-600 rounded-xl font-black text-label-sm uppercase tracking-widest hover:bg-gray-100 hover:scale-105 transition-all shadow-lg inline-block"
                >
                  Register Individual
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-black text-label-sm uppercase tracking-widest hover:bg-white/30 hover:scale-105 transition-all inline-block"
                >
                  Register Team
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
