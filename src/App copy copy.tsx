import React, { useState } from 'react';
import SitemapManager from './components/SitemapManager';
import ContentBuilder from './components/ContentBuilder';
import { FolderOpen, Layout } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'sitemap' | 'builder'>('sitemap');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('sitemap')}
              className={`
                flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors
                ${activeTab === 'sitemap' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <FolderOpen className="w-4 h-4" />
              Structure du site
            </button>
            <button
              onClick={() => setActiveTab('builder')}
              className={`
                flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors
                ${activeTab === 'builder' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <Layout className="w-4 h-4" />
              Builder de contenu
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'sitemap' ? <SitemapManager /> : <ContentBuilder />}
    </div>
  );
}

export default App;