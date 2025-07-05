import React, { useState } from 'react';
import { Menu, Bell, Search, User, Wifi, WifiOff } from 'lucide-react';
import { useAppSelector } from '../../hooks';

interface MobileHeaderProps {
  onMenuClick: () => void;
  currentTime: Date;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onMenuClick, currentTime }) => {
  const { isOnline } = useAppSelector(state => state.ui);
  const [showSearch, setShowSearch] = useState(false);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      {/* Status Bar */}
      <div className="bg-black text-white px-4 py-1 flex justify-between items-center text-xs font-medium">
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white/50 rounded-full"></div>
          </div>
          <span className="ml-2">Beezia</span>
        </div>
        
        <div className="flex items-center space-x-2">
          {isOnline ? (
            <Wifi className="w-3 h-3" />
          ) : (
            <WifiOff className="w-3 h-3" />
          )}
          <span>100%</span>
          <div className="w-6 h-3 border border-white rounded-sm">
            <div className="w-full h-full bg-green-500 rounded-sm"></div>
          </div>
          <span>{formatTime(currentTime)}</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Menu Button */}
          <button
            onClick={onMenuClick}
            className="p-3 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 transform hover:scale-110 active:scale-95"
          >
            <Menu className="w-6 h-6 text-blue-600" />
          </button>

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Beezia
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-3 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 transform hover:scale-110 active:scale-95"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            
            <button className="relative p-3 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 transform hover:scale-110 active:scale-95">
              <Bell className="w-5 h-5 text-gray-600" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">3</span>
              </div>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="mt-4 animate-slide-down">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MobileHeader;