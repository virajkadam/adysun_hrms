import React from 'react';
import WebsiteLayout from '@/components/website/WebsiteLayout';
import PageHero from '@/components/website/ui/PageHero';
import CounterSection from '@/components/website/layout/CounterSection';
import CTAButton from '@/components/website/CTAButton';
import ContactCard from '@/components/website/content/ContactCard';
import ContactSection from '@/components/website/layout/ContactSection';
import CTASection from '@/components/website/layout/CTASection';
import { 
  Briefcase, 
  Mail, 
  Clock, 
  Globe, 
  Check,
  MapPin,
  Phone,
  ArrowRight
} from 'lucide-react';

export default function ContactUsPage() {


  // Office hours and additional info
  const officeInfo = [
    {
      icon: <Clock />,
      title: "Business Hours",
      details: [
        "Monday - Saturday: 10:00 AM - 6:00 PM",
        "Sunday & National Holidays: Closed"
      ]
    },
    {
      icon: <Globe />,
      title: "Response Time",
      details: [
        "We typically respond to inquiries within 24 hours",
        "Urgent requests are prioritized accordingly"
      ]
    },
    {
      icon: <Briefcase />,
      title: "Consultation",
      details: [
        "Free initial consultation for new projects",
        "Comprehensive project assessment and planning"
      ]
    }
  ];

  // Why choose us
  const whyChooseUs = [
    "Expert team with 10+ years of experience",
    "Comprehensive IT solutions and consulting",
    "Industry-specific expertise and solutions",
    "Ongoing support and maintenance",
    "Competitive pricing and transparent communication"
  ];

  // Statistics for CounterSection
  const statistics = [
            { icon: <Briefcase />, value: "150+", label: "Total Projects" },
        { icon: <Mail />, value: "75+", label: "Happy Clients" },
    { icon: <Clock />, value: "3+", label: "Awards Won" },
    { icon: <Globe />, value: "888+", label: "Task Completed" }
  ];

  // Technology/Partner logos
  const techLogos = [
    { src: "/assets/images/brand-logos/adysunventures_android.png", alt: "Android" },
    { src: "/assets/images/brand-logos/adysunventures_angular.png", alt: "Angular" },
    { src: "/assets/images/brand-logos/adysunventures_aws.png", alt: "AWS" },
    { src: "/assets/images/brand-logos/adysunventures_azure.png", alt: "Azure" },
  ];

  return (
    <WebsiteLayout 
      title="Contact Us - Adysun Ventures"
      description="Get in touch with Adysun Ventures for IT solutions and business strategy consulting. Contact our Pune and Thane offices or reach us via email and phone."
    >
      {/* Page Hero Section */}
      <PageHero
        title="Contact"
        titleHighlight="Us"
        description="We're here to help you transform your business with innovative IT solutions"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact Us', isActive: true }
        ]}
      />

      {/* Contact Information Section */}
      <ContactSection />

      {/* Office Hours & Additional Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">Office Hours & Information</h3>
              <div className="space-y-8">
                {officeInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-white [&_*]:w-6 [&_*]:h-6">{info.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">{info.title}</h4>
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-gray-600 mb-2">{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">Why Choose Adysun Ventures?</h3>
              <div className="space-y-4">
                {whyChooseUs.map((reason, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                      <span className="text-white text-xs">
                        <Check className="w-3 h-3" />
                      </span>
                    </div>
                    <span className="text-lg text-gray-700">{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <CounterSection
        items={statistics}
        className="bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200"
      />

      {/* Technology/Partner Logos Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Technology & Partner Stack
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We work with leading technology platforms to deliver world-class solutions
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-items-center">
            {techLogos.map((logo, index) => (
              <div key={index} className="flex justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200 hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-full h-full object-contain transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Start Your Project?"
        description="Let's discuss how we can help transform your business with innovative IT solutions."
        actions={[
          { text: "Call Us Now", href: "tel:+919511557023", variant: "primary" },
          { text: "Send Email", href: "mailto:info@adysunventures.com", variant: "secondary" }
        ]}
      />
    </WebsiteLayout>
  );
}
