
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Target, Users, Zap, Award, ArrowRight, Briefcase, GraduationCap } from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: Target,
      title: 'Mission-driven',
      description: 'Accélérer la transition énergétique en simplifiant les opérations CEE'
    },
    {
      icon: Users,
      title: 'Customer-centric',
      description: 'Construire la plateforme dont les opérateurs CEE ont réellement besoin'
    },
    {
      icon: Zap,
      title: 'Innovation continue',
      description: 'Amélioration constante basée sur les retours terrain'
    },
    {
      icon: Award,
      title: 'Excellence opérationnelle',
      description: 'Les plus hauts standards de qualité, sécurité et conformité'
    }
  ];

  const team = [
    {
      role: 'CEE Operations Expert',
      experience: '8+ ans dans les certificats d\'économies d\'énergie',
      description: 'A géré des centaines de projets CEE pour producteurs et agrégateurs. Comprend les défis opérationnels de l\'intérieur.',
      image: 'https://images.unsplash.com/photo-1637622124152-33adfabcc923?w=400&h=400&fit=crop',
      icon: Briefcase
    },
    {
      role: 'Compliance & Security Lead',
      experience: 'Ex-auditeur RGPD et ISO 27001',
      description: 'Expert en conformité réglementaire et sécurité des données. A audité 50+ organisations dans le secteur énergie.',
      image: 'https://images.unsplash.com/photo-1637622124152-33adfabcc923?w=400&h=400&fit=crop',
      icon: Award
    },
    {
      role: 'Fintech Engineering',
      experience: 'Architectes de systèmes de paiement sécurisés',
      description: 'Équipe ayant construit des plateformes fintech traitant des millions d\'euros de transactions.',
      image: 'https://images.unsplash.com/photo-1637622124152-33adfabcc923?w=400&h=400&fit=crop',
      icon: GraduationCap
    },
    {
      role: 'Partnerships & Growth',
      experience: 'Réseau d\'investisseurs et producteurs CEE',
      description: 'Connecte les opportunités de financement avec les projets qualifiés. Expertise en structuration de deals.',
      image: 'https://images.unsplash.com/photo-1637622124152-33adfabcc923?w=400&h=400&fit=crop',
      icon: Users
    }
  ];

  const milestones = [
    {
      year: '2024',
      title: 'Fondation',
      description: 'Création de FinanceHome par des opérateurs CEE frustrés par les outils existants'
    },
    {
      year: '2025',
      title: 'MVP & Pilotes',
      description: 'Lancement du MVP avec 3 producteurs pilotes. Validation product-market fit.'
    },
    {
      year: '2026',
      title: 'Scaling',
      description: 'Extension à 15+ organisations. Lancement du module investisseur.'
    },
    {
      year: '2027',
      title: 'Certifications',
      description: 'Roadmap ISO 27001 et SOC 2. Expansion européenne.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>À Propos - Notre Mission & Équipe | FinanceHome</title>
        <meta
          name="description"
          content="Découvrez FinanceHome : équipe d'experts CEE, mission, valeurs. Construit par des opérateurs pour simplifier les certificats d'économies d'énergie."
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
                Construit par des opérateurs,<br />pour des opérateurs
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                FinanceHome est née de la frustration face aux outils dispersés et processus manuels 
                qui ralentissent les opérations CEE. Nous construisons la plateforme que nous aurions 
                voulu avoir quand nous gérions des centaines de projets.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#5E17EB] to-purple-700 rounded-2xl p-12 text-white text-center"
              >
                <h2 className="text-4xl font-bold mb-6">Notre mission</h2>
                <p className="text-xl leading-relaxed text-purple-100">
                  Accélérer la transition énergétique en rendant les opérations CEE plus efficaces, 
                  transparentes et accessibles. Nous croyons que la complexité administrative ne devrait 
                  jamais freiner l'impact environnemental.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-purple-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos valeurs</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Les principes qui guident notre développement produit et nos relations
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 text-center"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#5E17EB] to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
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
                Une équipe qui comprend vos défis
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Expertise terrain, ingénierie de pointe, et passion pour l'impact
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start space-x-6">
                    <div className="relative flex-shrink-0">
                      <img
                        src={member.image}
                        alt={member.role}
                        className="w-24 h-24 rounded-xl object-cover"
                      />
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-[#5E17EB] to-purple-600 rounded-lg flex items-center justify-center">
                        <member.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{member.role}</h3>
                      <p className="text-sm text-[#5E17EB] font-semibold mb-3">{member.experience}</p>
                      <p className="text-gray-600 leading-relaxed">{member.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 bg-gradient-to-br from-purple-50 via-white to-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Notre parcours</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                De l'idée initiale à la plateforme de référence CEE
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#5E17EB] to-purple-600 hidden md:block"></div>
                
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`relative mb-12 md:mb-16 ${
                      index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
                    }`}
                  >
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 relative">
                      <div className="absolute top-1/2 transform -translate-y-1/2 hidden md:block
                        ${index % 2 === 0 ? '-right-16' : '-left-16'}">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#5E17EB] to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                          {milestone.year.slice(-2)}
                        </div>
                      </div>
                      <span className="text-3xl font-bold text-[#5E17EB] mb-2 block md:hidden">{milestone.year}</span>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Careers CTA */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#5E17EB] to-purple-700 rounded-2xl p-12 text-white text-center">
              <h2 className="text-4xl font-bold mb-6">
                Rejoignez l'aventure
              </h2>
              <p className="text-xl text-purple-100 mb-8">
                Nous recrutons des talents passionnés par l'impact environnemental et l'excellence technique
              </p>
              <Button size="lg" className="bg-white text-[#5E17EB] hover:bg-gray-100" asChild>
                <Link to="/contact">
                  Voir les postes ouverts
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Envie d'en savoir plus ?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Notre équipe est disponible pour échanger sur votre projet
            </p>
            <Button size="lg" className="bg-[#5E17EB] hover:bg-[#4d12c4]" asChild>
              <Link to="/contact">
                Contactez-nous
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
