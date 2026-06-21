import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Package, Beef, MapPin } from 'lucide-react';
import { STATS_DATA } from '../../utils/constants';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const AnimatedCounter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const Statistics = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });

  const stats = [
    {
      icon: Users,
      value: 15000,
      suffix: '+',
      label: 'Happy Customers',
      color: 'text-primary-400',
      bg: 'bg-primary-500/20',
    },
    {
      icon: Package,
      value: 50000,
      suffix: '+',
      label: 'Products Sold',
      color: 'text-gold-400',
      bg: 'bg-gold-500/20',
    },
    {
      icon: Beef,
      value: 8500,
      suffix: '+',
      label: 'Livestock Traded',
      color: 'text-gold-400',
      bg: 'bg-gold-500/20',
    },
    {
      icon: MapPin,
      value: 25000,
      suffix: '+',
      label: 'Acres Sold',
      color: 'text-primary-400',
      bg: 'bg-primary-500/20',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-24 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/20 via-dark-50 to-gold-900/10" />

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-1/2 -right-1/4 w-96 h-96 rounded-full border border-gold-500/10"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-1/2 -left-1/4 w-[500px] h-[500px] rounded-full border border-primary-500/10"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group text-center"
            >
              <div className="relative inline-block mb-6">
                <div
                  className={`w-20 h-20 rounded-2xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className={`w-10 h-10 ${stat.color}`} />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gold-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="text-4xl sm:text-5xl font-bold text-white mb-2"
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </motion.div>

              <p className="text-dark-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Achievement Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-gold-600/20 via-gold-500/10 to-primary-600/20 border border-gold-500/20"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
            <div className="w-16 h-16 rounded-xl bg-gold-500/20 flex items-center justify-center">
              <span className="text-4xl">🏆</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                Trusted by Farmers Across the Globe
              </h3>
              <p className="text-dark-600">
                Recognized for excellence in agricultural trading and sustainable farming practices
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;
