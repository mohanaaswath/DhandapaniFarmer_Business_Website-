export const livestock = [
  {
    id: 'ls-001',
    name: 'GirCow',
    description: '🐄 The Gir cow is an indigenous Indian breed known for its high-quality A2 milk, strong immunity, and adaptability to hot climates.',
    price: 8000,
    category: 'cow',
    breed: 'Sahiwal',
    age: '5 years',
    weight: '450 kg',
    milkYield: '15-20 L/day',
    health: 'Excellent',
    vaccination: 'Complete',
    location: 'Tirupur , Tamil Nadu',
    seller: {
      name: 'Mohan',
      rating: 4.9,
      verified: true,
    },
    images: [
      'GirCow.jpeg',
      'GirCow.jpeg',
    ],
    featured: true,
    createdAt: '2024-01-15',
  },
  {
    id: 'ls-002',
    name: 'Kangayam Native Karam Cow',
    description: '🐂 The Kangayam cattle is a hardy native breed from Tamil Nadu, valued for its strength, disease resistance, and ability to thrive in hot, dry climates.',
    price: 8000,
    category: 'cow',
    breed: 'Holstein Friesian',
    age: '5 years',
    weight: '600 kg',
    milkYield: '25-30 L/day',
    health: 'Excellent',
    vaccination: 'Complete',
    location: 'Midwest Farm, Iowa',
    seller: {
      name: 'John Anderson',
      rating: 4.8,
      verified: true,
    },
    images: [
      'KangayamNativeKaramCow.jpeg',
    ],
    featured: true,
    createdAt: '2024-01-12',
  },
  {
    id: 'ls-003',
    name: 'Goat Native Breed',
    description: '🐐 Native Indian goat breeds are known for their adaptability, disease resistance, and high-quality meat and milk production in diverse climatic conditions.',
    price: 4000,
    category: 'goat',
    breed: 'Jersey',
    age: '5 years',
    weight: '300 kg',
    milkYield: '18-22 L/day',
    health: 'Excellent',
    vaccination: 'Complete',
    location: 'Green Valley, Vermont',
    seller: {
      name: 'Michael Thompson',
      rating: 4.7,
      verified: true,
    },
    images: [
      'GoatNativeBread.jpeg',
    ],
    featured: true,
    createdAt: '2024-01-10',
  },
  
];

export const getLivestockByCategory = (category) => {
  if (category === 'all') return livestock;
  return livestock.filter((item) => item.category === category);
};

export const getFeaturedLivestock = () => {
  return livestock.filter((item) => item.featured);
};

export const getLivestockById = (id) => {
  return livestock.find((item) => item.id === id);
};

export const searchLivestock = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return livestock.filter(
    (item) =>
      item.name.toLowerCase().includes(lowercaseQuery) ||
      item.breed.toLowerCase().includes(lowercaseQuery) ||
      item.category.toLowerCase().includes(lowercaseQuery)
  );
};

export default livestock;
