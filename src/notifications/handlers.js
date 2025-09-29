import messaging from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';
import { Alert } from 'react-native';
import NavigationService from '@navigation/NavigationService';

export const setupNotificationHandlers = () => {
    // Get the default Firebase app to avoid deprecation warnings
    const app = getApp();
    const messagingInstance = messaging(app);
    
    // 🔵 Foreground message handler
    const unsubscribeForeground = messagingInstance.onMessage(async remoteMessage => {
        console.log('Foreground notification received:', remoteMessage);
        
        // Show alert for foreground notifications with View and Close buttons
        Alert.alert(
            remoteMessage.notification?.title || 'New Notification',
            remoteMessage.notification?.body || '',
            [
                {
                    text: 'Close',
                    style: 'cancel',
                    onPress: () => {
                        // Just close the popup, no navigation
                        console.log('Notification popup closed');
                    }
                },
                {
                    text: 'View',
                    onPress: () => {
                        // Navigate to notifications screen
                        handleNotificationPress(remoteMessage);
                    }
                }
            ]
        );
    });

    // 🟡 Background message handler (when app is in background)
    const unsubscribeBackground = messagingInstance.onNotificationOpenedApp(remoteMessage => {
        console.log('Notification opened from background state:', remoteMessage.notification);
        handleNotificationPress(remoteMessage);
    });

    // 🔴 App quit state handler (when app is completely closed)
    messagingInstance
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log('App opened from quit state by notification:', remoteMessage.notification);
                handleNotificationPress(remoteMessage);
            }
        });

    // Return cleanup function
    return () => {
        unsubscribeForeground();
        unsubscribeBackground();
    };
};

const handleNotificationPress = (remoteMessage) => {
    console.log('Handling notification press:', remoteMessage);
    
    // Use NavigationService to handle navigation
    NavigationService.handlePushNotificationNavigation(remoteMessage);
    
    // Handle additional actions based on notification data
    const data = remoteMessage.data;
    if (data?.action) {
        console.log('Perform action:', data.action);
        // Handle specific actions here if needed
    }
};
