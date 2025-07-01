import React, { useState, useRef } from 'react';
import { Plus, Layout, Type, Image, Trash2, GripVertical, Edit3, Check, X } from 'lucide-react';
import { ContentBlock } from '../types/builder';
import ContentBlockItem from './ContentBlockItem';

const initialBlocks: ContentBlock[] = [
  {
    id: '1',
    type: 'container',
    columns: 2,
    order: 0,
    children: [
      {
        id: '2',
        type: 'text',
        content: 'Bienvenue sur notre site',
        parentId: '1',
        order: 0,
      },
      {
        id: '3',
        type: 'image',
        imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
        parentId: '1',
        order: 1,
      }
    ]
  },
  {
    id: '4',
    type: 'text',
    content: 'Ceci est un paragraphe de texte simple qui peut être édité en cliquant dessus.',
    order: 1,
  },
  {
    id: '5',
    type: 'container',
    columns: 3,
    order: 2,
    children: [
      {
        id: '6',
        type: 'text',
        content: 'Colonne 1',
        parentId: '5',
        order: 0,
      },
      {
        id: '7',
        type: 'text',
        content: 'Colonne 2',
        parentId: '5',
        order: 1,
      },
      {
        id: '8',
        type: 'text',
        content: 'Colonne 3',
        parentId: '5',
        order: 2,
      }
    ]
  }
];

export default function ContentBuilder() {
  const [blocks, setBlocks] = useState<ContentBlock[]>(initialBlocks);
  const [draggedBlock, setDraggedBlock] = useState<ContentBlock | null>(null);
  const [dragOverInfo, setDragOverInfo] = useState<{ blockId: string; position: 'above' | 'below' | 'inside' } | null>(null);
  const dragCounter = useRef(0);

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
      ...(type === 'container' && { columns: 2, children: [] }),
      ...(type === 'text' && { content: 'Nouveau texte - cliquez pour éditer' }),
      ...(type === 'image' && { imageUrl: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800' }),
      ...(parentId && { parentId })
    };

    if (parentId) {
      // Ajouter dans un container existant
      setBlocks(prevBlocks => 
        updateBlockRecursive(prevBlocks, parentId, (container) => ({
          ...container,
          children: [...(container.children || []), newBlock]
        }))
      );
    } else {
      // Ajouter au niveau racine
      setBlocks(prevBlocks => [...prevBlocks, newBlock]);
    }
  };

  // Gestionnaires de drag & drop
  const handleDragStart = (block: ContentBlock) => {
    setDraggedBlock(block);
  };

  const handleDragEnd = () => {
    setDraggedBlock(null);
    setDragOverInfo(null);
    dragCounter.current = 0;
  };

  const handleDragOver = (e: React.DragEvent, blockId: string, position: 'above' | 'below' | 'inside') => {
    e.preventDefault();
    setDragOverInfo({ blockId, position });
  };

  const handleDrop = (e: React.DragEvent, targetId: string, position: 'above' | 'below' | 'inside') => {
    e.preventDefault();
    if (!draggedBlock) return;

    // Logique de réorganisation des blocs
    // Pour simplifier, on va juste réorganiser au niveau racine pour l'instant
    console.log('Drop:', { draggedBlock: draggedBlock.id, targetId, position });
    
    handleDragEnd();
  };

  // Gestionnaire de suppression
  const handleDelete = (blockId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce bloc ?')) {
      setBlocks(prevBlocks => removeBlockRecursive(prevBlocks, blockId));
    }
  };

  // Gestionnaire de mise à jour du contenu
  const handleContentUpdate = (blockId: string, content: string) => {
    setBlocks(prevBlocks => 
      updateBlockRecursive(prevBlocks, blockId, (block) => ({
        ...block,
        content
      }))
    );
  };

  // Gestionnaire de mise à jour de l'image
  const handleImageUpdate = (blockId: string, imageUrl: string) => {
    setBlocks(prevBlocks => 
      updateBlockRecursive(prevBlocks, blockId, (block) => ({
        ...block,
        imageUrl
      }))
    );
  };

  // Gestionnaire de changement de colonnes
  const handleColumnsChange = (blockId: string, columns: number) => {
    setBlocks(prevBlocks => 
      updateBlockRecursive(prevBlocks, blockId, (block) => ({
        ...block,
        columns
      }))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Layout className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Builder de Contenu</h1>
            </div>
            
            {/* Toolbar */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => addBlock('container')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Layout className="w-4 h-4" />
                Container
              </button>
              <button
                onClick={() => addBlock('text')}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Type className="w-4 h-4" />
                Texte
              </button>
              <button
                onClick={() => addBlock('image')}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Image className="w-4 h-4" />
                Image
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 min-h-96">
          <div className="space-y-4">
            {blocks.map((block) => (
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
            
            {blocks.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Layout className="w-16 h-16 mx-auto" />
                </div>
                <p className="text-gray-500 mb-4">Aucun contenu pour le moment</p>
                <p className="text-sm text-gray-400">Utilisez les boutons ci-dessus pour ajouter du contenu</p>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Comment utiliser le builder</h3>
          <ul className="text-blue-800 space-y-2 text-sm">
            <li>• <strong>📦 Container</strong> : Crée une zone qui peut contenir d'autres éléments (1, 2, 3+ colonnes)</li>
            <li>• <strong>✏️ Texte</strong> : Ajoute un bloc de texte éditable en cliquant dessus</li>
            <li>• <strong>🖼️ Image</strong> : Ajoute une image (cliquez pour changer l'URL)</li>
            <li>• <strong>🔄 Drag & Drop</strong> : Glissez-déposez pour réorganiser les éléments</li>
            <li>• <strong>➕ Ajouter dans un container</strong> : Utilisez le bouton + dans les containers</li>
            <li>• <strong>🗑️ Supprimer</strong> : Cliquez sur l'icône poubelle pour supprimer un élément</li>
            <li>• <strong>⚙️ Colonnes</strong> : Changez le nombre de colonnes des containers</li>
          </ul>
        </div>
      </div>
    </div>
  );
}