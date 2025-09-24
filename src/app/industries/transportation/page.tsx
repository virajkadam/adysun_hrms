import React from 'react';
import WebsiteLayout from '@/components/website/WebsiteLayout';
import PageHero from '@/components/website/ui/PageHero';
import BenefitCard from '@/components/website/BenefitCard';
import CTAButton from '@/components/website/CTAButton';
import { Zap, Target, Ship, Plane, DollarSign, Package, Factory, ShoppingCart, Truck } from 'lucide-react';

export default function TransportationPage() {
  // Transportation solutions
  const transportationSolutions = [
    {
      title: "Fleet Management Systems",
      description: "Comprehensive fleet tracking and management solutions for optimal vehicle utilization and maintenance.",
      features: ["Real-time GPS Tracking", "Maintenance Scheduling", "Fuel Management", "Driver Performance"]
    },
    {
      title: "Route Optimization",
      description: "AI-powered route planning that reduces fuel costs and improves delivery efficiency.",
      features: ["Dynamic Routing", "Traffic Analysis", "Multi-stop Optimization", "Real-time Updates"]
    },
    {
      title: "Real-time Tracking",
      description: "Live monitoring of vehicles, shipments, and delivery status for complete visibility.",
      features: ["Live GPS Tracking", "Delivery Updates", "Exception Alerts", "Mobile App Access"]
    },
    {
      title: "Supply Chain Solutions",
      description: "End-to-end supply chain management with integrated logistics and inventory systems.",
      features: ["Inventory Management", "Warehouse Operations", "Order Processing", "Analytics Dashboard"]
    }
  ];

  // Technology stack
  const technologyStack = [
    "IoT Sensors", "GPS Tracking", "Machine Learning", "Cloud Computing", "Mobile Apps", "Big Data Analytics", "Blockchain", "5G Networks"
  ];

  // Benefits data
  const benefits = [
    {
      icon: <DollarSign />,
      title: "Cost Reduction",
      description: "Optimize routes, reduce fuel consumption, and minimize operational costs with intelligent automation."
    },
    {
      icon: <Zap />,
      title: "Operational Efficiency",
      description: "Streamline processes and improve productivity with real-time monitoring and automated systems."
    },
    {
      icon: <Target />,
      title: "Customer Satisfaction",
      description: "Enhance delivery accuracy and provide real-time updates to improve customer experience."
    }
  ];

  // Use cases data
  const useCases = [
    {
      icon: <Truck />,
      title: "Trucking & Freight",
      description: "Optimize routes, track shipments, and manage fleet operations for long-haul and local delivery services."
    },
    {
      icon: <Package />,
      title: "Last-Mile Delivery",
      description: "Streamline final delivery operations with route optimization and real-time customer updates."
    },
    {
      icon: <Factory />,
      title: "Manufacturing Logistics",
      description: "Integrate transportation with manufacturing processes for seamless supply chain management."
    },
    {
      icon: <ShoppingCart />,
      title: "E-commerce Fulfillment",
      description: "Optimize order fulfillment and delivery for online retail businesses with intelligent logistics."
    },
    {
      icon: <Ship />,
      title: "Maritime & Ports",
      description: "Manage port operations, container tracking, and maritime logistics with advanced technology."
    },
    {
      icon: <Plane />,
      title: "Air Cargo & Aviation",
      description: "Optimize air freight operations and manage cargo tracking for aviation logistics companies."
    }
  ];

  // Process steps
  const processSteps = [
    {
      number: "1",
      title: "Assessment",
      description: "Analyzing your current operations and identifying optimization opportunities."
    },
    {
      number: "2",
      title: "Solution Design",
      description: "Designing customized solutions that address your specific challenges."
    },
    {
      number: "3",
      title: "Implementation",
      description: "Deploying and integrating solutions with minimal disruption to operations."
    },
    {
      number: "4",
      title: "Optimization",
      description: "Continuous monitoring and optimization for maximum performance and ROI."
    }
  ];

  return (
    <WebsiteLayout 
      title="Transportation & Logistics Solutions - Advanced Fleet Management and Supply Chain Technology"
      description="Adysun Ventures provides cutting-edge transportation and logistics solutions including fleet management, route optimization, real-time tracking, and supply chain management for modern transportation companies."
    >
      {/* Hero Section */}
      <PageHero
        title="Transportation & Logistics Technology Solutions"
        description="Revolutionize your transportation business with intelligent logistics solutions that optimize operations, reduce costs, and enhance customer satisfaction."
        breadcrumbs={[
          { label: 'Industries', href: '/industries' },
          { label: 'Transportation', isActive: true }
        ]}
      />

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Driving Innovation in Transportation
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                The transportation and logistics industry is undergoing a digital transformation. We help companies leverage cutting-edge technology to streamline operations, improve efficiency, and deliver exceptional customer experiences.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our comprehensive solutions integrate IoT, AI, and cloud technologies to provide real-time visibility, optimize routes, and automate processes across your entire transportation network.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl shadow-lg border border-orange-200">
                <img 
                  src="/assets/images/content/transportation.png" 
                  alt="Transportation Solutions" 
                  className="w-full max-w-md mx-auto rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive Transportation Solutions
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              From fleet management to supply chain optimization, we provide end-to-end solutions that transform your transportation operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {transportationSolutions.map((solution, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-orange-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{solution.title}</h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">{solution.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3 text-lg">Key Features:</h4>
                  <ul className="space-y-3">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-base text-gray-600">
                        <div className="w-3 h-3 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Technology Stack
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We leverage cutting-edge technologies to build robust, scalable transportation and logistics solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {technologyStack.map((tech, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 to-orange-200 border-2 border-orange-200 hover:border-orange-300 rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <span className="text-lg font-semibold text-gray-700 group-hover:text-orange-600">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Our Transportation Solutions?
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              We deliver measurable results that transform your transportation operations and drive sustainable growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Transportation Use Cases
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our solutions are designed to address real-world challenges in the transportation industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-orange-200 group">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-white [&_*]:w-8 [&_*]:h-8">{useCase.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center group-hover:text-orange-700 transition-colors">
                  {useCase.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed text-center">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Implementation Process
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              We follow a proven methodology to deliver successful transportation solutions that drive immediate value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-700 transition-colors">
                  {step.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-orange-100/90 to-orange-200/90 text-gray-800 relative"
               style={{ backgroundImage: 'url(/assets/images/bg/whyChoose.png)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/90 to-orange-200/90"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Ready to Transform Your Transportation Operations?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-10">
              Let's discuss how our transportation and logistics solutions can optimize your operations and drive business growth.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <CTAButton href="/contact-us" variant="primary">
              Get Free Consultation
            </CTAButton>
            <CTAButton href="/services" variant="secondary">
              View Our Services
            </CTAButton>
          </div>
        </div>
      </section>
    </WebsiteLayout>
  );
}
