export const products = [
  {
    id: "prod-001",
    name: "Groundnut",
    description:
      "About 25–30 grams (a small handful) per day is generally a reasonable amount for most healthy adults.",
    price: 150,
    discountPercent: 0,
    category: "Grains ",
    unit: "per gram",
    stock: 150,
    rating: 4.8,
    reviews: 234,
    image: "Groundnut.jpg",
    images: ["Groundnut.jpg"],
    featured: true,
    organic: true,
    freshness: "Daily",
  },
  {
    id: "prod-002",
    name: "Banana",
    description:
      "🍌 Bananas are rich in potassium, fiber, and vitamins that support heart health, digestion, and energy production.They provide quick natural energy and help maintain healthy muscle and nerve function.",
    price: 60,
    discountPercent: 10,
    category: "Fruits",
    unit: "1 Kg",
    stock: 80,
    rating: 4.9,
    reviews: 456,
    image: "Banana.jpeg",
    images: ["Banana.jpeg"],
    featured: true,
    organic: true,
    freshness: "Weekly",
  },
  {
    id: "prod-003",
    name: "Palm Tree",
    description:
      "🌴 Palm tree products such as palm fruit and palm nectar are rich in nutrients, provide natural energy, and help keep the body hydrated and healthy.",
    price: 300,
    discountPercent: 0,
    category: "Trees and Fruits",
    unit: "per 250g",
    stock: 100,
    rating: 4.7,
    reviews: 189,
    image: "PalmTree.jpeg",
    images: ["PalmTree.jpeg"],
    featured: true,
    organic: false,
    freshness: "Daily",
  },
];

export const getProductsByCategory = (category) => {
  if (category === "all") return products;
  return products.filter((product) => product.category === category);
};

export const getFeaturedProducts = () => {
  return products.filter((product) => product.featured);
};

export const getProductById = (id) => {
  return products.find((product) => product.id === id);
};

export const searchProducts = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery),
  );
};

export default products;
