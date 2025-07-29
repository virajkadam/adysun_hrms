import React from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import SearchBar from './SearchBar';
import Tooltip from './Tooltip';

interface TableHeaderProps {
  total: number;
  active?: number;
  inactive?: number;
  searchValue: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchPlaceholder?: string;
  searchAriaLabel?: string;
  dropdown?: React.ReactNode;
  onRefresh?: () => void;
  isRefreshing?: boolean;
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
  onRefresh,
  isRefreshing = false,
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
    <div className="flex items-center gap-3">
      {onRefresh && (
        <Tooltip content="Refresh data" position="top">
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className={`border border-gray-300 p-2 rounded-md transition-all duration-200 ${
              isRefreshing 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700'
            }`}
            aria-label="Refresh data"
          >
            <FiRefreshCw 
              className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} 
            />
          </button>
        </Tooltip>
      )}
      <div className="w-64">
        <SearchBar
          value={searchValue}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
          ariaLabel={searchAriaLabel}
        />
      </div>
    </div>
  </div>
);

export default TableHeader; 