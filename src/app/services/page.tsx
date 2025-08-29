import React from 'react';
import WebsiteLayout from '@/components/website/WebsiteLayout';
import ContactSection from '@/components/website/layout/ContactSection';
import { Code, Globe, ShoppingCart, Monitor as MonitorIcon, Brain, Zap, Settings, Users, Rocket, ArrowRight } from 'lucide-react';

export default function ServicesPage() {
  const serviceItems = [
    {
      image: "/assets/images/content/web_application_development.jpg",
      icon: <Code className="w-8 h-8 text-orange-500" />,
      title: "Web Application Development",
      description: "Our web application development services deliver robust, scalable solutions tailored to your business needs."
    },
    {
      image: "/assets/images/content/dynamic_website_development.jpg",
      icon: <Globe className="w-8 h-8 text-orange-500" />,
      title: "Dynamic Website Development",
      description: "Our dynamic website development services create interactive online experiences tailored to your audience."
    },
    {
      image: "/assets/images/content/services/service-3b.jpg",
      icon: <ShoppingCart className="w-8 h-8 text-orange-500" />,
      title: "E-Comm Solutions",
      description: "Our e-commerce solutions are designed to empower your business with seamless, secure, and scalable online platforms."
    },
    {
      image: "/assets/images/content/services/service-4b.jpg",
      icon: <MonitorIcon className="w-8 h-8 text-orange-500" />,
      title: "Digital Marketing Services",
      description: "At Adysun Ventures, our digital marketing services are meticulously crafted to enhance your brand's online presence."
    }
  ];

  const comprehensiveServices = [
    {
      icon: <Zap className="w-12 h-12 text-orange-500" />,
      title: "Digital Transformation",
      description: "Comprehensive digital transformation strategies to modernize your business operations."
    },
    {
      icon: <Settings className="w-12 h-12 text-orange-500" />,
      title: "IT Consulting",
      description: "Strategic IT consulting to align technology with your business objectives."
    },
    {
      icon: <Code className="w-12 h-12 text-orange-500" />,
      title: "Custom Application Development",
      description: "Tailored software solutions designed specifically for your business requirements."
    },
    {
      icon: <Brain className="w-12 h-12 text-orange-500" />,
      title: "Software Product Engineering",
      description: "End-to-end product development from concept to deployment and maintenance."
    },
    {
      icon: <Users className="w-12 h-12 text-orange-500" />,
      title: "Dedicated Team Hiring",
      description: "Access to skilled professionals who integrate seamlessly with your existing team."
    },
    {
      icon: <Rocket className="w-12 h-12 text-orange-500" />,
      title: "Product Development",
      description: "Innovative product development services to bring your ideas to market."
    }
  ];

  const detailedServices = [
    {
      title: "Machine Learning & AI Solutions",
      description: "Leverage the power of artificial intelligence and machine learning to gain insights, automate processes, and make data-driven decisions. Our AI solutions help businesses stay ahead of the competition by implementing cutting-edge technologies.",
      solutions: [
        "Predictive Analytics & Forecasting",
        "Natural Language Processing (NLP)",
        "Computer Vision Solutions",
        "Recommendation Systems",
        "Chatbot & Virtual Assistants",
        "Process Automation"
      ]
    },
    {
      title: "Web Development",
      description: "Comprehensive web development services that create engaging, responsive, and high-performance websites. From simple landing pages to complex web applications, we deliver solutions that drive user engagement and business growth.",
      solutions: [
        "Custom Website Development",
        "Content Management System (CMS)",
        "Frontend Design & Development",
        "Backend Development",
        "E-commerce Solutions",
        "Progressive Web Apps (PWA)"
      ]
    },
    {
      title: "Mobile Application Development",
      description: "Native and cross-platform mobile applications that deliver exceptional user experiences across all devices. Our mobile development expertise ensures your app stands out in the competitive app marketplace.",
      solutions: [
        "Enterprise Mobile Apps",
        "Cross-platform Apps",
        "Native Applications",
        "App Maintenance & Support",
        "UI/UX Design",
        "App Store Optimization"
      ]
    },
    {
      title: "Business Intelligence (BI) Analytics",
      description: "Transform your data into actionable insights with our comprehensive BI and analytics solutions. We help organizations make informed decisions by providing clear, visual, and interactive data representations.",
      solutions: [
        "Data Integration & Warehousing",
        "Data Extraction",
        "Data Visualization",
        "Performance Dashboards",
        "KPI Monitoring",
        "Predictive Analytics"
      ]
    },
    {
      title: "Agile Project Management",
      description: "Implement agile methodologies to improve project delivery, team collaboration, and product quality. Our agile experts help organizations adopt best practices for faster time-to-market and better stakeholder satisfaction.",
      solutions: [
        "Scrum Masters",
        "Project Managers",
        "Product Managers",
        "Agile Coaching",
        "Sprint Planning",
        "Retrospectives"
      ]
    },
    {
      title: "SEO (Search Engine Optimisation)",
      description: "Improve your website's visibility in search engines and drive organic traffic with our comprehensive SEO services. We implement proven strategies to boost your search rankings and increase online presence.",
      solutions: [
        "Keyword Research",
        "Competitive Analysis",
        "Link Building",
        "Technical SEO",
        "Content Optimization",
        "Local SEO"
      ]
    }
  ];

  return (
    <WebsiteLayout 
      title="Our Services - Adysun Ventures"
      description="Comprehensive IT solutions and business strategy services including web development, e-commerce, digital marketing, and technology consulting."
    >
      {/* Hero Section */}
      <section className="relative bg-cover bg-center bg-no-repeat py-20 mb-16"
               style={{ backgroundImage: 'url(/assets/images/bg/bg9.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Services</h1>
          <nav className="flex justify-center items-center space-x-2 text-white">
            <a href="/" className="hover:text-orange-400 transition-colors">Home</a>
            <span>/</span>
            <span className="text-orange-400">Services</span>
          </nav>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Offer</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceItems.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-3">{service.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Comprehensive Services Section */}
      <section className="mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Comprehensive Services</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {comprehensiveServices.map((service, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Service Sections */}
      {detailedServices.map((service, index) => (
        <section key={index} className="mb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="text-3xl font-bold text-orange-500 mb-6">{service.title}</h3>
                <p className="text-gray-700 leading-relaxed mb-6">{service.description}</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  Adysun Ventures {service.title} Solutions Include:
                </h4>
                <ul className="space-y-3">
                  {service.solutions.map((solution, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <ArrowRight className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-16 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Let's discuss how our services can drive your business growth and digital transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact-us" 
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started Today
            </a>
            <a 
              href="/about-us" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
            >
              Learn More About Us
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section - Using existing component */}
      <ContactSection />
    </WebsiteLayout>
  );
}
