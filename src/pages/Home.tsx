import React from 'react';
import SEOHead from '../components/SEOHead';

const Home: React.FC = () => {
  return (
    <>
      <SEOHead title="Skytech Aviation - Home" />
      <div className="home-container">
        <h1>Welcome to Skytech Aviation</h1>
        <p>Your trusted partner for civil aircraft parts supply.</p>
        <p>Explore our range of products and services tailored to meet your aviation needs.</p>
      </div>
    </>
  );
};

export default Home;