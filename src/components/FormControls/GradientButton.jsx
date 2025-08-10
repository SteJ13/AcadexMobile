import useStyles from '@hooks/useStyles';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg';

export default function GradientButton({ onPress, title, loading = false }) {
    const styles = useStyles((theme) =>
        StyleSheet.create({
            buttonWrapper: {
                width: '100%',
                height: 60,
                borderRadius: 30,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 5,
            },
            text: {
                color: theme.light,
                fontSize: 18,
                fontWeight: '600',
            },
        }));

    return (
        <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={onPress}
            disabled={loading}
            activeOpacity={0.8}
        >
            <Svg height="60" width="300" style={StyleSheet.absoluteFill}>
                <Defs>
                    <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                        <Stop offset="0" stopColor="#c489e8" stopOpacity="1" />
                        <Stop offset="1" stopColor="#732b9e" stopOpacity="1" />
                    </LinearGradient>
                </Defs>
                <Rect
                    x="0"
                    y="0"
                    rx="30"
                    ry="30"
                    width="300"
                    height="60"
                    fill="url(#grad)"
                    stroke="#b0d2c2"
                    strokeWidth="2"
                />
            </Svg>
            {loading ? (
                <ActivityIndicator size="small" color="#fff" />
            ) : (
                <Text style={styles.text}>{title}</Text>
            )}
        </TouchableOpacity>
    );
}

