/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarIcon, 
  MapPinIcon, 
  TrophyIcon, 
  UserGroupIcon
} from '@heroicons/react/24/outline';

const PartnersSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const partners = [
    { category: "Organized By", name: "CloudBlitz", logo: "/cloudblitz_logo.png", desc: "EdTech & Cloud & AI Training" },
    { category: "Powered By", name: "Greamio Technologies", logo: "/greamio.png", altLogos: ["/Greamio_logo.png", "/Greamio_logo.jpg", "/Greamio_logo.svg"], desc: "Technology Partner" },
    { category: "Learning Partner", name: "IIT-BHU", logo: "/iit_logo.png", desc: "Indian Institute of Technology (Varanasi)" }
  ];

  const eventDetails = [
    { icon: CalendarIcon, label: "Timeline", value: "31 Jan - 1 Feb", bgColor: "bg-pink-50", iconColor: "text-pink-500" },
    { icon: MapPinIcon, label: "Platform", value: "Online (24H)", bgColor: "bg-orange-50", iconColor: "text-orange-500" },
    { icon: UserGroupIcon, label: "Squad", value: "1-4 Members", bgColor: "bg-white", iconColor: "text-pink-500" },
  ];

  return (
    <section className="relative py-8 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
      {/* Static Graph Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(236, 72, 153, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(236, 72, 153, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="text-[12px] font-bold text-pink-500 uppercase tracking-widest mb-2 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Collaborators & Details
          </motion.span>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-gray-900 mb-1">
            The Hub of <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">Innovation</span>
          </h2>
        </motion.div>

        {/* Partners Grid - Matching reference design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {partners.map((partner, i) => (
            <motion.div
              key={i}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-white rounded-lg border border-gray-200 p-3 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Category Label */}
              <p className="text-[8px] font-bold text-gray-600 uppercase tracking-wider mb-3">
                {partner.category}
              </p>

              {/* Logo Container */}
              <div className="h-14 flex items-center justify-center mb-2">
                <motion.img 
                  src={partner.logo} 
                  alt={partner.name}
                  animate={{ scale: hoveredCard === i ? 1.05 : 1 }}
                  className="max-h-full w-auto object-contain"
                  style={{ height: '50px', width: 'auto', maxWidth: '120px' }}
                  onError={(e) => {
                    const target = e.target;
                    if (partner.altLogos && partner.altLogos.length > 0) {
                      const currentSrc = target.src.split('/').pop();
                      const currentIndex = partner.altLogos.findIndex(alt => alt.includes(currentSrc));
                      if (currentIndex < partner.altLogos.length - 1) {
                        target.src = partner.altLogos[currentIndex + 1];
                        return;
                      }
                    }
                    target.style.display = 'none';
                    if (target.nextSibling) {
                      target.nextSibling.style.display = 'block';
                    }
                  }}
                />
                <div className="hidden text-sm font-bold text-gray-700">{partner.name}</div>
              </div>
              
              {/* Name and Description */}
              <h3 className="text-sm font-bold text-gray-900 mb-1">{partner.name}</h3>
              <p className="text-[10px] text-gray-600 leading-tight">{partner.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Prize Pool & Event Details Section - Matching reference layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-4">
          
          {/* Prize Pool Card - Dark Card on Left */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -2 }}
            className="lg:col-span-7 bg-gray-900 rounded-xl p-5 text-white relative overflow-hidden"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 border border-white/10 mb-4">
              <span className="text-[9px] font-bold uppercase tracking-wider">TOTAL PRIZE POOL</span>
            </div>

            {/* Prize Amount */}
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-2">
              ₹2,20,000<span className="text-pink-400">+</span>
            </h3>

            {/* Description */}
            <p className="text-gray-400 text-xs mb-4 max-w-md leading-relaxed">
              Rewarding the most disruptive solutions with cash, cloud credits, and exclusive perks.
            </p>

            {/* Button */}
            <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-bold text-[10px] hover:bg-gray-100 transition-colors">
              Prize Details
            </button>

            {/* Background decorative element */}
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl" />
          </motion.div>

          {/* Event Details Card - Light Card on Right */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
          >
            <div className="grid grid-cols-2 gap-2.5 h-full">
              {/* Timeline Card */}
              <motion.div 
                whileHover={{ y: -1 }}
                className="col-span-1 p-3 rounded-lg bg-pink-50 flex flex-col justify-between"
              >
                <CalendarIcon className="w-5 h-5 text-pink-500 mb-2" />
                <div>
                  <p className="text-[8px] font-bold text-gray-600 uppercase tracking-wider mb-1">Timeline</p>
                  <p className="text-sm font-bold text-gray-900">31 Jan - 1 Feb</p>
                </div>
              </motion.div>

              {/* Platform Card */}
              <motion.div 
                whileHover={{ y: -1 }}
                className="col-span-1 p-3 rounded-lg bg-orange-50 flex flex-col justify-between"
              >
                <MapPinIcon className="w-5 h-5 text-orange-500 mb-2" />
                <div>
                  <p className="text-[8px] font-bold text-gray-600 uppercase tracking-wider mb-1">Platform</p>
                  <p className="text-sm font-bold text-gray-900">Online (24H)</p>
                </div>
              </motion.div>

              {/* Squad Card - Full Width */}
              <motion.div 
                whileHover={{ y: -1 }}
                className="col-span-2 p-3 rounded-lg bg-white border border-gray-100 flex flex-row items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center">
                    <UserGroupIcon className="w-4 h-4 text-pink-500" />
                  </div>
                  <div>
                    <p className="text-[8px] font-bold text-gray-600 uppercase tracking-wider mb-0.5">Squad</p>
                    <p className="text-sm font-bold text-gray-900">1-4 Members</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* Call to Action Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-lg shadow-pink-500/20"
        >
          <p className="text-white text-sm md:text-base font-bold">Ready to build the future?</p>
          <button className="bg-white text-pink-500 px-5 py-2 rounded-lg font-black text-[10px] uppercase tracking-wider hover:bg-gray-100 hover:text-orange-500 transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap">
            REGISTER FOR HACKATHON
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;