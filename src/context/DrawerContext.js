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

  return (
    <DrawerContext.Provider value={{
      drawerVisible,
      openDrawer,
      closeDrawer,
    }}>
      {children}
    </DrawerContext.Provider>
  );
};
