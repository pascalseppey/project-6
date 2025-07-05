import React, { useState, useEffect } from 'react';
import { Home, MapPin, Palette, Share2, Users, MessageSquare, CheckSquare, Calendar, Globe, Megaphone, FileText, Search, BarChart3, Sigma as Sitemap, Type, Settings, HelpCircle, LogOut, Bot, ChevronRight, Zap, Menu, X } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Détecter la taille d'écran pour auto-collapse
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
        setIsMobileOpen(false);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuSections = [
    {
      title: 'À PROPOS',
      items: [
        { name: 'Infos générales', icon: Home, active: false, color: 'from-blue-500 to-blue-600' },
        { name: 'Localisation', icon: MapPin, active: false, color: 'from-green-500 to-green-600' },
        { name: 'Design & Branding', icon: Palette, active: false, color: 'from-purple-500 to-purple-600' },
        { name: 'Réseaux sociaux', icon: Share2, active: false, color: 'from-pink-500 to-pink-600' },
        { name: 'Concurrents', icon: Users, active: false, color: 'from-orange-500 to-orange-600' },
      ]
    },
    {
      title: 'COMMUNICATION',
      items: [
        { name: 'Stratégie', icon: MessageSquare, active: false, color: 'from-indigo-500 to-indigo-600' },
        { name: "Plan d'action", icon: CheckSquare, active: false, color: 'from-teal-500 to-teal-600' },
        { name: 'Calendrier', icon: Calendar, active: false, color: 'from-cyan-500 to-cyan-600' },
      ]
    },
    {
      title: 'CAMPAGNES',
      items: [
        { name: 'Actualité Site Web', icon: Globe, active: false, color: 'from-emerald-500 to-emerald-600' },
        { name: 'Campagnes Google Ads', icon: Megaphone, active: false, color: 'from-red-500 to-red-600' },
        { name: 'Campagnes Réseaux Sociaux', icon: Share2, active: false, color: 'from-rose-500 to-rose-600' },
        { name: 'Campagne Newsletter', icon: FileText, active: false, color: 'from-violet-500 to-violet-600' },
      ]
    },
    {
      title: 'SITE WEB',
      items: [
        { name: 'Analyse SEO', icon: Search, active: false, color: 'from-amber-500 to-amber-600' },
        { name: 'Google Analytics', icon: BarChart3, active: false, color: 'from-lime-500 to-lime-600' },
        { name: 'Plan de site', icon: Sitemap, active: false, color: 'from-sky-500 to-sky-600' },
        { name: 'Texte SEO', icon: Type, active: false, color: 'from-slate-500 to-slate-600' },
        { name: 'WordPress', icon: Settings, active: false, color: 'from-gray-500 to-gray-600' },
        { name: 'Domaine & Hébergement', icon: Globe, active: false, color: 'from-stone-500 to-stone-600' },
      ]
    },
    {
      title: 'PERSONNEL',
      items: [
        { name: 'Paramétrage', icon: Settings, active: false, color: 'from-neutral-500 to-neutral-600' },
        { name: 'Aide', icon: HelpCircle, active: false, color: 'from-zinc-500 to-zinc-600' },
      ]
    }
  ];

  const handleItemClick = (itemName: string) => {
    setActiveTab(itemName);
    if (window.innerWidth < 1024) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:relative inset-y-0 left-0 z-40 
        ${isCollapsed ? 'w-20' : 'w-80'} 
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        bg-white/95 backdrop-blur-xl border-r border-gray-200/50 shadow-2xl
        transition-all duration-500 ease-in-out
        flex flex-col
      `}>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200/50">
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-3 transition-all duration-300 ${isCollapsed ? 'justify-center' : ''}`}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              {!isCollapsed && (
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Beezia
                </h1>
              )}
            </div>
            
            {/* Desktop Collapse Button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {/* Bouton Let's Fight ! */}
          <div className="mb-6">
            <button
              onClick={() => handleItemClick("Let's Fight !")}
              onMouseEnter={() => setHoveredItem("Let's Fight !")}
              onMouseLeave={() => setHoveredItem(null)}
              className={`
                w-full group relative overflow-hidden rounded-2xl transition-all duration-500 transform
                ${activeTab === "Let's Fight !" 
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-2xl shadow-red-500/30 scale-105' 
                  : 'bg-gradient-to-r from-red-50 to-red-100 text-red-600 hover:from-red-500 hover:to-red-600 hover:text-white hover:shadow-xl hover:shadow-red-500/20 hover:scale-105'
                }
                ${isCollapsed ? 'p-3' : 'p-4'}
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className={`relative flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
                <Zap className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} transition-all duration-300 ${hoveredItem === "Let's Fight !" ? 'animate-pulse' : ''}`} />
                {!isCollapsed && (
                  <>
                    <span className="font-bold text-lg">Let's Fight !</span>
                    {activeTab === "Let's Fight !" && (
                      <ChevronRight className="w-5 h-5 ml-auto animate-pulse" />
                    )}
                  </>
                )}
              </div>

              {/* Tooltip pour mode collapsed */}
              {isCollapsed && hoveredItem === "Let's Fight !" && (
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap z-50 shadow-xl">
                  Let's Fight !
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
                </div>
              )}
            </button>
          </div>

          {/* Bouton Dashboard */}
          <div className="mb-8">
            <button
              onClick={() => handleItemClick('Dashboard')}
              onMouseEnter={() => setHoveredItem('Dashboard')}
              onMouseLeave={() => setHoveredItem(null)}
              className={`
                w-full group relative overflow-hidden rounded-2xl transition-all duration-500 transform
                ${activeTab === 'Dashboard'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-2xl shadow-blue-500/30 scale-105' 
                  : 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 hover:from-blue-500 hover:to-blue-600 hover:text-white hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105'
                }
                ${isCollapsed ? 'p-3' : 'p-4'}
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className={`relative flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
                <Bot className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} transition-all duration-300`} />
                {!isCollapsed && (
                  <>
                    <span className="font-bold">Dashboard</span>
                    {activeTab === 'Dashboard' && (
                      <ChevronRight className="w-5 h-5 ml-auto animate-pulse" />
                    )}
                  </>
                )}
              </div>

              {/* Tooltip pour mode collapsed */}
              {isCollapsed && hoveredItem === 'Dashboard' && (
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap z-50 shadow-xl">
                  Dashboard
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
                </div>
              )}
            </button>
          </div>

          {/* Sections du menu */}
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-2">
              {!isCollapsed && (
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">
                  {section.title}
                </h3>
              )}
              
              <div className="space-y-1">
                {section.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  const isActive = item.name === activeTab;
                  
                  return (
                    <button
                      key={itemIndex}
                      onClick={() => handleItemClick(item.name)}
                      onMouseEnter={() => setHoveredItem(item.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`
                        w-full group relative overflow-hidden rounded-xl transition-all duration-300 transform
                        ${isActive 
                          ? `bg-gradient-to-r ${item.color} text-white shadow-lg scale-105` 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:scale-105'
                        }
                        ${isCollapsed ? 'p-3' : 'p-3'}
                      `}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className={`relative flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
                        <Icon className={`${isCollapsed ? 'w-5 h-5' : 'w-4 h-4'} transition-all duration-300 ${hoveredItem === item.name ? 'scale-110' : ''}`} />
                        {!isCollapsed && (
                          <>
                            <span className="font-medium text-sm truncate">{item.name}</span>
                            {isActive && (
                              <ChevronRight className="w-4 h-4 ml-auto animate-pulse" />
                            )}
                          </>
                        )}
                      </div>

                      {/* Tooltip pour mode collapsed */}
                      {isCollapsed && hoveredItem === item.name && (
                        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap z-50 shadow-xl">
                          {item.name}
                          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        
        {/* Footer */}
        <div className="p-4 border-t border-gray-200/50">
          <button 
            onClick={() => handleItemClick('Déconnexion')}
            onMouseEnter={() => setHoveredItem('Déconnexion')}
            onMouseLeave={() => setHoveredItem(null)}
            className={`
              w-full group relative overflow-hidden rounded-xl transition-all duration-300 transform
              bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 
              hover:from-red-500 hover:to-red-600 hover:text-white hover:shadow-lg hover:scale-105
              ${isCollapsed ? 'p-3' : 'p-3'}
            `}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className={`relative flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <LogOut className={`${isCollapsed ? 'w-5 h-5' : 'w-4 h-4'} transition-all duration-300`} />
              {!isCollapsed && (
                <span className="font-medium text-sm">Déconnexion</span>
              )}
            </div>

            {/* Tooltip pour mode collapsed */}
            {isCollapsed && hoveredItem === 'Déconnexion' && (
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap z-50 shadow-xl">
                Déconnexion
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;