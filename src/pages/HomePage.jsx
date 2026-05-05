import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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

        {/* ── HERO — VIDEO BACKGROUND ──────────────────────────── */}
        <section
          id="hero"
          style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Vidéo de fond */}
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
            }}
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>

          {/* Overlay sombre */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.28) 100%)',
              zIndex: 1,
            }}
          />

          {/* Contenu centré */}
          <div
            className="padding-global"
            style={{
              position: 'relative',
              zIndex: 2,
              maxWidth: '72rem',
              margin: '0 auto',
              textAlign: 'center',
              paddingTop: '8rem',
              paddingBottom: '6rem',
            }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            >
              {/* Badge */}
              <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '100rem',
                    padding: '0.35rem 1rem',
                    fontSize: '0.8125rem',
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  <span
                    style={{
                      width: '0.4rem',
                      height: '0.4rem',
                      borderRadius: '100rem',
                      background: 'var(--violet)',
                      display: 'inline-block',
                    }}
                  />
                  Nouvelle plateforme CEE — disponible
                </div>
              </motion.div>

              {/* Titre */}
              <motion.h1
                variants={fadeUp}
                style={{
                  color: '#fff',
                  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                  fontWeight: 500,
                  lineHeight: 1.1,
                  marginBottom: '1.5rem',
                  letterSpacing: '-0.02em',
                }}
              >
                Optimisez vos CEE.{' '}
                <span style={{ color: 'var(--violet)' }}>Gagnez plus.</span>
                <br />
                Sans complexité.
              </motion.h1>

              {/* Sous-titre */}
              <motion.p
                variants={fadeUp}
                style={{
                  fontSize: '1.125rem',
                  color: 'rgba(255,255,255,0.72)',
                  lineHeight: 1.7,
                  maxWidth: '38rem',
                  margin: '0 auto 2.5rem',
                }}
              >
                FinancesHome simplifie, sécurise et maximise vos opérations CEE grâce à un écosystème complet, de l'audit jusqu'au paiement.
              </motion.p>

              {/* Boutons */}
              <motion.div
                variants={fadeUp}
                style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}
              >
                <a href="#calendly" className="btn-primary" style={{ fontSize: '0.9375rem', padding: '0.875rem 1.75rem' }}>
                  Audit CEE gratuit (30 min) →
                </a>
                <a href="#solution" className="btn-secondary" style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontSize: '0.9375rem', padding: '0.875rem 1.75rem' }}>
                  ▶ Découvrir la plateforme
                </a>
              </motion.div>
            </motion.div>

            {/* Dashboard CRM aperçu */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              style={{
                marginTop: '3.5rem',
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '1.5rem',
                overflow: 'hidden',
                maxWidth: '860px',
                margin: '3.5rem auto 0',
                boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
              }}
            >
              {/* Barre navigateur */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.625rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.25)' }}>
                <div style={{ display: 'flex', gap: '0.375rem' }}>
                  {['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0.2)'].map((c, i) => (
                    <span key={i} style={{ width: '0.5rem', height: '0.5rem', borderRadius: '100rem', background: c, display: 'block' }} />
                  ))}
                </div>
                <span style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.45)', fontFamily: 'monospace' }}>app.financeshome.fr/dashboard</span>
                <span />
              </div>

              {/* Corps du dashboard */}
              <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr' }}>
                {/* Sidebar */}
                <div style={{ borderRight: '1px solid rgba(255,255,255,0.08)', padding: '1rem 0.75rem', background: 'rgba(0,0,0,0.15)' }}>
                  <div style={{ fontSize: '0.5625rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', marginBottom: '0.625rem', paddingLeft: '0.5rem' }}>Espace</div>
                  {[
                    { label: 'Dashboard', active: true },
                    { label: 'Dossiers', active: false },
                    { label: 'Mobility', active: false },
                    { label: 'Production', active: false },
                    { label: 'Diagnostic', active: false },
                    { label: 'Paiements', active: false },
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '0.4rem 0.625rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.6875rem',
                        fontWeight: item.active ? 500 : 400,
                        color: item.active ? '#fff' : 'rgba(255,255,255,0.4)',
                        background: item.active ? 'rgba(94,23,235,0.35)' : 'transparent',
                        marginBottom: '0.125rem',
                      }}
                    >
                      {item.label}
                    </div>
                  ))}
                </div>

                {/* Contenu principal */}
                <div style={{ padding: '1.25rem' }}>
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.625rem', color: 'rgba(255,255,255,0.4)' }}>Vue d'ensemble</div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff' }}>CEE — Trimestre en cours</div>
                    </div>
                  </div>

                  {/* KPI cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.625rem', marginBottom: '1rem' }}>
                    {[
                      { label: 'CEE validés', value: '1 248 GWhc', delta: '+18%' },
                      { label: 'Revenus générés', value: '€ 842K', delta: '+24%' },
                      { label: "Taux d'acceptation", value: '97,4 %', delta: '+3,2pt' },
                    ].map((kpi, i) => (
                      <div
                        key={i}
                        style={{
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '0.75rem',
                          padding: '0.75rem',
                        }}
                      >
                        <div style={{ fontSize: '0.5625rem', color: 'rgba(255,255,255,0.45)', marginBottom: '0.375rem' }}>{kpi.label}</div>
                        <div style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', lineHeight: 1.1 }}>{kpi.value}</div>
                        <div style={{ fontSize: '0.5625rem', color: 'var(--violet)', marginTop: '0.25rem', fontWeight: 500 }}>{kpi.delta}</div>
                      </div>
                    ))}
                  </div>

                  {/* Graphique */}
                  <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '0.875rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
                      <span style={{ fontSize: '0.625rem', fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>Évolution des dossiers validés</span>
                      <span style={{ fontSize: '0.5625rem', color: 'rgba(255,255,255,0.35)' }}>12 mois</span>
                    </div>
                    <svg viewBox="0 0 500 100" style={{ width: '100%', height: '70px', display: 'block' }}>
                      <defs>
                        <linearGradient id="heroGrad" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#5e17eb" stopOpacity="0.45" />
                          <stop offset="100%" stopColor="#5e17eb" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0,85 L42,78 L83,70 L125,74 L167,58 L208,62 L250,46 L292,42 L333,30 L375,34 L417,20 L458,15 L500,8 L500,100 L0,100 Z" fill="url(#heroGrad)" />
                      <path d="M0,85 L42,78 L83,70 L125,74 L167,58 L208,62 L250,46 L292,42 L333,30 L375,34 L417,20 L458,15 L500,8" stroke="#5e17eb" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
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

        {/* ── PLATEFORME — DASHBOARD ───────────────────────────── */}
        <section id="produit" className="section-padding" style={{ background: 'var(--white)' }}>
          <div className="padding-global" style={{ maxWidth: '105rem', margin: '0 auto' }}>
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewOpts}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              style={{ maxWidth: '40rem', marginBottom: '3.5rem' }}
            >
              <motion.span variants={fadeUp} className="tagline-pill">Plateforme</motion.span>
              <motion.h2 variants={fadeUp}>Une plateforme pensée pour la performance</motion.h2>
            </motion.div>

            <div className="produit-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
              {/* Dashboard mockup */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={viewOpts} variants={fadeUp}
                style={{
                  background: 'var(--light-grey)',
                  border: '1px solid var(--border-gray)',
                  borderRadius: '2rem',
                  overflow: 'hidden',
                  boxShadow: '0 4px 40px rgba(0,0,0,0.08)',
                }}
              >
                {/* Barre navigateur */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--border-gray)', background: 'var(--white)' }}>
                  <div style={{ display: 'flex', gap: '0.375rem' }}>
                    {['#e5e5e5', '#e5e5e5', '#e5e5e5'].map((c, i) => (
                      <span key={i} style={{ width: '0.625rem', height: '0.625rem', borderRadius: '100rem', background: c, display: 'block' }} />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--muted)', fontFamily: 'monospace' }}>app.financeshome.fr/dashboard</span>
                  <span />
                </div>
                {/* Dossiers */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-gray)', background: 'var(--white)' }}>
                    <span style={{ fontSize: '0.9375rem', fontWeight: 500 }}>Dossiers récents</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>24 actifs</span>
                  </div>
                  {[
                    { nom: 'Industrie Bertrand', ref: 'FH-2841', status: 'Validé', dot: 'var(--violet)' },
                    { nom: 'Logistique Vannier', ref: 'FH-2840', status: 'En instruction', dot: '#bbb' },
                    { nom: 'Bâtiment Lefort', ref: 'FH-2839', status: 'Validé', dot: 'var(--violet)' },
                    { nom: 'Immobilier Ouest', ref: 'FH-2838', status: 'À compléter', dot: '#ddd' },
                  ].map((d, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.875rem 1.25rem',
                        borderBottom: i < 3 ? '1px solid var(--border-gray)' : 'none',
                        background: 'var(--white)',
                      }}
                    >
                      <div>
                        <p style={{ fontSize: '0.875rem', fontWeight: 500, margin: 0 }}>{d.nom}</p>
                        <p style={{ fontSize: '0.6875rem', color: 'var(--muted)', margin: '0.1rem 0 0', fontFamily: 'monospace' }}>{d.ref}</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ width: '0.5rem', height: '0.5rem', borderRadius: '100rem', background: d.dot, display: 'block' }} />
                        <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{d.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Feature cards */}
              <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                {featuresPlat.map((f, i) => (
                  <motion.div
                    key={i}
                    initial="hidden" whileInView="visible" viewport={viewOpts}
                    variants={stagger(i * 0.1)}
                    style={{
                      background: 'var(--light-grey)',
                      border: '1px solid var(--border-gray)',
                      borderRadius: '1.5rem',
                      padding: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                    }}
                  >
                    <div
                      style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '0.875rem',
                        background: 'rgba(94,23,235,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1rem',
                        color: 'var(--violet)',
                        marginBottom: '0.25rem',
                      }}
                    >
                      ▣
                    </div>
                    <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--black)', margin: 0 }}>{f.titre}</p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <style>{`
            @media (max-width: 991px) {
              .produit-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
              .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (max-width: 599px) {
              .features-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
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
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
                  alt="Marketplace CEE - flux et transactions"
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
