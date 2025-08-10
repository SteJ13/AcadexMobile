import React, { createContext, useContext, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const addToast = useCallback((type, message) => {
        const id = Date.now().toString();
        setToasts((prev) => [...prev, { id, type, message }]);

        // Auto remove after 3 seconds
        setTimeout(() => removeToast(id), 3000);
    }, [removeToast]);

    const toast = {
        success: (msg) => addToast('success', msg),
        error: (msg) => addToast('error', msg),
    };

    return (
        <ToastContext.Provider value={toast}>
            {children}
            <View style={styles.container}>
                {toasts.map((t) => (
                    <ToastItem key={t.id} type={t.type} message={t.message} />
                ))}
            </View>
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);

const ToastItem = ({ type, message }) => {
    const bgColor = type === 'success' ? '#4caf50' : '#f44336';
    return (
        <View style={[styles.toast, { backgroundColor: bgColor }]}>
            <Text style={styles.text}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 9999,
    },
    toast: {
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        minWidth: '70%',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
    },
});
