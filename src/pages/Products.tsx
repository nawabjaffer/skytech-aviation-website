import React from 'react';
import SEOHead from '../components/SEOHead';

const Products: React.FC = () => {
  return (
    <>
      <SEOHead title="Products - Skytech Aviation" />
      <div className="container-custom py-8">
        <div className="products-page">
          <h1>Our Products</h1>
          <p>Welcome to the Skytech Aviation Products page. Here you can find a wide range of authorized civil aircraft parts.</p>
          <ul>
            <li>Aircraft Engines</li>
            <li>Avionics</li>
            <li>Landing Gear</li>
            <li>Flight Control Systems</li>
            <li>Fuel Systems</li>
            <li>Interior Components</li>
          </ul>
          <p>For more information on specific products, please contact us or visit our services page.</p>
        </div>
      </div>
    </>
  );
};

export default Products;