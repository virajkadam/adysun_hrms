import React from 'react';
import Button from '../ui/Button';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description?: string;
  backgroundImage?: string;
  variant?: 'dark' | 'gradient';
  actions?: Array<{
    text: string;
    href: string;
    variant: 'primary' | 'secondary' | 'outline';
  }>;
  className?: string;
}

export default function HeroSection({ 
  title, 
  subtitle, 
  description,
  backgroundImage,
  variant = 'dark',
  actions = [],
  className = '' 
}: HeroSectionProps) {
  const backgroundClasses = variant === 'gradient' 
    ? 'bg-gradient-to-r from-orange-600 to-orange-700' 
    : 'bg-gray-900';
  
  const backgroundStyle = backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {};
  
  return (
    <section className={`relative py-20 ${backgroundClasses} ${className}`} style={backgroundStyle}>
      {backgroundImage && (
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      )}
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          {title}
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-bold text-orange-400 mb-6">
          {subtitle}
        </h2>
        
        {description && (
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            {description}
          </p>
        )}
        
        {actions.length > 0 && (
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
        )}
      </div>
    </section>
  );
}
