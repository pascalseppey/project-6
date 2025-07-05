import React from 'react';
import { Zap } from 'lucide-react';
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
            <div className="h-6"></div>
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
                src="/bee-mascot-violet.png" 
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

export default DashboardPage;