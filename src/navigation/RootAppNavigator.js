import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './AppNavigator';

const Stack = createNativeStackNavigator();

const RootAppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainApp" component={AppNavigator} />
    </Stack.Navigator>
  );
};

export default RootAppNavigator;
