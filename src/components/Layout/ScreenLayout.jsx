import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import useStyles from '@hooks/useStyles';
import { useAuth } from '@context/AuthContext';
import { useDrawer } from '@context/DrawerContext';
import UserSelector from '@components/UserSelector';

const ScreenLayout = ({ 
  title, 
  children, 
  showBackButton = false, 
  onBackPress,
  scrollable = true,
  contentStyle = {},
  isDrawerScreen = false,
  keyboardAvoidingView = true
}) => {
  const { t } = useTranslation();
  const styles = useStyles(createStyles);
  const { user } = useAuth();
  const { openDrawer } = useDrawer();
  const insets = useSafeAreaInsets();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    }
  };

  // For drawer screens, show back button by default
  const shouldShowBackButton = showBackButton || isDrawerScreen;

  const renderContent = () => {
    if (scrollable) {
      return (
        <ScrollView 
          style={[styles.scrollContainer, contentStyle]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      );
    }
    return (
      <View style={[styles.contentContainer, contentStyle]}>
        {children}
      </View>
    );
  };

  const renderMainContent = () => (
    <View style={styles.container}>
      {/* Status Bar */}
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={styles.header.backgroundColor}
        translucent={false}
      />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 8) }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.menuButton} onPress={openDrawer}>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.headerTitle}>{title}</Text>
        
        <UserSelector 
          profileButtonStyle={styles.profileButton}
          profileImageStyle={styles.profileImage}
          profileInitialStyle={styles.profileInitial}
        />
      </View>

      {/* Content */}
      {renderContent()}
    </View>
  );

  // Wrap with KeyboardAvoidingView if needed
  if (keyboardAvoidingView) {
    return (
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {renderMainContent()}
      </KeyboardAvoidingView>
    );
  }

  return renderMainContent();
};

const createStyles = (theme) => StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: theme.light,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: theme.primary,
    minHeight: 56, // Ensure minimum header height
  },
  headerLeft: {
    width: 40,
    alignItems: 'flex-start',
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 24,
    color: theme.light,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 24,
    color: theme.light,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.light,
    flex: 1,
    textAlign: 'center',
  },
  profileButton: {
    padding: 8,
    width: 40,
    alignItems: 'flex-end',
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.primary,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
});

export default ScreenLayout;
