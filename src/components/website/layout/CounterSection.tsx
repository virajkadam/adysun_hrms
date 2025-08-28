import React from 'react';
import CountUp from '@/components/reactbits/CountUp';

type CounterItem = {
  icon: React.ReactNode;
  value: React.ReactNode;
  label: string;
};

interface CounterSectionProps {
  items: CounterItem[];
  backgroundImageUrl?: string;
  overlayOpacity?: number; // 0-100 (used for custom overlays if needed)
  className?: string;
}

export default function CounterSection({
  items,
  backgroundImageUrl,
  overlayOpacity = 60,
  className = ''
}: CounterSectionProps) {
  const hasBackground = Boolean(backgroundImageUrl);

  return (
    <section
      className={`relative py-12 md:py-16 ${hasBackground ? 'bg-cover bg-center' : 'bg-gray-900'} ${className}`}
      style={hasBackground ? { backgroundImage: `url(${backgroundImageUrl})` } : undefined}
      aria-label="Key metrics"
    >
      {hasBackground && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: Math.min(Math.max(overlayOpacity, 0), 100) / 100 }}
          aria-hidden
        />
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-lg text-center p-6 backdrop-blur-sm"
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-orange-400 mb-3">
                {/* Icons should inherit current color; ensure they are sized */}
                <span className="[&_*]:w-5 [&_*]:h-5">{item.icon}</span>
              </span>
              <h3 className="text-3xl font-bold text-white">
                {typeof item.value === 'string' ? (
                  (() => {
                    const match = (item.value as string).match(/^(\d+(?:\.\d+)?)(.*)$/);
                    const end = match ? parseFloat(match[1]) : Number(item.value);
                    const suffix = match && match[2] ? match[2] : '';
                    return (
                      <>
                        <CountUp to={end} duration={2} />{suffix}
                      </>
                    );
                  })()
                ) : (
                  <CountUp to={Number(item.value)} duration={2} />
                )}
              </h3>
              <div className="h-0.5 w-16 bg-white/40 my-3 mx-auto" />
              <p className="text-sm font-medium text-white/90">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


