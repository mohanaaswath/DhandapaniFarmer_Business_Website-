import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ProductCard from "../ProductCard/ProductCard";
import CategoryFilter from "../CategoryFilter/CategoryFilter";
import { useProducts } from "../../context/ProductsContext";
import { PRODUCT_CATEGORIES } from "../../utils/constants";
import { fadeInUp, staggerContainer } from "../../utils/constants";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const normalizeCategory = (value) => (value || "").trim().toLowerCase();

const ProductMarketplace = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });

  const { openCreateForm } = useProducts();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { products: contextProducts } = useProducts();
  const allProducts = contextProducts;

  // Reset page when category, search, or sorting changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortBy]);

  const filteredProducts = useMemo(() => {
    let result = allProducts;

    if (selectedCategory !== "all") {
      if (selectedCategory === "organic") {
        result = result.filter((product) => product.organic === true);
      } else {
        result = result.filter(
          (product) => normalizeCategory(product.category) === selectedCategory,
        );
      }
    }

    if (searchQuery) {
      const loweredQuery = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(loweredQuery) ||
          product.description.toLowerCase().includes(loweredQuery) ||
          normalizeCategory(product.category).includes(loweredQuery),
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case "stock":
        result = [...result].sort((a, b) => b.stock - a.stock);
        break;
      case "featured":
      default:
        result = [...result].sort(
          (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0),
        );
        break;
    }

    return result;
  }, [allProducts, selectedCategory, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-dark-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6">
            <span className="text-gold-400 text-sm font-medium">
              Product Marketplace
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
            Fresh <span className="text-gold-400">Agricultural</span> Products
          </h2>
          <p className="text-lg text-dark-600">
            Explore our wide range of farm-fresh products sourced directly from
            verified farmers and agricultural businesses.
          </p>
        </motion.div>

        {/* Add Product Button */}
        <div className="flex justify-center mb-10">
          <button
            onClick={() => openCreateForm()}
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-dark-50 text-sm font-medium transition-colors"
          >
            + Add Products
          </button>
        </div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-600" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-dark-100 border border-gold-500/20 text-white placeholder-dark-600 focus:border-gold-500/50 focus:outline-none transition-colors"
              />
            </div>

            <div className="flex gap-2">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 rounded-xl bg-dark-100 border border-gold-500/20 text-white focus:border-gold-500/50 focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="stock">Stock: High to Low</option>
              </select>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors ${
                  showFilters
                    ? "bg-gold-500/20 border-gold-500/40 text-gold-400"
                    : "bg-dark-100 border-gold-500/20 text-white hover:border-gold-500/40"
                }`}
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span className="hidden sm:inline">Filters</span>
              </button>

              {/* View Toggle */}
              <div className="flex rounded-xl bg-dark-100 border border-gold-500/20 overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 ${
                    viewMode === "grid"
                      ? "bg-gold-500/20 text-gold-400"
                      : "text-dark-600 hover:text-white"
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 ${
                    viewMode === "list"
                      ? "bg-gold-500/20 text-gold-400"
                      : "text-dark-600 hover:text-white"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <CategoryFilter
            categories={PRODUCT_CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            visible={showFilters}
          />
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isVisible ? "animate" : "initial"}
        >
          {filteredProducts.length > 0 ? (
            <div className="space-y-8">
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-4"
                }
              >
                {paginatedProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    layout={viewMode}
                  />
                ))}
              </div>

              {/* Premium Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 pt-8 border-t border-gold-500/10">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="p-2.5 rounded-xl border border-gold-500/20 text-white hover:border-gold-500/40 hover:bg-dark-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-11 h-11 rounded-xl border font-semibold text-sm transition-all duration-200 ${
                          currentPage === pageNum
                            ? "bg-gold-500 border-gold-500 text-dark-50 shadow-gold"
                            : "border-gold-500/20 text-white hover:border-gold-500/40 hover:bg-dark-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2.5 rounded-xl border border-gold-500/20 text-white hover:border-gold-500/40 hover:bg-dark-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-xl bg-dark-100 flex items-center justify-center">
                <Search className="w-10 h-10 text-dark-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No products found
              </h3>
              <p className="text-dark-600">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductMarketplace;
