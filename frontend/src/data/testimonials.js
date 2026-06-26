export const testimonials = [
  {
    id: "t-001",
    name: "Sarah Johnson",
    role: "Dairy Farm Owner",
    location: "Wisconsin, USA",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    review:
      "AgriBusiness Marketplace transformed my dairy farming business. Found the best quality Holstein cows with excellent milk yield. The verification process gave me confidence, and the sellers were incredibly professional.",
    product: "Holstein Dairy Cows",
    date: "2024-01-15",
    verified: true,
  },
  {
    id: "t-002",
    name: "Rajesh Kumar",
    role: "Agricultural Entrepreneur",
    location: "Punjab, India",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    review:
      "Purchased 50 acres of prime agricultural land through this platform. The process was smooth, documentation was perfect, and the land quality exceeded my expectations. Highly recommend for serious farmers.",
    product: "Agricultural Land",
    date: "2024-01-10",
    verified: true,
  },
  {
    id: "t-003",
    name: "Michael Thompson",
    role: "Restaurant Chain Owner",
    location: "New York, USA",
    avatar:
      "https://images.pexels.com/photos/937918/pexels-photo-937918.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    review:
      "As a restaurant owner, ingredient quality is paramount. The organic grains and fresh vegetables I source from AgriBusiness are outstanding. My customers love the authentic taste!",
    product: "Organic Grains & Vegetables",
    date: "2024-01-05",
    verified: true,
  },
  {
    id: "t-004",
    name: "Maria Garcia",
    role: "Organic Farm Enthusiast",
    location: "California, USA",
    avatar:
      "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    review:
      "Found certified organic produce that I couldnt find anywhere else. The quality of vegetables and fruits is exceptional. The platform connects you directly with genuine organic farmers.",
    product: "Organic Vegetables & Fruits",
    date: "2024-01-02",
    verified: true,
  },
  {
    id: "t-005",
    name: "John Smith",
    role: "Cattle Rancher",
    location: "Texas, USA",
    avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 4,
    review:
      "Sold my livestock through this marketplace and got a fair price. The platform made it easy to reach serious buyers. The entire transaction was handled professionally.",
    product: "Livestock Trading",
    date: "2023-12-28",
    verified: true,
  },
  {
    id: "t-006",
    name: "Anita Sharma",
    role: "Home Chef & Food Blogger",
    location: "Mumbai, India",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    review:
      "The spices and fresh produce I order from here are of restaurant quality. Fresh, authentic, and delivered right to my doorstep. Perfect for my cooking channel!",
    product: "Fresh Produce & Spices",
    date: "2023-12-20",
    verified: true,
  },
  {
    id: "t-007",
    name: "David Williams",
    role: "Vineyard Owner",
    location: "Oregon, USA",
    avatar:
      "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 4,
    review:
      "Bought a beautiful mountain orchard property. The listing was accurate, and the support team was helpful throughout the process. Great platform for agricultural real estate.",
    product: "Mountain Orchard Property",
    date: "2023-12-15",
    verified: true,
  },
  {
    id: "t-008",
    name: "Linda Chen",
    role: "Health Coach",
    location: "Seattle, USA",
    avatar:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    review:
      "Finally a marketplace that delivers truly organic products! The grains, fruits, and spices Ive ordered are of premium quality. I confidently recommend these products to my clients.",
    product: "Organic Spices & Produce",
    date: "2023-12-10",
    verified: true,
  },
];

export const getTestimonialsByRating = (minRating) => {
  return testimonials.filter((item) => item.rating >= minRating);
};

export const getFeaturedTestimonials = () => {
  return testimonials.filter((item) => item.rating === 5);
};

export const getRecentTestimonials = (limit = 5) => {
  return [...testimonials]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
};

export default testimonials;
