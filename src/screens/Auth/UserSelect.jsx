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
import { useTranslation } from 'react-i18next';

export default function UserSelect() {
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
        })
    );

    const toast = useToast();
    const navigation = useNavigation();
    const { loginData, updateLoginData, login } = useAuth();
    const { control, getValues, formState: { isValid }, trigger } = useForm({ mode: 'onChange' });

    const handleSubmit = async () => {
        const isValidForm = await trigger();
        if (isValidForm) {
            const data = getValues();
            
            // Find the selected member data
            const selectedMember = loginData.membersData?.find(member => member.memberId == data.user);
            
            if (selectedMember) {
                // Store both the member ID and full member data
                updateLoginData('user', data.user);
                updateLoginData('selectedMember', selectedMember);
                
                // Complete the login process by creating user object with all required fields
                const userData = {
                    id: `user_${Date.now()}`, // Generate unique ID
                    institutionCode: selectedMember.institutionCode,
                    roleId: selectedMember.roleId,
                    memberId: selectedMember.memberId,
                    category: selectedMember.category,
                    memberName: selectedMember.memberName,
                    mobileNo: selectedMember.mobileNo,
                    photoPath: selectedMember.photoPath,
                    isActive: selectedMember.isActive,
                    academicyear: "20", // Default value, can be updated from API later
                    class: 20, // Default value, can be updated from API later
                    className: "I A", // Default value, can be updated from API later
                    ConnetionString: "encrypted_string", // Default value, can be updated from API later
                    loginTime: new Date().toISOString(),
                    isLoggedIn: true
                };
                
                console.log('User selection: ', data);
                console.log('Selected member data: ', selectedMember);
                console.log('Complete user data: ', userData);
                
                // Login the user with complete data
                login(userData);
                
                // Navigation will be handled automatically by RootNavigator
                // when user state changes, it will show BottomTabNavigator
            } else {
                toast.error(t('auth.memberDataNotFound'));
            }
        } else {
            toast.error(t('auth.selectMemberError'));
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
                        name="user"
                        rules={{ required: t('auth.selectMemberError') }}
                        options={loginData.membersData?.map(member => ({
                            label: `${member.memberName}`,
                            value: member.memberId
                        })) || []}
                    />
                </View>
            }
            bottomSheet={
                <>
                    <Text style={styles.forgotPasswordText} onPress={handleForgotPassword}>
                        {t('auth.forgotPassword')}
                    </Text>
                    <GradientButton
                        label={t('common.submit')}
                        onPress={handleSubmit}
                        disabled={!isValid}
                    />
                </>
            }
        />
    );
}
