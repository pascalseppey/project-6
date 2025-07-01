import React, { useState, useRef, useEffect } from 'react';
import { GripVertical, Eye, Trash2, Home, FileText, Lock, Check, X } from 'lucide-react';
import { Page } from '../types/sitemap';

interface SitemapItemProps {
  page: Page;
  onDragStart: (page: Page, e?: React.DragEvent) => void;
  onDragEnd: () => void;
  onDrag?: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent, pageId: string, position: 'above' | 'below') => void;
  onDrop: (e: React.DragEvent, pageId: string, position: 'above' | 'below') => void;
  onDelete: (pageId: string) => void;
  onLevelChange: (pageId: string, newLevel: 1 | 2 | 3) => void;
  onNameChange: (pageId: string, newName: string) => void;
  isDragging: boolean;
  dragOverPosition?: 'above' | 'below';
  isOverZone?: boolean;
  dragDirection?: 'left' | 'right' | null;
}

const levelColors = {
  1: {
    badge: 'bg-blue-100 text-blue-800 border-blue-200',
    border: 'border-blue-400',
    background: 'bg-blue-50'
  },
  2: {
    badge: 'bg-green-100 text-green-800 border-green-200',
    border: 'border-green-400',
    background: 'bg-green-50'
  },
  3: {
    badge: 'bg-orange-100 text-orange-800 border-orange-200',
    border: 'border-orange-400',
    background: 'bg-orange-50'
  }
};

const levelLabels = {
  1: 'Niveau 1',
  2: 'Niveau 2',
  3: 'Niveau 3',
};

const levelIndentation = {
  1: 'ml-0',
  2: 'ml-8',
  3: 'ml-16',
};

export default function SitemapItem({ 
  page, 
  onDragStart, 
  onDragEnd, 
  onDrag,
  onDragOver, 
  onDrop, 
  onDelete, 
  onLevelChange,
  onNameChange,
  isDragging,
  dragOverPosition,
  isOverZone = false,
  dragDirection = null
}: SitemapItemProps) {
  const [showLevelSelector, setShowLevelSelector] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingName, setEditingName] = useState(page.name);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const Icon = page.type === 'home' ? Home : FileText;

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDragStart = (e: React.DragEvent) => {
    if (page.isFixed) {
      e.preventDefault();
      return;
    }
    onDragStart(page, e);
  };

  const handleLevelChange = (newLevel: 1 | 2 | 3) => {
    onLevelChange(page.id, newLevel);
    setShowLevelSelector(false);
  };

  const handleNameClick = () => {
    if (!page.isFixed && !isDragging) {
      setIsEditing(true);
      setEditingName(page.name);
    }
  };

  const handleNameSave = () => {
    const trimmedName = editingName.trim();
    if (trimmedName && trimmedName !== page.name) {
      onNameChange(page.id, trimmedName);
    }
    setIsEditing(false);
  };

  const handleNameCancel = () => {
    setEditingName(page.name);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSave();
    } else if (e.key === 'Escape') {
      handleNameCancel();
    }
  };

  // Determine the visual style based on drag state and direction
  const getItemStyle = () => {
    if (isDragging && dragDirection) {
      // When dragging horizontally, change the block color based on direction
      if (dragDirection === 'right') {
        // Moving right (increasing level) - make the block GREEN
        return 'bg-green-100 border-l-4 border-green-500 shadow-lg transform scale-105 ring-2 ring-green-300';
      } else if (dragDirection === 'left') {
        // Moving left (decreasing level) - make the block BLUE
        return 'bg-blue-100 border-l-4 border-blue-500 shadow-lg transform scale-105 ring-2 ring-blue-300';
      }
    } else if (isDragging) {
      // When dragging vertically, keep original color but with opacity
      return `${levelColors[page.level].background} border-l-4 ${levelColors[page.level].border} opacity-70 transform scale-95`;
    } else if (page.isFixed) {
      // Fixed pages always blue
      return 'bg-blue-50 border-l-4 border-blue-400';
    } else {
      // Normal state with level-specific colors
      return `bg-white border-l-4 ${levelColors[page.level].border}`;
    }
  };

  return (
    <div className={`relative ${levelIndentation[page.level]}`}>
      {dragOverPosition === 'above' && (
        <div className="h-1 bg-blue-500 rounded-full mb-2 transition-all duration-200" />
      )}
      
      <div
        className={`
          group relative rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4
          ${getItemStyle()}
        `}
        draggable={!page.isFixed && !isEditing}
        onDragStart={handleDragStart}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        onDragOver={(e) => onDragOver(e, page.id, 'above')}
        onDrop={(e) => onDrop(e, page.id, 'above')}
      >
        <div className="flex items-center gap-4">
          {/* Level Indicator Line */}
          {page.level > 1 && (
            <div className="absolute -left-4 top-1/2 w-4 h-px bg-gray-300"></div>
          )}
          {page.level === 3 && (
            <div className="absolute -left-8 top-1/2 w-4 h-px bg-gray-300"></div>
          )}

          {/* Drag Handle */}
          <div className={`cursor-move ${page.isFixed ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100'} p-1 rounded`}>
            {page.isFixed ? <Lock className="w-4 h-4 text-gray-400" /> : <GripVertical className="w-4 h-4 text-gray-400" />}
          </div>

          {/* Page Icon */}
          <div className="flex-shrink-0">
            <Icon className="w-5 h-5 text-gray-600" />
          </div>

          {/* Page Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              {/* Editable Page Name */}
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onKeyDown={handleKeyPress}
                    onBlur={handleNameSave}
                    className="font-medium text-gray-900 bg-white border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nom de la page"
                  />
                  <button
                    onClick={handleNameSave}
                    className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNameCancel}
                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <h3 
                  className={`font-medium text-gray-900 truncate ${!page.isFixed ? 'cursor-pointer hover:text-blue-600' : ''}`}
                  onClick={handleNameClick}
                  title={!page.isFixed ? "Cliquer pour renommer" : ""}
                >
                  {page.name}
                </h3>
              )}
              
              {/* Level Selector */}
              {!isEditing && (
                <div className="relative">
                  <button
                    onClick={() => !page.isFixed && setShowLevelSelector(!showLevelSelector)}
                    className={`
                      px-2 py-1 text-xs font-medium rounded-full border transition-colors
                      ${levelColors[page.level].badge}
                      ${!page.isFixed ? 'hover:shadow-sm cursor-pointer' : 'cursor-not-allowed opacity-75'}
                    `}
                    disabled={page.isFixed}
                  >
                    {levelLabels[page.level]}
                  </button>

                  {showLevelSelector && !page.isFixed && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-32">
                      {[1, 2, 3].map((level) => (
                        <button
                          key={level}
                          onClick={() => handleLevelChange(level as 1 | 2 | 3)}
                          className={`
                            w-full px-3 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg
                            ${page.level === level ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'}
                          `}
                        >
                          Niveau {level}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {page.isFixed && (
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                  Fixe
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">{page.slug}</p>
          </div>

          {/* Actions */}
          {!isEditing && (
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                <Eye className="w-4 h-4" />
              </button>
              {!page.isFixed && (
                <button
                  onClick={() => onDelete(page.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {dragOverPosition === 'below' && (
        <div className="h-1 bg-blue-500 rounded-full mt-2 transition-all duration-200" />
      )}
    </div>
  );
}