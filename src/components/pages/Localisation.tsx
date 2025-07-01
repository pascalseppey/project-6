import React from 'react';
import { MapPin, Navigation, Globe, Building } from 'lucide-react';

const Localisation: React.FC = () => {
  return (
    <div className="p-8">
      {/* Bannière bleue avec abeille et titre */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
        
        <div className="relative z-10 flex items-center justify-between">
          {/* Zone gauche avec abeille */}
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 flex items-center justify-center">
              <img 
                src="/bee-mascot-violet.png" 
                alt="Beezia Mascot" 
                className="w-16 h-16 object-contain drop-shadow-lg"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Localisation</h1>
              <p className="text-blue-100 text-lg">Gérez votre présence géographique</p>
            </div>
          </div>
          
          {/* Zone droite avec bouton d'action */}
          <div className="flex items-center space-x-4">
            <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200 font-semibold">
              Modifier
            </button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Adresse principale */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <Building className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Adresse principale</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Adresse complète</label>
              <div className="bg-gray-50 p-4 rounded-xl border">
                <p className="text-gray-900 font-semibold">Rue de la Paix 15</p>
                <p className="text-gray-900">1000 Lausanne</p>
                <p className="text-gray-900">Suisse</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Code postal</label>
                <div className="bg-gray-50 p-4 rounded-xl border">
                  <p className="text-gray-900">1000</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Ville</label>
                <div className="bg-gray-50 p-4 rounded-xl border">
                  <p className="text-gray-900">Lausanne</p>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Pays</label>
              <div className="bg-gray-50 p-4 rounded-xl border">
                <p className="text-gray-900">Suisse</p>
              </div>
            </div>
          </div>
        </div>

        {/* Zone de service */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <Navigation className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Zone de service</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Rayon d'action</label>
              <div className="bg-gray-50 p-4 rounded-xl border">
                <p className="text-gray-900 font-semibold">50 km autour de Lausanne</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Villes principales</label>
              <div className="bg-gray-50 p-4 rounded-xl border space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-900">Lausanne</span>
                  <span className="text-blue-600 text-sm">Principal</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-900">Genève</span>
                  <span className="text-green-600 text-sm">Couvert</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-900">Montreux</span>
                  <span className="text-green-600 text-sm">Couvert</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-900">Yverdon</span>
                  <span className="text-green-600 text-sm">Couvert</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coordonnées GPS */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <MapPin className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Coordonnées GPS</h2>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Latitude</label>
                <div className="bg-gray-50 p-4 rounded-xl border">
                  <p className="text-gray-900 font-mono">46.5197</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Longitude</label>
                <div className="bg-gray-50 p-4 rounded-xl border">
                  <p className="text-gray-900 font-mono">6.6323</p>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Précision</label>
              <div className="bg-gray-50 p-4 rounded-xl border">
                <p className="text-gray-900">Adresse exacte</p>
              </div>
            </div>
          </div>
        </div>

        {/* Présence en ligne */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <Globe className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Présence en ligne</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <h3 className="font-semibold text-gray-900">Google My Business</h3>
                <p className="text-gray-600 text-sm">Fiche d'entreprise</p>
              </div>
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-lg text-sm font-medium">
                Actif
              </span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <h3 className="font-semibold text-gray-900">Apple Maps</h3>
                <p className="text-gray-600 text-sm">Référencement local</p>
              </div>
              <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-lg text-sm font-medium">
                En cours
              </span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <h3 className="font-semibold text-gray-900">Bing Places</h3>
                <p className="text-gray-600 text-sm">Microsoft Maps</p>
              </div>
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-lg text-sm font-medium">
                Actif
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Section carte (placeholder) */}
      <div className="mt-8 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
        <div className="flex items-center space-x-3 mb-6">
          <MapPin className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Carte interactive</h2>
        </div>
        
        <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Carte interactive</h3>
            <p className="text-gray-500">La carte sera intégrée ici avec votre localisation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Localisation;