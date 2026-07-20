import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../data';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonios() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.test-title', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: rootRef.current, start: 'top 75%' } });
      gsap.utils.toArray<HTMLElement>('.test-card').forEach((card, i) => {
        gsap.from(card, { y: 50, opacity: 0, duration: 0.6, ease: 'power2.out', delay: i * 0.12, scrollTrigger: { trigger: card, start: 'top 85%' } });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="section-padding relative overflow-hidden bg-ink-900">
      <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-ember-700/5 blur-[100px]" />
      <div className="mx-auto max-w-5xl">
        <div className="test-title mb-12 text-center">
          <span className="heading-accent text-sm tracking-[0.3em] text-ember-400">Testimonios</span>
          <h2 className="heading-display mt-3 text-4xl text-cream-50 sm:text-5xl">Lo que dicen <span className="text-gradient-warm">los comensales</span></h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="test-card glass-card rounded-2xl p-6">
              <Quote className="mb-4 h-8 w-8 text-ember-400/30" />
              <div className="mb-3 flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-ember-400 text-ember-400" />)}
              </div>
              <p className="text-sm leading-relaxed text-cream-200/80">"{t.text}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-ember-500 to-chili-600 text-sm font-bold text-cream-50">{t.name.charAt(0)}</div>
                <div>
                  <p className="text-sm font-semibold text-cream-50">{t.name}</p>
                  <p className="text-xs text-cream-200/50">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
