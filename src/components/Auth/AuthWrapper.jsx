import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import useStyles from '@hooks/useStyles';
import { useAuth } from '@context/AuthContext';
import { useToast } from '@context/ToastContext';
import InputBox from '@components/FormControls/InputBox';
import SelectBox from '@components/FormControls/SelectBox';
import GradientButton from '@components/FormControls/GradientButton';
import UserIcon from '@assets/icons/UserIcon';
import axiosInstance from '@utils/axiosInstance';

const AuthWrapper = ({ 
  onSuccess, 
  onCancel, 
  isModal = false,
  modalStyle = {} 
}) => {
  const { t } = useTranslation();
  const styles = useStyles(createStyles);
  const toast = useToast();
  const { updateLoginData, login, loginData } = useAuth();
  
  // Step management
  const [currentStep, setCurrentStep] = useState(1); // 1: LoginForm, 2: SchoolSelect, 3: UserSelect
  const [roleOptions, setRoleOptions] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [schoolLoading, setSchoolLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);

  const { control, handleSubmit, formState: { isValid }, reset, getValues, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      mobileNo: '',
      role: '',
      selectedManagement: '',
      selectedUser: '',
    }
  });

  // Watch form values for reactive updates
  const selectedManagement = watch('selectedManagement');
  const selectedUser = watch('selectedUser');

  // Fetch user roles on component mount
  useEffect(() => {
    fetchUserRoles();
  }, []);

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

  // Step 1: LoginForm - Role and Mobile Number
  const handleStep1 = (data) => {
    console.log('Step 1 data: ', data);
    setLoginLoading(true);

    const loginPayload = {
      mobileNo: data.mobileNo,
      roleId: data.role
    };

    axiosInstance.post('portal/search-user', loginPayload)
      .then(response => {
        console.log('Login response:', response.data);
        updateLoginData('role', data.role);
        updateLoginData('emailOrPhone', data.mobileNo);
        updateLoginData('managementData', response.data.management);
        setCurrentStep(2);
      })
      .catch(error => {
        console.error('Login error:', error);
        toast.error(error.message || 'Login failed. Please try again.');
      })
      .finally(() => {
        setLoginLoading(false);
      });
  };

  // Step 2: SchoolSelect - Select Management/Institution
  const handleStep2 = (data) => {
    console.log('Step 2 data: ', data);
    setSchoolLoading(true);

    const selectedManagement = loginData.managementData.find(
      mgmt => mgmt.managementId.toString() === data.selectedManagement
    );

    if (!selectedManagement) {
      toast.error('Please select a school');
      setSchoolLoading(false);
      return;
    }

    updateLoginData('selectedManagement', selectedManagement);

    // Use the same payload structure as SchoolSelect.jsx
    const payload = {
      "institutionCode": selectedManagement.institutionCode,
      "roleId": loginData.role,
      "memberId": 0,
      "category": loginData.role,
      "memberName": "string",
      "mobileNo": loginData.emailOrPhone,
      "photoPath": "string",
      "isActive": 0
    };

    console.log('Load member payload:', payload);

    axiosInstance.post('portal/load-member', payload)
      .then(response => {
        console.log('Load member response:', response.data);
        updateLoginData('membersData', response.data.portalMembers);
        setCurrentStep(3);
      })
      .catch(error => {
        console.error('Load member error:', error);
        toast.error(error.message || 'Failed to load members');
      })
      .finally(() => {
        setSchoolLoading(false);
      });
  };

  // Step 3: UserSelect - Select User and Complete Login
  const handleStep3 = (data) => {
    console.log('Step 3 data: ', data);
    setUserLoading(true);

    const selectedMember = loginData.membersData?.find(
      member => member.memberId.toString() === data.selectedUser
    );

    if (!selectedMember) {
      toast.error('Please select a user');
      setUserLoading(false);
      return;
    }

    // Create complete user object
    const userData = {
      id: `user_${Date.now()}`,
      institutionCode: selectedMember.institutionCode,
      roleId: selectedMember.roleId,
      memberId: selectedMember.memberId,
      category: selectedMember.category,
      memberName: selectedMember.memberName,
      mobileNo: selectedMember.mobileNo,
      photoPath: selectedMember.photoPath,
      isActive: selectedMember.isActive,
      academicyear: "20",
      class: 20,
      className: "I A",
      ConnetionString: "encrypted_string",
      loginTime: new Date().toISOString(),
      isLoggedIn: true
    };

    // Login the user
    login(userData);
    
    // Call success callback
    if (onSuccess) {
      onSuccess(userData);
    }

    setUserLoading(false);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else if (onCancel) {
      onCancel();
    }
  };

  const renderStep1 = () => (
    <View style={[styles.stepContainer, modalStyle]}>
      <Text style={styles.stepTitle}>{t('auth.selectRole')}</Text>
      <Text style={styles.stepSubtitle}>Select your role and enter your email or phone number</Text>
      
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
      
      <View style={styles.buttonContainer}>
        {onCancel && (
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelButtonText}>{t('common.cancel')}</Text>
          </TouchableOpacity>
        )}
        <GradientButton
          label={t('common.next')}
          onPress={handleSubmit(handleStep1)}
          style={styles.nextButton}
          loading={loginLoading}
          disabled={!isValid || loginLoading}
        />
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={[styles.stepContainer, modalStyle]}>
      <Text style={styles.stepTitle}>{t('auth.selectSchool')}</Text>
      <Text style={styles.stepSubtitle}>Select your school/institution</Text>
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {loginData.managementData?.map((management) => (
          <Controller
            key={management.managementId}
            control={control}
            name="selectedManagement"
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                style={[
                  styles.managementCard,
                  value === management.managementId.toString() && styles.selectedCard
                ]}
                onPress={() => onChange(management.managementId.toString())}
              >
                <View style={styles.cardContent}>
                  <Image
                    source={{ uri: management.institutionLogosm || 'https://via.placeholder.com/50' }}
                    style={styles.institutionLogo}
                    defaultSource={{ uri: 'https://via.placeholder.com/50' }}
                  />
                  <View style={styles.institutionInfo}>
                    <Text style={styles.institutionName}>{management.institutionName}</Text>
                    <Text style={styles.managementName}>{management.managementName}</Text>
                    <Text style={styles.institutionCode}>{management.institutionCode}</Text>
                  </View>
                  <View style={styles.radioButton}>
                    <View style={[
                      styles.radioCircle,
                      value === management.managementId.toString() && styles.radioSelected
                    ]}>
                      {value === management.managementId.toString() && <View style={styles.radioInner} />}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        ))}
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>{t('common.back')}</Text>
        </TouchableOpacity>
        <GradientButton
          label={t('common.next')}
          onPress={handleSubmit(handleStep2)}
          style={styles.nextButton}
          loading={schoolLoading}
          disabled={!selectedManagement || schoolLoading}
        />
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={[styles.stepContainer, modalStyle]}>
      <Text style={styles.stepTitle}>{t('auth.selectUser')}</Text>
      <Text style={styles.stepSubtitle}>Select your profile</Text>
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {loginData.membersData?.map((member) => (
          <Controller
            key={member.memberId}
            control={control}
            name="selectedUser"
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                style={[
                  styles.memberCard,
                  value === member.memberId.toString() && styles.selectedCard
                ]}
                onPress={() => onChange(member.memberId.toString())}
              >
                <View style={styles.cardContent}>
                  <View style={styles.memberAvatar}>
                    <Text style={styles.memberAvatarText}>
                      {member.memberName?.charAt(0)?.toUpperCase() || 'U'}
                    </Text>
                  </View>
                  <View style={styles.memberInfo}>
                    <Text style={styles.memberName}>{member.memberName}</Text>
                    <Text style={styles.memberDetails}>
                      {member.mobileNo} • {member.institutionCode}
                    </Text>
                  </View>
                  <View style={styles.radioButton}>
                    <View style={[
                      styles.radioCircle,
                      value === member.memberId.toString() && styles.radioSelected
                    ]}>
                      {value === member.memberId.toString() && <View style={styles.radioInner} />}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        ))}
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>{t('common.back')}</Text>
        </TouchableOpacity>
        <GradientButton
          label={t('common.confirm')}
          onPress={handleSubmit(handleStep3)}
          style={styles.nextButton}
          loading={userLoading}
          disabled={!selectedUser || userLoading}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
  },
  stepContainer: {
    flex: 1,
    padding: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.dark,
    marginBottom: 8,
    textAlign: 'center',
  },
  stepSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputSpacing: {
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 10,
    color: theme.inputPlaceHolderIcon,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: theme.dark,
    fontWeight: '600',
  },
  backButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: theme.dark,
    fontWeight: '600',
  },
  nextButton: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 20,
  },
  managementCard: {
    backgroundColor: theme.light,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  selectedCard: {
    borderColor: theme.primary,
    backgroundColor: theme.primary + '10',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: '600',
    color: theme.dark,
    marginBottom: 4,
  },
  managementName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  institutionCode: {
    fontSize: 12,
    color: '#999',
  },
  memberCard: {
    backgroundColor: theme.light,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  memberAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  memberAvatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.light,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.dark,
    marginBottom: 4,
  },
  memberDetails: {
    fontSize: 14,
    color: '#666',
  },
  radioButton: {
    marginLeft: 10,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: theme.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.primary,
  },
});

export default AuthWrapper;
