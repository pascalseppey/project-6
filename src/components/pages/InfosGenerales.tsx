import React, { useState } from 'react';
import { Building2, Heart, Target, Users, Briefcase, Edit3, Save, X } from 'lucide-react';

interface EditableFieldProps {
  value: string;
  onSave: (newValue: string) => void;
  multiline?: boolean;
  placeholder?: string;
}

const EditableField: React.FC<EditableFieldProps> = ({ 
  value, 
  onSave, 
  multiline = false, 
  placeholder = "Cliquez pour modifier..." 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="relative">
        {multiline ? (
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-4 border-2 border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={4}
            placeholder={placeholder}
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-4 border-2 border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={placeholder}
            autoFocus
          />
        )}
        
        <div className="flex items-center space-x-2 mt-3">
          <button
            onClick={handleSave}
            className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Sauvegarder</span>
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center space-x-1 bg-gray-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Annuler</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="group relative bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={() => setIsEditing(true)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {value ? (
            <p className={`text-gray-900 ${multiline ? 'leading-relaxed' : 'font-medium'}`}>
              {value}
            </p>
          ) : (
            <p className="text-gray-400 italic">{placeholder}</p>
          )}
        </div>
        <Edit3 className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0" />
      </div>
    </div>
  );
};

const InfosGenerales: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Entreprise');
  
  // États pour tous les champs éditables
  const [entrepriseData, setEntrepriseData] = useState({
    raisonSociale: 'Charly Gaillard SARL',
    secteurActivite: 'Services numériques & Marketing digital',
    nombreEmployes: '1-5 employés',
    anneeFondation: '2020'
  });

  const [adnData, setAdnData] = useState({
    historique: 'Fondée en 2020, Charly Gaillard SARL est née de la passion pour le développement web et le marketing digital. Spécialisée dans la création de solutions numériques sur mesure, l\'entreprise accompagne les PME et startups dans leur transformation digitale. Avec une approche centrée sur l\'innovation et la qualité, nous avons développé une expertise reconnue dans le développement d\'applications web modernes et les stratégies de marketing digital.',
    presentation: 'Nous sommes une agence digitale innovante qui transforme vos idées en solutions numériques performantes. Notre mission est d\'accompagner les entreprises dans leur croissance digitale en proposant des services personnalisés et des technologies de pointe. Nous croyons en la puissance du digital pour créer de la valeur et développer des relations durables avec nos clients.'
  });

  const [valeursData, setValeursData] = useState([
    { title: 'Innovation', description: 'Nous restons à la pointe des technologies pour offrir des solutions avant-gardistes.' },
    { title: 'Excellence', description: 'Chaque projet est réalisé avec le plus haut niveau de qualité et de professionnalisme.' },
    { title: 'Transparence', description: 'Communication claire et honnête avec nos clients à chaque étape du projet.' },
    { title: 'Agilité', description: 'Adaptation rapide aux besoins changeants et aux nouvelles opportunités du marché.' },
    { title: 'Collaboration', description: 'Travail en équipe et partenariat étroit avec nos clients pour atteindre leurs objectifs.' },
    { title: 'Durabilité', description: 'Développement de solutions pérennes qui accompagnent la croissance à long terme.' }
  ]);

  const [ciblesData, setCiblesData] = useState([
    { title: 'Startups Tech', description: 'Jeunes entreprises technologiques cherchant à développer leur présence digitale.' },
    { title: 'PME Locales', description: 'Petites et moyennes entreprises souhaitant moderniser leurs outils numériques.' },
    { title: 'E-commerce', description: 'Boutiques en ligne nécessitant des solutions de vente performantes.' },
    { title: 'Professions Libérales', description: 'Médecins, avocats, consultants ayant besoin de visibilité en ligne.' },
    { title: 'Associations', description: 'Organisations à but non lucratif cherchant à améliorer leur communication.' },
    { title: 'Artisans', description: 'Artisans et créateurs voulant valoriser leur savoir-faire sur le web.' }
  ]);

  const [prestationsData, setPrestationsData] = useState([
    { title: 'Développement Web', description: 'Création de sites web modernes, responsives et optimisés pour le SEO.' },
    { title: 'Applications Mobiles', description: 'Développement d\'applications iOS et Android natives et hybrides.' },
    { title: 'E-commerce', description: 'Solutions de vente en ligne complètes avec gestion des stocks et paiements.' },
    { title: 'Marketing Digital', description: 'Stratégies SEO, SEA, réseaux sociaux et campagnes publicitaires ciblées.' },
    { title: 'Consulting IT', description: 'Conseil en transformation digitale et optimisation des processus métier.' },
    { title: 'Maintenance & Support', description: 'Maintenance technique, mises à jour et support client continu.' }
  ]);

  const tabs = [
    { id: 'Entreprise', label: 'Entreprise', icon: Building2 },
    { id: 'ADN', label: 'ADN', icon: Heart },
    { id: 'Valeurs', label: 'Valeurs', icon: Target },
    { id: 'Cibles Clients', label: 'Cibles Clients', icon: Users },
    { id: 'Prestations', label: 'Prestations', icon: Briefcase },
  ];

  const updateEntreprise = (field: string, value: string) => {
    setEntrepriseData(prev => ({ ...prev, [field]: value }));
  };

  const updateAdn = (field: string, value: string) => {
    setAdnData(prev => ({ ...prev, [field]: value }));
  };

  const updateValeur = (index: number, field: string, value: string) => {
    setValeursData(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const updateCible = (index: number, field: string, value: string) => {
    setCiblesData(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const updatePrestation = (index: number, field: string, value: string) => {
    setPrestationsData(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Entreprise':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Raison sociale</label>
                  <EditableField
                    value={entrepriseData.raisonSociale}
                    onSave={(value) => updateEntreprise('raisonSociale', value)}
                    placeholder="Nom de votre entreprise"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Secteur d'activité</label>
                  <EditableField
                    value={entrepriseData.secteurActivite}
                    onSave={(value) => updateEntreprise('secteurActivite', value)}
                    placeholder="Votre secteur d'activité"
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Nombre d'employés</label>
                  <EditableField
                    value={entrepriseData.nombreEmployes}
                    onSave={(value) => updateEntreprise('nombreEmployes', value)}
                    placeholder="Nombre d'employés"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Année de fondation</label>
                  <EditableField
                    value={entrepriseData.anneeFondation}
                    onSave={(value) => updateEntreprise('anneeFondation', value)}
                    placeholder="Année de création"
                  />
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
              <EditableField
                value={adnData.historique}
                onSave={(value) => updateAdn('historique', value)}
                multiline={true}
                placeholder="Racontez l'histoire de votre entreprise..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Texte de présentation</label>
              <EditableField
                value={adnData.presentation}
                onSave={(value) => updateAdn('presentation', value)}
                multiline={true}
                placeholder="Présentez votre entreprise en quelques lignes..."
              />
            </div>
          </div>
        );

      case 'Valeurs':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valeursData.map((valeur, index) => (
              <div key={index} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Valeur {index + 1} - Titre
                  </label>
                  <EditableField
                    value={valeur.title}
                    onSave={(value) => updateValeur(index, 'title', value)}
                    placeholder="Nom de la valeur"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Description
                  </label>
                  <EditableField
                    value={valeur.description}
                    onSave={(value) => updateValeur(index, 'description', value)}
                    multiline={true}
                    placeholder="Description de cette valeur..."
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case 'Cibles Clients':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ciblesData.map((cible, index) => (
              <div key={index} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Client {index + 1} - Type
                  </label>
                  <EditableField
                    value={cible.title}
                    onSave={(value) => updateCible(index, 'title', value)}
                    placeholder="Type de client"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Description
                  </label>
                  <EditableField
                    value={cible.description}
                    onSave={(value) => updateCible(index, 'description', value)}
                    multiline={true}
                    placeholder="Description de cette cible..."
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case 'Prestations':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prestationsData.map((prestation, index) => (
              <div key={index} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Prestation {index + 1} - Nom
                  </label>
                  <EditableField
                    value={prestation.title}
                    onSave={(value) => updatePrestation(index, 'title', value)}
                    placeholder="Nom de la prestation"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Description
                  </label>
                  <EditableField
                    value={prestation.description}
                    onSave={(value) => updatePrestation(index, 'description', value)}
                    multiline={true}
                    placeholder="Description de cette prestation..."
                  />
                </div>
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
          
          {/* Zone droite avec indicateur d'édition */}
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl border border-white/30 font-semibold flex items-center space-x-2">
              <Edit3 className="w-4 h-4" />
              <span>Mode édition activé</span>
            </div>
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

      {/* Instructions d'utilisation */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
        <div className="flex items-start space-x-4">
          <div className="bg-blue-600 rounded-full p-2 flex-shrink-0">
            <Edit3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Comment modifier vos informations</h3>
            <div className="text-gray-600 space-y-1">
              <p>• <strong>Cliquez</strong> sur n'importe quel champ pour le modifier</p>
              <p>• <strong>Appuyez sur Entrée</strong> pour sauvegarder (champs simples)</p>
              <p>• <strong>Utilisez les boutons</strong> Sauvegarder/Annuler pour les textes longs</p>
              <p>• <strong>Échap</strong> pour annuler les modifications en cours</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section statistiques rapides - conservée */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
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