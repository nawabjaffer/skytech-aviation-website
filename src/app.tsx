import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DarkModeProvider } from './contexts/DarkModeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Distributors from './pages/Distributors';
import About from './pages/About';
import Products from './pages/Products';
import Services from './pages/Services';
import Contacts from './pages/Contacts';

const App = () => {
  return (
    <DarkModeProvider>
      <Router>
        <Layout>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/distributors" element={<Distributors />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </Layout>
      </Router>
    </DarkModeProvider>
  );
};

export default App;