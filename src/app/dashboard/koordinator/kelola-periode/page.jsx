'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarDays, Plus, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/store/auth-store';
import { koordinatorAPI } from '@/lib/api';

export default function KelolaPeriodePage() {
  const router = useRouter();
  const { role } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [periodes, setPeriodes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ nama: '', mulai: '', selesai: '' });

  useEffect(() => {
    if (role && role !== 'koordinator') { router.replace(`/dashboard/${role}`); return; }
    loadData();
  }, [role]);

  const loadData = async () => {
    try {
      const res = await koordinatorAPI.getJadwalList();
      if (res.ok) setPeriodes(Array.isArray(res.data) ? res.data : []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.nama || !form.mulai || !form.selesai) { toast.error('Semua field wajib diisi'); return; }
    try {
      const res = await koordinatorAPI.createJadwal({ nama_periode: form.nama, tanggal_mulai: form.mulai, tanggal_selesai: form.selesai });
      if (res.ok) { toast.success('Periode berhasil dibuat!'); setShowModal(false); setForm({ nama: '', mulai: '', selesai: '' }); loadData(); }
      else toast.error(res.error || 'Gagal');
    } catch { toast.error('Kesalahan jaringan'); }
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-[hsl(var(--ctp-lavender)/0.3)] border-t-[hsl(var(--ctp-lavender))] rounded-full animate-spin" /></div>;

  const inputCls = "bg-[hsl(var(--ctp-mantle)/0.5)] border-[hsl(var(--ctp-overlay0)/0.45)] text-[hsl(var(--ctp-text))]";

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <Card className="bg-[hsl(var(--ctp-surface0)/0.55)] border-[hsl(var(--ctp-overlay0)/0.45)] ctp-ring">
        <CardHeader className="flex flex-row items-start justify-between gap-3">
          <CardTitle className="flex items-center gap-2 text-[hsl(var(--ctp-text))]"><CalendarDays className="h-4 w-4" /> Kelola Periode</CardTitle>
          <Button onClick={() => setShowModal(true)} className="rounded-2xl bg-[hsl(var(--ctp-green)/0.20)] text-[hsl(var(--ctp-text))] border border-[hsl(var(--ctp-green)/0.35)]"><Plus className="h-4 w-4 mr-1" /> Buat Periode</Button>
        </CardHeader>
        <CardContent>
          {periodes.length === 0 ? (
            <div className="text-center py-12"><CalendarDays className="h-10 w-10 mx-auto text-[hsl(var(--ctp-overlay1))] mb-3" /><p className="text-sm text-[hsl(var(--ctp-subtext0))]">Belum ada periode</p></div>
          ) : (
            <div className="space-y-2">
              {periodes.map(p => (
                <div key={p.id} className={`rounded-2xl border p-4 ${p.is_active || p.status === 'active' ? 'border-[hsl(var(--ctp-green)/0.45)] bg-[hsl(var(--ctp-green)/0.06)]' : 'border-[hsl(var(--ctp-overlay0)/0.35)] bg-[hsl(var(--ctp-mantle)/0.35)]'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2"><h3 className="text-sm font-semibold text-[hsl(var(--ctp-text))]">{p.nama_periode || p.nama || '-'}</h3>{(p.is_active || p.status === 'active') && <Badge className="rounded-xl bg-[hsl(var(--ctp-green)/0.15)] text-[hsl(var(--ctp-green))] border border-[hsl(var(--ctp-green)/0.3)]">Aktif</Badge>}</div>
                      <p className="text-xs text-[hsl(var(--ctp-subtext0))] mt-1">{p.tanggal_mulai || '-'} – {p.tanggal_selesai || '-'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md mx-4 rounded-2xl border border-[hsl(var(--ctp-overlay0)/0.45)] bg-[hsl(var(--ctp-base))] p-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-[hsl(var(--ctp-text))] mb-4">Buat Periode Baru</h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <div><Label className="text-[hsl(var(--ctp-subtext1))]">Nama Periode</Label><Input value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} placeholder="Semester Ganjil 2025" className={inputCls} /></div>
              <div><Label className="text-[hsl(var(--ctp-subtext1))]">Tanggal Mulai</Label><Input type="date" value={form.mulai} onChange={e => setForm({...form, mulai: e.target.value})} className={inputCls} /></div>
              <div><Label className="text-[hsl(var(--ctp-subtext1))]">Tanggal Selesai</Label><Input type="date" value={form.selesai} onChange={e => setForm({...form, selesai: e.target.value})} className={inputCls} /></div>
              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" onClick={() => setShowModal(false)} className="rounded-2xl bg-[hsl(var(--ctp-surface1)/0.35)] text-[hsl(var(--ctp-text))] border border-[hsl(var(--ctp-overlay0)/0.35)]">Batal</Button>
                <Button type="submit" className="rounded-2xl bg-[hsl(var(--ctp-green)/0.20)] text-[hsl(var(--ctp-text))] border border-[hsl(var(--ctp-green)/0.35)]">Buat</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
