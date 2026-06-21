import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ShoppingCart,
  MessageCircle,
  Leaf,
  ChevronDown,
} from 'lucide-react';
import { NAV_LINKS, CONTACT_INFO, glassStyle } from '../../utils/constants';
import { useCart } from '../../context/CartContext';
import { getWhatsAppLink } from '../../utils/helpers';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getCartCount } = useCart();
  const location = useLocation();
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-50/95 backdrop-blur-md shadow-lg border-b border-gold-500/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center shadow-gold group-hover:shadow-gold-lg transition-shadow duration-300">
                <Leaf className="w-7 h-7 text-gold-400" />
              </div>
              <div className="absolute -inset-1 rounded-xl bg-gold-500/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-bold text-white tracking-tight">
                Agri<span className="text-gold-400">Business</span>
              </span>
              <span className="text-[10px] text-dark-600 tracking-widest uppercase">
                Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-gold-400'
                    : 'text-dark-700 hover:text-white'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-500 to-gold-300"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Cart Button */}
            <Link
              to="/products"
              className="relative p-2.5 rounded-xl bg-dark-100 border border-gold-500/20 hover:border-gold-500/40 transition-all duration-200 group"
            >
              <ShoppingCart className="w-5 h-5 text-dark-600 group-hover:text-gold-400 transition-colors" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gold-500 text-dark-50 text-xs font-bold flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            {/* WhatsApp Button */}
            <a
              href={getWhatsAppLink(CONTACT_INFO.whatsapp, 'Hello! I am interested in your agricultural products.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-white font-medium transition-all duration-200 group"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">WhatsApp</span>
            </a>

            {/* CTA Button */}
            <Link
              to="/products"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-dark-50 font-semibold text-sm shadow-gold hover:shadow-gold-lg transition-all duration-200"
            >
              Shop Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl bg-dark-100 border border-gold-500/20 text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-4 py-3 rounded-xl transition-all duration-200 ${
                      location.pathname === link.path
                        ? 'bg-gold-500/10 text-gold-400 border-l-2 border-gold-500'
                        : 'text-dark-600 hover:bg-dark-100 hover:text-white'
                    }`}
                  >
                    <span className="font-medium">{link.name}</span>
                  </Link>
                ))}

                {/* Mobile Cart */}
                <Link
                  to="/products"
                  className="flex items-center justify-between px-4 py-3 rounded-xl bg-dark-100 text-white"
                >
                  <span className="font-medium">Cart</span>
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    <span className="px-2 py-1 rounded-lg bg-gold-500 text-dark-50 text-sm font-bold">
                      {cartCount}
                    </span>
                  </div>
                </Link>

                {/* Mobile WhatsApp */}
                <a
                  href={getWhatsAppLink(CONTACT_INFO.whatsapp, 'Hello! I am interested in your agricultural products.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-600 text-white"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">Chat on WhatsApp</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Navbar;
