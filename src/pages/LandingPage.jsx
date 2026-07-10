import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Menu, ArrowRight } from 'lucide-react';

/* ── Assets (exact, du prompt) ─────────────────────────────────── */
const BG_IMAGE_1 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=2048&q=95';
const BG_IMAGE_2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=2048&q=95';

const SPOTLIGHT_R = 260;

/* Colorimétrie identique appliquée aux 2 images → calibrées ensemble,
   rendu plus filmique (moins "AI/fake"). */
const IMG_FILTER = 'brightness(0.9) contrast(1.1) saturate(0.9)';

/* Masque radial doux (mêmes paliers que le prompt), en coordonnées écran.
   Approche CSS mask → composée par le GPU, pas de scintillement. */
const maskFor = (x, y) =>
  `radial-gradient(circle ${SPOTLIGHT_R}px at ${x}px ${y}px,` +
  ' rgba(0,0,0,1) 0%,' +
  ' rgba(0,0,0,1) 40%,' +
  ' rgba(0,0,0,0.75) 60%,' +
  ' rgba(0,0,0,0.4) 75%,' +
  ' rgba(0,0,0,0.12) 88%,' +
  ' rgba(0,0,0,0) 100%)';

/* ── Révélation au scroll (IntersectionObserver → classe CSS) ──── */
function Reveal({ children, className = '', delay = 0, variant = 'reveal', style }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${variant} ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}s`, ...style }}
    >
      {children}
    </div>
  );
}

/* ── Données des sections ──────────────────────────────────────── */
const NEO_FEATURES = [
  'Compte + carte HOMEPAY',
  'Virements instantanés',
  'Cashback sur vos travaux',
  'Financement intégré',
];

const STEPS = [
  {
    num: '01',
    title: 'Audit & éligibilité',
    body: "On identifie vos gisements d'économie d'énergie et le financement mobilisable pour votre projet.",
  },
  {
    num: '02',
    title: 'Financement accéléré',
    body: 'On finance vos travaux de transition énergétique et vous recevez votre trésorerie sans attendre.',
  },
  {
    num: '03',
    title: 'Réalisation & suivi',
    body: 'Chantiers pilotés en temps réel, conformité garantie et reporting complet, de bout en bout.',
  },
];

const STATS = [
  { value: '97,4 %', label: 'de dossiers acceptés' },
  { value: '5 jours', label: 'pour débloquer les fonds' },
  { value: '−65 %', label: 'de temps administratif' },
  { value: '100 %', label: 'digital et sécurisé' },
];

const PROFILES = [
  {
    name: 'Obligés & délégataires',
    desc:
      "Sécurisez votre collecte de certificats : des dossiers conformes et audités, un flux de volumes CEE fiable et prêt au dépôt.",
  },
  {
    name: 'Mandataires',
    desc:
      "Industrialisez l'instruction : contrôle de conformité automatisé, suivi centralisé et dépôt accéléré — sans double saisie ni allers-retours.",
  },
  {
    name: 'Producteurs',
    desc:
      "Valorisez chaque opération au meilleur niveau : plus de CEE validés, un règlement rapide et un pilotage clair de bout en bout.",
  },
  {
    name: 'Bénéficiaires finaux',
    desc:
      "Financez vos travaux d'économie d'énergie simplement : aides mobilisées, sans avance de trésorerie, dans un parcours 100 % digital.",
  },
  {
    name: 'Investisseurs',
    desc:
      "Accédez à un marché structuré : créances CEE standardisées, contreparties vérifiées et transactions traçables, sécurisées de bout en bout.",
  },
];

/* ── Page ──────────────────────────────────────────────────────── */
export default function LandingPage() {
  const revealRef = useRef(null);
  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const rafRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);

    const loop = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
      const div = revealRef.current;
      if (div) {
        const m = maskFor(smooth.current.x, smooth.current.y);
        div.style.webkitMaskImage = m;
        div.style.maskImage = m;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white tracking-[-0.02em]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Helmet>
        <title>FinancesHome — Financez votre transition énergétique</title>
        <meta
          name="description"
          content="Nous finançons et pilotons vos projets de transition énergétique : transformez vos économies d'énergie en trésorerie, simplement et en toute sécurité."
        />
      </Helmet>

      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5">
        {/* Gauche : wordmark */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-playfair italic">
            <span className="text-white">Finances</span>
            <span style={{ color: '#5e17eb' }}>Home</span>
          </span>
        </div>

        {/* Centre : pilule de liens (ancres internes → on reste sur la LP) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-2 py-2 items-center gap-1">
          <a href="#top" className="text-white px-4 py-1.5 rounded-full text-sm font-medium">
            Accueil
          </a>
          <a
            href="#financement"
            className="text-white/80 hover:bg-white/20 hover:text-white transition-colors px-4 py-1.5 rounded-full text-sm font-medium"
          >
            Financement
          </a>
          <a
            href="#acteurs"
            className="text-white/80 hover:bg-white/20 hover:text-white transition-colors px-4 py-1.5 rounded-full text-sm font-medium"
          >
            Pour qui
          </a>
          <a
            href="#neobanque"
            className="text-white/80 hover:bg-white/20 hover:text-white transition-colors px-4 py-1.5 rounded-full text-sm font-medium"
          >
            Néobanque
          </a>
          <a
            href="#efficacite"
            className="text-white/80 hover:bg-white/20 hover:text-white transition-colors px-4 py-1.5 rounded-full text-sm font-medium"
          >
            Efficacité
          </a>
        </div>

        {/* Droite : connexion + inscription (desktop) + hamburger (mobile) */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="https://app.financeshome.com/login"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-white/20 transition-colors"
          >
            Connexion
          </a>
          <a
            href="https://app.financeshome.com/register"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#5e17eb] text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-[#4d12c4] transition-colors"
          >
            Inscription
          </a>
        </div>
        <button className="md:hidden text-white" aria-label="Ouvrir le menu">
          <Menu size={24} />
        </button>
      </nav>

      {/* ── Hero ── */}
      <section id="top" className="relative w-full overflow-hidden h-screen bg-black" style={{ height: '100dvh' }}>
        {/* 1. Image de base (Ken Burns) */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat hero-zoom z-10"
          style={{ backgroundImage: `url("${BG_IMAGE_1}")`, filter: IMG_FILTER }}
        />

        {/* 2. Calque révélé au curseur — masque sur l'enveloppe (coords écran),
               zoom identique sur l'image interne pour rester aligné avec la base */}
        <div
          ref={revealRef}
          className="absolute inset-0 z-30 pointer-events-none"
          style={{
            WebkitMaskImage: maskFor(-999, -999),
            maskImage: maskFor(-999, -999),
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
          }}
        >
          <div
            className="absolute inset-0 bg-center bg-cover bg-no-repeat hero-zoom"
            style={{ backgroundImage: `url("${BG_IMAGE_2}")`, filter: IMG_FILTER }}
          />
        </div>

        {/* Vignettage cinématique (ancre la scène, ajoute de la profondeur) */}
        <div
          className="absolute inset-0 z-40 pointer-events-none"
          style={{ background: 'radial-gradient(125% 95% at 50% 38%, transparent 52%, rgba(0,0,0,0.6) 100%)' }}
        />

        {/* 3. Titre */}
        <div className="absolute top-[14%] left-0 right-0 z-50 flex flex-col items-center text-center px-5 pointer-events-none">
          <h1 className="text-white leading-[0.95]">
            <span
              className="block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl hero-anim hero-reveal"
              style={{ letterSpacing: '-0.05em', animationDelay: '0.25s' }}
            >
              Financez la
            </span>
            <span
              className="block font-normal text-5xl sm:text-6xl md:text-7xl -mt-1 hero-anim hero-reveal"
              style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}
            >
              transition énergétique
            </span>
          </h1>
        </div>

        {/* 4. Paragraphe bas-gauche */}
        <div
          className="hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[260px] z-50 hero-anim hero-fade"
          style={{ animationDelay: '0.7s' }}
        >
          <p className="text-sm text-white/80 leading-relaxed">
            Chaque projet d'économie d'énergie recèle une valeur bien réelle — de l'audit terrain
            jusqu'au financement, des gisements souvent invisibles à l'œil nu.
          </p>
        </div>

        {/* 5. Bloc bas-droite */}
        <div
          className="absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[260px] z-50 flex flex-col items-start gap-4 sm:gap-5 hero-anim hero-fade"
          style={{ animationDelay: '0.85s' }}
        >
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Notre plateforme finance et pilote vos projets de transition énergétique — pour
            transformer vos économies d'énergie en trésorerie, simplement et en toute sécurité.
          </p>
          <a
            href="https://app.financeshome.com/register"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#5e17eb] hover:bg-[#4d12c4] text-white text-sm font-medium px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#5e17eb]/30"
          >
            Créer un compte
          </a>
        </div>
      </section>

      {/* ── NÉOBANQUE (en cours de création) ── */}
      <section id="neobanque" className="relative bg-black text-white min-h-[92vh] flex items-center px-6 sm:px-10 md:px-16 py-24 overflow-hidden">
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Texte sparse */}
          <Reveal className="max-w-md">
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">Néobanque · en cours de création</p>
            <h2
              className="mt-7 font-playfair italic text-4xl sm:text-5xl md:text-6xl leading-[0.95]"
              style={{ letterSpacing: '-0.03em' }}
            >
              La banque de votre transition énergétique
            </h2>
            <p className="mt-6 text-white/60 font-light leading-relaxed">
              Bientôt, un compte et une carte HOMEPAY pensés pour financer vos travaux d'économie
              d'énergie. Encaissez vos aides, réglez vos chantiers, pilotez votre trésorerie — au même
              endroit.
            </p>
            <p className="mt-8 text-sm text-white/40">{NEO_FEATURES.join('  ·  ')}</p>
            <a
              href="https://app.financeshome.com/register"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-white border-b border-white/30 pb-1 hover:border-white transition-colors"
            >
              Rejoindre la liste d'attente <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>

          {/* Carte flottante */}
          <Reveal className="relative flex items-center justify-center" delay={0.12}>
            <div
              className="absolute w-[26rem] h-[26rem] max-w-full rounded-full blur-3xl pointer-events-none"
              style={{ background: 'rgba(94,23,235,0.32)' }}
            />
            <img
              src="/brand/card-3d.webp"
              alt="Carte FinancesHome HOMEPAY — spécimen"
              className="relative z-10 w-full max-w-xl floaty"
              style={{ filter: 'drop-shadow(0 40px 70px rgba(0,0,0,0.6))' }}
            />
          </Reveal>
        </div>
      </section>

      {/* ── LE FINANCEMENT (turbine + étapes minimalistes) ── */}
      <section id="financement" className="relative bg-black text-white min-h-[92vh] flex items-center px-6 sm:px-10 md:px-16 py-24 overflow-hidden">
        {/* Éolienne flottante */}
        <div
          className="hidden md:block absolute right-[8%] top-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(94,23,235,0.16)' }}
        />
        <Reveal
          variant="reveal-soft"
          delay={0.15}
          className="hidden md:block absolute right-[6%] lg:right-[12%] top-1/2 -translate-y-1/2"
        >
          <img
            src="/brand/turbine.webp"
            alt=""
            aria-hidden="true"
            className="pointer-events-none select-none h-[74vh] w-auto opacity-90 floaty-slow"
          />
        </Reveal>

        <div className="max-w-[1400px] mx-auto w-full relative z-10">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">Le financement</p>
            <h2
              className="mt-7 font-playfair italic text-5xl sm:text-6xl md:text-7xl leading-[0.9] max-w-2xl"
              style={{ letterSpacing: '-0.03em' }}
            >
              Financer, simplement
            </h2>
            <p className="mt-6 text-white/60 font-light leading-relaxed max-w-lg">
              De l'audit au versement des fonds, nous prenons en charge tout le parcours de financement
              de votre transition énergétique.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 max-w-3xl">
            {STEPS.map(({ num, title, body }, i) => (
              <Reveal key={num} className="border-t border-white/15 pt-5" delay={0.1 + i * 0.12}>
                <span className="font-playfair italic text-2xl text-white/35">{num}</span>
                <h3 className="mt-3 font-playfair italic text-xl sm:text-2xl">{title}</h3>
                <p className="mt-2 text-sm text-white/55 font-light leading-relaxed">{body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── POUR QUI (acteurs de la chaîne CEE) ── */}
      <section id="acteurs" className="relative bg-black text-white min-h-[92vh] flex items-center px-6 sm:px-10 md:px-16 py-24 overflow-hidden">
        <div className="max-w-[1400px] mx-auto w-full">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">Pour qui</p>
            <h2
              className="mt-7 font-playfair italic text-5xl sm:text-6xl md:text-7xl leading-[0.9] max-w-2xl"
              style={{ letterSpacing: '-0.03em' }}
            >
              Une plateforme pour chaque acteur
            </h2>
            <p className="mt-6 text-white/60 font-light leading-relaxed max-w-lg">
              De l'obligé au bénéficiaire final, FinancesHome connecte toute la chaîne de valeur de la
              transition énergétique.
            </p>
          </Reveal>

          <div className="mt-14 border-t border-white/10">
            {PROFILES.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <div className="grid grid-cols-1 md:grid-cols-[minmax(0,18rem)_1fr] gap-2 md:gap-10 py-7 border-b border-white/10">
                  <h3 className="font-playfair italic text-2xl sm:text-3xl">{p.name}</h3>
                  <p className="text-white/60 font-light leading-relaxed max-w-2xl">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EFFICACITÉ ÉNERGÉTIQUE (diagramme DPE) ── */}
      <section id="efficacite" className="relative bg-black text-white min-h-[85vh] flex items-center px-6 sm:px-10 md:px-16 py-24 overflow-hidden">
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Diagramme flottant */}
          <Reveal className="relative flex items-center justify-center order-last lg:order-first">
            <div
              className="absolute w-96 h-96 max-w-full rounded-full blur-3xl pointer-events-none"
              style={{ background: 'rgba(94,23,235,0.14)' }}
            />
            <img
              src="/brand/energy-rating.webp"
              alt="Diagnostic de performance énergétique"
              className="relative z-10 w-full max-w-md floaty-slow"
            />
          </Reveal>

          {/* Texte sparse */}
          <Reveal className="max-w-md lg:ml-auto" delay={0.12}>
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">Efficacité énergétique</p>
            <h2
              className="mt-7 font-playfair italic text-4xl sm:text-5xl md:text-6xl leading-[0.95]"
              style={{ letterSpacing: '-0.03em' }}
            >
              Passez à la classe supérieure
            </h2>
            <p className="mt-6 text-white/60 font-light leading-relaxed">
              Chaque rénovation fait grimper votre logement dans l'échelle de performance — moins
              d'énergie consommée, plus de valeur créée. Nous finançons les travaux qui font vraiment
              la différence.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── CHIFFRES CLÉS ── */}
      <section className="bg-black py-16 px-6 sm:px-10 md:px-16">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <p className="font-playfair italic text-4xl md:text-5xl leading-none">{s.value}</p>
              <p className="mt-3 text-sm text-white/60">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section id="inscription" className="relative bg-black py-28 sm:py-36 px-6 text-center overflow-hidden">
        <div
          className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[36rem] h-[36rem] max-w-full rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(94,23,235,0.22)' }}
        />
        <Reveal className="relative z-10 max-w-3xl mx-auto">
          <h2
            className="font-playfair italic text-4xl sm:text-6xl md:text-7xl leading-[0.95] text-white"
            style={{ letterSpacing: '-0.03em' }}
          >
            Financez votre transition
          </h2>
          <p className="mt-6 text-white/70 leading-relaxed max-w-xl mx-auto">
            Rejoignez FinancesHome et transformez vos économies d'énergie en trésorerie, simplement et
            en toute sécurité.
          </p>
          <div className="mt-9 flex items-center justify-center gap-4 flex-wrap">
            <a
              href="https://app.financeshome.com/register"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#5e17eb] hover:bg-[#4d12c4] text-white text-sm font-medium px-8 py-3.5 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#5e17eb]/30"
            >
              Créer un compte
            </a>
            <a
              href="#financement"
              className="text-white/80 hover:text-white text-sm font-medium px-6 py-3.5 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
            >
              Voir comment ça marche
            </a>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-black border-t border-white/10 py-10 px-6 sm:px-10 md:px-16">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-xl font-playfair italic">
            <span className="text-white">Finances</span>
            <span style={{ color: '#5e17eb' }}>Home</span>
          </span>
          <div className="flex items-center gap-6 text-sm text-white/60">
            <a href="#financement" className="hover:text-white transition-colors">Financement</a>
            <a href="#neobanque" className="hover:text-white transition-colors">Néobanque</a>
            <a href="#efficacite" className="hover:text-white transition-colors">Efficacité</a>
            <a href="/blog" className="hover:text-white transition-colors">Ressources</a>
            <a
              href="https://app.financeshome.com/register"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-medium"
            >
              Créer un compte
            </a>
          </div>
          <span className="text-xs text-white/40">© 2026 FinancesHome</span>
        </div>
      </footer>
    </div>
  );
}
