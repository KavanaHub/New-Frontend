'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Search, UserPlus, ToggleLeft, ToggleRight, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/auth-store';
import { adminAPI } from '@/lib/api';

function getInitials(n) { return (n||'?').split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2); }

const ROLE_COLORS = { mahasiswa: 'ctp-blue', dosen: 'ctp-green', koordinator: 'ctp-teal', kaprodi: 'ctp-mauve', admin: 'ctp-red' };

export default function KelolaUsersPage() {
  const router = useRouter();
  const { role } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    if (role && role !== 'admin') { router.replace(`/dashboard/${role}`); return; }
    loadData();
  }, [role]);

  const loadData = async () => {
    try {
      const res = await adminAPI.getAllUsers();
      if (res.ok) setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleToggle = async (u) => {
    try {
      const res = await adminAPI.updateUserStatus(u.id, u.role, !u.is_active);
      if (res.ok) { toast.success(`User ${!u.is_active ? 'diaktifkan' : 'dinonaktifkan'}`); loadData(); }
      else toast.error(res.error || 'Gagal');
    } catch { toast.error('Kesalahan jaringan'); }
  };

  const filtered = users.filter(u => {
    if (filterRole !== 'all' && u.role !== filterRole) return false;
    if (search && !(u.nama||'').toLowerCase().includes(search.toLowerCase()) && !(u.email||'').toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const roleCounts = { all: users.length, mahasiswa: users.filter(u=>u.role==='mahasiswa').length, dosen: users.filter(u=>u.role==='dosen').length, koordinator: users.filter(u=>u.role==='koordinator').length, kaprodi: users.filter(u=>u.role==='kaprodi').length, admin: users.filter(u=>u.role==='admin').length };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-[hsl(var(--ctp-lavender)/0.3)] border-t-[hsl(var(--ctp-lavender))] rounded-full animate-spin" /></div>;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {Object.entries(roleCounts).map(([r, c]) => (
          <Card key={r} className={`cursor-pointer bg-[hsl(var(--ctp-surface0)/0.55)] border-[hsl(var(--ctp-overlay0)/0.45)] ctp-ring ${filterRole === r ? 'ring-2 ring-[hsl(var(--ctp-lavender))]' : ''}`} onClick={() => setFilterRole(r)}>
            <CardContent className="pt-5 pb-4"><p className="text-xs text-[hsl(var(--ctp-subtext0))] capitalize">{r === 'all' ? 'Semua' : r}</p><p className="text-xl font-bold text-[hsl(var(--ctp-text))]">{c}</p></CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-[hsl(var(--ctp-surface0)/0.55)] border-[hsl(var(--ctp-overlay0)/0.45)] ctp-ring">
        <CardHeader className="flex flex-row items-start justify-between gap-3">
          <CardTitle className="flex items-center gap-2 text-[hsl(var(--ctp-text))]"><Shield className="h-4 w-4" /> Kelola Users</CardTitle>
          <Input placeholder="Cari user..." value={search} onChange={e => setSearch(e.target.value)} className="w-64 bg-[hsl(var(--ctp-mantle)/0.5)] border-[hsl(var(--ctp-overlay0)/0.45)] text-[hsl(var(--ctp-text))]" />
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <div className="text-center py-12"><Shield className="h-10 w-10 mx-auto text-[hsl(var(--ctp-overlay1))] mb-3" /><p className="text-sm text-[hsl(var(--ctp-subtext0))]">Tidak ada user</p></div>
          ) : (
            <div className="space-y-2">
              {filtered.map((u, i) => {
                const rc = ROLE_COLORS[u.role] || 'ctp-overlay1';
                return (
                  <div key={u.id || i} className="flex items-center gap-3 rounded-2xl border border-[hsl(var(--ctp-overlay0)/0.35)] bg-[hsl(var(--ctp-mantle)/0.35)] p-3">
                    <div className={`h-10 w-10 shrink-0 rounded-full bg-[hsl(var(--${rc})/0.20)] text-[hsl(var(--${rc}))] flex items-center justify-center text-sm font-bold`}>{getInitials(u.nama)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[hsl(var(--ctp-text))] truncate">{u.nama || '-'}</p>
                      <p className="text-xs text-[hsl(var(--ctp-subtext0))]">{u.email || '-'}</p>
                    </div>
                    <Badge className={`rounded-xl capitalize border border-[hsl(var(--${rc})/0.35)] bg-[hsl(var(--${rc})/0.12)] text-[hsl(var(--${rc}))]`}>{u.role}</Badge>
                    <Button size="sm" variant="ghost" onClick={() => handleToggle(u)} className={`h-8 rounded-xl ${u.is_active !== false ? 'text-[hsl(var(--ctp-green))]' : 'text-[hsl(var(--ctp-overlay1))]'}`}>
                      {u.is_active !== false ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
