import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Award, Shield, FileCheck, Phone } from 'lucide-react';
import FarmLandComponent from '../components/FarmLand/FarmLand';
import { updatePageSEO } from '../utils/seo';
import { CONTACT_INFO } from '../utils/constants';
import { getWhatsAppLink } from '../utils/helpers';

const FarmLand = () => {
  useEffect(() => {
    updatePageSEO('farmland');
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/40 via-dark-50 to-gold-900/30" />
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6"
            >
              <MapPin className="w-4 h-4 text-gold-400" />
              <span className="text-gold-400 text-sm font-medium">Farm Land & Real Estate</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6"
            >
              Premium <span className="text-gold-400">Agricultural</span> Properties
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-dark-600"
            >
              Discover fertile farm lands, ranches, orchards, and agricultural properties.
              Verified listings with complete legal documentation.
            </motion.p>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              href={getWhatsAppLink(CONTACT_INFO.whatsapp, 'Hello! I am interested in your agricultural properties.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-medium transition-colors"
            >
              <Phone className="w-4 h-4" />
              Contact for Viewing
            </motion.a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-dark-100/30 border-y border-gold-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: FileCheck,
                title: 'Legal Documentation',
                desc: 'Complete paperwork',
                color: 'text-gold-400',
              },
              {
                icon: Shield,
                title: 'Verified Listings',
                desc: 'Authentic properties',
                color: 'text-primary-400',
              },
              {
                icon: Award,
                title: 'Best Value',
                desc: 'Competitive pricing',
                color: 'text-gold-400',
              },
              {
                icon: MapPin,
                title: 'Prime Locations',
                desc: 'Strategic areas',
                color: 'text-primary-400',
              },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 mx-auto rounded-xl bg-gold-500/10 flex items-center justify-center mb-3">
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-white font-semibold">{feature.title}</h3>
                <p className="text-dark-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Listings */}
      <FarmLandComponent />
    </motion.main>
  );
};

export default FarmLand;
