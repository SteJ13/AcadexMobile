import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useToast } from '@context/ToastContext';
import ScreenWrapper from './ScreenWrapper';
import InputBox from '@components/FormControls/InputBox';
import GradientButton from '@components/FormControls/GradientButton';
import useStyles from '@hooks/useStyles';
import UserIcon from '@assets/icons/UserIcon';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@context/AuthContext';

export default function Login() {
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
    const { updateLoginData } = useAuth();
    const { control, getValues, formState: { isValid }, trigger } = useForm({ mode: 'onChange' });

    const handleSearch = async () => {
        const isValidForm = await trigger();
        if (isValidForm) {
            const data = getValues();
            updateLoginData('emailOrPhone', data.emailOrPhone);
            console.log('Search data: ', data);
            navigation.navigate('SchoolSelect');
        } else {
            toast.error('Please enter a valid email or phone number');
        }
    };

    return (
        <ScreenWrapper
            headerHeightRatio={0.80}
            formControl={
                <View style={styles.formContainer}>
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
                </View>
            }
            bottomSheet={
                <GradientButton
                    label="Search"
                    onPress={handleSearch}
                    disabled={!isValid}
                />
            }
        />
    );
}