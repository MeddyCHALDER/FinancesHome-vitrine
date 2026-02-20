
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Shield,
  Lock,
  Eye,
  FileSearch,
  Database,
  CheckCircle,
  Award,
  AlertCircle,
  Clock,
  Users,
  ArrowRight
} from 'lucide-react';

const SecurityPage = () => {
  const securityPillars = [
    {
      icon: Lock,
      title: 'Chiffrement de bout en bout',
      description: 'Toutes vos données sont chiffrées avec AES-256 au repos et TLS 1.3 en transit',
      details: [
        'Clés de chiffrement gérées via AWS KMS',
        'Rotation automatique des clés tous les 90 jours',
        'Chiffrement au niveau champ pour données sensibles',
        'Protocoles de chiffrement certifiés FIPS 140-2'
      ]
    },
    {
      icon: Eye,
      title: 'Contrôle d\'accès granulaire',
      description: 'Système RBAC (Role-Based Access Control) avec authentification multi-facteurs',
      details: [
        'Définition de rôles personnalisables par organisation',
        'MFA obligatoire pour accès administrateur',
        'Sessions sécurisées avec timeout configurable',
        'Support SSO / SAML pour entreprises'
      ]
    },
    {
      icon: FileSearch,
      title: 'Audit trail complet',
      description: 'Journalisation immuable de toutes les actions avec horodatage',
      details: [
        'Traçabilité de chaque création, modification, suppression',
        'Logs stockés dans une blockchain privée',
        'Exports conformes pour audits externes',
        'Rétention configurable selon vos obligations'
      ]
    },
    {
      icon: Database,
      title: 'Stockage sécurisé',
      description: 'Infrastructure européenne avec backups chiffrés et redondance',
      details: [
        'Datacenters certifiés ISO 27001 en France',
        'Backups quotidiens chiffrés avec rétention 30 jours',
        'Redondance multi-AZ pour haute disponibilité',
        'Plan de disaster recovery testé trimestriellement'
      ]
    }
  ];

  const complianceStandards = [
    {
      title: 'RGPD (Règlement Général sur la Protection des Données)',
      description: 'Conformité totale avec consentement granulaire et droits des personnes',
      points: [
        'Consentement explicite pour traitement des données',
        'Droit à l\'oubli et portabilité des données',
        'Privacy by design et by default',
        'DPO désigné et registre des traitements'
      ]
    },
    {
      title: 'RBAC (Role-Based Access Control)',
      description: 'Contrôle d\'accès basé sur les rôles et responsabilités',
      points: [
        'Séparation des privilèges par fonction',
        'Principe du moindre privilège appliqué',
        'Revues d\'accès trimestrielles',
        'Logs d\'accès pour audit'
      ]
    },
    {
      title: 'Principe de Least Privilege',
      description: 'Accès minimum requis pour chaque rôle',
      points: [
        'Permissions accordées au besoin uniquement',
        'Élévation temporaire de privilèges tracée',
        'Revue automatique des permissions inutilisées',
        'Alertes sur accès anormaux'
      ]
    },
    {
      title: 'Politiques de rétention configurables',
      description: 'Gestion du cycle de vie des données selon vos obligations',
      points: [
        'Rétention automatique selon type de document',
        'Purge sécurisée après expiration',
        'Archives légales conformes',
        'Exports pour conservation externe'
      ]
    }
  ];

  const certifications = [
    {
      name: 'ISO 27001',
      status: 'En cours de certification',
      description: 'Système de management de la sécurité de l\'information',
      date: 'Q2 2026'
    },
    {
      name: 'SOC 2 Type II',
      status: 'Roadmap',
      description: 'Audit de sécurité, disponibilité et confidentialité',
      date: 'Q3 2026'
    },
    {
      name: 'HDS (Hébergeur de Données de Santé)',
      status: 'Évaluation',
      description: 'Si applicable pour projets santé/énergie',
      date: 'À déterminer'
    }
  ];

  const securityPractices = [
    'Audits de code systématiques avec revues par pairs',
    'Tests de pénétration annuels par cabinets externes',
    'Monitoring 24/7 avec alertes en temps réel',
    'Incident response plan documenté et testé',
    'Formation continue des équipes sur les menaces',
    'Bug bounty program pour chercheurs en sécurité',
    'Mises à jour de sécurité appliquées sous 24h',
    'Veille permanente sur CVE et vulnérabilités'
  ];

  return (
    <>
      <Helmet>
        <title>Sécurité & Conformité - RGPD, ISO 27001, SOC 2 | FinanceHome</title>
        <meta
          name="description"
          content="Découvrez les mesures de sécurité FinanceHome : chiffrement AES-256, audit trail, RBAC, conformité RGPD. Certifications ISO 27001 et SOC 2 en cours."
        />
      </Helmet>

      <div className="bg-white pt-20">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#5E17EB] to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Sécurité & Conformité
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Security by design. Vos données et opérations protégées par les meilleurs standards de l'industrie.
              </p>
              <div className="flex items-center justify-center flex-wrap gap-4 text-sm">
                <div className="px-4 py-2 bg-white rounded-full shadow-md border border-purple-100">
                  <span className="font-semibold text-gray-700">Chiffrement AES-256</span>
                </div>
                <div className="px-4 py-2 bg-white rounded-full shadow-md border border-purple-100">
                  <span className="font-semibold text-gray-700">RGPD-ready</span>
                </div>
                <div className="px-4 py-2 bg-white rounded-full shadow-md border border-purple-100">
                  <span className="font-semibold text-gray-700">ISO 27001 en cours</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Security Pillars */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                4 piliers de sécurité
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Une architecture de sécurité multi-couches pour protéger vos données
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {securityPillars.map((pillar, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 border border-purple-100 hover:shadow-xl transition-shadow"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#5E17EB] to-purple-600 rounded-xl flex items-center justify-center mb-6">
                    <pillar.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{pillar.title}</h3>
                  <p className="text-gray-600 mb-6">{pillar.description}</p>
                  <ul className="space-y-2">
                    {pillar.details.map((detail, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance Standards */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-purple-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Standards de conformité
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Respect des réglementations et meilleures pratiques de l'industrie
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {complianceStandards.map((standard, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{standard.title}</h3>
                  <p className="text-gray-600 mb-6">{standard.description}</p>
                  <ul className="space-y-3">
                    {standard.points.map((point, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Roadmap certifications
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Notre engagement vers l'excellence en sécurité
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 border border-purple-100 text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#5E17EB] to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{cert.name}</h3>
                  <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                    {cert.status}
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{cert.description}</p>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{cert.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Security by Design */}
        <section className="py-24 bg-gradient-to-br from-[#5E17EB] to-purple-700 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold mb-6">Security by Design</h2>
                <p className="text-xl text-purple-100">
                  La sécurité est au cœur de notre architecture, pas une couche ajoutée après coup
                </p>
              </motion.div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20">
                <h3 className="text-2xl font-bold mb-8 text-center">Nos pratiques de sécurité</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {securityPractices.map((practice, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span className="text-purple-50">{practice}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 p-6 bg-white/10 rounded-xl border border-white/20">
                  <div className="flex items-start space-x-4">
                    <AlertCircle className="w-6 h-6 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold mb-2">Incident Response</h4>
                      <p className="text-purple-100 text-sm leading-relaxed">
                        En cas d'incident de sécurité, notre équipe dédiée suit un protocole documenté 
                        incluant notification sous 72h (RGPD), containment, investigation forensique, 
                        remediation et post-mortem. Contact d'urgence : security@financehome.fr
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Des questions sur notre sécurité ?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Notre équipe est disponible pour répondre à toutes vos questions de conformité et sécurité
            </p>
            <Button size="lg" className="bg-[#5E17EB] hover:bg-[#4d12c4]" asChild>
              <Link to="/contact">
                Contactez notre équipe sécurité
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default SecurityPage;
