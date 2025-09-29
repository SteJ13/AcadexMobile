import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useStyles from '@hooks/useStyles';
import FeatureScreen1 from './FeatureScreen1';
import FeatureScreen2 from './FeatureScreen2';
import FeatureScreen3 from './FeatureScreen3';

const ONBOARDING_KEY = '@onboarding_completed';

const OnboardingScreen = ({ onComplete }) => {
  const styles = useStyles(createStyles);
  const [currentScreen, setCurrentScreen] = useState(0);

  const screens = [
    { component: FeatureScreen1, key: 'feature1' },
    { component: FeatureScreen2, key: 'feature2' },
    { component: FeatureScreen3, key: 'feature3' },
  ];

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const handleComplete = async () => {
    try {
      // Mark onboarding as completed
      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
      onComplete();
    } catch (error) {
      console.error('Error saving onboarding completion:', error);
      // Still proceed even if storage fails
      onComplete();
    }
  };

  const renderCurrentScreen = () => {
    const ScreenComponent = screens[currentScreen].component;
    
    if (currentScreen === screens.length - 1) {
      // Last screen - show complete button
      return <ScreenComponent onComplete={handleComplete} />;
    } else {
      // Other screens - show next button
      return <ScreenComponent onNext={handleNext} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderCurrentScreen()}
      
      {/* Progress Indicators */}
      <View style={styles.progressContainer}>
        {screens.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              index === currentScreen && styles.progressDotActive,
            ]}
          />
        ))}
      </View>
      
      {/* Debug Button - Only show in development */}
      {__DEV__ && (
        <TouchableOpacity 
          style={styles.debugButton}
          onPress={() => {
            console.log('🐛 Debug button pressed');
            // You can add navigation to debug screen here if needed
          }}
        >
          <Text style={styles.debugButtonText}>Debug</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: theme.primary,
    width: 24,
  },
  debugButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    borderRadius: 5,
  },
  debugButtonText: {
    color: 'white',
    fontSize: 12,
  },
});

export default OnboardingScreen;
