import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import BackToTop from '../components/BackToTop/BackToTop';
import CartDrawer from '../components/CartDrawer/CartDrawer';
import CheckoutModal from '../components/CheckoutModal/CheckoutModal';
import Loader from '../components/Loader/Loader';
import { useCart } from '../context/CartContext';

const MainLayout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-dark-50 text-white">
      {/* Navbar with props for cart */}
      <div className="relative">
        <Navbar onCartClick={() => setIsCartOpen(true)} cartCount={cartCount} />
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <Footer />

      {/* Back to Top */}
      <BackToTop />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
};

export default MainLayout;
