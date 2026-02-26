import ResourcePageShell from '@/components/public/resource-page-shell';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata = {
  title: 'FAQ Sistem - Kavana',
  description: 'Pertanyaan yang sering diajukan terkait penggunaan sistem Kavana.',
};

const FAQ_ITEMS = [
  {
    question: 'Apakah mahasiswa wajib memilih track sebelum mengajukan proposal?',
    answer:
      'Ya. Pemilihan track diperlukan agar alur validasi, assignment pembimbing, dan pelaporan mengikuti kebijakan track yang benar.',
  },
  {
    question: 'Mengapa status bimbingan saya masih menunggu?',
    answer:
      'Status menunggu berarti catatan bimbingan sudah terkirim namun belum divalidasi dosen pembimbing.',
  },
  {
    question: 'Bagaimana jika salah unggah berkas proposal atau laporan?',
    answer:
      'Silakan unggah kembali melalui menu terkait jika fitur replace tersedia, atau hubungi pengelola prodi untuk penyesuaian.',
  },
  {
    question: 'Apakah koordinator bisa melihat semua progres mahasiswa?',
    answer:
      'Ya. Koordinator dan kaprodi memiliki akses monitoring sesuai kewenangan akademik masing-masing.',
  },
];

export default function FaqSistemPage() {
  return (
    <ResourcePageShell
      title="FAQ Sistem"
      subtitle="Daftar pertanyaan umum mengenai penggunaan fitur utama Kavana."
      updatedLabel="26 Februari 2026"
    >
      <Accordion
        type="single"
        collapsible
        className="rounded-2xl border border-[hsl(var(--ctp-surface1))] bg-[hsl(var(--ctp-crust)/0.62)] px-4"
      >
        {FAQ_ITEMS.map((item, index) => (
          <AccordionItem
            key={item.question}
            value={`faq-${index + 1}`}
            className="border-[hsl(var(--ctp-surface1))]"
          >
            <AccordionTrigger className="text-sm font-bold text-[hsl(var(--ctp-text))] hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-[hsl(var(--ctp-subtext1))]">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ResourcePageShell>
  );
}
