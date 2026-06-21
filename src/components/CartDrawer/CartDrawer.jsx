import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatCurrency, calculateDiscount } from '../../utils/helpers';

const CartDrawer = ({ isOpen, onClose, onCheckout }) => {
  const {
    items,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getCartTotal,
    clearCart,
  } = useCart();

  const total = getCartTotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-dark-50 border-l border-gold-500/10 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gold-500/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Your Cart</h2>
                  <p className="text-sm text-dark-600">{items.length} items</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-dark-100 text-dark-600 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-24 h-24 rounded-2xl bg-dark-100 flex items-center justify-center mb-6">
                    <ShoppingBag className="w-10 h-10 text-dark-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-dark-600 mb-6">
                    Add some products to get started!
                  </p>
                  <Link
                    to="/products"
                    onClick={onClose}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-dark-50 font-medium transition-colors"
                  >
                    Browse Products
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => {
                    const itemPrice = item.discountPercent
                      ? calculateDiscount(item.price, item.discountPercent)
                      : item.price;

                    return (
                      <motion.div
                        key={item.cartId}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="flex gap-4 p-4 rounded-xl bg-dark-100/50 border border-gold-500/10"
                      >
                        {/* Image */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 rounded-xl object-cover"
                        />

                        {/* Details */}
                        <div className="flex-1">
                          <h4 className="text-white font-medium line-clamp-1">
                            {item.name}
                          </h4>
                          <p className="text-sm text-dark-600">{item.unit}</p>
                          <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-gold-400 font-semibold">
                              {formatCurrency(itemPrice)}
                            </span>
                            {item.discountPercent > 0 && (
                              <span className="text-xs text-dark-600 line-through">
                                {formatCurrency(item.price)}
                              </span>
                            )}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => decreaseQuantity(item.cartId)}
                                className="w-8 h-8 rounded-lg bg-dark-200 flex items-center justify-center text-dark-600 hover:text-white transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center text-white font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => increaseQuantity(item.cartId)}
                                className="w-8 h-8 rounded-lg bg-dark-200 flex items-center justify-center text-dark-600 hover:text-white transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-gold-400 font-semibold">
                                {formatCurrency(itemPrice * item.quantity)}
                              </span>
                              <button
                                onClick={() => removeFromCart(item.cartId)}
                                className="p-2 rounded-lg hover:bg-red-500/20 text-dark-600 hover:text-red-400 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-gold-500/10 space-y-4">
                {/* Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-dark-600">
                    <span>Subtotal</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                  <div className="flex justify-between text-dark-600">
                    <span>Shipping</span>
                    <span className="text-primary-400">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gold-500/10">
                    <span className="text-white">Total</span>
                    <span className="text-gold-400">{formatCurrency(total)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={clearCart}
                    className="flex-1 py-3 rounded-xl border border-gold-500/20 text-dark-600 hover:text-white hover:border-gold-500/40 transition-colors"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={onCheckout}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-dark-50 font-semibold transition-colors"
                  >
                    Checkout
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-center text-dark-600">
                  Secure checkout powered by Stripe
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
