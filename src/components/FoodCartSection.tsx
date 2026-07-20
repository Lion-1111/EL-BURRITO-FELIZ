import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Store, Clock, Flame } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FoodCartSection() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cart-title', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: rootRef.current, start: 'top 75%' } });
      gsap.from('.cart-img', { scale: 0.9, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.cart-img', start: 'top 80%' } });
      gsap.from('.cart-feature', { y: 30, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out', scrollTrigger: { trigger: '.cart-features', start: 'top 80%' } });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const features = [
    { icon: Store, title: 'Carrito Callejero', desc: 'Nos encuentras en la esquina, como la mejor comida mexicana: al paso, al momento, al fuego.' },
    { icon: Flame, title: 'Hecho al Momento', desc: 'Todo se prepara frente a ti. Nada prehecho, nada recalentado. Fresco y caliente siempre.' },
    { icon: Clock, title: 'Rápido y Saboroso', desc: 'Pides, lo armamos y te lo llevas. Sin esperas largas, sin sacrificar el sabor.' },
  ];

  return (
    <section ref={rootRef} id="carrito" className="section-padding relative overflow-hidden bg-ink-900">
      <div className="pointer-events-none absolute top-1/2 left-0 h-96 w-96 -translate-y-1/2 rounded-full bg-ember-700/5 blur-[120px]" />

      <div className="mx-auto max-w-5xl">
        <div className="cart-title mb-12 text-center">
          <span className="heading-accent text-sm tracking-[0.3em] text-ember-400">Nuestro Carrito</span>
          <h2 className="heading-display mt-3 text-4xl text-cream-50 sm:text-5xl">
            La esquina con <span className="text-gradient-warm">mejor aroma</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-cream-200/60 sm:text-base">
            Un carrito callejero con todo el sabor de México. No es restaurante, es mejor:
            es la comida que te abraza al paso.
          </p>
        </div>

        <div className="cart-img relative mb-12 overflow-hidden rounded-3xl border border-wood-400/10">
          <img
            src="https://images.unsplash.com/photo-1568031813264-d394c5d474b9?auto=format&fit=crop&w=1000&q=80"
            alt="Carrito de comida mexicana"
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="font-display text-xl text-cream-50 sm:text-2xl">"La comida callejera es la más honesta"</p>
            <p className="mt-1 text-sm text-cream-200/60">— El Patrón</p>
          </div>
        </div>

        <div className="cart-features grid grid-cols-1 gap-6 sm:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="cart-feature flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-ember-500/15 to-chili-600/15">
                <f.icon className="h-7 w-7 text-ember-400" />
              </div>
              <h3 className="font-display text-lg font-semibold text-cream-50">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-cream-200/60">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
