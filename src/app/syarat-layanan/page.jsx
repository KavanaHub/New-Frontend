import ResourcePageShell from '@/components/public/resource-page-shell';

export const metadata = {
  title: 'Syarat Layanan - Kavana',
  description: 'Ketentuan penggunaan platform Kavana untuk seluruh pengguna.',
};

export default function SyaratLayananPage() {
  return (
    <ResourcePageShell
      title="Syarat Layanan"
      subtitle="Dengan menggunakan Kavana, pengguna menyetujui ketentuan layanan berikut."
      updatedLabel="26 Februari 2026"
    >
      <article>
        <h2 className="text-xl font-bold text-[hsl(var(--ctp-text))]">1. Kepatuhan Akun</h2>
        <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--ctp-subtext1))]">
          Pengguna wajib menggunakan akun sesuai identitas akademik resmi dan menjaga kerahasiaan kredensial.
        </p>
      </article>

      <article>
        <h2 className="text-xl font-bold text-[hsl(var(--ctp-text))]">2. Keakuratan Informasi</h2>
        <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--ctp-subtext1))]">
          Seluruh data proposal, bimbingan, dan laporan yang diunggah harus akurat, relevan, dan dapat dipertanggungjawabkan.
        </p>
      </article>

      <article>
        <h2 className="text-xl font-bold text-[hsl(var(--ctp-text))]">3. Etika Penggunaan</h2>
        <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--ctp-subtext1))]">
          Pengguna tidak diperkenankan menyalahgunakan sistem untuk aktivitas di luar proses akademik prodi.
        </p>
      </article>

      <article>
        <h2 className="text-xl font-bold text-[hsl(var(--ctp-text))]">4. Perubahan Ketentuan</h2>
        <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--ctp-subtext1))]">
          Pengelola prodi berhak memperbarui ketentuan layanan sewaktu-waktu sesuai kebutuhan operasional.
        </p>
      </article>
    </ResourcePageShell>
  );
}
