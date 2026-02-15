'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import { GraduationCap, Eye, EyeOff, ArrowLeft, UserPlus, Check, X as XIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { authAPI } from '@/lib/api';
import { validateEmail, validateNPM, validateWhatsApp, validatePassword } from '@/lib/validators';

function getAngkatanOptions() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const newestAngkatan = currentMonth >= 10 ? currentYear : currentYear - 1;
  const options = [];
  for (let year = newestAngkatan; year >= newestAngkatan - 3; year--) {
    options.push(year.toString());
  }
  return options;
}

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    nama: '', npm: '', angkatan: '', email: '', whatsapp: '', password: '', confirmPassword: '', terms: false,
  });

  const angkatanOptions = useMemo(() => getAngkatanOptions(), []);
  const passwordCheck = useMemo(() => validatePassword(formData.password), [formData.password]);

  const handleChange = (field) => (e) => {
    const value = e?.target ? e.target.value : e;
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleCheckbox = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.checked }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const errs = {};

    if (!formData.nama.trim()) errs.nama = 'Nama lengkap wajib diisi';
    else if (formData.nama.trim().length < 3) errs.nama = 'Nama minimal 3 karakter';

    if (!formData.npm.trim()) errs.npm = 'NPM wajib diisi';
    else if (!validateNPM(formData.npm.trim())) errs.npm = 'NPM harus berupa angka';

    if (!formData.angkatan) errs.angkatan = 'Pilih angkatan';

    if (!formData.email.trim()) errs.email = 'Email wajib diisi';
    else if (!validateEmail(formData.email.trim())) errs.email = 'Format email tidak valid';

    if (!formData.whatsapp.trim()) errs.whatsapp = 'Nomor WhatsApp wajib diisi';
    else if (!validateWhatsApp(formData.whatsapp.trim())) errs.whatsapp = 'Format nomor tidak valid (contoh: 08123456789)';

    if (!formData.password) errs.password = 'Password wajib diisi';
    else if (!passwordCheck.isValid) errs.password = 'Password belum memenuhi persyaratan';

    if (!formData.confirmPassword) errs.confirmPassword = 'Konfirmasi password wajib diisi';
    else if (formData.password !== formData.confirmPassword) errs.confirmPassword = 'Password tidak cocok';

    if (!formData.terms) errs.terms = 'Anda harus menyetujui syarat dan ketentuan';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const result = await authAPI.register({
        nama: formData.nama.trim(),
        npm: formData.npm.trim(),
        angkatan: parseInt(formData.angkatan),
        email: formData.email.trim(),
        no_wa: formData.whatsapp.trim(),
        password: formData.password,
      });

      if (result.ok) {
        toast.success('Registrasi berhasil! Silakan login.');
        setTimeout(() => router.push('/login'), 1000);
      } else {
        const errorLower = (result.error || '').toLowerCase();
        if (errorLower.includes('email') && (errorLower.includes('already') || errorLower.includes('exist'))) {
          setErrors((prev) => ({ ...prev, email: 'Email sudah terdaftar' }));
          toast.error('Email sudah terdaftar');
        } else if (errorLower.includes('npm') && (errorLower.includes('already') || errorLower.includes('exist'))) {
          setErrors((prev) => ({ ...prev, npm: 'NPM sudah terdaftar' }));
          toast.error('NPM sudah terdaftar');
        } else {
          toast.error(result.error || 'Registrasi gagal. Silakan coba lagi.');
        }
      }
    } catch (err) {
      console.error('Registration error:', err);
      toast.error('Tidak dapat terhubung ke server.');
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "h-11 rounded-xl bg-[hsl(var(--ctp-surface0)/0.45)] border-[hsl(var(--ctp-overlay0)/0.35)] text-[hsl(var(--ctp-text))] placeholder:text-[hsl(var(--ctp-overlay1))] focus-visible:ring-[hsl(var(--ctp-lavender)/0.4)] focus-visible:border-[hsl(var(--ctp-lavender)/0.5)] transition-colors";
  const errCls = "border-[hsl(var(--ctp-red)/0.5)] focus-visible:ring-[hsl(var(--ctp-red)/0.3)]";

  const PasswordReq = ({ met, text }) => (
    <span className={`flex items-center gap-1 text-xs transition-colors ${met ? 'text-[hsl(var(--ctp-green))]' : 'text-[hsl(var(--ctp-overlay1))]'}`}>
      {met ? <Check className="w-3 h-3" /> : <XIcon className="w-3 h-3" />}
      {text}
    </span>
  );

  const FieldError = ({ msg }) => msg ? <p className="text-xs text-[hsl(var(--ctp-red))]">{msg}</p> : null;

  return (
    <div className="min-h-screen bg-[hsl(var(--ctp-crust))] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Soft ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-0 h-[500px] w-[500px] rounded-full bg-[hsl(var(--ctp-mauve)/0.06)] blur-[120px]" />
        <div className="absolute -bottom-40 -left-20 h-[600px] w-[600px] rounded-full bg-[hsl(var(--ctp-lavender)/0.05)] blur-[140px]" />
        <div className="absolute top-1/3 left-1/4 h-[250px] w-[250px] rounded-full bg-[hsl(var(--ctp-teal)/0.04)] blur-[100px]" />
      </div>

      {/* Subtle grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(hsl(var(--ctp-text)) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative w-full max-w-lg z-10"
      >
        {/* Back link */}
        <Link href="/" className="group inline-flex items-center gap-1.5 text-sm text-[hsl(var(--ctp-subtext0))] hover:text-[hsl(var(--ctp-lavender))] mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          Kembali ke Beranda
        </Link>

        <Card className="rounded-3xl border border-[hsl(var(--ctp-overlay0)/0.25)] bg-[hsl(var(--ctp-base)/0.70)] backdrop-blur-xl shadow-2xl shadow-black/20">
          <CardHeader className="text-center pb-2 pt-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="mx-auto mb-4"
            >
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[hsl(var(--ctp-teal)/0.25)] to-[hsl(var(--ctp-lavender)/0.20)] border border-[hsl(var(--ctp-teal)/0.30)]">
                <GraduationCap className="w-8 h-8 text-[hsl(var(--ctp-teal))]" />
              </div>
            </motion.div>
            <CardTitle className="text-2xl font-bold text-[hsl(var(--ctp-text))]">Daftar Akun Baru</CardTitle>
            <CardDescription className="text-[hsl(var(--ctp-subtext0))] mt-1">Buat akun mahasiswa untuk memulai bimbingan</CardDescription>
          </CardHeader>

          <CardContent className="px-6 pb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nama */}
              <div className="space-y-2">
                <Label htmlFor="nama" className="text-sm text-[hsl(var(--ctp-subtext1))]">Nama Lengkap</Label>
                <Input id="nama" placeholder="Masukkan nama lengkap" value={formData.nama} onChange={handleChange('nama')} className={`${inputCls} ${errors.nama ? errCls : ''}`} />
                <FieldError msg={errors.nama} />
              </div>

              {/* NPM + Angkatan */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="npm" className="text-sm text-[hsl(var(--ctp-subtext1))]">NPM</Label>
                  <Input id="npm" placeholder="1234567890" value={formData.npm} onChange={handleChange('npm')} className={`${inputCls} ${errors.npm ? errCls : ''}`} />
                  <FieldError msg={errors.npm} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="angkatan" className="text-sm text-[hsl(var(--ctp-subtext1))]">Angkatan</Label>
                  <Select value={formData.angkatan} onValueChange={handleChange('angkatan')}>
                    <SelectTrigger id="angkatan" className={`h-11 rounded-xl bg-[hsl(var(--ctp-surface0)/0.45)] border-[hsl(var(--ctp-overlay0)/0.35)] text-[hsl(var(--ctp-text))] ${errors.angkatan ? errCls : ''}`}>
                      <SelectValue placeholder="Pilih" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl bg-[hsl(var(--ctp-surface0))] border-[hsl(var(--ctp-overlay0)/0.45)]">
                      {angkatanOptions.map((year) => (
                        <SelectItem key={year} value={year} className="text-[hsl(var(--ctp-text))] focus:bg-[hsl(var(--ctp-surface1)/0.6)] focus:text-[hsl(var(--ctp-text))]">{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError msg={errors.angkatan} />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-[hsl(var(--ctp-subtext1))]">Email</Label>
                <Input id="email" type="email" placeholder="contoh@email.com" value={formData.email} onChange={handleChange('email')} className={`${inputCls} ${errors.email ? errCls : ''}`} />
                <FieldError msg={errors.email} />
              </div>

              {/* WhatsApp */}
              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="text-sm text-[hsl(var(--ctp-subtext1))]">Nomor WhatsApp</Label>
                <Input id="whatsapp" placeholder="08123456789" value={formData.whatsapp} onChange={handleChange('whatsapp')} className={`${inputCls} ${errors.whatsapp ? errCls : ''}`} />
                <FieldError msg={errors.whatsapp} />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm text-[hsl(var(--ctp-subtext1))]">Password</Label>
                <div className="relative">
                  <Input
                    id="password" type={showPassword ? 'text' : 'password'} placeholder="Minimal 8 karakter"
                    value={formData.password} onChange={handleChange('password')}
                    className={`${inputCls} pr-10 ${errors.password ? errCls : ''}`}
                  />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--ctp-overlay1))] hover:text-[hsl(var(--ctp-subtext1))] transition-colors" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {formData.password && (
                  <div className="flex gap-3 mt-1">
                    <PasswordReq met={passwordCheck.length} text="8+ karakter" />
                    <PasswordReq met={passwordCheck.uppercase} text="Huruf besar" />
                    <PasswordReq met={passwordCheck.number} text="Angka" />
                  </div>
                )}
                <FieldError msg={errors.password} />
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm text-[hsl(var(--ctp-subtext1))]">Konfirmasi Password</Label>
                <Input
                  id="confirmPassword" type="password" placeholder="Ulangi password"
                  value={formData.confirmPassword} onChange={handleChange('confirmPassword')}
                  className={`${inputCls} ${errors.confirmPassword ? errCls : ''}`}
                />
                <FieldError msg={errors.confirmPassword} />
              </div>

              {/* Terms */}
              <div className="space-y-1">
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox" id="terms" checked={formData.terms} onChange={handleCheckbox('terms')}
                    className="mt-1 h-4 w-4 rounded border-[hsl(var(--ctp-overlay0)/0.5)] bg-[hsl(var(--ctp-surface0)/0.4)] accent-[hsl(var(--ctp-lavender))]"
                  />
                  <label htmlFor="terms" className="text-xs text-[hsl(var(--ctp-subtext0))] leading-relaxed">
                    Saya menyetujui <a href="#" className="text-[hsl(var(--ctp-lavender))] hover:underline">Syarat &amp; Ketentuan</a> dan <a href="#" className="text-[hsl(var(--ctp-lavender))] hover:underline">Kebijakan Privasi</a>
                  </label>
                </div>
                <FieldError msg={errors.terms} />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-11 rounded-xl bg-gradient-to-r from-[hsl(var(--ctp-teal)/0.25)] to-[hsl(var(--ctp-lavender)/0.20)] text-[hsl(var(--ctp-text))] hover:from-[hsl(var(--ctp-teal)/0.35)] hover:to-[hsl(var(--ctp-lavender)/0.30)] border border-[hsl(var(--ctp-teal)/0.30)] transition-all duration-200 font-semibold"
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-[hsl(var(--ctp-teal)/0.3)] border-t-[hsl(var(--ctp-teal))] rounded-full animate-spin" />
                    Mendaftar...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    Daftar
                  </span>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-[hsl(var(--ctp-overlay0)/0.25)]" />
              <span className="text-xs text-[hsl(var(--ctp-overlay1))]">sudah punya akun?</span>
              <div className="flex-1 h-px bg-[hsl(var(--ctp-overlay0)/0.25)]" />
            </div>

            {/* Login link */}
            <div className="text-center text-sm text-[hsl(var(--ctp-subtext0))]">
              <Link href="/login" className="text-[hsl(var(--ctp-lavender))] font-semibold hover:text-[hsl(var(--ctp-mauve))] transition-colors">
                Masuk ke Akun
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
