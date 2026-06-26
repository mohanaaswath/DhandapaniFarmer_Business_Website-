import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ShoppingCart,
  Phone,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Edit3,
  Trash2,
} from 'lucide-react';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import { formatCurrency, calculateDiscount, getWhatsAppLink } from '../utils/helpers';
import { CONTACT_INFO } from '../utils/constants';
import { updatePageSEO } from '../utils/seo';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, openEditForm, openDeleteForm } = useProducts();
  const { addToCart, isInCart } = useCart();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState('');

  // Find product in our dynamic context list
  useEffect(() => {
    const foundProduct = products.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setActiveImage(foundProduct.image);
      // SEO Update
      updatePageSEO('products');
    }
  }, [id, products]);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center pt-32">
        <div className="w-20 h-20 bg-dark-100 rounded-2xl flex items-center justify-center border border-gold-500/10 mb-6">
          <Sparkles className="w-10 h-10 text-gold-400 animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold font-display text-white mb-2">Product Not Found</h2>
        <p className="text-dark-600 mb-6 max-w-sm">
          The agricultural product item you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-dark-50 font-semibold transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Marketplace
        </Link>
      </div>
    );
  }

  const inCart = isInCart(product.id);
  const discountedPrice = product.discountPercent
    ? calculateDiscount(product.price, product.discountPercent)
    : null;

  const handleInquiry = () => {
    const message = `Hello! I am interested in purchasing ${product.name} (ID: ${product.id}). Could you provide details on current pricing, stock availability, and delivery options?`;
    window.open(getWhatsAppLink(CONTACT_INFO.whatsapp, message), '_blank');
  };

  const handleEdit = () => {
    openEditForm(product);
  };

  const handleDelete = () => {
    openDeleteForm(product);
    // After deletion form is opened, we will stay on the page until they confirm it.
    // The deletion action itself inside context will remove the product, and if the product is no longer found
    // in the `useEffect` above, the page will render the "Product Not Found" screen, or we can navigate back.
    // Let's hook navigate inside a separate effect below.
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Breadcrumbs & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-dark-600 hover:text-gold-400 transition-colors font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Marketplace
        </Link>

        {/* Owner Management Controls */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-dark-600 uppercase tracking-wider mr-2">
            Owner Controls:
          </span>
          <button
            onClick={handleEdit}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-dark-100 border border-gold-500/10 hover:border-gold-500/30 text-white hover:text-gold-400 font-semibold text-sm transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-950/20 border border-red-500/10 hover:border-red-500/30 text-red-400 hover:text-red-300 font-semibold text-sm transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Image Gallery (5 columns) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-gold-500/10 bg-dark-100/50 backdrop-blur-sm relative">
            <motion.img
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.discountPercent > 0 && (
              <span className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-gold-500 text-dark-50 text-xs font-bold">
                {product.discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails strip */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                    activeImage === img ? 'border-gold-500' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information (7 columns) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Category & Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-wider">
                {product.category}
              </span>
              {product.organic && (
                <span className="px-3 py-1 rounded-lg bg-primary-900/30 border border-primary-500/20 text-primary-400 text-xs font-semibold">
                  Organic Product
                </span>
              )}
              {product.featured && (
                <span className="px-3 py-1 rounded-lg bg-amber-950/30 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                  Featured Product
                </span>
              )}
            </div>

            {/* Title & Ratings */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white mb-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-gold-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-semibold text-white">{product.rating}</span>
                </div>
                <span className="text-dark-600 text-sm">|</span>
                <span className="text-dark-600 text-sm">{product.reviews} customer reviews</span>
              </div>
            </div>

            {/* Price & Unit */}
            <div className="p-6 rounded-2xl bg-dark-100/50 backdrop-blur-sm border border-gold-500/10 flex flex-wrap items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-bold text-gold-400">
                {formatCurrency(discountedPrice || product.price)}
              </span>
              {discountedPrice && (
                <span className="text-lg text-dark-600 line-through">
                  {formatCurrency(product.price)}
                </span>
              )}
              <span className="text-sm text-dark-600 font-medium">/ {product.unit}</span>
            </div>

            {/* Metadata (Stock & Freshness) */}
            <div className="grid grid-cols-2 gap-4 border-y border-gold-500/10 py-4">
              <div>
                <span className="block text-xs text-dark-600 font-medium uppercase tracking-wider mb-1">
                  Availability
                </span>
                {product.stock > 0 ? (
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    In Stock ({product.stock} {product.unit.replace('per ', '').replace('1 ', '')})
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    Out of Stock
                  </span>
                )}
              </div>
              <div>
                <span className="block text-xs text-dark-600 font-medium uppercase tracking-wider mb-1">
                  Freshness
                </span>
                <span className="text-sm font-semibold text-white">{product.freshness}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <span className="block text-xs text-dark-600 font-medium uppercase tracking-wider mb-2">
                Description
              </span>
              <p className="text-dark-600 text-sm leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleInquiry}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold transition-all shadow-lg shadow-green-600/10"
              >
                <Phone className="w-5 h-5" />
                Contact / Order via WhatsApp
              </button>

              <button
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all ${
                  product.stock === 0
                    ? 'bg-dark-300 text-dark-600 cursor-not-allowed'
                    : inCart
                    ? 'bg-primary-600 text-white hover:bg-primary-500'
                    : 'bg-gold-500 hover:bg-gold-400 text-dark-50 shadow-lg shadow-gold-500/10'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {product.stock === 0 ? 'Out of Stock' : inCart ? 'Added to Cart' : 'Add to Cart'}
              </button>
            </div>

            {/* Guarantee / trust block */}
            <div className="grid grid-cols-3 gap-2 pt-4">
              {[
                { icon: ShieldCheck, text: '100% Quality Assurance' },
                { icon: Truck, text: 'Direct Farm Delivery' },
                { icon: RotateCcw, text: 'Hassle-Free Inquiries' },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center p-3 rounded-xl bg-dark-100/30 border border-gold-500/5">
                  <item.icon className="w-5 h-5 text-gold-400 mb-1" />
                  <span className="text-[10px] text-dark-600 font-medium leading-tight">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
};

export default ProductDetails;
