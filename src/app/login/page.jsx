'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GraduationCap, Eye, EyeOff, ArrowLeft, LogIn, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authAPI } from '@/lib/api';
import { useAuthStore } from '@/store/auth-store';
import { validateEmail, validateNPM } from '@/lib/validators';
import { ROLE_DASHBOARD_ROUTE } from '@/lib/constants';

export default function LoginPage() {
  const router = useRouter();
  const { login: storeLogin, setUser } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ identifier: '', password: '' });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const errs = {};
    const { identifier, password } = formData;

    if (!identifier.trim()) {
      errs.identifier = 'Email atau NPM wajib diisi';
    } else if (!validateEmail(identifier.trim()) && !validateNPM(identifier.trim())) {
      errs.identifier = 'Masukkan email yang valid atau NPM (angka)';
    }

    if (!password) {
      errs.password = 'Password wajib diisi';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const result = await authAPI.login(formData.identifier.trim(), formData.password);

      if (result.ok) {
        storeLogin(result.data.token, result.data.role, result.data.user_id);
        setUser({ nama: result.data.nama, email: result.data.email });

        toast.success('Login berhasil! Mengalihkan...');

        const role = result.data.role || 'mahasiswa';
        const dashboardUrl = ROLE_DASHBOARD_ROUTE[role] || ROLE_DASHBOARD_ROUTE.mahasiswa;

        setTimeout(() => {
          router.push(dashboardUrl);
        }, 500);
      } else {
        if (result.status === 401) {
          setErrors({ password: 'Email/NPM atau password salah' });
          toast.error('Email/NPM atau password salah');
        } else if (result.status === 404) {
          setErrors({ identifier: 'Akun tidak ditemukan' });
          toast.error('Akun tidak ditemukan');
        } else {
          toast.error(result.error || 'Login gagal. Silakan coba lagi.');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Tidak dapat terhubung ke server. Periksa koneksi internet Anda.');
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "h-11 rounded-xl bg-[hsl(var(--ctp-surface0)/0.45)] border-[hsl(var(--ctp-overlay0)/0.35)] text-[hsl(var(--ctp-text))] placeholder:text-[hsl(var(--ctp-overlay1))] focus-visible:ring-[hsl(var(--ctp-lavender)/0.4)] focus-visible:border-[hsl(var(--ctp-lavender)/0.5)] transition-colors";
  const errCls = "border-[hsl(var(--ctp-red)/0.5)] focus-visible:ring-[hsl(var(--ctp-red)/0.3)]";

  return (
    <div className="min-h-screen bg-[hsl(var(--ctp-base))] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Soft ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-[hsl(var(--ctp-lavender)/0.04)] blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-[hsl(var(--ctp-mauve)/0.04)] blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-[hsl(var(--ctp-blue)/0.03)] blur-[100px]" />
      </div>

      {/* Subtle grid pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(hsl(var(--ctp-text)) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative w-full max-w-md z-10"
      >
        {/* Back link */}
        <Link href="/" className="group inline-flex items-center gap-1.5 text-sm text-[hsl(var(--ctp-subtext0))] hover:text-[hsl(var(--ctp-lavender))] mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          Kembali ke Beranda
        </Link>

        <Card className="rounded-3xl border border-[hsl(var(--ctp-overlay0)/0.25)] bg-[hsl(var(--ctp-base)/0.70)] backdrop-blur-xl shadow-2xl shadow-black/20">
          <CardHeader className="text-center pb-2 pt-8">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="mx-auto mb-4"
            >
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[hsl(var(--ctp-lavender)/0.25)] to-[hsl(var(--ctp-mauve)/0.20)] border border-[hsl(var(--ctp-lavender)/0.30)]">
                <GraduationCap className="w-8 h-8 text-[hsl(var(--ctp-lavender))]" />
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[hsl(var(--ctp-green))] border-2 border-[hsl(var(--ctp-base))]" />
              </div>
            </motion.div>
            <CardTitle className="text-2xl font-bold text-[hsl(var(--ctp-text))]">Selamat Datang</CardTitle>
            <CardDescription className="text-[hsl(var(--ctp-subtext0))] mt-1">Masuk dengan email atau NPM Anda</CardDescription>
          </CardHeader>

          <CardContent className="px-6 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Identifier */}
              <div className="space-y-2">
                <Label htmlFor="identifier" className="text-sm text-[hsl(var(--ctp-subtext1))]">Email atau NPM</Label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="contoh@email.com atau 1234567890"
                  value={formData.identifier}
                  onChange={handleChange('identifier')}
                  className={`${inputCls} ${errors.identifier ? errCls : ''}`}
                  autoComplete="username"
                />
                {errors.identifier && (
                  <p className="text-xs text-[hsl(var(--ctp-red))]">{errors.identifier}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-sm text-[hsl(var(--ctp-subtext1))]">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-[hsl(var(--ctp-lavender))] hover:text-[hsl(var(--ctp-lavender)/0.8)] font-medium transition-colors"
                  >
                    Lupa password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Masukkan password"
                    value={formData.password}
                    onChange={handleChange('password')}
                    className={`${inputCls} pr-10 ${errors.password ? errCls : ''}`}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--ctp-overlay1))] hover:text-[hsl(var(--ctp-subtext1))] transition-colors"
                    aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-[hsl(var(--ctp-red))]">{errors.password}</p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-11 rounded-xl bg-gradient-to-r from-[hsl(var(--ctp-lavender)/0.25)] to-[hsl(var(--ctp-mauve)/0.20)] text-[hsl(var(--ctp-text))] hover:from-[hsl(var(--ctp-lavender)/0.35)] hover:to-[hsl(var(--ctp-mauve)/0.30)] border border-[hsl(var(--ctp-lavender)/0.30)] transition-all duration-200 font-semibold"
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-[hsl(var(--ctp-lavender)/0.3)] border-t-[hsl(var(--ctp-lavender))] rounded-full animate-spin" />
                    Masuk...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    Masuk
                  </span>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-[hsl(var(--ctp-overlay0)/0.25)]" />
              <span className="text-xs text-[hsl(var(--ctp-overlay1))]">atau</span>
              <div className="flex-1 h-px bg-[hsl(var(--ctp-overlay0)/0.25)]" />
            </div>

            {/* Register link */}
            <div className="text-center text-sm text-[hsl(var(--ctp-subtext0))]">
              Belum punya akun?{' '}
              <Link href="/register" className="text-[hsl(var(--ctp-lavender))] font-semibold hover:text-[hsl(var(--ctp-mauve))] transition-colors">
                Daftar Sekarang
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-[hsl(var(--ctp-overlay1))] mt-6">
          &copy; 2025 Kavana Bimbingan Online
        </p>
      </motion.div>
    </div>
  );
}
