import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import NavBar from './components/NavBar';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const refresh = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => clearTimeout(refresh);
  }, []);

  return (
    <Router>
      <CartProvider>
        <div className="relative min-h-screen bg-ink-900 bg-noise flex flex-col">
          <NavBar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
          <CartDrawer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
