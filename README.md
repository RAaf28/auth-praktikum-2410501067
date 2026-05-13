# auth-praktikum

Aplikasi React Native (Expo) untuk praktikum autentikasi menggunakan Firebase. Dibuat untuk tugas Mobile Lanjut pertemuan 9.

## Fitur

- Register dan login dengan email & password
- Reset password lewat email
- Auto logout kalau tidak ada aktivitas selama 10 detik
- Token disimpan pakai expo-secure-store

## Link video demo
Gdrive: https://drive.google.com/file/d/1LUZI9dip4kJwYXWpO0jAxmkCopO1qWkz/view?usp=drive_link


## Cara pakai

Install dulu:

```bash
npm install
```

Buat file `.env` di root project, isi dengan konfigurasi Firebase kamu (lihat `.env.example` sebagai template):

```
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

Konfigurasi Firebase bisa didapat dari [Firebase Console](https://console.firebase.google.com/) → Project Settings → Your Apps.
Pastikan **Email/Password** sudah diaktifkan di Authentication → Sign-in method.

Jalankan:

```bash
npm start
```

## Struktur folder

```
src/
├── config/       # konfigurasi firebase
├── contexts/     # AuthContext (state login global)
├── hooks/        # useIdleTimeout
└── screens/      # Login, Register, ForgotPassword, Home
```
