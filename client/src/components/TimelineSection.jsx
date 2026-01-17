import React from 'react';
import { Flag, CheckCircle, Users, TrendingUp, Clock, Flame, Trophy, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const timelineEvents = [
  {
    time: "10:00 - 10:30 AM",
    date: "28 Feb 2026",
    title: "Hackathon Opening",
    icon: Flag,
    color: "bg-pink-500",
    lightColor: "bg-pink-100",
    textColor: "text-pink-600"
  },
  {
    time: "10:30 AM",
    date: "28 Feb 2026",
    title: "Problem Statement Release",
    icon: CheckCircle,
    color: "bg-blue-500",
    lightColor: "bg-blue-100",
    textColor: "text-blue-600"
  },
  {
    time: "12:00 - 1:00 PM",
    date: "28 Feb 2026",
    title: "Mentor Check-In 1",
    icon: Users,
    color: "bg-purple-600",
    lightColor: "bg-purple-100",
    textColor: "text-purple-700"
  },
  {
    time: "6:00 - 7:00 PM",
    date: "28 Feb 2026",
    title: "Mentor Check-In 2",
    icon: TrendingUp,
    color: "bg-orange-500",
    lightColor: "bg-orange-100",
    textColor: "text-orange-600"
  },
  {
    time: "11:59 PM",
    date: "28 Feb 2026",
    title: "Midnight Check-In",
    icon: Clock,
    color: "bg-yellow-500",
    lightColor: "bg-yellow-100",
    textColor: "text-yellow-600"
  },
  {
    time: "7:00 - 8:00 AM",
    date: "1 Mar 2026",
    title: "Mentor Check-In 3",
    icon: Flame,
    color: "bg-red-600",
    lightColor: "bg-red-100",
    textColor: "text-red-700"
  },
  {
    time: "10:00 AM",
    date: "1 Mar 2026",
    title: "Hackathon Ends",
    icon: Trophy,
    color: "bg-yellow-200", // Adjusted for contrast based on image cream color
    lightColor: "bg-yellow-50",
    textColor: "text-yellow-700"
  },
  {
    time: "12:00 PM",
    date: "8 Mar 2026",
    title: "Result Announced",
    icon: Award,
    color: "bg-indigo-900",
    lightColor: "bg-indigo-100",
    textColor: "text-indigo-900"
  }
];

const TimelineSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-700 tracking-tight">
            24 HOUR TIMELINE
          </h2>
          <div className="w-24 h-1.5 bg-blue-700 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[60px] left-0 w-full h-0.5 border-t-2 border-dashed border-gray-300 z-0 transform -translate-y-1/2"></div>

          {/* Connecting Line (Mobile/Tablet) */}
          <div className="lg:hidden absolute left-1/2 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-gray-300 transform -translate-x-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-8 lg:gap-4 relative z-10">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center lg:items-center text-center relative group"
              >
                {/* Icon Circle */}
                <div
                  className={`w-28 h-28 ${event.color} rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110 mb-6 border-4 border-white ring-4 ring-opacity-20 ring-gray-200`}
                >
                  {/* Inner White Circle */}
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                    <event.icon className={`w-10 h-10 ${event.textColor}`} strokeWidth={2.5} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col items-center space-y-1">
                  <div className="inline-block px-3 py-1 bg-gray-50 rounded-full border border-gray-100 shadow-sm mb-2">
                    <span className="text-sm font-bold text-gray-900 block">{event.time}</span>
                  </div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{event.date}</span>
                  <p className="text-lg font-bold text-gray-800 leading-tight mt-2 min-h-[3rem] flex items-center justify-center">
                    {event.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
