import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { gradientFromBase, shade } from '@utils/color';
import useStyles from '@hooks/useStyles';

const GradientButton = ({ label, onPress, disabled, style }) => {
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
      shadow: Platform.select({
        ios: { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 6 } },
        android: { elevation: 6 },
      }),
    })
  );

  const colors = useStyles((theme) =>
    disabled
      ? [shade('#D0D0D0', 10), shade('#B5B5B5', -5)]
      : gradientFromBase(theme.appBackground)
  );

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled}
      style={[styles.wrap, styles.shadow, style, disabled && styles.disabled]}
    >
      <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradient}>
        <Text style={styles.label}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;
