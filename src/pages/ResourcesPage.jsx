
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FileText, BookOpen, Video, Download, ArrowRight, Clock, User } from 'lucide-react';

const ResourcesPage = () => {
  const articles = [
    {
      title: 'Guide complet des Certificats d\'Économies d\'Énergie (CEE) en 2026',
      excerpt: 'Tout ce que vous devez savoir sur le dispositif CEE : réglementations, fiches standardisées, calculs de volumes et monétisation.',
      category: 'Guide',
      date: '15 Janvier 2026',
      author: 'Équipe FinanceHome',
      readTime: '12 min',
      image: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&h=500&fit=crop',
      icon: BookOpen
    },
    {
      title: 'Comment optimiser la validation documentaire de vos projets CEE',
      excerpt: 'Méthodologie éprouvée pour réduire le temps de validation de 35% grâce à la standardisation et l\'automatisation des workflows.',
      category: 'Best Practices',
      date: '8 Janvier 2026',
      author: 'Marie Dubois',
      readTime: '8 min',
      image: 'https://picsum.photos/id/119/800/500',
      icon: FileText
    },
    {
      title: 'Conformité RGPD et audit trail : exigences pour les opérations CEE',
      excerpt: 'Les obligations légales en matière de traçabilité et protection des données dans le secteur énergétique.',
      category: 'Conformité',
      date: '20 Décembre 2025',
      author: 'Thomas Laurent',
      readTime: '10 min',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
      icon: FileText
    },
    {
      title: 'Cas client : Comment GreenAggregator a multiplié par 2 son volume de projets',
      excerpt: 'Étude de cas détaillée montrant comment un agrégateur a transformé ses opérations avec FinanceHome.',
      category: 'Case Study',
      date: '10 Décembre 2025',
      author: 'Sophie Martin',
      readTime: '15 min',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop',
      icon: Video
    }
  ];

  const resources = [
    {
      title: 'Checklist validation projet CEE',
      description: 'Liste complète des documents requis par type de projet',
      type: 'PDF',
      icon: Download
    },
    {
      title: 'Template calcul volumes CEE',
      description: 'Fichier Excel pour calculer vos volumes selon les fiches',
      type: 'XLSX',
      icon: Download
    },
    {
      title: 'Guide conformité RGPD CEE',
      description: 'Documentation complète pour la mise en conformité',
      type: 'PDF',
      icon: Download
    }
  ];

  return (
    <>
      <Helmet>
        <title>Resources - Guides, Articles & Cas Clients CEE | FinanceHome</title>
        <meta
          name="description"
          content="Accédez aux ressources FinanceHome : guides CEE, best practices, case studies, templates. Expertise sur les certificats d'économies d'énergie et conformité."
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
                Ressources & Expertise CEE
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Guides, articles, case studies et templates pour optimiser vos opérations CEE
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Articles & Guides</h2>
              <p className="text-gray-600">Expertise et meilleures pratiques du secteur CEE</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {articles.map((article, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#5E17EB] text-white text-sm font-medium rounded-full">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#5E17EB] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{article.date}</span>
                      <Button
                        variant="ghost"
                        className="text-[#5E17EB] hover:text-[#4d12c4] p-0"
                        onClick={() => {
                          // Placeholder - article detail would be implemented
                        }}
                      >
                        Lire l'article
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Downloadable Resources */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-purple-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Templates & Checklists
                </h2>
                <p className="text-xl text-gray-600">
                  Téléchargez nos ressources gratuites pour optimiser vos processus
                </p>
              </div>

              <div className="space-y-6">
                {resources.map((resource, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#5E17EB] to-purple-600 rounded-lg flex items-center justify-center">
                        <resource.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{resource.title}</h3>
                        <p className="text-sm text-gray-600">{resource.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                        {resource.type}
                      </span>
                      <Button
                        size="sm"
                        className="bg-[#5E17EB] hover:bg-[#4d12c4]"
                        onClick={() => {
                          // Placeholder - download would be implemented
                        }}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Télécharger
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#5E17EB] to-purple-700 rounded-2xl p-12 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">
                Restez informé des dernières actualités CEE
              </h2>
              <p className="text-xl text-purple-100 mb-8">
                Recevez nos guides, case studies et analyses directement dans votre boîte mail
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
                />
                <Button className="bg-white text-[#5E17EB] hover:bg-gray-100">
                  S'inscrire
                </Button>
              </div>
              <p className="text-sm text-purple-200 mt-4">
                Pas de spam. Désinscription en un clic.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Besoin d'aide pour vos opérations CEE ?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Notre équipe d'experts est disponible pour répondre à vos questions
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

export default ResourcesPage;
