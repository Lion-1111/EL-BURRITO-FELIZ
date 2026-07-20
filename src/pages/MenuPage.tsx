import MenuSection from '../components/MenuSection';
import { useEffect } from 'react';

import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function MenuPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-12 bg-ink-900 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 mb-8 text-center sm:text-left">
        <div className="flex justify-center sm:justify-start mb-6">
          <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-wood-400/20 bg-ink-800/50 px-4 py-2 text-sm font-medium text-cream-200/80 transition-all hover:bg-ember-500/10 hover:text-ember-400 hover:border-ember-500/30">
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>
        <h1 className="heading-display text-4xl text-cream-50 sm:text-6xl">Nuestro <span className="text-gradient-warm">Menú</span></h1>
        <p className="mt-4 text-cream-200/70 max-w-2xl text-lg mx-auto sm:mx-0">
          Explora nuestra selección completa de burritos, tortas y tacos. Todo preparado al momento con los ingredientes más frescos.
        </p>
      </div>
      <MenuSection />
    </div>
  );
}
