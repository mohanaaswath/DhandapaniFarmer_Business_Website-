import { useEffect } from 'react';
import { motion } from 'framer-motion';
import ContactComponent from '../components/Contact/Contact';
import { updatePageSEO } from '../utils/seo';

const Contact = () => {
  useEffect(() => {
    updatePageSEO('contact');
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      <ContactComponent isPage />
    </motion.main>
  );
};

export default Contact;
