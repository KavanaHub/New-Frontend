'use client';

import { PlaceholderPage } from '@/components/shared/placeholder-page';
import { PageHeader } from '@/components/layout/page-header';
import { useAuthStore } from '@/store/auth-store';
import { ROLE_DASHBOARD_ROUTE } from '@/lib/constants';

export default function SettingsPage() {
  const role = useAuthStore((s) => s.role);
  const backHref = ROLE_DASHBOARD_ROUTE[role] || '/dashboard/mahasiswa';

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Pengaturan" subtitle="Kelola pengaturan akun Anda." />
      <PlaceholderPage title="Halaman Pengaturan" backHref={backHref} />
    </div>
  );
}
