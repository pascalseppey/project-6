import React, { useState } from 'react';
import { ChevronDown, Plus, CheckCircle, User, Calendar, Mail } from 'lucide-react';
import { useAppSelector, useClientManager } from '../hooks';

const ClientSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNewClientForm, setShowNewClientForm] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  
  const { availableClients, currentClient, lastActiveClientId, loadClient, createNewClient } = useClientManager();
  const { isLoading } = useAppSelector(state => state.currentClient);
  
  const handleClientChange = async (clientId: string) => {
    await loadClient(clientId);
    setIsOpen(false);
  };
  
  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newClientName.trim() && newClientEmail.trim()) {
      try {
        await createNewClient(newClientName.trim(), newClientEmail.trim());
        setNewClientName('');
        setNewClientEmail('');
        setShowNewClientForm(false);
        setIsOpen(false);
      } catch (error) {
        console.error('Erreur création client:', error);
      }
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center space-x-3 bg-gray-50 rounded-lg px-4 py-2">
        <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="text-left">
          <div className="w-24 h-4 bg-gray-300 rounded animate-pulse mb-1"></div>
          <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 bg-gray-50 rounded-lg px-4 py-2 hover:bg-gray-100 transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">
            {currentClient?.metadata?.nom?.charAt(0) || 'C'}
          </span>
        </div>
        <div className="text-left">
          <div className="text-sm font-medium text-gray-900">
            {currentClient?.metadata?.nom || 'Sélectionner un client'}
          </div>
          <div className="text-xs text-gray-500">
            {availableClients.length} client{availableClients.length > 1 ? 's' : ''} disponible{availableClients.length > 1 ? 's' : ''}
          </div>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {/* En-tête */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Sélectionner un client</h3>
            <p className="text-sm text-gray-600">Choisissez le client à gérer</p>
          </div>
          
          {/* Liste des clients */}
          <div className="max-h-64 overflow-y-auto">
            {availableClients
              .sort((a, b) => a.nom.localeCompare(b.nom))
              .map((client) => (
              <button
                key={client.id}
                onClick={() => handleClientChange(client.id)}
                className={`w-full flex items-center space-x-3 p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                  lastActiveClientId === client.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">
                    {client.nom.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">{client.nom}</div>
                  <div className="text-sm text-gray-500 truncate flex items-center">
                    <Mail className="w-3 h-3 mr-1" />
                    {client.email}
                  </div>
                  <div className="text-xs text-gray-400 flex items-center mt-1">
                    <Calendar className="w-3 h-3 mr-1" />
                    Modifié le {formatDate(client.lastModified)}
                  </div>
                </div>
                {lastActiveClientId === client.id && (
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
          
          {/* Formulaire nouveau client */}
          {showNewClientForm ? (
            <form onSubmit={handleCreateClient} className="p-4 border-t border-gray-200 bg-gray-50">
              <h4 className="font-medium text-gray-900 mb-3">Nouveau client</h4>
              <div className="space-y-3">
                <input
                  type="text"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  placeholder="Nom de l'entreprise"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  required
                />
                <input
                  type="email"
                  value={newClientEmail}
                  onChange={(e) => setNewClientEmail(e.target.value)}
                  placeholder="Email de contact"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  required
                />
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Créer
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewClientForm(false);
                      setNewClientName('');
                      setNewClientEmail('');
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-400 transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="p-4 border-t border-gray-200">
              <button 
                onClick={() => setShowNewClientForm(true)}
                className="w-full flex items-center justify-center space-x-2 p-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="font-medium">Nouveau client</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientSelector;