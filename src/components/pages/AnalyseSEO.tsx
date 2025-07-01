import React, { useState } from 'react';
import { Search, TrendingUp, AlertTriangle, CheckCircle, BarChart3, Globe, Key, FileText, Target, Users, Clock, Zap, RefreshCw } from 'lucide-react';

interface KeywordData {
  keyword: string;
  position: number;
  searchVolume: number;
  difficulty: number;
  trend: 'up' | 'down' | 'stable';
  clicks: number;
  impressions: number;
}

interface PageAnalysis {
  url: string;
  title: string;
  metaDescription: string;
  h1: string;
  wordCount: number;
  keywordDensity: number;
  loadTime: number;
  mobileScore: number;
  seoScore: number;
  issues: string[];
  recommendations: string[];
}

const AnalyseSEO: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState('https://charlygaillard.ch');
  
  // Données d'exemple pour les mots-clés
  const [keywordsData] = useState<KeywordData[]>([
    {
      keyword: 'développement web',
      position: 3,
      searchVolume: 2400,
      difficulty: 65,
      trend: 'up',
      clicks: 156,
      impressions: 3200
    },
    {
      keyword: 'site internet lausanne',
      position: 8,
      searchVolume: 880,
      difficulty: 45,
      trend: 'stable',
      clicks: 89,
      impressions: 1800
    },
    {
      keyword: 'agence web suisse',
      position: 12,
      searchVolume: 1200,
      difficulty: 70,
      trend: 'down',
      clicks: 45,
      impressions: 980
    },
    {
      keyword: 'création site web',
      position: 5,
      searchVolume: 3200,
      difficulty: 55,
      trend: 'up',
      clicks: 234,
      impressions: 4100
    }
  ]);

  // Données d'exemple pour l'analyse des pages
  const [pagesAnalysis] = useState<PageAnalysis[]>([
    {
      url: 'https://charlygaillard.ch/',
      title: 'Charly Gaillard - Développement Web & Marketing Digital',
      metaDescription: 'Spécialiste en développement web et marketing digital en Suisse. Création de sites modernes et optimisés SEO.',
      h1: 'Développement Web Professionnel',
      wordCount: 850,
      keywordDensity: 2.8,
      loadTime: 1.2,
      mobileScore: 95,
      seoScore: 87,
      issues: [
        'Meta description trop courte (moins de 150 caractères)',
        'Manque d\'attributs alt sur 2 images'
      ],
      recommendations: [
        'Ajouter plus de contenu textuel (viser 1000+ mots)',
        'Optimiser les images pour le web',
        'Ajouter des liens internes vers les services'
      ]
    },
    {
      url: 'https://charlygaillard.ch/services',
      title: 'Nos Services - Développement Web & Apps',
      metaDescription: 'Découvrez nos services de développement web, applications mobiles et marketing digital pour votre entreprise.',
      h1: 'Nos Services de Développement',
      wordCount: 650,
      keywordDensity: 3.2,
      loadTime: 0.9,
      mobileScore: 92,
      seoScore: 82,
      issues: [
        'Titre H1 pourrait être plus descriptif',
        'Manque de structure avec des sous-titres H2/H3'
      ],
      recommendations: [
        'Restructurer le contenu avec des sous-titres',
        'Ajouter des témoignages clients',
        'Inclure des call-to-action plus visibles'
      ]
    }
  ]);

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
    { id: 'keywords', label: 'Mots-clés', icon: Key },
    { id: 'pages', label: 'Pages', icon: FileText },
    { id: 'competitors', label: 'Concurrents', icon: Users },
  ];

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simuler une analyse
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-600 transform rotate-180" />;
      case 'stable':
        return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Métriques principales */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-gray-600">Score SEO Global</div>
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-600">85/100</div>
                <div className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +5 ce mois
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-gray-600">Mots-clés Top 10</div>
                  <Key className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-green-600">12</div>
                <div className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +3 ce mois
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-gray-600">Trafic Organique</div>
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-purple-600">2,847</div>
                <div className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +18% ce mois
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-gray-600">Pages Indexées</div>
                  <Globe className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-3xl font-bold text-orange-600">47</div>
                <div className="text-sm text-gray-600 flex items-center mt-1">
                  <div className="w-4 h-4 bg-gray-400 rounded-full mr-1"></div>
                  Stable
                </div>
              </div>
            </div>

            {/* Graphique de performance */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance SEO (30 derniers jours)</h3>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center border border-blue-200">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">Graphique de performance</h4>
                  <p className="text-gray-600">Évolution du trafic organique, positions et impressions</p>
                </div>
              </div>
            </div>

            {/* Alertes et recommandations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                  Problèmes détectés
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-red-800">Vitesse de chargement</div>
                      <div className="text-sm text-red-600">3 pages ont un temps de chargement &gt; 3s</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-yellow-800">Meta descriptions</div>
                      <div className="text-sm text-yellow-600">5 pages sans meta description</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-yellow-800">Images non optimisées</div>
                      <div className="text-sm text-yellow-600">12 images sans attribut alt</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  Recommandations
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-green-800">Contenu de qualité</div>
                      <div className="text-sm text-green-600">Ajouter 500+ mots sur la page services</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-blue-800">Liens internes</div>
                      <div className="text-sm text-blue-600">Créer plus de liens entre vos pages</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-purple-800">Schema markup</div>
                      <div className="text-sm text-purple-600">Ajouter des données structurées</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'keywords':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Suivi des mots-clés</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Mot-clé</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Position</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Volume</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Difficulté</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Tendance</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Clics</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Impressions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {keywordsData.map((keyword, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{keyword.keyword}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                            keyword.position <= 3 ? 'bg-green-100 text-green-800' :
                            keyword.position <= 10 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            #{keyword.position}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{keyword.searchVolume.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                            keyword.difficulty <= 30 ? 'bg-green-100 text-green-800' :
                            keyword.difficulty <= 60 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {keyword.difficulty}%
                          </span>
                        </td>
                        <td className="py-3 px-4">{getTrendIcon(keyword.trend)}</td>
                        <td className="py-3 px-4 text-gray-600">{keyword.clicks}</td>
                        <td className="py-3 px-4 text-gray-600">{keyword.impressions.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Opportunités de mots-clés */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Opportunités de mots-clés</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-2">Faciles à ranker</h4>
                  <div className="space-y-2">
                    <div className="text-sm text-blue-700">• site web responsive</div>
                    <div className="text-sm text-blue-700">• développeur freelance</div>
                    <div className="text-sm text-blue-700">• création site vitrine</div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2">Fort potentiel</h4>
                  <div className="space-y-2">
                    <div className="text-sm text-green-700">• agence digitale lausanne</div>
                    <div className="text-sm text-green-700">• marketing digital suisse</div>
                    <div className="text-sm text-green-700">• SEO local</div>
                  </div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-medium text-yellow-800 mb-2">Long terme</h4>
                  <div className="space-y-2">
                    <div className="text-sm text-yellow-700">• transformation digitale</div>
                    <div className="text-sm text-yellow-700">• consultant web</div>
                    <div className="text-sm text-yellow-700">• stratégie numérique</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'pages':
        return (
          <div className="space-y-6">
            {pagesAnalysis.map((page, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{page.title}</h3>
                    <p className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">{page.url}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(page.seoScore)}`}>
                    {page.seoScore}/100
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{page.wordCount}</div>
                    <div className="text-sm text-gray-600">Mots</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{page.keywordDensity}%</div>
                    <div className="text-sm text-gray-600">Densité</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{page.loadTime}s</div>
                    <div className="text-sm text-gray-600">Chargement</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{page.mobileScore}</div>
                    <div className="text-sm text-gray-600">Mobile</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                      Problèmes détectés
                    </h4>
                    <div className="space-y-2">
                      {page.issues.map((issue, issueIndex) => (
                        <div key={issueIndex} className="text-sm text-red-600 bg-red-50 p-2 rounded">
                          • {issue}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      Recommandations
                    </h4>
                    <div className="space-y-2">
                      {page.recommendations.map((rec, recIndex) => (
                        <div key={recIndex} className="text-sm text-green-600 bg-green-50 p-2 rounded">
                          • {rec}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'competitors':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Analyse concurrentielle</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Concurrent</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Score SEO</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Mots-clés communs</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Trafic estimé</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Backlinks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">webdesignpro.ch</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">92/100</span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">23</td>
                      <td className="py-3 px-4 text-gray-600">4,200/mois</td>
                      <td className="py-3 px-4 text-gray-600">156</td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">digital-solutions.ch</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">78/100</span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">18</td>
                      <td className="py-3 px-4 text-gray-600">2,800/mois</td>
                      <td className="py-3 px-4 text-gray-600">89</td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">techcraft.ch</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">81/100</span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">15</td>
                      <td className="py-3 px-4 text-gray-600">3,100/mois</td>
                      <td className="py-3 px-4 text-gray-600">124</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Opportunités concurrentielles */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Mots-clés des concurrents</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium text-blue-800">agence web genève</span>
                    <span className="text-sm text-blue-600">Position #2 chez WebDesignPro</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium text-green-800">développement app mobile</span>
                    <span className="text-sm text-green-600">Position #4 chez TechCraft</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="font-medium text-yellow-800">consultant digital</span>
                    <span className="text-sm text-yellow-600">Position #6 chez Digital Solutions</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Écarts de contenu</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="font-medium text-red-800">Blog technique</div>
                    <div className="text-sm text-red-600">Vos concurrents publient 2x plus d'articles</div>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <div className="font-medium text-yellow-800">Études de cas</div>
                    <div className="text-sm text-yellow-600">Manque de preuves sociales détaillées</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-medium text-blue-800">Pages services</div>
                    <div className="text-sm text-blue-600">Contenu moins détaillé que la concurrence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
              <h1 className="text-4xl font-bold text-white mb-2">Analyse SEO</h1>
              <p className="text-blue-100 text-lg">Analysez et optimisez votre référencement naturel</p>
            </div>
          </div>
          
          {/* Zone droite avec URL et bouton d'analyse */}
          <div className="flex items-center space-x-4">
            <div className="flex flex-col">
              <label htmlFor="website-url" className="text-sm font-medium text-blue-100 mb-1">
                Site à analyser
              </label>
              <input
                id="website-url"
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://www.example.com"
                className="w-80 px-4 py-3 border border-white/30 rounded-xl bg-white/20 backdrop-blur-sm text-white placeholder-blue-200 focus:ring-2 focus:ring-white/50 focus:border-transparent font-medium"
                disabled={isAnalyzing}
              />
            </div>
            
            <div className="flex flex-col">
              <div className="h-6"></div>
              <button 
                onClick={handleAnalyze}
                className={`flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200 font-semibold ${isAnalyzing ? 'opacity-75 cursor-not-allowed' : ''}`}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                <span>{isAnalyzing ? 'Analyse en cours...' : 'Analyser'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu horizontal des onglets */}
      <div className="mb-8">
        <nav className="flex bg-gray-100 p-1 rounded-xl" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-3 px-4 py-4 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-lg'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Contenu de l'onglet actif */}
      <div className="mb-8">
        {renderTabContent()}
      </div>

      {/* Section d'aide */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Guide d'optimisation SEO</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">🎯 Mots-clés</h4>
            <p className="text-blue-800 text-sm">Recherchez et optimisez vos mots-clés stratégiques</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">📄 Contenu</h4>
            <p className="text-blue-800 text-sm">Créez du contenu de qualité et optimisé</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">⚡ Performance</h4>
            <p className="text-blue-800 text-sm">Optimisez la vitesse et l'expérience utilisateur</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">🔗 Liens</h4>
            <p className="text-blue-800 text-sm">Développez votre profil de liens entrants</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyseSEO;