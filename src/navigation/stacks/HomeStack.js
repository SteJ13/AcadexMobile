import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text, View } from 'react-native';
import StudentProfile from '@screens/Student/StudentProfile';
import StudentDashboard from '@screens/Student/StudentDashboard';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
            <Text style={{ fontSize: 24, marginBottom: 30, color: '#333' }}>Welcome to AcadEx</Text>
            <Button title="Student Profile" onPress={() => navigation.navigate('StudentProfile')} />
            <View style={{ height: 20 }} />
            <Button title="Student Dashboard" onPress={() => navigation.navigate('StudentDashboard')} />
        </View>
    );
};

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeMain" component={HomeScreen} options={{ title: 'Home' }} />
            <Stack.Screen name="StudentProfile" component={StudentProfile} options={{ title: 'Student Profile' }} />
            <Stack.Screen name="StudentDashboard" component={StudentDashboard} options={{ title: 'Student Dashboard' }} />
        </Stack.Navigator>
    );
};

export default HomeStack;
