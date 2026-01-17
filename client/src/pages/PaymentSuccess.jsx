import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const txnid = searchParams.get('txnid');

  useEffect(() => {
    // BACKUP SYNC: If the user lands here, we know they were redirected from a success URL.
    // We send a request to mark it as Paid just in case the backend webhook is delayed.
    const syncPayment = async () => {
      if (txnid) {
        try {
          // Use the internal update endpoint as a backup
          await fetch(`${import.meta.env.VITE_API_URL}/registrations/${txnid}/payment`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentStatus: 'completed' })
          });
          console.log('Backup sync successful for:', txnid);
        } catch (err) {
          console.error('Backup sync failed:', err);
        }
      }
    };

    syncPayment();
  }, [txnid]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircleIcon className="w-12 h-12 text-green-600" />
        </div>

        <h1 className="text-display-sm font-black text-black mb-2">Payment Successful!</h1>
        <p className="text-gray-500 font-medium mb-6">
          Your registration for CloudBlitz AI HackFest 2026 is now confirmed.
        </p>

        {txnid && (
          <div className="bg-gray-50 rounded-xl p-4 mb-8">
            <p className="text-caption-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Registration ID</p>
            <p className="text-lg font-black font-mono text-pink-600">{txnid}</p>
          </div>
        )}

        <button
          onClick={() => navigate('/')}
          className="w-full py-4 bg-gradient-to-r from-[#FF2D95] to-[#7030A0] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer shadow-lg shadow-pink-500/20"
        >
          Back to Home
          <ArrowRightIcon className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
