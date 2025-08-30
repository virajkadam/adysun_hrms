import React from 'react';
import ContactCard from '../content/ContactCard';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function ContactSection() {
  const title = 'REACH OUT TO ADYSUN VENTURES';

  const contacts = [
    {
      title: 'Pune Office (Head Office)',
      icon: <MapPin className="w-5 h-5" />,
      content: (
        <div>
          <p>Adysun Ventures Pvt. Ltd.</p>
          <p>Workplex, S no 47,</p>
          <p>Near Bhapkar Petrol Pump,</p>
          <p>Pune, Maharashtra - 411009</p>
        </div>
      ),
      actions: [
        { text: 'Google Maps', href: '#', variant: 'primary' as const },
        { text: 'Google Search', href: '#', variant: 'primary' as const }
      ]
    },
    {
      title: 'Thane Office (Mumbai Division)',
      icon: <MapPin className="w-5 h-5" />,
      content: (
        <div>
          <p>Adysun Ventures Pvt. Ltd.</p>
          <p>A2, 704, Kanchanpushp Society</p>
          <p>Kavesar, Thane West,</p>
          <p>Thane, Maharashtra - 400607</p>
        </div>
      ),
      actions: [
        { text: 'Google Maps', href: '#', variant: 'primary' as const },
        { text: 'Google Search', href: '#', variant: 'primary' as const }
      ]
    },
    {
      title: 'Email Contacts',
      icon: <Mail className="w-5 h-5" />,
      content: (
        <div>
          <p><strong>General Inquiries:</strong></p>
          <p>info@adysunventures.com</p>
          <p><strong>HR & Recruitment:</strong></p>
          <p>hr@adysunventures.com</p>
        </div>
      )
    },
    {
      title: 'Phone',
      icon: <Phone className="w-5 h-5" />,
      content: (
        <div>
          <p className="text-lg font-semibold">+91 9579537523</p>
          <p>Mon-Sat: 10:00 AM - 6:00 PM</p>
          <p>Closed on Sundays & National Holidays</p>
        </div>
      )
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          <p className="text-xl text-gray-600">
            Ready to start your journey with Adysun Ventures? Contact our team today.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {contacts.map((contact, index) => (
            <ContactCard
              key={index}
              title={contact.title}
              icon={contact.icon}
              content={contact.content}
              actions={contact.actions}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
