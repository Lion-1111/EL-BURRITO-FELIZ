import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CartProvider } from './context/CartContext';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import ProductAssembly from './components/ProductAssembly';
import CookingScenes from './components/CookingScenes';
import MenuSection from './components/MenuSection';
import FoodCartSection from './components/FoodCartSection';
import Especialidades from './components/Especialidades';
import IngredientesFrescos from './components/IngredientesFrescos';
import Testimonios from './components/Testimonios';
import UbicacionHorarios from './components/UbicacionHorarios';
import WhatsAppButton from './components/WhatsAppButton';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const refresh = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => clearTimeout(refresh);
  }, []);

  return (
    <CartProvider>
      <div className="relative min-h-screen bg-ink-900 bg-noise">
        <NavBar />
        <main>
          <Hero />
          <ProductAssembly />
          <CookingScenes />
          <MenuSection />
          <FoodCartSection />
          <Especialidades />
          <IngredientesFrescos />
          <Testimonios />
          <UbicacionHorarios />
        </main>
        <Footer />
        <WhatsAppButton />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

export default App;
