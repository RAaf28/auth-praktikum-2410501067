import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function ForgotPasswordScreen({ navigation }) {
    const [email, setEmail] = useState('');

    const handleReset = async () => {
        if (!email) {
            Alert.alert('Error', 'Masukkan email terlebih dahulu.');
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert('Sukses', 'Email reset password telah dikirim. Cek inbox Anda.');
            navigation.navigate('Login');
        } catch (e) {
            Alert.alert('Gagal', e.message);
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 20, marginBottom: 8 }}>Lupa Password</Text>
            <Text style={{ color: '#666', marginBottom: 20 }}>
                Masukkan email Anda dan kami akan mengirimkan link untuk reset password.
            </Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                style={{ borderBottomWidth: 1, marginBottom: 20 }}
            />
            <Button title="Kirim Email Reset" onPress={handleReset} />
            <Text
                onPress={() => navigation.navigate('Login')}
                style={{ marginTop: 16, textAlign: 'center' }}
            >
                Kembali ke Login
            </Text>
        </View>
    );
}