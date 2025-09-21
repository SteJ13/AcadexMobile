import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Platform, ActivityIndicator, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { gradientFromBase, shade } from '@utils/color';
import useStyles from '@hooks/useStyles';
import { useTranslation } from 'react-i18next';

const GradientButton = ({ label, onPress, disabled, style, loading = false }) => {
  const { t } = useTranslation();
  const styles = useStyles((theme) =>
    StyleSheet.create({
      wrap: { borderRadius: 28, overflow: 'hidden' },
      gradient: {
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
      },
      label: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
      disabled: { opacity: 0.6 },
      loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      loadingText: {
        marginLeft: 8,
      },
      shadow: Platform.select({
        ios: { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 6 } },
        android: { elevation: 6 },
      }),
    })
  );

  const colors = useStyles((theme) =>
    disabled || loading
      ? [shade('#D0D0D0', 10), shade('#B5B5B5', -5)]
      : gradientFromBase(theme.appBackground)
  );

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.wrap, styles.shadow, style, (disabled || loading) && styles.disabled]}
    >
      <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradient}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#FFFFFF" />
            <Text style={[styles.label, styles.loadingText]}>{t('common.pleaseWait')}</Text>
          </View>
        ) : (
          <Text style={styles.label}>{label}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;
