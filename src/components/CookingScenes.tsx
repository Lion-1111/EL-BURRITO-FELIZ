import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame, Soup, Droplet } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CookingScenes() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.scene-grill-bg', { scale: 1.3, yPercent: -10, ease: 'none', scrollTrigger: { trigger: '.scene-grill', start: 'top bottom', end: 'bottom top', scrub: 1 } });
      gsap.from('.scene-grill-text', { y: 60, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.scene-grill', start: 'top 70%', toggleActions: 'play none none reverse' } });
      gsap.to('.scene-cheese-bg', { scale: 1.25, yPercent: 10, ease: 'none', scrollTrigger: { trigger: '.scene-cheese', start: 'top bottom', end: 'bottom top', scrub: 1 } });
      gsap.from('.scene-cheese-text', { y: 60, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.scene-cheese', start: 'top 70%', toggleActions: 'play none none reverse' } });
      gsap.to('.scene-ingredients-bg', { scale: 1.2, ease: 'none', scrollTrigger: { trigger: '.scene-ingredients', start: 'top bottom', end: 'bottom top', scrub: 1 } });
      gsap.utils.toArray<HTMLElement>('.particle').forEach((el, i) => {
        gsap.to(el, { y: () => gsap.utils.random(-40, -120), x: () => gsap.utils.random(-20, 20), rotation: () => gsap.utils.random(-30, 30), opacity: () => gsap.utils.random(0.3, 0.7), duration: () => gsap.utils.random(3, 6), repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.3 });
      });
      gsap.from('.scene-ingredients-text', { y: 60, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.scene-ingredients', start: 'top 70%', toggleActions: 'play none none reverse' } });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative bg-ink-900">
      <div className="scene-grill relative h-[80vh] w-full overflow-hidden">
        <div className="scene-grill-bg absolute inset-0 will-change-transform" style={{ backgroundImage: "linear-gradient(to bottom, rgba(10,7,5,0.5), rgba(10,7,5,0.9)), url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-72 -translate-x-1/2 rounded-full bg-ember-500/20 blur-[80px]" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="scene-grill-text">
            <Flame className="mx-auto mb-4 h-8 w-8 text-ember-400" />
            <span className="heading-accent text-sm tracking-[0.3em] text-ember-400">El Fuego</span>
            <h2 className="heading-display mt-3 text-3xl text-cream-50 sm:text-5xl">La carne encuentra<br /><span className="text-gradient-warm">su destino</span></h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-cream-200/60 sm:text-base">Sobre la plancha a fuego alto. El sello perfecto guarda los jugos, el humo cuenta la historia.</p>
          </div>
        </div>
      </div>

      <div className="scene-cheese relative h-[80vh] w-full overflow-hidden">
        <div className="scene-cheese-bg absolute inset-0 will-change-transform" style={{ backgroundImage: "linear-gradient(to bottom, rgba(10,7,5,0.4), rgba(10,7,5,0.85)), url('https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="pointer-events-none absolute bottom-1/3 left-1/2 h-32 w-64 -translate-x-1/2 rounded-full bg-ember-300/15 blur-[60px]" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="scene-cheese-text">
            <Soup className="mx-auto mb-4 h-8 w-8 text-wood-300" />
            <span className="heading-accent text-sm tracking-[0.3em] text-wood-300">El Queso</span>
            <h2 className="heading-display mt-3 text-3xl text-cream-50 sm:text-5xl">Oaxaca que se funde<br /><span className="text-gradient-warm">lento, a la llama</span></h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-cream-200/60 sm:text-base">Hilos de queso derritiéndose sobre el comal caliente. No hay prisa cuando el sabor se construye así.</p>
          </div>
        </div>
      </div>

      <div className="scene-ingredients relative h-[80vh] w-full overflow-hidden">
        <div className="scene-ingredients-bg absolute inset-0 will-change-transform" style={{ backgroundImage: "linear-gradient(to bottom, rgba(10,7,5,0.5), rgba(10,7,5,0.9)), url('https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1000&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="pointer-events-none absolute inset-0">
          {[
            { img: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=100&q=80', top: '15%', left: '20%', size: 40 },
            { img: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=100&q=80', top: '25%', left: '70%', size: 50 },
            { img: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=100&q=80', top: '60%', left: '15%', size: 45 },
            { img: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=100&q=80', top: '70%', left: '75%', size: 35 },
            { img: 'https://images.unsplash.com/photo-1506459225024-1428097a7e18?auto=format&fit=crop&w=100&q=80', top: '40%', left: '50%', size: 30 },
          ].map((p, i) => (
            <div key={i} className="particle absolute rounded-full" style={{ top: p.top, left: p.left, width: p.size, height: p.size, backgroundImage: `url('${p.img}')`, backgroundSize: 'cover', opacity: 0.4 }} />
          ))}
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="scene-ingredients-text">
            <Droplet className="mx-auto mb-4 h-8 w-8 text-chili-400" />
            <span className="heading-accent text-sm tracking-[0.3em] text-chili-400">Lo Fresco</span>
            <h2 className="heading-display mt-3 text-3xl text-cream-50 sm:text-5xl">Ingredientes que<br /><span className="text-gradient-warm">caen con gracia</span></h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-cream-200/60 sm:text-base">Cebolla, cilantro, jitomate, aguacate. Cortados en el momento, cayendo sobre tu burrito como lluvia de sabor.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
