import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Simpan credentials supaya bisa dipakai login biometric berikutnya
            await SecureStore.setItemAsync('auth_email', email);
            await SecureStore.setItemAsync('auth_password', password);
        } catch (e) {
            Alert.alert('Login gagal', e.message);
        }
    };

    const handleBiometric = async () => {
        const token = await SecureStore.getItemAsync('auth_token');
        if (!token) {
            Alert.alert('Belum ada session', 'Silakan login dulu dengan password.');
            return;
        }
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        if (!hasHardware) {
            Alert.alert('Tidak didukung', 'HP kamu tidak punya sensor biometric.');
            return;
        }
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        if (!isEnrolled) {
            Alert.alert('Belum disetup', 'Aktifkan Face ID / Fingerprint di Settings dulu.');
            return;
        }
        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Login dengan biometric',
            fallbackLabel: 'Gunakan password',
            cancelLabel: 'Batal',
        });
        if (result.success) {
            // Ambil credentials yang tersimpan lalu login ke Firebase
            const savedEmail = await SecureStore.getItemAsync('auth_email');
            const savedPassword = await SecureStore.getItemAsync('auth_password');
            if (!savedEmail || !savedPassword) {
                Alert.alert('Error', 'Credentials tidak ditemukan. Silakan login dengan password dulu.');
                return;
            }
            try {
                await signInWithEmailAndPassword(auth, savedEmail, savedPassword);
            } catch (e) {
                Alert.alert('Login gagal', e.message);
            }
        } else {
            Alert.alert('Gagal', 'Biometric tidak cocok.');
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
            <Button title="Login dengan Biometric" onPress={handleBiometric} />
            <Text onPress={() => navigation.navigate('Register')}>
                Belum punya akun? Daftar
            </Text>
            <Text onPress={() => navigation.navigate('ForgotPassword')}>
                Lupa password?
            </Text>
        </View>
    );
}