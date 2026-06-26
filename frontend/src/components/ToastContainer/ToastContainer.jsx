import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { useProducts } from '../../context/ProductsContext';

const Toast = ({ id, message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 4000);

    return () => clearTimeout(timer);
  }, [id, onClose]);

  const config = {
    success: {
      bg: 'bg-dark-100/90 border-green-500/30 shadow-green-500/10',
      icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
      text: 'text-green-400',
    },
    error: {
      bg: 'bg-dark-100/90 border-red-500/30 shadow-red-500/10',
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      text: 'text-red-400',
    },
  };

  const current = config[type] || config.success;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.9, x: 50 }}
      animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9, x: 50, transition: { duration: 0.2 } }}
      className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl border backdrop-blur-md shadow-lg ${current.bg} min-w-[320px] max-w-[400px]`}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">{current.icon}</div>
        <p className="text-sm font-medium text-white select-none">{message}</p>
      </div>
      <button
        onClick={() => onClose(id)}
        className="text-dark-600 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

const ToastContainer = () => {
  const { toasts, removeToast } = useProducts();

  return (
    <div className="fixed top-24 right-6 z-50 flex flex-col gap-3 pointer-events-none max-h-screen overflow-hidden select-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={removeToast}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
