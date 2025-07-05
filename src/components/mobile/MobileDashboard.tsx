import React, { useState, useRef, useEffect } from 'react';
import { Zap, TrendingUp, Users, BarChart3, DollarSign, ArrowRight, Star, Target } from 'lucide-react';

interface MobileDashboardProps {
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
}

const MobileDashboard: React.FC<MobileDashboardProps> = ({
  activeTab,
  isLoading,
  websiteUrl,
  setWebsiteUrl,
  handleLetsFightClick,
  progressSteps,
  currentStep
}) => {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollY(containerRef.current.scrollTop);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const isLetsFight = activeTab === "Let's Fight !";

  const quickStats = [
    { label: 'Revenue', value: '$256K', change: '+12%', color: 'from-blue-500 to-blue-600', icon: DollarSign },
    { label: 'Clients', value: '459', change: '+8%', color: 'from-green-500 to-green-600', icon: Users },
    { label: 'Performance', value: '94%', change: '+15%', color: 'from-purple-500 to-purple-600', icon: TrendingUp },
  ];

  const recentActivities = [
    { title: 'Nouveau client ajouté', time: 'Il y a 2h', icon: '👤', color: 'bg-blue-100' },
    { title: 'Analyse SEO terminée', time: 'Il y a 4h', icon: '📊', color: 'bg-green-100' },
    { title: 'Campagne lancée', time: 'Il y a 6h', icon: '🚀', color: 'bg-purple-100' },
  ];

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 via-white to-blue-50"
      style={{ height: 'calc(100vh - 140px)' }}
    >
      {/* Hero Section avec parallax */}
      <div 
        className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 px-6 py-8"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-24 -translate-x-24" />
        </div>

        <div className="relative z-10">
          {/* Greeting */}
          <div className="mb-6">
            <h1 className="text-white text-2xl font-bold mb-2">
              {isLetsFight ? "Let's Fight ! 🥊" : "Bonjour Charly ! 👋"}
            </h1>
            <p className="text-blue-100 text-sm">
              {isLetsFight ? "Prêt à conquérir vos objectifs !" : "Voici votre tableau de bord aujourd'hui"}
            </p>
          </div>

          {/* URL Input + Fight Button */}
          <div className="space-y-4 mb-6">
            <div className="relative">
              <input
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://votre-site.com"
                className="w-full px-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-blue-200 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                disabled={isLoading}
              />
            </div>
            
            <button
              onClick={handleLetsFightClick}
              disabled={isLoading}
              className={`
                w-full flex items-center justify-center space-x-3 py-4 rounded-2xl font-bold text-black
                bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600
                shadow-xl shadow-yellow-400/30 transform transition-all duration-300
                ${isLoading 
                  ? 'opacity-75 cursor-not-allowed animate-pulse' 
                  : 'hover:scale-105 active:scale-95 hover:shadow-2xl'
                }
              `}
            >
              <Zap className={`w-6 h-6 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="text-lg">
                {isLoading ? 'Fighting...' : "Let's Fight !"}
              </span>
            </button>
          </div>

          {/* Progress Circles pour Let's Fight */}
          {isLetsFight && (
            <div className="grid grid-cols-2 gap-4">
              {[
                { key: 'siteWeb', label: 'Site Web', progress: progressSteps.siteWeb },
                { key: 'corporateId', label: 'Corporate ID', progress: progressSteps.corporateId },
                { key: 'ficheGmb', label: 'Fiche GMB', progress: progressSteps.ficheGmb },
                { key: 'avisClients', label: 'Avis Clients', progress: progressSteps.avisClients },
              ].map((item) => (
                <div 
                  key={item.key}
                  className={`
                    bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20
                    transition-all duration-500 transform
                    ${currentStep === item.key ? 'scale-105 bg-white/20 ring-2 ring-white/50' : 'hover:scale-105'}
                  `}
                >
                  <div className="text-center">
                    <div className="relative w-16 h-16 mx-auto mb-2">
                      <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="rgba(255,255,255,0.2)"
                          strokeWidth="2"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeDasharray={`${item.progress}, 100`}
                          className="transition-all duration-300"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {Math.round(item.progress)}%
                        </span>
                      </div>
                    </div>
                    <p className="text-white text-xs font-medium">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-6 py-6 -mt-4 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Aperçu rapide</h2>
          <div className="grid grid-cols-3 gap-4">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className="text-center group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`
                    w-12 h-12 mx-auto mb-2 rounded-2xl bg-gradient-to-br ${stat.color} 
                    flex items-center justify-center shadow-lg transform transition-all duration-300
                    group-hover:scale-110 group-active:scale-95
                  `}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                  <p className="text-xs text-green-600 font-medium">{stat.change}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="px-6 pb-6">
        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Activités récentes</h2>
            <button className="text-blue-600 text-sm font-medium flex items-center space-x-1 hover:text-blue-700 transition-colors">
              <span>Voir tout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div 
                key={index}
                className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-10 h-10 rounded-2xl ${activity.color} flex items-center justify-center`}>
                  <span className="text-lg">{activity.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 pb-8">
        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Actions rapides</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { title: 'Analyse SEO', icon: '🔍', color: 'from-blue-500 to-blue-600' },
              { title: 'Nouveau Client', icon: '👤', color: 'from-green-500 to-green-600' },
              { title: 'Campagne', icon: '📢', color: 'from-purple-500 to-purple-600' },
              { title: 'Rapport', icon: '📊', color: 'from-orange-500 to-orange-600' },
            ].map((action, index) => (
              <button
                key={index}
                className={`
                  p-4 rounded-2xl bg-gradient-to-br ${action.color} text-white
                  shadow-lg transform transition-all duration-300
                  hover:scale-105 active:scale-95 hover:shadow-xl
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-2xl mb-2">{action.icon}</div>
                <p className="text-sm font-medium">{action.title}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDashboard;