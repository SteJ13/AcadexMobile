import React from 'react';
import { Button, Text, View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const ProfileScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Profile Screen</Text>
            <Button title="Go to Profile" onPress={() => navigation.navigate('HomeScreen')} />
        </View>
    );
};

const ProfileStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="ProfileDetail" component={ProfileScreen} />
        </Stack.Navigator>
    );
};

export default ProfileStack;
