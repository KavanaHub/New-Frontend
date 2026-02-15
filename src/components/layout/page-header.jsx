import { cn } from '@/lib/utils';

export function PageHeader({ title, subtitle, children, className }) {
  return (
    <header className={cn('flex flex-col sm:flex-row sm:flex-wrap justify-between items-start sm:items-end gap-4 mb-6 lg:mb-8', className)}>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm sm:text-base text-slate-500">{subtitle}</p>
        )}
      </div>
      {children && (
        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
          {children}
        </div>
      )}
    </header>
  );
}
