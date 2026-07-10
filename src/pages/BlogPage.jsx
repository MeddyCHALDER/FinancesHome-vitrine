import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ARTICLES } from '../data/articles';
import { BlogHeader, BlogFooter } from '../components/BlogChrome';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Helmet>
        <title>Ressources CEE & transition énergétique — Articles | FinancesHome</title>
        <meta
          name="description"
          content="Guides et articles sur les Certificats d'Économies d'Énergie (CEE), les aides à la rénovation et le financement de la transition énergétique."
        />
      </Helmet>

      <BlogHeader />

      <main className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        <p className="text-xs uppercase tracking-[0.25em] text-white/45">Ressources</p>
        <h1
          className="mt-5 font-playfair italic text-4xl sm:text-6xl leading-[0.95]"
          style={{ letterSpacing: '-0.03em' }}
        >
          CEE & transition énergétique
        </h1>
        <p className="mt-5 text-white/60 font-light leading-relaxed max-w-2xl">
          Guides pratiques, aides, primes et financement : tout comprendre pour réussir vos travaux
          d'économie d'énergie et valoriser vos Certificats d'Économies d'Énergie.
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {ARTICLES.map((a) => (
            <Link
              key={a.slug}
              to={`/blog/${a.slug}`}
              className="group block rounded-3xl border border-white/10 bg-white/[0.03] p-7 hover:bg-white/[0.06] transition-colors"
            >
              <span className="text-[0.7rem] uppercase tracking-wider" style={{ color: '#8b5cf6' }}>
                {a.category}
              </span>
              <h2 className="mt-3 font-playfair italic text-2xl leading-snug">{a.title}</h2>
              <p className="mt-3 text-sm text-white/60 leading-relaxed">{a.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm text-white/45">
                {a.readingTime} min de lecture
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </main>

      <BlogFooter />
    </div>
  );
}
