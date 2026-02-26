import Link from 'next/link';
import { ArrowLeft, Clock3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ResourcePageShell({
  title,
  subtitle,
  updatedLabel,
  children,
}) {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Button
        asChild
        variant="outline"
        className="rounded-full border-[hsl(var(--ctp-surface1))] bg-[hsl(var(--ctp-crust)/0.7)] text-[hsl(var(--ctp-subtext1))] hover:text-[hsl(var(--ctp-blue))]"
      >
        <Link href="/#contact">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </Link>
      </Button>

      <header className="mt-6 rounded-3xl border border-[hsl(var(--ctp-surface1))] bg-[hsl(var(--ctp-crust)/0.78)] px-6 py-7 shadow-[0_20px_60px_-48px_hsl(var(--ctp-blue)/0.75)] md:px-8">
        <h1 className="text-3xl font-black tracking-tight text-[hsl(var(--ctp-text))] md:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[hsl(var(--ctp-subtext1))] md:text-base">
          {subtitle}
        </p>
        {updatedLabel ? (
          <Badge className="mt-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--ctp-surface1))] bg-[hsl(var(--ctp-surface0))] px-3 py-1 text-xs font-semibold text-[hsl(var(--ctp-subtext0))]">
            <Clock3 className="h-3.5 w-3.5" />
            Diperbarui: {updatedLabel}
          </Badge>
        ) : null}
      </header>

      <section className="mt-7 space-y-6 rounded-3xl border border-[hsl(var(--ctp-surface1))] bg-[hsl(var(--ctp-base)/0.82)] p-6 md:p-8">
        {children}
      </section>
    </main>
  );
}
