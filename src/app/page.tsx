import React from 'react';
import WebsiteLayout from '@/components/website/WebsiteLayout';
import HeroSection from '@/components/website/layout/HeroSection';
import SectionTitle from '@/components/website/ui/SectionTitle';
import FeatureCard from '@/components/website/FeatureCard';
import IndustryCard from '@/components/website/IndustryCard';
import CTASection from '@/components/website/layout/CTASection';
import ContactCard from '@/components/website/content/ContactCard';
import StatisticsCard from '@/components/website/content/StatisticsCard';
import PartnerLogo from '@/components/website/content/PartnerLogo';
import FAQAccordion from '@/components/website/content/FAQAccordion';
import ProcessSteps from '@/components/website/content/ProcessSteps';

export default function WebsiteHomePage() {
  return (
    <WebsiteLayout 
      title="Adysun Ventures: Premium IT Solutions & Business Strategy Services"
      description="Leading IT solutions provider offering comprehensive technology services to meet your industry-specific business needs."
    >
      {/* Hero Section */}
      <HeroSection
        title="When service matters"
        subtitle="Adysun Ventures: Premium IT Solutions & Business Strategy Services"
        description="Adysun Ventures is a leading IT solutions provider, offering comprehensive technology services to meet your industry-specific business needs."
        variant="dark"
        actions={[
          { text: "Our Services", href: "/services", variant: "primary" },
          { text: "Contact Us", href: "/contact-us", variant: "outline" }
        ]}
        className="mb-16"
      />

      {/* Expert IT Solutions Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-16 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Expert IT Solutions with a Decade of Experience"
            variant="light"
            alignment="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon="💰"
              title="Saving Investments"
              description="Optimize your technology investments for long-term growth and success."
              variant="dark"
            />
            <FeatureCard
              icon="📊"
              title="Effective Strategy"
              description="Building effective strategies to optimize your IT infrastructure for maximum ROI."
              variant="dark"
            />
            <FeatureCard
              icon="🚀"
              title="Innovative Solutions"
              description="Providing cutting-edge IT solutions that keep your business ahead of the curve."
              variant="dark"
            />
          </div>
        </div>
      </section>

      {/* Comprehensive IT Solutions Section */}
      <section className="mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Comprehensive IT Solutions & Business Strategy Services"
            subtitle="Transforming businesses through innovative technology solutions and strategic consulting"
            alignment="center"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Premier IT Solutions Provider in India</h3>
              <p className="text-gray-600">
                Adysun Ventures stands as a premier IT solutions provider, delivering cutting-edge technology 
                solutions across software development, cloud computing, cybersecurity, data analytics, and 
                digital transformation. Our strategic partnerships with leading technology providers ensure 
                access to the latest innovations and best practices.
              </p>
              <p className="text-gray-600">
                With a decade of experience, we have successfully delivered projects across various industries, 
                helping businesses optimize their technology investments and achieve sustainable growth through 
                innovative IT solutions.
              </p>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Business Strategy Consulting</h3>
                <p className="text-gray-600 mb-4">
                  Our consulting services help businesses align technology with strategic objectives, 
                  ensuring optimal ROI and competitive advantage.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    IT Strategic Planning
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    Digital Transformation Roadmaps
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    Technology Investment Advisory
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Advanced IT Solutions</h3>
                <p className="text-gray-600 mb-4">
                  We provide comprehensive technical solutions that drive business innovation and efficiency.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    Custom Software Development
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    Cloud Migration & Management
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    Cybersecurity Services
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Adysun Section */}
      <section className="mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Why Choose Adysun Ventures for IT Services?"
            alignment="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon="⚙️"
              title="Innovative Approach"
              description="We leverage cutting-edge technologies and methodologies to deliver innovative solutions."
            />
            <FeatureCard
              icon="👥"
              title="Expert Team"
              description="Our experienced team brings deep domain knowledge and technical expertise."
            />
            <FeatureCard
              icon="🤝"
              title="Client Partnership"
              description="We build long-term partnerships, understanding your business needs and goals."
            />
          </div>
        </div>
      </section>

      {/* How We Can Serve Section */}
      <section className="mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">HOW WE CAN SERVE</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Driving Success Through Strategic IT Solutions
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Sidebar - Process Steps */}
            <div className="lg:col-span-1">
              <ProcessSteps
                steps={[
                  { number: "01", title: "Planning", subtitle: "Vision to Formation", isActive: true },
                  { number: "02", title: "Marketing", subtitle: "Reach to Growth" },
                  { number: "03", title: "Growth", subtitle: "Scale to Grow" }
                ]}
              />
            </div>
            
            {/* Right Side - Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Strategic Vision in IT</h3>
                <p className="text-gray-600">
                  We help businesses develop comprehensive IT strategies that align with their long-term 
                  objectives, ensuring technology investments drive measurable business outcomes.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Digital Transformation</h4>
                  <p className="text-gray-600 text-sm">
                    Modernize your business processes with cutting-edge digital solutions.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🧠</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">AI Integration</h4>
                  <p className="text-gray-600 text-sm">
                    Leverage artificial intelligence to automate and optimize operations.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Data Analytics</h4>
                  <p className="text-gray-600 text-sm">
                    Transform data into actionable insights for better decision-making.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Industries We Serve"
            subtitle="Our IT solutions and business strategy services are tailored to the unique needs of various industries"
            alignment="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <IndustryCard
              icon="📈"
              title="Stock Exchange & Financial Services"
              description="High-performance solutions for financial markets and trading platforms."
              link="/industries/stock-exchange"
              linkText="Explore Financial Services Solutions"
              bgColor="bg-green-100"
            />
            <IndustryCard
              icon="🛒"
              title="E-Commerce & Retail Solutions"
              description="Scalable platforms and solutions for online retail businesses."
              link="/industries/ecommerce"
              linkText="Discover E-Commerce Solutions"
              bgColor="bg-purple-100"
            />
            <IndustryCard
              icon="🚚"
              title="Transportation & Logistics"
              description="Logistics and fleet management technology solutions."
              link="/industries/transportation"
              linkText="View Transportation Solutions"
              bgColor="bg-orange-100"
            />
          </div>
          
          <div className="text-center">
            <a 
              href="/industries" 
              className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              Explore All Industries
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about our IT services and solutions"
            alignment="center"
          />
          
          <FAQAccordion
            items={[
              {
                question: "What IT services does Adysun Ventures offer?",
                answer: "We offer comprehensive IT services including custom software development, cloud migration, cybersecurity, data analytics, digital transformation, and business strategy consulting."
              },
              {
                question: "How can IT solutions improve my business operations?",
                answer: "Our IT solutions can streamline processes, improve efficiency, reduce costs, enhance customer experience, and provide data-driven insights for better decision-making."
              },
              {
                question: "What industries does Adysun Ventures specialize in?",
                answer: "We specialize in financial services, e-commerce, transportation, healthcare, manufacturing, and retail, with tailored solutions for each industry's unique needs."
              },
              {
                question: "How does your business strategy consulting work?",
                answer: "We analyze your current technology landscape, identify improvement opportunities, develop strategic roadmaps, and help implement solutions that align with your business goals."
              },
              {
                question: "What security measures do you implement to protect client data?",
                answer: "We implement enterprise-grade security including encryption, secure development practices, regular security audits, compliance with industry standards, and ongoing monitoring."
              }
            ]}
            className="max-w-4xl mx-auto"
          />
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Transform Your Business with IT Solutions?"
        description="Contact us today to discuss how our services can drive your business growth."
        background="orange"
        actions={[
          { text: "Get in Touch", href: "/contact-us", variant: "outline" }
        ]}
        className="mb-16"
      />

      {/* Contact Section */}
      <section className="mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="REACH OUT TO ADYSUN VENTURES"
            alignment="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ContactCard
              title="Pune Office (Head Office)"
              icon="📍"
              content={
                <div>
                  <p>Adysun Ventures Pvt. Ltd.</p>
                  <p>Pune, Maharashtra, India</p>
                </div>
              }
              actions={[
                { text: "Google Maps", href: "#", variant: "primary" },
                { text: "Google Search", href: "#", variant: "primary" }
              ]}
            />
            
            <ContactCard
              title="Thane Office (Mumbai Division)"
              icon="📍"
              content={
                <div>
                  <p>Adysun Ventures Pvt. Ltd.</p>
                  <p>Thane, Mumbai, Maharashtra, India</p>
                </div>
              }
              actions={[
                { text: "Google Maps", href: "#", variant: "primary" },
                { text: "Google Search", href: "#", variant: "primary" }
              ]}
            />
            
            <ContactCard
              title="Email Contacts"
              icon="✉️"
              content={
                <div>
                  <p><strong>General Inquiries:</strong></p>
                  <p>info@adysunventures.com</p>
                  <p><strong>HR & Recruitment:</strong></p>
                  <p>hr@adysunventures.com</p>
                </div>
              }
            />
            
            <ContactCard
              title="Phone"
              icon="📞"
              content={
                <div>
                  <p className="text-lg font-semibold">+91 9511557023</p>
                  <p>Mon-Sat: 10:00 AM - 6:00 PM</p>
                  <p>Closed on Sundays & National Holidays</p>
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gray-800 text-white py-16 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StatisticsCard
              number="0+"
              label="Total Projects"
              variant="light"
            />
            <StatisticsCard
              number="0+"
              label="Happy Clients"
              variant="light"
            />
            <StatisticsCard
              number="0+"
              label="Awards Won"
              variant="light"
            />
            <StatisticsCard
              number="0+"
              label="Task Completed"
              variant="light"
            />
          </div>
        </div>
      </section>

      {/* Partner Logos Section */}
      <section className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <PartnerLogo
              src="/assets/images/brand-logos/android.png"
              alt="Android"
            />
            <PartnerLogo
              src="/assets/images/brand-logos/aws.png"
              alt="AWS"
            />
            <PartnerLogo
              src="/assets/images/brand-logos/reactjs.png"
              alt="React.js"
            />
            <PartnerLogo
              src="/assets/images/brand-logos/nodejs.png"
              alt="Node.js"
            />
          </div>
        </div>
      </section>
    </WebsiteLayout>
  );
}
