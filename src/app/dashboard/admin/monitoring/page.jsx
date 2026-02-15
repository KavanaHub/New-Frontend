'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Activity, Server, Database, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/auth-store';
import { adminAPI } from '@/lib/api';

export default function MonitoringSistemPage() {
  const router = useRouter();
  const { role } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (role && role !== 'admin') { router.replace(`/dashboard/${role}`); return; }
    loadData();
  }, [role]);

  const loadData = async () => {
    try {
      const [sRes, aRes] = await Promise.all([adminAPI.getStats(), adminAPI.getRecentActivity()]);
      if (sRes.ok) setStats(sRes.data || {});
      if (aRes.ok) setActivities(Array.isArray(aRes.data) ? aRes.data : []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-[hsl(var(--ctp-lavender)/0.3)] border-t-[hsl(var(--ctp-lavender))] rounded-full animate-spin" /></div>;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          { label: 'Total Users', value: stats.total_users || 0, icon: Activity, color: 'ctp-text' },
          { label: 'Mahasiswa', value: stats.total_mahasiswa || 0, icon: Server, color: 'ctp-blue' },
          { label: 'Dosen', value: stats.total_dosen || 0, icon: Database, color: 'ctp-green' },
          { label: 'Uptime', value: '99.9%', icon: Clock, color: 'ctp-teal' },
        ].map(s => (
          <Card key={s.label} className="bg-[hsl(var(--ctp-surface0)/0.55)] border-[hsl(var(--ctp-overlay0)/0.45)] ctp-ring">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <p className="text-xs text-[hsl(var(--ctp-subtext0))]">{s.label}</p>
                <s.icon className={`h-4 w-4 text-[hsl(var(--${s.color}))]`} />
              </div>
              <p className={`text-2xl font-bold text-[hsl(var(--${s.color}))] mt-1`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-[hsl(var(--ctp-surface0)/0.55)] border-[hsl(var(--ctp-overlay0)/0.45)] ctp-ring">
        <CardHeader><CardTitle className="flex items-center gap-2 text-[hsl(var(--ctp-text))]"><Activity className="h-4 w-4" /> Aktivitas Terbaru</CardTitle></CardHeader>
        <CardContent>
          {activities.length === 0 ? (
            <div className="text-center py-12"><Activity className="h-10 w-10 mx-auto text-[hsl(var(--ctp-overlay1))] mb-3" /><p className="text-sm text-[hsl(var(--ctp-subtext0))]">Tidak ada aktivitas</p></div>
          ) : (
            <div className="space-y-2">
              {activities.map((a, i) => (
                <div key={a.id || i} className="flex items-center gap-3 rounded-2xl border border-[hsl(var(--ctp-overlay0)/0.35)] bg-[hsl(var(--ctp-mantle)/0.35)] p-3">
                  <div className="h-2 w-2 rounded-full bg-[hsl(var(--ctp-green))]" />
                  <div className="flex-1"><p className="text-sm text-[hsl(var(--ctp-text))]">{a.message || a.action || '-'}</p><p className="text-xs text-[hsl(var(--ctp-subtext0))]">{a.timestamp || a.created_at || '-'}</p></div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
