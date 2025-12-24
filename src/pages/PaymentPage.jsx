import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  CreditCardIcon, 
  CheckCircleIcon,
  ArrowLeftIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const plan = location.state?.plan || 'solo';
  
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    email: ''
  });
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const pricing = {
    solo: { amount: 499, label: 'Individual' },
    team: { amount: 999, label: 'Team (2-4 Members)' }
  };

  const currentPlan = pricing[plan] || pricing.solo;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#030712] pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-4xl font-black text-white uppercase mb-4">Payment Successful!</h2>
          <p className="text-gray-400 mb-8">You have successfully registered for CloudBlitz AI HackFest - 2026</p>
          <p className="text-pink-400 font-mono text-sm">Redirecting to dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
            Secure Payment
          </div>

          <h1 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tighter leading-none mb-8">
            Complete <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">Payment</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <LockClosedIcon className="w-6 h-6 text-pink-500" />
                  <h2 className="text-xl font-black text-white uppercase">Payment Details</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Card Number</label>
                    <div className="relative">
                      <CreditCardIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        name="cardNumber"
                        value={paymentData.cardNumber}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-[#0f111a] border border-white/10 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors"
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={paymentData.expiryDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors"
                        placeholder="MM/YY"
                        maxLength="5"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={paymentData.cvv}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors"
                        placeholder="123"
                        maxLength="3"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Cardholder Name</label>
                    <input
                      type="text"
                      name="name"
                      value={paymentData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={paymentData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {processing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Pay ₹{currentPlan.amount}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 sticky top-24">
                <h2 className="text-xl font-black text-white uppercase mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Plan</span>
                    <span className="text-white font-bold">{currentPlan.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Event</span>
                    <span className="text-white font-bold">CloudBlitz AI HackFest</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date</span>
                    <span className="text-white font-bold">31st Jan 2026</span>
                  </div>
                  <div className="border-t border-white/10 pt-4 flex justify-between">
                    <span className="text-white font-bold uppercase">Total</span>
                    <span className="text-pink-500 font-black text-2xl">₹{currentPlan.amount}</span>
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-green-400 mt-0.5" />
                    <div className="text-xs text-green-400">
                      <div className="font-bold mb-1">What's Included:</div>
                      <ul className="list-disc list-inside space-y-1 text-gray-300">
                        <li>24-Hour Access</li>
                        <li>Official Certificate</li>
                        <li>AI Kit (₹19,999)</li>
                        <li>Portfolio Templates</li>
                        <li>Mentor Support</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  Secure payment powered by industry-standard encryption
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentPage;

