import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useTheme } from '@context/ThemeContext';
import { useAuth } from '@context/AuthContext';
import { useLanguage } from '@context/LanguageContext';
import useStyles from '@hooks/useStyles';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const SettingsScreen = () => {
    const { t } = useTranslation();
    const { theme, isDarkMode, setThemeMode } = useTheme();
    const { user, logout } = useAuth();
    const { currentLanguage, availableLanguages, changeLanguage } = useLanguage();
    const navigation = useNavigation();
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

    const styles = useStyles((theme) =>
        StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: theme.light,
            },
            content: {
                padding: 20,
            },
            title: {
                fontSize: 24,
                fontWeight: 'bold',
                color: theme.dark,
                marginBottom: 30,
                textAlign: 'center',
            },
            // User Profile Section
            currentUserSection: {
                alignItems: 'center',
                backgroundColor: theme.light,
                padding: 20,
                borderRadius: 12,
                marginBottom: 20,
                borderWidth: 1,
                borderColor: '#e0e0e0',
            },
            userAvatar: {
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: theme.primary,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 16,
            },
            userInitial: {
                fontSize: 32,
                fontWeight: 'bold',
                color: theme.light,
            },
            userName: {
                fontSize: 20,
                fontWeight: 'bold',
                color: theme.dark,
                marginBottom: 4,
            },
            userRole: {
                fontSize: 14,
                color: '#666',
                marginBottom: 4,
            },
            userEmail: {
                fontSize: 14,
                color: '#666',
            },
            // Settings Section
            section: {
                marginBottom: 20,
            },
            sectionTitle: {
                fontSize: 18,
                fontWeight: 'bold',
                color: theme.dark,
                marginBottom: 12,
            },
            card: {
                backgroundColor: theme.light,
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
                borderWidth: 1,
                borderColor: '#e0e0e0',
            },
            cardTitle: {
                color: theme.dark,
                fontSize: 16,
                fontWeight: '500',
            },
            // Language Section
            languageButton: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: theme.light,
                padding: 16,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#e0e0e0',
            },
            languageText: {
                fontSize: 16,
                color: theme.dark,
            },
            dropdownArrow: {
                color: theme.dark,
                fontSize: 12,
            },
            languageDropdown: {
                backgroundColor: theme.light,
                marginTop: 8,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#e0e0e0',
            },
            languageItem: {
                padding: 16,
                borderBottomWidth: 1,
                borderBottomColor: '#e0e0e0',
            },
            activeLanguage: {
                backgroundColor: theme.primary + '20',
            },
            languageItemText: {
                fontSize: 16,
                color: theme.dark,
            },
            // Logout Button
            logoutButton: {
                backgroundColor: '#ff4444',
                padding: 16,
                borderRadius: 8,
                alignItems: 'center',
                marginTop: 20,
            },
            logoutText: {
                color: theme.light,
                fontSize: 16,
                fontWeight: 'bold',
            },
        })
    );

    const handleLanguageChange = (languageCode) => {
        changeLanguage(languageCode);
        setShowLanguageDropdown(false);
    };

    const handleLogout = () => {
        Alert.alert(
            t('auth.logoutConfirm'),
            '',
            [
                { text: t('common.cancel'), style: 'cancel' },
                {
                    text: t('common.confirm'),
                    onPress: logout,
                },
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Settings</Text>
                
                {/* Current User Section */}
                <View style={styles.currentUserSection}>
                    <View style={styles.userAvatar}>
                        <Text style={styles.userInitial}>
                            {user?.memberName?.charAt(0)?.toUpperCase() || 'U'}
                        </Text>
                    </View>
                    <Text style={styles.userName}>{user?.memberName || 'User'}</Text>
                    <Text style={styles.userRole}>Student</Text>
                    <Text style={styles.userEmail}>No email</Text>
                </View>

                {/* Dark Theme Toggle */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Theme</Text>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Dark Theme</Text>
                        <Switch
                            value={isDarkMode}
                            onValueChange={() => setThemeMode(isDarkMode ? 'light' : 'dark')}
                            trackColor={{ false: '#ccc', true: theme.primary }}
                            thumbColor={isDarkMode ? '#f4f3f4' : '#f4f3f4'}
                        />
                    </View>
                </View>

                {/* Language Selection */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Language</Text>
                    <TouchableOpacity
                        style={styles.languageButton}
                        onPress={() => setShowLanguageDropdown(!showLanguageDropdown)}
                    >
                        <Text style={styles.languageText}>
                            {availableLanguages.find(lang => lang.code === currentLanguage)?.flag} {availableLanguages.find(lang => lang.code === currentLanguage)?.name}
                        </Text>
                        <Text style={styles.dropdownArrow}>
                            {showLanguageDropdown ? '▲' : '▼'}
                        </Text>
                    </TouchableOpacity>

                    {showLanguageDropdown && (
                        <View style={styles.languageDropdown}>
                            {availableLanguages.map((language) => (
                                <TouchableOpacity
                                    key={language.code}
                                    style={[
                                        styles.languageItem,
                                        language.code === currentLanguage && styles.activeLanguage,
                                    ]}
                                    onPress={() => handleLanguageChange(language.code)}
                                >
                                    <Text style={styles.languageItemText}>
                                        {language.flag} {language.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>{t('common.logout')}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default SettingsScreen;
