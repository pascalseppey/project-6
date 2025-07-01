import React, { useState } from 'react';
import { Share2, Plus, ExternalLink, Users, Calendar, Edit3, TrendingUp, Settings, Link } from 'lucide-react';
import { FaFacebook, FaLinkedin, FaInstagram, FaTwitter, FaYoutube, FaTiktok, FaPinterest } from 'react-icons/fa';

interface EditableFieldProps {
  value: string;
  onSave: (newValue: string) => void;
  placeholder?: string;
}

const EditableField: React.FC<EditableFieldProps> = ({ 
  value, 
  onSave, 
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
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <input
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleSave}
        className="w-full p-2 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium"
        placeholder={placeholder}
        autoFocus
      />
    );
  }

  return (
    <div 
      className="group relative cursor-pointer"
      onClick={() => setIsEditing(true)}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {value ? (
            <div className="text-gray-900 font-medium hover:text-blue-600 transition-colors">
              {value}
            </div>
          ) : (
            <div className="text-gray-400 italic">
              {placeholder}
            </div>
          )}
        </div>
        <Edit3 className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0" />
      </div>
    </div>
  );
};

interface ReseauSocial {
  id: string;
  nom: string;
  plateforme: string;
  lien: string;
  followers: number;
  postsParSemaine: number;
  actif: boolean;
}

