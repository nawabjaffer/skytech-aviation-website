
import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { DarkModeProvider } from './contexts/DarkModeContext';
import Layout from './components/Layout';
import LoadingAnimation from './components/LoadingAnimation';

// Code splitting: Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Distributors = lazy(() => import('./pages/DistributorsEnhanced'));
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const Services = lazy(() => import('./pages/Services'));
const Contacts = lazy(() => import('./pages/Contacts'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ChatbotWidget = lazy(() => import('./components/ChatbotWidget'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
  </div>
);

// Component to handle loading animation on home page
const AppContent = () => {
  const location = useLocation();
  const [showLoading, setShowLoading] = useState(true); // Start with true to prevent flash
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    // Show loading animation on first visit to home page only
    if (location.pathname === '/' && isFirstLoad) {
      setShowLoading(true);
      setIsFirstLoad(false);
    } else if (isFirstLoad) {
      // If first page is not home, don't show loading
      setShowLoading(false);
      setIsFirstLoad(false);
    }
  }, [location.pathname, isFirstLoad]);

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  return (
    <>
      {/* Show loading animation on initial home page load */}
      {showLoading && location.pathname === '/' && (
        <LoadingAnimation 
          onComplete={handleLoadingComplete}
          minDuration={5500}
        />
      )}

      {/* Main app content - hide during loading */}
      <div style={{ 
        visibility: showLoading && location.pathname === '/' ? 'hidden' : 'visible',
        opacity: showLoading && location.pathname === '/' ? 0 : 1
      }}>
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/distributors" element={<Distributors />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contacts" element={<Contacts />} />
              {/* Catch-all route for 404 pages */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
        <Suspense fallback={null}>
          <ChatbotWidget />
        </Suspense>
      </div>
    </>
  );
};

const App = () => {
  return (
    <DarkModeProvider>
      <Router basename="/">
        <AppContent />
      </Router>
    </DarkModeProvider>
  );
};

export default App;


