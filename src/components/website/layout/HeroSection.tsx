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
    const isVideo = backgroundImage.endsWith('.mp4') || backgroundImage.endsWith('.webm') || backgroundImage.endsWith('.ogg');
    
    return (
      <section 
        className={`relative w-screen h-screen overflow-hidden ${className}`}
        style={{
          backgroundColor: 'rgb(10, 10, 10)',
          minHeight: '100vh',
          width: '99vw'
        }}
        role="img"
        aria-label="Adysun Ventures hero section background"
      >
        {isVideo ? (
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
          >
            <source src={backgroundImage} type="video/mp4" />
          </video>
        ) : (
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
            }}
          />
        )}
        {/* Dark overlay - similar to data-overlay-dark="7" */}
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            // backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 0
          }}
        />
        
        {/* Content container - Industry Standard Layout */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative h-full flex items-center" style={{ zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full max-w-7xl mx-auto">
            {/* Left Column - Content */}
            <div className="order-2 lg:order-1">
              {/* Trust Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-white text-sm font-medium">Trusted by 75+ Companies</span>
              </div>
              
              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">ADYSUN VENTURES</span>
                {/* <span className="block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                  When service matters
                  </span>
                </span> */}
              </h1>
              
              {/* Subtitle */}
              <h2 className="text-4xl ">
                Premium IT Solutions & Business Strategy Services
              </h2>
              
              {/* Description */}
              {/* {description && (
                <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-2xl">
                  {description}
                </p>
              )} */}
              
              {/* CTA Buttons */}
              {actions.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-4 m-12">
                  {actions.map((action, index) => (
                    <Button
                      key={index}
                      href={action.href}
                      variant={action.variant}
                      size="lg"
                      className={`min-h-[56px] px-8 font-semibold transition-all duration-300 ${
                        action.variant === 'primary' 
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-orange-500/25' 
                          : 'border-2 border-white/30 hover:border-white/60 hover:bg-white/10'
                      }`}
                    >
                      {action.text}
                    </Button>
                  ))}
                </div>
              )}
              
              {/* Trust Indicators */}
              <div className="flex items-center space-x-8 text-sm text-gray-400">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-400 rounded-full mr-2"></div>
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-400 rounded-full mr-2"></div>
                  <span>10+ Years Experience</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-purple-400 rounded-full mr-2"></div>
                  <span>ISO Certified</span>
                </div>
              </div>
            </div>
            
        
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
          <div className="space-x-4 flex flex-col sm:flex-row gap-4 justify-center">
            {actions.map((action, index) => (
              <Button
                key={index}
                href={action.href}
                variant={action.variant}
                size="lg"
                className="min-h-[48px] min-w-[44px] touch-manipulation"
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
