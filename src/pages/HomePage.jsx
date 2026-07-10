import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ScanFace, Activity, Plus, Minus, ArrowRight } from 'lucide-react';

/* ─── Variants d'animation ─────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay } },
});

const viewOpts = { once: true, margin: '-60px' };

/* ─── Données ──────────────────────────────────────────────────────────── */

const logos = ['ENERGÉO', 'GREENFLUX', 'VOLTANEO', 'ECOPRIME', 'KILOWATT.CO', 'PRIMA ÉNERGIE', 'WATTLINK'];

const problemes = [
  { icon: '✕', titre: 'Dossiers refusés', desc: "Des erreurs de conformité font échouer jusqu'à 30 % des dossiers déposés." },
  { icon: '⊗', titre: 'Processus complexes', desc: 'Multiplication des outils, doubles saisies, allers-retours interminables.' },
  { icon: '◎', titre: 'Manque de visibilité', desc: "Pas de suivi en temps réel — vous ne savez pas où en sont vos opérations." },
  { icon: '↘', titre: "Perte d'argent", desc: "Sans pilotage rigoureux, des milliers d'euros de CEE s'évaporent chaque mois." },
];

const etapesSolution = [
  { num: '1', label: 'Audit', sub: 'Identification des gisements' },
  { num: '2', label: 'Dépôt', sub: 'Constitution du dossier' },
  { num: '3', label: 'Suivi', sub: 'Pilotage en temps réel' },
  { num: '4', label: 'Validation', sub: 'Acceptation officielle' },
  { num: '5', label: 'Paiement', sub: 'Versement sécurisé' },
];

const piliers = [
  {
    titre: 'Instruction complète',
    desc: "Constitution, dépôt et suivi de vos dossiers CEE, avec contrôle de conformité automatisé à chaque étape — du gisement jusqu'à la validation officielle.",
  },
  {
    titre: 'Financement accéléré',
    desc: "Cédez vos créances CEE validées à nos partenaires financiers et recevez votre règlement en 5 jours ouvrés, sans recours, 100 % digital.",
  },
  {
    titre: 'Marketplace CEE',
    desc: "Producteurs, mandataires et acheteurs se rencontrent dans un marché structuré : créances standardisées, contreparties KYC, transactions traçables.",
  },
  {
    titre: 'Conformité & sécurité',
    desc: "Données chiffrées, audit trail complet et conformité réglementaire CEE garantie — pensé pour un partenariat bancaire white label.",
  },
];

const featuresPlat = [
  { titre: 'Gestion centralisée', desc: 'Tous vos dossiers, équipes et partenaires dans un seul espace.' },
  { titre: 'Suivi en temps réel', desc: 'Tableaux de bord vivants, alertes intelligentes, KPIs clairs.' },
  { titre: 'Organisation des dossiers', desc: 'Workflows automatisés, pièces justificatives, conformité garantie.' },
  { titre: 'Sécurisation', desc: 'Données chiffrées, audit trail, conformité réglementaire CEE.' },
];

const ecosysteme = [
  { tag: 'SaaS', titre: 'FinancesHome', desc: 'Gestion centralisée des dossiers CEE.', logo: '/faviconFH.jpeg' },
  { tag: 'Primes véhicules', titre: 'Mobility', desc: 'Valorisation des CEE liés à la mobilité propre.', logo: '/faviconFHM.jpeg' },
  { tag: 'Travaux énergétiques', titre: 'Production', desc: 'Pilotage des chantiers de rénovation et travaux.', logo: '/faviconFHP.jpeg' },
  { tag: 'Audit & contrôle', titre: 'Diagnostic', desc: "Analyse et conformité des opérations CEE.", logo: '/faviconFHD.jpeg' },
];

const etapesProcess = [
  { num: '01', titre: 'Analyse', desc: 'Identification des gisements et qualification des projets.' },
  { num: '02', titre: 'Mise en place', desc: 'Onboarding rapide, intégration de vos équipes et partenaires.' },
  { num: '03', titre: 'Suivi', desc: 'Pilotage en temps réel, alertes proactives, conformité continue.' },
  { num: '04', titre: 'Validation', desc: 'Dépôt, instruction et paiement — sécurisés de bout en bout.' },
];

