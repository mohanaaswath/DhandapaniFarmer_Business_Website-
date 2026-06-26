import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Plus, Trash2 } from "lucide-react";
import { useRealEstate } from "../../context/RealEstateContext";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

const toArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return String(value)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
};

const RealEstateFormModal = () => {
  const {
    isFormOpen,
    formMode,
    editingItem,
    closeForm,
    createProperty,
    updateProperty,
    addToast,
  } = useRealEstate();

  const fileInputRef = useRef(null);
  const multipleFilesInputRef = useRef(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [pricePerAcre, setPricePerAcre] = useState("");
  const [location, setLocation] = useState("");
  const [waterSource, setWaterSource] = useState("");
  const [soilType, setSoilType] = useState("");
  const [suitableForText, setSuitableForText] = useState("");
  const [amenitiesText, setAmenitiesText] = useState("");

  const [featured, setFeatured] = useState(false);
  const [verified, setVerified] = useState(false);

  // Owner
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerVerified, setOwnerVerified] = useState(false);

  // Images
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
      setSize(editingItem.size || "");
      setPricePerAcre(editingItem.pricePerAcre ?? "");
      setLocation(editingItem.location || "");
      setWaterSource(editingItem.waterSource || "");
      setSoilType(editingItem.soilType || "");
      setSuitableForText((editingItem.suitable_for || []).join(", "));
      setAmenitiesText((editingItem.amenities || []).join(", "));

      setFeatured(!!editingItem.featured);
      setVerified(!!editingItem.verified);

      setOwnerName(editingItem.owner?.name || "");
      setOwnerPhone(editingItem.owner?.phone || "");
      setOwnerEmail(editingItem.owner?.email || "");
      setOwnerVerified(!!editingItem.owner?.verified);

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
      setSize("");
      setPricePerAcre("");
      setLocation("");
      setWaterSource("");
      setSoilType("");
      setSuitableForText("");
      setAmenitiesText("");

      setFeatured(false);
      setVerified(false);

      setOwnerName("");
      setOwnerPhone("");
      setOwnerEmail("");
      setOwnerVerified(false);

      setImageSource("upload");
      setImageUrl("");
      setMainImageFile("");
      setAdditionalImages([]);
      setErrors({});
    }

    setErrors({});
  }, [isFormOpen, formMode, editingItem]);

  const handleMainImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setErrors((prev) => ({ ...prev, image: "Invalid file type." }));
      return;
    }

    try {
      // Reduce weight: resize + re-encode to JPEG (lower quality)
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      await new Promise((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = objectUrl;
      });

      const maxW = 1200; // keep reasonably sharp
      const scale = Math.min(1, maxW / img.width);
      const targetW = Math.max(1, Math.round(img.width * scale));
      const targetH = Math.max(1, Math.round(img.height * scale));

      const canvas = document.createElement("canvas");
      canvas.width = targetW;
      canvas.height = targetH;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas 2D context not available");
      ctx.drawImage(img, 0, 0, targetW, targetH);

      // Convert to compressed JPEG
      const dataUrl = canvas.toDataURL("image/jpeg", 0.75);

      setMainImageFile(dataUrl);
      setImageUrl("");
      setErrors((prev) => ({ ...prev, image: null }));

      URL.revokeObjectURL(objectUrl);
    } catch (err) {
      // Fallback to original behavior if compression fails
      const reader = new FileReader();
      reader.onload = () => {
        setMainImageFile(reader.result);
        setImageUrl("");
        setErrors((prev) => ({ ...prev, image: null }));
      };
      reader.readAsDataURL(file);
    }
  };


  const handleMultipleImagesChange = (e) => {
    const files = Array.from(e.target.files || []);
    const valid = files.filter((f) => ACCEPTED_IMAGE_TYPES.includes(f.type));

    if (valid.length === 0) {
      setErrors((prev) => ({ ...prev, multipleImages: "Invalid image files." }));
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
    const tempErrors = {};

    if (!name.trim()) tempErrors.name = "Property name is required.";
    if (!description.trim()) tempErrors.description = "Description is required.";

    const parsedPrice = Number(price);
    if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      tempErrors.price = "Total price must be greater than 0.";
    }

    if (!size.trim()) tempErrors.size = "Land size is required.";

    if (!location.trim()) tempErrors.location = "Location is required.";

    if (imageSource === "upload") {
      if (!mainImageFile) tempErrors.image = "Main image file is required.";
    } else {
      if (!imageUrl.trim()) tempErrors.image = "Main image URL is required.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      addToast("Please fix the highlighted fields.", "error");
      return;
    }

    setIsSubmitting(true);

    const finalMain = imageSource === "upload" ? mainImageFile : imageUrl.trim();
    const images = [finalMain, ...additionalImages.filter(Boolean)];

    const payload = {
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      size: size.trim(),
      pricePerAcre: Number(pricePerAcre) || 0,
      location: location.trim(),
      waterSource: waterSource.trim(),
      soilType: soilType.trim(),
      suitable_for: toArray(suitableForText),
      amenities: toArray(amenitiesText),
      images,
      featured,
      verified,
      owner: {
        name: ownerName.trim() || "Owner",
        phone: ownerPhone.trim(),
        email: ownerEmail.trim(),
        rating: 4.5,
        verified: ownerVerified,
      },
    };

    await new Promise((r) => setTimeout(r, 500));

    let ok = false;
    if (formMode === "edit" && editingItem) {
      ok = updateProperty(editingItem.id, payload);
    } else {
      ok = createProperty(payload);
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
                {formMode === "edit" ? "Edit Real Estate Listing" : "Add Real Estate"}
              </h3>
              <p className="text-sm text-dark-600">
                {formMode === "edit"
                  ? `Modify details for ID: ${editingItem?.id}`
                  : "Enter property and owner details below."}
              </p>
            </div>
            <button
              type="button"
              onClick={closeForm}
              className="p-2 transition-colors rounded-xl text-dark-600 hover:text-white hover:bg-white/5"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 max-h-[85vh] overflow-y-auto p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-600 mb-2">
                  Property Name <span className="text-red-500">*</span>
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Organic Farm Estate - 25 Acres"
                  className={`w-full px-4 py-3 rounded-xl bg-dark-50 border text-white placeholder-dark-600 focus:outline-none focus:ring-2 transition-all ${
                    errors.name
                      ? "border-red-500/50 focus:ring-red-500/20"
                      : "border-gold-500/20 focus:border-gold-500/50 focus:ring-gold-500/20"
                  }`}
                />
                {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-600 mb-2">
                  Land Size <span className="text-red-500">*</span>
                </label>
                <input
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  placeholder="e.g. 25 Acres"
                  className={`w-full px-4 py-3 rounded-xl bg-dark-50 border text-white placeholder-dark-600 focus:outline-none focus:ring-2 transition-all ${
                    errors.size
                      ? "border-red-500/50 focus:ring-red-500/20"
                      : "border-gold-500/20 focus:border-gold-500/50 focus:ring-gold-500/20"
                  }`}
                />
                {errors.size && <p className="text-xs text-red-400 mt-1">{errors.size}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-600 mb-2">
                  Total Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="any"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 175000"
                  className={`w-full px-4 py-3 rounded-xl bg-dark-50 border text-white placeholder-dark-600 focus:outline-none focus:ring-2 transition-all ${
                    errors.price
                      ? "border-red-500/50 focus:ring-red-500/20"
                      : "border-gold-500/20 focus:border-gold-500/50 focus:ring-gold-500/20"
                  }`}
                />
                {errors.price && <p className="text-xs text-red-400 mt-1">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-600 mb-2">Price Per Acre (₹)</label>
                <input
                  type="number"
                  step="any"
                  value={pricePerAcre}
                  onChange={(e) => setPricePerAcre(e.target.value)}
                  placeholder="e.g. 7000"
                  className="w-full px-4 py-3 rounded-xl bg-dark-50 border border-gold-500/20 text-white placeholder-dark-600 focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-600 mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Vermont Hills"
                  className={`w-full px-4 py-3 rounded-xl bg-dark-50 border text-white placeholder-dark-600 focus:outline-none focus:ring-2 transition-all ${
                    errors.location
                      ? "border-red-500/50 focus:ring-red-500/20"
                      : "border-gold-500/20 focus:border-gold-500/50 focus:ring-gold-500/20"
                  }`}
                />
                {errors.location && <p className="text-xs text-red-400 mt-1">{errors.location}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-600 mb-2">Water Source</label>
                <input
                  value={waterSource}
                  onChange={(e) => setWaterSource(e.target.value)}
                  placeholder="e.g. Natural Spring + Rainwater Harvesting"
                  className="w-full px-4 py-3 rounded-xl bg-dark-50 border border-gold-500/20 text-white placeholder-dark-600 focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-600 mb-2">Soil Type</label>
                <input
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  placeholder="e.g. Loamy"
                  className="w-full px-4 py-3 rounded-xl bg-dark-50 border border-gold-500/20 text-white placeholder-dark-600 focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-600 mb-2">Suitable For (comma-separated)</label>
                <input
                  value={suitableForText}
                  onChange={(e) => setSuitableForText(e.target.value)}
                  placeholder="e.g. Organic Farming, Orchard, Vegetable Farm"
                  className="w-full px-4 py-3 rounded-xl bg-dark-50 border border-gold-500/20 text-white placeholder-dark-600 focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-600 mb-2">Amenities (comma-separated)</label>
              <input
                value={amenitiesText}
                onChange={(e) => setAmenitiesText(e.target.value)}
                placeholder="e.g. Greenhouse, Storage, Farmhouse"
                className="w-full px-4 py-3 rounded-xl bg-dark-50 border border-gold-500/20 text-white placeholder-dark-600 focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-600 mb-2">
                Property Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Certified organic farm with established orchards..."
                className={`w-full px-4 py-3 rounded-xl bg-dark-50 border text-white placeholder-dark-600 focus:outline-none focus:ring-2 transition-all resize-none ${
                  errors.description
                    ? "border-red-500/50 focus:ring-red-500/20"
                    : "border-gold-500/20 focus:border-gold-500/50 focus:ring-gold-500/20"
                }`}
              />
              {errors.description && <p className="text-xs text-red-400 mt-1">{errors.description}</p>}
            </div>

            <div className="p-5 rounded-2xl bg-dark-50 border border-gold-500/10 space-y-4">
              <div>
                <h4 className="text-white font-semibold">Owner Information</h4>
                <p className="text-xs text-dark-600">Rating auto-generated. Verified status can be toggled.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-600 mb-2">Owner Name</label>
                  <input
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="e.g. Sarah Johnson"
                    className="w-full px-4 py-3 rounded-xl bg-dark-50 border border-gold-500/20 text-white placeholder-dark-600 focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-600 mb-2">Phone Number</label>
                  <input
                    value={ownerPhone}
                    onChange={(e) => setOwnerPhone(e.target.value)}
                    placeholder="e.g. +1 (555) 333-4444"
                    className="w-full px-4 py-3 rounded-xl bg-dark-50 border border-gold-500/20 text-white placeholder-dark-600 focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-600 mb-2">Email Address</label>
                  <input
                    value={ownerEmail}
                    onChange={(e) => setOwnerEmail(e.target.value)}
                    placeholder="e.g. owner@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-dark-50 border border-gold-500/20 text-white placeholder-dark-600 focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/50"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-dark-100/40 border border-gold-500/10">
                <div>
                  <span className="block text-sm font-semibold text-white">Verified Property Owner</span>
                  <span className="text-xs text-dark-600">Show verified badge for owner.</span>
                </div>
                <button
                  type="button"
                  onClick={() => setOwnerVerified((v) => !v)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                    ownerVerified ? "bg-primary-600" : "bg-dark-300"
                  }`}
                >
                  <motion.span
                    animate={{ x: ownerVerified ? 26 : 2 }}
                    className="absolute top-1 left-0.5 w-4 h-4 bg-white rounded-full shadow"
                  />
                </button>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-dark-50 border border-gold-500/10 space-y-4">
              <div>
                <h4 className="text-white font-semibold">Property Images</h4>
                <p className="text-xs text-dark-600">Main property image is required. Additional images are optional.</p>
              </div>

              <div className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">Main Property Image</span>
                  <span className="text-red-500 text-sm">*</span>
                </div>

                <div className="flex bg-dark-100 rounded-lg p-0.5 border border-gold-500/10">
                  <button
                    type="button"
                    onClick={() => setImageSource("upload")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                      imageSource === "upload" ? "bg-gold-500 text-dark-50" : "text-dark-600 hover:text-white"
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Upload
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageSource("url")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                      imageSource === "url" ? "bg-gold-500 text-dark-50" : "text-dark-600 hover:text-white"
                    }`}
                  >
                    <span className="w-3.5 h-3.5 inline-flex items-center justify-center text-lg">↗</span>
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
                      <img src={mainImageFile} alt="Main preview" className="w-full h-full object-cover" />
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
                      <p className="text-sm text-white font-medium">Click to upload property image</p>
                      <p className="text-xs text-dark-600 mt-1">PNG, JPG, JPEG, WEBP</p>
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
                      errors.image ? "border-red-500/50 focus:ring-red-500/20" : "border-gold-500/20 focus:border-gold-500/50 focus:ring-gold-500/20"
                    }`}
                  />
                  {imageUrl && (
                    <div className="mt-3 relative w-52 h-36 rounded-xl overflow-hidden border border-gold-500/30">
                      <img src={imageUrl} alt="Main preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              )}

              {errors.image && <p className="text-xs text-red-400">{errors.image}</p>}

              <div className="pt-2 border-t border-gold-500/10">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <label className="block text-sm font-medium text-white">Multiple Property Images</label>
                    <p className="text-xs text-dark-600">Upload other views or documents images.</p>
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

                {errors.multipleImages && <p className="text-xs text-red-400 mt-2">{errors.multipleImages}</p>}

                {additionalImages.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 pt-3">
                    {additionalImages.map((img, idx) => (
                      <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-gold-500/15 group">
                        <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-dark-50 border border-gold-500/10">
                <div>
                  <span className="block text-sm font-semibold text-white">Featured Property</span>
                  <span className="text-xs text-dark-600">Highlight at top of listings.</span>
                </div>
                <button
                  type="button"
                  onClick={() => setFeatured((v) => !v)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${featured ? "bg-gold-500" : "bg-dark-300"}`}
                >
                  <motion.span
                    animate={{ x: featured ? 26 : 2 }}
                    className="absolute top-1 left-0.5 w-4 h-4 bg-white rounded-full shadow"
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-dark-50 border border-gold-500/10">
                <div>
                  <span className="block text-sm font-semibold text-white">Verified Property</span>
                  <span className="text-xs text-dark-600">Show Verified badge for property.</span>
                </div>
                <button
                  type="button"
                  onClick={() => setVerified((v) => !v)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${verified ? "bg-primary-600" : "bg-dark-300"}`}
                >
                  <motion.span
                    animate={{ x: verified ? 26 : 2 }}
                    className="absolute top-1 left-0.5 w-4 h-4 bg-white rounded-full shadow"
                  />
                </button>
              </div>
            </div>

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
                {isSubmitting ? "Saving..." : formMode === "edit" ? "Save Property" : "Create Property Listing"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RealEstateFormModal;

