import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { CONTACT_INFO, SOCIAL_LINKS } from '../../utils/constants';
import { sendContactEmail } from '../../services/emailService';
import { isValidEmail, getWhatsAppLink, getMapLink } from '../../utils/helpers';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const Contact = ({ isPage = false }) => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status.type) setStatus({ type: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' });
      setIsSubmitting(false);
      return;
    }

    if (!isValidEmail(formData.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      setIsSubmitting(false);
      return;
    }

    const result = await sendContactEmail(formData);

    if (result.success) {
      setStatus({ type: 'success', message: 'Message sent successfully! We will contact you soon.' });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } else {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    }

    setIsSubmitting(false);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`relative py-24 lg:py-32 bg-dark-50 ${isPage ? 'pt-32' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6">
            <span className="text-gold-400 text-sm font-medium">Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
            Contact <span className="text-gold-400">Us</span>
          </h2>
          <p className="text-lg text-dark-600">
            Have questions about our products, livestock, or properties? We are here to help.
            Reach out to us through any of the channels below.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Info Cards */}
            <div className="grid gap-4">
              {/* Phone */}
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex items-start gap-4 p-4 rounded-xl bg-dark-100/50 border border-gold-500/10 hover:border-gold-500/30 transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors">
                  <Phone className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Phone</h4>
                  <p className="text-dark-600 text-sm mt-1">{CONTACT_INFO.phone}</p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-start gap-4 p-4 rounded-xl bg-dark-100/50 border border-gold-500/10 hover:border-gold-500/30 transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors">
                  <Mail className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Email</h4>
                  <p className="text-dark-600 text-sm mt-1">{CONTACT_INFO.email}</p>
                </div>
              </a>

              {/* Address */}
              <a
                href={getMapLink(CONTACT_INFO.address)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-xl bg-dark-100/50 border border-gold-500/10 hover:border-gold-500/30 transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors">
                  <MapPin className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Address</h4>
                  <p className="text-dark-600 text-sm mt-1">{CONTACT_INFO.address}</p>
                </div>
              </a>

              {/* Hours */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-dark-100/50 border border-gold-500/10">
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Working Hours</h4>
                  <p className="text-dark-600 text-sm mt-1">{CONTACT_INFO.workingHours}</p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={getWhatsAppLink(CONTACT_INFO.whatsapp, 'Hello! I have a question about your agricultural products.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-medium transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4">
              {Object.entries(SOCIAL_LINKS).slice(0, 4).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-dark-100 border border-gold-500/20 flex items-center justify-center text-dark-600 hover:text-gold-400 hover:border-gold-500/40 transition-colors capitalize"
                >
                  {platform.charAt(0).toUpperCase()}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="p-6 lg:p-8 rounded-2xl bg-dark-100/50 backdrop-blur-sm border border-gold-500/10">
              <h3 className="text-xl font-semibold text-white mb-6">Send us a message</h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-dark-600 mb-2">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-dark-200 border border-gold-500/20 text-white focus:border-gold-500/50 focus:outline-none transition-colors placeholder-dark-600"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-dark-600 mb-2">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-dark-200 border border-gold-500/20 text-white focus:border-gold-500/50 focus:outline-none transition-colors placeholder-dark-600"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Phone & Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-dark-600 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-dark-200 border border-gold-500/20 text-white focus:border-gold-500/50 focus:outline-none transition-colors placeholder-dark-600"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-dark-600 mb-2">Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-dark-200 border border-gold-500/20 text-white focus:border-gold-500/50 focus:outline-none transition-colors"
                    >
                      <option value="">Select subject</option>
                      <option value="products">Products Inquiry</option>
                      <option value="livestock">Livestock Trading</option>
                      <option value="farmland">Farm Land Inquiry</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm text-dark-600 mb-2">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-dark-200 border border-gold-500/20 text-white focus:border-gold-500/50 focus:outline-none transition-colors placeholder-dark-600 resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                {/* Status Message */}
                {status.message && (
                  <div
                    className={`flex items-center gap-2 p-4 rounded-xl ${
                      status.type === 'success'
                        ? 'bg-primary-500/20 text-primary-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {status.type === 'success' ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <AlertCircle className="w-5 h-5" />
                    )}
                    {status.message}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-dark-50 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Google Maps */}
        {isPage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 rounded-2xl overflow-hidden border border-gold-500/10 h-96"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.27405770525!2d-118.69192113701154!3d34.02016130653294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1679300000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Contact;
