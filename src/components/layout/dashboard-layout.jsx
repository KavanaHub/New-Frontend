'use client';

import { useCallback, useMemo, useState, useSyncExternalStore, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Bell, ChevronDown, Moon, Sun, User, Settings, LogOut, CalendarDays, Maximize2, Minimize2 } from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { DesktopSidebar, MobileSidebar } from '@/components/layout/sidebar';
import { AuthGuard } from '@/components/auth/auth-guard';
import { TITLE_MAP, ROLE_LABEL, ROLE_DASHBOARD_ROUTE } from '@/lib/constants';
import { removeAcademicTitles } from '@/lib/validators';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

function useTheme() {
  const resolveTheme = useCallback((value) => {
    if (value === 'dark' || value === 'light') return value;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    return resolveTheme(localStorage.getItem('kavana-theme'));
  });

  const applyTheme = useCallback((t, animate = true) => {
    const root = document.documentElement;
    if (animate) {
      root.classList.add('theme-transition');
      setTimeout(() => root.classList.remove('theme-transition'), 400);
    }
    root.classList.remove('light', 'dark');
    root.classList.add(t === 'dark' ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    applyTheme(theme, false);
  }, [theme, applyTheme]);

  const setTheme = (t) => {
    const nextTheme = t === 'dark' ? 'dark' : 'light';
    setThemeState(nextTheme);
    localStorage.setItem('kavana-theme', nextTheme);
  };

  return { theme, setTheme };
}

function useFullscreen() {
  const [isFull, setIsFull] = useState(false);

  useEffect(() => {
    const handler = () => setIsFull(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const toggle = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.();
  };

  return { isFull, toggle };
}

function useFormattedDate() {
  return useMemo(
    () => new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    []
  );
}

const iconBtnCls = "ctp-focus h-9 w-9 rounded-xl border border-[hsl(var(--ctp-surface2))] bg-[hsl(var(--ctp-surface0))] hover:bg-[hsl(var(--ctp-surface1))] transition-colors";

function useIsHydrated() {
  return useSyncExternalStore(
    () => () => { },
    () => true,
    () => false
  );
}

export function DashboardLayout({ children, allowedRoles = [] }) {
  const role = useAuthStore((s) => s.role);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const currentRole = role || null;
  const pathname = usePathname();
  const router = useRouter();
  const displayName = removeAcademicTitles(user?.nama || 'User');
  const initials = displayName.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  const { theme, setTheme } = useTheme();
  const { isFull, toggle: toggleFullscreen } = useFullscreen();
  const todayDate = useFormattedDate();
  const isHydrated = useIsHydrated();

  const pageTitle = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    return TITLE_MAP[lastSegment] || 'Dashboard';
  }, [pathname]);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const ThemeIcon = theme === 'dark' ? Moon : Sun;
  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  const themeLabel = theme === 'dark' ? 'Dark' : 'Light';

  return (
    <AuthGuard allowedRoles={allowedRoles}>
      <TooltipProvider delayDuration={300}>
        <div className="flex min-h-screen">
          {/* Desktop Sidebar */}
          <DesktopSidebar role={currentRole} />

          {/* Main Content */}
          <main className="flex-1">
            {/* Top Navbar */}
            <header className="sticky top-0 z-20 px-4 lg:px-5 pt-3 lg:pt-4">
              <div className="rounded-2xl border border-[hsl(var(--ctp-surface1))] bg-[hsl(var(--ctp-crust))] shadow-sm backdrop-blur-lg">
                <div className="flex items-center gap-3 px-4 py-2.5">
                  {/* Mobile hamburger */}
                  <div className="lg:hidden">
                    <MobileSidebar role={currentRole} />
                  </div>

                  {/* Page title + date */}
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] uppercase tracking-wider text-[hsl(var(--ctp-subtext0))]">{ROLE_LABEL[currentRole] || 'Dashboard'}</div>
                    <div className="truncate text-base font-semibold tracking-tight text-[hsl(var(--ctp-text))]">{pageTitle}</div>
                  </div>

                  {/* Date (desktop) */}
                  {isHydrated && todayDate && (
                    <div className="hidden xl:flex items-center gap-1.5 text-xs text-[hsl(var(--ctp-subtext0))] mr-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {todayDate}
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex items-center gap-1.5">
                    {/* Theme toggle */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={iconBtnCls}
                          onClick={() => setTheme(nextTheme)}
                          aria-label="Toggle theme"
                        >
                          <ThemeIcon className="h-4 w-4 text-[hsl(var(--ctp-subtext1))]" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="rounded-xl border-[hsl(var(--ctp-overlay0)/0.35)] bg-[hsl(var(--ctp-surface0))] text-[hsl(var(--ctp-text))]">
                        <p className="text-xs">Tema: {themeLabel}</p>
                      </TooltipContent>
                    </Tooltip>

                    {/* Fullscreen */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`${iconBtnCls} hidden md:inline-flex`}
                          onClick={toggleFullscreen}
                          aria-label="Toggle fullscreen"
                        >
                          {isFull
                            ? <Minimize2 className="h-4 w-4 text-[hsl(var(--ctp-subtext1))]" />
                            : <Maximize2 className="h-4 w-4 text-[hsl(var(--ctp-subtext1))]" />
                          }
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="rounded-xl border-[hsl(var(--ctp-overlay0)/0.35)] bg-[hsl(var(--ctp-surface0))] text-[hsl(var(--ctp-text))]">
                        <p className="text-xs">{isFull ? 'Exit Fullscreen' : 'Fullscreen'}</p>
                      </TooltipContent>
                    </Tooltip>

                    {/* Notifications */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`${iconBtnCls} relative`}
                          aria-label="Notifications"
                        >
                          <Bell className="h-4 w-4 text-[hsl(var(--ctp-subtext1))]" />
                          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[hsl(var(--ctp-red))] ring-2 ring-[hsl(var(--ctp-mantle))]" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="rounded-xl border-[hsl(var(--ctp-overlay0)/0.35)] bg-[hsl(var(--ctp-surface0))] text-[hsl(var(--ctp-text))]">
                        <p className="text-xs">Notifikasi</p>
                      </TooltipContent>
                    </Tooltip>

                    {/* User dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="ctp-focus h-9 rounded-xl border border-[hsl(var(--ctp-surface2))] bg-[hsl(var(--ctp-surface0))] hover:bg-[hsl(var(--ctp-surface1))] pl-1.5 pr-2 gap-1.5"
                        >
                          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-[hsl(var(--ctp-lavender)/0.25)] border border-[hsl(var(--ctp-lavender)/0.40)] text-[10px] font-bold text-[hsl(var(--ctp-text))]">
                            {initials}
                          </span>
                          <span className="hidden sm:inline text-sm text-[hsl(var(--ctp-text))] font-medium">{displayName.split(' ')[0]}</span>
                          <ChevronDown className="h-3.5 w-3.5 text-[hsl(var(--ctp-overlay1))]" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-52 rounded-xl border-[hsl(var(--ctp-surface1))] bg-[hsl(var(--ctp-crust))] backdrop-blur-lg p-1 shadow-lg">
                        <DropdownMenuLabel className="px-3 py-2">
                          <p className="text-sm font-semibold text-[hsl(var(--ctp-text))]">{displayName}</p>
                          <p className="text-xs text-[hsl(var(--ctp-subtext0))]">{ROLE_LABEL[currentRole] || 'User'}</p>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-[hsl(var(--ctp-overlay0)/0.25)]" />
                        <DropdownMenuItem
                          className="rounded-lg px-3 py-2 text-sm text-[hsl(var(--ctp-text))] focus:bg-[hsl(var(--ctp-surface0)/0.50)] cursor-pointer gap-2"
                          onClick={() => router.push('/dashboard/profile')}
                        >
                          <User className="h-4 w-4 text-[hsl(var(--ctp-subtext0))]" /> Profil Saya
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="rounded-lg px-3 py-2 text-sm text-[hsl(var(--ctp-text))] focus:bg-[hsl(var(--ctp-surface0)/0.50)] cursor-pointer gap-2"
                          onClick={() => router.push('/dashboard/settings')}
                        >
                          <Settings className="h-4 w-4 text-[hsl(var(--ctp-subtext0))]" /> Pengaturan
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-[hsl(var(--ctp-overlay0)/0.25)]" />
                        <DropdownMenuItem
                          className="rounded-lg px-3 py-2 text-sm text-[hsl(var(--ctp-red))] focus:bg-[hsl(var(--ctp-red)/0.12)] cursor-pointer gap-2"
                          onClick={handleLogout}
                        >
                          <LogOut className="h-4 w-4" /> Keluar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
      </TooltipProvider>
    </AuthGuard>
  );
}
