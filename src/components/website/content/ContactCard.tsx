import React from 'react';
import Button from '../ui/Button';

interface ContactCardProps {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  actions?: Array<{
    text: string;
    href: string;
    variant?: 'primary' | 'secondary';
  }>;
  className?: string;
}

export default function ContactCard({ 
  title, 
  icon, 
  content, 
  actions = [],
  className = '' 
}: ContactCardProps) {
  return (
    <div className={`bg-white rounded-lg p-6 shadow-sm border ${className}`}>
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
          <span className="text-xl text-orange-600">{icon}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      
      <div className="mb-4 text-gray-600">
        {content}
      </div>
      
      {actions.length > 0 && (
        <div className="space-x-2">
          {actions.map((action, index) => (
            <Button
              key={index}
              href={action.href}
              variant={action.variant || 'primary'}
              size="sm"
            >
              {action.text}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
