
import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { LoadingStateProvider, useLoadingState } from './contexts/LoadingStateContext';
import Layout from './components/Layout';
import VideoLoadingScreen from './components/VideoLoadingScreen';
import PageLoadingFallback from './components/PageLoadingFallback';

// Code splitting: Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Distributors = lazy(() => import('./pages/DistributorsEnhanced'));
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const Services = lazy(() => import('./pages/Services'));
const Contacts = lazy(() => import('./pages/Contacts'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ChatbotWidget = lazy(() => import('./components/ChatbotWidget'));

// Component to handle loading animation on home page
const AppContent = () => {
  const location = useLocation();
  const { setLoadingComplete } = useLoadingState();
  const [showLoading, setShowLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    // Show loading animation on first visit to home page only
    if (location.pathname === '/' && isFirstLoad) {
      setShowLoading(true);
      setIsFirstLoad(false);
    } else if (isFirstLoad) {
      // If first page is not home, don't show loading
      setShowLoading(false);
      setLoadingComplete(true);
      setIsFirstLoad(false);
    }
  }, [location.pathname, isFirstLoad, setLoadingComplete]);

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setLoadingComplete(true);
  };

  return (
    <>
      {/* Show video loading animation on initial home page load */}
      {showLoading && location.pathname === '/' && (
        <VideoLoadingScreen 
          onComplete={handleLoadingComplete}
          videoSrc="/skytech-loading.mp4"
        />
      )}

      {/* Main app content - hide during loading */}
      <div style={{ 
        visibility: showLoading && location.pathname === '/' ? 'hidden' : 'visible',
        opacity: showLoading && location.pathname === '/' ? 0 : 1
      }}>
        <Layout>
          <Suspense fallback={<PageLoadingFallback />}>
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
      <LoadingStateProvider>
        <Router basename="/">
          <AppContent />
        </Router>
      </LoadingStateProvider>
    </DarkModeProvider>
  );
};

export default App;


