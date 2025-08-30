import React from 'react';
import ContactCard from '../content/ContactCard';
import Section from '../../ui/Section';
import { designTokens } from '@/lib/design-tokens';
import { MapPin, Mail, Phone } from 'lucide-react';

interface Contact {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  actions?: Array<{
    text: string;
    href: string;
    variant: 'primary' | 'secondary';
  }>;
}

interface ContactSectionProps {
  contacts?: Contact[];
  title?: string;
  subtitle?: string;
  className?: string;
}

/**
 * ContactSection component for displaying contact information
 * @param contacts - Array of contact information
 * @param title - Section title
 * @param subtitle - Section subtitle
 * @param className - Additional CSS classes
 */
export default function ContactSection({ 
  contacts,
  title = 'REACH OUT TO ADYSUN VENTURES',
  subtitle = 'Ready to start your journey with Adysun Ventures? Contact our team today.',
  className = ''
}: ContactSectionProps) {
  const defaultContacts: Contact[] = [
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
        { text: 'Google Maps', href: '#', variant: 'primary' },
        { text: 'Google Search', href: '#', variant: 'primary' }
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
        { text: 'Google Maps', href: '#', variant: 'primary' },
        { text: 'Google Search', href: '#', variant: 'primary' }
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

  const contactData = contacts || defaultContacts;

  return (
    <Section variant="white" size="large" className={className}>
      <div className="text-center mb-20">
        <h2 className={`${designTokens.typography.h2} mb-6`}>
          {title}
        </h2>
        <p className={`${designTokens.typography.body.large} ${designTokens.colors.text.secondary}`}>
          {subtitle}
        </p>
      </div>
      
      <div className={`grid grid-cols-1 md:grid-cols-2 ${designTokens.spacing.gap.large}`}>
        {contactData.map((contact, index) => (
          <ContactCard
            key={index}
            title={contact.title}
            icon={contact.icon}
            content={contact.content}
            actions={contact.actions}
          />
        ))}
      </div>
    </Section>
  );
}
