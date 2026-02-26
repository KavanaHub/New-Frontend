'use client';

import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function DashboardDialog({
  open,
  onOpenChange,
  className,
  title = 'Dialog',
  description,
  children,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          'w-full max-w-md rounded-2xl border border-[hsl(var(--ctp-overlay0)/0.45)] bg-[hsl(var(--ctp-base))] p-6',
          className
        )}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          {description ? <DialogDescription>{description}</DialogDescription> : null}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
