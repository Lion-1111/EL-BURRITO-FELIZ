import { useEffect, useRef, useState } from 'react';
import { Flame, Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#menu', label: 'Menú' },
    { href: '#especialidades', label: 'Especialidades' },
    { href: '#carrito', label: 'El Carrito' },
    { href: '#ingredientes', label: 'Ingredientes' },
    { href: '#ubicacion', label: 'Ubicación' },
  ];

  return (
    <div
      ref={ref}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? 'border-b border-wood-400/10 bg-ink-900/80 backdrop-blur-lg' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <a href="#" className="flex items-center gap-2">
          <Flame className="h-6 w-6 text-ember-400" />
          <span className="heading-display text-xl font-bold text-cream-50">El Patrón</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-cream-200/60 transition-colors hover:text-ember-400">{link.label}</a>
          ))}
          <button onClick={openCart} className="relative flex items-center gap-2 rounded-full border border-wood-400/20 bg-ink-800/50 px-4 py-2 text-sm text-cream-100 transition-all hover:border-wood-400/40">
            <ShoppingCart className="h-4 w-4" />
            {totalItems > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-ember-500 px-1.5 text-[10px] font-bold text-cream-50">{totalItems}</span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button onClick={openCart} className="relative text-cream-50" aria-label="Carrito">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-ember-500 px-1 text-[9px] font-bold text-cream-50">{totalItems}</span>
            )}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-cream-50" aria-label="Menú">
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="animate-fade-in border-t border-wood-400/10 bg-ink-900/95 px-6 py-6 backdrop-blur-lg md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="text-base text-cream-200/70 hover:text-ember-400">{link.label}</a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
