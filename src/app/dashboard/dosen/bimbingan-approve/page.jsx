'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, XCircle, Clock, MessageSquare, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuthStore } from '@/store/auth-store';
import { dosenAPI } from '@/lib/api';

const STATUS_MAP = {
  approved: { label: 'Disetujui', color: 'ctp-green' },
  pending: { label: 'Pending', color: 'ctp-yellow' },
  rejected: { label: 'Revisi', color: 'ctp-red' },
};

export default function BimbinganApprovePage() {
  const router = useRouter();
  const { role } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState('all');
  const [actionModal, setActionModal] = useState(null);
  const [catatan, setCatatan] = useState('');

  useEffect(() => {
    if (role && !['dosen','koordinator','kaprodi'].includes(role)) { router.replace(`/dashboard/${role}`); return; }
    loadData();
  }, [role]);

  const loadData = async () => {
    try {
      const res = await dosenAPI.getBimbinganList();
      if (res.ok) setList(Array.isArray(res.data) ? res.data : []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleAction = async (id, status) => {
    try {
      const res = await dosenAPI.approveBimbingan(id, status, catatan);
      if (res.ok) { toast.success(status === 'approved' ? 'Berhasil disetujui!' : 'Berhasil ditolak'); setActionModal(null); setCatatan(''); loadData(); }
      else toast.error(res.error || 'Gagal');
    } catch { toast.error('Kesalahan jaringan'); }
  };

  const filtered = list.filter(b => filter === 'all' || b.status === filter);

  if (loading) return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-[hsl(var(--ctp-lavender)/0.3)] border-t-[hsl(var(--ctp-lavender))] rounded-full animate-spin" /></div>;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="bg-[hsl(var(--ctp-surface0)/0.55)] border-[hsl(var(--ctp-overlay0)/0.45)] ctp-ring"><CardContent className="pt-6"><p className="text-xs text-[hsl(var(--ctp-subtext0))]">Total</p><p className="text-2xl font-bold text-[hsl(var(--ctp-text))]">{list.length}</p></CardContent></Card>
        <Card className="bg-[hsl(var(--ctp-surface0)/0.55)] border-[hsl(var(--ctp-overlay0)/0.45)] ctp-ring"><CardContent className="pt-6"><p className="text-xs text-[hsl(var(--ctp-subtext0))]">Pending</p><p className="text-2xl font-bold text-[hsl(var(--ctp-yellow))]">{list.filter(b => b.status === 'pending').length}</p></CardContent></Card>
        <Card className="bg-[hsl(var(--ctp-surface0)/0.55)] border-[hsl(var(--ctp-overlay0)/0.45)] ctp-ring"><CardContent className="pt-6"><p className="text-xs text-[hsl(var(--ctp-subtext0))]">Approved</p><p className="text-2xl font-bold text-[hsl(var(--ctp-green))]">{list.filter(b => b.status === 'approved').length}</p></CardContent></Card>
      </div>

      <Card className="bg-[hsl(var(--ctp-surface0)/0.55)] border-[hsl(var(--ctp-overlay0)/0.45)] ctp-ring">
        <CardHeader className="flex flex-row items-start justify-between gap-3">
          <CardTitle className="flex items-center gap-2 text-[hsl(var(--ctp-text))]"><MessageSquare className="h-4 w-4" /> Daftar Bimbingan</CardTitle>
          <div className="flex gap-2">
            {['all','pending','approved','rejected'].map(f => (
              <Button key={f} size="sm" variant={filter === f ? 'default' : 'secondary'} onClick={() => setFilter(f)} className={`rounded-xl text-xs ${filter === f ? 'bg-[hsl(var(--ctp-lavender)/0.25)] text-[hsl(var(--ctp-text))]' : 'bg-[hsl(var(--ctp-surface1)/0.35)] text-[hsl(var(--ctp-subtext0))]'} border border-[hsl(var(--ctp-overlay0)/0.35)]`}>
                {f === 'all' ? 'Semua' : f.charAt(0).toUpperCase() + f.slice(1)}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <div className="text-center py-12"><MessageSquare className="h-10 w-10 mx-auto text-[hsl(var(--ctp-overlay1))] mb-3" /><p className="text-sm text-[hsl(var(--ctp-subtext0))]">Tidak ada data</p></div>
          ) : (
            <div className="space-y-2">
              {filtered.map((b) => {
                const st = STATUS_MAP[b.status] || STATUS_MAP.pending;
                return (
                  <div key={b.id} className="rounded-2xl border border-[hsl(var(--ctp-overlay0)/0.35)] bg-[hsl(var(--ctp-mantle)/0.35)] p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-sm font-semibold text-[hsl(var(--ctp-text))]">{b.mahasiswa_nama || '-'}</span>
                          <Badge className={`rounded-xl text-[10px] border border-[hsl(var(--${st.color})/0.35)] bg-[hsl(var(--${st.color})/0.12)] text-[hsl(var(--${st.color}))]`}>{st.label}</Badge>
                        </div>
                        <p className="text-xs text-[hsl(var(--ctp-subtext0))]">Minggu {b.minggu_ke || '-'} · {b.tanggal || '-'}</p>
                        <p className="text-sm text-[hsl(var(--ctp-text))] mt-1">{b.topik || b.kegiatan || '-'}</p>
                      </div>
                      {b.status === 'pending' && (
                        <div className="flex gap-2 shrink-0">
                          <Button size="sm" onClick={() => handleAction(b.id, 'approved')} className="rounded-xl h-8 bg-[hsl(var(--ctp-green)/0.20)] text-[hsl(var(--ctp-green))] border border-[hsl(var(--ctp-green)/0.35)]"><CheckCircle2 className="h-4 w-4" /></Button>
                          <Button size="sm" onClick={() => { setActionModal(b.id); setCatatan(''); }} className="rounded-xl h-8 bg-[hsl(var(--ctp-red)/0.20)] text-[hsl(var(--ctp-red))] border border-[hsl(var(--ctp-red)/0.35)]"><XCircle className="h-4 w-4" /></Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {actionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setActionModal(null)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md mx-4 rounded-2xl border border-[hsl(var(--ctp-overlay0)/0.45)] bg-[hsl(var(--ctp-base))] p-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-[hsl(var(--ctp-text))] mb-3">Alasan Revisi</h3>
            <Textarea value={catatan} onChange={e => setCatatan(e.target.value)} rows={3} placeholder="Catatan revisi..." className="bg-[hsl(var(--ctp-mantle)/0.5)] border-[hsl(var(--ctp-overlay0)/0.45)] text-[hsl(var(--ctp-text))]" />
            <div className="flex justify-end gap-3 mt-4">
              <Button variant="secondary" onClick={() => setActionModal(null)} className="rounded-2xl bg-[hsl(var(--ctp-surface1)/0.35)] text-[hsl(var(--ctp-text))] border border-[hsl(var(--ctp-overlay0)/0.35)]">Batal</Button>
              <Button onClick={() => handleAction(actionModal, 'rejected')} className="rounded-2xl bg-[hsl(var(--ctp-red)/0.20)] text-[hsl(var(--ctp-red))] border border-[hsl(var(--ctp-red)/0.35)]">Tolak</Button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
