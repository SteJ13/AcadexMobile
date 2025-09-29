import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_CONFIG, compareVersions, isVersionSupported } from '@config';
import { Platform, Linking, Alert } from 'react-native';

const VERSION_STORAGE_KEY = 'app_version_info';

// Get current app version from package.json or app config
export const getCurrentAppVersion = () => {
  return APP_CONFIG.CURRENT_VERSION;
};

// Get stored version info
export const getStoredVersionInfo = async () => {
  try {
    const stored = await AsyncStorage.getItem(VERSION_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error getting stored version info:', error);
    return null;
  }
};

// Store version info
export const storeVersionInfo = async (versionInfo) => {
  try {
    await AsyncStorage.setItem(VERSION_STORAGE_KEY, JSON.stringify(versionInfo));
  } catch (error) {
    console.error('Error storing version info:', error);
  }
};

// Check if app needs to be updated
export const checkAppVersion = async () => {
  if (!APP_CONFIG.APP_VERSION_CHECK) {
    console.log('Version check is disabled');
    return { needsUpdate: false, isFirstLaunch: true };
  }

  try {
    const currentVersion = getCurrentAppVersion();
    const storedInfo = await getStoredVersionInfo();
    
    // Check if this is first launch
    const isFirstLaunch = !storedInfo;
    
    // Check if current version meets minimum requirements
    const needsUpdate = !isVersionSupported(currentVersion, APP_CONFIG.MINIMUM_VERSION);
    
    // Store current version info
    await storeVersionInfo({
      currentVersion,
      lastChecked: new Date().toISOString(),
      isFirstLaunch
    });
    
    console.log('Version check result:', { currentVersion, needsUpdate, isFirstLaunch });
    
    return { needsUpdate, isFirstLaunch, currentVersion };
  } catch (error) {
    console.error('Error checking app version:', error);
    return { needsUpdate: false, isFirstLaunch: true };
  }
};

// Show update required dialog
export const showUpdateRequiredDialog = () => {
  const storeUrl = Platform.OS === 'ios' ? APP_CONFIG.APP_STORE_URL : APP_CONFIG.PLAY_STORE_URL;
  
  Alert.alert(
    'Update Required',
    'Please update the app to the latest version to continue using Acadex.',
    [
      {
        text: 'Update Now',
        onPress: () => {
          Linking.openURL(storeUrl).catch(err => {
            console.error('Error opening store URL:', err);
            Alert.alert('Error', 'Unable to open app store. Please update manually.');
          });
        }
      },
      {
        text: 'Exit App',
        style: 'destructive',
        onPress: () => {
          // On Android, you might want to use BackHandler.exitApp()
          // On iOS, this will just close the app
        }
      }
    ],
    { cancelable: false }
  );
};

// Check for version updates and show dialog if needed
export const handleVersionCheck = async () => {
  const { needsUpdate } = await checkAppVersion();
  
  if (needsUpdate) {
    showUpdateRequiredDialog();
    return false; // App should not continue
  }
  
  return true; // App can continue
};
