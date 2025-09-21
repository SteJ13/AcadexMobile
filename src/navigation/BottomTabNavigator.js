import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { getMenuItemsByRole } from '../config/drawerMenuConfig';
import HomeScreen from '../screens/Home/HomeScreen';
import NotificationsScreen from '../screens/Notifications/NotificationsScreen';
import StudentProfile from '../screens/Student/StudentProfile';
import StudentDashboard from '../screens/Student/StudentDashboard';
import SettingsScreen from '../screens/Settings/SettingsScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  
  // Get menu items based on user role
  const menuItems = getMenuItemsByRole(user?.roleId || 4);
  
  // Filter items that should be in bottom tabs (specific 5 tabs)
  const bottomTabItems = menuItems.filter(item => 
    ['Home', 'Profile', 'Dashboard', 'Notifications', 'Settings'].includes(item.screen)
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarActiveTintColor: '#8A2BE2',
        tabBarInactiveTintColor: '#666',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      {bottomTabItems.map((item) => {
        let component;
        let tabBarIcon;
        
        switch (item.screen) {
          case 'Home':
            component = HomeScreen;
            tabBarIcon = '🏠';
            break;
          case 'Profile':
            component = StudentProfile;
            tabBarIcon = '👤';
            break;
          case 'Dashboard':
            component = StudentDashboard;
            tabBarIcon = '📊';
            break;
          case 'Notifications':
            component = NotificationsScreen;
            tabBarIcon = '🔔';
            break;
          case 'Settings':
            component = SettingsScreen;
            tabBarIcon = '⚙️';
            break;
          default:
            component = HomeScreen;
            tabBarIcon = '🏠';
        }

        return (
          <Tab.Screen
            key={item.id}
            name={item.screen}
            component={component}
            options={{
              title: t(item.title),
              tabBarIcon: ({ color, size }) => (
                <Text style={{ fontSize: 20, color }}>{tabBarIcon}</Text>
              ),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;