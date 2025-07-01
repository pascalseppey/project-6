import React, { useState, useEffect } from 'react';
import { Home, MapPin, Palette, Share2, Users, MessageSquare, CheckSquare, Calendar, Globe, Megaphone, FileText, Search, BarChart3, Sigma as Sitemap, Key, Type, Settings, HelpCircle, LogOut, Bot, ChevronRight, Bell, Mail, ChevronDown, Zap, Building2, Phone, Clock, User, Star, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState('https://www.google.ch');
  const [progressSteps, setProgressSteps] = useState({
    siteWeb: 0,
    corporateId: 0,
    ficheGmb: 0,
    avisClients: 0
  });
  const [currentStep, setCurrentStep] = useState('');

  // Mettre à jour l'heure toutes les secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Animation séquentielle des cercles de progression
  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setProgressSteps(prev => {
          const newProgress = { ...prev };
          
          // Étape 1: Site Web (0-100% en 15 secondes)
          if (newProgress.siteWeb < 100) {
            newProgress.siteWeb = Math.min(100, newProgress.siteWeb + (100 / 150));
            setCurrentStep('siteWeb');
          }
          // Étape 2: Corporate ID (0-100% en 15 secondes)
          else if (newProgress.corporateId < 100) {
            newProgress.corporateId = Math.min(100, newProgress.corporateId + (100 / 150));
            setCurrentStep('corporateId');
          }
          // Étape 3: Fiche(s) GMB (0-100% en 15 secondes)
          else if (newProgress.ficheGmb < 100) {
            newProgress.ficheGmb = Math.min(100, newProgress.ficheGmb + (100 / 150));
            setCurrentStep('ficheGmb');
          }
          // Étape 4: Avis clients (0-100% en 15 secondes)
          else if (newProgress.avisClients < 100) {
            newProgress.avisClients = Math.min(100, newProgress.avisClients + (100 / 150));
            setCurrentStep('avisClients');
          }
          // Fin de l'animation
          else {
            setIsLoading(false);
            setCurrentStep('');
          }
          
          return newProgress;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleLetsFightClick = () => {
    setProgressSteps({
      siteWeb: 0,
      corporateId: 0,
      ficheGmb: 0,
      avisClients: 0
    });
    setCurrentStep('');
    setIsLoading(true);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const menuSections = [
    {
      title: 'À PROPOS',
      items: [
        { name: 'Infos générales', icon: Home, active: false },
        { name: 'Localisation', icon: MapPin, active: false },
        { name: 'Design & Branding', icon: Palette, active: false },
        { name: 'Réseaux sociaux', icon: Share2, active: false },
        { name: 'Concurrents', icon: Users, active: false },
      ]
    },
    {
      title: 'COMMUNICATION',
      items: [
        { name: 'Stratégie', icon: MessageSquare, active: false },
        { name: "Plan d'action", icon: CheckSquare, active: false },
        { name: 'Calendrier', icon: Calendar, active: false },
      ]
    },
    {
      title: 'CAMPAGNES',
      items: [
        { name: 'Actualité Site Web', icon: Globe, active: false },
        { name: 'Campagnes Google Ads', icon: Megaphone, active: false },
        { name: 'Campagnes Réseaux Sociaux', icon: Share2, active: false },
        { name: 'Campagne Newsletter', icon: FileText, active: false },
      ]
    },
    {
      title: 'SITE WEB',
      items: [
        { name: 'Analyse SEO', icon: Search, active: false },
        { name: 'Google Analytics', icon: BarChart3, active: false },
        { name: 'Plan de site', icon: Sitemap, active: false },
        { name: 'Mots-clés', icon: Key, active: false },
        { name: 'Texte SEO', icon: Type, active: false },
        { name: 'WordPress', icon: Settings, active: false },
        { name: 'Domaine & Hébergement', icon: Globe, active: false },
      ]
    },
    {
      title: 'PERSONNEL',
      items: [
        { name: 'Paramétrage', icon: Settings, active: false },
        { name: 'Aide', icon: HelpCircle, active: false },
      ]
    }
  ];

  const statsCards = [
    {
      title: 'Prinmoer',
      value: '$256K',
      subtitle: 'Sehrongot',
      trend: '+12.5%',
      color: 'bg-white'
    },
    {
      title: 'And Mows',
      value: '$459K',
      subtitle: 'Sehrongot',
      trend: '+8.2%',
      color: 'bg-white',
      hasButton: true
    },
    {
      title: 'Rooktont',
      value: '$549K',
      subtitle: 'Sehrongot',
      trend: '+15.3%',
      color: 'bg-white',
      hasChart: true
    }
  ];

  const bottomCards = [
    {
      title: 'New comsider',
      type: 'chart',
      color: 'bg-blue-50'
    },
    {
      title: 'Sochetiorid',
      value: '8994',
      subtitle: 'Sharengot',
      type: 'metric',
      color: 'bg-blue-50'
    },
    {
      title: 'Performance',
      type: 'chart-with-button',
      color: 'bg-blue-50'
    }
  ];

  // Composant pour les mini graphiques dans la zone bleue
  const MiniChart = ({ type, data }) => {
    if (type === 'line') {
      return (
        <svg className="w-full h-16" viewBox="0 0 100 40">
          <path
            d="M5,30 Q25,10 45,20 T85,15"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="85" cy="15" r="2" fill="white" />
        </svg>
      );
    }
    
    if (type === 'bar') {
      return (
        <div className="flex items-end justify-center space-x-1 h-16">
          {[20, 35, 25, 45, 30, 50, 28, 40].map((height, i) => (
            <div 
              key={i}
              className="bg-white/70 rounded-t-sm transition-all duration-300"
              style={{ height: `${height}%`, width: '8px' }}
            />
          ))}
        </div>
      );
    }

    if (type === 'area') {
      return (
        <svg className="w-full h-16" viewBox="0 0 100 40">
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
            </linearGradient>
          </defs>
          <path
            d="M5,35 Q25,15 45,25 T85,20 L85,35 L5,35 Z"
            fill="url(#areaGradient)"
          />
          <path
            d="M5,35 Q25,15 45,25 T85,20"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      );
    }

    // Graphique en donut
    return (
      <div className="flex items-center justify-center h-16">
        <div className="relative w-12 h-12">
          <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeDasharray="75, 100"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-xs font-bold">75%</span>
          </div>
        </div>
      </div>
    );
  };

  // Composant pour le grand cercle de pourcentage animé
  const LargePercentageCircle = ({ percentage = 0, isActive = false }) => {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="2"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={isActive ? "rgba(255,255,255,1)" : "white"}
              strokeWidth="2"
              strokeDasharray={`${percentage}, 100`}
              className={`transition-all duration-100 ease-linear ${isActive ? 'drop-shadow-lg' : ''}`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-white text-xl font-bold ${isActive ? 'text-shadow-lg' : ''}`}>
              {Math.round(percentage)}%
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Fonction pour rendre le contenu de la page Infos Générales
  const renderInfosGeneralesContent = () => {
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
                  src="/src/assets/ChatGPT Image 1 juil. 2025, 04_23_49.png" 
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
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200 font-semibold">
                Modifier
              </button>
            </div>
          </div>
        </div>

        {/* Contenu principal - Grille d'informations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Informations de l'entreprise */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Building2 className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Entreprise</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Nom de l'entreprise</label>
                <div className="bg-gray-50 p-4 rounded-xl border">
                  <p className="text-gray-900 font-semibold">Charly Gaillard</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Secteur d'activité</label>
                <div className="bg-gray-50 p-4 rounded-xl border">
                  <p className="text-gray-900">Services numériques</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Description</label>
                <div className="bg-gray-50 p-4 rounded-xl border">
                  <p className="text-gray-900">Spécialiste en développement web et marketing digital</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Année de création</label>
                <div className="bg-gray-50 p-4 rounded-xl border">
                  <p className="text-gray-900">2020</p>
                </div>
              </div>
            </div>
          </div>

          {/* Informations de contact */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Phone className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Contact</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Site web</label>
                <div className="bg-gray-50 p-4 rounded-xl border">
                  <p className="text-blue-600 font-medium">https://charlygaillard.ch</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                <div className="bg-gray-50 p-4 rounded-xl border">
                  <p className="text-gray-900">contact@charlygaillard.ch</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Téléphone</label>
                <div className="bg-gray-50 p-4 rounded-xl border">
                  <p className="text-gray-900">+41 79 123 45 67</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Adresse</label>
                <div className="bg-gray-50 p-4 rounded-xl border">
                  <p className="text-gray-900">Rue de la Paix 15<br />1000 Lausanne, Suisse</p>
                </div>
              </div>
            </div>
          </div>

          {/* Horaires d'ouverture */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Clock className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Horaires</h2>
            </div>
            
            <div className="space-y-4">
              {[
                { day: 'Lundi', hours: '09:00 - 18:00' },
                { day: 'Mardi', hours: '09:00 - 18:00' },
                { day: 'Mercredi', hours: '09:00 - 18:00' },
                { day: 'Jeudi', hours: '09:00 - 18:00' },
                { day: 'Vendredi', hours: '09:00 - 17:00' },
                { day: 'Samedi', hours: 'Fermé' },
                { day: 'Dimanche', hours: 'Fermé' }
              ].map((schedule, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <span className="text-gray-700 font-medium">{schedule.day}</span>
                  <span className={`${schedule.hours === 'Fermé' ? 'text-red-500' : 'text-gray-900'} font-medium`}>
                    {schedule.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Équipe */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <User className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Équipe</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">CG</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Charly Gaillard</h3>
                  <p className="text-gray-600 text-sm">Fondateur & Développeur</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">1</div>
                  <div className="text-sm text-gray-600">Employé</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">5+</div>
                  <div className="text-sm text-gray-600">Années d'exp.</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">50+</div>
                  <div className="text-sm text-gray-600">Projets</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section statistiques rapides */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
          <div className="flex items-center space-x-3 mb-6">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Aperçu rapide</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction client</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">24h</div>
              <div className="text-gray-600">Temps de réponse</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600">Projets livrés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">5★</div>
              <div className="text-gray-600">Note moyenne</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Fonction pour rendre le contenu de la page Localisation
  const renderLocalisationContent = () => {
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
                  src="/src/assets/ChatGPT Image 1 juil. 2025, 04_23_49.png" 
                  alt="Beezia Mascot" 
                  className="w-16 h-16 object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Localisation</h1>
                <p className="text-blue-100 text-lg">Gérez votre présence géographique</p>
              </div>
            </div>
            
            {/* Zone droite avec bouton d'action */}
            <div className="flex items-center space-x-4">
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200 font-semibold">
                Modifier
              </button>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Adresse principale */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <MapPin className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Adresse principale</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Adresse</label>
                <div className="bg-gray-50 p-4 rounded-xl border">
                  <p className="text-gray-900 font-semibold">Rue de la Paix 15</p>
                  <p className="text-gray-900">1000 Lausanne</p>
                  <p className="text-gray-900">Suisse</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Coordonnées GPS</label>
                <div className="bg-gray-50 p-4 rounded-xl border">
                  <p className="text-gray-900">46.5197° N, 6.6323° E</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Zone de service</label>
                <div className="bg-gray-50 p-4 rounded-xl border">
                  <p className="text-gray-900">Suisse romande</p>
                </div>
              </div>
            </div>
          </div>

          {/* Carte interactive */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Globe className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Carte</h2>
            </div>
            
            <div className="bg-blue-50 rounded-xl h-64 flex items-center justify-center border-2 border-dashed border-blue-200">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <p className="text-blue-600 font-semibold">Carte interactive</p>
                <p className="text-blue-500 text-sm">Lausanne, Suisse</p>
              </div>
            </div>
          </div>

          {/* Zones de service */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Building2 className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Zones de service</h2>
            </div>
            
            <div className="space-y-4">
              {[
                { zone: 'Lausanne', status: 'Principal', color: 'bg-blue-100 text-blue-800' },
                { zone: 'Genève', status: 'Secondaire', color: 'bg-green-100 text-green-800' },
                { zone: 'Montreux', status: 'Secondaire', color: 'bg-green-100 text-green-800' },
                { zone: 'Yverdon', status: 'Étendue', color: 'bg-yellow-100 text-yellow-800' },
                { zone: 'Fribourg', status: 'Étendue', color: 'bg-yellow-100 text-yellow-800' }
              ].map((zone, index) => (
                <div key={index} className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-xl">
                  <span className="text-gray-900 font-medium">{zone.zone}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${zone.color}`}>
                    {zone.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Statistiques de localisation */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Statistiques</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">5</div>
                <div className="text-sm text-gray-600">Zones couvertes</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-2xl font-bold text-green-600">50km</div>
                <div className="text-sm text-gray-600">Rayon d'action</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="text-2xl font-bold text-purple-600">95%</div>
                <div className="text-sm text-gray-600">Couverture</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-xl">
                <div className="text-2xl font-bold text-orange-600">24h</div>
                <div className="text-sm text-gray-600">Délai moyen</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Fonction pour rendre le contenu de la page Design & Branding
  const renderDesignBrandingContent = () => {
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
                  src="/src/assets/ChatGPT Image 1 juil. 2025, 04_23_49.png" 
                  alt="Beezia Mascot" 
                  className="w-16 h-16 object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Design & Branding</h1>
                <p className="text-blue-100 text-lg">Gérez votre identité visuelle</p>
              </div>
            </div>
            
            {/* Zone droite avec bouton d'action */}
            <div className="flex items-center space-x-4">
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200 font-semibold">
                Modifier
              </button>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Logo et identité */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Palette className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Logo & Identité</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Logo principal</label>
                <div className="bg-gray-50 p-8 rounded-xl border flex items-center justify-center">
                  <div className="w-24 h-24 bg-blue-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">CG</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Variations</label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl border flex items-center justify-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">CG</span>
                    </div>
                  </div>
                  <div className="bg-gray-900 p-4 rounded-xl border flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">CG</span>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl border flex items-center justify-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">CG</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Palette de couleurs */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Palette className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Palette de couleurs</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Couleurs principales</label>
                <div className="grid grid-cols-4 gap-3">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-xl mb-2"></div>
                    <span className="text-xs text-gray-600">#2563EB</span>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-700 rounded-xl mb-2"></div>
                    <span className="text-xs text-gray-600">#1D4ED8</span>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-900 rounded-xl mb-2"></div>
                    <span className="text-xs text-gray-600">#111827</span>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white border-2 border-gray-200 rounded-xl mb-2"></div>
                    <span className="text-xs text-gray-600">#FFFFFF</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Couleurs secondaires</label>
                <div className="grid grid-cols-4 gap-3">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-xl mb-2"></div>
                    <span className="text-xs text-gray-600">#10B981</span>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-500 rounded-xl mb-2"></div>
                    <span className="text-xs text-gray-600">#F59E0B</span>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-500 rounded-xl mb-2"></div>
                    <span className="text-xs text-gray-600">#EF4444</span>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-500 rounded-xl mb-2"></div>
                    <span className="text-xs text-gray-600">#8B5CF6</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Typographie */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Type className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Typographie</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Police principale</label>
                <div className="bg-gray-50 p-4 rounded-xl border">
                  <p className="text-2xl font-bold text-gray-900 mb-2">Inter</p>
                  <p className="text-gray-600">Abcdefghijklmnopqrstuvwxyz</p>
                  <p className="text-gray-600">1234567890</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Hiérarchie</label>
                <div className="space-y-3">
                  <div className="text-4xl font-bold text-gray-900">Titre H1</div>
                  <div className="text-2xl font-bold text-gray-900">Titre H2</div>
                  <div className="text-xl font-semibold text-gray-900">Titre H3</div>
                  <div className="text-base text-gray-900">Texte normal</div>
                  <div className="text-sm text-gray-600">Texte secondaire</div>
                </div>
              </div>
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Guidelines</h2>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-xl">
                <h3 className="font-semibold text-blue-900 mb-2">Usage du logo</h3>
                <p className="text-blue-700 text-sm">Respecter l'espace minimum autour du logo</p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-xl">
                <h3 className="font-semibold text-green-900 mb-2">Couleurs</h3>
                <p className="text-green-700 text-sm">Utiliser les couleurs principales en priorité</p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-xl">
                <h3 className="font-semibold text-purple-900 mb-2">Typographie</h3>
                <p className="text-purple-700 text-sm">Inter pour tous les supports numériques</p>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-xl">
                <h3 className="font-semibold text-orange-900 mb-2">Cohérence</h3>
                <p className="text-orange-700 text-sm">Maintenir la cohérence sur tous les supports</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Fonction pour rendre le contenu de la page Réseaux sociaux
  const renderReseauxSociauxContent = () => {
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
                  src="/src/assets/ChatGPT Image 1 juil. 2025, 04_23_49.png" 
                  alt="Beezia Mascot" 
                  className="w-16 h-16 object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Réseaux sociaux</h1>
                <p className="text-blue-100 text-lg">Gérez votre présence sur les réseaux sociaux</p>
              </div>
            </div>
            
            {/* Zone droite avec bouton d'action */}
            <div className="flex items-center space-x-4">
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200 font-semibold">
                Publier
              </button>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Comptes connectés */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Share2 className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Comptes connectés</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">Li</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">LinkedIn</h3>
                    <p className="text-gray-600 text-sm">@charlygaillard</p>
                  </div>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Connecté</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">X</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">X (Twitter)</h3>
                    <p className="text-gray-600 text-sm">@charlygaillard</p>
                  </div>
                </div>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">En attente</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">Ig</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Instagram</h3>
                    <p className="text-gray-600 text-sm">@charlygaillard.ch</p>
                  </div>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Connecté</span>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Statistiques</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">1.2K</div>
                <div className="text-sm text-gray-600">Followers</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-2xl font-bold text-green-600">89</div>
                <div className="text-sm text-gray-600">Publications</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="text-2xl font-bold text-purple-600">4.5%</div>
                <div className="text-sm text-gray-600">Engagement</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-xl">
                <div className="text-2xl font-bold text-orange-600">156</div>
                <div className="text-sm text-gray-600">Likes/semaine</div>
              </div>
            </div>
          </div>

          {/* Publications récentes */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Publications récentes</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">Li</span>
                  </div>
                  <span className="text-sm text-gray-600">LinkedIn</span>
                  <span className="text-xs text-gray-400">Il y a 2h</span>
                </div>
                <p className="text-gray-900 text-sm mb-3">Nouveau projet web terminé ! Fier du résultat obtenu avec cette startup innovante.</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>12 likes</span>
                  <span>3 commentaires</span>
                  <span>1 partage</span>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">Ig</span>
                  </div>
                  <span className="text-sm text-gray-600">Instagram</span>
                  <span className="text-xs text-gray-400">Il y a 1j</span>
                </div>
                <p className="text-gray-900 text-sm mb-3">Behind the scenes du développement d'une nouvelle app mobile 📱</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>45 likes</span>
                  <span>8 commentaires</span>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-6 h-6 bg-gray-900 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">X</span>
                  </div>
                  <span className="text-sm text-gray-600">X (Twitter)</span>
                  <span className="text-xs text-gray-400">Il y a 3j</span>
                </div>
                <p className="text-gray-900 text-sm mb-3">Les tendances web 2024 : performance, accessibilité et durabilité au cœur des préoccupations</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>23 likes</span>
                  <span>5 retweets</span>
                  <span>2 commentaires</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Fonction pour rendre le contenu de la page Concurrents
  const renderConcurrentsContent = () => {
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
                  src="/src/assets/ChatGPT Image 1 juil. 2025, 04_23_49.png" 
                  alt="Beezia Mascot" 
                  className="w-16 h-16 object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Concurrents</h1>
                <p className="text-blue-100 text-lg">Analysez votre concurrence</p>
              </div>
            </div>
            
            {/* Zone droite avec bouton d'action */}
            <div className="flex items-center space-x-4">
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200 font-semibold">
                Analyser
              </button>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Concurrents principaux */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <Users className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Concurrents principaux</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">WD</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">WebDev Pro</h3>
                    <p className="text-gray-600 text-sm">Concurrent direct</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Score SEO</span>
                    <span className="font-semibold text-red-600">85/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Trafic mensuel</span>
                    <span className="font-semibold text-gray-900">12K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Réseaux sociaux</span>
                    <span className="font-semibold text-gray-900">2.5K</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">DS</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Digital Solutions</h3>
                    <p className="text-gray-600 text-sm">Concurrent indirect</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Score SEO</span>
                    <span className="font-semibold text-green-600">78/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Trafic mensuel</span>
                    <span className="font-semibold text-gray-900">8K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Réseaux sociaux</span>
                    <span className="font-semibold text-gray-900">1.8K</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">TC</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">TechCorp</h3>
                    <p className="text-gray-600 text-sm">Concurrent majeur</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Score SEO</span>
                    <span className="font-semibold text-purple-600">92/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Trafic mensuel</span>
                    <span className="font-semibold text-gray-900">25K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Réseaux sociaux</span>
                    <span className="font-semibold text-gray-900">5.2K</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Analyse comparative */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Analyse comparative</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Votre position</span>
                  <span className="font-semibold text-blue-600">88/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-blue-600 h-3 rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Moyenne concurrence</span>
                  <span className="font-semibold text-gray-600">85/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gray-600 h-3 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Leader du marché</span>
                  <span className="font-semibold text-purple-600">92/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-purple-600 h-3 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Points forts/faibles */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Star className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Forces & Faiblesses</h2>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-xl">
                <h3 className="font-semibold text-green-900 mb-2">Points forts</h3>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Expertise technique reconnue</li>
                  <li>• Relation client personnalisée</li>
                  <li>• Réactivité et flexibilité</li>
                </ul>
              </div>
              
              <div className="p-4 bg-red-50 rounded-xl">
                <h3 className="font-semibold text-red-900 mb-2">Points d'amélioration</h3>
                <ul className="text-red-700 text-sm space-y-1">
                  <li>• Présence sur les réseaux sociaux</li>
                  <li>• Contenu marketing</li>
                  <li>• Notoriété de marque</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Fonction pour rendre le contenu de la page Stratégie
  const renderStrategieContent = () => {
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
                  src="/src/assets/ChatGPT Image 1 juil. 2025, 04_23_49.png" 
                  alt="Beezia Mascot" 
                  className="w-16 h-16 object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Stratégie</h1>
                <p className="text-blue-100 text-lg">Définissez votre stratégie marketing</p>
              </div>
            </div>
            
            {/* Zone droite avec bouton d'action */}
            <div className="flex items-center space-x-4">
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200 font-semibold">
                Modifier
              </button>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Objectifs */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <MessageSquare className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Objectifs 2024</h2>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-blue-900">Augmenter le trafic web</h3>
                  <span className="text-blue-600 font-bold">+50%</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="text-blue-700 text-sm mt-2">65% atteint</p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-green-900">Nouveaux clients</h3>
                  <span className="text-green-600 font-bold">+25</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
                <p className="text-green-700 text-sm mt-2">20/25 clients acquis</p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-purple-900">Présence réseaux sociaux</h3>
                  <span className="text-purple-600 font-bold">2K</span>
                </div>
                <div className="w-full bg-purple-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <p className="text-purple-700 text-sm mt-2">1.2K followers</p>
              </div>
            </div>
          </div>

          {/* Tactiques */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <CheckSquare className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Tactiques clés</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-900">SEO et contenu de qualité</span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-900">Campagnes Google Ads ciblées</span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-900">Marketing de contenu</span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-900">Networking et partenariats</span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-gray-900">Optimisation conversion</span>
              </div>
            </div>
          </div>

          {/* Budget marketing */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Budget marketing</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Google Ads</span>
                <span className="font-semibold text-gray-900">CHF 800/mois</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Contenu & SEO</span>
                <span className="font-semibold text-gray-900">CHF 600/mois</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Réseaux sociaux</span>
                <span className="font-semibold text-gray-900">CHF 400/mois</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Outils & Analytics</span>
                <span className="font-semibold text-gray-900">CHF 200/mois</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total mensuel</span>
                <span className="text-xl font-bold text-blue-600">CHF 2,000</span>
              </div>
            </div>
          </div>

          {/* KPIs */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">KPIs principaux</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">15K</div>
                <div className="text-sm text-gray-600">Visiteurs/mois</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-2xl font-bold text-green-600">3.2%</div>
                <div className="text-sm text-gray-600">Taux conversion</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="text-2xl font-bold text-purple-600">CHF 85</div>
                <div className="text-sm text-gray-600">Coût/acquisition</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-xl">
                <div className="text-2xl font-bold text-orange-600">4.5</div>
                <div className="text-sm text-gray-600">ROI marketing</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Fonction pour rendre le contenu de la page Plan d'action
  const renderPlanActionContent = () => {
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
                  src="/src/assets/ChatGPT Image 1 juil. 2025, 04_23_49.png" 
                  alt="Beezia Mascot" 
                  className="w-16 h-16 object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Plan d'action</h1>
                <p className="text-blue-100 text-lg">Suivez vos actions marketing</p>
              </div>
            </div>
            
            {/* Zone droite avec bouton d'action */}
            <div className="flex items-center space-x-4">
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200 font-semibold">
                Nouvelle action
              </button>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Actions en cours */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Clock className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">En cours</h2>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">3</span>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 border border-blue-200 rounded-xl bg-blue-50">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">Optimisation SEO</h3>
                  <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">Haute</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">Améliorer le référencement des pages principales</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Échéance: 15 Jan</span>
                  <div className="w-16 bg-blue-200 rounded-full h-1">
                    <div className="bg-blue-600 h-1 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border border-blue-200 rounded-xl bg-blue-50">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">Campagne LinkedIn</h3>
                  <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">Moyenne</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">Lancement campagne de contenu B2B</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Échéance: 20 Jan</span>
                  <div className="w-16 bg-blue-200 rounded-full h-1">
                    <div className="bg-blue-600 h-1 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border border-blue-200 rounded-xl bg-blue-50">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">Refonte newsletter</h3>
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">Basse</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">Nouveau design et contenu newsletter</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Échéance: 25 Jan</span>
                  <div className="w-16 bg-blue-200 rounded-full h-1">
                    <div className="bg-blue-600 h-1 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions à faire */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <CheckSquare className="w-6 h-6 text-orange-600" />
              <h2 className="text-xl font-bold text-gray-900">À faire</h2>
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm font-medium">4</span>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">Audit concurrence</h3>
                  <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">Haute</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">Analyser les stratégies des concurrents</p>
                <span className="text-xs text-gray-500">Échéance: 30 Jan</span>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">Contenu blog Q1</h3>
                  <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">Moyenne</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">Planifier 12 articles pour Q1</p>
                <span className="text-xs text-gray-500">Échéance: 5 Fév</span>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">Formation Google Ads</h3>
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">Basse</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">Certification Google Ads avancée</p>
                <span className="text-xs text-gray-500">Échéance: 15 Fév</span>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">Mise à jour portfolio</h3>
                  <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">Moyenne</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">Ajouter 3 nouveaux projets</p>
                <span className="text-xs text-gray-500">Échéance: 20 Fév</span>
              </div>
            </div>
          </div>

          {/* Actions terminées */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <CheckSquare className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-bold text-gray-900">Terminées</h2>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">5</span>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 border border-green-200 rounded-xl bg-green-50">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center mt-0.5">
                    <CheckSquare className="w-3 h-3 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">Site web responsive</h3>
                    <p className="text-gray-600 text-sm">Optimisation mobile terminée</p>
                    <span className="text-xs text-green-600">Terminé le 10 Jan</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border border-green-200 rounded-xl bg-green-50">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center mt-0.5">
                    <CheckSquare className="w-3 h-3 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">Google Analytics 4</h3>
                    <p className="text-gray-600 text-sm">Migration GA4 complète</p>
                    <span className="text-xs text-green-600">Terminé le 8 Jan</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border border-green-200 rounded-xl bg-green-50">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center mt-0.5">
                    <CheckSquare className="w-3 h-3 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">Profil LinkedIn</h3>
                    <p className="text-gray-600 text-sm">Optimisation profil pro</p>
                    <span className="text-xs text-green-600">Terminé le 5 Jan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistiques du plan d'action */}
        <div className="mt-8 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Progression globale</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
              <div className="text-gray-600">Actions totales</div>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">5</div>
              <div className="text-gray-600">Terminées</div>
            </div>
            <div className="text-center p-6 bg-orange-50 rounded-xl">
              <div className="text-3xl font-bold text-orange-600 mb-2">3</div>
              <div className="text-gray-600">En cours</div>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">42%</div>
              <div className="text-gray-600">Taux de réalisation</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Fonction pour rendre le contenu de la page Calendrier
  const renderCalendrierContent = () => {
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
                  src="/src/assets/ChatGPT Image 1 juil. 2025, 04_23_49.png" 
                  alt="Beezia Mascot" 
                  className="w-16 h-16 object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Calendrier</h1>
                <p className="text-blue-100 text-lg">Planifiez votre contenu et vos campagnes</p>
              </div>
            </div>
            
            {/* Zone droite avec bouton d'action */}
            <div className="flex items-center space-x-4">
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200 font-semibold">
                Nouvel événement
              </button>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Mini calendrier */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Janvier 2024</h2>
              <div className="flex space-x-1">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ChevronRight className="w-4 h-4 text-gray-600 rotate-180" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
              <div className="text-gray-500 font-medium">L</div>
              <div className="text-gray-500 font-medium">M</div>
              <div className="text-gray-500 font-medium">M</div>
              <div className="text-gray-500 font-medium">J</div>
              <div className="text-gray-500 font-medium">V</div>
              <div className="text-gray-500 font-medium">S</div>
              <div className="text-gray-500 font-medium">D</div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <div 
                  key={day}
                  className={`p-2 rounded hover:bg-blue-50 cursor-pointer ${
                    day === 15 ? 'bg-blue-600 text-white' : 
                    [3, 8, 12, 20, 25].includes(day) ? 'bg-blue-100 text-blue-600' : 
                    'text-gray-700'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          {/* Planning de la semaine */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Semaine du 15-21 Janvier</h2>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">Semaine</button>
                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">Mois</button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-4">
              {[
                { day: 'Lun 15', events: [{ title: 'Article blog SEO', time: '09:00', type: 'content' }] },
                { day: 'Mar 16', events: [{ title: 'Post LinkedIn', time: '14:00', type: 'social' }] },
                { day: 'Mer 17', events: [{ title: 'Newsletter', time: '10:00', type: 'email' }, { title: 'Réunion client', time: '15:00', type: 'meeting' }] },
                { day: 'Jeu 18', events: [] },
                { day: 'Ven 19', events: [{ title: 'Campagne Google Ads', time: '11:00', type: 'ads' }] },
                { day: 'Sam 20', events: [] },
                { day: 'Dim 21', events: [{ title: 'Planification semaine', time: '19:00', type: 'planning' }] }
              ].map((dayData, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3 min-h-32">
                  <div className="font-semibold text-gray-900 text-sm mb-2">{dayData.day}</div>
                  <div className="space-y-2">
                    {dayData.events.map((event, eventIndex) => (
                      <div 
                        key={eventIndex}
                        className={`p-2 rounded text-xs ${
                          event.type === 'content' ? 'bg-blue-100 text-blue-800' :
                          event.type === 'social' ? 'bg-purple-100 text-purple-800' :
                          event.type === 'email' ? 'bg-green-100 text-green-800' :
                          event.type === 'meeting' ? 'bg-orange-100 text-orange-800' :
                          event.type === 'ads' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <div className="font-medium">{event.time}</div>
                        <div>{event.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Événements à venir */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">À venir</h2>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-medium text-blue-900 text-sm">Lancement campagne Q1</div>
                <div className="text-blue-700 text-xs">25 Janvier - 09:00</div>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="font-medium text-green-900 text-sm">Webinar marketing</div>
                <div className="text-green-700 text-xs">30 Janvier - 14:00</div>
              </div>
              
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="font-medium text-purple-900 text-sm">Audit SEO mensuel</div>
                <div className="text-purple-700 text-xs">1 Février - 10:00</div>
              </div>
            </div>
          </div>

          {/* Types de contenu */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">Types de contenu</h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Articles de blog</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Réseaux sociaux</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Newsletter</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Campagnes Ads</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Réunions</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Planification</span>
              </div>
            </div>
          </div>

          {/* Statistiques du mois */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">Ce mois</h2>
            </div>
            
            <div className="space-y-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-xl font-bold text-blue-600">12</div>
                <div className="text-xs text-gray-600">Publications</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-xl font-bold text-green-600">4</div>
                <div className="text-xs text-gray-600">Campagnes</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-xl font-bold text-purple-600">8</div>
                <div className="text-xs text-gray-600">Réunions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Fonction pour rendre le contenu de la page Actualité Site Web
  const renderActualiteSiteWebContent = () => {
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
                  src="/src/assets/ChatGPT Image 1 juil. 2025, 04_23_49.png" 
                  alt="Beezia Mascot" 
                  className="w-16 h-16 object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Actualité Site Web</h1>
                <p className="text-blue-100 text-lg">Gérez le contenu de votre site web</p>
              </div>
            </div>
            
            {/* Zone droite avec bouton d'action */}
            <div className="flex items-center space-x-4">
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200 font-semibold">
                Nouvel article
              </button>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Articles récents */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Globe className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Articles récents</h2>
            </div>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Les tendances du développement web en 2024</h3>
                    <p className="text-gray-600 text-sm mb-3">Découvrez les technologies et pratiques qui façonnent l'avenir du développement web...</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium ml-4">Publié</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Publié le 10 Jan 2024</span>
                  <div className="flex items-center space-x-4">
                    <span>245 vues</span>
                    <span>12 partages</span>
                    <button className="text-blue-600 hover:text-blue-700">Modifier</button>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Optimisation SEO : Guide complet 2024</h3>
                    <p className="text-gray-600 text-sm mb-3">Stratégies avancées pour améliorer votre référencement naturel et attirer plus de visiteurs...</p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium ml-4">Brouillon</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Modifié le 8 Jan 2024</span>
                  <div className="flex items-center space-x-4">
                    <span>En rédaction</span>
                    <button className="text-blue-600 hover:text-blue-700">Continuer</button>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Portfolio : Mes dernières réalisations</h3>
                    <p className="text-gray-600 text-sm mb-3">Présentation de trois projets web récents avec leurs défis et solutions techniques...</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium ml-4">Programmé</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Publication le 15 Jan 2024</span>
                  <div className="flex items-center space-x-4">
                    <span>Prêt à publier</span>
                    <button className="text-blue-600 hover:text-blue-700">Voir</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistiques et actions */}
          <div className="space-y-8">
            {/* Statistiques du blog */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Statistiques</h2>
              </div>
              
              <div className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">24</div>
                  <div className="text-sm text-gray-600">Articles publiés</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">3.2K</div>
                  <div className="text-sm text-gray-600">Vues ce mois</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">156</div>
                  <div className="text-sm text-gray-600">Partages</div>
                </div>
              </div>
            </div>

            {/* Catégories */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Catégories</h2>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Développement web</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">SEO & Marketing</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">6</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Tutoriels</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Actualités tech</span>
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Portfolio</span>
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">2</span>
                </div>
              </div>
            </div>

            {/* Actions rapides */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Actions rapides</h2>
              </div>
              
              <div className="space-y-3">
                <button className="w-full p-3 bg-blue-50 text-blue-700 rounded-lg text-left hover:bg-blue-100 transition-colors">
                  <div className="font-medium">Nouvel article</div>
                  <div className="text-sm text-blue-600">Créer un nouveau contenu</div>
                </button>
                
                <button className="w-full p-3 bg-green-50 text-green-700 rounded-lg text-left hover:bg-green-100 transition-colors">
                  <div className="font-medium">Programmer publication</div>
                  <div className="text-sm text-green-600">Planifier du contenu</div>
                </button>
                
                <button className="w-full p-3 bg-purple-50 text-purple-700 rounded-lg text-left hover:bg-purple-100 transition-colors">
                  <div className="font-medium">Gérer les catégories</div>
                  <div className="text-sm text-purple-600">Organiser le contenu</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Fonction pour rendre le contenu de la page Campagnes Google Ads
  const renderCampagnesGoogleAdsContent = () => {
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
                  src="/src/assets/ChatGPT Image 1 juil. 2025, 04_23_49.png" 
                  alt="Beezia Mascot" 
                  className="w-16 h-16 object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Campagnes Google Ads</h1>
                <p className="text-blue-100 text-lg">Gérez vos campagnes publicitaires</p>
              </div>
            </div>
            
            {/* Zone droite avec bouton d'action */}
            <div className="flex items-center space-x-4">
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200 font-semibold">
                Nouvelle campagne
              </button>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Campagnes actives */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Megaphone className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Campagnes actives</h2>
            </div>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Développement Web Suisse</h3>
                    <p className="text-gray-600 text-sm">Campagne de recherche ciblant les entreprises suisses</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Active</span>
                </div>
                
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">CHF 450</div>
                    <div className="text-xs text-gray-600">Budget/jour</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">3.2%</div>
                    <div className="text-xs text-gray-600">CTR</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">CHF 2.80</div>
                    <div className="text-xs text-gray-600">CPC moyen</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">12</div>
                    <div className="text-xs text-gray-600">Conversions</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Créée le 5 Jan 2024</span>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-700">Modifier</button>
                    <button className="text-gray-600 hover:text-gray-700">Statistiques</button>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Sites Web Responsive</h3>
                    <p className="text-gray-600 text-sm">Campagne Display pour la création de sites mobiles</p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">En pause</span>
                </div>
                
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">CHF 200</div>
                    <div className="text-xs text-gray-600">Budget/jour</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">1.8%</div>
                    <div className="text-xs text-gray-600">CTR</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">CHF 1.50</div>
                    <div className="text-xs text-gray-600">CPC moyen</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">8</div>
                    <div className="text-xs text-gray-600">Conversions</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Créée le 20 Déc 2023</span>
                  <div className="flex space-x-2">
                    <button className="text-green-600 hover:text-green-700">Reprendre</button>
                    <button className="text-blue-600 hover:text-blue-700">Modifier</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistiques et performance */}
          <div className="space-y-8">
            {/* Performance globale */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Performance</h2>
              </div>
              
              <div className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">CHF 1,250</div>
                  <div className="text-sm text-gray-600">Dépenses ce mois</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">20</div>
                  <div className="text-sm text-gray-600">Conversions</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">CHF 62.50</div>
                  <div className="text-sm text-gray-600">Coût/conversion</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600">3.8</div>
                  <div className="text-sm text-gray-600">ROAS</div>
                </div>
              </div>
            </div>

            {/* Mots-clés top */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Key className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Top mots-clés</h2>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-gray-700 text-sm">développement web suisse</span>
                  <span className="text-blue-600 font-medium text-sm">CHF 3.20</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-gray-700 text-sm">site web responsive</span>
                  <span className="text-blue-600 font-medium text-sm">CHF 2.80</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-gray-700 text-sm">création site internet</span>
                  <span className="text-blue-600 font-medium text-sm">CHF 2.50</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-gray-700 text-sm">développeur freelance</span>
                  <span className="text-blue-600 font-medium text-sm">CHF 1.90</span>
                </div>
              </div>
            </div>

            {/* Actions rapides */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Actions rapides</h2>
              </div>
              
              <div className="space-y-3">
                <button className="w-full p-3 bg-blue-50 text-blue-700 rounded-lg text-left hover:bg-blue-100 transition-colors">
                  <div className="font-medium">Optimiser enchères</div>
                  <div className="text-sm text-blue-600">Ajuster les CPC</div>
                </button>
                
                <button className="w-full p-3 bg-green-50 text-green-700 rounded-lg text-left hover:bg-green-100 transition-colors">
                  <div className="font-medium">Ajouter mots-clés</div>
                  <div className="text-sm text-green-600">Étendre la portée</div>
                </button>
                
                <button className="w-full p-3 bg-purple-50 text-purple-700 rounded-lg text-left hover:bg-purple-100 transition-colors">
                  <div className="font-medium">Rapport détaillé</div>
                  <div className="text-sm text-purple-600">Analyser les données</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Fonction pour rendre le contenu de la page Campagnes Réseaux Sociaux
  const renderCampagnesReseauxSociauxContent = () => {
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
                  src="/src/assets/ChatGPT Image 1 juil. 2025, 04_23_49.png" 
                  alt="Beezia Mascot" 
                  className="w-16 h-16 object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Campagnes Réseaux Sociaux</h1>
                <p className="text-blue-100 text-lg">Gérez vos campagnes sur les plateformes sociales</p>
              </div>
            </div>
            
            {/* Zone droite avec bouton d'action */}
            <div className="flex items-center space-x-4">
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200 font-semibold">
                Nouvelle campagne
              </button>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Campagnes par plateforme */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Share2 className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Campagnes par plateforme</h2>
            </div>
            
            <div className="space-y-6">
              {/* LinkedIn */}
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">Li</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">LinkedIn Ads</h3>
                      <p className="text-gray-600 text-sm">Campagne B2B pour services web</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Active</span>
                </div>
                
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">CHF 300</div>
                    <div className="text-xs text-gray-600">Budget/semaine</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">2.8K</div>
                    <div className="text-xs text-gray-600">Impressions</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">4.2%</div>
                    <div className="text-xs text-gray-600">CTR</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">15</div>
                    <div className="text-xs text-gray-600">Leads</div>
                  </div>
                </div>
              </div>

              {/* Instagram */}
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">Ig</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Instagram Ads</h3>
                      <p className="text-gray-600 text-sm">Campagne visuelle portfolio</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Active</span>
                </div>
                
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">CHF 150</div>
                    <div className="text-xs text-gray-600">Budget/semaine</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">5.2K</div>
                    <div className="text-xs text-gray-600">Impressions</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">3.6%</div>
                    <div className="text-xs text-gray-600">CTR</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">28</div>
                    <div className="text-xs text-gray-600">Visites site</div>
                  </div>
                </div>
              </div>

              {/* Facebook */}
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">Fb</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Facebook Ads</h3>
                      <p className="text-gray-600 text-sm">Campagne locale PME</p>
                    </div>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">En pause</span>
                </div>
                
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">CHF 200</div>
                    <div className="text-xs text-gray-600">Budget/semaine</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">3.8K</div>
                    <div className="text-xs text-gray-600">Impressions</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">2.1%</div>
                    <div className="text-xs text-gray-600">CTR</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">8</div>
                    <div className="text-xs text-gray-600">Leads</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance et insights */}
          <div className="space-y-8">
            {/* Performance globale */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Performance</h2>
              </div>
              
              <div className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">CHF 650</div>
                  <div className="text-sm text-gray-600">Budget total/semaine</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">11.8K</div>
                  <div className="text-sm text-gray-600">Impressions totales</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">3.5%</div>
                  <div className="text-sm text-gray-600">CTR moyen</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600">51</div>
                  <div className="text-sm text-gray-600">Conversions totales</div>
                </div>
              </div>
            </div>

            {/* Audiences top */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Top audiences</h2>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-medium text-blue-900 text-sm">Dirigeants PME 25-45 ans</div>
                  <div className="text-blue-700 text-xs">CTR: 4.8% • CPC: CHF 3.20</div>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="font-medium text-green-900 text-sm">Entrepreneurs tech</div>
                  <div className="text-green-700 text-xs">CTR: 3.9% • CPC: CHF 2.80</div>
                </div>
                
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="font-medium text-purple-900 text-sm">Startups Suisse romande</div>
                  <div className="text-purple-700 text-xs">CTR: 3.2% • CPC: CHF 2.50</div>
                </div>
              </div>
            </div>

            {/* Contenu performant */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Star className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Contenu top</h2>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900 text-sm">Carousel portfolio</div>
                  <div className="text-gray-600 text-xs">CTR: 5.2% • 156 clics</div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900 text-sm">Vidéo témoignage client</div>
                  <div className="text-gray-600 text-xs">CTR: 4.1% • 98 clics</div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900 text-sm">Infographie tendances web</div>
                  <div className="text-gray-600 text-xs">CTR: 3.8% • 87 clics</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Fonction pour rendre le contenu de la page Campagne Newsletter
  const renderCampagneNewsletterContent = () => {
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
                  src="/src/assets/ChatGPT Image 1 juil. 2025, 04_23_49.png" 
                  alt="Beezia Mascot" 
                  className="w-16 h-16 object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Campagne Newsletter</h1>
                <p className="text-blue-100 text-lg">Gérez vos campagnes email marketing</p>
              </div>
            </div>
            
            {/* Zone droite avec bouton d'action */}
            <div className="flex items-center space-x-4">
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200 font-semibold">
                Nouvelle campagne
              </button>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Campagnes récentes */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Mail className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Campagnes récentes</h2>
            </div>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Newsletter Janvier 2024</h3>
                    <p className="text-gray-600 text-sm">Tendances web 2024 et nouveaux projets</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Envoyée</span>
                </div>
                
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">245</div>
                    <div className="text-xs text-gray-600">Envoyés</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">68%</div>
                    <div className="text-xs text-gray-600">Taux ouverture</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">12%</div>
                    <div className="text-xs text-gray-600">Taux clic</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">8</div>
                    <div className="text-xs text-gray-600">Conversions</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Envoyée le 10 Jan 2024</span>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-700">Voir rapport</button>
                    <button className="text-gray-600 hover:text-gray-700">Dupliquer</button>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Offre spéciale développement</h3>
                    <p className="text-gray-600 text-sm">Promotion sites web responsive -20%</p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">Programmée</span>
                </div>
                
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">280</div>
                    <div className="text-xs text-gray-600">À envoyer</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">-</div>
                    <div className="text-xs text-gray-600">Taux ouverture</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">-</div>
                    <div className="text-xs text-gray-600">Taux clic</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">-</div>
                    <div className="text-xs text-gray-600">Conversions</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Programmée pour le 20 Jan 2024</span>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-700">Modifier</button>
                    <button className="text-red-600 hover:text-red-700">Annuler</button>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Newsletter Décembre 2023</h3>
                    <p className="text-gray-600 text-sm">Bilan année et projets 2024</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Envoyée</span>
                </div>
                
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">220</div>
                    <div className="text-xs text-gray-600">Envoyés</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">72%</div>
                    <div className="text-xs text-gray-600">Taux ouverture</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">15%</div>
                    <div className="text-xs text-gray-600">Taux clic</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">12</div>
                    <div className="text-xs text-gray-600">Conversions</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Envoyée le 15 Déc 2023</span>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-700">Voir rapport</button>
                    <button className="text-gray-600 hover:text-gray-700">Dupliquer</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistiques et listes */}
          <div className="space-y-8">
            {/* Performance globale */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Performance</h2>
              </div>
              
              <div className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">285</div>
                  <div className="text-sm text-gray-600">Abonnés actifs</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">70%</div>
                  <div className="text-sm text-gray-600">Taux ouverture moyen</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">13.5%</div>
                  <div className="text-sm text-gray-600">Taux clic moyen</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600">2.8%</div>
                  <div className="text-sm text-gray-600">Taux désabonnement</div>
                </div>
              </div>
            </div>

            {/* Listes d'abonnés */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Listes d'abonnés</h2>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div>
                    <div className="font-medium text-blue-900 text-sm">Clients actuels</div>
                    <div className="text-blue-700 text-xs">Clients ayant des projets actifs</div>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">45</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-medium text-green-900 text-sm">Prospects qualifiés</div>
                    <div className="text-green-700 text-xs">Leads intéressés par nos services</div>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">128</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <div>
                    <div className="font-medium text-purple-900 text-sm">Newsletter générale</div>
                    <div className="text-purple-700 text-xs">Tous les abonnés actifs</div>
                  </div>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-medium">285</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <div>
                    <div className="font-medium text-orange-900 text-sm">Partenaires</div>
                    <div className="text-orange-700 text-xs">Réseau professionnel</div>
                  </div>
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-medium">32</span>
                </div>
              </div>
            </div>

            {/* Actions rapides */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Actions rapides</h2>
              </div>
              
              <div className="space-y-3">
                <button className="w-full p-3 bg-blue-50 text-blue-700 rounded-lg text-left hover:bg-blue-100 transition-colors">
                  <div className="font-medium">Créer campagne</div>
                  <div className="text-sm text-blue-600">Nouvelle newsletter</div>
                </button>
                
                <button className="w-full p-3 bg-green-50 text-green-700 rounded-lg text-left hover:bg-green-100 transition-colors">
                  <div className="font-medium">Importer contacts</div>
                  <div className="text-sm text-green-600">Ajouter des abonnés</div>
                </button>
                
                <button className="w-full p-3 bg-purple-50 text-purple-700 rounded-lg text-left hover:bg-purple-100 transition-colors">
                  <div className="font-medium">Templates</div>
                  <div className="text-sm text-purple-600">Gérer les modèles</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Fonction pour rendre le contenu de la page Analyse SEO
  const renderAnalyseSEOContent = () => {
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
                  src="/src/assets/ChatGPT Image 1 juil. 2025, 04_23_49.png" 
                  alt="Beezia Mascot" 
                  className="w-16 h-16 object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Analyse SEO</h1>
                <p className="text-blue-100 text-lg">Optimisez votre référencement naturel</p>
              </div>
            </div>
            
            {/* Zone droite avec bouton d'action */}
            <div className="flex items-center space-x-4">
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200 font-semibold">
                Nouvelle analyse
              </button>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Score SEO global */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Search className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Score SEO</h2>
            </div>
            
            <div className="text-center mb-6">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeDasharray="85, 100"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-green-600">85</span>
                </div>
              </div>
              <p className="text-gray-600">Score global excellent</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Technique</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-green-600">90</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Contenu</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-yellow-600">75</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Popularité</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-blue-600">88</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Expérience</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-green-600">92</span>
                </div>
              </div>
            </div>
          </div>

          {/* Problèmes détectés */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <HelpCircle className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Problèmes détectés</h2>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="font-medium text-red-900 text-sm">Critique</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Images sans attribut alt</h3>
                <p className="text-gray-600 text-xs">12 images manquent de texte alternatif</p>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="font-medium text-yellow-900 text-sm">Important</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Meta descriptions manquantes</h3>
                <p className="text-gray-600 text-xs">3 pages sans meta description</p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="font-medium text-blue-900 text-sm">Amélioration</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Vitesse de chargement</h3>
                <p className="text-gray-600 text-xs">Optimiser les images pour mobile</p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-green-900 text-sm">Bon</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Structure des titres</h3>
                <p className="text-gray-600 text-xs">Hiérarchie H1-H6 respectée</p>
              </div>
            </div>
          </div>

          {/* Mots-clés positionnés */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Key className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Positions</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900 text-sm">développement web suisse</div>
                  <div className="text-gray-600 text-xs">charlygaillard.ch</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">#3</div>
                  <div className="text-xs text-green-600">↑2</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900 text-sm">site web responsive</div>
                  <div className="text-gray-600 text-xs">charlygaillard.ch/services</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">#7</div>
                  <div className="text-xs text-blue-600">↑1</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900 text-sm">développeur freelance</div>
                  <div className="text-gray-600 text-xs">charlygaillard.ch/about</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-yellow-600">#12</div>
                  <div className="text-xs text-red-600">↓3</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900 text-sm">création site internet</div>
                  <div className="text-gray-600 text-xs">charlygaillard.ch/portfolio</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">#15</div>
                  <div className="text-xs text-gray-600">→</div>
                </div>
              </div>
            </div>
          </div>

          {/* Analyse technique */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Settings className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Analyse technique</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Performance</h3>
                
                <div className="p-4 bg-green-50 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 text-sm">Vitesse desktop</span>
                    <span className="font-bold text-green-600">92/100</span>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 text-sm">Vitesse mobile</span>
                    <span className="font-bold text-yellow-600">78/100</span>
                  </div>
                  <div className="w-full bg-yellow-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 text-sm">Accessibilité</span>
                    <span className="font-bold text-blue-600">95/100</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Structure</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Pages indexées</span>
                    <span className="font-medium text-gray-900">24/25</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Erreurs 404</span>
                    <span className="font-medium text-red-600">2</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Redirections</span>
                    <span className="font-medium text-yellow-600">5</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Sitemap XML</span>
                    <span className="font-medium text-green-600">✓ Présent</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Robots.txt</span>
                    <span className="font-medium text-green-600">✓ Configuré</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">HTTPS</span>
                    <span className="font-medium text-green-600">✓ Actif</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommandations */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Star className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Recommandations</h2>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-xl">
                <h3 className="font-semibold text-blue-900 text-sm mb-2">Priorité haute</h3>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Ajouter attributs alt aux images</li>
                  <li>• Compléter meta descriptions</li>
                  <li>• Optimiser images mobile</li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-50 rounded-xl">
                <h3 className="font-semibold text-green-900 text-sm mb-2">Contenu</h3>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Créer du contenu sur "SEO local"</li>
                  <li>• Développer section FAQ</li>
                  <li>• Ajouter témoignages clients</li>
                </ul>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-xl">
                <h3 className="font-semibold text-purple-900 text-sm mb-2">Liens</h3>
                <ul className="text-purple-700 text-sm space-y-1">
                  <li>• Obtenir liens de qualité</li>
                  <li>• Optimiser maillage interne</li>
                  <li>• Créer page ressources</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Fonction pour rendre le contenu de la page Google Analytics
  const renderGoogleAnalyticsContent = () => {
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
                  src="/src/assets/ChatGPT Image 1 juil. 2025, 04_23_49.png" 
                  alt="Beezia Mascot" 
                  className="w-16 h-16 object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Google Analytics</h1>
                <p className="text-blue-100 text-lg">Analysez le trafic de votre site web</p>
              </div>
            </div>
            
            {/* Zone droite avec bouton d'action */}
            <div className="flex items-center space-x-4">
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200 font-semibold">
                Rapport détaillé
              </button>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Métriques principales */}
          <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Utilisateurs</h3>
                  <p className="text-2xl font-bold text-gray-900">2,847</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-600 text-sm font-medium">+12.5%</span>
                <span className="text-gray-500 text-sm">vs mois dernier</span>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Sessions</h3>
                  <p className="text-2xl font-bold text-gray-900">4,256</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-600 text-sm font-medium">+8.3%</span>
                <span className="text-gray-500 text-sm">vs mois dernier</span>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Durée moyenne</h3>
                  <p className="text-2xl font-bold text-gray-900">3:42</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-600 text-sm font-medium">+15.2%</span>
                <span className="text-gray-500 text-sm">vs mois dernier</span>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Taux de rebond</h3>
                  <p className="text-2xl font-bold text-gray-900">42.8%</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-red-600 text-sm font-medium">-5.1%</span>
                <span className="text-gray-500 text-sm">vs mois dernier</span>
              </div>
            </div>
          </div>

          {/* Graphique de trafic */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Évolution du trafic</h2>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">30 jours</button>
                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">7 jours</button>
              </div>
            </div>
            
            <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center mb-6">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Graphique de trafic interactif</p>
                <p className="text-gray-500 text-sm">Données des 30 derniers jours</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-lg font-bold text-blue-600">156</div>
                <div className="text-sm text-gray-600">Pic journalier</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-lg font-bold text-green-600">89</div>
                <div className="text-sm text-gray-600">Moyenne/jour</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="text-lg font-bold text-purple-600">23</div>
                <div className="text-sm text-gray-600">Minimum/jour</div>
              </div>
            </div>
          </div>

          {/* Sources de trafic */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Globe className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Sources</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-medium text-blue-900 text-sm">Recherche organique</div>
                  <div className="text-blue-700 text-xs">Google, Bing, etc.</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">58%</div>
                  <div className="text-xs text-blue-600">2,468 sessions</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <div className="font-medium text-green-900 text-sm">Trafic direct</div>
                  <div className="text-green-700 text-xs">Accès direct au site</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">28%</div>
                  <div className="text-xs text-green-600">1,192 sessions</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <div>
                  <div className="font-medium text-purple-900 text-sm">Réseaux sociaux</div>
                  <div className="text-purple-700 text-xs">LinkedIn, Instagram</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">8%</div>
                  <div className="text-xs text-purple-600">341 sessions</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <div>
                  <div className="font-medium text-orange-900 text-sm">Référents</div>
                  <div className="text-orange-700 text-xs">Autres sites web</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-orange-600">6%</div>
                  <div className="text-xs text-orange-600">255 sessions</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pages populaires */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Pages populaires</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm">/</h3>
                  <p className="text-gray-600 text-xs">Page d'accueil</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">1,245</div>
                  <div className="text-xs text-gray-600">vues</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm">/services</h3>
                  <p className="text-gray-600 text-xs">Services proposés</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">892</div>
                  <div className="text-xs text-gray-600">vues</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm">/portfolio</h3>
                  <p className="text-gray-600 text-xs">Réalisations</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-purple-600">567</div>
                  <div className="text-xs text-gray-600">vues</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm">/blog</h3>
                  <p className="text-gray-600 text-xs">Articles de blog</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-orange-600">423</div>
                  <div className="text-xs text-gray-600">vues</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm">/contact</h3>
                  <p className="text-gray-600 text-xs">Page de contact</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-red-600">298</div>
                  <div className="text-xs text-gray-600">vues</div>
                </div>
              </div>
            </div>
          </div>

          {/* Données démographiques */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <MapPin className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Audience</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Pays</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 text-sm">🇨🇭 Suisse</span>
                    <span className="font-medium text-gray-900">78%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 text-sm">🇫🇷 France</span>
                    <span className="font-medium text-gray-900">12%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 text-sm">🇧🇪 Belgique</span>
                    <span className="font-medium text-gray-900">5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 text-sm">🇨🇦 Canada</span>
                    <span className="font-medium text-gray-900">3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 text-sm">Autres</span>
                    <span className="font-medium text-gray-900">2%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Appareils</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 text-sm">💻 Desktop</span>
                    <span className="font-medium text-gray-900">52%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 text-sm">📱 Mobile</span>
                    <span className="font-medium text-gray-900">38%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 text-sm">📟 Tablette</span>
                    <span className="font-medium text-gray-900">10%</span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-4 mt-6">Navigateurs</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 text-sm">Chrome</span>
                    <span className="font-medium text-gray-900">68%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 text-sm">Safari</span>
                    <span className="font-medium text-gray-900">18%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 text-sm">Firefox</span>
                    <span className="font-medium text-gray-900">9%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 text-sm">Edge</span>
                    <span className="font-medium text-gray-900">5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Fonction pour rendre le contenu de la page Plan de site
  const renderPlanDeSiteContent = () => {
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
                  src="/src/assets/ChatGPT Image 1 juil. 2025, 04_23_49.png" 
                  alt="Beezia Mascot" 
                  className="w-16 h-16 object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Plan de site</h1>
                <p className="text-blue-100 text-lg">Architecture et structure de votre site web</p>
              </div>
            </div>
            
            {/* Zone droite avec bouton d'action */}
            <div className="flex items-center space-x-4">
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200 font-semibold">
                Générer sitemap
              </button>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Structure hiérarchique */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Sitemap className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Structure du site</h2>
            </div>
            
            <div className="space-y-6">
              {/* Niveau 1 - Accueil */}
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Home className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Accueil</h3>
                    <p className="text-gray-600 text-sm">charlygaillard.ch/</p>
                  </div>
                  <div className="ml-auto flex space-x-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Indexée</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">H1 ✓</span>
                  </div>
                </div>
                
                {/* Sous-pages niveau 2 */}
                <div className="ml-8 space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                      <Building2 className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">Services</h4>
                      <p className="text-gray-600 text-xs">/services</p>
                    </div>
                    <div className="flex space-x-1">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Indexée</span>
                    </div>
                  </div>
                  
                  <div className="ml-8 space-y-2">
                    <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                      <div className="w-4 h-4 bg-purple-400 rounded"></div>
                      <span className="text-sm text-gray-700">Développement web</span>
                      <span className="text-xs text-gray-500">/services/developpement-web</span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                      <div className="w-4 h-4 bg-purple-400 rounded"></div>
                      <span className="text-sm text-gray-700">Sites responsive</span>
                      <span className="text-xs text-gray-500">/services/sites-responsive</span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                      <div className="w-4 h-4 bg-purple-400 rounded"></div>
                      <span className="text-sm text-gray-700">E-commerce</span>
                      <span className="text-xs text-gray-500">/services/e-commerce</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-purple-500 rounded flex items-center justify-center">
                      <Star className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">Portfolio</h4>
                      <p className="text-gray-600 text-xs">/portfolio</p>
                    </div>
                    <div className="flex space-x-1">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Indexée</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                      <FileText className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">Blog</h4>
                      <p className="text-gray-600 text-xs">/blog</p>
                    </div>
                    <div className="flex space-x-1">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Indexée</span>
                    </div>
                  </div>
                  
                  <div className="ml-8 space-y-2">
                    <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                      <div className="w-4 h-4 bg-orange-400 rounded"></div>
                      <span className="text-sm text-gray-700">Tendances web 2024</span>
                      <span className="text-xs text-gray-500">/blog/tendances-web-2024</span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                      <div className="w-4 h-4 bg-orange-400 rounded"></div>
                      <span className="text-sm text-gray-700">Guide SEO</span>
                      <span className="text-xs text-gray-500">/blog/guide-seo-2024</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">À propos</h4>
                      <p className="text-gray-600 text-xs">/about</p>
                    </div>
                    <div className="flex space-x-1">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Indexée</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-gray-500 rounded flex items-center justify-center">
                      <Mail className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">Contact</h4>
                      <p className="text-gray-600 text-xs">/contact</p>
                    </div>
                    <div className="flex space-x-1">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Indexée</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistiques et informations */}
          <div className="space-y-8">
            {/* Statistiques du site */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Statistiques</h2>
              </div>
              
              <div className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">25</div>
                  <div className="text-sm text-gray-600">Pages totales</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">24</div>
                  <div className="text-sm text-gray-600">Pages indexées</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600">4</div>
                  <div className="text-sm text-gray-600">Niveaux max</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">96%</div>
                  <div className="text-sm text-gray-600">Taux indexation</div>
                </div>
              </div>
            </div>

            {/* Problèmes détectés */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Problèmes</h2>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="font-medium text-red-900 text-sm">Page orpheline</div>
                  <div className="text-red-700 text-xs">/old-services non liée</div>
                </div>
                
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="font-medium text-yellow-900 text-sm">Profondeur élevée</div>
                  <div className="text-yellow-700 text-xs">3 pages à +4 clics</div>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="font-medium text-green-900 text-sm">Structure claire</div>
                  <div className="text-green-700 text-xs">Navigation optimisée</div>
                </div>
              </div>
            </div>

            {/* Actions recommandées */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Actions</h2>
              </div>
              
              <div className="space-y-3">
                <button className="w-full p-3 bg-blue-50 text-blue-700 rounded-lg text-left hover:bg-blue-100 transition-colors">
                  <div className="font-medium">Générer sitemap XML</div>
                  <div className="text-sm text-blue-600">Pour les moteurs</div>
                </button>
                
                <button className="w-full p-3 bg-green-50 text-green-700 rounded-lg text-left hover:bg-green-100 transition-colors">
                  <div className="font-medium">Optimiser maillage</div>
                  <div className="text-sm text-green-600">Liens internes</div>
                </button>
                
                <button className="w-full p-3 bg-purple-50 text-purple-700 rounded-lg text-left hover:bg-purple-100 transition-colors">
                  <div className="font-medium">Audit structure</div>
                  <div className="text-sm text-purple-600">Analyse complète</div>
                </button>
              </div>
            </div>

            {/* Fichiers techniques */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Settings className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Fichiers</h2>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm">sitemap.xml</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">✓ Présent</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm">robots.txt</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">✓ Configuré</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm">.htaccess</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">✓ Optimisé</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm">404.html</span>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">À améliorer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Fonction pour rendre le contenu de la page Mots-clés
  const renderMotsClesContent = () => {
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
                  src="/src/assets/ChatGPT Image 1 juil. 2025, 04_23_49.png" 
                  alt="Beezia Mascot" 
                  className="w-16 h-16 object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Mots-clés</h1>
                <p className="text-blue-100 text-lg">Stratégie et suivi de vos mots-clés SEO</p>
              </div>
            </div>
            
            {/* Zone droite avec bouton d'action */}
            <div className="flex items-center space-x-4">
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200 font-semibold">
                Rechercher mots-clés
              </button>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mots-clés principaux */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Key className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Mots-clés suivis</h2>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">Tous</button>
                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">Top 10</button>
                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">Opportunités</button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-6 gap-4 p-3 bg-gray-50 rounded-lg text-sm font-medium text-gray-600">
                <div className="col-span-2">Mot-clé</div>
                <div>Position</div>
                <div>Volume</div>
                <div>Difficulté</div>
                <div>Évolution</div>
              </div>
              
              <div className="grid grid-cols-6 gap-4 p-4 border border-gray-200 rounded-lg items-center">
                <div className="col-span-2">
                  <div className="font-medium text-gray-900">développement web suisse</div>
                  <div className="text-gray-600 text-sm">charlygaillard.ch</div>
                </div>
                <div className="text-center">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded font-bold">#3</span>
                </div>
                <div className="text-center text-gray-900 font-medium">1,200</div>
                <div className="text-center">
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">Moyen</span>
                </div>
                <div className="text-center">
                  <span className="text-green-600 font-medium">↑2</span>
                </div>
              </div>
              
              <div className="grid grid-cols-6 gap-4 p-4 border border-gray-200 rounded-lg items-center">
                <div className="col-span-2">
                  <div className="font-medium text-gray-900">site web responsive</div>
                  <div className="text-gray-600 text-sm">charlygaillard.ch/services</div>
                </div>
                <div className="text-center">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-bold">#7</span>
                </div>
                <div className="text-center text-gray-900 font-medium">890</div>
                <div className="text-center">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Facile</span>
                </div>
                <div className="text-center">
                  <span className="text-green-600 font-medium">↑1</span>
                </div>
              </div>
              
              <div className="grid grid-cols-6 gap-4 p-4 border border-gray-200 rounded-lg items-center">
                <div className="col-span-2">
                  <div className="font-medium text-gray-900">développeur freelance lausanne</div>
                  <div className="text-gray-600 text-sm">charlygaillard.ch/about</div>
                </div>
                <div className="text-center">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-bold">#12</span>
                </div>
                <div className="text-center text-gray-900 font-medium">650</div>
                <div className="text-center">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Facile</span>
                </div>
                <div className="text-center">
                  <span className="text-red-600 font-medium">↓3</span>
                </div>
              </div>
              
              <div className="grid grid-cols-6 gap-4 p-4 border border-gray-200 rounded-lg items-center">
                <div className="col-span-2">
                  <div className="font-medium text-gray-900">création site internet</div>
                  <div className="text-gray-600 text-sm">charlygaillard.ch/portfolio</div>
                </div>
                <div className="text-center">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-bold">#15</span>
                </div>
                <div className="text-center text-gray-900 font-medium">2,100</div>
                <div className="text-center">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">Difficile</span>
                </div>
                <div className="text-center">
                  <span className="text-gray-600 font-medium">→</span>
                </div>
              </div>
              
              <div className="grid grid-cols-6 gap-4 p-4 border border-gray-200 rounded-lg items-center">
                <div className="col-span-2">
                  <div className="font-medium text-gray-900">agence web suisse romande</div>
                  <div className="text-gray-600 text-sm">charlygaillard.ch</div>
                </div>
                <div className="text-center">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded font-bold">#28</span>
                </div>
                <div className="text-center text-gray-900 font-medium">480</div>
                <div className="text-center">
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">Moyen</span>
                </div>
                <div className="text-center">
                  <span className="text-green-600 font-medium">↑5</span>
                </div>
              </div>
              
              <div className="grid grid-cols-6 gap-4 p-4 border border-gray-200 rounded-lg items-center">
                <div className="col-span-2">
                  <div className="font-medium text-gray-900">optimisation seo</div>
                  <div className="text-gray-600 text-sm">charlygaillard.ch/blog</div>
                </div>
                <div className="text-center">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-bold">#9</span>
                </div>
                <div className="text-center text-gray-900 font-medium">1,800</div>
                <div className="text-center">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">Difficile</span>
                </div>
                <div className="text-center">
                  <span className="text-green-600 font-medium">↑4</span>
                </div>
              </div>
            </div>
          </div>

          {/* Statistiques et opportunités */}
          <div className="space-y-8">
            {/* Performance globale */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Performance</h2>
              </div>
              
              <div className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">42</div>
                  <div className="text-sm text-gray-600">Mots-clés suivis</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">8</div>
                  <div className="text-sm text-gray-600">Top 10</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">18</div>
                  <div className="text-sm text-gray-600">Top 20</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600">+15%</div>
                  <div className="text-sm text-gray-600">Progression</div>
                </div>
              </div>
            </div>

            {/* Opportunités */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Opportunités</h2>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="font-medium text-green-900 text-sm">site web mobile</div>
                  <div className="text-green-700 text-xs">Vol: 1,200 • Diff: Facile • Pos: #23</div>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="font-medium text-blue-900 text-sm">développeur react</div>
                  <div className="text-blue-700 text-xs">Vol: 800 • Diff: Moyen • Pos: #18</div>
                </div>
                
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="font-medium text-purple-900 text-sm">freelance web design</div>
                  <div className="text-purple-700 text-xs">Vol: 950 • Diff: Facile • Pos: #25</div>
                </div>
                
                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="font-medium text-orange-900 text-sm">consultant seo</div>
                  <div className="text-orange-700 text-xs">Vol: 600 • Diff: Moyen • Pos: #19</div>
                </div>
              </div>
            </div>

            {/* Recherche de mots-clés */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Search className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Recherche</h2>
              </div>
              
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Nouveau mot-clé..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Analyser
                </button>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 text-sm mb-3">Suggestions</h3>
                <div className="space-y-2">
                  <div className="text-sm text-gray-700 p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
                    développement application web
                  </div>
                  <div className="text-sm text-gray-700 p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
                    création boutique en ligne
                  </div>
                  <div className="text-sm text-gray-700 p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
                    maintenance site web
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Fonction pour rendre le contenu de la page Texte SEO
  const renderTexteSEOContent = () => {
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
                  src="/src/assets/ChatGPT Image 1 juil. 2025, 04_23_49.png" 
                  alt="Beezia Mascot" 
                  className="w-16 h-16 object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Texte SEO</h1>
                <p className="text-blue-100 text-lg">Optimisez vos contenus pour le référencement</p>
              </div>
            </div>
            
            {/* Zone droite avec bouton d'action */}
            <div className="flex items-center space-x-4">
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200 font-semibold">
                Analyser texte
              </button>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Analyse de contenu */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Type className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Analyse de contenu</h2>
            </div>
            
            <div className="space-y-6">
              {/* Éditeur de texte */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contenu à analyser
                </label>
                <textarea
                  className="w-full h-48 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Collez votre contenu ici pour l'analyser..."
                  defaultValue="Charly Gaillard est un développeur web freelance spécialisé dans la création de sites web responsives et modernes. Basé en Suisse, il propose des services de développement web sur mesure pour les entreprises de toutes tailles. Ses compétences incluent le développement frontend et backend, l'optimisation SEO, et la création d'applications web performantes."
                />
              </div>
              
              {/* Mot-clé cible */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot-clé principal
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="développement web suisse"
                  defaultValue="développement web suisse"
                />
              </div>
              
              {/* Résultats d'analyse */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-green-900">Densité mots-clés</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">2.8%</div>
                  <div className="text-green-700 text-sm">Optimal (2-4%)</div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-medium text-blue-900">Lisibilité</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">78</div>
                  <div className="text-blue-700 text-sm">Bon niveau</div>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="font-medium text-purple-900">Longueur</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">89</div>
                  <div className="text-purple-700 text-sm">mots</div>
                </div>
              </div>
              
              {/* Suggestions d'amélioration */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggestions d'amélioration</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-xl">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-900">Mot-clé principal bien utilisé</h4>
                      <p className="text-green-700 text-sm">Le mot-clé "développement web" apparaît naturellement dans le texte</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-xl">
                    <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-white text-xs">!</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-yellow-900">Ajouter des mots-clés secondaires</h4>
                      <p className="text-yellow-700 text-sm">Intégrez "site web responsive", "SEO" et "applications web"</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-white text-xs">i</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-900">Développer le contenu</h4>
                      <p className="text-blue-700 text-sm">Ajoutez 150-200 mots pour un meilleur référencement</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-xl">
                    <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-white text-xs">+</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-purple-900">Structure avec des sous-titres</h4>
                      <p className="text-purple-700 text-sm">Utilisez H2 et H3 pour organiser le contenu</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Outils et métriques */}
          <div className="space-y-8">
            {/* Score SEO */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Search className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Score SEO</h2>
              </div>
              
              <div className="text-center mb-6">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="2"
                      strokeDasharray="72, 100"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-yellow-600">72</span>
                  </div>
                </div>
                <p className="text-gray-600">Score à améliorer</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Mots-clés</span>
                  <span className="font-medium text-green-600">85/100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Lisibilité</span>
                  <span className="font-medium text-blue-600">78/100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Structure</span>
                  <span className="font-medium text-yellow-600">65/100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Longueur</span>
                  <span className="font-medium text-red-600">45/100</span>
                </div>
              </div>
            </div>

            {/* Mots-clés détectés */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Key className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Mots-clés détectés</h2>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <span className="text-gray-700 text-sm">développement web</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">3x</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span className="text-gray-700 text-sm">sites web</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">2x</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                  <span className="text-gray-700 text-sm">suisse</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">1x</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                  <span className="text-gray-700 text-sm">freelance</span>
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">1x</span>
                </div>
              </div>
            </div>

            {/* Outils d'optimisation */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Settings className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Outils</h2>
              </div>
              
              <div className="space-y-3">
                <button className="w-full p-3 bg-blue-50 text-blue-700 rounded-lg text-left hover:bg-blue-100 transition-colors">
                  <div className="font-medium">Générateur de titres</div>
                  <div className="text-sm text-blue-600">Créer des titres optimisés</div>
                </button>
                
                <button className="w-full p-3 bg-green-50 text-green-700 rounded-lg text-left hover:bg-green-100 transition-colors">
                  <div className="font-medium">Suggestions de mots-clés</div>
                  <div className="text-sm text-green-600">Trouver des variantes</div>
                </button>
                
                <button className="w-full p-3 bg-purple-50 text-purple-700 rounded-lg text-left hover:bg-purple-100 transition-colors">
                  <div className="font-medium">Vérificateur de plagiat</div>
                  <div className="text-sm text-purple-600">Contenu unique</div>
                </button>
                
                <button className="w-full p-3 bg-orange-50 text-orange-700 rounded-lg text-left hover:bg-orange-100 transition-colors">
                  <div className="font-medium">Analyse concurrence</div>
                  <div className="text-sm text-orange-600">Comparer les contenus</div>
                </button>
              </div>
            </div>

            {/* Métriques de lisibilité */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Lisibilité</h2>
              </div>
              
              <div className="space-y-4">
                <div className="text-center p-3 bg-blue-50 rounded-xl">
                  <div className="text-lg font-bold text-blue-600">12.5</div>
                  <div className="text-sm text-gray-600">Mots/phrase</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-xl">
                  <div className="text-lg font-bold text-green-600">4.2</div>
                  <div className="text-sm text-gray-600">Syllabes/mot</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-xl">
                  <div className="text-lg font-bold text-purple-600">78</div>
                  <div className="text-sm text-gray-600">Score Flesch</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Fonction pour rendre le contenu de la page WordPress
  const renderWordPressContent = () => {
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
                  src="/src/assets/ChatGPT Image 1 juil. 2025, 04_23_49.png" 
                  alt="Beezia Mascot" 
                  className="w-16 h-16 object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">WordPress</h1>
                <p className="text-blue-100 text-lg">Gérez votre site WordPress</p>
              </div>
            </div>
            
            {/* Zone droite avec bouton d'action */}
            <div className="flex items-center space-x-4">
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200 font-semibold">
                Accéder à l'admin
              </button>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informations du site */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Settings className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Informations du site</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Version WordPress</label>
                  <div className="bg-gray-50 p-4 rounded-xl border">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 font-semibold">6.4.2</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">À jour</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Thème actif</label>
                  <div className="bg-gray-50 p-4 rounded-xl border">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 font-semibold">Astra Pro</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">v4.6.8</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">PHP Version</label>
                  <div className="bg-gray-50 p-4 rounded-xl border">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 font-semibold">8.2.15</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Recommandée</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Base de données</label>
                  <div className="bg-gray-50 p-4 rounded-xl border">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 font-semibold">MySQL 8.0</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Optimale</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Espace utilisé</label>
                  <div className="bg-gray-50 p-4 rounded-xl border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-900 font-semibold">2.8 GB</span>
                      <span className="text-gray-600 text-sm">/ 10 GB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '28%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Dernière sauvegarde</label>
                  <div className="bg-gray-50 p-4 rounded-xl border">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 font-semibold">Hier 03:00</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Automatique</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">SSL/HTTPS</label>
                  <div className="bg-gray-50 p-4 rounded-xl border">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 font-semibold">Let's Encrypt</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Actif</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Cache</label>
                  <div className="bg-gray-50 p-4 rounded-xl border">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 font-semibold">WP Rocket</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Activé</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="space-y-8">
            {/* Maintenance */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Settings className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Maintenance</h2>
              </div>
              
              <div className="space-y-3">
                <button className="w-full p-3 bg-blue-50 text-blue-700 rounded-lg text-left hover:bg-blue-100 transition-colors">
                  <div className="font-medium">Mettre à jour WordPress</div>
                  <div className="text-sm text-blue-600">Version 6.4.3 disponible</div>
                </button>
                
                <button className="w-full p-3 bg-green-50 text-green-700 rounded-lg text-left hover:bg-green-100 transition-colors">
                  <div className="font-medium">Sauvegarder maintenant</div>
                  <div className="text-sm text-green-600">Sauvegarde manuelle</div>
                </button>
                
                <button className="w-full p-3 bg-purple-50 text-purple-700 rounded-lg text-left hover:bg-purple-100 transition-colors">
                  <div className="font-medium">Optimiser la base</div>
                  <div className="text-sm text-purple-600">Nettoyer et optimiser</div>
                </button>
                
                <button className="w-full p-3 bg-orange-50 text-orange-700 rounded-lg text-left hover:bg-orange-100 transition-colors">
                  <div className="font-medium">Vider le cache</div>
                  <div className="text-sm text-orange-600">Actualiser le cache</div>
                </button>
              </div>
            </div>

            {/* Plugins actifs */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Plugins</h2>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <span className="text-gray-700 text-sm">Yoast SEO</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Actif</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <span className="text-gray-700 text-sm">WP Rocket</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Actif</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <span className="text-gray-700 text-sm">Elementor Pro</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Actif</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                  <span className="text-gray-700 text-sm">Contact Form 7</span>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">MAJ dispo</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <span className="text-gray-700 text-sm">UpdraftPlus</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Actif</span>
                </div>
              </div>
            </div>

            {/* Sécurité */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Key className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Sécurité</h2>
              </div>
              
              <div className="space-y-4">
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">98%</div>
                  <div className="text-sm text-gray-600">Score sécurité</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Firewall</span>
                    <span className="text-green-600 font-medium">✓ Actif</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Anti-malware</span>
                    <span className="text-green-600 font-medium">✓ Actif</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">2FA Admin</span>
                    <span className="text-green-600 font-medium">✓ Activé</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Dernière analyse</span>
                    <span className="text-gray-600 font-medium">Aujourd'hui</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance et statistiques */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Performance et statistiques</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">1.2s</div>
                <div className="text-gray-600">Temps de chargement</div>
                <div className="text-green-600 text-sm mt-1">Excellent</div>
              </div>
              
              <div className="text-center p-6 bg-green-50 rounded-xl">
                <div className="text-3xl font-bold text-green-600 mb-2">95</div>
                <div className="text-gray-600">Score PageSpeed</div>
                <div className="text-green-600 text-sm mt-1">Très bon</div>
              </div>
              
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <div className="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
                <div className="text-gray-600">Uptime</div>
                <div className="text-green-600 text-sm mt-1">30 derniers jours</div>
              </div>
              
              <div className="text-center p-6 bg-orange-50 rounded-xl">
                <div className="text-3xl font-bold text-orange-600 mb-2">156</div>
                <div className="text-gray-600">Visiteurs/jour</div>
                <div className="text-green-600 text-sm mt-1">+12% ce mois</div>
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Articles récents</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900 text-sm">Tendances web 2024</div>
                      <div className="text-gray-600 text-xs">Publié il y a 2 jours</div>
                    </div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Publié</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900 text-sm">Guide SEO complet</div>
                      <div className="text-gray-600 text-xs">Brouillon</div>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Brouillon</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900 text-sm">Portfolio 2024</div>
                      <div className="text-gray-600 text-xs">Programmé pour demain</div>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Programmé</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Commentaires récents</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium text-gray-900 text-sm">Marie Dubois</div>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Approuvé</span>
                    </div>
                    <p className="text-gray-600 text-xs">"Excellent article sur les tendances web !"</p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium text-gray-900 text-sm">Jean Martin</div>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">En attente</span>
                    </div>
                    <p className="text-gray-600 text-xs">"Pouvez-vous développer la partie SEO ?"</p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium text-gray-900 text-sm">Sophie Laurent</div>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Approuvé</span>
                    </div>
                    <p className="text-gray-600 text-xs">"Merci pour ces conseils pratiques !"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Fonction pour rendre le contenu de la page Domaine & Hébergement
  const renderDomaineHebergementContent = () => {
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
                  src="/src/assets/ChatGPT Image 1 juil. 2025, 04_23_49.png" 
                  alt="Beezia Mascot" 
                  className="w-16 h-16 object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Domaine & Hébergement</h1>
                <p className="text-blue-100 text-lg">Gérez votre infrastructure web</p>
              </div>
            </div>
            
            {/* Zone droite avec bouton d'action */}
            <div className="flex items-center space-x-4">
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200 font-semibold">
                Renouveler
              </button>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informations du domaine */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Globe className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Informations du domaine</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Nom de domaine</label>
                  <div className="bg-gray-50 p-4 rounded-xl border">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 font-semibold">charlygaillard.ch</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Actif</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Registrar</label>
                  <div className="bg-gray-50 p-4 rounded-xl border">
                    <span className="text-gray-900 font-semibold">Switch.ch</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Date d'enregistrement</label>
                  <div className="bg-gray-50 p-4 rounded-xl border">
                    <span className="text-gray-900 font-semibold">15 mars 2020</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Date d'expiration</label>
                  <div className="bg-gray-50 p-4 rounded-xl border">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 font-semibold">15 mars 2025</span>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Dans 2 mois</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Serveurs DNS</label>
                  <div className="bg-gray-50 p-4 rounded-xl border space-y-2">
                    <div className="text-gray-900 font-medium text-sm">ns1.hostpoint.ch</div>
                    <div className="text-gray-900 font-medium text-sm">ns2.hostpoint.ch</div>
                    <div className="text-gray-900 font-medium text-sm">ns3.hostpoint.ch</div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Protection WHOIS</label>
                  <div className="bg-gray-50 p-4 rounded-xl border">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 font-semibold">Activée</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Protégé</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Auto-renouvellement</label>
                  <div className="bg-gray-50 p-4 rounded-xl border">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 font-semibold">Activé</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Automatique</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions et alertes */}
          <div className="space-y-8">
            {/* Alertes importantes */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Bell className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Alertes</h2>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="font-medium text-yellow-900 text-sm">Renouvellement proche</div>
                  <div className="text-yellow-700 text-xs">Domaine expire dans 2 mois</div>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="font-medium text-green-900 text-sm">SSL valide</div>
                  <div className="text-green-700 text-xs">Certificat valide jusqu'en 2025</div>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="font-medium text-blue-900 text-sm">DNS configuré</div>
                  <div className="text-blue-700 text-xs">Propagation terminée</div>
                </div>
              </div>
            </div>

            {/* Actions rapides */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Settings className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Actions</h2>
              </div>
              
              <div className="space-y-3">
                <button className="w-full p-3 bg-blue-50 text-blue-700 rounded-lg text-left hover:bg-blue-100 transition-colors">
                  <div className="font-medium">Renouveler domaine</div>
                  <div className="text-sm text-blue-600">Prolonger de 1 an</div>
                </button>
                
                <button className="w-full p-3 bg-green-50 text-green-700 rounded-lg text-left hover:bg-green-100 transition-colors">
                  <div className="font-medium">Gérer DNS</div>
                  <div className="text-sm text-green-600">Modifier les enregistrements</div>
                </button>
                
                <button className="w-full p-3 bg-purple-50 text-purple-700 rounded-lg text-left hover:bg-purple-100 transition-colors">
                  <div className="font-medium">Transférer domaine</div>
                  <div className="text-sm text-purple-600">Changer de registrar</div>
                </button>
                
                <button className="w-full p-3 bg-orange-50 text-orange-700 rounded-lg text-left hover:bg-orange-100 transition-colors">
                  <div className="font-medium">Configurer email</div>
                  <div className="text-sm text-orange-600">Adresses professionnelles</div>
                </button>
              </div>
            </div>

            {/* Coûts */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Coûts</h2>
              </div>
              
              <div className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">CHF 25</div>
                  <div className="text-sm text-gray-600">Domaine/an</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">CHF 180</div>
                  <div className="text-sm text-gray-600">Hébergement/an</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">CHF 0</div>
                  <div className="text-sm text-gray-600">SSL/an</div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total annuel</span>
                  <span className="text-xl font-bold text-blue-600">CHF 205</span>
                </div>
              </div>
            </div>
          </div>

          {/* Informations d'hébergement */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Building2 className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Hébergement</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Serveur</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Hébergeur</label>
                  <div className="bg-gray-50 p-3 rounded-xl border">
                    <span className="text-gray-900 font-medium">Hostpoint</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Plan</label>
                  <div className="bg-gray-50 p-3 rounded-xl border">
                    <span className="text-gray-900 font-medium">Business SSD</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Localisation</label>
                  <div className="bg-gray-50 p-3 rounded-xl border">
                    <span className="text-gray-900 font-medium">Suisse (Zurich)</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">IP</label>
                  <div className="bg-gray-50 p-3 rounded-xl border">
                    <span className="text-gray-900 font-medium">185.117.8.45</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Ressources</h3>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 text-sm">Espace disque</span>
                    <span className="text-gray-900 font-medium">2.8 GB / 50 GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '5.6%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 text-sm">Bande passante</span>
                    <span className="text-gray-900 font-medium">45 GB / 500 GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '9%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 text-sm">Bases de données</span>
                    <span className="text-gray-900 font-medium">1 / 10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 text-sm">Emails</span>
                    <span className="text-gray-900 font-medium">3 / 100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '3%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Performance</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-xl font-bold text-green-600">99.9%</div>
                    <div className="text-sm text-gray-600">Uptime</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-xl font-bold text-blue-600">1.2s</div>
                    <div className="text-sm text-gray-600">Temps réponse</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <div className="text-xl font-bold text-purple-600">95</div>
                    <div className="text-sm text-gray-600">Score PageSpeed</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-xl">
                    <div className="text-xl font-bold text-orange-600">A+</div>
                    <div className="text-sm text-gray-600">SSL Rating</div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Sauvegardes</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Dernière sauvegarde</span>
                      <span className="text-gray-900">Hier 03:00</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Fréquence</span>
                      <span className="text-gray-900">Quotidienne</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Rétention</span>
                      <span className="text-gray-900">30 jours</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Fonction pour rendre le contenu de la page Paramétrage
  const renderParametrageContent = () => {
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
                  src="/src/assets/ChatGPT Image 1 juil. 2025, 04_23_49.png" 
                  alt="Beezia Mascot" 
                  className="w-16 h-16 object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Paramétrage</h1>
                <p className="text-blue-100 text-lg">Configurez votre compte et vos préférences</p>
              </div>
            </div>
            
            {/* Zone droite avec bouton d'action */}
            <div className="flex items-center space-x-4">
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200 font-semibold">
                Sauvegarder
              </button>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profil utilisateur */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <User className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Profil utilisateur</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    defaultValue="Charly Gaillard"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    defaultValue="contact@charlygaillard.ch"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                  <input
                    type="tel"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    defaultValue="+41 79 123 45 67"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Entreprise</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    defaultValue="Charly Gaillard - Développeur Web"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                    defaultValue="Rue de la Paix 15&#10;1000 Lausanne&#10;Suisse"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site web</label>
                  <input
                    type="url"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    defaultValue="https://charlygaillard.ch"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fuseau horaire</label>
                  <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Europe/Zurich (UTC+1)</option>
                    <option>Europe/Paris (UTC+1)</option>
                    <option>Europe/London (UTC+0)</option>
                    <option>America/New_York (UTC-5)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Langue</label>
                  <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Français</option>
                    <option>English</option>
                    <option>Deutsch</option>
                    <option>Italiano</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Photo de profil et actions */}
          <div className="space-y-8">
            {/* Photo de profil */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <User className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Photo de profil</h2>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">CG</span>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors mb-2">
                  Changer la photo
                </button>
                <button className="w-full bg-gray-100 text-gray-600 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                  Supprimer
                </button>
              </div>
            </div>

            {/* Sécurité */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Key className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Sécurité</h2>
              </div>
              
              <div className="space-y-3">
                <button className="w-full p-3 bg-blue-50 text-blue-700 rounded-lg text-left hover:bg-blue-100 transition-colors">
                  <div className="font-medium">Changer le mot de passe</div>
                  <div className="text-sm text-blue-600">Dernière modification: il y a 3 mois</div>
                </button>
                
                <button className="w-full p-3 bg-green-50 text-green-700 rounded-lg text-left hover:bg-green-100 transition-colors">
                  <div className="font-medium">Authentification 2FA</div>
                  <div className="text-sm text-green-600">Activée</div>
                </button>
                
                <button className="w-full p-3 bg-purple-50 text-purple-700 rounded-lg text-left hover:bg-purple-100 transition-colors">
                  <div className="font-medium">Sessions actives</div>
                  <div className="text-sm text-purple-600">2 appareils connectés</div>
                </button>
              </div>
            </div>

            {/* Statistiques du compte */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Compte</h2>
              </div>
              
              <div className="space-y-4">
                <div className="text-center p-3 bg-blue-50 rounded-xl">
                  <div className="text-lg font-bold text-blue-600">Pro</div>
                  <div className="text-sm text-gray-600">Plan actuel</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-xl">
                  <div className="text-lg font-bold text-green-600">4 ans</div>
                  <div className="text-sm text-gray-600">Membre depuis</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-xl">
                  <div className="text-lg font-bold text-purple-600">98%</div>
                  <div className="text-sm text-gray-600">Profil complété</div>
                </div>
              </div>
            </div>
          </div>

          {/* Préférences et notifications */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Settings className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Préférences et notifications</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Notifications email</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="font-medium text-gray-900">Rapports hebdomadaires</div>
                      <div className="text-gray-600 text-sm">Résumé des performances SEO</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="font-medium text-gray-900">Alertes de sécurité</div>
                      <div className="text-gray-600 text-sm">Connexions suspectes et problèmes</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="font-medium text-gray-900">Nouvelles fonctionnalités</div>
                      <div className="text-gray-600 text-sm">Mises à jour et nouveautés</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="font-medium text-gray-900">Newsletter marketing</div>
                      <div className="text-gray-600 text-sm">Conseils et bonnes pratiques</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Préférences d'affichage</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Thème</label>
                    <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Clair</option>
                      <option>Sombre</option>
                      <option>Automatique</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Format de date</label>
                    <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>DD/MM/YYYY</option>
                      <option>MM/DD/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Devise</label>
                    <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>CHF (Franc suisse)</option>
                      <option>EUR (Euro)</option>
                      <option>USD (Dollar américain)</option>
                      <option>GBP (Livre sterling)</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="font-medium text-gray-900">Animations</div>
                      <div className="text-gray-600 text-sm">Effets visuels et transitions</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="font-medium text-gray-900">Sons</div>
                      <div className="text-gray-600 text-sm">Notifications sonores</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-900">Zone de danger</h3>
                  <p className="text-gray-600 text-sm">Actions irréversibles sur votre compte</p>
                </div>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">
                    Supprimer le compte
                  </button>
                  <button className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-200 transition-colors">
                    Exporter les données
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Fonction pour rendre le contenu de la page Aide
  const renderAideContent = () => {
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
                  src="/src/assets/ChatGPT Image 1 juil. 2025, 04_23_49.png" 
                  alt="Beezia Mascot" 
                  className="w-16 h-16 object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Centre d'aide</h1>
                <p className="text-blue-100 text-lg">Trouvez des réponses à vos questions</p>
              </div>
            </div>
            
            {/* Zone droite avec bouton d'action */}
            <div className="flex items-center space-x-4">
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200 font-semibold">
                Contacter le support
              </button>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recherche et FAQ */}
          <div className="lg:col-span-2 space-y-8">
            {/* Barre de recherche */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <Search className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Rechercher dans l'aide</h2>
              </div>
              
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tapez votre question ici..."
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm text-gray-600">Recherches populaires:</span>
                <button className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
                  Comment optimiser mon SEO ?
                </button>
                <button className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
                  Configurer Google Analytics
                </button>
                <button className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
                  Créer une campagne
                </button>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <HelpCircle className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Questions fréquentes</h2>
              </div>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-xl">
                  <button className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-gray-900">Comment améliorer mon score SEO ?</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                  <div className="px-4 pb-4 text-gray-600 text-sm">
                    Pour améliorer votre score SEO, concentrez-vous sur l'optimisation de vos mots-clés, la vitesse de chargement, 
                    la structure de votre site et la qualité de votre contenu. Utilisez notre outil d'analyse SEO pour identifier 
                    les points d'amélioration spécifiques.
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-xl">
                  <button className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-gray-900">Comment configurer Google Analytics ?</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                
                <div className="border border-gray-200 rounded-xl">
                  <button className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-gray-900">Que signifient les métriques dans le dashboard ?</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                
                <div className="border border-gray-200 rounded-xl">
                  <button className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-gray-900">Comment créer une campagne Google Ads efficace ?</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                
                <div className="border border-gray-200 rounded-xl">
                  <button className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-gray-900">Comment optimiser mes campagnes sur les réseaux sociaux ?</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                
                <div className="border border-gray-200 rounded-xl">
                  <button className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-gray-900">Comment interpréter les rapports d'analyse ?</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Support et ressources */}
          <div className="space-y-8">
            {/* Contact support */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Mail className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Support</h2>
              </div>
              
              <div className="space-y-3">
                <button className="w-full p-3 bg-blue-50 text-blue-700 rounded-lg text-left hover:bg-blue-100 transition-colors">
                  <div className="font-medium">Chat en direct</div>
                  <div className="text-sm text-blue-600">Réponse immédiate</div>
                </button>
                
                <button className="w-full p-3 bg-green-50 text-green-700 rounded-lg text-left hover:bg-green-100 transition-colors">
                  <div className="font-medium">Email support</div>
                  <div className="text-sm text-green-600">Réponse sous 24h</div>
                </button>
                
                <button className="w-full p-3 bg-purple-50 text-purple-700 rounded-lg text-left hover:bg-purple-100 transition-colors">
                  <div className="font-medium">Demander une démo</div>
                  <div className="text-sm text-purple-600">Session personnalisée</div>
                </button>
                
                <button className="w-full p-3 bg-orange-50 text-orange-700 rounded-lg text-left hover:bg-orange-100 transition-colors">
                  <div className="font-medium">Signaler un bug</div>
                  <div className="text-sm text-orange-600">Améliorer la plateforme</div>
                </button>
              </div>
            </div>

            {/* Ressources */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Ressources</h2>
              </div>
              
              <div className="space-y-3">
                <a href="#" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="font-medium text-gray-900">Guide de démarrage</div>
                  <div className="text-sm text-gray-600">Premiers pas avec Beezia</div>
                </a>
                
                <a href="#" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="font-medium text-gray-900">Documentation API</div>
                  <div className="text-sm text-gray-600">Intégrations techniques</div>
                </a>
                
                <a href="#" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="font-medium text-gray-900">Tutoriels vidéo</div>
                  <div className="text-sm text-gray-600">Formations pratiques</div>
                </a>
                
                <a href="#" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="font-medium text-gray-900">Blog</div>
                  <div className="text-sm text-gray-600">Conseils et actualités</div>
                </a>
              </div>
            </div>

            {/* Statut du système */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Settings className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Statut système</h2>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm">Plateforme principale</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Opérationnel</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm">API</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Opérationnel</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm">Base de données</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Opérationnel</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm">Monitoring</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Opérationnel</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">99.9%</div>
                  <div className="text-sm text-gray-600">Uptime ce mois</div>
                </div>
              </div>
            </div>

            {/* Informations de contact */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Phone className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Contact</h2>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="font-medium text-gray-900 text-sm">Email</div>
                  <div className="text-gray-600 text-sm">support@beezia.com</div>
                </div>
                
                <div>
                  <div className="font-medium text-gray-900 text-sm">Téléphone</div>
                  <div className="text-gray-600 text-sm">+41 22 123 45 67</div>
                </div>
                
                <div>
                  <div className="font-medium text-gray-900 text-sm">Horaires</div>
                  <div className="text-gray-600 text-sm">Lun-Ven: 9h-18h CET</div>
                </div>
                
                <div>
                  <div className="font-medium text-gray-900 text-sm">Adresse</div>
                  <div className="text-gray-600 text-sm">
                    Rue du Commerce 12<br />
                    1204 Genève, Suisse
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Fonction pour rendre le contenu principal
  const renderMainContent = () => {
    // Si on est sur la page Infos générales
    if (activeTab === 'Infos générales') {
      return renderInfosGeneralesContent();
    }

    // Si on est sur la page Localisation
    if (activeTab === 'Localisation') {
      return renderLocalisationContent();
    }

    // Si on est sur la page Design & Branding
    if (activeTab === 'Design & Branding') {
      return renderDesignBrandingContent();
    }

    // Si on est sur la page Réseaux sociaux
    if (activeTab === 'Réseaux sociaux') {
      return renderReseauxSociauxContent();
    }

    // Si on est sur la page Concurrents
    if (activeTab === 'Concurrents') {
      return renderConcurrentsContent();
    }

    // Si on est sur la page Stratégie
    if (activeTab === 'Stratégie') {
      return renderStrategieContent();
    }

    // Si on est sur la page Plan d'action
    if (activeTab === "Plan d'action") {
      return renderPlanActionContent();
    }

    // Si on est sur la page Calendrier
    if (activeTab === 'Calendrier') {
      return renderCalendrierContent();
    }

    // Si on est sur la page Actualité Site Web
    if (activeTab === 'Actualité Site Web') {
      return renderActualiteSiteWebContent();
    }

    // Si on est sur la page Campagnes Google Ads
    if (activeTab === 'Campagnes Google Ads') {
      return renderCampagnesGoogleAdsContent();
    }

    // Si on est sur la page Campagnes Réseaux Sociaux
    if (activeTab === 'Campagnes Réseaux Sociaux') {
      return renderCampagnesReseauxSociauxContent();
    }

    // Si on est sur la page Campagne Newsletter
    if (activeTab === 'Campagne Newsletter') {
      return renderCampagneNewsletterContent();
    }

    // Si on est sur la page Analyse SEO
    if (activeTab === 'Analyse SEO') {
      return renderAnalyseSEOContent();
    }

    // Si on est sur la page Google Analytics
    if (activeTab === 'Google Analytics') {
      return renderGoogleAnalyticsContent();
    }

    // Si on est sur la page Plan de site
    if (activeTab === 'Plan de site') {
      return renderPlanDeSiteContent();
    }

    // Si on est sur la page Mots-clés
    if (activeTab === 'Mots-clés') {
      return renderMotsClesContent();
    }

    // Si on est sur la page Texte SEO
    if (activeTab === 'Texte SEO') {
      return renderTexteSEOContent();
    }

    // Si on est sur la page WordPress
    if (activeTab === 'WordPress') {
      return renderWordPressContent();
    }

    // Si on est sur la page Domaine & Hébergement
    if (activeTab === 'Domaine & Hébergement') {
      return renderDomaineHebergementContent();
    }

    // Si on est sur la page Paramétrage
    if (activeTab === 'Paramétrage') {
      return renderParametrageContent();
    }

    // Si on est sur la page Aide
    if (activeTab === 'Aide') {
      return renderAideContent();
    }

    const isLetsFight = activeTab === "Let's Fight !";
    const pageTitle = isLetsFight ? "Let's Fight !" : "Dashboard";
    const pageSubtitle = isLetsFight ? "Ready to conquer your goals!" : "Welcome back! Here's what's happening.";
    const buttonText = isLetsFight ? "Let's Fight !" : "Let's Fight !";

    return (
      <div className="p-8">
        {/* Header avec champ URL et bouton Let's Fight ! */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{pageTitle}</h2>
            <p className="text-gray-500 mt-1">{pageSubtitle}</p>
          </div>
          
          {/* Zone droite avec champ URL et bouton */}
          <div className="flex items-center space-x-4">
            {/* Champ URL du site web */}
            <div className="flex flex-col">
              <label htmlFor="website-url" className="text-sm font-medium text-gray-600 mb-1">
                Site web
              </label>
              <input
                id="website-url"
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://www.example.com"
                className="w-80 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 font-medium"
                disabled={isLoading}
              />
            </div>
            
            {/* Bouton Let's Fight ! en jaune abeille */}
            <div className="flex flex-col">
              <div className="h-6"></div> {/* Espacement pour aligner avec le champ */}
              <button 
                onClick={handleLetsFightClick}
                className={`flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-yellow-400/25 hover:shadow-yellow-500/40 font-semibold ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-xl'}`}
                disabled={isLoading}
              >
                <Zap className="w-5 h-5" />
                <span>{isLoading ? 'Fighting...' : buttonText}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Section avec Abeille et Graphiques */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-8 mb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Zone Abeille - Plus grande */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="w-72 h-72 mb-4 relative">
                <img 
                  src="/src/assets/bee-mascot-violet copy.png" 
                  alt="Beezia Mascot" 
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>
              <h3 className="text-white text-3xl font-bold mb-2">Let's Fight !</h3>
              <p className="text-blue-100 text-center text-lg">But always with love !</p>
            </div>

            {/* Zone Graphiques - 4 cercles de progression pour Let's Fight */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-6">
              {isLetsFight ? (
                <>
                  {/* Site Web */}
                  <div className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 flex flex-col items-center justify-center ${currentStep === 'siteWeb' ? 'ring-2 ring-white/50 shadow-2xl' : ''}`}>
                    <h4 className="text-white font-semibold mb-4 text-lg">Site Web</h4>
                    <LargePercentageCircle 
                      percentage={progressSteps.siteWeb} 
                      isActive={currentStep === 'siteWeb'}
                    />
                  </div>
                  
                  {/* Corporate ID */}
                  <div className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 flex flex-col items-center justify-center ${currentStep === 'corporateId' ? 'ring-2 ring-white/50 shadow-2xl' : ''}`}>
                    <h4 className="text-white font-semibold mb-4 text-lg">Corporate ID</h4>
                    <LargePercentageCircle 
                      percentage={progressSteps.corporateId} 
                      isActive={currentStep === 'corporateId'}
                    />
                  </div>
                  
                  {/* Fiche(s) GMB */}
                  <div className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 flex flex-col items-center justify-center ${currentStep === 'ficheGmb' ? 'ring-2 ring-white/50 shadow-2xl' : ''}`}>
                    <h4 className="text-white font-semibold mb-4 text-lg">Fiche(s) GMB</h4>
                    <LargePercentageCircle 
                      percentage={progressSteps.ficheGmb} 
                      isActive={currentStep === 'ficheGmb'}
                    />
                  </div>
                  
                  {/* Avis clients */}
                  <div className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 flex flex-col items-center justify-center ${currentStep === 'avisClients' ? 'ring-2 ring-white/50 shadow-2xl' : ''}`}>
                    <h4 className="text-white font-semibold mb-4 text-lg">Avis clients</h4>
                    <LargePercentageCircle 
                      percentage={progressSteps.avisClients} 
                      isActive={currentStep === 'avisClients'}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <h4 className="text-white font-semibold mb-2 text-sm">Revenue Trend</h4>
                    <MiniChart type="line" />
                    <p className="text-blue-100 text-xs mt-2">+12.5% this month</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <h4 className="text-white font-semibold mb-2 text-sm">Sales Volume</h4>
                    <MiniChart type="bar" />
                    <p className="text-blue-100 text-xs mt-2">+8.3% vs last week</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <h4 className="text-white font-semibold mb-2 text-sm">Growth Rate</h4>
                    <MiniChart type="area" />
                    <p className="text-blue-100 text-xs mt-2">Steady growth</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <h4 className="text-white font-semibold mb-2 text-sm">Completion</h4>
                    <MiniChart type="donut" />
                    <p className="text-blue-100 text-xs mt-2">Target achieved</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {statsCards.map((card, index) => (
            <div 
              key={index}
              className={`${card.color} p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                  <p className="text-gray-500 text-sm mt-1">{card.subtitle}</p>
                </div>
                <span className="text-green-600 text-sm font-semibold bg-green-100 px-2 py-1 rounded-lg">
                  {card.trend}
                </span>
              </div>
              
              {card.hasButton && (
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                  Scale
                </button>
              )}
              
              {card.hasChart && (
                <div className="mt-4 h-24 relative">
                  <svg className="w-full h-full" viewBox="0 0 200 60">
                    <path
                      d="M10,45 Q50,20 90,30 Q130,15 170,25"
                      stroke="#3B82F6"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <circle cx="170" cy="25" r="3" fill="#3B82F6" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-gray-900">New ciur competitite</h3>
            <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              Mohoshiton
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bottomCards.map((card, index) => (
              <div 
                key={index}
                className={`${card.color} p-6 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300`}
              >
                <p className="text-gray-700 font-semibold mb-4">{card.title}</p>
                
                {card.type === 'chart' && (
                  <div className="h-32 flex items-end justify-center space-x-2">
                    {[40, 60, 30, 80, 50, 90, 35, 70].map((height, i) => (
                      <div 
                        key={i}
                        className="bg-blue-600 rounded-t-sm transition-all duration-300 hover:bg-blue-700"
                        style={{ height: `${height}%`, width: '12px' }}
                      />
                    ))}
                  </div>
                )}
                
                {card.type === 'metric' && (
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-700 mb-2">{card.value}</div>
                    <p className="text-gray-500 text-sm">{card.subtitle}</p>
                    <div className="mt-4 w-16 h-16 mx-auto">
                      <div className="w-full h-full rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
                    </div>
                  </div>
                )}
                
                {card.type === 'chart-with-button' && (
                  <div>
                    <div className="h-24 mb-4 flex items-end justify-center space-x-1">
                      {[40, 60, 30, 80, 50, 90, 35, 70].map((height, i) => (
                        <div 
                          key={i}
                          className="bg-blue-600 rounded-t-sm transition-all duration-300 hover:bg-blue-700"
                          style={{ height: `${height}%`, width: '12px' }}
                        />
                      ))}
                    </div>
                    <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-600/25">
                      Dashboard
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-inter">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-gray-200 shadow-sm overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Beezia</h1>
          </div>
          
          <nav className="space-y-6">
            {/* Bouton Let's Fight ! en premier */}
            <div className="mb-4">
              <button
                onClick={() => setActiveTab("Let's Fight !")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                  activeTab === "Let's Fight !"
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/25' 
                    : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                <Zap className={`w-5 h-5 ${activeTab === "Let's Fight !" ? 'text-white' : 'text-gray-400 group-hover:text-red-600'}`} />
                <span className="font-medium">Let's Fight !</span>
                {activeTab === "Let's Fight !" && <ChevronRight className="w-4 h-4 ml-auto" />}
              </button>
            </div>

            {/* Bouton Dashboard */}
            <div className="mb-8">
              <button
                onClick={() => setActiveTab('Dashboard')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                  activeTab === 'Dashboard'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/25' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                }`}
              >
                <Bot className={`w-5 h-5 ${activeTab === 'Dashboard' ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'}`} />
                <span className="font-medium">Dashboard</span>
                {activeTab === 'Dashboard' && <ChevronRight className="w-4 h-4 ml-auto" />}
              </button>
            </div>

            {/* Sections du menu */}
            {menuSections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item, itemIndex) => {
                    const Icon = item.icon;
                    const isActive = item.name === activeTab;
                    const isHighlighted = item.name === 'Localisation' || 
                                        item.name === 'Actualité Site Web' || 
                                        item.name === 'Campagnes Google Ads' || 
                                        item.name === 'Campagnes Réseaux Sociaux' ||
                                        item.name === 'Analyse SEO';
                    
                    return (
                      <button
                        key={itemIndex}
                        onClick={() => setActiveTab(item.name)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                          isActive 
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/25' 
                            : isHighlighted
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${
                          isActive 
                            ? 'text-white' 
                            : isHighlighted
                            ? 'text-blue-600'
                            : 'text-gray-400 group-hover:text-blue-600'
                        }`} />
                        <span className="font-medium text-sm">{item.name}</span>
                        {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            
            {/* Bouton de déconnexion en bas */}
            <div className="pt-6 mt-8 border-t border-gray-200">
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/25">
                <LogOut className="w-5 h-5 text-white" />
                <span className="font-medium text-sm">Déconnexion</span>
              </button>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {/* Top Header Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Date et Heure */}
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="font-medium">{formatDate(currentTime)}</span>
              <span className="font-mono">{formatTime(currentTime)}</span>
            </div>

            {/* Zone centrale avec recherche élargie */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cherchez vos sites web..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Zone droite avec profil */}
            <div className="flex items-center space-x-4">
              {/* Menu déroulant compte Charly Gaillard */}
              <div className="relative">
                <button className="flex items-center space-x-3 bg-gray-50 rounded-lg px-4 py-2 hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">C</span>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-900">Charly Gaillard</div>
                    <div className="text-xs text-gray-500">charlygaillard.ch</div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                  <Mail className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">1</span>
                </button>
              </div>

              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">1</span>
                </button>
              </div>

              {/* Photo de profil */}
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
                <img 
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal dynamique */}
        {renderMainContent()}
      </main>
    </div>
  );
};

export default Dashboard;