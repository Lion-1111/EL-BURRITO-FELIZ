import { useEffect, useRef, useState } from 'react';
import { Flame, Menu, X, ShoppingCart, Beef } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { totalItems, openCart } = useCart();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const links = [
    { href: '/', label: 'Inicio' },
    { href: '/menu', label: 'Menú Completo' },
  ];

  return (
    <div
      ref={ref}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled || menuOpen ? 'border-b border-wood-400/10 bg-ink-900/95 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="rounded-full bg-ember-500/10 p-1.5 transition-colors group-hover:bg-ember-500/20">
            <Flame className="h-5 w-5 text-ember-400" />
          </div>
          <span className="heading-display text-xl font-bold text-cream-50 tracking-wide">El Patrón</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link key={link.href} to={link.href} className={`text-sm font-medium transition-colors hover:text-ember-400 ${location.pathname === link.href ? 'text-ember-400' : 'text-cream-200/70'}`}>
              {link.label}
            </Link>
          ))}
          <button onClick={openCart} className="relative flex items-center gap-2 rounded-full border border-wood-400/20 bg-ink-800/50 px-5 py-2.5 text-sm font-medium text-cream-100 transition-all hover:border-ember-500/40 hover:bg-ember-500/10">
            <ShoppingCart className="h-4 w-4 text-ember-400" />
            <span>Mi Orden</span>
            {totalItems > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-ember-500 px-1.5 text-[10px] font-bold text-cream-50 shadow-lg shadow-ember-500/30">{totalItems}</span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button onClick={openCart} className="relative p-2 text-cream-50" aria-label="Carrito">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-ember-500 px-1 text-[9px] font-bold text-cream-50 shadow-md shadow-ember-500/40">{totalItems}</span>
            )}
          </button>
          {/* El ícono de "Hamburguesa" que abre el menú */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-1 text-cream-50 active:scale-95 transition-transform" aria-label="Menú">
            {menuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </nav>

      {/* Menú Móvil Desplegable */}
      {menuOpen && (
        <div className="animate-fade-in border-t border-wood-400/10 bg-ink-900 px-6 py-8 md:hidden h-[100svh] overflow-y-auto">
          {/* El banner llamativo que solicitó el usuario */}
          <div className="mb-8 rounded-2xl bg-gradient-to-br from-ember-600/20 to-chili-800/20 p-5 border border-ember-500/20 shadow-inner">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ember-500/20 text-ember-400">
                <Beef className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-cream-50">¡Listos para llevar!</h3>
            </div>
            <p className="text-sm text-cream-200/80 mb-4 leading-relaxed">
              Las mejores tortas, burritos y tacos de la ciudad. Pide ahora y llévate el mejor sabor callejero a casa.
            </p>
            <Link to="/menu" className="inline-flex w-full justify-center items-center gap-2 rounded-xl bg-ember-600 px-4 py-3 text-sm font-bold text-white transition-active active:scale-95">
              Ver el menú
            </Link>
          </div>

          <div className="flex flex-col gap-6">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-wood-400">Navegación</div>
            {links.map((link) => (
              <Link 
                key={link.href} 
                to={link.href} 
                className={`text-2xl font-display transition-colors ${location.pathname === link.href ? 'text-ember-400' : 'text-cream-50 hover:text-ember-400'}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
