import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Marché', href: '/#marche' },
    { name: 'Acteurs', href: '/#acteurs' },
    { name: 'Processus', href: '/#processus' },
    { name: 'Marketplace', href: '/#marketplace' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingTop: '1.5rem',
        transition: 'padding 0.3s',
      }}
    >
      <nav
        style={{
          maxWidth: '105rem',
          margin: '0 auto',
          background: 'rgba(242, 242, 242, 0.72)',
          backdropFilter: 'saturate(180%) blur(20px)',
          WebkitBackdropFilter: 'saturate(180%) blur(20px)',
          borderRadius: '100rem',
          padding: '0.5rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: isScrolled ? '0 2px 16px rgba(0,0,0,0.06)' : 'none',
          transition: 'box-shadow 0.3s',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img
            src="/logo.png"
            alt="FinancesHome"
            style={{ height: '2.75rem', width: 'auto', objectFit: 'contain' }}
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex" style={{ gap: '0.25rem', alignItems: 'center' }}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="navbar-link">
              {item.name}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex" style={{ alignItems: 'center', gap: '0.75rem' }}>
          <a
            href="https://app.financeshome.com/login"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-link"
          >
            Se connecter
          </a>
          <a
            href="https://app.financeshome.com/register"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Inscription
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '0.5rem',
            alignItems: 'center',
          }}
          aria-label="Menu"
        >
          {isMobileMenuOpen
            ? <X size={22} color="var(--black)" />
            : <Menu size={22} color="var(--black)" />
          }
        </button>
      </nav>

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div
          style={{
            maxWidth: '105rem',
            margin: '0.5rem auto 0',
            background: '#fff',
            borderRadius: '1.5rem',
            border: '1px solid #c5c5c5',
            padding: '1.25rem',
            boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                style={{
                  padding: '0.75rem 1rem',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: 'var(--black)',
                  borderRadius: '0.75rem',
                  transition: 'background 0.2s',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--grey)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {item.name}
              </a>
            ))}
          </div>
          <div
            style={{
              borderTop: '1px solid var(--border-gray)',
              marginTop: '1rem',
              paddingTop: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <a
              href="https://app.financeshome.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ justifyContent: 'center' }}
            >
              Se connecter
            </a>
            <a
              href="https://app.financeshome.com/register"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ justifyContent: 'center' }}
            >
              Inscription
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
