import MenuSection from '../components/MenuSection';
import { useEffect } from 'react';

export default function MenuPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-12 bg-ink-900 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 mb-8 text-center sm:text-left">
        <h1 className="heading-display text-4xl text-cream-50 sm:text-6xl">Nuestro <span className="text-gradient-warm">Menú</span></h1>
        <p className="mt-4 text-cream-200/70 max-w-2xl text-lg">
          Explora nuestra selección completa de burritos, tortas y tacos. Todo preparado al momento con los ingredientes más frescos.
        </p>
      </div>
      <MenuSection />
    </div>
  );
}
