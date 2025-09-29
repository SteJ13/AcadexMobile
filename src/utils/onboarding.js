import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_KEY = '@onboarding_completed';

export const checkOnboardingStatus = async () => {
  try {
    console.log('🔍 Reading onboarding status from AsyncStorage...');
    const startTime = Date.now();
    const isCompleted = await AsyncStorage.getItem(ONBOARDING_KEY);
    const endTime = Date.now();
    console.log(`📱 AsyncStorage read took ${endTime - startTime}ms, result: ${isCompleted}`);
    return isCompleted === 'true';
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return false; // Default to showing onboarding if there's an error
  }
};

export const markOnboardingComplete = async () => {
  try {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
  } catch (error) {
    console.error('Error marking onboarding complete:', error);
  }
};

export const resetOnboarding = async () => {
  try {
    await AsyncStorage.removeItem(ONBOARDING_KEY);
  } catch (error) {
    console.error('Error resetting onboarding:', error);
  }
};
