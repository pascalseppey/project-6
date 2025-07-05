import React from 'react';
import { Zap, TrendingUp, Users, BarChart3, DollarSign } from 'lucide-react';
import MiniChart from '../charts/MiniChart';
import LargePercentageCircle from '../charts/LargePercentageCircle';

interface DashboardPageProps {
  activeTab: string;
  isLoading: boolean;
  websiteUrl: string;
  setWebsiteUrl: (url: string) => void;
  handleLetsFightClick: () => void;
  progressSteps: {
    siteWeb: number;
    corporateId: number;
    ficheGmb: number;
    avisClients: number;
  };
  currentStep: string;
  setProgressSteps: (steps: any) => void;
  setCurrentStep: (step: string) => void;
  setIsLoading: (loading: boolean) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  activeTab,
  isLoading,
  websiteUrl,
  setWebsiteUrl,
  handleLetsFightClick,
  progressSteps,
  currentStep
}) => {
  const isLetsFight = activeTab === "Let's Fight !";
  const pageTitle = isLetsFight ? "Let's Fight !" : "Dashboard";
  const pageSubtitle = isLetsFight ? "Ready to conquer your goals!" : "Welcome back! Here's what's happening.";
  const buttonText = isLetsFight ? "Let's Fight !" : "Let's Fight !";

  const statsCards = [
    {
      title: 'Revenue Total',
      value: '$256K',
      subtitle: 'Ce mois',
      trend: '+12.5%',
      color: 'bg-gradient-to-br from-blue-50 to-blue-100',
      icon: DollarSign,
      iconColor: 'text-blue-600'
    },
    {
      title: 'Nouveaux Clients',
      value: '459',
      subtitle: 'Cette semaine',
      trend: '+8.2%',
      color: 'bg-gradient-to-br from-green-50 to-green-100',
      icon: Users,
      iconColor: 'text-green-600',
      hasButton: true
    },
    {
      title: 'Performance',
      value: '549%',
      subtitle: 'Croissance',
      trend: '+15.3%',
      color: 'bg-gradient-to-br from-purple-50 to-purple-100',
      icon: TrendingUp,
      iconColor: 'text-purple-600',
      hasChart: true
    }
  ];

  const bottomCards = [
    {
      title: 'Analyse Tendances',
      type: 'chart',
      color: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
      icon: BarChart3
    },
    {
      title: 'Engagement Global',
      value: '8994',
      subtitle: 'Interactions',
      type: 'metric',
      color: 'bg-gradient-to-br from-cyan-50 to-cyan-100',
      icon: Users
    },
    {
      title: 'Performance Globale',
      type: 'chart-with-button',
      color: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
      icon: TrendingUp
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Header responsive */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            {pageTitle}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">{pageSubtitle}</p>
        </div>
        
        {/* Zone droite avec champ URL et bouton - Responsive */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Champ URL du site web */}
          <div className="flex flex-col min-w-0 flex-1 sm:max-w-xs lg:max-w-sm">
            <label htmlFor="website-url" className="text-sm font-medium text-gray-600 mb-2">
              Site web à analyser
            </label>
            <input
              id="website-url"
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://www.example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 font-medium transition-all duration-300 bg-white/80 backdrop-blur-sm"
              disabled={isLoading}
            />
          </div>
          
          {/* Bouton Let's Fight ! */}
          <button 
            onClick={handleLetsFightClick}
            className={`
              flex items-center justify-center space-x-2 px-6 py-3 rounded-2xl font-bold text-black
              bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600
              hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700
              shadow-xl shadow-yellow-400/30 hover:shadow-yellow-500/40
              transform transition-all duration-300 hover:scale-105
              ${isLoading ? 'opacity-75 cursor-not-allowed animate-pulse' : 'hover:shadow-2xl'}
              min-w-max
            `}
            disabled={isLoading}
          >
            <Zap className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="whitespace-nowrap">{isLoading ? 'Fighting...' : buttonText}</span>
          </button>
        </div>
      </div>

      {/* Hero Section responsive avec Abeille et Graphiques */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-6 sm:p-8 lg:p-12">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-48 translate-x-48" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-32 -translate-x-32" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Zone Abeille - Responsive */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center lg:text-left">
            <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 mb-6 relative group">
              <img 
                src="/bee-mascot-violet.png" 
                alt="Beezia Mascot" 
                className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 animate-pulse">
              Let's Fight !
            </h3>
            <p className="text-blue-100 text-base sm:text-lg lg:text-xl font-medium">
              But always with love !
            </p>
          </div>

          {/* Zone Graphiques - Responsive */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {isLetsFight ? (
              <>
                {/* Site Web */}
                <div className={`
                  bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 
                  flex flex-col items-center justify-center transition-all duration-500 transform hover:scale-105
                  ${currentStep === 'siteWeb' ? 'ring-2 ring-white/50 shadow-2xl scale-105 bg-white/20' : ''}
                `}>
                  <h4 className="text-white font-semibold mb-4 text-sm sm:text-base lg:text-lg text-center">
                    Site Web
                  </h4>
                  <LargePercentageCircle 
                    percentage={progressSteps.siteWeb} 
                    isActive={currentStep === 'siteWeb'}
                  />
                </div>
                
                {/* Corporate ID */}
                <div className={`
                  bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 
                  flex flex-col items-center justify-center transition-all duration-500 transform hover:scale-105
                  ${currentStep === 'corporateId' ? 'ring-2 ring-white/50 shadow-2xl scale-105 bg-white/20' : ''}
                `}>
                  <h4 className="text-white font-semibold mb-4 text-sm sm:text-base lg:text-lg text-center">
                    Corporate ID
                  </h4>
                  <LargePercentageCircle 
                    percentage={progressSteps.corporateId} 
                    isActive={currentStep === 'corporateId'}
                  />
                </div>
                
                {/* Fiche(s) GMB */}
                <div className={`
                  bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 
                  flex flex-col items-center justify-center transition-all duration-500 transform hover:scale-105
                  ${currentStep === 'ficheGmb' ? 'ring-2 ring-white/50 shadow-2xl scale-105 bg-white/20' : ''}
                `}>
                  <h4 className="text-white font-semibold mb-4 text-sm sm:text-base lg:text-lg text-center">
                    Fiche(s) GMB
                  </h4>
                  <LargePercentageCircle 
                    percentage={progressSteps.ficheGmb} 
                    isActive={currentStep === 'ficheGmb'}
                  />
                </div>
                
                {/* Avis clients */}
                <div className={`
                  bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 
                  flex flex-col items-center justify-center transition-all duration-500 transform hover:scale-105
                  ${currentStep === 'avisClients' ? 'ring-2 ring-white/50 shadow-2xl scale-105 bg-white/20' : ''}
                `}>
                  <h4 className="text-white font-semibold mb-4 text-sm sm:text-base lg:text-lg text-center">
                    Avis clients
                  </h4>
                  <LargePercentageCircle 
                    percentage={progressSteps.avisClients} 
                    isActive={currentStep === 'avisClients'}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <h4 className="text-white font-semibold mb-2 text-xs sm:text-sm">Revenue Trend</h4>
                  <MiniChart type="line" />
                  <p className="text-blue-100 text-xs mt-2">+12.5% this month</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <h4 className="text-white font-semibold mb-2 text-xs sm:text-sm">Sales Volume</h4>
                  <MiniChart type="bar" />
                  <p className="text-blue-100 text-xs mt-2">+8.3% vs last week</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <h4 className="text-white font-semibold mb-2 text-xs sm:text-sm">Growth Rate</h4>
                  <MiniChart type="area" />
                  <p className="text-blue-100 text-xs mt-2">Steady growth</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <h4 className="text-white font-semibold mb-2 text-xs sm:text-sm">Completion</h4>
                  <MiniChart type="donut" />
                  <p className="text-blue-100 text-xs mt-2">Target achieved</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div 
              key={index}
              className={`
                ${card.color} p-6 rounded-3xl border border-gray-200/50 shadow-lg hover:shadow-2xl 
                transition-all duration-500 transform hover:scale-105 hover:-translate-y-2
                backdrop-blur-sm group relative overflow-hidden
              `}
            >
              {/* Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Icon className={`w-5 h-5 ${card.iconColor}`} />
                      <p className="text-gray-600 text-sm font-medium">{card.title}</p>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">{card.value}</p>
                    <p className="text-gray-500 text-sm">{card.subtitle}</p>
                  </div>
                  <span className="text-green-600 text-sm font-bold bg-green-100 px-3 py-1 rounded-full shadow-sm">
                    {card.trend}
                  </span>
                </div>
                
                {card.hasButton && (
                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-2xl text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Voir détails
                  </button>
                )}
                
                {card.hasChart && (
                  <div className="mt-4 h-20 sm:h-24 relative">
                    <svg className="w-full h-full" viewBox="0 0 200 60">
                      <defs>
                        <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M10,45 Q50,20 90,30 Q130,15 170,25 L170,50 L10,50 Z"
                        fill={`url(#gradient-${index})`}
                      />
                      <path
                        d="M10,45 Q50,20 90,30 Q130,15 170,25"
                        stroke="#8B5CF6"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <circle cx="170" cy="25" r="4" fill="#8B5CF6" className="animate-pulse" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Section - Responsive */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Analyses Avancées
          </h3>
          <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors text-sm sm:text-base hover:underline">
            Voir tout →
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {bottomCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div 
                key={index}
                className={`
                  ${card.color} p-6 rounded-3xl border border-gray-200/50 shadow-lg hover:shadow-2xl 
                  transition-all duration-500 transform hover:scale-105 hover:-translate-y-2
                  backdrop-blur-sm group relative overflow-hidden
                `}
              >
                {/* Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-2 mb-4">
                    <Icon className="w-5 h-5 text-gray-600" />
                    <p className="text-gray-700 font-semibold text-sm sm:text-base">{card.title}</p>
                  </div>
                  
                  {card.type === 'chart' && (
                    <div className="h-24 sm:h-32 flex items-end justify-center space-x-1 sm:space-x-2">
                      {[40, 60, 30, 80, 50, 90, 35, 70].map((height, i) => (
                        <div 
                          key={i}
                          className="bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg transition-all duration-500 hover:from-indigo-700 hover:to-indigo-500 transform hover:scale-110"
                          style={{ height: `${height}%`, width: '8px' }}
                        />
                      ))}
                    </div>
                  )}
                  
                  {card.type === 'metric' && (
                    <div className="text-center space-y-4">
                      <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-cyan-700 bg-clip-text text-transparent">
                        {card.value}
                      </div>
                      <p className="text-gray-500 text-sm">{card.subtitle}</p>
                      <div className="w-16 h-16 mx-auto relative">
                        <div className="w-full h-full rounded-full border-4 border-cyan-200 border-t-cyan-600 animate-spin"></div>
                        <div className="absolute inset-2 rounded-full bg-gradient-to-r from-cyan-100 to-cyan-200"></div>
                      </div>
                    </div>
                  )}
                  
                  {card.type === 'chart-with-button' && (
                    <div className="space-y-4">
                      <div className="h-20 sm:h-24 flex items-end justify-center space-x-1">
                        {[40, 60, 30, 80, 50, 90, 35, 70].map((height, i) => (
                          <div 
                            key={i}
                            className="bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg transition-all duration-300 hover:from-emerald-700 hover:to-emerald-500"
                            style={{ height: `${height}%`, width: '10px' }}
                          />
                        ))}
                      </div>
                      <button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 rounded-2xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
                        Analyser
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;