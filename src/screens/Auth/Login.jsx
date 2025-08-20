import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { useToast } from '@context/ToastContext';
import ScreenWrapper from './ScreenWrapper';
import InputBox from '@components/FormControls/InputBox';
import GradientButton from '@components/FormControls/GradientButton';
import useStyles from '@hooks/useStyles';
import UserIcon from '@assets/icons/UserIcon';
import { useForm } from 'react-hook-form';
import RadioGroup from '@components/FormControls/RadioGroup';
import { useNavigation } from '@react-navigation/native';

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
            },
        })
    );

    const toast = useToast();
    const navigation = useNavigation();
    const { control, getValues, formState: { isValid }, trigger } = useForm({ mode: 'onChange' });
    console.log('isValid: ', isValid);
    const [currentScreen, setCurrentScreen] = React.useState('');
    console.log('data: ', getValues());

    const handleSearch = () => {
        if (isValid) {
            console.log('data: ', getValues());
            setCurrentScreen('schoolSelect');
        } else {
            trigger();
        }
    };

    switch (currentScreen) {
        case 'schoolSelect':
            return (<ScreenWrapper
                headerHeightRatio={0.70}
                formControl={
                    <RadioGroup
                        control={control}
                        name="school"
                        rules={{ required: 'Please select a School' }}
                        options={[
                            { label: 'Scared Heart Mat School', value: 'shmc' },
                            { label: 'Little Flower Hr Sec School', value: 'lfhsc' },
                            { label: 'Morning Start School', value: 'mss' },
                        ]}
                        handleChange={() => {
                            setCurrentScreen('userSelect');
                        }}
                    />
                }
                bottomSheet={
                    <>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        <GradientButton
                            label="Submit"
                            onPress={() => navigation.navigate('ForgotPassword')}
                        />
                    </>
                }
            />)
        case 'userSelect':
            return (<ScreenWrapper
                headerHeightRatio={0.70}
                formControl={
                    <RadioGroup
                        control={control}
                        name="user"
                        rules={{ required: 'Please select a user' }}
                        options={[
                            { label: 'Maria Hema Tamilarasi', value: 'mht' },
                            { label: 'Velanganni', value: 'vel' },
                        ]}
                        handleChange={() => {
                            setCurrentScreen('userSelect');
                        }}
                    />
                }
                bottomSheet={
                    <>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        <GradientButton
                            label="Submit"
                            onPress={() => navigation.navigate('ForgotPassword')}
                        />
                    </>
                }
            />)
        default:
            return (
                <ScreenWrapper
                    headerHeightRatio={0.80}
                    formControl={
                        <InputBox
                            control={control}
                            name="emailOrPhone"
                            rules={{ required: 'Email or Phone is required', pattern: { value: /^[0-9a-zA-Z._%+-]+@[0-9a-zA-Z.-]+\.[a-zA-Z]{2,4}$/, message: 'Invalid email format' } }}
                            icon={<UserIcon width={24} height={24} style={styles.inputIcon} />}
                        />
                    }
                    bottomSheet={<GradientButton
                        label="Search"
                        onPress={handleSearch}
                    // disabled={!isValid}
                    />}
                />
            )
    }

}