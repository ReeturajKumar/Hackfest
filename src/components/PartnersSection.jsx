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
            className="text-overline text-pink-500 mb-2 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Collaborators & Details
          </motion.span>
          <h2 className="text-display-md text-gray-900 mb-1">
            The Hub of <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">Innovation</span>
          </h2>
        </motion.div>

        {/* Partners Logos - Without Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 mb-6 items-start justify-items-center">
          {partners.map((partner, i) => (
            <motion.div
              key={i}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center justify-start gap-3 w-full"
            >
              {/* Category Label - Fixed Height */}
              <div className="h-4 flex items-center justify-center w-full">
                <p className="text-caption-sm font-bold text-gray-600 uppercase tracking-wider text-center">
                  {partner.category}
                </p>
              </div>

              {/* Logo Container - Fixed Height */}
              <div className="h-20 md:h-24 w-full flex items-center justify-center">
                <motion.img
                  src={partner.logo}
                  alt={partner.name}
                  animate={{ scale: hoveredCard === i ? 1.1 : 1 }}
                  className="h-full w-auto max-w-[200px] object-contain transition-all duration-300"
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
              </div>
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
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-gray-900 rounded-xl p-5 text-white relative overflow-hidden group"
          >

            {/* Registration Date */}
            <h3 className="text-display-md mb-3">
              Registration Date
            </h3>
            <p className="text-heading-lg text-pink-400 mb-4">
              1st Jan to 20th Jan
            </p>

            {/* Urgency Text */}
            <p className="text-white text-body-xl font-bold mb-4">
              Hurry up. <span className="text-pink-400">Limited Time.</span>
            </p>

            {/* Button */}
            <button className="w-full md:w-auto md:min-w-[250px] bg-white text-gray-900 px-10 py-2 md:px-12 md:py-2 rounded-lg font-bold text-label-lg hover:bg-gray-100 transition-colors">
              Register Now
            </button>

            {/* Background decorative element */}
            {/* Animated background elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-pink-500/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-full blur-3xl" />

            <TrophyIcon className="absolute -right-12 -bottom-12 w-56 h-56 text-white/5 group-hover:text-white/10 transition-all duration-1000 group-hover:rotate-12" />
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
                  <p className="text-caption-sm font-bold text-gray-600 uppercase tracking-wider mb-1">Timeline</p>
                  <p className="text-body-md font-bold text-gray-900">31 Jan - 1 Feb</p>
                </div>
              </motion.div>

              {/* Platform Card */}
              <motion.div
                whileHover={{ y: -1 }}
                className="col-span-1 p-3 rounded-lg bg-orange-50 flex flex-col justify-between"
              >
                <MapPinIcon className="w-5 h-5 text-orange-500 mb-2" />
                <div>
                  <p className="text-caption-sm font-bold text-gray-600 uppercase tracking-wider mb-1">Platform</p>
                  <p className="text-body-md font-bold text-gray-900">Online (24H)</p>
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
                    <p className="text-caption-sm font-bold text-gray-600 uppercase tracking-wider mb-0.5">Squad</p>
                    <p className="text-body-md font-bold text-gray-900">1-4 Members</p>
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
          <p className="text-white text-body-lg font-bold">Ready to build the future?</p>
          <button className="bg-white text-pink-500 px-5 py-2 rounded-lg font-black text-caption-sm uppercase tracking-wider hover:bg-gray-100 hover:text-orange-500 transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap">
            REGISTER FOR HACKATHON
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;