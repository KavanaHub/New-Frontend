'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Search, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/auth-store';
import { koordinatorAPI } from '@/lib/api';

function getInitials(n) { return (n||'?').split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2); }

export default function RekapMahasiswaPage() {
  const router = useRouter();
  const { role } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (role && role !== 'koordinator') { router.replace(`/dashboard/${role}`); return; }
    loadData();
  }, [role]);

  const loadData = async () => {
    try {
      const res = await koordinatorAPI.getMahasiswaList();
      if (res.ok) setList(Array.isArray(res.data) ? res.data : []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const filtered = list.filter(m => !search || (m.nama||'').toLowerCase().includes(search.toLowerCase()) || (m.npm||'').includes(search));

  const stats = { proyek: list.filter(m => m.track?.includes('proyek')).length, internship: list.filter(m => m.track?.includes('internship')).length, noTrack: list.filter(m => !m.track).length };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-[hsl(var(--ctp-lavender)/0.3)] border-t-[hsl(var(--ctp-lavender))] rounded-full animate-spin" /></div>;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="bg-[hsl(var(--ctp-surface0)/0.55)] border-[hsl(var(--ctp-overlay0)/0.45)] ctp-ring"><CardContent className="pt-6"><p className="text-xs text-[hsl(var(--ctp-subtext0))]">Total</p><p className="text-2xl font-bold text-[hsl(var(--ctp-text))]">{list.length}</p></CardContent></Card>
        <Card className="bg-[hsl(var(--ctp-surface0)/0.55)] border-[hsl(var(--ctp-overlay0)/0.45)] ctp-ring"><CardContent className="pt-6"><p className="text-xs text-[hsl(var(--ctp-subtext0))]">Proyek</p><p className="text-2xl font-bold text-[hsl(var(--ctp-blue))]">{stats.proyek}</p></CardContent></Card>
        <Card className="bg-[hsl(var(--ctp-surface0)/0.55)] border-[hsl(var(--ctp-overlay0)/0.45)] ctp-ring"><CardContent className="pt-6"><p className="text-xs text-[hsl(var(--ctp-subtext0))]">Internship</p><p className="text-2xl font-bold text-[hsl(var(--ctp-mauve))]">{stats.internship}</p></CardContent></Card>
        <Card className="bg-[hsl(var(--ctp-surface0)/0.55)] border-[hsl(var(--ctp-overlay0)/0.45)] ctp-ring"><CardContent className="pt-6"><p className="text-xs text-[hsl(var(--ctp-subtext0))]">Belum Pilih</p><p className="text-2xl font-bold text-[hsl(var(--ctp-peach))]">{stats.noTrack}</p></CardContent></Card>
      </div>

      <Card className="bg-[hsl(var(--ctp-surface0)/0.55)] border-[hsl(var(--ctp-overlay0)/0.45)] ctp-ring">
        <CardHeader className="flex flex-row items-start justify-between gap-3">
          <CardTitle className="flex items-center gap-2 text-[hsl(var(--ctp-text))]"><Users className="h-4 w-4" /> Rekap Mahasiswa</CardTitle>
          <Input placeholder="Cari..." value={search} onChange={e => setSearch(e.target.value)} className="w-64 bg-[hsl(var(--ctp-mantle)/0.5)] border-[hsl(var(--ctp-overlay0)/0.45)] text-[hsl(var(--ctp-text))]" />
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <div className="text-center py-12"><Users className="h-10 w-10 mx-auto text-[hsl(var(--ctp-overlay1))] mb-3" /><p className="text-sm text-[hsl(var(--ctp-subtext0))]">Tidak ada data</p></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-[hsl(var(--ctp-overlay0)/0.35)]">
                  <th className="text-left py-2 px-3 text-xs text-[hsl(var(--ctp-subtext0))] font-medium">Mahasiswa</th>
                  <th className="text-left py-2 px-3 text-xs text-[hsl(var(--ctp-subtext0))] font-medium">NPM</th>
                  <th className="text-left py-2 px-3 text-xs text-[hsl(var(--ctp-subtext0))] font-medium">Track</th>
                  <th className="text-left py-2 px-3 text-xs text-[hsl(var(--ctp-subtext0))] font-medium">Proposal</th>
                  <th className="text-left py-2 px-3 text-xs text-[hsl(var(--ctp-subtext0))] font-medium">Pembimbing</th>
                </tr></thead>
                <tbody>
                  {filtered.map((m, i) => (
                    <tr key={m.id || i} className="border-b border-[hsl(var(--ctp-surface1)/0.35)]">
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-[hsl(var(--ctp-lavender)/0.20)] text-[hsl(var(--ctp-text))] flex items-center justify-center text-xs font-bold">{getInitials(m.nama)}</div>
                          <span className="font-medium text-[hsl(var(--ctp-text))]">{m.nama || '-'}</span>
                        </div>
                      </td>
                      <td className="py-2 px-3 text-[hsl(var(--ctp-subtext0))]">{m.npm || '-'}</td>
                      <td className="py-2 px-3"><Badge className="rounded-xl bg-[hsl(var(--ctp-surface1)/0.35)] text-[hsl(var(--ctp-subtext1))] border border-[hsl(var(--ctp-overlay0)/0.35)]">{m.track || 'Belum'}</Badge></td>
                      <td className="py-2 px-3 text-[hsl(var(--ctp-subtext0))] capitalize">{m.status_proposal || '-'}</td>
                      <td className="py-2 px-3 text-[hsl(var(--ctp-subtext0))]">{m.dosen_nama || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
