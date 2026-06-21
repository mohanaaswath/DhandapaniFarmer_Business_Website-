import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Beef, Award, Shield, BadgeCheck, Phone } from 'lucide-react';
import LivestockComponent from '../components/Livestock/Livestock';
import { updatePageSEO } from '../utils/seo';
import { CONTACT_INFO } from '../utils/constants';
import { getWhatsAppLink } from '../utils/helpers';

const Livestock = () => {
  useEffect(() => {
    updatePageSEO('livestock');
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
        <div className="absolute inset-0 bg-gradient-to-r from-gold-900/30 via-dark-50 to-primary-900/20" />
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1174154/pexels-photo-1174154.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6"
            >
              <Beef className="w-4 h-4 text-gold-400" />
              <span className="text-gold-400 text-sm font-medium">Livestock Marketplace</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6"
            >
              Premium <span className="text-gold-400">Livestock</span> Trading
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-dark-600"
            >
              Find healthy, verified cattle, goats, buffalo, sheep, and more.
              All listings come from trusted sellers with complete health records.
            </motion.p>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              href={getWhatsAppLink(CONTACT_INFO.whatsapp, 'Hello! I am interested in your livestock listings.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-medium transition-colors"
            >
              <Phone className="w-4 h-4" />
              Contact via WhatsApp
            </motion.a>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-dark-100/30 border-y border-gold-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: BadgeCheck,
                title: 'Verified Sellers',
                desc: 'All sellers are vetted',
                color: 'text-gold-400',
              },
              {
                icon: Shield,
                title: 'Health Records',
                desc: 'Complete vaccination history',
                color: 'text-primary-400',
              },
              {
                icon: Award,
                title: 'Best Breeds',
                desc: 'Premium stock available',
                color: 'text-gold-400',
              },
              {
                icon: Phone,
                title: 'Direct Contact',
                desc: 'Connect with sellers directly',
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

      {/* Livestock Listings */}
      <LivestockComponent />
    </motion.main>
  );
};

export default Livestock;
