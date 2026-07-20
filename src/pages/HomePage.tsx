import Hero from '../components/Hero';
import ProductAssembly from '../components/ProductAssembly';
import CookingScenes from '../components/CookingScenes';
import FoodCartSection from '../components/FoodCartSection';
import Especialidades from '../components/Especialidades';
import IngredientesFrescos from '../components/IngredientesFrescos';
import UbicacionHorarios from '../components/UbicacionHorarios';
import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero />
      <ProductAssembly />
      <CookingScenes />
      {/* El menú se ha movido a su propia página, pero dejamos Especialidades para no dejar vacía la home */}
      <Especialidades />
      <FoodCartSection />
      <IngredientesFrescos />
      <UbicacionHorarios />
    </>
  );
}
