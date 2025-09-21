import React, { useEffect } from 'react'
import { ThemeProvider } from './src/context/ThemeContext'
import RootNavigator from './src/navigation/RootNavigator'
import { NavigationContainer } from '@react-navigation/native'
import NotificationService from './src/notifications/NotificationService'
import { AuthProvider } from '@context/AuthContext';
import { ToastProvider } from '@context/ToastContext';
import { LanguageProvider } from '@context/LanguageContext';
import { DrawerProvider } from '@context/DrawerContext';
import './src/i18n'; // Initialize i18n

export default function App() {

  useEffect(() => {
    // Initialize notification service
    NotificationService.initialize();

    // Cleanup on unmount
    return () => {
      NotificationService.destroy();
    };
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <ToastProvider>
            <DrawerProvider>
              <NavigationContainer>
                <RootNavigator />
              </NavigationContainer>
            </DrawerProvider>
          </ToastProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}