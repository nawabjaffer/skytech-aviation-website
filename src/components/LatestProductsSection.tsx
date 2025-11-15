import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Product {
  id: string;
  name: string;
  partNumber: string;
  category: string;
  image: string;
  availability: 'inStock' | 'onRequest';
}

const LatestProductsSection: React.FC = () => {
  const { t } = useTranslation();

  // Sample products (in a real app, this would come from an API)
  const featuredProducts: Product[] = [
    {
      id: '1',
      name: 'CFM56-7B Engine',
      partNumber: 'CFM56-7B27',
      category: 'Aircraft Engines',
      image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80',
      availability: 'inStock',
    },
    {
      id: '2',
      name: 'Boeing 737 Landing Gear',
      partNumber: 'B737-LG-001',
      category: 'Landing Gear Systems',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
      availability: 'onRequest',
    },
    {
      id: '3',
      name: 'Honeywell Avionics Suite',
      partNumber: 'HW-AV-2024',
      category: 'Avionics & Electronics',
      image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80',
      availability: 'inStock',
    },
    {
      id: '4',
      name: 'Airbus A320 Hydraulic Pump',
      partNumber: 'A320-HP-456',
      category: 'Hydraulic Systems',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
      availability: 'inStock',
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Latest Products
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our newest additions of authentic OEM aircraft parts
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Availability Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      product.availability === 'inStock'
                        ? 'bg-green-500 text-white'
                        : 'bg-orange-500 text-white'
                    }`}
                  >
                    {product.availability === 'inStock'
                      ? t('products.card.inStock')
                      : t('products.card.onRequest')}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Category */}
                <div className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-2">
                  {product.category}
                </div>

                {/* Product Name */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {product.name}
                </h3>

                {/* Part Number */}
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span className="font-semibold">{t('products.card.partNumber')}:</span>{' '}
                  {product.partNumber}
                </div>

                {/* CTA Button */}
                <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300 flex items-center justify-center group">
                  {t('products.card.requestQuote')}
                  <svg
                    className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            to="/products"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            {t('common.viewAll')}
            <svg
              className="w-6 h-6 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestProductsSection;
