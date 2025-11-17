/**
 * ENHANCED DISTRIBUTORS PAGE
 * 
 * Senior Frontend Developer Improvements:
 * - Modal-based UX (no endless scrolling)
 * - Smooth scroll animations with Intersection Observer
 * - Glass morphism effects
 * - Gradient backgrounds and text
 * - Staggered animations
 * - Enhanced hover effects
 * - Interactive click-to-reveal cards
 * 
 * To use: Rename this file to Distributors.tsx
 */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Plane, BookOpen, Truck, Briefcase, TrendingUp, FileText, Clock, CheckCircle, Users, MapPin, Map } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { ExistingDistributor, DistributorApplication } from '../config/googleSheets';
import googleSheetsService from '../services/googleSheetsService';

const DistributorsEnhanced: React.FC = () => {
  const { t } = useTranslation();
  const [distributors, setDistributors] = useState<ExistingDistributor[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showRequirementsModal, setShowRequirementsModal] = useState(false);
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Fetch distributors
  useEffect(() => {
    const fetchDistributors = async () => {
      try {
        const data = await googleSheetsService.getExistingDistributors();
        setDistributors(data);
      } catch (error) {
        console.error('Error loading distributors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDistributors();
  }, []);

  return (
    <>
      <SEOHead 
        page="distributors"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Distributors', url: '/distributors' }
        ]}
      />
      
      {/* Embedded Styles for Animations */}
      <style>{`
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .scroll-animate.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
        .stagger-4 { transition-delay: 0.4s; }
        .stagger-5 { transition-delay: 0.5s; }
        .stagger-6 { transition-delay: 0.6s; }
        
        .fade-in {
          animation: fadeIn 0.6s ease-in;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .modal-content {
          animation: modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        @keyframes modalSlideIn {
          from { 
            transform: translateY(-50px) scale(0.95);
            opacity: 0;
          }
          to { 
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        
        .benefit-card {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .benefit-card:hover {
          transform: translateY(-8px) scale(1.02);
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .dark .glass-effect {
          background: rgba(31, 41, 55, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-900">
        
        {/* Hero Section with Parallax Effect */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white py-32">
          {/* Animated Background Shapes */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 fade-in">
                Become a Partner
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto fade-in" style={{ animationDelay: '0.2s' }}>
                Join our global network of authorized distributors and transform your aviation parts business
              </p>
              <div className="flex flex-wrap gap-4 justify-center fade-in" style={{ animationDelay: '0.4s' }}>
                <button
                  onClick={() => setShowApplicationModal(true)}
                  className="group px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transform"
                >
                  <span className="flex items-center gap-2">
                    Apply Now
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
                <button
                  onClick={() => setShowRequirementsModal(true)}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105 transform"
                >
                  View Requirements
                </button>
              </div>
            </div>
          </div>
          
          {/* Wave Divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="currentColor" className="text-gray-50 dark:text-gray-900"/>
            </svg>
          </div>
        </section>

        {/* Partnership Benefits */}
        <section id="benefits" className="py-20 scroll-animate">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Partnership <span className="gradient-text">Benefits</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Unlock exclusive advantages and accelerate your business growth
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              <BenefitCard
                icon={<Globe className="w-12 h-12" />}
                title="Global Network"
                description="Access to our worldwide supplier network and exclusive pricing"
                delay="stagger-1"
              />
              <BenefitCard
                icon={<Plane className="w-12 h-12" />}
                title="Authentic OEM Parts"
                description="100% genuine parts with full certification and traceability"
                delay="stagger-2"
              />
              <BenefitCard
                icon={<BookOpen className="w-12 h-12" />}
                title="Training & Support"
                description="Comprehensive training programs and technical support"
                delay="stagger-3"
              />
              <BenefitCard
                icon={<Truck className="w-12 h-12" />}
                title="Logistics Support"
                description="Worldwide shipping and AOG emergency support"
                delay="stagger-4"
              />
              <BenefitCard
                icon={<Briefcase className="w-12 h-12" />}
                title="Marketing Materials"
                description="Co-branded marketing materials and promotional support"
                delay="stagger-5"
              />
              <BenefitCard
                icon={<TrendingUp className="w-12 h-12" />}
                title="Business Growth"
                description="Territory protection and business development assistance"
                delay="stagger-6"
              />
            </div>
          </div>
        </section>

        {/* Interactive Cards Section */}
        <section id="info" className="py-20 bg-white dark:bg-gray-800 scroll-animate">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Requirements Card */}
              <InteractiveCard
                icon={<FileText className="w-12 h-12" />}
                title="Requirements"
                description="Essential criteria to become our distributor partner"
                gradient="from-blue-500 to-blue-700"
                onClick={() => setShowRequirementsModal(true)}
              />

              {/* Process Card */}
              <InteractiveCard
                icon={<Clock className="w-12 h-12" />}
                title="Application Process"
                description="Step-by-step journey to partnership"
                gradient="from-purple-500 to-purple-700"
                onClick={() => setShowProcessModal(true)}
              />

              {/* Network Map Card */}
              <InteractiveCard
                icon={<Map className="w-12 h-12" />}
                title="Global Network"
                description="Our distributors around the world"
                gradient="from-green-500 to-green-700"
                onClick={() => setShowMapModal(true)}
              />
            </div>
          </div>
        </section>

        {/* Partner Testimonials */}
        <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 scroll-animate">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Success <span className="gradient-text">Stories</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Hear from our thriving partner network
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              <TestimonialCard
                quote="Working with Skytech Aviation has transformed our business. The support and quality are exceptional."
                author="Ahmed Al-Mansouri"
                company="Gulf Aviation Parts LLC"
                location="Dubai, UAE"
                delay="stagger-1"
              />
              <TestimonialCard
                quote="Their global network and genuine parts have made us the leading supplier in our region."
                author="Hans Mueller"
                company="Euro Aero Supply"
                location="Frankfurt, Germany"
                delay="stagger-2"
              />
              <TestimonialCard
                quote="Outstanding partnership! The training and technical support are second to none."
                author="Michael Chen"
                company="Asia Pacific Aviation"
                location="Singapore"
                delay="stagger-3"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 relative overflow-hidden scroll-animate">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto">
              Join the world's leading aviation parts distribution network today
            </p>
            <button
              onClick={() => setShowApplicationModal(true)}
              className="group px-10 py-5 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-white/50 hover:scale-110 transform inline-flex items-center gap-3"
            >
              <span className="text-lg">Start Your Application</span>
              <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </section>

        {/* Modals */}
        <RequirementsModal 
          isOpen={showRequirementsModal} 
          onClose={() => setShowRequirementsModal(false)} 
        />
        
        <ProcessModal 
          isOpen={showProcessModal} 
          onClose={() => setShowProcessModal(false)} 
        />
        
        <MapModal 
          isOpen={showMapModal} 
          onClose={() => setShowMapModal(false)}
          distributors={distributors}
          loading={loading}
        />
        
        <ApplicationModal
          isOpen={showApplicationModal}
          onClose={() => setShowApplicationModal(false)}
        />
      </div>
    </>
  );
};

// 
// COMPONENT LIBRARY BELOW
//

// Benefit Card Component
interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description, delay = '' }) => (
  <div className={`benefit-card glass-effect rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl scroll-animate ${delay}`}>
    <div className="text-blue-600 dark:text-blue-400 mb-6 flex justify-center transform hover:scale-125 transition-transform duration-300">{icon}</div>
    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
  </div>
);

// Interactive Card Component
interface InteractiveCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  onClick: () => void;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({ icon, title, description, gradient, onClick }) => (
  <div 
    onClick={onClick}
    className={`group cursor-pointer bg-gradient-to-br ${gradient} rounded-2xl p-8 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl`}
  >
    <div className="mb-4 group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="text-2xl font-bold mb-3">{title}</h3>
    <p className="text-blue-100 mb-4">{description}</p>
    <div className="flex items-center gap-2 text-sm font-semibold">
      Click to view details
      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </div>
);

// Testimonial Card Component
interface TestimonialCardProps {
  quote: string;
  author: string;
  company: string;
  location: string;
  delay?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, company, location, delay = '' }) => (
  <div className={`glass-effect rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:transform hover:translateY(-5px) transition-all duration-400 scroll-animate ${delay}`}>
    <div className="flex items-start mb-6">
      <svg className="w-12 h-12 text-blue-600 opacity-50" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
      </svg>
    </div>
    <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg italic leading-relaxed">{quote}</p>
    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
      <p className="font-bold text-xl text-gray-900 dark:text-white mb-1">{author}</p>
      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">{company}</p>
      <p className="text-sm text-gray-500 dark:text-gray-500 flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {location}
      </p>
    </div>
  </div>
);

// Modal Base Component  
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  maxWidth?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, maxWidth = 'max-w-4xl' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-900/75 backdrop-blur-sm" 
          onClick={onClose}
        ></div>

        {/* Modal Content */}
        <div className={`inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle ${maxWidth} w-full modal-content`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-5">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">{title}</h3>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white/20 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Body */}
          <div className="px-6 py-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Requirements Modal - Shows detailed requirements
interface RequirementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RequirementsModal: React.FC<RequirementsModalProps> = ({ isOpen, onClose }) => {
  const requirements = [
    { title: "Business Registration", description: "Valid business license and registration in your country", required: true, icon: "📄" },
    { title: "Industry Experience", description: "Minimum 3 years in aviation parts distribution or related industry", required: true, icon: "⏱️" },
    { title: "Financial Stability", description: "Demonstrated financial capability and creditworthiness", required: true, icon: "💰" },
    { title: "Geographic Coverage", description: "Established presence in your target territory", required: true, icon: "🌍" },
    { title: "Warehouse Facilities", description: "Adequate storage facilities for aircraft parts", required: false, icon: "🏭" },
    { title: "Certifications", description: "ISO 9001, AS9120 or equivalent quality certifications", required: false, icon: "🏆" }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Distributor Requirements">
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          To ensure the highest quality standards across our global network, we require potential distributors to meet the following criteria:
        </p>
        {requirements.map((req, index) => (
          <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <div className="text-3xl">{req.icon}</div>
            <div className="flex-1">
              <h4 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                {req.title}
                {req.required ? (
                  <span className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded-full">Required</span>
                ) : (
                  <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full">Preferred</span>
                )}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{req.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

// Process Modal - Shows application timeline
interface ProcessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProcessModal: React.FC<ProcessModalProps> = ({ isOpen, onClose }) => {
  const steps = [
    { number: 1, title: "Submit Application", description: "Complete and submit the comprehensive distributor application form", icon: "📝", duration: "15-20 minutes" },
    { number: 2, title: "Initial Review", description: "Our partnership team reviews your application", icon: "🔍", duration: "3-5 business days" },
    { number: 3, title: "Due Diligence", description: "Background verification and financial assessment", icon: "✅", duration: "7-10 business days" },
    { number: 4, title: "Interview", description: "Virtual meeting with our partnership team", icon: "💼", duration: "1-2 hours" },
    { number: 5, title: "Partnership Agreement", description: "Contract signing and onboarding", icon: "🤝", duration: "2-3 weeks" }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Application Process Timeline" maxWidth="max-w-3xl">
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600 mt-2"></div>
                )}
              </div>
              <div className="flex-1 pb-8">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{step.icon}</span>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">{step.title}</h4>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">{step.description}</p>
                  <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">Duration: {step.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
        <h5 className="font-bold text-green-900 dark:text-green-100 mb-1">Total Timeline</h5>
        <p className="text-green-700 dark:text-green-300 text-sm">
          The entire process typically takes <strong>3-6 weeks</strong> from application submission to partnership agreement.
        </p>
      </div>
    </Modal>
  );
};

// Map Modal - Shows global distributor network
interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  distributors: ExistingDistributor[];
  loading: boolean;
}

const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose, distributors, loading }) => {
  const regions = Array.from(new Set(distributors.map(d => d.region))).filter(Boolean);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Global Distributor Network" maxWidth="max-w-6xl">
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 px-8 py-4 rounded-full">
              <div>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{distributors.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Distributors</p>
              </div>
              <div className="w-px h-12 bg-gray-300 dark:bg-gray-600"></div>
              <div>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{regions.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Regions</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((region) => {
              const regionDistributors = distributors.filter(d => d.region === region);
              return (
                <div key={region} className="glass-effect rounded-xl p-6 h-full hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {region}
                  </h3>
                  <div className="space-y-3">
                    {regionDistributors.map((dist) => (
                      <div key={dist.id} className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4">
                        <p className="font-semibold text-gray-900 dark:text-white">{dist.companyName}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{dist.city}, {dist.country}</p>
                        <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full mt-2 inline-block">
                          {dist.yearsPartner} years partner
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </Modal>
  );
};

// Application Modal - Wraps the full application form
interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose }) => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState<Omit<DistributorApplication, 'id' | 'status' | 'submittedDate'>>({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    address: '',
    website: '',
    yearEstablished: '',
    numberOfEmployees: '',
    annualRevenue: '',
    businessLicense: '',
    taxId: '',
    industryExperience: '',
    currentAircraftClients: '',
    territoryPreferences: '',
    warehouseFacilities: 'No',
    certifications: '',
    references: '',
    businessPlan: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const result = await googleSheetsService.submitDistributorApplication(formData);
      
      if (result.success) {
        setSubmitted(true);
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 500);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="fixed inset-0 bg-gray-900/75 backdrop-blur-sm" onClick={onClose}></div>
          <div className="relative bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-2xl p-8 text-center max-w-md w-full modal-content">
            <svg className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-2">
              Application Submitted!
            </h3>
            <p className="text-green-700 dark:text-green-300 mb-6">
              We'll review your application and contact you within 5 business days.
            </p>
            <button onClick={onClose} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20">
        <div className="fixed inset-0 bg-gray-900/75 backdrop-blur-sm" onClick={onClose}></div>

        <div className="relative inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle max-w-5xl w-full modal-content">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-5">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">Distributor Application</h3>
              <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white/20 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg">
                <p className="text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}

            {/* Company Information */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Company Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Company Name *" required value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
                <input type="text" placeholder="Contact Person *" required value={formData.contactPerson} onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
                <input type="email" placeholder="Email *" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
                <input type="tel" placeholder="Phone *" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
                <input type="text" placeholder="Country *" required value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
                <input type="text" placeholder="City *" required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
                <input type="text" placeholder="Address *" required value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="md:col-span-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
                <input type="url" placeholder="Website" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
                <input type="text" placeholder="Tax ID *" required value={formData.taxId} onChange={(e) => setFormData({ ...formData, taxId: e.target.value })} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
              </div>
            </div>

            {/* Business Details */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Business Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="number" placeholder="Year Established *" required min="1900" max={new Date().getFullYear()} value={formData.yearEstablished} onChange={(e) => setFormData({ ...formData, yearEstablished: e.target.value })} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
                <input type="number" placeholder="Employees *" required min="1" value={formData.numberOfEmployees} onChange={(e) => setFormData({ ...formData, numberOfEmployees: e.target.value })} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
                <input type="number" placeholder="Industry Experience (years) *" required min="0" value={formData.industryExperience} onChange={(e) => setFormData({ ...formData, industryExperience: e.target.value })} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
                <input type="text" placeholder="Annual Revenue" value={formData.annualRevenue} onChange={(e) => setFormData({ ...formData, annualRevenue: e.target.value })} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
              </div>
            </div>

            {/* Documentation */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Documentation</h4>
              <div className="space-y-4">
                <input type="text" placeholder="Business License URL *" required value={formData.businessLicense} onChange={(e) => setFormData({ ...formData, businessLicense: e.target.value })} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
                <input type="text" placeholder="Territory Preferences *" required value={formData.territoryPreferences} onChange={(e) => setFormData({ ...formData, territoryPreferences: e.target.value })} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
                <textarea placeholder="Business References (min 2) *" required rows={4} value={formData.references} onChange={(e) => setFormData({ ...formData, references: e.target.value })} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 justify-end sticky bottom-0 bg-white dark:bg-gray-800 py-4 -mx-6 px-6 border-t border-gray-200 dark:border-gray-700">
              <button type="button" onClick={onClose} className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                Cancel
              </button>
              <button type="submit" disabled={submitting} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DistributorsEnhanced;
