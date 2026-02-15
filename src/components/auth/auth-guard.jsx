'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { ROLE_DASHBOARD_ROUTE } from '@/lib/constants';

export function AuthGuard({ children, allowedRoles = [] }) {
  const router = useRouter();
  const { token, role } = useAuthStore();

  useEffect(() => {
    // Not authenticated
    if (!token && typeof window !== 'undefined') {
      const storedToken = sessionStorage.getItem('authToken');
      if (!storedToken) {
        router.replace('/login');
        return;
      }
    }

    // Role check
    if (allowedRoles.length > 0 && role && !allowedRoles.includes(role)) {
      const redirectTo = ROLE_DASHBOARD_ROUTE[role] || '/login';
      router.replace(redirectTo);
    }
  }, [token, role, allowedRoles, router]);

  // Don't render until auth check is done
  if (!token && typeof window !== 'undefined' && !sessionStorage.getItem('authToken')) {
    return null;
  }

  return children;
}
