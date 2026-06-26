import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Plus, Trash2 } from "lucide-react";
import { useLivestock } from "../../context/LivestockContext";
import { LIVESTOCK_CATEGORIES } from "../../utils/constants";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

const LivestockFormModal = () => {
  const {
    isFormOpen,
    formMode,
    editingItem,
    closeForm,
    createLivestock,
    updateLivestock,
    addToast,
  } = useLivestock();

  const fileInputRef = useRef(null);
  const multipleFilesInputRef = useRef(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [milkYield, setMilkYield] = useState("");
  const [health, setHealth] = useState("");
  const [vaccination, setVaccination] = useState("");
  const [location, setLocation] = useState("");

  const [sellerName, setSellerName] = useState("");
  const [sellerPhone, setSellerPhone] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [sellerVerified, setSellerVerified] = useState(false);

  const [featured, setFeatured] = useState(false);

  const [imageSource, setImageSource] = useState("upload"); // 'upload' | 'url'
  const [imageUrl, setImageUrl] = useState("");
  const [mainImageFile, setMainImageFile] = useState(""); // base64
  const [additionalImages, setAdditionalImages] = useState([]); // base64[]

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isFormOpen) return;

    if (formMode === "edit" && editingItem) {
      setName(editingItem.name || "");
      setDescription(editingItem.description || "");
      setPrice(editingItem.price ?? "");
      setCategory(editingItem.category || "");
      setBreed(editingItem.breed || "");
      setAge(editingItem.age || "");
      setWeight(editingItem.weight || "");
      setMilkYield(editingItem.milkYield || "");
      setHealth(editingItem.health || "");
      setVaccination(editingItem.vaccination || "");
      setLocation(editingItem.location || "");

      setSellerName(editingItem.seller?.name || "");
      setSellerPhone(editingItem.seller?.phone || "");
      setSellerEmail(editingItem.seller?.email || "");
      setSellerVerified(!!editingItem.seller?.verified);

      setFeatured(!!editingItem.featured);

      // Images
      const imgs = Array.isArray(editingItem.images) ? editingItem.images : [];
      const main = imgs[0] || "";
      const rest = imgs.slice(1);

      if (main && String(main).startsWith("http")) {
        setImageSource("url");
        setImageUrl(main);
        setMainImageFile("");
      } else {
        setImageSource("upload");
        setMainImageFile(main);
        setImageUrl("");
      }
      setAdditionalImages(rest);
    } else {
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setBreed("");
      setAge("");
      setWeight("");
      setMilkYield("");
      setHealth("");
      setVaccination("");
      setLocation("");

      setSellerName("");
      setSellerPhone("");
      setSellerEmail("");
      setSellerVerified(false);

      setFeatured(false);

      setImageSource("upload");
      setImageUrl("");
      setMainImageFile("");
      setAdditionalImages([]);

      setErrors({});
    }

    setErrors({});
  }, [isFormOpen, formMode, editingItem]);

  const categoryOptions = useMemo(
    () => LIVESTOCK_CATEGORIES.filter((c) => c.id !== "all"),
    [],
  );

  const handleMainImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        image: "Invalid file type. Please upload a valid image.",
      }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setMainImageFile(reader.result);
      setImageUrl("");
      setErrors((prev) => ({ ...prev, image: null }));
    };
    reader.readAsDataURL(file);
  };

  const handleMultipleImagesChange = (e) => {
    const files = Array.from(e.target.files || []);
    const valid = files.filter((f) => ACCEPTED_IMAGE_TYPES.includes(f.type));

    if (valid.length === 0) {
      setErrors((prev) => ({
        ...prev,
        multipleImages: "Please upload only valid image files.",
      }));
      return;
    }

    setErrors((prev) => ({ ...prev, multipleImages: null }));

    const promises = valid.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(file);
        }),
    );

    Promise.all(promises).then((base64s) => {
      setAdditionalImages((prev) => [...prev, ...base64s]);
    });
  };

  const removeAdditionalImage = (idx) => {
    setAdditionalImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const validateForm = () => {
    const temp = {};

    if (!name.trim()) temp.name = "Animal name is required.";
    if (!description.trim()) temp.description = "Description is required.";

    const parsedPrice = Number(price);
    if (Number.isNaN(parsedPrice) || parsedPrice <= 0)
      temp.price = "Price must be greater than 0.";

    if (!category) temp.category = "Category is required.";

    if (!location.trim()) temp.location = "Location is required.";

    // Images
    if (imageSource === "upload") {
      if (!mainImageFile) temp.image = "Main image is required.";
    } else {
      if (!imageUrl.trim()) temp.image = "Main image is required.";
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      addToast("Please fix the highlighted fields.", "error");
      return;
    }

    setIsSubmitting(true);

    const finalMain =
      imageSource === "upload" ? mainImageFile : imageUrl.trim();
    const images = [finalMain, ...additionalImages.filter(Boolean)];

    const payload = {
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      category,
      breed: breed.trim() || "",
      age: age.trim() || "",
      weight: weight.trim() || "",
      milkYield: milkYield.trim() || "N/A",
      health: health.trim() || "",
      vaccination: vaccination.trim() || "",
      location: location.trim(),
      images,
      featured,
      verified: sellerVerified,
      seller: {
        name: sellerName.trim() || "Seller",
        phone: sellerPhone.trim() || "",
        email: sellerEmail.trim() || "",
        rating: 4.5,
        verified: sellerVerified,
      },
    };

    // Simulate delay
    await new Promise((r) => setTimeout(r, 500));

    let ok = false;
    if (formMode === "edit" && editingItem) {
      ok = updateLivestock(editingItem.id, payload);
    } else {
      ok = createLivestock(payload);
    }

    setIsSubmitting(false);
    if (ok) closeForm();
  };

  if (!isFormOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-dark-50/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl overflow-hidden border rounded-3xl bg-dark-100 border-gold-500/10 shadow-2xl"
        >
          <div className="flex items-center justify-between p-6 border-b border-gold-500/10">
            <div>
              <h3 className="text-2xl font-bold font-display text-white">
                {formMode === "edit"
                  ? "Edit Livestock Listing"
                  : "Add Livestock"}
              </h3>
              <p className="text-sm text-dark-600">
                {formMode === "edit"
                  ? `Modify details for ID: ${editingItem?.id}`
                  : "Enter animal and seller details below."}
              </p>
            </div>
            <button
              onClick={closeForm}
              type="button"
              className="p-2 transition-colors rounded-xl text-dark-600 hover:text-white hover:bg-white/5"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex-1 max-h-[85vh] overflow-y-auto p-6 space-y-6"
          >
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-600 mb-2">
                  Animal Name <span className="text-red-500">*</span>
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Gir Cow"
                  className={`w-full px-4 py-3 rounded-xl bg-dark-50 border text-white placeholder-dark-600 focus:outline-none focus:ring-2 transition-all ${
                    errors.name
                      ? "border-red-500/50 focus:ring-red-500/20"
                      : "border-gold-500/20 focus:border-gold-500/50 focus:ring-gold-500/20"
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-400 mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-600 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl bg-dark-50 border text-white focus:outline-none focus:ring-2 transition-all cursor-pointer ${
                    errors.category
                      ? "border-red-500/50 focus:ring-red-500/20"
                      : "border-gold-500/20 focus:border-gold-500/50 focus:ring-gold-500/20"
                  }`}
                >
                  <option value="" disabled className="bg-dark-100">
                    Select Category
                  </option>
                  {categoryOptions.map((c) => (
                    <option
                      key={c.id}
                      value={c.id}
                      className="bg-dark-100 text-white"
                    >
                      {c.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-xs text-red-400 mt-1">{errors.category}</p>
                )}
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-600 mb-2">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="any"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 8000"
                  className={`w-full px-4 py-3 rounded-xl bg-dark-50 border text-white placeholder-dark-600 focus:outline-none focus:ring-2 transition-all ${
                    errors.price
                      ? "border-red-500/50 focus:ring-red-500/20"
                      : "border-gold-500/20 focus:border-gold-500/50 focus:ring-gold-500/20"
                  }`}
                />
                {errors.price && (
                  <p className="text-xs text-red-400 mt-1">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-600 mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Tirupur, Tamil Nadu"
                  className={`w-full px-4 py-3 rounded-xl bg-dark-50 border text-white placeholder-dark-600 focus:outline-none focus:ring-2 transition-all ${
                    errors.location
                      ? "border-red-500/50 focus:ring-red-500/20"
                      : "border-gold-500/20 focus:border-gold-500/50 focus:ring-gold-500/20"
                  }`}
                />
                {errors.location && (
                  <p className="text-xs text-red-400 mt-1">{errors.location}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-dark-600 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Health, breed highlights, quality details..."
                className={`w-full px-4 py-3 rounded-xl bg-dark-50 border text-white placeholder-dark-600 focus:outline-none focus:ring-2 transition-all resize-none ${
                  errors.description
                    ? "border-red-500/50 focus:ring-red-500/20"
                    : "border-gold-500/20 focus:border-gold-500/50 focus:ring-gold-500/20"
                }`}
              />
              {errors.description && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Specs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-600 mb-2">
                  Breed
                </label>
                <input
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  placeholder="e.g. Sahiwal"
                  className="w-full px-4 py-3 rounded-xl bg-dark-50 border border-gold-500/20 text-white placeholder-dark-600 focus:outline-none focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-600 mb-2">
                  Age
                </label>
                <input
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 5 Years"
                  className="w-full px-4 py-3 rounded-xl bg-dark-50 border border-gold-500/20 text-white placeholder-dark-600 focus:outline-none focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-600 mb-2">
                  Weight
                </label>
                <input
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 450 Kg"
                  className="w-full px-4 py-3 rounded-xl bg-dark-50 border border-gold-500/20 text-white placeholder-dark-600 focus:outline-none focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-600 mb-2">
                  Milk Yield
                </label>
                <input
                  value={milkYield}
                  onChange={(e) => setMilkYield(e.target.value)}
                  placeholder="e.g. 15-20 L/day"
                  className="w-full px-4 py-3 rounded-xl bg-dark-50 border border-gold-500/20 text-white placeholder-dark-600 focus:outline-none focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-600 mb-2">
                  Health Status
                </label>
                <input
                  value={health}
                  onChange={(e) => setHealth(e.target.value)}
                  placeholder="e.g. Excellent"
                  className="w-full px-4 py-3 rounded-xl bg-dark-50 border border-gold-500/20 text-white placeholder-dark-600 focus:outline-none focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-600 mb-2">
                  Vaccination Status
                </label>
                <input
                  value={vaccination}
                  onChange={(e) => setVaccination(e.target.value)}
                  placeholder="e.g. Complete"
                  className="w-full px-4 py-3 rounded-xl bg-dark-50 border border-gold-500/20 text-white placeholder-dark-600 focus:outline-none focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/20"
                />
              </div>
            </div>

            {/* Seller */}
            <div className="p-5 rounded-2xl bg-dark-50 border border-gold-500/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-semibold">
                    Seller Information
                  </h4>
                  <p className="text-xs text-dark-600">
                    Rating is auto-generated. Verified status can be toggled.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-600 mb-2">
                    Seller Name
                  </label>
                  <input
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                    placeholder="e.g. Mohan"
                    className="w-full px-4 py-3 rounded-xl bg-dark-50 border border-gold-500/20 text-white placeholder-dark-600 focus:outline-none focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-600 mb-2">
                    Phone Number
                  </label>
                  <input
                    value={sellerPhone}
                    onChange={(e) => setSellerPhone(e.target.value)}
                    placeholder="e.g. +91 9XXXXXXXXX"
                    className="w-full px-4 py-3 rounded-xl bg-dark-50 border border-gold-500/20 text-white placeholder-dark-600 focus:outline-none focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-600 mb-2">
                    Email
                  </label>
                  <input
                    value={sellerEmail}
                    onChange={(e) => setSellerEmail(e.target.value)}
                    placeholder="e.g. name@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-dark-50 border border-gold-500/20 text-white placeholder-dark-600 focus:outline-none focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/20"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-dark-100/40 border border-gold-500/10">
                <div>
                  <span className="block text-sm font-semibold text-white">
                    Verified Seller
                  </span>
                  <span className="text-xs text-dark-600">
                    Show Verified badge on listing cards.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSellerVerified((v) => !v)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                    sellerVerified ? "bg-primary-600" : "bg-dark-300"
                  }`}
                >
                  <motion.span
                    animate={{ x: sellerVerified ? 26 : 2 }}
                    className="absolute top-1 left-0.5 w-4 h-4 bg-white rounded-full shadow"
                  />
                </button>
              </div>
            </div>

            {/* Images */}
            <div className="p-5 rounded-2xl bg-dark-50 border border-gold-500/10 space-y-4">
              <div>
                <h4 className="text-white font-semibold">Listing Images</h4>
                <p className="text-xs text-dark-600">
                  Main image is required. Additional images are optional.
                </p>
              </div>

              <div className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">
                    Main Image
                  </span>
                  <span className="text-red-500 text-sm">*</span>
                </div>

                <div className="flex bg-dark-100 rounded-lg p-0.5 border border-gold-500/10">
                  <button
                    type="button"
                    onClick={() => setImageSource("upload")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                      imageSource === "upload"
                        ? "bg-gold-500 text-dark-50"
                        : "text-dark-600 hover:text-white"
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Upload
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageSource("url")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                      imageSource === "url"
                        ? "bg-gold-500 text-dark-50"
                        : "text-dark-600 hover:text-white"
                    }`}
                  >
                    <span className="w-3.5 h-3.5 inline-flex items-center justify-center text-lg">
                      ↗
                    </span>
                    Image URL
                  </button>
                </div>
              </div>

              {imageSource === "upload" ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all hover:bg-white/5 ${
                    errors.image
                      ? "border-red-500/40 bg-red-500/5"
                      : mainImageFile
                        ? "border-gold-500/40 bg-gold-500/5"
                        : "border-gold-500/15"
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
                    <div className="relative w-44 h-32 rounded-xl overflow-hidden border border-gold-500/30">
                      <img
                        src={mainImageFile}
                        alt="Main preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMainImageFile("");
                        }}
                        className="absolute top-2 right-2 p-1 bg-dark-50/80 rounded-md text-red-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-gold-400 mx-auto mb-2 opacity-80" />
                      <p className="text-sm text-white font-medium">
                        Click to upload livestock image
                      </p>
                      <p className="text-xs text-dark-600 mt-1">
                        PNG, JPG, JPEG, WEBP
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      setErrors((prev) => ({ ...prev, image: null }));
                    }}
                    placeholder="https://images.pexels.com/photos/..."
                    className={`w-full px-4 py-3 rounded-xl bg-dark-100 border text-white placeholder-dark-600 focus:outline-none focus:ring-2 transition-all ${
                      errors.image
                        ? "border-red-500/50 focus:ring-red-500/20"
                        : "border-gold-500/20 focus:border-gold-500/50 focus:ring-gold-500/20"
                    }`}
                  />
                  {imageUrl && (
                    <div className="mt-3 relative w-52 h-36 rounded-xl overflow-hidden border border-gold-500/30">
                      <img
                        src={imageUrl}
                        alt="Main preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              )}

              {errors.image && (
                <p className="text-xs text-red-400">{errors.image}</p>
              )}

              <div className="pt-2 border-t border-gold-500/10">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <label className="block text-sm font-medium text-white">
                      Multiple Images
                    </label>
                    <p className="text-xs text-dark-600">
                      Upload additional photos for the gallery.
                    </p>
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
                  <p className="text-xs text-red-400 mt-2">
                    {errors.multipleImages}
                  </p>
                )}

                {additionalImages.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 pt-3">
                    {additionalImages.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-video rounded-lg overflow-hidden border border-gold-500/15 group"
                      >
                        <img
                          src={img}
                          alt={`Gallery ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
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
            </div>

            {/* Featured / Verified */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-dark-50 border border-gold-500/10">
                <div>
                  <span className="block text-sm font-semibold text-white">
                    Featured Listing
                  </span>
                  <span className="text-xs text-dark-600">
                    Highlight in marketplace.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setFeatured((v) => !v)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                    featured ? "bg-gold-500" : "bg-dark-300"
                  }`}
                >
                  <motion.span
                    animate={{ x: featured ? 26 : 2 }}
                    className="absolute top-1 left-0.5 w-4 h-4 bg-white rounded-full shadow"
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-dark-50 border border-gold-500/10">
                <div>
                  <span className="block text-sm font-semibold text-white">
                    Verified Listing
                  </span>
                  <span className="text-xs text-dark-600">
                    Show Verified badge for listing.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSellerVerified((v) => !v)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                    sellerVerified ? "bg-primary-600" : "bg-dark-300"
                  }`}
                >
                  <motion.span
                    animate={{ x: sellerVerified ? 26 : 2 }}
                    className="absolute top-1 left-0.5 w-4 h-4 bg-white rounded-full shadow"
                  />
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={closeForm}
                className="px-5 py-2.5 rounded-xl border border-gold-500/15 hover:bg-white/5 text-white font-semibold transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-dark-50 font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? "Saving..."
                  : formMode === "edit"
                    ? "Save Listing"
                    : "Create Livestock Listing"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LivestockFormModal;
