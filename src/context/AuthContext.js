// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // { id, name, role, token }
    const [loading, setLoading] = useState(true);
    const [loginData, setLoginData] = useState({
        emailOrPhone: '',
        school: '',
        user: '',
        role: '',
        password: '',
    });

    // Load user on app start
    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('userData');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error('Error loading user:', error);
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);

    // Login function
    const login = useCallback(async (userData) => {
        try {
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            setUser(userData);
        } catch (error) {
            console.error('Error saving user:', error);
        }
    }, []);

    // Logout function
    const logout = useCallback(async () => {
        try {
            await AsyncStorage.removeItem('userData');
            setUser(null);
            clearLoginData();
        } catch (error) {
            console.error('Error removing user:', error);
        }
    }, []);

    // Login flow state management
    const updateLoginData = useCallback((field, value) => {
        setLoginData(prev => ({
            ...prev,
            [field]: value
        }));
    }, []);

    const clearLoginData = useCallback(() => {
        setLoginData({
            emailOrPhone: '',
            school: '',
            user: '',
            role: '',
            password: '',
        });
    }, []);

    return (
        <AuthContext.Provider value={{ 
            user, 
            loading, 
            login, 
            logout, 
            loginData, 
            updateLoginData, 
            clearLoginData 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
