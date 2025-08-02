import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';

const themes = {
    light: {
        background: '#ffffff',
        text: '#000000',
        primary: '#007bff',
    },
    dark: {
        background: '#000000',
        text: '#ffffff',
        primary: '#1e90ff',
    },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const colorScheme = Appearance.getColorScheme();
    const [themeMode, setThemeMode] = useState(colorScheme || 'light');

    const theme = themes[themeMode];

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setThemeMode(colorScheme || 'light');
        });
        return () => subscription.remove();
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, themeMode, setThemeMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
