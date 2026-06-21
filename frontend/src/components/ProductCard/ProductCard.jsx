import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { fadeeInUp } from '../../utils/constants';
import { useCart } from '../../context/CartContext';
import { formatCurrency, calculateDiscount } from '../../utils/helpers';

const ProductCard = ({ product, index = 0, layout = 'grid' }) => {
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(product.id);

  const discountedPrice = product.discountPercent
    ? calculateDiscount(product.price, product.discountPercent)
    : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  if (layout === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="group"
      >
        <Link
          to={`/products/${product.id}`}
          className="flex gap-6 p-4 rounded-2xl bg-dark-100/50 backdrop-blur-sm border border-gold-500/10 hover:border-gold-500/30 transition-all duration-300"
        >
          {/* Image */}
          <div className="relative w-48 h-36 rounded-xl overflow-hidden flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.discountPercent > 0 && (
              <div className="absolute top-2 left-2 px-2 py-1 rounded-lg bg-gold-500 text-dark-50 text-xs font-bold">
                -{product.discountPercent}%
              </div>
            )}
            {product.organic && (
              <div className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-primary-600 text-white text-xs font-medium">
                Organic
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-gold-400 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-dark-600">{product.category}</p>
              </div>
              <div className="flex items-center gap-1 text-gold-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium">{product.rating}</span>
              </div>
            </div>

            <p className="text-dark-600 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-gold-400">
                  {formatCurrency(discountedPrice || product.price)}
                </span>
                {discountedPrice && (
                  <span className="text-sm text-dark-600 line-through">
                    {formatCurrency(product.price)}
                  </span>
                )}
                <span className="text-xs text-dark-600">{product.unit}</span>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                  inCart
                    ? 'bg-primary-600 text-white'
                    : 'bg-gold-500 hover:bg-gold-400 text-dark-50'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {inCart ? 'Added' : 'Add to Cart'}
                </span>
              </button>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <div className="relative rounded-2xl bg-dark-100/50 backdrop-blur-sm border border-gold-500/10 hover:border-gold-500/30 overflow-hidden transition-all duration-300 hover:shadow-gold">
        {/* Image */}
        <Link to={`/products/${product.id}`} className="block relative overflow-hidden">
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-50/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.discountPercent > 0 && (
              <span className="px-2 py-1 rounded-lg bg-gold-500 text-dark-50 text-xs font-bold">
                -{product.discountPercent}% OFF
              </span>
            )}
            {product.organic && (
              <span className="px-2 py-1 rounded-lg bg-primary-600 text-white text-xs font-medium">
                Organic
              </span>
            )}
            {product.featured && (
              <span className="px-2 py-1 rounded-lg bg-gold-600/80 text-white text-xs font-medium">
                Featured
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <button className="w-9 h-9 rounded-lg bg-dark-50/80 backdrop-blur-sm text-white hover:text-gold-400 flex items-center justify-center transition-colors">
              <Heart className="w-4 h-4" />
            </button>
            <Link
              to={`/products/${product.id}`}
              className="w-9 h-9 rounded-lg bg-dark-50/80 backdrop-blur-sm text-white hover:text-gold-400 flex items-center justify-center transition-colors"
            >
              <Eye className="w-4 h-4" />
            </Link>
          </div>

          {/* Add to Cart Button */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={handleAddToCart}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-colors ${
                inCart
                  ? 'bg-primary-600 text-white'
                  : 'bg-gold-500 hover:bg-gold-400 text-dark-50'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{inCart ? 'Added to Cart' : 'Add to Cart'}</span>
            </button>
          </div>
        </Link>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <span className="text-xs text-primary-400 font-medium uppercase tracking-wider">
            {product.category}
          </span>

          {/* Title */}
          <Link to={`/products/${product.id}`}>
            <h3 className="text-lg font-semibold text-white mt-1 group-hover:text-gold-400 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-dark-600 text-sm mt-2 line-clamp-2">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-gold-400 fill-current" />
              <span className="text-sm text-white font-medium">{product.rating}</span>
            </div>
            <span className="text-dark-600 text-sm">({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-3">
            <span className="text-xl font-bold text-gold-400">
              {formatCurrency(discountedPrice || product.price)}
            </span>
            {discountedPrice && (
              <span className="text-sm text-dark-600 line-through">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>

          {/* Unit */}
          <span className="text-xs text-dark-600">{product.unit}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
