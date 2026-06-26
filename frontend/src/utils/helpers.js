// Format currency
export const formatCurrency = (amount, currency = "INR", locale = "en-IN") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Format number with commas
export const formatNumber = (num, locale = "en-US") => {
  return new Intl.NumberFormat(locale).format(num);
};

// Format compact number (e.g., 1.5K, 2M)
export const formatCompactNumber = (num, locale = "en-US") => {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    compactDisplay: "short",
  }).format(num);
};

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};

// Generate unique ID
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Scroll to element
export const scrollToElement = (elementId, offset = 80) => {
  const element = document.getElementById(elementId);
  if (element) {
    const top =
      element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

// Scroll to top
export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Calculate discounted price
export const calculateDiscount = (originalPrice, discountPercent) => {
  return originalPrice - (originalPrice * discountPercent) / 100;
};

// Calculate cart total
export const calculateCartTotal = (cartItems) => {
  return cartItems.reduce((total, item) => {
    const price = item.discountPercent
      ? calculateDiscount(item.price, item.discountPercent)
      : item.price;
    return total + price * item.quantity;
  }, 0);
};

// Validate email
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Validate phone number
export const isValidPhone = (phone) => {
  const regex = /^[\d\s\-+()]{10,}$/;
  return regex.test(phone);
};

// Get image placeholder
export const getImagePlaceholder = (width = 400, height = 300) => {
  return `https://placehold.co/${width}x${height}/1f2937/22c55e?text=Image`;
};

// Get random image from Pexels
export const getPexelsImage = (query, width = 800, height = 600) => {
  const images = {
    farm: [
      "https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2165989/pexels-photo-2165989.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    cow: [
      "https://images.pexels.com/photos/42287/animal-cow-countryside-countryside-42287.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1174154/pexels-photo-1174154.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1908158/pexels-photo-1908158.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    goat: [
      "https://images.pexels.com/photos/36365/goat-nature-horns-animal.jpg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/161612/pexels-photo-161612.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    milk: [
      "https://images.pexels.com/photo/247459/pexels-photo-247459.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1435895/pexels-photo-1435895.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    vegetables: [
      "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1435906/pexels-photo-1435906.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    default: [
      "https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  };

  const category = images[query] || images.default;
  return category[Math.floor(Math.random() * category.length)];
};

// Classnames helper
export const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

// Get reading time
export const getReadingTime = (text) => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

// Format date
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  };
  return new Date(date).toLocaleDateString("en-US", defaultOptions);
};

// Local storage helpers
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return defaultValue;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error("Error writing to localStorage:", error);
      return false;
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error("Error removing from localStorage:", error);
      return false;
    }
  },
};

// WhatsApp link generator
export const getWhatsAppLink = (phone, message = "") => {
  const cleanPhone = phone.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
};

// Map link generator
export const getMapLink = (address) => {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
};
