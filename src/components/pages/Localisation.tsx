import React, { useState } from 'react';
import { MapPin, Navigation, Globe, Building, Map, Compass, Edit3, Save, X, Info } from 'lucide-react';

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

const Localisation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Adresse');
  
  // États pour tous les champs éditables
  const [adresseData, setAdresseData] = useState({
    adresseComplete: 'Rue de la Paix 15, 1000 Lausanne, Suisse',
    codePostal: '1000',
    ville: 'Lausanne',
    pays: 'Suisse',
    latitude: '46.5197',
    longitude: '6.6323'
  });

  const [zoneServiceData, setZoneServiceData] = useState({
    rayonAction: '50 km autour de Lausanne',
    description: 'Nous intervenons dans toute la région lémanique, de Genève à Montreux, en passant par Yverdon et Fribourg.'
  });

  const [villesData, setVillesData] = useState([
    { nom: 'Lausanne', statut: 'Principal', distance: '0 km' },
    { nom: 'Genève', statut: 'Couvert', distance: '62 km' },
    { nom: 'Montreux', statut: 'Couvert', distance: '28 km' },
    { nom: 'Yverdon', statut: 'Couvert', distance: '35 km' },
    { nom: 'Fribourg', statut: 'Couvert', distance: '45 km' },
    { nom: 'Neuchâtel', statut: 'Couvert', distance: '55 km' }
  ]);

  const [presenceData, setPresenceData] = useState([
    { plateforme: 'Google My Business', description: 'Fiche d\'entreprise complète', statut: 'Actif' },
    { plateforme: 'Apple Maps', description: 'Référencement local iOS', statut: 'En cours' },
    { plateforme: 'Bing Places', description: 'Microsoft Maps & Cortana', statut: 'Actif' },
    { plateforme: 'Waze', description: 'Navigation GPS communautaire', statut: 'Actif' },
    { plateforme: 'TripAdvisor', description: 'Avis et recommandations', statut: 'En attente' },
    { plateforme: 'Foursquare', description: 'Check-ins et découverte locale', statut: 'Actif' }
  ]);

  const [horairesData, setHorairesData] = useState([
    { jour: 'Lundi', heures: '09:00 - 18:00', ouvert: true },
    { jour: 'Mardi', heures: '09:00 - 18:00', ouvert: true },
    { jour: 'Mercredi', heures: '09:00 - 18:00', ouvert: true },
    { jour: 'Jeudi', heures: '09:00 - 18:00', ouvert: true },
    { jour: 'Vendredi', heures: '09:00 - 17:00', ouvert: true },
    { jour: 'Samedi', heures: 'Fermé', ouvert: false },
    { jour: 'Dimanche', heures: 'Fermé', ouvert: false }
  ]);

  const tabs = [
    { id: 'Adresse', label: 'Adresse', icon: Building },
    { id: 'Zone Service', label: 'Zone Service', icon: Navigation },
    { id: 'Villes', label: 'Villes', icon: Map },
    { id: 'Présence', label: 'Présence', icon: Globe },
    { id: 'Horaires', label: 'Horaires', icon: Compass },
  ];

  const updateAdresse = (field: string, value: string) => {
    setAdresseData(prev => ({ ...prev, [field]: value }));
  };

  const updateZoneService = (field: string, value: string) => {
    setZoneServiceData(prev => ({ ...prev, [field]: value }));
  };

  const updateVille = (index: number, field: string, value: string) => {
    setVillesData(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const updatePresence = (index: number, field: string, value: string) => {
    setPresenceData(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const updateHoraire = (index: number, field: string, value: string | boolean) => {
    setHorairesData(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Adresse':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Adresse complète</h3>
              <EditableField
                value={adresseData.adresseComplete}
                onSave={(value) => updateAdresse('adresseComplete', value)}
                placeholder="Votre adresse complète"
                multiline={true}
              />
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Code postal</h3>
              <EditableField
                value={adresseData.codePostal}
                onSave={(value) => updateAdresse('codePostal', value)}
                placeholder="Code postal"
              />
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ville</h3>
              <EditableField
                value={adresseData.ville}
                onSave={(value) => updateAdresse('ville', value)}
                placeholder="Ville"
              />
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pays</h3>
              <EditableField
                value={adresseData.pays}
                onSave={(value) => updateAdresse('pays', value)}
                placeholder="Pays"
              />
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Latitude</h3>
              <EditableField
                value={adresseData.latitude}
                onSave={(value) => updateAdresse('latitude', value)}
                placeholder="Latitude GPS"
              />
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Longitude</h3>
              <EditableField
                value={adresseData.longitude}
                onSave={(value) => updateAdresse('longitude', value)}
                placeholder="Longitude GPS"
              />
            </div>
          </div>
        );

      case 'Zone Service':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rayon d'action</h3>
              <EditableField
                value={zoneServiceData.rayonAction}
                onSave={(value) => updateZoneService('rayonAction', value)}
                placeholder="Définissez votre rayon d'action"
              />
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Description de la zone</h3>
              <EditableField
                value={zoneServiceData.description}
                onSave={(value) => updateZoneService('description', value)}
                multiline={true}
                placeholder="Décrivez votre zone de service..."
              />
            </div>
          </div>
        );

      case 'Villes':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {villesData.map((ville, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Ville {index + 1}
                  </h3>
                  <EditableField
                    value={ville.nom}
                    onSave={(value) => updateVille(index, 'nom', value)}
                    placeholder="Nom de la ville"
                    isTitle={true}
                  />
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Statut</h4>
                  <EditableField
                    value={ville.statut}
                    onSave={(value) => updateVille(index, 'statut', value)}
                    placeholder="Statut de couverture"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Distance</h4>
                  <EditableField
                    value={ville.distance}
                    onSave={(value) => updateVille(index, 'distance', value)}
                    placeholder="Distance depuis votre base"
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case 'Présence':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {presenceData.map((presence, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Plateforme {index + 1}
                  </h3>
                  <EditableField
                    value={presence.plateforme}
                    onSave={(value) => updatePresence(index, 'plateforme', value)}
                    placeholder="Nom de la plateforme"
                    isTitle={true}
                  />
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Description</h4>
                  <EditableField
                    value={presence.description}
                    onSave={(value) => updatePresence(index, 'description', value)}
                    multiline={true}
                    placeholder="Description de la plateforme..."
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Statut</h4>
                  <EditableField
                    value={presence.statut}
                    onSave={(value) => updatePresence(index, 'statut', value)}
                    placeholder="Statut actuel"
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case 'Horaires':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {horairesData.map((horaire, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {horaire.jour}
                  </h3>
                  <EditableField
                    value={horaire.heures}
                    onSave={(value) => updateHoraire(index, 'heures', value)}
                    placeholder="Horaires d'ouverture"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={horaire.ouvert}
                    onChange={(e) => updateHoraire(index, 'ouvert', e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="text-sm text-gray-600">Ouvert</label>
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
      {/* Bannière bleue avec titre déplacé vers la droite */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
        
        <div className="relative z-10 flex items-center justify-between">
          {/* Zone gauche avec titre déplacé vers la droite pour éviter l'abeille */}
          <div className="flex items-center space-x-6 ml-24">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Localisation</h1>
              <p className="text-blue-100 text-lg">Gérez votre présence géographique et locale</p>
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

        {/* Abeille espion AGRANDIE à gauche, collée au bas de la zone bleue */}
        <div className="absolute -bottom-2 left-8 z-20">
          <img 
            src="/abaille_beezia.png" 
            alt="Abeille Espion" 
            className="w-20 h-20 object-contain drop-shadow-xl transform hover:scale-110 transition-transform duration-300 cursor-pointer"
            title="L'abeille surveille votre territoire... 🗺️"
          />
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
                {/* Icône d'information pour Horaires */}
                {tab.id === 'Horaires' && (
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

      {/* Section carte interactive (placeholder) */}
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
        <div className="flex items-center space-x-3 mb-6">
          <MapPin className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Carte interactive</h2>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl h-96 flex items-center justify-center border border-blue-200">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Carte interactive</h3>
            <p className="text-gray-600">La carte sera intégrée ici avec votre localisation et zone de service</p>
            <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-gray-500">
              <span>📍 {adresseData.ville}</span>
              <span>📏 {zoneServiceData.rayonAction}</span>
              <span>🏙️ {villesData.length} villes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Localisation;