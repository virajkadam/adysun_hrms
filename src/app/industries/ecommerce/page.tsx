import React from 'react';
import WebsiteLayout from '@/components/website/WebsiteLayout';
import Link from 'next/link';
import BenefitCard from '@/components/website/BenefitCard';
import CTAButton from '@/components/website/CTAButton';
import { TrendingUp, Target, Zap, ShoppingCart, CreditCard, Package, BarChart3 } from 'lucide-react';

export default function ECommercePage() {
  // E-commerce solutions
  const ecommerceSolutions = [
    {
      title: "Online Store Development",
      description: "Custom e-commerce platforms built with modern technologies for optimal performance and user experience.",
      features: ["Responsive Design", "Mobile-First Approach", "SEO Optimization", "Fast Loading"]
    },
    {
      title: "Payment Gateway Integration",
      description: "Secure payment processing with multiple payment options and fraud protection.",
      features: ["Multiple Payment Methods", "PCI Compliance", "Fraud Detection", "Secure Transactions"]
    },
    {
      title: "Inventory Management",
      description: "Comprehensive inventory tracking and management systems for efficient operations.",
      features: ["Real-time Tracking", "Automated Alerts", "Multi-location Support", "Analytics Dashboard"]
    },
    {
      title: "Customer Analytics",
      description: "Data-driven insights to understand customer behavior and optimize conversions.",
      features: ["User Behavior Tracking", "Conversion Analytics", "A/B Testing", "Performance Metrics"]
    }
  ];

  // Technology stack
  const technologyStack = [
    "Magento", "Shopify", "WooCommerce", "React", "Node.js", "PHP", "MySQL", "AWS", "Docker"
  ];

  // Benefits data
  const benefits = [
    {
      icon: <TrendingUp />,
      title: "Increased Sales",
      description: "Optimized user experience and conversion funnels that drive higher sales and revenue growth."
    },
    {
      icon: <Target />,
      title: "Better Customer Experience",
      description: "Seamless shopping experiences that increase customer satisfaction and loyalty."
    },
    {
      icon: <Zap />,
      title: "Operational Efficiency",
      description: "Streamlined processes and automated systems that reduce costs and improve productivity."
    }
  ];

  // Process steps
  const processSteps = [
    {
      number: "1",
      title: "Discovery",
      description: "Understanding your business requirements and defining project scope."
    },
    {
      number: "2",
      title: "Design",
      description: "Creating intuitive user interfaces and seamless user experiences."
    },
    {
      number: "3",
      title: "Development",
      description: "Building robust, scalable e-commerce platforms with modern technologies."
    },
    {
      number: "4",
      title: "Launch",
      description: "Deploying and optimizing your e-commerce platform for maximum performance."
    }
  ];

  return (
    <WebsiteLayout 
      title="E-Commerce Solutions - Smart Retail Operations and Customer Experience"
      description="Adysun Ventures provides comprehensive e-commerce solutions including online store development, payment integration, inventory management, and customer analytics for modern retail businesses."
    >
      {/* Hero Section */}
      <section className="pt-16 pb-20 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <span className="text-orange-600 font-semibold text-lg bg-white px-6 py-3 rounded-full shadow-md">
              E-Commerce Solutions
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8">
            Smart Retail: Operations and Customer Experience
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-8">
            with Cloud Solutions
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
          <div className="flex justify-center space-x-4 text-lg mb-8">
            <Link href="/industries" className="text-gray-700 hover:text-orange-600 transition-colors">
              Industries
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-orange-600 font-semibold">E-Commerce</span>
          </div>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Transform your retail business with cutting-edge e-commerce solutions that drive growth, enhance customer experience, and streamline operations.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Revolutionizing Retail with Technology
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                In today's digital-first world, e-commerce is not just an option—it's essential for business survival and growth. We help retail businesses transform their operations with innovative technology solutions that create seamless shopping experiences.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our comprehensive e-commerce solutions combine cutting-edge technology with industry best practices to deliver platforms that drive conversions, increase customer loyalty, and optimize business operations.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl shadow-lg border border-orange-200">
                <img 
                  src="/assets/images/content/eCommerce.png" 
                  alt="E-Commerce Solutions" 
                  className="w-full max-w-md mx-auto rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive E-Commerce Solutions
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              From initial concept to ongoing optimization, we provide end-to-end e-commerce solutions that drive business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ecommerceSolutions.map((solution, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-orange-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{solution.title}</h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">{solution.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3 text-lg">Key Features:</h4>
                  <ul className="space-y-3">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-base text-gray-600">
                        <div className="w-3 h-3 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Technology Stack
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We leverage the latest technologies and platforms to build robust, scalable e-commerce solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {technologyStack.map((tech, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 to-orange-200 border-2 border-orange-200 hover:border-orange-300 rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <span className="text-lg font-semibold text-gray-700 group-hover:text-orange-600">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Our E-Commerce Solutions?
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              We deliver measurable results that transform your retail business and drive sustainable growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Development Process
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We follow a proven methodology to deliver successful e-commerce solutions on time and within budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-700 transition-colors">
                  {step.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-orange-900/95 to-orange-800/95 text-white relative"
               style={{ backgroundImage: 'url(/assets/images/bg/whyChoose.png)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/95 to-orange-800/95"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Ready to Transform Your Retail Business?
            </h2>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed mb-10">
              Let's discuss how our e-commerce solutions can drive your business growth and digital transformation.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <CTAButton href="/contact-us" variant="primary">
              Get Free Consultation
            </CTAButton>
            <CTAButton href="/services" variant="secondary">
              View Our Services
            </CTAButton>
          </div>
        </div>
      </section>
    </WebsiteLayout>
  );
}
