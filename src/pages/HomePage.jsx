import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/* ─── Variants d'animation ─────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const stagger = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay } },
});

const viewOpts = { once: true, margin: '-60px' };

/* ─── Données ──────────────────────────────────────────────────────────── */

const services = [
  {
    id: 1,
    name: 'Orchestration administrative',
    heading: 'De la qualification à la validation — sans friction.',
    description:
      'FinancesHome pilote l\'ensemble du cycle documentaire CEE : sélection des fiches applicables, contrôle des pièces requises, coordination avec les obligés et suivi de la validation. Chaque opération est tracée, chaque étape est sécurisée.',
    tag: 'AdminFlow',
    image: '/orchestration-admin.jpg',
    slug: 'orchestration',
  },
  {
    id: 2,
    name: 'Financement accéléré',
    heading: 'Trésorerie libérée en 5 jours ouvrés.',
    description:
      'FastPay et InvestPay permettent aux producteurs et mandataires de monétiser leurs créances CEE validées sans attendre les délais standard (30–90 jours). Le financement est structuré selon le profil de l\'acteur et la nature de l\'opération.',
    tag: 'FastPay',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop',
    slug: 'financement',
  },
  {
    id: 3,
    name: 'Marketplace privée CEE',
    heading: 'Un marché structuré pour partenaires qualifiés.',
    description:
      'La marketplace FinancesHome connecte producteurs, mandataires, acheteurs CEE et partenaires financiers dans un environnement sécurisé. Les créances sont standardisées, les contreparties vérifiées, les transactions traçables.',
    tag: 'Marketplace',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    slug: 'marketplace',
  },
  {
    id: 4,
    name: 'Reporting & conformité',
    heading: 'Pilotage en temps réel, audit simplifié.',
    description:
      'Tableaux de bord opérationnels, exports réglementaires, historique complet des opérations : FinancesHome donne à chaque acteur une visibilité totale sur ses dossiers, ses flux financiers et ses obligations de conformité.',
    tag: 'Conformité',
    image: '/reporting-conformite.jpg',
    slug: 'conformite',
  },
];

const stats = [
  { value: '2 Md€', label: 'Marché CEE annuel en France', sub: 'levier de la transition énergétique' },
  { value: '5j', label: 'Délai de paiement producteur', sub: 'via FastPay ou InvestPay (vs 30–90j standard)' },
  { value: '4', label: 'Modes de financement', sub: 'adaptés à chaque profil d\'acteur' },
  { value: '14', label: 'Pays membres couverts', sub: 'obligations d\'efficacité énergétique (OEE)' },
];

const team = [
  {
    name: 'Kendji',
    title: 'CEO & Fondateur',
    bio: 'Expert dans le domaine des CEE et l\'orchestration financière. Kendji pilote la vision stratégique et le développement commercial de FinancesHome.',
    initials: 'K',
    color: '#5e17eb',
    image: '/kendji.png',
  },
  /*{
    name: '',
    title: 'COO',
    bio: 'Supervise les opérations quotidiennes et coordonne les équipes afin d\'assurer la performance et l\'efficacité de la structure.',
    initials: 'K',
    color: '#171717',
  },*/
  {
    name: 'Meddy',
    title: 'CTO',
    bio: 'Responsable technique en charge du développement des systèmes, de l\'architecture plateforme et du lead développement web.',
    initials: 'M',
    color: '#2d6a4f',
    image: '/meddy.png',
  },
  {
    name: 'Melissa',
    title: 'Responsable conformité',
    bio: 'Garante de la conformité réglementaire de la plateforme — MiFID II, RGPD et cadre CEE — en lien avec les partenaires institutionnels.',
    initials: 'M',
    color: '#c77dff',
    image: '/melissa.png',
  },
];

