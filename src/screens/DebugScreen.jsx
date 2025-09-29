import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useOnboarding } from '@context/OnboardingContext';
import { useAuth } from '@context/AuthContext';
import { resetOnboardingForTesting, forceShowOnboarding } from '@utils/onboardingTest';
import { resetOnboarding } from '@utils/onboarding';

const DebugScreen = () => {
  const { isOnboardingComplete, isLoading, versionCheckPassed } = useOnboarding();
  const { user } = useAuth();

  const handleResetOnboarding = async () => {
    try {
      await resetOnboarding();
      console.log('Onboarding reset successfully');
    } catch (error) {
      console.error('Error resetting onboarding:', error);
    }
  };

  const handleForceOnboarding = async () => {
    try {
      await forceShowOnboarding();
      console.log('Forced onboarding reset successfully');
    } catch (error) {
      console.error('Error forcing onboarding:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Debug Information</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Onboarding Status:</Text>
        <Text style={styles.info}>isLoading: {isLoading ? 'true' : 'false'}</Text>
        <Text style={styles.info}>isOnboardingComplete: {isOnboardingComplete ? 'true' : 'false'}</Text>
        <Text style={styles.info}>versionCheckPassed: {versionCheckPassed ? 'true' : 'false'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Auth Status:</Text>
        <Text style={styles.info}>user: {user ? 'logged in' : 'not logged in'}</Text>
        <Text style={styles.info}>user ID: {user?.id || 'N/A'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actions:</Text>
        <TouchableOpacity style={styles.button} onPress={handleResetOnboarding}>
          <Text style={styles.buttonText}>Reset Onboarding</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={handleForceOnboarding}>
          <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Force Show Onboarding</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSecondary: {
    backgroundColor: '#FF6B6B',
    marginTop: 10,
  },
  buttonTextSecondary: {
    color: 'white',
  },
});

export default DebugScreen;