const ReseauxSociaux: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Comptes');
  
  // États pour les réseaux sociaux
  const [reseauxData, setReseauxData] = useState<ReseauSocial[]>([
    {
      id: '1',
      nom: 'Charly Gaillard',
      plateforme: 'LinkedIn',
      lien: 'https://linkedin.com/in/charlygaillard',
      followers: 1250,
      postsParSemaine: 3,
      actif: true
    },
    {
      id: '2',
      nom: '@charlygaillard_dev',
      plateforme: 'Instagram',
      lien: 'https://instagram.com/charlygaillard_dev',
      followers: 850,
      postsParSemaine: 4,
      actif: true
    },
    {
      id: '3',
      nom: 'Charly Gaillard SARL',
      plateforme: 'Facebook',
      lien: 'https://facebook.com/charlygaillard.sarl',
      followers: 420,
      postsParSemaine: 2,
      actif: true
    },
    {
      id: '4',
      nom: '@CharlyCodes',
      plateforme: 'Twitter',
      lien: 'https://twitter.com/charlycodes',
      followers: 680,
      postsParSemaine: 5,
      actif: false
    }
  ]);

  // États pour la stratégie
  const [strategieData, setStrategieData] = useState({
    objectifs: 'Augmenter la visibilité de l\'expertise technique et attirer de nouveaux clients',
    cibleAudience: 'PME, startups, entrepreneurs cherchant des solutions digitales',
    tonalite: 'Professionnel mais accessible, expertise technique vulgarisée',
    frequenceGlobale: '14 posts par semaine tous réseaux confondus'
  });

  // États pour les statistiques
  const [statsData, setStatsData] = useState({
    totalFollowers: 3200,
    croissanceMensuelle: 12.5,
    engagementMoyen: 4.8,
    meilleurReseau: 'LinkedIn'
  });

  const tabs = [
    { id: 'Comptes', label: 'Comptes', icon: Share2 },
    { id: 'Stratégie', label: 'Stratégie', icon: TrendingUp },
    { id: 'Statistiques', label: 'Statistiques', icon: Users },
  ];

  const getPlatformIcon = (plateforme: string) => {
    const iconProps = { size: 24, className: "text-white" };
    
    switch (plateforme) {
      case 'LinkedIn':
        return <FaLinkedin {...iconProps} />;
      case 'Instagram':
        return <FaInstagram {...iconProps} />;
      case 'Facebook':
        return <FaFacebook {...iconProps} />;
      case 'Twitter':
        return <FaTwitter {...iconProps} />;
      case 'YouTube':
        return <FaYoutube {...iconProps} />;
      case 'TikTok':
        return <FaTiktok {...iconProps} />;
      case 'Pinterest':
        return <FaPinterest {...iconProps} />;
      default:
        return <Share2 {...iconProps} />;
    }
  };

  const getPlatformColor = (plateforme: string) => {
    const colors: { [key: string]: string } = {
      'LinkedIn': '#0077B5',
      'Instagram': '#E4405F',
      'Facebook': '#1877F2',
      'Twitter': '#1DA1F2',
      'YouTube': '#FF0000',
      'TikTok': '#000000',
      'Pinterest': '#BD081C',
      'Autre': '#6B7280'
    };
    return colors[plateforme] || '#6B7280';
  };

  const ajouterReseau = () => {
    const nouveauReseau: ReseauSocial = {
      id: Date.now().toString(),
      nom: 'Nouveau compte',
      plateforme: 'Autre',
      lien: '',
      followers: 0,
      postsParSemaine: 1,
      actif: true
    };
    setReseauxData([...reseauxData, nouveauReseau]);
  };

  const updateReseau = (index: number, field: string, value: string | number | boolean) => {
    setReseauxData(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const supprimerReseau = (index: number) => {
    if (reseauxData.length > 1) {
      setReseauxData(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateStrategie = (field: string, value: string) => {
    setStrategieData(prev => ({ ...prev, [field]: value }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Comptes':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Comptes de réseaux sociaux</h3>
              <button
                onClick={ajouterReseau}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un réseau</span>
              </button>
            </div>
            
            {/* Présentation horizontale simplifiée des réseaux sociaux */}
            <div className="space-y-4">
              {reseauxData.map((reseau, index) => (
                <div key={reseau.id} className={`bg-white rounded-2xl p-6 border-2 shadow-sm transition-all duration-200 ${
                  reseau.actif 
                    ? 'border-green-200 hover:shadow-lg' 
                    : 'border-gray-200 opacity-75'
                }`}>
                  
                  {/* Layout horizontal compact */}
                  <div className="flex items-center justify-between">
                    {/* Logo + Nom du compte (éditable) */}
                    <div className="flex items-center space-x-4 flex-1">
                      {/* Logo du réseau social avec couleur de la plateforme */}
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: getPlatformColor(reseau.plateforme) }}
                      >
                        {getPlatformIcon(reseau.plateforme)}
                      </div>
                      
                      {/* Nom du compte éditable */}
                      <div className="flex-1 max-w-xs">
                        <EditableField
                          value={reseau.nom}
                          onSave={(value) => updateReseau(index, 'nom', value)}
                          placeholder="Nom du compte"
                        />
                        <div className="text-sm text-gray-500 mt-1">{reseau.plateforme}</div>
                      </div>
                    </div>
                    
                    {/* Statistiques (non éditables) */}
                    <div className="flex items-center space-x-8">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{reseau.followers.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Followers</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{reseau.postsParSemaine}</div>
                        <div className="text-sm text-gray-600">Posts/semaine</div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center space-x-3">
                      {/* Lien direct */}
                      {reseau.lien && (
                        <a
                          href={reseau.lien}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-colors"
                          title="Ouvrir le profil"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                      
                      {/* Toggle actif/inactif */}
                      <button
                        onClick={() => updateReseau(index, 'actif', !reseau.actif)}
                        className={`p-3 rounded-xl transition-colors ${
                          reseau.actif 
                            ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        title={reseau.actif ? 'Désactiver' : 'Activer'}
                      >
                        <Users className="w-5 h-5" />
                      </button>
                      
                      {/* Bouton de connexion/paramètres */}
                      <button
                        className="p-3 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition-colors"
                        title="Paramètres de connexion"
                      >
                        <Link className="w-5 h-5" />
                      </button>
                      
                      {/* Supprimer */}
                      {reseauxData.length > 1 && (
                        <button
                          onClick={() => supprimerReseau(index)}
                          className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors"
                          title="Supprimer"
                        >
                          <Users className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Configuration rapide en dessous */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Plateforme */}
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Plateforme</label>
                        <select
                          value={reseau.plateforme}
                          onChange={(e) => updateReseau(index, 'plateforme', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                          <option value="LinkedIn">LinkedIn</option>
                          <option value="Instagram">Instagram</option>
                          <option value="Facebook">Facebook</option>
                          <option value="Twitter">Twitter</option>
                          <option value="YouTube">YouTube</option>
                          <option value="TikTok">TikTok</option>
                          <option value="Pinterest">Pinterest</option>
                          <option value="Autre">Autre</option>
                        </select>
                      </div>
                      
                      {/* Lien vers le profil */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Lien vers le profil</label>
                        <input
                          type="url"
                          value={reseau.lien}
                          onChange={(e) => updateReseau(index, 'lien', e.target.value)}
                          placeholder="https://..."
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Stratégie':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Objectifs</h3>
              <textarea
                value={strategieData.objectifs}
                onChange={(e) => updateStrategie('objectifs', e.target.value)}
                placeholder="Quels sont vos objectifs sur les réseaux sociaux ?"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
              />
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Audience cible</h3>
              <textarea
                value={strategieData.cibleAudience}
                onChange={(e) => updateStrategie('cibleAudience', e.target.value)}
                placeholder="Qui voulez-vous atteindre ?"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
              />
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tonalité</h3>
              <textarea
                value={strategieData.tonalite}
                onChange={(e) => updateStrategie('tonalite', e.target.value)}
                placeholder="Quel ton adopter dans vos communications ?"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
              />
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Fréquence globale</h3>
              <textarea
                value={strategieData.frequenceGlobale}
                onChange={(e) => updateStrategie('frequenceGlobale', e.target.value)}
                placeholder="Combien de posts par semaine au total ?"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
              />
            </div>
            
            {/* Répartition par réseau */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200 lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Répartition par réseau</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {reseauxData
                  .filter(reseau => reseau.actif)
                  .map((reseau, index) => (
                  <div key={reseau.id} className="text-center p-4 bg-white rounded-xl border border-gray-200">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2"
                      style={{ backgroundColor: getPlatformColor(reseau.plateforme) }}
                    >
                      {getPlatformIcon(reseau.plateforme)}
                    </div>
                    <div className="text-sm font-medium text-gray-700">{reseau.plateforme}</div>
                    <div className="text-2xl font-bold text-gray-900">{reseau.postsParSemaine}</div>
                    <div className="text-xs text-gray-500">posts/semaine</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Statistiques':
        const totalFollowers = reseauxData.reduce((sum, reseau) => sum + reseau.followers, 0);
        const totalPostsParSemaine = reseauxData
          .filter(reseau => reseau.actif)
          .reduce((sum, reseau) => sum + reseau.postsParSemaine, 0);
        const reseauxActifs = reseauxData.filter(reseau => reseau.actif).length;
        
        return (
          <div className="space-y-6">
            {/* Statistiques globales */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                <div className="flex items-center space-x-3 mb-2">
                  <Users className="w-6 h-6" />
                  <span className="text-blue-100">Total Followers</span>
                </div>
                <div className="text-3xl font-bold">{totalFollowers.toLocaleString()}</div>
                <div className="text-blue-100 text-sm">+{statsData.croissanceMensuelle}% ce mois</div>
              </div>
              
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
                <div className="flex items-center space-x-3 mb-2">
                  <Calendar className="w-6 h-6" />
                  <span className="text-green-100">Posts/semaine</span>
                </div>
                <div className="text-3xl font-bold">{totalPostsParSemaine}</div>
                <div className="text-green-100 text-sm">Tous réseaux actifs</div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
                <div className="flex items-center space-x-3 mb-2">
                  <Share2 className="w-6 h-6" />
                  <span className="text-purple-100">Réseaux actifs</span>
                </div>
                <div className="text-3xl font-bold">{reseauxActifs}</div>
                <div className="text-purple-100 text-sm">sur {reseauxData.length} total</div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
                <div className="flex items-center space-x-3 mb-2">
                  <TrendingUp className="w-6 h-6" />
                  <span className="text-orange-100">Engagement</span>
                </div>
                <div className="text-3xl font-bold">{statsData.engagementMoyen}%</div>
                <div className="text-orange-100 text-sm">Taux moyen</div>
              </div>
            </div>
            
            {/* Détail par réseau */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Performance par réseau</h3>
              <div className="space-y-4">
                {reseauxData
                  .sort((a, b) => b.followers - a.followers)
                  .map((reseau, index) => (
                  <div key={reseau.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: getPlatformColor(reseau.plateforme) }}
                      >
                        {getPlatformIcon(reseau.plateforme)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{reseau.plateforme}</div>
                        <div className="text-sm text-gray-600">{reseau.nom}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-8">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{reseau.followers.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Followers</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{reseau.postsParSemaine}</div>
                        <div className="text-sm text-gray-600">Posts/sem.</div>
                      </div>
                      
                      <div className="text-center">
                        <div className={`w-3 h-3 rounded-full ${reseau.actif ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        <div className="text-sm text-gray-600 mt-1">
                          {reseau.actif ? 'Actif' : 'Inactif'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Recommandations */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <span>💡</span>
                <span>Recommandations</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-yellow-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Meilleur réseau</h4>
                  <p className="text-gray-600 text-sm">
                    {reseauxData.find(r => r.followers === Math.max(...reseauxData.map(r => r.followers)))?.plateforme} 
                    avec {Math.max(...reseauxData.map(r => r.followers)).toLocaleString()} followers
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-yellow-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Optimisation</h4>
                  <p className="text-gray-600 text-sm">
                    Augmentez la fréquence sur les réseaux avec le plus d'engagement
                  </p>
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
      {/* Bannière bleue avec petite abeille boxeuse et titre */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
        
        <div className="relative z-10 flex items-center justify-between">
          {/* Zone gauche avec petite abeille boxeuse agrandie +20% et titre */}
          <div className="flex items-center space-x-6">
            {/* Petite abeille boxeuse agrandie de 20% (de w-40 h-40 à w-48 h-48) */}
            <div className="w-50 h-50 flex items-center justify-center">
              <img 
                src="/ChatGPT Image 1 juil. 2025, 04_23_49.png" 
                alt="Petite Abeille Boxeuse Beezia" 
                className="w-48 h-48 object-contain drop-shadow-lg"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Réseaux Sociaux</h1>
              <p className="text-blue-100 text-lg">Gérez votre présence sur les réseaux sociaux</p>
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

export default ReseauxSociaux;