import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { useProducts } from '../../context/ProductsContext';

const DeleteConfirmModal = () => {
  const {
    isDeleteConfirmOpen,
    deletingProduct,
    closeDeleteForm,
    deleteProduct,
  } = useProducts();

  if (!isDeleteConfirmOpen || !deletingProduct) return null;

  const handleDelete = () => {
    deleteProduct(deletingProduct.id);
    closeDeleteForm();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-50/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md border rounded-2xl bg-dark-100 border-red-500/20 shadow-2xl p-6 overflow-hidden"
        >
          {/* Header Close */}
          <button
            onClick={closeDeleteForm}
            className="absolute top-4 right-4 p-1.5 transition-colors rounded-lg text-dark-600 hover:text-white hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon Header */}
          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-display">Delete Product?</h3>
              <p className="text-xs text-dark-600">This action cannot be undone.</p>
            </div>
          </div>

          {/* Message */}
          <div className="my-5">
            <p className="text-sm text-dark-600 leading-relaxed">
              Are you sure you want to delete <strong className="text-white font-semibold">"{deletingProduct.name}"</strong>? It will be permanently removed from the marketplace catalog and your inventory.
            </p>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gold-500/5">
            <button
              onClick={closeDeleteForm}
              className="px-4 py-2 rounded-xl border border-gold-500/10 hover:bg-white/5 text-white text-sm font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-bold shadow-lg shadow-red-500/10 transition-colors"
            >
              Delete Product
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;
