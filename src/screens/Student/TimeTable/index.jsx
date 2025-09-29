import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import useStyles from '@hooks/useStyles';
import ScreenLayout from '@components/Layout/ScreenLayout';
import Loading from '@components/Loading';

const { width: screenWidth } = Dimensions.get('window');

const TimeTableScreen = ({ isDrawerScreen = false, onBackPress }) => {
  const { t } = useTranslation();
  const styles = useStyles(createStyles);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timetableData, setTimetableData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - will be replaced with API call
  const mockTimetableData = [
    {
      id: 1,
      period: '1 Period',
      time: '09:00 am - 09:45 am',
      subject: 'Tamil',
      teacher: 'Leo',
      color: '#E91E63',
    },
    {
      id: 2,
      period: '2 Period',
      time: '09:45 am - 10:30 am',
      subject: 'English',
      teacher: 'Leo',
      color: '#E91E63',
    },
    {
      id: 3,
      period: '3 Period',
      time: '10:30 am - 11:15 am',
      subject: 'Maths',
      teacher: 'Leo',
      color: '#E91E63',
    },
    {
      id: 4,
      period: 'Break',
      time: '11:15 am - 11:30 am',
      subject: 'Break',
      teacher: '',
      color: '#FF4444',
      isBreak: true,
    },
    {
      id: 5,
      period: '4 Period',
      time: '11:30 am - 12:15 pm',
      subject: 'Science',
      teacher: 'Leo',
      color: '#E91E63',
    },
  ];

  // Get current week dates
  const getCurrentWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay + 1); // Start from Monday

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const weekDates = getCurrentWeekDates();

  // Format date for display
  const formatDate = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = days[date.getDay()];
    const dayNumber = date.getDate();
    return { dayName, dayNumber };
  };

  // Check if date is today
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Check if date is Sunday
  const isSunday = (date) => {
    return date.getDay() === 0;
  };

  // API function to fetch timetable data
  const fetchTimetableData = async (date) => {
    console.log('Fetching timetable for date:', date);
    setLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For now, return the same mock data
      // In real implementation, this would be an API call with date parameter
      setTimetableData(mockTimetableData);
    } catch (error) {
      console.error('Error fetching timetable data:', error);
      setTimetableData([]);
    } finally {
      setLoading(false);
    }
  };

  // Load timetable data on component mount
  useEffect(() => {
    fetchTimetableData(selectedDate);
  }, []);

  // Load timetable data when date changes
  useEffect(() => {
    if (selectedDate) {
      fetchTimetableData(selectedDate);
    }
  }, [selectedDate]);

  // Render date selector
  const renderDateSelector = () => (
    <View style={styles.dateSelectorContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dateScrollContainer}
      >
        {weekDates.map((date, index) => {
          const { dayName, dayNumber } = formatDate(date);
          const isSelected = selectedDate && 
            date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear();
          
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.dateButton,
                isSelected && styles.selectedDateButton,
                isSunday(date) && styles.sundayButton
              ]}
              onPress={() => !isSunday(date) && setSelectedDate(date)}
              disabled={isSunday(date)}
            >
              <Text style={[
                styles.dateButtonText,
                isSelected && styles.selectedDateButtonText,
                isSunday(date) && styles.sundayButtonText
              ]}>
                {dayName}
              </Text>
              <Text style={[
                styles.dateButtonNumber,
                isSelected && styles.selectedDateButtonNumber,
                isSunday(date) && styles.sundayButtonNumber
              ]}>
                {dayNumber}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  // Render loading state
  const renderLoading = () => (
    <Loading 
      message="Loading timetable..." 
      color="#E91E63"
      overlay={true}
    />
  );

  // Render timetable list
  const renderTimetableList = () => (
    <ScrollView 
      style={styles.timetableList}
      showsVerticalScrollIndicator={false}
    >
      {timetableData.map(period => (
        <View key={period.id} style={styles.periodCard}>
          <View style={[
            styles.periodHeader,
            { backgroundColor: period.color }
          ]}>
            <Text style={styles.periodTitle}>{period.period}</Text>
            <Text style={styles.periodTime}>{period.time}</Text>
          </View>
          
          {!period.isBreak && (
            <View style={styles.periodContent}>
              <Text style={styles.subjectText}>Subject: {period.subject}</Text>
              <Text style={styles.teacherText}>Teacher: {period.teacher}</Text>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );

  return (
    <ScreenLayout 
      title={t('student.timetable')}
      isDrawerScreen={isDrawerScreen}
      onBackPress={onBackPress}
    >
      <View style={styles.container}>
        {/* Date Selector */}
        {renderDateSelector()}
        
        {/* Content */}
        <View style={styles.content}>
          {renderTimetableList()}
          {loading && renderLoading()}
        </View>
      </View>
    </ScreenLayout>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  dateSelectorContainer: {
    backgroundColor: '#E8E8E8',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  dateScrollContainer: {
    paddingHorizontal: 10,
  },
  dateButton: {
    backgroundColor: '#C8E6C9',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 60,
  },
  selectedDateButton: {
    backgroundColor: '#E91E63',
  },
  dateButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 2,
  },
  selectedDateButtonText: {
    color: '#FFFFFF',
  },
  dateButtonNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedDateButtonNumber: {
    color: '#FFFFFF',
  },
  sundayButton: {
    backgroundColor: '#F5F5F5',
    opacity: 0.5,
  },
  sundayButtonText: {
    color: '#999',
  },
  sundayButtonNumber: {
    color: '#999',
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  timetableList: {
    flex: 1,
  },
  periodCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  periodHeader: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  periodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  periodTime: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  periodContent: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  subjectText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  teacherText: {
    fontSize: 16,
    color: '#333',
  },
});

export default TimeTableScreen;
