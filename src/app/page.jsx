'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowRight,
  BookOpenText,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  Menu,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CAMPUS_CONTACT, LANDING_CONTENT, SOCIAL_PROOF_CONFIG } from '@/lib/constants';

const ROLE_ICONS = [GraduationCap, Users, ClipboardList, ShieldCheck];
const STEP_ICONS = [BookOpenText, Sparkles, ClipboardList, CalendarClock, CheckCircle2];
const EASE_OUT = [0.22, 1, 0.36, 1];

const STAGGER_PARENT = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: EASE_OUT },
  },
};

const REVEAL_ON_VIEW = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, amount: 0.18 },
  variants: STAGGER_PARENT,
};

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div id="top" className="relative min-h-screen overflow-x-clip bg-[hsl(var(--ctp-base))] text-[hsl(var(--ctp-text))]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(62%_55%_at_8%_0%,hsl(var(--ctp-sky)/0.18),transparent_56%),radial-gradient(48%_50%_at_94%_8%,hsl(var(--ctp-blue)/0.12),transparent_55%),radial-gradient(58%_58%_at_50%_100%,hsl(var(--ctp-teal)/0.12),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--ctp-surface1)/0.35)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--ctp-surface1)/0.35)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_58%,transparent_88%)]" />
      <motion.div
        className="pointer-events-none absolute -left-28 top-28 h-72 w-72 rounded-full bg-[hsl(var(--ctp-blue)/0.22)] blur-3xl"
        animate={{ x: [0, 16, 0], y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, ease: 'easeInOut', repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute -right-24 bottom-16 h-64 w-64 rounded-full bg-[hsl(var(--ctp-teal)/0.24)] blur-3xl"
        animate={{ x: [0, -14, 0], y: [0, 14, 0], opacity: [0.25, 0.48, 0.25] }}
        transition={{ duration: 13, ease: 'easeInOut', repeat: Infinity, delay: 0.35 }}
      />

      <header className="sticky top-0 z-50 border-b border-[hsl(var(--ctp-surface1)/0.85)] bg-[hsl(var(--ctp-base)/0.9)] backdrop-blur-md">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Kavana Home">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[hsl(var(--ctp-blue))] text-white shadow-sm">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-2xl font-black leading-none tracking-tight">{LANDING_CONTENT.brand.name}</span>
              <span className="block text-xs text-[hsl(var(--ctp-subtext0))]">{LANDING_CONTENT.brand.subtitle}</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Navigasi utama">
            {LANDING_CONTENT.nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-semibold text-[hsl(var(--ctp-subtext1))] transition-colors hover:text-[hsl(var(--ctp-blue))]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden text-sm font-semibold text-[hsl(var(--ctp-subtext1))] transition-colors hover:text-[hsl(var(--ctp-blue))] md:inline-flex"
            >
              Masuk
            </Link>
            <Link href="/register">
              <Button className="rounded-full px-6 shadow-sm">Daftar</Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
            className="border-t border-[hsl(var(--ctp-surface1)/0.85)] bg-[hsl(var(--ctp-base))] px-4 py-4 md:hidden"
            aria-label="Navigasi mobile"
          >
            <div className="flex flex-col gap-3">
              {LANDING_CONTENT.nav.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-xl px-3 py-2 text-sm font-semibold text-[hsl(var(--ctp-subtext1))] transition-colors hover:bg-[hsl(var(--ctp-surface0)/0.7)] hover:text-[hsl(var(--ctp-blue))]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Link href="/login" className="rounded-xl px-3 py-2 text-sm font-semibold text-[hsl(var(--ctp-blue))]">
                Masuk
              </Link>
            </div>
          </motion.nav>
        )}
      </header>

      <main className="relative z-10">
        <motion.section
          initial="hidden"
          animate="show"
          variants={STAGGER_PARENT}
          className="mx-auto w-full max-w-7xl px-4 pb-16 pt-16 sm:px-6 lg:px-8 lg:pb-24 lg:pt-24"
        >
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <motion.div variants={STAGGER_PARENT} className="lg:col-span-7">
              <motion.span variants={FADE_UP} className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--ctp-blue)/0.35)] bg-[hsl(var(--ctp-blue)/0.1)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[hsl(var(--ctp-blue))]">
                <Sparkles className="h-3.5 w-3.5" /> {LANDING_CONTENT.hero.badge}
              </motion.span>
              <motion.h1 variants={FADE_UP} className="mt-5 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                {LANDING_CONTENT.hero.title}
              </motion.h1>
              <motion.p variants={FADE_UP} className="mt-6 max-w-2xl text-base leading-relaxed text-[hsl(var(--ctp-subtext1))] sm:text-lg">
                {LANDING_CONTENT.hero.description}
              </motion.p>

              <motion.div variants={FADE_UP} className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href={LANDING_CONTENT.hero.primaryCta.href}>
                  <Button size="lg" className="w-full rounded-full px-8 sm:w-auto">
                    {LANDING_CONTENT.hero.primaryCta.label}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href={LANDING_CONTENT.hero.secondaryCta.href}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full rounded-full border-[hsl(var(--ctp-overlay0)/0.6)] bg-[hsl(var(--ctp-base)/0.75)] px-8 text-[hsl(var(--ctp-text))] sm:w-auto"
                  >
                    {LANDING_CONTENT.hero.secondaryCta.label}
                  </Button>
                </Link>
              </motion.div>

              <motion.div variants={STAGGER_PARENT} className="mt-10 grid gap-3 sm:grid-cols-3">
                {LANDING_CONTENT.stats.map((stat) => (
                  <motion.article
                    key={stat.label}
                    variants={FADE_UP}
                    whileHover={{ y: -4, transition: { duration: 0.22 } }}
                    className="rounded-2xl border border-[hsl(var(--ctp-surface1))] bg-[hsl(var(--ctp-crust)/0.7)] p-4 shadow-[0_10px_32px_-28px_hsl(var(--ctp-blue)/0.65)]"
                  >
                    <p className="text-sm font-bold text-[hsl(var(--ctp-text))]">{stat.value}</p>
                    <p className="mt-1 text-xs leading-relaxed text-[hsl(var(--ctp-subtext0))]">{stat.label}</p>
                  </motion.article>
                ))}
              </motion.div>
            </motion.div>

            <motion.aside variants={FADE_UP} className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl border border-[hsl(var(--ctp-surface1))] bg-[hsl(var(--ctp-crust)/0.75)] shadow-[0_20px_60px_-38px_hsl(var(--ctp-blue)/0.65)]">
                <div className="border-b border-[hsl(var(--ctp-surface1))] bg-[hsl(var(--ctp-base)/0.55)] px-6 py-5">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[hsl(var(--ctp-subtext0))]">Snapshot Akademik</p>
                  <h2 className="mt-1 text-xl font-bold">Panel Aktivitas Prodi</h2>
                </div>
                <motion.div variants={STAGGER_PARENT} className="space-y-4 p-6">
                  {LANDING_CONTENT.steps.slice(0, 4).map((step) => {
                    const Icon = STEP_ICONS[step.num - 1] || CheckCircle2;
                    return (
                      <motion.div
                        key={step.num}
                        variants={FADE_UP}
                        whileHover={{ x: 4, transition: { duration: 0.2 } }}
                        className="flex items-start gap-3 rounded-2xl border border-[hsl(var(--ctp-surface1))] bg-[hsl(var(--ctp-base)/0.68)] p-3"
                      >
                        <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[hsl(var(--ctp-blue)/0.14)] text-[hsl(var(--ctp-blue))]">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-[hsl(var(--ctp-text))]">
                            Tahap {step.num}: {step.title}
                          </p>
                          <p className="mt-0.5 text-xs leading-relaxed text-[hsl(var(--ctp-subtext0))]">{step.desc}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </motion.aside>
          </div>
        </motion.section>

        <motion.section {...REVEAL_ON_VIEW} id="features" className="border-y border-[hsl(var(--ctp-surface1))] bg-[hsl(var(--ctp-mantle)/0.55)] py-16 md:py-20">
          <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
            <motion.div variants={FADE_UP} className="lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-[0.13em] text-[hsl(var(--ctp-blue))]">Tentang Platform</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{LANDING_CONTENT.about.title}</h2>
              <p className="mt-5 text-sm leading-relaxed text-[hsl(var(--ctp-subtext1))] sm:text-base">{LANDING_CONTENT.about.description}</p>
              <ul className="mt-6 space-y-3">
                {LANDING_CONTENT.about.bullets.map((text) => (
                  <li key={text} className="flex items-start gap-2 text-sm text-[hsl(var(--ctp-subtext1))]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-[hsl(var(--ctp-blue))]" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={STAGGER_PARENT} className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {LANDING_CONTENT.features.map((feature) => (
                <motion.article
                  key={feature.num}
                  variants={FADE_UP}
                  whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.22 } }}
                  className="group relative overflow-hidden rounded-2xl border border-[hsl(var(--ctp-surface1))] bg-[hsl(var(--ctp-base)/0.7)] p-5"
                >
                  <div className={`absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r ${feature.color}`} />
                  <span className="text-5xl font-black text-[hsl(var(--ctp-surface1))]">{feature.num}</span>
                  <h3 className="mt-2 text-lg font-bold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--ctp-subtext1))]">{feature.desc}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section {...REVEAL_ON_VIEW} id="roles" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <motion.div variants={FADE_UP} className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.13em] text-[hsl(var(--ctp-blue))]">Peran Pengguna</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Satu Ekosistem, Kewenangan Jelas</h2>
            <p className="mt-4 text-sm leading-relaxed text-[hsl(var(--ctp-subtext1))] sm:text-base">
              Antarmuka dan data ditampilkan sesuai peran agar keputusan akademik lebih akurat dan koordinasi lebih cepat.
            </p>
          </motion.div>

          <motion.div variants={STAGGER_PARENT} className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {LANDING_CONTENT.roles.map((role, index) => {
              const Icon = ROLE_ICONS[index] || Users;
              return (
                <motion.article
                  key={role.letter}
                  variants={FADE_UP}
                  whileHover={{ y: -6, transition: { duration: 0.22 } }}
                  className="rounded-2xl border border-[hsl(var(--ctp-surface1))] bg-[hsl(var(--ctp-crust)/0.72)] p-5"
                >
                  <span className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${role.gradient} text-white`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{role.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--ctp-subtext1))]">{role.desc}</p>
                </motion.article>
              );
            })}
          </motion.div>
        </motion.section>

        <motion.section {...REVEAL_ON_VIEW} id="how" className="bg-[hsl(var(--ctp-mantle)/0.55)] py-16 md:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div variants={FADE_UP} className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.13em] text-[hsl(var(--ctp-blue))]">Alur Sistem</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Tahapan Operasional yang Terdokumentasi</h2>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-[hsl(var(--ctp-subtext1))]">
                Setiap tahap meninggalkan jejak data yang bisa diverifikasi, dari pendaftaran hingga finalisasi.
              </p>
            </motion.div>

            <motion.div variants={STAGGER_PARENT} className="mt-10 grid gap-4 md:grid-cols-5">
              {LANDING_CONTENT.steps.map((step, index) => {
                const Icon = STEP_ICONS[index] || CheckCircle2;
                return (
                  <motion.article
                    key={step.num}
                    variants={FADE_UP}
                    whileHover={{ y: -5, transition: { duration: 0.22 } }}
                    className="relative rounded-2xl border border-[hsl(var(--ctp-surface1))] bg-[hsl(var(--ctp-base)/0.72)] p-5"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[hsl(var(--ctp-blue)/0.12)] text-[hsl(var(--ctp-blue))]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <h3 className="mt-3 text-base font-bold">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[hsl(var(--ctp-subtext1))]">{step.desc}</p>
                    <span className="mt-3 inline-block rounded-full bg-[hsl(var(--ctp-surface0))] px-2.5 py-1 text-xs font-semibold text-[hsl(var(--ctp-subtext0))]">
                      Tahap {step.num}
                    </span>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </motion.section>

        <motion.section {...REVEAL_ON_VIEW} className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <motion.div
            variants={FADE_UP}
            whileHover={{ scale: 1.01, transition: { duration: 0.25 } }}
            className="rounded-3xl border border-[hsl(var(--ctp-surface1))] bg-[linear-gradient(140deg,hsl(var(--ctp-blue)/0.95),hsl(var(--ctp-sapphire)/0.94))] px-6 py-10 text-white shadow-[0_24px_80px_-40px_hsl(var(--ctp-blue)/0.9)] md:px-10 md:py-12"
          >
            <div className="grid items-center gap-6 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{LANDING_CONTENT.cta.title}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
                  {LANDING_CONTENT.cta.description}
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <Link href={LANDING_CONTENT.cta.button.href}>
                  <Button size="lg" variant="secondary" className="w-full rounded-full px-8 font-bold lg:w-auto">
                    {LANDING_CONTENT.cta.button.label}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-white/25 bg-white/10 px-4 py-3 text-sm text-white/95">
              {SOCIAL_PROOF_CONFIG.notice}
            </div>
          </motion.div>
        </motion.section>
      </main>

      <motion.footer {...REVEAL_ON_VIEW} id="contact" className="border-t border-[hsl(var(--ctp-surface1))] bg-[hsl(var(--ctp-crust)/0.68)]">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <motion.div variants={FADE_UP}>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[hsl(var(--ctp-blue))] text-white">
                <GraduationCap className="h-4.5 w-4.5" />
              </span>
              <span className="text-2xl font-black tracking-tight">{LANDING_CONTENT.brand.name}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[hsl(var(--ctp-subtext1))]">
              Platform digital untuk proses bimbingan akademik yang lebih terukur, terdokumentasi, dan akuntabel.
            </p>
          </motion.div>

          <motion.div variants={FADE_UP}>
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-[hsl(var(--ctp-subtext0))]">Platform</h3>
            <ul className="mt-4 space-y-2 text-sm text-[hsl(var(--ctp-subtext1))]">
              {LANDING_CONTENT.footer.platformLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition-colors hover:text-[hsl(var(--ctp-blue))]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={FADE_UP}>
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-[hsl(var(--ctp-subtext0))]">Sumber Daya</h3>
            <ul className="mt-4 space-y-2 text-sm text-[hsl(var(--ctp-subtext1))]">
              {LANDING_CONTENT.footer.resourceLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition-colors hover:text-[hsl(var(--ctp-blue))]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={FADE_UP}>
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-[hsl(var(--ctp-subtext0))]">Kontak</h3>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[hsl(var(--ctp-subtext1))]">
              <li>{CAMPUS_CONTACT.address}</li>
              <li>{CAMPUS_CONTACT.phone}</li>
              <li>{CAMPUS_CONTACT.email}</li>
              <li>{CAMPUS_CONTACT.officeHours}</li>
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-[hsl(var(--ctp-surface1))] px-4 py-5 text-center text-sm text-[hsl(var(--ctp-subtext0))]">
          {LANDING_CONTENT.footer.copyright}
        </div>
      </motion.footer>
    </div>
  );
}
