import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf } from 'lucide-react';
import { ingredients } from '../data';

gsap.registerPlugin(ScrollTrigger);

export default function IngredientesFrescos() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ingr-title', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: rootRef.current, start: 'top 75%' } });
      gsap.utils.toArray<HTMLElement>('.ingr-card').forEach((card, i) => {
        gsap.from(card, { y: 60, opacity: 0, scale: 0.95, duration: 0.6, ease: 'power2.out', delay: (i % 3) * 0.08, scrollTrigger: { trigger: card, start: 'top 88%' } });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="ingredientes" className="section-padding relative bg-ink-800">
      <div className="mx-auto max-w-6xl">
        <div className="ingr-title mb-12 text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-ember-400">
            <Leaf className="h-5 w-5" />
            <span className="heading-accent text-sm tracking-[0.3em]">Ingredientes Frescos</span>
          </div>
          <h2 className="heading-display text-4xl text-cream-50 sm:text-5xl">Nada congelado, <span className="text-gradient-warm">todo real</span></h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-cream-200/60 sm:text-base">Cada ingrediente llega fresco, se prepara en el día y se sirve con orgullo. Sin atajos, sin sustitutos.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {ingredients.map((item) => (
            <div key={item.name} className="ingr-card group relative overflow-hidden rounded-xl">
              <div className="relative aspect-square overflow-hidden">
                <img src={item.img} alt={item.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-display text-base font-semibold text-cream-50 sm:text-lg">{item.name}</h3>
                <p className="mt-0.5 text-xs text-cream-200/50 sm:text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
