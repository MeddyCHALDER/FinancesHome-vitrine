import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay } },
});

const viewOpts = { once: true, margin: '-60px' };

const servicesData = [
  {
    id: 'orchestration',
    tag: 'AdminFlow',
    name: 'Orchestration administrative',
    heading: 'De la qualification à la validation — sans friction.',
    description:
      'FinancesHome pilote l\'ensemble du cycle documentaire CEE : sélection des fiches applicables, contrôle des pièces requises, coordination avec les obligés et suivi de la validation. Chaque opération est tracée, chaque étape est sécurisée.',
    image: '/orchestration-admin.jpg',
    details: [
      'Identification automatique des fiches CEE applicables selon le type de projet et la zone géographique',
      'Workflow de contrôle documentaire avec validation en plusieurs étapes et alertes en cas d\'écart',
      'Coordination centralisée avec les obligés : dépôt, suivi des délais, relances automatisées',
      'Traçabilité complète : horodatage, historique des modifications, export pour audits',
      'Interface unique pour tous les acteurs (producteur, mandataire, obligé) avec droits différenciés',
    ],
  },
  {
    id: 'financement',
    tag: 'FastPay',
    name: 'Financement accéléré',
    heading: 'Trésorerie libérée en 5 jours ouvrés.',
    description:
      'FastPay et InvestPay permettent aux producteurs et mandataires de monétiser leurs créances CEE validées sans attendre les délais standard (30–90 jours). Le financement est structuré selon le profil de l\'acteur et la nature de l\'opération.',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop',
    details: [
      'Cession de créance CEE validée à un partenaire financier qualifié',
      'Règlement sous 5 jours ouvrés après acceptation du dossier',
      'Sans recours contre le cédant : le risque de rejet incombe au financeur',
      'Décote négociée selon le profil, la maturité et le volume',
      'Processus 100% digital : signature électronique, virements sécurisés',
    ],
  },
  {
    id: 'marketplace',
    tag: 'Marketplace',
    name: 'Marketplace privée CEE',
    heading: 'Un marché structuré pour partenaires qualifiés.',
    description:
      'La marketplace FinancesHome connecte producteurs, mandataires, acheteurs CEE et partenaires financiers dans un environnement sécurisé. Les créances sont standardisées, les contreparties vérifiées, les transactions traçables.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    details: [
      'Créances CEE standardisées : format commun, vérification qualité, volume agrégé',
      'Contreparties KYC qualifiées : producteurs, obligés et financeurs pré-vérifiés',
      'Matching automatisé entre offre et demande selon critères (friche, volume, zone)',
      'Règlement sécurisé sous 5 jours ouvrés avec traçabilité blockchain',
      'Reporting complet et audit trail pour conformité réglementaire',
    ],
  },
  {
    id: 'conformite',
    tag: 'Conformité',
    name: 'Reporting & conformité',
    heading: 'Pilotage en temps réel, audit simplifié.',
    description:
      'Tableaux de bord opérationnels, exports réglementaires, historique complet des opérations : FinancesHome donne à chaque acteur une visibilité totale sur ses dossiers, ses flux financiers et ses obligations de conformité.',
    image: '/reporting-conformite.jpg',
    details: [
      'Dashboards personnalisables par rôle : producteur, mandataire, obligé, financeur',
      'Exports réglementaires prêts pour les contrôles DGCCRF et ATR',
      'Historique complet : chaque action horodatée avec utilisateur identifié',
      'Signatures électroniques conformes eIDAS pour engagements et mandats',
      'Workflow d\'approbations multi-niveaux avec escalade automatique',
    ],
  },
];

