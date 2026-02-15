'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarClock, Plus, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/store/auth-store';
import { koordinatorAPI } from '@/lib/api';

export default function JadwalSidangPage() {
  const router = useRouter();
  const { role } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [jadwal, setJadwal] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ mahasiswaId: '', tanggal: '', ruangan: '', penguji1: '', penguji2: '' });
  const [mahasiswa, setMahasiswa] = useState([]);

  useEffect(() => {
    if (role && role !== 'koordinator') { router.replace(`/dashboard/${role}`); return; }
    loadData();
  }, [role]);

  const loadData = async () => {
    try {
      const [jRes, mRes] = await Promise.all([koordinatorAPI.getJadwalList(), koordinatorAPI.getMahasiswaList()]);
      if (jRes.ok) setJadwal(Array.isArray(jRes.data) ? jRes.data : []);
      if (mRes.ok) setMahasiswa(Array.isArray(mRes.data) ? mRes.data : []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleSchedule = async (e) => {
    e.preventDefault();
    if (!form.tanggal) { toast.error('Tanggal wajib diisi'); return; }
    try {
      const res = await koordinatorAPI.scheduleSidang(form);
      if (res.ok) { toast.success('Jadwal sidang dibuat!'); setShowModal(false); loadData(); }
      else toast.error(res.error || 'Gagal');
    } catch { toast.error('Kesalahan jaringan'); }
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-[hsl(var(--ctp-lavender)/0.3)] border-t-[hsl(var(--ctp-lavender))] rounded-full animate-spin" /></div>;

  const inputCls = "bg-[hsl(var(--ctp-mantle)/0.5)] border-[hsl(var(--ctp-overlay0)/0.45)] text-[hsl(var(--ctp-text))]";

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <Card className="bg-[hsl(var(--ctp-surface0)/0.55)] border-[hsl(var(--ctp-overlay0)/0.45)] ctp-ring">
        <CardHeader className="flex flex-row items-start justify-between gap-3">
          <CardTitle className="flex items-center gap-2 text-[hsl(var(--ctp-text))]"><CalendarClock className="h-4 w-4" /> Jadwal Sidang</CardTitle>
          <Button onClick={() => { setShowModal(true); setForm({ mahasiswaId: '', tanggal: '', ruangan: '', penguji1: '', penguji2: '' }); }} className="rounded-2xl bg-[hsl(var(--ctp-green)/0.20)] text-[hsl(var(--ctp-text))] border border-[hsl(var(--ctp-green)/0.35)]"><Plus className="h-4 w-4 mr-1" /> Jadwalkan</Button>
        </CardHeader>
        <CardContent>
          {jadwal.length === 0 ? (
            <div className="text-center py-12"><CalendarClock className="h-10 w-10 mx-auto text-[hsl(var(--ctp-overlay1))] mb-3" /><p className="text-sm text-[hsl(var(--ctp-subtext0))]">Belum ada jadwal sidang</p></div>
          ) : (
            <div className="space-y-2">
              {jadwal.map((j, i) => (
                <div key={j.id || i} className="rounded-2xl border border-[hsl(var(--ctp-overlay0)/0.35)] bg-[hsl(var(--ctp-mantle)/0.35)] p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[hsl(var(--ctp-text))]">{j.mahasiswa_nama || j.nama || '-'}</p>
                      <p className="text-xs text-[hsl(var(--ctp-subtext0))]">{j.tanggal || '-'} · {j.ruangan || '-'}</p>
                    </div>
                    <Badge className="rounded-xl bg-[hsl(var(--ctp-surface1)/0.35)] text-[hsl(var(--ctp-subtext1))] border border-[hsl(var(--ctp-overlay0)/0.35)]">{j.status || 'Terjadwal'}</Badge>
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
            <h3 className="text-lg font-semibold text-[hsl(var(--ctp-text))] mb-4">Jadwalkan Sidang</h3>
            <form onSubmit={handleSchedule} className="space-y-3">
              <div><Label className="text-[hsl(var(--ctp-subtext1))]">Tanggal</Label><Input type="datetime-local" value={form.tanggal} onChange={e => setForm({...form, tanggal: e.target.value})} className={inputCls} /></div>
              <div><Label className="text-[hsl(var(--ctp-subtext1))]">Ruangan</Label><Input value={form.ruangan} onChange={e => setForm({...form, ruangan: e.target.value})} placeholder="Lab Informatika 301" className={inputCls} /></div>
              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" onClick={() => setShowModal(false)} className="rounded-2xl bg-[hsl(var(--ctp-surface1)/0.35)] text-[hsl(var(--ctp-text))] border border-[hsl(var(--ctp-overlay0)/0.35)]">Batal</Button>
                <Button type="submit" className="rounded-2xl bg-[hsl(var(--ctp-green)/0.20)] text-[hsl(var(--ctp-text))] border border-[hsl(var(--ctp-green)/0.35)]">Jadwalkan</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
