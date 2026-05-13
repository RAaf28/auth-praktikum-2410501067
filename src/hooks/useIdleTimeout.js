import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';

const IDLE_TIMEOUT = 10 * 1000; // 60 menit dalam milidetik

export function useIdleTimeout(onTimeout) {
    const timerRef = useRef(null);
    const appStateRef = useRef(AppState.currentState);

    const resetTimer = () => {
        // Hapus timer lama, mulai timer baru
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            onTimeout(); // panggil logout setelah 5 menit
        }, IDLE_TIMEOUT);
    };

    useEffect(() => {
        // Mulai timer pertama kali
        resetTimer();

        // Pantau AppState — kalau app kembali ke foreground, reset timer
        const subscription = AppState.addEventListener('change', (nextState) => {
            if (appStateRef.current.match(/inactive|background/) && nextState === 'active') {
                resetTimer(); // app dibuka lagi → reset timer
            }
            appStateRef.current = nextState;
        });

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            subscription.remove();
        };
    }, []);

    return { resetTimer }; // kembalikan resetTimer untuk dipanggil saat ada interaksi
}