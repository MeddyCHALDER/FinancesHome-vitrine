
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  FileCheck,
  Shield,
  Calculator,
  Wallet,
  ArrowRight,
  CheckCircle,
  Zap,
  Clock,
  Users,
  Database,
  FileText,
  TrendingUp
} from 'lucide-react';

const ProductPage = () => {
  const modules = [
    {
      icon: FileCheck,
      title: 'CEE Project Management',
      description: 'Centralisez l\'ensemble du cycle de vie de vos projets CEE',
      features: [
        'Workflows de statut personnalisables',
        'Assignations par rôle et responsable',
        'Demandes de documents automatisées',
        'Suivi en temps réel de l\'avancement',
        'Notifications et alertes intelligentes',
        'Historique complet des modifications'
      ],
      useCases: [
        'Créer et suivre des centaines de projets simultanément',
        'Assigner automatiquement les tâches selon le statut',
        'Centraliser toutes les communications projet'
      ],
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Compliance & Audit Trail',
      description: 'Garantissez la conformité totale et la traçabilité',
      features: [
        'Actions horodatées avec utilisateur identifié',
        'Workflow d\'approbations multi-niveaux',
        'Signatures électroniques conformes eIDAS',
        'Export audit trail pour contrôles externes',
        'Gestion des droits RBAC',
        'Conformité RGPD native'
      ],
      useCases: [
        'Préparer les audits réglementaires en quelques clics',
        'Prouver la conformité de chaque étape',
        'Gérer les consentements et droits utilisateurs'
      ],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Calculator,
      title: 'Pricing & Valorisation Engine',
      description: 'Automatisez les calculs CEE selon les règles en vigueur',
      features: [
        'Tarification €/MWh configurable',
        'Calculs automatiques selon fiches standardisées',
        'Overrides admin pour cas spécifiques',
        'Support multi-dispositifs et opérations',
        'Historique des règles et versions',
        'Exports pour reporting financier'
      ],
      useCases: [
        'Calculer automatiquement les volumes CEE',
        'Appliquer les tarifs actualisés en temps réel',
        'Gérer les exceptions et ajustements manuels'
      ],
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Wallet,
      title: 'Investor Funding Module',
      description: 'Structurez et publiez des opportunités de financement',
      features: [
        'Listings projets avec données structurées',
        'Calculs ROI et indicateurs de risque',
        'Calendriers de remboursement automatiques',
        'Dashboard investisseur dédié',
        'Processus KYC intégré',
        'Reporting de performance'
      ],
      useCases: [
        'Publier des listings pour investisseurs qualifiés',
        'Suivre les performances et remboursements',
        'Automatiser la communication avec investisseurs'
      ],
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  const integrations = [
    { name: 'API REST complète', description: 'Intégrez avec vos systèmes existants' },
    { name: 'Webhooks', description: 'Notifications en temps réel' },
    { name: 'Export CSV/Excel', description: 'Données portables' },
    { name: 'SSO / SAML', description: 'Authentification unifiée' }
  ];

  return (
    <>
      <Helmet>
        <title>Product - Modules CEE Complets | FinanceHome</title>
        <meta
          name="description"
          content="Découvrez les 4 modules FinanceHome : Project Management, Compliance, Pricing Engine, et Investor Funding. Fonctionnalités détaillées et cas d'usage CEE."
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
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Une plateforme complète pour vos opérations CEE
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                4 modules intégrés pour gérer l'ensemble du cycle de vie, de la création à la monétisation
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-[#5E17EB] hover:bg-[#4d12c4]" asChild>
                  <Link to="/contact">
                    Demander une démo
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-[#5E17EB] text-[#5E17EB]" asChild>
                  <Link to="/pricing">Voir la tarification</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Modules Detail */}
        {modules.map((module, index) => (
          <section
            key={index}
            className={`py-24 ${index % 2 === 0 ? 'bg-white' : 'bg-gradient-to-br from-gray-50 to-purple-50'}`}
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid lg:grid-cols-2 gap-12 items-start"
              >
                <div>
                  <div className={`w-16 h-16 bg-gradient-to-br ${module.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                    <module.icon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">{module.title}</h2>
                  <p className="text-xl text-gray-600 mb-8">{module.description}</p>
                  
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Fonctionnalités clés</h3>
                    <ul className="space-y-3">
                      {module.features.map((feature, i) => (
                        <li key={i} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="lg:pl-12">
                  <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Cas d'usage</h3>
                    <div className="space-y-6">
                      {module.useCases.map((useCase, i) => (
                        <div key={i} className="flex items-start space-x-4">
                          <div className={`w-8 h-8 bg-gradient-to-br ${module.gradient} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <span className="text-white font-bold text-sm">{i + 1}</span>
                          </div>
                          <p className="text-gray-700 pt-1">{useCase}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-100">
                    <p className="text-sm text-gray-700">
                      <strong>Exemple CEE:</strong> Un agrégateur gère 200+ projets simultanés 
                      avec ce module, réduisant son temps de traitement de 60% grâce à l'automatisation 
                      des workflows et la centralisation des documents.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        ))}

        {/* Integrations */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-purple-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Intégrations & API</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Connectez FinanceHome à votre écosystème existant
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {integrations.map((integration, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                >
                  <Zap className="w-8 h-8 text-[#5E17EB] mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">{integration.name}</h3>
                  <p className="text-sm text-gray-600">{integration.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-[#5E17EB] to-purple-700 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Prêt à découvrir FinanceHome ?</h2>
            <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
              Demandez une démo personnalisée et voyez comment nous pouvons transformer vos opérations CEE
            </p>
            <Button size="lg" className="bg-white text-[#5E17EB] hover:bg-gray-100" asChild>
              <Link to="/contact">
                Demander une démo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductPage;
