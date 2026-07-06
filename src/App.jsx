
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import { Toaster } from './components/ui/toaster';
import { Analytics } from "@vercel/analytics/react";

// Page Imports
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import SolutionsPage from './pages/SolutionsPage';
import InvestorAccessPage from './pages/InvestorAccessPage';
import SecurityPage from './pages/SecurityPage';
import PricingPage from './pages/PricingPage';
import ResourcesPage from './pages/ResourcesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ConditionsPage from './pages/ConditionsPage';
import NosServicesPage from './pages/NosServicesPage';

function App() {
  return (
    <MotionConfig reducedMotion="user">
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen font-sans text-gray-900 antialiased">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/investor-access" element={<InvestorAccessPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/conditions" element={<ConditionsPage />} />
            <Route path="/nos-services" element={<NosServicesPage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
    </MotionConfig>
  );
}

export default App;
