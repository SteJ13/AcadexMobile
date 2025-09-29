import React, { useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from './src/context/ThemeContext'
import RootNavigator from './src/navigation/RootNavigator'
import { NavigationContainer } from '@react-navigation/native'
import NotificationService from './src/notifications/NotificationService'
import { AuthProvider } from '@context/AuthContext';
import { ToastProvider } from '@context/ToastContext';
import { LanguageProvider } from '@context/LanguageContext';
import { DrawerProvider } from '@context/DrawerContext';
import { OnboardingProvider } from '@context/OnboardingContext';
import AppSplashScreen from '@components/AppSplashScreen';
import './src/i18n'; // Initialize i18n

export default function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize notification service
    NotificationService.initialize();

    // Cleanup on unmount
    return () => {
      NotificationService.destroy();
    };
  }, []);

  const handleInitializationComplete = () => {
    console.log('🎉 App initialization completed, showing main app');
    setIsInitialized(true);
  };

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LanguageProvider>
          <OnboardingProvider>
            <AuthProvider>
              <ToastProvider>
                <DrawerProvider>
                  {!isInitialized ? (
                    <AppSplashScreen onInitializationComplete={handleInitializationComplete} />
                  ) : (
                    <NavigationContainer>
                      <RootNavigator />
                    </NavigationContainer>
                  )}
                </DrawerProvider>
              </ToastProvider>
            </AuthProvider>
          </OnboardingProvider>
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}