const benefices = [
  { valeur: '−65 %', titre: 'Gain de temps', desc: 'de temps administratif sur la gestion des dossiers.' },
  { valeur: '97,4 %', titre: "Moins d'erreurs", desc: "de taux d'acceptation moyen sur les dossiers déposés." },
  { valeur: '×2,3', titre: 'Plus de CEE validés', desc: 'de volume de CEE valorisés en moyenne.' },
  { valeur: '+28 %', titre: 'Plus de rentabilité', desc: 'de marge nette dégagée sur les opérations CEE.' },
];

const faqs = [
  {
    q: 'Qui peut accéder à la plateforme FinancesHome ?',
    a: "La plateforme est ouverte aux producteurs CEE (installateurs, mandataires), aux acheteurs d'obligations (obligés), aux bénéficiaires finaux et aux partenaires financiers qualifiés (investisseurs, fonds). Un processus KYC est requis pour chaque catégorie.",
  },
  {
    q: 'Comment fonctionne le financement accéléré (FastPay) ?',
    a: 'FastPay permet de céder une créance CEE validée à un partenaire financier moyennant une décote négociée. Le règlement intervient en 5 jours ouvrés, sans recours contre le producteur cédant. Le processus est 100% digital sur la plateforme.',
  },
  {
    q: 'FinancesHome est-elle réglementée ?',
    a: "FinancesHome est une plateforme d'orchestration administrative. Elle n'exerce pas d'activité de prestation de services d'investissement (MiFID II) ni d'activité de crédit au sens de la directive 2008/48/CE. Les opérations de financement sont portées par des partenaires agréés.",
  },
  {
    q: 'Dans quels pays le dispositif est-il disponible ?',
    a: "Le dispositif des obligations d'efficacité énergétique (OEE) couvre 14 pays membres de l'UE. FinancesHome opère actuellement en France et déploie progressivement son infrastructure dans les autres marchés.",
  },
];

/* ─── Composants ───────────────────────────────────────────────────────── */

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div style={{ borderTop: '1px solid var(--border-gray)' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: '1rem',
        }}
      >
        <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--black)' }}>{item.q}</span>
        <span
          style={{
            flexShrink: 0,
            fontSize: '1.25rem',
            color: 'var(--black)',
            transition: 'transform 0.3s',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            display: 'inline-block',
          }}
        >
          +
        </span>
      </button>
      {isOpen && (
        <div style={{ paddingBottom: '1.25rem' }}>
          <p style={{ fontSize: '0.9375rem', color: 'var(--muted)', lineHeight: 1.7 }}>{item.a}</p>
        </div>
      )}
    </div>
  );
}

/* ─── Page principale ──────────────────────────────────────────────────── */

