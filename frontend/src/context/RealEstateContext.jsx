import { createContext, useContext, useState, useEffect } from 'react';
import { farmland as initialFarmland } from '../data/farmland';

const RealEstateContext = createContext();

export const RealEstateProvider = ({ children }) => {
  // 1. Real Estate State & Persistence
  const [properties, setProperties] = useState(() => {
    try {
      const stored = localStorage.getItem('agribusiness_realestate');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error loading real estate from localStorage:', e);
    }
    return initialFarmland;
  });

  useEffect(() => {
    localStorage.setItem('agribusiness_realestate', JSON.stringify(properties));
  }, [properties]);

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
    properties.forEach((p) => {
      if (p.id && p.id.startsWith('fl-')) {
        const parsed = parseInt(p.id.substring(3), 10);
        if (!isNaN(parsed) && parsed > maxNum) maxNum = parsed;
      }
    });
    return `fl-${String(maxNum + 1).padStart(3, '0')}`;
  };

  // 5. CRUD Operations
  const createProperty = (data) => {
    try {
      const newItem = {
        ...data,
        id: generateNextId(),
        owner: {
          ...data.owner,
          rating: 4.5,
        },
        createdAt: new Date().toISOString().split('T')[0],
      };
      setProperties((prev) => [newItem, ...prev]);
      addToast(`Property "${newItem.name}" listed successfully!`, 'success');
      return true;
    } catch (e) {
      console.error(e);
      addToast('Failed to create listing. Check input values.', 'error');
      return false;
    }
  };

  const updateProperty = (id, data) => {
    try {
      setProperties((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                ...data,
                price: Number(data.price),
                pricePerAcre: Number(data.pricePerAcre) || 0,
              }
            : item
        )
      );
      addToast(`Property "${data.name}" updated successfully!`, 'success');
      return true;
    } catch (e) {
      console.error(e);
      addToast('Failed to update listing.', 'error');
      return false;
    }
  };

  const deleteProperty = (id) => {
    try {
      const item = properties.find((p) => p.id === id);
      if (!item) return false;
      setProperties((prev) => prev.filter((p) => p.id !== id));
      addToast(`"${item.name}" removed from listings.`, 'success');
      return true;
    } catch (e) {
      console.error(e);
      addToast('Failed to delete listing.', 'error');
      return false;
    }
  };

  return (
    <RealEstateContext.Provider
      value={{
        properties,
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
        createProperty,
        updateProperty,
        deleteProperty,
      }}
    >
      {children}
    </RealEstateContext.Provider>
  );
};

export const useRealEstate = () => {
  const context = useContext(RealEstateContext);
  if (!context) throw new Error('useRealEstate must be used within RealEstateProvider');
  return context;
};
