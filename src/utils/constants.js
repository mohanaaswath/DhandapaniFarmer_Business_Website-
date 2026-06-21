// Application constants
export const APP_NAME = 'AgriBusiness Marketplace';
export const APP_TAGLINE = 'Premium Agriculture & Livestock Trading Platform';
export const APP_DESCRIPTION = 'Connect with trusted farmers and agricultural businesses for premium dairy products, livestock, and farm land.';

// Contact Information
export const CONTACT_INFO = {
  phone: '+1 (555) 123-4567',
  email: 'info@agribusiness.com',
  whatsapp: '+15551234567',
  address: '123 Farm Valley Road, Agricultural District, CA 90210',
  workingHours: 'Mon - Sat: 8:00 AM - 6:00 PM',
};

// Social Media Links
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/agribusiness',
  twitter: 'https://twitter.com/agribusiness',
  instagram: 'https://instagram.com/agribusiness',
  linkedin: 'https://linkedin.com/company/agribusiness',
  youtube: 'https://youtube.com/@agribusiness',
};

// Navigation Links
export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'Livestock', path: '/livestock' },
  { name: 'Farm Land', path: '/farmland' },
  { name: 'Contact', path: '/contact' },
];

// Product Categories
export const PRODUCT_CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Grid3X3' },
  { id: 'dairy', name: 'Dairy Products', icon: 'Milk' },
  { id: 'grains', name: 'Grains & Cereals', icon: 'Wheat' },
  { id: 'vegetables', name: 'Fresh Vegetables', icon: 'Carrot' },
  { id: 'fruits', name: 'Fresh Fruits', icon: 'Apple' },
  { id: 'spices', name: 'Spices & Herbs', icon: 'Leaf' },
  { id: 'organic', name: 'Organic Products', icon: 'Sprout' },
];

// Livestock Categories
export const LIVESTOCK_CATEGORIES = [
  { id: 'all', name: 'All Livestock' },
  { id: 'cow', name: 'Cattle' },
  { id: 'goat', name: 'Goats' },
  { id: 'buffalo', name: 'Buffalo' },
  { id: 'sheep', name: 'Sheep' },
  { id: 'poultry', name: 'Poultry' },
];

// Dairy Product Types
export const DAIRY_TYPES = [
  { id: 'milk', name: 'Fresh Milk' },
  { id: 'paneer', name: 'Paneer' },
  { id: 'ghee', name: 'Pure Ghee' },
  { id: 'curd', name: 'Curd/Yogurt' },
  { id: 'butter', name: 'Fresh Butter' },
  { id: 'cream', name: 'Fresh Cream' },
];

// Stats
export const STATS_DATA = [
  { id: 1, label: 'Happy Customers', value: 15000, suffix: '+' },
  { id: 2, label: 'Products Sold', value: 50000, suffix: '+' },
  { id: 3, label: 'Livestock Traded', value: 8500, suffix: '+' },
  { id: 4, label: 'Acres Sold', value: 25000, suffix: '+' },
];

// Feature Flags
export const FEATURES = {
  enableWhatsApp: true,
  enableNewsletter: true,
  enableLiveChat: false,
};

// Animation Variants
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 },
};

export const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 },
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4 },
};

// Glassmorphism styles
export const glassStyle = 'backdrop-blur-md bg-white/5 border border-white/10 shadow-xl';

// Currency
export const CURRENCY = {
  symbol: '$',
  code: 'USD',
  locale: 'en-US',
};

// API Endpoints (for future backend integration)
export const API_ENDPOINTS = {
  products: '/api/products',
  livestock: '/api/livestock',
  farmland: '/api/farmland',
  contact: '/api/contact',
  inquiry: '/api/inquiry',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  cart: 'agribusiness_cart',
  user: 'agribusiness_user',
  preferences: 'agribusiness_preferences',
  theme: 'agribusiness_theme',
};

// Error Messages
export const ERROR_MESSAGES = {
  network: 'Network error. Please check your connection.',
  server: 'Server error. Please try again later.',
  notFound: 'The requested resource was not found.',
  validation: 'Please fill in all required fields correctly.',
  cart: 'Unable to update cart. Please try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  cartAdded: 'Product added to cart successfully!',
  inquirySent: 'Your inquiry has been sent successfully!',
  contactSent: 'Message sent successfully! We will contact you soon.',
};
