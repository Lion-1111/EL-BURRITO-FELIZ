import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { heroVideoUrl, heroVideoPoster } from '../data';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Try to play video (muted autoplay)
    if (videoRef.current) {
      videoRef.current.play().catch(() => { });
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.from(badgeRef.current, { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' })
        .from(titleRef.current?.querySelectorAll('.line') ?? [], {
          y: 100, opacity: 0, duration: 1, stagger: 0.15, ease: 'power4.out',
        }, '-=0.3')
        .from(subRef.current, { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .from(scrollRef.current, { y: 20, opacity: 0, duration: 0.6 }, '-=0.2');

      gsap.to(bgRef.current, {
        yPercent: 30, scale: 1.15, ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to([titleRef.current, subRef.current, badgeRef.current, scrollRef.current], {
        yPercent: -60, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: '60% top', scrub: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative h-[100svh] w-full overflow-hidden bg-ink-900">
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={heroVideoPoster}
        >
          <source src={heroVideoUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/50 via-ink-900/30 to-ink-900" />
        <div className="absolute inset-0 bg-gradient-to-br from-ember-700/10 via-transparent to-chili-700/10" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div ref={badgeRef} className="mb-6 inline-flex items-center gap-2 rounded-full border border-wood-400/20 bg-ink-800/40 px-4 py-1.5 backdrop-blur-sm">
          <Flame className="h-3.5 w-3.5 text-ember-400" />
          <span className="text-xs font-medium tracking-widest text-wood-200 uppercase">Cocina al fuego lento</span>
        </div>
        <h1 ref={titleRef} className="heading-display text-5xl text-cream-50 sm:text-7xl md:text-8xl">
          <span className="line block overflow-hidden">El Patrón</span>
          <span className="line block overflow-hidden text-gradient-warm">Burritos · Tortas · Tacos</span>
        </h1>
        <p ref={subRef} className="mt-6 max-w-md text-base text-cream-200/70 sm:text-lg">
          Los mejores burritos de la ciudad, hechos en carrito callejero con tortillas de harina recién hechas y mucho sabor.
        </p>
        <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}><Link to="/menu" className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ember-600 px-8 py-3.5 text-base font-bold text-white transition-all hover:bg-ember-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,82,61,0.4)] active:scale-95"><span className="relative z-10 flex items-center gap-2">Ver men� completo <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span></Link></div><div ref={scrollRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] text-wood-300 uppercase">Desliza</span>
          <ChevronDown className="h-5 w-5 animate-bounce text-wood-300" />
        </div>
      </div>
    </section>
  );
}
