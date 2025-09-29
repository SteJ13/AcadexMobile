import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '@context/AuthContext';
import { useOnboarding } from '@context/OnboardingContext';
import SchoolSelect from '@screens/Auth/SchoolSelect';
import UserSelect from '@screens/Auth/UserSelect';
import LoginForm from '@screens/Auth/LoginForm';
import ForgotPassword from '@screens/Auth/ForgotPassword';
import RootAppNavigator from './RootAppNavigator';
import IndependentNotificationsScreen from '../notifications/IndependentNotificationsScreen';
import OnboardingScreen from '@screens/features/OnboardingScreen';
import DebugScreen from '@screens/DebugScreen';
import { navigationRef } from './NavigationService';

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
    const { user } = useAuth();
    const { isOnboardingComplete, versionCheckPassed, completeOnboarding } = useOnboarding();

    console.log('🧭 RootNavigator render:', {
        user: !!user,
        isOnboardingComplete,
        versionCheckPassed
    });

    // If version check failed, don't render anything (version dialog will be shown)
    if (!versionCheckPassed) {
        console.log('❌ Version check failed, not rendering navigator');
        return null;
    }

    return (
        <Stack.Navigator 
            ref={navigationRef}
            screenOptions={{ headerShown: false }}
        >
            {user ? (
                <Stack.Screen name="App" component={RootAppNavigator} />
            ) : (
                <>
                    {!isOnboardingComplete ? (
                        <Stack.Screen 
                            name="Onboarding" 
                            options={{ headerShown: false }}
                        >
                            {() => <OnboardingScreen onComplete={completeOnboarding} />}
                        </Stack.Screen>
                    ) : (
                        <Stack.Screen name="Auth" component={AuthStack} />
                    )}
                    <Stack.Screen 
                        name="IndependentNotifications" 
                        component={IndependentNotificationsScreen}
                        options={{ 
                            headerShown: false,
                            presentation: 'modal' // Makes it feel like a separate screen
                        }}
                    />
                    <Stack.Screen 
                        name="Debug" 
                        component={DebugScreen}
                        options={{ 
                            headerShown: false
                        }}
                    />
                </>
            )}
        </Stack.Navigator>
    );
};

export default RootNavigator;
