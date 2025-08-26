import React from 'react';
import WebsiteLayout from '@/components/website/WebsiteLayout';
import SectionTitle from '@/components/website/ui/SectionTitle';

export default function PartnersPage() {
  const partners = [
    {
      name: "SUSE",
      logo: "/assets/images/content/susu.png",
      partnership: "Emerald Partner",
      description: "Our team offers comprehensive capabilities and expertise in designing, implementing, and deploying scalable and reliable solutions across the entire SUSE and Rancher technology stack. This expertise spans a broad range of enterprise solutions and technologies, including the management of physical and virtual environments, software-defined storage, and cloud environments. Additionally, we possess deep knowledge in utilizing the Rancher platform to effectively manage container sprawl across both physical and cloud environments."
    },
    {
      name: "RED HAT",
      logo: "/assets/images/content/redHat.png",
      partnership: "READY PARTNER",
      description: "Red Hat's comprehensive portfolio, encompassing hybrid cloud infrastructure, cloud-native application development, agile integration, management, and automation solutions, empowers businesses to seamlessly integrate Red Hat technologies as they transition to digital and interconnected models."
    },
    {
      name: "CANONICAL",
      logo: "/assets/images/content/canonical.png",
      partnership: "BUSINESS PARTNER",
      description: "Canonical offers comprehensive services for open source solutions, spanning from cloud to desktop and devices. Their support for Ubuntu-based solutions helps reduce infrastructure costs and boosts application performance. With Canonical's backing, Ubuntu has become the new standard for secure enterprise Linux, catering to servers, desktops, cloud, developers, and IoT devices."
    },
    {
      name: "GITLAB",
      logo: "/assets/images/content/gitLab.png",
      partnership: "BUSINESS PARTNER",
      description: "GitLab is a DevOps Platform that enables organizations to optimize software development by accelerating software delivery and improving efficiency, while enhancing security and compliance. Through GitLab, all teams within your organization can jointly plan, develop, secure, and deploy software to accelerate business results with full visibility, uniformity, and accountability across the entire DevOps lifecycle."
    }
  ];

  return (
    <WebsiteLayout 
      title="Our Partners - Adysun Ventures"
      description="Strategic technology partnerships with industry leaders including SUSE, Red Hat, Canonical, and GitLab to deliver comprehensive IT solutions."
    >
      {/* Hero Section */}
      <section className="pt-6 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="mb-4">
                <span className="text-orange-600 font-semibold text-lg">
                  Technology Partnership
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Our Company Affiliations
              </h1>
            </div>
            <div className="text-center">
              <img
                src="/assets/images/content/partners_content.png"
                alt="Company Affiliations"
                className="w-full max-w-md mx-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {partners.map((partner, index) => (
            <div key={index}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
                {/* Partner Logo */}
                <div className="lg:col-span-3 text-center">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} Logo`}
                    className="w-48 h-48 object-contain mx-auto"
                  />
                </div>

                {/* Divider Line */}
                <div className="hidden lg:block lg:col-span-1">
                  <div className="w-px h-48 bg-green-500 mx-auto"></div>
                </div>

                {/* Partner Information */}
                <div className="lg:col-span-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center lg:text-left">
                    {partner.name}
                  </h2>
                  <h3 className="text-xl text-green-600 font-semibold mb-4 text-center lg:text-left uppercase">
                    {partner.partnership}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-center lg:text-left">
                    {partner.description}
                  </p>
                </div>
              </div>

              {/* Divider */}
              {index < partners.length - 1 && (
                <div className="flex justify-center mb-12">
                  <div className="w-3/4 h-px bg-gray-300"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Partnership Benefits Section */}
      <section className="bg-gray-50 py-16 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Why Strategic Partnerships Matter"
            subtitle="Our technology partnerships enable us to deliver cutting-edge solutions and provide comprehensive support"
            alignment="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Access to Latest Technology</h3>
              <p className="text-gray-600">
                Early access to cutting-edge technologies and beta programs from our partners
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Training & Support</h3>
              <p className="text-gray-600">
                Certified expertise and dedicated support channels for optimal solution delivery
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation & Best Practices</h3>
              <p className="text-gray-600">
                Access to industry best practices and innovative solution architectures
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Technologies We Specialize In"
            subtitle="Comprehensive expertise across our partner technology stacks"
            alignment="center"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            <div className="text-center group">
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🐧</div>
                <h4 className="font-semibold text-gray-900 mb-1">Linux Solutions</h4>
                <span className="text-sm text-gray-500">SUSE, Red Hat, Ubuntu</span>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">☁️</div>
                <h4 className="font-semibold text-gray-900 mb-1">Cloud & Container</h4>
                <span className="text-sm text-gray-500">Rancher, Kubernetes</span>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🔧</div>
                <h4 className="font-semibold text-gray-900 mb-1">DevOps Platform</h4>
                <span className="text-sm text-gray-500">GitLab, CI/CD</span>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🛡️</div>
                <h4 className="font-semibold text-gray-900 mb-1">Enterprise Security</h4>
                <span className="text-sm text-gray-500">Compliance & Security</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-cover bg-center bg-no-repeat py-20"
               style={{ backgroundImage: 'url(/assets/images/bg/bg1.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-90"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <p className="text-xl text-orange-400 mb-4 font-semibold">REACH OUT TO US</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Interested?
            </h2>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Let's start a project together.
            </h2>
          </div>
          <a 
            href="/contact-us" 
            className="inline-flex items-center bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors text-lg"
          >
            <span>Contact Us</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>
    </WebsiteLayout>
  );
}
