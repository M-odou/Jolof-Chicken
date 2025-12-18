
import React from 'react';

const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizes = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl',
  };

  return (
    <div className={`font-accent font-bold tracking-tight select-none flex items-center gap-2 ${sizes[size]}`}>
      <span className="text-red-600">JOLOF</span>
      <span className="bg-red-600 text-yellow-400 px-2 py-0.5 rounded-lg -rotate-3 inline-block shadow-lg">CHICKEN</span>
    </div>
  );
};

export default Logo;
