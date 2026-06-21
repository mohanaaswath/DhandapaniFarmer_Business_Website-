import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('auth_token');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error('API Error:', error.message);
      }
    }
    return Promise.reject(error);
  }
);

// Products API
export const productsAPI = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  getByCategory: (category) => api.get(`/products?category=${category}`),
  search: (query) => api.get(`/products/search?q=${encodeURIComponent(query)}`),
  getFeatured: () => api.get('/products?featured=true'),
};

// Livestock API
export const livestockAPI = {
  getAll: () => api.get('/livestock'),
  getById: (id) => api.get(`/livestock/${id}`),
  getByCategory: (category) => api.get(`/livestock?category=${category}`),
  search: (query) => api.get(`/livestock/search?q=${encodeURIComponent(query)}`),
};

// Farmland API
export const farmlandAPI = {
  getAll: () => api.get('/farmland'),
  getById: (id) => api.get(`/farmland/${id}`),
  search: (query) => api.get(`/farmland/search?q=${encodeURIComponent(query)}`),
  filterByPrice: (min, max) => api.get(`/farmland?minPrice=${min}&maxPrice=${max}`),
};

// Inquiry API
export const inquiryAPI = {
  submit: (data) => api.post('/inquiry', data),
  getMyInquiries: () => api.get('/inquiry/my'),
};

// Contact API
export const contactAPI = {
  sendMessage: (data) => api.post('/contact', data),
};

export default api;
