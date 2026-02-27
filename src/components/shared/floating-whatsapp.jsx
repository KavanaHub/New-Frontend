'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  // Ganti dengan nomor WA Anda (gunakan kode negara, tanpa +)
  const waNumber = '6285179935117'; 

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Encode text untuk URL
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${waNumber}?text=${encodedMessage}`;
    
    // Buka di tab baru
    window.open(url, '_blank');
    
    // Tutup popup & reset pesan setelah dikirim
    setIsOpen(false);
    setMessage('');
  };

  return (
    <>
      {/* Tombol Floating (Selalu Tampil di Pojok Kanan Bawah) */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl bg-emerald-500 hover:bg-emerald-600 text-white transition-all transform hover:scale-105"
          size="icon"
          aria-label="Chat via WhatsApp"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </div>

      {/* Pop-up Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-2xl border border-[hsl(var(--ctp-surface1))] bg-[hsl(var(--ctp-base))] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header / Top Bar Chat */}
            <div className="bg-emerald-500 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Hubungi Support</h3>
                  <p className="text-xs text-emerald-50">Biasanya membalas dalam beberapa menit</p>
                </div>
              </div>
            </div>

            {/* Bubble Chat "Bot/Admin" Dummy */}
            <div className="p-4 bg-[hsl(var(--ctp-mantle)/0.5)]">
              <div className="w-10/12 rounded-2xl rounded-tl-none bg-[hsl(var(--ctp-surface0))] p-3 text-sm text-[hsl(var(--ctp-text))] shadow-sm border border-[hsl(var(--ctp-surface1))]">
                Halo! 👋 Ada yang bisa kami bantu seputar Kavanahub?
              </div>
            </div>

            {/* Form Input Pesan */}
            <div className="p-3 bg-[hsl(var(--ctp-base))] border-t border-[hsl(var(--ctp-surface1))]">
              <form onSubmit={handleSend} className="flex gap-2">
                <Input
                  className="rounded-full shadow-inner-sm bg-[hsl(var(--ctp-crust))] focus-visible:ring-emerald-500"
                  placeholder="Ketik pesan Anda..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  autoFocus
                />
                <Button 
                  type="submit" 
                  disabled={!message.trim()}
                  className="h-10 w-10 shrink-0 rounded-full bg-emerald-500 hover:bg-emerald-600 shadow-sm disabled:opacity-50"
                  size="icon"
                >
                  <Send className="h-4 w-4 -ml-0.5 mt-0.5 text-white" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
