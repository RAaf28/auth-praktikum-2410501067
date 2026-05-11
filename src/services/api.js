import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    signOut,
} from 'firebase/auth';
import { auth } from '../config/firebase';

/**
 * Login with email and password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<import('firebase/auth').UserCredential>}
 */
export const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

/**
 * Register a new user with email and password.
 * Automatically sends an email verification after account creation.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<import('firebase/auth').UserCredential>}
 */
export const register = async (email, password) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(credential.user);
    return credential;
};

/**
 * Send a password reset email to the given address.
 * @param {string} email
 * @returns {Promise<void>}
 */
export const forgotPassword = (email) =>
    sendPasswordResetEmail(auth, email);

/**
 * Resend an email verification to the currently signed-in user.
 * @returns {Promise<void>}
 */
export const resendVerification = () => {
    const user = auth.currentUser;
    if (!user) throw new Error('Tidak ada pengguna yang sedang login.');
    return sendEmailVerification(user);
};

/**
 * Sign out the current user.
 * @returns {Promise<void>}
 */
export const logout = () => signOut(auth);
