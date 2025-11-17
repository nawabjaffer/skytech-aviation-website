import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Plane, BookOpen, Truck, Briefcase, TrendingUp } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { ExistingDistributor, DistributorApplication } from '../config/googleSheets';
import googleSheetsService from '../services/googleSheetsService';

const Distributors: React.FC = () => {
  const { t } = useTranslation();
  const [distributors, setDistributors] = useState<ExistingDistributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showRequirementsModal, setShowRequirementsModal] = useState(false);
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

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
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

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
      <SEOHead title="Become a Distributor - Skytech Aviation" />
      
      {/* Add custom animations CSS */}
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
        
        .slide-up {
          animation: slideUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        @keyframes slideUp {
          from { 
            transform: translateY(100%);
            opacity: 0;
          }
          to { 
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .scale-in {
          animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .benefit-card {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .benefit-card:hover {
          transform: translateY(-8px) scale(1.02);
        }
        
        .testimonial-card {
          transition: all 0.4s ease;
        }
        
        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        
        .modal-backdrop {
          animation: fadeIn 0.3s ease;
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
        
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
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
                {t('distributors.hero.title') || 'Become a Partner'}
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto fade-in" style={{ animationDelay: '0.2s' }}>
                {t('distributors.hero.subtitle') || 'Join our global network of authorized distributors and transform your aviation parts business'}
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
                icon="🌍"
                title="Global Network"
                description="Access to our worldwide supplier network and exclusive pricing"
                delay="stagger-1"
              />
              <BenefitCard
                icon="✈️"
                title="Authentic OEM Parts"
                description="100% genuine parts with full certification and traceability"
                delay="stagger-2"
              />
              <BenefitCard
                icon="📚"
                title="Training & Support"
                description="Comprehensive training programs and technical support"
                delay="stagger-3"
              />
              <BenefitCard
                icon="🚚"
                title="Logistics Support"
                description="Worldwide shipping and AOG emergency support"
                delay="stagger-4"
              />
              <BenefitCard
                icon="💼"
                title="Marketing Materials"
                description="Co-branded marketing materials and promotional support"
                delay="stagger-5"
              />
              <BenefitCard
                icon="📈"
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
              <div 
                onClick={() => setShowRequirementsModal(true)}
                className="group cursor-pointer bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-8 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📋</div>
                <h3 className="text-2xl font-bold mb-3">Requirements</h3>
                <p className="text-blue-100 mb-4">Essential criteria to become our distributor partner</p>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  Click to view details
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Process Card */}
              <div 
                onClick={() => setShowProcessModal(true)}
                className="group cursor-pointer bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-8 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🔄</div>
                <h3 className="text-2xl font-bold mb-3">Application Process</h3>
                <p className="text-purple-100 mb-4">Step-by-step journey to partnership</p>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  Click to view timeline
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Network Map Card */}
              <div 
                onClick={() => setShowMapModal(true)}
                className="group cursor-pointer bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-8 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🗺️</div>
                <h3 className="text-2xl font-bold mb-3">Global Network</h3>
                <p className="text-green-100 mb-4">Our distributors around the world</p>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  Click to view map
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
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

        {/* CTA Section with Floating Button */}
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

// Benefit Card Component
interface BenefitCardProps {
  icon: string;
  title: string;
  description: string;
  delay?: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description, delay = '' }) => (
  <div className={`benefit-card glass-effect rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl scroll-animate ${delay}`}>
    <div className="text-6xl mb-6 transform hover:scale-125 transition-transform duration-300">{icon}</div>
    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
  </div>
);

// Requirement Item Component
interface RequirementItemProps {
  title: string;
  description: string;
  required: boolean;
}

const RequirementItem: React.FC<RequirementItemProps> = ({ title, description, required }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0">
      {required ? (
        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      ) : (
        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </div>
    <div>
      <h4 className="font-semibold text-gray-900 dark:text-white">
        {title} {required && <span className="text-red-500">*</span>}
      </h4>
      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{description}</p>
    </div>
  </div>
);

// Process Step Component
interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ number, title, description }) => (
  <div className="relative text-center">
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
        {number}
      </div>
      <h3 className="font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
    {number < 4 && (
      <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-blue-300 dark:bg-blue-700" style={{ width: 'calc(100% - 4rem)' }} />
    )}
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
  <div className={`testimonial-card glass-effect rounded-2xl p-8 shadow-lg scroll-animate ${delay}`}>
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

// Distributor Map Component
interface DistributorMapProps {
  distributors: ExistingDistributor[];
}

const DistributorMap: React.FC<DistributorMapProps> = ({ distributors }) => {
  const regions = Array.from(new Set(distributors.map(d => d.region))).filter(Boolean);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      {/* Simple text-based map representation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regions.map((region) => {
          const regionDistributors = distributors.filter(d => d.region === region);
          return (
            <div key={region} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {region}
              </h3>
              <div className="space-y-3">
                {regionDistributors.map((dist) => (
                  <div key={dist.id} className="bg-gray-50 dark:bg-gray-700 rounded p-3">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{dist.companyName}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{dist.city}, {dist.country}</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      Partner for {dist.yearsPartner} years
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
        <p className="text-sm">
          <strong>{distributors.length}</strong> distributors across <strong>{regions.length}</strong> regions worldwide
        </p>
      </div>
    </div>
  );
};

// Application Form Component
interface ApplicationFormProps {
  onClose: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ onClose }) => {
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

  if (submitted) {
    return (
      <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-8 text-center">
        <svg className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-2">
          Application Submitted Successfully!
        </h3>
        <p className="text-green-700 dark:text-green-300 mb-6">
          Thank you for your interest in becoming a Skytech Aviation distributor. We will review your application and contact you within 5 business days.
        </p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      {/* Company Information */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Company Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Company Name *"
            required
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />
          <input
            type="text"
            placeholder="Contact Person *"
            required
            value={formData.contactPerson}
            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
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
            placeholder="Phone Number *"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />
          <input
            type="text"
            placeholder="Country *"
            required
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />
          <input
            type="text"
            placeholder="City *"
            required
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />
          <input
            type="text"
            placeholder="Street Address *"
            required
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="md:col-span-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />
          <input
            type="url"
            placeholder="Website (Optional)"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />
          <input
            type="text"
            placeholder="Tax ID / Business Number *"
            required
            value={formData.taxId}
            onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* Business Details */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Business Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Year Established *"
            required
            min="1900"
            max={new Date().getFullYear()}
            value={formData.yearEstablished}
            onChange={(e) => setFormData({ ...formData, yearEstablished: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />
          <input
            type="number"
            placeholder="Number of Employees *"
            required
            min="1"
            value={formData.numberOfEmployees}
            onChange={(e) => setFormData({ ...formData, numberOfEmployees: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />
          <input
            type="number"
            placeholder="Years of Industry Experience *"
            required
            min="0"
            value={formData.industryExperience}
            onChange={(e) => setFormData({ ...formData, industryExperience: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />
          <input
            type="text"
            placeholder="Annual Revenue (Optional)"
            value={formData.annualRevenue}
            onChange={(e) => setFormData({ ...formData, annualRevenue: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />
          <select
            value={formData.warehouseFacilities}
            onChange={(e) => setFormData({ ...formData, warehouseFacilities: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          >
            <option value="No">No Warehouse Facilities</option>
            <option value="Yes">Have Warehouse Facilities</option>
          </select>
          <input
            type="text"
            placeholder="Certifications (ISO, AS9120, etc.)"
            value={formData.certifications}
            onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* Business License Upload */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Documentation</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Business License URL or File Reference *
            </label>
            <input
              type="text"
              placeholder="Enter URL or file reference"
              required
              value={formData.businessLicense}
              onChange={(e) => setFormData({ ...formData, businessLicense: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Upload your business license to a cloud storage and paste the link here
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Business Plan (Optional)
            </label>
            <input
              type="text"
              placeholder="Enter URL or file reference"
              value={formData.businessPlan}
              onChange={(e) => setFormData({ ...formData, businessPlan: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Territory & References */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Territory & References</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Territory Preferences *
            </label>
            <input
              type="text"
              placeholder="E.g., UAE, Saudi Arabia, Qatar (comma-separated)"
              required
              value={formData.territoryPreferences}
              onChange={(e) => setFormData({ ...formData, territoryPreferences: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Current Aircraft Clients (Optional)
            </label>
            <input
              type="text"
              placeholder="List your current airline or MRO clients"
              value={formData.currentAircraftClients}
              onChange={(e) => setFormData({ ...formData, currentAircraftClients: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Business References *
            </label>
            <textarea
              placeholder="Provide at least 2 business references (Name, Company, Phone, Email)"
              required
              rows={4}
              value={formData.references}
              onChange={(e) => setFormData({ ...formData, references: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              placeholder="Any additional information you'd like to share"
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-4 justify-end">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </form>
  );
};

export default Distributors;