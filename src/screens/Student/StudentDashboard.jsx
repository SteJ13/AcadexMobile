import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, ScrollView, Alert, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import useStyles from '@hooks/useStyles';
import CustomPieChart from '@components/Charts/CustomPieChart';
import CustomBarChart from '@components/Charts/CustomBarChart';
import CustomGroupedBarChart from '@components/Charts/CustomGroupedBarChart';
import { Dimensions } from 'react-native';

// Student Dashboard Data
const STUDENT_DASHBOARD_DATA = {
    attendance: {
        totalDays: 50,
        present: 45,
        absent: 5,
        percentage: 90
    },
    fees: {
        total: 42000,
        paid: 18000,
        due: 32000,
        percentage: 76
    },
    subjectAttendance: {
        subjects: ['Tamil', 'English', 'Maths', 'Science', 'EVS'],
        colors: ['#FF69B4', '#FFA500', '#FFD700', '#87CEEB', '#9370DB'],
        term1: [10, 15, 25, 35, 10],
        term2: [15, 25, 35, 45, 40],
        term3: [25, 35, 45, 55, 50]
    }
};

const screenWidth = Dimensions.get('window').width;

export default function StudentDashboard() {
    const { user, logout } = useAuth();
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    const styles = useStyles((theme) =>
        StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#87CEEB', // Light blue background as per wireframe
            },
            profileSection: {
                flex: 0.6,
                backgroundColor: '#87CEEB', // Light blue background as per wireframe
                position: 'relative',
            },
            profileImage: {
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
            },
            dashboardCard: {
                flex: 0.4,
                backgroundColor: '#8A2BE2', // Purple/violet background as per wireframe
                marginTop: -30,
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                paddingHorizontal: 20,
                paddingTop: 30,
            },
            sectionTitle: {
                fontSize: 20,
                fontWeight: 'bold',
                color: '#fff',
                marginBottom: 15,
                textAlign: 'center',
            },
            chartsRow: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 30,
            },
            chartContainer: {
                flex: 1,
                alignItems: 'center',
                marginHorizontal: 5,
            },
            chartTitle: {
                fontSize: 16,
                fontWeight: 'bold',
                color: theme.appText, // Orange color from theme
                marginBottom: 10,
                textAlign: 'center',
            },
            legendContainer: {
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginTop: 10,
            },
            legendItem: {
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 5,
                marginVertical: 2,
            },
            legendDot: {
                width: 12,
                height: 12,
                borderRadius: 6,
                marginRight: 5,
            },
            legendText: {
                fontSize: 12,
                color: '#fff',
            },
            attendanceSection: {
                marginTop: 20,
            },
            backIcon: {
                alignSelf: 'center',
                marginTop: 20,
                marginBottom: 30,
                padding: 15,
                backgroundColor: '#fff',
                borderRadius: 25,
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            },
            backIconText: {
                color: '#8A2BE2',
                fontSize: 24,
                fontWeight: 'bold',
            },
            loadingContainer: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#87CEEB', // Light blue background as per wireframe
            },
            loadingText: {
                marginTop: 10,
                color: theme.dark,
            },
        })
    );

    useEffect(() => {
        // Simulate API call with 2 second delay
        const loadDashboardData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                setDashboardData(STUDENT_DASHBOARD_DATA);
            } catch (error) {
                console.error('Error loading dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, []);

    const handleClose = () => {
        navigation.goBack();
    };

    const handleLogout = async () => {
        console.log('Logout button pressed - handleLogout called');
        
        // Add a small delay to ensure component is mounted
        setTimeout(() => {
            Alert.alert(
                'Logout',
                'Are you sure you want to logout?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                        onPress: () => console.log('Logout cancelled'),
                    },
                    {
                        text: 'Confirm',
                        onPress: async () => {
                            console.log('Logout confirmed, executing logout...');
                            try {
                                await logout();
                                console.log('Logout successful');
                                // Navigation will be handled automatically by RootNavigator
                            } catch (error) {
                                console.error('Logout error:', error);
                            }
                        },
                    },
                ]
            );
        }, 100);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#8A2BE2" />
                <Text style={styles.loadingText}>Loading dashboard...</Text>
            </View>
        );
    }

    // Prepare chart data
    const attendancePieData = [
        {
            label: 'Present',
            value: dashboardData?.attendance.present || 0,
            color: '#32CD32',
        },
        {
            label: 'Absent',
            value: dashboardData?.attendance.absent || 0,
            color: '#FF4500',
        },
    ];

    const feesBarData = {
        labels: ['Due', 'Paid', 'Total'],
        values: [
            dashboardData?.fees.due || 0,
            dashboardData?.fees.paid || 0,
            dashboardData?.fees.total || 0,
        ],
    };

    const subjectAttendanceData = {
        labels: ['Term 1', 'Term 2', 'Term 3'],
        datasets: dashboardData?.subjectAttendance.subjects.map((subject, index) => ({
            data: [
                dashboardData.subjectAttendance.term1[index],
                dashboardData.subjectAttendance.term2[index],
                dashboardData.subjectAttendance.term3[index],
            ],
            color: dashboardData.subjectAttendance.colors[index],
        })) || [],
    };

    return (
        <View style={styles.container}>
            <StatusBar 
                barStyle="dark-content" 
                backgroundColor="#87CEEB"
                translucent={false}
            />
            {/* Profile Section with Large Image */}
            <View style={styles.profileSection}>
                <Image
                    source={{ uri: 'https://img.freepik.com/premium-photo/poised-indian-college-boy-tailored-formal-suit_878783-15102.jpg?w=2000' }}
                    style={styles.profileImage}
                />
            </View>

            <ScrollView style={styles.dashboardCard} showsVerticalScrollIndicator={false}>
                <View style={styles.chartsRow}>
                    <View style={styles.chartContainer}>
                        <Text style={styles.chartTitle}>Attendance</Text>
                        <CustomPieChart
                            data={attendancePieData}
                            size={120}
                        />
                    </View>

                    <View style={styles.chartContainer}>
                        <Text style={styles.chartTitle}>Fee</Text>
                        <CustomBarChart
                            data={feesBarData}
                            width={screenWidth * 0.4}
                            height={120}
                            colors={['#FF4500', '#32CD32', '#4169E1']}
                        />
                    </View>
                </View>

                <View style={styles.attendanceSection}>
                    <Text style={styles.sectionTitle}>Attendance</Text>
                    
                    <View style={styles.legendContainer}>
                        {dashboardData?.subjectAttendance.subjects.map((subject, index) => (
                            <View key={subject} style={styles.legendItem}>
                                <View 
                                    style={[
                                        styles.legendDot, 
                                        { backgroundColor: dashboardData.subjectAttendance.colors[index] }
                                    ]} 
                                />
                                <Text style={styles.legendText}>{subject}</Text>
                            </View>
                        ))}
                    </View>

                    <CustomGroupedBarChart
                        data={subjectAttendanceData}
                        width={screenWidth - 40}
                        height={200}
                    />
                </View>

            </ScrollView>
        </View>
    );
}
