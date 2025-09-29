# 📱 Automatic Version Management

This document explains how the automatic version checking and management system works in the Acadex app.

## 🚀 Features

- **Automatic Version Detection**: Gets current app version from `package.json` and device info
- **Play Store/App Store Integration**: Automatically checks for latest version from stores
- **Smart Update Prompts**: Shows different dialogs for major vs minor updates
- **Configurable Settings**: Easy to customize version check behavior
- **One-Command Version Updates**: Update version across all platforms with a single command

## 🔧 How It Works

### 1. Version Detection
- Uses `react-native-device-info` to get the current app version
- Automatically reads from `package.json` and syncs with Android/iOS build files

### 2. Store Version Checking
- **Android**: Fetches version from Google Play Store
- **iOS**: Fetches version from App Store using iTunes API
- **Fallback**: Uses current version if store check fails

### 3. Update Logic
- **Major Updates**: Force update required (blocks app usage)
- **Minor Updates**: Optional update (user can choose)
- **Configurable**: Set how many versions behind triggers force update

## 📋 Configuration

### App Config (`src/config/index.js`)
```javascript
export const APP_CONFIG = {
  APP_VERSION_CHECK: true, // Enable/disable version checking
  
  VERSION_CHECK: {
    CHECK_INTERVAL: 24, // Check every 24 hours
    FORCE_UPDATE_VERSIONS_BEHIND: 2, // Force update if 2+ versions behind
    SHOW_MINOR_UPDATE_DIALOG: true, // Show dialog for minor updates
  },
};
```

## 🛠️ Usage

### Updating App Version
```bash
# Update to a new version (updates package.json, Android, iOS)
npm run version 1.0.1

# This will:
# 1. Update package.json version
# 2. Update Android versionName and increment versionCode
# 3. Update iOS MARKETING_VERSION
# 4. Update app.json (if exists)
```

### Manual Version Management
```bash
# Check current version
npx react-native-device-info --version

# Build with new version
npm run android
npm run ios
```

## 🔄 Version Check Flow

1. **App Launch**: Checks if version checking is enabled
2. **Interval Check**: Only checks if enough time has passed since last check
3. **Store Query**: Fetches latest version from Play Store/App Store
4. **Version Compare**: Compares current vs latest version
5. **Update Dialog**: Shows appropriate dialog based on update type

## 📱 User Experience

### Major Update (Force Required)
- Shows "Update Required" dialog
- User must update to continue using the app
- "Update Now" button opens store
- "Later" button is disabled

### Minor Update (Optional)
- Shows "Update Available" dialog
- User can choose to update now or later
- App continues to work without update

## 🧪 Testing

### Test Version Check
```javascript
// In React Native debugger console
import { checkAppVersion } from '@utils/autoVersionCheck';
checkAppVersion().then(result => console.log(result));
```

### Force Version Check
```javascript
// Reset last check time to force immediate check
import AsyncStorage from '@react-native-async-storage/async-storage';
await AsyncStorage.removeItem('last_version_check');
```

### Disable Version Check
```javascript
// In src/config/index.js
export const APP_CONFIG = {
  APP_VERSION_CHECK: false, // Disable version checking
};
```

## 🚨 Troubleshooting

### Version Check Not Working
1. Check if `APP_VERSION_CHECK` is enabled
2. Verify internet connection
3. Check console logs for errors
4. Ensure Play Store/App Store URLs are correct

### Store Version Not Found
1. Verify app is published on stores
2. Check store URLs in config
3. Review parsing patterns in `getPlayStoreVersion()`

### Update Dialog Not Showing
1. Check if version comparison is working
2. Verify dialog conditions in `handleVersionCheck()`
3. Test with different version numbers

## 📊 Monitoring

### Console Logs
The system provides detailed logging:
- `🚀 Checking app version...`
- `📱 Current version: 1.0.0`
- `🆕 Latest version: 1.0.1`
- `✅ Version check complete`

### Storage Keys
- `app_version_info`: Stores version check results
- `last_version_check`: Stores last check timestamp

## 🔮 Future Enhancements

- **OTA Updates**: Implement over-the-air updates
- **Beta Testing**: Support for beta version checking
- **Analytics**: Track update adoption rates
- **Custom Update Server**: Use custom API instead of store APIs

## 📚 Related Files

- `src/config/index.js` - Configuration
- `src/utils/autoVersionCheck.js` - Main version checking logic
- `src/context/OnboardingContext.js` - Integration with app flow
- `scripts/update-version.js` - Version update script
- `docs/VERSION_MANAGEMENT.md` - This documentation
