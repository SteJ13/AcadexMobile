import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkOnboardingStatus } from '@utils/onboarding';
import { handleVersionCheck } from '@utils/autoVersionCheck';
import { APP_CONFIG } from '@config';

const OnboardingContext = createContext();

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

export const OnboardingProvider = ({ children }) => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(null); // null = loading
  const [isLoading, setIsLoading] = useState(true);
  const [versionCheckPassed, setVersionCheckPassed] = useState(false);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      console.log('🚀 Initializing app...');
      
      // Check if version checking is enabled
      if (APP_CONFIG.APP_VERSION_CHECK && !APP_CONFIG.DEVELOPMENT.SKIP_VERSION_CHECK) {
        console.log('📱 Checking app version...');
        const versionOk = await handleVersionCheck();
        console.log('📱 Version check result:', versionOk);
        setVersionCheckPassed(versionOk);
        
        if (!versionOk) {
          console.log('❌ Version check failed, stopping initialization');
          setIsLoading(false);
          return;
        }
      } else {
        console.log('📱 Skipping version check (development mode)');
        setVersionCheckPassed(true);
      }
      
      // Check onboarding status - simple AsyncStorage read
      console.log('✅ Checking onboarding status...');
      const isComplete = await checkOnboardingStatus();
      console.log('📋 Onboarding complete:', isComplete);
      setIsOnboardingComplete(isComplete);
    } catch (error) {
      console.error('❌ Error initializing app:', error);
      setIsOnboardingComplete(false); // Default to showing onboarding
    } finally {
      console.log('🏁 Initialization complete, setting loading to false');
      setIsLoading(false);
    }
  };

  const completeOnboarding = () => {
    setIsOnboardingComplete(true);
  };

  const resetOnboarding = async () => {
    try {
      const { resetOnboarding } = await import('@utils/onboarding');
      await resetOnboarding();
      setIsOnboardingComplete(false);
    } catch (error) {
      console.error('Error resetting onboarding:', error);
    }
  };

  const value = {
    isOnboardingComplete,
    isLoading,
    versionCheckPassed,
    completeOnboarding,
    resetOnboarding,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};
