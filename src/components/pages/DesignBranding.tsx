import React, { useState } from 'react';
import { Palette, Upload, Eye, Download, Edit3, Save, X, Info, Plus, Trash2 } from 'lucide-react';
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

const DesignBranding: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Logo');
  const dispatch = useAppDispatch();
  
  // Récupérer les données depuis Redux
  const currentClient = useAppSelector(state => state.currentClient.data);
  
  // Si pas de client chargé, afficher un message
  if (!currentClient) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Palette className="w-16 h-16 mx-auto" />
          </div>
          <p className="text-gray-500 mb-4">Aucun client sélectionné</p>
          <p className="text-sm text-gray-400">Sélectionnez un client dans le menu en haut à droite</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'Logo', label: 'Logo', icon: Upload },
    { id: 'Couleurs', label: 'Couleurs', icon: Palette },
    { id: 'Typographies', label: 'Typographies', icon: Eye },
  ];

  const updateLogo = (field: string, value: string) => {
    dispatch(updateClientData({ path: `data.logo.${field}`, value }));
  };

  const ajouterCouleur = () => {
    const nouvelleCouleur = {
      nom: `Couleur ${currentClient.data.couleurs.length + 1}`,
      hex: '#000000',
      usage: 'Nouvel usage',
      ordre: currentClient.data.couleurs.length + 1
    };
    const updatedCouleurs = [...currentClient.data.couleurs, nouvelleCouleur];
    dispatch(updateClientData({ path: 'data.couleurs', value: updatedCouleurs }));
  };

  const updateCouleur = (index: number, field: string, value: string | number) => {
    const updatedCouleurs = [...currentClient.data.couleurs];
    updatedCouleurs[index] = { ...updatedCouleurs[index], [field]: value };
    dispatch(updateClientData({ path: 'data.couleurs', value: updatedCouleurs }));
  };

  const supprimerCouleur = (index: number) => {
    if (currentClient.data.couleurs.length > 1) {
      const updatedCouleurs = currentClient.data.couleurs.filter((_, i) => i !== index);
      dispatch(updateClientData({ path: 'data.couleurs', value: updatedCouleurs }));
    }
  };

  const ajouterTypographie = () => {
    const nouvelleTypo = {
      nom: 'Nouvelle Police',
      famille: 'Inter',
      usage: 'texte' as const,
      taille: '16px',
      poids: '400'
    };
    const updatedTypos = [...currentClient.data.typographies, nouvelleTypo];
    dispatch(updateClientData({ path: 'data.typographies', value: updatedTypos }));
  };

  const updateTypographie = (index: number, field: string, value: string) => {
    const updatedTypos = [...currentClient.data.typographies];
    updatedTypos[index] = { ...updatedTypos[index], [field]: value };
    dispatch(updateClientData({ path: 'data.typographies', value: updatedTypos }));
  };

  const supprimerTypographie = (index: number) => {
    if (currentClient.data.typographies.length > 1) {
      const updatedTypos = currentClient.data.typographies.filter((_, i) => i !== index);
      dispatch(updateClientData({ path: 'data.typographies', value: updatedTypos }));
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Logo':
        return (
          <div className="space-y-8">
            {/* Zone de téléchargement du logo */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Logo principal</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Zone d'upload */}
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Télécharger votre logo</h4>
                    <p className="text-gray-500 mb-4">Glissez-déposez votre fichier ou cliquez pour parcourir</p>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Choisir un fichier
                    </button>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <p><strong>Formats acceptés :</strong> PNG, SVG, PDF, JPG</p>
                    <p><strong>Taille recommandée :</strong> 500x500px minimum</p>
                    <p><strong>Poids maximum :</strong> 5MB</p>
                  </div>
                </div>
                
                {/* Aperçu du logo */}
                <div className="bg-gray-50 rounded-xl p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-4 mx-auto">
                      <span className="text-white font-bold text-4xl">{currentClient.metadata.nom.charAt(0)}</span>
                    </div>
                    <p className="text-gray-600">Aperçu du logo actuel</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Informations du logo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Nom du logo</h3>
                <EditableField
                  value={currentClient.data.logo.nom}
                  onSave={(value) => updateLogo('nom', value)}
                  placeholder="Nom de votre logo"
                />
              </div>
              
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Formats disponibles</h3>
                <EditableField
                  value={currentClient.data.logo.formats.join(', ')}
                  onSave={(value) => updateLogo('formats', value)}
                  placeholder="PNG, SVG, PDF..."
                />
              </div>
              
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                <EditableField
                  value={currentClient.data.logo.description}
                  onSave={(value) => updateLogo('description', value)}
                  multiline={true}
                  placeholder="Description de votre logo..."
                />
              </div>
              
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Couleurs utilisées</h3>
                <EditableField
                  value={currentClient.data.logo.couleurs}
                  onSave={(value) => updateLogo('couleurs', value)}
                  placeholder="Couleurs du logo"
                />
              </div>
              
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage recommandé</h3>
                <EditableField
                  value={currentClient.data.logo.usage}
                  onSave={(value) => updateLogo('usage', value)}
                  placeholder="Où utiliser ce logo"
                />
              </div>
            </div>

            {/* Actions rapides */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Télécharger PNG</span>
                </button>
                <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Télécharger SVG</span>
                </button>
                <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  <Eye className="w-4 h-4" />
                  <span>Aperçu complet</span>
                </button>
              </div>
            </div>
          </div>
        );

      case 'Couleurs':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Palette de couleurs</h3>
              <button
                onClick={ajouterCouleur}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter une couleur</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...currentClient.data.couleurs]
                .sort((a, b) => a.ordre - b.ordre)
                .map((couleur, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">Couleur {couleur.ordre}</h4>
                    {currentClient.data.couleurs.length > 1 && (
                      <button
                        onClick={() => supprimerCouleur(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  {/* Aperçu de la couleur */}
                  <div className="mb-4">
                    <div 
                      className="w-full h-20 rounded-lg border border-gray-200 mb-3"
                      style={{ backgroundColor: couleur.hex }}
                    ></div>
                    <div className="text-center">
                      <div className="font-mono text-sm text-gray-600">{couleur.hex}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Nom de la couleur</label>
                      <EditableField
                        value={couleur.nom}
                        onSave={(value) => updateCouleur(index, 'nom', value)}
                        placeholder="Nom de la couleur"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Code hexadécimal</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={couleur.hex}
                          onChange={(e) => updateCouleur(index, 'hex', e.target.value)}
                          className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={couleur.hex}
                          onChange={(e) => updateCouleur(index, 'hex', e.target.value)}
                          className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Usage</label>
                      <EditableField
                        value={couleur.usage}
                        onSave={(value) => updateCouleur(index, 'usage', value)}
                        multiline={true}
                        placeholder="Comment utiliser cette couleur..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Ordre d'importance</label>
                      <select
                        value={couleur.ordre}
                        onChange={(e) => updateCouleur(index, 'ordre', parseInt(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value={1}>1 - Couleur principale</option>
                        <option value={2}>2 - Couleur secondaire</option>
                        <option value={3}>3 - Couleur d'accent</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Typographies':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Typographies</h3>
              <button
                onClick={ajouterTypographie}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter une typographie</span>
              </button>
            </div>
            
            {/* Séparation Titres / Textes */}
            <div className="space-y-8">
              {/* Section Titres */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <span>📝</span>
                  <span>Typographies pour les titres</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentClient.data.typographies
                    .filter(typo => typo.usage === 'titre')
                    .map((typo, index) => {
                      const globalIndex = currentClient.data.typographies.indexOf(typo);
                      return (
                        <div key={globalIndex} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                          <div className="flex justify-between items-start mb-4">
                            <h5 className="text-lg font-semibold text-gray-900">Titre {index + 1}</h5>
                            {currentClient.data.typographies.filter(t => t.usage === 'titre').length > 1 && (
                              <button
                                onClick={() => supprimerTypographie(globalIndex)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          
                          {/* Aperçu de la typographie */}
                          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                            <div 
                              style={{ 
                                fontFamily: typo.famille,
                                fontSize: typo.taille,
                                fontWeight: typo.poids
                              }}
                              className="text-gray-900"
                            >
                              Exemple de titre
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-600 mb-2">Nom</label>
                              <EditableField
                                value={typo.nom}
                                onSave={(value) => updateTypographie(globalIndex, 'nom', value)}
                                placeholder="Nom de la typographie"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-600 mb-2">Famille de police</label>
                              <EditableField
                                value={typo.famille}
                                onSave={(value) => updateTypographie(globalIndex, 'famille', value)}
                                placeholder="Inter, Arial, etc."
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">Taille</label>
                                <EditableField
                                  value={typo.taille}
                                  onSave={(value) => updateTypographie(globalIndex, 'taille', value)}
                                  placeholder="16px"
                                />
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">Poids</label>
                                <select
                                  value={typo.poids}
                                  onChange={(e) => updateTypographie(globalIndex, 'poids', e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                  <option value="300">Light (300)</option>
                                  <option value="400">Regular (400)</option>
                                  <option value="500">Medium (500)</option>
                                  <option value="600">SemiBold (600)</option>
                                  <option value="700">Bold (700)</option>
                                  <option value="800">ExtraBold (800)</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Section Textes */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <span>📄</span>
                  <span>Typographies pour les textes</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentClient.data.typographies
                    .filter(typo => typo.usage === 'texte')
                    .map((typo, index) => {
                      const globalIndex = currentClient.data.typographies.indexOf(typo);
                      return (
                        <div key={globalIndex} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                          <div className="flex justify-between items-start mb-4">
                            <h5 className="text-lg font-semibold text-gray-900">Texte {index + 1}</h5>
                            {currentClient.data.typographies.filter(t => t.usage === 'texte').length > 1 && (
                              <button
                                onClick={() => supprimerTypographie(globalIndex)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          
                          {/* Aperçu de la typographie */}
                          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                            <div 
                              style={{ 
                                fontFamily: typo.famille,
                                fontSize: typo.taille,
                                fontWeight: typo.poids
                              }}
                              className="text-gray-900"
                            >
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-600 mb-2">Nom</label>
                              <EditableField
                                value={typo.nom}
                                onSave={(value) => updateTypographie(globalIndex, 'nom', value)}
                                placeholder="Nom de la typographie"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-600 mb-2">Famille de police</label>
                              <EditableField
                                value={typo.famille}
                                onSave={(value) => updateTypographie(globalIndex, 'famille', value)}
                                placeholder="Inter, Arial, etc."
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">Taille</label>
                                <EditableField
                                  value={typo.taille}
                                  onSave={(value) => updateTypographie(globalIndex, 'taille', value)}
                                  placeholder="16px"
                                />
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">Poids</label>
                                <select
                                  value={typo.poids}
                                  onChange={(e) => updateTypographie(globalIndex, 'poids', e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                  <option value="300">Light (300)</option>
                                  <option value="400">Regular (400)</option>
                                  <option value="500">Medium (500)</option>
                                  <option value="600">SemiBold (600)</option>
                                  <option value="700">Bold (700)</option>
                                  <option value="800">ExtraBold (800)</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
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
      {/* Bannière bleue avec abeille boxeuse et titre */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
        
        <div className="relative z-10 flex items-center justify-between">
          {/* Zone gauche avec abeille boxeuse et titre */}
          <div className="flex items-center space-x-6">
            {/* Abeille boxeuse agrandie x2.5 sans animation */}
            <div className="w-50 h-50 flex items-center justify-center">
              <img 
                src="/ChatGPT Image 1 juil. 2025, 04_32_03.png" 
                alt="Abeille Boxeuse Beezia" 
                className="w-40 h-40 object-contain drop-shadow-lg"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Design & Branding</h1>
              <p className="text-blue-100 text-lg">Gérez l'identité visuelle de {currentClient.metadata.nom}</p>
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

      {/* Menu horizontal des onglets - Répartition équilibrée */}
      <div className="mb-8 relative">
        <nav className="flex bg-gray-100 p-1 rounded-xl" aria-label="Tabs">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <div key={tab.id} className="flex-1 relative">
                {/* Icône d'information pour Typographies */}
                {tab.id === 'Typographies' && (
                  <div className="absolute -top-6 right-2 group">
                    <Info 
                      className="w-4 h-4 text-gray-400 hover:text-blue-600 cursor-help transition-colors" 
                    />
                    {/* Tooltip */}
                    <div className="absolute bottom-full right-0 mb-2 w-80 bg-gray-900 text-white text-sm rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="space-y-1">
                        <p className="font-semibold">Gestion des typographies</p>
                        <p>• Séparez les polices pour titres et textes</p>
                        <p>• Définissez taille, poids et famille de police</p>
                        <p>• Prévisualisez en temps réel vos choix</p>
                        <p>• Maintenez la cohérence de votre identité</p>
                        <p>• Les modifications sont automatiquement sauvegardées</p>
                      </div>
                      {/* Flèche du tooltip */}
                      <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                )}
                
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-center space-x-3 px-4 py-4 text-sm font-medium rounded-lg transition-all duration-200 ${
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
    </div>
  );
};

export default DesignBranding;