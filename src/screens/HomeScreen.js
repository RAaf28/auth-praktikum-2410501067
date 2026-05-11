import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../config/firebase';
import { useIdleTimeout } from '../hooks/useIdleTimeout';

export default function HomeScreen() {
    const { user, logout } = useAuth();

    const checkEmailVerified = () => {
        if (auth.currentUser?.emailVerified) {
            Alert.alert('Email terverifikasi ✓');
        } else {
            Alert.alert('Email belum diverifikasi', 'Cek inbox kamu!');
        }
    };

    const handleTimeout = () => {
        Alert.alert(
            'Sesi Berakhir',
            'Kamu telah tidak aktif selama 5 menit. Silakan login kembali.',
            [{ text: 'OK', onPress: logout }]
        );
    };

    const { resetTimer } = useIdleTimeout(handleTimeout);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.email}>{user?.email}</Text>
            <Text style={{ color: '#999', marginBottom: 24, fontSize: 13 }}>
                Sesi akan berakhir otomatis setelah 5 menit tidak aktif.
            </Text>
            <TouchableOpacity style={styles.button} onPress={logout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    email: {
        fontSize: 16,
        color: '#666',
        marginBottom: 32,
    },
    button: {
        backgroundColor: '#e74c3c',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
