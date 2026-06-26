export const farmland = [
  {
    id: 'fl-001',
    name: 'Premium Agricultural Land - 50 Acres',
    description: 'Fertile agricultural land with excellent irrigation facilities. Ideal for grain farming and horticulture. Located near the river with year-round water supply.',
    price: 250000,
    size: '50 acres',
    pricePerAcre: 5000,
    location: 'Green Valley, California',
    waterSource: 'River + Borewell',
    soilType: 'Alluvial (Highly Fertile)',
    suitable_for: ['Grain Farming', 'Horticulture', 'Dairy Farm'],
    amenities: ['Borewell', 'Electricity', 'Storage Shed', 'Farm House'],
    images: [
      'https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    featured: true,
    verified: true,
    owner: {
      name: 'James Wilson',
      phone: '+1 (555) 111-2222',
      rating: 4.8,
    },
    createdAt: '2024-01-15',
  },
  {
    id: 'fl-002',
    name: 'Organic Farm Estate - 25 Acres',
    description: 'Certified organic farm with established orchards. Includes apple orchards, vegetable patches, and a small dairy unit. Turnkey operation.',
    price: 175000,
    size: '25 acres',
    pricePerAcre: 7000,
    location: 'Vermont Hills, Vermont',
    waterSource: 'Natural Spring + Rainwater Harvesting',
    soilType: 'Loamy',
    suitable_for: ['Organic Farming', 'Orchard', 'Vegetable Farm'],
    amenities: ['Greenhouse', 'Storage', 'Irrigation System', 'Farmhouse'],
    images: [
      'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    featured: true,
    verified: true,
    owner: {
      name: 'Sarah Johnson',
      phone: '+1 (555) 333-4444',
      rating: 4.9,
    },
    createdAt: '2024-01-12',
  },
];

export const getFeaturedFarmland = () => {
  return farmland.filter((item) => item.featured);
};

export const getFarmlandById = (id) => {
  return farmland.find((item) => item.id === id);
};

export const searchFarmland = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return farmland.filter(
    (item) =>
      item.name.toLowerCase().includes(lowercaseQuery) ||
      item.location.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery)
  );
};

export const filterFarmlandByPrice = (minPrice, maxPrice) => {
  return farmland.filter(
    (item) => item.price >= minPrice && item.price <= maxPrice
  );
};

export const filterFarmlandBySize = (minSize, maxSize) => {
  return farmland.filter((item) => {
    const size = parseInt(item.size);
    return size >= minSize && size <= maxSize;
  });
};

export default farmland;
