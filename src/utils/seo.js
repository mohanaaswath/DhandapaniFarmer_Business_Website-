// SEO Utilities

export const updateMetaTag = (name, content, isProperty = false) => {
  const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let meta = document.querySelector(selector);

  if (!meta) {
    meta = document.createElement('meta');
    if (isProperty) {
      meta.setAttribute('property', name);
    } else {
      meta.setAttribute('name', name);
    }
    document.head.appendChild(meta);
  }

  meta.setAttribute('content', content);
};

export const updateDocumentTitle = (title) => {
  document.title = title;
};

export const updateCanonicalUrl = (url) => {
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);
};

export const seoConfig = {
  home: {
    title: 'AgriBusiness Marketplace - Premium Agriculture & Livestock Trading',
    description: 'Premium Agriculture Business Marketplace - Buy fresh dairy products, livestock, and farm land. Connect with trusted farmers and agricultural businesses.',
    keywords: 'agriculture, dairy products, livestock, farm land, cattle trading, organic farming',
    ogImage: '/og-image.jpg',
  },
  products: {
    title: 'Products - Fresh Agricultural Products | AgriBusiness Marketplace',
    description: 'Discover premium agricultural products including fresh dairy, organic grains, vegetables, fruits, and spices. Quality products from trusted farmers.',
    keywords: 'agricultural products, fresh dairy, organic vegetables, farm products, buy products online',
    ogImage: '/og-products.jpg',
  },
  livestock: {
    title: 'Livestock Trading - Cattle, Goats, Buffalo | AgriBusiness Marketplace',
    description: 'Premium livestock trading platform. Browse cattle, goats, buffalo, sheep, and poultry. Connect with verified sellers and find healthy livestock.',
    keywords: 'livestock trading, cattle for sale, goats for sale, buffalo trading, farm animals',
    ogImage: '/og-livestock.jpg',
  },
  farmland: {
    title: 'Farm Land & Real Estate - Agricultural Property | AgriBusiness Marketplace',
    description: 'Find premium agricultural land and farm properties. Browse listings for farm land, orchards, ranches, and agricultural real estate.',
    keywords: 'farm land for sale, agricultural property, farm real estate, rural property',
    ogImage: '/og-farmland.jpg',
  },
  contact: {
    title: 'Contact Us - Get in Touch | AgriBusiness Marketplace',
    description: 'Contact AgriBusiness Marketplace for inquiries about our products, livestock, or farm land. We are here to help you with all your agricultural needs.',
    keywords: 'contact, customer support, agricultural inquiries, farm support',
    ogImage: '/og-contact.jpg',
  },
};

export const updatePageSEO = (page, customTitle = null) => {
  const config = seoConfig[page];
  if (!config) return;

  const title = customTitle ? `${customTitle} | AgriBusiness Marketplace` : config.title;

  updateDocumentTitle(title);
  updateMetaTag('description', config.description);
  updateMetaTag('keywords', config.keywords);
  updateMetaTag('og:title', title, true);
  updateMetaTag('og:description', config.description, true);
  updateMetaTag('og:image', config.ogImage, true);
  updateMetaTag('twitter:title', title);
  updateMetaTag('twitter:description', config.description);
  updateMetaTag('twitter:image', config.ogImage);
};

export const generateJsonLd = (type, data) => {
  const schemas = {
    Organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'AgriBusiness Marketplace',
      url: 'https://agribusiness.com',
      logo: 'https://agribusiness.com/logo.png',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-555-123-4567',
        contactType: 'customer service',
        availableLanguage: ['English'],
      },
      sameAs: [
        'https://facebook.com/agribusiness',
        'https://twitter.com/agribusiness',
        'https://instagram.com/agribusiness',
        'https://linkedin.com/company/agribusiness',
      ],
    },
    Product: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: data?.name || 'Product',
      description: data?.description || '',
      image: data?.image || '',
      offers: {
        '@type': 'Offer',
        price: data?.price || 0,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    },
    LocalBusiness: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'AgriBusiness Marketplace',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Farm Valley Road',
        addressLocality: 'Agricultural District',
        addressRegion: 'CA',
        postalCode: '90210',
        addressCountry: 'US',
      },
      telephone: '+1-555-123-4567',
      openingHours: 'Mo-Sa 08:00-18:00',
    },
  };

  return schemas[type] || null;
};

export const injectJsonLd = (type, data = null) => {
  const jsonLd = generateJsonLd(type, data);
  if (!jsonLd) return;

  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(jsonLd);
  document.head.appendChild(script);
};
