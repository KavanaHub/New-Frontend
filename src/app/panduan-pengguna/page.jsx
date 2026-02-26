import ResourcePageShell from '@/components/public/resource-page-shell';

export const metadata = {
  title: 'Panduan Pengguna - Kavana',
  description: 'Panduan ringkas penggunaan Kavana untuk mahasiswa, dosen, koordinator, dan kaprodi.',
};

export default function PanduanPenggunaPage() {
  return (
    <ResourcePageShell
      title="Panduan Pengguna"
      subtitle="Panduan dasar agar pengguna dapat menjalankan alur akademik di Kavana secara konsisten."
      updatedLabel="26 Februari 2026"
    >
      <article>
        <h2 className="text-xl font-bold text-[hsl(var(--ctp-text))]">1. Mahasiswa</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[hsl(var(--ctp-subtext1))]">
          <li>Lengkapi profil terlebih dahulu setelah login pertama.</li>
          <li>Pilih track proyek atau internship sesuai arahan program studi.</li>
          <li>Ajukan proposal, lalu pantau status validasi pada dashboard.</li>
          <li>Catat bimbingan secara berkala dan unggah dokumen laporan saat memenuhi syarat.</li>
        </ul>
      </article>

      <article>
        <h2 className="text-xl font-bold text-[hsl(var(--ctp-text))]">2. Dosen Pembimbing</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[hsl(var(--ctp-subtext1))]">
          <li>Tinjau daftar mahasiswa bimbingan di menu khusus.</li>
          <li>Validasi bimbingan dengan status disetujui atau revisi sesuai evaluasi.</li>
          <li>Review laporan sidang sebelum tahap penjadwalan.</li>
        </ul>
      </article>

      <article>
        <h2 className="text-xl font-bold text-[hsl(var(--ctp-text))]">3. Koordinator dan Kaprodi</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[hsl(var(--ctp-subtext1))]">
          <li>Validasi proposal mahasiswa berdasarkan kelengkapan berkas.</li>
          <li>Assign dosen pembimbing sesuai kebijakan prodi.</li>
          <li>Lakukan monitoring progres dan jadwalkan sidang.</li>
        </ul>
      </article>
    </ResourcePageShell>
  );
}
