import { create } from 'zustand';
import { getToken, setToken, clearToken } from '@/lib/api';

export const useAuthStore = create((set) => ({
    token: null,
    role: null,
    userId: null,
    user: null,

    // Initialize from sessionStorage (call on app mount)
    hydrate: () => {
        if (typeof window === 'undefined') return;
        const token = sessionStorage.getItem('authToken');
        const role = sessionStorage.getItem('userRole');
        const userId = sessionStorage.getItem('userId');
        const userName = sessionStorage.getItem('userName');
        const userEmail = sessionStorage.getItem('userEmail');

        if (token && role) {
            set({
                token,
                role,
                userId,
                user: userName ? { nama: userName, email: userEmail } : null,
            });
        }
    },

    // Set user after login
    login: (token, role, userId) => {
        setToken(token);
        sessionStorage.setItem('userRole', role);
        sessionStorage.setItem('userId', userId);
        set({ token, role, userId });
    },

    // Set user profile data
    setUser: (user) => {
        if (user?.nama) sessionStorage.setItem('userName', user.nama);
        if (user?.email) sessionStorage.setItem('userEmail', user.email);
        set({ user });
    },

    // Logout
    logout: () => {
        clearToken();
        sessionStorage.clear();
        set({ token: null, role: null, userId: null, user: null });
    },

    // Check if authenticated
    isAuthenticated: () => {
        return !!getToken();
    },
}));
