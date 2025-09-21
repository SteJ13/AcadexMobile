import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import useStyles from '@hooks/useStyles';
import { useAuth } from '@context/AuthContext';
import { useDrawer } from '@context/DrawerContext';

const ScreenLayout = ({ 
  title, 
  children, 
  showBackButton = false, 
  onBackPress,
  scrollable = true,
  contentStyle = {},
  isDrawerScreen = false
}) => {
  const { t } = useTranslation();
  const styles = useStyles(createStyles);
  const { user } = useAuth();
  const { openDrawer } = useDrawer();

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
        <ScrollView style={[styles.scrollContainer, contentStyle]}>
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {shouldShowBackButton ? (
            <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.menuButton} onPress={openDrawer}>
              <Text style={styles.menuIcon}>☰</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <Text style={styles.headerTitle}>{title}</Text>
        
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.profileImage}>
            <Text style={styles.profileInitial}>
              {user?.memberName?.charAt(0)?.toUpperCase() || 'U'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {renderContent()}
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: theme.primary,
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
