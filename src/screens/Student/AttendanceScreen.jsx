import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import useStyles from '@hooks/useStyles';
import ScreenLayout from '@components/Layout/ScreenLayout';

const AttendanceScreen = ({ isDrawerScreen = false, onBackPress }) => {
  const { t } = useTranslation();
  const styles = useStyles(createStyles);

  // Mock attendance data - in real app, this would come from API
  const attendanceData = {
    totalDays: 180,
    presentDays: 165,
    absentDays: 15,
    percentage: 91.7,
  };

  const monthlyAttendance = [
    { month: 'January', present: 22, absent: 1, total: 23 },
    { month: 'February', present: 20, absent: 2, total: 22 },
    { month: 'March', present: 23, absent: 0, total: 23 },
    { month: 'April', present: 21, absent: 1, total: 22 },
    { month: 'May', present: 22, absent: 1, total: 23 },
    { month: 'June', present: 20, absent: 2, total: 22 },
    { month: 'July', present: 23, absent: 0, total: 23 },
    { month: 'August', present: 22, absent: 1, total: 23 },
    { month: 'September', present: 21, absent: 2, total: 23 },
    { month: 'October', present: 22, absent: 1, total: 23 },
    { month: 'November', present: 20, absent: 2, total: 22 },
    { month: 'December', present: 23, absent: 2, total: 25 },
  ];

  const renderMonthlyCard = (monthData) => (
    <View key={monthData.month} style={styles.monthlyCard}>
      <Text style={styles.monthName}>{monthData.month}</Text>
      <View style={styles.monthlyStats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{monthData.present}</Text>
          <Text style={styles.statLabel}>Present</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: '#ff4444' }]}>{monthData.absent}</Text>
          <Text style={styles.statLabel}>Absent</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{monthData.total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScreenLayout 
      title={t('student.attendance')}
      isDrawerScreen={isDrawerScreen}
      onBackPress={onBackPress}
    >
      <View style={styles.content}>
        {/* Overall Attendance Card */}
        <View style={styles.overallCard}>
          <Text style={styles.overallTitle}>Overall Attendance</Text>
          <View style={styles.overallStats}>
            <View style={styles.overallStat}>
              <Text style={styles.overallValue}>{attendanceData.presentDays}</Text>
              <Text style={styles.overallLabel}>{t('student.present')}</Text>
            </View>
            <View style={styles.overallStat}>
              <Text style={[styles.overallValue, { color: '#ff4444' }]}>{attendanceData.absentDays}</Text>
              <Text style={styles.overallLabel}>{t('student.absent')}</Text>
            </View>
            <View style={styles.overallStat}>
              <Text style={styles.overallValue}>{attendanceData.totalDays}</Text>
              <Text style={styles.overallLabel}>{t('student.totalDays')}</Text>
            </View>
          </View>
          <View style={styles.percentageContainer}>
            <Text style={styles.percentageLabel}>{t('student.percentage')}</Text>
            <Text style={styles.percentageValue}>{attendanceData.percentage}%</Text>
          </View>
        </View>

        {/* Monthly Attendance */}
        <View style={styles.monthlyContainer}>
          <Text style={styles.monthlyTitle}>Monthly Attendance</Text>
          <View style={styles.monthlyGrid}>
            {monthlyAttendance.map(renderMonthlyCard)}
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
};

const createStyles = (theme) => StyleSheet.create({
  content: {
    padding: 20,
  },
  overallCard: {
    backgroundColor: theme.light,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  overallTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.dark,
    marginBottom: 16,
    textAlign: 'center',
  },
  overallStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  overallStat: {
    alignItems: 'center',
  },
  overallValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.primary,
    marginBottom: 4,
  },
  overallLabel: {
    fontSize: 12,
    color: '#666',
  },
  percentageContainer: {
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  percentageLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  percentageValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.primary,
  },
  monthlyContainer: {
    marginBottom: 20,
  },
  monthlyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.dark,
    marginBottom: 16,
  },
  monthlyGrid: {
    gap: 12,
  },
  monthlyCard: {
    backgroundColor: theme.light,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  monthName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.dark,
    marginBottom: 12,
  },
  monthlyStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
});

export default AttendanceScreen;
