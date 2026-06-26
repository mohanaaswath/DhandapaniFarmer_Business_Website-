import { createContext, useContext, useState, useEffect } from 'react';
import { livestock as initialLivestock } from '../data/livestock';

const LivestockContext = createContext();

export const LivestockProvider = ({ children }) => {
  // 1. Livestock State & Persistence
  const [livestockItems, setLivestockItems] = useState(() => {
    try {
      const stored = localStorage.getItem('agribusiness_livestock');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error loading livestock from localStorage:', e);
    }
    return initialLivestock;
  });

  useEffect(() => {
    localStorage.setItem('agribusiness_livestock', JSON.stringify(livestockItems));
  }, [livestockItems]);

  // 2. Toast Notifications
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
  const [editingItem, setEditingItem] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);

  const openCreateForm = () => {
    setFormMode('create');
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const openEditForm = (item) => {
    setFormMode('edit');
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const openDeleteConfirm = (item) => {
    setDeletingItem(item);
    setIsDeleteOpen(true);
  };

  const closeDeleteConfirm = () => {
    setIsDeleteOpen(false);
    setDeletingItem(null);
  };

  // 4. Auto ID Generator
  const generateNextId = () => {
    let maxNum = 0;
    livestockItems.forEach((p) => {
      if (p.id && p.id.startsWith('ls-')) {
        const parsed = parseInt(p.id.substring(3), 10);
        if (!isNaN(parsed) && parsed > maxNum) maxNum = parsed;
      }
    });
    return `ls-${String(maxNum + 1).padStart(3, '0')}`;
  };

  // 5. CRUD Operations
  const createLivestock = (data) => {
    try {
      const newItem = {
        ...data,
        id: generateNextId(),
        seller: {
          ...data.seller,
          rating: 4.5,
        },
        createdAt: new Date().toISOString().split('T')[0],
      };
      setLivestockItems((prev) => [newItem, ...prev]);
      addToast(`Livestock "${newItem.name}" listed successfully!`, 'success');
      return true;
    } catch (e) {
      console.error(e);
      addToast('Failed to create listing. Check input values.', 'error');
      return false;
    }
  };

  const updateLivestock = (id, data) => {
    try {
      setLivestockItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                ...data,
                price: Number(data.price),
              }
            : item
        )
      );
      addToast(`Livestock "${data.name}" updated successfully!`, 'success');
      return true;
    } catch (e) {
      console.error(e);
      addToast('Failed to update listing.', 'error');
      return false;
    }
  };

  const deleteLivestock = (id) => {
    try {
      const item = livestockItems.find((p) => p.id === id);
      if (!item) return false;
      setLivestockItems((prev) => prev.filter((p) => p.id !== id));
      addToast(`"${item.name}" removed from listings.`, 'success');
      return true;
    } catch (e) {
      console.error(e);
      addToast('Failed to delete listing.', 'error');
      return false;
    }
  };

  return (
    <LivestockContext.Provider
      value={{
        livestockItems,
        toasts,
        addToast,
        removeToast,
        // Modal Form
        isFormOpen,
        formMode,
        editingItem,
        openCreateForm,
        openEditForm,
        closeForm,
        // Modal Delete
        isDeleteOpen,
        deletingItem,
        openDeleteConfirm,
        closeDeleteConfirm,
        // CRUD
        createLivestock,
        updateLivestock,
        deleteLivestock,
      }}
    >
      {children}
    </LivestockContext.Provider>
  );
};

export const useLivestock = () => {
  const context = useContext(LivestockContext);
  if (!context) throw new Error('useLivestock must be used within LivestockProvider');
  return context;
};
