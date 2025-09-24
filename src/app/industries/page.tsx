import React from 'react';
import WebsiteLayout from '@/components/website/WebsiteLayout';
import PageHero from '@/components/website/ui/PageHero';
import Link from 'next/link';
import { Smartphone, BarChart3, Cloud, Link as LinkIcon } from 'lucide-react';

export default function IndustriesPage() {
  // Industry solutions
  const industrySolutions = [
    {
      title: "E-Commerce Solutions",
      description: "Comprehensive e-commerce platforms and retail technology solutions for modern businesses.",
      image: "/assets/images/content/eCommerce.png",
      link: "/industries/ecommerce",
      features: ["Online Store Development", "Payment Gateway Integration", "Inventory Management", "Customer Analytics"]
    },
    {
      title: "Transportation & Logistics",
      description: "Advanced logistics and fleet management technology solutions for transportation companies.",
      image: "/assets/images/content/transportation.png",
      link: "/industries/transportation",
      features: ["Fleet Management Systems", "Route Optimization", "Real-time Tracking", "Supply Chain Solutions"]
    },
    {
      title: "Trading Solutions",
      description: "High-performance solutions for financial markets and trading platforms.",
      image: "/assets/images/content/machine.png",
      link: "/industries/stock-exchange",
      features: ["Trading Platforms", "Market Analysis Tools", "Risk Management", "Compliance Systems"]
    }
  ];

  return (
    <WebsiteLayout 
      title="Industries - Industry Solutions for Modern Businesses"
      description="Adysun Ventures provides comprehensive industry solutions across E-Commerce, Transportation & Logistics, and Financial Services. We help businesses work smarter and grow faster with business technology consulting."
    >
      {/* Hero Section */}
      <PageHero
        title="Industries Solutions"
        description="We help businesses work smarter and grow faster with business technology consulting. Reach out to us to build effective digital transformation and technology strategy with IoT, Cloud, Mobility, and Analytics as core technology platforms."
        breadcrumbs={[
          { label: 'Industries', isActive: true }
        ]}
      />

      {/* Industry Solutions Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Industry-Specific Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We specialize in providing tailored technology solutions for various industries, addressing unique challenges and opportunities in each sector.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industrySolutions.map((industry, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={industry.image} 
                    alt={industry.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{industry.title}</h3>
                  <p className="text-gray-600 mb-4">{industry.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {industry.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link 
                    href={industry.link}
                    className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors w-full text-center"
                  >
                    Explore {industry.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Can't Find Your Industry Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-normal mb-4 text-black">
            Can't find your industry?
          </h3>
          <Link 
            href="/contact-us"
            className="text-2xl font-normal text-orange-600 hover:text-orange-700 underline transition-colors"
          >
            Contact Us Now!
          </Link>
        </div>
      </section>

      {/* Product Engineering Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-6">
            Need Expert Help to Estimate Your
            <span className="text-orange-500 block md:inline mx-0 md:mx-3">
              Product Engineering Services
            </span>
            Costs?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Choosing Adysun Ventures as your Digital Transformation Consultant, our skilled architects and business analysts are ready to transform Software Product Engineering for your specific case and help you Step into the Future with Product Engineering Services.
          </p>
        </div>
      </section>

      {/* Technology Platforms Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Core Technology Platforms
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We leverage cutting-edge technologies to deliver innovative solutions across all industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg border border-orange-200 hover:border-orange-300 transition-colors">
              <div className="text-5xl text-orange-600 mb-4">
                <Cloud className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Cloud Computing</h3>
              <p className="text-gray-600 text-sm">
                Scalable cloud infrastructure and platform solutions for modern applications.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-lg border border-orange-200 hover:border-orange-300 transition-colors">
              <div className="text-5xl text-orange-600 mb-4">
                <Smartphone className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Mobility</h3>
              <p className="text-gray-600 text-sm">
                Cross-platform mobile applications and responsive web solutions.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-lg border border-orange-200 hover:border-orange-300 transition-colors">
              <div className="text-5xl text-orange-600 mb-4">
                <BarChart3 className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">IoT Solutions</h3>
              <p className="text-gray-600 text-sm">
                Connected devices and smart systems for industry automation.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-lg border border-orange-200 hover:border-orange-300 transition-colors">
              <div className="text-5xl text-orange-600 mb-4">
                <LinkIcon className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Analytics</h3>
              <p className="text-gray-600 text-sm">
                Data-driven insights and business intelligence solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Ready to Transform Your Industry?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Let's discuss how our industry-specific solutions can drive your business growth and digital transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact-us"
              className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              Get Free Consultation
            </Link>
            <Link 
              href="/services"
              className="border-2 border-orange-600 text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 hover:text-white transition-colors"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </WebsiteLayout>
  );
}
