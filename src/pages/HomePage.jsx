
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Shield, FileCheck, Clock, TrendingUp, FileText, Calculator, AlertCircle, BarChart as ChartBar, Lock, Eye, FileSearch, Database, Upload, CheckCircle, DollarSign, ArrowRight, Users, Zap, Target, Award, BarChart3, Wallet, MessageSquare, ChevronDown } from 'lucide-react';

const HomePage = () => {
  const [activeActor, setActiveActor] = useState('prod');

  const stats = [
    { value: 'Md€', desc: 'Marché CEE annuel en France — levier majeur de la transition énergétique' },
    { value: '5j', desc: 'Délai de paiement producteur via FastPay ou InvestPay (vs 30–90j standard)' },
    { value: '4', desc: 'Modes de financement adaptés à chaque profil d\'acteur et situation' },
    { value: '14', desc: 'Pays membres couverts par le dispositif d\'obligations d\'efficacité énergétique (White Certificates)' }
  ];

  const painPoints = [
    {
      icon: Clock,
      title: 'Délais de paiement de 30 à 90 jours',
      description: 'Trésorerie bloquée pour les installateurs et mandataires pendant toute la durée du cycle.'
    },
    {
      icon: FileText,
      title: 'Complexité documentaire et risques de rejet',
      description: 'Multiplicité des pièces requises, des fiches CEE applicables et des exigences des obligés.'
    },
    {
      icon: Users,
      title: 'Multi-interlocuteurs sans orchestration',
      description: 'Bénéficiaire, installateur, mandataire, acheteur CEE : chacun gère sa partie de façon isolée.'
    },
    {
      icon: Wallet,
      title: 'Absence de marché structuré de créances',
      description: 'Aucun mécanisme standardisé pour céder, financer ou monétiser les créances CEE validées.'
    },
    {
      icon: ChartBar,
      title: 'Pilotage et traçabilité insuffisants',
      description: 'Pas de reporting unifié, pas d\'audit trail centralisé, pas de suivi SLA entre les parties.'
    }
  ];

  const solutionBriques = [
    {
      icon: FileCheck,
      title: 'Orchestration administrative',
      description: 'Création et pilotage des projets CEE, collecte et contrôle des pièces, checklists par fiche, audit de conformité, transmission structurée à l\'acheteur CEE et audit trail complet.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: 'Exécution financière',
      description: 'Paiement standard ou scénarios accélérés (FastPay, InvestPay, MandatPay), exécution via Stripe, rapprochement des virements obligés et ledger interne.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Database,
      title: 'Marketplace privée',
      description: 'Espace partenaires non public — listing de créances cessibles après validation interne, accès sur invitation avec KYC, opérations encadrées par conventions contractuelles.',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: CheckCircle,
      title: 'Moteur de conformité',
      description: 'Contrôles bloquants (hard stop) et non bloquants sur chaque dossier : cohérence fiche/matériel, mentions obligatoires, dates, qualifications RGE, photos techniques.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Interlocuteur unique',
      description: 'FinancesHome centralise la relation entre toutes les parties : producteur, mandataire, obligé, investisseur. Réduction des frictions et simplification du parcours complet.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: ChartBar,
      title: 'Reporting & pilotage',
      description: 'Volumes, délais, taux de rejet, encours par statut, performance SLA, réconciliation Stripe + virements obligés. Visibilité totale pour chaque acteur.',
      gradient: 'from-blue-500 to-cyan-500'
    }
  ];

  const securityPillars = [
    {
      icon: Lock,
      title: 'Chiffrement',
      description: 'AES-256 au repos, TLS 1.3 en transit'
    },
    {
      icon: Eye,
      title: 'Contrôle d\'accès',
      description: 'RBAC, authentification multi-facteurs'
    },
    {
      icon: FileSearch,
      title: 'Audit logs',
      description: 'Traçabilité complète de toutes les actions'
    },
    {
      icon: Database,
      title: 'Stockage sécurisé',
      description: 'Infrastructure EU, backups chiffrés'
    }
  ];

  const pipelineSteps = [
    { n: '01', title: 'Onboarding & qualification', desc: 'Création compte, KYC, collecte pièces société, scoring documentaire et volumétrique.', tags: ['KYC', 'Scoring'] },
    { n: '02', title: 'Cadrage valorisation', desc: 'Cadrage du prix selon conventions acheteurs, mandat de valorisation, règles de preuve.', tags: ['Mandat', 'Pricing'] },
    { n: '03', title: 'Création projet', desc: 'Déclaration fiche CEE, adresse, bénéficiaire, devis, dates. Calcul volumétrie kWhc.', tags: ['Fiche CEE', 'kWhc'] },
    { n: '04', title: 'Validation éligibilité & engagement', desc: 'Contrôles hard stop (mentions, dates, RGE, cohérence technique) + engagement signé.', tags: ['Hard stop', 'RGE'] },
    { n: '05', title: 'Production & preuves', desc: 'Réalisation travaux, factures, attestations, photos, fiches techniques et numéros de série.', tags: [] },
    { n: '06', title: 'Audit de conformité', desc: 'Audit administratif complet, contrôle terrain si requis, décision conforme / corrections / refus.', tags: ['Audit trail', 'COMPLIANCE_OK'] },
    { n: '07', title: 'Transmission acheteur CEE', desc: 'Packaging dossier (bundle + index), transmission à l\'obligé / sujet délégué, suivi SLA.', tags: ['SENT_TO_OBLIGE'] },
    { n: '08', title: 'Validation acheteur', desc: 'Validation administrative en 5 jours ouvrés (SLA cible). Confirmation de créance.', tags: ['OBLIGE_ACCEPTED', '5j SLA'] },
    { n: '09', title: 'Paiement selon mode activé', desc: 'Standard, FastPay, InvestPay ou MandatPay — selon conventions et choix du producteur.', tags: ['CLOSED', 'Stripe'] }
  ];

  const paymentModes = [
    { name: 'PAIEMENT STANDARD', delay: '⏱ 30–40 jours', title: 'Paiement direct par l\'obligé', desc: 'Solution classique. L\'obligé ou sujet délégué paie directement le producteur ou mandataire après validation administrative du dossier. Aucune cession de créance requise.', flow: ['Déclencheur : validation administrative par l\'obligé', 'Payeur : obligé / sujet délégué', 'Bénéficiaire : producteur / mandataire (selon convention)'] },
    { name: 'FASTPAY', delay: '⚡ 5 jours', title: 'Rachat de créance validée', desc: 'La créance CEE validée est cédée à un partenaire financier qualifié. Le producteur est payé sous 5 jours. L\'obligé rembourse ensuite directement le détenteur de la créance. Cycle court terme : 15–21 jours.', flow: ['Déclencheur : COMPLIANCE_OK + cessibilité validée', 'Paiement producteur : J+5 via Stripe', 'Paiement final : obligé → détenteur (virement)'] },
    { name: 'INVESTPAY', delay: '⚡ 5 jours après validation', title: 'Financement anticipé de créance', desc: 'Financement d\'une créance en cours de production — avant validation finale de l\'obligé. Permet de financer les travaux, le matériel et la trésorerie chantier. Cycle moyen terme : 30–60 jours.', flow: ['Déclencheur : éligibilité validée + engagement signé', 'Paiement producteur : J+5 via Stripe', 'Paiement final : obligé → détenteur (virement)'] },
    { name: 'MANDATPAY', delay: '📊 Versements mensuels', title: 'Financement de portefeuille mandataire', desc: 'Financement global d\'un portefeuille CEE pour mandataires. Le mandataire reçoit une avance de trésorerie et un financement stable. Le partenaire financier perçoit des versements mensuels et un remboursement du capital en fin de mandat.', flow: ['Durée : 1 an / 3 ans / 5 ans', 'Versements : mensuels (selon mandat)', 'Capital : restitution en fin de mandat'] }
  ];

  const marketplaceItems = [
    { name: 'Isolation combles — Île-de-France', amt: '84 500 €', status: 'DISPO', statusClass: 'bg-green-100 text-green-700' },
    { name: 'Pompes à chaleur — Nouvelle-Aquitaine', amt: '142 000 €', status: 'DISPO', statusClass: 'bg-green-100 text-green-700' },
    { name: 'LED industriel — Auvergne-Rhône-Alpes', amt: '67 200 €', status: 'ACQUIS', statusClass: 'bg-purple-100 text-[#5E17EB]' },
    { name: 'Rénovation transport — Grand Est', amt: '210 800 €', status: 'EN COURS', statusClass: 'bg-gray-100 text-gray-600' },
    { name: 'Bâtiment tertiaire — Occitanie', amt: '98 300 €', status: 'DISPO', statusClass: 'bg-green-100 text-green-700' },
    { name: 'Agriculture — Bretagne', amt: '53 700 €', status: 'DISPO', statusClass: 'bg-green-100 text-green-700' }
  ];

  const securityCards = [
    { icon: FileCheck, title: 'Administrative', desc: 'Checklists par fiche CEE, contrôles hard stop et soft, audit de conformité avec gestion structurée des anomalies (BLOCKER / MAJOR / MINOR).' },
    { icon: Shield, title: 'Juridique', desc: 'Contrats de cession de créance, mandats, reconnaissance du payeur, documentation contractuelle archivée et versionnée.' },
    { icon: Lock, title: 'Financière', desc: 'Paiements via Stripe Connect, séquestre logique jusqu\'à validation, ledger interne, réconciliation bancaire et reporting investisseur.' },
    { icon: CheckCircle, title: 'KYC / AML', desc: 'Vérification d\'identité et conformité anti-blanchiment sur tous les participants. Accès partenaires restreint sur invitation et qualification préalable.' }
  ];

  const offreCards = [
    { tag: 'Offre 1', name: 'Orchestration CEE', items: ['Accès plateforme + pilotage projets', 'Checklists conformité + audit trail complet', 'Transmission acheteur + reporting', 'Workflow administratif standardisé'], featured: false },
    { tag: 'Offre 2', name: 'Orchestration + Conformité avancée', items: ['Tout l\'offre Orchestration CEE', 'Contrôle terrain si requis', 'Audit renforcé et assistance correction', 'SLA dédié et suivi prioritaire'], featured: true },
    { tag: 'Offre 3', name: 'Portefeuille mandataire', items: ['Multi-entités et multi-sites', 'Reporting portefeuille centralisé', 'MandatPay si activé contractuellement', 'Pilotage SLA et volumétrie'], featured: false }
  ];

  const actors = [
    { id: 'prod', label: 'Producteurs & Installateurs', tag: '// Producteurs CEE · Installateurs', title: 'Accélérez votre trésorerie, industrialisez votre production', desc: 'FinancesHome prend en charge la structuration complète du dossier, la mise en relation avec les obligés et la cession de créance — pour que vous soyez payé sous 5 jours au lieu de 90.', benefits: ['Paiement accéléré sous 5 jours (FastPay / InvestPay)', 'Financement des chantiers et de la trésorerie amont', 'Réduction des rejets administratifs grâce aux checklists par fiche CEE', 'Interlocuteur unique pour la valorisation et le financement', 'Pilotage multi-projets et reporting en temps réel', 'Validation d\'éligibilité avant démarrage des travaux'] },
    { id: 'benef', label: 'Bénéficiaires finaux', tag: '// Bénéficiaires finaux', title: 'Financez vos projets énergétiques, réduisez votre reste à charge', desc: 'FinancesHome accompagne les porteurs de projets de la valorisation CEE jusqu\'au paiement, avec un dossier structuré, sécurisé et optimisé pour chaque opération éligible.', benefits: ['Financement de projets de rénovation et d\'efficacité énergétique', 'Réduction significative du reste à charge via valorisation CEE', 'Accompagnement complet de A à Z', 'Sécurisation du dossier et traçabilité complète', 'Accès possible au financement anticipé (InvestPay)'] },
    { id: 'mand', label: 'Mandataires', tag: '// Mandataires CEE', title: 'Industrialisez votre production et monétisez vos portefeuilles', desc: 'FinancesHome est l\'infrastructure dédiée aux mandataires : centralisation des flux, structuration des volumes, accès aux partenaires financiers et pilotage des SLA pour industrialiser la production CEE.', benefits: ['Centralisation et structuration des volumes CEE multi-secteurs', 'Accès au financement de portefeuille via MandatPay (1, 3 ou 5 ans)', 'Paiement sous 5 jours via FastPay sur créances validées', 'Financement anticipé des dossiers en production via InvestPay', 'Négociation optimisée auprès des obligés', 'Reporting portefeuille et pilotage des SLA', 'Augmentation de la capacité de production'] },
    { id: 'oblige', label: 'Obligés & Délégataires', tag: '// Obligés & Sujets Délégués CEE', title: 'Des volumes structurés, des dossiers conformes, un interlocuteur unique', desc: 'FinancesHome agrège et structure des volumes CEE multi-secteurs pour vous permettre d\'atteindre vos obligations réglementaires avec des dossiers prêts à traiter et une traçabilité complète.', benefits: ['Volumes CEE sécurisés et qualifiés multi-secteurs', 'Dossiers audités et conformes avant transmission', 'Interlocuteur unique centralisé', 'Traçabilité complète et documentation contractuelle', 'Planification et visibilité sur les flux entrants', 'Réduction des risques de non-conformité', 'Validation administrative en 5 jours ouvrés (SLA cible)'] },
    { id: 'invest', label: 'Investisseurs', tag: '// Investisseurs · Family Offices · Partenaires financiers', title: 'Accédez à une classe d\'actifs énergétiques structurée et traçable', desc: 'FinancesHome opère une marketplace privée d\'investissement sur créances CEE validées. Les investisseurs accèdent à un actif court terme, contractuel, adossé à des obligés énergétiques reconnus — en accès restreint sur qualification.', benefits: ['Actif court terme décorrélé des marchés financiers', 'Créances contractuelles adossées à des obligés énergétiques', 'Audit administratif complet avant mise à disposition', 'Tableau de bord investisseur : suivi créances, statuts, échéancier', 'Paiement final de l\'obligé directement vers l\'investisseur', 'Rotation rapide du capital (FastPay : 15–30j / InvestPay : 30–60j)', 'Accès sur invitation — KYC & conformité requis'] }
  ];

  const testimonials = [
    {
      name: 'Marie Dubois',
      role: 'Directrice Opérations',
      company: 'EnergiePlus',
      content: 'FinanceHome a réduit notre temps de traitement de 35% et éliminé les erreurs manuelles.',
      metric: '-35% temps de traitement'
    },
    {
      name: 'Thomas Laurent',
      role: 'Responsable CEE',
      company: 'GreenAggregator',
      content: 'Nous gérons maintenant 12 projets de plus par mois avec la même équipe.',
      metric: '+12 projets/mois'
    },
    {
      name: 'Sophie Martin',
      role: 'Investment Manager',
      company: 'FundVert Capital',
      content: 'La transparence et la traçabilité nous ont permis d\'augmenter notre ROI de 18%.',
      metric: '+18% ROI'
    }
  ];

  const team = [
    {
      name: 'CEE Operations',
      role: '8+ ans dans les certificats d\'économies d\'énergie',
      image: 'https://images.unsplash.com/photo-1637622124152-33adfabcc923?w=400&h=400&fit=crop'
    },
    {
      name: 'Compliance',
      role: 'Ex-auditeur RGPD et ISO 27001',
      image: 'https://images.unsplash.com/photo-1637622124152-33adfabcc923?w=400&h=400&fit=crop'
    },
    {
      name: 'Fintech Engineering',
      role: 'Architectes de systèmes de paiement sécurisés',
      image: 'https://images.unsplash.com/photo-1637622124152-33adfabcc923?w=400&h=400&fit=crop'
    },
    {
      name: 'Partnerships',
      role: 'Réseau d\'investisseurs et producteurs CEE',
      image: 'https://images.unsplash.com/photo-1637622124152-33adfabcc923?w=400&h=400&fit=crop'
    }
  ];

  const pricingTiers = [
    {
      name: 'Starter',
      price: 'Sur mesure',
      description: 'Pour débuter avec les fonctionnalités essentielles',
      features: [
        'Jusqu\'à 50 projets/mois',
        'Workflow de base',
        'Support email',
        'Audit trail'
      ],
      cta: 'Contactez-nous'
    },
    {
      name: 'Growth',
      price: 'Sur mesure',
      description: 'Pour les équipes en croissance',
      features: [
        'Projets illimités',
        'Workflows avancés',
        'Support prioritaire',
        'API access',
        'Multi-utilisateurs'
      ],
      cta: 'Contactez-nous',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Pour les organisations à grande échelle',
      features: [
        'Volume personnalisé',
        'SLA garanti',
        'Support dédié',
        'Intégrations sur mesure',
        'Formation équipe'
      ],
      cta: 'Contactez-nous'
    }
  ];

  const faqs = [
    {
      question: 'Comment FinanceHome gère-t-il le cycle de vie complet des projets CEE ?',
      answer: 'Notre plateforme centralise toutes les étapes : création du projet, upload de documents, validation multi-niveaux, calculs CEE automatiques, et publication pour financement. Chaque action est horodatée et traçable.'
    },
    {
      question: 'Quels types de documents et signatures sont supportés ?',
      answer: 'Nous supportons tous les formats standards (PDF, Word, Excel) et offrons des signatures électroniques conformes eIDAS. Les documents sont stockés de manière sécurisée avec chiffrement AES-256.'
    },
    {
      question: 'Comment fonctionne l\'accès investisseur ?',
      answer: 'Les investisseurs accèdent à un portail dédié avec dashboard, indicateurs de risque, calendriers de remboursement et documentation complète. L\'accès est accordé après validation KYC.'
    },
    {
      question: 'Le moteur de tarification supporte-t-il toutes les fiches CEE ?',
      answer: 'Oui, notre moteur est mis à jour régulièrement avec les dernières règles. Vous pouvez aussi configurer des overrides admin pour des cas spécifiques.'
    },
    {
      question: 'Quelle traçabilité pour les audits de conformité ?',
      answer: 'Chaque action (création, modification, validation, signature) est horodatée, liée à un utilisateur identifié et stockée dans un audit trail immuable exportable pour les audits.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>FinancesHome — Orchestration Financière des CEE</title>
        <meta
          name="description"
          content="FinancesHome industrialise le traitement des opérations d'économies d'énergie. Plateforme d'orchestration administrative et financière CEE. 14 pays membres. FastPay, InvestPay, MandatPay."
        />
      </Helmet>

      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50 pt-20">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 font-['JetBrains_Mono',monospace] text-xs tracking-widest uppercase text-[#5E17EB] bg-purple-100/80 border border-purple-200/50 px-4 py-2 rounded-lg w-fit">
                    <span className="w-1.5 h-1.5 bg-[#5E17EB] rounded-full animate-pulse" />
                    Plateforme d'orchestration · CEE · 14 pays membres
                  </div>
                  <h1 className="font-['Cormorant_Garamond',serif] text-5xl lg:text-6xl font-semibold leading-[0.95] tracking-tight">
                    <span className="text-[#5E17EB]">Orchestration</span>
                    <br />
                    <span className="text-gray-400">administrative</span>
                    <br />
                    <span className="text-gray-900">& financière CEE</span>
                  </h1>
                  <p className="text-lg text-gray-500 leading-relaxed max-w-[460px]">
                    FinancesHome industrialise le traitement des opérations d'économies d'énergie — de la qualification à la validation — en connectant <strong className="text-gray-700 font-medium">producteurs, mandataires, obligés et partenaires financiers</strong> autour d'une infrastructure centralisée et conforme, dans les <strong className="text-gray-700 font-medium">14 pays membres du dispositif d'obligations d'efficacité énergétique</strong>.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://app.financeshome.com/register"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg text-lg font-medium px-8 py-6 bg-[#5E17EB] hover:bg-[#4d12c4] text-white shadow-xl shadow-purple-500/30 transition-colors cursor-pointer"
                  >
                    S'inscrire gratuitement
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                  <a
                    href="https://app.financeshome.com/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg text-lg font-medium px-8 py-6 border-2 border-[#5E17EB] text-[#5E17EB] hover:bg-purple-50 transition-colors cursor-pointer"
                  >
                    Se connecter
                  </a>
                </div>

                {/* Trust Chips */}
                <div className="flex flex-wrap gap-3">
                  <div className="px-4 py-2 bg-white rounded-full shadow-md border border-purple-100 flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-[#5E17EB]" />
                    <span className="text-sm font-medium text-gray-700">RGPD-ready</span>
                  </div>
                  <div className="px-4 py-2 bg-white rounded-full shadow-md border border-purple-100 flex items-center space-x-2">
                    <FileCheck className="w-4 h-4 text-[#5E17EB]" />
                    <span className="text-sm font-medium text-gray-700">Audit trails</span>
                  </div>
                  <div className="px-4 py-2 bg-white rounded-full shadow-md border border-purple-100 flex items-center space-x-2">
                    <Lock className="w-4 h-4 text-[#5E17EB]" />
                    <span className="text-sm font-medium text-gray-700">Stockage sécurisé</span>
                  </div>
                </div>
              </motion.div>

              {/* Right - Dashboard Mockup */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                <div className="flex items-center justify-center relative z-10 py-16 pr-12 pl-8">
    <div className="bg-white border border-purple-200/20 rounded overflow-hidden shadow-xl w-full max-w-[380px]">
      <div className="bg-[#5E17EB] py-6 px-8 relative overflow-hidden after:content-[''] after:absolute after:-right-5 after:-top-5 after:w-[100px] after:h-[100px] after:rounded-full after:bg-white/5">
        <div className="font-['JetBrains_Mono',monospace] text-[0.6rem] tracking-[0.2em] text-white/60 uppercase mb-2">// Activité plateforme</div>
        <div className="font-['Cormorant_Garamond',serif] text-xl font-semibold text-white">Tableau de bord live</div>
      </div>
      <div className="p-6 px-8">
        <div className="flex justify-between items-center py-3 border-b border-black/5 last:border-b-0"><span className="text-xs text-gray-500">Créances disponibles</span><span className="font-['JetBrains_Mono',monospace] text-sm text-[#5E17EB] font-medium">2.4M €</span></div>
        <div className="flex justify-between items-center py-3 border-b border-black/5 last:border-b-0"><span className="text-xs text-gray-500">Délai FastPay / InvestPay</span><span className="font-['JetBrains_Mono',monospace] text-sm text-[#5E17EB] font-medium">5 jours<span className="text-[0.55rem] font-['JetBrains_Mono',monospace] px-1.5 py-0.5 bg-green-100 text-green-600 rounded-sm ml-1.5">ACTIF</span></span></div>
        <div className="flex justify-between items-center py-3 border-b border-black/5 last:border-b-0"><span className="text-xs text-gray-500">Projets structurés</span><span className="font-['JetBrains_Mono',monospace] text-sm text-[#5E17EB] font-medium">147</span></div>
        <div className="flex justify-between items-center py-3 border-b border-black/5 last:border-b-0"><span className="text-xs text-gray-500">Secteurs couverts</span><span className="font-['JetBrains_Mono',monospace] text-sm text-[#5E17EB] font-medium">Multi-secteurs</span></div>
        <div className="flex justify-between items-center py-3 border-b border-black/5 last:border-b-0"><span className="text-xs text-gray-500">Infrastructure paiement</span><span className="font-['JetBrains_Mono',monospace] text-sm text-[#5E17EB] font-medium">Stripe<span className="text-[0.55rem] font-['JetBrains_Mono',monospace] px-1.5 py-0.5 bg-green-100 text-green-600 rounded-sm ml-1.5">KYC/AML</span></span></div>
        <div className="flex justify-between items-center py-3 border-b border-black/5 last:border-b-0"><span className="text-xs text-gray-500">Validation obligé (SLA cible)</span><span className="font-['JetBrains_Mono',monospace] text-sm text-[#5E17EB] font-medium">5 jours</span></div>
      </div>
    </div>
  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#5E17EB] to-purple-600 rounded-full blur-3xl opacity-40"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-40"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="py-12 bg-gray-50 border-y border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x-0 md:divide-x divide-gray-200">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="px-6 py-6 md:py-8 hover:bg-white transition-colors group"
                >
                  <div className="font-['Cormorant_Garamond',serif] text-3xl font-semibold text-[#5E17EB] mb-2">{stat.value}</div>
                  <p className="text-sm text-gray-500 leading-snug">{stat.desc}</p>
                  <div className="mt-2 h-0.5 bg-gradient-to-r from-[#5E17EB] to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Marché - Contexte & Problèmes */}
        <section id="marche" className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="font-['JetBrains_Mono',monospace] text-xs tracking-widest text-[#5E17EB]/80 uppercase mb-4">// 01 — Contexte marché</div>
                <h2 className="font-['Cormorant_Garamond',serif] text-3xl lg:text-4xl font-semibold text-gray-900 mb-6 leading-tight">
                  Un dispositif puissant, ralenti par ses frictions opérationnelles
                </h2>
                <p className="text-gray-500 leading-relaxed">
                  Le mécanisme CEE fonctionne — mais dans les 14 pays membres du dispositif d'obligations d'efficacité énergétique, la complexité documentaire, la multiplicité des interlocuteurs et l'absence de pilotage standardisé entraînent des pertes de marge, des retards et des volumes non captés.
                </p>
              </div>
              <div className="space-y-3">
                {painPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4 p-5 bg-white rounded-lg border-l-2 border-purple-200 hover:border-[#5E17EB] shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="w-10 h-10 bg-purple-100 rounded flex items-center justify-center flex-shrink-0">
                      <point.icon className="w-5 h-5 text-[#5E17EB]" />
                    </div>
                    <div>
                      <p className="text-gray-700 text-sm leading-relaxed"><strong className="text-gray-900">{point.title}</strong><br />{point.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Solution - 3 briques */}
        <section id="solution" className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <div className="font-['JetBrains_Mono',monospace] text-xs tracking-widest text-[#5E17EB]/80 uppercase mb-3">// 02 — Proposition de valeur</div>
              <h2 className="font-['Cormorant_Garamond',serif] text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
                Trois briques complémentaires pour industrialiser les opérations CEE
              </h2>
              <p className="text-gray-500 max-w-2xl">
                FinancesHome structure la chaîne de bout en bout : orchestration administrative, exécution financière sécurisée, et marketplace privée pour partenaires qualifiés.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
              {solutionBriques.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative bg-white p-8 hover:bg-gray-50 transition-all overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#5E17EB] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                  <div className="text-2xl mb-4">{
                    ['🗂','⚡','🏦','✅','🔗','📊'][index]
                  }</div>
                  <h3 className="text-lg font-semibold text-[#5E17EB] mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Acteurs */}
        <section id="acteurs" className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <div className="font-['JetBrains_Mono',monospace] text-xs tracking-widest text-[#5E17EB]/80 uppercase mb-3">// 03 — Acteurs & valeur par profil</div>
              <h2 className="font-['Cormorant_Garamond',serif] text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
                Une infrastructure conçue pour chaque acteur du marché CEE
              </h2>
              <p className="text-gray-500 max-w-2xl mb-8">
                Sélectionnez un profil pour découvrir comment FinancesHome répond à ses enjeux spécifiques.
              </p>
            </div>

            <div className="flex flex-wrap gap-0 border-b border-gray-200 mb-12 overflow-x-auto">
              {actors.map((actor) => (
                <button
                  key={actor.id}
                  onClick={() => setActiveActor(actor.id)}
                  className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeActor === actor.id ? 'text-[#5E17EB] border-[#5E17EB]' : 'text-gray-500 border-transparent hover:text-[#5E17EB]'
                  }`}
                >
                  {actor.label}
                </button>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
              {actors.filter(a => a.id === activeActor).map((actor) => (
                <React.Fragment key={actor.id}>
                  <div>
                    <div className="font-['JetBrains_Mono',monospace] text-xs tracking-widest text-[#5E17EB]/70 mb-2">{actor.tag}</div>
                    <h3 className="font-['Cormorant_Garamond',serif] text-2xl font-semibold text-gray-900 mb-4">{actor.title}</h3>
                    <p className="text-gray-500 mb-8 leading-relaxed">{actor.desc}</p>
                    <ul className="space-y-2">
                      {actor.benefits.map((b, i) => (
                        <li key={i} className="flex gap-3 text-sm text-gray-700">
                          <span className="text-[#5E17EB]/50">→</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white rounded-xl p-8 border border-gray-200">
                    <div className="font-['JetBrains_Mono',monospace] text-xs tracking-widest text-[#5E17EB]/70 mb-4">Profils concernés</div>
                    <div className="flex flex-wrap gap-2">
                      {['Installateurs RGE', 'Entreprises travaux', 'Mandataires', 'Bureaux d\'études'].map((t) => (
                        <span key={t} className="px-3 py-1 bg-gray-50 border border-gray-200 rounded text-xs text-gray-600 font-mono">{t}</span>
                      ))}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* Investor Access */}
        <section className="py-24 bg-gradient-to-br from-green-50 via-white to-emerald-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Portail Investisseur
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Accédez à des opportunités CEE structurées avec données complètes et transparence totale
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start space-x-3">
                    <BarChart3 className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Dashboard avec indicateurs de risque</span>
                      <p className="text-gray-600 text-sm">Vue claire sur les performances et métriques clés</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Calendar className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Calendrier de remboursement</span>
                      <p className="text-gray-600 text-sm">Prévisions précises et suivi automatique</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Shield className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Processus KYC intégré</span>
                      <p className="text-gray-600 text-sm">Conformité garantie et documentation complète</p>
                    </div>
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-green-600 hover:bg-green-700 text-white" asChild>
                    <Link to="/investor-access">Demander l'accès</Link>
                  </Button>
                  <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50" asChild>
                    <Link to="/contact">Parler à notre équipe</Link>
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-6">
                  Accès sur approbation. Conformité RGPD et SOC 2 en cours.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Projets disponibles</h3>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">100+ actifs</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                        <p className="text-sm text-gray-600 mb-1">Volume total</p>
                        <p className="text-2xl font-bold text-gray-900">50 GWh</p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                        <p className="text-sm text-gray-600 mb-1">ROI moyen</p>
                        <p className="text-2xl font-bold text-gray-900">6.2%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Sécurisation des opérations */}
        <section id="securite" className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 mb-12">
              <div>
                <div className="font-['JetBrains_Mono',monospace] text-xs tracking-widest text-[#5E17EB]/80 uppercase mb-3">// 07 — Sécurisation des opérations</div>
                <h2 className="font-['Cormorant_Garamond',serif] text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
                  Une protection à quatre niveaux sur chaque opération
                </h2>
                <p className="text-gray-500">
                  Chaque dossier, chaque créance, chaque flux financier est sécurisé administrativement, réglementairement, juridiquement et financièrement — avec un audit trail immuable et une rétention documentaire conforme.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
              {securityCards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-6 hover:bg-white hover:shadow-md transition-all"
                >
                  <div className="text-2xl mb-3">{['🗂','⚖️','🔐','✅'][index]}</div>
                  <h3 className="font-['Cormorant_Garamond',serif] font-semibold text-[#5E17EB] mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Standards de conformité</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">RGPD-ready avec consentement granulaire</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">RBAC (Role-Based Access Control)</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Principe de least privilege</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Politiques de rétention configurables</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Roadmap certifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">ISO 27001</p>
                        <p className="text-sm text-gray-600">En cours de certification</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">SOC 2 Type II</p>
                        <p className="text-sm text-gray-600">Roadmap Q2 2026</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-6 bg-white rounded-xl border border-purple-100">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Security by design:</strong> Nos équipes d'ingénierie appliquent les meilleures pratiques 
                  de sécurité dès la conception. Audits de code, tests de pénétration réguliers, 
                  monitoring 24/7 et incident response plan documenté.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pipeline opérationnel */}
        <section id="processus" className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <div className="font-['JetBrains_Mono',monospace] text-xs tracking-widest text-[#5E17EB]/80 uppercase mb-3">// 04 — Pipeline opérationnel</div>
                <h2 className="font-['Cormorant_Garamond',serif] text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
                  9 étapes structurées de l'onboarding au paiement
                </h2>
                <p className="text-gray-500">
                  Chaque opération suit un workflow standardisé — de la qualification initiale jusqu'au paiement final — avec traçabilité complète à chaque étape.
                </p>
              </div>
              <div className="space-y-0 border-t border-gray-200">
                {pipelineSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-[2.5rem_1fr] gap-8 py-6 border-b border-gray-200 last:border-b-0"
                  >
                    <div className="font-['JetBrains_Mono',monospace] text-xs text-[#5E17EB]/50 pt-1">{step.n}</div>
                    <div>
                      <h4 className="font-['Cormorant_Garamond',serif] font-semibold text-gray-900 mb-1">{step.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed mb-2">{step.desc}</p>
                      {step.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {step.tags.map((t) => (
                            <span key={t} className="text-[0.6rem] font-mono px-2 py-0.5 bg-purple-100 text-[#5E17EB] rounded">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Modes de paiement */}
        <section id="paiements" className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <div className="font-['JetBrains_Mono',monospace] text-xs tracking-widest text-[#5E17EB]/80 uppercase mb-3">// 05 — Modes de financement</div>
              <h2 className="font-['Cormorant_Garamond',serif] text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
                Quatre scénarios de paiement pour chaque situation
              </h2>
              <p className="text-gray-500 max-w-2xl">
                Du paiement classique à 30 jours au financement de portefeuille sur 5 ans — chaque mode répond à un besoin de trésorerie, une maturité d'opération, un profil d'acteur.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-px bg-gray-200">
              {paymentModes.map((mode, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="relative bg-white p-8 hover:bg-gray-50 transition-colors group overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#5E17EB] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-['JetBrains_Mono',monospace] text-xs text-[#5E17EB] tracking-wider font-medium">{mode.name}</span>
                    <span className="text-[0.6rem] font-mono px-2 py-0.5 bg-green-100 text-green-700 rounded">{mode.delay}</span>
                  </div>
                  <h3 className="font-['Cormorant_Garamond',serif] text-lg font-semibold text-gray-900 mb-2">{mode.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">{mode.desc}</p>
                  <div className="space-y-1">
                    {mode.flow.map((f, j) => (
                      <p key={j} className="text-xs text-gray-500 flex gap-2"><span className="text-[#5E17EB]">·</span>{f}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Marketplace */}
        <section id="marketplace" className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <div className="font-['JetBrains_Mono',monospace] text-xs tracking-widest text-[#5E17EB]/80 uppercase mb-3">// 06 — Marketplace & Espace investisseur</div>
              <h2 className="font-['Cormorant_Garamond',serif] text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
                Marketplace privée de créances CEE
              </h2>
              <p className="text-gray-500 max-w-2xl">
                Accès restreint sur invitation et qualification KYC. Chaque créance est proposée après audit interne, avec visibilité complète sur les caractéristiques financières et administratives.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <div className="font-['JetBrains_Mono',monospace] text-[0.65rem] tracking-widest text-gray-400 uppercase pb-3 border-b border-gray-200 mb-4">Créances disponibles · Accès restreint</div>
                {marketplaceItems.map((item, i) => (
                  <div key={i} className="grid grid-cols-[1fr_auto_auto] gap-4 items-center py-3 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-gray-900">{item.name}</span>
                    <span className="font-mono text-sm text-[#5E17EB] font-medium">{item.amt}</span>
                    <span className={`text-[0.55rem] font-mono px-2 py-1 rounded ${item.statusClass}`}>{item.status}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 mt-6 pt-6 border-t border-gray-200">
                  <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                  <span className="font-mono text-xs text-gray-500">Paiements sécurisés via Stripe Connect · KYC/AML · Séquestre possible</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                <div className="font-['JetBrains_Mono',monospace] text-xs tracking-widest text-[#5E17EB]/70 mb-4">Données visibles par créance</div>
                <ul className="space-y-2 text-sm text-gray-700">
                  {['Type d\'opération énergétique et fiche CEE', 'Volume CEE en kWhc', 'Montant de l\'avance à financer', 'Montant final après remboursement', 'Délai de remboursement estimé', 'Identité du payeur (obligé / délégataire)', 'Statut administratif'].map((li, i) => (
                  <li key={i} className="flex gap-2"><span className="text-[#5E17EB]/50">→</span>{li}</li>
                ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Une interface pensée pour vos équipes
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Dashboard intuitif, workflows fluides, données en temps réel
              </p>
            </div>

            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1571677246347-5040036b95cc"
                  alt="FinanceHome - Vue d'ensemble du tableau de bord de gestion CEE"
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                  <p className="text-white text-lg font-semibold">Vue d'ensemble : Projets, statuts et métriques clés</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1516383274235-5f42d6c6426d"
                  alt="FinanceHome - Interface détaillée des projets CEE et workflows"
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                  <p className="text-white text-lg font-semibold">Détails projet : Documents, validations et calculs CEE</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-gradient-to-br from-purple-50 via-white to-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Ils nous font confiance
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Des résultats mesurables pour nos clients
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                >
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-sm text-gray-500">{testimonial.company}</p>
                    </div>
                    <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      {testimonial.metric}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Construit par des opérateurs et ingénieurs
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Une équipe qui comprend les défis CEE de l'intérieur
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="relative rounded-2xl overflow-hidden mb-4 aspect-square">
                    <img
                      src={member.image}
                      alt={`${member.name} - Membre de l'équipe FinanceHome`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{member.name}</h3>
                  <p className="text-gray-600 text-sm">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Offres commerciales */}
        <section id="offres" className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <div className="font-['JetBrains_Mono',monospace] text-xs tracking-widest text-[#5E17EB]/80 uppercase mb-3">// 08 — Offres commerciales</div>
              <h2 className="font-['Cormorant_Garamond',serif] text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
                Trois offres, une option partenaires
              </h2>
              <p className="text-gray-500 max-w-2xl">
                FinancesHome structure son accès en trois niveaux d'offre adaptés aux besoins opérationnels, complétés par un espace partenaires contractuel sur activation.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {offreCards.map((offre, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`rounded-xl p-8 border shadow-sm hover:shadow-lg transition-all ${
                    offre.featured ? 'bg-purple-50/80 border-purple-200' : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="font-['JetBrains_Mono',monospace] text-[0.6rem] tracking-widest text-[#5E17EB] uppercase mb-2">{offre.tag}</div>
                  <h3 className="font-['Cormorant_Garamond',serif] text-xl font-semibold text-gray-900 mb-4">{offre.name}</h3>
                  <ul className="space-y-2">
                    {offre.items.map((item, i) => (
                      <li key={i} className="flex gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-[#5E17EB] flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-wrap justify-between items-center gap-4 p-6 bg-purple-50 border border-purple-200/50 rounded-xl">
              <div>
                <div className="font-['JetBrains_Mono',monospace] text-xs tracking-widest text-[#5E17EB] uppercase mb-1">Option — Espace Partenaires</div>
                <p className="text-sm text-gray-700">Activation sur invitation · Conventions nécessaires · Accès aux scénarios de financement accélérés</p>
              </div>
              <Button variant="outline" className="border-[#5E17EB] text-[#5E17EB] hover:bg-purple-50" asChild>
                <a href="mailto:contact@financeshome.com">Demander l'accès</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="py-24 bg-[#5E17EB] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="font-['JetBrains_Mono',monospace] text-xs tracking-widest text-white/50 uppercase mb-4">// 09 — Vision & ambition</div>
              <h2 className="font-['Cormorant_Garamond',serif] text-4xl lg:text-5xl font-semibold leading-tight mb-6">
                Structurer le financement<br />
                <span className="text-white/70">de la transition</span><br />
                énergétique
              </h2>
              <p className="text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">
                FinancesHome vise à devenir l'infrastructure de référence pour l'orchestration des opérations d'économies d'énergie dans les 14 pays membres du dispositif — de la France au Royaume-Uni, de l'Italie à la Pologne — en connectant finance privée et marché énergétique réglementé, et en structurant un marché secondaire de créances énergétiques à l'échelle européenne.
              </p>
              <Button className="bg-white text-[#5E17EB] hover:bg-gray-100 shadow-lg" asChild>
                <a href="https://app.financeshome.com/register" target="_blank" rel="noopener noreferrer">Rejoindre la plateforme</a>
              </Button>
              <div className="flex flex-wrap justify-center gap-8 mt-12 pt-12 border-t border-white/20">
                {['Industrialisation de la valorisation CEE', 'Marché secondaire des créances énergétiques', 'Finance privée & transition énergétique', '14 pays membres · White Certificates européens'].map((goal, i) => (
                  <span key={i} className="font-['JetBrains_Mono',monospace] text-xs text-white/45 border-b border-white/20 pb-1">{goal}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Blocks */}
        <section id="contact" className="border-t border-gray-200">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 divide-x divide-gray-200">
            {[
              { role: '// Producteurs · Installateurs', title: 'Payés en 5 jours', desc: 'Déposez votre portefeuille CEE. FinancesHome structure vos dossiers et organise votre financement rapide.', cta: "S'inscrire — Déposer un projet", href: 'https://app.financeshome.com/register' },
              { role: '// Bénéficiaires finaux', title: 'Financez vos travaux', desc: 'Réduisez votre reste à charge et bénéficiez d\'un accompagnement complet pour valoriser vos CEE.', cta: "S'inscrire — Être accompagné", href: 'https://app.financeshome.com/register' },
              { role: '// Mandataires CEE', title: 'Industrialisez votre production', desc: 'Centralisez vos volumes, financez vos portefeuilles et accédez aux partenaires financiers via MandatPay.', cta: "S'inscrire sur la plateforme", href: 'https://app.financeshome.com/register' },
              { role: '// Obligés · Délégataires', title: 'Volumes structurés', desc: 'Dossiers conformes, traçabilité complète et interlocuteur unique pour vos acquisitions CEE.', cta: "S'inscrire sur la plateforme", href: 'https://app.financeshome.com/register' },
              { role: '// Investisseurs · Family Offices', title: 'Espace partenaires', desc: 'Accès restreint sur qualification. Créances CEE auditées, courte duration, payeur identifié.', cta: "Demander l'accès", href: '/investor-access', internal: true }
            ].map((block, i) => (
              <div key={i} className="p-8 hover:bg-gray-50 transition-colors">
                <div className="font-['JetBrains_Mono',monospace] text-[0.55rem] tracking-widest text-[#5E17EB]/80 uppercase mb-2">{block.role}</div>
                <h3 className="font-['Cormorant_Garamond',serif] text-lg font-semibold text-gray-900 mb-2">{block.title}</h3>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">{block.desc}</p>
                <Button size="sm" className="bg-[#5E17EB] hover:bg-[#4d12c4] text-white text-xs" asChild>
                  {block.internal ? (
                    <Link to={block.href}>{block.cta}</Link>
                  ) : (
                    <a href={block.href} target="_blank" rel="noopener noreferrer">{block.cta}</a>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Notice légale */}
        <div className="bg-gray-100 border-t border-gray-200 py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-6">
            <div className="font-['JetBrains_Mono',monospace] text-xs text-[#5E17EB]/60 tracking-widest whitespace-nowrap">NOTICE LÉGALE</div>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              FinancesHome Ltd est une société enregistrée en Angleterre et au Pays de Galles, dont le siège est au 17 King Edwards Road, London HA4 7AE. FinancesHome est une plateforme d'orchestration administrative et technique des opérations d'économies d'énergie. Elle n'exerce pas d'activité de prestation de services d'investissement au sens de la directive 2014/65/UE (MiFID II), ni d'activité de crédit ou de collecte de fonds au sens des directives européennes applicables. Les scénarios de financement (FastPay, InvestPay, MandatPay) sont mis en œuvre dans le cadre de conventions contractuelles de cession de créances, réservées aux partenaires qualifiés ayant satisfait aux procédures KYC/AML. Aucun contenu publié sur ce site ne constitue une offre, une sollicitation ou un conseil en investissement.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Questions fréquentes
              </h2>
              <p className="text-xl text-gray-600">
                Tout ce que vous devez savoir sur FinanceHome
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.details
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-xl border border-gray-200 hover:border-[#5E17EB] transition-all overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <h3 className="font-semibold text-gray-900 text-lg pr-8">{faq.question}</h3>
                    <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-gradient-to-br from-[#5E17EB] via-purple-700 to-blue-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Prêt à transformer vos opérations CEE ?
                </h2>
                <p className="text-xl mb-10 text-purple-100">
                  Rejoignez les équipes qui gèrent leurs projets CEE avec efficacité et conformité
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-[#5E17EB] hover:bg-gray-100 text-lg px-8 py-6"
                    asChild
                  >
                    <Link to="/contact">
                      Demande de démo
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                    asChild
                  >
                    <Link to="/pricing">Voir la tarification</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

// Helper component for missing icon
const Calendar = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export default HomePage;
