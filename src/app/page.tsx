import React from 'react';
import WebsiteLayout from '@/components/website/WebsiteLayout';
import HeroSection from '@/components/website/layout/HeroSection';
import SectionTitle from '@/components/website/ui/SectionTitle';
import FeatureCard from '@/components/website/FeatureCard';
import IndustryCard from '@/components/website/IndustryCard';
import CTASection from '@/components/website/layout/CTASection';
import ContactCard from '@/components/website/content/ContactCard';
import StatisticsCard from '@/components/website/content/StatisticsCard';
import CounterSection from '@/components/website/layout/CounterSection';
import { Users, Smile, Crown, CheckSquare } from 'lucide-react';
import PartnerLogo from '@/components/website/content/PartnerLogo';
import FAQAccordion from '@/components/website/content/FAQAccordion';
import ProcessSteps from '@/components/website/content/ProcessSteps';
import InteractiveProcessSteps from '@/components/website/layout/InteractiveProcessSteps';
import ContactSection from '@/components/website/layout/ContactSection';
import LogoLoop from '@/components/reactbits/LogoLoop';

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
        variant="image"
        backgroundImage="/assets/images/bg/hero-bg-new.jpeg"
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
          
          <InteractiveProcessSteps
                steps={[
              {
                number: "01",
                title: "Planning",
                subtitle: "Vision to Formation",
                content: {
                  mainTitle: "Strategic Vision in IT",
                  mainDescription: "We help businesses develop comprehensive IT strategies that align with their long-term objectives, ensuring technology investments drive measurable business outcomes.",
                  features: [
                    {
                      icon: "🚀",
                      title: "Digital Transformation",
                      description: "Modernize your business processes with cutting-edge digital solutions."
                    },
                    {
                      icon: "🧠",
                      title: "AI Integration",
                      description: "Leverage artificial intelligence to automate and optimize operations."
                    },
                    {
                      icon: "📊",
                      title: "Data Analytics",
                      description: "Transform data into actionable insights for better decision-making."
                    }
                  ]
                }
              },
              {
                number: "02",
                title: "Marketing",
                subtitle: "Reach to Growth",
                content: {
                  mainTitle: "Digital Marketing & Growth Strategy",
                  mainDescription: "We develop comprehensive digital marketing strategies that help businesses reach their target audience and achieve sustainable growth through data-driven approaches.",
                  features: [
                    {
                      icon: "📱",
                      title: "Digital Presence",
                      description: "Build a strong online presence across all digital channels."
                    },
                    {
                      icon: "🎯",
                      title: "Target Marketing",
                      description: "Reach your ideal customers with precision-targeted campaigns."
                    },
                    {
                      icon: "📈",
                      title: "Growth Analytics",
                      description: "Track performance and optimize for continuous improvement."
                    }
                  ]
                }
              },
              {
                number: "03",
                title: "Growth",
                subtitle: "Scale to Grow",
                content: {
                  mainTitle: "Business Scaling & Optimization",
                  mainDescription: "We help businesses scale their operations efficiently while maintaining quality and optimizing processes for maximum productivity and profitability.",
                  features: [
                    {
                      icon: "⚡",
                      title: "Process Optimization",
                      description: "Streamline operations for maximum efficiency and productivity."
                    },
                    {
                      icon: "🔄",
                      title: "Scalable Solutions",
                      description: "Build infrastructure that grows with your business needs."
                    },
                    {
                      icon: "💼",
                      title: "Performance Management",
                      description: "Monitor and improve key performance indicators."
                    }
                  ]
                }
              }
            ]}
          />
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
      <ContactSection />

      {/* Statistics Section */}
      <CounterSection
        className="mb-16"
        items={[
          { icon: <Users />, value: '50+', label: 'Total Projects' },
          { icon: <Smile />, value: '200+', label: 'Happy Clients' },
          { icon: <Crown />, value: '3+', label: 'Awards Won' },
          { icon: <CheckSquare />, value: '888+', label: 'Task Completed' }
        ]}
      />

      {/* Partner Logos Section */}
      <section className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LogoLoop
            className="mx-auto"
            height={56}
            gap={48}
            speedSec={30}
            logos={[
              // Local PNGs from website brand-logos (for items not in Devicon or to match brand assets)
              { src: '/assets/images/brand-logos/android.png', alt: 'Android' },
              { src: '/assets/images/brand-logos/aws.png', alt: 'AWS' },
              { src: '/assets/images/brand-logos/reactjs.png', alt: 'React' },
              { src: '/assets/images/brand-logos/nodejs.png', alt: 'Node.js' },
              { src: '/assets/images/brand-logos/googlecloud.png', alt: 'Google Cloud' },
              { src: '/assets/images/brand-logos/firebase.png', alt: 'Firebase' },
              { src: '/assets/images/brand-logos/docker.png', alt: 'Docker' },
              { src: '/assets/images/brand-logos/javascript.png', alt: 'JavaScript' },
              { src: '/assets/images/brand-logos/python.png', alt: 'Python' },
              { src: '/assets/images/brand-logos/java.png', alt: 'Java' },
              { src: '/assets/images/brand-logos/php.png', alt: 'PHP' },
              { src: '/assets/images/brand-logos/laravel.png', alt: 'Laravel' },
              { src: '/assets/images/brand-logos/magento.png', alt: 'Magento' },
              { src: '/assets/images/brand-logos/wordpress.png', alt: 'WordPress' },
              { src: '/assets/images/brand-logos/powerbi.png', alt: 'Power BI' },
              { src: '/assets/images/brand-logos/vuejs.png', alt: 'Vue.js' },
            ]}
          />
        </div>
      </section>
    </WebsiteLayout>
  );
}
