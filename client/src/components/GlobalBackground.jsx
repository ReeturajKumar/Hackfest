import React, { useEffect } from 'react';

const GlobalBackground = () => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Updates the CSS variables instantly
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="global-bg-container">
      {/* 1. The Grid (Static) */}
      <div className="grid-overlay" />
      
      {/* 2. The Glow (Moves with mouse) */}
      <div className="interactive-glow" />
    </div>
  );
};

export default GlobalBackground;