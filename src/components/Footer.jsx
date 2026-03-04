import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const links = {
    navigation: [
      { name: 'Processus', href: '/#processus' },
      { name: 'Marché', href: '/#marche' },
      { name: 'Acteurs', href: '/#acteurs' },
      { name: 'Marketplace', href: '/#marketplace' },
      { name: 'Contact', href: '/contact' },
    ],
    legal: [
      { name: 'Confidentialité', href: '/security' },
      { name: 'Conditions', href: '/conditions' },
      { name: 'Sécurité', href: '/security' },
    ],
    contact: [
      { name: 'contact@financeshome.com', href: 'mailto:contact@financeshome.com' },
    ],
  };

  const socials = [
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
  ];

  return (
    <footer style={{ backgroundColor: 'var(--white)', borderTop: '1px solid var(--border-gray)' }}>
      <div className="padding-global" style={{ maxWidth: '105rem', margin: '0 auto' }}>
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
            gap: '3rem',
            padding: '4rem 0',
            borderBottom: '1px solid var(--border-gray)',
          }}
        >
          {/* Brand */}
          <div>
            <Link to="/">
              <img
                src="/logo.png"
                alt="FinancesHome"
                style={{ height: '2.5rem', width: 'auto', objectFit: 'contain', marginBottom: '1.25rem', display: 'block' }}
              />
            </Link>
            <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '22rem', marginBottom: '1.5rem' }}>
              Plateforme d'orchestration administrative et financière des Certificats d'Économies d'Énergie — 14 pays membres.
            </p>
            <p style={{ fontSize: '0.75rem', color: '#a0a0a0', lineHeight: 1.6, maxWidth: '22rem' }}>
              FinancesHome est une plateforme d'orchestration administrative. Elle n'exerce pas d'activité de prestation de services d'investissement (MiFID II).
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1.25rem' }}>
              Navigation
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {links.navigation.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="footer-link">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1.25rem' }}>
              Contact
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {links.contact.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="footer-link"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                17 King Edwards Road<br />
                London HA4 7AE, UK
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1.25rem' }}>
              Légal
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {links.legal.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="footer-link">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.5rem 0',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p style={{ fontSize: '0.8125rem', color: 'var(--muted)' }}>
            © {new Date().getFullYear()} FinancesHome Ltd — Registered in England & Wales
          </p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="social-icon-btn"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .footer-link {
          font-size: 0.875rem;
          color: var(--black);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-link:hover { color: var(--violet); }
        .social-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.25rem;
          height: 2.25rem;
          border-radius: 100rem;
          border: 1px solid var(--border-gray);
          color: var(--black);
          transition: background 0.2s, border-color 0.2s;
        }
        .social-icon-btn:hover {
          background: var(--grey);
          border-color: #999;
        }
        @media (max-width: 991px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 599px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
