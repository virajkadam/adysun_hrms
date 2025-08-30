import React from 'react';
import WebsiteLayout from '@/components/website/WebsiteLayout';
import BenefitCard from '@/components/website/BenefitCard';
import CTAButton from '@/components/website/CTAButton';
import CounterSection from '@/components/website/layout/CounterSection';
import ContactSection from '@/components/website/layout/ContactSection';
import PartnerLogosSection from '@/components/website/layout/PartnerLogosSection';
import CTASection from '@/components/website/layout/CTASection';
import { 
  RefreshCw, 
  Brain, 
  Building, 
  MessageSquare, 
  Mail, 
  Phone, 
  MapPin, 
  Users, 
  Target, 
  Heart, 
  Ship, 
  TrendingUp, 
  HandHeart,
  FileText,
  ArrowRight
} from 'lucide-react';

export default function CareersPage() {
  // Company values and culture
  const companyValues = [
    {
      icon: <RefreshCw />,
      title: "Innovation",
      description: "We encourage and empower our people to think outside the box and drive innovation in the tech industry."
    },
    {
      icon: <Users />,
      title: "Collaboration",
      description: "We believe in working together as a team, valuing each other's contributions and supporting collective success."
    },
    {
      icon: <Target />,
      title: "Accessibility",
      description: "We create inclusive environments where everyone has equal opportunities to contribute and grow."
    },
    {
      icon: <MessageSquare />,
      title: "Candor",
      description: "We promote open, honest communication and constructive feedback to drive continuous improvement."
    }
  ];

  // Hiring approach
  const hiringApproach = [
    {
      icon: <Ship />,
      title: "Be the captain of your own ship",
      description: "Our culture values self-directed individuals who can take ownership of their work and be proactive in driving themselves forward, advancing our mission."
    },
    {
      icon: <Brain />,
      title: "Adaptable Mindset",
      description: "Change is Inevitable. We seek those who can readily adjust to changes, embrace new opportunities, and thrive in uncertain situations."
    },
    {
      icon: <TrendingUp />,
      title: "Progress-oriented outlook",
      description: "We value and encourage a continuous learning mindset because we believe that learning never ends, and growth is a lifelong process."
    },
    {
      icon: <HandHeart />,
      title: "Empathy in Action",
      description: "We look for team members who embrace empathy and collaboration, valuing the contributions of others and working together towards a common goal."
    }
  ];



  // Statistics for CounterSection
  const statistics = [
            { icon: <Users />, value: "150+", label: "Total Projects" },
        { icon: <Heart />, value: "75+", label: "Happy Clients" },
    { icon: <FileText />, value: "3+", label: "Awards Won" },
    { icon: <ArrowRight />, value: "888+", label: "Task Completed" }
  ];

  // Partner logos (placeholder data)
  const partnerLogos = [
    "/assets/images/partners/android.png",
    "/assets/images/partners/aws.png",
    "/assets/images/partners/partner1.png",
    "/assets/images/partners/partner2.png",
    "/assets/images/partners/partner3.png",
    "/assets/images/partner4.png"
  ];

  return (
    <WebsiteLayout 
      title="Careers - Let's shape the future with tech together!"
      description="Join Adysun Ventures and be part of a team that's passionate about innovation and creating solutions that make a difference. Explore career opportunities in software development, IT consulting, and technology innovation."
    >
      {/* Hero Section */}
      <section className="pt-16 pb-20 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <span className="text-orange-600 font-semibold text-lg bg-white px-6 py-3 rounded-full shadow-md">
              Join Our Team
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8">
            Let's shape the future with tech together!
          </h1>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            At Adysun Ventures, we're passionate about innovation and shaping the future. Be part of a team that's dedicated to creating solutions that make a difference.
          </p>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Come for the job,<br />
                stay for the Culture.
              </h2>
            </div>
            <div>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe that work should not only be fulfilling, but also enjoyable. From office pranks to team-building events, we know how to keep things interesting. Come for the job, stay for the culture, and experience a workplace that is both challenging and rewarding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Dive into endless job opportunities and discover your next big career move!
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Explore diverse roles in software development, IT consulting, and technology innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Guiding Values
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <BenefitCard
                key={index}
                icon={value.icon}
                title={value.title}
                description={value.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Approach Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Who we hire: The Adysun Approach
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {hiringApproach.map((approach, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-orange-200">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-white [&_*]:w-8 [&_*]:h-8">{approach.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center group-hover:text-orange-700 transition-colors">
                  {approach.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed text-center">
                  {approach.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bring Your Own Role Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Bring Your Own Role</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                We believe in the power of individuality and creativity. We welcome all professionals who are passionate about technology and have a unique skillset to bring to our team. Bring your own expertise and create your own role within our organization.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full flex-shrink-0"></div>
                  <span className="text-lg text-gray-700">Flexible work arrangements</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full flex-shrink-0"></div>
                  <span className="text-lg text-gray-700">Continuous learning opportunities</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full flex-shrink-0"></div>
                  <span className="text-lg text-gray-700">Innovation-driven environment</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-orange-200">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Ready to Join Us?</h3>
                <p className="mb-6 text-gray-600">Send us your resume and let's discuss how you can contribute to our mission.</p>
                <CTAButton href="/contact-us" variant="primary">
                  Apply Now
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <ContactSection />

      {/* Statistics Section */}
      <CounterSection
        items={statistics}
        className="bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200"
      />

      {/* Partner Logos Section */}
      <PartnerLogosSection logos={partnerLogos} />

      {/* CTA Section */}
      <CTASection
        title="Ready to Shape the Future with Us?"
        description="Join our team of innovators and help us create technology solutions that make a difference in the world."
        actions={[
          { text: "Contact HR Team", href: "/contact-us", variant: "primary" },
          { text: "Learn More About Us", href: "/about-us", variant: "secondary" }
        ]}
        backgroundImage="/assets/images/bg/bg13.jpg"
      />
    </WebsiteLayout>
  );
}
