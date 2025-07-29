import React from 'react';
import Link from 'next/link';

type ActionButtonProps = {
  icon: React.ReactNode;
  title: string;
  colorClass: string; // e.g. "bg-blue-100 text-blue-600 hover:text-blue-900"
  href?: string;
  onClick?: () => void;
  as?: 'button' | 'link';
  className?: string;
};

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  title,
  colorClass,
  href,
  onClick,
  as,
  className = '',
}) => {
  const baseClasses =
    'tooltip border border-gray-300 rounded-lg p-2 ' + colorClass + ' ' + className;

  if (as === 'link' || href) {
    return (
      <Link href={href!} className={baseClasses} title={title}>
        {icon}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={baseClasses} title={title}>
      {icon}
    </button>
  );
};
