import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import useStyles from '../hooks/useStyles';

const ProfileScreen = () => {
    const { theme, themeMode, setThemeMode } = useTheme();

    const styles = useStyles((theme) =>
        StyleSheet.create({
            container: {
                marginTop: 30,
                padding: 20,
                backgroundColor: theme.card,
                borderRadius: 10,
            },
            title: {
                color: theme.text,
                fontSize: 18,
                marginBottom: 10,
            },
        })
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Current Theme: {themeMode}</Text>
            <Switch
                value={themeMode === 'dark'}
                onValueChange={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}
                thumbColor={theme.primary}
                trackColor={{ false: '#ccc', true: '#555' }}
            />
        </View>
    );
};

export default ProfileScreen;
