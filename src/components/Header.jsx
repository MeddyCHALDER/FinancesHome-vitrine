
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Marché', path: '/#marche' },
    { name: 'Acteurs', path: '/#acteurs' },
    { name: 'Processus', path: '/#processus' },
    { name: 'Paiements', path: '/#paiements' },
    { name: 'Marketplace', path: '/#marketplace' },
    { name: 'Offres', path: '/#offres' },
    { name: 'Contact', path: '/#contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img
              src="/logo.png"
              alt="FinancesHome"
              className="h-14 md:h-16 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              item.path.startsWith('/#') ? (
                <a
                  key={item.path}
                  href={item.path}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-[#5E17EB] hover:bg-purple-50 transition-all duration-200"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === item.path ? 'text-[#5E17EB] bg-purple-50' : 'text-gray-700 hover:text-[#5E17EB] hover:bg-purple-50'
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center space-x-4">
            <a href="https://app.financeshome.com/login" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#5E17EB] hover:bg-purple-50 rounded-lg transition-colors">
              Se connecter
            </a>
            <Button className="bg-[#5E17EB] hover:bg-[#4d12c4] text-white shadow-lg shadow-purple-500/30" asChild>
              <a href="https://app.financeshome.com/register" target="_blank" rel="noopener noreferrer">S'inscrire</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-purple-50 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  item.path.startsWith('/#') ? (
                    <a key={item.path} href={item.path} className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:text-[#5E17EB] hover:bg-purple-50">
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`block px-4 py-3 rounded-lg text-sm font-medium ${
                        location.pathname === item.path ? 'text-[#5E17EB] bg-purple-50' : 'text-gray-700 hover:text-[#5E17EB] hover:bg-purple-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )
                ))}
                <div className="pt-4 space-y-3 border-t border-gray-200">
                  <a href="https://app.financeshome.com/login" target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" className="w-full border-[#5E17EB] text-[#5E17EB] hover:bg-purple-50">Se connecter</Button>
                  </a>
                  <a href="https://app.financeshome.com/register" target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full bg-[#5E17EB] hover:bg-[#4d12c4] text-white">S'inscrire</Button>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
