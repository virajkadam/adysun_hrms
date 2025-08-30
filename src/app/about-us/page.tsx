import React from 'react';
import WebsiteLayout from '@/components/website/WebsiteLayout';
import SectionTitle from '@/components/website/ui/SectionTitle';
import StatisticsCard from '@/components/website/content/StatisticsCard';
import CounterSection from '@/components/website/layout/CounterSection';
import { Users, Smile, BarChart3, Briefcase, Cloud, Trophy, Target, Lightbulb, Shield, TrendingUp, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <WebsiteLayout 
      title="About Us - Adysun Ventures"
      description="Learn about Adysun Ventures and our mission to deliver growth to your business through innovative IT solutions and strategic consulting."
    >
      {/* Hero Section with Enhanced Background */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 py-24 mb-20">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About <span className="text-orange-400">Us</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Discover how we inspire, imagine, and implement innovative solutions 
            that drive your business forward
          </p>
          <nav className="flex justify-center items-center space-x-3 text-white">
            <a href="/" className="hover:text-orange-400 transition-colors duration-300">Home</a>
            <span className="text-orange-400">/</span>
            <span className="text-orange-400 font-semibold">About Us</span>
          </nav>
        </div>
      </section>

      {/* Enhanced Service Overview Section */}
      <section className="mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Who We <span className="text-orange-500">Are</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are a team of passionate innovators dedicated to transforming businesses 
              through cutting-edge technology and strategic solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group">
              <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80"
                  alt="Who We Are"
                  className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-600/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h4 className="text-2xl font-bold mb-2">Who We Are</h4>
                  <p className="text-orange-100">
                    A team of experts committed to your business growth and success
                  </p>
                </div>
              </div>
            </div>
            
            <div className="group">
              <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80"
                  alt="What We Do"
                  className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-600/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h4 className="text-2xl font-bold mb-2">What We Do</h4>
                  <p className="text-orange-100">
                    Deliver innovative solutions that drive digital transformation
                  </p>
                </div>
              </div>
            </div>
            
            <div className="group">
              <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500">
                <img
                  src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80"
                  alt="Our Success"
                  className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-600/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h4 className="text-2xl font-bold mb-2">Our Success</h4>
                  <p className="text-orange-100">
                    Proven track record of delivering exceptional results
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Consulting Section with Orange Theme */}
      <section className="relative bg-gradient-to-br from-orange-50 to-white py-20 mb-20">
        <div className="absolute inset-0 bg-orange-100/30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                Our Expertise
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-8">
                Welcome To Our <span className="text-orange-500">Consulting</span>
              </h3>
              <p className="text-lg leading-relaxed text-gray-700 mb-8">
                We deliver high-performance services to help your business embrace innovation 
                and tackle the ever-changing challenges of today's digital world. Our services 
                are designed to meet your specific needs and deliver business value in a 
                cost-effective way.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">Strategic Focus</h4>
                  <p className="text-gray-600">Business outcomes-driven approach</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Cloud className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Total Projects</h3>
                      <span className="text-orange-600 text-sm font-medium">By Our Experienced Team</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <h4 className="text-4xl font-bold text-orange-500">50+</h4>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Happy Clients</h3>
                      <span className="text-orange-600 text-sm font-medium">Smart and Hard Workers</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <h4 className="text-4xl font-bold text-orange-500">200+</h4>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                      <BarChart3 className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Projects Finished</h3>
                      <span className="text-orange-600 text-sm font-medium">All Industry Services</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <h4 className="text-4xl font-bold text-orange-500">50+</h4>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Trophy className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Business Solutions</h3>
                      <span className="text-orange-600 text-sm font-medium">Most Trusted Company</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <h4 className="text-4xl font-bold text-orange-500">100+</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Mission Section */}
      <section className="mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                Our Mission
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-8">
                Our mission is to deliver <span className="text-orange-500">growth</span> to your business
              </h3>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h5 className="text-xl font-semibold text-gray-900 mb-3">Planning Strategies</h5>
                    <p className="text-gray-600 leading-relaxed">
                      Strategic planning and roadmap development to align technology 
                      initiatives with your business objectives.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h5 className="text-xl font-semibold text-gray-900 mb-3">Successful Marketing</h5>
                    <p className="text-gray-600 leading-relaxed">
                      Digital marketing strategies and campaigns that drive 
                      customer engagement and business growth.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h5 className="text-xl font-semibold text-gray-900 mb-3">Technology Innovation</h5>
                    <p className="text-gray-600 leading-relaxed">
                      Leveraging cutting-edge technologies and innovative solutions 
                      to transform your business processes and drive digital excellence.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h5 className="text-xl font-semibold text-gray-900 mb-3">Quality Assurance</h5>
                    <p className="text-gray-600 leading-relaxed">
                      Ensuring highest standards of quality through rigorous testing 
                      and continuous improvement methodologies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl transform rotate-3"></div>
              <img
                src="/assets/images/content/team_wokring.png"
                alt="Strategic IT planning and vision at Adysun Ventures"
                className="relative w-full h-auto rounded-3xl shadow-2xl transform -rotate-3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section className="bg-gradient-to-br from-gray-900 to-orange-900 py-20 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Reach Out To <span className="text-orange-400">Adysun Ventures</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get in touch with us to discuss how we can help transform your business
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mr-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Pune Office (Head Office)</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Adysun Ventures Pvt. Ltd. Workplex, 5 no 47, Near Bhapkar Petrol Pump, 
                Pune, Maharashtra - 411009
              </p>
              <div className="flex space-x-4">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                  Google Maps
                </button>
                <button className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                  Google Search
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mr-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Thane Office (Mumbai Division)</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Adysun Ventures Pvt. Ltd. A2, 704, Kanchanpushp Society Kavesar, 
                Thane West, Thane, Maharashtra - 400607
              </p>
              <div className="flex space-x-4">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                  Google Maps
                </button>
                <button className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                  Google Search
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Email Contacts</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 font-medium">General Inquiries:</p>
                  <p className="text-orange-600 font-semibold">info@adysunventures.com</p>
                </div>
                <div>
                  <p className="text-gray-600 font-medium">HR & Recruitment:</p>
                  <p className="text-orange-600 font-semibold">hr@adysunventures.com</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mr-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Phone & Hours</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 font-medium">Contact Number:</p>
                  <p className="text-orange-600 font-semibold text-xl">+91 9579537523</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <span className="text-gray-600">Mon-Sat 10:00 AM - 6:00 PM</span>
                </div>
                <p className="text-gray-500 text-sm">Closed on Sundays & National Holidays</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Statistics Section */}
      <CounterSection
        className="mb-20"
        items={[
                  { icon: <Users />, value: '150+', label: 'Total Projects' },
        { icon: <Smile />, value: '75+', label: 'Happy Clients' },
          { icon: <BarChart3 />, value: '3+', label: 'Awards Won' },
          { icon: <Briefcase />, value: '888+', label: 'Task Completed' }
        ]}
      />
    </WebsiteLayout>
  );
}
