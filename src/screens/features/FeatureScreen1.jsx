import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import useStyles from '@hooks/useStyles';
import { SafeAreaView } from 'react-native-safe-area-context';

const FeatureScreen1 = ({ onNext }) => {
  const { t } = useTranslation();
  const styles = useStyles(createStyles);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Feature Icon/Image */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>📱</Text>
        </View>

        {/* Feature Title */}
        <Text style={styles.title}>Welcome to Acadex</Text>

        {/* Feature Description */}
        <Text style={styles.description}>
          Your comprehensive school management app that brings education, communication, and administration together in one place.
        </Text>

        {/* Feature Benefits */}
        <View style={styles.benefitsContainer}>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>🎓</Text>
            <Text style={styles.benefitText}>Student Management</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>📊</Text>
            <Text style={styles.benefitText}>Real-time Analytics</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>💬</Text>
            <Text style={styles.benefitText}>Instant Communication</Text>
          </View>
        </View>
      </View>

      {/* Next Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
          <Text style={styles.nextButtonText}>Next</Text>
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
  nextButton: {
    backgroundColor: theme.primary,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  nextButtonText: {
    color: theme.light,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FeatureScreen1;
