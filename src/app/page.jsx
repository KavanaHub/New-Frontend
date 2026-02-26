'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, CheckCircle, GraduationCap, Info, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CAMPUS_CONTACT, LANDING_CONTENT, SOCIAL_PROOF_CONFIG } from '@/lib/constants';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div id="top" className="min-h-screen bg-[hsl(var(--ctp-base))] text-[hsl(var(--ctp-text))]">
      <nav className="fixed w-full z-50 bg-[hsl(var(--ctp-base)/0.92)] backdrop-blur-md border-b border-[hsl(var(--ctp-surface1))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-9 h-9 bg-primary rounded-lg">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold font-serif text-[hsl(var(--ctp-text))] tracking-tight">{LANDING_CONTENT.brand.name}</span>
                <p className="text-xs text-[hsl(var(--ctp-subtext0))] -mt-1">{LANDING_CONTENT.brand.subtitle}</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {LANDING_CONTENT.nav.map((item) => (
                <a
                  key={item.label}
                  className="text-sm font-medium text-[hsl(var(--ctp-subtext1))] hover:text-primary transition-colors"
                  href={item.href}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link href="/login" className="hidden md:inline-flex text-sm font-semibold text-[hsl(var(--ctp-subtext1))] hover:text-primary transition-colors">
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
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[hsl(var(--ctp-base))] border-t border-[hsl(var(--ctp-surface1))] py-4 px-4 animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-4">
              {LANDING_CONTENT.nav.map((item) => (
                <a
                  key={item.label}
                  className="text-base font-medium text-[hsl(var(--ctp-subtext1))] hover:text-primary py-2"
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <hr className="border-[hsl(var(--ctp-surface1))]" />
              <Link href="/login" className="text-base font-semibold text-primary py-2">Masuk</Link>
              <Link href="/register">
                <Button className="w-full rounded-full">Daftar</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-[hsl(var(--ctp-sapphire))] to-[hsl(var(--ctp-crust))]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-slate-300/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center sm:px-6 lg:px-8 py-20">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 mb-6">
            <span className="w-2 h-2 bg-emerald-300 rounded-full" />
            <span className="text-primary-foreground font-semibold tracking-wider uppercase text-xs">
              {LANDING_CONTENT.hero.badge}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {LANDING_CONTENT.hero.title}
          </h1>

          <p className="mt-4 text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
            {LANDING_CONTENT.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={LANDING_CONTENT.hero.primaryCta.href}>
              <Button size="lg" variant="secondary" className="rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                {LANDING_CONTENT.hero.primaryCta.label}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href={LANDING_CONTENT.hero.secondaryCta.href}>
              <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-base font-semibold border-2 border-white text-white hover:bg-white hover:text-slate-900 bg-white/10 backdrop-blur-sm">
                {LANDING_CONTENT.hero.secondaryCta.label}
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-4 max-w-4xl mx-auto md:grid-cols-3">
            {LANDING_CONTENT.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-4 text-left">
                <div className="text-base md:text-lg font-semibold text-white">{stat.value}</div>
                <div className="text-sm text-white/85 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-[hsl(var(--ctp-base))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-semibold tracking-wider uppercase mb-2 text-sm">Tentang Platform</p>
            <h2 className="text-3xl font-bold text-[hsl(var(--ctp-text))] sm:text-4xl mb-4">{LANDING_CONTENT.about.title}</h2>
            <p className="text-lg text-[hsl(var(--ctp-subtext1))]">{LANDING_CONTENT.about.description}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/15 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[hsl(var(--ctp-lavender)/0.15)] rounded-full blur-xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[hsl(var(--ctp-surface1))] aspect-[4/3] bg-gradient-to-br from-primary/5 to-[hsl(var(--ctp-mantle))] flex items-center justify-center">
                <div className="text-center p-8">
                  <GraduationCap className="w-20 h-20 text-primary/50 mx-auto mb-4" />
                  <p className="text-slate-600 text-sm">Portal Bimbingan Program Studi</p>
                </div>
              </div>
            </div>

            <div className="bg-[hsl(var(--ctp-crust)/0.72)] p-8 md:p-10 rounded-2xl shadow-lg border border-[hsl(var(--ctp-surface1))] backdrop-blur-sm">
              <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-2 block">
                Ringkasan Manfaat
              </span>
              <h3 className="text-3xl font-bold text-[hsl(var(--ctp-text))] mb-6">Koordinasi Akademik Lebih Efisien</h3>
              <ul className="space-y-4">
                {LANDING_CONTENT.about.bullets.map((text) => (
                  <li key={text} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-[hsl(var(--ctp-subtext1))]">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-[hsl(var(--ctp-mantle))]" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-primary font-semibold tracking-wider uppercase mb-2 text-sm">Fitur Utama</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--ctp-text))] leading-tight">
              Dukungan untuk Alur Bimbingan Prodi
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {LANDING_CONTENT.features.map((feature) => (
              <div key={feature.num} className="group relative bg-[hsl(var(--ctp-crust)/0.78)] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[hsl(var(--ctp-surface1))] backdrop-blur-sm">
                <div className={`h-2 bg-gradient-to-r ${feature.color}`} />
                <div className="p-6 pt-5">
                  <div className="text-5xl font-bold text-slate-100 absolute top-8 right-4 pointer-events-none">
                    {feature.num}
                  </div>
                  <h3 className="text-xl font-bold text-[hsl(var(--ctp-text))] mb-2 relative z-10">{feature.title}</h3>
                  <p className="text-[hsl(var(--ctp-subtext1))] text-sm relative z-10">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-[hsl(var(--ctp-base))]" id="roles">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold tracking-wider uppercase mb-2 text-sm">Peran Pengguna</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--ctp-text))]">Satu Platform, Multi-Role</h2>
            <p className="text-lg text-[hsl(var(--ctp-subtext1))] mt-4 max-w-2xl mx-auto">
              Fitur ditata sesuai kebutuhan setiap peran dalam proses akademik.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {LANDING_CONTENT.roles.map((role) => (
              <div key={role.letter} className="bg-[hsl(var(--ctp-crust)/0.75)] p-6 rounded-2xl shadow-md border border-[hsl(var(--ctp-surface1))] hover:shadow-lg hover:-translate-y-1 transition-all backdrop-blur-sm">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${role.gradient} flex items-center justify-center text-white text-2xl font-bold mb-4`}>
                  {role.letter}
                </div>
                <h3 className="text-xl font-bold text-[hsl(var(--ctp-text))] mb-2">{role.title}</h3>
                <p className="text-[hsl(var(--ctp-subtext1))] text-sm">{role.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-gradient-to-br from-primary to-[hsl(var(--ctp-crust))]" id="how">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-white/90 font-semibold tracking-wider uppercase mb-2 text-sm">Alur Sistem</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Tahapan Proses Bimbingan</h2>
            <p className="text-lg text-white/90 mt-4 max-w-2xl mx-auto">
              Proses dirancang agar setiap tahap terdokumentasi dan mudah dipantau.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {LANDING_CONTENT.steps.map((step) => (
              <div key={step.num} className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 text-center hover:bg-white/15 transition-all">
                <div className="w-12 h-12 rounded-full bg-white text-primary font-bold text-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-white/90 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[hsl(var(--ctp-mantle))] py-20 md:py-24 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[hsl(var(--ctp-lavender)/0.15)] blur-3xl" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-br from-primary to-[hsl(var(--ctp-crust))] rounded-3xl shadow-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{LANDING_CONTENT.cta.title}</h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">{LANDING_CONTENT.cta.description}</p>
            <Link href={LANDING_CONTENT.cta.button.href}>
              <Button size="lg" variant="secondary" className="rounded-full px-8 py-6 text-base font-bold shadow-lg">
                {LANDING_CONTENT.cta.button.label}
              </Button>
            </Link>

            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-left">
              <div className="flex items-start gap-3 text-white/95">
                <Info className="w-4 h-4 mt-0.5 shrink-0" />
                <p className="text-sm">{SOCIAL_PROOF_CONFIG.notice}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-white pt-20 pb-10 border-t border-slate-800" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center justify-center w-9 h-9 bg-primary rounded-lg">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold">{LANDING_CONTENT.brand.name}</span>
              </div>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                Platform digital untuk mendukung proses bimbingan akademik di lingkungan program studi.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Platform</h4>
              <ul className="space-y-3 text-slate-300 text-sm">
                {LANDING_CONTENT.footer.platformLinks.map((link) => (
                  <li key={link.label}>
                    <Link className="hover:text-primary transition-colors" href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Sumber Daya</h4>
              <ul className="space-y-3 text-slate-300 text-sm">
                {LANDING_CONTENT.footer.resourceLinks.map((link) => (
                  <li key={link.label}>
                    <Link className="hover:text-primary transition-colors" href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Hubungi Kami</h4>
              <ul className="space-y-4 text-slate-300 text-sm">
                <li>{CAMPUS_CONTACT.address}</li>
                <li>{CAMPUS_CONTACT.phone}</li>
                <li>{CAMPUS_CONTACT.email}</li>
                <li>{CAMPUS_CONTACT.officeHours}</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-300 text-sm text-center md:text-left mb-4 md:mb-0">
              {LANDING_CONTENT.footer.copyright}
            </p>
            <div className="flex space-x-6 text-sm text-slate-300">
              <Link className="hover:text-white transition-colors" href="/login">Kebijakan Privasi</Link>
              <Link className="hover:text-white transition-colors" href="/login">Syarat Layanan</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
