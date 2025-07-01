import React from 'react';

interface SitemapZonesProps {
  onDragOver: (e: React.DragEvent, level: 1 | 2 | 3) => void;
  onDrop: (e: React.DragEvent, level: 1 | 2 | 3) => void;
  dragDirection?: 'left' | 'right' | null;
  currentZoneLevel?: 1 | 2 | 3 | null;
}

export default function SitemapZones({ 
  onDragOver, 
  onDrop, 
  dragDirection, 
  currentZoneLevel 
}: SitemapZonesProps) {
  const zones = [
    { level: 1 as const, name: 'Zone 1 - Principal', color: 'bg-blue-100 border-blue-300 text-blue-700' },
    { level: 2 as const, name: 'Zone 2 - Sous-page', color: 'bg-green-100 border-green-300 text-green-700' },
    { level: 3 as const, name: 'Zone 3 - Sous-sous-page', color: 'bg-orange-100 border-orange-300 text-orange-700' },
  ];

  const getZoneStyle = (zoneLevel: 1 | 2 | 3) => {
    const baseStyle = zones.find(z => z.level === zoneLevel)?.color || '';
    
    if (currentZoneLevel === zoneLevel) {
      // Zone is being hovered - show enhanced visual feedback
      return `${baseStyle} ring-2 ring-gray-400 shadow-lg transform scale-105`;
    }
    
    return baseStyle;
  };

  const handleDragOver = (e: React.DragEvent, level: 1 | 2 | 3) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    onDragOver(e, level);
  };

  const handleDrop = (e: React.DragEvent, level: 1 | 2 | 3) => {
    e.preventDefault();
    e.stopPropagation();
    onDrop(e, level);
  };

  return (
    <div className="mb-8">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Glisser-déposer simplifié
          {dragDirection && (
            <span className="ml-2 text-xs px-2 py-1 rounded-full font-medium">
              {dragDirection === 'right' ? (
                <span className="bg-green-100 text-green-700">→ Le bloc devient VERT (augmentation de niveau)</span>
              ) : (
                <span className="bg-blue-100 text-blue-700">← Le bloc devient BLEU (diminution de niveau)</span>
              )}
            </span>
          )}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {zones.map((zone) => (
            <div
              key={zone.level}
              className={`
                p-4 border-2 border-dashed rounded-lg text-center transition-all duration-200
                ${getZoneStyle(zone.level)} hover:shadow-md cursor-pointer
              `}
              onDragOver={(e) => handleDragOver(e, zone.level)}
              onDrop={(e) => handleDrop(e, zone.level)}
            >
              <span className="text-sm font-medium">{zone.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}