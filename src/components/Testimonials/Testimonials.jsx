import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import { testimonials } from '../../data/testimonials';
import { useScrollReveal } from '../../hooks/useScrollReveal';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const Testimonials = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-100/50 to-dark-50" />
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
            <span className="text-gold-400 text-sm font-medium">Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
            What Our <span className="text-gold-400">Customers</span> Say
          </h2>
          <p className="text-lg text-dark-600">
            Real stories from real customers. See how AgriBusiness Marketplace has
            transformed agricultural trading for farmers and buyers alike.
          </p>
        </motion.div>

        {/* Testimonials Swiper */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Swiper
            modules={[Autoplay, Pagination, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2,
              slideShadows: false,
            }}
            pagination={{
              clickable: true,
              bulletClass:
                'inline-block w-2 h-2 rounded-full bg-dark-600 mx-1 cursor-pointer transition-all',
              bulletActiveClass: 'w-6 bg-gold-400',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide
                key={testimonial.id}
                className="!w-[340px] sm:!w-[400px]"
              >
                <div className="h-full p-6 rounded-2xl bg-dark-100/80 backdrop-blur-sm border border-gold-500/10">
                  {/* Quote Icon */}
                  <div className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center mb-4">
                    <Quote className="w-5 h-5 text-gold-400" />
                  </div>

                  {/* Review */}
                  <p className="text-dark-600 leading-relaxed mb-6">
                    "{testimonial.review}"
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? 'text-gold-400 fill-current'
                            : 'text-dark-600'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Product */}
                  <div className="text-sm text-primary-400 mb-4">
                    Purchased: {testimonial.product}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gold-500/10">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gold-500/20"
                    />
                    <div>
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-dark-600">{testimonial.role}</p>
                      <p className="text-xs text-dark-600">{testimonial.location}</p>
                    </div>
                    {testimonial.verified && (
                      <div className="ml-auto">
                        <span className="px-2 py-1 rounded-lg bg-primary-500/20 text-primary-400 text-xs">
                          Verified
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '4.9', label: 'Average Rating', suffix: '/5' },
            { value: '99%', label: 'Satisfaction Rate' },
            { value: '10K+', label: 'Reviews Received' },
            { value: '50+', label: 'Countries Served' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-dark-100/50 border border-gold-500/10"
            >
              <div className="text-3xl font-bold text-gold-400 flex items-baseline justify-center">
                {stat.value}
                {stat.suffix && (
                  <span className="text-lg text-dark-600">{stat.suffix}</span>
                )}
              </div>
              <div className="text-sm text-dark-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
