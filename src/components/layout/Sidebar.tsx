import React from 'react';
import { Home, MapPin, Palette, Share2, Users, MessageSquare, CheckSquare, Calendar, Globe, Megaphone, FileText, Search, BarChart3, Sigma as Sitemap, Key, Type, Settings, HelpCircle, LogOut, Bot, ChevronRight, Zap } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
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

  return (
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
  );
};

export default Sidebar;