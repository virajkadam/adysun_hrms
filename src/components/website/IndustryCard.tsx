import React from 'react';
import Link from 'next/link';

interface IndustryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  linkText: string;
  bgColor?: string;
}

export default function IndustryCard({ 
  icon, 
  title, 
  description, 
  link, 
  linkText,
  bgColor = 'bg-green-100'
}: IndustryCardProps) {
  return (
    <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className={`w-16 h-16 ${bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
        <span className="text-2xl text-orange-600 [&_*]:w-6 [&_*]:h-6">{icon}</span>
      </div>
      <h4 className="text-xl text-gray-800 font-semibold text-center mb-2">{title}</h4>
      <p className="text-gray-600 text-center mb-4">{description}</p>
      <div className="text-center">
        <Link 
          href={link} 
          className="text-blue-600 hover:text-blue-800 font-semibold"
        >
          {linkText} →
        </Link>
      </div>
    </div>
  );
}
