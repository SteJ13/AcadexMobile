import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAuth } from '@context/AuthContext';
import { useOnboarding } from '@context/OnboardingContext';
import { useTheme } from '@context/ThemeContext';
import { useLanguage } from '@context/LanguageContext';
import useStyles from '@hooks/useStyles';

const AppSplashScreen = ({ onInitializationComplete }) => {
  const [initializationStatus, setInitializationStatus] = useState({
    theme: false,
    language: false,
    onboarding: false,
    auth: false,
    version: false,
  });

  const [currentStep, setCurrentStep] = useState('');
  const [progress, setProgress] = useState(0);

  const { user, loading: authLoading } = useAuth();
  const { isOnboardingComplete, isLoading: onboardingLoading, versionCheckPassed } = useOnboarding();
  const { theme, loading: themeLoading } = useTheme();
  const { loading: languageLoading } = useLanguage();

  const totalSteps = 3;
  const steps = [
    { key: 'version', name: 'Checking Version' },
    { key: 'onboarding', name: 'Checking Onboarding' },
    { key: 'auth', name: 'Loading Authentication' },
  ];

  useEffect(() => {
    // Initialize theme and language silently in background
    initializeThemeAndLanguage();
    initializeApp();
  }, []);

  const initializeThemeAndLanguage = async () => {
    // These are fast operations, do them silently
    console.log('🎨 Initializing theme and language silently...');
    // Theme and language contexts will load automatically
  };

  const initializeApp = async () => {
    console.log('🚀 Starting app initialization...');
    
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      setCurrentStep(step.name);
      setProgress((i / totalSteps) * 100);
      
      console.log(`⏳ ${step.name}...`);
      
      // Wait for actual completion, not artificial duration
      await checkStepCondition(step.key);
      
      setInitializationStatus(prev => ({
        ...prev,
        [step.key]: true
      }));
      
      console.log(`✅ ${step.name} completed`);
    }
    
    // Final check - proceed even if some steps failed
    const allReady = Object.values(initializationStatus).every(status => status);
    
    console.log('🎉 All initialization steps completed!');
    setCurrentStep('Ready!');
    setProgress(100);
    
    // Small delay before showing the app
    setTimeout(() => {
      onInitializationComplete();
    }, 200);
  };

  const checkStepCondition = async (stepKey) => {
    switch (stepKey) {
      case 'version':
        // For non-deployed apps, skip version check immediately
        console.log('📱 Skipping version check for development app');
        // No artificial delay - proceed immediately
        break;
        
      case 'onboarding':
        // Onboarding check is just AsyncStorage read - should be instant
        console.log('🔍 Onboarding loading state:', onboardingLoading);
        if (onboardingLoading) {
          // Wait briefly for the context to complete
          let timeout = 0;
          while (onboardingLoading && timeout < 10) { // 1 second max
            await new Promise(resolve => setTimeout(resolve, 100));
            timeout++;
          }
          if (timeout >= 10) {
            console.log('⚠️ Onboarding check timeout, proceeding anyway');
          }
        }
        console.log('✅ Onboarding check completed');
        break;
        
      case 'auth':
        // Auth check is just AsyncStorage read - should be instant
        console.log('🔍 Auth loading state:', authLoading);
        if (authLoading) {
          // Wait briefly for the context to complete
          let authTimeout = 0;
          while (authLoading && authTimeout < 10) { // 1 second max
            await new Promise(resolve => setTimeout(resolve, 100));
            authTimeout++;
          }
          if (authTimeout >= 10) {
            console.log('⚠️ Auth check timeout, proceeding anyway');
          }
        }
        console.log('✅ Auth check completed');
        break;
    }
  };

  const styles = useStyles(createStyles);

  return (
    <LinearGradient
      colors={['#8A2BE2', '#9370DB', '#BA55D3']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* App Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>A</Text>
        </View>
        <Text style={styles.appName}>Acadex</Text>
        <Text style={styles.appTagline}>Educational Management</Text>
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${progress}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>{Math.round(progress)}%</Text>
      </View>

      {/* Current Step */}
      <View style={styles.stepContainer}>
        <ActivityIndicator 
          size="small" 
          color={theme?.primary || '#007AFF'} 
          style={styles.loadingIndicator}
        />
        <Text style={styles.stepText}>{currentStep}</Text>
      </View>

      {/* Status Indicators */}
      <View style={styles.statusContainer}>
        {steps.map((step, index) => (
          <View key={step.key} style={styles.statusItem}>
            <View style={[
              styles.statusDot,
              initializationStatus[step.key] && styles.statusDotActive
            ]}>
              {initializationStatus[step.key] && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </View>
            <Text style={[
              styles.statusText,
              initializationStatus[step.key] && styles.statusTextActive
            ]}>
              {step.name}
            </Text>
          </View>
        ))}
      </View>

      {/* Version Info */}
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Version 1.0.1</Text>
      </View>
    </LinearGradient>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#8A2BE2',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  appTagline: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
  progressContainer: {
    width: '100%',
    marginBottom: 40,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  loadingIndicator: {
    marginRight: 12,
  },
  stepText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  statusContainer: {
    width: '100%',
    marginBottom: 40,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statusDotActive: {
    backgroundColor: '#FFFFFF',
  },
  checkmark: {
    fontSize: 12,
    color: '#8A2BE2',
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  statusTextActive: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  versionContainer: {
    position: 'absolute',
    bottom: 30,
  },
  versionText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});

export default AppSplashScreen;
