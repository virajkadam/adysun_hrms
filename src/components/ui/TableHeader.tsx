import React from 'react';
import SearchBar from './SearchBar';

interface TableHeaderProps {
  total: number;
  active?: number;
  inactive?: number;
  searchValue: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchPlaceholder?: string;
  searchAriaLabel?: string;
  dropdown?: React.ReactNode;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  total,
  active,
  inactive,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search',
  searchAriaLabel = 'Search',
  dropdown,
}) => (
  <div className="p-4 border-b flex justify-between items-center">
    <div className="flex items-center gap-4 text-sm text-gray-600">
      <span>Total: <span className="font-medium">{total}</span></span>
      {typeof active === 'number' && (
        <span className="text-green-700">Active: <span className="font-medium">{active}</span></span>
      )}
      {typeof inactive === 'number' && (
        <span className="text-red-700">Inactive: <span className="font-medium">{inactive}</span></span>
      )}
      {dropdown && <span>{dropdown}</span>}
    </div>
    <div className="w-64">
      <SearchBar
        value={searchValue}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
        ariaLabel={searchAriaLabel}
      />
    </div>
  </div>
);

export default TableHeader; 