# Notifications Module

This folder contains all notification-related functionality for the Acadex app.

## Structure

```
src/notifications/
├── README.md                    # This documentation
├── index.js                     # Main exports for backward compatibility
├── NotificationService.js       # Singleton service for managing notifications
├── permissions.js              # Permission handling utilities
└── handlers.js                 # Notification event handlers
```

## Files Description

### `NotificationService.js`
- **Purpose**: Singleton service that manages the entire notification lifecycle
- **Features**: 
  - Initializes notifications on app start
  - Manages FCM token
  - Handles cleanup on app destroy
  - Provides utility methods for token access

### `permissions.js`
- **Purpose**: Handles notification permissions and FCM token retrieval
- **Exports**:
  - `requestUserPermission()`: Requests notification permissions
  - `getFCMToken()`: Gets the FCM token for the device

### `handlers.js`
- **Purpose**: Handles different notification states (foreground, background, quit)
- **Exports**:
  - `setupNotificationHandlers()`: Sets up all notification event listeners
  - `handleNotificationPress()`: Handles notification tap actions

### `index.js`
- **Purpose**: Main entry point that exports all notification functionality
- **Backward Compatibility**: Maintains compatibility with old import structure

## Usage

### Basic Usage (Recommended)
```javascript
import NotificationService from './src/notifications/NotificationService';

// Initialize (usually in App.jsx)
NotificationService.initialize();

// Get FCM token
const token = await NotificationService.getToken();

// Check if service is ready
if (NotificationService.isReady()) {
  // Service is initialized
}

// Cleanup (usually in App.jsx cleanup)
NotificationService.destroy();
```

### Individual Module Usage
```javascript
import { requestUserPermission, getFCMToken, setupNotificationHandlers } from './src/notifications';

// Request permissions
const hasPermission = await requestUserPermission();

// Get token
const token = await getFCMToken();

// Setup handlers
const cleanup = setupNotificationHandlers();
```

## Firebase Migration

This module uses the modern Firebase v9+ modular API to avoid deprecation warnings:

- ✅ Uses `messaging().requestPermission()` instead of deprecated methods
- ✅ Uses `messaging().getToken()` instead of deprecated methods
- ✅ Uses `messaging().onMessage()` instead of deprecated methods
- ✅ Uses `messaging().onNotificationOpenedApp()` instead of deprecated methods
- ✅ Uses `messaging().getInitialNotification()` instead of deprecated methods

## Notification States

1. **Foreground**: App is open and visible
   - Shows Alert dialog with notification content
   - Handles notification tap actions

2. **Background**: App is running but not visible
   - Logs notification data
   - Handles navigation when notification is tapped

3. **Quit**: App is completely closed
   - Logs notification data
   - Handles navigation when app is opened via notification

## Troubleshooting

### Notifications not showing in foreground
- Check if permissions are granted
- Verify FCM token is generated
- Check console logs for errors

### Notifications not working when app is closed
- Ensure proper Firebase configuration
- Check if `google-services.json` is properly configured
- Verify notification payload structure

## Future Enhancements

- [ ] Add notification scheduling
- [ ] Add notification categories
- [ ] Add custom notification sounds
- [ ] Add notification actions/buttons
- [ ] Add notification analytics
