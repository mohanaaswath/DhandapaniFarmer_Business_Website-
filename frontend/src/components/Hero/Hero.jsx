import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Leaf, Award, Truck, Shield } from 'lucide-react';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '../../utils/constants';

const Hero = () => {
  const features = [
    {
      icon: Leaf,
      title: 'Organic Products',
      description: '100% certified organic',
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Best-in-class products',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Nationwide shipping',
    },
    {
      icon: Shield,
      title: 'Verified Sellers',
      description: 'Trusted partners only',
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Farm landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-50/95 via-dark-50/80 to-dark-50/70" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-dark-50/50" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gold-500/10 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-primary-500/10 blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20"
            >
              <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
              <span className="text-gold-400 text-sm font-medium">
                Premium Agriculture Marketplace
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div variants={fadeInUp}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight">
                <span className="text-white">Farm Fresh</span>
                <br />
                <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
                  Products & Livestock
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-lg text-dark-600 max-w-xl"
            >
              Connect with trusted farmers for premium dairy products, quality livestock, and
              fertile farm land. Experience the authentic taste of nature with our verified
              agricultural marketplace.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/products"
                className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gold-600 to-gold-500 transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative text-dark-50 font-semibold text-lg flex items-center gap-2">
                  Explore Products
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <button className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-gold-500/30 hover:border-gold-500/60 bg-dark-100/50 backdrop-blur-sm transition-all duration-200">
                <div className="w-12 h-12 rounded-full bg-gold-500/20 flex items-center justify-center group-hover:bg-gold-500/30 transition-colors">
                  <Play className="w-5 h-5 text-gold-400 ml-0.5" />
                </div>
                <div className="text-left">
                  <div className="text-white font-medium">Watch Video</div>
                  <div className="text-dark-600 text-sm">Learn about us</div>
                </div>
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-8 pt-8 border-t border-white/10"
            >
              <div>
                <div className="text-3xl font-bold text-gold-400">15K+</div>
                <div className="text-sm text-dark-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold-400">500+</div>
                <div className="text-sm text-dark-600">Verified Sellers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold-400">10K+</div>
                <div className="text-sm text-dark-600">Products Listed</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Main Image */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="col-span-2 rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src="https://images.pexels.com/photos/1174154/pexels-photo-1174154.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Fresh dairy products"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-50/50 to-transparent" />
              </motion.div>

              {/* Second Image */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src="https://images.pexels.com/photos/1435895/pexels-photo-1435895.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Fresh milk"
                  className="w-full h-40 object-cover"
                />
              </motion.div>

              {/* Third Image */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src="https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Farm produce"
                  className="w-full h-40 object-cover"
                />
              </motion.div>
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-dark-100/90 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-gold-500/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">100% Organic</div>
                  <div className="text-dark-600 text-sm">Certified Products</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Feature Strip */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 -mb-8 relative z-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="group flex items-center gap-4 p-4 rounded-xl bg-dark-100/50 backdrop-blur-sm border border-gold-500/10 hover:border-gold-500/30 hover:bg-dark-100/70 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <div className="text-white font-medium">{feature.title}</div>
                  <div className="text-dark-600 text-sm">{feature.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
