import { resetOnboarding } from './onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Utility function to reset onboarding for testing
// Call this function from anywhere in the app to reset onboarding status
export const resetOnboardingForTesting = async () => {
  try {
    await resetOnboarding();
    console.log('✅ Onboarding reset successfully. Restart the app to see onboarding screens.');
  } catch (error) {
    console.error('❌ Error resetting onboarding:', error);
  }
};

// Force show onboarding by clearing all onboarding data
export const forceShowOnboarding = async () => {
  try {
    await AsyncStorage.removeItem('@onboarding_completed');
    await AsyncStorage.removeItem('app_version_info');
    console.log('✅ Forced onboarding reset. Restart the app to see onboarding screens.');
  } catch (error) {
    console.error('❌ Error forcing onboarding:', error);
  }
};

// You can call these functions from the console or add a button in development mode
// Example: 
// import { resetOnboardingForTesting, forceShowOnboarding } from '@utils/onboardingTest'; 
// resetOnboardingForTesting(); // or forceShowOnboarding();
