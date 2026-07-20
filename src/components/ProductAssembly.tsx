import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useScrollCanvasLayers from '../hooks/useScrollCanvasLayers';

gsap.registerPlugin(ScrollTrigger);

const layers = [
  { src: 'https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=800', startProgress: 0, endProgress: 0.05 },
  { src: 'https://images.pexels.com/photos/460837/pexels-photo-460837.jpeg?auto=compress&cs=tinysrgb&w=800', startProgress: 0.12, endProgress: 0.18 },
  { src: 'https://images.pexels.com/photos/3769530/pexels-photo-3769530.jpeg?auto=compress&cs=tinysrgb&w=800', startProgress: 0.25, endProgress: 0.32 },
  { src: 'https://images.pexels.com/photos/5848479/pexels-photo-5848479.jpeg?auto=compress&cs=tinysrgb&w=800', startProgress: 0.38, endProgress: 0.45 },
  { src: 'https://images.pexels.com/photos/5033529/pexels-photo-5033529.jpeg?auto=compress&cs=tinysrgb&w=800', startProgress: 0.52, endProgress: 0.58 },
  { src: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=800', startProgress: 0.65, endProgress: 0.72 },
];

const steps = [
  { label: 'Tortilla de harina', desc: 'Recién hecha, suave y caliente sobre el comal.' },
  { label: 'Carne asada', desc: 'Recién salida de la plancha, sellada al fuego.' },
  { label: 'Queso fundido', desc: 'Oaxaca derritiéndose sobre la carne caliente.' },
  { label: 'Aguacate y vegetales', desc: 'Jitomate, cebolla y aguacate recién cortados.' },
  { label: 'Frijoles y salsa', desc: 'Frijoles puercos y salsa de la casa, el toque final.' },
  { label: 'Listo para ti', desc: 'Vapor saliendo, sabor que se siente en cada mordida.' },
];

export default function ProductAssembly() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useScrollCanvasLayers({ layers, canvasRef, triggerRef, parallax: [0, 10, 5, 8, 3, 0] });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stepEls = stepsRef.current?.querySelectorAll('.step-item');
      stepEls?.forEach((el) => {
        gsap.fromTo(el, { opacity: 0.15, x: 30 }, {
          opacity: 1, x: 0, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 60%', toggleActions: 'play reverse play reverse' },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative bg-ink-900">
      <div ref={triggerRef} className="relative h-[400vh]">
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-ink-900/60" />
          <div className="absolute inset-0 z-10 flex items-end justify-center pb-16 sm:items-center sm:justify-end sm:pb-0 sm:pr-12 lg:pr-20">
            <div ref={stepsRef} className="w-full max-w-md space-y-3 px-6 sm:px-0 sm:space-y-4">
              {steps.map((step, i) => (
                <div key={i} className="step-item flex items-start gap-3 sm:gap-4">
                  <div className="flex flex-col items-center">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-wood-400/30 bg-ink-800/80 text-[11px] font-bold text-ember-400 backdrop-blur-sm">{i + 1}</span>
                    {i < steps.length - 1 && <div className="mt-1 h-8 w-px bg-wood-400/15" />}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-cream-50 sm:text-xl">{step.label}</h3>
                    <p className="mt-0.5 text-sm text-cream-200/60">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute left-0 top-12 z-10 px-6 sm:top-16 sm:px-12 lg:px-20">
            <span className="heading-accent text-sm tracking-[0.3em] text-ember-400">La Obra Maestra</span>
            <h2 className="heading-display mt-2 text-3xl text-cream-50 sm:text-5xl">
              Un burrito que se arma<br /><span className="text-gradient-warm">bajo tus ojos</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
