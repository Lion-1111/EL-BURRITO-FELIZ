import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data';

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola El Patrón, quiero hacer un pedido 🌯')}`;

  return (
    <div
      ref={ref}
      className={`fixed bottom-5 right-5 z-40 transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
    >
      {open && (
        <div className="absolute bottom-16 right-0 w-72 origin-bottom-right animate-fade-in rounded-2xl border border-wood-400/20 bg-ink-800/95 p-5 shadow-2xl backdrop-blur-lg">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366]">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-cream-50">El Patrón</p>
                <p className="text-[11px] text-green-400">En línea ahora</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-cream-200/40 hover:text-cream-50" aria-label="Cerrar">
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-4 rounded-lg rounded-tl-none bg-ink-700/80 p-3 text-sm text-cream-200/80">
            ¡Hola! ¿Listo para ordenar? Escríbenos y armamos tu pedido enseguida. 🌯
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105 active:scale-95"
          >
            <MessageCircle className="h-4 w-4" />
            Pedir por WhatsApp
          </a>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-110 active:scale-95"
        aria-label="Pedir por WhatsApp"
      >
        {!open && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember-400 opacity-75" />
            <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-ember-500 text-[9px] font-bold text-white">!</span>
          </span>
        )}
        {open ? <X className="h-6 w-6 text-white" /> : <MessageCircle className="h-7 w-7 text-white" />}
      </button>
    </div>
  );
}
