import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { ARTICLES, getArticle } from '../data/articles';
import { BlogHeader, BlogFooter } from '../components/BlogChrome';

const REGISTER = 'https://app.financeshome.com/register';
const MONTHS = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
];

function formatDate(iso) {
  const [y, m, d] = iso.split('-');
  return `${parseInt(d, 10)} ${MONTHS[parseInt(m, 10) - 1]} ${y}`;
}

function Block({ block }) {
  if (block.t === 'h2') {
    return <h2 className="font-playfair italic text-2xl sm:text-3xl pt-6 text-white">{block.c}</h2>;
  }
  if (block.t === 'h3') {
    return <h3 className="font-playfair italic text-xl pt-4 text-white">{block.c}</h3>;
  }
  if (block.t === 'ul') {
    return (
      <ul className="list-disc pl-5 space-y-2 text-white/75 leading-relaxed">
        {block.items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    );
  }
  return <p className="text-white/75 font-light leading-relaxed">{block.c}</p>;
}

export default function ArticlePage() {
  const { slug } = useParams();
  const article = getArticle(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) return <Navigate to="/blog" replace />;

  let related = ARTICLES.filter((a) => a.slug !== slug && a.category === article.category);
  if (related.length < 2) {
    related = related.concat(ARTICLES.filter((a) => a.slug !== slug && a.category !== article.category));
  }
  related = related.slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Helmet>
        <title>{article.metaTitle}</title>
        <meta name="description" content={article.metaDescription} />
        <link rel="canonical" href={`https://financeshome.fr/blog/${article.slug}`} />
        <meta property="og:title" content={article.metaTitle} />
        <meta property="og:description" content={article.metaDescription} />
        <meta property="og:type" content="article" />
      </Helmet>

      <BlogHeader />

      <article className="max-w-2xl mx-auto px-6 pt-14 pb-24">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" /> Tous les articles
        </Link>

        <span className="mt-8 block text-[0.7rem] uppercase tracking-wider" style={{ color: '#8b5cf6' }}>
          {article.category}
        </span>
        <h1
          className="mt-3 font-playfair italic text-3xl sm:text-5xl leading-[1.02]"
          style={{ letterSpacing: '-0.02em' }}
        >
          {article.title}
        </h1>
        <p className="mt-4 text-sm text-white/40">
          {formatDate(article.date)} · {article.readingTime} min de lecture
        </p>

        <div className="mt-10 space-y-5">
          {article.content.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        {/* CTA inscription */}
        <div className="mt-14 rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
          <h2 className="font-playfair italic text-2xl sm:text-3xl">Financez vos travaux dès maintenant</h2>
          <p className="mt-3 text-sm text-white/60 max-w-md mx-auto leading-relaxed">
            FinancesHome sécurise votre dossier et finance votre transition énergétique, sans avance
            de trésorerie.
          </p>
          <a
            href={REGISTER}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 bg-[#5e17eb] hover:bg-[#4d12c4] text-white text-sm font-medium px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95"
          >
            Créer un compte <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        {/* Articles liés */}
        {related.length > 0 && (
          <div className="mt-16">
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">À lire aussi</p>
            <div className="mt-6 space-y-3">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  to={`/blog/${a.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 hover:bg-white/[0.05] transition-colors"
                >
                  <span className="font-playfair italic text-lg">{a.title}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-white/40 group-hover:text-white transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <BlogFooter />
    </div>
  );
}
