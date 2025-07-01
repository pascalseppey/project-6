import React from 'react';

interface MiniChartProps {
  type: 'line' | 'bar' | 'area' | 'donut';
  data?: any;
}

const MiniChart: React.FC<MiniChartProps> = ({ type, data }) => {
  if (type === 'line') {
    return (
      <svg className="w-full h-16" viewBox="0 0 100 40">
        <path
          d="M5,30 Q25,10 45,20 T85,15"
          stroke="rgba(255,255,255,0.8)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="85" cy="15" r="2" fill="white" />
      </svg>
    );
  }
  
  if (type === 'bar') {
    return (
      <div className="flex items-end justify-center space-x-1 h-16">
        {[20, 35, 25, 45, 30, 50, 28, 40].map((height, i) => (
          <div 
            key={i}
            className="bg-white/70 rounded-t-sm transition-all duration-300"
            style={{ height: `${height}%`, width: '8px' }}
          />
        ))}
      </div>
    );
  }

  if (type === 'area') {
    return (
      <svg className="w-full h-16" viewBox="0 0 100 40">
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
          </linearGradient>
        </defs>
        <path
          d="M5,35 Q25,15 45,25 T85,20 L85,35 L5,35 Z"
          fill="url(#areaGradient)"
        />
        <path
          d="M5,35 Q25,15 45,25 T85,20"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    );
  }

  // Graphique en donut
  return (
    <div className="flex items-center justify-center h-16">
      <div className="relative w-12 h-12">
        <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="3"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeDasharray="75, 100"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-xs font-bold">75%</span>
        </div>
      </div>
    </div>
  );
};

export default MiniChart;