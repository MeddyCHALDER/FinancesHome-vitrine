
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    product: [
      { name: 'CEE Project Management', path: '/product' },
      { name: 'Compliance & Audit Trail', path: '/product' },
      { name: 'Pricing Engine', path: '/product' },
      { name: 'Investor Funding Module', path: '/product' }
    ],
    solutions: [
      { name: 'Pour Producteurs', path: '/solutions' },
      { name: 'Pour Agrégateurs', path: '/solutions' },
      { name: 'Pour Investisseurs', path: '/solutions' },
      { name: 'Accès investisseur — Demander l\'accès', path: '/investor-access' },
      { name: 'Cas d\'usage', path: '/resources' }
    ],
    company: [
      { name: 'À propos', path: '/about' },
      { name: 'Équipe', path: '/about' },
      { name: 'Carrières', path: '/about' },
      { name: 'Contact', path: '/contact' }
    ],
    legal: [
      { name: 'Security', path: '/security' },
      { name: 'Privacy', path: '/security' },
      { name: 'Terms', path: '/security' },
      { name: 'Contact', path: '/contact' }
    ]
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6 group">
              <div className="w-10 h-10 bg-gradient-to-br from-[#5E17EB] to-[#7c3aed] rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-xl font-bold">FinancesHome</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Plateforme d'orchestration administrative et financière des CEE. 14 pays membres.
            </p>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>17 King Edwards Road<br />London HA4 7AE, United Kingdom</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:contact@financeshome.com" className="hover:text-white transition-colors">contact@financeshome.com</a>
              </div>
              <div className="text-xs text-gray-500">
                <a href="https://app.financeshome.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">app.financeshome.com</a>
              </div>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mt-4 max-w-xs">
              FinancesHome est une plateforme d'orchestration administrative. Elle n'exerce pas d'activité de prestation de services d'investissement (MiFID II), ni d'activité de crédit. Les scénarios de financement accélérés sont réservés aux partenaires contractuels qualifiés.
            </p>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Solutions</h3>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} FinancesHome Ltd — Registered in England & Wales
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link to="/security" className="hover:text-white transition-colors">
                Confidentialité
              </Link>
              <Link to="/security" className="hover:text-white transition-colors">
                Conditions
              </Link>
              <Link to="/security" className="hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
