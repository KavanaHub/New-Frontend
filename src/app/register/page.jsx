'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useMemo, useRef, useEffect } from 'react';
import { GraduationCap, Eye, EyeOff, ArrowLeft, UserPlus, Check, X as XIcon, ShieldCheck, RotateCcw, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { authAPI } from '@/lib/api';
import { validateEmail, validateNPM, validateWhatsApp, validatePassword } from '@/lib/validators';

// ==============================
// OTP INPUT (6 digits)
// ==============================
function OTPInput({ value, onChange, disabled }) {
  const inputRefs = useRef([]);

  const handleChange = (i, e) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return;
    const newOtp = value.split('');
    newOtp[i] = val.slice(-1);
    const joined = newOtp.join('');
    onChange(joined);
    if (val && i < 5) inputRefs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !value[i] && i > 0) inputRefs.current[i - 1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    onChange(pasted.padEnd(6, ''));
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          ref={el => (inputRefs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ''}
          onChange={e => handleChange(i, e)}
          onKeyDown={e => handleKeyDown(i, e)}
          onPaste={i === 0 ? handlePaste : undefined}
          disabled={disabled}
          className="w-11 h-13 text-center text-xl font-bold rounded-xl border transition-all
            bg-[hsl(var(--ctp-surface0)/0.45)] border-[hsl(var(--ctp-overlay0)/0.35)] 
            text-[hsl(var(--ctp-text))] 
            focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ctp-lavender)/0.4)] focus:border-[hsl(var(--ctp-lavender)/0.5)]
            disabled:opacity-50"
        />
      ))}
    </div>
  );
}

// ==============================
// HELPERS
// ==============================
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

