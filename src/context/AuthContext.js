// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Current active user
    const [users, setUsers] = useState([]); // All saved users
    const [loading, setLoading] = useState(true);
    const [loginData, setLoginData] = useState({
        emailOrPhone: '',
        school: '',
        user: '',
        role: '',
        password: '',
        managementData: [],
        selectedManagement: null,
        membersData: [],
        selectedMember: null,
    });

    // Load users and active user on app start
    useEffect(() => {
        const loadUsers = async () => {
            try {
                const storedUsers = await AsyncStorage.getItem('savedUsers');
                const activeUserId = await AsyncStorage.getItem('activeUserId');
                
                if (storedUsers) {
                    const usersList = JSON.parse(storedUsers);
                    setUsers(usersList);
                    
                    if (activeUserId) {
                        const activeUser = usersList.find(u => u.id === activeUserId);
                        if (activeUser) {
                            setUser(activeUser);
                        }
                    }
                }
            } catch (error) {
                console.error('Error loading users:', error);
            } finally {
                setLoading(false);
            }
        };
        loadUsers();
    }, []);

    // Login function - adds user to saved users and sets as active
    const login = useCallback(async (userData) => {
        try {
            const updatedUsers = [...users];
            const existingUserIndex = updatedUsers.findIndex(u => u.id === userData.id);
            
            if (existingUserIndex >= 0) {
                // Update existing user
                updatedUsers[existingUserIndex] = userData;
            } else {
                // Add new user
                updatedUsers.push(userData);
            }
            
            await AsyncStorage.setItem('savedUsers', JSON.stringify(updatedUsers));
            await AsyncStorage.setItem('activeUserId', userData.id);
            
            setUsers(updatedUsers);
            setUser(userData);
        } catch (error) {
            console.error('Error saving user:', error);
        }
    }, [users]);

    // Switch to different user
    const switchUser = useCallback(async (userId) => {
        try {
            const userToSwitch = users.find(u => u.id === userId);
            if (userToSwitch) {
                await AsyncStorage.setItem('activeUserId', userId);
                setUser(userToSwitch);
            }
        } catch (error) {
            console.error('Error switching user:', error);
        }
    }, [users]);

    // Remove user from saved users
    const removeUser = useCallback(async (userId) => {
        try {
            const updatedUsers = users.filter(u => u.id !== userId);
            await AsyncStorage.setItem('savedUsers', JSON.stringify(updatedUsers));
            setUsers(updatedUsers);
            
            // If removed user was active, switch to first available user or logout
            if (user && user.id === userId) {
                if (updatedUsers.length > 0) {
                    await switchUser(updatedUsers[0].id);
                } else {
                    await logout();
                }
            }
        } catch (error) {
            console.error('Error removing user:', error);
        }
    }, [users, user, switchUser]);

    // Logout function - removes active user but keeps saved users
    const logout = useCallback(async () => {
        try {
            await AsyncStorage.removeItem('activeUserId');
            setUser(null);
            clearLoginData();
        } catch (error) {
            console.error('Error removing active user:', error);
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
            managementData: [],
            selectedManagement: null,
            membersData: [],
            selectedMember: null,
        });
    }, []);

    return (
        <AuthContext.Provider value={{ 
            user, 
            users,
            loading, 
            login, 
            logout, 
            switchUser,
            removeUser,
            loginData, 
            updateLoginData, 
            clearLoginData 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
