import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

const Loader = ({ fullScreen = true }) => {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? 'min-h-screen bg-dark-50' : 'min-h-[200px]'
      }`}
    >
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center"
        >
          <Leaf className="w-8 h-8 text-gold-400" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4"
        >
          <span className="text-xl font-display font-bold text-white">
            Agri<span className="text-gold-400">Business</span>
          </span>
        </motion.div>

        <motion.div
          className="flex justify-center gap-1 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-gold-400"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export const SkeletonCard = () => {
  return (
    <div className="rounded-2xl bg-dark-100/50 border border-gold-500/10 overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-dark-200" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-dark-200 rounded w-1/3" />
        <div className="h-5 bg-dark-200 rounded w-3/4" />
        <div className="h-3 bg-dark-200 rounded w-full" />
        <div className="h-3 bg-dark-200 rounded w-2/3" />
        <div className="flex justify-between mt-4">
          <div className="h-6 bg-dark-200 rounded w-1/4" />
          <div className="h-8 bg-dark-200 rounded w-1/3" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
