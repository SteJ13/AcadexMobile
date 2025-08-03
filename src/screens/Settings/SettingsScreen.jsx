import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useTheme } from '@context/ThemeContext';
import useStyles from '@hooks/useStyles';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
    const { theme, isDarkMode, setThemeMode } = useTheme();
    const navigation = useNavigation();


    const styles = useStyles((theme) =>
        StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: theme.background,
                padding: 20,
            },
            card: {
                backgroundColor: theme.card,
                padding: 16,
                borderRadius: 10,
                marginBottom: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
            },
            title: {
                color: theme.text,
                fontSize: 16,
                fontWeight: '500',
            },
        })
    );

    const handleLoginLogout = () => {
        // This example always goes to Login
        // Later, you can toggle between login/logout based on auth state
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            {/* Theme Toggle */}
            <View style={styles.card}>
                <Text style={styles.title}>Dark Theme</Text>
                <Switch
                    value={isDarkMode}
                    onValueChange={() => setThemeMode(isDarkMode ? 'light' : 'dark')}
                    trackColor={{ false: '#ccc', true: theme.primary }}
                    thumbColor={isDarkMode ? '#f4f3f4' : '#f4f3f4'}
                />
            </View>

            {/* Login / Logout Card */}
            <TouchableOpacity style={styles.card} onPress={handleLoginLogout}>
                <Text style={styles.title}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SettingsScreen;
