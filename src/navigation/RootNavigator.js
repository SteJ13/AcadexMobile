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

const Tab = createBottomTabNavigator();

const RootNavigator = () => {
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
            <Tab.Screen name="Module" component={ProfileStack} />
            <Tab.Screen name="Notification" component={ProfileStack} />
            <Tab.Screen name="Transactions" component={ProfileStack} />
            <Tab.Screen name="Settings" component={SettingsStack} />
        </Tab.Navigator>
    );
};

export default RootNavigator;
