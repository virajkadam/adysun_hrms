import React from 'react';
import WebsiteLayout from '@/components/website/WebsiteLayout';
import Link from 'next/link';

export default function WebsiteHomePage() {
  return (
    <WebsiteLayout 
      title="Adysun Ventures: Premium IT Solutions & Business Strategy Services"
      description="Leading IT solutions provider offering comprehensive technology services to meet your industry-specific business needs."
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 rounded-lg mb-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">When service matters</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Adysun Ventures is a leading IT solutions provider, offering comprehensive technology services 
            to meet your industry-specific business needs.
          </p>
          <div className="space-x-4">
            <Link 
              href="/services" 
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Our Services
            </Link>
            <Link 
              href="/contact-us" 
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <h3 className="text-2xl font-bold text-center mb-12">Expert IT Solutions with a Decade of Experience</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 border rounded-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h4 className="text-xl font-semibold mb-2">Saving Investments</h4>
            <p className="text-gray-600">Optimize your technology investments for long-term growth and success.</p>
          </div>
          <div className="text-center p-6 border rounded-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h4 className="text-xl font-semibold mb-2">Effective Strategy</h4>
            <p className="text-gray-600">Building effective strategies to optimize your IT infrastructure for maximum ROI.</p>
          </div>
          <div className="text-center p-6 border rounded-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h4 className="text-xl font-semibold mb-2">Innovative Solutions</h4>
            <p className="text-gray-600">Providing cutting-edge IT solutions that keep your business ahead of the curve.</p>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="mb-16">
        <h3 className="text-2xl font-bold text-center mb-12">Industries We Serve</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📈</span>
            </div>
            <h4 className="text-xl font-semibold text-center mb-2">Stock Exchange & Financial Services</h4>
            <p className="text-gray-600 text-center mb-4">High-performance solutions for financial markets and trading platforms.</p>
            <div className="text-center">
              <Link 
                href="/industries/stock-exchange" 
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Explore Financial Services Solutions →
              </Link>
            </div>
          </div>
          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🛒</span>
            </div>
            <h4 className="text-xl font-semibold text-center mb-2">E-Commerce & Retail Solutions</h4>
            <p className="text-gray-600 text-center mb-4">Scalable platforms and solutions for online retail businesses.</p>
            <div className="text-center">
              <Link 
                href="/industries/ecommerce" 
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Discover E-Commerce Solutions →
              </Link>
            </div>
          </div>
          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚚</span>
            </div>
            <h4 className="text-xl font-semibold text-center mb-2">Transportation & Logistics</h4>
            <p className="text-gray-600 text-center mb-4">Logistics and fleet management technology solutions.</p>
            <div className="text-center">
              <Link 
                href="/industries/transportation" 
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                View Transportation Solutions →
              </Link>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link 
            href="/industries" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Explore All Industries
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 rounded-lg p-12 text-center">
        <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Business with IT Solutions?</h3>
        <p className="text-lg text-gray-600 mb-8">Contact us today to discuss how our services can drive your business growth.</p>
        <Link 
          href="/contact-us" 
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
        >
          Get in Touch
        </Link>
      </section>
    </WebsiteLayout>
  );
}
