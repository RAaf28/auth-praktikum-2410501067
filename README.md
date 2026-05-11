# auth-praktikum

Aplikasi React Native (Expo) untuk praktikum autentikasi menggunakan Firebase. Dibuat untuk tugas Mobile Lanjut pertemuan 9.

## Fitur

- Register dan login dengan email & password
- Reset password lewat email
- Auto logout kalau tidak ada aktivitas selama 10 detik
- Token disimpan pakai expo-secure-store

## Cara pakai

Install dulu:

```bash
npm install
```

Buat file `src/config/firebase.js` dan isi konfigurasi Firebase dari console:

```js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

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
