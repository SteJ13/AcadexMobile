import { View, Button } from 'react-native'
import React from 'react'
import { useToast } from '@context/ToastContext';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const toast = useToast();
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Show Success" onPress={() => toast.success('Operation successful!')} />
            <Button title="Show Error" onPress={() => toast.error('Something went wrong!')} />
            <Button title="Forgot Password" onPress={() => navigation.navigate('ForgotPassword')} />
        </View>
    )
}