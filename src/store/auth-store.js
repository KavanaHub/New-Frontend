import { create } from 'zustand';
import { getToken, setToken, clearToken, authAPI } from '@/lib/api';

export const useAuthStore = create((set, get) => ({
    token: null,
    role: null,
    roles: [],       // All roles from backend (for kaprodi+koordinator combo etc.)
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
        const rolesRaw = sessionStorage.getItem('userRoles');
        const roles = rolesRaw ? JSON.parse(rolesRaw) : (role ? [role] : []);

        if (token && role) {
            set({
                token,
                role,
                roles,
                userId,
                user: userName ? { nama: userName, email: userEmail } : null,
            });
        }
    },

    // Set user after login
    login: (token, role, userId, roles = []) => {
        setToken(token);
        sessionStorage.setItem('userRole', role);
        sessionStorage.setItem('userId', userId);
        const allRoles = roles.length > 0 ? roles : [role];
        sessionStorage.setItem('userRoles', JSON.stringify(allRoles));
        set({ token, role, roles: allRoles, userId });
    },

    // Set user profile data
    setUser: (user) => {
        if (user?.nama) sessionStorage.setItem('userName', user.nama);
        if (user?.email) sessionStorage.setItem('userEmail', user.email);
        // Sync roles from profile if available
        if (user?.roles?.length) {
            sessionStorage.setItem('userRoles', JSON.stringify(user.roles));
            set({ user, roles: user.roles });
        } else {
            set({ user });
        }
    },

    // Logout (server-side invalidation + local cleanup)
    logout: async () => {
        await authAPI.logout();
        set({ token: null, role: null, roles: [], userId: null, user: null });
    },

    // Check if user has a specific role
    hasRole: (targetRole) => {
        return get().roles.includes(targetRole);
    },

    // Check if authenticated
    isAuthenticated: () => {
        return !!getToken();
    },
}));
