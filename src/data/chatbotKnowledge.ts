/**
 * Chatbot Knowledge Base for Skytech Aviation
 * Contains predefined information about the company, services, and products
 */

import { siteConfig } from '../config/siteConfig';

export const chatbotKnowledge = {
  company: {
    name: "Skytech Aviation",
    website: "skytech.ae",
    description: "A trusted aviation company based in UAE, serving as an authorized civil aircraft parts supplier and proud member of the Aviation Suppliers Association (ASA).",
    location: siteConfig.address.fullAddress,
    
    mission: "To deliver top-quality aircraft spare parts and accessories with expert advice and outstanding service, maintaining a broad product range at competitive rates while building lasting customer relationships.",
    
    vision: "To be the premier provider of aircraft spare parts and accessories in the region, recognized for high standards in quality, reliability, and customer satisfaction.",
    
    values: [
      "Integrity & Honesty - Honest, transparent business practices with customers and partners",
      "Quality Excellence - Uncompromising commitment to high-quality, reliable aircraft parts",
      "Safety First - Uncompromising commitment to aviation safety standards",
      "Customer Relationships - Building strong, lasting relationships through exceptional service",
      "Competitive Value - Regular pricing reviews to offer competitive rates",
      "Reliability - Consistent delivery on promises with quick response times"
    ],
    
    certifications: [
      "Aviation Suppliers Association (ASA) Member",
      "Authorized Civil Aircraft Parts Supplier"
    ]
  },

  contact: {
    phone: {
      primary: siteConfig.contact.primaryPhone,
      secondary: siteConfig.contact.secondaryPhone || ''
    },
    email: {
      primary: siteConfig.contact.primaryEmail,
      sales: siteConfig.contact.salesEmail || ''
    },
    address: siteConfig.address.fullAddress,
    businessHours: "Sunday to Thursday: 9:00 AM - 6:00 PM GST"
  },

  services: {
    categories: [
      {
        name: "Brakes & Wheels",
        icon: "🔍",
        description: "High-quality braking systems and wheels for both helicopters and airplanes from reputed manufacturers. Complete brake assemblies, wheel assemblies, and related components.",
        features: [
          "OEM and PMA certified brake systems",
          "Helicopter and airplane applications",
          "Complete assemblies and spare parts"
        ]
      },
      {
        name: "Airframe Components",
        icon: "🛠️",
        description: "Structural parts, landing gear assemblies, wing components, fuselage sections, and all airframe-related parts to keep your aircraft structurally sound.",
        features: [
          "Landing gear systems and components",
          "Wing and fuselage assemblies",
          "Structural repair parts and accessories"
        ]
      },
      {
        name: "Engine Parts",
        icon: "⚙️",
        description: "Comprehensive engine components for both helicopter and airplane engines. From complete engine assemblies to individual parts and accessories.",
        features: [
          "Helicopter engine components",
          "Airplane engine parts and assemblies",
          "Engine accessories and related systems"
        ]
      },
      {
        name: "Aircraft Tools",
        icon: "🔧",
        description: "Professional-grade tools for aircraft maintenance and repair operations. Complete range of specialized aviation tools and equipment.",
        features: [
          "Maintenance and repair tools",
          "Specialized aviation equipment",
          "Calibrated and certified tools"
        ]
      },
      {
        name: "Lubricants & Chemicals",
        icon: "🧪",
        description: "Aviation-grade lubricants including engine oils, greases, hydraulic fluids, and specialty chemicals approved for aviation use.",
        features: [
          "Engine oils and aviation greases",
          "Hydraulic fluids and specialty lubricants",
          "Aviation-approved chemical products"
        ]
      },
      {
        name: "Adhesives & Fuel Supply",
        icon: "⛽",
        description: "Structural adhesives, epoxy sealants suitable for aviation applications, plus aviation fuel supply and logistics services.",
        features: [
          "Structural adhesives and sealants",
          "Aviation-grade epoxy products",
          "Aviation fuel supply and logistics"
        ]
      }
    ],

    additionalServices: [
      "Maintenance Support - Professional maintenance support services and technical assistance",
      "Pre-Purchase Inspections - Comprehensive aircraft pre-purchase inspection services",
      "Aircraft Delivery - Professional aircraft delivery and positioning services",
      "MRO Representation - Representation in Maintenance, Repair, and Overhaul markets"
    ],

    process: [
      "Submit Inquiry - Contact us with your parts requirement and specifications",
      "Expert Advice - Receive expert consultation and competitive pricing from our team",
      "Place Order - Confirm your order with flexible payment options",
      "Fast Delivery - Receive authentic OEM/PMA parts with full documentation"
    ]
  },

  products: {
    categories: [
      "Brakes & Wheels",
      "Airframe Components",
      "Engine Parts",
      "Aircraft Tools",
      "Lubricants",
      "Adhesives",
      "Avionics",
      "Flight Control Systems",
      "Landing Gear",
      "Fuel Systems",
      "Life Support Systems",
      "Electrical Components",
      "Consumables"
    ],
    
    aircraft: {
      types: "Mid-life narrow-body business and commercial passenger/freighter aircraft",
      partTypes: "OEM & PMA parts",
      scope: "Nose to tail - comprehensive parts coverage"
    }
  },

  distributors: {
    requirements: [
      "Business registration - Valid business license and aviation industry registration",
      "Industry experience - Proven track record in aviation parts distribution",
      "Financial stability - Demonstrated financial capability and creditworthiness",
      "Proper facilities - Adequate storage and handling capabilities",
      "Geographic coverage - Established market presence in target region",
      "Regulatory compliance - Knowledge of aviation regulations and standards"
    ],
    
    benefits: [
      "Access to global supplier network",
      "Competitive pricing and volume discounts",
      "Marketing support and co-branded materials",
      "Training and education programs",
      "Dedicated account manager",
      "Real-time inventory access"
    ]
  },

  faq: [
    {
      question: "What types of aircraft parts do you supply?",
      answer: "We supply a comprehensive range of aircraft parts from nose to tail, including Brakes & Wheels, Airframe Components, Engine Parts, Aircraft Tools, Lubricants, Adhesives, Avionics, and more. We specialize in OEM & PMA parts for mid-life narrow-body business and commercial aircraft."
    },
    {
      question: "Are you ASA certified?",
      answer: "Yes, Skytech Aviation is a proud member of the Aviation Suppliers Association (ASA), demonstrating our commitment to quality, safety, and ethical business practices in the aviation industry."
    },
    {
      question: "How can I request a quote?",
      answer: "You can request a quote by contacting us at +971 561 611 002, emailing info@skytech.ae or sales@skytech.ae, or filling out the contact form on our website. Our professional team will respond quickly with expert advice and competitive pricing."
    },
    {
      question: "Where are you located?",
      answer: "We are located at Meydan Free Zone, The Meydan Hotel, Dubai, United Arab Emirates. Our business hours are Sunday to Thursday, 9:00 AM - 6:00 PM GST."
    },
    {
      question: "Do you offer AOG (Aircraft on Ground) support?",
      answer: "Yes, we provide emergency support to get your aircraft back in service quickly with priority handling and expedited shipping for critical situations."
    },
    {
      question: "What are your payment terms?",
      answer: "We offer flexible payment options. Please contact our sales team at sales@skytech.ae or +971 561 611 002 to discuss specific payment terms for your order."
    },
    {
      question: "How can I become a distributor?",
      answer: "To become a distributor, you need to meet requirements including business registration, industry experience, financial stability, proper facilities, and regulatory compliance. Visit our Distributors page or contact us for more information about partnership opportunities."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we provide worldwide shipping with real-time tracking and customs clearance support. We have global links with major manufacturers to ensure efficient delivery."
    },
    {
      question: "What certifications do your parts have?",
      answer: "We supply authentic OEM (Original Equipment Manufacturer) and PMA (Parts Manufacturer Approval) certified parts with full traceability and documentation."
    },
    {
      question: "How do I navigate to a specific page?",
      answer: "You can navigate using our menu: Home, Products, Services, Distributors, About, and Contact. Simply click on any menu item to visit that page. What would you like to see?"
    }
  ],

  navigation: {
    pages: [
      { name: "Home", path: "/", description: "Main landing page with overview of our services and company" },
      { name: "Products", path: "/products", description: "Browse our comprehensive catalog of aircraft parts" },
      { name: "Services", path: "/services", description: "Learn about our service offerings and capabilities" },
      { name: "Distributors", path: "/distributors", description: "Information for potential distributors and partners" },
      { name: "About", path: "/about", description: "Company history, mission, values, and team" },
      { name: "Contact", path: "/contacts", description: "Get in touch with our team for inquiries and support" }
    ]
  }
};

