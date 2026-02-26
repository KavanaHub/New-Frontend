'use client';

import { useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';

export default function DashboardRootLayout({ children }) {
  useEffect(() => {
    document.documentElement.classList.add('dashboard-mono');
    return () => {
      document.documentElement.classList.remove('dashboard-mono');
    };
  }, []);

  return <DashboardLayout>{children}</DashboardLayout>;
}
