import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, Animated, Dimensions, DeviceEventEmitter } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import useStyles from '@hooks/useStyles';
import { useAuth } from '@context/AuthContext';
import { useLanguage } from '@context/LanguageContext';
import { useDrawer } from '@context/DrawerContext';
import { getMenuItemsByRole, getRoleName } from '@config/drawerMenuConfig';
import BottomTabNavigator from './BottomTabNavigator';
import { TAB_NAVIGATION_EVENTS } from './NavigationService';

const { width: screenWidth } = Dimensions.get('window');
const DRAWER_WIDTH = 280;

// Remove Stack import since we're not using it

// Custom Drawer Component
const CustomDrawer = ({ isVisible, onClose, navigation }) => {
  const { t } = useTranslation();
  const styles = useStyles(createDrawerStyles);
  const { user, logout } = useAuth();
  const { currentLanguage, availableLanguages, changeLanguage } = useLanguage();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  // Enhanced animation values
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;
  
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

  const handleNavigation = (item) => {
    navigation.navigate(item.screen);
    onClose();
  };

  // Enhanced animation functions
  const openDrawer = () => {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      })
    ]).start();
  };

  const closeDrawer = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -DRAWER_WIDTH,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start(() => {
      onClose();
    });
  };

  // Handle drawer animation
  useEffect(() => {
    if (isVisible) {
      openDrawer();
    } else {
      // Reset animation values when drawer is not visible
      slideAnim.setValue(-DRAWER_WIDTH);
      overlayAnim.setValue(0);
    }
  }, [isVisible]);

  // Cleanup animations on unmount
  useEffect(() => {
    return () => {
      // Stop any running animations
      slideAnim.stopAnimation();
      overlayAnim.stopAnimation();
    };
  }, []);

  return (
    <Modal
      visible={isVisible}
      animationType="none"
      transparent={true}
      onRequestClose={closeDrawer}
    >
      <Animated.View style={[styles.modalOverlay, { opacity: overlayAnim }]}>
        <TouchableOpacity 
          style={styles.overlayTouchable} 
          activeOpacity={1} 
          onPress={closeDrawer}
        />
        <Animated.View 
          style={[
            styles.drawerContainer,
            { 
              transform: [
                { translateX: slideAnim }
              ]
            }
          ]}
        >
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
                onPress={() => handleNavigation(item)}
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
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

// App Navigator with Bottom Tabs and Drawer
const AppNavigator = () => {
  const { drawerVisible, closeDrawer } = useDrawer();
  const { user } = useAuth();
  const [currentDrawerScreen, setCurrentDrawerScreen] = useState(null);
  const [activeTab, setActiveTab] = useState('Home');

  const handleDrawerNavigation = (screenName) => {
    // Check if it's a bottom tab screen
    const bottomTabScreens = ['Home', 'Profile', 'Dashboard', 'Notifications', 'Settings'];
    
    if (bottomTabScreens.includes(screenName)) {
      // Navigate to bottom tab screen - set active tab and close drawer
      setActiveTab(screenName);
      setCurrentDrawerScreen(null);
    } else {
      // Show drawer screen
      setCurrentDrawerScreen(screenName);
    }
    closeDrawer();
  };

  // Reset drawer state when user changes
  useEffect(() => {
    setCurrentDrawerScreen(null);
  }, [user?.id]);

  // Listen for tab navigation events
  useEffect(() => {
    const switchToNotificationsListener = DeviceEventEmitter.addListener(
      TAB_NAVIGATION_EVENTS.SWITCH_TO_NOTIFICATIONS,
      () => {
        console.log('Switching to Notifications tab via event');
        setActiveTab('Notifications');
        setCurrentDrawerScreen(null);
      }
    );

    return () => {
      switchToNotificationsListener.remove();
    };
  }, []);

  // If we're showing a drawer screen, render it
  if (currentDrawerScreen) {
    const menuItems = getMenuItemsByRole(user?.roleId || 4);
    const screenItem = menuItems.find(item => item.screen === currentDrawerScreen);
    
    if (screenItem && screenItem.component) {
      const ScreenComponent = screenItem.component;
      return (
        <View style={{ flex: 1 }}>
          <ScreenComponent 
            isDrawerScreen={true}
            onBackPress={() => setCurrentDrawerScreen(null)}
          />
          <CustomDrawer
            key={`drawer-${user?.id || 'default'}`}
            isVisible={drawerVisible}
            onClose={closeDrawer}
            navigation={{ 
              navigate: handleDrawerNavigation, 
              closeDrawer 
            }}
          />
        </View>
      );
    }
  }

  // Default: show bottom tabs
  return (
    <View style={{ flex: 1 }}>
      <BottomTabNavigator 
        key={`tabs-${activeTab}`} 
        initialRouteName={activeTab} 
      />
      <CustomDrawer
        key={`drawer-${user?.id || 'default'}`}
        isVisible={drawerVisible}
        onClose={closeDrawer}
        navigation={{ 
          navigate: handleDrawerNavigation, 
          closeDrawer 
        }}
      />
    </View>
  );
};

const createDrawerStyles = (theme) => StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
  },
  overlayTouchable: {
    flex: 1,
  },
  drawerContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: DRAWER_WIDTH,
    height: '100%',
    backgroundColor: theme.light,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 16,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  userSection: {
    backgroundColor: theme.primary,
    padding: 16,
    paddingTop: 16,
    paddingBottom: 16,
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
    paddingTop: 12,
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

export default AppNavigator;
