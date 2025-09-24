import React from 'react';
import WebsiteLayout from '@/components/website/WebsiteLayout';
import PageHero from '@/components/website/ui/PageHero';
import ServiceCard from '@/components/website/ServiceCard';
import ComprehensiveServiceCard from '@/components/website/ComprehensiveServiceCard';
import DetailedServiceSection from '@/components/website/DetailedServiceSection';
import CounterSection from '@/components/website/layout/CounterSection';
import CTAButton from '@/components/website/CTAButton';
import ContactCard from '@/components/website/content/ContactCard';
import ContactSection from '@/components/website/layout/ContactSection';
import PartnerLogosSection from '@/components/website/layout/PartnerLogosSection';
import CTASection from '@/components/website/layout/CTASection';
import { 
  Code, 
  Globe, 
  ShoppingCart, 
  Monitor as MonitorIcon, 
  Brain, 
  Zap, 
  Settings, 
  Users, 
  Rocket, 
  ArrowRight,
  Database,
  BarChart3,
  Target,
  TrendingUp,
  Smartphone,
  Search,
  FileText,
  Shield
} from 'lucide-react';

export default function ServicesPage() {
  // What We Offer - Service Cards
  const serviceItems = [
    {
      image: "/assets/images/content/services/s-1.jpg",
      icon: <Code />,
      title: "Dynamic Website Development",
      description: "Our dynamic website development services create interactive online experiences tailored to your audience with modern technologies and responsive design."
    },
    {
      image: "/assets/images/content/services/s-2.jpg",
      icon: <ShoppingCart />,
      title: "E-Comm Solutions",
      description: "Our e-commerce solutions are designed to empower your business with seamless, secure, and scalable online platforms that drive sales and growth."
    },
    {
      image: "/assets/images/content/services/s-3.jpg",
      icon: <MonitorIcon />,
      title: "Digital Marketing Services",
      description: "At Adysun Ventures, our digital marketing services are meticulously crafted to enhance your brand's online presence and drive measurable results."
    }
  ];

  // Our Comprehensive Services
  const comprehensiveServices = [
    {
      icon: <Zap />,
      title: "Digital Transformation",
      description: "Comprehensive digital transformation strategies to modernize your business operations and drive innovation across all departments."
    },
    {
      icon: <Settings />,
      title: "IT Consulting",
      description: "Strategic IT consulting to align technology with your business objectives and optimize your technology investments."
    },
    {
      icon: <Code />,
      title: "Custom Application Development",
      description: "Tailored software solutions designed specifically for your business requirements and industry challenges."
    },
    {
      icon: <Brain />,
      title: "Software Product Engineering",
      description: "End-to-end product development from concept to deployment and maintenance with agile methodologies."
    },
    {
      icon: <Users />,
      title: "Dedicated Team Hiring",
      description: "Access to skilled professionals who integrate seamlessly with your existing team and deliver exceptional results."
    },
    {
      icon: <Rocket />,
      title: "Product Development",
      description: "Innovative product development services to bring your ideas to market with speed and precision."
    }
  ];

  // Detailed Service Sections with Technologies
  const detailedServices = [
    {
      title: "Machine Learning & AI Solutions",
      description: "Leverage the power of artificial intelligence and machine learning to gain insights, automate processes, and make data-driven decisions. Our AI solutions help businesses stay ahead of the competition by implementing cutting-edge technologies that transform how you operate and serve your customers.",
      solutions: [
        "Predictive Analytics & Forecasting",
        "Natural Language Processing (NLP)",
        "Computer Vision Solutions",
        "Deep Learning Models",
        "AI Model Deployment & Maintenance",
        "Process Automation & Optimization"
      ],
      technologies: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "AWS SageMaker", "Google Cloud AI"]
    },
    {
      title: "Web Development",
      description: "Comprehensive web development services that create engaging, responsive, and high-performance websites. From simple landing pages to complex web applications, we deliver solutions that drive user engagement and business growth with modern frameworks and best practices.",
      solutions: [
        "Custom Website Development",
        "Content Management Systems (CMS)",
        "Frontend Design & Development",
        "Complex Backend Systems & API Integrations",
        "Cloud-Native Development",
        "eCommerce Applications"
      ],
      technologies: ["React", "Angular", "Vue.js", "Node.js", "WordPress", "Shopify"]
    },
    {
      title: "Mobile Application Development",
      description: "Native and cross-platform mobile applications that deliver exceptional user experiences across all devices. Our mobile development expertise ensures your app stands out in the competitive app marketplace with intuitive design and robust functionality.",
      solutions: [
        "Enterprise Mobile Apps",
        "Cross-platform Apps",
        "Native iOS/Android Apps",
        "Hybrid Apps",
        "Wearable Apps",
        "App Maintenance & Support"
      ],
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Xamarin", "Ionic"]
    },
    {
      title: "Business Intelligence (BI) Analytics",
      description: "Transform your data into actionable insights with our comprehensive BI and analytics solutions. We help organizations make informed decisions by providing clear, visual, and interactive data representations that drive strategic planning and operational efficiency.",
      solutions: [
        "Data Integration & Warehousing",
        "Data Extraction & Transformation",
        "Data Visualization & Dashboards",
        "Data Analysis & Reporting",
        "Performance Monitoring",
        "Predictive Analytics"
      ],
      technologies: ["Tableau", "Power BI", "Qlik Sense", "AWS", "Azure", "Google Cloud"]
    },
    {
      title: "Agile Project Management",
      description: "Implement agile methodologies to improve project delivery, team collaboration, and product quality. Our agile experts help organizations adopt best practices for faster time-to-market and better stakeholder satisfaction through proven frameworks and tools.",
      solutions: [
        "Scrum Masters",
        "Project Managers",
        "Product Managers",
        "Technical Project Managers",
        "Agile Coaching & Training",
        "Sprint Planning & Retrospectives"
      ],
      technologies: ["Jira", "Trello", "Asana", "Monday.com", "Slack", "Microsoft Teams"]
    },
    {
      title: "SEO (Search Engine Optimisation)",
      description: "Improve your website's visibility in search engines and drive organic traffic with our comprehensive SEO services. We implement proven strategies to boost your search rankings and increase online presence through technical optimization and content strategy.",
      solutions: [
        "Keyword Research & Analysis",
        "Competitive Analysis",
        "Link Building & Outreach",
        "Technical SEO Optimization",
        "Content Strategy & Optimization",
        "Local SEO & Google My Business"
      ],
      technologies: ["Google Analytics", "SEMrush", "Ahrefs", "Google Search Console", "Screaming Frog", "Moz"]
    }
  ];



  // Statistics for CounterSection
  const statistics = [
            { icon: <Code />, value: "150+", label: "Total Projects" },
        { icon: <Globe />, value: "75+", label: "Happy Clients" },
    { icon: <ShoppingCart />, value: "3+", label: "Awards Won" },
    { icon: <MonitorIcon />, value: "888+", label: "Task Completed" }
  ];


  return (
    <WebsiteLayout 
      title="Our Services - Adysun Ventures"
      description="Comprehensive IT solutions and business strategy services including web development, e-commerce, digital marketing, machine learning, and technology consulting."
    >
      {/* Page Hero Section */}
      <PageHero
        title="Our"
        titleHighlight="Services"
        description="From web development to AI solutions, we provide end-to-end technology services that drive business growth and digital transformation."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', isActive: true }
        ]}
      />

      {/* What We Offer Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What We Offer
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Our core service offerings designed to meet your most critical business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceItems.map((service, index) => (
              <ServiceCard
                key={index}
                image={service.image}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Our Comprehensive Services Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Comprehensive Services
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              A complete suite of technology services to support your business at every stage
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {comprehensiveServices.map((service, index) => (
              <ComprehensiveServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Service Sections */}
      {detailedServices.map((service, index) => (
        <DetailedServiceSection
          key={index}
          title={service.title}
          description={service.description}
          solutions={service.solutions}
          technologies={service.technologies}
          className={index % 2 === 0 ? 'bg-white' : 'bg-gradient-to-br from-orange-50 to-orange-100'}
        />
      ))}

      {/* CTA Section */}
      <CTASection
        title="Ready to Transform Your Business?"
        description="Let's discuss how our services can drive your business growth and digital transformation."
        actions={[
          { text: "Get Started Today", href: "/contact-us", variant: "primary" },
          { text: "Learn More About Us", href: "/about-us", variant: "secondary" }
        ]}
        backgroundImage="/assets/images/bg/bg9.jpg"
      />

      {/* Contact Information Section */}
      <ContactSection />

      {/* Statistics Section */}
      <CounterSection
        items={statistics}
        className="bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200"
      />

      {/* Partner Logos Section */}
      <PartnerLogosSection />
    </WebsiteLayout>
  );
}
