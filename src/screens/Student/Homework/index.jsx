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

const HomeworkScreen = ({ isDrawerScreen = false, onBackPress }) => {
  const { t } = useTranslation();
  const styles = useStyles(createStyles);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [homeworkData, setHomeworkData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedSubjects, setExpandedSubjects] = useState({});

  // Mock data - will be replaced with API call
  const mockHomeworkData = [
    {
      id: 1,
      subject: 'Tamil',
      homework: 'Read Page no 12.',
      color: '#E91E63',
    },
    {
      id: 2,
      subject: 'English',
      homework: 'Write an essay on "My Favorite Season"',
      color: '#E91E63',
    },
    {
      id: 3,
      subject: 'Maths',
      homework: 'Solve problems 1-10 from Chapter 5',
      color: '#E91E63',
    },
    {
      id: 4,
      subject: 'Science',
      homework: 'Complete the experiment report',
      color: '#E91E63',
    },
    {
      id: 5,
      subject: 'EVS',
      homework: 'Collect leaves and create a herbarium',
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

  // Toggle accordion
  const toggleAccordion = (subjectId) => {
    setExpandedSubjects(prev => ({
      ...prev,
      [subjectId]: !prev[subjectId]
    }));
  };

  // API function to fetch homework data
  const fetchHomeworkData = async (date) => {
    console.log('Fetching homework for date:', date);
    setLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For now, return the same mock data
      // In real implementation, this would be an API call with date parameter
      setHomeworkData(mockHomeworkData);
    } catch (error) {
      console.error('Error fetching homework data:', error);
      setHomeworkData([]);
    } finally {
      setLoading(false);
    }
  };

  // Load homework data on component mount
  useEffect(() => {
    fetchHomeworkData(selectedDate);
  }, []);

  // Load homework data when date changes
  useEffect(() => {
    if (selectedDate) {
      fetchHomeworkData(selectedDate);
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
      message="Loading homework..." 
      color="#E91E63"
      overlay={true}
    />
  );

  // Render homework list
  const renderHomeworkList = () => (
    <ScrollView 
      style={styles.homeworkList}
      showsVerticalScrollIndicator={false}
    >
      {homeworkData.map(subject => (
        <View key={subject.id} style={styles.subjectCard}>
          <TouchableOpacity
            style={styles.subjectHeader}
            onPress={() => toggleAccordion(subject.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.subjectTitle}>{subject.subject}</Text>
            <Text style={[
              styles.chevronText,
              expandedSubjects[subject.id] && styles.chevronRotated
            ]}>
              ▼
            </Text>
          </TouchableOpacity>
          
          {expandedSubjects[subject.id] && (
            <View style={styles.subjectContent}>
              <View style={styles.homeworkContent}>
                <Text style={styles.homeworkText}>{subject.homework}</Text>
              </View>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );

  return (
    <ScreenLayout 
      title={t('student.homework')}
      isDrawerScreen={isDrawerScreen}
      onBackPress={onBackPress}
    >
      <View style={styles.container}>
        {/* Date Selector */}
        {renderDateSelector()}
        
        {/* Content */}
        <View style={styles.content}>
          {renderHomeworkList()}
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
  loadingContainer: {
    flex: 1,
  },
  homeworkList: {
    flex: 1,
  },
  subjectCard: {
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
  subjectHeader: {
    backgroundColor: '#E91E63',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subjectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  chevronText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    transform: [{ rotate: '0deg' }],
  },
  chevronRotated: {
    transform: [{ rotate: '180deg' }],
  },
  subjectContent: {
    backgroundColor: '#FFFFFF',
  },
  homeworkContent: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  homeworkText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});

export default HomeworkScreen;