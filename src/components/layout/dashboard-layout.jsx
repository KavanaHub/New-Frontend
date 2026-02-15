'use client';

import { useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { Search, Bell, Filter, ChevronDown } from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { DesktopSidebar, MobileSidebar } from '@/components/layout/sidebar';
import { AuthGuard } from '@/components/auth/auth-guard';
import { TITLE_MAP, ROLE_LABEL } from '@/lib/constants';
import { removeAcademicTitles } from '@/lib/validators';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function DashboardLayout({ children, allowedRoles = [] }) {
  const role = useAuthStore((s) => s.role);
  const user = useAuthStore((s) => s.user);
  const currentRole = role || (typeof window !== 'undefined' ? sessionStorage.getItem('userRole') : null);
  const pathname = usePathname();
  const displayName = removeAcademicTitles(user?.nama || 'User');
  const initials = displayName.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  const pageTitle = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    return TITLE_MAP[lastSegment] || 'Dashboard';
  }, [pathname]);

  return (
    <AuthGuard allowedRoles={allowedRoles}>
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <DesktopSidebar role={currentRole} />

        {/* Main Content */}
        <main className="flex-1">
          {/* Top Navbar */}
          <header className="sticky top-0 z-20 px-4 lg:px-5 pt-3 lg:pt-4">
            <div className="rounded-2xl border border-[hsl(var(--ctp-overlay0)/0.35)] bg-[hsl(var(--ctp-mantle)/0.55)] ctp-ring backdrop-blur-sm">
              <div className="flex items-center gap-3 px-4 py-3">
                {/* Mobile hamburger */}
                <div className="lg:hidden">
                  <MobileSidebar role={currentRole} />
                </div>

                {/* Page title */}
                <div className="min-w-0">
                  <div className="text-sm text-[hsl(var(--ctp-subtext0))]">{ROLE_LABEL[currentRole] || 'Dashboard'}</div>
                  <div className="truncate text-lg font-semibold tracking-tight text-[hsl(var(--ctp-text))]">{pageTitle}</div>
                </div>

                {/* Search */}
                <div className="ml-auto hidden max-w-[560px] flex-1 items-center gap-2 md:flex">
                  <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--ctp-subtext0))]" />
                    <Input
                      className="ctp-focus h-10 rounded-2xl border-[hsl(var(--ctp-overlay0)/0.35)] bg-[hsl(var(--ctp-surface0)/0.35)] pl-10 text-[hsl(var(--ctp-text))] placeholder:text-[hsl(var(--ctp-overlay1))]"
                      placeholder="Cari mahasiswa, dokumen, jadwal…"
                    />
                  </div>
                </div>

                {/* Notifications + User */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="ctp-focus h-10 w-10 rounded-2xl border border-[hsl(var(--ctp-overlay0)/0.35)] bg-[hsl(var(--ctp-surface0)/0.35)] hover:bg-[hsl(var(--ctp-surface0)/0.55)]"
                    aria-label="Notifications"
                  >
                    <Bell className="h-4 w-4 text-[hsl(var(--ctp-subtext1))]" />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="secondary"
                        className="ctp-focus h-10 rounded-2xl border border-[hsl(var(--ctp-overlay0)/0.35)] bg-[hsl(var(--ctp-surface0)/0.35)] hover:bg-[hsl(var(--ctp-surface0)/0.55)]"
                      >
                        <span className="mr-2 grid h-6 w-6 place-items-center rounded-xl bg-[hsl(var(--ctp-lavender)/0.35)] border border-[hsl(var(--ctp-lavender)/0.45)] text-[10px] font-bold text-[hsl(var(--ctp-crust))]">
                          {initials}
                        </span>
                        <span className="hidden sm:inline text-sm text-[hsl(var(--ctp-text))]">{displayName.split(' ')[0].toLowerCase()}</span>
                        <ChevronDown className="ml-2 h-4 w-4 text-[hsl(var(--ctp-subtext0))]" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="rounded-2xl border-[hsl(var(--ctp-overlay0)/0.35)] bg-[hsl(var(--ctp-mantle)/0.95)]">
                      <DropdownMenuLabel className="text-[hsl(var(--ctp-subtext0))]">Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="focus:bg-[hsl(var(--ctp-surface0)/0.50)]">Profile</DropdownMenuItem>
                      <DropdownMenuItem className="focus:bg-[hsl(var(--ctp-surface0)/0.50)]">Preferences</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="focus:bg-[hsl(var(--ctp-surface0)/0.50)]">Sign out</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Mobile search */}
              <div className="px-4 pb-3 md:hidden">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--ctp-subtext0))]" />
                  <Input
                    className="ctp-focus h-10 rounded-2xl border-[hsl(var(--ctp-overlay0)/0.35)] bg-[hsl(var(--ctp-surface0)/0.35)] pl-10 text-[hsl(var(--ctp-text))] placeholder:text-[hsl(var(--ctp-overlay1))]"
                    placeholder="Cari…"
                  />
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="px-4 lg:px-5 pb-10 pt-5">
            {children}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
