import React from 'react';
import Button from '../ui/Button';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description?: string;
  backgroundImage?: string;
  variant?: 'dark' | 'gradient' | 'image';
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
  if (variant === 'image' && backgroundImage) {
    return (
      <section 
        className={`relative w-screen h-screen bg-cover bg-center bg-no-repeat ${className}`}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundColor: 'rgb(10, 10, 10)',
          minHeight: '100vh',
          width: '100vw'
        }}
        role="img"
        aria-label="Adysun Ventures hero section background"
      >
        {/* Dark overlay - similar to data-overlay-dark="7" */}
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 0
          }}
        />
        
        {/* Content container - LEFT ALIGNED */}
        <div className="container mx-auto py-10 relative h-full flex items-center" style={{ zIndex: 1 }}>
          <div className="text-left max-w-2xl">
            <span className="text-white text-2xl md:text-3xl block mb-6 font-light">
              {title}
            </span>
            
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold m-0 mb-8 leading-tight">
              <span className="text-orange-500">{subtitle.split(':')[0]}: </span>
              <span className="font-normal">{subtitle.split(':')[1] || subtitle}</span>
            </h2>
            
            {/* Separator line */}
            <div className="w-24 h-px bg-white opacity-30 my-10" />
            
            {description && (
              <p className="text-white mb-10 max-w-3xl text-lg md:text-xl leading-relaxed opacity-90">
                {description}
              </p>
            )}
            
            {actions.length > 0 && (
              <div className="mt-8 space-x-4">
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
        </div>
      </section>
    );
  }

  // Default dark variant
  const backgroundClasses = variant === 'gradient' 
    ? 'bg-gradient-to-r from-orange-600 to-orange-700' 
    : 'bg-black';
  
  return (
    <section className={`relative py-20 ${backgroundClasses} ${className}`}>
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
