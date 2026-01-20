import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Product } from '../config/googleSheets';
import googleSheetsService from '../services/googleSheetsService';
import { NAV_LINKS, QUOTE_CONFIG, EMAIL_LINKS } from '../config/links';
import { X, Mail, User, Building2, Phone, MessageSquare, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { convertToDirectImageUrl } from '../utils/imageUrlConverter';

// Quote Modal Component
interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, product }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    
    setIsSubmitting(true);
    
    // Generate email content
    const subject = `Quote Request: ${product.name} - Skytech Aviation`;
    const body = QUOTE_CONFIG.generateEmailBody(
      { name: product.name, category: product.category, partNumber: product.partNumber },
      formData
    );
    
    // Open email client
    const mailtoLink = EMAIL_LINKS.mailto(QUOTE_CONFIG.recipientEmail, subject, body);
    window.location.href = mailtoLink;
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset and close after delay
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl shadow-2xl transform transition-all animate-modal-enter overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative px-4 sm:px-8 pt-6 sm:pt-8 pb-3 sm:pb-4">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all"
          >
            <X className="w-5 h-5" />
          </button>
          
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white pr-8">
            Request Quote
          </h3>
          {product && (
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
              {product.name}
            </p>
          )}
        </div>
        
        {/* Form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="px-4 sm:px-8 pb-6 sm:pb-8 space-y-3 sm:space-y-4">
            {/* Name */}
            <div className="relative">
              <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                required
                placeholder="Your Name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#0b6d94] focus:border-transparent outline-none transition-all text-sm sm:text-base text-gray-900 dark:text-white placeholder:text-gray-400"
              />
            </div>
            
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="email"
                required
                placeholder="Email Address *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#0b6d94] focus:border-transparent outline-none transition-all text-sm sm:text-base text-gray-900 dark:text-white placeholder:text-gray-400"
              />
            </div>
            
            {/* Phone & Company Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative">
                <Phone className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#0b6d94] focus:border-transparent outline-none transition-all text-sm sm:text-base text-gray-900 dark:text-white placeholder:text-gray-400"
                />
              </div>
              <div className="relative">
                <Building2 className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#0b6d94] focus:border-transparent outline-none transition-all text-sm sm:text-base text-gray-900 dark:text-white placeholder:text-gray-400"
                />
              </div>
            </div>
            
            {/* Message */}
            <div className="relative">
              <MessageSquare className="absolute left-3 sm:left-4 top-3 sm:top-4 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <textarea
                placeholder="Additional Message (Optional)"
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#0b6d94] focus:border-transparent outline-none transition-all text-sm sm:text-base text-gray-900 dark:text-white placeholder:text-gray-400 resize-none"
              />
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 sm:py-4 bg-[#0b6d94] hover:bg-[#095a7a] text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 text-sm sm:text-base"
            >
              {isSubmitting ? (
                <span>Opening Email Client...</span>
              ) : (
                <>
                  <span>Request Quote</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            
            <p className="text-xs text-center text-gray-400">
              This will open your email client to send the request
            </p>
          </form>
        ) : (
          <div className="px-4 sm:px-8 pb-6 sm:pb-8 text-center py-8 sm:py-12">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Request Initiated!</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Please complete sending the email in your email client.</p>
          </div>
        )}
      </div>
      
      {/* Modal Animation Styles */}
      <style>{`
        @keyframes modal-enter {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-modal-enter {
          animation: modal-enter 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

const LatestProductsSection: React.FC = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [activeProduct, setActiveProduct] = useState<number | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await googleSheetsService.getProducts();
        // Get more products for carousel effect
        setProducts(data.slice(0, 8));
      } catch {
        // Silently handle error - products section will show default state
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleRequestQuote = (product: Product) => {
    setSelectedProduct(product);
    setQuoteModalOpen(true);
  };

  if (loading) {
    return (
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="w-2 h-2 bg-[#0b6d94] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-[#0b6d94] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-[#0b6d94] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </section>
    );
  }

  // Duplicate products for infinite scroll effect
  const displayProducts = [...products, ...products];

  return (
    <>
      <section className="py-12 md:py-20 bg-white dark:bg-gray-800">
        {/* Section Header - Inside container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <span className="inline-block px-4 py-2 bg-[#0b6d94]/10 text-[#0b6d94] dark:text-aviation-blue-400 text-sm font-semibold rounded-full mb-4">
              Featured Products
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Latest Products
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our newest additions of authentic OEM aircraft parts
            </p>
          </div>
        </div>

        {/* Products Carousel - Full width with edge fades */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            setActiveProduct(null);
          }}
        >
          {/* Fade edges - Positioned at container edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 lg:w-24 bg-gradient-to-r from-white dark:from-gray-800 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 lg:w-24 bg-gradient-to-l from-white dark:from-gray-800 to-transparent z-10 pointer-events-none"></div>
          
          {/* Carousel Track Container */}
          <div className="overflow-hidden">
            <div 
              ref={carouselRef}
              className="products-carousel-track flex gap-4 md:gap-6 py-4 px-4 md:px-8"
              style={{
                animationPlayState: isPaused ? 'paused' : 'running'
              }}
            >
            {displayProducts.map((product, index) => {
              const imageUrl = convertToDirectImageUrl(product.imageUrl);
              return (
              <div
                key={`${product.id}-${index}`}
                className={`product-card flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] bg-gray-50 dark:bg-gray-900 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg transition-all duration-500 ease-out ${
                  activeProduct === index 
                    ? 'scale-[1.02] md:scale-105 shadow-2xl z-20' 
                    : 'hover:shadow-xl'
                }`}
                onMouseEnter={() => setActiveProduct(index)}
                onMouseLeave={() => setActiveProduct(null)}
              >
                {/* Product Image */}
                <div className="relative h-44 sm:h-48 md:h-52 overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                      activeProduct === index ? 'scale-110' : ''
                    }`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div className="hidden absolute inset-0 flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                    <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500 ${
                    activeProduct === index ? 'opacity-100' : 'opacity-0'
                  }`}></div>
                  
                  {/* Availability Badge */}
                  <div className="absolute top-3 right-3 md:top-4 md:right-4">
                    <span
                      className={`px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm ${
                        product.availability === 'In Stock'
                            ? 'bg-green-500/90 text-white'
                            : product.availability === 'Limited'
                            ? 'bg-yellow-500/90 text-white'
                            : 'bg-orange-500/90 text-white'
                        }`}
                      >
                        {product.availability}
                      </span>
                    </div>
                    
                    {/* Quick Action on Hover */}
                    <div className={`absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 transition-all duration-500 ${
                      activeProduct === index 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                    }`}>
                      <button
                        onClick={() => handleRequestQuote(product)}
                        className="w-full py-2.5 md:py-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm text-[#0b6d94] font-semibold rounded-lg md:rounded-xl hover:bg-white dark:hover:bg-gray-900 transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg text-sm md:text-base"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Request Quote</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 md:p-6">
                    {/* Category */}
                    <div className="text-xs md:text-sm text-[#0b6d94] dark:text-aviation-blue-400 font-semibold mb-1.5 md:mb-2">
                      {product.category}
                    </div>

                    {/* Product Name */}
                    <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-1.5 md:mb-2 line-clamp-2 leading-tight">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className={`text-xs md:text-sm text-gray-600 dark:text-gray-400 transition-all duration-500 ${
                      activeProduct === index ? 'line-clamp-3' : 'line-clamp-2'
                    }`}>
                      {product.description}
                    </p>

                    {/* Expanded Details on Hover */}
                    <div className={`overflow-hidden transition-all duration-500 ${
                      activeProduct === index ? 'max-h-24 opacity-100 mt-3 md:mt-4' : 'max-h-0 opacity-0'
                    }`}>
                      {product.partNumber && (
                        <div className="flex items-center justify-between text-xs md:text-sm py-2 border-t border-gray-200 dark:border-gray-700">
                          <span className="text-gray-500 dark:text-gray-400">Part #</span>
                          <span className="font-medium text-gray-900 dark:text-white">{product.partNumber}</span>
                        </div>
                      )}
                      <Link
                        to={`${NAV_LINKS.products}?category=${encodeURIComponent(product.category)}`}
                        className="inline-flex items-center text-xs md:text-sm text-[#0b6d94] hover:text-[#095a7a] font-medium mt-2 group"
                      >
                        View Details
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-10 md:mt-12 px-4">
          <Link
            to={NAV_LINKS.products}
            className="inline-flex items-center px-6 py-3 md:px-8 md:py-4 bg-[#0b6d94] hover:bg-[#095a7a] text-white text-base md:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            {t('common.viewAll')}
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 ml-2" />
          </Link>
        </div>
        
        {/* Carousel Animation Styles */}
        <style>{`
          .products-carousel-track {
            animation: products-scroll 30s linear infinite;
            width: fit-content;
          }
          
          .products-carousel-track:hover {
            animation-play-state: paused;
          }
          
          @keyframes products-scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .product-card {
            transform-origin: center center;
          }
        `}</style>
      </section>
      
      {/* Quote Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        product={selectedProduct}
      />
    </>
  );
};

export default LatestProductsSection;
