import React, { useState } from 'react';
import { Users, Trophy, Star, TrendingUp, DollarSign, Clock, Shield, Heart, Edit3, Save, X, Info, Plus, Trash2 } from 'lucide-react';

interface EditableFieldProps {
  value: string;
  onSave: (newValue: string) => void;
  multiline?: boolean;
  placeholder?: string;
  isTitle?: boolean;
}

const EditableField: React.FC<EditableFieldProps> = ({ 
  value, 
  onSave, 
  multiline = false, 
  placeholder = "Cliquez pour modifier...",
  isTitle = false
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
            className="w-full p-3 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-900"
            rows={multiline ? 4 : 1}
            placeholder={placeholder}
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`w-full p-3 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
              isTitle ? 'text-xl font-semibold' : ''
            }`}
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
      className="group relative cursor-pointer"
      onClick={() => setIsEditing(true)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {value ? (
            <div className={`text-gray-900 ${
              isTitle 
                ? 'text-xl font-bold' 
                : multiline 
                  ? 'text-base leading-relaxed' 
                  : 'text-base'
            }`}>
              {value}
            </div>
          ) : (
            <div className={`text-gray-400 italic ${
              isTitle ? 'text-xl' : 'text-base'
            }`}>
              {placeholder}
            </div>
          )}
        </div>
        <Edit3 className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0" />
      </div>
    </div>
  );
};

interface Concurrent {
  id: string;
  nom: string;
  siteWeb: string;
  description: string;
  scores: {
    qualite: number;
    prix: number;
    delais: number;
    service: number;
    innovation: number;
    reputation: number;
    portfolio: number;
    communication: number;
  };
  scoreTotal: number;
  classement: number;
}

interface Prestation {
  nom: string;
  description: string;
  concurrents: Concurrent[];
}

