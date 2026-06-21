import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelectCategory,
  visible = true,
}) => {
  const getIcon = (iconName) => {
    const IconComponent = LucideIcons[iconName];
    return IconComponent ? <IconComponent className="w-4 h-4" /> : null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{
        opacity: visible ? 1 : 0,
        height: visible ? 'auto' : 0,
      }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <div className="flex flex-wrap gap-2 py-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-gold-500 text-dark-50 shadow-gold'
                : 'bg-dark-100 text-dark-600 hover:text-white border border-gold-500/10 hover:border-gold-500/30'
            }`}
          >
            {category.icon && getIcon(category.icon)}
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default CategoryFilter;
