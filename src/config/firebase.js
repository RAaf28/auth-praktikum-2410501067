import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyCjHpKSiTQdjogCHB3wY6a5D5ywXRCLbp4",
    authDomain: "mobile-lanjut-f33eb.firebaseapp.com",
    projectId: "mobile-lanjut-f33eb",
    storageBucket: "mobile-lanjut-f33eb.firebasestorage.app",
    messagingSenderId: "159235517651",
    appId: "1:159235517651:web:b85e3cf2996bb60778b826",
    measurementId: "G-4GX4YM5J40"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});