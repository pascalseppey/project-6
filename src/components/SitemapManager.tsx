import React, { useState, useRef, useEffect } from 'react';
import { FolderOpen, Plus } from 'lucide-react';
import { Page, DraggedItem } from '../types/sitemap';
import SitemapItem from './SitemapItem';
import SitemapZones from './SitemapZones';

const initialPages: Page[] = [
  {
    id: '1',
    name: 'Accueil',
    slug: '/accueil',
    level: 1,
    type: 'home',
    isFixed: true,
    order: 0,
  },
  {
    id: '2',
    name: 'Services',
    slug: '/services',
    level: 1,
    type: 'page',
    isFixed: false,
    order: 1,
  },
  {
    id: '5',
    name: 'Développement Web',
    slug: '/services/developpement-web',
    level: 2,
    type: 'page',
    isFixed: false,
    order: 2,
  },
  {
    id: '6',
    name: 'Applications Mobile',
    slug: '/services/applications-mobile',
    level: 2,
    type: 'page',
    isFixed: false,
    order: 3,
  },
  {
    id: '7',
    name: 'React Native',
    slug: '/services/applications-mobile/react-native',
    level: 3,
    type: 'page',
    isFixed: false,
    order: 4,
  },
  {
    id: '8',
    name: 'Flutter',
    slug: '/services/applications-mobile/flutter',
    level: 3,
    type: 'page',
    isFixed: false,
    order: 5,
  },
  {
    id: '3',
    name: 'À Propos',
    slug: '/a-propos',
    level: 1,
    type: 'page',
    isFixed: false,
    order: 6,
  },
  {
    id: '9',
    name: 'Notre Équipe',
    slug: '/a-propos/equipe',
    level: 2,
    type: 'page',
    isFixed: false,
    order: 7,
  },
  {
    id: '4',
    name: 'Contact',
    slug: '/contact',
    level: 1,
    type: 'page',
    isFixed: false,
    order: 8,
  },
];

