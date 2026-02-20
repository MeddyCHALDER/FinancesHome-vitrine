
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, HelpCircle, ChevronDown } from 'lucide-react';

const PricingPage = () => {
  const tiers = [
    {
      name: 'Starter',
      description: 'Pour débuter avec les fonctionnalités essentielles',
      price: 'Sur mesure',
      priceSubtitle: 'par organisation',
      features: [
        'Jusqu\'à 50 projets par mois',
        'Workflow de base avec statuts',
        'Stockage 10 Go documents',
        'Support email (48h)',
        'Audit trail basique',
        '3 utilisateurs inclus'
      ],
      cta: 'Commencer',
      highlighted: false
    },
    {
      name: 'Growth',
      description: 'Pour les équipes en croissance rapide',
      price: 'Sur mesure',
      priceSubtitle: 'par organisation',
      features: [
        'Projets illimités',
        'Workflows avancés personnalisables',
        'Stockage 100 Go documents',
        'Support prioritaire (24h)',
        'Audit trail complet + exports',
        'Utilisateurs illimités',
        'API REST complète',
        'Intégrations tierces',
        'Formation équipe incluse'
      ],
      cta: 'Essayer Growth',
      highlighted: true
    },
    {
      name: 'Enterprise',
      description: 'Pour les organisations à grande échelle',
      price: 'Custom',
      priceSubtitle: 'volume personnalisé',
      features: [
        'Tout de Growth +',
        'SLA garanti 99.9%',
        'Support dédié avec CSM',
        'Stockage illimité',
        'Intégrations sur mesure',
        'Environnement dédié (option)',
        'SSO / SAML',
        'Audit de conformité annuel',
        'Formation avancée équipe'
      ],
      cta: 'Nous contacter',
      highlighted: false
    }
  ];

  const faqPricing = [
    {
      question: 'Comment est calculée la tarification ?',
      answer: 'Nous adoptons une approche sur mesure basée sur le nombre de projets, d\'utilisateurs et vos besoins spécifiques. Contactez-nous pour un devis personnalisé adapté à votre volume d\'activité CEE.'
    },
    {
      question: 'Y a-t-il des frais cachés ?',
      answer: 'Non, nos prix incluent toutes les fonctionnalités de la tier choisie. Les seuls frais additionnels possibles concernent des besoins très spécifiques (intégrations custom complexes, stockage massif au-delà des quotas).'
    },
    {
      question: 'Puis-je changer de plan en cours d\'année ?',
      answer: 'Oui, vous pouvez upgrader ou downgrader à tout moment. Les ajustements de facturation sont calculés au prorata pour garantir une facturation équitable.'
    },
    {
      question: 'Proposez-vous des réductions pour les volumes importants ?',
      answer: 'Absolument. Pour les grandes organisations gérant des centaines de projets CEE par mois, nous proposons des tarifs dégressifs. Contactez notre équipe commerciale pour discuter de votre cas.'
    },
    {
      question: 'Comment fonctionne l\'accès investisseur ?',
      answer: 'L\'accès investisseur est accordé sur approbation après processus KYC. Il n\'y a pas de frais d\'accès pour les investisseurs qualifiés - seules les organisations producteurs/agrégateurs paient pour la plateforme.'
    },
    {
      question: 'Offrez-vous une période d\'essai ?',
      answer: 'Oui, nous proposons une démo guidée avec environnement de test pendant 14 jours pour évaluer FinanceHome avec vos données réelles (anonymisées).'
    }
  ];

  const addOns = [
    {
      name: 'Formation avancée',
      description: 'Sessions sur mesure pour vos équipes (à distance ou sur site)',
      pricing: 'Sur devis'
    },
    {
      name: 'Intégration personnalisée',
      description: 'Connecteurs custom pour vos systèmes legacy',
      pricing: 'Sur devis'
    },
    {
      name: 'Audit de conformité',
      description: 'Revue annuelle par cabinet externe avec rapport',
      pricing: 'Sur devis'
    },
    {
      name: 'SLA Premium',
      description: 'Engagement 99.99% avec compensation',
      pricing: 'Sur devis'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Tarification - Plans Starter, Growth, Enterprise | FinanceHome</title>
        <meta
          name="description"
          content="Découvrez les plans tarifaires FinanceHome : Starter pour démarrer, Growth pour scaler, Enterprise pour grands volumes. Tarification sur mesure par organisation."
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
                Tarification transparente
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Choisissez le plan adapté à vos opérations CEE. Évolutif, sans frais cachés.
              </p>
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-md border border-purple-100">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-gray-700">
                  14 jours d'essai disponibles • Accès investisseur gratuit
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {tiers.map((tier, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                    tier.highlighted ? 'ring-2 ring-[#5E17EB] scale-105 md:scale-110' : 'border border-gray-200'
                  }`}
                >
                  {tier.highlighted && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-[#5E17EB] to-purple-600 text-white px-6 py-2 text-sm font-semibold rounded-bl-xl">
                      Populaire
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                    <p className="text-gray-600 mb-6 h-12">{tier.description}</p>
                    <div className="mb-8">
                      <div className="text-4xl font-bold text-gray-900 mb-1">{tier.price}</div>
                      <div className="text-sm text-gray-500">{tier.priceSubtitle}</div>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full ${
                        tier.highlighted
                          ? 'bg-[#5E17EB] hover:bg-[#4d12c4]'
                          : 'bg-gray-900 hover:bg-gray-800'
                      }`}
                      asChild
                    >
                      <Link to="/contact">
                        {tier.cta}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-16">
              <p className="text-gray-600 mb-6 text-lg">
                Besoin d'une solution personnalisée pour votre volume d'activité ?
              </p>
              <Button size="lg" variant="outline" className="border-[#5E17EB] text-[#5E17EB] hover:bg-purple-50" asChild>
                <Link to="/contact">Parlez à notre équipe commerciale</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Add-ons */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-purple-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Options supplémentaires
                </h2>
                <p className="text-xl text-gray-600">
                  Personnalisez votre expérience avec nos services additionnels
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {addOns.map((addon, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{addon.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{addon.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#5E17EB] font-semibold">{addon.pricing}</span>
                      <Link to="/contact" className="text-sm text-[#5E17EB] hover:underline">
                        En savoir plus →
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Pricing */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Questions fréquentes sur la tarification
                </h2>
              </div>

              <div className="space-y-6">
                {faqPricing.map((faq, index) => (
                  <motion.details
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:border-[#5E17EB] transition-all overflow-hidden"
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
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-[#5E17EB] to-purple-700 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Prêt à transformer vos opérations CEE ?</h2>
            <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
              Discutons de vos besoins et trouvons le plan parfait pour votre organisation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-[#5E17EB] hover:bg-gray-100" asChild>
                <Link to="/contact">Demander une démo</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/product">Voir les fonctionnalités</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PricingPage;
