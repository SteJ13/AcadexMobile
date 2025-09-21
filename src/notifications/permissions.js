import messaging from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';
import { PermissionsAndroid, Platform } from 'react-native';

export const requestUserPermission = async () => {
    try {
        // Get the default Firebase app to avoid deprecation warnings
        const app = getApp();
        const messagingInstance = messaging(app);
        
        const authStatus = await messagingInstance.requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Notification permission enabled');
        }

        // Handle Android 13+ POST_NOTIFICATIONS permission
        if (Platform.OS === 'android' && Platform.Version >= 33) {
            const result = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            );
            console.log('POST_NOTIFICATIONS permission:', result);
        }

        return enabled;
    } catch (error) {
        console.error('Error requesting notification permission:', error);
        return false;
    }
};

export const getFCMToken = async () => {
    try {
        // Get the default Firebase app to avoid deprecation warnings
        const app = getApp();
        const messagingInstance = messaging(app);
        
        const token = await messagingInstance.getToken();
        console.log('FCM Token:', token);
        return token;
    } catch (error) {
        console.error('Error getting FCM token:', error);
        return null;
    }
};
