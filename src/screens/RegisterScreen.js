import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'; import { auth } from '../config/firebase';

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            console.log('1. Mulai register...');
            const cred = await createUserWithEmailAndPassword(auth, email, password);
            console.log('2. Akun dibuat:', cred.user.email);
            console.log('3. Mengirim verification email...');
            await sendEmailVerification(cred.user);
            console.log('4. Email terkirim!');
            Alert.alert('Sukses', 'Cek email untuk verifikasi.');
        } catch (e) {
            console.log('ERROR:', e.code, e.message);
            Alert.alert('Gagal', e.message);
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>Daftar Akun</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                style={{ borderBottomWidth: 1, marginBottom: 12 }}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ borderBottomWidth: 1, marginBottom: 20 }}
            />
            <Button title="Daftar" onPress={handleRegister} />
            <Text
                onPress={() => navigation.navigate('Login')}
                style={{ marginTop: 16, textAlign: 'center' }}
            >
                Sudah punya akun? Login
            </Text>
        </View>
    );
}
