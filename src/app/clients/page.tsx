import React from 'react';
import WebsiteLayout from '@/components/website/WebsiteLayout';
import StatisticsCard from '@/components/website/content/StatisticsCard';
import CTAButton from '@/components/website/CTAButton';
import ContactCard from '@/components/website/content/ContactCard';
import { 
  BarChart3, 
  Building, 
  Truck, 
  Factory, 
  ShoppingCart, 
  Shield, 
  Lock,
  MapPin,
  Mail,
  Phone,
  ArrowRight
} from 'lucide-react';

export default function ClientsPage() {
  const clientCategories = [
    {
      title: "Transportation, Logistics & Supply Chain Management",
      icon: <Truck />,
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
      icon: <Building />,
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
      icon: <Factory />,
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
      icon: <ShoppingCart />,
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

  // Success stories data
  const successStories = [
    {
      icon: <Truck />,
      title: "Logistics Optimization",
      description: "Helped transportation companies streamline operations with custom logistics management systems, reducing delivery times by 30% and improving customer satisfaction."
    },
    {
      icon: <Building />,
      title: "Construction Management",
      description: "Developed comprehensive project management solutions for construction companies, enabling real-time tracking and improved resource allocation."
    },
    {
      icon: <Factory />,
      title: "Manufacturing Efficiency",
      description: "Implemented smart manufacturing solutions that increased production efficiency by 25% and reduced operational costs through automation and data analytics."
    },
    {
      icon: <ShoppingCart />,
      title: "E-Commerce Growth",
      description: "Built scalable e-commerce platforms that helped businesses expand their online presence and increase sales by an average of 40% within the first year."
    },
    {
      icon: <BarChart3 />,
      title: "Data Analytics",
      description: "Implemented advanced analytics solutions that provided actionable insights, helping clients make data-driven decisions and improve business performance."
    },
    {
      icon: <Shield />,
      title: "Security & Compliance",
      description: "Enhanced cybersecurity measures and ensured compliance with industry standards, protecting client data and maintaining regulatory requirements."
    }
  ];

  // Industries we serve
  const industries = [
    {
      icon: <Truck />,
      title: "Transportation & Logistics",
      description: "Fleet management, route optimization, and supply chain solutions"
    },
    {
      icon: <Building />,
      title: "Construction",
      description: "Project management, resource planning, and site monitoring systems"
    },
    {
      icon: <Factory />,
      title: "Manufacturing",
      description: "Smart manufacturing, quality control, and production optimization"
    },
    {
      icon: <ShoppingCart />,
      title: "E-Commerce",
      description: "Online platforms, payment systems, and customer management"
    }
  ];

  // Contact information
  const contactInfo = [
    {
      icon: <MapPin />,
      title: "Pune Office (Head Office)",
      content: "Adysun Ventures, Pune, Maharashtra, India",
      actions: [
        { text: "Google Maps", href: "https://maps.google.com", variant: "primary" as const },
        { text: "Google Search", href: "https://google.com", variant: "secondary" as const }
      ]
    },
    {
      icon: <MapPin />,
      title: "Thane Office (Mumbai Division)",
      content: "Adysun Ventures, Thane, Mumbai, Maharashtra, India",
      actions: [
        { text: "Google Maps", href: "https://maps.google.com", variant: "primary" as const },
        { text: "Google Search", href: "https://google.com", variant: "secondary" as const }
      ]
    },
    {
      icon: <Mail />,
      title: "Email Contacts",
      content: "General Inquiries: info@adysunventures.com\nHR & Recruitment: hr@adysunventures.com",
      actions: []
    },
    {
      icon: <Phone />,
      title: "Phone",
      content: "+91 9579537533\nMon-Sat 10:00 AM - 6:00 PM\nClosed on Sundays & National Holidays",
      actions: []
    }
  ];

  // Statistics
  const statistics = [
    { label: "Total Projects", value: "0+", delay: 0 },
    { label: "Happy Clients", value: "0+", delay: 0.2 },
    { label: "Awards Won", value: "0+", delay: 0.4 },
    { label: "Task Completed", value: "0+", delay: 0.6 }
  ];

  // Partner logos
  const partnerLogos = [
    "/assets/images/partners/android.png",
    "/assets/images/partners/aws.png",
    "/assets/images/partners/azure.png",
    "/assets/images/partners/alibaba-cloud.png"
  ];

  return (
    <WebsiteLayout 
      title="Our Clients - Adysun Ventures"
      description="Discover our diverse client portfolio across transportation, logistics, construction, manufacturing, and e-commerce industries. We've helped businesses transform their operations with innovative IT solutions."
    >
      {/* Hero Section */}
      <section className="pt-16 pb-20 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <span className="text-orange-600 font-semibold text-lg bg-white px-6 py-3 rounded-full shadow-md">
              Our Clients
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8 text-center">
            Trusted by Industry Leaders
          </h1>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed text-center mb-12">
            Discover our diverse client portfolio across transportation, logistics, construction, manufacturing, and e-commerce industries.
          </p>
          <div className="text-center">
            <CTAButton href="/contact-us" variant="primary">
              Talk to our Solution Specialist
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Client Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {clientCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-20 last:mb-0">
              <div className="text-center mb-16">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-white [&_*]:w-10 [&_*]:h-10">{category.icon}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  {category.title}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.clients.map((client, clientIndex) => (
                  <div key={clientIndex} className="text-center group">
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-orange-200 hover:border-orange-300 hover:-translate-y-1">
                      <div className="mb-4">
                        <img
                          src={client.image}
                          alt={client.name}
                          className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-700 transition-colors">
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
      <section className="py-20 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Client Success Stories
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Discover how we've helped businesses across industries achieve digital transformation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-orange-200 hover:border-orange-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-white [&_*]:w-8 [&_*]:h-8">{story.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{story.title}</h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  {story.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Our expertise spans across multiple industries, delivering tailored solutions for unique business challenges
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg border border-orange-200">
                  <span className="text-orange-600 [&_*]:w-12 [&_*]:h-12">{industry.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{industry.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {industry.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              REACH OUT TO ADYSUN VENTURES
            </h2>
            <p className="text-xl text-gray-600">
              Ready to start your journey with Adysun Ventures? Contact our team today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contactInfo.map((contact, index) => (
              <ContactCard
                key={index}
                icon={contact.icon}
                title={contact.title}
                content={contact.content}
                actions={contact.actions}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Achievements
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Numbers that reflect our commitment to excellence and innovation
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <StatisticsCard
                key={index}
                number={stat.value}
                label={stat.label}
                variant="dark"
                duration={2}
                delay={stat.delay}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Partner Logos Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Trusted Technology Partners
            </h3>
            <p className="text-gray-600">
              We work with leading technology platforms to deliver world-class solutions
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {partnerLogos.map((logo, index) => (
              <div key={index} className="flex justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200 hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={logo}
                    alt={`Partner ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-orange-900/95 to-orange-800/95 text-white relative"
               style={{ backgroundImage: 'url(/assets/images/content/clientBanner.jpg)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/95 to-orange-800/95"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed mb-10">
              Let's discuss how we can help transform your business with innovative IT solutions.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <CTAButton href="/contact-us" variant="primary">
              Get Started Today
            </CTAButton>
            <CTAButton href="/services" variant="secondary">
              Explore Our Services
            </CTAButton>
          </div>
        </div>
      </section>
    </WebsiteLayout>
  );
}
