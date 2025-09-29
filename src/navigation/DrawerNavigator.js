import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTranslation } from 'react-i18next';
import useStyles from '@hooks/useStyles';
import { useAuth } from '@context/AuthContext';
import { useLanguage } from '@context/LanguageContext';
import { getMenuItemsByRole, getRoleName } from '@config/drawerMenuConfig';
import HomeScreen from '@screens/Home/HomeScreen';
import NotificationsScreen from '../notifications/NotificationsScreen';
import StudentProfile from '@screens/Student/StudentProfile';
import StudentDashboard from '@screens/Student/StudentDashboard';
import FeesScreen from '@screens/Student/FeesScreen';
import AttendanceScreen from '@screens/Student/AttendanceScreen';
import SettingsScreen from '@screens/Settings/SettingsScreen';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }) => {
  const { t } = useTranslation();
  const styles = useStyles(createStyles);
  const { user, logout } = useAuth();
  const { currentLanguage, availableLanguages, changeLanguage } = useLanguage();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  
  // Get menu items based on user role
  const menuItems = getMenuItemsByRole(user?.roleId || 4);
  const roleName = getRoleName(user?.roleId || 4);


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
    <View style={styles.drawerContainer}>
      {/* User Profile Section */}
      <View style={styles.userSection}>
        <View style={styles.userProfile}>
          <View style={styles.userAvatar}>
            <Text style={styles.userInitial}>
              {user?.memberName?.charAt(0)?.toUpperCase() || 'U'}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.memberName || 'User'}</Text>
            <Text style={styles.userRole}>{roleName}</Text>
          </View>
        </View>
      </View>

      {/* Navigation Items */}
      <View style={styles.navigationSection}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.navItem}
            onPress={() => {
              navigation.navigate(item.screen);
              navigation.closeDrawer();
            }}
          >
            <Text style={styles.navText}>{t(item.title)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Language Selection */}
      <View style={styles.languageSection}>
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
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: 280,
        },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={StudentProfile} />
      <Drawer.Screen name="Dashboard" component={StudentDashboard} />
      <Drawer.Screen name="Fees" component={FeesScreen} />
      <Drawer.Screen name="Attendance" component={AttendanceScreen} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

const createStyles = (theme) => StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: theme.light,
  },
  userSection: {
    backgroundColor: theme.primary,
    padding: 20,
    paddingTop: 50,
  },
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userInitial: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.primary,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.light,
    marginBottom: 2,
  },
  userRole: {
    fontSize: 12,
    color: theme.light,
    opacity: 0.8,
  },
  navigationSection: {
    flex: 1,
    paddingTop: 20,
  },
  navItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  navText: {
    fontSize: 16,
    color: theme.dark,
  },
  languageSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: theme.light,
    borderRadius: 8,
  },
  languageText: {
    fontSize: 14,
    color: theme.dark,
  },
  languageDropdown: {
    position: 'absolute',
    bottom: 60,
    left: 16,
    right: 16,
    backgroundColor: theme.light,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  languageItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  activeLanguage: {
    backgroundColor: theme.primary + '20',
  },
  languageItemText: {
    fontSize: 14,
    color: theme.dark,
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: theme.light,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DrawerNavigator;
