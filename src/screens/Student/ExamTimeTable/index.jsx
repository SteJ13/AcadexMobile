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

const ExamTimeTableScreen = ({ isDrawerScreen = false, onBackPress }) => {
  const { t } = useTranslation();
  const styles = useStyles(createStyles);
  const [selectedExamType, setSelectedExamType] = useState('Quarterly examination');
  const [examData, setExamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);

  // Mock data - will be replaced with API call
  const mockExamData = [
    {
      id: 1,
      subject: 'Tamil',
      time: '09:00 am - 10:30 am',
      location: 'Block - II, Xavier Hall',
      date: '22/09/2025',
      session: 'FN',
      color: '#8A2BE2',
    },
    {
      id: 2,
      subject: 'English',
      time: '09:00 am - 10:30 am',
      location: 'Block - II, Xavier Hall',
      date: '23/09/2025',
      session: 'FN',
      color: '#8A2BE2',
    },
    {
      id: 3,
      subject: 'Maths',
      time: '09:00 am - 10:30 am',
      location: 'Block - II, Xavier Hall',
      date: '24/09/2025',
      session: 'FN',
      color: '#8A2BE2',
    },
    {
      id: 4,
      subject: 'EVS',
      time: '02:00 pm - 04:30 pm',
      location: 'Block - II, Xavier Hall',
      date: '24/09/2025',
      session: 'AN',
      color: '#8A2BE2',
    },
  ];

  // Exam type options
  const examTypes = [
    'Quarterly examination',
    'Half-yearly examination',
    'Annual examination',
    'Unit test',
    'Mock test',
  ];

  // API function to fetch exam data
  const fetchExamData = async (examType) => {
    console.log('Fetching exam data for:', examType);
    setLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For now, return the same mock data
      // In real implementation, this would be an API call with exam type parameter
      setExamData(mockExamData);
    } catch (error) {
      console.error('Error fetching exam data:', error);
      setExamData([]);
    } finally {
      setLoading(false);
    }
  };

  // Load exam data on component mount
  useEffect(() => {
    fetchExamData(selectedExamType);
  }, []);

  // Load exam data when exam type changes
  useEffect(() => {
    if (selectedExamType) {
      fetchExamData(selectedExamType);
    }
  }, [selectedExamType]);

  // Toggle accordion
  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  // Render exam type selector (accordion)
  const renderExamTypeSelector = () => (
    <View style={styles.examTypeContainer}>
      <TouchableOpacity style={styles.examTypeButton} onPress={toggleAccordion}>
        <Text style={styles.examTypeText}>{selectedExamType}</Text>
        <Text style={[
          styles.dropdownIcon,
          isAccordionOpen && styles.dropdownIconRotated
        ]}>
          ▼
        </Text>
      </TouchableOpacity>
      
      {isAccordionOpen && (
        <View style={styles.accordionContent}>
          {examTypes.map((examType, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.examTypeOption,
                selectedExamType === examType && styles.selectedExamType
              ]}
              onPress={() => {
                setSelectedExamType(examType);
                setIsAccordionOpen(false);
              }}
            >
              <Text style={[
                styles.examTypeOptionText,
                selectedExamType === examType && styles.selectedExamTypeText
              ]}>
                {examType}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  // Render loading state
  const renderLoading = () => (
    <Loading 
      message="Loading exam timetable..." 
      color="#8A2BE2"
      overlay={true}
    />
  );

  // Render exam list
  const renderExamList = () => (
    <ScrollView 
      style={styles.examList}
      showsVerticalScrollIndicator={false}
    >
      {examData.map(exam => (
        <View key={exam.id} style={styles.examCard}>
          <View style={styles.examHeader}>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{exam.time}</Text>
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{exam.date} - {exam.session}</Text>
            </View>
          </View>
          
          <View style={styles.examContent}>
            <Text style={styles.subjectText}>{exam.subject}</Text>
            <Text style={styles.locationText}>{exam.location}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  return (
    <ScreenLayout 
      title={t('student.examTimetable')}
      isDrawerScreen={isDrawerScreen}
      onBackPress={onBackPress}
    >
      <View style={styles.container}>
        {/* Exam Type Selector (Accordion) */}
        {renderExamTypeSelector()}
        
        {/* Content */}
        <View style={styles.content}>
          {renderExamList()}
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
  examTypeContainer: {
    backgroundColor: '#E8E8E8',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  examTypeButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  examTypeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#666',
    transform: [{ rotate: '0deg' }],
  },
  dropdownIconRotated: {
    transform: [{ rotate: '180deg' }],
  },
  accordionContent: {
    backgroundColor: '#FFFFFF',
    marginTop: 8,
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  examTypeOption: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  selectedExamType: {
    backgroundColor: '#F8F9FA',
  },
  examTypeOptionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedExamTypeText: {
    color: '#8A2BE2',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  examList: {
    flex: 1,
  },
  examCard: {
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
  examHeader: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    flex: 1,
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8A2BE2',
  },
  dateContainer: {
    backgroundColor: '#E8E8E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8A2BE2',
  },
  examContent: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  subjectText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 16,
    color: '#666',
  },
});

export default ExamTimeTableScreen;