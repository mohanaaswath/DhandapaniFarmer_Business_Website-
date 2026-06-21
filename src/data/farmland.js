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
  {
    id: 'fl-003',
    name: 'Ranch Property - 200 Acres',
    description: 'Sprawling ranch property suitable for cattle grazing and livestock farming. Includes barns, fencing, and water tanks throughout.',
    price: 850000,
    size: '200 acres',
    pricePerAcre: 4250,
    location: 'Texas Plains, Texas',
    waterSource: 'Multiple Wells + Pond',
    soilType: 'Grassland',
    suitable_for: ['Cattle Ranch', 'Livestock Farming', 'Horse Breeding'],
    amenities: ['Main House', 'Barns', 'Fencing', 'Water Tanks', 'Corrals'],
    images: [
      'https://images.pexels.com/photos/2165989/pexels-photo-2165989.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    featured: true,
    verified: true,
    owner: {
      name: 'Robert Davis',
      phone: '+1 (555) 555-6666',
      rating: 4.7,
    },
    createdAt: '2024-01-10',
  },
  {
    id: 'fl-004',
    name: 'Dairy Farm Setup - 30 Acres',
    description: 'Complete dairy farm with infrastructure for 100 cattle. Includes milking parlor, cooling tanks, and staff quarters.',
    price: 300000,
    size: '30 acres',
    pricePerAcre: 10000,
    location: 'Dairy Valley, Wisconsin',
    waterSource: 'Borewell + Canal',
    soilType: 'Fertile Pasture Land',
    suitable_for: ['Dairy Farm', 'Fodder Production'],
    amenities: ['Milking Parlor', 'Cooling Tanks', 'Cattle Shed', 'Staff Quarters'],
    images: [
      'https://images.pexels.com/photos/1174154/pexels-photo-1174154.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    featured: false,
    verified: true,
    owner: {
      name: 'Michael Brown',
      phone: '+1 (555) 777-8888',
      rating: 4.6,
    },
    createdAt: '2024-01-08',
  },
  {
    id: 'fl-005',
    name: 'Vineyard Estate - 15 Acres',
    description: 'Premium vineyard with established grape vines. Includes winery building and tasting room. Produces award-winning wines.',
    price: 450000,
    size: '15 acres',
    pricePerAcre: 30000,
    location: 'Napa Valley, California',
    waterSource: 'Drip Irrigation + Well',
    soilType: 'Volcanic Soil (Ideal for Grapes)',
    suitable_for: ['Vineyard', 'Winery', 'Agritourism'],
    amenities: ['Winery Building', 'Tasting Room', 'Cellar', 'Guest House'],
    images: [
      'https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    featured: true,
    verified: true,
    owner: {
      name: 'Antonio Rossi',
      phone: '+1 (555) 999-0000',
      rating: 4.9,
    },
    createdAt: '2024-01-05',
  },
  {
    id: 'fl-006',
    name: 'Rice Paddy Land - 80 Acres',
    description: 'Prime paddy land with excellent water management system. Ideal for rice cultivation. Close to major markets and transportation.',
    price: 280000,
    size: '80 acres',
    pricePerAcre: 3500,
    location: 'Louisiana Delta, Louisiana',
    waterSource: 'Canal System + Rainwater',
    soilType: 'Clay (Perfect for Rice)',
    suitable_for: ['Rice Farming', 'Fish Farming', 'Duck Raising'],
    amenities: ['Canal System', 'Pumps', 'Storage', 'Worker Housing'],
    images: [
      'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    featured: false,
    verified: true,
    owner: {
      name: 'Charles Williams',
      phone: '+1 (555) 111-1111',
      rating: 4.5,
    },
    createdAt: '2024-01-02',
  },
  {
    id: 'fl-007',
    name: 'Mountain Orchard - 40 Acres',
    description: 'Beautiful mountain orchard with apple, peach, and pear trees. Stunning views with potential for agritourism development.',
    price: 420000,
    size: '40 acres',
    pricePerAcre: 10500,
    location: 'Cascade Mountains, Oregon',
    waterSource: 'Mountain Stream + Irrigation',
    soilType: 'Well-Drained Loam',
    suitable_for: ['Fruit Orchard', 'Agritourism', 'Organic Farming'],
    amenities: ['Fruit Storage', 'Processing Area', 'Farm House', 'Guest Cabins'],
    images: [
      'https://images.pexels.com/photos/1510393/pexels-photo-1510393.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    featured: false,
    verified: false,
    owner: {
      name: 'Emily Thompson',
      phone: '+1 (555) 222-2222',
      rating: 4.4,
    },
    createdAt: '2023-12-28',
  },
  {
    id: 'fl-008',
    name: 'Mixed Farm Property - 100 Acres',
    description: 'Diversified farm with crops, pasture, and woodland. Includes farmhouse, barns, and equipment shed. Sustainable farming opportunity.',
    price: 500000,
    size: '100 acres',
    pricePerAcre: 5000,
    location: 'Midwest Plains, Iowa',
    waterSource: 'Wells + Creek',
    soilType: 'Mixed - Rich Prairie Soil',
    suitable_for: ['Mixed Farming', 'Livestock', 'Crop Rotation'],
    amenities: ['Farmhouse', 'Barns', 'Equipment Shed', 'Fencing'],
    images: [
      'https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    featured: false,
    verified: true,
    owner: {
      name: 'Thomas Anderson',
      phone: '+1 (555) 333-3333',
      rating: 4.7,
    },
    createdAt: '2023-12-25',
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