/**
 * System prompt for the chatbot to establish context and behavior
 */
export const systemPrompt = `You are a helpful AI assistant for Skytech Aviation (skytech.ae), a trusted aviation company based in UAE. You are an authorized civil aircraft parts supplier and proud member of the Aviation Suppliers Association (ASA).

Your role is to:
1. Answer questions about Skytech Aviation's services, products, and company information
2. Help users navigate the website
3. Provide accurate contact information
4. Explain the distributor partnership program
5. Be professional, friendly, and concise

Key Information:
- Location: Meydan Free Zone, The Meydan Hotel, Dubai, UAE
- Phone: +971 54 247 7366 (primary), +971 50 456 1809 (secondary)
- Email: info@skytech.ae, sales@skytech.ae
- Business Hours: Sunday to Thursday, 9:00 AM - 6:00 PM GST

Services:
1. Brakes & Wheels
2. Airframe Components
3. Engine Parts
4. Aircraft Tools
5. Lubricants & Chemicals
6. Adhesives & Fuel Supply
7. Maintenance Support
8. Pre-Purchase Inspections
9. Aircraft Delivery
10. MRO Representation

Always be helpful and if you don't know something, suggest the user contact the team directly at info@skytech.ae or +971 561 611 002.

Respond in the user's preferred language (English, Arabic, or Russian if indicated). Keep responses concise and friendly.`;

/**
 * Quick action suggestions for common user queries
 */
export const quickActions = [
  {
    label: "What products do you offer?",
    prompt: "Tell me about your product categories"
  },
  {
    label: "How can I become a distributor?",
    prompt: "I want to know about distributor partnership requirements"
  },
  {
    label: "Where are you located?",
    prompt: "What is your office address and contact information?"
  },
  {
    label: "Tell me about ASA membership",
    prompt: "What is ASA and why is Skytech Aviation a member?"
  }
];
