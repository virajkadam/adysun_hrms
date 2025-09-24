import React from 'react';
import WebsiteLayout from '@/components/website/WebsiteLayout';
import HeroSection from '@/components/website/layout/HeroSection';
import SectionTitle from '@/components/website/ui/SectionTitle';
import FeatureCard from '@/components/website/FeatureCard';
import IndustryCard from '@/components/website/IndustryCard';
import CTASection from '@/components/website/layout/CTASection';
import ContactCard from '@/components/website/content/ContactCard';

import CounterSection from '@/components/website/layout/CounterSection';
import { Users, Smile, Crown, CheckSquare, PiggyBank, BarChart3, Rocket, ShoppingCart, LineChart, Truck, CheckCircle2, Cog, Handshake, Brain, Smartphone, Target, TrendingUp, Zap, RefreshCw, Briefcase } from 'lucide-react';
import PartnerLogo from '@/components/website/content/PartnerLogo';
import FAQAccordion from '@/components/website/content/FAQAccordion';
import ProcessSteps from '@/components/website/content/ProcessSteps';
import InteractiveProcessSteps from '@/components/website/layout/InteractiveProcessSteps';
import ContactSection from '@/components/website/layout/ContactSection';
import FAQSection from '@/components/website/layout/FAQSection';
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
              icon={<PiggyBank />}
              title="Saving Investments"
              description="Optimize your technology investments for long-term growth and success."
              variant="dark"
            />
            <FeatureCard
              icon={<BarChart3 />}
              title="Effective Strategy"
              description="Building effective strategies to optimize your IT infrastructure for maximum ROI."
              variant="dark"
            />
            <FeatureCard
              icon={<Rocket />}
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
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Business Strategy Consulting</h3>
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">Advisory</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Align technology with strategic objectives to maximize ROI and competitive advantage.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start text-gray-800">
                    <CheckCircle2 className="mr-3 h-5 w-5 text-orange-600" />
                    <span>IT Strategic Planning</span>
                  </li>
                  <li className="flex items-start text-gray-800">
                    <CheckCircle2 className="mr-3 h-5 w-5 text-orange-600" />
                    <span>Digital Transformation Roadmaps</span>
                  </li>
                  <li className="flex items-start text-gray-800">
                    <CheckCircle2 className="mr-3 h-5 w-5 text-orange-600" />
                    <span>Technology Investment Advisory</span>
                  </li>
                </ul>
              </div>
              
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Advanced IT Solutions</h3>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">Delivery</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Comprehensive technical solutions engineered for performance, resilience, and scale.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start text-gray-800">
                    <CheckCircle2 className="mr-3 h-5 w-5 text-orange-600" />
                    <span>Custom Software Development</span>
                  </li>
                  <li className="flex items-start text-gray-800">
                    <CheckCircle2 className="mr-3 h-5 w-5 text-orange-600" />
                    <span>Cloud Migration &amp; Management</span>
                  </li>
                  <li className="flex items-start text-gray-800">
                    <CheckCircle2 className="mr-3 h-5 w-5 text-orange-600" />
                    <span>Cybersecurity Services</span>
                  </li>
                </ul>
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
              icon={<Cog />}
              title="Innovative Approach"
              description="We leverage cutting-edge technologies and methodologies to deliver innovative solutions."
            />
            <FeatureCard
              icon={<Users />}
              title="Expert Team"
              description="Our experienced team brings deep domain knowledge and technical expertise."
            />
            <FeatureCard
              icon={<Handshake />}
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
                      icon: <Rocket className="w-8 h-8" />,
                      title: "Digital Transformation",
                      description: "Modernize your business processes with cutting-edge digital solutions."
                    },
                    {
                      icon: <Brain className="w-8 h-8" />,
                      title: "AI Integration",
                      description: "Leverage artificial intelligence to automate and optimize operations."
                    },
                    {
                      icon: <BarChart3 className="w-8 h-8" />,
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
                      icon: <Smartphone className="w-8 h-8" />,
                      title: "Digital Presence",
                      description: "Build a strong online presence across all digital channels."
                    },
                    {
                      icon: <Target className="w-8 h-8" />,
                      title: "Target Marketing",
                      description: "Reach your ideal customers with precision-targeted campaigns."
                    },
                    {
                      icon: <TrendingUp className="w-8 h-8" />,
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
                      icon: <Zap className="w-8 h-8" />,
                      title: "Process Optimization",
                      description: "Streamline operations for maximum efficiency and productivity."
                    },
                    {
                      icon: <RefreshCw className="w-8 h-8" />,
                      title: "Scalable Solutions",
                      description: "Build infrastructure that grows with your business needs."
                    },
                    {
                      icon: <Briefcase className="w-8 h-8" />,
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
              icon={<LineChart />}
              title="Stock Exchange & Financial Services"
              description="High-performance solutions for financial markets and trading platforms."
              link="/industries/stock-exchange"
              linkText="Explore Financial Services Solutions"
              bgColor="bg-orange-100"
            />
            <IndustryCard
              icon={<ShoppingCart />}
              title="E-Commerce & Retail Solutions"
              description="Scalable platforms and solutions for online retail businesses."
              link="/industries/ecommerce"
              linkText="Discover E-Commerce Solutions"
              bgColor="bg-orange-100"
            />
            <IndustryCard
              icon={<Truck />}
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
      <FAQSection />

      {/* CTA Section */}
      <CTASection
        title="Ready to Transform Your Business with IT Solutions?"
        description="Contact us today to discuss how our services can drive your business growth."
        actions={[
          { text: "Get in Touch", href: "/contact-us", variant: "secondary" }
        ]}
        className="mb-16"
      />

      {/* Contact Section */}
      <ContactSection />

      {/* Statistics Section */}
      <CounterSection
        className="mb-16"
        items={[
                  { icon: <Users />, value: '150+', label: 'Total Projects' },
        { icon: <Smile />, value: '75+', label: 'Happy Clients' },
          { icon: <Crown />, value: '3+', label: 'Awards Won' },
          { icon: <CheckSquare />, value: '888+', label: 'Task Completed' }
        ]}
      />

      {/* Partner Logos Section */}
      <section className="bg-gray-800 py-16">
        <div className="w-full">
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
