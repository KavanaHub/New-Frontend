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
      <div className="h-full rounded-2xl border border-[hsl(var(--ctp-surface1))] bg-[hsl(var(--ctp-crust))] flex flex-col shadow-lg">
        {/* Brand */}
        <div className={cn("flex items-center gap-2 px-3 py-3", collapsed ? "justify-center" : "justify-between")}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[hsl(var(--ctp-lavender)/0.25)] to-[hsl(var(--ctp-mauve)/0.20)] border border-[hsl(var(--ctp-lavender)/0.30)]">
              <GraduationCap className="h-5 w-5 text-[hsl(var(--ctp-lavender))]" />
            </div>
            {!collapsed && (
              <div className="leading-tight min-w-0">
                <div className="text-sm font-bold tracking-tight text-[hsl(var(--ctp-text))]">Kavana</div>
                <div className="text-[11px] text-[hsl(var(--ctp-subtext0))]">Bimbingan Online</div>
              </div>
            )}
          </div>
          {onToggle && !collapsed && (
            <button
              onClick={onToggle}
              className="ctp-focus rounded-lg p-1.5 text-[hsl(var(--ctp-subtext0))] hover:bg-[hsl(var(--ctp-surface0))] hover:text-[hsl(var(--ctp-text))] transition-colors"
              aria-label="Collapse sidebar"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
            </button>
          )}
          {onToggle && collapsed && (
            <button
              onClick={onToggle}
              className="absolute -right-3 top-6 ctp-focus grid h-6 w-6 place-items-center rounded-full border border-[hsl(var(--ctp-surface1))] bg-[hsl(var(--ctp-crust))] text-[hsl(var(--ctp-subtext0))] hover:bg-[hsl(var(--ctp-surface0))] hover:text-[hsl(var(--ctp-text))] shadow-md transition-colors z-10"
              aria-label="Expand sidebar"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
            </button>
          )}
        </div>

        {/* Quick Create */}
        {!collapsed && (
          <div className="px-3 pb-2">
            <Button
              className="w-full justify-center gap-2 rounded-xl bg-gradient-to-r from-[hsl(var(--ctp-lavender)/0.20)] to-[hsl(var(--ctp-mauve)/0.15)] text-[hsl(var(--ctp-text))] hover:from-[hsl(var(--ctp-lavender)/0.30)] hover:to-[hsl(var(--ctp-mauve)/0.25)] border border-[hsl(var(--ctp-lavender)/0.25)]"
              variant="secondary"
            >
              <Plus className="h-4 w-4" />
              Buat Baru
            </Button>
          </div>
        )}

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto px-2 py-1">
          {!collapsed && (
            <div className="px-3 pb-1.5 pt-1 text-[10px] font-medium uppercase tracking-widest text-[hsl(var(--ctp-overlay1))]">
              Menu
            </div>
          )}
          <div className={cn("space-y-0.5", collapsed && "flex flex-col items-center")}>
            {menuItems.map((item) => {
              // Separator
              if (item.id.startsWith('separator')) {
                if (collapsed) {
                  return <div key={item.id} className="w-6 h-px bg-[hsl(var(--ctp-surface1))] my-2" />;
                }
                return (
                  <div key={item.id} className="pt-3 pb-1">
                    <div className="h-px bg-[hsl(var(--ctp-surface1))] mx-2 mb-2" />
                    <div className="px-3 text-[10px] font-medium uppercase tracking-widest text-[hsl(var(--ctp-overlay1))]">
                      {item.label}
                    </div>
                  </div>
                );
              }

              const href = getMenuHref(role, item.id);
              const isActive = pathname === href;
              const Icon = item.icon;

              /* ---- COLLAPSED ---- */
              if (collapsed) {
                return (
                  <Link
                    key={item.id}
                    href={href}
                    onClick={() => onItemClick?.()}
                    title={item.label}
                    className={cn(
                      'ctp-focus grid h-10 w-10 place-items-center rounded-xl transition-colors',
                      isActive
                        ? 'bg-[hsl(var(--ctp-surface0))] text-[hsl(var(--ctp-lavender))] shadow-sm'
                        : 'text-[hsl(var(--ctp-subtext0))] hover:bg-[hsl(var(--ctp-surface0)/0.60)] hover:text-[hsl(var(--ctp-subtext1))]'
                    )}
                  >
                    {Icon && <Icon className="h-[18px] w-[18px]" />}
                  </Link>
                );
              }

              /* ---- EXPANDED ---- */
              return (
                <Link
                  key={item.id}
                  href={href}
                  onClick={() => onItemClick?.()}
                  className={cn(
                    'ctp-focus group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors',
                    isActive
                      ? 'bg-[hsl(var(--ctp-surface0))] text-[hsl(var(--ctp-text))] font-medium shadow-sm'
                      : 'text-[hsl(var(--ctp-subtext1))] hover:bg-[hsl(var(--ctp-surface0)/0.60)] hover:text-[hsl(var(--ctp-text))]'
                  )}
                >
                  {Icon && (
                    <Icon className={cn(
                      "h-[18px] w-[18px] shrink-0",
                      isActive ? "text-[hsl(var(--ctp-lavender))]" : "text-[hsl(var(--ctp-overlay1))] group-hover:text-[hsl(var(--ctp-subtext1))]"
                    )} />
                  )}
                  <span className="flex-1 text-left">{item.label}</span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--ctp-lavender))]" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="px-2 pb-3">
          <div className="mx-2 my-2 h-px bg-[hsl(var(--ctp-surface1))]" />

          {/* User info */}
          <div className={cn('flex items-center gap-3 rounded-xl px-3 py-2 mb-1', collapsed && 'justify-center px-0')}>
            <span className={cn(
              "grid shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[hsl(var(--ctp-lavender)/0.25)] to-[hsl(var(--ctp-mauve)/0.20)] border border-[hsl(var(--ctp-lavender)/0.30)] text-sm font-bold text-[hsl(var(--ctp-text))]",
              collapsed ? "h-10 w-10" : "h-9 w-9"
            )}>
              {initials}
            </span>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[hsl(var(--ctp-text))] truncate">{displayName}</p>
                <p className="text-[10px] text-[hsl(var(--ctp-overlay1))]">{roleLabel}</p>
              </div>
            )}
          </div>

          <div className={cn("space-y-0.5", collapsed && "flex flex-col items-center")}>
            {[
              { label: 'Support', icon: LifeBuoy, href: '#' },
              { label: 'Settings', icon: Settings, href: '/dashboard/settings' },
            ].map((item) =>
              collapsed ? (
                <Link
                  key={item.label}
                  href={item.href}
                  title={item.label}
                  className="ctp-focus grid h-10 w-10 place-items-center rounded-xl text-[hsl(var(--ctp-subtext0))] hover:bg-[hsl(var(--ctp-surface0)/0.60)] hover:text-[hsl(var(--ctp-subtext1))] transition-colors"
                >
                  <item.icon className="h-[18px] w-[18px]" />
                </Link>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="ctp-focus flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-[hsl(var(--ctp-subtext0))] hover:bg-[hsl(var(--ctp-surface0)/0.60)] hover:text-[hsl(var(--ctp-text))] transition-colors"
                >
                  <item.icon className="h-[18px] w-[18px] text-[hsl(var(--ctp-overlay1))]" />
                  <span>{item.label}</span>
                </Link>
              )
            )}
            {collapsed ? (
              <button
                onClick={handleLogout}
                title="Logout"
                className="ctp-focus grid h-10 w-10 place-items-center rounded-xl text-[hsl(var(--ctp-red))] hover:bg-[hsl(var(--ctp-red)/0.10)] transition-colors"
              >
                <LogOut className="h-[18px] w-[18px]" />
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="ctp-focus flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-[hsl(var(--ctp-red))] hover:bg-[hsl(var(--ctp-red)/0.10)] transition-colors"
              >
                <LogOut className="h-[18px] w-[18px]" />
                <span>Logout</span>
              </button>
            )}
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
      <SheetContent side="left" className="p-0 w-72 bg-[hsl(var(--ctp-base))] border-[hsl(var(--ctp-surface1))]">
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
        'hidden lg:flex flex-shrink-0 h-screen sticky top-0 transition-all duration-200 relative',
        collapsed ? 'w-[76px]' : 'w-[272px]'
      )}
    >
      <SidebarContent role={role} collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
    </aside>
  );
}
