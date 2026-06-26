import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
  Search,
  MapPin,
  Ruler,
  Droplets,
  CheckCircle,
  Phone,
  Edit3,
  Trash2,
} from "lucide-react";
import { formatCurrency, getWhatsAppLink } from "../../utils/helpers";
import { CONTACT_INFO } from "../../utils/constants";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useRealEstate } from "../../context/RealEstateContext";

const FarmLand = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("all");

  const { properties, openCreateForm, openEditForm, openDeleteConfirm } =
    useRealEstate();

  const priceRanges = [
    { id: "all", label: "All Prices" },
    { id: "low", label: "Under ₹3L", min: 0, max: 300000 },
    { id: "mid", label: "₹3L - ₹5L", min: 300000, max: 500000 },
    { id: "high", label: "Over ₹5L", min: 500000, max: Infinity },
  ];

  const filteredLand = useMemo(() => {
    let result = properties || [];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          (p.name || "").toLowerCase().includes(q) ||
          (p.location || "").toLowerCase().includes(q),
      );
    }

    if (priceRange !== "all") {
      const range = priceRanges.find((r) => r.id === priceRange);
      result = result.filter(
        (item) => item.price >= range.min && item.price <= range.max,
      );
    }

    return result;
  }, [properties, searchQuery, priceRange]);

  const handleInquiry = (property) => {
    const message = `Hello! I am interested in ${property.name} (${property.size}). Could you provide more details about availability and viewing schedule?`;
    window.open(
      getWhatsAppLink(CONTACT_INFO.whatsapp, message),
      "_blank",
    );
  };

  return (
    <section
      id="farmland"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-dark-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6">
            <span className="text-gold-400 text-sm font-medium">
              Real estate
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
            Premium <span className="text-gold-400">Agricultural</span>{" "}
            Properties
          </h2>
          <p className="text-lg text-dark-600">
            Discover fertile Real estate, ranches, orchards, and agricultural
            properties. Verified listings with complete legal documentation.
          </p>
        </motion.div>

        <div className="flex justify-center mb-10">
          <button
            type="button"
            onClick={openCreateForm}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-dark-50 text-sm font-medium transition-colors"
          >
            + Add Real Estate
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-600" />
              <input
                type="text"
                placeholder="Search by location or property name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-dark-100 border border-gold-500/20 text-white placeholder-dark-600 focus:border-gold-500/50 focus:outline-none transition-colors"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {priceRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => setPriceRange(range.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    priceRange === range.id
                      ? "bg-gold-500 text-dark-50"
                      : "bg-dark-100 text-dark-600 hover:text-white border border-gold-500/20"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col gap-8">
          {filteredLand.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 12 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="group"
            >
              {/* Full-row card */}
              <div className="flex w-full rounded-2xl bg-dark-100/50 backdrop-blur-sm border border-gold-500/10 hover:border-gold-500/30 overflow-hidden transition-all duration-300 hover:shadow-gold">
                {/* Left media */}
                <div className="w-30 flex-shrink-0 relative">
                  <div className="aspect-video h-full overflow-hidden bg-dark-100">
                    <img
                      src={property.images?.[0]}
                      alt={property.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-dark-50/80 to-transparent" />

                  {property.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 rounded-lg bg-gold-500 text-dark-50 text-xs font-bold">
                        Featured
                      </span>
                    </div>
                  )}

                  {property.verified && (
                    <div className="absolute top-3 left-20">
                      <span className="px-2 py-1 rounded-lg bg-primary-600 text-white text-xs font-medium flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-2xl font-bold text-gold-400">
                      {formatCurrency(property.price)}
                    </span>
                  </div>
                </div>

                {/* Right content */}
                <div className="flex-1 p-5 flex flex-col gap-3 ">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-gold-400 transition-colors">
                      {property.name}
                    </h3>

                    <div className="flex items-center gap-2 flex-wrap justify-end">
                      <button
                        type="button"
                        onClick={() => openEditForm(property)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-dark-100 hover:bg-white/5 text-red-50 text-sm font-medium border border-gold-500/20 transition-colors"
                        title="Edit Real Estate"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => openDeleteConfirm(property)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-dark-100 hover:bg-white/5 text-red-50 text-sm font-medium border border-red-500/20 transition-colors"
                        title="Delete Real Estate"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                        Delete
                      </button>

                      <button
                        type="button"
                        onClick={() => handleInquiry(property)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-dark-50 text-sm font-medium transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        Inquire Now
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-dark-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  <p className="text-dark-600 text-sm line-clamp-2">
                    {property.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <Ruler className="w-4 h-4 text-gold-400" />
                      <div>
                        <span className="text-xs text-dark-600">Size</span>
                        <p className="text-sm text-white">{property.size}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-primary-400" />
                      <div>
                        <span className="text-xs text-dark-600">Water</span>
                        <p className="text-sm text-white">
                          {property.waterSource}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {property.suitable_for?.slice(0, 4).map((use) => (
                      <span
                        key={use}
                        className="px-2 py-1 rounded-lg bg-dark-200/50 text-xs text-dark-600"
                      >
                        {use}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gold-500/10">
                    <div className="text-sm">
                      <span className="text-gold-400 font-semibold">
                        {formatCurrency(property.pricePerAcre)}
                      </span>
                      <span className="text-dark-600"> / acre</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredLand.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-xl bg-dark-100 flex items-center justify-center">
              <Search className="w-10 h-10 text-dark-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No properties found
            </h3>
            <p className="text-dark-600">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FarmLand;

