import React from 'react';
import SEOHead from '../components/SEOHead';

const Distributors: React.FC = () => {
  return (
    <>
      <SEOHead title="Distributors - Skytech Aviation" />
      <div className="distributors-page">
        <h1>Our Distributors</h1>
        <p>Skytech Aviation partners with a network of authorized distributors to provide high-quality aircraft parts and services. Below is a list of our trusted distributors:</p>
        <ul>
          <li>Distributor 1 - Location</li>
          <li>Distributor 2 - Location</li>
          <li>Distributor 3 - Location</li>
          <li>Distributor 4 - Location</li>
          <li>Distributor 5 - Location</li>
        </ul>
        <p>For more information about our distributors, please contact us.</p>
      </div>
    </>
  );
};

export default Distributors;