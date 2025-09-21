import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '@context/AuthContext';
import SplashScreen from '@components/SplashScreen';
import SchoolSelect from '@screens/Auth/SchoolSelect';
import UserSelect from '@screens/Auth/UserSelect';
import LoginForm from '@screens/Auth/LoginForm';
import ForgotPassword from '@screens/Auth/ForgotPassword';
import RootAppNavigator from './RootAppNavigator';

const Stack = createNativeStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="LoginForm" component={LoginForm} options={{ headerShown: false }} />
            <Stack.Screen name="ManagementSelect" component={SchoolSelect} options={{ headerShown: false }} />
            <Stack.Screen name="UserSelect" component={UserSelect} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const RootNavigator = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <SplashScreen />;
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
                <Stack.Screen name="App" component={RootAppNavigator} />
            ) : (
                <Stack.Screen name="Auth" component={AuthStack} />
            )}
        </Stack.Navigator>
    );
};

export default RootNavigator;
