export const livestock = [
  {
    id: 'ls-001',
    name: 'Premium Sahiwal Cow',
    description: 'High-yielding native breed known for excellent milk production. This 4-year-old Sahiwal cow produces an average of 15-20 liters per day. Fully vaccinated and healthy.',
    price: 2500,
    category: 'cow',
    breed: 'Sahiwal',
    age: '4 years',
    weight: '450 kg',
    milkYield: '15-20 L/day',
    health: 'Excellent',
    vaccination: 'Complete',
    location: 'Punjab Farm, Punjab',
    seller: {
      name: 'Gurpreet Singh',
      rating: 4.9,
      verified: true,
    },
    images: [
      'https://images.pexels.com/photos/42287/animal-cow-countryside-countryside-42287.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1174154/pexels-photo-1174154.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    featured: true,
    createdAt: '2024-01-15',
  },
  {
    id: 'ls-002',
    name: 'Holstein Friesian Dairy Cow',
    description: 'Pure Holstein Friesian breed with exceptional milk yield. This 3-year-old produces 25-30 liters daily. Perfect for commercial dairy farm.',
    price: 3200,
    category: 'cow',
    breed: 'Holstein Friesian',
    age: '3 years',
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
      'https://images.pexels.com/photos/1174154/pexels-photo-1174154.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    featured: true,
    createdAt: '2024-01-12',
  },
  {
    id: 'ls-003',
    name: 'Jersey Cow - Champion Breed',
    description: 'Premium Jersey cow known for high butterfat milk. Ideal for cheese and butter production. 5 years old with excellent temperament.',
    price: 2800,
    category: 'cow',
    breed: 'Jersey',
    age: '5 years',
    weight: '400 kg',
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
      'https://images.pexels.com/photos/1908158/pexels-photo-1908158.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    featured: true,
    createdAt: '2024-01-10',
  },
  {
    id: 'ls-004',
    name: 'Sirohi Goat - Breeding Quality',
    description: 'Purebred Sirohi male goat, perfect for breeding. 18 months old with excellent genetics. Known for good health and disease resistance.',
    price: 450,
    category: 'goat',
    breed: 'Sirohi',
    age: '1.5 years',
    weight: '35 kg',
    milkYield: 'N/A',
    health: 'Excellent',
    vaccination: 'Complete',
    location: 'Rajasthan Farm, Rajasthan',
    seller: {
      name: 'Rajesh Kumar',
      rating: 4.6,
      verified: true,
    },
    images: [
      'https://images.pexels.com/photos/36365/goat-nature-horns-animal.jpg?auto=compress&cs=tinysrgb&w=600',
    ],
    featured: true,
    createdAt: '2024-01-08',
  },
  {
    id: 'ls-005',
    name: 'Boer Goat - Meat Breed',
    description: 'Premium Boer goat bred for quality meat. This 2-year-old male weighs 65kg. Excellent muscle development and healthy.',
    price: 580,
    category: 'goat',
    breed: 'Boer',
    age: '2 years',
    weight: '65 kg',
    milkYield: 'N/A',
    health: 'Excellent',
    vaccination: 'Complete',
    location: 'Texas Ranch, Texas',
    seller: {
      name: 'David Miller',
      rating: 4.8,
      verified: true,
    },
    images: [
      'https://images.pexels.com/photos/161612/pexels-photo-161612.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    featured: false,
    createdAt: '2024-01-05',
  },
  {
    id: 'ls-006',
    name: 'Murrah Buffalo - High Yield',
    description: 'Champion Murrah buffalo known for exceptional milk yield. 4 years old, produces 15-18 liters daily with 8% fat content.',
    price: 3500,
    category: 'buffalo',
    breed: 'Murrah',
    age: '4 years',
    weight: '550 kg',
    milkYield: '15-18 L/day',
    health: 'Excellent',
    vaccination: 'Complete',
    location: 'Haryana Farm, Haryana',
    seller: {
      name: 'Suresh Sharma',
      rating: 4.9,
      verified: true,
    },
    images: [
      'https://images.pexels.com/photos/42287/animal-cow-countryside-countryside-42287.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    featured: true,
    createdAt: '2024-01-03',
  },
  {
    id: 'ls-007',
    name: 'Jafarabadi Buffalo',
    description: 'Premium Jafarabadi buffalo with excellent dairy potential. 5 years old, ideal for breeding and milk production.',
    price: 4200,
    category: 'buffalo',
    breed: 'Jafarabadi',
    age: '5 years',
    weight: '600 kg',
    milkYield: '12-15 L/day',
    health: 'Good',
    vaccination: 'Complete',
    location: 'Gujarat Farm, Gujarat',
    seller: {
      name: 'Mahesh Patel',
      rating: 4.7,
      verified: true,
    },
    images: [
      'https://images.pexels.com/photos/42287/animal-cow-countryside-countryside-42287.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    featured: false,
    createdAt: '2024-01-01',
  },
  {
    id: 'ls-008',
    name: 'Merino Sheep - Wool Quality',
    description: 'Premium Merino sheep prized for fine wool production. 2 years old with excellent genetics. Perfect for wool farm.',
    price: 380,
    category: 'sheep',
    breed: 'Merino',
    age: '2 years',
    weight: '55 kg',
    milkYield: 'N/A',
    health: 'Excellent',
    vaccination: 'Complete',
    location: 'Colorado Ranch, Colorado',
    seller: {
      name: 'Robert Wilson',
      rating: 4.5,
      verified: true,
    },
    images: [
      'https://images.pexels.com/photos/2165989/pexels-photo-2165989.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    featured: false,
    createdAt: '2023-12-28',
  },
  {
    id: 'ls-009',
    name: 'Dorper Sheep - Meat Breed',
    description: 'Quality Dorper sheep raised for premium meat production. Fast-growing breed with excellent carcass quality.',
    price: 320,
    category: 'sheep',
    breed: 'Dorper',
    age: '1 year',
    weight: '45 kg',
    milkYield: 'N/A',
    health: 'Excellent',
    vaccination: 'Complete',
    location: 'Australia Outback Farm',
    seller: {
      name: 'John Smith',
      rating: 4.6,
      verified: true,
    },
    images: [
      'https://images.pexels.com/photos/2165989/pexels-photo-2165989.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    featured: false,
    createdAt: '2023-12-25',
  },
  {
    id: 'ls-010',
    name: 'Gir Cow - Indigenous Breed',
    description: 'Pure Gir cow, famous for high milk yield and disease resistance. 3 years old, produces 12-15 liters daily.',
    price: 2200,
    category: 'cow',
    breed: 'Gir',
    age: '3 years',
    weight: '380 kg',
    milkYield: '12-15 L/day',
    health: 'Excellent',
    vaccination: 'Complete',
    location: 'Gujarat, India',
    seller: {
      name: 'Ramesh Patel',
      rating: 4.8,
      verified: true,
    },
    images: [
      'https://images.pexels.com/photos/1908158/pexels-photo-1908158.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    featured: false,
    createdAt: '2023-12-20',
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
