# AgriBusiness Marketplace

Premium Agriculture Business Marketplace - A full-featured platform for agricultural products, livestock trading, and Real estate.

## Features

- **Product Marketplace**: Browse and purchase fresh agricultural products
- **Livestock Trading**: Find premium cattle, goats, buffalo, and more
- **Real estate**: Discover agricultural properties
- **Cart System**: Full shopping cart with checkout
- **WhatsApp Integration**: Direct seller communication
- **Responsive Design**: Mobile-first approach
- **Dark Premium Theme**: Luxury UI with gold accents

## Tech Stack

- React.js 18
- Vite
- React Router DOM
- Tailwind CSS
- Framer Motion
- Swiper.js
- Lucide React Icons
- Context API
- Axios
- EmailJS

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── assets/          # Images, icons, videos
│   ├── components/      # Reusable UI components
│   │   ├── Navbar/
│   │   ├── Hero/
│   │   ├── About/
│   │   ├── ProductMarketplace/
│   │   ├── ProductCard/
│   │   ├── CategoryFilter/
│   │   ├── CartDrawer/
│   │   ├── CheckoutModal/
│   │   ├── Livestock/
│   │   ├── FarmLand/
│   │   ├── Testimonials/
│   │   ├── Statistics/
│   │   ├── Contact/
│   │   ├── Footer/
│   │   ├── Loader/
│   │   └── BackToTop/
│   ├── pages/           # Page components
│   ├── layouts/         # Layout templates
│   ├── context/         # React Context
│   ├── hooks/           # Custom hooks
│   ├── data/            # Static data
│   ├── services/        # API services
│   ├── routes/          # Route configuration
│   ├── utils/           # Utility functions
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/              # Static assets
└── package.json
```

## Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:3001/api
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_CONTACT_TEMPLATE=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Deployment

The project is ready for deployment on:

- Vercel
- Netlify
- AWS Amplify
- Any static hosting

## License

MIT License
