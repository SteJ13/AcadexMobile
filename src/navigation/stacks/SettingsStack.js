import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text, View } from 'react-native';
import SettingsScreen from '@screens/Settings/SettingsScreen';
import Login from '@screens/Auth/Login';
import { useTheme } from '@context/ThemeContext';

const Stack = createNativeStackNavigator();

const SettingsStack = () => {
    const { theme, isDarkMode } = useTheme();

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.screenHeaderBackground,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 1,
                    borderBottomColor: isDarkMode ? '#333' : '#DDD',
                },
                headerTintColor: theme.text,
            }}
        >
            <Stack.Screen name="SettingsMain" component={SettingsScreen} options={{ title: "Settings" }} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    );
};

export default SettingsStack;
