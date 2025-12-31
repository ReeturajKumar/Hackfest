/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronDownIcon
} from '@heroicons/react/24/solid';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
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

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Do I need coding experience to participate?",
      answer: "No. This hackathon is beginner-friendly, and no coding is required. Participants can use no-code tools, AI platforms, or simplified implementations."
    },
    {
      question: "Is this hackathon suitable for first-time participants?",
      answer: "Yes. CloudBlitz AI HackFest 2026 is specifically designed for first-time hackathon participants and students with limited technical backgrounds."
    },
    {
      question: "When will the final problem statements be shared?",
      answer: "Final problem statements will be released at the start of the hackathon to ensure fairness for all participants. Problem domains are shared in advance to help you prepare."
    },
    {
      question: "Can I participate individually or only in a team?",
      answer: "You can participate individually or as part of a team of 2–4 members."
    },
    {
      question: "What kind of solution is expected by the end of the hackathon?",
      answer: "You are expected to submit a working prototype or demonstrable solution. A full production-ready product is not required."
    },
    {
      question: "Are no-code or partial solutions accepted?",
      answer: "Yes. No-code, low-code, and partial implementations are fully accepted as long as the idea and execution are clearly demonstrated."
    },
    {
      question: "Is blockchain mandatory for all participants?",
      answer: "No. Blockchain is not mandatory. Participants can choose any problem domain that matches their interest."
    },
    {
      question: "How will the projects be evaluated?",
      answer: "Projects will be evaluated based on:",
      points: [
        "Problem understanding",
        "Solution clarity",
        "Practical impact",
        "Quality of execution"
      ],
      note: "Complexity or amount of code is not the primary evaluation factor."
    },
    {
      question: "Will all participants receive a certificate?",
      answer: "Yes. All registered participants who complete the hackathon will receive an IIT-branded participation certificate."
    },
    {
      question: "What learning resources will be provided?",
      answer: "Participants will receive:",
      points: [
        "A Zero-Code AI App Development Workshop (7 days before the hackathon)",
        "CloudBlitz Starter AI Kit (within 10–15 days after the hackathon)"
      ]
    },
    {
      question: "Are internships or job opportunities guaranteed?",
      answer: "Internship interview opportunities will be provided to Top 10 participants. Jobs are not guaranteed and depend on performance and selection processes."
    },
    {
      question: "What is the registration fee?",
      answer: "Individual: ₹499, Team (2–4 members): ₹999"
    },
    {
      question: "Is there any eligibility restriction based on marks or gaps?",
      answer: "No. There is no percentage or academic gap criteria for participation. But there is age restriction of 28 Years."
    },
    {
      question: "How and where do I submit my project?",
      answer: "All submissions will be made online through the official CloudBlitz HackFest submission portal. Submission details will be shared during the event."
    },
    {
      question: "What happens after the hackathon ends?",
      answer: "After the hackathon:",
      points: [
        "Projects will be evaluated",
        "Winners will be announced",
        "Certificates and gift boxes will be dispatched",
        "Learning resources will be shared",
        "Internship interviews will be scheduled for selected participants"
      ]
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
            Everything You Need to Know
          </motion.span>
          
          <motion.h1 
            variants={itemVariants} 
            className="text-2xl sm:text-3xl lg:text-5xl font-black tracking-tighter text-slate-900 mb-2 leading-tight"
          >
            Your Questions, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D95] to-[#7030A0]">Answered</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-base md:text-lg text-slate-600 font-medium mb-6 max-w-2xl mx-auto leading-relaxed"
          >
            Get clarity on participation, requirements, prizes, and everything.
          </motion.p>
        </motion.div>

        {/* FAQ Items Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden hover:border-pink-300 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-5 flex items-start justify-between text-left group flex-grow"
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-base font-black text-pink-600">{index + 1}</span>
                  </div>
                  <h3 className="text-sm font-black text-slate-900 leading-tight pr-2">
                    {faq.question}
                  </h3>
                </div>
                <ChevronDownIcon 
                  className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 mt-0.5 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 pl-[68px]">
                  {faq.answer && !faq.points && (
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  )}
                  {faq.answer && faq.points && (
                    <p className="text-xs text-slate-600 leading-relaxed mb-2">
                      {faq.answer}
                    </p>
                  )}
                  {faq.points && (
                    <ul className="space-y-1.5 mb-2">
                      {faq.points.map((point, idx) => (
                        <li key={idx} className="text-xs text-slate-600 leading-relaxed flex items-start gap-2">
                          <span className="text-pink-500 mt-1.5 flex-shrink-0">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {faq.note && (
                    <p className="text-xs text-slate-500 italic leading-relaxed mt-2">
                      {faq.note}
                    </p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default FAQSection;