const NosServicesPage = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash?.slice(1);
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Nos Services — Orchestration, Financement, Marketplace & Conformité | FinancesHome</title>
        <meta
          name="description"
          content="Découvrez les 4 piliers FinancesHome : orchestration administrative CEE, financement accéléré FastPay, marketplace privée, reporting et conformité."
        />
      </Helmet>

      <div style={{ background: 'var(--light-grey)' }}>
        {/* Hero */}
        <section
          style={{
            paddingTop: '10rem',
            paddingBottom: '5rem',
            background: 'var(--light-grey)',
          }}
        >
          <div className="padding-global" style={{ maxWidth: '105rem', margin: '0 auto', textAlign: 'center' }}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            >
              <motion.div variants={fadeUp} className="tagline-pill" style={{ display: 'inline-block' }}>
                Nos services
              </motion.div>
              <motion.h1 variants={fadeUp} style={{ marginBottom: '1.5rem', maxWidth: '40rem', marginLeft: 'auto', marginRight: 'auto' }}>
                Quatre piliers pour industrialiser vos opérations CEE
              </motion.h1>
              <motion.p
                variants={fadeUp}
                style={{
                  fontSize: '1.0625rem',
                  color: 'var(--muted)',
                  lineHeight: 1.7,
                  maxWidth: '36rem',
                  margin: '0 auto 2rem',
                }}
              >
                De l'orchestration documentaire au financement accéléré, en passant par la marketplace et la conformité : FinancesHome structure l'intégralité du cycle CEE.
              </motion.p>
              <motion.div variants={fadeUp}>
                <a href="#orchestration" className="btn-secondary">
                  Découvrir les services
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Services détaillés */}
        {servicesData.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            className="section-padding"
            style={{ background: index % 2 === 0 ? 'var(--white)' : 'var(--light-grey)' }}
          >
            <div className="padding-global" style={{ maxWidth: '105rem', margin: '0 auto' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '5rem',
                  alignItems: 'center',
                }}
                className="service-detail-grid"
              >
                {/* Image — alternance gauche/droite */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewOpts}
                  variants={fadeUp}
                  style={{ order: index % 2 === 1 ? 2 : 1 }}
                >
                  <div style={{ borderRadius: '2rem', overflow: 'hidden' }}>
                    <img
                      src={service.image}
                      alt={service.name}
                      style={{
                        width: '100%',
                        height: '28rem',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </div>
                </motion.div>

                {/* Contenu */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewOpts}
                  variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                  style={{ order: index % 2 === 1 ? 1 : 2 }}
                >
                  <motion.span variants={fadeUp} className="tagline-pill" style={{ display: 'inline-block' }}>
                    {service.tag}
                  </motion.span>
                  <motion.h2 variants={fadeUp} style={{ marginBottom: '1rem' }}>
                    {service.name}
                  </motion.h2>
                  <motion.p variants={fadeUp} style={{ fontSize: '1rem', fontWeight: 500, lineHeight: 1.4, marginBottom: '1rem' }}>
                    {service.heading}
                  </motion.p>
                  <motion.p variants={fadeUp} style={{ fontSize: '0.9375rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                    {service.description}
                  </motion.p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {service.details.map((item, i) => (
                      <motion.li
                        key={i}
                        variants={fadeUp}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.75rem',
                          fontSize: '0.9375rem',
                          color: 'var(--black)',
                        }}
                      >
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
                            marginTop: '0.15rem',
                          }}
                        >
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                  <motion.div variants={fadeUp}>
                    <Link to="/contact" className="btn-secondary">
                      En savoir plus / Demander une démo
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            <style>{`
              @media (max-width: 767px) {
                .service-detail-grid {
                  grid-template-columns: 1fr !important;
                  gap: 2.5rem !important;
                }
                .service-detail-grid > * { order: unset !important; }
              }
            `}</style>
          </section>
        ))}

        {/* CTA final */}
        <section className="section-padding" style={{ background: 'var(--white)' }}>
          <div className="padding-global" style={{ maxWidth: '52rem', margin: '0 auto', textAlign: 'center' }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewOpts}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.h2 variants={fadeUp} style={{ marginBottom: '1rem' }}>
                Prêt à industrialiser vos opérations CEE ?
              </motion.h2>
              <motion.p variants={fadeUp} style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
                Contactez notre équipe pour une démonstration personnalisée
              </motion.p>
              <motion.div variants={fadeUp} style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn-primary">
                  Nous contacter
                </Link>
                <a href="https://app.financeshome.com/register" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  Inscription
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default NosServicesPage;
