import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight } from 'lucide-react';

const ConditionsPage = () => {
  const sections = [
    {
      id: 'objet',
      title: '1. Objet et acceptation',
      content: [
        'Les présentes Conditions Générales d\'Utilisation (CGU) régissent l\'accès et l\'utilisation de la plateforme FinancesHome, proposée par FinancesHome Ltd, société enregistrée en Angleterre et au Pays de Galles.',
        'En accédant à la plateforme, vous acceptez sans réserve les présentes CGU. Si vous ne les acceptez pas, veuillez ne pas utiliser nos services.',
      ],
    },
    {
      id: 'services',
      title: '2. Description des services',
      content: [
        'FinancesHome est une plateforme d\'orchestration administrative et financière des Certificats d\'Économies d\'Énergie (CEE) couvrant 14 pays membres.',
        'La plateforme facilite la gestion des projets CEE, la traçabilité des opérations et la mise en relation entre les différents acteurs du marché.',
        'FinancesHome n\'exerce pas d\'activité de prestation de services d\'investissement au sens de MiFID II.',
      ],
    },
    {
      id: 'inscription',
      title: '3. Inscription et compte utilisateur',
      content: [
        'L\'utilisation de certains services nécessite la création d\'un compte. Vous vous engagez à fournir des informations exactes et à jour.',
        'Vous êtes responsable de la confidentialité de vos identifiants et de toutes les activités réalisées sous votre compte.',
        'Nous nous réservons le droit de suspendre ou fermer un compte en cas de non-respect des présentes CGU.',
      ],
    },
    {
      id: 'donnees',
      title: '4. Données personnelles et confidentialité',
      content: [
        'Le traitement de vos données personnelles est régi par notre politique de confidentialité et le règlement RGPD.',
        'Nous collectons uniquement les données nécessaires au bon fonctionnement du service et à l\'exécution de nos obligations contractuelles.',
        'Vous disposez d\'un droit d\'accès, de rectification, d\'effacement et de portabilité de vos données. Contact : dpo@financeshome.com',
      ],
    },
    {
      id: 'propiete',
      title: '5. Propriété intellectuelle',
      content: [
        'L\'ensemble des éléments de la plateforme (logiciels, designs, contenus, marques) sont la propriété exclusive de FinancesHome Ltd ou de ses concédants de licence.',
        'Toute reproduction, représentation ou exploitation non autorisée est interdite et constitutive de contrefaçon.',
        'L\'utilisation de la plateforme ne vous confère aucun droit de propriété sur les éléments qui la composent.',
      ],
    },
    {
      id: 'responsabilite',
      title: '6. Limitation de responsabilité',
      content: [
        'FinancesHome s\'efforce d\'assurer la disponibilité et la qualité du service mais ne garantit pas une disponibilité ininterrompue.',
        'Nous ne pouvons être tenus responsables des dommages indirects (perte de données, préjudice commercial, etc.) résultant de l\'utilisation du service.',
        'En cas de force majeure, nos obligations sont suspendues sans responsabilité de notre part.',
      ],
    },
    {
      id: 'modifications',
      title: '7. Modifications des CGU',
      content: [
        'Nous nous réservons le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés des changements par email ou notification in-app.',
        'La poursuite de l\'utilisation du service après modification constitue une acceptation des nouvelles conditions.',
        'La dernière version des CGU est toujours disponible sur cette page. Dernière mise à jour : mars 2026.',
      ],
    },
    {
      id: 'loi',
      title: '8. Droit applicable et juridiction',
      content: [
        'Les présentes CGU sont régies par le droit anglais.',
        'Tout litige sera soumis aux tribunaux compétents d\'Angleterre et du Pays de Galles.',
        'En cas de nullité d\'une clause, les autres dispositions restent applicables.',
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Conditions Générales d'Utilisation | FinancesHome</title>
        <meta
          name="description"
          content="Conditions générales d'utilisation de la plateforme FinancesHome - CGU, droit applicable, responsabilité."
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
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Conditions Générales d'Utilisation
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Les présentes conditions régissent l'utilisation de la plateforme FinancesHome. 
                Nous vous invitons à les lire attentivement.
              </p>
              <p className="text-sm text-gray-500">
                Dernière mise à jour : mars 2026
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contenu des CGU */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="mb-16 last:mb-0"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                    {section.title}
                  </h2>
                  <div className="space-y-4">
                    {section.content.map((paragraph, i) => (
                      <p key={i} className="text-gray-600 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Liens utiles */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Documents complémentaires
              </h2>
              <p className="text-gray-600 mb-8">
                Pour en savoir plus sur la protection de vos données et notre approche de la sécurité
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-[#5E17EB] hover:bg-[#4d12c4]" asChild>
                  <Link to="/security">
                    Sécurité & Conformité
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">
                    Nous contacter
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ConditionsPage;
