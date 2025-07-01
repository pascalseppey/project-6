import React from 'react';
import { Heart, Zap, Target, Shield, Users, TrendingUp } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 font-sans">
      {/* Header */}
      <header className="relative z-10 px-6 py-8">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Beezia
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-slate-600 hover:text-purple-600 transition-colors">Dashboard</a>
            <a href="#" className="text-slate-600 hover:text-purple-600 transition-colors">Analytics</a>
            <a href="#" className="text-slate-600 hover:text-purple-600 transition-colors">Competitors</a>
            <button className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all duration-200">
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  Let's fight,
                  <br />
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    but always
                  </span>
                  <br />
                  <span className="flex items-center gap-3">
                    with love
                    <Heart className="w-12 h-12 text-red-500 fill-current animate-pulse" />
                  </span>
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed">
                  Analysez vos concurrents avec intelligence et bienveillance. 
                  Beezia vous aide à comprendre votre marché pour mieux vous positionner, 
                  sans jamais perdre de vue l'esprit de fair-play.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2">
                  <Target className="w-5 h-5" />
                  Commencer l'analyse
                </button>
                <button className="border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 transition-all duration-200 flex items-center justify-center gap-2">
                  <Users className="w-5 h-5" />
                  Voir la démo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900 mb-1">500+</div>
                  <div className="text-sm text-slate-600">Entreprises analysées</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900 mb-1">98%</div>
                  <div className="text-sm text-slate-600">Précision des données</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900 mb-1">24h</div>
                  <div className="text-sm text-slate-600">Temps d'analyse</div>
                </div>
              </div>
            </div>

            {/* Right Content - Bee Illustration */}
            <div className="relative">
              <div className="relative z-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-3xl p-12 shadow-2xl">
                {/* Bee SVG Illustration */}
                <div className="text-center">
                  <div className="relative inline-block">
                    {/* Bee Body */}
                    <div className="w-32 h-48 mx-auto relative">
                      {/* Wings */}
                      <div className="absolute -top-4 left-4 w-16 h-12 bg-white/30 rounded-full transform -rotate-12 animate-pulse"></div>
                      <div className="absolute -top-4 right-4 w-16 h-12 bg-white/30 rounded-full transform rotate-12 animate-pulse"></div>
                      
                      {/* Head */}
                      <div className="w-20 h-20 bg-yellow-400 rounded-full mx-auto mb-2 relative">
                        {/* Eyes */}
                        <div className="absolute top-4 left-3 w-3 h-3 bg-black rounded-full"></div>
                        <div className="absolute top-4 right-3 w-3 h-3 bg-black rounded-full"></div>
                        {/* Smile */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-3 border-b-2 border-black rounded-full"></div>
                        {/* Antennae */}
                        <div className="absolute -top-2 left-6 w-1 h-4 bg-black rounded-full"></div>
                        <div className="absolute -top-2 right-6 w-1 h-4 bg-black rounded-full"></div>
                        <div className="absolute -top-4 left-6 w-2 h-2 bg-black rounded-full"></div>
                        <div className="absolute -top-4 right-6 w-2 h-2 bg-black rounded-full"></div>
                      </div>
                      
                      {/* Body */}
                      <div className="w-16 h-24 bg-yellow-400 rounded-full mx-auto relative">
                        {/* Stripes */}
                        <div className="absolute top-2 left-0 right-0 h-2 bg-black rounded-full"></div>
                        <div className="absolute top-8 left-0 right-0 h-2 bg-black rounded-full"></div>
                        <div className="absolute top-14 left-0 right-0 h-2 bg-black rounded-full"></div>
                        <div className="absolute bottom-2 left-0 right-0 h-2 bg-black rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">Beezia Analytics</h3>
                    <p className="text-white/80">Votre partenaire d'analyse concurrentielle</p>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-purple-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 -right-8 w-8 h-8 bg-blue-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Pourquoi choisir Beezia ?
            </h3>
            <p className="text-xl text-slate-600">
              Une approche unique de l'analyse concurrentielle
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/60 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">Analyse Éthique</h4>
              <p className="text-slate-600">
                Nous respectons la confidentialité et analysons uniquement les données publiques 
                avec une approche transparente et éthique.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/60 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">Insights Précis</h4>
              <p className="text-slate-600">
                Des analyses détaillées sur 8 critères clés pour comprendre 
                les forces et faiblesses de vos concurrents.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/60 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-emerald-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">Esprit Fair-Play</h4>
              <p className="text-slate-600">
                Notre philosophie : comprendre pour mieux collaborer et innover, 
                pas pour nuire à la concurrence.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;