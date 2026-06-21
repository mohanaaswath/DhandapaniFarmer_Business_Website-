import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Truck, CheckCircle, AlertCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency, calculateDiscount, isValidEmail, isValidPhone } from '../../utils/helpers';

const CheckoutModal = ({ isOpen, onClose, onComplete }) => {
  const { items, getCartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    paymentMethod: 'card',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const total = getCartTotal();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Required';
    if (!isValidEmail(formData.email)) newErrors.email = 'Invalid email';
    if (!isValidPhone(formData.phone)) newErrors.phone = 'Invalid phone';
    if (!formData.address.trim()) newErrors.address = 'Required';
    if (!formData.city.trim()) newErrors.city = 'Required';
    if (!formData.state.trim()) newErrors.state = 'Required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    if (formData.paymentMethod === 'card') {
      const newErrors = {};
      if (!formData.cardNumber.trim() || formData.cardNumber.length < 16) {
        newErrors.cardNumber = 'Invalid card number';
      }
      if (!formData.expiry.trim()) newErrors.expiry = 'Required';
      if (!formData.cvv.trim() || formData.cvv.length < 3) {
        newErrors.cvv = 'Invalid CVV';
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setIsComplete(true);
    clearCart();

    setTimeout(() => {
      onComplete?.();
      onClose();
      setStep(1);
      setIsComplete(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        paymentMethod: 'card',
        cardNumber: '',
        expiry: '',
        cvv: '',
      });
    }, 3000);
  };

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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] bg-dark-50 rounded-2xl border border-gold-500/10 shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gold-500/10">
              <div>
                <h2 className="text-xl font-semibold text-white">Checkout</h2>
                <p className="text-sm text-dark-600">Step {step} of 2</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-dark-100 text-dark-600 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {isComplete ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 mx-auto rounded-full bg-primary-500/20 flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-primary-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Order Successful!
                  </h3>
                  <p className="text-dark-600">
                    Thank you for your purchase. Your order is being processed.
                  </p>
                </motion.div>
              ) : (
                <div className="grid lg:grid-cols-5 gap-6">
                  {/* Form */}
                  <div className="lg:col-span-3 space-y-6">
                    {step === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                      >
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                          <Truck className="w-5 h-5 text-gold-400" />
                          Shipping Details
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-dark-600 mb-1">
                              First Name *
                            </label>
                            <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              className={`w-full px-4 py-3 rounded-xl bg-dark-100 border ${
                                errors.firstName
                                  ? 'border-red-500'
                                  : 'border-gold-500/20'
                              } text-white focus:border-gold-500/50 focus:outline-none`}
                              placeholder="John"
                            />
                            {errors.firstName && (
                              <p className="text-xs text-red-400 mt-1">
                                {errors.firstName}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm text-dark-600 mb-1">
                              Last Name *
                            </label>
                            <input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              className={`w-full px-4 py-3 rounded-xl bg-dark-100 border ${
                                errors.lastName
                                  ? 'border-red-500'
                                  : 'border-gold-500/20'
                              } text-white focus:border-gold-500/50 focus:outline-none`}
                              placeholder="Doe"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm text-dark-600 mb-1">
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-xl bg-dark-100 border ${
                              errors.email ? 'border-red-500' : 'border-gold-500/20'
                            } text-white focus:border-gold-500/50 focus:outline-none`}
                            placeholder="john@example.com"
                          />
                          {errors.email && (
                            <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm text-dark-600 mb-1">
                            Phone *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-xl bg-dark-100 border ${
                              errors.phone ? 'border-red-500' : 'border-gold-500/20'
                            } text-white focus:border-gold-500/50 focus:outline-none`}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-dark-600 mb-1">
                            Address *
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-xl bg-dark-100 border ${
                              errors.address ? 'border-red-500' : 'border-gold-500/20'
                            } text-white focus:border-gold-500/50 focus:outline-none`}
                            placeholder="123 Main St"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm text-dark-600 mb-1">
                              City *
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              className={`w-full px-4 py-3 rounded-xl bg-dark-100 border ${
                                errors.city ? 'border-red-500' : 'border-gold-500/20'
                              } text-white focus:border-gold-500/50 focus:outline-none`}
                              placeholder="New York"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-dark-600 mb-1">
                              State *
                            </label>
                            <input
                              type="text"
                              name="state"
                              value={formData.state}
                              onChange={handleChange}
                              className={`w-full px-4 py-3 rounded-xl bg-dark-100 border ${
                                errors.state ? 'border-red-500' : 'border-gold-500/20'
                              } text-white focus:border-gold-500/50 focus:outline-none`}
                              placeholder="NY"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-dark-600 mb-1">
                              ZIP *
                            </label>
                            <input
                              type="text"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleChange}
                              className={`w-full px-4 py-3 rounded-xl bg-dark-100 border ${
                                errors.zipCode ? 'border-red-500' : 'border-gold-500/20'
                              } text-white focus:border-gold-500/50 focus:outline-none`}
                              placeholder="10001"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                      >
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                          <CreditCard className="w-5 h-5 text-gold-400" />
                          Payment Method
                        </h3>

                        <div className="space-y-3">
                          <label
                            className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${
                              formData.paymentMethod === 'card'
                                ? 'bg-gold-500/10 border-gold-500/40'
                                : 'bg-dark-100 border-gold-500/20 hover:border-gold-500/30'
                            }`}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="card"
                              checked={formData.paymentMethod === 'card'}
                              onChange={handleChange}
                              className="hidden"
                            />
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                formData.paymentMethod === 'card'
                                  ? 'border-gold-500'
                                  : 'border-dark-600'
                              }`}
                            >
                              {formData.paymentMethod === 'card' && (
                                <div className="w-2.5 h-2.5 rounded-full bg-gold-500" />
                              )}
                            </div>
                            <CreditCard className="w-5 h-5 text-gold-400" />
                            <span className="text-white">Credit / Debit Card</span>
                          </label>

                          <label
                            className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${
                              formData.paymentMethod === 'cod'
                                ? 'bg-gold-500/10 border-gold-500/40'
                                : 'bg-dark-100 border-gold-500/20 hover:border-gold-500/30'
                            }`}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="cod"
                              checked={formData.paymentMethod === 'cod'}
                              onChange={handleChange}
                              className="hidden"
                            />
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                formData.paymentMethod === 'cod'
                                  ? 'border-gold-500'
                                  : 'border-dark-600'
                              }`}
                            >
                              {formData.paymentMethod === 'cod' && (
                                <div className="w-2.5 h-2.5 rounded-full bg-gold-500" />
                              )}
                            </div>
                            <Truck className="w-5 h-5 text-primary-400" />
                            <span className="text-white">Cash on Delivery</span>
                          </label>
                        </div>

                        {formData.paymentMethod === 'card' && (
                          <div className="space-y-4 mt-4">
                            <div>
                              <label className="block text-sm text-dark-600 mb-1">
                                Card Number *
                              </label>
                              <input
                                type="text"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleChange}
                                maxLength={19}
                                className={`w-full px-4 py-3 rounded-xl bg-dark-100 border ${
                                  errors.cardNumber
                                    ? 'border-red-500'
                                    : 'border-gold-500/20'
                                } text-white focus:border-gold-500/50 focus:outline-none`}
                                placeholder="1234 5678 9012 3456"
                              />
                              {errors.cardNumber && (
                                <p className="text-xs text-red-400 mt-1">
                                  {errors.cardNumber}
                                </p>
                              )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm text-dark-600 mb-1">
                                  Expiry *
                                </label>
                                <input
                                  type="text"
                                  name="expiry"
                                  value={formData.expiry}
                                  onChange={handleChange}
                                  maxLength={5}
                                  className={`w-full px-4 py-3 rounded-xl bg-dark-100 border ${
                                    errors.expiry
                                      ? 'border-red-500'
                                      : 'border-gold-500/20'
                                  } text-white focus:border-gold-500/50 focus:outline-none`}
                                  placeholder="MM/YY"
                                />
                              </div>
                              <div>
                                <label className="block text-sm text-dark-600 mb-1">
                                  CVV *
                                </label>
                                <input
                                  type="text"
                                  name="cvv"
                                  value={formData.cvv}
                                  onChange={handleChange}
                                  maxLength={4}
                                  className={`w-full px-4 py-3 rounded-xl bg-dark-100 border ${
                                    errors.cvv ? 'border-red-500' : 'border-gold-500/20'
                                  } text-white focus:border-gold-500/50 focus:outline-none`}
                                  placeholder="123"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>

                  {/* Order Summary */}
                  <div className="lg:col-span-2">
                    <div className="p-4 rounded-xl bg-dark-100/50 border border-gold-500/10">
                      <h4 className="text-white font-semibold mb-4">Order Summary</h4>
                      <div className="space-y-3 max-h-48 overflow-y-auto">
                        {items.map((item) => {
                          const price = item.discountPercent
                            ? calculateDiscount(item.price, item.discountPercent)
                            : item.price;
                          return (
                            <div
                              key={item.cartId}
                              className="flex gap-3 items-center"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <p className="text-sm text-white line-clamp-1">
                                  {item.name}
                                </p>
                                <p className="text-xs text-dark-600">
                                  Qty: {item.quantity}
                                </p>
                              </div>
                              <span className="text-sm text-gold-400">
                                {formatCurrency(price * item.quantity)}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="border-t border-gold-500/10 mt-4 pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-dark-600">Subtotal</span>
                          <span className="text-white">{formatCurrency(total)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-dark-600">Shipping</span>
                          <span className="text-primary-400">Free</span>
                        </div>
                        <div className="flex justify-between font-semibold pt-2 border-t border-gold-500/10">
                          <span className="text-white">Total</span>
                          <span className="text-gold-400">{formatCurrency(total)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {!isComplete && (
              <div className="p-6 border-t border-gold-500/10 flex gap-4">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    disabled={isProcessing}
                    className="flex-1 py-3 rounded-xl border border-gold-500/20 text-dark-600 hover:text-white hover:border-gold-500/40 transition-colors"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={handleNext}
                  disabled={isProcessing}
                  className="flex-1 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-dark-50 font-semibold transition-colors disabled:opacity-50"
                >
                  {isProcessing
                    ? 'Processing...'
                    : step === 2
                    ? 'Place Order'
                    : 'Continue'}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
