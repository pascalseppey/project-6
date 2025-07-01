import React from 'react';
import { Search, Bell, Mail, Wifi, WifiOff, Save, Clock } from 'lucide-react';
import { useAppSelector } from '../../hooks';
import ClientSelector from '../ClientSelector';

interface HeaderProps {
  currentTime: Date;
}

const Header: React.FC<HeaderProps> = ({ currentTime }) => {
  const { hasUnsavedChanges, isSaving, lastSaved } = useAppSelector(state => state.currentClient);
  const { isOnline } = useAppSelector(state => state.ui);
  
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
    <div className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Date et Heure + Statut de connexion */}
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium">{formatDate(currentTime)}</span>
          <span className="font-mono">{formatTime(currentTime)}</span>
          
          {/* Indicateur de connexion */}
          <div className="flex items-center space-x-1">
            {isOnline ? (
              <Wifi className="w-4 h-4 text-green-600" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-600" />
            )}
            <span className={`text-xs ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
              {isOnline ? 'En ligne' : 'Hors ligne'}
            </span>
          </div>
          
          {/* Statut de sauvegarde */}
          <div className="flex items-center space-x-1">
            {isSaving ? (
              <>
                <Save className="w-4 h-4 text-blue-600 animate-pulse" />
                <span className="text-xs text-blue-600">Sauvegarde...</span>
              </>
            ) : hasUnsavedChanges ? (
              <>
                <Clock className="w-4 h-4 text-yellow-600" />
                <span className="text-xs text-yellow-600">Non sauvegardé</span>
              </>
            ) : lastSaved ? (
              <>
                <Save className="w-4 h-4 text-green-600" />
                <span className="text-xs text-green-600">
                  Sauvegardé {formatLastSaved(lastSaved)}
                </span>
              </>
            ) : null}
          </div>
        </div>

        {/* Zone centrale avec recherche élargie */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cherchez dans vos données client..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Zone droite avec sélecteur de client et notifications */}
        <div className="flex items-center space-x-4">
          {/* Sélecteur de client */}
          <ClientSelector />

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
  );
};

export default Header;