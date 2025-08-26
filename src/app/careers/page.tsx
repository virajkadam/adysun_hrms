import React from 'react';
import WebsiteLayout from '@/components/website/WebsiteLayout';

export default function CareersPage() {
  // Company values and culture
  const companyValues = [
    {
      icon: "⚓",
      title: "Innovation",
      description: "We encourage and empower our people to think outside the box and drive innovation in the tech industry."
    },
    {
      icon: "🤝",
      title: "Collaboration",
      description: "We believe in working together as a team, valuing each other's contributions and supporting collective success."
    },
    {
      icon: "♿",
      title: "Accessibility",
      description: "We create inclusive environments where everyone has equal opportunities to contribute and grow."
    },
    {
      icon: "💬",
      title: "Candor",
      description: "We promote open, honest communication and constructive feedback to drive continuous improvement."
    }
  ];

  // Hiring approach
  const hiringApproach = [
    {
      icon: "🚢",
      title: "Be the captain of your own ship",
      description: "Our culture values self-directed individuals who can take ownership of their work and be proactive in driving themselves forward, advancing our mission."
    },
    {
      icon: "🧠",
      title: "Adaptable Mindset",
      description: "Change is Inevitable. We seek those who can readily adjust to changes, embrace new opportunities, and thrive in uncertain situations."
    },
    {
      icon: "🔄",
      title: "Progress-oriented outlook",
      description: "We value and encourage a continuous learning mindset because we believe that learning never ends, and growth is a lifelong process."
    },
    {
      icon: "🤲",
      title: "Empathy in Action",
      description: "We look for team members who embrace empathy and collaboration, valuing the contributions of others and working together towards a common goal."
    }
  ];

  return (
    <WebsiteLayout 
      title="Careers - Let's shape the future with tech together!"
      description="Join Adysun Ventures and be part of a team that's passionate about innovation and creating solutions that make a difference. Explore career opportunities in software development, IT consulting, and technology innovation."
    >
      {/* Hero Section */}
      <section 
        className="relative py-20 text-white"
        style={{
          backgroundImage: "url('/assets/images/bg/bg13.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Let's shape the future with tech together!
            </h1>
            <div className="w-24 h-1 bg-orange-500 mb-8"></div>
            <p className="text-xl md:text-2xl leading-relaxed">
              At Adysun Ventures, we're passionate about innovation and shaping the future. Be part of a team that's dedicated to creating solutions that make a difference.
            </p>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Come for the job,<br />
                stay for the Culture.
              </h2>
            </div>
            <div>
              <p className="text-xl text-gray-600 leading-relaxed">
                We believe that work should not only be fulfilling, but also enjoyable. From office pranks to team-building events, we know how to keep things interesting. Come for the job, stay for the culture, and experience a workplace that is both challenging and rewarding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="relative rounded-lg overflow-hidden"
            style={{
              backgroundImage: "url('/assets/images/bg/bg2.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
          >
            <div className="absolute inset-0 bg-black opacity-80"></div>
            <div className="relative p-8 md:p-16">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                  Dive into endless job opportunities and discover your next big career move!
                </h2>
                <p className="text-xl text-gray-200">
                  Explore diverse roles in software development, IT consulting, and technology innovation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Guiding Values
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                <div className="text-6xl mb-6">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Approach Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Who we hire: The Adysun Approach
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {hiringApproach.map((approach, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="text-6xl mb-6">{approach.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{approach.title}</h3>
                <p className="text-gray-600">{approach.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bring Your Own Role Section */}
      <section 
        className="py-20 text-white"
        style={{
          backgroundImage: "url('/assets/images/bg/bringRole.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Bring Your Own Role</h2>
              <p className="text-xl leading-relaxed mb-8">
                We believe in the power of individuality and creativity. We welcome all professionals who are passionate about technology and have a unique skillset to bring to our team. Bring your own expertise and create your own role within our organization.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Flexible work arrangements</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Continuous learning opportunities</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Innovation-driven environment</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 border border-white border-opacity-20">
                <h3 className="text-2xl font-bold mb-4">Ready to Join Us?</h3>
                <p className="mb-6">Send us your resume and let's discuss how you can contribute to our mission.</p>
                <a 
                  href="/contact-us" 
                  className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600">
              Ready to start your journey with Adysun Ventures? Contact our HR team today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Office Location */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="text-4xl text-orange-500 mb-4">🏢</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Office Location</h3>
              <p className="text-gray-600 mb-4">
                Adysun Ventures<br />
                Pune, Maharashtra, India
              </p>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition-colors"
              >
                📍 Google Maps
              </a>
            </div>

            {/* Email Contacts */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="text-4xl text-orange-500 mb-4">📧</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Email Contacts</h3>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <strong>General:</strong><br />
                  info@adysunventures.com
                </p>
                <p className="text-gray-600">
                  <strong>HR Department:</strong><br />
                  careers@adysunventures.com
                </p>
              </div>
            </div>

            {/* Phone Contact */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="text-4xl text-orange-500 mb-4">📞</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Phone Contact</h3>
              <p className="text-gray-600 mb-4">
                <strong>HR Department:</strong><br />
                +91 (HR Phone Number)
              </p>
              <a 
                href="tel:+91XXXXXXXXXX" 
                className="inline-block bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition-colors"
              >
                📞 Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Shape the Future with Us?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our team of innovators and help us create technology solutions that make a difference in the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact-us" 
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact HR Team
            </a>
            <a 
              href="/about-us" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
            >
              Learn More About Us
            </a>
          </div>
        </div>
      </section>
    </WebsiteLayout>
  );
}
