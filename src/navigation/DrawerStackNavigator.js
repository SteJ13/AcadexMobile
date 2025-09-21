import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { getMenuItemsByRole } from '../config/drawerMenuConfig';

// Import all drawer screen components
import FeesScreen from '../screens/Student/FeesScreen';
import AttendanceScreen from '../screens/Student/AttendanceScreen';
import StaffFeesScreen from '../screens/Staff/StaffFeesScreen';
import StaffAttendanceScreen from '../screens/Staff/StaffAttendanceScreen';

const Stack = createNativeStackNavigator();

const DrawerStackNavigator = () => {
  const { user } = useAuth();
  const menuItems = getMenuItemsByRole(user?.roleId || 4);

  // Get drawer-only screens (non-tab screens)
  const drawerScreens = menuItems.filter(item => 
    !['Home', 'Profile', 'Dashboard', 'Notifications', 'Settings'].includes(item.screen)
  );

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {drawerScreens.map((item) => {
        const Component = item.component;
        return (
          <Stack.Screen
            key={item.id}
            name={item.screen}
            component={Component}
          />
        );
      })}
    </Stack.Navigator>
  );
};

export default DrawerStackNavigator;
