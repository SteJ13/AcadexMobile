import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { useAuth } from '@context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import useStyles from '@hooks/useStyles';

// Student Profile Data
const STUDENT_PROFILE_DATA = {
    name: 'Abiyu Meshak A',
    class: 'XII A',
    gender: 'Male',
    bloodGroup: 'B+',
    fatherName: 'Arul Francis',
    motherName: 'Salethmary',
    mobile: '9159622785',
    address: '3/21, Mariyamman Koil St, Duttnagar, Villupuram, Tamil Nadu - 605 402. India.',
    profileImage: 'https://via.placeholder.com/120x120/87CEEB/FFFFFF?text=AM'
};

export default function StudentProfile() {
    const { user, logout } = useAuth();
    const navigation = useNavigation();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    const styles = useStyles((theme) =>
        StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: theme.light,
            },
            header: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingTop: 50,
                paddingBottom: 20,
                backgroundColor: 'transparent',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 10,
            },
            menuIcon: {
                fontSize: 24,
                color: theme.dark,
            },
            closeIcon: {
                fontSize: 24,
                color: theme.dark,
            },
            profileSection: {
                flex: 0.4,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#87CEEB', // Light blue background as per wireframe
                paddingTop: 70,
                paddingBottom: 30,
            },
            profileImage: {
                width: 120,
                height: 120,
                borderRadius: 60,
                marginBottom: 15,
                borderWidth: 4,
                borderColor: theme.light,
            },
            studentName: {
                fontSize: 28,
                fontWeight: 'bold',
                color: '#000000',
                textAlign: 'center',
                marginBottom: 10,
            },
            profileCard: {
                flex: 0.6,
                backgroundColor: '#8A2BE2', // Purple gradient background as per wireframe
                marginTop: -30,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                paddingHorizontal: 20,
                paddingTop: 30,
            },
            nameTitle: {
                fontSize: 24,
                fontWeight: 'bold',
                color: theme.light,
                textAlign: 'center',
                marginBottom: 5,
            },
            classText: {
                fontSize: 18,
                fontWeight: 'bold',
                color: '#FFD700', // Yellow color as per wireframe
                textAlign: 'center',
                marginBottom: 30,
                textDecorationLine: 'underline',
            },
            detailsContainer: {
                marginBottom: 20,
            },
            detailRow: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 15,
                paddingHorizontal: 10,
            },
            detailLabel: {
                fontSize: 16,
                color: theme.light,
                fontWeight: '500',
                flex: 1,
            },
            detailValue: {
                fontSize: 16,
                color: '#FFD700', // Yellow color as per wireframe
                fontWeight: '500',
                flex: 2,
                textAlign: 'right',
            },
            addressValue: {
                fontSize: 14,
                color: '#FFD700', // Yellow color as per wireframe
                fontWeight: '500',
                flex: 2,
                textAlign: 'right',
                lineHeight: 20,
            },
            backButton: {
                alignSelf: 'center',
                marginTop: 20,
                marginBottom: 30,
                padding: 15,
                backgroundColor: theme.light,
                borderRadius: 8,
            },
            backIcon: {
                fontSize: 20,
                color: '#8A2BE2',
                fontWeight: 'bold',
            },
            loadingContainer: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.light,
            },
        })
    );

    useEffect(() => {
        // Simulate API call with 2 second delay
        const loadProfileData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                setProfileData(STUDENT_PROFILE_DATA);
            } catch (error) {
                console.error('Error loading profile data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProfileData();
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
                <Text style={{ marginTop: 10, color: '#333' }}>Loading profile...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Text style={styles.menuIcon}>⋯</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleClose}>
                    <Text style={styles.closeIcon}>✕</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.profileSection}>
                <Image
                    source={{ uri: profileData?.profileImage || 'https://via.placeholder.com/100x100/87CEEB/FFFFFF?text=AM' }}
                    style={styles.profileImage}
                />
                <Text style={styles.studentName}>{profileData?.name || 'Student Name'}</Text>
            </View>

            <ScrollView style={styles.profileCard} showsVerticalScrollIndicator={false}>
                <Text style={styles.nameTitle}>{profileData?.name || 'Student Name'}</Text>
                <Text style={styles.classText}>{profileData?.class || 'Class XII'}</Text>

                <View style={styles.detailsContainer}>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Gender:</Text>
                        <Text style={styles.detailValue}>{profileData?.gender || 'Male'}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Blood Group:</Text>
                        <Text style={styles.detailValue}>{profileData?.bloodGroup || 'B+'}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Father's Name:</Text>
                        <Text style={styles.detailValue}>{profileData?.fatherName || 'Arul Francis'}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Mother's Name:</Text>
                        <Text style={styles.detailValue}>{profileData?.motherName || 'Salethmary'}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Mobile No:</Text>
                        <Text style={styles.detailValue}>{profileData?.mobile || '9159622785'}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Address:</Text>
                        <Text style={styles.addressValue}>
                            {profileData?.address || '3/21, Mariyamman Koil St, Duttnagar, Villupuram, Tamil Nadu - 605 402. India.'}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={() => {
                        console.log('Button pressed!');
                        handleLogout();
                    }}
                >
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