const Concurrents: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Développement Web');
  
  // Critères d'évaluation avec icônes et couleurs
  const criteres = [
    { key: 'qualite', nom: 'Qualité', icon: Star, couleur: 'text-yellow-600' },
    { key: 'prix', nom: 'Prix', icon: DollarSign, couleur: 'text-green-600' },
    { key: 'delais', nom: 'Délais', icon: Clock, couleur: 'text-blue-600' },
    { key: 'service', nom: 'Service client', icon: Heart, couleur: 'text-red-600' },
    { key: 'innovation', nom: 'Innovation', icon: TrendingUp, couleur: 'text-purple-600' },
    { key: 'reputation', nom: 'Réputation', icon: Trophy, couleur: 'text-orange-600' },
    { key: 'portfolio', nom: 'Portfolio', icon: Shield, couleur: 'text-indigo-600' },
    { key: 'communication', nom: 'Communication', icon: Users, couleur: 'text-pink-600' }
  ];

  // États pour les prestations et leurs concurrents
  const [prestationsData, setPrestationsData] = useState<Prestation[]>([
    {
      nom: 'Développement Web',
      description: 'Création de sites web modernes, responsives et optimisés pour le SEO.',
      concurrents: [
        {
          id: '1',
          nom: 'WebDesign Pro SA',
          siteWeb: 'https://webdesignpro.ch',
          description: 'Leader local avec forte présence GMB',
          scores: { qualite: 8, prix: 6, delais: 7, service: 9, innovation: 8, reputation: 9, portfolio: 8, communication: 7 },
          scoreTotal: 0,
          classement: 0
        },
        {
          id: '2',
          nom: 'Digital Solutions',
          siteWeb: 'https://digital-solutions.ch',
          description: 'Solutions digitales complètes pour entreprises',
          scores: { qualite: 7, prix: 8, delais: 6, service: 7, innovation: 6, reputation: 7, portfolio: 7, communication: 8 },
          scoreTotal: 0,
          classement: 0
        },
        {
          id: '3',
          nom: 'TechCraft Studio',
          siteWeb: 'https://techcraft.ch',
          description: 'Studio créatif spécialisé en technologies web',
          scores: { qualite: 9, prix: 5, delais: 8, service: 8, innovation: 9, reputation: 8, portfolio: 9, communication: 6 },
          scoreTotal: 0,
          classement: 0
        }
      ]
    },
    {
      nom: 'Applications Mobiles',
      description: 'Développement d\'applications iOS et Android natives et hybrides.',
      concurrents: [
        {
          id: '4',
          nom: 'MobileFirst',
          siteWeb: 'https://mobilefirst.ch',
          description: 'Spécialiste des applications mobiles natives',
          scores: { qualite: 9, prix: 6, delais: 7, service: 8, innovation: 9, reputation: 8, portfolio: 9, communication: 7 },
          scoreTotal: 0,
          classement: 0
        },
        {
          id: '5',
          nom: 'AppDev Swiss',
          siteWeb: 'https://appdev.ch',
          description: 'Développement d\'applications cross-platform',
          scores: { qualite: 7, prix: 8, delais: 8, service: 7, innovation: 7, reputation: 7, portfolio: 7, communication: 8 },
          scoreTotal: 0,
          classement: 0
        }
      ]
    },
    {
      nom: 'E-commerce',
      description: 'Solutions de vente en ligne complètes avec gestion des stocks et paiements.',
      concurrents: [
        {
          id: '6',
          nom: 'ShopBuilder Pro',
          siteWeb: 'https://shopbuilder.ch',
          description: 'Plateforme e-commerce clé en main',
          scores: { qualite: 8, prix: 7, delais: 9, service: 8, innovation: 7, reputation: 8, portfolio: 8, communication: 7 },
          scoreTotal: 0,
          classement: 0
        }
      ]
    },
    {
      nom: 'Marketing Digital',
      description: 'Stratégies SEO, SEA, réseaux sociaux et campagnes publicitaires ciblées.',
      concurrents: [
        {
          id: '7',
          nom: 'DigitalBoost',
          siteWeb: 'https://digitalboost.ch',
          description: 'Agence marketing digital full-service',
          scores: { qualite: 8, prix: 7, delais: 8, service: 9, innovation: 8, reputation: 9, portfolio: 8, communication: 9 },
          scoreTotal: 0,
          classement: 0
        }
      ]
    },
    {
      nom: 'Consulting IT',
      description: 'Conseil en transformation digitale et optimisation des processus métier.',
      concurrents: [
        {
          id: '8',
          nom: 'IT Consulting Plus',
          siteWeb: 'https://itconsulting.ch',
          description: 'Conseil en transformation digitale',
          scores: { qualite: 9, prix: 6, delais: 7, service: 9, innovation: 8, reputation: 9, portfolio: 8, communication: 8 },
          scoreTotal: 0,
          classement: 0
        }
      ]
    },
    {
      nom: 'Maintenance & Support',
      description: 'Maintenance technique, mises à jour et support client continu.',
      concurrents: [
        {
          id: '9',
          nom: 'TechSupport 24/7',
          siteWeb: 'https://techsupport.ch',
          description: 'Support technique et maintenance continue',
          scores: { qualite: 8, prix: 8, delais: 9, service: 9, innovation: 6, reputation: 8, portfolio: 7, communication: 9 },
          scoreTotal: 0,
          classement: 0
        }
      ]
    }
  ]);

  // Calculer les scores totaux et classements
  React.useEffect(() => {
    setPrestationsData(prev => prev.map(prestation => ({
      ...prestation,
      concurrents: prestation.concurrents.map(concurrent => {
        const scoreTotal = Object.values(concurrent.scores).reduce((sum, score) => sum + score, 0);
        return { ...concurrent, scoreTotal };
      }).sort((a, b) => b.scoreTotal - a.scoreTotal).map((concurrent, index) => ({
        ...concurrent,
        classement: index + 1
      }))
    })));
  }, []);

  const tabs = prestationsData.map(prestation => ({
    id: prestation.nom,
    label: prestation.nom,
    icon: Users
  }));

  const ajouterConcurrent = () => {
    const prestationActive = prestationsData.find(p => p.nom === activeTab);
    if (!prestationActive) return;

    const nouveauConcurrent: Concurrent = {
      id: Date.now().toString(),
      nom: 'Nouveau concurrent',
      siteWeb: '',
      description: '',
      scores: { qualite: 5, prix: 5, delais: 5, service: 5, innovation: 5, reputation: 5, portfolio: 5, communication: 5 },
      scoreTotal: 40,
      classement: prestationActive.concurrents.length + 1
    };

    setPrestationsData(prev => prev.map(prestation => 
      prestation.nom === activeTab 
        ? { ...prestation, concurrents: [...prestation.concurrents, nouveauConcurrent] }
        : prestation
    ));
  };

  const supprimerConcurrent = (concurrentId: string) => {
    setPrestationsData(prev => prev.map(prestation => 
      prestation.nom === activeTab 
        ? { ...prestation, concurrents: prestation.concurrents.filter(c => c.id !== concurrentId) }
        : prestation
    ));
  };

  const updateConcurrent = (concurrentId: string, field: string, value: string | number) => {
    setPrestationsData(prev => prev.map(prestation => 
      prestation.nom === activeTab 
        ? {
            ...prestation,
            concurrents: prestation.concurrents.map(concurrent => 
              concurrent.id === concurrentId 
                ? { ...concurrent, [field]: value }
                : concurrent
            )
          }
        : prestation
    ));
  };

  const updateScore = (concurrentId: string, critere: string, score: number) => {
    setPrestationsData(prev => prev.map(prestation => 
      prestation.nom === activeTab 
        ? {
            ...prestation,
            concurrents: prestation.concurrents.map(concurrent => 
              concurrent.id === concurrentId 
                ? { 
                    ...concurrent, 
                    scores: { ...concurrent.scores, [critere]: score }
                  }
                : concurrent
            )
          }
        : prestation
    ));
  };

  const getClassementText = (classement: number) => {
    switch (classement) {
      case 1: return '1er';
      case 2: return '2ème';
      case 3: return '3ème';
      default: return `${classement}ème`;
    }
  };

  const prestationActive = prestationsData.find(p => p.nom === activeTab);

  const renderTabContent = () => {
    if (!prestationActive) return null;

    return (
      <div className="space-y-6">
        {/* En-tête avec bouton d'ajout */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{prestationActive.nom}</h3>
            <p className="text-gray-600 mt-1">{prestationActive.description}</p>
          </div>
          <button
            onClick={ajouterConcurrent}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
          >
            <Plus className="w-5 h-5" />
            <span>Ajouter un concurrent</span>
          </button>
        </div>

        {/* Liste des concurrents avec design graphique */}
        <div className="space-y-6">
          {prestationActive.concurrents
            .sort((a, b) => b.scoreTotal - a.scoreTotal)
            .map((concurrent, index) => (
            <div key={concurrent.id} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              {/* En-tête du concurrent */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-6">
                  {/* Badge de classement */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {getClassementText(index + 1)}
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      {Object.values(concurrent.scores).reduce((sum, score) => sum + score, 0)}%
                    </div>
                  </div>
                  
                  {/* Informations du concurrent */}
                  <div className="flex-1">
                    <div className="mb-2">
                      <EditableField
                        value={concurrent.nom}
                        onSave={(value) => updateConcurrent(concurrent.id, 'nom', value)}
                        placeholder="Nom du concurrent"
                        isTitle={true}
                      />
                    </div>
                    <div className="mb-2">
                      <EditableField
                        value={concurrent.siteWeb}
                        onSave={(value) => updateConcurrent(concurrent.id, 'siteWeb', value)}
                        placeholder="Site web"
                      />
                    </div>
                    <div>
                      <EditableField
                        value={concurrent.description}
                        onSave={(value) => updateConcurrent(concurrent.id, 'description', value)}
                        placeholder="Description"
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-3">
                  {concurrent.siteWeb && (
                    <a
                      href={concurrent.siteWeb}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-colors"
                      title="Visiter le site"
                    >
                      <TrendingUp className="w-5 h-5" />
                    </a>
                  )}
                  <button
                    onClick={() => supprimerConcurrent(concurrent.id)}
                    className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Grille des critères avec barres de progression */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {criteres.map(critere => {
                  const Icon = critere.icon;
                  const score = concurrent.scores[critere.key as keyof typeof concurrent.scores];
                  const pourcentage = (score / 10) * 100;
                  
                  return (
                    <div key={critere.key} className="space-y-3">
                      {/* En-tête du critère */}
                      <div className="flex items-center space-x-2">
                        <Icon className={`w-4 h-4 ${critere.couleur}`} />
                        <span className="text-sm font-medium text-gray-700">{critere.nom}</span>
                      </div>
                      
                      {/* Barre de progression */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-gray-900">{pourcentage.toFixed(0)}%</span>
                          <select
                            value={score}
                            onChange={(e) => updateScore(concurrent.id, critere.key, parseInt(e.target.value))}
                            className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                        
                        {/* Barre de progression colorée */}
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              pourcentage >= 85 ? 'bg-green-500' :
                              pourcentage >= 70 ? 'bg-blue-500' :
                              pourcentage >= 50 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${pourcentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Score global */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">Score Global</span>
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl font-bold text-blue-600">
                      {Object.values(concurrent.scores).reduce((sum, score) => sum + score, 0)}%
                    </div>
                    <div className="text-sm text-gray-500">/ 80</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Analyse comparative en bas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Meilleurs par critère */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-600" />
              <span>Meilleurs par critère</span>
            </h3>
            <div className="space-y-3">
              {criteres.map(critere => {
                const meilleur = prestationActive.concurrents.reduce((prev, current) => 
                  current.scores[critere.key as keyof typeof current.scores] > prev.scores[critere.key as keyof typeof prev.scores] ? current : prev
                );
                const Icon = critere.icon;
                
                return (
                  <div key={critere.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-4 h-4 ${critere.couleur}`} />
                      <span className="font-medium text-gray-900">{critere.nom}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{meilleur.nom}</div>
                      <div className="text-sm text-gray-600">
                        {meilleur.scores[critere.key as keyof typeof meilleur.scores]}/10
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Statistiques globales */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>Analyse globale</span>
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">
                    {prestationActive.concurrents.length}
                  </div>
                  <div className="text-sm text-gray-600">Concurrents</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">
                    {prestationActive.concurrents.length > 0 
                      ? Math.round(prestationActive.concurrents.reduce((sum, c) => sum + c.scoreTotal, 0) / prestationActive.concurrents.length)
                      : 0
                    }%
                  </div>
                  <div className="text-sm text-gray-600">Score moyen</div>
                </div>
              </div>
              
              {prestationActive.concurrents.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Leader du marché</span>
                    <span className="font-semibold text-gray-900">
                      {prestationActive.concurrents.sort((a, b) => b.scoreTotal - a.scoreTotal)[0]?.nom}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Score le plus élevé</span>
                    <span className="font-semibold text-gray-900">
                      {Math.max(...prestationActive.concurrents.map(c => c.scoreTotal))}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Écart avec le leader</span>
                    <span className="font-semibold text-gray-900">
                      {prestationActive.concurrents.length > 1 
                        ? Math.max(...prestationActive.concurrents.map(c => c.scoreTotal)) - 
                          Math.min(...prestationActive.concurrents.map(c => c.scoreTotal))
                        : 0
                      } points
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        {/* Bannière bleue avec judoka et titre */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            {/* Zone gauche avec judoka agrandi x2.5 et titre */}
            <div className="flex items-center space-x-6">
              {/* Judoka agrandi x2.5 (de w-16 h-16 à w-40 h-40) */}
              <div className="w-50 h-50 flex items-center justify-center">
                <img 
                  src="/judoka.png" 
                  alt="Judoka Beezia" 
                  className="w-40 h-40 object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Concurrents</h1>
                <p className="text-blue-100 text-lg">Analyse comparative de vos concurrents par prestation</p>
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

        {/* Menu horizontal des onglets par prestation */}
        <div className="mb-8 relative">
          <nav className="flex flex-wrap bg-gray-100 p-1 rounded-xl gap-1" aria-label="Tabs">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const isLast = index === tabs.length - 1;
              
              return (
                <div key={tab.id} className={`relative ${isLast ? 'ml-auto' : ''}`}>
                  {/* Icône d'information pour Maintenance & Support */}
                  {tab.id === 'Maintenance & Support' && (
                    <div className="absolute -top-6 right-2 group">
                      <Info 
                        className="w-4 h-4 text-gray-400 hover:text-blue-600 cursor-help transition-colors" 
                      />
                      {/* Tooltip */}
                      <div className="absolute bottom-full right-0 mb-2 w-80 bg-gray-900 text-white text-sm rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="space-y-1">
                          <p className="font-semibold">Système de notation</p>
                          <p>• Chaque critère est noté de 1 à 10</p>
                          <p>• Score total maximum : 80 points</p>
                          <p>• Classement automatique par score total</p>
                          <p>• Analyse comparative par critère</p>
                        </div>
                        {/* Flèche du tooltip */}
                        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-lg'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                    <span>{tab.label}</span>
                  </button>
                </div>
              );
            })}
          </nav>
        </div>
        
        {/* Contenu de l'onglet actif */}
        <div className="mb-8">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Concurrents;