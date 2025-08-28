import React from 'react';
import WebsiteLayout from '@/components/website/WebsiteLayout';
import SectionTitle from '@/components/website/ui/SectionTitle';
import { BarChart3, Building, Truck, Factory, ShoppingCart, Shield, Lock } from 'lucide-react';

export default function ClientsPage() {
  const clientCategories = [
    {
      title: "Transportation, Logistics & Supply Chain Management",
      clients: [
        { name: "Soltic Africa", image: "/assets/images/content/soltic-africa.jpg" },
        { name: "ONS Fresh", image: "/assets/images/content/ons.jpg" },
        { name: "Jayram Transport Corp.", image: "/assets/images/content/jayram-transport-corp.jpg" },
        { name: "Dial-a-Meal", image: "/assets/images/content/dial-a-meal-1.jpg" },
        { name: "AptolinkPRO", image: "/assets/images/content/apto-link-pro.jpg" },
        { name: "Anand Road Lines", image: "/assets/images/content/anand-road-line.jpg" }
      ]
    },
    {
      title: "Roads Infrastructure & Construction",
      clients: [
        { name: "Ashoka", image: "/assets/images/content/ashoka-buildcon.jpg" },
        { name: "Sanklecha", image: "/assets/images/content/sanklecha.jpg" },
        { name: "Peak Infrastructure", image: "/assets/images/content/peak-infrastructure.jpg" },
        { name: "Safeway", image: "/assets/images/content/safeway-concessions.jpg" },
        { name: "Green Brier", image: "/assets/images/content/greenbrier-living.jpg" },
        { name: "Fluid Robotics", image: "/assets/images/content/fluid-robotics.jpg" }
      ]
    },
    {
      title: "Manufacturing",
      clients: [
        { name: "Mahindra", image: "/assets/images/content/mahindra.jpg" },
        { name: "ACMA", image: "/assets/images/content/acma.jpg" },
        { name: "Kirloskar", image: "/assets/images/content/kirloskar.jpg" },
        { name: "Baxy", image: "/assets/images/content/baxy.jpg" },
        { name: "Jayashree", image: "/assets/images/content/jayram-transport-corp.jpg" },
        { name: "Aryan", image: "/assets/images/content/aryan.jpg" }
      ]
    },
    {
      title: "E-Commerce",
      clients: [
        { name: "Wrestling", image: "/assets/images/content/wrestling.jpg" },
        { name: "Aanknaad", image: "/assets/images/content/ankanaad.jpg" },
        { name: "ManaTarang", image: "/assets/images/content/manatarang.jpg" },
        { name: "Online Stationers", image: "/assets/images/content/online-stationers.jpg" },
        { name: "Snovel", image: "/assets/images/content/snovel.jpg" },
        { name: "Take Rent Pe", image: "/assets/images/content/take-rent-pe.jpg" }
      ]
    }
  ];

  return (
    <WebsiteLayout 
      title="Our Clients - Adysun Ventures"
      description="Discover our diverse client portfolio across transportation, logistics, construction, manufacturing, and e-commerce industries. We've helped businesses transform their operations with innovative IT solutions."
    >
      {/* Hero Section with Banner */}
      <section className="relative mb-16">
        <div className="relative">
          <img
            src="/assets/images/content/clientBanner.jpg"
            alt="Our Clients"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-8">Our Clients</h1>
                <a 
                  href="/contact-us" 
                  className="inline-flex items-center bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors text-lg"
                >
                  <span>Talk to our Solution Specialist</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Categories Section */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {clientCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16 last:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-12 text-center">
                {category.title}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.clients.map((client, clientIndex) => (
                  <div key={clientIndex} className="text-center group">
                    <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
                      <div className="mb-4">
                        <img
                          src={client.image}
                          alt={client.name}
                          className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-orange-400 transition-colors">
                        {client.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Client Success Stories"
            subtitle="Discover how we've helped businesses across industries achieve digital transformation"
            alignment="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">
                  <Truck className="w-6 h-6" />
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Logistics Optimization</h3>
              <p className="text-gray-600">
                Helped transportation companies streamline operations with custom logistics management systems, 
                reducing delivery times by 30% and improving customer satisfaction.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">
                  <Building className="w-6 h-6" />
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Construction Management</h3>
              <p className="text-gray-600">
                Developed comprehensive project management solutions for construction companies, 
                enabling real-time tracking and improved resource allocation.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">
                  <Factory className="w-6 h-6" />
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Manufacturing Efficiency</h3>
              <p className="text-gray-600">
                Implemented smart manufacturing solutions that increased production efficiency by 25% 
                and reduced operational costs through automation and data analytics.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">
                  <ShoppingCart className="w-6 h-6" />
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">E-Commerce Growth</h3>
              <p className="text-gray-600">
                Built scalable e-commerce platforms that helped businesses expand their online presence 
                and increase sales by an average of 40% within the first year.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">
                  <BarChart3 className="w-6 h-6" />
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Analytics</h3>
              <p className="text-gray-600">
                Implemented advanced analytics solutions that provided actionable insights, 
                helping clients make data-driven decisions and improve business performance.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">
                  <Lock className="w-6 h-6" />
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Security & Compliance</h3>
              <p className="text-gray-600">
                Enhanced cybersecurity measures and ensured compliance with industry standards, 
                protecting client data and maintaining regulatory requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Industries We Serve"
            subtitle="Our expertise spans across multiple industries, delivering tailored solutions for unique business challenges"
            alignment="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div className="text-center group">
              <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-3xl">
                  <Truck className="w-8 h-8" />
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Transportation & Logistics</h3>
              <p className="text-sm text-gray-600">
                Fleet management, route optimization, and supply chain solutions
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-3xl">
                  <Building className="w-8 h-8" />
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Construction</h3>
              <p className="text-sm text-gray-600">
                Project management, resource planning, and site monitoring systems
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-3xl">
                  <Factory className="w-8 h-8" />
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Manufacturing</h3>
              <p className="text-sm text-gray-600">
                Smart manufacturing, quality control, and production optimization
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-3xl">
                  <ShoppingCart className="w-8 h-8" />
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">E-Commerce</h3>
              <p className="text-sm text-gray-600">
                Online platforms, payment systems, and customer management
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join Our Success Stories?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Let's discuss how we can help transform your business with innovative IT solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact-us" 
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started Today
            </a>
            <a 
              href="/services" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
            >
              Explore Our Services
            </a>
          </div>
        </div>
      </section>
    </WebsiteLayout>
  );
}
