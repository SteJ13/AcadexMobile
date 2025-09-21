import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { useAuth } from '@context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import useStyles from '@hooks/useStyles';

// Mock API function to get profile data
const getProfile = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: 'Abiyu Meshak A',
                class: 'XII A',
                gender: 'Male',
                bloodGroup: 'B+',
                fatherName: 'Arul Francis',
                motherName: 'Salethmary',
                mobile: '9159622785',
                address: '3/21, Mariyamman Koil St, Duttnagar, Villupuram, Tamil Nadu - 605 402. India.',
                profileImage: 'https://via.placeholder.com/200x200/87CEEB/FFFFFF?text=AM'
            });
        }, 2000);
    });
};

export default function StudentProfile() {
    const { user, logout } = useAuth();
    const navigation = useNavigation();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const styles = useStyles((theme) =>
        StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#87CEEB', // Light blue background as per wireframe
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
                color: '#000000',
                fontWeight: 'bold',
            },
            closeIcon: {
                fontSize: 24,
                color: '#000000',
                fontWeight: 'bold',
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
            profileImageContainer: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            },
            profileCard: {
                flex: 0.4,
                marginTop: -30,
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                backgroundColor: '#8A2BE2', // Purple/violet background as per wireframe
                paddingHorizontal: 25,
                paddingTop: 50,
                paddingBottom: 30,
            },
            nameTitle: {
                fontSize: 22,
                fontWeight: 'bold',
                color: theme.light, // Use theme light color
                textAlign: 'center',
                marginBottom: 8,
                textDecorationLine: 'underline',
            },
            classText: {
                fontSize: 18,
                fontWeight: 'bold',
                color: theme.appText, // Orange color from theme
                textAlign: 'center',
                marginBottom: 35,
                textDecorationLine: 'underline',
            },
            detailsContainer: {
                marginBottom: 30,
            },
            detailRow: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 18,
                paddingHorizontal: 5,
            },
            detailLabel: {
                fontSize: 16,
                color: theme.light, // Use theme light color
                fontWeight: '500',
                flex: 1,
            },
            detailValue: {
                fontSize: 16,
                color: theme.appText, // Orange color from theme
                fontWeight: '500',
                flex: 2,
                textAlign: 'right',
            },
            addressValue: {
                fontSize: 14,
                color: theme.appText, // Orange color from theme
                fontWeight: '500',
                flex: 2,
                textAlign: 'right',
                lineHeight: 20,
            },
            backButton: {
                alignSelf: 'center',
                marginTop: 20,
                marginBottom: 20,
                padding: 12,
                backgroundColor: '#FFFFFF',
                borderRadius: 8,
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
            },
            backIcon: {
                fontSize: 18,
                color: '#8A2BE2',
                fontWeight: 'bold',
            },
            loadingContainer: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#87CEEB', // Light blue background as per wireframe
            },
            loadingText: {
                marginTop: 15,
                fontSize: 16,
                color: theme.dark, // Use theme dark color
                fontWeight: '500',
            },
        })
    );

    useEffect(() => {
        const loadProfileData = async () => {
            try {
                setLoading(true);
                const profileData = await getProfile();
                setUserData(profileData);
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
                <Text style={styles.loadingText}>Loading profile...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
           

            {/* Profile Section with Large Image */}
            <View style={styles.profileSection}>
                <Image
                    source={{ uri: userData?.profileImage || 'https://via.placeholder.com/400x400/87CEEB/FFFFFF?text=AM' }}
                    style={styles.profileImage}
                />
            </View>

            {/* Purple Profile Card */}
            <ScrollView style={styles.profileCard} showsVerticalScrollIndicator={false}>
                <Text style={styles.nameTitle}>{userData?.name || 'Student Name'}</Text>
                <Text style={styles.classText}>{userData?.class || 'Class XII'}</Text>

                <View style={styles.detailsContainer}>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Gender:</Text>
                        <Text style={styles.detailValue}>{userData?.gender || 'Male'}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Blood Group:</Text>
                        <Text style={styles.detailValue}>{userData?.bloodGroup || 'B+'}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Father's Name:</Text>
                        <Text style={styles.detailValue}>{userData?.fatherName || 'Arul Francis'}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Mother's Name:</Text>
                        <Text style={styles.detailValue}>{userData?.motherName || 'Salethmary'}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Mobile No:</Text>
                        <Text style={styles.detailValue}>{userData?.mobile || '9159622785'}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Address:</Text>
                        <Text style={styles.addressValue}>
                            {userData?.address || '3/21, Mariyamman Koil St, Duttnagar, Villupuram, Tamil Nadu - 605 402. India.'}
                        </Text>
                    </View>
                </View>

                
            </ScrollView>
        </View>
    );
}
