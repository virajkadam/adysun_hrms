import React from 'react';
import WebsiteLayout from '@/components/website/WebsiteLayout';
import PageHero from '@/components/website/ui/PageHero';
import { Zap, BarChart3, TrendingUp, Building, DollarSign, Shield, Globe, Lock } from 'lucide-react';

export default function StockExchangePage() {
  // Financial solutions
  const financialSolutions = [
    {
      title: "Trading Platforms",
      description: "High-performance trading systems with real-time market data and advanced order management.",
      features: ["Real-time Market Data", "Advanced Order Types", "Risk Management", "Compliance Monitoring"]
    },
    {
      title: "Market Analysis Tools",
      description: "Comprehensive analytics and reporting tools for informed trading decisions.",
      features: ["Technical Analysis", "Fundamental Analysis", "Market Indicators", "Custom Reports"]
    },
    {
      title: "Risk Management",
      description: "Sophisticated risk management systems to protect investments and ensure compliance.",
      features: ["Portfolio Risk Assessment", "Position Monitoring", "Stop-Loss Management", "Regulatory Compliance"]
    },
    {
      title: "Compliance Systems",
      description: "Automated compliance monitoring and reporting for regulatory requirements.",
      features: ["Regulatory Reporting", "Audit Trails", "Compliance Alerts", "Document Management"]
    }
  ];

  // Technology stack
  const technologyStack = [
    "High-Frequency Trading", "Blockchain", "Machine Learning", "Cloud Computing", "Real-time Processing", "Big Data Analytics", "API Integration", "Microservices"
  ];

  return (
    <WebsiteLayout 
      title="Stock Exchange & Financial Services - High-Performance Trading and Financial Technology Solutions"
      description="Adysun Ventures provides cutting-edge financial technology solutions including trading platforms, market analysis tools, risk management systems, and compliance solutions for financial markets."
    >
      {/* Hero Section */}
      <PageHero
        title="Stock Exchange & Financial Services Technology"
        description="Powering the future of financial markets with high-performance trading platforms, advanced analytics, and intelligent risk management solutions."
        breadcrumbs={[
          { label: 'Industries', href: '/industries' },
          { label: 'Stock Exchange', isActive: true }
        ]}
      />

      {/* Overview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Revolutionizing Financial Markets
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                The financial industry is experiencing unprecedented technological transformation. We help financial institutions, trading firms, and exchanges leverage cutting-edge technology to gain competitive advantages and deliver superior services.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our financial technology solutions combine high-performance computing, real-time data processing, and advanced analytics to create trading platforms that execute trades in microseconds and provide comprehensive market insights.
              </p>
            </div>
            <div className="text-center">
              <img 
                src="/assets/images/content/machine.png" 
                alt="Financial Technology Solutions" 
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
              Comprehensive Financial Technology Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From trading platforms to risk management, we provide end-to-end solutions that drive financial market innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {financialSolutions.map((solution, index) => (
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
              We leverage cutting-edge technologies to build high-performance financial systems that meet the demands of modern markets.
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
      <section className="py-16 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Why Choose Our Financial Technology Solutions?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We deliver measurable results that transform your financial operations and drive market success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg border border-orange-200">
              <div className="text-5xl text-orange-600 mb-4">
                <Zap className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">High Performance</h3>
              <p className="text-gray-600">
                Ultra-low latency trading systems that execute trades in microseconds for maximum efficiency.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-lg border border-orange-200">
              <div className="text-5xl text-orange-600 mb-4">
                <Shield className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Risk Management</h3>
              <p className="text-gray-600">
                Comprehensive risk management systems that protect investments and ensure regulatory compliance.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-lg border border-orange-200">
              <div className="text-5xl text-orange-600 mb-4">
                <BarChart3 className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Market Intelligence</h3>
              <p className="text-gray-600">
                Advanced analytics and real-time market data for informed trading decisions and strategy development.
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
              Financial Technology Use Cases
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our solutions are designed to address real-world challenges in the financial industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl text-orange-500 mb-4">
                <Building className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Investment Banks</h3>
              <p className="text-gray-600">
                High-frequency trading platforms and risk management systems for investment banking operations.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl text-orange-500 mb-4">
                <TrendingUp className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Trading Firms</h3>
              <p className="text-gray-600">
                Custom trading platforms with advanced analytics and automated trading strategies.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl text-orange-500 mb-4">
                <Building className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Stock Exchanges</h3>
              <p className="text-gray-600">
                Exchange technology infrastructure and market data distribution systems.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl text-orange-500 mb-4">
                <DollarSign className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Asset Management</h3>
              <p className="text-gray-600">
                Portfolio management systems with risk assessment and performance analytics.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl text-orange-500 mb-4">
                <Lock className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Regulatory Compliance</h3>
              <p className="text-gray-600">
                Automated compliance monitoring and reporting for regulatory requirements.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl text-orange-500 mb-4">
                <Globe className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fintech Startups</h3>
              <p className="text-gray-600">
                Scalable financial technology platforms for innovative fintech solutions.
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
              Our Development Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We follow a proven methodology to deliver successful financial technology solutions that meet regulatory requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Requirements Analysis</h3>
              <p className="text-gray-600">Understanding your financial operations and regulatory compliance needs.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Architecture Design</h3>
              <p className="text-gray-600">Designing high-performance, scalable systems that meet financial industry standards.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Development & Testing</h3>
              <p className="text-gray-600">Building and thoroughly testing systems for reliability and performance.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Deployment & Support</h3>
              <p className="text-gray-600">Deploying systems and providing ongoing support and optimization.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Ready to Transform Your Financial Operations?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Let's discuss how our financial technology solutions can drive your business growth and market success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact-us"
              className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              Get Free Consultation
            </a>
            <a 
              href="/services"
              className="border-2 border-orange-600 text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 hover:text-white transition-colors"
            >
              View Our Services
            </a>
          </div>
        </div>
      </section>
    </WebsiteLayout>
  );
}
