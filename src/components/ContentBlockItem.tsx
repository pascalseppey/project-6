import React, { useState, useRef, useEffect } from 'react';
import { GripVertical, Trash2, Plus, Type, Image, Layout, Edit3, Check, X, Settings } from 'lucide-react';
import { ContentBlock } from '../types/builder';

interface ContentBlockItemProps {
  block: ContentBlock;
  onDragStart: (block: ContentBlock) => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent, blockId: string, position: 'above' | 'below' | 'inside') => void;
  onDrop: (e: React.DragEvent, blockId: string, position: 'above' | 'below' | 'inside') => void;
  onDelete: (blockId: string) => void;
  onContentUpdate: (blockId: string, content: string) => void;
  onImageUpdate: (blockId: string, imageUrl: string) => void;
  onColumnsChange: (blockId: string, columns: number) => void;
  onAddChild: (type: 'container' | 'text' | 'image', parentId: string) => void;
  isDragging: boolean;
  dragOverPosition?: 'above' | 'below' | 'inside';
}

export default function ContentBlockItem({
  block,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  onDelete,
  onContentUpdate,
  onImageUpdate,
  onColumnsChange,
  onAddChild,
  isDragging,
  dragOverPosition
}: ContentBlockItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingContent, setEditingContent] = useState(block.content || '');
  const [editingImageUrl, setEditingImageUrl] = useState(block.imageUrl || '');
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (block.type === 'text') {
        (inputRef.current as HTMLTextAreaElement).select();
      } else {
        (inputRef.current as HTMLInputElement).select();
      }
    }
  }, [isEditing, block.type]);

  const handleDragStart = (e: React.DragEvent) => {
    onDragStart(block);
  };

  const handleContentClick = () => {
    if (!isDragging && (block.type === 'text' || block.type === 'image')) {
      setIsEditing(true);
      setEditingContent(block.content || '');
      setEditingImageUrl(block.imageUrl || '');
    }
  };

  const handleSave = () => {
    if (block.type === 'text') {
      onContentUpdate(block.id, editingContent);
    } else if (block.type === 'image') {
      onImageUpdate(block.id, editingImageUrl);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditingContent(block.content || '');
    setEditingImageUrl(block.imageUrl || '');
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && block.type === 'image') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const getContainerGridClass = () => {
    const columns = block.columns || 1;
    switch (columns) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 md:grid-cols-2';
      case 3: return 'grid-cols-1 md:grid-cols-3';
      case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      default: return 'grid-cols-1 md:grid-cols-2';
    }
  };

  const renderBlockContent = () => {
    switch (block.type) {
      case 'text':
        if (isEditing) {
          return (
            <div className="flex items-start gap-2">
              <textarea
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
                placeholder="Entrez votre texte..."
              />
              <div className="flex flex-col gap-1">
                <button
                  onClick={handleSave}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        }
        return (
          <div
            className="p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={handleContentClick}
          >
            <p className="text-gray-800 whitespace-pre-wrap">
              {block.content || 'Cliquez pour ajouter du texte...'}
            </p>
          </div>
        );

      case 'image':
        if (isEditing) {
          return (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef as React.RefObject<HTMLInputElement>}
                  type="url"
                  value={editingImageUrl}
                  onChange={(e) => setEditingImageUrl(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="URL de l'image..."
                />
                <button
                  onClick={handleSave}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {editingImageUrl && (
                <img
                  src={editingImageUrl}
                  alt="Aperçu"
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
            </div>
          );
        }
        return (
          <div
            className="cursor-pointer group relative overflow-hidden rounded-lg"
            onClick={handleContentClick}
          >
            <img
              src={block.imageUrl}
              alt="Image"
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
              <Edit3 className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        );

      case 'container':
        return (
          <div className="space-y-4">
            {/* Container Header */}
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2">
                <Layout className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  Container ({block.columns || 1} colonne{(block.columns || 1) > 1 ? 's' : ''})
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Column Selector */}
                <div className="relative">
                  <button
                    onClick={() => setShowColumnSelector(!showColumnSelector)}
                    className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                  
                  {showColumnSelector && (
                    <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-32">
                      {[1, 2, 3, 4].map((cols) => (
                        <button
                          key={cols}
                          onClick={() => {
                            onColumnsChange(block.id, cols);
                            setShowColumnSelector(false);
                          }}
                          className={`
                            w-full px-3 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg
                            ${(block.columns || 1) === cols ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'}
                          `}
                        >
                          {cols} colonne{cols > 1 ? 's' : ''}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Add Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowAddMenu(!showAddMenu)}
                    className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  
                  {showAddMenu && (
                    <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-32">
                      <button
                        onClick={() => {
                          onAddChild('container', block.id);
                          setShowAddMenu(false);
                        }}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg flex items-center gap-2"
                      >
                        <Layout className="w-3 h-3" />
                        Container
                      </button>
                      <button
                        onClick={() => {
                          onAddChild('text', block.id);
                          setShowAddMenu(false);
                        }}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                      >
                        <Type className="w-3 h-3" />
                        Texte
                      </button>
                      <button
                        onClick={() => {
                          onAddChild('image', block.id);
                          setShowAddMenu(false);
                        }}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 last:rounded-b-lg flex items-center gap-2"
                      >
                        <Image className="w-3 h-3" />
                        Image
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Container Content */}
            <div className={`grid gap-4 ${getContainerGridClass()}`}>
              {block.children && block.children.length > 0 ? (
                block.children.map((child) => (
                  <ContentBlockItem
                    key={child.id}
                    block={child}
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                    onDelete={onDelete}
                    onContentUpdate={onContentUpdate}
                    onImageUpdate={onImageUpdate}
                    onColumnsChange={onColumnsChange}
                    onAddChild={onAddChild}
                    isDragging={false}
                  />
                ))
              ) : (
                <div className="col-span-full p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <div className="text-gray-400 mb-2">
                    <Plus className="w-8 h-8 mx-auto" />
                  </div>
                  <p className="text-gray-500 text-sm">Container vide</p>
                  <p className="text-gray-400 text-xs">Utilisez le bouton + ci-dessus pour ajouter du contenu</p>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {dragOverPosition === 'above' && (
        <div className="h-1 bg-blue-500 rounded-full mb-2 transition-all duration-200" />
      )}
      
      <div
        className={`
          group relative rounded-lg border transition-all duration-200 p-4
          ${isDragging ? 'opacity-50 transform scale-95' : 'hover:shadow-md'}
          ${block.type === 'container' ? 'border-blue-200 bg-blue-50/30' : 'border-gray-200 bg-white'}
        `}
        draggable={!isEditing}
        onDragStart={handleDragStart}
        onDragEnd={onDragEnd}
        onDragOver={(e) => onDragOver(e, block.id, 'above')}
        onDrop={(e) => onDrop(e, block.id, 'above')}
      >
        {/* Block Header */}
        {!isEditing && (
          <div className="flex items-center justify-between mb-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2">
              <div className="cursor-move p-1 hover:bg-gray-100 rounded">
                <GripVertical className="w-4 h-4 text-gray-400" />
              </div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {block.type === 'container' ? 'Container' : block.type === 'text' ? 'Texte' : 'Image'}
              </span>
            </div>
            
            <button
              onClick={() => onDelete(block.id)}
              className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Block Content */}
        {renderBlockContent()}
      </div>

      {dragOverPosition === 'below' && (
        <div className="h-1 bg-blue-500 rounded-full mt-2 transition-all duration-200" />
      )}
    </div>
  );
}