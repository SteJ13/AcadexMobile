import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text, View } from 'react-native';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home Screen</Text>
            <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
        </View>
    );
};

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeMain" component={HomeScreen} options={{ title: 'Home' }} />
            <Stack.Screen name="Details" component={HomeScreen} />
        </Stack.Navigator>
    );
};

export default HomeStack;
