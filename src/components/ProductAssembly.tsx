import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useScrollCanvasLayers from '../hooks/useScrollCanvasLayers';

gsap.registerPlugin(ScrollTrigger);

// Cada imagen corresponde EXACTAMENTE a su paso
const layers = [
  // Paso 1 – Tortilla de harina
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Stacks_of_corn_tortillas_and_flour_tortillas%2C_with_the_top_one_rolled%2C_side_view_%282%29.jpg/1280px-Stacks_of_corn_tortillas_and_flour_tortillas%2C_with_the_top_one_rolled%2C_side_view_%282%29.jpg', startProgress: 0, endProgress: 0.12 },
  // Paso 2 – Carne asada en la plancha
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Carne_asada_%284472586086%29.jpg/1280px-Carne_asada_%284472586086%29.jpg', startProgress: 0.12, endProgress: 0.28 },
  // Paso 3 – Queso fundido / derretido
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Quesillo_de_Oaxaca.png/1280px-Quesillo_de_Oaxaca.png', startProgress: 0.28, endProgress: 0.45 },
  // Paso 4 – Aguacate, jitomate, vegetales frescos
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Mmm..._Pico_de_Gallo_%285923456035%29.jpg/1280px-Mmm..._Pico_de_Gallo_%285923456035%29.jpg', startProgress: 0.45, endProgress: 0.62 },
  // Paso 5 – Frijoles y salsa
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Frijoles_refritos.jpg/1280px-Frijoles_refritos.jpg', startProgress: 0.62, endProgress: 0.78 },
  // Paso 6 – Burrito terminado, listo para servir
  { src: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Burrito.JPG', startProgress: 0.78, endProgress: 1.0 },
];

const steps = [
  { label: 'Tortilla de harina', desc: 'Recién hecha, suave y caliente sobre el comal.' },
  { label: 'Carne asada', desc: 'Saliendo de la plancha, sellada al fuego vivo.' },
  { label: 'Queso fundido', desc: 'Oaxaca derritiéndose lento sobre la carne caliente.' },
  { label: 'Aguacate y vegetales', desc: 'Jitomate, cebolla y aguacate recién cortados.' },
  { label: 'Frijoles y salsa', desc: 'Frijoles puercos y salsa de la casa, el toque final.' },
  { label: 'Listo para ti', desc: 'Vapor saliendo, sabor que se siente en cada mordida.' },
];

export default function ProductAssembly() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useScrollCanvasLayers({ layers, canvasRef, triggerRef, parallax: [0, 8, 5, 6, 3, 0] });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stepEls = stepsRef.current?.querySelectorAll('.step-item');
      stepEls?.forEach((el) => {
        gsap.fromTo(el, { opacity: 0.2, x: 20 }, {
          opacity: 1, x: 0, duration: 0.3, ease: 'power2.out',
          scrollTrigger: {
            trigger: el, start: 'top 85%', end: 'bottom 55%',
            toggleActions: 'play reverse play reverse',
          },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative bg-ink-900">
      <div ref={triggerRef} className="relative h-[400vh]">
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          {/* Canvas con la imagen del paso actual */}
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-90" />

          {/* Gradientes encima para que el texto sea legible */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/20 to-ink-900/40" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-900/60 via-transparent to-transparent" />

          {/* Título fijo arriba a la izquierda */}
          <div className="pointer-events-none absolute left-0 top-12 z-10 px-6 sm:top-16 sm:px-12 lg:px-20">
            <span className="heading-accent text-sm tracking-[0.3em] text-ember-400">La Obra Maestra</span>
            <h2 className="heading-display mt-2 text-3xl text-cream-50 sm:text-5xl">
              Un burrito que se arma<br /><span className="text-gradient-warm">bajo tus ojos</span>
            </h2>
          </div>

          {/* Lista de pasos — aparecen con el scroll */}
          <div className="absolute inset-0 z-10 flex items-end justify-center pb-16 sm:items-center sm:justify-end sm:pb-0 sm:pr-12 lg:pr-20">
            <div ref={stepsRef} className="w-full max-w-md space-y-3 px-6 sm:px-0 sm:space-y-4">
              {steps.map((step, i) => (
                <div key={i} className="step-item flex items-start gap-3 sm:gap-4">
                  <div className="flex flex-col items-center">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-wood-400/30 bg-ink-800/80 text-[11px] font-bold text-ember-400 backdrop-blur-sm">
                      {i + 1}
                    </span>
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
        </div>
      </div>
    </section>
  );
}
