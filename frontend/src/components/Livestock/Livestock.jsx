import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Phone, Star, BadgeCheck } from 'lucide-react';
import { LIVESTOCK_CATEGORIES, CONTACT_INFO } from '../../utils/constants';
import { formatCurrency, getWhatsAppLink } from '../../utils/helpers';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useLivestock } from '../../context/LivestockContext';
import LivestockFormModal from '../LivestockFormModal/LivestockFormModal';
import LivestockDeleteModal from '../LivestockDeleteModal/LivestockDeleteModal';

const normalize = (v) => (v ?? '').toString().toLowerCase();

const Livestock = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { livestockItems, openCreateForm, openEditForm, openDeleteConfirm } =
    useLivestock();

  const filteredLivestock = useMemo(() => {
    let result =
      selectedCategory === 'all'
        ? livestockItems
        : livestockItems.filter((i) => i.category === selectedCategory);

    if (searchQuery.trim()) {
      const q = normalize(searchQuery);
      result = result.filter(
        (i) =>
          normalize(i.name).includes(q) ||
          normalize(i.breed).includes(q) ||
          normalize(i.category).includes(q),
      );
    }

    return result;
  }, [livestockItems, selectedCategory, searchQuery]);

  const handleInquiry = (item) => {
    const message = `Hello! I am interested in ${item.name} (${item.breed}). Could you provide more details about availability and pricing?`;
    window.open(getWhatsAppLink(CONTACT_INFO.whatsapp, message), '_blank');
  };

  return (
    <section
      id="livestock"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-dark-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6">
            <span className="text-gold-400 text-sm font-medium">
              Livestock Marketplace
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
            Premium <span className="text-gold-400">Livestock</span> Trading
          </h2>
          <p className="text-lg text-dark-600">
            Find healthy, verified cattle, goats, buffalo, and more. All our
            livestock listings come from trusted sellers with complete health
            records.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-stretch">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-600" />
              <input
                type="text"
                placeholder="Search by animal name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-dark-100 border border-gold-500/20 text-white placeholder-dark-600 focus:border-gold-500/50 focus:outline-none transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {LIVESTOCK_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-gold-500 text-dark-50'
                      : 'bg-dark-100 text-dark-600 hover:text-white border border-gold-500/20'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Add button */}
            <div className="flex items-center lg:justify-end">
              <button
                type="button"
                onClick={openCreateForm}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-dark-50 text-sm font-medium transition-colors"
              >
                + Add Livestock
              </button>
            </div>
          </div>
        </motion.div>

        {/* Livestock Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLivestock.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group"
            >
              <div className="rounded-2xl bg-dark-100/50 backdrop-blur-sm border border-gold-500/10 hover:border-gold-500/30 overflow-hidden transition-all duration-300 hover:shadow-gold">
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={item.images?.[0]}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-50/80 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2 py-1 rounded-lg bg-gold-500 text-dark-50 text-xs font-bold">
                      {(item.category || '').toUpperCase()}
                    </span>
                    {item.featured && (
                      <span className="px-2 py-1 rounded-lg bg-primary-600 text-white text-xs font-medium">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-2xl font-bold text-gold-400">
                      {formatCurrency(item.price)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-gold-400 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-primary-400">{item.breed}</p>
                    </div>
                    {item.seller?.verified && (
                      <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-primary-500/20">
                        <BadgeCheck className="w-4 h-4 text-primary-400" />
                        <span className="text-xs text-primary-400">Verified</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-dark-600">
                      <span className="text-sm">Age:</span>
                      <span className="text-sm text-white">{item.age}</span>
                    </div>
                    <div className="flex items-center gap-2 text-dark-600">
                      <span className="text-sm">Weight:</span>
                      <span className="text-sm text-white">{item.weight}</span>
                    </div>
                    {item.milkYield !== 'N/A' && item.milkYield !== '' && (
                      <div className="flex items-center gap-2 text-dark-600 col-span-2">
                        <span className="text-sm">Milk Yield:</span>
                        <span className="text-sm text-gold-400">
                          {item.milkYield}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 mb-4 p-3 rounded-xl bg-dark-200/50">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary-500" />
                      <span className="text-xs text-dark-600">Health:</span>
                      <span className="text-xs text-white">{item.health}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gold-500" />
                      <span className="text-xs text-dark-600">Vaccination:</span>
                      <span className="text-xs text-white">
                        {item.vaccination}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-dark-600 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{item.location}</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gold-500/10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center">
                        <span className="text-gold-400 text-xs font-bold">
                          {(item.seller?.name || '?').charAt(0)}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-white">
                          {item.seller?.name}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-gold-400 fill-current" />
                          <span className="text-xs text-dark-600">
                            {item.seller?.rating}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEditForm(item)}
                        className="px-3 py-2 rounded-xl bg-dark-50 border border-gold-500/20 hover:border-gold-500/40 text-white text-sm font-medium transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => openDeleteConfirm(item)}
                        className="px-3 py-2 rounded-xl bg-red-950/20 border border-red-500/10 hover:border-red-500/30 text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={() => handleInquiry(item)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-dark-50 text-sm font-medium transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      Inquiry
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredLivestock.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-xl bg-dark-100 flex items-center justify-center">
              <Search className="w-10 h-10 text-dark-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No livestock found
            </h3>
            <p className="text-dark-600">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}

        {/* Modals */}
        <LivestockFormModal />
        <LivestockDeleteModal />
      </div>
    </section>
  );
};

export default Livestock;

