import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Beef, Cookie, Sandwich } from 'lucide-react';
import { specialties } from '../data';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = { burrito: Beef, sandwich: Sandwich, taco: Cookie };

export default function Especialidades() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.spec-item', { y: 60, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: rootRef.current, start: 'top 70%' } });
      gsap.from('.spec-title', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: rootRef.current, start: 'top 80%' } });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="especialidades" className="section-padding relative overflow-hidden bg-ink-900">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-chili-700/5 blur-[120px]" />
      <div className="mx-auto max-w-5xl">
        <div className="spec-title mb-14 text-center">
          <span className="heading-accent text-sm tracking-[0.3em] text-ember-400">Especialidades</span>
          <h2 className="heading-display mt-3 text-4xl text-cream-50 sm:text-5xl">Tres formas de <span className="text-gradient-warm">hacer feliz</span></h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {specialties.map((spec) => {
            const Icon = iconMap[spec.icon] ?? Sandwich;
            return (
              <div key={spec.title} className="spec-item group flex flex-col gap-4 rounded-2xl border border-wood-400/10 bg-ink-800/50 p-6 transition-all duration-500 hover:border-ember-400/20 hover:bg-ink-700/50">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-ember-500/15 to-chili-600/15 transition-all duration-500 group-hover:from-ember-500/25 group-hover:to-chili-600/25">
                  <Icon className="h-7 w-7 text-ember-400" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-cream-50">{spec.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-cream-200/60">{spec.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
