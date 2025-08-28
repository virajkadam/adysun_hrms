import React from 'react';
import WebsiteLayout from '@/components/website/WebsiteLayout';
import SectionTitle from '@/components/website/ui/SectionTitle';
import StatisticsCard from '@/components/website/content/StatisticsCard';
import CounterSection from '@/components/website/layout/CounterSection';
import { Users, Smile, BarChart3, Briefcase } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <WebsiteLayout 
      title="About Us - Adysun Ventures"
      description="Learn about Adysun Ventures and our mission to deliver growth to your business through innovative IT solutions and strategic consulting."
    >
      {/* Hero Section with Background Image */}
      <section className="relative bg-cover bg-center bg-no-repeat py-20 mb-16"
               style={{ backgroundImage: 'url(/assets/images/bg/bg9.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Us</h1>
          <nav className="flex justify-center items-center space-x-2 text-white">
            <a href="/" className="hover:text-orange-400 transition-colors">Home</a>
            <span>/</span>
            <span className="text-orange-400">About Us</span>
          </nav>
        </div>
      </section>

      {/* Service Overview Section */}
      <section className="mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="About Us"
            alignment="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4">
                <img
                  src="/assets/images/content/services/service2b.jpg"
                  alt="Who We Are"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-3">Who We Are</h4>
                <p className="text-gray-600">
                  We help you to grow up your best business and solution for
                  your impressive projects.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="mb-4">
                <img
                  src="/assets/images/content/services/service4b.jpg"
                  alt="What We Do"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-3">What We Do</h4>
                <p className="text-gray-600">
                  We help you to grow up your best business and solution for
                  your impressive projects.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="mb-4">
                <img
                  src="/assets/images/content/services/service3b.jpg"
                  alt="Our Success"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-3">Our Success</h4>
                <p className="text-gray-600">
                  We help you to grow up your best business and solution for
                  your impressive projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Section with Statistics */}
      <section className="relative bg-cover bg-center bg-no-repeat py-20 mb-16"
               style={{ backgroundImage: 'url(/assets/images/bg/bg3.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h4 className="text-2xl font-semibold mb-6">Welcome To Our Consulting</h4>
              <p className="text-lg leading-relaxed">
                We deliver high-performance services to help your business
                embrace innovation and tackle the ever-changing challenges
                of today's digital world. Designed to meet your specific
                needs, our services capture and deliver business value in
                a cost-effective way. Based on your strategic objectives,
                we focus on business outcomes in software engineering,
                advanced technology, development teams, digital
                consulting, and solution operations.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">☁️</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Total Projects</h3>
                    <span className="text-orange-300 text-sm">By Our Experienced Team</span>
                  </div>
                </div>
                <div className="text-right">
                  <h4 className="text-3xl font-bold text-orange-400">50+</h4>
                </div>
              </div>
              
              <div className="flex items-center justify-between bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">👥</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Happy Clients</h3>
                    <span className="text-orange-300 text-sm">Smart and Hard Workers</span>
                  </div>
                </div>
                <div className="text-right">
                  <h4 className="text-3xl font-bold text-orange-400">200</h4>
                </div>
              </div>
              
              <div className="flex items-center justify-between bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">📊</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Projects Finished</h3>
                    <span className="text-orange-300 text-sm">We Provides All Industry Services</span>
                  </div>
                </div>
                <div className="text-right">
                  <h4 className="text-3xl font-bold text-orange-400">50+</h4>
                </div>
              </div>
              
              <div className="flex items-center justify-between bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">🏆</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Business Solutions</h3>
                    <span className="text-orange-300 text-sm">Most Trusted Company By Experts</span>
                  </div>
                </div>
                <div className="text-right">
                  <h4 className="text-3xl font-bold text-orange-400">100</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-semibold text-gray-900 mb-8">
                Our mission is to deliver growth to your business
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h5 className="text-xl font-semibold text-gray-900 mb-3">Planning Strategies</h5>
                  <p className="text-gray-600">
                    Excepteur integration aute irure design in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                </div>
                
                <div>
                  <h5 className="text-xl font-semibold text-gray-900 mb-3">Successful Marketing</h5>
                  <p className="text-gray-600">
                    Duis Integration aute irure design in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                </div>
                
                <div>
                  <h5 className="text-xl font-semibold text-gray-900 mb-3">Technology Innovation</h5>
                  <p className="text-gray-600">
                    Leveraging cutting-edge technologies and innovative solutions to transform 
                    your business processes and drive digital excellence.
                  </p>
                </div>
                
                <div>
                  <h5 className="text-xl font-semibold text-gray-900 mb-3">Quality Assurance</h5>
                  <p className="text-gray-600">
                    Ensuring highest standards of quality through rigorous testing
                    and continuous improvement methodologies.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <img
                src="/assets/images/content/team_wokring.png"
                alt="Strategic IT planning and vision at Adysun Ventures"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <CounterSection
        className="mb-16"
        items={[
          { icon: <Users />, value: '50+', label: 'Total Projects' },
          { icon: <Smile />, value: '200+', label: 'Happy Clients' },
          { icon: <BarChart3 />, value: '3+', label: 'Awards Won' },
          { icon: <Briefcase />, value: '888+', label: 'Task Completed' }
        ]}
      />
    </WebsiteLayout>
  );
}
