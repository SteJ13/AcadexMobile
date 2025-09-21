import messaging from '@react-native-firebase/messaging';
import { requestUserPermission, getFCMToken } from './permissions';
import { setupNotificationHandlers } from './handlers';

class NotificationService {
    constructor() {
        this.isInitialized = false;
        this.cleanup = null;
    }

    async initialize() {
        if (this.isInitialized) {
            return;
        }

        try {
            // Request permissions
            const hasPermission = await requestUserPermission();
            
            if (hasPermission) {
                // Get FCM token
                await getFCMToken();
                
                // Setup notification handlers
                this.cleanup = setupNotificationHandlers();
                
                this.isInitialized = true;
                console.log('NotificationService initialized successfully');
            } else {
                console.log('Notification permissions not granted');
            }
        } catch (error) {
            console.error('Error initializing NotificationService:', error);
        }
    }

    async getToken() {
        try {
            return await getFCMToken();
        } catch (error) {
            console.error('Error getting FCM token:', error);
            return null;
        }
    }

    destroy() {
        if (this.cleanup && typeof this.cleanup === 'function') {
            this.cleanup();
            this.cleanup = null;
        }
        this.isInitialized = false;
        console.log('NotificationService destroyed');
    }

    isReady() {
        return this.isInitialized;
    }
}

// Export singleton instance
export default new NotificationService();
