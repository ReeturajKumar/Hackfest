import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import Register from './pages/RegisterPage';
import ScrollToTop from './components/ScrollToTop';
import DashboardPage from './pages/DashboardPage';
import FinanceDashboardPage from './pages/FinanceDashboardPage';
import PaymentSuccess from './pages/PaymentSuccess';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/finance/dashboard" element={<FinanceDashboardPage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        {/* Redirect any other path to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;