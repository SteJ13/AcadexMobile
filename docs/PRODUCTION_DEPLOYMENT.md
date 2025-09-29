# 🚀 Production Deployment Guide

This guide explains how to prepare your Acadex app for production deployment and enable version checking.

## 📱 Pre-Deployment Checklist

### 1. **Version Management**
- [ ] Update app version using `npm run version X.X.X`
- [ ] Test version update script works correctly
- [ ] Verify version numbers are synced across platforms

### 2. **Configuration Updates**
- [ ] Enable version checking in `src/config/index.js`
- [ ] Update Play Store/App Store URLs
- [ ] Configure version check settings

### 3. **Testing**
- [ ] Test splash screen with all conditions
- [ ] Verify onboarding flow works correctly
- [ ] Test version checking (when deployed)

## 🔧 Configuration Changes for Production

### Enable Version Checking

Update `src/config/index.js`:

```javascript
export const APP_CONFIG = {
  // Enable version checking for production
  APP_VERSION_CHECK: true,
  
  // Update store URLs with actual app URLs
  PLAY_STORE_URL: 'https://play.google.com/store/apps/details?id=com.acadex',
  APP_STORE_URL: 'https://apps.apple.com/app/acadex/id123456789',
  
  // Configure version check settings
  VERSION_CHECK: {
    CHECK_INTERVAL: 24, // Check every 24 hours
    FORCE_UPDATE_VERSIONS_BEHIND: 2, // Force update if 2+ versions behind
    SHOW_MINOR_UPDATE_DIALOG: true, // Show dialog for minor updates
  },
  
  // Disable development settings
  DEVELOPMENT: {
    SKIP_VERSION_CHECK: false,
    SHOW_DEBUG_INFO: false,
  },
};
```

### Update Store URLs

1. **Google Play Store**: Replace with your actual Play Store URL
2. **App Store**: Replace with your actual App Store URL
3. **Test URLs**: Ensure URLs are accessible and correct

## 🏗️ Build Process

### 1. **Update Version**
```bash
# Update to new version (e.g., 1.0.2)
npm run version 1.0.2

# This will update:
# - package.json version
# - Android versionName and versionCode
# - iOS MARKETING_VERSION
# - app.json (if exists)
```

### 2. **Build for Production**
```bash
# Android
cd android
./gradlew bundleRelease

# iOS
cd ios
xcodebuild -workspace Acadex.xcworkspace -scheme Acadex -configuration Release
```

### 3. **Deploy to Stores**
- Upload AAB to Google Play Console
- Upload IPA to App Store Connect
- Wait for store approval and publication

## 🔄 Version Check Flow

### How It Works
1. **App Launch**: Checks if version checking is enabled
2. **Store Query**: Fetches latest version from Play Store/App Store
3. **Version Compare**: Compares current vs latest version
4. **Update Dialog**: Shows appropriate dialog based on update type

### User Experience
- **Major Update**: Force update required (blocks app usage)
- **Minor Update**: Optional update (user can choose)
- **No Update**: App continues normally

## 🧪 Testing Version Check

### Test with Different Versions
1. **Lower Version**: Set `CURRENT_VERSION` to lower than store version
2. **Same Version**: Set `CURRENT_VERSION` to match store version
3. **Higher Version**: Set `CURRENT_VERSION` to higher than store version

### Test Scenarios
- **Network Issues**: Test with poor/no internet connection
- **Store Unavailable**: Test when store is down
- **Invalid URLs**: Test with incorrect store URLs

## 📊 Monitoring

### Console Logs
Monitor these logs for version check status:
```
🚀 Initializing app...
📱 Checking app version...
📱 Current version: 1.0.1
🆕 Latest version: 1.0.2
✅ Version check complete: needsUpdate=true
```

### Analytics
Track these metrics:
- Version check success rate
- Update adoption rate
- User retention after updates

## 🚨 Troubleshooting

### Common Issues

#### Version Check Fails
- **Cause**: Network issues, store API changes
- **Solution**: Implement fallback, retry logic

#### Update Dialog Not Showing
- **Cause**: Version comparison logic, dialog conditions
- **Solution**: Check version comparison, dialog triggers

#### Store Version Not Found
- **Cause**: App not published, incorrect URLs
- **Solution**: Verify store URLs, check app publication status

### Debug Steps
1. Check console logs for version check process
2. Verify store URLs are correct and accessible
3. Test version comparison logic
4. Check network connectivity

## 🔮 Post-Deployment

### Monitor Performance
- Track app launch times
- Monitor version check success rates
- Analyze user update behavior

### Iterate and Improve
- Adjust version check frequency
- Optimize update dialog UX
- Implement A/B testing for update prompts

## 📚 Related Files

- `src/config/index.js` - Main configuration
- `src/utils/autoVersionCheck.js` - Version checking logic
- `src/context/OnboardingContext.js` - Integration
- `scripts/update-version.js` - Version update script
- `docs/VERSION_MANAGEMENT.md` - Detailed version management guide

## 🎉 Benefits

1. **User Safety**: Ensures users have latest security updates
2. **Feature Adoption**: Users get new features automatically
3. **Bug Fixes**: Critical bugs are fixed in latest version
4. **Performance**: Latest version has performance improvements
5. **Compliance**: Meets store requirements for updates

## 📝 Quick Reference

### Enable Version Check
```javascript
APP_VERSION_CHECK: true
DEVELOPMENT.SKIP_VERSION_CHECK: false
```

### Disable Version Check
```javascript
APP_VERSION_CHECK: false
DEVELOPMENT.SKIP_VERSION_CHECK: true
```

### Update Version
```bash
npm run version 1.0.2
```

### Test Version Check
```javascript
// In console
import { checkAppVersion } from '@utils/autoVersionCheck';
checkAppVersion().then(result => console.log(result));
```

Your Acadex app is now ready for production deployment with comprehensive version management! 🚀
