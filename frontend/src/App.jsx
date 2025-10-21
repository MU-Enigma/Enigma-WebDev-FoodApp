import { useState, useEffect } from 'react';
import Header from './components/Header';
import Meals from './components/Meals.jsx';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderSuccess from './components/OrderSuccess';
import Modal from './components/Modal';
import { CartProvider } from './store/CartContext';
import ParticlesWrapper from './components/Particles';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [shouldRenderParticles, setShouldRenderParticles] = useState(false);

  useEffect(() => {
    // Capability gating: prefers-reduced-motion, low hardware concurrency, mobile UA
    try {
      const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent || '');
      const cores = navigator.hardwareConcurrency || 4;

      if (!reduced && !isMobile && cores >= 4) {
        setShouldRenderParticles(true);
      }
    } catch (e) {
      // conservative default: don't render particles if any detection fails
      setShouldRenderParticles(false);
    }
  }, []);

  const showCart = () => {
    setIsCartOpen(true);
    setIsCheckoutOpen(false);
    setIsSuccessOpen(false);
  };

  const hideCart = () => setIsCartOpen(false);

  const showCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const hideCheckout = () => {
    setIsCheckoutOpen(false);
    setIsCartOpen(true); // Go back to cart
  };

  const handleOrderSuccess = (id) => {
    setOrderId(id);
    setIsCheckoutOpen(false);
    setIsSuccessOpen(true);
  };

  const hideSuccess = () => {
    setIsSuccessOpen(false);
  };

  return (
    <CartProvider>
      <Header onShowCart={showCart} />
      {/* Particles are decorative — gate by capability */}
      {shouldRenderParticles && <ParticlesWrapper />}
      <main>
        <Meals />
      </main>
      
      <Modal open={isCartOpen} onClose={hideCart}>
        <Cart onClose={hideCart} onCheckout={showCheckout} />
      </Modal>

      <Modal open={isCheckoutOpen} onClose={hideCheckout}>
        <Checkout onClose={hideCheckout} onSuccess={handleOrderSuccess} />
      </Modal>

      <Modal open={isSuccessOpen} onClose={hideSuccess}>
        <OrderSuccess orderId={orderId} onClose={hideSuccess} />
      </Modal>
    </CartProvider>
  );
}

export default App;
