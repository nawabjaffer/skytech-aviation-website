
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DarkModeProvider } from './contexts/DarkModeContext';
import Layout from './components/Layout';

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

const App = () => {
  return (
    <DarkModeProvider>
      <Router basename="/">
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
      </Router>
    </DarkModeProvider>
  );
};

export default App;
