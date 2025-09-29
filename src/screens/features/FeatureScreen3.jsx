import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import useStyles from '@hooks/useStyles';
import { SafeAreaView } from 'react-native-safe-area-context';

const FeatureScreen3 = ({ onComplete }) => {
  const { t } = useTranslation();
  const styles = useStyles(createStyles);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Feature Icon/Image */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🚀</Text>
        </View>

        {/* Feature Title */}
        <Text style={styles.title}>Ready to Start!</Text>

        {/* Feature Description */}
        <Text style={styles.description}>
          You're all set! Start your journey with Acadex and experience seamless school management like never before.
        </Text>

        {/* Feature Benefits */}
        <View style={styles.benefitsContainer}>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>🔐</Text>
            <Text style={styles.benefitText}>Secure Login</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>👥</Text>
            <Text style={styles.benefitText}>Multi-User Support</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>🌐</Text>
            <Text style={styles.benefitText}>Real-time Sync</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>📱</Text>
            <Text style={styles.benefitText}>Mobile First</Text>
          </View>
        </View>
      </View>

      {/* Complete Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.completeButton} onPress={onComplete}>
          <Text style={styles.completeButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 60,
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  icon: {
    fontSize: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.dark,
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  benefitsContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
  },
  benefitIcon: {
    fontSize: 24,
    marginRight: 15,
    width: 30,
  },
  benefitText: {
    fontSize: 16,
    color: theme.dark,
    fontWeight: '500',
  },
  buttonContainer: {
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  completeButton: {
    backgroundColor: theme.primary,
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
    minWidth: 200,
  },
  completeButtonText: {
    color: theme.light,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default FeatureScreen3;
