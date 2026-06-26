import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Package,
  Truck,
  Shield,
  PlusCircle,
  MessageCircle,
} from "lucide-react";
import ProductMarketplace from "../components/ProductMarketplace/ProductMarketplace";
import CartDrawer from "../components/CartDrawer/CartDrawer";
import CheckoutModal from "../components/CheckoutModal/CheckoutModal";
import { updatePageSEO } from "../utils/seo";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useProducts } from "../context/ProductsContext";
import { CONTACT_INFO } from "../utils/constants";
import { getWhatsAppLink } from "../utils/helpers";

const Products = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  useEffect(() => {
    updatePageSEO("products");
  }, []);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const { openCreateForm } = useProducts();

  const handleAddProducts = () => {
    openCreateForm();
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/30 via-dark-50 to-gold-900/20" />
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6"
            >
              <ShoppingBag className="w-4 h-4 text-gold-400" />
              <span className="text-gold-400 text-sm font-medium">
                Product Marketplace
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6"
            >
              Fresh <span className="text-gold-400">Agricultural</span> Products
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-dark-600"
            >
              Explore our wide range of farm-fresh products. From grains to
              vegetables, vegetables to spices - all sourced directly from
              verified farmers.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Seller / Owner Section */}
      <section className="py-12 bg-dark-100/20 border-y border-gold-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-primary-900/30 via-dark-100/70 to-gold-900/20 border border-gold-500/15 shadow-2xl"
          >
            <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 mb-4">
                  <PlusCircle className="w-4 h-4 text-gold-400" />
                  <span className="text-gold-400 text-sm font-medium">
                    Seller / Owner Area
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
                  Add Products to the Marketplace
                </h2>
                <p className="text-dark-600 max-w-2xl">
                  Owners can list new product items here. Share your product
                  details and our team will help you get them added to the
                  products section.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:justify-end">
                <button
                  onClick={handleAddProducts}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-dark-50 font-semibold transition-colors"
                >
                  <PlusCircle className="w-5 h-5" />
                  Add Products
                </button>
                <a
                  href={getWhatsAppLink(
                    CONTACT_INFO.whatsapp,
                    "Hello! I want to add products to the marketplace. Please contact me with the details.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contact for Listing
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-8 border-y border-gold-500/10 bg-dark-100/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: Package,
                title: "Quality Assured",
                desc: "Verified products",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                desc: "Nationwide shipping",
              },
              {
                icon: Shield,
                title: "Secure Payment",
                desc: "Protected transactions",
              },
              {
                icon: ShoppingBag,
                title: "Easy Returns",
                desc: "Hassle-free returns",
              },
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">
                    {feature.title}
                  </div>
                  <div className="text-dark-600 text-xs">{feature.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <ProductMarketplace />

      {/* Floating Cart Button (Mobile) */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-24 right-8 lg:hidden z-30 flex items-center gap-2 px-5 py-3 rounded-full bg-gold-500 text-dark-50 shadow-gold-lg"
      >
        <ShoppingBag className="w-5 h-5" />
        <span className="font-medium">Cart</span>
        {cartCount > 0 && (
          <span className="ml-1 px-2 py-0.5 rounded-full bg-dark-50 text-gold-500 text-xs font-bold">
            {cartCount}
          </span>
        )}
      </button>

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
    </motion.main>
  );
};

export default Products;
