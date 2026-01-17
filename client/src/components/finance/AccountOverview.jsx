import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Verified } from 'lucide-react';

const AccountOverview = ({ accountInfo }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="backdrop-blur-xl bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300"
    >
      <h2 className="text-xl font-bold text-slate-100 mb-6">Account Overview</h2>
      
      <div className="space-y-4">
        {/* Account Holder */}
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Account Holder</p>
          <p className="text-lg font-semibold text-slate-100">{accountInfo.accountHolder}</p>
        </div>
        
        {/* Account Number */}
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Account Number</p>
          <p className="text-base font-mono text-slate-300">{accountInfo.accountNumber}</p>
        </div>
        
        {/* Account Type */}
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Account Type</p>
          <p className="text-base text-slate-300">{accountInfo.accountType}</p>
        </div>
        
        {/* Verification Badges */}
        <div className="pt-4 border-t border-slate-700/50">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Security Status</p>
          
          <div className="flex flex-wrap gap-3">
            {accountInfo.isVerified && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <Verified className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-400">Verified Account</span>
              </div>
            )}
            
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-semibold text-blue-400">{accountInfo.securityLevel}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AccountOverview;
