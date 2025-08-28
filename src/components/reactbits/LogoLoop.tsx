"use client";

import React from 'react';

interface LogoItem {
  src: string;
  alt: string;
}

interface LogoLoopProps {
  logos: LogoItem[];
  height?: number; // px
  gap?: number; // px between logos
  speedSec?: number; // full loop duration
  grayscale?: boolean;
  className?: string;
}

export default function LogoLoop({
  logos,
  height = 56,
  gap = 32,
  speedSec = 30,
  grayscale = true,
  className = ''
}: LogoLoopProps) {
  const trackStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: `${gap}px`,
    animation: `logo-loop ${speedSec}s linear infinite`,
  };

  const containerStyle: React.CSSProperties = {
    maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
    WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
  } as React.CSSProperties;

  const baseImgStyle: React.CSSProperties = {
    height: `${height}px`,
    width: 'auto',
    objectFit: 'contain',
    filter: grayscale ? 'grayscale(100%)' : undefined,
    opacity: grayscale ? 0.7 : 1,
    transition: 'filter 0.2s ease, opacity 0.2s ease',
  };

  return (
    <div className={`relative overflow-hidden ${className}`} style={containerStyle} aria-label="Our technology partners">
      <div className="flex" style={{ width: 'max-content' }}>
        <div className="shrink-0" style={trackStyle}>
          {logos.map((logo, idx) => (
            <img
              key={`a-${idx}-${logo.alt}`}
              src={logo.src}
              alt={logo.alt}
              style={baseImgStyle}
              className={grayscale ? 'rb-logo-img' : undefined}
            />
          ))}
        </div>
        <div className="shrink-0" style={trackStyle} aria-hidden>
          {logos.map((logo, idx) => (
            <img
              key={`b-${idx}-${logo.alt}`}
              src={logo.src}
              alt={logo.alt}
              style={baseImgStyle}
              className={grayscale ? 'rb-logo-img' : undefined}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes logo-loop {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .rb-logo-img:hover, .rb-logo-img:focus-visible {
          filter: grayscale(0%);
          opacity: 1;
        }
      `}</style>
    </div>
  );
}


