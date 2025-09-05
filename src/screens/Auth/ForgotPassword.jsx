import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import useStyles from '@hooks/useStyles'
import LockIcon from '@assets/icons/LockIcon'
import EmailIcon from '@assets/icons/EmailIcon'
import { useNavigation } from '@react-navigation/native'
import { useToast } from '@context/ToastContext'
import GradientButton from '@components/FormControls/GradientButton'

export default function ForgotPassword() {
    const styles = useStyles((theme) =>
        StyleSheet.create({
            container: {
                flex: 1,
            },
            lockIcon: {
                marginBottom: 20,
                color: theme.appBackground,
            },
            forgotText: {
                color: theme.appBackground,
                fontSize: 48,
                fontWeight: 'bold'
            },
            passwordText: {
                color: theme.appBackground,
                fontSize: 44,
                opacity: 0.7
            },
            instructionsText: {
                color: theme.dark,
                fontSize: 16,
                textAlign: 'center',
                marginTop: 10,
            },
            emailLabel: {
                color: theme.light,
                fontSize: 16,
                marginBottom: 8,
                alignSelf: 'flex-start',
                width: '100%',
            },
            inputContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: theme.light,
                borderWidth: 1,
                borderRadius: 25,
                marginBottom: 20,
                width: '100%',
                backgroundColor: theme.appBackground,
                paddingHorizontal: 15,
                height: 50,
            },
            inputIcon: {
                marginRight: 10,
                color: theme.light,
            },
            input: {
                flex: 1,
                color: theme.light,
                fontSize: 16,
            },
            linkText: {
                color: theme.light,
                fontSize: 16,
                marginTop: 20,
                textDecorationLine: 'underline',
                fontWeight: 'bold',
            },
            topView: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.light,
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                paddingHorizontal: 20,
            },
            bottomView: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.appBackground,
                borderTopRightRadius: 24,
                borderTopLeftRadius: 24,
                padding: 30,
            },
        })
    )

    const navigation = useNavigation();
    const toast = useToast();

    const [email, setEmail] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleResetPassword = () => {
        if (!email) {
            toast.error('Please enter your email address');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error('Please enter a valid email address');
            return;
        }
        // Here you would typically make an API call to send the reset password link
        // For demonstration, we'll just log the email
        setLoading(true);
        setTimeout(() => {
            toast.success('Password reset link sent to ' + email);
            setLoading(false);
        }, 2000);
    }

    return (
        <View style={styles.container}>
            <View style={styles.topView}>
                <LockIcon width={100} height={100} style={styles.lockIcon} />
                <Text style={styles.forgotText}>Forgot</Text>
                <Text style={styles.passwordText}>Password?</Text>
                <Text style={styles.instructionsText}>No worries, we’ll send you reset instructions</Text>
            </View>
            <View style={styles.bottomView}>
                <Text style={styles.emailLabel}>Email</Text>
                <View style={styles.inputContainer}>
                    <EmailIcon width={24} height={24} style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        onChangeText={setEmail}
                        value={email}
                        placeholderTextColor={styles.inputIcon.color}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
                <GradientButton title="Reset Password" onPress={handleResetPassword} loading={loading} />
                <TouchableOpacity onPress={() => navigation.navigate("Login")} >
                    <Text style={styles.linkText}>Back to Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )


}