export default function SitemapManager() {
  const [pages, setPages] = useState<Page[]>(initialPages);
  const [draggedPage, setDraggedPage] = useState<Page | null>(null);
  const [dragOverInfo, setDragOverInfo] = useState<{ pageId: string; position: 'above' | 'below' } | null>(null);
  const [isOverZone, setIsOverZone] = useState(false);
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null);
  const [currentZoneLevel, setCurrentZoneLevel] = useState<1 | 2 | 3 | null>(null);
  const [dragStartPosition, setDragStartPosition] = useState<{ x: number; y: number } | null>(null);
  const [currentDragPosition, setCurrentDragPosition] = useState<{ x: number; y: number } | null>(null);
  const [isHorizontalDrag, setIsHorizontalDrag] = useState(false);
  const dragCounter = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fonction pour trouver le parent logique d'une page
  const findLogicalParent = (pageIndex: number, pageLevel: number, allPages: Page[]): Page | null => {
    // Chercher vers le haut pour trouver une page de niveau inférieur
    for (let i = pageIndex - 1; i >= 0; i--) {
      const candidateParent = allPages[i];
      if (candidateParent.level < pageLevel) {
        return candidateParent;
      }
    }
    return null;
  };

  // Fonction pour valider et corriger la hiérarchie
  const validateAndFixHierarchy = (updatedPages: Page[]): Page[] => {
    const fixedPages = [...updatedPages];
    
    for (let i = 0; i < fixedPages.length; i++) {
      const currentPage = fixedPages[i];
      
      // Si c'est une page de niveau 2 ou 3, vérifier qu'elle a un parent approprié
      if (currentPage.level > 1) {
        const requiredParentLevel = currentPage.level - 1;
        let hasValidParent = false;
        
        // Chercher un parent valide au-dessus
        for (let j = i - 1; j >= 0; j--) {
          const potentialParent = fixedPages[j];
          if (potentialParent.level === requiredParentLevel) {
            hasValidParent = true;
            break;
          }
          // Si on trouve une page de niveau inférieur ou égal, on arrête la recherche
          if (potentialParent.level <= requiredParentLevel) {
            break;
          }
        }
        
        // Si pas de parent valide, réduire le niveau
        if (!hasValidParent) {
          console.log(`Page "${currentPage.name}" n'a pas de parent niveau ${requiredParentLevel}, réduction au niveau ${requiredParentLevel}`);
          fixedPages[i] = { ...currentPage, level: requiredParentLevel as 1 | 2 | 3 };
          
          // Récursivement vérifier cette page avec son nouveau niveau
          i--; // Revérifier cette page
        }
      }
    }
    
    return fixedPages;
  };

  // Fonction pour mettre à jour automatiquement les slugs basés sur la hiérarchie
  const updateSlugsBasedOnHierarchy = (updatedPages: Page[]): Page[] => {
    const pagesWithUpdatedSlugs = [...updatedPages];
    
    for (let i = 0; i < pagesWithUpdatedSlugs.length; i++) {
      const currentPage = pagesWithUpdatedSlugs[i];
      
      // Ne pas modifier les pages fixes ou de niveau 1
      if (currentPage.isFixed || currentPage.level === 1) {
        continue;
      }
      
      // Trouver le parent logique
      const parent = findLogicalParent(i, currentPage.level, pagesWithUpdatedSlugs);
      
      if (parent) {
        // Créer le nouveau slug basé sur le parent
        const parentSlug = parent.slug.replace(/^\//, ''); // Enlever le / initial
        const currentPageName = currentPage.name.toLowerCase()
          .replace(/[àáâãäå]/g, 'a')
          .replace(/[èéêë]/g, 'e')
          .replace(/[ìíîï]/g, 'i')
          .replace(/[òóôõö]/g, 'o')
          .replace(/[ùúûü]/g, 'u')
          .replace(/[ç]/g, 'c')
          .replace(/[^a-z0-9]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
        
        const newSlug = `/${parentSlug}/${currentPageName}`;
        
        if (newSlug !== currentPage.slug) {
          console.log(`Mise à jour du slug de "${currentPage.name}": ${currentPage.slug} → ${newSlug}`);
          pagesWithUpdatedSlugs[i] = { ...currentPage, slug: newSlug };
        }
      }
    }
    
    return pagesWithUpdatedSlugs;
  };

  // Fonction pour générer un slug à partir d'un nom
  const generateSlugFromName = (name: string): string => {
    return name.toLowerCase()
      .replace(/[àáâãäå]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôõö]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  // Gestionnaire de drop global pour capturer les drops "dans le vide"
  useEffect(() => {
    const handleGlobalDrop = (e: DragEvent) => {
      e.preventDefault();
      
      if (!draggedPage || !isHorizontalDrag) return;

      console.log('Global drop detected for horizontal drag');
      
      if (dragStartPosition && currentDragPosition) {
        const deltaX = currentDragPosition.x - dragStartPosition.x;
        const deltaY = Math.abs(currentDragPosition.y - dragStartPosition.y);
        const horizontalThreshold = 30;
        
        console.log('Global drop analysis:', { deltaX, deltaY, horizontalThreshold, isHorizontalDrag });
        
        if (Math.abs(deltaX) > horizontalThreshold && Math.abs(deltaX) > deltaY) {
          // This was a horizontal drag - change level
          let newLevel = draggedPage.level;
          
          if (deltaX > 0 && draggedPage.level < 3) {
            // Moving right - increase level
            newLevel = (draggedPage.level + 1) as 1 | 2 | 3;
            console.log('Global drop: Increasing level from', draggedPage.level, 'to', newLevel);
          } else if (deltaX < 0 && draggedPage.level > 1) {
            // Moving left - decrease level
            newLevel = (draggedPage.level - 1) as 1 | 2 | 3;
            console.log('Global drop: Decreasing level from', draggedPage.level, 'to', newLevel);
          }
          
          if (newLevel !== draggedPage.level) {
            console.log('Global drop: Updating page level:', { pageId: draggedPage.id, oldLevel: draggedPage.level, newLevel });
            setPages(prevPages => {
              let updatedPages = prevPages.map(page => 
                page.id === draggedPage.id 
                  ? { ...page, level: newLevel }
                  : page
              );
              
              // Valider et corriger la hiérarchie
              updatedPages = validateAndFixHierarchy(updatedPages);
              
              // Mettre à jour les slugs
              updatedPages = updateSlugsBasedOnHierarchy(updatedPages);
              
              return updatedPages;
            });
          }
        }
      }
      
      handleDragEnd();
    };

    const handleGlobalDragOver = (e: DragEvent) => {
      if (isHorizontalDrag) {
        e.preventDefault();
      }
    };

    // Ajouter les gestionnaires globaux
    document.addEventListener('drop', handleGlobalDrop);
    document.addEventListener('dragover', handleGlobalDragOver);

    // Nettoyer les gestionnaires
    return () => {
      document.removeEventListener('drop', handleGlobalDrop);
      document.removeEventListener('dragover', handleGlobalDragOver);
    };
  }, [draggedPage, isHorizontalDrag, dragStartPosition, currentDragPosition]);

  const handleDragStart = (page: Page, e?: React.DragEvent) => {
    setDraggedPage(page);
    setIsOverZone(false);
    setDragDirection(null);
    setCurrentZoneLevel(null);
    setIsHorizontalDrag(false);
    
    if (e) {
      setDragStartPosition({ x: e.clientX, y: e.clientY });
      console.log('Drag start position:', { x: e.clientX, y: e.clientY, pageLevel: page.level });
    }
  };

  const handleDragEnd = () => {
    console.log('Drag ended');
    setDraggedPage(null);
    setDragOverInfo(null);
    setIsOverZone(false);
    setDragDirection(null);
    setCurrentZoneLevel(null);
    setDragStartPosition(null);
    setCurrentDragPosition(null);
    setIsHorizontalDrag(false);
    dragCounter.current = 0;
  };

  const handleDrag = (e: React.DragEvent) => {
    if (dragStartPosition && e.clientX !== 0 && e.clientY !== 0) {
      setCurrentDragPosition({ x: e.clientX, y: e.clientY });
      
      const deltaX = e.clientX - dragStartPosition.x;
      const deltaY = Math.abs(e.clientY - dragStartPosition.y);
      
      console.log('Drag movement:', { 
        deltaX, 
        deltaY, 
        currentLevel: draggedPage?.level,
        canIncreaseLevel: draggedPage && draggedPage.level < 3,
        canDecreaseLevel: draggedPage && draggedPage.level > 1
      });
      
      // Seuil minimum pour détecter le mouvement horizontal
      const horizontalThreshold = 30;
      
      // Determine if this is primarily horizontal movement
      if (Math.abs(deltaX) > horizontalThreshold && Math.abs(deltaX) > deltaY) {
        // Horizontal movement - level change
        setIsHorizontalDrag(true);
        
        if (deltaX > 0 && draggedPage && draggedPage.level < 3) {
          // Moving right - can increase level
          console.log('Setting direction to RIGHT (increase level)');
          setDragDirection('right');
          setIsOverZone(false);
        } else if (deltaX < 0 && draggedPage && draggedPage.level > 1) {
          // Moving left - can decrease level
          console.log('Setting direction to LEFT (decrease level)');
          setDragDirection('left');
          setIsOverZone(false);
        } else {
          // Movement not allowed (already at min/max level)
          console.log('Movement not allowed - resetting direction');
          setDragDirection(null);
          setIsOverZone(false);
        }
      } else if (Math.abs(deltaX) <= horizontalThreshold) {
        // Vertical movement or no significant horizontal movement - order change
        console.log('Vertical movement detected');
        setIsHorizontalDrag(false);
        setDragDirection(null);
        setIsOverZone(false);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent, pageId?: string, position?: 'above' | 'below') => {
    e.preventDefault();
    
    if (pageId && position && !isHorizontalDrag) {
      const targetPage = pages.find(p => p.id === pageId);
      if (targetPage?.isFixed && position === 'above') {
        return; // Can't drop above fixed home page
      }
      setDragOverInfo({ pageId, position });
      setIsOverZone(false);
      setDragDirection(null);
    }
  };

  const handleDrop = (e: React.DragEvent, pageId?: string, position?: 'above' | 'below') => {
    e.preventDefault();
    e.stopPropagation(); // Empêcher la propagation vers le gestionnaire global
    
    if (!draggedPage) return;

    console.log('Local drop detected:', { 
      dragStartPosition, 
      currentDragPosition, 
      dragDirection,
      isHorizontalDrag,
      pageId, 
      position 
    });

    // Check if this was a horizontal drag (level change)
    if (isHorizontalDrag && dragStartPosition && currentDragPosition) {
      const deltaX = currentDragPosition.x - dragStartPosition.x;
      const deltaY = Math.abs(currentDragPosition.y - dragStartPosition.y);
      const horizontalThreshold = 30;
      
      console.log('Local drop analysis:', { deltaX, deltaY, horizontalThreshold, isHorizontalDrag });
      
      if (Math.abs(deltaX) > horizontalThreshold && Math.abs(deltaX) > deltaY) {
        // This was a horizontal drag - change level
        let newLevel = draggedPage.level;
        
        if (deltaX > 0 && draggedPage.level < 3) {
          // Moving right - increase level
          newLevel = (draggedPage.level + 1) as 1 | 2 | 3;
          console.log('Local drop: Increasing level from', draggedPage.level, 'to', newLevel);
        } else if (deltaX < 0 && draggedPage.level > 1) {
          // Moving left - decrease level
          newLevel = (draggedPage.level - 1) as 1 | 2 | 3;
          console.log('Local drop: Decreasing level from', draggedPage.level, 'to', newLevel);
        }
        
        if (newLevel !== draggedPage.level) {
          console.log('Local drop: Updating page level:', { pageId: draggedPage.id, oldLevel: draggedPage.level, newLevel });
          setPages(prevPages => {
            let updatedPages = prevPages.map(page => 
              page.id === draggedPage.id 
                ? { ...page, level: newLevel }
                : page
            );
            
            // Valider et corriger la hiérarchie
            updatedPages = validateAndFixHierarchy(updatedPages);
            
            // Mettre à jour les slugs
            updatedPages = updateSlugsBasedOnHierarchy(updatedPages);
            
            return updatedPages;
          });
        }
        
        handleDragEnd();
        return;
      }
    }

    // This was a vertical drag - change order
    if (pageId && position && !isHorizontalDrag) {
      const targetPage = pages.find(p => p.id === pageId);
      if (targetPage?.isFixed && position === 'above') {
        return; // Can't drop above fixed home page
      }

      console.log('Reordering pages');
      // Reorder pages
      let updatedPages = [...pages];
      const draggedIndex = updatedPages.findIndex(p => p.id === draggedPage.id);
      const targetIndex = updatedPages.findIndex(p => p.id === pageId);
      
      if (draggedIndex !== -1 && targetIndex !== -1) {
        const [movedPage] = updatedPages.splice(draggedIndex, 1);
        const insertIndex = position === 'above' ? targetIndex : targetIndex + 1;
        updatedPages.splice(insertIndex, 0, movedPage);
        
        // Update order values
        updatedPages.forEach((page, index) => {
          page.order = index;
        });
        
        // Valider et corriger la hiérarchie après réorganisation
        updatedPages = validateAndFixHierarchy(updatedPages);
        
        // Mettre à jour les slugs
        updatedPages = updateSlugsBasedOnHierarchy(updatedPages);
        
        setPages(updatedPages);
      }
    }

    handleDragEnd();
  };

  const handleZoneDragOver = (e: React.DragEvent, level: 1 | 2 | 3) => {
    e.preventDefault();
    setIsOverZone(true);
    setDragOverInfo(null);
    setCurrentZoneLevel(level);
    
    // Determine drag direction based on current page level and target level
    if (draggedPage) {
      if (level < draggedPage.level) {
        setDragDirection('left'); // Moving to lower level
      } else if (level > draggedPage.level) {
        setDragDirection('right'); // Moving to higher level
      } else {
        setDragDirection(null); // Same level
      }
    }
  };

  const handleZoneDrop = (e: React.DragEvent, level: 1 | 2 | 3) => {
    e.preventDefault();
    e.stopPropagation(); // Empêcher la propagation vers le gestionnaire global
    
    if (!draggedPage) return;

    console.log('Zone drop:', { fromLevel: draggedPage.level, toLevel: level });

    // Update the page level
    setPages(prevPages => {
      let updatedPages = prevPages.map(page => 
        page.id === draggedPage.id 
          ? { ...page, level }
          : page
      );
      
      // Valider et corriger la hiérarchie
      updatedPages = validateAndFixHierarchy(updatedPages);
      
      // Mettre à jour les slugs
      updatedPages = updateSlugsBasedOnHierarchy(updatedPages);
      
      return updatedPages;
    });

    handleDragEnd();
  };

  const handleDelete = (pageId: string) => {
    const page = pages.find(p => p.id === pageId);
    if (page?.isFixed) return;
    
    if (confirm('Êtes-vous sûr de vouloir supprimer cette page ?')) {
      setPages(pages.filter(p => p.id !== pageId));
    }
  };

  const handleLevelChange = (pageId: string, newLevel: 1 | 2 | 3) => {
    setPages(prevPages => {
      let updatedPages = prevPages.map(page => 
        page.id === pageId 
          ? { ...page, level: newLevel }
          : page
      );
      
      // Valider et corriger la hiérarchie
      updatedPages = validateAndFixHierarchy(updatedPages);
      
      // Mettre à jour les slugs
      updatedPages = updateSlugsBasedOnHierarchy(updatedPages);
      
      return updatedPages;
    });
  };

  const handleNameChange = (pageId: string, newName: string) => {
    setPages(prevPages => {
      let updatedPages = prevPages.map(page => {
        if (page.id === pageId) {
          // Generate new slug for level 1 pages, or update based on hierarchy for others
          let newSlug = page.slug;
          if (page.level === 1) {
            newSlug = `/${generateSlugFromName(newName)}`;
          }
          return { ...page, name: newName, slug: newSlug };
        }
        return page;
      });
      
      // Mettre à jour les slugs basés sur la hiérarchie (pour les pages de niveau 2 et 3)
      updatedPages = updateSlugsBasedOnHierarchy(updatedPages);
      
      return updatedPages;
    });
  };

  const handleAddPage = () => {
    const newPage: Page = {
      id: Date.now().toString(),
      name: 'Nouvelle page',
      slug: '/nouvelle-page',
      level: 1,
      type: 'page',
      isFixed: false,
      order: pages.length,
    };
    
    setPages([...pages, newPage]);
  };

  const levelCounts = {
    1: pages.filter(p => p.level === 1).length,
    2: pages.filter(p => p.level === 2).length,
    3: pages.filter(p => p.level === 3).length,
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FolderOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Structure du site</h1>
          </div>
          
          {/* Level Legend */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Niveau 1 ({levelCounts[1]})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Niveau 2 ({levelCounts[2]})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Niveau 3 ({levelCounts[3]})</span>
            </div>
          </div>

          {/* Debug Info */}
          {draggedPage && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <div className="text-sm text-yellow-800">
                <strong>Debug:</strong> Page "{draggedPage.name}" (Niveau {draggedPage.level}) 
                {dragDirection && (
                  <span className="ml-2">
                    → Direction: <strong>{dragDirection === 'right' ? 'DROITE (augmenter)' : 'GAUCHE (diminuer)'}</strong>
                  </span>
                )}
                {isHorizontalDrag && (
                  <span className="ml-2 px-2 py-1 bg-red-200 rounded text-xs font-bold">
                    🔥 DRAG HORIZONTAL ACTIF - RELÂCHEZ POUR APPLIQUER
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Drag & Drop Zones */}
        <SitemapZones
          onDragOver={handleZoneDragOver}
          onDrop={handleZoneDrop}
          dragDirection={dragDirection}
          currentZoneLevel={currentZoneLevel}
        />

        {/* Pages List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Pages du site</h2>
            <button
              onClick={handleAddPage}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Ajouter une page
            </button>
          </div>

          <div className="space-y-3">
            {pages.map((page) => (
              <SitemapItem
                key={page.id}
                page={page}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDrag={handleDrag}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDelete={handleDelete}
                onLevelChange={handleLevelChange}
                onNameChange={handleNameChange}
                isDragging={draggedPage?.id === page.id}
                isOverZone={isOverZone}
                dragDirection={dragDirection}
                dragOverPosition={
                  dragOverInfo?.pageId === page.id ? dragOverInfo.position : undefined
                }
              />
            ))}
          </div>

          {pages.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <FolderOpen className="w-12 h-12 mx-auto" />
              </div>
              <p className="text-gray-500">Aucune page trouvée</p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Instructions</h3>
          <ul className="text-blue-800 space-y-2 text-sm">
            <li>• <strong>✏️ Renommer</strong> : Cliquez sur le nom d'une page pour la renommer directement</li>
            <li>• <strong>📱 Drag & Drop Vertical</strong> : Glissez-déposez verticalement pour réorganiser l'ordre des pages</li>
            <li>• <strong>🔄 Drag & Drop Horizontal</strong> : Glissez-déposez horizontalement pour changer le niveau</li>
            <li>• <strong>→ Droite</strong> : <span className="font-semibold text-green-600">VERT</span> - Augmente le niveau (1→2, 2→3)</li>
            <li>• <strong>← Gauche</strong> : <span className="font-semibold text-blue-600">BLEU</span> - Diminue le niveau (3→2, 2→1)</li>
            <li>• <strong>✅ Validation automatique</strong> : Les niveaux sont automatiquement corrigés pour respecter la hiérarchie</li>
            <li>• <strong>🔗 Mise à jour des URLs</strong> : Les slugs sont automatiquement mis à jour selon la hiérarchie</li>
            <li>• <strong>🎯 Zones colorées</strong> : Utilisez les zones colorées pour changer rapidement le niveau d'une page</li>
            <li>• <strong>➕ Nouvelle page</strong> : Les nouvelles pages s'ajoutent automatiquement en bas de liste</li>
          </ul>
        </div>
      </div>
    </div>
  );
}