import React from 'react';
import WebsiteLayout from '@/components/website/WebsiteLayout';
import SectionTitle from '@/components/website/ui/SectionTitle';
import ContactCard from '@/components/website/content/ContactCard';
import { Briefcase, Mail, Clock, Globe, Check } from 'lucide-react';

export default function ContactUsPage() {
  return (
    <WebsiteLayout 
      title="Contact Us - Adysun Ventures"
      description="Get in touch with Adysun Ventures for IT solutions and business strategy consulting. Contact our Pune and Thane offices or reach us via email and phone."
    >
      {/* Hero Section */}
      <section className="relative bg-cover bg-center bg-no-repeat py-20 mb-16"
               style={{ backgroundImage: 'url(/assets/images/content/tab-content-03.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <nav className="flex justify-center items-center space-x-2 text-white">
            <a href="/" className="hover:text-orange-400 transition-colors">Home</a>
            <span>/</span>
            <span className="text-orange-400">Contact Us</span>
          </nav>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Get In Touch"
            subtitle="We're here to help you transform your business with innovative IT solutions"
            alignment="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <ContactCard
              title="Pune Office (Head Office)"
              icon="📍"
              content={
                <div>
                  <p className="font-semibold">Adysun Ventures Pvt. Ltd.</p>
                  <p>Pune, Maharashtra, India</p>
                  <p className="text-sm text-gray-600 mt-2">Main headquarters and development center</p>
                </div>
              }
              actions={[
                { text: "Get Directions", href: "#", variant: "primary" },
                { text: "View on Map", href: "#", variant: "primary" }
              ]}
            />
            
            <ContactCard
              title="Thane Office (Mumbai Division)"
              icon="📍"
              content={
                <div>
                  <p className="font-semibold">Adysun Ventures Pvt. Ltd.</p>
                  <p>Thane, Mumbai, Maharashtra, India</p>
                  <p className="text-sm text-gray-600 mt-2">Mumbai metropolitan region office</p>
                </div>
              }
              actions={[
                { text: "Get Directions", href: "#", variant: "primary" },
                { text: "View on Map", href: "#", variant: "primary" }
              ]}
            />
            
            <ContactCard
              title="Email Contacts"
              icon={<Mail className="w-8 h-8" />}
              content={
                <div>
                  <p className="font-semibold mb-2">General Inquiries:</p>
                  <p className="text-blue-600">info@adysunventures.com</p>
                  <p className="font-semibold mb-2 mt-3">HR & Recruitment:</p>
                  <p className="text-blue-600">hr@adysunventures.com</p>
                </div>
              }
              actions={[
                { text: "Send Email", href: "mailto:info@adysunventures.com", variant: "primary" }
              ]}
            />
            
            <ContactCard
              title="Phone Support"
              icon="📞"
              content={
                <div>
                  <p className="text-lg font-semibold text-blue-600">+91 9511557023</p>
                  <p className="text-sm text-gray-600 mt-2">Mon-Sat: 10:00 AM - 6:00 PM</p>
                  <p className="text-sm text-gray-600">Closed on Sundays & National Holidays</p>
                </div>
              }
              actions={[
                { text: "Call Now", href: "tel:+919511557023", variant: "primary" }
              ]}
            />
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="mb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <SectionTitle
              title="Send Us a Message"
              subtitle="Fill out the form below and we'll get back to you within 24 hours"
              alignment="center"
            />
            
            <form className="mt-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                    placeholder="Enter your first name"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                    placeholder="Enter your last name"
                  />
                </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                  placeholder="Enter your company name"
                />
              </div>
              
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                  Service Interest *
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                >
                  <option value="">Select a service</option>
                  <option value="web-development">Web Application Development</option>
                  <option value="website-development">Dynamic Website Development</option>
                  <option value="ecommerce">E-Commerce Solutions</option>
                  <option value="digital-marketing">Digital Marketing Services</option>
                  <option value="consulting">Business Strategy Consulting</option>
                  <option value="cloud-services">Cloud Migration & Management</option>
                  <option value="cybersecurity">Cybersecurity Services</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Tell us about your project or inquiry..."
                ></textarea>
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors focus:ring-4 focus:ring-orange-300 focus:outline-none"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Office Hours & Additional Info */}
      <section className="bg-gray-50 py-16 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Office Hours & Information</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">
                      <Clock className="w-3 h-3" />
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Business Hours</h4>
                    <p className="text-gray-600">Monday - Saturday: 10:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Sunday & National Holidays: Closed</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">
                      <Globe className="w-3 h-3" />
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Response Time</h4>
                    <p className="text-gray-600">We typically respond to inquiries within 24 hours</p>
                    <p className="text-gray-600">Urgent requests are prioritized accordingly</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">
                      <Briefcase className="w-3 h-3" />
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Consultation</h4>
                    <p className="text-gray-600">Free initial consultation for new projects</p>
                    <p className="text-gray-600">Comprehensive project assessment and planning</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Why Choose Adysun Ventures?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-orange-600 text-xs">
                      <Check className="w-3 h-3" />
                    </span>
                  </div>
                  <span className="text-gray-700">Expert team with 10+ years of experience</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-orange-600 text-xs">
                      <Check className="w-3 h-3" />
                    </span>
                  </div>
                  <span className="text-gray-700">Comprehensive IT solutions and consulting</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-orange-600 text-xs">
                      <Check className="w-3 h-3" />
                    </span>
                  </div>
                  <span className="text-gray-700">Industry-specific expertise and solutions</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-orange-600 text-xs">
                      <Check className="w-3 h-3" />
                    </span>
                  </div>
                  <span className="text-gray-700">Ongoing support and maintenance</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-orange-600 text-xs">
                      <Check className="w-3 h-3" />
                    </span>
                  </div>
                  <span className="text-gray-700">Competitive pricing and transparent communication</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Let's discuss how we can help transform your business with innovative IT solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+919511557023" 
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Call Us Now
            </a>
            <a 
              href="mailto:info@adysunventures.com" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
            >
              Send Email
            </a>
        </div>
      </div>
      </section>
    </WebsiteLayout>
  );
}
