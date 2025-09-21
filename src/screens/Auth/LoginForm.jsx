import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useToast } from '@context/ToastContext';
import ScreenWrapper from './ScreenWrapper';
import InputBox from '@components/FormControls/InputBox';
import SelectBox from '@components/FormControls/SelectBox';
import GradientButton from '@components/FormControls/GradientButton';
import useStyles from '@hooks/useStyles';
import UserIcon from '@assets/icons/UserIcon';
import { useForm } from 'react-hook-form';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useAuth } from '@context/AuthContext';
import axiosInstance from '@utils/axiosInstance';
import { useTranslation } from 'react-i18next';

export default function LoginForm() {
    const { t } = useTranslation();
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
    const { updateLoginData, login } = useAuth();
    const [roleOptions, setRoleOptions] = useState([]);
    const [loadingRoles, setLoadingRoles] = useState(true);
    const [loginLoading, setLoginLoading] = useState(false);
    console.log('loginloading', loginLoading);

    const { control, handleSubmit, formState: { isValid }, reset } = useForm({
        mode: 'onChange',
        defaultValues: {
            mobileNo: '',
            role: '',
        }
    });

    // Fetch user roles on component mount
    useEffect(() => {
        fetchUserRoles();
    }, []);

    // Clear form when screen comes into focus (after successful login and back navigation)
    useFocusEffect(
        React.useCallback(() => {
            // Reset form to default values when screen comes into focus
            reset({
                mobileNo: '',
                role: '',
            });
        }, [reset])
    );

    const fetchUserRoles = () => {
        setLoadingRoles(true);

        axiosInstance.get('admin/get-mobile-user-role')
            .then(response => {
                console.log('User roles response:', response.data);
                const roles = response.data.userRole.map(role => ({
                    value: role.roleId,
                    label: role.roleName,
                    isAdmin: role.isAdmin
                }));
                setRoleOptions(roles);
            })
            .catch(error => {
                console.error('Error fetching user roles:', error);
                toast.error(error.message || 'Failed to load user roles');
            })
            .finally(() => {
                setLoadingRoles(false);
            });
    };

    const handleLogin = (data) => {
        console.log('Login data: ', data);
        setLoginLoading(true);

        // Make API call to get management data
        const loginData = {
            mobileNo: data.mobileNo,
            roleId: data.role
        };

        axiosInstance.post('portal/search-user', loginData)
            .then(response => {
                console.log('Login response:', response.data);
                // Update login data with role and email/phone
                updateLoginData('role', data.role);
                updateLoginData('emailOrPhone', data.mobileNo);
                updateLoginData('managementData', response.data.management);
                // Clear form values after successful login
                reset({
                    mobileNo: '',
                    role: '',
                });
                navigation.navigate('ManagementSelect');
            })
            .catch(error => {
                console.error('Login error:', error);
                toast.error(error.message || 'Login failed. Please try again.');
            })
            .finally(() => {
                setLoginLoading(false);
            });
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
                        <SelectBox
                            control={control}
                            name="role"
                            rules={{ required: t('auth.selectRoleRequired') }}
                            placeholder={t('auth.selectRole')}
                            options={roleOptions}
                            loading={loadingRoles}
                            icon={<UserIcon width={24} height={24} style={styles.inputIcon} />}
                        />
                    </View>
                    <View style={styles.inputSpacing}>
                        <InputBox
                            control={control}
                            name="mobileNo"
                            rules={{
                                required: t('auth.mobileNoRequired'),
                                pattern: {
                                    value: /^[0-9a-zA-Z._%+-]+@[0-9a-zA-Z.-]+\.[a-zA-Z]{2,4}$|^[0-9]{10,}$/,
                                    message: t('auth.invalidEmailOrPhoneFormat')
                                }
                            }}
                            placeholder={t('auth.mobileNo')}
                            icon={<UserIcon width={24} height={24} style={styles.inputIcon} />}
                        />
                    </View>
                </View>
            }
            bottomSheet={
                <>
                    <Text style={styles.forgotPasswordText} onPress={handleForgotPassword}>
                        {t('auth.forgotPassword')}
                    </Text>
                    <GradientButton
                        label={t('common.login')}
                        onPress={handleSubmit(handleLogin)}
                        disabled={!isValid || loginLoading}
                        loading={loginLoading}
                    />
                </>
            }
        />
    );
}