const faqs = [
  {
    q: 'Qui peut accéder à la plateforme FinancesHome ?',
    a: 'La plateforme est ouverte aux producteurs CEE (installateurs, mandataires), aux acheteurs d\'obligations (obligés), aux bénéficiaires finaux et aux partenaires financiers qualifiés (investisseurs, fonds). Un processus KYC est requis pour chaque catégorie.',
  },
  {
    q: 'Comment fonctionne le financement accéléré (FastPay) ?',
    a: 'FastPay permet de céder une créance CEE validée à un partenaire financier moyennant une décote négociée. Le règlement intervient en 5 jours ouvrés, sans recours contre le producteur cédant. Le processus est 100% digital sur la plateforme.',
  },
  {
    q: 'FinancesHome est-elle réglementée ?',
    a: 'FinancesHome est une plateforme d\'orchestration administrative. Elle n\'exerce pas d\'activité de prestation de services d\'investissement (MiFID II) ni d\'activité de crédit au sens de la directive 2008/48/CE. Les opérations de financement sont portées par des partenaires agréés.',
  },
  {
    q: 'Dans quels pays le dispositif est-il disponible ?',
    a: 'Le dispositif des obligations d\'efficacité énergétique (OEE) couvre 14 pays membres de l\'UE. FinancesHome opère actuellement en France et déploie progressivement son infrastructure dans les autres marchés.',
  },
];

/* ─── Composants ───────────────────────────────────────────────────────── */

