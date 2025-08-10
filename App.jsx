import React, { useEffect } from 'react'
import messaging from '@react-native-firebase/messaging';
import { ThemeProvider } from './src/context/ThemeContext'
import RootNavigator from './src/navigation/RootNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { requestUserPermission } from './notifications'
import { AuthProvider } from '@context/AuthContext';
import { ToastProvider } from '@context/ToastContext';

export default function App() {

  useEffect(() => {
    requestUserPermission();
    messaging()
      .getToken()
      .then(token => {
        console.log('FCM Token:', token);
      });
  }, []);

  useEffect(() => {
    // 🔵 Foreground
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('New Notification', remoteMessage.notification?.body || '');
    });

    // 🟡 Background
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification opened from background state:', remoteMessage.notification);
      // Navigate or act based on notification data
    });

    // 🔴 App Quit
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('App opened from quit state by notification:', remoteMessage.notification);
          // Navigate or act
        }
      });

    return unsubscribe;
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>

          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>

        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}