import React, { useState } from 'react';
import { Building2, Heart, Target, Users, Briefcase, Edit3 } from 'lucide-react';

const InfosGenerales: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Entreprise');

  const tabs = [
    { id: 'Entreprise', label: 'Entreprise', icon: Building2 },
    { id: 'ADN', label: 'ADN', icon: Heart },
    { id: 'Valeurs', label: 'Valeurs', icon: Target },
    { id: 'Cibles Clients', label: 'Cibles Clients', icon: Users },
    { id: 'Prestations', label: 'Prestations', icon: Briefcase },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Entreprise':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Raison sociale</label>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <p className="text-gray-900 font-medium">Charly Gaillard SARL</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Secteur d'activité</label>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <p className="text-gray-900">Services numériques & Marketing digital</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Nombre d'employés</label>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <p className="text-gray-900 font-medium">1-5 employés</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Année de fondation</label>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <p className="text-gray-900 font-medium">2020</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'ADN':
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Historique de l'entreprise</label>
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <p className="text-gray-900 leading-relaxed">
                  Fondée en 2020, Charly Gaillard SARL est née de la passion pour le développement web et le marketing digital. 
                  Spécialisée dans la création de solutions numériques sur mesure, l'entreprise accompagne les PME et startups 
                  dans leur transformation digitale. Avec une approche centrée sur l'innovation et la qualité, nous avons développé 
                  une expertise reconnue dans le développement d'applications web modernes et les stratégies de marketing digital.
                </p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Texte de présentation</label>
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <p className="text-gray-900 leading-relaxed">
                  Nous sommes une agence digitale innovante qui transforme vos idées en solutions numériques performantes. 
                  Notre mission est d'accompagner les entreprises dans leur croissance digitale en proposant des services 
                  personnalisés et des technologies de pointe. Nous croyons en la puissance du digital pour créer de la valeur 
                  et développer des relations durables avec nos clients.
                </p>
              </div>
            </div>
          </div>
        );

      case 'Valeurs':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Innovation', description: 'Nous restons à la pointe des technologies pour offrir des solutions avant-gardistes.' },
              { title: 'Excellence', description: 'Chaque projet est réalisé avec le plus haut niveau de qualité et de professionnalisme.' },
              { title: 'Transparence', description: 'Communication claire et honnête avec nos clients à chaque étape du projet.' },
              { title: 'Agilité', description: 'Adaptation rapide aux besoins changeants et aux nouvelles opportunités du marché.' },
              { title: 'Collaboration', description: 'Travail en équipe et partenariat étroit avec nos clients pour atteindre leurs objectifs.' },
              { title: 'Durabilité', description: 'Développement de solutions pérennes qui accompagnent la croissance à long terme.' }
            ].map((valeur, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{valeur.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{valeur.description}</p>
              </div>
            ))}
          </div>
        );

      case 'Cibles Clients':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Startups Tech', description: 'Jeunes entreprises technologiques cherchant à développer leur présence digitale.' },
              { title: 'PME Locales', description: 'Petites et moyennes entreprises souhaitant moderniser leurs outils numériques.' },
              { title: 'E-commerce', description: 'Boutiques en ligne nécessitant des solutions de vente performantes.' },
              { title: 'Professions Libérales', description: 'Médecins, avocats, consultants ayant besoin de visibilité en ligne.' },
              { title: 'Associations', description: 'Organisations à but non lucratif cherchant à améliorer leur communication.' },
              { title: 'Artisans', description: 'Artisans et créateurs voulant valoriser leur savoir-faire sur le web.' }
            ].map((client, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{client.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{client.description}</p>
              </div>
            ))}
          </div>
        );

      case 'Prestations':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Développement Web', description: 'Création de sites web modernes, responsives et optimisés pour le SEO.' },
              { title: 'Applications Mobiles', description: 'Développement d\'applications iOS et Android natives et hybrides.' },
              { title: 'E-commerce', description: 'Solutions de vente en ligne complètes avec gestion des stocks et paiements.' },
              { title: 'Marketing Digital', description: 'Stratégies SEO, SEA, réseaux sociaux et campagnes publicitaires ciblées.' },
              { title: 'Consulting IT', description: 'Conseil en transformation digitale et optimisation des processus métier.' },
              { title: 'Maintenance & Support', description: 'Maintenance technique, mises à jour et support client continu.' }
            ].map((prestation, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{prestation.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{prestation.description}</p>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      {/* Bannière bleue avec abeille et titre */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
        
        <div className="relative z-10 flex items-center justify-between">
          {/* Zone gauche avec abeille */}
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 flex items-center justify-center">
              <img 
                src="/bee-mascot-violet.png" 
                alt="Beezia Mascot" 
                className="w-16 h-16 object-contain drop-shadow-lg"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Infos Générales</h1>
              <p className="text-blue-100 text-lg">Informations de base sur votre entreprise</p>
            </div>
          </div>
          
          {/* Zone droite avec bouton d'action */}
          <div className="flex items-center space-x-4">
            <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200 font-semibold flex items-center space-x-2">
              <Edit3 className="w-4 h-4" />
              <span>Modifier</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation par onglets */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-0" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-3 px-6 py-4 text-sm font-semibold border-b-2 transition-all duration-200 ${
                    isActive
                      ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
        
        {/* Contenu de l'onglet actif */}
        <div className="p-8">
          {renderTabContent()}
        </div>
      </div>

      {/* Section statistiques rapides - conservée de l'ancienne version */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
        <div className="flex items-center space-x-3 mb-6">
          <Building2 className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Aperçu rapide</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
            <div className="text-gray-600 text-sm">Satisfaction client</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">24h</div>
            <div className="text-gray-600 text-sm">Temps de réponse</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
            <div className="text-gray-600 text-sm">Projets livrés</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">5★</div>
            <div className="text-gray-600 text-sm">Note moyenne</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfosGenerales;