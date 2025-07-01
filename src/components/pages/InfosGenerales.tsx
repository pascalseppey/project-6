import React from 'react';
import { Building2, Phone, Clock, User, TrendingUp } from 'lucide-react';

const InfosGenerales: React.FC = () => {
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
              <h1 className="text-4xl font-bold text-white mb-2">Infos Générales</h1>
              <p className="text-blue-100 text-lg">Informations de base sur votre entreprise</p>
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

      {/* Contenu principal - Grille d'informations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Informations de l'entreprise */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <Building2 className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Entreprise</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Nom de l'entreprise</label>
              <div className="bg-gray-50 p-4 rounded-xl border">
                <p className="text-gray-900 font-semibold">Charly Gaillard</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Secteur d'activité</label>
              <div className="bg-gray-50 p-4 rounded-xl border">
                <p className="text-gray-900">Services numériques</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Description</label>
              <div className="bg-gray-50 p-4 rounded-xl border">
                <p className="text-gray-900">Spécialiste en développement web et marketing digital</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Année de création</label>
              <div className="bg-gray-50 p-4 rounded-xl border">
                <p className="text-gray-900">2020</p>
              </div>
            </div>
          </div>
        </div>

        {/* Informations de contact */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <Phone className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Contact</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Site web</label>
              <div className="bg-gray-50 p-4 rounded-xl border">
                <p className="text-blue-600 font-medium">https://charlygaillard.ch</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
              <div className="bg-gray-50 p-4 rounded-xl border">
                <p className="text-gray-900">contact@charlygaillard.ch</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Téléphone</label>
              <div className="bg-gray-50 p-4 rounded-xl border">
                <p className="text-gray-900">+41 79 123 45 67</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Adresse</label>
              <div className="bg-gray-50 p-4 rounded-xl border">
                <p className="text-gray-900">Rue de la Paix 15<br />1000 Lausanne, Suisse</p>
              </div>
            </div>
          </div>
        </div>

        {/* Horaires d'ouverture */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <Clock className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Horaires</h2>
          </div>
          
          <div className="space-y-4">
            {[
              { day: 'Lundi', hours: '09:00 - 18:00' },
              { day: 'Mardi', hours: '09:00 - 18:00' },
              { day: 'Mercredi', hours: '09:00 - 18:00' },
              { day: 'Jeudi', hours: '09:00 - 18:00' },
              { day: 'Vendredi', hours: '09:00 - 17:00' },
              { day: 'Samedi', hours: 'Fermé' },
              { day: 'Dimanche', hours: 'Fermé' }
            ].map((schedule, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <span className="text-gray-700 font-medium">{schedule.day}</span>
                <span className={`${schedule.hours === 'Fermé' ? 'text-red-500' : 'text-gray-900'} font-medium`}>
                  {schedule.hours}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Équipe */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <User className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Équipe</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">CG</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Charly Gaillard</h3>
                <p className="text-gray-600 text-sm">Fondateur & Développeur</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">1</div>
                <div className="text-sm text-gray-600">Employé</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-2xl font-bold text-green-600">5+</div>
                <div className="text-sm text-gray-600">Années d'exp.</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="text-2xl font-bold text-purple-600">50+</div>
                <div className="text-sm text-gray-600">Projets</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section statistiques rapides */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
        <div className="flex items-center space-x-3 mb-6">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Aperçu rapide</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
            <div className="text-gray-600">Satisfaction client</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">24h</div>
            <div className="text-gray-600">Temps de réponse</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
            <div className="text-gray-600">Projets livrés</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">5★</div>
            <div className="text-gray-600">Note moyenne</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfosGenerales;