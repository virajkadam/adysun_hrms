'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

interface SimpleBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: React.ReactNode;
}

const SimpleBreadcrumb: React.FC<SimpleBreadcrumbProps> = ({ 
  items, 
  className = '',
  separator = <ChevronRight className="h-4 w-4 text-gray-400" />
}) => {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="breadcrumb" className={`text-sm text-gray-600 ${className}`}>
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li className="flex items-center">
              {item.isCurrent ? (
                <span className="text-gray-900 font-medium">
                  {item.label}
                </span>
              ) : item.href ? (
                <Link 
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-600">
                  {item.label}
                </span>
              )}
            </li>
            {index < items.length - 1 && (
              <li className="flex items-center">
                {separator}
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default SimpleBreadcrumb; 