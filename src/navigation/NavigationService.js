import { createNavigationContainerRef } from '@react-navigation/native';
import { DeviceEventEmitter } from 'react-native';

// Create a navigation reference
export const navigationRef = createNavigationContainerRef();

// Event names for tab navigation
export const TAB_NAVIGATION_EVENTS = {
  SWITCH_TO_NOTIFICATIONS: 'SWITCH_TO_NOTIFICATIONS',
  SWITCH_TO_TAB: 'SWITCH_TO_TAB'
};

// Navigation service for handling navigation from outside components
class NavigationService {
  // Navigate to a specific screen
  navigate(routeName, params) {
    if (navigationRef.isReady()) {
      navigationRef.navigate(routeName, params);
    } else {
      console.log('Navigation not ready yet');
    }
  }

  // Navigate to NotificationsScreen specifically
  navigateToNotifications() {
    // Navigate to the App screen first
    this.navigate('App');
    
    // Emit event to switch to Notifications tab
    DeviceEventEmitter.emit(TAB_NAVIGATION_EVENTS.SWITCH_TO_NOTIFICATIONS);
  }

  // Navigate to a specific tab in the bottom tab navigator
  navigateToTab(tabName) {
    this.navigate('App', { 
      screen: tabName 
    });
  }

  // Navigate to a drawer screen
  navigateToDrawerScreen(screenName) {
    this.navigate('App', { 
      screen: 'Drawer',
      params: { screen: screenName }
    });
  }

  // Check if user is logged in
  isUserLoggedIn() {
    // This would need to be connected to your auth context
    // For now, we'll assume the navigation structure tells us
    return navigationRef.isReady() && navigationRef.getCurrentRoute()?.name !== 'Auth';
  }

  // Handle push notification navigation
  handlePushNotificationNavigation(notificationData) {
    if (!navigationRef.isReady()) {
      console.log('Navigation not ready, storing notification for later');
      return;
    }

    const { data } = notificationData;
    const currentRoute = navigationRef.getCurrentRoute();
    
    console.log('Current route when handling notification:', currentRoute);
    
    // Check if user is logged in by checking if we're in the App stack
    const isLoggedIn = currentRoute?.name === 'App' || 
                      (currentRoute?.params && currentRoute.params.screen === 'App');
    
    console.log('Is user logged in:', isLoggedIn);
    
    // Always navigate to notifications screen when notification is clicked
    // This ensures that even when app is minimized, clicking notification goes to notifications
    if (isLoggedIn) {
      console.log('Navigating to notifications screen for logged-in user');
      this.navigateToNotifications();
    } else {
      console.log('Navigating to independent notifications screen for non-logged-in user');
      this.navigate('IndependentNotifications');
    }
  }
}

// Export singleton instance
export default new NavigationService();
