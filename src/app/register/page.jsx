'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import { GraduationCap, Eye, EyeOff, ArrowLeft, Check, X as XIcon } from 'lucide-react';
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

  const PasswordReq = ({ met, text }) => (
    <span className={`flex items-center gap-1 text-xs ${met ? 'text-green-600' : 'text-slate-400'}`}>
      {met ? <Check className="w-3 h-3" /> : <XIcon className="w-3 h-3" />}
      {text}
    </span>
  );

  const FieldError = ({ msg }) => msg ? <p className="text-xs text-red-500">{msg}</p> : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary/5 flex items-center justify-center p-4">
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-lg">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>

        <Card className="shadow-xl border-slate-200/80">
          <CardHeader className="text-center pb-2">
            <div className="flex items-center justify-center w-14 h-14 bg-primary rounded-xl mx-auto mb-3">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Daftar Akun Baru</CardTitle>
            <CardDescription>Buat akun mahasiswa untuk memulai bimbingan</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nama */}
              <div className="space-y-2">
                <Label htmlFor="nama">Nama Lengkap</Label>
                <Input id="nama" placeholder="Masukkan nama lengkap" value={formData.nama} onChange={handleChange('nama')} className={errors.nama ? 'border-red-500' : ''} />
                <FieldError msg={errors.nama} />
              </div>

              {/* NPM + Angkatan */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="npm">NPM</Label>
                  <Input id="npm" placeholder="1234567890" value={formData.npm} onChange={handleChange('npm')} className={errors.npm ? 'border-red-500' : ''} />
                  <FieldError msg={errors.npm} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="angkatan">Angkatan</Label>
                  <Select value={formData.angkatan} onValueChange={handleChange('angkatan')}>
                    <SelectTrigger id="angkatan" className={errors.angkatan ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Pilih" />
                    </SelectTrigger>
                    <SelectContent>
                      {angkatanOptions.map((year) => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError msg={errors.angkatan} />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="contoh@email.com" value={formData.email} onChange={handleChange('email')} className={errors.email ? 'border-red-500' : ''} />
                <FieldError msg={errors.email} />
              </div>

              {/* WhatsApp */}
              <div className="space-y-2">
                <Label htmlFor="whatsapp">Nomor WhatsApp</Label>
                <Input id="whatsapp" placeholder="08123456789" value={formData.whatsapp} onChange={handleChange('whatsapp')} className={errors.whatsapp ? 'border-red-500' : ''} />
                <FieldError msg={errors.whatsapp} />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password" type={showPassword ? 'text' : 'password'} placeholder="Minimal 8 karakter"
                    value={formData.password} onChange={handleChange('password')}
                    className={`pr-10 ${errors.password ? 'border-red-500' : ''}`}
                  />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" onClick={() => setShowPassword(!showPassword)}>
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
                <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                <Input
                  id="confirmPassword" type="password" placeholder="Ulangi password"
                  value={formData.confirmPassword} onChange={handleChange('confirmPassword')}
                  className={errors.confirmPassword ? 'border-red-500' : ''}
                />
                <FieldError msg={errors.confirmPassword} />
              </div>

              {/* Terms */}
              <div className="space-y-1">
                <div className="flex items-start gap-2">
                  <input type="checkbox" id="terms" checked={formData.terms} onChange={handleCheckbox('terms')} className="mt-1 rounded border-slate-300" />
                  <label htmlFor="terms" className="text-xs text-slate-500">
                    Saya menyetujui <a href="#" className="text-primary hover:underline">Syarat & Ketentuan</a> dan <a href="#" className="text-primary hover:underline">Kebijakan Privasi</a>
                  </label>
                </div>
                <FieldError msg={errors.terms} />
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Mendaftar...
                  </span>
                ) : (
                  'Daftar'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-500">
              Sudah punya akun?{' '}
              <Link href="/login" className="text-primary font-semibold hover:text-primary/80">
                Masuk
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
