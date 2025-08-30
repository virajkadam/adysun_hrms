import React from 'react';
import WebsiteLayout from '@/components/website/WebsiteLayout';
import CounterSection from '@/components/website/layout/CounterSection';
import CTAButton from '@/components/website/CTAButton';
import ContactCard from '@/components/website/content/ContactCard';
import ContactSection from '@/components/website/layout/ContactSection';
import PartnerLogosSection from '@/components/website/layout/PartnerLogosSection';
import CTASection from '@/components/website/layout/CTASection';
import { 
  Briefcase, 
  Mail, 
  Clock, 
  Globe, 
  Check,
  MapPin,
  Phone,
  ArrowRight
} from 'lucide-react';

export default function ContactUsPage() {


  // Office hours and additional info
  const officeInfo = [
    {
      icon: <Clock />,
      title: "Business Hours",
      details: [
        "Monday - Saturday: 10:00 AM - 6:00 PM",
        "Sunday & National Holidays: Closed"
      ]
    },
    {
      icon: <Globe />,
      title: "Response Time",
      details: [
        "We typically respond to inquiries within 24 hours",
        "Urgent requests are prioritized accordingly"
      ]
    },
    {
      icon: <Briefcase />,
      title: "Consultation",
      details: [
        "Free initial consultation for new projects",
        "Comprehensive project assessment and planning"
      ]
    }
  ];

  // Why choose us
  const whyChooseUs = [
    "Expert team with 10+ years of experience",
    "Comprehensive IT solutions and consulting",
    "Industry-specific expertise and solutions",
    "Ongoing support and maintenance",
    "Competitive pricing and transparent communication"
  ];

  // Statistics for CounterSection
  const statistics = [
    { icon: <Briefcase />, value: "50+", label: "Total Projects" },
    { icon: <Mail />, value: "200+", label: "Happy Clients" },
    { icon: <Clock />, value: "3+", label: "Awards Won" },
    { icon: <Globe />, value: "888+", label: "Task Completed" }
  ];

  // Technology/Partner logos
  const techLogos = [
    "/assets/images/partners/android.png",
    "/assets/images/partners/angular.png",
    "/assets/images/partners/aws.png",
    "/assets/images/partners/azure.png",
    "/assets/images/partners/bigdata.png",
    "/assets/images/partners/blockchain.png"
  ];

  return (
    <WebsiteLayout 
      title="Contact Us - Adysun Ventures"
      description="Get in touch with Adysun Ventures for IT solutions and business strategy consulting. Contact our Pune and Thane offices or reach us via email and phone."
    >
      {/* Hero Section */}
      <section className="pt-16 pb-20 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <span className="text-orange-600 font-semibold text-lg bg-white px-6 py-3 rounded-full shadow-md">
              Contact Us
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8 text-center">
            Get In Touch
          </h1>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
          <div className="flex justify-center space-x-4 text-lg mb-8">
            <a href="/" className="text-gray-700 hover:text-orange-600 transition-colors">
              Home
            </a>
            <span className="text-gray-500">/</span>
            <span className="text-orange-600 font-semibold">Contact Us</span>
          </div>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed text-center">
            We're here to help you transform your business with innovative IT solutions
          </p>
        </div>
      </section>

      {/* Contact Information Section */}
      <ContactSection />

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-orange-200">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>
              <p className="text-xl text-gray-600">
                Fill out the form below and we'll get back to you within 24 hours
              </p>
            </div>
            
            <form className="space-y-6">
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
                <CTAButton href="#" variant="primary" className="px-8 py-3">
                  Send Message
                </CTAButton>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Office Hours & Additional Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">Office Hours & Information</h3>
              <div className="space-y-8">
                {officeInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-white [&_*]:w-6 [&_*]:h-6">{info.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">{info.title}</h4>
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-gray-600 mb-2">{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">Why Choose Adysun Ventures?</h3>
              <div className="space-y-4">
                {whyChooseUs.map((reason, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                      <span className="text-white text-xs">
                        <Check className="w-3 h-3" />
                      </span>
                    </div>
                    <span className="text-lg text-gray-700">{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <CounterSection
        items={statistics}
        className="bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200"
      />

      {/* Technology/Partner Logos Section */}
      <PartnerLogosSection 
        logos={techLogos} 
        title="Technology & Partner Stack"
        subtitle="We work with leading technology platforms to deliver world-class solutions"
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Start Your Project?"
        description="Let's discuss how we can help transform your business with innovative IT solutions."
        actions={[
          { text: "Call Us Now", href: "tel:+919511557023", variant: "primary" },
          { text: "Send Email", href: "mailto:info@adysunventures.com", variant: "secondary" }
        ]}
        backgroundImage="/assets/images/content/tab-content-03.jpg"
      />
    </WebsiteLayout>
  );
}
