import React from 'react';
import WebsiteLayout from '@/components/website/WebsiteLayout';
import Link from 'next/link';

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

  return (
    <WebsiteLayout 
      title="E-Commerce Solutions - Smart Retail Operations and Customer Experience"
      description="Adysun Ventures provides comprehensive e-commerce solutions including online store development, payment integration, inventory management, and customer analytics for modern retail businesses."
    >
      {/* Hero Section */}
      <section 
        className="relative py-20 text-white"
        style={{
          backgroundImage: "url('/assets/images/bg/whyChoose.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Smart Retail: Operations and Customer Experience with Cloud Solutions
            </h1>
            <div className="flex justify-center space-x-4 text-lg mb-8">
              <Link href="/industries" className="hover:text-orange-400 transition-colors">
                Industries
              </Link>
              <span>/</span>
              <span className="text-orange-400">E-Commerce</span>
            </div>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              Transform your retail business with cutting-edge e-commerce solutions that drive growth, enhance customer experience, and streamline operations.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
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
              <img 
                src="/assets/images/content/eCommerce.png" 
                alt="E-Commerce Solutions" 
                className="w-full max-w-md mx-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Comprehensive E-Commerce Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From initial concept to ongoing optimization, we provide end-to-end e-commerce solutions that drive business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ecommerceSolutions.map((solution, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{solution.title}</h3>
                <p className="text-gray-600 mb-6">{solution.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Technology Stack
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We leverage the latest technologies and platforms to build robust, scalable e-commerce solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {technologyStack.map((tech, index) => (
              <div key={index} className="bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-lg p-6 text-center transition-all duration-300 hover:shadow-md">
                <span className="text-lg font-medium text-gray-700 group-hover:text-orange-600">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Choose Our E-Commerce Solutions?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We deliver measurable results that transform your retail business and drive sustainable growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-blue-600 rounded-lg">
              <div className="text-5xl text-orange-400 mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-4">Increased Sales</h3>
              <p className="text-gray-300">
                Optimized user experience and conversion funnels that drive higher sales and revenue growth.
              </p>
            </div>

            <div className="text-center p-6 border border-blue-600 rounded-lg">
              <div className="text-5xl text-orange-400 mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-4">Better Customer Experience</h3>
              <p className="text-gray-300">
                Seamless shopping experiences that increase customer satisfaction and loyalty.
              </p>
            </div>

            <div className="text-center p-6 border border-blue-600 rounded-lg">
              <div className="text-5xl text-orange-400 mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-4">Operational Efficiency</h3>
              <p className="text-gray-300">
                Streamlined processes and automated systems that reduce costs and improve productivity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Development Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We follow a proven methodology to deliver successful e-commerce solutions on time and within budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Discovery</h3>
              <p className="text-gray-600">Understanding your business requirements and defining project scope.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Design</h3>
              <p className="text-gray-600">Creating intuitive user interfaces and seamless user experiences.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Development</h3>
              <p className="text-gray-600">Building robust, scalable e-commerce platforms with modern technologies.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Launch</h3>
              <p className="text-gray-600">Deploying and optimizing your e-commerce platform for maximum performance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Retail Business?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Let's discuss how our e-commerce solutions can drive your business growth and digital transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact-us"
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Free Consultation
            </Link>
            <Link 
              href="/services"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </WebsiteLayout>
  );
}
