'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GraduationCap, LogOut, Plus, LifeBuoy, Settings } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth-store';
import { MENU_CONFIG, ROLE_LABEL, ROLE_DASHBOARD_ROUTE } from '@/lib/constants';
import { removeAcademicTitles } from '@/lib/validators';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

function getMenuHref(role, menuId) {
  if (menuId === 'dashboard') return ROLE_DASHBOARD_ROUTE[role];
  if (menuId === 'profile') return '/dashboard/profile';
  if (menuId === 'settings') return '/dashboard/settings';
  const rolePrefix = ROLE_DASHBOARD_ROUTE[role];
  return `${rolePrefix}/${menuId}`;
}

function SidebarContent({ role, collapsed, onToggle, onItemClick }) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const menuItems = MENU_CONFIG[role] || [];
  const displayName = removeAcademicTitles(user?.nama || 'User');
  const roleLabel = ROLE_LABEL[role] || role;
  const initials = displayName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className="h-full p-3">
      <div className="h-full rounded-2xl border border-[hsl(var(--ctp-overlay0)/0.35)] bg-[hsl(var(--ctp-mantle)/0.6)] ctp-ring flex flex-col">
        {/* Brand */}
        <div className="flex items-center justify-between gap-2 px-3 py-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[hsl(var(--ctp-overlay0)/0.45)] bg-[hsl(var(--ctp-surface0)/0.65)]">
              <GraduationCap className="h-5 w-5 text-[hsl(var(--ctp-lavender))]" />
            </div>
            {!collapsed && (
              <div className="leading-tight min-w-0">
                <div className="text-sm font-semibold tracking-tight text-[hsl(var(--ctp-text))]">Kavana</div>
                <div className="text-xs text-[hsl(var(--ctp-subtext0))]">Bimbingan Online</div>
              </div>
            )}
          </div>
          {onToggle && (
            <button
              onClick={onToggle}
              className="ctp-focus rounded-xl border border-[hsl(var(--ctp-overlay0)/0.35)] bg-[hsl(var(--ctp-surface0)/0.35)] px-2 py-2 text-xs text-[hsl(var(--ctp-subtext0))] hover:bg-[hsl(var(--ctp-surface0)/0.55)]"
              aria-label="Toggle sidebar"
            >
              {collapsed ? '→' : '←'}
            </button>
          )}
        </div>

        {/* Quick Create */}
        <div className="px-3 pb-2">
          <Button
            className={cn(
              'w-full justify-center gap-2 rounded-2xl bg-[hsl(var(--ctp-mauve)/0.24)] text-[hsl(var(--ctp-text))] hover:bg-[hsl(var(--ctp-mauve)/0.32)] border border-[hsl(var(--ctp-mauve)/0.35)]',
              collapsed && 'px-0'
            )}
            variant="secondary"
          >
            <Plus className="h-4 w-4" />
            {!collapsed && 'Buat'}
          </Button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto px-2 py-2">
          <div className="px-2 pb-2 text-[11px] uppercase tracking-wider text-[hsl(var(--ctp-subtext0))]">
            {!collapsed ? 'Menu' : ''}
          </div>
          <div className="space-y-1">
            {menuItems.map((item) => {
              // Separator
              if (item.id.startsWith('separator')) {
                return (
                  <div key={item.id} className="pt-3 pb-1">
                    <div className="h-px bg-[hsl(var(--ctp-overlay0)/0.25)] mx-1 mb-2" />
                    {!collapsed && (
                      <div className="px-3 text-[11px] uppercase tracking-wider text-[hsl(var(--ctp-subtext0))]">
                        {item.label}
                      </div>
                    )}
                  </div>
                );
              }

              const href = getMenuHref(role, item.id);
              const isActive = pathname === href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.id}
                  href={href}
                  onClick={() => onItemClick?.()}
                  className={cn(
                    'ctp-focus group flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm transition-colors border',
                    isActive
                      ? 'bg-[hsl(var(--ctp-surface0)/0.70)] border-[hsl(var(--ctp-lavender)/0.35)]'
                      : 'bg-transparent border-transparent hover:bg-[hsl(var(--ctp-surface0)/0.40)]'
                  )}
                >
                  <span
                    className={cn(
                      'grid h-9 w-9 shrink-0 place-items-center rounded-xl border transition-colors',
                      isActive
                        ? 'border-[hsl(var(--ctp-lavender)/0.35)] bg-[hsl(var(--ctp-surface1)/0.55)]'
                        : 'border-[hsl(var(--ctp-overlay0)/0.25)] bg-[hsl(var(--ctp-surface0)/0.20)] group-hover:bg-[hsl(var(--ctp-surface0)/0.35)]'
                    )}
                  >
                    {Icon && <Icon className="h-4 w-4 text-[hsl(var(--ctp-subtext1))]" />}
                  </span>
                  {!collapsed && (
                    <span className="flex-1 text-left text-[hsl(var(--ctp-text))]">{item.label}</span>
                  )}
                  {!collapsed && isActive && (
                    <span className="text-[10px] rounded-full border border-[hsl(var(--ctp-lavender)/0.35)] bg-[hsl(var(--ctp-lavender)/0.12)] px-2 py-0.5 text-[hsl(var(--ctp-lavender))]">
                      Aktif
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="px-2 pb-3">
          <div className="my-3 h-px bg-[hsl(var(--ctp-overlay0)/0.25)]" />

          {/* User info */}
          <div className={cn('flex items-center gap-3 rounded-2xl px-3 py-2 mb-2', collapsed && 'justify-center')}>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[hsl(var(--ctp-lavender)/0.35)] border border-[hsl(var(--ctp-lavender)/0.45)] text-sm font-bold text-[hsl(var(--ctp-crust))]">
              {initials}
            </span>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[hsl(var(--ctp-text))] truncate">{displayName}</p>
                <p className="text-[10px] text-[hsl(var(--ctp-subtext0))]">{roleLabel}</p>
              </div>
            )}
          </div>

          <div className="space-y-1">
            {[
              { label: 'Support', icon: LifeBuoy, href: '#' },
              { label: 'Settings', icon: Settings, href: '/dashboard/settings' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="ctp-focus flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm text-[hsl(var(--ctp-subtext1))] hover:bg-[hsl(var(--ctp-surface0)/0.40)]"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[hsl(var(--ctp-overlay0)/0.25)] bg-[hsl(var(--ctp-surface0)/0.20)]">
                  <item.icon className="h-4 w-4" />
                </span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="ctp-focus flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm text-[hsl(var(--ctp-red))] hover:bg-[hsl(var(--ctp-red)/0.12)]"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[hsl(var(--ctp-overlay0)/0.25)] bg-[hsl(var(--ctp-surface0)/0.20)]">
                <LogOut className="h-4 w-4" />
              </span>
              {!collapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mobile Sidebar (Sheet)
export function MobileSidebar({ role }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden text-[hsl(var(--ctp-text))]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72 bg-[hsl(var(--ctp-base))] border-[hsl(var(--ctp-overlay0)/0.35)]">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <SidebarContent role={role} collapsed={false} onItemClick={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}

// Desktop Sidebar (collapsible)
export function DesktopSidebar({ role }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-shrink-0 h-screen sticky top-0 transition-all duration-200',
        collapsed ? 'w-[84px]' : 'w-[288px]'
      )}
    >
      <SidebarContent role={role} collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
    </aside>
  );
}
