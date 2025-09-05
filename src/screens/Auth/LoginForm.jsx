import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useToast } from '@context/ToastContext';
import ScreenWrapper from './ScreenWrapper';
import InputBox from '@components/FormControls/InputBox';
import GradientButton from '@components/FormControls/GradientButton';
import useStyles from '@hooks/useStyles';
import UserIcon from '@assets/icons/UserIcon';
import LockIcon from '@assets/icons/LockIcon';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@context/AuthContext';

export default function LoginForm() {
    const styles = useStyles((theme) =>
        StyleSheet.create({
            inputIcon: {
                marginRight: 10,
                color: theme.inputPlaceHolderIcon,
            },
            forgotPasswordText: {
                marginBottom: 12,
                textAlign: 'center',
                color: theme.dark,
                fontSize: 14,
                fontWeight: '500',
            },
            formContainer: {
                width: '100%',
                paddingHorizontal: 20,
            },
            inputSpacing: {
                marginBottom: 16,
            },
        })
    );

    const toast = useToast();
    const navigation = useNavigation();
    const { loginData, updateLoginData, clearLoginData, login } = useAuth();
    const { control, getValues, formState: { isValid }, trigger } = useForm({ 
        mode: 'onChange',
        defaultValues: {
            emailOrPhone: loginData.emailOrPhone,
        }
    });

    const handleLogin = async () => {
        const isValidForm = await trigger();
        if (isValidForm) {
            const data = getValues();
            const finalLoginData = {
                ...loginData,
                role: data.role,
                password: data.password,
            };
            console.log('Final login data: ', finalLoginData);
            
            try {
                // Here you would typically make an API call to authenticate the user
                // For now, we'll simulate a successful login
                const userData = {
                    id: '1',
                    name: loginData.user,
                    role: data.role,
                    email: loginData.emailOrPhone,
                    school: loginData.school,
                    token: 'mock-token-' + Date.now(),
                };
                
                await login(userData);
                toast.success('Login successful!');
                clearLoginData(); // Clear the login data after successful login
                // Navigation will be handled automatically by RootNavigator
            } catch (error) {
                toast.error('Login failed. Please try again.');
                console.error('Login error:', error);
            }
        } else {
            toast.error('Please fill all required fields correctly');
        }
    };

    const handleForgotPassword = () => {
        navigation.navigate('ForgotPassword');
    };

    return (
        <ScreenWrapper
            headerHeightRatio={0.70}
            formControl={
                <View style={styles.formContainer}>
                    <View style={styles.inputSpacing}>
                        <InputBox
                            control={control}
                            name="role"
                            rules={{ required: 'Please select a role' }}
                            placeholder="Select Role"
                            icon={<UserIcon width={24} height={24} style={styles.inputIcon} />}
                        />
                    </View>
                    <View style={styles.inputSpacing}>
                        <InputBox
                            control={control}
                            name="emailOrPhone"
                            rules={{ 
                                required: 'Email or Phone is required', 
                                pattern: { 
                                    value: /^[0-9a-zA-Z._%+-]+@[0-9a-zA-Z.-]+\.[a-zA-Z]{2,4}$|^[0-9]{10,}$/, 
                                    message: 'Invalid email or phone format' 
                                } 
                            }}
                            placeholder="Email or Phone"
                            icon={<UserIcon width={24} height={24} style={styles.inputIcon} />}
                        />
                    </View>
                    <View style={styles.inputSpacing}>
                        <InputBox
                            control={control}
                            name="password"
                            rules={{ required: 'Password is required' }}
                            placeholder="Password"
                            secureTextEntry={true}
                            icon={<LockIcon width={24} height={24} style={styles.inputIcon} />}
                        />
                    </View>
                </View>
            }
            bottomSheet={
                <>
                    <Text style={styles.forgotPasswordText} onPress={handleForgotPassword}>
                        Forgot Password?
                    </Text>
                    <GradientButton
                        label="Login"
                        onPress={handleLogin}
                        disabled={!isValid}
                    />
                </>
            }
        />
    );
}
