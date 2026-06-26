import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Plus, Trash2, Loader2, Link2 } from 'lucide-react';
import { useProducts } from '../../context/ProductsContext';
import { PRODUCT_CATEGORIES } from '../../utils/constants';

const ProductFormModal = () => {
  const {
    isFormOpen,
    formMode,
    editingProduct,
    closeForm,
    createProduct,
    updateProduct,
  } = useProducts();

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountPercent, setDiscountPercent] = useState('0');
  const [category, setCategory] = useState('');
  const [unitType, setUnitType] = useState('kg'); // kg, g, L, pcs, custom
  const [customUnit, setCustomUnit] = useState('');
  const [stock, setStock] = useState('');
  const [featured, setFeatured] = useState(false);
  const [organic, setOrganic] = useState(false);
  const [freshnessType, setFreshnessType] = useState('Daily'); // Daily, Weekly, Seasonal, Custom
  const [customFreshness, setCustomFreshness] = useState('');

  // Image Upload States
  const [imageSource, setImageSource] = useState('upload'); // 'upload' | 'url'
  const [imageUrl, setImageUrl] = useState('');
  const [mainImageFile, setMainImageFile] = useState(''); // Holds base64
  const [additionalImages, setAdditionalImages] = useState([]); // Holds array of base64

  // Rating/Reviews Default values (editable or defaults)
  const [rating, setRating] = useState('0');
  const [reviews, setReviews] = useState('0');

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const fileInputRef = useRef(null);
  const multipleFilesInputRef = useRef(null);

  // Load editing product details if in 'edit' mode
  useEffect(() => {
    if (isFormOpen) {
      if (formMode === 'edit' && editingProduct) {
        setName(editingProduct.name || '');
        setDescription(editingProduct.description || '');
        setPrice(editingProduct.price || '');
        setDiscountPercent(editingProduct.discountPercent || '0');
        setCategory(editingProduct.category || '');
        
        // Handle unit
        const u = editingProduct.unit || '';
        if (['g', 'kg', 'L', 'pcs'].includes(u)) {
          setUnitType(u);
          setCustomUnit('');
        } else {
          setUnitType('custom');
          setCustomUnit(u);
        }

        setStock(editingProduct.stock || '');
        setFeatured(!!editingProduct.featured);
        setOrganic(!!editingProduct.organic);

        // Handle freshness
        const f = editingProduct.freshness || '';
        if (['Daily', 'Weekly', 'Seasonal'].includes(f)) {
          setFreshnessType(f);
          setCustomFreshness('');
        } else {
          setFreshnessType('Custom');
          setCustomFreshness(f);
        }

        // Ratings and reviews
        setRating(editingProduct.rating || '0');
        setReviews(editingProduct.reviews || '0');

        // Images
        if (editingProduct.image && editingProduct.image.startsWith('http')) {
          setImageSource('url');
          setImageUrl(editingProduct.image);
          setMainImageFile('');
        } else {
          setImageSource('upload');
          setMainImageFile(editingProduct.image || '');
          setImageUrl('');
        }
        setAdditionalImages(editingProduct.images || []);
      } else {
        // Reset form for 'create' mode
        setName('');
        setDescription('');
        setPrice('');
        setDiscountPercent('0');
        setCategory('');
        setUnitType('kg');
        setCustomUnit('');
        setStock('');
        setFeatured(false);
        setOrganic(false);
        setFreshnessType('Daily');
        setCustomFreshness('');
        setImageSource('upload');
        setImageUrl('');
        setMainImageFile('');
        setAdditionalImages([]);
        setRating('0');
        setReviews('0');
      }
      setErrors({});
    }
  }, [isFormOpen, formMode, editingProduct]);

  if (!isFormOpen) return null;

  // Image Upload/Conversion handlers
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors((prev) => ({ ...prev, image: 'Please upload a valid image file.' }));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setMainImageFile(reader.result);
        setErrors((prev) => ({ ...prev, image: null }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMultipleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter((f) => f.type.startsWith('image/'));

    if (validImages.length === 0) {
      setErrors((prev) => ({ ...prev, multipleImages: 'Please upload only valid image files.' }));
      return;
    }

    setErrors((prev) => ({ ...prev, multipleImages: null }));
    const promises = validImages.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((base64s) => {
      setAdditionalImages((prev) => [...prev, ...base64s]);
    });
  };

  const removeAdditionalImage = (indexToRemove) => {
    setAdditionalImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Validations
  const validateForm = () => {
    const tempErrors = {};
    if (!name.trim()) tempErrors.name = 'Product name is required.';
    if (!description.trim()) tempErrors.description = 'Description is required.';
    if (!category) tempErrors.category = 'Category is required.';
    
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      tempErrors.price = 'Price must be a valid number greater than 0.';
    }

    const parsedStock = parseInt(stock, 10);
    if (isNaN(parsedStock) || parsedStock < 0) {
      tempErrors.stock = 'Stock quantity cannot be negative.';
    }

    const parsedDiscount = parseFloat(discountPercent);
    if (isNaN(parsedDiscount) || parsedDiscount < 0 || parsedDiscount > 100) {
      tempErrors.discountPercent = 'Discount must be between 0 and 100.';
    }

    // Main Image Required
    if (imageSource === 'upload' && !mainImageFile) {
      tempErrors.image = 'Product image file is required.';
    } else if (imageSource === 'url' && !imageUrl.trim()) {
      tempErrors.image = 'Product image URL is required.';
    }

    // Custom unit required if selected
    if (unitType === 'custom' && !customUnit.trim()) {
      tempErrors.customUnit = 'Please specify custom unit.';
    }

    // Custom freshness required if selected
    if (freshnessType === 'Custom' && !customFreshness.trim()) {
      tempErrors.customFreshness = 'Please specify custom freshness details.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Prepare product object
    const finalUnit = unitType === 'custom' ? customUnit : unitType;
    const finalFreshness = freshnessType === 'Custom' ? customFreshness : freshnessType;
    const finalImage = imageSource === 'upload' ? mainImageFile : imageUrl;

    // Ensure main image is in the images list
    const finalImages = [finalImage, ...additionalImages.filter((img) => img !== finalImage)];

    const productPayload = {
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      discountPercent: parseFloat(discountPercent) || 0,
      category,
      unit: finalUnit,
      stock: parseInt(stock, 10),
      featured,
      organic,
      freshness: finalFreshness,
      image: finalImage,
      images: finalImages,
      rating: parseFloat(rating) || 0,
      reviews: parseInt(reviews, 10) || 0,
    };

    // Simulate database API delay (premium UX spinner)
    await new Promise((resolve) => setTimeout(resolve, 800));

    let success = false;
    if (formMode === 'edit' && editingProduct) {
      success = updateProduct(editingProduct.id, productPayload);
    } else {
      success = createProduct(productPayload);
    }

    setIsSubmitting(false);
    if (success) {
      closeForm();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-dark-50/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl overflow-hidden border rounded-3xl bg-dark-100 border-gold-500/10 shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gold-500/10">
            <div>
              <h3 className="text-2xl font-bold font-display text-white">
                {formMode === 'edit' ? 'Edit Product Details' : 'Add New Product'}
              </h3>
              <p className="text-sm text-dark-600">
                {formMode === 'edit'
                  ? `Modify details for product ID: ${editingProduct?.id}`
                  : 'Specify agricultural product details below.'}
              </p>
            </div>
            <button
              onClick={closeForm}
              className="p-2 transition-colors rounded-xl text-dark-600 hover:text-white hover:bg-white/5"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form Content - Scrollable */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Row 1: Product Name & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-600 mb-2">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Premium Groundnut"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl bg-dark-50 border text-white placeholder-dark-600 focus:outline-none focus:ring-2 transition-all ${
                    errors.name
                      ? 'border-red-500/50 focus:ring-red-500/20'
                      : 'border-gold-500/20 focus:border-gold-500/50 focus:ring-gold-500/20'
                  }`}
                />
                {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-600 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl bg-dark-50 border text-white placeholder-dark-600 focus:outline-none focus:ring-2 transition-all cursor-pointer ${
                    errors.category
                      ? 'border-red-500/50 focus:ring-red-500/20'
                      : 'border-gold-500/20 focus:border-gold-500/50 focus:ring-gold-500/20'
                  }`}
                >
                  <option value="" disabled className="text-dark-600">Select Category</option>
                  {PRODUCT_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-dark-100 text-white">
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="text-xs text-red-400 mt-1">{errors.category}</p>}
              </div>
            </div>

            {/* Row 2: Price, Discount & Stock */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-600 mb-2">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="any"
                  placeholder="e.g. 150"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl bg-dark-50 border text-white placeholder-dark-600 focus:outline-none focus:ring-2 transition-all ${
                    errors.price
                      ? 'border-red-500/50 focus:ring-red-500/20'
                      : 'border-gold-500/20 focus:border-gold-500/50 focus:ring-gold-500/20'
                  }`}
                />
                {errors.price && <p className="text-xs text-red-400 mt-1">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-600 mb-2">
                  Discount Percentage (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="e.g. 10"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl bg-dark-50 border text-white placeholder-dark-600 focus:outline-none focus:ring-2 transition-all ${
                    errors.discountPercent
                      ? 'border-red-500/50 focus:ring-red-500/20'
                      : 'border-gold-500/20 focus:border-gold-500/50 focus:ring-gold-500/20'
                  }`}
                />
                {errors.discountPercent && (
                  <p className="text-xs text-red-400 mt-1">{errors.discountPercent}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-600 mb-2">
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="e.g. 50"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl bg-dark-50 border text-white placeholder-dark-600 focus:outline-none focus:ring-2 transition-all ${
                    errors.stock
                      ? 'border-red-500/50 focus:ring-red-500/20'
                      : 'border-gold-500/20 focus:border-gold-500/50 focus:ring-gold-500/20'
                  }`}
                />
                {errors.stock && <p className="text-xs text-red-400 mt-1">{errors.stock}</p>}
              </div>
            </div>

            {/* Row 3: Unit Selection & Freshness Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-600 mb-2">
                  Selling Unit <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  <select
                    value={unitType}
                    onChange={(e) => setUnitType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-dark-50 border border-gold-500/20 text-white focus:outline-none focus:border-gold-500/50 cursor-pointer"
                  >
                    <option value="kg">Kilogram (kg)</option>
                    <option value="g">Gram (g)</option>
                    <option value="L">Litre (L)</option>
                    <option value="pcs">Piece (pcs)</option>
                    <option value="custom">Custom Unit</option>
                  </select>
                  {unitType === 'custom' && (
                    <input
                      type="text"
                      placeholder="e.g. per bunch, pack of 4"
                      value={customUnit}
                      onChange={(e) => setCustomUnit(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl bg-dark-50 border text-white placeholder-dark-600 focus:outline-none focus:ring-2 transition-all ${
                        errors.customUnit
                          ? 'border-red-500/50 focus:ring-red-500/20'
                          : 'border-gold-500/20 focus:border-gold-500/50'
                      }`}
                    />
                  )}
                  {errors.customUnit && <p className="text-xs text-red-400 mt-1">{errors.customUnit}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-600 mb-2">
                  Freshness Information
                </label>
                <div className="space-y-2">
                  <select
                    value={freshnessType}
                    onChange={(e) => setFreshnessType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-dark-50 border border-gold-500/20 text-white focus:outline-none focus:border-gold-500/50 cursor-pointer"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Seasonal">Seasonal</option>
                    <option value="Custom">Custom Freshness</option>
                  </select>
                  {freshnessType === 'Custom' && (
                    <input
                      type="text"
                      placeholder="e.g. Aged 2 years, New Crop"
                      value={customFreshness}
                      onChange={(e) => setCustomFreshness(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl bg-dark-50 border text-white placeholder-dark-600 focus:outline-none focus:ring-2 transition-all ${
                        errors.customFreshness
                          ? 'border-red-500/50 focus:ring-red-500/20'
                          : 'border-gold-500/20 focus:border-gold-500/50'
                      }`}
                    />
                  )}
                  {errors.customFreshness && (
                    <p className="text-xs text-red-400 mt-1">{errors.customFreshness}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Row 4: Description */}
            <div>
              <label className="block text-sm font-medium text-dark-600 mb-2">
                Product Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="Details about product sourcing, packaging, health benefits..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl bg-dark-50 border text-white placeholder-dark-600 focus:outline-none focus:ring-2 transition-all resize-none ${
                  errors.description
                    ? 'border-red-500/50 focus:ring-red-500/20'
                    : 'border-gold-500/20 focus:border-gold-500/50 focus:ring-gold-500/20'
                }`}
              />
              {errors.description && <p className="text-xs text-red-400 mt-1">{errors.description}</p>}
            </div>

            {/* Row 5: Main Product Image Upload / Url */}
            <div className="p-5 rounded-2xl bg-dark-50 border border-gold-500/10 space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-white">
                  Main Product Image <span className="text-red-500">*</span>
                </label>
                <div className="flex bg-dark-100 rounded-lg p-0.5 border border-gold-500/10">
                  <button
                    type="button"
                    onClick={() => setImageSource('upload')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                      imageSource === 'upload'
                        ? 'bg-gold-500 text-dark-50'
                        : 'text-dark-600 hover:text-white'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Upload File
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageSource('url')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                      imageSource === 'url'
                        ? 'bg-gold-500 text-dark-50'
                        : 'text-dark-600 hover:text-white'
                    }`}
                  >
                    <Link2 className="w-3.5 h-3.5" />
                    Image URL
                  </button>
                </div>
              </div>

              {imageSource === 'upload' ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all hover:bg-white/5 ${
                    errors.image
                      ? 'border-red-500/40 bg-red-500/5'
                      : mainImageFile
                      ? 'border-gold-500/40 bg-gold-500/5'
                      : 'border-gold-500/15'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleMainImageChange}
                    className="hidden"
                  />
                  {mainImageFile ? (
                    <div className="relative w-36 h-28 rounded-lg overflow-hidden border border-gold-500/30">
                      <img src={mainImageFile} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMainImageFile('');
                        }}
                        className="absolute top-1 right-1 p-1 bg-dark-50/80 rounded-md text-red-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-gold-400 mx-auto mb-2 opacity-80" />
                      <p className="text-sm text-white font-medium">Click to upload product image</p>
                      <p className="text-xs text-dark-600 mt-1">Supports PNG, JPG, JPEG, WEBP</p>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <input
                    type="url"
                    placeholder="https://images.pexels.com/photos/..."
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      setErrors((prev) => ({ ...prev, image: null }));
                    }}
                    className={`w-full px-4 py-3 rounded-xl bg-dark-100 border text-white placeholder-dark-600 focus:outline-none focus:ring-2 transition-all ${
                      errors.image
                        ? 'border-red-500/50 focus:ring-red-500/20'
                        : 'border-gold-500/20 focus:border-gold-500/50'
                    }`}
                  />
                  {imageUrl && (
                    <div className="mt-3 relative w-36 h-28 rounded-lg overflow-hidden border border-gold-500/30">
                      <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              )}
              {errors.image && <p className="text-xs text-red-400 mt-0.5">{errors.image}</p>}
            </div>

            {/* Row 6: Multiple Product Images Upload */}
            <div className="p-5 rounded-2xl bg-dark-50 border border-gold-500/10 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <label className="block text-sm font-medium text-white">
                    Additional Product Gallery Images
                  </label>
                  <p className="text-xs text-dark-600 mt-0.5">Upload other views or details of the product.</p>
                </div>
                <button
                  type="button"
                  onClick={() => multipleFilesInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-100 text-gold-400 hover:text-gold-300 font-semibold text-xs border border-gold-500/10 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Files
                </button>
                <input
                  type="file"
                  ref={multipleFilesInputRef}
                  accept="image/*"
                  multiple
                  onChange={handleMultipleImagesChange}
                  className="hidden"
                />
              </div>

              {errors.multipleImages && (
                <p className="text-xs text-red-400 mt-0.5">{errors.multipleImages}</p>
              )}

              {additionalImages.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 pt-2">
                  {additionalImages.map((img, idx) => (
                    <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-gold-500/15 group">
                      <img src={img} alt={`Gallery Preview ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeAdditionalImage(idx)}
                        className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-500 font-bold"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Row 7: Toggles (Featured & Organic) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-dark-50 border border-gold-500/10">
                <div>
                  <span className="block text-sm font-semibold text-white">Organic Product</span>
                  <span className="text-xs text-dark-600">Grown without harmful chemicals.</span>
                </div>
                <button
                  type="button"
                  onClick={() => setOrganic(!organic)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                    organic ? 'bg-primary-600' : 'bg-dark-300'
                  }`}
                >
                  <motion.span
                    animate={{ x: organic ? 26 : 2 }}
                    className="absolute top-1 left-0.5 w-4 h-4 bg-white rounded-full shadow"
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-dark-50 border border-gold-500/10">
                <div>
                  <span className="block text-sm font-semibold text-white">Featured Product</span>
                  <span className="text-xs text-dark-600">Highlight at top of listings.</span>
                </div>
                <button
                  type="button"
                  onClick={() => setFeatured(!featured)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                    featured ? 'bg-gold-500' : 'bg-dark-300'
                  }`}
                >
                  <motion.span
                    animate={{ x: featured ? 26 : 2 }}
                    className="absolute top-1 left-0.5 w-4 h-4 bg-white rounded-full shadow"
                  />
                </button>
              </div>
            </div>

            {/* Row 8: Optional Custom Rating / Reviews Inputs in Edit mode */}
            {formMode === 'edit' && (
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-dark-50/50 border border-gold-500/5">
                <div>
                  <label className="block text-xs font-semibold text-dark-600 mb-1">
                    Rating (0 - 5)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-dark-100 border border-gold-500/15 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-dark-600 mb-1">
                    Number of Reviews
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={reviews}
                    onChange={(e) => setReviews(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-dark-100 border border-gold-500/15 text-white text-sm"
                  />
                </div>
              </div>
            )}
          </form>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gold-500/10 bg-dark-100">
            <button
              type="button"
              onClick={closeForm}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl border border-gold-500/15 hover:bg-white/5 text-white font-semibold transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-dark-50 font-bold transition-all flex items-center gap-2 shadow-gold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : formMode === 'edit' ? (
                'Save Changes'
              ) : (
                'Create Product'
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductFormModal;
