import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import useStyles from '@hooks/useStyles';
import ScreenLayout from '@components/Layout/ScreenLayout';

const StaffAttendanceScreen = ({ isDrawerScreen = false, onBackPress }) => {
  const { t } = useTranslation();
  const styles = useStyles(createStyles);

  // Mock attendance management data for staff
  const attendanceData = {
    todayStats: {
      totalStudents: 150,
      present: 142,
      absent: 8,
      percentage: 94.7,
    },
    classAttendance: [
      { class: 'Class 10A', total: 35, present: 33, absent: 2, percentage: 94.3 },
      { class: 'Class 10B', total: 32, present: 30, absent: 2, percentage: 93.8 },
      { class: 'Class 9A', total: 28, present: 27, absent: 1, percentage: 96.4 },
      { class: 'Class 9B', total: 30, present: 28, absent: 2, percentage: 93.3 },
      { class: 'Class 8A', total: 25, present: 24, absent: 1, percentage: 96.0 },
    ],
    recentAbsences: [
      { student: 'John Doe', class: '10A', reason: 'Sick Leave', date: '2024-01-15' },
      { student: 'Jane Smith', class: '10B', reason: 'Family Emergency', date: '2024-01-15' },
      { student: 'Mike Johnson', class: '9A', reason: 'Medical Appointment', date: '2024-01-14' },
    ],
  };

  const renderClassCard = (item) => (
    <View key={item.class} style={styles.classCard}>
      <Text style={styles.className}>{item.class}</Text>
      <View style={styles.classStats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.present}</Text>
          <Text style={styles.statLabel}>Present</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: '#FF6B6B' }]}>{item.absent}</Text>
          <Text style={styles.statLabel}>Absent</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: '#32CD32' }]}>{item.percentage}%</Text>
          <Text style={styles.statLabel}>%</Text>
        </View>
      </View>
    </View>
  );

  const renderAbsenceItem = (item) => (
    <View key={item.student} style={styles.absenceItem}>
      <View>
        <Text style={styles.studentName}>{item.student}</Text>
        <Text style={styles.studentClass}>{item.class}</Text>
      </View>
      <View style={styles.absenceRight}>
        <Text style={styles.absenceReason}>{item.reason}</Text>
        <Text style={styles.absenceDate}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <ScreenLayout 
      title="Staff Attendance"
      isDrawerScreen={isDrawerScreen}
      onBackPress={onBackPress}
    >
      <View style={styles.content}>
          {/* Today's Overview */}
          <View style={styles.overviewCard}>
            <Text style={styles.overviewTitle}>Today's Attendance Overview</Text>
            <View style={styles.overviewStats}>
              <View style={styles.overviewItem}>
                <Text style={styles.overviewValue}>{attendanceData.todayStats.present}</Text>
                <Text style={styles.overviewLabel}>Present</Text>
              </View>
              <View style={styles.overviewItem}>
                <Text style={[styles.overviewValue, { color: '#FF6B6B' }]}>
                  {attendanceData.todayStats.absent}
                </Text>
                <Text style={styles.overviewLabel}>Absent</Text>
              </View>
              <View style={styles.overviewItem}>
                <Text style={styles.overviewValue}>{attendanceData.todayStats.totalStudents}</Text>
                <Text style={styles.overviewLabel}>Total</Text>
              </View>
              <View style={styles.overviewItem}>
                <Text style={[styles.overviewValue, { color: '#32CD32' }]}>
                  {attendanceData.todayStats.percentage}%
                </Text>
                <Text style={styles.overviewLabel}>%</Text>
              </View>
            </View>
          </View>

          {/* Class-wise Attendance */}
          <Text style={styles.sectionTitle}>Class-wise Attendance</Text>
          {attendanceData.classAttendance.map(renderClassCard)}

          {/* Recent Absences */}
          <Text style={styles.sectionTitle}>Recent Absences</Text>
          {attendanceData.recentAbsences.map(renderAbsenceItem)}
      </View>
    </ScreenLayout>
  );
};

const createStyles = (theme) => StyleSheet.create({
  content: {
    padding: 20,
  },
  overviewCard: {
    backgroundColor: theme.cardBackground,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  overviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.dark,
    marginBottom: 15,
  },
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  overviewItem: {
    alignItems: 'center',
  },
  overviewValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.primary,
  },
  overviewLabel: {
    fontSize: 12,
    color: theme.textSecondary,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.dark,
    marginBottom: 15,
    marginTop: 10,
  },
  classCard: {
    backgroundColor: theme.cardBackground,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  className: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.dark,
    marginBottom: 10,
  },
  classStats: {
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
  },
  statLabel: {
    fontSize: 12,
    color: theme.textSecondary,
    marginTop: 2,
  },
  absenceItem: {
    backgroundColor: theme.cardBackground,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  studentName: {
    fontSize: 15,
    fontWeight: '500',
    color: theme.dark,
  },
  studentClass: {
    fontSize: 12,
    color: theme.textSecondary,
    marginTop: 2,
  },
  absenceRight: {
    alignItems: 'flex-end',
  },
  absenceReason: {
    fontSize: 14,
    color: theme.primary,
    fontWeight: '500',
  },
  absenceDate: {
    fontSize: 12,
    color: theme.textSecondary,
    marginTop: 2,
  },
});

export default StaffAttendanceScreen;
