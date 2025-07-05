import React, { useState, useEffect } from 'react';
import { Home, MapPin, Palette, Share2, Users, Bot, Zap, ChevronRight, X } from 'lucide-react';

interface MobileNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ 
  activeTab, 
  setActiveTab, 
  isOpen, 
  onClose 
}) => {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (isOpen) {
      setAnimationClass('animate-slide-up');
    } else {
      setAnimationClass('animate-slide-down');
    }
  }, [isOpen]);

  const menuItems = [
    { name: 'Dashboard', icon: Bot, color: 'from-blue-500 to-blue-600', emoji: '🏠' },
    { name: "Let's Fight !", icon: Zap, color: 'from-red-500 to-red-600', emoji: '⚡' },
    { name: 'Infos générales', icon: Home, color: 'from-green-500 to-green-600', emoji: '📋' },
    { name: 'Localisation', icon: MapPin, color: 'from-purple-500 to-purple-600', emoji: '📍' },
    { name: 'Design & Branding', icon: Palette, color: 'from-pink-500 to-pink-600', emoji: '🎨' },
    { name: 'Réseaux sociaux', icon: Share2, color: 'from-orange-500 to-orange-600', emoji: '📱' },
    { name: 'Concurrents', icon: Users, color: 'from-indigo-500 to-indigo-600', emoji: '🥊' },
  ];

  const handleItemClick = (itemName: string) => {
    setActiveTab(itemName);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop avec blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Panel de navigation */}
      <div className={`
        absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl
        transform transition-transform duration-500 ease-out
        ${isOpen ? 'translate-y-0' : 'translate-y-full'}
      `}>
        {/* Handle bar */}
        <div className="flex justify-center pt-4 pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Beezia
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        {/* Menu Items */}
        <div className="px-4 py-6 max-h-96 overflow-y-auto">
          <div className="grid grid-cols-1 gap-3">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = item.name === activeTab;
              
              return (
                <button
                  key={item.name}
                  onClick={() => handleItemClick(item.name)}
                  className={`
                    group relative overflow-hidden rounded-2xl p-4 transition-all duration-300
                    ${isActive 
                      ? `bg-gradient-to-r ${item.color} text-white shadow-lg scale-105` 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }
                    transform hover:scale-105 active:scale-95
                  `}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    animation: isOpen ? 'slideInUp 0.6s ease-out forwards' : 'none'
                  }}
                >
                  {/* Background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative flex items-center space-x-4">
                    {/* Emoji + Icon */}
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{item.emoji}</span>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    {/* Text */}
                    <div className="flex-1 text-left">
                      <span className="font-semibold text-lg">{item.name}</span>
                    </div>
                    
                    {/* Arrow */}
                    <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${
                      isActive ? 'text-white' : 'text-gray-400'
                    }`} />
                  </div>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-t-3xl">
          <div className="text-center text-sm text-gray-500">
            Swipe up pour plus d'options
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;