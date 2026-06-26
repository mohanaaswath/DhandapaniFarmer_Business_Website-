import { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  // 1. Products State & Persistence
  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem('agribusiness_products');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading products from localStorage:', e);
    }
    return initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('agribusiness_products', JSON.stringify(products));
  }, [products]);

  // 2. Toast Notifications State
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // 3. Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('create'); // 'create' | 'edit'
  const [editingProduct, setEditingProduct] = useState(null);

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(null);

  const openCreateForm = () => {
    setFormMode('create');
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const openEditForm = (product) => {
    setFormMode('edit');
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const openDeleteForm = (product) => {
    setDeletingProduct(product);
    setIsDeleteConfirmOpen(true);
  };

  const closeDeleteForm = () => {
    setIsDeleteConfirmOpen(false);
    setDeletingProduct(null);
  };

  // Helper to find maximum prod-XXX ID and generate next one
  const generateNextId = () => {
    let maxNum = 0;
    products.forEach((p) => {
      if (p.id && p.id.startsWith('prod-')) {
        const numPart = p.id.substring(5);
        const parsed = parseInt(numPart, 10);
        if (!isNaN(parsed) && parsed > maxNum) {
          maxNum = parsed;
        }
      }
    });
    const nextNum = maxNum + 1;
    return `prod-${String(nextNum).padStart(3, '0')}`;
  };

  // 4. CRUD Operations
  const createProduct = (productData) => {
    try {
      const newId = generateNextId();
      const newProduct = {
        ...productData,
        id: newId,
        rating: productData.rating ?? 0,
        reviews: productData.reviews ?? 0,
        discountPercent: Number(productData.discountPercent) || 0,
        price: Number(productData.price),
        stock: Number(productData.stock),
      };

      setProducts((prev) => [newProduct, ...prev]);
      addToast(`Product "${newProduct.name}" created successfully!`, 'success');
      return true;
    } catch (e) {
      console.error(e);
      addToast('Failed to create product. Check input values.', 'error');
      return false;
    }
  };

  const updateProduct = (id, productData) => {
    try {
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id === id) {
            return {
              ...p,
              ...productData,
              price: Number(productData.price),
              stock: Number(productData.stock),
              discountPercent: Number(productData.discountPercent) || 0,
            };
          }
          return p;
        })
      );
      addToast(`Product "${productData.name}" updated successfully!`, 'success');
      return true;
    } catch (e) {
      console.error(e);
      addToast('Failed to update product.', 'error');
      return false;
    }
  };

  const deleteProduct = (id) => {
    try {
      const productToDelete = products.find((p) => p.id === id);
      if (!productToDelete) return false;

      setProducts((prev) => prev.filter((p) => p.id !== id));
      addToast(`Product "${productToDelete.name}" deleted successfully.`, 'success');
      return true;
    } catch (e) {
      console.error(e);
      addToast('Failed to delete product.', 'error');
      return false;
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        toasts,
        addToast,
        removeToast,
        // Modal Form
        isFormOpen,
        formMode,
        editingProduct,
        openCreateForm,
        openEditForm,
        closeForm,
        // Modal Delete
        isDeleteConfirmOpen,
        deletingProduct,
        openDeleteForm,
        closeDeleteForm,
        // CRUD APIs
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};
