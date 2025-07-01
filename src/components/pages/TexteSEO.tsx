import React, { useState } from 'react';
import { Edit3, Type, Search, Save, X, Plus, Trash2, Copy, CheckCircle, AlertTriangle, FileText, Key, Tag } from 'lucide-react';
import { ContentBlock } from '../types/builder';
import ContentBlockItem from '../ContentBlockItem';

interface Page {
  id: string;
  name: string;
  slug: string;
  level: number;
  type: 'home' | 'page';
}

interface PageSEOData {
  pageId: string;
  title: string;
  metaDescription: string;
  h1: string;
  keywords: string[];
  content: ContentBlock[];
}

interface KeywordAnalysis {
  keyword: string;
  density: number;
  count: number;
  status: 'good' | 'warning' | 'bad';
}

const TexteSEO: React.FC = () => {
  const [activePageId, setActivePageId] = useState('1');
  const [activeSubTab, setActiveSubTab] = useState<'container' | 'keywords' | 'meta'>('container');
  
  // Pages récupérées du plan du site
  const [pages] = useState<Page[]>([
    { id: '1', name: 'Accueil', slug: '/accueil', level: 1, type: 'home' },
    { id: '2', name: 'Services', slug: '/services', level: 1, type: 'page' },
    { id: '5', name: 'Développement Web', slug: '/services/developpement-web', level: 2, type: 'page' },
    { id: '6', name: 'Applications Mobile', slug: '/services/applications-mobile', level: 2, type: 'page' },
    { id: '7', name: 'React Native', slug: '/services/applications-mobile/react-native', level: 3, type: 'page' },
    { id: '8', name: 'Flutter', slug: '/services/applications-mobile/flutter', level: 3, type: 'page' },
    { id: '3', name: 'À Propos', slug: '/a-propos', level: 1, type: 'page' },
    { id: '9', name: 'Notre Équipe', slug: '/a-propos/equipe', level: 2, type: 'page' },
    { id: '4', name: 'Contact', slug: '/contact', level: 1, type: 'page' },
  ]);

  // Données SEO par page
  const [pagesData, setPagesData] = useState<{ [key: string]: PageSEOData }>({
    '1': {
      pageId: '1',
      title: 'Charly Gaillard - Développement Web & Marketing Digital',
      metaDescription: 'Spécialiste en développement web et marketing digital en Suisse. Création de sites modernes et optimisés SEO pour votre entreprise.',
      h1: 'Développement Web Professionnel en Suisse',
      keywords: ['développement web', 'site internet', 'marketing digital', 'SEO'],
      content: [
        {
          id: '1',
          type: 'container',
          columns: 1,
          order: 0,
          children: [
            {
              id: '2',
              type: 'text',
              content: 'Le développement web est un domaine en constante évolution. Chez Charly Gaillard, nous créons des sites internet modernes et responsive qui répondent aux exigences actuelles du web. Notre expertise en SEO vous garantit une visibilité optimale sur les moteurs de recherche.',
              parentId: '1',
              order: 0,
            }
          ]
        }
      ]
    },
    '2': {
      pageId: '2',
      title: 'Nos Services - Développement Web & Applications',
      metaDescription: 'Découvrez nos services de développement web, applications mobiles et marketing digital. Solutions sur mesure pour votre entreprise.',
      h1: 'Nos Services de Développement Digital',
      keywords: ['services web', 'développement', 'applications', 'consulting'],
      content: [
        {
          id: '3',
          type: 'text',
          content: 'Nos services couvrent tous les aspects du développement digital moderne.',
          order: 0,
        }
      ]
    }
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [keywordAnalysis, setKeywordAnalysis] = useState<KeywordAnalysis[]>([]);
  const [draggedBlock, setDraggedBlock] = useState<ContentBlock | null>(null);
  const [dragOverInfo, setDragOverInfo] = useState<{ blockId: string; position: 'above' | 'below' | 'inside' } | null>(null);

  const activePage = pages.find(p => p.id === activePageId);
  const activePageData = pagesData[activePageId] || {
    pageId: activePageId,
    title: '',
    metaDescription: '',
    h1: '',
    keywords: [],
    content: []
  };

  const subTabs = [
    { id: 'container' as const, label: 'Container', icon: Type },
    { id: 'keywords' as const, label: 'Mots-clés', icon: Key },
    { id: 'meta' as const, label: 'Titre & Metas', icon: Tag },
  ];

  // Fonction pour générer un nouvel ID unique
  const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

  // Fonction récursive pour trouver un bloc par ID
  const findBlockById = (blocks: ContentBlock[], id: string): ContentBlock | null => {
    for (const block of blocks) {
      if (block.id === id) return block;
      if (block.children) {
        const found = findBlockById(block.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  // Fonction récursive pour mettre à jour un bloc
  const updateBlockRecursive = (blocks: ContentBlock[], targetId: string, updater: (block: ContentBlock) => ContentBlock): ContentBlock[] => {
    return blocks.map(block => {
      if (block.id === targetId) {
        return updater(block);
      }
      if (block.children) {
        return {
          ...block,
          children: updateBlockRecursive(block.children, targetId, updater)
        };
      }
      return block;
    });
  };

  // Fonction récursive pour supprimer un bloc
  const removeBlockRecursive = (blocks: ContentBlock[], targetId: string): ContentBlock[] => {
    return blocks.filter(block => {
      if (block.id === targetId) return false;
      if (block.children) {
        block.children = removeBlockRecursive(block.children, targetId);
      }
      return true;
    });
  };

  // Fonction pour ajouter un nouveau bloc
  const addBlock = (type: 'container' | 'text' | 'image', parentId?: string) => {
    const newBlock: ContentBlock = {
      id: generateId(),
      type,
      order: 0,
      ...(type === 'container' && { columns: 1, children: [] }),
      ...(type === 'text' && { content: 'Nouveau texte SEO - cliquez pour éditer' }),
      ...(type === 'image' && { imageUrl: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800' }),
      ...(parentId && { parentId })
    };

    const updatedContent = [...activePageData.content];
    
    if (parentId) {
      // Ajouter dans un container existant
      const updatedBlocks = updateBlockRecursive(updatedContent, parentId, (container) => ({
        ...container,
        children: [...(container.children || []), newBlock]
      }));
      updatePageData('content', updatedBlocks);
    } else {
      // Ajouter au niveau racine
      updatePageData('content', [...updatedContent, newBlock]);
    }
  };

  // Gestionnaires de drag & drop
  const handleDragStart = (block: ContentBlock) => {
    setDraggedBlock(block);
  };

  const handleDragEnd = () => {
    setDraggedBlock(null);
    setDragOverInfo(null);
  };

  const handleDragOver = (e: React.DragEvent, blockId: string, position: 'above' | 'below' | 'inside') => {
    e.preventDefault();
    setDragOverInfo({ blockId, position });
  };

  const handleDrop = (e: React.DragEvent, targetId: string, position: 'above' | 'below' | 'inside') => {
    e.preventDefault();
    if (!draggedBlock) return;

    // Logique de réorganisation des blocs
    console.log('Drop:', { draggedBlock: draggedBlock.id, targetId, position });
    
    handleDragEnd();
  };

  // Gestionnaire de suppression
  const handleDelete = (blockId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce bloc ?')) {
      const updatedContent = removeBlockRecursive(activePageData.content, blockId);
      updatePageData('content', updatedContent);
    }
  };

  // Gestionnaire de mise à jour du contenu
  const handleContentUpdate = (blockId: string, content: string) => {
    const updatedContent = updateBlockRecursive(activePageData.content, blockId, (block) => ({
      ...block,
      content
    }));
    updatePageData('content', updatedContent);
  };

  // Gestionnaire de mise à jour de l'image
  const handleImageUpdate = (blockId: string, imageUrl: string) => {
    const updatedContent = updateBlockRecursive(activePageData.content, blockId, (block) => ({
      ...block,
      imageUrl
    }));
    updatePageData('content', updatedContent);
  };

  // Gestionnaire de changement de colonnes
  const handleColumnsChange = (blockId: string, columns: number) => {
    const updatedContent = updateBlockRecursive(activePageData.content, blockId, (block) => ({
      ...block,
      columns
    }));
    updatePageData('content', updatedContent);
  };

  // Fonction pour mettre à jour les données d'une page
  const updatePageData = (field: keyof PageSEOData, value: any) => {
    setPagesData(prev => ({
      ...prev,
      [activePageId]: {
        ...prev[activePageId],
        [field]: value
      }
    }));
  };

  // Fonction pour ajouter un mot-clé
  const handleAddKeyword = (keyword: string) => {
    if (keyword.trim() && !activePageData.keywords.includes(keyword.trim())) {
      const updatedKeywords = [...activePageData.keywords, keyword.trim()];
      updatePageData('keywords', updatedKeywords);
    }
  };

  // Fonction pour supprimer un mot-clé
  const handleRemoveKeyword = (keyword: string) => {
    const updatedKeywords = activePageData.keywords.filter(k => k !== keyword);
    updatePageData('keywords', updatedKeywords);
  };

  // Fonction pour analyser le contenu
  const handleAnalyzeContent = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      // Simuler une analyse
      const analysis = activePageData.keywords.map(keyword => {
        const density = Math.random() * 3;
        const count = Math.floor(density * 3);
        let status: 'good' | 'warning' | 'bad' = 'bad';
        
        if (density > 2) status = 'good';
        else if (density > 1) status = 'warning';
        
        return { keyword, density, count, status };
      });
      
      setKeywordAnalysis(analysis);
      setIsAnalyzing(false);
    }, 1500);
  };

  // Fonction pour obtenir tout le texte des blocs
  const getAllText = (): string => {
    const extractText = (blocks: ContentBlock[]): string => {
      return blocks.map(block => {
        if (block.type === 'text') {
          return block.content || '';
        } else if (block.type === 'container' && block.children) {
          return extractText(block.children);
        }
        return '';
      }).join(' ');
    };
    
    return extractText(activePageData.content);
  };

  // Calculer le nombre total de mots
  const totalWords = getAllText().split(/\s+/).filter(word => word.length > 0).length;

  // Fonction pour obtenir l'indentation selon le niveau
  const getPageIndentation = (level: number) => {
    switch (level) {
      case 1: return 'pl-0';
      case 2: return 'pl-6';
      case 3: return 'pl-12';
      default: return 'pl-0';
    }
  };

  // Fonction pour obtenir la couleur selon le niveau
  const getPageColor = (level: number) => {
    switch (level) {
      case 1: return 'border-l-4 border-blue-500 bg-blue-50';
      case 2: return 'border-l-4 border-green-500 bg-green-50';
      case 3: return 'border-l-4 border-orange-500 bg-orange-50';
      default: return 'border-l-4 border-gray-500 bg-gray-50';
    }
  };

  const renderSubTabContent = () => {
    switch (activeSubTab) {
      case 'container':
        return (
          <div className="space-y-6">
            {/* Toolbar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Éditeur de contenu SEO</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => addBlock('container')}
                  className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Container
                </button>
                <button
                  onClick={() => addBlock('text')}
                  className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  <Type className="w-4 h-4" />
                  Texte
                </button>
              </div>
            </div>
            
            {/* Content Blocks */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="space-y-4">
                {activePageData.content.map((block) => (
                  <ContentBlockItem
                    key={block.id}
                    block={block}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onDelete={handleDelete}
                    onContentUpdate={handleContentUpdate}
                    onImageUpdate={handleImageUpdate}
                    onColumnsChange={handleColumnsChange}
                    onAddChild={addBlock}
                    isDragging={draggedBlock?.id === block.id}
                    dragOverPosition={
                      dragOverInfo?.blockId === block.id ? dragOverInfo.position : undefined
                    }
                  />
                ))}
                
                {activePageData.content.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <Type className="w-16 h-16 mx-auto" />
                    </div>
                    <p className="text-gray-500 mb-4">Aucun contenu pour le moment</p>
                    <p className="text-sm text-gray-400">Utilisez les boutons ci-dessus pour ajouter du contenu</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'keywords':
        return (
          <div className="space-y-6">
            {/* Gestion des mots-clés */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Mots-clés de la page</h3>
              
              {/* Ajouter un mot-clé */}
              <div className="mb-6">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Ajouter un mot-clé"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAddKeyword((e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                  />
                  <button
                    onClick={(e) => {
                      const input = (e.target as HTMLButtonElement).previousElementSibling as HTMLInputElement;
                      handleAddKeyword(input.value);
                      input.value = '';
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Liste des mots-clés */}
              <div className="flex flex-wrap gap-2 mb-6">
                {activePageData.keywords.map((keyword, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
                  >
                    <span className="text-sm">{keyword}</span>
                    <button
                      onClick={() => handleRemoveKeyword(keyword)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                
                {activePageData.keywords.length === 0 && (
                  <p className="text-sm text-gray-500 italic">Aucun mot-clé défini pour cette page</p>
                )}
              </div>

              {/* Bouton d'analyse */}
              <button
                onClick={handleAnalyzeContent}
                disabled={isAnalyzing}
                className={`
                  flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg 
                  hover:bg-blue-700 transition-colors
                  ${isAnalyzing ? 'opacity-70 cursor-wait' : ''}
                `}
              >
                <Search className="w-4 h-4" />
                {isAnalyzing ? 'Analyse en cours...' : 'Analyser les mots-clés'}
              </button>
            </div>

            {/* Résultats de l'analyse */}
            {keywordAnalysis.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Analyse des mots-clés</h3>
                
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Mot-clé
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Occurrences
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Densité
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Statut
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {keywordAnalysis.map((analysis, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {analysis.keyword}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {analysis.count} fois
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {analysis.density.toFixed(1)}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {analysis.status === 'good' ? (
                              <span className="flex items-center text-green-600">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Bon
                              </span>
                            ) : analysis.status === 'warning' ? (
                              <span className="flex items-center text-yellow-600">
                                <AlertTriangle className="w-4 h-4 mr-1" />
                                À améliorer
                              </span>
                            ) : (
                              <span className="flex items-center text-red-600">
                                <AlertTriangle className="w-4 h-4 mr-1" />
                                Insuffisant
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Statistiques */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistiques du contenu</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{totalWords}</div>
                  <div className="text-sm text-gray-600">Nombre de mots</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{activePageData.keywords.length}</div>
                  <div className="text-sm text-gray-600">Mots-clés ciblés</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">{activePageData.content.length}</div>
                  <div className="text-sm text-gray-600">Blocs de contenu</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'meta':
        return (
          <div className="space-y-6">
            {/* Titre de la page */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Titre de la page (Title)</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre SEO (60 caractères max recommandés)
                  </label>
                  <input
                    type="text"
                    value={activePageData.title}
                    onChange={(e) => updatePageData('title', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Titre optimisé pour le SEO"
                  />
                  <div className="mt-2 flex justify-between items-center">
                    <span className={`text-sm ${
                      activePageData.title.length > 60 ? 'text-red-600' : 
                      activePageData.title.length > 50 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {activePageData.title.length} caractères
                    </span>
                    {activePageData.title.length > 60 && (
                      <span className="text-sm text-red-600">Trop long pour Google</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Meta description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Meta Description</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description SEO (155 caractères max recommandés)
                  </label>
                  <textarea
                    value={activePageData.metaDescription}
                    onChange={(e) => updatePageData('metaDescription', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Description attractive qui apparaîtra dans les résultats de recherche"
                  />
                  <div className="mt-2 flex justify-between items-center">
                    <span className={`text-sm ${
                      activePageData.metaDescription.length > 155 ? 'text-red-600' : 
                      activePageData.metaDescription.length > 140 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {activePageData.metaDescription.length} caractères
                    </span>
                    {activePageData.metaDescription.length > 155 && (
                      <span className="text-sm text-red-600">Trop long pour Google</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* H1 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Titre H1</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre principal de la page (H1)
                  </label>
                  <input
                    type="text"
                    value={activePageData.h1}
                    onChange={(e) => updatePageData('h1', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Titre principal visible sur la page"
                  />
                  <p className="mt-2 text-sm text-gray-600">
                    Le H1 doit être unique et contenir votre mot-clé principal
                  </p>
                </div>
              </div>
            </div>

            {/* Aperçu SERP */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Aperçu dans Google</h3>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="space-y-2">
                  <div className="text-blue-600 text-lg hover:underline cursor-pointer">
                    {activePageData.title || 'Titre de la page'}
                  </div>
                  <div className="text-green-700 text-sm">
                    {window.location.origin}{activePage?.slug || '/'}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {activePageData.metaDescription || 'Meta description de la page...'}
                  </div>
                </div>
              </div>
            </div>

            {/* Conseils SEO */}
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Conseils pour les métadonnées</h3>
              <ul className="text-blue-800 space-y-2 text-sm">
                <li>• <strong>Titre :</strong> Incluez votre mot-clé principal au début</li>
                <li>• <strong>Meta description :</strong> Rédigez un texte attractif qui incite au clic</li>
                <li>• <strong>H1 :</strong> Doit être différent du titre SEO mais complémentaire</li>
                <li>• <strong>Unicité :</strong> Chaque page doit avoir des métadonnées uniques</li>
                <li>• <strong>Longueur :</strong> Respectez les limites pour éviter la troncature</li>
              </ul>
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
              <h1 className="text-4xl font-bold text-white mb-2">Texte SEO</h1>
              <p className="text-blue-100 text-lg">Optimisez le contenu et les métadonnées de vos pages</p>
            </div>
          </div>
          
          {/* Zone droite avec bouton d'action */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleAnalyzeContent}
              disabled={isAnalyzing}
              className={`
                flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl 
                border border-white/30 hover:bg-white/30 transition-all duration-200 font-semibold
                ${isAnalyzing ? 'opacity-70 cursor-wait' : ''}
              `}
            >
              <Search className="w-5 h-5" />
              {isAnalyzing ? 'Analyse en cours...' : 'Analyser la page'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar - Liste des pages */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Pages du site
            </h2>
            
            <div className="space-y-2">
              {pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => setActivePageId(page.id)}
                  className={`
                    w-full text-left p-3 rounded-lg transition-all duration-200 
                    ${getPageIndentation(page.level)}
                    ${activePageId === page.id 
                      ? `${getPageColor(page.level)} shadow-sm` 
                      : 'hover:bg-gray-50 border border-transparent'
                    }
                  `}
                >
                  <div className="flex items-center space-x-2">
                    {page.type === 'home' ? (
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    ) : (
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    )}
                    <span className={`text-sm font-medium ${
                      activePageId === page.id ? 'text-gray-900' : 'text-gray-700'
                    }`}>
                      {page.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Statistiques de la page active */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Page actuelle</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mots-clés :</span>
                  <span className="font-medium">{activePageData.keywords.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Contenu :</span>
                  <span className="font-medium">{totalWords} mots</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Titre :</span>
                  <span className={`font-medium ${
                    activePageData.title.length > 60 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {activePageData.title.length}/60
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Meta :</span>
                  <span className={`font-medium ${
                    activePageData.metaDescription.length > 155 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {activePageData.metaDescription.length}/155
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="lg:col-span-3">
          {/* En-tête de la page active */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {activePage?.name || 'Page non trouvée'}
            </h2>
          </div>

          {/* Onglets de second niveau */}
          <div className="mb-8">
            <nav className="flex bg-gray-100 p-1 rounded-xl" aria-label="Sub Tabs">
              {subTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeSubTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSubTab(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-lg'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Contenu de l'onglet actif */}
          {renderSubTabContent()}
        </div>
      </div>
    </div>
  );
};

export default TexteSEO;