import React from 'react';
import SEOHead from '../components/SEOHead';

const About: React.FC = () => {
  return (
    <>
      <SEOHead title="About Skytech Aviation" />
      <div className="container-custom py-8">
        <div className="about-container">
          <h1>About Skytech Aviation</h1>
          <p>
            Skytech Aviation is an authorized civil aircraft parts supplier and a proud member of the Aviation Suppliers Association (ASA). Our mission is to provide high-quality aircraft parts and exceptional service to our customers in the aviation industry.
          </p>
          <p>
            With years of experience and a commitment to excellence, we ensure that our clients receive the best products and support for their aviation needs. Our team of experts is dedicated to maintaining the highest standards of quality and reliability in all our offerings.
          </p>
          <p>
            At Skytech Aviation, we believe in building long-lasting relationships with our clients and partners. We strive to be your trusted source for all your aircraft parts requirements.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;