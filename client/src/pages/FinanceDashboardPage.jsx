import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import MetricCard from '../components/finance/MetricCard';
import TransactionTable from '../components/finance/TransactionTable';
import AccountOverview from '../components/finance/AccountOverview';
import FinancialChart from '../components/finance/FinancialChart';
import { financialMetrics, recentTransactions, accountInfo, chartData } from '../data/mockFinanceData';

const FinanceDashboardPage = () => {
  // Map icons to metrics
  const metricsWithIcons = [
    { ...financialMetrics[0], icon: Wallet },
    { ...financialMetrics[1], icon: TrendingUp },
    { ...financialMetrics[2], icon: TrendingDown },
    { ...financialMetrics[3], icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Finance Dashboard
          </h1>
          <p className="text-slate-400">Manage your finances with trust and transparency</p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metricsWithIcons.map((metric, index) => (
            <MetricCard
              key={metric.id}
              label={metric.label}
              value={metric.value}
              change={metric.change}
              trend={metric.trend}
              icon={metric.icon}
              index={index}
            />
          ))}
        </div>

        {/* Account Overview and Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <AccountOverview accountInfo={accountInfo} />
          <FinancialChart data={chartData} />
        </div>

        {/* Transactions Table */}
        <TransactionTable transactions={recentTransactions} />
      </div>
    </div>
  );
};

export default FinanceDashboardPage;
