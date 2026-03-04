
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { sendInvestorEmail } from '@/lib/emailApi';
import {
  BarChart3,
  Shield,
  Clock,
  CheckCircle,
  TrendingUp,
  DollarSign,
  FileCheck,
  AlertCircle
} from 'lucide-react';

const InvestorAccessPage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    investmentRange: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendInvestorEmail(formData);
      toast({
        title: "Demande envoyée !",
        description: "Notre équipe vous contactera sous 48h pour valider votre accès investisseur.",
      });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        phone: '',
        investmentRange: '',
        message: ''
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erreur d'envoi",
        description: err.message || "Impossible d'envoyer la demande. Vérifiez que le serveur est démarré (npm run server) et que resend_key est configuré dans .env",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const features = [
    {
      icon: BarChart3,
      title: 'Dashboard avec métriques clés',
      description: 'Visualisez performances, volumes CEE, et indicateurs de risque en temps réel'
    },
    {
      icon: TrendingUp,
      title: 'Indicateurs de risque clairs',
      description: 'Évaluations transparentes basées sur la qualité des projets et la conformité'
    },
    {
      icon: Clock,
      title: 'Calendrier de remboursement',
      description: 'Prévisions précises avec suivi automatique des échéances et alertes'
    },
    {
      icon: FileCheck,
      title: 'Documentation complète',
      description: 'Accès à tous les documents validés, signatures et audit trail'
    }
  ];

  const kycSteps = [
    'Vérification d\'identité (pièce d\'identité officielle)',
    'Justificatif de domicile récent',
    'Preuve de capacité d\'investissement',
    'Questionnaire de conformité AML/KYC',
    'Validation par notre équipe compliance (48-72h)'
  ];

  const compliancePoints = [
    'Conformité RGPD pour toutes les données personnelles',
    'Chiffrement end-to-end des documents sensibles',
    'Audit trail complet de toutes les interactions',
    'Processus KYC conforme aux standards européens',
    'Certifications ISO 27001 et SOC 2 en cours'
  ];

  return (
    <>
      <Helmet>
        <title>Accès Investisseur - Portail CEE Sécurisé | FinanceHome</title>
        <meta
          name="description"
          content="Accédez au portail investisseur FinanceHome. Dashboard avec indicateurs de risque, projets CEE pré-validés, calendriers de remboursement, processus KYC intégré."
        />
      </Helmet>

      <div className="bg-white pt-20">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-green-50 via-white to-emerald-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Portail Investisseur
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Accédez à des opportunités CEE structurées avec données complètes, 
                indicateurs de risque clairs et conformité garantie
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Accès sur approbation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span>KYC sécurisé</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileCheck className="w-5 h-5 text-green-500" />
                  <span>Conformité totale</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Fonctionnalités du portail investisseur
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Tout ce dont vous avez besoin pour investir en toute confiance
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 border border-green-100 hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* KYC Process */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-green-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Processus KYC intégré
                </h2>
                <p className="text-xl text-gray-600">
                  Un parcours d'onboarding sécurisé conforme aux standards européens
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Documents requis</h3>
                <ul className="space-y-4">
                  {kycSteps.map((step, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-4"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <span className="text-gray-700 pt-1">{step}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">
                      <strong>Délai de validation :</strong> Nos équipes compliance valident 
                      votre dossier sous 48-72h ouvrées. Vous recevrez un email de confirmation 
                      avec vos identifiants d'accès au portail.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compliance */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Conformité et sécurité
                </h2>
                <p className="text-xl text-gray-600">
                  Vos données et investissements protégés par les meilleurs standards
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {compliancePoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3 p-6 bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-100"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{point}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Access Request Form */}
        <section id="investor-form" className="py-24 bg-gradient-to-br from-green-50 via-white to-emerald-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Demander l'accès investisseur
                </h2>
                <p className="text-xl text-gray-600">
                  Remplissez le formulaire ci-dessous et nous vous contacterons sous 48h
                </p>
              </div>

              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email professionnel *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Société / Fonds d'investissement *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="investmentRange" className="block text-sm font-medium text-gray-700 mb-2">
                    Fourchette d'investissement envisagée
                  </label>
                  <select
                    id="investmentRange"
                    name="investmentRange"
                    value={formData.investmentRange}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                  >
                    <option value="">Sélectionnez une fourchette</option>
                    <option value="50k-200k">50k€ - 200k€</option>
                    <option value="200k-500k">200k€ - 500k€</option>
                    <option value="500k-1m">500k€ - 1M€</option>
                    <option value="1m+">1M€+</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message (optionnel)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                    placeholder="Décrivez vos objectifs d'investissement ou questions..."
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                >
                  {loading ? 'Envoi en cours...' : "Soumettre ma demande d'accès"}
                </Button>

                <p className="text-sm text-gray-500 mt-4 text-center">
                  En soumettant ce formulaire, vous acceptez notre politique de confidentialité 
                  et le traitement de vos données dans le cadre du processus KYC.
                </p>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default InvestorAccessPage;
