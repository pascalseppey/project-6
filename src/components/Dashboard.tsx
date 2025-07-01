import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Globe, 
  Star, 
  Shield, 
  Zap, 
  Target,
  ChevronRight,
  Award,
  Eye,
  MapPin
} from 'lucide-react';

interface Competitor {
  id: string;
  name: string;
  website: string;
  location: string;
  overallScore: number;
  criteria: {
    visibility: number;
    reputation: number;
    gmb: number;
    seoLocal: number;
    website: number;
    coverage: number;
    services: number;
    globalScore: number;
  };
  tags: string[];
  notes: string;
}

const competitors: Competitor[] = [
  {
    id: '1',
    name: 'WebDesign Pro SA',
    website: 'https://webdesignpro.ch',
    location: 'Lausanne, Vaud',
    overallScore: 83,
    criteria: {
      visibility: 86,
      reputation: 78,
      gmb: 92,
      seoLocal: 76,
      website: 88,
      coverage: 82,
      services: 80,
      globalScore: 83
    },
    tags: ['Développement Web', 'Design Graphique', 'E-commerce'],
    notes: 'Leader local avec forte présence GMB'
  },
  {
    id: '2',
    name: 'Digital Solutions Suisse',
    website: 'https://digitalsolutions.ch',
    location: 'Genève, Genève',
    overallScore: 79,
    criteria: {
      visibility: 82,
      reputation: 85,
      gmb: 74,
      seoLocal: 81,
      website: 90,
      coverage: 78,
      services: 85,
      globalScore: 79
    },
    tags: ['Marketing Digital', 'SEO', 'Développement'],
    notes: 'Forte réputation mais GMB à améliorer'
  },
  {
    id: '3',
    name: 'Swiss Web Agency',
    website: 'https://swisswebagency.ch',
    location: 'Zurich, Zurich',
    overallScore: 75,
    criteria: {
      visibility: 78,
      reputation: 72,
      gmb: 68,
      seoLocal: 79,
      website: 84,
      coverage: 88,
      services: 76,
      globalScore: 75
    },
    tags: ['Agence Web', 'UX/UI', 'Branding'],
    notes: 'Bonne couverture géographique'
  }
];

const criteriaConfig = [
  { key: 'visibility', label: 'Visibilité', icon: Eye, color: 'emerald' },
  { key: 'reputation', label: 'Réputation', icon: Star, color: 'blue' },
  { key: 'gmb', label: 'Fiche GMB', icon: MapPin, color: 'emerald' },
  { key: 'seoLocal', label: 'SEO Local', icon: Target, color: 'blue' },
  { key: 'website', label: 'Site Web', icon: Globe, color: 'emerald' },
  { key: 'coverage', label: 'Zone Couverture', icon: Shield, color: 'blue' },
  { key: 'services', label: 'Services', icon: Zap, color: 'blue' },
  { key: 'globalScore', label: 'Score Global', icon: Award, color: 'blue' }
];

const getScoreColor = (score: number) => {
  if (score >= 85) return 'text-emerald-600';
  if (score >= 70) return 'text-blue-600';
  if (score >= 50) return 'text-amber-600';
  return 'text-red-500';
};

const getProgressColor = (score: number, colorScheme: string) => {
  const colors = {
    emerald: score >= 85 ? 'bg-emerald-500' : score >= 70 ? 'bg-emerald-400' : 'bg-emerald-300',
    blue: score >= 85 ? 'bg-blue-500' : score >= 70 ? 'bg-blue-400' : 'bg-blue-300'
  };
  return colors[colorScheme as keyof typeof colors];
};