const HomePage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [openPilier, setOpenPilier] = useState(0);
  const calendlyRef = useRef(null);

  useEffect(() => {
    const init = () => {
      if (window.Calendly && calendlyRef.current) {
        window.Calendly.initInlineWidget({
          url: 'https://calendly.com/contact-financeshome/30min?primary_color=5e17eb',
          parentElement: calendlyRef.current,
        });
      }
    };
    if (window.Calendly) {
      init();
    } else {
      const script = document.querySelector('script[src*="calendly"]');
      if (script) script.addEventListener('load', init);
    }
  }, []);


  return (
    <>
      <Helmet>
        <title>FinancesHome — Optimisez vos CEE. Gagnez plus. Sans complexité.</title>
        <meta name="description" content="FinancesHome simplifie, sécurise et maximise vos opérations CEE grâce à un écosystème complet : SaaS, mobilité, production et diagnostic." />
      </Helmet>

      <div style={{ background: 'var(--light-grey)' }}>

        {/* ── HERO — BENTO (direction Gemini, accent violet) ───── */}
        <section id="hero" className="max-w-[1400px] mx-auto px-6 pt-6 pb-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

            {/* Colonne texte */}
            <motion.div
              className="lg:col-span-5 flex flex-col items-start"
              initial="hidden" animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 border border-gray-200 bg-white text-xs font-semibold text-gray-600 px-3 py-1.5 rounded-full mb-8 shadow-sm">
                Propulsé par
                <span className="inline-flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold text-gray-800">
                  IA <Sparkles className="w-3 h-3 text-brand" />
                </span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-gray-900 mb-8">
                Simplifiez, financez<br />et valorisez<br />vos <span className="text-brand">CEE</span>.
              </motion.h1>

              <motion.div variants={fadeUp} className="grid grid-cols-2 gap-8 mb-10 w-full max-w-md">
                <div>
                  <p className="text-4xl font-extrabold text-gray-900 mb-2">97,4 %</p>
                  <p className="text-sm text-gray-500 font-medium leading-snug">de taux d'acceptation sur les dossiers déposés.</p>
                </div>
                <div>
                  <p className="text-4xl font-extrabold text-gray-900 mb-2">−65 %</p>
                  <p className="text-sm text-gray-500 font-medium leading-snug">de temps administratif sur la gestion.</p>
                </div>
              </motion.div>

              <motion.a
                variants={fadeUp}
                href="#calendly"
                className="bg-[#1a1d20] text-white text-base font-semibold py-4 px-10 rounded-2xl hover:bg-black transition-colors"
              >
                Audit CEE gratuit
              </motion.a>
            </motion.div>

            {/* Colonne bento */}
            <motion.div
              className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-4 h-full min-h-[500px]"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Grande image */}
              <div className="col-span-2 md:col-span-2 row-span-2 bg-gray-200 rounded-[2rem] relative overflow-hidden">
                <img src="/hero-image.webp" alt="Pilotage des opérations CEE" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-semibold shadow-sm flex items-center gap-2">
                  <ScanFace className="w-4 h-4 text-brand" /> Dossiers CEE
                </div>
                <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-semibold shadow-sm flex items-center gap-2">
                  <Activity className="w-4 h-4 text-gray-800" /> Suivi temps réel
                </div>
              </div>

              {/* Assistant IA */}
              <div className="col-span-1 bg-white border border-gray-100 rounded-[2rem] shadow-sm flex flex-col justify-center items-center p-6 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center relative mb-4" style={{ background: 'rgba(94,23,235,0.06)' }}>
                  <div className="absolute inset-0 border-[3px] border-brand rounded-full border-t-transparent animate-spin" />
                  <div className="w-8 h-8 bg-brand rounded-full blur-sm" />
                  <div className="w-4 h-4 bg-white rounded-full absolute z-10 shadow-sm" />
                </div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Assistant IA</p>
              </div>

              {/* Solde / primes */}
              <div className="col-span-1 bg-white border border-gray-100 rounded-[2rem] shadow-sm p-6 flex flex-col justify-end relative overflow-hidden">
                <div className="w-full h-32 bg-gray-50 absolute top-0 left-0 rounded-t-[2rem] border-b border-gray-100 flex items-end justify-center pb-4">
                  <svg className="w-full h-16 text-emerald-400" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <path d="M0,30 L0,20 Q10,25 20,15 T40,25 T60,5 T80,15 T100,0 L100,30 Z" fill="currentColor" fillOpacity="0.2" />
                    <path d="M0,20 Q10,25 20,15 T40,25 T60,5 T80,15 T100,0" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <div className="relative z-10 mt-24">
                  <p className="text-xs font-medium text-gray-500 mb-1">Primes CEE validées</p>
                  <p className="text-2xl font-extrabold text-gray-900">842 K€</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── MARQUEE PARTENAIRES ───────────────────────────────── */}
        {/* À activer quand plusieurs obligés seront sur la plateforme
        <section
          style={{
            padding: '3rem 0',
            borderTop: '1px solid var(--border-gray)',
            borderBottom: '1px solid var(--border-gray)',
            background: 'var(--white)',
            overflow: 'hidden',
          }}
        >
          <p style={{ textAlign: 'center', fontSize: '0.8125rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>
            Déjà utilisé par des acteurs du secteur énergétique
          </p>
          <div
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
              overflow: 'hidden',
            }}
          >
            <div className="marquee-track">
              {[...logos, ...logos].map((l, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: '#ccc',
                    flexShrink: 0,
                    padding: '0 2rem',
                    transition: 'color 0.2s',
                    cursor: 'default',
                  }}
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
          <style>{`
            .marquee-track {
              display: flex;
              width: max-content;
              animation: marquee 28s linear infinite;
              align-items: center;
            }
            @keyframes marquee {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
          `}</style>
        </section>
        */}

        {/* ── CONSTAT — POURQUOI C'EST ENCORE COMPLIQUÉ ───────── */}
        <section className="section-padding" style={{ background: 'var(--white)' }}>
          <div className="padding-global" style={{ maxWidth: '105rem', margin: '0 auto' }}>
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewOpts}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              style={{ maxWidth: '40rem', marginBottom: '3.5rem' }}
            >
              <motion.span variants={fadeUp} className="tagline-pill">Le constat</motion.span>
              <motion.h2 variants={fadeUp} style={{ marginBottom: '1rem' }}>
                Pourquoi les CEE sont encore compliqués ?
              </motion.h2>
              <motion.p variants={fadeUp} style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                Le dispositif est rentable — mais l'exécution reste un parcours du combattant pour les opérateurs du secteur.
              </motion.p>
            </motion.div>

            <div className="constat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
              {problemes.map((p, i) => (
                <motion.div
                  key={i}
                  initial="hidden" whileInView="visible" viewport={viewOpts}
                  variants={stagger(i * 0.08)}
                  style={{
                    background: 'var(--light-grey)',
                    border: '1px solid var(--border-gray)',
                    borderRadius: '1.75rem',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                  }}
                >
                  <div
                    style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '0.875rem',
                      background: 'var(--white)',
                      border: '1px solid var(--border-gray)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.875rem',
                      color: 'var(--muted)',
                    }}
                  >
                    {p.icon}
                  </div>
                  <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--black)', margin: 0 }}>{p.titre}</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <style>{`
            @media (max-width: 991px) { .constat-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 599px) { .constat-grid { grid-template-columns: 1fr !important; } }
          `}</style>
        </section>

        {/* ── SOLUTION — CHAÎNE CEE ────────────────────────────── */}
        <section id="solution" className="section-padding" style={{ background: 'var(--light-grey)', borderTop: '1px solid var(--border-gray)', borderBottom: '1px solid var(--border-gray)' }}>
          <div className="padding-global" style={{ maxWidth: '105rem', margin: '0 auto' }}>
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewOpts}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              style={{ maxWidth: '40rem', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}
            >
              <motion.span variants={fadeUp} className="tagline-pill">La solution</motion.span>
              <motion.h2 variants={fadeUp} style={{ marginBottom: '1rem' }}>
                Un seul outil pour gérer toute la chaîne CEE
              </motion.h2>
              <motion.p variants={fadeUp} style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                FinancesHome connecte chaque étape — de l'audit terrain jusqu'au paiement final — dans une plateforme unique, transparente et performante.
              </motion.p>
            </motion.div>

            {/* Steps */}
            <div
              style={{ position: 'relative' }}
            >
              {/* Ligne horizontale (desktop) */}
              <div
                style={{
                  position: 'absolute',
                  top: '1.75rem',
                  left: '10%',
                  right: '10%',
                  height: '1px',
                  background: 'linear-gradient(to right, transparent, var(--violet), transparent)',
                  pointerEvents: 'none',
                }}
                className="solution-line"
              />
              <div className="solution-steps" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.5rem', position: 'relative' }}>
                {etapesSolution.map((e, i) => (
                  <motion.div
                    key={i}
                    initial="hidden" whileInView="visible" viewport={viewOpts}
                    variants={stagger(i * 0.1)}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}
                  >
                    <div
                      style={{
                        width: '3.5rem',
                        height: '3.5rem',
                        borderRadius: '1rem',
                        background: 'var(--white)',
                        border: '1px solid var(--border-gray)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: 'var(--black)',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      {e.num}
                    </div>
                    <div>
                      <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--black)', margin: 0 }}>{e.label}</p>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--muted)', margin: '0.2rem 0 0' }}>{e.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <style>{`
            @media (max-width: 767px) {
              .solution-steps { grid-template-columns: repeat(2, 1fr) !important; }
              .solution-line { display: none !important; }
            }
            @media (max-width: 479px) {
              .solution-steps { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </section>

        {/* ── PILIERS — accordéon + carte dans panneau sombre (direction Gemini §2) ── */}
        <section id="produit" className="max-w-[1400px] mx-auto px-6 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

            {/* Accordéon des piliers */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              {piliers.map((p, i) =>
                openPilier === i ? (
                  <motion.div key={i} layout className="bg-brand text-white p-8 rounded-3xl shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-2xl text-white">{p.titre}</h3>
                      <span className="bg-white/20 p-2 rounded-full"><Minus className="w-5 h-5" /></span>
                    </div>
                    <p className="text-sm leading-relaxed font-medium mb-6" style={{ color: 'rgba(255,255,255,0.9)' }}>{p.desc}</p>
                    <Link to="/product" className="block text-center bg-white text-gray-900 text-sm font-bold py-3 px-6 rounded-xl w-full hover:bg-gray-50 transition-colors">
                      Découvrir la plateforme
                    </Link>
                  </motion.div>
                ) : (
                  <button
                    key={i}
                    onClick={() => setOpenPilier(i)}
                    className="w-full text-left bg-white border border-gray-100 p-6 rounded-3xl flex justify-between items-center shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-bold text-xl text-gray-800">{p.titre}</span>
                    <span className="bg-gray-100 p-2 rounded-full"><Plus className="w-5 h-5 text-gray-600" /></span>
                  </button>
                )
              )}
            </div>

            {/* Panneau sombre + carte transparente sur arrière-plan flouté */}
            <div
              className="lg:col-span-8 rounded-[2rem] p-8 lg:p-14 flex items-center justify-center relative overflow-hidden min-h-[380px]"
              style={{ background: 'radial-gradient(120% 120% at 30% 20%, #1c1f24 0%, #111315 62%, #0c0e10 100%)' }}
            >
              {/* Halos flous en arrière-plan */}
              <div className="absolute -left-16 -top-16 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(94,23,235,0.35)' }} />
              <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(47,107,246,0.22)' }} />
              <div className="absolute right-1/3 top-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(22,194,154,0.16)' }} />

              <span className="absolute top-5 left-6 z-20 text-[0.7rem] font-medium tracking-wide" style={{ color: 'rgba(255,255,255,0.55)' }}>Carte FinancesHome · HOMEPAY</span>
              <span className="absolute top-5 right-6 z-20 text-[0.62rem] font-medium tracking-wide px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>Spécimen</span>

              <motion.img
                src="/brand/card-3d.webp"
                alt="Carte FinancesHome — spécimen à usage de démonstration"
                className="relative z-10 w-full max-w-xl floaty-slow"
                style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.5))' }}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewOpts}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </section>

        {/* ── ÉCOSYSTÈME — DARK GLASSMORPHISM ──────────────────── */}
        <section id="ecosysteme" className="section-padding" style={{ background: 'var(--black)', position: 'relative', overflow: 'hidden' }}>
          {/* Ambient glow */}
          <div style={{ position: 'absolute', top: '-20%', left: '20%', width: '40rem', height: '40rem', borderRadius: '100%', background: 'rgba(94,23,235,0.15)', filter: 'blur(80px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-20%', right: '15%', width: '30rem', height: '30rem', borderRadius: '100%', background: 'rgba(94,23,235,0.1)', filter: 'blur(60px)', pointerEvents: 'none' }} />

          <div className="padding-global" style={{ maxWidth: '105rem', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewOpts}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              style={{ maxWidth: '40rem', marginBottom: '3.5rem' }}
            >
              <motion.span
                variants={fadeUp}
                style={{
                  display: 'inline-block',
                  background: 'rgba(94,23,235,0.2)',
                  border: '1px solid rgba(94,23,235,0.4)',
                  borderRadius: '100rem',
                  padding: '0.35rem 0.875rem',
                  fontSize: '0.875rem',
                  color: 'rgba(180,140,255,0.9)',
                  marginBottom: '1rem',
                }}
              >
                Différenciateur
              </motion.span>
              <motion.h2 variants={fadeUp} style={{ color: '#fff', marginBottom: '1rem' }}>
                Un écosystème complet
              </motion.h2>
              <motion.p variants={fadeUp} style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
                Quatre briques connectées, une seule promesse : couvrir l'intégralité de la chaîne de valeur CEE.
              </motion.p>
            </motion.div>

            <div className="eco-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
              {ecosysteme.map((e, i) => (
                <motion.div
                  key={i}
                  initial="hidden" whileInView="visible" viewport={viewOpts}
                  variants={stagger(i * 0.1)}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '1.75rem',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    transition: 'background 0.3s, border-color 0.3s',
                  }}
                  whileHover={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(94,23,235,0.4)' }}
                >
                  <div
                    style={{
                      width: '3rem',
                      height: '3rem',
                      borderRadius: '0.75rem',
                      overflow: 'hidden',
                      marginBottom: '0.5rem',
                      background: '#fff',
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={e.logo}
                      alt={e.titre}
                      loading="lazy"
                      decoding="async"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(180,140,255,0.7)', fontWeight: 500 }}>
                    {e.tag}
                  </span>
                  <p style={{ fontSize: '1.0625rem', fontWeight: 600, color: '#fff', margin: 0 }}>{e.titre}</p>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>{e.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <style>{`
            @media (max-width: 991px) { .eco-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 599px) { .eco-grid { grid-template-columns: 1fr !important; } }
          `}</style>
        </section>

        {/* ── NÉOBANQUE — produit en développement (accent bleu/teal) ── */}
        <section id="neobanque" className="section-padding" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f4f7fc 100%)' }}>
          <div className="padding-global" style={{ maxWidth: '105rem', margin: '0 auto' }}>
            <div className="neo-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4.5rem', alignItems: 'center' }}>
              {/* Texte */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={viewOpts}
                variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              >
                <motion.span variants={fadeUp} className="brand-pill brand-pill--brand" style={{ borderColor: 'rgba(47,107,246,0.3)', color: 'var(--fh-blue-deep)' }}>
                  Néobanque · en développement
                </motion.span>
                <motion.h2 variants={fadeUp} style={{ margin: '1.25rem 0' }}>
                  La carte qui simplifie vos <span className="text-gradient--fh">finances</span> du quotidien
                </motion.h2>
                <motion.p variants={fadeUp} style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
                  FinancesHome développe son compte et sa carte HOMEPAY : un espace bancaire pensé pour les acteurs de l'énergie, connecté à vos flux CEE. Encaissez vos primes, réglez vos travaux et pilotez votre trésorerie au même endroit.
                </motion.p>
                <ul className="neo-features" style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
                  {['Compte + carte HOMEPAY', 'Virements instantanés', 'Cashback sur vos travaux', 'Pilotage IA des dépenses'].map((f, i) => (
                    <motion.li key={i} variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9375rem', color: 'var(--black)' }}>
                      <span style={{ width: '1.25rem', height: '1.25rem', borderRadius: '100rem', background: 'var(--fh-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                      {f}
                    </motion.li>
                  ))}
                </ul>
                <motion.div variants={fadeUp}>
                  <Link to="/contact" className="btn-gradient btn-gradient--fh">Rejoindre la liste d'attente →</Link>
                </motion.div>
              </motion.div>

              {/* Carte */}
              <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewOpts}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'relative' }}
              >
                <div style={{ position: 'absolute', inset: '-12% -8%', background: 'radial-gradient(58% 58% at 62% 38%, rgba(47,107,246,0.2), rgba(22,194,154,0.12) 45%, transparent 72%)', filter: 'blur(18px)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', borderRadius: '1.75rem', overflow: 'hidden', boxShadow: '0 30px 70px rgba(30,45,90,0.16)', border: '1px solid rgba(255,255,255,0.85)' }}>
                  <img
                    src="/brand/card-flat.png"
                    alt="Carte FinancesHome HOMEPAY — spécimen à usage de démonstration"
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', display: 'block' }}
                  />
                </div>
              </motion.div>
            </div>
          </div>

          <style>{`
            @media (max-width: 991px) { .neo-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; } }
            @media (max-width: 599px) { .neo-features { grid-template-columns: 1fr !important; } }
          `}</style>
        </section>

        {/* ── MARKETPLACE ──────────────────────────────────────── */}
        <section id="marketplace" className="section-padding" style={{ background: 'var(--white)' }}>
          <div className="padding-global" style={{ maxWidth: '105rem', margin: '0 auto' }}>
            <div
              className="marketplace-grid"
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}
            >
              {/* Photo gauche */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={viewOpts} variants={fadeUp}
                style={{ borderRadius: '2rem', overflow: 'hidden', aspectRatio: '4/3' }}
              >
                <img
                  src="/img/photo-1460925895917-800x600.jpg"
                  alt="Marketplace CEE - flux et transactions"
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </motion.div>

              {/* Texte droite */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={viewOpts}
                variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              >
                <motion.span variants={fadeUp} className="tagline-pill">Marketplace</motion.span>
                <motion.h2 variants={fadeUp} style={{ marginBottom: '1.25rem' }}>
                  Un marché structuré pour les CEE
                </motion.h2>
                <motion.p variants={fadeUp} style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
                  La marketplace FinancesHome connecte producteurs, mandataires, acheteurs et partenaires financiers dans un environnement sécurisé. Les créances sont standardisées, les contreparties vérifiées, les transactions traçables.
                </motion.p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    'Créances CEE standardisées et vérifiées',
                    'Contreparties KYC qualifiées',
                    'Règlement sécurisé sous 5 jours ouvrés',
                    'Reporting complet et traçabilité full-audit',
                  ].map((item, i) => (
                    <motion.li key={i} variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9375rem', color: 'var(--black)' }}>
                      <span style={{ width: '1.25rem', height: '1.25rem', borderRadius: '100rem', background: 'var(--violet)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          <style>{`
            @media (max-width: 767px) { .marketplace-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; } }
          `}</style>
        </section>

        {/* ── PROCESS ──────────────────────────────────────────── */}
        <section id="process" className="section-padding" style={{ background: 'var(--white)' }}>
          <div className="padding-global" style={{ maxWidth: '105rem', margin: '0 auto' }}>
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewOpts}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              style={{ maxWidth: '40rem', marginBottom: '3.5rem' }}
            >
              <motion.span variants={fadeUp} className="tagline-pill">Process</motion.span>
              <motion.h2 variants={fadeUp}>Comment ça marche</motion.h2>
            </motion.div>

            <div className="process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
              {etapesProcess.map((e, i) => (
                <motion.div
                  key={i}
                  initial="hidden" whileInView="visible" viewport={viewOpts}
                  variants={stagger(i * 0.1)}
                  style={{
                    background: 'var(--light-grey)',
                    border: '1px solid var(--border-gray)',
                    borderRadius: '1.75rem',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                  }}
                >
                  <span style={{ fontSize: '0.6875rem', fontFamily: 'monospace', color: 'var(--muted)', fontWeight: 500 }}>{e.num}</span>
                  <div
                    style={{
                      width: '2.75rem',
                      height: '2.75rem',
                      borderRadius: '0.875rem',
                      background: 'rgba(94,23,235,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1rem',
                      color: 'var(--violet)',
                    }}
                  >
                    ◈
                  </div>
                  <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--black)', margin: 0 }}>{e.titre}</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>{e.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <style>{`
            @media (max-width: 991px) { .process-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 599px) { .process-grid { grid-template-columns: 1fr !important; } }
          `}</style>
        </section>

        {/* ── BÉNÉFICES ─────────────────────────────────────────── */}
        <section className="section-padding" style={{ background: 'var(--light-grey)', borderTop: '1px solid var(--border-gray)', borderBottom: '1px solid var(--border-gray)' }}>
          <div className="padding-global" style={{ maxWidth: '105rem', margin: '0 auto' }}>
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewOpts}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              style={{ maxWidth: '40rem', marginBottom: '3.5rem' }}
            >
              <motion.span variants={fadeUp} className="tagline-pill">Bénéfices</motion.span>
              <motion.h2 variants={fadeUp}>Ce que vous gagnez</motion.h2>
            </motion.div>

            <div className="benefices-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
              {benefices.map((b, i) => (
                <motion.div
                  key={i}
                  initial="hidden" whileInView="visible" viewport={viewOpts}
                  variants={stagger(i * 0.08)}
                  style={{
                    background: 'var(--white)',
                    border: '1px solid var(--border-gray)',
                    borderRadius: '1.75rem',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <span style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--black)', lineHeight: 1.1 }}>{b.valeur}</span>
                  <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--black)', margin: 0 }}>{b.titre}</p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--muted)', lineHeight: 1.5, margin: 0 }}>{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <style>{`
            @media (max-width: 991px) { .benefices-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 599px) { .benefices-grid { grid-template-columns: 1fr !important; } }
          `}</style>
        </section>

        {/* ── AVANT / APRÈS ────────────────────────────────────── */}
        <section className="section-padding" style={{ background: 'var(--white)' }}>
          <div className="padding-global" style={{ maxWidth: '105rem', margin: '0 auto' }}>
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewOpts}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              style={{ maxWidth: '40rem', marginBottom: '3.5rem' }}
            >
              <motion.span variants={fadeUp} className="tagline-pill">Cas concret</motion.span>
              <motion.h2 variants={fadeUp}>Avant / Après FinancesHome</motion.h2>
            </motion.div>

            <div className="avantapres-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              {/* Avant */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={viewOpts} variants={stagger(0)}
                style={{ background: 'var(--light-grey)', border: '1px solid var(--border-gray)', borderRadius: '2rem', padding: '2.5rem' }}
              >
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', fontWeight: 500 }}>Avant</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--black)', margin: '0.5rem 0 1.5rem' }}>Opérations dispersées</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                  {['Excel partagés et fichiers éparpillés', 'Délais de validation > 60 jours', 'Taux de refus de 25 à 35 %', 'Aucun reporting consolidé'].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9375rem', color: 'var(--muted)' }}>
                      <span style={{ width: '1.25rem', height: '1.25rem', borderRadius: '100rem', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.625rem', flexShrink: 0, color: '#aaa' }}>✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Après */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={viewOpts} variants={stagger(0.1)}
                style={{
                  background: 'linear-gradient(135deg, rgba(94,23,235,0.06) 0%, transparent 100%)',
                  border: '1px solid rgba(94,23,235,0.25)',
                  borderRadius: '2rem',
                  padding: '2.5rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', top: '-4rem', right: '-4rem', width: '12rem', height: '12rem', borderRadius: '100%', background: 'rgba(94,23,235,0.1)', filter: 'blur(40px)', pointerEvents: 'none' }} />
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--violet)', fontWeight: 500 }}>Après</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--black)', margin: '0.5rem 0 1.5rem' }}>Opérations pilotées</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                  {['Plateforme unique, données centralisées', 'Validation en 4 à 7 jours ouvrés', 'Taux d\'acceptation 97,4 %', 'Reporting temps réel et audit trail'].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9375rem', color: 'var(--black)' }}>
                      <span style={{ width: '1.25rem', height: '1.25rem', borderRadius: '100rem', background: 'var(--violet)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.625rem', flexShrink: 0 }}>
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          <style>{`
            @media (max-width: 767px) { .avantapres-grid { grid-template-columns: 1fr !important; } }
          `}</style>
        </section>

        {/* ── TÉMOIGNAGE — sombre + bento d'images (direction Gemini §3) ── */}
        <section className="max-w-[1400px] mx-auto px-6 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Citation sur fond sombre */}
            <div className="lg:col-span-6 bg-[#111315] rounded-[2rem] p-10 lg:p-12 flex flex-col justify-between min-h-[420px]">
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-sm font-semibold uppercase tracking-widest">Ils utilisent FinancesHome</span>
                <span className="border border-gray-700 text-gray-400 px-3 py-1 rounded-full text-xs font-medium">Avis</span>
              </div>
              <div>
                <p className="text-2xl lg:text-3xl font-medium leading-relaxed text-gray-300">
                  « Depuis FinancesHome, <span className="text-brand font-semibold">nos dossiers CEE sont validés en quelques jours au lieu de plusieurs semaines.</span> Le suivi en temps réel a complètement transformé notre pilotage. »
                </p>
                <p className="text-gray-600 font-medium mt-8">— Responsable opérations, mandataire CEE</p>
              </div>
            </div>

            {/* Bento d'images */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="col-span-2 h-[220px] rounded-[2rem] overflow-hidden">
                <img src="/img/photo-1460925895917-800x600.jpg" alt="Opérations CEE pilotées" loading="lazy" decoding="async" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
              <div className="h-[184px] rounded-[2rem] overflow-hidden">
                <img src="/reporting-conformite.jpg" alt="Reporting et conformité" loading="lazy" decoding="async" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
              <Link to="/about" aria-label="En savoir plus sur FinancesHome" className="h-[184px] rounded-[2rem] overflow-hidden bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
                <ArrowRight className="w-8 h-8 text-gray-500" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <section id="faq" className="section-padding" style={{ background: 'var(--light-grey)' }}>
          <div className="padding-global" style={{ maxWidth: '52rem', margin: '0 auto' }}>
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewOpts}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              style={{ textAlign: 'center', marginBottom: '3rem' }}
            >
              <motion.div variants={fadeUp} className="tagline-pill" style={{ display: 'inline-block' }}>FAQ</motion.div>
              <motion.h2 variants={fadeUp}>Questions fréquentes</motion.h2>
            </motion.div>

            <div style={{ borderBottom: '1px solid var(--border-gray)' }}>
              {faqs.map((item, i) => (
                <FaqItem
                  key={i}
                  item={item}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── CALENDLY ─────────────────────────────────────────── */}
        <section id="calendly" className="section-padding" style={{ background: 'var(--white)' }}>
          <div className="padding-global" style={{ maxWidth: '105rem', margin: '0 auto' }}>
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewOpts}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              style={{ textAlign: 'center', marginBottom: '3rem' }}
            >
              <motion.div variants={fadeUp} className="tagline-pill" style={{ display: 'inline-block' }}>Prendre rendez-vous</motion.div>
              <motion.h2 variants={fadeUp} style={{ marginBottom: '1rem' }}>
                Audit CEE gratuit — 30 minutes
              </motion.h2>
              <motion.p variants={fadeUp} style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '32rem', margin: '0 auto' }}>
                Échangez avec notre équipe pour identifier vos gisements CEE, estimer votre potentiel et découvrir comment FinancesHome peut maximiser vos opérations.
              </motion.p>
            </motion.div>

            <div
              ref={calendlyRef}
              style={{ minWidth: '320px', height: '700px' }}
            />
          </div>
        </section>

      </div>
    </>
  );
};

export default HomePage;
