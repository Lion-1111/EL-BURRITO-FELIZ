import { Flame } from 'lucide-react';
import { WHATSAPP_NUMBER, locationInfo } from '../data';

export default function Footer() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola El Patrón, quiero hacer un pedido 🌯')}`;

  return (
    <footer className="relative overflow-hidden border-t border-wood-400/10 bg-ink-900 px-6 py-16 sm:px-12 lg:px-20">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[600px] -translate-x-1/2 translate-y-1/2 rounded-full bg-ember-700/5 blur-[100px]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2">
            <Flame className="h-7 w-7 text-ember-400" />
            <span className="heading-display text-2xl font-bold text-cream-50">El Patrón</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-cream-200/50">
            Los mejores burritos, tortas y tacos. Hechos en carrito callejero con tortillas de harina recién hechas y mucho sabor.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-cream-200/60">
            <a href="#menu" className="hover:text-ember-400 transition-colors">Menú</a>
            <a href="#especialidades" className="hover:text-ember-400 transition-colors">Especialidades</a>
            <a href="#carrito" className="hover:text-ember-400 transition-colors">El Carrito</a>
            <a href="#ingredientes" className="hover:text-ember-400 transition-colors">Ingredientes</a>
            <a href="#ubicacion" className="hover:text-ember-400 transition-colors">Ubicación</a>
          </div>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8">Hacer un pedido</a>
          <div className="mt-12 w-full border-t border-wood-400/10 pt-6">
            <p className="text-xs text-cream-200/40">© 2025 El Patrón · {locationInfo.address} · Hecho con fuego en CDMX</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
