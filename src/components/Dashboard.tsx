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
                  src="/bee-mascot-strong.png" 
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

  // Fonction pour rendre le contenu principal
  const renderMainContent = () => {
    // Si on est sur la page Infos générales
    if (activeTab === 'Infos générales') {
      return renderInfosGeneralesContent();
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
                  src="/bee-mascot-strong.png" 
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
                    
                    return (
                      <button
                        key={itemIndex}
                        onClick={() => setActiveTab(item.name)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                          isActive 
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/25' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${
                          isActive 
                            ? 'text-white' 
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