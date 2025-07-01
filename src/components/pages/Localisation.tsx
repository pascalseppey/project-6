import React, { useState } from 'react';
import { MapPin, Plus, Building, Phone, Globe, Star, Clock, Calendar, Edit3, Save, X, Info, Trash2 } from 'lucide-react';

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

interface GMBFiche {
  id: string;
  nom: string;
  commune: string;
  infos: {
    nomFiche: string;
    categorie: string;
    description: string;
    lien: string;
  };
  contact: {
    siteWeb: string;
    telephone: string;
    commune: string;
    adresse: string;
    canton: string;
  };
  avis: Array<{
    nom: string;
    prenom: string;
    date: string;
    note: number;
    commentaire: string;
  }>;
  horaires: Array<{
    jour: string;
    ouvert: boolean;
    heureOuverture: string;
    heureFermeture: string;
  }>;
  joursFeries: Array<{
    nom: string;
    date: string;
    ferme: boolean;
    horaireSpecial: string;
  }>;
}

const Localisation: React.FC = () => {
  const [activeFiche, setActiveFiche] = useState(0);
  const [activeTab, setActiveTab] = useState('Infos');
  
  // État pour les fiches GMB
  const [fichesList, setFichesList] = useState<GMBFiche[]>([
    {
      id: '1',
      nom: 'Siège',
      commune: 'Lausanne',
      infos: {
        nomFiche: 'Charly Gaillard SARL - Siège',
        categorie: 'Agence de marketing digital',
        description: 'Spécialiste en développement web et marketing digital. Nous accompagnons les PME dans leur transformation numérique.',
        lien: 'https://charlygaillard.ch'
      },
      contact: {
        siteWeb: 'https://charlygaillard.ch',
        telephone: '+41 79 123 45 67',
        commune: 'Lausanne',
        adresse: 'Rue de la Paix 15',
        canton: 'Vaud'
      },
      avis: [
        {
          nom: 'Martin',
          prenom: 'Sophie',
          date: '2024-12-15',
          note: 5,
          commentaire: 'Excellent service, très professionnel et à l\'écoute de nos besoins.'
        },
        {
          nom: 'Dubois',
          prenom: 'Pierre',
          date: '2024-12-10',
          note: 4,
          commentaire: 'Très satisfait du site web créé pour notre entreprise.'
        }
      ],
      horaires: [
        { jour: 'Lundi', ouvert: true, heureOuverture: '09:00', heureFermeture: '18:00' },
        { jour: 'Mardi', ouvert: true, heureOuverture: '09:00', heureFermeture: '18:00' },
        { jour: 'Mercredi', ouvert: true, heureOuverture: '09:00', heureFermeture: '18:00' },
        { jour: 'Jeudi', ouvert: true, heureOuverture: '09:00', heureFermeture: '18:00' },
        { jour: 'Vendredi', ouvert: true, heureOuverture: '09:00', heureFermeture: '17:00' },
        { jour: 'Samedi', ouvert: false, heureOuverture: '', heureFermeture: '' },
        { jour: 'Dimanche', ouvert: false, heureOuverture: '', heureFermeture: '' }
      ],
      joursFeries: [
        { nom: 'Nouvel An', date: '2025-01-01', ferme: true, horaireSpecial: '' },
        { nom: 'Fête du Travail', date: '2025-05-01', ferme: true, horaireSpecial: '' },
        { nom: 'Fête Nationale', date: '2025-08-01', ferme: true, horaireSpecial: '' },
        { nom: 'Noël', date: '2025-12-25', ferme: true, horaireSpecial: '' }
      ]
    }
  ]);

  const tabs = [
    { id: 'Infos', label: 'Infos', icon: Building },
    { id: 'Contact', label: 'Contact', icon: Phone },
    { id: 'Avis', label: 'Avis', icon: Star },
    { id: 'Horaires', label: 'Horaires', icon: Clock },
    { id: 'Jours fériés', label: 'Jours fériés', icon: Calendar },
  ];

  const ajouterFiche = () => {
    const nouvelleFiche: GMBFiche = {
      id: Date.now().toString(),
      nom: `Succursale ${fichesList.length}`,
      commune: '',
      infos: {
        nomFiche: '',
        categorie: '',
        description: '',
        lien: ''
      },
      contact: {
        siteWeb: '',
        telephone: '',
        commune: '',
        adresse: '',
        canton: ''
      },
      avis: [],
      horaires: [
        { jour: 'Lundi', ouvert: true, heureOuverture: '09:00', heureFermeture: '18:00' },
        { jour: 'Mardi', ouvert: true, heureOuverture: '09:00', heureFermeture: '18:00' },
        { jour: 'Mercredi', ouvert: true, heureOuverture: '09:00', heureFermeture: '18:00' },
        { jour: 'Jeudi', ouvert: true, heureOuverture: '09:00', heureFermeture: '18:00' },
        { jour: 'Vendredi', ouvert: true, heureOuverture: '09:00', heureFermeture: '17:00' },
        { jour: 'Samedi', ouvert: false, heureOuverture: '', heureFermeture: '' },
        { jour: 'Dimanche', ouvert: false, heureOuverture: '', heureFermeture: '' }
      ],
      joursFeries: [
        { nom: 'Nouvel An', date: '2025-01-01', ferme: true, horaireSpecial: '' },
        { nom: 'Fête du Travail', date: '2025-05-01', ferme: true, horaireSpecial: '' },
        { nom: 'Fête Nationale', date: '2025-08-01', ferme: true, horaireSpecial: '' },
        { nom: 'Noël', date: '2025-12-25', ferme: true, horaireSpecial: '' }
      ]
    };
    
    setFichesList([...fichesList, nouvelleFiche]);
    setActiveFiche(fichesList.length);
  };

  const supprimerFiche = (index: number) => {
    if (fichesList.length > 1) {
      const nouvellesList = fichesList.filter((_, i) => i !== index);
      setFichesList(nouvellesList);
      if (activeFiche >= nouvellesList.length) {
        setActiveFiche(nouvellesList.length - 1);
      }
    }
  };

  const updateFicheInfo = (field: string, value: string) => {
    const updatedFiches = [...fichesList];
    updatedFiches[activeFiche] = {
      ...updatedFiches[activeFiche],
      infos: {
        ...updatedFiches[activeFiche].infos,
        [field]: value
      }
    };
    setFichesList(updatedFiches);
  };

  const updateFicheContact = (field: string, value: string) => {
    const updatedFiches = [...fichesList];
    updatedFiches[activeFiche] = {
      ...updatedFiches[activeFiche],
      contact: {
        ...updatedFiches[activeFiche].contact,
        [field]: value
      }
    };
    setFichesList(updatedFiches);
  };

  const updateFicheHoraire = (index: number, field: string, value: string | boolean) => {
    const updatedFiches = [...fichesList];
    updatedFiches[activeFiche].horaires[index] = {
      ...updatedFiches[activeFiche].horaires[index],
      [field]: value
    };
    setFichesList(updatedFiches);
  };

  const ajouterAvis = () => {
    const updatedFiches = [...fichesList];
    updatedFiches[activeFiche].avis.push({
      nom: '',
      prenom: '',
      date: new Date().toISOString().split('T')[0],
      note: 5,
      commentaire: ''
    });
    setFichesList(updatedFiches);
  };

  const updateAvis = (index: number, field: string, value: string | number) => {
    const updatedFiches = [...fichesList];
    updatedFiches[activeFiche].avis[index] = {
      ...updatedFiches[activeFiche].avis[index],
      [field]: value
    };
    setFichesList(updatedFiches);
  };

  const supprimerAvis = (index: number) => {
    const updatedFiches = [...fichesList];
    updatedFiches[activeFiche].avis = updatedFiches[activeFiche].avis.filter((_, i) => i !== index);
    setFichesList(updatedFiches);
  };

  const renderTabContent = () => {
    const ficheActive = fichesList[activeFiche];
    
    switch (activeTab) {
      case 'Infos':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nom de la fiche</h3>
              <EditableField
                value={ficheActive.infos.nomFiche}
                onSave={(value) => updateFicheInfo('nomFiche', value)}
                placeholder="Nom de votre fiche GMB"
              />
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Catégorie</h3>
              <EditableField
                value={ficheActive.infos.categorie}
                onSave={(value) => updateFicheInfo('categorie', value)}
                placeholder="Catégorie d'activité"
              />
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
              <EditableField
                value={ficheActive.infos.description}
                onSave={(value) => updateFicheInfo('description', value)}
                multiline={true}
                placeholder="Description de votre activité..."
              />
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Lien</h3>
              <EditableField
                value={ficheActive.infos.lien}
                onSave={(value) => updateFicheInfo('lien', value)}
                placeholder="https://votre-site-web.com"
              />
            </div>
          </div>
        );

      case 'Contact':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Site web</h3>
              <EditableField
                value={ficheActive.contact.siteWeb}
                onSave={(value) => updateFicheContact('siteWeb', value)}
                placeholder="https://votre-site.com"
              />
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Téléphone</h3>
              <EditableField
                value={ficheActive.contact.telephone}
                onSave={(value) => updateFicheContact('telephone', value)}
                placeholder="+41 XX XXX XX XX"
              />
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Commune</h3>
              <EditableField
                value={ficheActive.contact.commune}
                onSave={(value) => updateFicheContact('commune', value)}
                placeholder="Nom de la commune"
              />
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Canton</h3>
              <EditableField
                value={ficheActive.contact.canton}
                onSave={(value) => updateFicheContact('canton', value)}
                placeholder="Canton"
              />
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Adresse</h3>
              <EditableField
                value={ficheActive.contact.adresse}
                onSave={(value) => updateFicheContact('adresse', value)}
                multiline={true}
                placeholder="Adresse complète"
              />
            </div>
          </div>
        );

      case 'Avis':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Avis clients</h3>
              <button
                onClick={ajouterAvis}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un avis</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {ficheActive.avis.map((avis, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">Avis {index + 1}</h4>
                    <button
                      onClick={() => supprimerAvis(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Nom</label>
                      <EditableField
                        value={avis.nom}
                        onSave={(value) => updateAvis(index, 'nom', value)}
                        placeholder="Nom"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Prénom</label>
                      <EditableField
                        value={avis.prenom}
                        onSave={(value) => updateAvis(index, 'prenom', value)}
                        placeholder="Prénom"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Date</label>
                      <input
                        type="date"
                        value={avis.date}
                        onChange={(e) => updateAvis(index, 'date', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Note</label>
                      <select
                        value={avis.note}
                        onChange={(e) => updateAvis(index, 'note', parseInt(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value={1}>1 ⭐</option>
                        <option value={2}>2 ⭐⭐</option>
                        <option value={3}>3 ⭐⭐⭐</option>
                        <option value={4}>4 ⭐⭐⭐⭐</option>
                        <option value={5}>5 ⭐⭐⭐⭐⭐</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Commentaire</label>
                    <EditableField
                      value={avis.commentaire}
                      onSave={(value) => updateAvis(index, 'commentaire', value)}
                      multiline={true}
                      placeholder="Commentaire de l'avis..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Horaires':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ficheActive.horaires.map((horaire, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{horaire.jour}</h3>
                
                <div className="flex items-center space-x-2 mb-4">
                  <input
                    type="checkbox"
                    checked={horaire.ouvert}
                    onChange={(e) => updateFicheHoraire(index, 'ouvert', e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="text-sm text-gray-600">Ouvert</label>
                </div>
                
                {horaire.ouvert && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Ouverture</label>
                      <input
                        type="time"
                        value={horaire.heureOuverture}
                        onChange={(e) => updateFicheHoraire(index, 'heureOuverture', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Fermeture</label>
                      <input
                        type="time"
                        value={horaire.heureFermeture}
                        onChange={(e) => updateFicheHoraire(index, 'heureFermeture', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case 'Jours fériés':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Jours fériés du canton {ficheActive.contact.canton || 'de Vaud'}</h3>
              <p className="text-blue-700">Les jours fériés sont automatiquement configurés selon votre canton. Vous pouvez ajouter des fermetures spéciales ou horaires réduits.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ficheActive.joursFeries.map((jour, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{jour.nom}</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Date</label>
                      <input
                        type="date"
                        value={jour.date}
                        className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                        readOnly
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={jour.ferme}
                        className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
                        readOnly
                      />
                      <label className="text-sm text-gray-600">Fermé</label>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Horaire spécial</label>
                      <input
                        type="text"
                        value={jour.horaireSpecial}
                        placeholder="Ex: 10:00 - 16:00"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Ajouter une fermeture spéciale</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Nom de l'événement"
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="date"
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      {/* Bannière bleue avec abeille emoji et titre */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
        
        <div className="relative z-10 flex items-center justify-between">
          {/* Zone gauche avec abeille emoji et titre */}
          <div className="flex items-center space-x-6">
            {/* Abeille emoji qui vole à gauche du texte */}
            <div className="text-6xl animate-bounce">
              🐝
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Localisation</h1>
              <p className="text-blue-100 text-lg">Gérez vos fiches Google My Business</p>
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

      {/* Sélecteur de fiches GMB */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Fiches Google My Business</h2>
          <button
            onClick={ajouterFiche}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter une fiche</span>
          </button>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {fichesList.map((fiche, index) => (
            <div key={fiche.id} className="relative">
              <button
                onClick={() => setActiveFiche(index)}
                className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 ${
                  activeFiche === index
                    ? 'border-blue-600 bg-blue-50 text-blue-900'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="text-lg font-bold">{fiche.nom}</div>
                <div className="text-sm text-gray-500">{fiche.commune || 'Non défini'}</div>
              </button>
              
              {fichesList.length > 1 && (
                <button
                  onClick={() => supprimerFiche(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Menu horizontal des onglets */}
      <div className="mb-8 relative">
        <nav className="flex bg-gray-100 p-1 rounded-xl" aria-label="Tabs">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isLast = index === tabs.length - 1;
            
            return (
              <div key={tab.id} className={`relative ${isLast ? 'ml-auto' : 'mr-2'}`}>
                {/* Icône d'information pour Jours fériés */}
                {tab.id === 'Jours fériés' && (
                  <div className="absolute -top-6 right-2 group">
                    <Info 
                      className="w-4 h-4 text-gray-400 hover:text-blue-600 cursor-help transition-colors" 
                    />
                    {/* Tooltip */}
                    <div className="absolute bottom-full right-0 mb-2 w-80 bg-gray-900 text-white text-sm rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="space-y-1">
                        <p className="font-semibold">Gestion des jours fériés</p>
                        <p>• Les jours fériés sont configurés selon votre canton</p>
                        <p>• Vous pouvez ajouter des fermetures spéciales</p>
                        <p>• Définissez des horaires réduits si nécessaire</p>
                        <p>• Les modifications s'appliquent à la fiche sélectionnée</p>
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
      
      {/* Contenu de l'onglet actif */}
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
            <p className="text-gray-600">La carte sera intégrée ici avec vos {fichesList.length} fiche{fichesList.length > 1 ? 's' : ''} Google My Business</p>
            <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-gray-500">
              <span>📍 {fichesList[activeFiche]?.contact.commune || 'Non défini'}</span>
              <span>🏢 {fichesList.length} fiche{fichesList.length > 1 ? 's' : ''}</span>
              <span>⭐ {fichesList[activeFiche]?.avis.length || 0} avis</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Localisation;