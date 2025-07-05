import React, { useState } from 'react';
import { Search, Bell, Mail, Wifi, WifiOff, Save, Clock, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { useAppSelector } from '../../hooks';
import ClientSelector from '../ClientSelector';

interface HeaderProps {
  currentTime: Date;
}

const Header: React.FC<HeaderProps> = ({ currentTime }) => {
  const { hasUnsavedChanges, isSaving, lastSaved } = useAppSelector(state => state.currentClient);
  const { isOnline } = useAppSelector(state => state.ui);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };
  
  const formatLastSaved = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffMins < 1440) return `Il y a ${Math.floor(diffMins / 60)}h`;
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        {/* Date et Heure + Statut de connexion */}
        <div className="hidden sm:flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
            <span className="font-medium">{formatDate(currentTime)}</span>
            <span className="font-mono text-blue-600">{formatTime(currentTime)}</span>
          </div>
          
          {/* Indicateur de connexion */}
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
            isOnline ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {isOnline ? (
              <Wifi className="w-4 h-4" />
            ) : (
              <WifiOff className="w-4 h-4" />
            )}
            <span className="text-xs font-medium">
              {isOnline ? 'En ligne' : 'Hors ligne'}
            </span>
          </div>
          
          {/* Statut de sauvegarde */}
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
            isSaving ? 'bg-blue-50 text-blue-700' :
            hasUnsavedChanges ? 'bg-yellow-50 text-yellow-700' :
            lastSaved ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-600'
          }`}>
            {isSaving ? (
              <>
                <Save className="w-4 h-4 animate-pulse" />
                <span className="text-xs font-medium">Sauvegarde...</span>
              </>
            ) : hasUnsavedChanges ? (
              <>
                <Clock className="w-4 h-4" />
                <span className="text-xs font-medium">Non sauvegardé</span>
              </>
            ) : lastSaved ? (
              <>
                <Save className="w-4 h-4" />
                <span className="text-xs font-medium">
                  Sauvegardé {formatLastSaved(lastSaved)}
                </span>
              </>
            ) : null}
          </div>
        </div>

        {/* Zone centrale avec recherche */}
        <div className="flex-1 max-w-2xl mx-4 sm:mx-8">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Rechercher dans vos données client..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-300 text-gray-900 placeholder-gray-500"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        </div>

        {/* Zone droite avec sélecteur de client et notifications */}
        <div className="flex items-center space-x-3">
          {/* Sélecteur de client - Caché sur mobile */}
          <div className="hidden lg:block">
            <ClientSelector />
          </div>

          {/* Notifications */}
          <div className="flex items-center space-x-2">
            <button className="relative p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200 group">
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 rounded-full text-xs text-white flex items-center justify-center font-bold shadow-lg animate-pulse">
                1
              </span>
            </button>

            <button className="relative p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200 group">
              <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 rounded-full text-xs text-white flex items-center justify-center font-bold shadow-lg animate-pulse">
                1
              </span>
            </button>
          </div>

          {/* Menu Profil */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl px-4 py-3 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-lg group-hover:scale-110 transition-transform">
                <img 
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-sm font-semibold text-gray-900">Charly Gaillard</div>
                <div className="text-xs text-gray-500">charlygaillard.ch</div>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
            </button>

            {/* Menu déroulant */}
            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200/50 backdrop-blur-xl z-50 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg">
                      <img 
                        src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Charly Gaillard</div>
                      <div className="text-sm text-gray-600">charlygaillard.ch</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-2">
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-xl transition-colors group">
                    <User className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    <span className="text-gray-700 group-hover:text-gray-900">Mon profil</span>
                  </button>
                  
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-xl transition-colors group">
                    <Settings className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    <span className="text-gray-700 group-hover:text-gray-900">Paramètres</span>
                  </button>
                  
                  <div className="border-t border-gray-100 my-2" />
                  
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50 rounded-xl transition-colors group">
                    <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                    <span className="text-gray-700 group-hover:text-red-600">Déconnexion</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Status Bar */}
      <div className="sm:hidden mt-3 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-1 px-2 py-1 rounded ${
            isOnline ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            <span>{isOnline ? 'En ligne' : 'Hors ligne'}</span>
          </div>
        </div>
        
        <div className="text-gray-500">
          {formatTime(currentTime)}
        </div>
      </div>
    </div>
  );
};

export default Header;