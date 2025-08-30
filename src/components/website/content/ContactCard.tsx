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
    icon?: React.ReactNode;
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
    <div className={`bg-white rounded-2xl p-8 shadow-lg border ${className}`}>
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
          <span className="text-white text-xl">{icon}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>
      
      <div className="mb-6 text-gray-600 leading-relaxed">
        {content}
      </div>
      
      {actions.length > 0 && (
        <div className="flex space-x-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              href={action.href}
              variant={action.variant || 'primary'}
              size="sm"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 flex items-center space-x-2"
            >
              {action.icon && <span>{action.icon}</span>}
              <span>{action.text}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
