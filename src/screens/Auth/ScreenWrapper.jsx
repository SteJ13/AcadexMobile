import React from 'react';
import { Image, View, Text, StyleSheet, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import useStyles from '@hooks/useStyles';
import { gradientFromBase } from '@utils/color';

const scooter = require('../../assets/images/scooter.webp'); // update path

const ScreenWrapper = ({
 title = 'AcadEx',
  subtitle = 'EDUCATION',
  headerImageSource = scooter,
  headerHeightRatio = 0.50,
  formControl = null,
  bottomSheet = null
}) => {
  const styles = useStyles((theme) =>
    StyleSheet.create({
      container: { flex: 1, backgroundColor: theme.appBackground },
      gradient: { flex: 1 },
      header: {
        flex: headerHeightRatio,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 50,
      },
      logoWrap: { alignItems: 'center', marginTop: 8 },
      logoText: {
        fontSize: 36,
        lineHeight: 40,
        fontWeight: '800',
        color: theme.appText,
        letterSpacing: 0.5,
      },
      subText: {
        marginTop: 4,
        fontSize: 12,
        fontWeight: '600',
        color: theme.textLight,
        letterSpacing: 1,
      },
      image: {
        width: 180,
        height: 180,
        resizeMode: 'contain',
        marginBottom: 20,
      },
      sheet: {
        flex: 1 - headerHeightRatio,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingHorizontal: 20,
        paddingTop: 18,
        ...Platform.select({
          ios: { shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: -2 } },
          android: { elevation: 8 },
        }),
      },
      sheetContent: {
        flex: 1,
        justifyContent: 'center',
      },
      formControl: {
        padding: 20,
      },
    })
  );

  const gradient = useStyles((theme) => gradientFromBase(theme.appBackground));

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradient}
        start={{ x: 0.3, y: 0 }}
        end={{ x: 0.7, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Image source={headerImageSource} style={styles.image} />
          <View style={styles.logoWrap}>
            <Text style={styles.logoText}>{title}</Text>
            <Text style={styles.subText}>{subtitle}</Text>
          </View>
        </View>
        <View style={styles.formControl}>
          {formControl}
        </View>
        <View style={styles.sheet}>
          <View style={styles.sheetContent}>
            {bottomSheet}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default ScreenWrapper;
