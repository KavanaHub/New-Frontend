'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserCog, Shield, Search, UserPlus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/auth-store';
import { kaprodiAPI } from '@/lib/api';

function getInitials(n) { return (n||'?').split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2); }

export default function KelolaKoordinatorPage() {
  const router = useRouter();
  const { role } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (role && role !== 'kaprodi') { router.replace(`/dashboard/${role}`); return; }
    loadData();
  }, [role]);

  const loadData = async () => {
    try {
      const res = await kaprodiAPI.getKoordinatorList?.() || { ok: true, data: [] };
      if (res.ok) setList(Array.isArray(res.data) ? res.data : []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const filtered = list.filter(m => !search || (m.nama||'').toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-[hsl(var(--ctp-lavender)/0.3)] border-t-[hsl(var(--ctp-lavender))] rounded-full animate-spin" /></div>;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <Card className="bg-[hsl(var(--ctp-surface0)/0.55)] border-[hsl(var(--ctp-overlay0)/0.45)] ctp-ring">
        <CardHeader className="flex flex-row items-start justify-between gap-3">
          <CardTitle className="flex items-center gap-2 text-[hsl(var(--ctp-text))]"><UserCog className="h-4 w-4" /> Kelola Koordinator</CardTitle>
          <Input placeholder="Cari..." value={search} onChange={e => setSearch(e.target.value)} className="w-64 bg-[hsl(var(--ctp-mantle)/0.5)] border-[hsl(var(--ctp-overlay0)/0.45)] text-[hsl(var(--ctp-text))]" />
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <div className="text-center py-12"><UserCog className="h-10 w-10 mx-auto text-[hsl(var(--ctp-overlay1))] mb-3" /><p className="text-sm text-[hsl(var(--ctp-subtext0))]">Tidak ada data koordinator</p></div>
          ) : (
            <div className="space-y-2">
              {filtered.map((k, i) => (
                <div key={k.id || i} className="flex items-center gap-3 rounded-2xl border border-[hsl(var(--ctp-overlay0)/0.35)] bg-[hsl(var(--ctp-mantle)/0.35)] p-3">
                  <div className="h-10 w-10 rounded-full bg-[hsl(var(--ctp-teal)/0.20)] text-[hsl(var(--ctp-teal))] flex items-center justify-center text-sm font-bold">{getInitials(k.nama)}</div>
                  <div className="flex-1"><p className="text-sm font-semibold text-[hsl(var(--ctp-text))]">{k.nama || '-'}</p><p className="text-xs text-[hsl(var(--ctp-subtext0))]">{k.email || '-'} · {k.semester || '-'}</p></div>
                  <Badge className="rounded-xl bg-[hsl(var(--ctp-green)/0.15)] text-[hsl(var(--ctp-green))] border border-[hsl(var(--ctp-green)/0.3)]">Aktif</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
