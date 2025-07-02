import React, { useState } from 'react';
import { Building2, Heart, Target, Users, Briefcase, Edit3, Save, X, Info, Plus, Trash2 } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { updateClientData } from '../../store/slices/currentClientSlice';

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
                ? 'text-2xl font-bold' 
                : multiline 
                  ? 'text-base leading-relaxed' 
                  : 'text-base'
            }`}>
              {value}
            </div>
          ) : (
            <div className={`text-gray-400 italic ${
              isTitle ? 'text-2xl' : 'text-base'
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

const InfosGenerales: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Entreprise');
  const dispatch = useAppDispatch();
  
  // Récupérer les données depuis Redux
  const currentClient = useAppSelector(state => state.currentClient.data);
  
  // Si pas de client chargé, afficher un message
  if (!currentClient) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Building2 className="w-16 h-16 mx-auto" />
          </div>
          <p className="text-gray-500 mb-4">Aucun client sélectionné</p>
          <p className="text-sm text-gray-400">Sélectionnez un client dans le menu en haut à droite</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'Entreprise', label: 'Entreprise', icon: Building2 },
    { id: 'ADN', label: 'ADN', icon: Heart },
    { id: 'Valeurs', label: 'Valeurs', icon: Target },
    { id: 'Cibles Clients', label: 'Cibles Clients', icon: Users },
    { id: 'Prestations', label: 'Prestations', icon: Briefcase },
  ];

  // Fonctions pour mettre à jour les données via Redux
  const updateEntreprise = (field: string, value: string) => {
    dispatch(updateClientData({ path: `data.entreprise.${field}`, value }));
  };

  const updateAdn = (field: string, value: string) => {
    dispatch(updateClientData({ path: `data.adn.${field}`, value }));
  };

  const updateValeur = (index: number, field: string, value: string) => {
    dispatch(updateClientData({ path: `data.valeurs.${index}.${field}`, value }));
  };

  const ajouterValeur = () => {
    const nouvelleValeur = { title: 'waiting_for_data', description: 'waiting_for_data' };
    const updatedValeurs = [...currentClient.data.valeurs, nouvelleValeur];
    dispatch(updateClientData({ path: 'data.valeurs', value: updatedValeurs }));
  };

  const supprimerValeur = (index: number) => {
    if (currentClient.data.valeurs.length > 1) {
      const updatedValeurs = currentClient.data.valeurs.filter((_, i) => i !== index);
      dispatch(updateClientData({ path: 'data.valeurs', value: updatedValeurs }));
    }
  };

  const updateCible = (index: number, field: string, value: string) => {
    dispatch(updateClientData({ path: `data.cibles.${index}.${field}`, value }));
  };

  const ajouterCible = () => {
    const nouvelleCible = { title: 'waiting_for_data', description: 'waiting_for_data' };
    const updatedCibles = [...currentClient.data.cibles, nouvelleCible];
    dispatch(updateClientData({ path: 'data.cibles', value: updatedCibles }));
  };

  const supprimerCible = (index: number) => {
    if (currentClient.data.cibles.length > 1) {
      const updatedCibles = currentClient.data.cibles.filter((_, i) => i !== index);
      dispatch(updateClientData({ path: 'data.cibles', value: updatedCibles }));
    }
  };

  const updatePrestation = (index: number, field: string, value: string) => {
    dispatch(updateClientData({ path: `data.prestations.${index}.${field}`, value }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Entreprise':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Raison sociale</h3>
              <EditableField
                value={currentClient.data.entreprise.raisonSociale}
                onSave={(value) => updateEntreprise('raisonSociale', value)}
                placeholder="Nom de votre entreprise"
              />
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Secteur d'activité</h3>
              <EditableField
                value={currentClient.data.entreprise.secteurActivite}
                onSave={(value) => updateEntreprise('secteurActivite', value)}
                placeholder="Votre secteur d'activité"
              />
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nombre d'employés</h3>
              <EditableField
                value={currentClient.data.entreprise.nombreEmployes}
                onSave={(value) => updateEntreprise('nombreEmployes', value)}
                placeholder="Nombre d'employés"
              />
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Année de fondation</h3>
              <EditableField
                value={currentClient.data.entreprise.anneeFondation}
                onSave={(value) => updateEntreprise('anneeFondation', value)}
                placeholder="Année de création"
              />
            </div>
          </div>
        );

      case 'ADN':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Historique de l'entreprise</h3>
              <EditableField
                value={currentClient.data.adn.historique}
                onSave={(value) => updateAdn('historique', value)}
                multiline={true}
                placeholder="Racontez l'histoire de votre entreprise..."
              />
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Texte de présentation</h3>
              <EditableField
                value={currentClient.data.adn.presentation}
                onSave={(value) => updateAdn('presentation', value)}
                multiline={true}
                placeholder="Présentez votre entreprise en quelques lignes..."
              />
            </div>
          </div>
        );

      case 'Valeurs':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Valeurs de l'entreprise</h3>
              <button
                onClick={ajouterValeur}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter une valeur</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentClient.data.valeurs.map((valeur, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Valeur {index + 1}
                    </h4>
                    {currentClient.data.valeurs.length > 1 && (
                      <button
                        onClick={() => supprimerValeur(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <EditableField
                      value={valeur.title}
                      onSave={(value) => updateValeur(index, 'title', value)}
                      placeholder="Nom de la valeur"
                      isTitle={true}
                    />
                  </div>
                  <div>
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
          </div>
        );

      case 'Cibles Clients':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Cibles clients</h3>
              <button
                onClick={ajouterCible}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter une cible</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentClient.data.cibles.map((cible, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Client {index + 1}
                    </h4>
                    {currentClient.data.cibles.length > 1 && (
                      <button
                        onClick={() => supprimerCible(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <EditableField
                      value={cible.title}
                      onSave={(value) => updateCible(index, 'title', value)}
                      placeholder="Type de client"
                      isTitle={true}
                    />
                  </div>
                  <div>
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
          </div>
        );

      case 'Prestations':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentClient.data.prestations.map((prestation, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Prestation {index + 1}
                  </h3>
                  <EditableField
                    value={prestation.title}
                    onSave={(value) => updatePrestation(index, 'title', value)}
                    placeholder="Nom de la prestation"
                    isTitle={true}
                  />
                </div>
                <div>
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
      {/* Bannière bleue avec judoka et titre */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
        
        <div className="relative z-10 flex items-center justify-between">
          {/* Zone gauche avec judoka et titre */}
          <div className="flex items-center space-x-6">
            {/* Judoka remplaçant l'abeille */}
            <div className="w-20 h-20 flex items-center justify-center">
              <img 
                src="/judoka.png" 
                alt="Judoka Beezia" 
                className="w-16 h-16 object-contain drop-shadow-lg"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Infos Générales</h1>
              <p className="text-blue-100 text-lg">Informations de base sur {currentClient.metadata.nom}</p>
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

      {/* Menu horizontal des onglets avec icône d'information */}
      <div className="mb-8 relative">
        <nav className="flex bg-gray-100 p-1 rounded-xl" aria-label="Tabs">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isLast = index === tabs.length - 1;
            
            return (
              <div key={tab.id} className={`relative ${isLast ? 'ml-auto' : 'mr-2'}`}>
                {/* Icône d'information pour Prestations */}
                {tab.id === 'Prestations' && (
                  <div className="absolute -top-6 right-2 group">
                    <Info 
                      className="w-4 h-4 text-gray-400 hover:text-blue-600 cursor-help transition-colors" 
                    />
                    {/* Tooltip */}
                    <div className="absolute bottom-full right-0 mb-2 w-80 bg-gray-900 text-white text-sm rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="space-y-1">
                        <p className="font-semibold">Comment modifier vos informations</p>
                        <p>• Cliquez sur n'importe quel champ pour le modifier</p>
                        <p>• Appuyez sur Entrée pour sauvegarder (champs simples)</p>
                        <p>• Utilisez les boutons Sauvegarder/Annuler pour les textes longs</p>
                        <p>• Échap pour annuler les modifications en cours</p>
                        <p>• Les modifications sont automatiquement sauvegardées</p>
                      </div>
                      {/* Flèche du tooltip */}
                      <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                )}
                
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-3 px-8 py-4 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-lg'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span>{tab.label}</span>
                </button>
              </div>
            );
          })}
        </nav>
      </div>
      
      {/* Contenu de l'onglet actif en cellules séparées */}
      <div className="mb-8">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default InfosGenerales;