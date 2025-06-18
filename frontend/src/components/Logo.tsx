import React from 'react';
import { GraduationCap } from 'lucide-react';

interface LogoProps {
  variant?: 'full' | 'compact';
  className?: string;
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ 
  variant = 'full', 
  className = '', 
  onClick 
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  if (variant === 'compact') {
    return (
      <button
        onClick={handleClick}
        className={`flex items-center space-x-3 group transition-all duration-200 hover:scale-105 ${className}`}
        aria-label="Go to homepage"
      >
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <div className="text-xl font-bold text-gray-900 dark:text-white">
          RateMyIS
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center space-x-4 group transition-all duration-200 hover:scale-[1.02] ${className}`}
      aria-label="Go to homepage"
    >
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
        <GraduationCap className="w-6 h-6 text-white" />
      </div>
      <div className="flex flex-col items-start leading-none">
        <div className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          RateMyIS
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
          AAU Information Systems
        </div>
      </div>
    </button>
  );
};

export default Logo;