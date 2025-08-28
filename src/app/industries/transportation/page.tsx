import React from 'react';
import WebsiteLayout from '@/components/website/WebsiteLayout';
import Link from 'next/link';
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

  return (
    <WebsiteLayout 
      title="Transportation & Logistics Solutions - Advanced Fleet Management and Supply Chain Technology"
      description="Adysun Ventures provides cutting-edge transportation and logistics solutions including fleet management, route optimization, real-time tracking, and supply chain management for modern transportation companies."
    >
      {/* Hero Section */}
      <section 
        className="relative py-20 text-white"
        style={{
          backgroundImage: "url('/assets/images/bg/whyChoose.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transportation & Logistics Technology Solutions
            </h1>
            <div className="flex justify-center space-x-4 text-lg mb-8">
              <Link href="/industries" className="hover:text-orange-400 transition-colors">
                Industries
              </Link>
              <span>/</span>
              <span className="text-orange-400">Transportation</span>
            </div>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              Revolutionize your transportation business with intelligent logistics solutions that optimize operations, reduce costs, and enhance customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
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
              <img 
                src="/assets/images/content/transportation.png" 
                alt="Transportation Solutions" 
                className="w-full max-w-md mx-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Comprehensive Transportation Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From fleet management to supply chain optimization, we provide end-to-end solutions that transform your transportation operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {transportationSolutions.map((solution, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{solution.title}</h3>
                <p className="text-gray-600 mb-6">{solution.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Technology Stack
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We leverage cutting-edge technologies to build robust, scalable transportation and logistics solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {technologyStack.map((tech, index) => (
              <div key={index} className="bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-lg p-6 text-center transition-all duration-300 hover:shadow-md">
                <span className="text-lg font-medium text-gray-700 group-hover:text-orange-600">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Choose Our Transportation Solutions?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We deliver measurable results that transform your transportation operations and drive sustainable growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-blue-600 rounded-lg">
              <div className="text-5xl text-orange-400 mb-4">
                <DollarSign className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Cost Reduction</h3>
              <p className="text-gray-300">
                Optimize routes, reduce fuel consumption, and minimize operational costs with intelligent automation.
              </p>
            </div>

            <div className="text-center p-6 border border-blue-600 rounded-lg">
              <div className="text-5xl text-orange-400 mb-4">
                <Zap className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Operational Efficiency</h3>
              <p className="text-gray-300">
                Streamline processes and improve productivity with real-time monitoring and automated systems.
              </p>
            </div>

            <div className="text-center p-6 border border-blue-600 rounded-lg">
              <div className="text-5xl text-orange-400 mb-4">
                <Target className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Customer Satisfaction</h3>
              <p className="text-gray-300">
                Enhance delivery accuracy and provide real-time updates to improve customer experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Transportation Use Cases
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our solutions are designed to address real-world challenges in the transportation industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl text-orange-500 mb-4">
                <Truck className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Trucking & Freight</h3>
              <p className="text-gray-600">
                Optimize routes, track shipments, and manage fleet operations for long-haul and local delivery services.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl text-orange-500 mb-4">
                <Package className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Last-Mile Delivery</h3>
              <p className="text-gray-600">
                Streamline final delivery operations with route optimization and real-time customer updates.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl text-orange-500 mb-4">
                <Factory className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Manufacturing Logistics</h3>
              <p className="text-gray-600">
                Integrate transportation with manufacturing processes for seamless supply chain management.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl text-orange-500 mb-4">
                <ShoppingCart className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">E-commerce Fulfillment</h3>
              <p className="text-gray-600">
                Optimize order fulfillment and delivery for online retail businesses with intelligent logistics.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl text-orange-500 mb-4">
                <Ship className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Maritime & Ports</h3>
              <p className="text-gray-600">
                Manage port operations, container tracking, and maritime logistics with advanced technology.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl text-orange-500 mb-4">
                <Plane className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Air Cargo & Aviation</h3>
              <p className="text-gray-600">
                Optimize air freight operations and manage cargo tracking for aviation logistics companies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Implementation Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We follow a proven methodology to deliver successful transportation solutions that drive immediate value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Assessment</h3>
              <p className="text-gray-600">Analyzing your current operations and identifying optimization opportunities.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Solution Design</h3>
              <p className="text-gray-600">Designing customized solutions that address your specific challenges.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Implementation</h3>
              <p className="text-gray-600">Deploying and integrating solutions with minimal disruption to operations.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Optimization</h3>
              <p className="text-gray-600">Continuous monitoring and optimization for maximum performance and ROI.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Transportation Operations?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Let's discuss how our transportation and logistics solutions can optimize your operations and drive business growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact-us"
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Free Consultation
            </Link>
            <Link 
              href="/services"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </WebsiteLayout>
  );
}
