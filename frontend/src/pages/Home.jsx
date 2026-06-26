import { useEffect } from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import ProductMarketplace from "../components/ProductMarketplace/ProductMarketplace";
import Livestock from "../components/Livestock/Livestock";
import FarmLand from "../components/FarmLand/FarmLand";
import Testimonials from "../components/Testimonials/Testimonials";
import Statistics from "../components/Statistics/Statistics";
import Contact from "../components/Contact/Contact";
import { updatePageSEO, injectJsonLd } from "../utils/seo";

const Home = () => {
  useEffect(() => {
    updatePageSEO("home");
    injectJsonLd("Organization");
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <About />
      <ProductMarketplace />
      <Livestock />
      <FarmLand />
      <Statistics />
      <Testimonials />
      <Contact />
    </motion.main>
  );
};

export default Home;
