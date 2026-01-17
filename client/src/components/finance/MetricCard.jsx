import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const MetricCard = ({ label, value, change, trend, icon: Icon, index }) => {
  const isPositive = trend === 'up';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="relative backdrop-blur-xl bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
        {/* Icon */}
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <Icon className="w-6 h-6 text-blue-400" />
          </div>
          <div className={`flex items-center gap-1 text-sm font-semibold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{Math.abs(change)}%</span>
          </div>
        </div>
        
        {/* Label */}
        <p className="text-slate-400 text-sm font-medium mb-2">{label}</p>
        
        {/* Value */}
        <p className="text-3xl font-bold text-slate-100">
          ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        
        {/* Change Indicator */}
        <p className="text-xs text-slate-500 mt-2">vs last month</p>
      </div>
    </motion.div>
  );
};

export default MetricCard;
