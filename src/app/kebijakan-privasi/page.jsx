import ResourcePageShell from '@/components/public/resource-page-shell';

export const metadata = {
  title: 'Kebijakan Privasi - Kavana',
  description: 'Kebijakan privasi penggunaan data pada platform Kavana.',
};

export default function KebijakanPrivasiPage() {
  return (
    <ResourcePageShell
      title="Kebijakan Privasi"
      subtitle="Dokumen ini menjelaskan prinsip pengelolaan data pengguna dalam platform Kavana."
      updatedLabel="26 Februari 2026"
    >
      <article>
        <h2 className="text-xl font-bold text-[hsl(var(--ctp-text))]">Data yang Dikumpulkan</h2>
        <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--ctp-subtext1))]">
          Kavana menyimpan data identitas akademik dasar seperti nama, email institusi, role pengguna,
          serta aktivitas akademik yang berkaitan langsung dengan proses bimbingan.
        </p>
      </article>

      <article>
        <h2 className="text-xl font-bold text-[hsl(var(--ctp-text))]">Tujuan Penggunaan Data</h2>
        <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--ctp-subtext1))]">
          Data digunakan untuk menjalankan proses akademik: validasi proposal, pencatatan bimbingan,
          monitoring progres, dan administrasi sidang sesuai kebijakan program studi.
        </p>
      </article>

      <article>
        <h2 className="text-xl font-bold text-[hsl(var(--ctp-text))]">Keamanan dan Akses</h2>
        <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--ctp-subtext1))]">
          Akses data dibatasi berdasarkan role. Perubahan atau distribusi data di luar kebutuhan akademik
          tidak diperbolehkan tanpa persetujuan resmi pengelola prodi.
        </p>
      </article>
    </ResourcePageShell>
  );
}
