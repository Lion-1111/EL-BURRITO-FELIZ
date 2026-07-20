import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { menuItems, WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '../data';

gsap.registerPlugin(ScrollTrigger);

export default function MenuDestacado() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.menu-title', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
      });

      gsap.utils.toArray<HTMLElement>('.menu-card').forEach((card, i) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          delay: (i % 2) * 0.1,
          scrollTrigger: { trigger: card, start: 'top 85%' },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <section ref={rootRef} className="section-padding relative bg-ink-800">
      <div className="mx-auto max-w-6xl">
        <div className="menu-title mb-12 text-center">
          <span className="heading-accent text-sm tracking-[0.3em] text-ember-400">
            Menú Destacado
          </span>
          <h2 className="heading-display mt-3 text-4xl text-cream-50 sm:text-5xl">
            Lo que la gente <span className="text-gradient-warm">vuelve por</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item) => (
            <article
              key={item.name}
              className="menu-card group relative overflow-hidden rounded-2xl border border-wood-400/10 bg-ink-700/60 transition-all duration-500 hover:border-wood-400/30"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-700 via-ink-700/30 to-transparent" />
                {item.tag && (
                  <span className="absolute top-3 left-3 rounded-full bg-ember-500/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cream-50 backdrop-blur-sm">
                    {item.tag}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl font-semibold text-cream-50">
                    {item.name}
                  </h3>
                  <span className="heading-accent text-lg text-ember-400">
                    {item.price}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-cream-200/60">
                  {item.description}
                </p>
              </div>

              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-ember-500/0 to-chili-600/0 opacity-0 transition-opacity duration-500 group-hover:from-ember-500/5 group-hover:to-chili-600/5 group-hover:opacity-100" />
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Hacer un pedido
          </a>
        </div>
      </div>
    </section>
  );
}
