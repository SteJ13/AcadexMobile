import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import useStyles from '@hooks/useStyles';
import { useAuth } from '@context/AuthContext';
import { useDrawer } from '@context/DrawerContext';
import GradientButton from '@components/FormControls/GradientButton';
import UserSelector from '@components/UserSelector';

const HomeScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles(createStyles);
  const { user } = useAuth();
  const { openDrawer } = useDrawer();
  const navigation = useNavigation();

  const handleNavigateToProfile = () => {
    navigation.navigate('Profile');
  };

  const handleNavigateToDashboard = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      {/* Header with hamburger menu */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={openDrawer}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('navigation.home')}</Text>
        <UserSelector />
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>{t('navigation.home')}</Text>
          <Text style={styles.welcomeText}>
            {t('common.welcome')} {user?.memberName || 'User'}!
          </Text>
        
        <View style={styles.buttonContainer}>
          <GradientButton
            label={t('student.profile')}
            onPress={handleNavigateToProfile}
            style={styles.button}
          />
          
          <GradientButton
            label={t('student.dashboard')}
            onPress={handleNavigateToDashboard}
            style={styles.button}
          />
        </View>
        </View>
      </ScrollView>
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
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: theme.primary,
    paddingTop: 10,
  },
  menuButton: {
    padding: 5,
  },
  menuIcon: {
    fontSize: 24,
    color: theme.light,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.light,
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.dark,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    color: theme.dark,
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 20,
  },
  button: {
    width: '100%',
  },
});

export default HomeScreen;