// ==============================
// MAIN PAGE
// ==============================
export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    nama: '', npm: '', angkatan: '', email: '', whatsapp: '', password: '', confirmPassword: '', terms: false,
  });

  // OTP state
  const [step, setStep] = useState('form'); // 'form' | 'otp' | 'success'
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(0);

  const angkatanOptions = useMemo(() => getAngkatanOptions(), []);
  const passwordCheck = useMemo(() => validatePassword(formData.password), [formData.password]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleChange = (field) => (e) => {
    const value = e?.target ? e.target.value : e;
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleTermsChange = (checked) => {
    setFormData((prev) => ({ ...prev, terms: checked === true }));
    setErrors((prev) => ({ ...prev, terms: '' }));
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

  // Step 1: Submit form → request OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const result = await authAPI.requestRegisterOTP({
        nama: formData.nama.trim(),
        npm: formData.npm.trim(),
        angkatan: parseInt(formData.angkatan),
        email: formData.email.trim(),
        no_wa: formData.whatsapp.trim(),
        password: formData.password,
      });

      if (result.ok) {
        toast.success('Kode OTP telah dikirim ke email Anda!');
        setCountdown(result.data.expires_in || 300);
        setStep('otp');
      } else {
        const errorLower = (result.error || '').toLowerCase();
        if (errorLower.includes('email') && (errorLower.includes('sudah') || errorLower.includes('already'))) {
          setErrors((prev) => ({ ...prev, email: 'Email sudah terdaftar' }));
          toast.error('Email sudah terdaftar');
        } else if (errorLower.includes('npm') && (errorLower.includes('sudah') || errorLower.includes('already'))) {
          setErrors((prev) => ({ ...prev, npm: 'NPM sudah terdaftar' }));
          toast.error('NPM sudah terdaftar');
        } else {
          toast.error(result.error || 'Gagal mengirim OTP. Silakan coba lagi.');
        }
      }
    } catch (err) {
      console.error('Registration OTP error:', err);
      toast.error('Tidak dapat terhubung ke server.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP → account created
  const handleVerifyOTP = async (e) => {
    e?.preventDefault();
    if (otp.length < 6) { toast.error('Masukkan 6 digit kode OTP'); return; }

    setLoading(true);
    try {
      const result = await authAPI.verifyRegisterOTP(formData.email.trim(), otp);
      if (result.ok) {
        toast.success('Registrasi berhasil!');
        setStep('success');
      } else {
        toast.error(result.error || result.data?.message || 'Kode OTP tidak valid');
      }
    } catch {
      toast.error('Tidak dapat terhubung ke server.');
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    setOtp('');
    setLoading(true);
    try {
      const result = await authAPI.requestRegisterOTP({
        nama: formData.nama.trim(),
        npm: formData.npm.trim(),
        angkatan: parseInt(formData.angkatan),
        email: formData.email.trim(),
        no_wa: formData.whatsapp.trim(),
        password: formData.password,
      });
      if (result.ok) {
        toast.success('Kode OTP baru telah dikirim!');
        setCountdown(result.data.expires_in || 300);
      } else {
        toast.error(result.error || 'Gagal mengirim ulang OTP');
      }
    } catch {
      toast.error('Tidak dapat terhubung ke server.');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const inputCls = "h-11 rounded-xl bg-[hsl(var(--ctp-surface0)/0.45)] border-[hsl(var(--ctp-overlay0)/0.35)] text-[hsl(var(--ctp-text))] placeholder:text-[hsl(var(--ctp-overlay1))] focus-visible:ring-[hsl(var(--ctp-lavender)/0.4)] focus-visible:border-[hsl(var(--ctp-lavender)/0.5)] transition-colors";
  const errCls = "border-[hsl(var(--ctp-red)/0.5)] focus-visible:ring-[hsl(var(--ctp-red)/0.3)]";

  const PasswordReq = ({ met, text }) => (
    <span className={`flex items-center gap-1 text-xs transition-colors ${met ? 'text-[hsl(var(--ctp-green))]' : 'text-[hsl(var(--ctp-overlay1))]'}`}>
      {met ? <Check className="w-3 h-3" /> : <XIcon className="w-3 h-3" />}
      {text}
    </span>
  );

  const FieldError = ({ msg }) => msg ? <p className="text-xs text-[hsl(var(--ctp-red))]">{msg}</p> : null;

  const stepVariants = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--ctp-base))] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Soft ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-0 h-[500px] w-[500px] rounded-full bg-[hsl(var(--ctp-mauve)/0.05)] blur-[120px]" />
        <div className="absolute -bottom-40 -left-20 h-[600px] w-[600px] rounded-full bg-[hsl(var(--ctp-lavender)/0.04)] blur-[140px]" />
        <div className="absolute top-1/3 left-1/4 h-[250px] w-[250px] rounded-full bg-[hsl(var(--ctp-teal)/0.03)] blur-[100px]" />
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
                {step === 'success' ? (
                  <CheckCircle2 className="w-8 h-8 text-[hsl(var(--ctp-green))]" />
                ) : step === 'otp' ? (
                  <ShieldCheck className="w-8 h-8 text-[hsl(var(--ctp-lavender))]" />
                ) : (
                  <GraduationCap className="w-8 h-8 text-[hsl(var(--ctp-teal))]" />
                )}
              </div>
            </motion.div>
            <CardTitle className="text-2xl font-bold text-[hsl(var(--ctp-text))]">
              {step === 'success' ? 'Registrasi Berhasil!' : step === 'otp' ? 'Verifikasi Email' : 'Daftar Akun Baru'}
            </CardTitle>
            <CardDescription className="text-[hsl(var(--ctp-subtext0))] mt-1">
              {step === 'success'
                ? 'Akun Anda telah berhasil dibuat.'
                : step === 'otp'
                  ? `Masukkan kode 6 digit yang dikirim ke ${formData.email}`
                  : 'Buat akun mahasiswa untuk memulai bimbingan'}
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 pb-8">
            <AnimatePresence mode="wait">
              {/* ======== STEP: FORM ======== */}
              {step === 'form' && (
                <motion.form key="form" {...stepVariants} transition={{ duration: 0.25 }} onSubmit={handleSubmit} className="space-y-4">
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
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--ctp-overlay1))] hover:text-[hsl(var(--ctp-subtext1))] transition-colors"
                        aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                        onClick={() => setShowPassword(!showPassword)}
                      >
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
                      <Checkbox
                        id="terms"
                        checked={formData.terms}
                        onCheckedChange={handleTermsChange}
                        className="mt-1 border-[hsl(var(--ctp-overlay0)/0.5)] data-[state=checked]:bg-[hsl(var(--ctp-lavender))] data-[state=checked]:border-[hsl(var(--ctp-lavender))]"
                      />
                      <label htmlFor="terms" className="text-xs text-[hsl(var(--ctp-subtext0))] leading-relaxed">
                        Saya menyetujui syarat dan ketentuan serta kebijakan privasi platform.
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
                        <Sparkles className="w-4 h-4 animate-spin" /> Mengirim OTP...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <UserPlus className="w-4 h-4" /> Daftar
                      </span>
                    )}
                  </Button>
                </motion.form>
              )}

              {/* ======== STEP: OTP ======== */}
              {step === 'otp' && (
                <motion.form key="otp" {...stepVariants} transition={{ duration: 0.25 }} onSubmit={handleVerifyOTP}>
                  <div className="space-y-5">
                    {countdown > 0 && (
                      <p className="text-center text-xs text-[hsl(var(--ctp-peach))]">
                        Berlaku: {formatTime(countdown)}
                      </p>
                    )}

                    <OTPInput value={otp} onChange={setOtp} disabled={loading} />

                    {/* Resend */}
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={handleResend}
                        disabled={loading || countdown > 240}
                        className="text-xs text-[hsl(var(--ctp-subtext0))] hover:text-[hsl(var(--ctp-lavender))] disabled:opacity-40 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" /> Kirim ulang kode
                      </button>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading || otp.length < 6}
                      className="w-full h-11 rounded-xl bg-[hsl(var(--ctp-lavender))] text-[hsl(var(--ctp-crust))] hover:bg-[hsl(var(--ctp-lavender)/0.85)] font-semibold"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 animate-spin" /> Memverifikasi...</span>
                      ) : (
                        <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Verifikasi & Daftar</span>
                      )}
                    </Button>

                    <button
                      type="button"
                      onClick={() => { setStep('form'); setOtp(''); }}
                      className="w-full text-xs text-[hsl(var(--ctp-subtext0))] hover:text-[hsl(var(--ctp-text))] transition-colors flex items-center justify-center gap-1"
                    >
                      <ArrowLeft className="w-3 h-3" /> Kembali ke form
                    </button>
                  </div>
                </motion.form>
              )}

              {/* ======== STEP: SUCCESS ======== */}
              {step === 'success' && (
                <motion.div key="success" {...stepVariants} transition={{ duration: 0.25 }}>
                  <div className="text-center space-y-5">
                    <div className="flex justify-center">
                      <div className="w-16 h-16 rounded-full bg-[hsl(var(--ctp-green)/0.15)] border border-[hsl(var(--ctp-green)/0.3)] flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-[hsl(var(--ctp-green))]" />
                      </div>
                    </div>
                    <p className="text-sm text-[hsl(var(--ctp-subtext0))]">
                      Akun mahasiswa berhasil dibuat. Silakan login untuk memulai.
                    </p>
                    <Button
                      onClick={() => router.push('/login')}
                      className="w-full h-11 rounded-xl bg-[hsl(var(--ctp-green)/0.2)] text-[hsl(var(--ctp-green))] hover:bg-[hsl(var(--ctp-green)/0.3)] border border-[hsl(var(--ctp-green)/0.35)] font-semibold"
                    >
                      Lanjut ke Login
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Login link (only on form step) */}
            {step === 'form' && (
              <>
                <div className="flex items-center gap-3 my-6">
                  <div className="flex-1 h-px bg-[hsl(var(--ctp-overlay0)/0.25)]" />
                  <span className="text-xs text-[hsl(var(--ctp-overlay1))]">sudah punya akun?</span>
                  <div className="flex-1 h-px bg-[hsl(var(--ctp-overlay0)/0.25)]" />
                </div>
                <div className="text-center text-sm text-[hsl(var(--ctp-subtext0))]">
                  <Link href="/login" className="text-[hsl(var(--ctp-lavender))] font-semibold hover:text-[hsl(var(--ctp-mauve))] transition-colors">
                    Masuk ke Akun
                  </Link>
                </div>
              </>
            )}
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
