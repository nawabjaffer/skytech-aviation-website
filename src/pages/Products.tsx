import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import SEOHead from '../components/SEOHead';
import { Product } from '../config/googleSheets';
import googleSheetsService from '../services/googleSheetsService';
import { convertToDirectImageUrl } from '../utils/imageUrlConverter';

// Category list
const CATEGORIES = [
  'All',
  'Aircraft Engines',
  'Avionics',
  'Landing Gear',
  'Flight Control Systems',
  'Fuel Systems',
  'Interior Components',
];

// Sort options
type SortOption = 'name-asc' | 'name-desc' | 'category' | 'newest';

const Products: React.FC = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  // Fetch products from Google Sheets
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await googleSheetsService.getProducts();
        setProducts(data);
      } catch {
        // Silently handle error - products will use default data
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.partNumber?.toLowerCase().includes(query) ||
        p.manufacturer?.toLowerCase().includes(query) ||
        p.aircraftModel?.toLowerCase().includes(query)
      );
    }

    // Sort products
    switch (sortBy) {
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'category':
        filtered.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case 'newest':
        // Assuming id represents creation order
        filtered.sort((a, b) => Number(b.id) - Number(a.id));
        break;
    }

    return filtered;
  }, [products, selectedCategory, searchQuery, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortBy]);

  if (loading) {
    return (
      <>
        <SEOHead 
          page="products"
          includeProductCatalog={true}
          breadcrumbs={[
            { name: 'Home', url: '/' },
            { name: 'Products', url: '/products' }
          ]}
        />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-xl text-gray-600 dark:text-gray-300">
            Loading products...
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead 
        page="products"
        includeProductCatalog={true}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Products', url: '/products' }
        ]}
      />
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#0b6d94] to-[#073d53] text-white pt-28 pb-16 md:pt-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('products.title') || 'Our Products'}
            </h1>
            <p className="text-xl text-aviation-blue-100 max-w-3xl">
              {t('products.subtitle') || 'Authorized civil aircraft parts and components with full certification and traceability'}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Filters */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Search Products
                  </label>
                  <input
                    type="text"
                    placeholder="Search by name, part number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0b6d94] dark:bg-gray-700 dark:text-white"
                  />
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {CATEGORIES.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          selectedCategory === category
                            ? 'bg-[#0b6d94] text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0b6d94] dark:bg-gray-700 dark:text-white"
                  >
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="category">Category</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>

                {/* Results Count */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </aside>

            {/* Main Content - Product Grid */}
            <main className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <svg
                    className="mx-auto h-16 w-16 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                    No products found
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {paginatedProducts.map((product, index) => (
                      <ProductCard
                        key={`${product.id}-${index}`}
                        product={product}
                        onClick={() => setSelectedProduct(product)}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-12 flex justify-center gap-2">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        Previous
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 rounded-lg ${
                            currentPage === page
                              ? 'bg-[#0b6d94] text-white'
                              : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          relatedProducts={products.filter(
            p => p.category === selectedProduct.category && p.id !== selectedProduct.id
          ).slice(0, 3)}
        />
      )}
    </>
  );
};

// Product Card Component
interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Convert cloud storage URLs to direct image URLs
  const imageUrl = useMemo(() => convertToDirectImageUrl(product.imageUrl), [product.imageUrl]);
  
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'In Stock':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'On Request':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Limited':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden group"
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
            <div className="animate-pulse w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          </div>
        )}
        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
            <svg className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs text-gray-500 dark:text-gray-400">Image unavailable</span>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={product.name}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        )}
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-[#0b6d94] text-white text-xs font-semibold rounded-full">
            {product.category}
          </span>
        </div>
        {/* Availability Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getAvailabilityColor(product.availability)}`}>
            {product.availability}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {product.name}
        </h3>
        {product.partNumber && (
          <p className="text-sm text-[#0b6d94] dark:text-aviation-blue-400 font-mono mb-2">
            P/N: {product.partNumber}
          </p>
        )}
        {product.manufacturer && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span className="font-semibold">Manufacturer:</span> {product.manufacturer}
          </p>
        )}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <button className="w-full px-4 py-2 bg-[#0b6d94] hover:bg-[#0a5a7a] text-white font-semibold rounded-lg transition-colors">
          Request Quote
        </button>
      </div>
    </div>
  );
};

// Product Detail Modal Component
interface ProductModalProps {
  product: Product;
  onClose: () => void;
  relatedProducts: Product[];
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, relatedProducts }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [imageError, setImageError] = useState(false);
  
  // Convert cloud storage URLs to direct image URLs
  const imageUrl = useMemo(() => convertToDirectImageUrl(product.imageUrl), [product.imageUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    // console.log('Quote request for:', product.name, formData);
    alert('Quote request submitted! We will contact you shortly.');
    onClose();
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'In Stock':
        return 'bg-green-100 text-green-800';
      case 'On Request':
        return 'bg-yellow-100 text-yellow-800';
      case 'Limited':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Product Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Left Column - Image & Specs */}
            <div>
              {imageError ? (
                <div className="w-full h-64 rounded-lg mb-4 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                  <svg className="w-20 h-20 text-gray-400 dark:text-gray-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Image unavailable</span>
                </div>
              ) : (
                <img
                  src={imageUrl}
                  alt={product.name}
                  onError={() => setImageError(true)}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-[#0b6d94] text-white text-sm font-semibold rounded-full">
                  {product.category}
                </span>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getAvailabilityColor(product.availability)}`}>
                  {product.availability}
                </span>
              </div>
            </div>

            {/* Right Column - Info */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {product.name}
              </h3>
              {product.partNumber && (
                <p className="text-[#0b6d94] dark:text-aviation-blue-400 font-mono mb-4">
                  Part Number: {product.partNumber}
                </p>
              )}
              {product.manufacturer && (
                <div className="mb-3">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Manufacturer:</span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">{product.manufacturer}</span>
                </div>
              )}
              {product.aircraftModel && (
                <div className="mb-3">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Aircraft Model:</span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">{product.aircraftModel}</span>
                </div>
              )}
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {product.description}
              </p>
              {product.specifications && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Specifications:</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">
                    {product.specifications}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Request a Quote</h4>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name *"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              />
              <input
                type="email"
                placeholder="Email Address *"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              />
              <input
                type="text"
                placeholder="Company Name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              />
              <textarea
                placeholder="Message / Requirements"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="md:col-span-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              />
              <button
                type="submit"
                className="md:col-span-2 px-6 py-3 bg-[#0b6d94] hover:bg-[#0a5a7a] text-white font-semibold rounded-lg transition-colors"
              >
                Submit Quote Request
              </button>
            </form>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Related Products</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedProducts.map((related) => (
                  <div
                    key={related.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => {
                      // Replace current product with related product
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      onClose();
                    }}
                  >
                    <img src={related.imageUrl} alt={related.name} className="w-full h-32 object-cover rounded mb-2" />
                    <h5 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 line-clamp-2">
                      {related.name}
                    </h5>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {related.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;