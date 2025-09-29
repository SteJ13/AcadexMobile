import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import useStyles from '@hooks/useStyles'

const { width, height } = Dimensions.get('window')

export default function SplashScreen() {
    const styles = useStyles(createStyles)

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <View style={styles.logoCircle}>
                    <Text style={styles.logoText}>Acadex</Text>
                </View>
            </View>
        </View>
    )
}

const createStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a2e', // Dark navy blue background
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#3b82f6', // Vibrant blue
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        // Outer ring effect
        borderWidth: 3,
        borderColor: '#60a5fa', // Lighter blue for border
    },
    logoText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000', // Black text
        letterSpacing: 1,
    },
})