export default function Dashboard() {
  const [selectedCompetitor, setSelectedCompetitor] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('competitors');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-inter">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white/80 backdrop-blur-sm border-r border-slate-200/60 px-6 py-8 z-10">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Beezia
          </h1>
        </div>
        
        <nav className="flex flex-col gap-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('competitors')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === 'competitors'
                ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Users className="w-5 h-5" />
            Concurrents
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all duration-200">
            <TrendingUp className="w-5 h-5" />
            Analyses
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {activeTab === 'competitors' ? (
          <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Analyse Concurrentielle</h2>
                <p className="text-slate-600">Évaluation détaillée de vos concurrents sur 8 critères clés</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white/60 backdrop-blur-sm rounded-xl px-4 py-2 border border-slate-200/60">
                  <span className="text-sm text-slate-600">{competitors.length} concurrents analysés</span>
                </div>
              </div>
            </div>

            {/* Competitors Grid */}
            <div className="grid gap-8">
              {competitors.map((competitor, index) => (
                <div
                  key={competitor.id}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/60 overflow-hidden hover:shadow-xl transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Competitor Header */}
                  <div className="p-6 border-b border-slate-200/60">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                          {competitor.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 mb-1">{competitor.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                            <span className="flex items-center gap-1">
                              <Globe className="w-4 h-4" />
                              {competitor.website.replace('https://', '')}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {competitor.location}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            {competitor.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-3xl font-bold ${getScoreColor(competitor.overallScore)} mb-1`}>
                          {competitor.overallScore}%
                        </div>
                        <div className="text-sm text-slate-500">Score global</div>
                      </div>
                    </div>
                  </div>

                  {/* Criteria Grid */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                      {criteriaConfig.map((criterion) => {
                        const score = competitor.criteria[criterion.key as keyof typeof competitor.criteria];
                        const Icon = criterion.icon;
                        
                        return (
                          <div
                            key={criterion.key}
                            className="group p-4 bg-slate-50/50 rounded-xl hover:bg-white/80 transition-all duration-200 border border-slate-200/40"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className={`p-2 rounded-lg ${
                                criterion.color === 'emerald' ? 'bg-emerald-100' : 'bg-blue-100'
                              }`}>
                                <Icon className={`w-4 h-4 ${
                                  criterion.color === 'emerald' ? 'text-emerald-600' : 'text-blue-600'
                                }`} />
                              </div>
                              <span className={`text-lg font-bold ${getScoreColor(score)}`}>
                                {score}%
                              </span>
                            </div>
                            <div className="mb-3">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium text-slate-700">{criterion.label}</span>
                              </div>
                              <div className="w-full bg-slate-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full transition-all duration-1000 ${getProgressColor(score, criterion.color)}`}
                                  style={{ width: `${score}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Notes */}
                    {competitor.notes && (
                      <div className="bg-blue-50/50 border border-blue-200/60 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <div className="p-1 bg-blue-100 rounded-lg">
                            <Target className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-blue-900 mb-1">Notes</h4>
                            <p className="text-blue-700 text-sm">{competitor.notes}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Dashboard Content */
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-slate-900">Dashboard</h2>
              <button className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200">
                <BarChart3 className="w-5 h-5" />
                Dashboard
              </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl p-8 flex items-center justify-center">
                <div className="text-center text-white">
                  <BarChart3 className="w-24 h-24 mx-auto mb-4 opacity-80" />
                  <h3 className="text-2xl font-bold">Beezia Analytics</h3>
                  <p className="opacity-80">Tableau de bord principal</p>
                </div>
              </div>

              <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/60">
                  <p className="text-sm text-slate-500 mb-2">Revenus</p>
                  <p className="text-3xl font-bold text-slate-900 mb-1">256K€</p>
                  <p className="text-sm text-emerald-600">+12% ce mois</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/60">
                  <p className="text-sm text-slate-500 mb-2">Clients</p>
                  <p className="text-3xl font-bold text-slate-900 mb-1">459</p>
                  <button className="mt-2 text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
                    Voir détails
                  </button>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/60 col-span-2">
                  <p className="text-sm text-slate-500 mb-2">Performance</p>
                  <p className="text-3xl font-bold text-slate-900 mb-4">549K€</p>
                  <div className="h-20 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg flex items-end justify-center">
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}