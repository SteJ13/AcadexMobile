import React, { createContext, useContext, useState } from 'react';

const DrawerContext = createContext();

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
};

export const DrawerProvider = ({ children }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const openDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);
  const forceCloseDrawer = () => {
    setDrawerVisible(false);
    // Force a small delay to ensure state is reset
    setTimeout(() => {
      setDrawerVisible(false);
    }, 100);
  };

  return (
    <DrawerContext.Provider value={{
      drawerVisible,
      openDrawer,
      closeDrawer,
      forceCloseDrawer,
    }}>
      {children}
    </DrawerContext.Provider>
  );
};
