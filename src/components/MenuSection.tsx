import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, ShoppingCart } from 'lucide-react';
import { menuItems, type MenuItem } from '../data';
import { useCart } from '../context/CartContext';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: 'todos', label: 'Todos' },
  { id: 'burritos', label: 'Burritos' },
  { id: 'tortas', label: 'Tortas' },
  { id: 'tacos', label: 'Tacos' },
] as const;

export default function MenuSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeCat, setActiveCat] = useState<string>('todos');
  const { addItem, totalItems, openCart } = useCart();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.menu-title', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: rootRef.current, start: 'top 75%' } });
      gsap.utils.toArray<HTMLElement>('.menu-card').forEach((card, i) => {
        gsap.from(card, { y: 50, opacity: 0, duration: 0.6, ease: 'power2.out', delay: (i % 2) * 0.1, scrollTrigger: { trigger: card, start: 'top 85%' } });
      });
    }, rootRef);
    return () => ctx.revert();
  }, [activeCat]);

  const filtered = activeCat === 'todos' ? menuItems : menuItems.filter((i) => i.category === activeCat);

  return (
    <section ref={rootRef} id="menu" className="section-padding relative bg-ink-800">
      <div className="mx-auto max-w-6xl">
        <div className="menu-title mb-8 text-center">
          <span className="heading-accent text-sm tracking-[0.3em] text-ember-400">Menú</span>
          <h2 className="heading-display mt-3 text-4xl text-cream-50 sm:text-5xl">Elige tu <span className="text-gradient-warm">favorito</span></h2>
        </div>

        {/* Category filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                activeCat === cat.id
                  ? 'bg-gradient-to-r from-ember-500 to-chili-600 text-cream-50 shadow-lg shadow-ember-600/30'
                  : 'border border-wood-400/20 bg-ink-700/50 text-cream-200/60 hover:border-wood-400/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item: MenuItem) => (
            <article key={item.id} className="menu-card group relative overflow-hidden rounded-2xl border border-wood-400/10 bg-ink-700/60 transition-all duration-500 hover:border-wood-400/30">
              <div className="relative h-52 overflow-hidden">
                <img src={item.image} alt={item.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-700 via-ink-700/30 to-transparent" />
                {item.tag && (
                  <span className="absolute top-3 left-3 rounded-full bg-ember-500/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cream-50 backdrop-blur-sm">{item.tag}</span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl font-semibold text-cream-50">{item.name}</h3>
                  <span className="heading-accent text-lg text-ember-400">${item.price}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-cream-200/60">{item.description}</p>
                <button
                  onClick={() => addItem(item)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-ember-500/90 to-chili-600/90 px-4 py-2.5 text-sm font-semibold text-cream-50 transition-all duration-300 hover:from-ember-500 hover:to-chili-600 hover:shadow-lg hover:shadow-ember-600/30 active:scale-95"
                >
                  <Plus className="h-4 w-4" /> Agregar al carrito
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Floating cart badge */}
        {totalItems > 0 && (
          <button
            onClick={openCart}
            className="fixed bottom-24 right-5 z-30 flex items-center gap-2 rounded-full bg-gradient-to-r from-ember-500 to-chili-600 px-5 py-3 text-sm font-semibold text-cream-50 shadow-xl shadow-ember-600/40 transition-transform hover:scale-105 active:scale-95 animate-fade-in"
          >
            <ShoppingCart className="h-5 w-5" />
            Ver carrito ({totalItems})
          </button>
        )}
      </div>
    </section>
  );
}
