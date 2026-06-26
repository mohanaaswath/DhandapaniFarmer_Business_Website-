import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Leaf,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
} from "lucide-react";
import {
  NAV_LINKS,
  CONTACT_INFO,
  SOCIAL_LINKS,
  APP_NAME,
} from "../../utils/constants";

const Footer = () => {
  const phoneNumbers = [CONTACT_INFO.phone, CONTACT_INFO.secondaryPhone].filter(
    Boolean,
  );

  const quickLinks = [
    { name: "Products", path: "/products" },
    { name: "Livestock", path: "/livestock" },
    { name: "Real estate", path: "/farmland" },
    { name: "Contact Us", path: "/contact" },
  ];

  const categories = [
    { name: "Grains & Cereals", path: "/products?category=grains" },
    { name: "Vegetables", path: "/products?category=vegetables" },
    { name: "Fruits", path: "/products?category=fruits" },
    { name: "Spices", path: "/products?category=spices" },
  ];

  const livestockTypes = [
    { name: "Cattle", path: "/livestock?category=cow" },
    { name: "Goats", path: "/livestock?category=goat" },
    { name: "Buffalo", path: "/livestock?category=buffalo" },
    { name: "Sheep", path: "/livestock?category=sheep" },
  ];

  return (
    <footer className="relative bg-dark-100 border-t border-gold-500/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                <Leaf className="w-7 h-7 text-gold-400" />
              </div>
              <div>
                <span className="text-xl font-display font-bold text-white tracking-tight">
                  Agri<span className="text-gold-400">Business</span>
                </span>
                <span className="block text-[10px] text-dark-600 tracking-widest uppercase">
                  Marketplace
                </span>
              </div>
            </Link>

            <p className="text-dark-600 mb-6 max-w-md">
              Premium agriculture marketplace connecting farmers with buyers.
              Quality agricultural products, livestock trading, and Real estate
              solutions.
            </p>

            {/* Newsletter */}
            <div>
              <h4 className="text-white font-semibold mb-3">
                Subscribe to Newsletter
              </h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl bg-dark-50 border border-gold-500/20 text-white placeholder-dark-600 focus:border-gold-500/50 focus:outline-none"
                />
                <button className="px-4 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-dark-50 transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-dark-600 hover:text-gold-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              {categories.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-dark-600 hover:text-gold-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-white font-semibold mb-4 mt-6">Livestock</h4>
            <ul className="space-y-2">
              {livestockTypes.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-dark-600 hover:text-gold-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              {phoneNumbers.map((phoneNumber, index) => (
                <li key={phoneNumber} className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gold-400 flex-shrink-0" />
                  <a
                    href={`tel:${phoneNumber.replace(/\s+/g, "")}`}
                    className="text-dark-600 hover:text-gold-400 text-sm transition-colors"
                  >
                    {index === 0 ? "Primary: " : "Secondary: "}
                    {phoneNumber}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-dark-600 hover:text-gold-400 text-sm transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-dark-50 border border-gold-500/20 flex items-center justify-center text-dark-600 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-dark-50 border border-gold-500/20 flex items-center justify-center text-dark-600 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-dark-50 border border-gold-500/20 flex items-center justify-center text-dark-600 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-dark-50 border border-gold-500/20 flex items-center justify-center text-dark-600 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-dark-50 border border-gold-500/20 flex items-center justify-center text-dark-600 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gold-500/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-dark-600 text-sm text-center md:text-left">
              © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <Link
                to="/privacy"
                className="text-dark-600 hover:text-gold-400 text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-dark-600 hover:text-gold-400 text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/refund"
                className="text-dark-600 hover:text-gold-400 text-sm transition-colors"
              >
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
