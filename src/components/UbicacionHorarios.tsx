import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, MessageCircle, Clock } from 'lucide-react';
import { schedule, locationInfo, WHATSAPP_NUMBER } from '../data';

gsap.registerPlugin(ScrollTrigger);

export default function UbicacionHorarios() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.loc-title', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: rootRef.current, start: 'top 75%' } });
      gsap.from('.loc-info', { x: -40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: rootRef.current, start: 'top 70%' } });
      gsap.from('.loc-map', { x: 40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: rootRef.current, start: 'top 70%' } });
      gsap.from('.sched-row', { y: 20, opacity: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: '.loc-schedule', start: 'top 80%' } });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="ubicacion" className="section-padding relative bg-ink-800">
      <div className="mx-auto max-w-6xl">
        <div className="loc-title mb-12 text-center">
          <span className="heading-accent text-sm tracking-[0.3em] text-ember-400">Visítanos</span>
          <h2 className="heading-display mt-3 text-4xl text-cream-50 sm:text-5xl">Te esperamos <span className="text-gradient-warm">en el carrito</span></h2>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="loc-info space-y-8">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="mb-5 flex items-center gap-2 font-display text-lg font-semibold text-cream-50">
                <MapPin className="h-5 w-5 text-ember-400" /> Ubicación
              </h3>
              <div className="space-y-3">
                <p className="text-sm text-cream-200/70">{locationInfo.address}</p>
                <p className="text-sm text-cream-200/70">{locationInfo.city}</p>
                <div className="flex items-center gap-2 pt-2">
                  <Phone className="h-4 w-4 text-wood-300" />
                  <a href={`tel:${locationInfo.phone}`} className="text-sm text-cream-200/70 hover:text-ember-400">{locationInfo.phone}</a>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-[#25D366]" />
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20me%20gustaría%20hacer%20un%20pedido`} target="_blank" rel="noopener noreferrer" className="text-sm text-[#25D366] hover:text-[#1da851] font-medium">Hacer pedido por WhatsApp</a>
                </div>
              </div>
            </div>
            <div className="loc-schedule glass-card rounded-2xl p-6">
              <h3 className="mb-5 flex items-center gap-2 font-display text-lg font-semibold text-cream-50">
                <Clock className="h-5 w-5 text-ember-400" /> Horarios
              </h3>
              <div className="space-y-3">
                {schedule.map((s) => (
                  <div key={s.day} className="sched-row flex items-center justify-between border-b border-wood-400/10 pb-3 last:border-0 last:pb-0">
                    <span className="text-sm text-cream-200/70">{s.day}</span>
                    <span className={`text-sm font-medium ${s.hours === 'Cerrado' ? 'text-chili-400' : 'text-ember-400'}`}>{s.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="loc-map overflow-hidden rounded-2xl border border-wood-400/10 relative min-h-[400px] bg-ink-900 group">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80" alt="Mapa" className="absolute inset-0 h-full w-full object-cover opacity-40 transition-opacity duration-500 group-hover:opacity-20" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <MapPin className="mb-4 h-12 w-12 text-ember-400" />
              <h4 className="mb-6 font-display text-2xl font-bold text-cream-50">Encuéntranos aquí</h4>
              <a href={locationInfo.mapUrl} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2">
                Abrir en Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
