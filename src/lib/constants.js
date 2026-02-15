import {
    LayoutDashboard,
    Briefcase,
    Users,
    MessageSquare,
    Upload,
    FileText,
    GraduationCap,
    User,
    Settings,
    UserCheck,
    CheckCircle,
    ClipboardCheck,
    CalendarDays,
    ListChecks,
    UserCog,
    Group,
    BarChart3,
    Shield,
    Activity,
} from 'lucide-react';

// ---------- MENU CONFIG ----------

export const MENU_CONFIG = {
    mahasiswa: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'track', label: 'Proyek & Internship', icon: Briefcase },
        { id: 'kelompok', label: 'Kelompok Proyek', icon: Users },
        { id: 'bimbingan', label: 'Bimbingan Online', icon: MessageSquare },
        { id: 'proposal', label: 'Upload Proposal', icon: Upload },
        { id: 'laporan', label: 'Upload Laporan Sidang', icon: FileText },
        { id: 'hasil', label: 'Nilai & Hasil Akhir', icon: GraduationCap },
        { id: 'profile', label: 'Profil Saya', icon: User },
        { id: 'settings', label: 'Pengaturan', icon: Settings },
    ],
    dosen: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'mahasiswa-bimbingan', label: 'Mahasiswa Bimbingan', icon: Users },
        { id: 'bimbingan-approve', label: 'Approve Bimbingan', icon: CheckCircle },
        { id: 'laporan-approve', label: 'Approve Laporan Sidang', icon: ClipboardCheck },
        { id: 'profile', label: 'Profil Saya', icon: User },
        { id: 'settings', label: 'Pengaturan', icon: Settings },
    ],
    koordinator: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'kelola-periode', label: 'Kelola Periode', icon: CalendarDays },
        { id: 'validasi-proposal', label: 'Validasi Proposal', icon: ListChecks },
        { id: 'approve-pembimbing', label: 'Assign Pembimbing', icon: UserCheck },
        { id: 'daftar-mahasiswa', label: 'Daftar Mahasiswa', icon: Users },
        { id: 'jadwal-sidang', label: 'Jadwal Sidang', icon: CalendarDays },
        // Dosen Pembimbing features (koordinator juga dosen)
        { id: 'separator', label: 'Dosen Pembimbing', icon: null },
        { id: 'mahasiswa-bimbingan', label: 'Mahasiswa Bimbingan', icon: GraduationCap },
        { id: 'bimbingan-approve', label: 'Approve Bimbingan', icon: CheckCircle },
        { id: 'laporan-approve', label: 'Approve Laporan', icon: ClipboardCheck },
        { id: 'profile', label: 'Profil Saya', icon: User },
        { id: 'settings', label: 'Pengaturan', icon: Settings },
    ],
    kaprodi: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'kelola-koordinator', label: 'Kelola Koordinator', icon: UserCog },
        { id: 'daftar-dosen', label: 'Daftar Dosen', icon: Group },
        { id: 'monitoring', label: 'Monitoring Mahasiswa', icon: BarChart3 },
        // Koordinator features
        { id: 'separator-koordinator', label: 'Koordinator', icon: null },
        { id: 'kelola-periode', label: 'Kelola Periode', icon: CalendarDays },
        { id: 'validasi-proposal', label: 'Validasi Proposal', icon: ListChecks },
        { id: 'approve-pembimbing', label: 'Assign Pembimbing', icon: UserCheck },
        { id: 'daftar-mahasiswa', label: 'Daftar Mahasiswa', icon: Users },
        { id: 'jadwal-sidang', label: 'Jadwal Sidang', icon: CalendarDays },
        // Dosen Pembimbing features
        { id: 'separator-dosen', label: 'Dosen Pembimbing', icon: null },
        { id: 'mahasiswa-bimbingan', label: 'Mahasiswa Bimbingan', icon: GraduationCap },
        { id: 'bimbingan-approve', label: 'Approve Bimbingan', icon: CheckCircle },
        { id: 'laporan-approve', label: 'Approve Laporan', icon: ClipboardCheck },
        { id: 'profile', label: 'Profil Saya', icon: User },
        { id: 'settings', label: 'Pengaturan', icon: Settings },
    ],
    admin: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'kelola-users', label: 'Kelola Users', icon: Shield },
        { id: 'kelola-dosen', label: 'Kelola Dosen', icon: UserCog },
        { id: 'monitoring', label: 'Monitoring Sistem', icon: Activity },
        { id: 'settings', label: 'Pengaturan Sistem', icon: Settings },
    ],
};

// ---------- ROLE LABELS ----------

export const ROLE_LABEL = {
    mahasiswa: 'Mahasiswa',
    dosen: 'Dosen Pembimbing',
    koordinator: 'Koordinator',
    kaprodi: 'Kepala Prodi',
    admin: 'Administrator',
};

// ---------- TITLE MAP ----------

export const TITLE_MAP = {
    dashboard: 'Ringkasan Kegiatan',
    track: 'Proyek & Internship',
    bimbingan: 'Bimbingan Online',
    proposal: 'Upload Proposal',
    laporan: 'Upload Laporan Sidang',
    hasil: 'Nilai & Hasil Akhir',
    kelompok: 'Kelompok Proyek',
    profile: 'Profil Saya',
    settings: 'Pengaturan',
    'mahasiswa-bimbingan': 'Mahasiswa Bimbingan',
    'bimbingan-approve': 'Approve Bimbingan',
    'laporan-approve': 'Approve Laporan Sidang',
    'validasi-proposal': 'Validasi Proposal',
    'approve-pembimbing': 'Assign Pembimbing',
    'daftar-mahasiswa': 'Daftar Mahasiswa',
    'kelola-periode': 'Kelola Periode',
    'jadwal-sidang': 'Jadwal Sidang',
    'kelola-koordinator': 'Kelola Koordinator',
    'daftar-dosen': 'Daftar Dosen',
    monitoring: 'Monitoring Mahasiswa',
    'kelola-users': 'Kelola Users',
    'kelola-dosen': 'Kelola Dosen',
};

// ---------- ROLE DASHBOARD ROUTES ----------

export const ROLE_DASHBOARD_ROUTE = {
    mahasiswa: '/dashboard/mahasiswa',
    dosen: '/dashboard/dosen',
    koordinator: '/dashboard/koordinator',
    kaprodi: '/dashboard/kaprodi',
    admin: '/dashboard/admin',
};
