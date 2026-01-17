import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const FinancialChart = ({ data }) => {
  // Simple bar chart visualization
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="backdrop-blur-xl bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-100">Financial Trends</h2>
        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-semibold text-emerald-400">+12.5% This Month</span>
        </div>
      </div>
      
      <div className="relative h-64">
        <div className="flex items-end justify-between h-full gap-2">
          {data.map((item, index) => {
            const height = (item.value / maxValue) * 100;
            
            return (
              <motion.div
                key={item.month}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.1, ease: 'easeOut' }}
                className="flex-1 relative group cursor-pointer"
              >
                <div className="w-full bg-gradient-to-t from-blue-500 to-emerald-400 rounded-t-lg hover:from-blue-400 hover:to-emerald-300 transition-all duration-300 relative">
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 shadow-xl whitespace-nowrap">
                      <p className="text-xs text-slate-400">{item.month}</p>
                      <p className="text-sm font-bold text-slate-100">
                        ${item.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Month Label */}
                <p className="text-xs text-slate-400 text-center mt-2 font-medium">
                  {item.month}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default FinancialChart;
