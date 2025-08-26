import React from 'react';

interface StatisticsCardProps {
  number: string;
  label: string;
  variant?: 'light' | 'dark';
  className?: string;
}

export default function StatisticsCard({ 
  number, 
  label, 
  variant = 'dark',
  className = '' 
}: StatisticsCardProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-gray-900';
  const labelColor = variant === 'light' ? 'text-gray-200' : 'text-gray-600';
  
  return (
    <div className={`text-center ${className}`}>
      <div className={`text-4xl md:text-5xl font-bold mb-2 ${textColor}`}>
        {number}
      </div>
      <div className={`text-lg ${labelColor}`}>
        {label}
      </div>
    </div>
  );
}
