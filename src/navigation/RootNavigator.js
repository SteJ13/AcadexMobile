import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './stacks/HomeStack';
import ProfileStack from './stacks/ProfileStack';
import SettingsStack from '@navigation/stacks/SettingsStack';
import HomeIcon from '@assets/icons/HomeIcon';
import TabModuleIcon from '@assets/icons/TabModuleIcon';
import NotificationIcon from '@assets/icons/NotificationIcon';
import TabTransactionIcon from '@assets/icons/TabTransactionIcon';
import SettingsIcon from '@assets/icons/SettingsIcon';
import { useAuth } from '@context/AuthContext';
import SplashScreen from '@components/SplashScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import Login from '@screens/Auth/Login';
import SchoolSelect from '@screens/Auth/SchoolSelect';
import UserSelect from '@screens/Auth/UserSelect';
import LoginForm from '@screens/Auth/LoginForm';
import ForgotPassword from '@screens/Auth/ForgotPassword';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AppTabs({ userRole }) {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    switch (route.name) {
                        case 'Module':
                            return <TabModuleIcon color={color} width={size} height={size} />;
                        case 'Notification':
                            return <NotificationIcon color={color} width={size} height={size} />;
                        case 'Transactions':
                            return <TabTransactionIcon color={color} width={size} height={size} />;
                        case 'Settings':
                            return <SettingsIcon color={color} width={size} height={size} />;
                        default:
                            return <HomeIcon color={color} width={size} height={size} />;
                    }
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeStack} />
            {userRole === 'admin' && <Tab.Screen name="Module" component={ProfileStack} />}
            <Tab.Screen name="Notification" component={ProfileStack} />
            <Tab.Screen name="Transactions" component={ProfileStack} />
            <Tab.Screen name="Settings" component={SettingsStack} />
        </Tab.Navigator>
    );
}

function StackScreens({ userRole }) {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeStack} options={{ title: 'Welcome' }} />
            <Stack.Screen
                name="Details"
                component={HomeStack}
                options={({ route }) => ({ title: route?.params?.otherParam ?? 'Details' })}
            />
            <Stack.Screen
                name="Profile"
                component={HomeStack}
                options={{ presentation: 'modal' }}
            />
        </Stack.Navigator>
    )
}

function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="SchoolSelect" component={SchoolSelect} options={{ headerShown: false }} />
            <Stack.Screen name="UserSelect" component={UserSelect} options={{ headerShown: false }} />
            <Stack.Screen name="LoginForm" component={LoginForm} options={{ headerShown: false }} />
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
                <Stack.Screen name="App">
                    {() => <StackScreens userRole={user.role} />}
                </Stack.Screen>
            ) : (
                <Stack.Screen name="Auth" component={AuthStack} />
            )}
        </Stack.Navigator>
    );
};

export default RootNavigator;
