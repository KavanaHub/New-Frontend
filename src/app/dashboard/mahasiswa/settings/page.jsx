'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Settings, Key, Bell, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/store/auth-store';
import { authAPI } from '@/lib/api';

export default function SettingsPage() {
  const { role } = useAuthStore();
  const [oldPw, setOldPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChangePw = async (e) => {
    e.preventDefault();
    if (!oldPw || !newPw) { toast.error('Field wajib diisi'); return; }
    if (newPw !== confirmPw) { toast.error('Konfirmasi password tidak cocok'); return; }
    if (newPw.length < 6) { toast.error('Password minimal 6 karakter'); return; }
    setSubmitting(true);
    try {
      const res = await authAPI.changePassword(oldPw, newPw);
      if (res.ok) { toast.success('Password berhasil diubah!'); setOldPw(''); setNewPw(''); setConfirmPw(''); }
      else toast.error(res.error || 'Gagal mengubah password');
    } catch { toast.error('Kesalahan jaringan'); }
    finally { setSubmitting(false); }
  };

  const inputCls = "bg-[hsl(var(--ctp-mantle)/0.5)] border-[hsl(var(--ctp-overlay0)/0.45)] text-[hsl(var(--ctp-text))]";

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5 max-w-2xl">
      <Card className="bg-[hsl(var(--ctp-surface0)/0.55)] border-[hsl(var(--ctp-overlay0)/0.45)] ctp-ring">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[hsl(var(--ctp-text))]"><Key className="h-4 w-4" /> Ubah Password</CardTitle>
          <CardDescription className="text-[hsl(var(--ctp-subtext0))]">Perbarui password akun Anda.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePw} className="space-y-3">
            <div className="space-y-2"><Label className="text-[hsl(var(--ctp-subtext1))]">Password Lama</Label><Input type="password" value={oldPw} onChange={e => setOldPw(e.target.value)} className={inputCls} /></div>
            <div className="space-y-2"><Label className="text-[hsl(var(--ctp-subtext1))]">Password Baru</Label><Input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} className={inputCls} /></div>
            <div className="space-y-2"><Label className="text-[hsl(var(--ctp-subtext1))]">Konfirmasi</Label><Input type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} className={inputCls} /></div>
            <Button type="submit" disabled={submitting} className="rounded-2xl bg-[hsl(var(--ctp-lavender)/0.20)] text-[hsl(var(--ctp-text))] hover:bg-[hsl(var(--ctp-lavender)/0.30)] border border-[hsl(var(--ctp-lavender)/0.35)]">
              {submitting ? 'Menyimpan...' : 'Ubah Password'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
