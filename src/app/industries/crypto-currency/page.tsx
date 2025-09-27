import React from 'react';
import WebsiteLayout from '@/components/website/WebsiteLayout';
import PageHero from '@/components/website/ui/PageHero';
import { Zap, BarChart3, TrendingUp, Building, DollarSign, Shield, Globe, Lock } from 'lucide-react';

export default function CryptoCurrencyPage() {
  // Cryptocurrency trading solutions
  const cryptoSolutions = [
    {
      title: "Cryptocurrency Trading Platform",
      description: "Advanced crypto trading platform with real-time market data, multiple exchange integration, and automated trading capabilities.",
      features: ["Multi-Exchange Integration", "Real-time Price Feeds", "Automated Trading Bots", "Portfolio Management"]
    },
    {
      title: "DeFi & Blockchain Solutions",
      description: "Decentralized finance applications and blockchain-based solutions for cryptocurrency ecosystems.",
      features: ["Smart Contracts", "DeFi Protocols", "Yield Farming", "Liquidity Pools"]
    },
    {
      title: "Crypto Wallet & Security",
      description: "Secure cryptocurrency wallet solutions with multi-signature support and advanced security features.",
      features: ["Multi-Signature Wallets", "Hardware Integration", "Cold Storage", "Security Audits"]
    },
    {
      title: "Crypto Analytics & Insights",
      description: "Comprehensive cryptocurrency market analysis tools and trading insights for informed decisions.",
      features: ["Market Analysis", "Technical Indicators", "Sentiment Analysis", "Risk Assessment"]
    }
  ];

  // Technology stack
  const technologyStack = [
    "Blockchain", "Smart Contracts", "Web3", "DeFi Protocols", "Cryptocurrency APIs", "Machine Learning", "Cloud Computing", "Security Protocols"
  ];

  return (
    <WebsiteLayout 
      title="Cryptocurrency Trading Solutions - Blockchain Technology and Digital Asset Trading Platforms"
      description="Adysun Ventures provides cutting-edge cryptocurrency trading solutions including crypto trading platforms, DeFi applications, blockchain development, and digital asset management systems."
    >
      {/* Hero Section */}
      <PageHero
        title="Cryptocurrency Trading Technology Solutions"
        description="Empowering crypto traders and blockchain enthusiasts with advanced cryptocurrency trading platforms, DeFi applications, and secure digital asset management."
        breadcrumbs={[
          { label: 'Industries', href: '/industries' },
          { label: 'Cryptocurrency', isActive: true }
        ]}
      />

      {/* Overview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Revolutionizing Cryptocurrency Trading
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                The cryptocurrency market is rapidly evolving with new digital assets, DeFi protocols, and blockchain innovations. We help crypto traders, exchanges, and blockchain companies leverage cutting-edge technology to capitalize on digital asset opportunities.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our cryptocurrency solutions combine blockchain technology, smart contracts, and advanced trading algorithms to create secure, efficient platforms for digital asset trading and management.
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
              Comprehensive Cryptocurrency Trading Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From crypto trading platforms to DeFi applications, we provide end-to-end solutions that drive cryptocurrency market innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cryptoSolutions.map((solution, index) => (
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
              We leverage cutting-edge blockchain technologies to build secure, scalable cryptocurrency trading systems that meet the demands of digital asset markets.
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
              Why Choose Our Cryptocurrency Solutions?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We deliver measurable results that transform your cryptocurrency operations and drive digital asset trading success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg border border-orange-200">
              <div className="text-5xl text-orange-600 mb-4">
                <Zap className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">24/7 Trading</h3>
              <p className="text-gray-600">
                Round-the-clock cryptocurrency trading capabilities that never sleep, capturing opportunities in global digital asset markets.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-lg border border-orange-200">
              <div className="text-5xl text-orange-600 mb-4">
                <Shield className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Blockchain Security</h3>
              <p className="text-gray-600">
                Advanced security protocols and multi-signature wallets that protect your digital assets and ensure secure transactions.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-lg border border-orange-200">
              <div className="text-5xl text-orange-600 mb-4">
                <BarChart3 className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">DeFi Integration</h3>
              <p className="text-gray-600">
                Seamless integration with DeFi protocols, yield farming, and decentralized applications for maximum crypto opportunities.
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
              Cryptocurrency Trading Use Cases
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our solutions are designed to address real-world challenges in cryptocurrency trading and blockchain development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl text-orange-500 mb-4">
                <Building className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Crypto Exchanges</h3>
              <p className="text-gray-600">
                Advanced cryptocurrency exchange platforms with multi-asset support and high-frequency trading capabilities.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl text-orange-500 mb-4">
                <TrendingUp className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Crypto Trading Firms</h3>
              <p className="text-gray-600">
                Professional cryptocurrency trading platforms with advanced analytics and automated trading strategies.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl text-orange-500 mb-4">
                <Building className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">DeFi Platforms</h3>
              <p className="text-gray-600">
                Decentralized finance applications with smart contracts and automated market making capabilities.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl text-orange-500 mb-4">
                <DollarSign className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Crypto Wallets</h3>
              <p className="text-gray-600">
                Secure digital wallet solutions with multi-signature support and hardware integration.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl text-orange-500 mb-4">
                <Lock className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">NFT Marketplaces</h3>
              <p className="text-gray-600">
                Non-fungible token marketplaces with smart contract integration and digital asset trading.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl text-orange-500 mb-4">
                <Globe className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Crypto Startups</h3>
              <p className="text-gray-600">
                Scalable blockchain platforms for innovative cryptocurrency and Web3 solutions.
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
              We follow a proven methodology to deliver successful cryptocurrency solutions that meet blockchain and digital asset requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Crypto Strategy Analysis</h3>
              <p className="text-gray-600">Understanding your cryptocurrency trading requirements and blockchain integration needs.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Blockchain Architecture</h3>
              <p className="text-gray-600">Designing secure, scalable blockchain systems that meet cryptocurrency industry standards.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Development & Testing</h3>
              <p className="text-gray-600">Building and thoroughly testing cryptocurrency systems for security and performance.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Deployment & Support</h3>
              <p className="text-gray-600">Deploying cryptocurrency solutions and providing ongoing support and optimization.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Ready to Transform Your Cryptocurrency Trading?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Let's discuss how our cryptocurrency solutions can drive your digital asset trading success and blockchain innovation.
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
