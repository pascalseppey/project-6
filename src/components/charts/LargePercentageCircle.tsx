import React from 'react';

interface LargePercentageCircleProps {
  percentage?: number;
  isActive?: boolean;
}

const LargePercentageCircle: React.FC<LargePercentageCircleProps> = ({ 
  percentage = 0, 
  isActive = false 
}) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={isActive ? "rgba(255,255,255,1)" : "white"}
            strokeWidth="2"
            strokeDasharray={`${percentage}, 100`}
            className={`transition-all duration-100 ease-linear ${isActive ? 'drop-shadow-lg' : ''}`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-white text-xl font-bold ${isActive ? 'text-shadow-lg' : ''}`}>
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default LargePercentageCircle;