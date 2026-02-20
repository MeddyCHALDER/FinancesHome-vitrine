
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Zap,
  Target,
  Award,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Users,
  BarChart3,
  Shield,
  Clock,
  DollarSign
} from 'lucide-react';

const SolutionsPage = () => {
  const solutions = [
    {
      id: 'producteurs',
      title: 'Pour Producteurs',
      subtitle: 'Accélérez la validation et la monétisation de vos projets CEE',
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
      benefits: [
        {
          title: 'Pipeline CEE centralisé',
          description: 'Visualisez tous vos projets avec statuts en temps réel et alertes automatiques',
          icon: BarChart3
        },
        {
          title: 'Workflows documentaires unifiés',
          description: 'Toutes les demandes, validations et signatures dans un seul système',
          icon: CheckCircle
        },
        {
          title: 'Calculs CEE automatiques',
          description: 'Le moteur applique les fiches standardisées et calcule les volumes instantanément',
          icon: Zap
        },
        {
          title: 'Export listings financement',
          description: 'Générez des listings structurés pour investisseurs en quelques clics',
          icon: DollarSign
        }
      ],
      metrics: [
        { value: '-35%', label: 'Temps de traitement' },
        { value: '+12', label: 'Projets/mois' },
        { value: '100%', label: 'Traçabilité' }
      ],
      caseStudy: 'EnergiePlus a réduit son cycle de validation de 35% et traite maintenant 12 projets de plus par mois avec la même équipe, tout en garantissant une conformité totale.'
    },
    {
      id: 'aggregateurs',
      title: 'Pour Agrégateurs',
      subtitle: 'Standardisez les opérations multi-producteurs à grande échelle',
      icon: Target,
      color: 'from-purple-500 to-pink-500',
      benefits: [
        {
          title: 'Gestion multi-producteurs',
          description: 'Centralisez tous vos producteurs sur une seule plateforme avec vues consolidées',
          icon: Users
        },
        {
          title: 'Workflows configurables',
          description: 'Définissez des processus de validation par rôle, région ou type de projet',
          icon: Target
        },
        {
          title: 'Reporting consolidé',
          description: 'Tableaux de bord multi-niveaux avec drill-down par producteur ou projet',
          icon: BarChart3
        },
        {
          title: 'Audit trail complet',
          description: 'Traçabilité totale de toutes les actions pour conformité et audits',
          icon: Shield
        }
      ],
      metrics: [
        { value: '200+', label: 'Projets gérés' },
        { value: '-60%', label: 'Temps admin' },
        { value: '15+', label: 'Producteurs' }
      ],
      caseStudy: 'GreenAggregator gère désormais 15 producteurs et 200+ projets simultanés, avec un temps administratif réduit de 60% grâce à l\'automatisation des workflows.'
    },
    {
      id: 'investisseurs',
      title: 'Pour Investisseurs',
      subtitle: 'Accédez à des opportunités structurées avec indicateurs de risque clairs',
      icon: Award,
      color: 'from-green-500 to-emerald-500',
      benefits: [
        {
          title: 'Dashboard dédié',
          description: 'Portail investisseur avec métriques clés, performances et indicateurs de risque',
          icon: BarChart3
        },
        {
          title: 'Projets pré-validés',
          description: 'Accès uniquement aux projets ayant passé les contrôles de conformité',
          icon: CheckCircle
        },
        {
          title: 'Calendriers transparents',
          description: 'Prévisions de remboursement claires avec suivi automatique des échéances',
          icon: Clock
        },
        {
          title: 'KYC intégré',
          description: 'Processus d\'onboarding conforme avec vérification d\'identité sécurisée',
          icon: Shield
        }
      ],
      metrics: [
        { value: '+18%', label: 'ROI moyen' },
        { value: '2.4M', label: 'MWh disponibles' },
        { value: '100%', label: 'Conformité' }
      ],
      caseStudy: 'FundVert Capital a augmenté son ROI de 18% grâce à la transparence des données et la qualité des projets pré-validés sur FinanceHome.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Solutions CEE - Producteurs, Agrégateurs, Investisseurs | FinanceHome</title>
        <meta
          name="description"
          content="Découvrez les solutions FinanceHome adaptées à chaque rôle : producteurs CEE, agrégateurs multi-sites, et investisseurs. Optimisez vos opérations avec notre plateforme."
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
                Des solutions adaptées à chaque rôle
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Producteurs, agrégateurs, investisseurs : optimisez vos opérations CEE avec une plateforme pensée pour vous
              </p>
            </motion.div>
          </div>
        </section>

        {/* Solutions Tabs */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="producteurs" className="w-full">
              <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-3 mb-16">
                {solutions.map((solution) => (
                  <TabsTrigger
                    key={solution.id}
                    value={solution.id}
                    className="data-[state=active]:bg-[#5E17EB] data-[state=active]:text-white"
                  >
                    <solution.icon className="w-5 h-5 mr-2" />
                    {solution.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {solutions.map((solution, solutionIndex) => (
                <TabsContent key={solution.id} value={solution.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Solution Header */}
                    <div className="text-center mb-16">
                      <div className={`w-20 h-20 bg-gradient-to-br ${solution.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                        <solution.icon className="w-10 h-10 text-white" />
                      </div>
                      <h2 className="text-4xl font-bold text-gray-900 mb-4">{solution.title}</h2>
                      <p className="text-xl text-gray-600 max-w-3xl mx-auto">{solution.subtitle}</p>
                    </div>

                    {/* Benefits Grid */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                      {solution.benefits.map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow"
                        >
                          <div className={`w-12 h-12 bg-gradient-to-br ${solution.color} rounded-xl flex items-center justify-center mb-4`}>
                            <benefit.icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                          <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Metrics */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                      {solution.metrics.map((metric, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                          className={`bg-gradient-to-br ${solution.color} rounded-2xl p-8 text-white text-center`}
                        >
                          <div className="text-5xl font-bold mb-2">{metric.value}</div>
                          <div className="text-lg opacity-90">{metric.label}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Case Study */}
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 md:p-12 border border-purple-100">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="w-6 h-6 text-[#5E17EB]" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-4">Cas client</h3>
                          <p className="text-gray-700 leading-relaxed text-lg">{solution.caseStudy}</p>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-12">
                      <Button size="lg" className="bg-[#5E17EB] hover:bg-[#4d12c4]" asChild>
                        <Link to="/contact">
                          Demander une démo pour {solution.title.toLowerCase()}
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-br from-[#5E17EB] to-purple-700 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Quel que soit votre rôle, nous avons la solution</h2>
            <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
              Découvrez comment FinanceHome peut transformer vos opérations CEE
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-[#5E17EB] hover:bg-gray-100" asChild>
                <Link to="/contact">Demander une démo</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/pricing">Voir la tarification</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SolutionsPage;
