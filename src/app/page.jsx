'use client';

import Link from 'next/link';
import Image from 'next/image';
import { GraduationCap, ArrowRight, Menu, X, CheckCircle, Star } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-9 h-9 bg-primary rounded-lg">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-slate-900 tracking-tight">Kavana</span>
                <p className="text-xs text-slate-500 -mt-1">Bimbingan Online</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <a className="text-sm font-medium text-slate-600 hover:text-primary transition-colors" href="#">Beranda</a>
              <a className="text-sm font-medium text-slate-600 hover:text-primary transition-colors" href="#features">Fitur</a>
              <a className="text-sm font-medium text-slate-600 hover:text-primary transition-colors" href="#roles">Pengguna</a>
              <a className="text-sm font-medium text-slate-600 hover:text-primary transition-colors" href="#how">Cara Kerja</a>
              <a className="text-sm font-medium text-slate-600 hover:text-primary transition-colors" href="#contact">Kontak</a>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4">
              <Link href="/login" className="hidden md:inline-flex text-sm font-semibold text-slate-600 hover:text-primary transition-colors">
                Masuk
              </Link>
              <Link href="/register">
                <Button className="rounded-full px-6 shadow-sm">Daftar Sekarang</Button>
              </Link>
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 py-4 px-4 animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-4">
              <a className="text-base font-medium text-slate-600 hover:text-primary py-2" href="#features">Fitur</a>
              <a className="text-base font-medium text-slate-600 hover:text-primary py-2" href="#roles">Pengguna</a>
              <a className="text-base font-medium text-slate-600 hover:text-primary py-2" href="#how">Cara Kerja</a>
              <a className="text-base font-medium text-slate-600 hover:text-primary py-2" href="#contact">Kontak</a>
              <hr className="border-slate-200" />
              <Link href="/login" className="text-base font-semibold text-primary py-2">Masuk</Link>
              <Link href="/register">
                <Button className="w-full rounded-full">Daftar Sekarang</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-indigo-700" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center sm:px-6 lg:px-8 py-20">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-primary-foreground font-semibold tracking-wider uppercase text-xs">
              Sistem Bimbingan Proyek & Internship
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Kelola Bimbingan
            <br className="hidden sm:block" />
            Akademik Dengan Mudah
          </h1>

          <p className="mt-4 text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            Platform terintegrasi untuk mahasiswa, dosen pembimbing, dan koordinator.
            Pantau progress, kelola dokumen, dan jadwalkan bimbingan dalam satu tempat.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                Mulai Sekarang
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-base font-semibold border-2 border-white text-white hover:bg-white hover:text-slate-900 bg-white/10 backdrop-blur-sm">
              Lihat Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { value: '500+', label: 'Mahasiswa Aktif' },
              { value: '50+', label: 'Dosen Pembimbing' },
              { value: '1000+', label: 'Sesi Bimbingan' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/60 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Kavana */}
      <section className="py-20 md:py-24 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-semibold tracking-wider uppercase mb-2 text-sm">Tentang Platform</p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">Mengapa Memilih Kavana?</h2>
            <p className="text-lg text-slate-600">
              Kami menjembatani komunikasi antara mahasiswa dan dosen pembimbing, membuat administrasi
              akademik menjadi lebih efisien, transparan, dan dapat diakses dari mana saja.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-violet-500/20 rounded-full blur-xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100 aspect-[4/3] bg-gradient-to-br from-primary/5 to-violet-50 flex items-center justify-center">
                <div className="text-center p-8">
                  <GraduationCap className="w-20 h-20 text-primary/30 mx-auto mb-4" />
                  <p className="text-slate-400 text-sm">Platform Preview</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-slate-100">
              <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-2 block">
                Platform Overview
              </span>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">Bimbingan Akademik Terintegrasi</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Kavana menyediakan hub terpusat untuk manajemen proyek dan internship. Baik
                Anda mahasiswa yang melacak milestone atau dosen yang mereview draft, interface
                intuitif kami menyederhanakan kompleksitas koordinasi akademik.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Tracking progress real-time untuk mahasiswa dan pembimbing',
                  'Pengajuan dokumen digital dengan feedback langsung',
                  'Penjadwalan otomatis untuk sesi bimbingan',
                ].map((text) => (
                  <li key={text} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{text}</span>
                  </li>
                ))}
              </ul>
              <a className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors group" href="#features">
                Pelajari lebih lanjut
                <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-24 bg-slate-50" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-primary font-semibold tracking-wider uppercase mb-2 text-sm">Fitur Unggulan</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              Mendukung Setiap Peran dalam<br className="hidden md:block" /> Ekosistem Akademik
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Manajemen Proposal', desc: 'Upload proposal secara digital. Dapatkan notifikasi status dan feedback langsung dari koordinator.', color: 'from-primary to-indigo-600' },
              { num: '02', title: 'Bimbingan Online', desc: 'Dashboard khusus untuk dosen mereview, memberikan komentar, dan approve pekerjaan mahasiswa.', color: 'from-emerald-500 to-teal-600' },
              { num: '03', title: 'Koordinasi Terpusat', desc: 'Koordinator dapat memantau progress seluruh mahasiswa dan mengelola resource dengan efisien.', color: 'from-amber-500 to-orange-600' },
              { num: '04', title: 'Penjadwalan Cerdas', desc: 'Sistem kalender terintegrasi untuk booking slot konsultasi tanpa bentrok jadwal.', color: 'from-violet-500 to-purple-600' },
            ].map((feature) => (
              <div key={feature.num} className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100">
                <div className={`h-2 bg-gradient-to-r ${feature.color}`} />
                <div className="p-6 pt-5">
                  <div className="text-5xl font-bold text-slate-100 absolute top-8 right-4 pointer-events-none">
                    {feature.num}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 relative z-10">{feature.title}</h3>
                  <p className="text-slate-600 text-sm relative z-10">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-20 md:py-24 bg-white" id="roles">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold tracking-wider uppercase mb-2 text-sm">Multi-Role</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Untuk Semua Pengguna</h2>
            <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
              Setiap pengguna memiliki dashboard dan fitur yang disesuaikan dengan perannya
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { letter: 'M', title: 'Mahasiswa', desc: 'Upload proposal, pilih pembimbing, catat bimbingan, dan ajukan sidang.', gradient: 'from-primary to-indigo-600' },
              { letter: 'D', title: 'Dosen Pembimbing', desc: 'Approve bimbingan, review laporan, dan berikan nilai sidang.', gradient: 'from-emerald-500 to-teal-600' },
              { letter: 'K', title: 'Koordinator', desc: 'Validasi proposal, approve pembimbing, dan jadwalkan sidang.', gradient: 'from-cyan-500 to-blue-600' },
              { letter: 'P', title: 'Kaprodi', desc: 'Pilih koordinator, monitoring mahasiswa, dan kelola daftar dosen.', gradient: 'from-violet-500 to-purple-600' },
            ].map((role) => (
              <div key={role.letter} className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${role.gradient} flex items-center justify-center text-white text-2xl font-bold mb-4`}>
                  {role.letter}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{role.title}</h3>
                <p className="text-slate-600 text-sm">{role.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-primary to-indigo-700" id="how">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-white/80 font-semibold tracking-wider uppercase mb-2 text-sm">Alur Sistem</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Cara Kerja Kavana</h2>
            <p className="text-lg text-white/80 mt-4 max-w-2xl mx-auto">
              Proses bimbingan yang terstruktur dari awal hingga kelulusan
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              { num: 1, title: 'Registrasi', desc: 'Daftar akun dengan data lengkap' },
              { num: 2, title: 'Pilih Track', desc: 'Proyek 1/2/3 atau Internship 1/2' },
              { num: 3, title: 'Upload Proposal', desc: 'Ajukan judul dan pembimbing' },
              { num: 4, title: 'Bimbingan', desc: 'Lakukan 8x sesi bimbingan' },
              { num: 5, title: 'Sidang', desc: 'Presentasi dan dapatkan nilai' },
            ].map((step) => (
              <div key={step.num} className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 text-center hover:bg-white/15 transition-all">
                <div className="w-12 h-12 rounded-full bg-white text-primary font-bold text-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-white/70 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-slate-50 py-20 md:py-24 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-br from-primary to-indigo-700 rounded-3xl shadow-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Siap Memulai Bimbingan Online?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Bergabung dengan ratusan mahasiswa yang sudah menggunakan Kavana untuk
              mengelola bimbingan akademik mereka.
            </p>
            <Link href="/register">
              <Button size="lg" variant="secondary" className="rounded-full px-8 py-6 text-base font-bold shadow-lg">
                Daftar Sekarang - Gratis!
              </Button>
            </Link>

            {/* Testimonial */}
            <div className="mt-10 bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-xl mx-auto border border-white/20">
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                  AG
                </div>
                <div className="text-left">
                  <p className="text-sm text-white font-semibold">&quot;Kavana menghemat banyak waktu administrasi saya.&quot;</p>
                  <p className="text-xs text-white/70 mt-1">Dr. Alan Grant, Kepala Prodi</p>
                </div>
                <div className="hidden sm:flex items-center px-3 py-1 rounded-full bg-white/20 text-xs font-bold text-white">
                  <Star className="w-3 h-3 text-yellow-400 mr-1 fill-yellow-400" /> 4.9/5
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-20 pb-10 border-t border-slate-800" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center justify-center w-9 h-9 bg-primary rounded-lg">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold">Kavana</span>
              </div>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Transformasi pengalaman bimbingan akademik melalui inovasi dan konektivitas.
              </p>
            </div>

            {/* Platform */}
            <div>
              <h4 className="text-lg font-bold mb-6">Platform</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li><a className="hover:text-primary transition-colors" href="#">Portal Mahasiswa</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Dashboard Dosen</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Panel Koordinator</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Panel Kaprodi</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-lg font-bold mb-6">Sumber Daya</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li><a className="hover:text-primary transition-colors" href="#">Pusat Bantuan</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Panduan Proyek</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Forum Komunitas</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">FAQ</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-bold mb-6">Hubungi Kami</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li>Jl. Sariasih No.54, Sarijadi, Kec. Sukasari, Kota Bandung, Jawa Barat 40151</li>
                <li>+62 851 7993 5117</li>
                <li>support@kavana.my.id</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 text-sm text-center md:text-left mb-4 md:mb-0">
              © 2025 Kavana Bimbingan Online. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-slate-500">
              <a className="hover:text-white transition-colors" href="#">Kebijakan Privasi</a>
              <a className="hover:text-white transition-colors" href="#">Syarat & Ketentuan</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
