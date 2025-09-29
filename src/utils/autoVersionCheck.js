import { Platform, Linking, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { APP_CONFIG, compareVersions } from '@config';

const VERSION_STORAGE_KEY = 'app_version_info';
const LAST_CHECK_KEY = 'last_version_check';

// Get current app version from device info
export const getCurrentAppVersion = async () => {
  try {
    const version = await DeviceInfo.getVersion();
    console.log('📱 Current app version:', version);
    return version;
  } catch (error) {
    console.error('Error getting current app version:', error);
    return '1.0.0'; // Fallback version
  }
};

// Get latest version from Play Store/App Store API
export const getLatestVersionFromStore = async () => {
  try {
    if (Platform.OS === 'android') {
      return await getPlayStoreVersion();
    } else if (Platform.OS === 'ios') {
      return await getAppStoreVersion();
    }
    return null;
  } catch (error) {
    console.error('Error getting latest version from store:', error);
    return null;
  }
};

// Get version from Google Play Store using a more reliable method
const getPlayStoreVersion = async () => {
  try {
    // Using a more reliable API service
    const response = await fetch(
      `https://play.google.com/store/apps/details?id=com.acadex&hl=en`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch Play Store data');
    }
    
    const html = await response.text();
    
    // More robust version parsing
    const versionPatterns = [
      /Current Version.*?(\d+\.\d+\.\d+)/,
      /Version.*?(\d+\.\d+\.\d+)/,
      /"version":"([^"]+)"/,
      /versionName["\s]*:["\s]*"([^"]+)"/
    ];
    
    for (const pattern of versionPatterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        console.log('📱 Found Play Store version:', match[1]);
        return match[1];
      }
    }
    
    // If no version found, return current version
    console.log('⚠️ Could not parse Play Store version, using current version');
    return await getCurrentAppVersion();
  } catch (error) {
    console.error('Error getting Play Store version:', error);
    return await getCurrentAppVersion();
  }
};

// Get version from App Store (iOS)
const getAppStoreVersion = async () => {
  try {
    // For iOS, you would typically use the App Store Connect API
    // or a third-party service like App Store API
    // This is a simplified implementation
    const response = await fetch(
      `https://itunes.apple.com/lookup?bundleId=com.acadex`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch App Store data');
    }
    
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      return data.results[0].version;
    }
    
    return getCurrentAppVersion();
  } catch (error) {
    console.error('Error getting App Store version:', error);
    return getCurrentAppVersion();
  }
};

// Check if enough time has passed since last check
export const shouldCheckForUpdates = async () => {
  try {
    const lastCheck = await AsyncStorage.getItem(LAST_CHECK_KEY);
    
    if (!lastCheck) {
      return true; // First time, should check
    }
    
    const lastCheckTime = new Date(lastCheck);
    const now = new Date();
    const hoursSinceLastCheck = (now - lastCheckTime) / (1000 * 60 * 60);
    
    return hoursSinceLastCheck >= APP_CONFIG.VERSION_CHECK.CHECK_INTERVAL;
  } catch (error) {
    console.error('Error checking last update time:', error);
    return true; // Default to checking if error
  }
};

// Store last check time
export const storeLastCheckTime = async () => {
  try {
    await AsyncStorage.setItem(LAST_CHECK_KEY, new Date().toISOString());
  } catch (error) {
    console.error('Error storing last check time:', error);
  }
};

// Main version check function
export const checkAppVersion = async () => {
  if (!APP_CONFIG.APP_VERSION_CHECK) {
    console.log('Version check is disabled');
    return { needsUpdate: false, isFirstLaunch: true };
  }

  try {
    console.log('🔍 Checking app version...');
    
    // Check if we should check for updates
    const shouldCheck = await shouldCheckForUpdates();
    if (!shouldCheck) {
      console.log('⏰ Skipping version check (too soon since last check)');
      return { needsUpdate: false, isFirstLaunch: false };
    }
    
    const currentVersion = await getCurrentAppVersion();
    const latestVersion = await getLatestVersionFromStore();
    
    console.log('📱 Current version:', currentVersion);
    console.log('🆕 Latest version:', latestVersion);
    
    if (!latestVersion) {
      console.log('⚠️ Could not get latest version, skipping update check');
      return { needsUpdate: false, isFirstLaunch: false };
    }
    
    // Compare versions
    const versionComparison = compareVersions(currentVersion, latestVersion);
    const needsUpdate = versionComparison < 0;
    
    // Store version info
    await AsyncStorage.setItem(VERSION_STORAGE_KEY, JSON.stringify({
      currentVersion,
      latestVersion,
      lastChecked: new Date().toISOString(),
      needsUpdate
    }));
    
    // Store last check time
    await storeLastCheckTime();
    
    console.log('✅ Version check complete:', { currentVersion, latestVersion, needsUpdate });
    
    return { 
      needsUpdate, 
      isFirstLaunch: false, 
      currentVersion, 
      latestVersion,
      versionComparison 
    };
  } catch (error) {
    console.error('❌ Error checking app version:', error);
    return { needsUpdate: false, isFirstLaunch: true };
  }
};

// Show update required dialog
export const showUpdateRequiredDialog = (latestVersion) => {
  const storeUrl = Platform.OS === 'ios' ? APP_CONFIG.APP_STORE_URL : APP_CONFIG.PLAY_STORE_URL;
  
  Alert.alert(
    'Update Available',
    `A new version (${latestVersion}) is available. Please update to continue using Acadex.`,
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
        text: 'Later',
        style: 'cancel',
        onPress: () => {
          console.log('User chose to update later');
        }
      }
    ],
    { cancelable: false }
  );
};

// Show optional update dialog
export const showOptionalUpdateDialog = (latestVersion) => {
  const storeUrl = Platform.OS === 'ios' ? APP_CONFIG.APP_STORE_URL : APP_CONFIG.PLAY_STORE_URL;
  
  Alert.alert(
    'Update Available',
    `A new version (${latestVersion}) is available. Would you like to update now?`,
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
        text: 'Not Now',
        style: 'cancel',
        onPress: () => {
          console.log('User chose not to update');
        }
      }
    ]
  );
};

// Handle version check and show appropriate dialog
export const handleVersionCheck = async () => {
  const { needsUpdate, latestVersion, versionComparison } = await checkAppVersion();
  
  if (needsUpdate && latestVersion) {
    // Determine if this is a major update (force) or minor update (optional)
    const isMajorUpdate = Math.abs(versionComparison) >= APP_CONFIG.VERSION_CHECK.FORCE_UPDATE_VERSIONS_BEHIND;
    
    if (isMajorUpdate) {
      showUpdateRequiredDialog(latestVersion);
      return false; // App should not continue
    } else if (APP_CONFIG.VERSION_CHECK.SHOW_MINOR_UPDATE_DIALOG) {
      showOptionalUpdateDialog(latestVersion);
    }
  }
  
  return true; // App can continue
};
