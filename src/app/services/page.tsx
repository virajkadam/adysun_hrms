import React from 'react';
import WebsiteLayout from '@/components/website/WebsiteLayout';
import SectionTitle from '@/components/website/ui/SectionTitle';
import FeatureCard from '@/components/website/FeatureCard';

export default function ServicesPage() {
  const serviceItems = [
    {
      image: "/assets/images/content/web_application_development.jpg",
      icon: "💻",
      title: "Web Application Development",
      description: "Our web application development services deliver robust, scalable solutions tailored to your business needs."
    },
    {
      image: "/assets/images/content/dynamic_website_development.jpg",
      icon: "🌐",
      title: "Dynamic Website Development",
      description: "Our dynamic website development services create interactive online experiences tailored to your audience."
    },
    {
      image: "/assets/images/content/services/service3b.jpg",
      icon: "🛒",
      title: "E-Comm Solutions",
      description: "Our e-commerce solutions are designed to empower your business with seamless, secure, and scalable online platforms."
    },
    {
      image: "/assets/images/content/services/service3b.jpg",
      icon: "📱",
      title: "Digital Marketing Services",
      description: "At Adysun Ventures, our digital marketing services are meticulously crafted to enhance your brand's online presence."
    }
  ];

  const technologyStack = [
    { name: "PHP", icon: "🐘", category: "Backend" },
    { name: "Node.js", icon: "🟢", category: "Backend" },
    { name: "WordPress", icon: "📝", category: "CMS" },
    { name: "Bootstrap", icon: "🎨", category: "Frontend" },
    { name: "HTML5", icon: "🌐", category: "Frontend" },
    { name: "Angular", icon: "🅰️", category: "Frontend" },
    { name: "Apple", icon: "🍎", category: "Mobile" },
    { name: "Android", icon: "🤖", category: "Mobile" },
    { name: "Windows", icon: "🪟", category: "Platform" },
    { name: "Java", icon: "☕", category: "Backend" },
    { name: "Slack", icon: "💬", category: "Tools" },
    { name: "Jira", icon: "📋", category: "Tools" },
    { name: "Git", icon: "📚", category: "Version Control" },
    { name: "Google", icon: "🔍", category: "Services" },
    { name: "Yahoo", icon: "📧", category: "Services" }
  ];

  const serviceCategories = [
    {
      icon: "💰",
      title: "Cost Optimization",
      description: "Strategic cost management and optimization solutions to maximize your IT investment returns."
    },
    {
      icon: "🤝",
      title: "Client Partnership",
      description: "Building long-term relationships through understanding and delivering on your business objectives."
    },
    {
      icon: "👔",
      title: "Professional Excellence",
      description: "Maintaining the highest standards of professionalism and quality in all our deliverables."
    },
    {
      icon: "🎯",
      title: "Strategic Planning",
      description: "Comprehensive strategic planning to align technology with your business goals."
    },
    {
      icon: "⚙️",
      title: "Technical Expertise",
      description: "Deep technical knowledge and expertise across multiple technologies and platforms."
    },
    {
      icon: "💻",
      title: "Development Excellence",
      description: "Custom software development with focus on quality, performance, and scalability."
    },
    {
      icon: "🧩",
      title: "Modular Solutions",
      description: "Building flexible, modular solutions that can grow and adapt with your business."
    },
    {
      icon: "👥",
      title: "Team Collaboration",
      description: "Fostering effective collaboration between our team and yours for optimal results."
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h1>
          <nav className="flex justify-center items-center space-x-2 text-white">
            <a href="/" className="hover:text-orange-400 transition-colors">Home</a>
            <span>/</span>
            <span className="text-orange-400">Services</span>
          </nav>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Our Core Services"
            subtitle="Comprehensive IT solutions designed to drive your business growth and digital transformation"
            alignment="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceItems.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="text-3xl mb-3">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="bg-gray-50 py-16 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Technology Stack"
            subtitle="We work with cutting-edge technologies to deliver innovative solutions"
            alignment="center"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {technologyStack.map((tech, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{tech.icon}</div>
                  <h4 className="font-semibold text-gray-900 mb-1">{tech.name}</h4>
                  <span className="text-sm text-gray-500">{tech.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories Section */}
      <section className="mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Why Choose Our Services"
            subtitle="Comprehensive approach to IT solutions and business strategy"
            alignment="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceCategories.map((category, index) => (
              <FeatureCard
                key={index}
                icon={category.icon}
                title={category.title}
                description={category.description}
                variant="default"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-16 mb-16">
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

      {/* Additional Services Info */}
      <section className="mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-semibold text-gray-900 mb-6">
                Comprehensive IT Solutions
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At Adysun Ventures, we understand that every business has unique technology needs. 
                Our comprehensive IT solutions are designed to address your specific challenges 
                and opportunities, helping you achieve sustainable growth and competitive advantage.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                From initial consultation to ongoing support, we partner with you throughout 
                your digital transformation journey, ensuring that every solution aligns with 
                your business objectives and delivers measurable results.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span className="text-gray-700">Custom software development</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span className="text-gray-700">Cloud migration and management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span className="text-gray-700">Digital transformation consulting</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span className="text-gray-700">Cybersecurity services</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Service Highlights</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 text-sm">✓</span>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">Expert Team</h5>
                    <p className="text-sm text-gray-600">Experienced professionals with deep domain knowledge</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 text-sm">✓</span>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">Quality Assurance</h5>
                    <p className="text-sm text-gray-600">Rigorous testing and quality control processes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 text-sm">✓</span>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">Ongoing Support</h5>
                    <p className="text-sm text-gray-600">Continuous support and maintenance services</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </WebsiteLayout>
  );
}
