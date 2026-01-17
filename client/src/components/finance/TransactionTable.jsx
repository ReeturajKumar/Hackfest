import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, ShoppingBag, TrendingUp, ArrowDownRight, ArrowUpRight } from 'lucide-react';

const TransactionTable = ({ transactions }) => {
  const getIcon = (category) => {
    const icons = {
      'Payment': CreditCard,
      'Purchase': ShoppingBag,
      'Investment': TrendingUp,
      'Transfer': ArrowDownRight,
    };
    return icons[category] || CreditCard;
  };

  const getStatusColor = (status) => {
    const colors = {
      'completed': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
      'pending': 'text-amber-400 bg-amber-400/10 border-amber-400/20',
      'failed': 'text-red-400 bg-red-400/10 border-red-400/20',
    };
    return colors[status] || colors.completed;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="backdrop-blur-xl bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-100">Recent Transactions</h2>
        <button className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Description</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Amount</th>
              <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => {
              const Icon = getIcon(transaction.category);
              const isCredit = transaction.type === 'credit';
              
              return (
                <motion.tr
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                  className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors"
                >
                  <td className="py-4 px-4">
                    <span className="text-sm text-slate-300">{transaction.date}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-700/40">
                        <Icon className="w-4 h-4 text-blue-400" />
                      </div>
                      <span className="text-sm font-medium text-slate-200">{transaction.description}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-slate-400">{transaction.category}</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {isCredit ? (
                        <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-400" />
                      )}
                      <span className={`text-sm font-bold ${isCredit ? 'text-emerald-400' : 'text-red-400'}`}>
                        {isCredit ? '+' : '-'}${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex justify-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(transaction.status)}`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default TransactionTable;
