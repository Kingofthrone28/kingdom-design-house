import React, { createContext, useContext, useState } from 'react';

const LayoutContext = createContext();

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};

export const LayoutProvider = ({ children }) => {
  const [serviceLayout, setServiceLayout] = useState('3-column');

  const toggleServiceLayout = () => {
    setServiceLayout(prev => prev === '3-column' ? '2-column' : '3-column');
  };

  const setLayout = (layout) => {
    if (['2-column', '3-column'].includes(layout)) {
      setServiceLayout(layout);
    }
  };

  const value = {
    serviceLayout,
    setServiceLayout: setLayout,
    toggleServiceLayout
  };

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  );
};