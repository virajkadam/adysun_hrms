import React from 'react';
import Button from '../ui/Button';

interface CTASectionProps {
  title: string;
  description: string;
  background?: 'gray' | 'orange' | 'blue';
  actions: Array<{
    text: string;
    href: string;
    variant: 'primary' | 'secondary' | 'outline';
  }>;
  className?: string;
}

export default function CTASection({ 
  title, 
  description, 
  background = 'gray',
  actions,
  className = '' 
}: CTASectionProps) {
  const backgroundClasses = {
    gray: 'bg-gray-50',
    orange: 'bg-orange-600 text-white',
    blue: 'bg-blue-600 text-white'
  };
  
  const textColor = background === 'gray' ? 'text-gray-900' : 'text-white';
  const descColor = background === 'gray' ? 'text-gray-600' : 'text-gray-200';
  
  return (
    <section className={`py-16 ${backgroundClasses[background]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${textColor}`}>
          {title}
        </h3>
        
        <p className={`text-lg mb-8 max-w-3xl mx-auto ${descColor}`}>
          {description}
        </p>
        
        <div className="space-x-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              href={action.href}
              variant={action.variant}
              size="lg"
            >
              {action.text}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
