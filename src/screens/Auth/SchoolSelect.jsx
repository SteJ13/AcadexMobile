import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useToast } from '@context/ToastContext';
import ScreenWrapper from './ScreenWrapper';
import GradientButton from '@components/FormControls/GradientButton';
import useStyles from '@hooks/useStyles';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@context/AuthContext';
import { useTranslation } from 'react-i18next';
import axiosInstance from '@utils/axiosInstance';

export default function ManagementSelect() {
    const { t } = useTranslation();
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
            managementCard: {
                backgroundColor: theme.light,
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
                borderWidth: 2,
                borderColor: '#e0e0e0',
                flexDirection: 'row',
                alignItems: 'center',
            },
            selectedCard: {
                borderColor: theme.primary,
                backgroundColor: theme.primary + '10',
            },
            institutionLogo: {
                width: 50,
                height: 50,
                borderRadius: 25,
                marginRight: 16,
                backgroundColor: '#e0e0e0',
            },
            institutionInfo: {
                flex: 1,
            },
            institutionName: {
                fontSize: 16,
                fontWeight: 'bold',
                color: theme.dark,
                marginBottom: 4,
            },
            radioButton: {
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: '#e0e0e0',
                alignItems: 'center',
                justifyContent: 'center',
            },
            selectedRadioButton: {
                borderColor: theme.primary,
                backgroundColor: theme.primary,
            },
            radioButtonInner: {
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: theme.light,
            },
        })
    );

    const navigation = useNavigation();
    const { loginData, updateLoginData } = useAuth();
    const [loading, setLoading] = useState(false);
    console.log('loginData', loginData);
    const { control, formState: { isValid }, handleSubmit } = useForm({ mode: 'onChange' });

    const onSubmit = async (data) => {
        console.log('Management selection: ',loginData, data);
        const payload = {
            "institutionCode": data.management,
            "roleId": loginData.role,
            "memberId": 0,
            "category": loginData.role,
            "memberName": "string",
            "mobileNo": loginData.emailOrPhone,
            "photoPath": "string",
            "isActive": 0
          }
        console.log(payload,'======')
        setLoading(true);
        axiosInstance.post('portal/load-member', payload)
        .then(response => {
            console.log('Management selection: ', response.data);
            updateLoginData('selectedManagement', data.management);
            updateLoginData('membersData', response.data.portalMembers);
            navigation.navigate('UserSelect');
        })
        .catch(error => {
            console.log('Management selection: ', error);
        })
        .finally(() => {
            setLoading(false);
        })
    };

    const handleForgotPassword = () => {
        navigation.navigate('ForgotPassword');
    };

    return (
        <ScreenWrapper
            headerHeightRatio={0.70}
            formControl={
                <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
                    <Controller
                        control={control}
                        name="management"
                        rules={{ required: 'Please select a management' }}
                        render={({ field: { onChange, value } }) => (
                            <View>
                                {loginData.managementData?.map((management) => (
                                    <TouchableOpacity
                                        key={management.managementId}
                                        style={[
                                            styles.managementCard,
                                            value === management.institutionCode && styles.selectedCard
                                        ]}
                                        onPress={() => onChange(management.institutionCode)}
                                    >
                                        <View style={styles.institutionLogo}>
                                            {management.institutionLogosm ? (
                                                <Image
                                                    source={{ uri: management.institutionLogosm }}
                                                    style={styles.institutionLogo}
                                                />
                                            ) : (
                                                <Text style={{ color: '#666', fontSize: 12, textAlign: 'center' }}>
                                                    Logo
                                                </Text>
                                            )}
                                        </View>
                                        <View style={styles.institutionInfo}>
                                            <Text style={styles.institutionName}>
                                                {management.institutionName}
                                            </Text>
                                        </View>
                                        <View style={[
                                            styles.radioButton,
                                            value === management.institutionCode && styles.selectedRadioButton
                                        ]}>
                                            {value === management.institutionCode && (
                                                <View style={styles.radioButtonInner} />
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    />
                </ScrollView>
            }
            bottomSheet={
                <>
                    <Text style={styles.forgotPasswordText} onPress={handleForgotPassword}>
                        {t('auth.forgotPassword')}
                    </Text>
                    <GradientButton
                        label={t('common.submit')}
                        onPress={handleSubmit(onSubmit)}
                        disabled={!isValid || loading}
                        loading={loading}
                    />
                </>
            }
        />
    );
}