function ServiceAccordion({ service, isOpen, onToggle }) {
  return (
    <div className="service-accordion">
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 1.5rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: '1rem',
        }}
      >
        <span style={{ fontSize: '1.125rem', fontWeight: 500, color: 'var(--black)' }}>
          {service.name}
        </span>
        <span
          style={{
            width: '2rem',
            height: '2rem',
            borderRadius: '100rem',
            border: '1px solid var(--border-gray)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'transform 0.3s',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            fontSize: '1.25rem',
            color: 'var(--black)',
          }}
        >
          +
        </span>
      </button>

      {isOpen && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            padding: '0 1.5rem 2rem',
          }}
          className="service-content-grid"
        >
          <div
            style={{
              borderRadius: '1.5rem',
              overflow: 'hidden',
              aspectRatio: '4/3',
            }}
          >
            <img
              src={service.image}
              alt={service.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
            <span className="tagline-pill" style={{ alignSelf: 'flex-start' }}>{service.tag}</span>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 500, lineHeight: 1.25 }}>{service.heading}</h3>
            <p style={{ fontSize: '0.9375rem', color: 'var(--muted)', lineHeight: 1.65 }}>{service.description}</p>
            <Link
              to={`/nos-services#${service.slug}`}
              className="btn-secondary"
              style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}
            >
              En savoir plus
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 767px) {
          .service-content-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

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
  const [openService, setOpenService] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <Helmet>
        <title>FinancesHome — Orchestration CEE</title>
        <meta name="description" content="Plateforme d'orchestration administrative et financière des Certificats d'Économies d'Énergie. 14 pays membres." />
      </Helmet>

      <div style={{ background: 'var(--light-grey)' }}>

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section
          id="hero"
          style={{
            paddingTop: '10rem',
            paddingBottom: '5rem',
            background: 'var(--light-grey)',
          }}
        >
          <div
            className="padding-global"
            style={{
              maxWidth: '105rem',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '4rem',
              alignItems: 'center',
            }}
          >
            {/* Left */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            >
              <motion.div variants={fadeUp} className="tagline-pill" style={{ display: 'inline-block' }}>
                Bienvenue chez FinancesHome
              </motion.div>
              <motion.h1 variants={fadeUp} style={{ marginBottom: '1.5rem' }}>
                Orchestration administrative &amp; financière CEE.
              </motion.h1>
              <motion.p
                variants={fadeUp}
                style={{
                  fontSize: '1.0625rem',
                  color: 'var(--muted)',
                  lineHeight: 1.7,
                  maxWidth: '32rem',
                  marginBottom: '2.25rem',
                }}
              >
                FinancesHome industrialise le traitement des opérations d'économies d'énergie — de la qualification à la validation — en connectant producteurs, mandataires, obligés et partenaires financiers autour d'une infrastructure centralisée et conforme.
              </motion.p>
              <motion.div variants={fadeUp} style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
                <a href="https://app.financeshome.com/register" target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Inscription
                </a>
                <a href="/contact" className="btn-secondary">
                  Contact
                </a>
              </motion.div>
            </motion.div>

            {/* Right — hero image */}
            <motion.div
              style={{ position: 'relative' }}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <img
                src="https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=1200&h=800&fit=crop"
                alt="FinancesHome plateforme - Transition énergétique"
                style={{
                  width: '100%',
                  height: '32rem',
                  objectFit: 'cover',
                  borderRadius: '3rem',
                  display: 'block',
                }}
              />
            </motion.div>
          </div>

          <style>{`
            @media (max-width: 991px) {
              #hero > div { grid-template-columns: 1fr !important; }
              #hero img { height: 22rem !important; }
            }
          `}</style>
        </section>

        {/* ── FRICTIONS OPÉRATIONNELLES ───────────────────────────── */}
        <section
          id="frictions"
          className="section-padding"
          style={{ background: 'var(--white)' }}
        >
          <div className="padding-global" style={{ maxWidth: '105rem', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '5rem',
                alignItems: 'center',
              }}
              className="frictions-grid"
            >
              {/* Photo gauche */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={viewOpts} variants={fadeUp}
                style={{ borderRadius: '2rem', overflow: 'hidden' }}
              >
                <img
                  src="/frictions-image.jpg"
                  alt="Femme portant un casque de sécurité tenant un document — complexité opérationnelle CEE"
                  style={{
                    width: '100%',
                    height: '28rem',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </motion.div>

              {/* Texte droite */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={viewOpts}
                variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              >
                <motion.h2 variants={fadeUp} style={{ marginBottom: '1.25rem' }}>
                  Un dispositif puissant, ralenti par ses frictions opérationnelles
                </motion.h2>
                <motion.p variants={fadeUp} style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
                  Le mécanisme CEE fonctionne — mais dans les 14 pays membres du dispositif d'obligations d'efficacité énergétique, la complexité documentaire, la multiplicité des interlocuteurs et l'absence de pilotage standardisé entraînent des pertes de marge, des retards et des volumes non captés.
                </motion.p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {[
                    { title: 'Délais de paiement de 30 à 90 jours', desc: 'Trésorerie bloquée pour les installateurs et mandataires pendant toute la durée du cycle.' },
                    { title: 'Complexité documentaire et risques de rejet', desc: 'Multiplicité des pièces requises, des fiches CEE applicables et des exigences des obligés.' },
                    { title: 'Multi-interlocuteurs sans orchestration', desc: 'Bénéficiaire, installateur, mandataire, acheteur CEE : chacun gère sa partie de façon isolée.' },
                    { title: 'Absence de marché structuré de créances', desc: 'Aucun mécanisme standardisé pour céder, financer ou monétiser les créances CEE validées.' },
                    { title: 'Pilotage et traçabilité insuffisants', desc: 'Pas de reporting unifié, pas d\'audit trail centralisé, pas de suivi SLA entre les parties.' },
                  ].map((item, i) => (
                    <motion.li key={i} variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--black)' }}>{item.title}</span>
                      <span style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.6 }}>{item.desc}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          <style>{`
            @media (max-width: 767px) {
              .frictions-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
            }
          `}</style>
        </section>

        {/* ── SERVICES ─────────────────────────────────────────────── */}
        <section
          id="processus"
          className="section-padding"
          style={{ background: 'var(--light-grey)' }}
        >
          <div className="padding-global" style={{ maxWidth: '105rem', margin: '0 auto' }}>
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewOpts}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              style={{ maxWidth: '40rem', marginBottom: '3rem' }}
            >
              <motion.div variants={fadeUp} className="tagline-pill" style={{ display: 'inline-block' }}>Qu'est-ce que l'on fait ?</motion.div>
              <motion.h2 variants={fadeUp} style={{ marginBottom: '1rem' }}>Nos services</motion.h2>
              <motion.p variants={fadeUp} style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                FinancesHome structure la chaîne de bout en bout : orchestration administrative, exécution financière sécurisée, et marketplace privée pour partenaires qualifiés.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={viewOpts}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
            >
              {services.map((s, i) => (
                <motion.div key={s.id} variants={fadeUp}>
                  <ServiceAccordion
                    service={s}
                    isOpen={openService === i}
                    onToggle={() => setOpenService(openService === i ? null : i)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── STATS ────────────────────────────────────────────────── */}
        <section
          id="marche"
          className="section-padding"
          style={{ background: 'var(--white)' }}
        >
          <div className="padding-global" style={{ maxWidth: '105rem', margin: '0 auto' }}>
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewOpts}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              style={{ maxWidth: '40rem', marginBottom: '3rem' }}
            >
              <motion.div variants={fadeUp} className="tagline-pill" style={{ display: 'inline-block' }}>Le marché</motion.div>
              <motion.h2 variants={fadeUp}>Chiffres clés du dispositif CEE</motion.h2>
            </motion.div>

            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial="hidden" whileInView="visible" viewport={viewOpts}
                  variants={stagger(i * 0.08)}
                  style={{ background: 'var(--light-grey)', borderRadius: '2rem', padding: '2.25rem 2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
                >
                  <span style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--black)', lineHeight: 1 }}>{s.value}</span>
                  <p style={{ fontSize: '0.9375rem', fontWeight: 500, color: 'var(--black)', margin: 0 }}>{s.label}</p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>{s.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <style>{`
            @media (max-width: 991px) {
              .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (max-width: 599px) {
              .stats-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </section>

        {/* ── ACTEURS ──────────────────────────────────────────────── */}
        <section
          id="acteurs"
          className="section-padding"
          style={{ background: 'var(--light-grey)' }}
        >
          <div className="padding-global" style={{ maxWidth: '105rem', margin: '0 auto' }}>
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewOpts}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              style={{ maxWidth: '40rem', marginBottom: '3rem' }}
            >
              <motion.div variants={fadeUp} className="tagline-pill" style={{ display: 'inline-block' }}>Pour qui ?</motion.div>
              <motion.h2 variants={fadeUp} style={{ marginBottom: '1rem' }}>Les acteurs de la plateforme</motion.h2>
              <motion.p variants={fadeUp} style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                FinancesHome est conçue pour tous les acteurs du cycle CEE — en France et dans les 14 pays membres du dispositif d'obligations d'efficacité énergétique.
              </motion.p>
            </motion.div>

            <div className="actors-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              {[
                { icon: '🏗️', title: 'Producteurs', subtitle: 'Installateurs & mandataires', desc: 'Déposez vos dossiers CEE, suivez leur avancement en temps réel et débloquez votre trésorerie en 5 jours ouvrés grâce au financement accéléré.' },
                { icon: '⚡', title: 'Obligés', subtitle: 'Acheteurs de CEE', desc: 'Accédez à un flux standardisé de créances CEE qualifiées et conformes, sans gestion documentaire interne.' },
                { icon: '💼', title: 'Partenaires financiers', subtitle: 'Investisseurs & fonds', desc: 'Financez des créances CEE validées avec une visibilité complète sur les actifs sous-jacents et un rendement ajusté au risque.' },
              ].map((a, i) => (
                <motion.div
                  key={i}
                  initial="hidden" whileInView="visible" viewport={viewOpts}
                  variants={stagger(i * 0.1)}
                  style={{ background: 'var(--white)', borderRadius: '2rem', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', border: '1px solid var(--border-gray)' }}
                >
                  <span style={{ fontSize: '2rem' }}>{a.icon}</span>
                  <div>
                    <p style={{ fontSize: '1.0625rem', fontWeight: 600, margin: 0 }}>{a.title}</p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--muted)', margin: '0.125rem 0 0' }}>{a.subtitle}</p>
                  </div>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>{a.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <style>{`
            @media (max-width: 767px) {
              .actors-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </section>

        {/* ── MARKETPLACE ──────────────────────────────────────────── */}
        <section
          id="marketplace"
          className="section-padding"
          style={{ background: 'var(--white)' }}
        >
          <div className="padding-global" style={{ maxWidth: '105rem', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '5rem',
                alignItems: 'center',
              }}
              className="marketplace-grid"
            >
              {/* Photo gauche */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={viewOpts} variants={fadeUp}
                style={{
                  borderRadius: '2rem',
                  overflow: 'hidden',
                  aspectRatio: '4/3',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
                  alt="Marketplace CEE - flux et transactions"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </motion.div>

              {/* Right text */}
              <div>
                <div className="tagline-pill">Marketplace</div>
                <h2 style={{ marginBottom: '1.25rem' }}>Un marché structuré pour les CEE</h2>
                <p style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
                  La marketplace FinancesHome connecte producteurs, mandataires, acheteurs et partenaires financiers dans un environnement sécurisé. Les créances sont standardisées, les contreparties vérifiées, les transactions traçables.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    'Créances CEE standardisées et vérifiées',
                    'Contreparties KYC qualifiées',
                    'Règlement sécurisé sous 5 jours ouvrés',
                    'Reporting complet et traçabilité full-audit',
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9375rem', color: 'var(--black)' }}>
                      <span
                        style={{
                          width: '1.25rem',
                          height: '1.25rem',
                          borderRadius: '100rem',
                          background: 'var(--violet)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <style>{`
            @media (max-width: 767px) {
              .marketplace-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
            }
          `}</style>
        </section>

        {/* ── INVESTISSEURS ─────────────────────────────────────────── */}
        <section
          id="investisseurs"
          className="section-padding"
          style={{ background: 'var(--light-grey)' }}
        >
          <div className="padding-global" style={{ maxWidth: '105rem', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '5rem',
                alignItems: 'center',
              }}
              className="investisseurs-grid"
            >
              {/* Contenu gauche */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={viewOpts}
                variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              >
                <motion.div variants={fadeUp} className="tagline-pill" style={{ display: 'inline-block' }}>
                  Investisseurs
                </motion.div>
                <motion.h2 variants={fadeUp} style={{ marginBottom: '1.25rem' }}>
                  Portail investisseur : financez des créances CEE qualifiées
                </motion.h2>
                <motion.p variants={fadeUp} style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
                  Accédez au portail investisseur FinancesHome : dashboard avec métriques clés, indicateurs de risque, calendrier de remboursement et documentation complète. Financez des créances CEE validées avec une visibilité totale sur les actifs sous-jacents.
                </motion.p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    'Dashboard avec métriques clés et performances en temps réel',
                    'Indicateurs de risque transparents par projet',
                    'Calendrier de remboursement et alertes échéances',
                    'Documentation complète et audit trail',
                    'Processus KYC intégré — validation sous 48-72h',
                  ].map((item, i) => (
                    <motion.li key={i} variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9375rem', color: 'var(--black)' }}>
                      <span
                        style={{
                          width: '1.25rem',
                          height: '1.25rem',
                          borderRadius: '100rem',
                          background: 'var(--violet)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
                <motion.div variants={fadeUp} style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
                  <Link to="/investor-access" className="btn-secondary">
                    Voir plus
                  </Link>
                  <Link to="/investor-access#investor-form" className="btn-primary">
                    Demander l'accès investisseur
                  </Link>
                </motion.div>
              </motion.div>

              {/* Visuel droit */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={viewOpts} variants={fadeUp}
                style={{
                  background: 'var(--white)',
                  borderRadius: '2rem',
                  padding: '2.5rem',
                  border: '1px solid var(--border-gray)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                }}
              >
                {[
                  { label: 'Dashboard', value: 'Métriques & indicateurs' },
                  { label: 'KYC', value: 'Validation 48-72h' },
                  { label: 'Rendement', value: 'Ajusté au risque' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--muted)', fontWeight: 500 }}>{item.label}</span>
                    <span style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--black)' }}>{item.value}</span>
                  </div>
                ))}
                <div
                  style={{
                    marginTop: '0.5rem',
                    padding: '1.5rem',
                    background: 'var(--light-grey)',
                    borderRadius: '1rem',
                    fontSize: '2.5rem',
                    fontWeight: 700,
                    color: 'var(--violet)',
                    textAlign: 'center',
                    opacity: 0.9,
                  }}
                >
                  💼
                </div>
              </motion.div>
            </div>
          </div>

          <style>{`
            @media (max-width: 767px) {
              .investisseurs-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
            }
          `}</style>
        </section>

        {/* ── TEAM ─────────────────────────────────────────────────── */}
        <section
          id="team"
          className="section-padding"
          style={{ background: 'var(--light-grey)' }}
        >
          <div className="padding-global" style={{ maxWidth: '105rem', margin: '0 auto' }}>
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewOpts}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              style={{ marginBottom: '3rem' }}
            >
              <motion.div variants={fadeUp} className="tagline-pill" style={{ display: 'inline-block' }}>L'équipe</motion.div>
              <motion.h2 variants={fadeUp}>La team</motion.h2>
            </motion.div>

            <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
              {team.map((member, i) => (
                <motion.div
                  key={i}
                  initial="hidden" whileInView="visible" viewport={viewOpts}
                  variants={stagger(i * 0.1)}
                  style={{ background: 'var(--white)', borderRadius: '2rem', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid var(--border-gray)' }}
                >
                  <div style={{ width: '100%', aspectRatio: '4/3', borderRadius: '1.25rem', background: member.color, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    {member.image ? (
                      <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }} />
                    ) : (
                      <span style={{ fontSize: '3.5rem', fontWeight: 700, color: 'rgba(255,255,255,0.25)', letterSpacing: '-0.05em' }}>{member.initials}</span>
                    )}
                  </div>
                  <div>
                    <p style={{ fontSize: '1.0625rem', fontWeight: 600, margin: 0 }}>{member.name}</p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--muted)', margin: '0.2rem 0 0' }}>{member.title}</p>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <style>{`
            @media (max-width: 991px) {
              .team-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (max-width: 599px) {
              .team-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section
          id="faq"
          className="section-padding"
          style={{ background: 'var(--white)' }}
        >
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

        {/* ── CTA FINAL ────────────────────────────────────────────── */}
        <section
          id="contact"
          className="section-padding"
          style={{ background: 'var(--light-grey)' }}
        >
          <div className="padding-global" style={{ maxWidth: '105rem', margin: '0 auto' }}>
            <div
              style={{
                background: 'var(--black)',
                borderRadius: '3rem',
                padding: '5rem 4rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
              }}
            >
              <motion.div
                initial="hidden" whileInView="visible" viewport={viewOpts}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
              >
                <motion.div variants={fadeUp} className="tagline-pill" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}>
                  Rejoignez la plateforme
                </motion.div>
                <motion.h2 variants={fadeUp} style={{ color: '#fff', maxWidth: '32rem' }}>
                  Prêt à industrialiser vos opérations CEE ?
                </motion.h2>
                <motion.p variants={fadeUp} style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', maxWidth: '30rem', lineHeight: 1.7 }}>
                  Inscription gratuite. Accès à la plateforme en quelques minutes. Paiement accéléré dès la première opération validée.
                </motion.p>
                <motion.div variants={fadeUp} style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <a href="https://app.financeshome.com/register" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ background: '#fff', color: 'var(--black)' }}>
                    S'inscrire
                  </a>
                  <a href="/contact" className="btn-secondary" style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#fff' }}>
                    Nous contacter
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default HomePage;
