import React, { useState, useEffect } from 'react';
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import DashboardPage from './pages/DashboardPage';
import InfosGenerales from './pages/InfosGenerales';
import Localisation from './pages/Localisation';
import DesignBranding from './pages/DesignBranding';
import ReseauxSociaux from './pages/ReseauxSociaux';
import Concurrents from './pages/Concurrents';
import PlanDeSite from './pages/PlanDeSite';
import TexteSEO from './pages/TexteSEO';
import AnalyseSEO from './pages/AnalyseSEO';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState('https://www.google.ch');
  const [progressSteps, setProgressSteps] = useState({
    siteWeb: 0,
    corporateId: 0,
    ficheGmb: 0,
    avisClients: 0
  });
  const [currentStep, setCurrentStep] = useState('');

  // Mettre à jour l'heure toutes les secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Animation séquentielle des cercles de progression (mode simulation)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setProgressSteps(prev => {
          const newProgress = { ...prev };
          
          // Étape 1: Site Web (0-100% en 15 secondes)
          if (newProgress.siteWeb < 100) {
            newProgress.siteWeb = Math.min(100, newProgress.siteWeb + (100 / 150));
            setCurrentStep('siteWeb');
          }
          // Étape 2: Corporate ID (0-100% en 15 secondes)
          else if (newProgress.corporateId < 100) {
            newProgress.corporateId = Math.min(100, newProgress.corporateId + (100 / 150));
            setCurrentStep('corporateId');
          }
          // Étape 3: Fiche(s) GMB (0-100% en 15 secondes)
          else if (newProgress.ficheGmb < 100) {
            newProgress.ficheGmb = Math.min(100, newProgress.ficheGmb + (100 / 150));
            setCurrentStep('ficheGmb');
          }
          // Étape 4: Avis clients (0-100% en 15 secondes)
          else if (newProgress.avisClients < 100) {
            newProgress.avisClients = Math.min(100, newProgress.avisClients + (100 / 150));
            setCurrentStep('avisClients');
          }
          // Fin de l'animation
          else {
            setIsLoading(false);
            setCurrentStep('');
          }
          
          return newProgress;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleLetsFightClick = () => {
    setProgressSteps({
      siteWeb: 0,
      corporateId: 0,
      ficheGmb: 0,
      avisClients: 0
    });
    setCurrentStep('');
    setIsLoading(true);
  };

  // Fonction pour rendre le contenu principal
  const renderMainContent = () => {
    switch (activeTab) {
      case 'Infos générales':
        return <InfosGenerales />;
      case 'Localisation':
        return <Localisation />;
      case 'Design & Branding':
        return <DesignBranding />;
      case 'Réseaux sociaux':
        return <ReseauxSociaux />;
      case 'Concurrents':
        return <Concurrents />;
      case 'Plan de site':
        return <PlanDeSite />;
      case 'Texte SEO':
        return <TexteSEO />;
      case 'Analyse SEO':
        return <AnalyseSEO />;
      case 'Dashboard':
      case "Let's Fight !":
      default:
        return (
          <DashboardPage
            activeTab={activeTab}
            isLoading={isLoading}
            websiteUrl={websiteUrl}
            setWebsiteUrl={setWebsiteUrl}
            handleLetsFightClick={handleLetsFightClick}
            progressSteps={progressSteps}
            currentStep={currentStep}
            setProgressSteps={setProgressSteps}
            setCurrentStep={setCurrentStep}
            setIsLoading={setIsLoading}
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 font-inter">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-hidden flex flex-col">
        <Header currentTime={currentTime} />
        <div className="flex-1 overflow-y-auto">
          {renderMainContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;