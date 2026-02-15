'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GraduationCap, Eye, EyeOff, ArrowLeft } from 'lucide-react';
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
        // Store in Zustand
        storeLogin(result.data.token, result.data.role, result.data.user_id);
        setUser({ nama: result.data.nama, email: result.data.email });

        toast.success('Login berhasil! Mengalihkan...');

        // Redirect to role-based dashboard
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary/5 flex items-center justify-center p-4">
      {/* Decorative blurs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Back button */}
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>

        <Card className="shadow-xl border-slate-200/80">
          <CardHeader className="text-center pb-2">
            <div className="flex items-center justify-center w-14 h-14 bg-primary rounded-xl mx-auto mb-3">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Masuk ke Kavana</CardTitle>
            <CardDescription>Gunakan email atau NPM untuk masuk</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Identifier */}
              <div className="space-y-2">
                <Label htmlFor="identifier">Email atau NPM</Label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="contoh@email.com atau 1234567890"
                  value={formData.identifier}
                  onChange={handleChange('identifier')}
                  className={errors.identifier ? 'border-red-500 focus-visible:ring-red-500' : ''}
                  autoComplete="username"
                />
                {errors.identifier && (
                  <p className="text-xs text-red-500">{errors.identifier}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <button
                    type="button"
                    className="text-xs text-primary hover:text-primary/80 font-medium"
                    onClick={() => toast.info('Fitur lupa password akan segera hadir. Hubungi admin untuk reset.')}
                  >
                    Lupa password?
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Masukkan password"
                    value={formData.password}
                    onChange={handleChange('password')}
                    className={errors.password ? 'border-red-500 focus-visible:ring-red-500 pr-10' : 'pr-10'}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Masuk...
                  </span>
                ) : (
                  'Masuk'
                )}
              </Button>
            </form>

            {/* Register link */}
            <div className="mt-6 text-center text-sm text-slate-500">
              Belum punya akun?{' '}
              <Link href="/register" className="text-primary font-semibold hover:text-primary/80">
                Daftar Sekarang
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
