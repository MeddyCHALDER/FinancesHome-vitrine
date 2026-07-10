import React from 'react';
import { Link } from 'react-router-dom';

const REGISTER = 'https://app.financeshome.com/register';

export function BlogHeader() {
  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-white/10">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-playfair italic" aria-label="Retour à l'accueil">
          <span className="text-white">Finances</span>
          <span style={{ color: '#5e17eb' }}>Home</span>
        </Link>
        <div className="flex items-center gap-5">
          <Link to="/blog" className="hidden sm:inline text-sm text-white/70 hover:text-white transition-colors">
            Ressources
          </Link>
          <a
            href={REGISTER}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#5e17eb] hover:bg-[#4d12c4] text-white text-sm font-medium px-5 py-2 rounded-full transition-colors"
          >
            Créer un compte
          </a>
        </div>
      </div>
    </header>
  );
}

export function BlogFooter() {
  return (
    <footer className="border-t border-white/10 py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/50">
        <Link to="/" className="font-playfair italic text-lg">
          <span className="text-white">Finances</span>
          <span style={{ color: '#5e17eb' }}>Home</span>
        </Link>
        <span className="text-xs text-white/40">© 2026 FinancesHome — Financez votre transition énergétique</span>
      </div>
    </footer>
  );
}
