import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useToast } from '@context/ToastContext';
import ScreenWrapper from './ScreenWrapper';
import GradientButton from '@components/FormControls/GradientButton';
import useStyles from '@hooks/useStyles';
import { useForm } from 'react-hook-form';
import RadioGroup from '@components/FormControls/RadioGroup';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@context/AuthContext';

export default function SchoolSelect() {
    const styles = useStyles((theme) =>
        StyleSheet.create({
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
        })
    );

    const toast = useToast();
    const navigation = useNavigation();
    const { updateLoginData } = useAuth();
    const { control, getValues, formState: { isValid }, trigger } = useForm({ mode: 'onChange' });

    const handleSubmit = async () => {
        const isValidForm = await trigger();
        if (isValidForm) {
            const data = getValues();
            updateLoginData('school', data.school);
            console.log('School selection: ', data);
            navigation.navigate('UserSelect');
        } else {
            toast.error('Please select a school');
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
                    <RadioGroup
                        control={control}
                        name="school"
                        rules={{ required: 'Please select a School' }}
                        options={[
                            { label: 'Scared Heart Mat School', value: 'shmc' },
                            { label: 'Little Flower Hr Sec School', value: 'lfhsc' },
                            { label: 'Morning Start School', value: 'mss' },
                        ]}
                    />
                </View>
            }
            bottomSheet={
                <>
                    <Text style={styles.forgotPasswordText} onPress={handleForgotPassword}>
                        Forgot Password?
                    </Text>
                    <GradientButton
                        label="Submit"
                        onPress={handleSubmit}
                        disabled={!isValid}
                    />
                </>
            }
        />
    );
}
