import { motion } from 'framer-motion';
import { CheckCircle, Users, Award, Truck, Leaf, Target, Heart } from 'lucide-react';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '../../utils/constants';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const About = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });

  const stats = [
    { value: '20+', label: 'Years Experience' },
    { value: '15K+', label: 'Happy Customers' },
    { value: '500+', label: 'Verified Sellers' },
    { value: '50+', label: 'Regions Served' },
  ];

  const values = [
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'We promote sustainable farming practices and eco-friendly agricultural methods.',
    },
    {
      icon: Heart,
      title: 'Quality First',
      description: 'Every product goes through strict quality checks before reaching you.',
    },
    {
      icon: Users,
      title: 'Community Focus',
      description: 'Supporting local farmers and building strong agricultural communities.',
    },
    {
      icon: Award,
      title: 'Trust & Transparency',
      description: 'Complete transparency in pricing, sourcing, and seller verification.',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-50/50 to-dark-50" />
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6">
            <span className="text-gold-400 text-sm font-medium">About Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
            Connecting <span className="text-gold-400">Farmers</span> with{' '}
            <span className="text-gold-400">Families</span>
          </h2>
          <p className="text-lg text-dark-600">
            Since 2009, we have been building bridges between quality agricultural
            producers and discerning customers. Our marketplace ensures you get the
            freshest products while supporting sustainable farming practices.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image Grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={isVisible ? 'animate' : 'initial'}
            className="relative"
          >
            <motion.div
              variants={fadeInLeft}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="rounded-2xl overflow-hidden shadow-xl"
                >
                  <img
                    src="https://images.pexels.com/photos/1174154/pexels-photo-1174154.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Dairy Farm"
                    className="w-full h-48 object-cover"
                  />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="rounded-2xl overflow-hidden shadow-xl"
                >
                  <img
                    src="https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Organic Farm"
                    className="w-full h-32 object-cover"
                  />
                </motion.div>
              </div>
              <div className="space-y-4 pt-8">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="rounded-2xl overflow-hidden shadow-xl"
                >
                  <img
                    src="https://images.pexels.com/photos/1435895/pexels-photo-1435895.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Fresh Products"
                    className="w-full h-32 object-cover"
                  />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="rounded-2xl overflow-hidden shadow-xl"
                >
                  <img
                    src="https://images.pexels.com/photos/42287/animal-cow-countryside-countryside-42287.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Livestock"
                    className="w-full h-48 object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>

            
          </motion.div>

          {/* Right - Content */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={isVisible ? 'animate' : 'initial'}
            className="space-y-8"
          >
            <motion.div variants={fadeInRight} className="space-y-4">
              <h3 className="text-2xl font-bold text-white">
                Your Trusted Agricultural Partner
              </h3>
              <p className="text-dark-600">
                We believe in the power of authentic, farm-fresh products. Our platform
                connects you directly with verified farmers and agricultural businesses,
                ensuring transparency, quality, and fair pricing.
              </p>
            </motion.div>

            {/* Features List */}
            <motion.div variants={fadeInRight} className="space-y-4">
              {[
                'Verified and trusted sellers only',
                'Direct farm-to-table connectivity',
                'Complete product traceability',
                'Secure payment and delivery',
                '24/7 customer support',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold-500/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-gold-400" />
                  </div>
                  <span className="text-dark-600">{item}</span>
                </div>
              ))}
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={fadeInRight}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-gold-400">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-dark-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              className="group p-6 rounded-2xl bg-dark-100/50 backdrop-blur-sm border border-gold-500/10 hover:border-gold-500/30 hover:bg-dark-100/70 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-gold-500/10 flex items-center justify-center mb-4 group-hover:bg-gold-500/20 transition-colors">
                <value.icon className="w-7 h-7 text-gold-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">{value.title}</h4>
              <p className="text-dark-600 text-sm">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
