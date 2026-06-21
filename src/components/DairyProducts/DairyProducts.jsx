import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, ShoppingCart } from 'lucide-react';
import { dairyProducts } from '../../data/products';
import { formatCurrency, calculateDiscount } from '../../utils/helpers';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useCart } from '../../context/CartContext';

const DairyProducts = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });
  const { addToCart, isInCart } = useCart();

  return (
    <section
      id="dairy"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-dark-100/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 mb-4">
              <span className="text-gold-400 text-sm font-medium">Dairy Products</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
              Fresh <span className="text-gold-400">Farm Dairy</span>
            </h2>
            <p className="text-lg text-dark-600 max-w-2xl">
              Experience the richness of pure, farm-fresh dairy products. From milk to ghee,
              all sourced from healthy, grass-fed cattle.
            </p>
          </div>

          <Link
            to="/products"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-medium transition-colors"
          >
            View All Products
            <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Products Slider */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-6" style={{ width: 'max-content' }}>
            {dairyProducts.map((product, index) => {
              const discountedPrice = product.discountPercent
                ? calculateDiscount(product.price, product.discountPercent)
                : null;
              const inCart = isInCart(product.id);

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="w-72 flex-shrink-0"
                >
                  <div className="group rounded-2xl bg-dark-100/80 backdrop-blur-sm border border-gold-500/10 hover:border-gold-500/30 overflow-hidden transition-all duration-300 hover:shadow-gold">
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-50/80 to-transparent" />

                      {product.discountPercent > 0 && (
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-1 rounded-lg bg-gold-500 text-dark-50 text-xs font-bold">
                            -{product.discountPercent}% OFF
                          </span>
                        </div>
                      )}

                      {/* Quick Add */}
                      <button
                        onClick={() => addToCart(product)}
                        className={`absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 py-3 rounded-xl font-medium opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 ${
                          inCart
                            ? 'bg-primary-600 text-white'
                            : 'bg-gold-500 hover:bg-gold-400 text-dark-50'
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>{inCart ? 'Added' : 'Add to Cart'}</span>
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <span className="text-xs text-primary-400 font-medium uppercase tracking-wider">
                        {product.category}
                      </span>
                      <h3 className="text-lg font-semibold text-white mt-1 group-hover:text-gold-400 transition-colors">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-gold-400 fill-current" />
                          <span className="text-sm text-white">{product.rating}</span>
                        </div>
                        <span className="text-xs text-dark-600">({product.reviews})</span>
                      </div>

                      <div className="flex items-baseline gap-2 mt-3">
                        <span className="text-xl font-bold text-gold-400">
                          {formatCurrency(discountedPrice || product.price)}
                        </span>
                        {discountedPrice && (
                          <span className="text-sm text-dark-600 line-through">
                            {formatCurrency(product.price)}
                          </span>
                        )}
                        <span className="text-xs text-dark-600 ml-auto">{product.unit}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
        >
          {[
            { title: '100% Pure', desc: 'No additives' },
            { title: 'Farm Fresh', desc: 'Daily delivery' },
            { title: 'Organic', desc: 'Certified products' },
            { title: 'Hygienic', desc: 'Quality assured' },
          ].map((feature, index) => (
            <div
              key={index}
              className="text-center p-4 rounded-xl bg-dark-100/50 border border-gold-500/10"
            >
              <div className="text-white font-semibold">{feature.title}</div>
              <div className="text-sm text-dark-600">{feature.desc}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DairyProducts;
