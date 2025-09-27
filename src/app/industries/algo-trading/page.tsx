import React from 'react';
import WebsiteLayout from '@/components/website/WebsiteLayout';
import PageHero from '@/components/website/ui/PageHero';
import { Zap, BarChart3, TrendingUp, Building, DollarSign, Shield, Globe, Lock } from 'lucide-react';

export default function AlgoTradingPage() {
  // Algorithmic trading solutions
  const algoTradingSolutions = [
    {
      title: "Algorithm Development Platform",
      description: "Comprehensive platform for developing, testing, and deploying algorithmic trading strategies.",
      features: ["Strategy Backtesting", "Paper Trading", "Live Execution", "Performance Analytics"]
    },
    {
      title: "Market Data & Analytics",
      description: "Real-time market data feeds and advanced analytics for algorithmic strategy development.",
      features: ["Real-time Data Feeds", "Historical Data", "Technical Indicators", "Market Microstructure"]
    },
    {
      title: "Execution Management",
      description: "High-performance order execution systems optimized for algorithmic trading strategies.",
      features: ["Smart Order Routing", "Latency Optimization", "Order Management", "Execution Analytics"]
    },
    {
      title: "Risk & Compliance",
      description: "Automated risk management and compliance monitoring for algorithmic trading operations.",
      features: ["Real-time Risk Monitoring", "Position Limits", "Regulatory Reporting", "Audit Trails"]
    }
  ];

  // Technology stack
  const technologyStack = [
    "Python/R", "C++", "Machine Learning", "Quantitative Analysis", "Real-time Processing", "Big Data Analytics", "API Integration", "Cloud Computing"
  ];

  return (
    <WebsiteLayout 
      title="Algorithmic Trading Solutions - Advanced Trading Algorithms and Quantitative Finance Technology"
      description="Adysun Ventures provides cutting-edge algorithmic trading solutions including strategy development platforms, quantitative analysis tools, execution management systems, and risk management for algorithmic trading."
    >
      {/* Hero Section */}
      <PageHero
        title="Algorithmic Trading Technology Solutions"
        description="Empowering quantitative traders with advanced algorithmic trading platforms, strategy development tools, and high-performance execution systems."
        breadcrumbs={[
          { label: 'Industries', href: '/industries' },
          { label: 'Algorithmic Trading', isActive: true }
        ]}
      />

      {/* Overview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Revolutionizing Algorithmic Trading
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Algorithmic trading is transforming financial markets with automated strategies that execute trades at lightning speed. We help quantitative traders, hedge funds, and trading firms develop sophisticated algorithms that capitalize on market opportunities.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our algorithmic trading solutions combine quantitative analysis, machine learning, and ultra-low latency execution to create trading systems that identify patterns, execute strategies, and manage risk automatically.
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
              Comprehensive Algorithmic Trading Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From strategy development to execution management, we provide end-to-end solutions that drive algorithmic trading innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {algoTradingSolutions.map((solution, index) => (
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
              We leverage cutting-edge technologies to build high-performance algorithmic trading systems that meet the demands of quantitative trading.
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
              Why Choose Our Algorithmic Trading Solutions?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We deliver measurable results that transform your trading operations and drive algorithmic trading success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg border border-orange-200">
              <div className="text-5xl text-orange-600 mb-4">
                <Zap className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Ultra-Low Latency</h3>
              <p className="text-gray-600">
                Microsecond-level execution speeds that give your algorithms the competitive edge in fast-moving markets.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-lg border border-orange-200">
              <div className="text-5xl text-orange-600 mb-4">
                <Shield className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Algorithmic Risk Control</h3>
              <p className="text-gray-600">
                Real-time risk monitoring and automated controls that protect your algorithmic trading strategies.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-lg border border-orange-200">
              <div className="text-5xl text-orange-600 mb-4">
                <BarChart3 className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Quantitative Analytics</h3>
              <p className="text-gray-600">
                Advanced quantitative analysis and machine learning for developing profitable algorithmic trading strategies.
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
              Algorithmic Trading Use Cases
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our solutions are designed to address real-world challenges in algorithmic trading and quantitative finance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl text-orange-500 mb-4">
                <Building className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Hedge Funds</h3>
              <p className="text-gray-600">
                Sophisticated algorithmic trading strategies and quantitative analysis platforms for hedge fund operations.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl text-orange-500 mb-4">
                <TrendingUp className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Prop Trading Firms</h3>
              <p className="text-gray-600">
                Proprietary algorithmic trading systems with advanced quantitative models and execution algorithms.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl text-orange-500 mb-4">
                <Building className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quantitative Traders</h3>
              <p className="text-gray-600">
                Individual algorithmic trading platforms with strategy development and backtesting capabilities.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl text-orange-500 mb-4">
                <DollarSign className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Asset Managers</h3>
              <p className="text-gray-600">
                Systematic trading strategies and algorithmic portfolio management systems.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl text-orange-500 mb-4">
                <Lock className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Algorithmic Compliance</h3>
              <p className="text-gray-600">
                Automated compliance monitoring and reporting for algorithmic trading regulatory requirements.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl text-orange-500 mb-4">
                <Globe className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Trading Technology Startups</h3>
              <p className="text-gray-600">
                Scalable algorithmic trading platforms for innovative quantitative trading solutions.
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
              We follow a proven methodology to deliver successful algorithmic trading solutions that meet quantitative trading requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Strategy Analysis</h3>
              <p className="text-gray-600">Understanding your algorithmic trading requirements and quantitative strategy needs.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Algorithm Design</h3>
              <p className="text-gray-600">Designing high-performance, scalable algorithmic trading systems that meet quantitative trading standards.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Development & Backtesting</h3>
              <p className="text-gray-600">Building and thoroughly backtesting algorithmic trading strategies for reliability and performance.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Live Trading & Support</h3>
              <p className="text-gray-600">Deploying algorithms to live markets and providing ongoing support and optimization.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Ready to Transform Your Algorithmic Trading?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Let's discuss how our algorithmic trading solutions can drive your quantitative trading success and market performance.
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
