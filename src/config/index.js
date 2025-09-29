import { Platform } from 'react-native';

// App Configuration
export const APP_CONFIG = {
  // App version check configuration
  APP_VERSION_CHECK: false, // Set to true when app is deployed to stores
  
  // Play Store URL for updates
  PLAY_STORE_URL: 'https://play.google.com/store/apps/details?id=com.acadex',
  
  // App Store URL for iOS (if applicable)
  APP_STORE_URL: 'https://apps.apple.com/app/acadex/id123456789',
  
  // Version check settings
  VERSION_CHECK: {
    // How often to check for updates (in hours)
    CHECK_INTERVAL: 24,
    
    // Force update if app is this many versions behind
    FORCE_UPDATE_VERSIONS_BEHIND: 2,
    
    // Show update dialog even for minor updates
    SHOW_MINOR_UPDATE_DIALOG: true,
  },
  
  // Development settings
  DEVELOPMENT: {
    // Skip version check in development
    SKIP_VERSION_CHECK: true,
    
    // Show debug information
    SHOW_DEBUG_INFO: true,
  },
};

// Version comparison utility
export const compareVersions = (version1, version2) => {
  const v1parts = version1.split('.').map(Number);
  const v2parts = version2.split('.').map(Number);
  
  for (let i = 0; i < Math.max(v1parts.length, v2parts.length); i++) {
    const v1part = v1parts[i] || 0;
    const v2part = v2parts[i] || 0;
    
    if (v1part > v2part) return 1;
    if (v1part < v2part) return -1;
  }
  
  return 0;
};

// Check if current version meets minimum requirements
export const isVersionSupported = (currentVersion, minimumVersion) => {
  return compareVersions(currentVersion, minimumVersion) >= 0;
};
