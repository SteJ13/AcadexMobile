import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text, View } from 'react-native';
import SettingsScreen from '@screens/Settings/SettingsScreen';
import Login from '@screens/Auth/Login';

const Stack = createNativeStackNavigator();

const SettingsStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SettingsHome" component={SettingsScreen} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    );
};

export default SettingsStack;
