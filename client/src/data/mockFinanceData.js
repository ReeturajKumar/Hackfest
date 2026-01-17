// Mock data for Finance Dashboard

export const financialMetrics = [
  {
    id: '1',
    label: 'Total Balance',
    value: 124567.89,
    change: 8.5,
    trend: 'up',
  },
  {
    id: '2',
    label: 'Monthly Revenue',
    value: 45230.50,
    change: 12.3,
    trend: 'up',
  },
  {
    id: '3',
    label: 'Monthly Expenses',
    value: 28940.25,
    change: 5.2,
    trend: 'down',
  },
  {
    id: '4',
    label: 'Net Profit',
    value: 16290.25,
    change: 15.7,
    trend: 'up',
  },
];

export const recentTransactions = [
  {
    id: '1',
    date: 'Jan 15, 2026',
    description: 'Client Payment - Invoice #1234',
    category: 'Payment',
    amount: 5420.00,
    type: 'credit',
    status: 'completed',
  },
  {
    id: '2',
    date: 'Jan 14, 2026',
    description: 'Office Supplies Purchase',
    category: 'Purchase',
    amount: 342.50,
    type: 'debit',
    status: 'completed',
  },
  {
    id: '3',
    date: 'Jan 14, 2026',
    description: 'Stock Market Investment',
    category: 'Investment',
    amount: 2500.00,
    type: 'debit',
    status: 'pending',
  },
  {
    id: '4',
    date: 'Jan 13, 2026',
    description: 'Wire Transfer to Vendor',
    category: 'Transfer',
    amount: 1850.00,
    type: 'debit',
    status: 'completed',
  },
  {
    id: '5',
    date: 'Jan 12, 2026',
    description: 'Consulting Services Payment',
    category: 'Payment',
    amount: 7200.00,
    type: 'credit',
    status: 'completed',
  },
  {
    id: '6',
    date: 'Jan 11, 2026',
    description: 'Software Subscription',
    category: 'Purchase',
    amount: 199.99,
    type: 'debit',
    status: 'completed',
  },
  {
    id: '7',
    date: 'Jan 10, 2026',
    description: 'Refund - Order #5678',
    category: 'Payment',
    amount: 450.00,
    type: 'credit',
    status: 'completed',
  },
];

export const accountInfo = {
  accountNumber: '**** **** **** 4892',
  accountHolder: 'John Anderson',
  accountType: 'Business Premium Account',
  isVerified: true,
  securityLevel: 'High Security',
};

export const chartData = [
  { month: 'Jul', value: 38500 },
  { month: 'Aug', value: 42300 },
  { month: 'Sep', value: 39800 },
  { month: 'Oct', value: 44200 },
  { month: 'Nov', value: 41500 },
  { month: 'Dec', value: 45230 },
];
