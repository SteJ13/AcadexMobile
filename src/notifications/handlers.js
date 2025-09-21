import messaging from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';
import { Alert } from 'react-native';

export const setupNotificationHandlers = () => {
    // Get the default Firebase app to avoid deprecation warnings
    const app = getApp();
    const messagingInstance = messaging(app);
    
    // 🔵 Foreground message handler
    const unsubscribeForeground = messagingInstance.onMessage(async remoteMessage => {
        console.log('Foreground notification received:', remoteMessage);
        
        // Show alert for foreground notifications
        Alert.alert(
            remoteMessage.notification?.title || 'New Notification',
            remoteMessage.notification?.body || '',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        // Handle notification tap
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
    // Handle navigation or other actions based on notification data
    const data = remoteMessage.data;
    
    if (data) {
        console.log('Notification data:', data);
        
        // Example: Navigate to specific screen based on notification type
        if (data.screen) {
            // You can use navigation here if needed
            console.log('Navigate to screen:', data.screen);
        }
        
        if (data.action) {
            console.log('Perform action:', data.action);
        }
    }
};
