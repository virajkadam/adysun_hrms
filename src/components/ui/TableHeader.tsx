import React from 'react';
import { FiRefreshCw, FiChevronLeft, FiFilter, FiLogIn, FiLogOut, FiCpu, FiUsers, FiClock } from 'react-icons/fi';
import Link from 'next/link';
import SearchBar from './SearchBar';
import Tooltip from './Tooltip';

interface ActionButton {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'orange';
  disabled?: boolean;
}

interface BackButton {
  href?: string;
  onClick?: () => void;
  label?: string;
}

interface FilterOption {
  value: string;
  label: string;
}

interface AttendanceData {
  isCheckedIn: boolean;
  checkInTime?: string;
  checkOutTime?: string;
  checkInDate?: string;
  checkOutDate?: string;
  employeeName?: string;
}

interface TableHeaderProps {
  title?: string;
  total?: number;
  active?: number;
  inactive?: number;
  searchValue: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchPlaceholder?: string;
  searchAriaLabel?: string;
  dropdown?: React.ReactNode;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  actionButtons?: ActionButton[];
  showStats?: boolean;
  showSearch?: boolean;
  backButton?: BackButton;
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  filterOptions?: FilterOption[];
  showFilter?: boolean;
  // Second filter props
  secondFilterValue?: string;
  onSecondFilterChange?: (value: string) => void;
  secondFilterOptions?: FilterOption[];
  showSecondFilter?: boolean;
  secondFilterLabel?: string;
  headerClassName?: string;
  // Attendance marking props
  showAttendanceMarking?: boolean;
  attendanceData?: AttendanceData;
  onCheckIn?: () => void;
  onCheckOut?: () => void;
  isMarkingAttendance?: boolean;
  // Custom filters props
  showCustomFilters?: boolean;
  technologyFilterValue?: string;
  onTechnologyFilterChange?: (value: string) => void;
  technologyFilterOptions?: FilterOption[];
  roleFilterValue?: string;
  onRoleFilterChange?: (value: string) => void;
  roleFilterOptions?: FilterOption[];
  experienceFilterValue?: string;
  onExperienceFilterChange?: (value: string) => void;
  experienceFilterOptions?: FilterOption[];
  onClearFilters?: () => void;
  hasActiveFilters?: boolean;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  title,
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
  actionButtons = [],
  showStats = true,
  showSearch = true,
  backButton,
  filterValue = 'all',
  onFilterChange,
  filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ],
  showFilter = false,
  // Second filter props
  secondFilterValue = 'all',
  onSecondFilterChange,
  secondFilterOptions = [],
  showSecondFilter = false,
  secondFilterLabel = 'Filter',
  headerClassName = 'px-6 pt-6 pb-6',
  showAttendanceMarking = false,
  attendanceData,
  onCheckIn,
  onCheckOut,
  isMarkingAttendance = false,
  // Custom filters props
  showCustomFilters = false,
  technologyFilterValue = '',
  onTechnologyFilterChange,
  technologyFilterOptions = [],
  roleFilterValue = '',
  onRoleFilterChange,
  roleFilterOptions = [],
  experienceFilterValue = '',
  onExperienceFilterChange,
  experienceFilterOptions = [],
  onClearFilters,
  hasActiveFilters = false,
}) => {
  const getButtonClasses = (variant: string = 'primary') => {
    const baseClasses = 'px-4 py-2 rounded-md flex items-center gap-2 transition-colors duration-200';
    
    switch (variant) {
      case 'primary':
        return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700`;
      case 'secondary':
        return `${baseClasses} bg-gray-600 text-white hover:bg-gray-700`;
      case 'success':
        return `${baseClasses} bg-green-600 text-white hover:bg-green-700`;
      case 'warning':
        return `${baseClasses} bg-amber-600 text-white hover:bg-amber-700`;
      case 'danger':
        return `${baseClasses} bg-red-600 text-white hover:bg-red-700`;
      case 'orange':
        return `${baseClasses} bg-orange-400 text-white hover:bg-orange-500`;
      default:
        return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700`;
    }
  };

  const getBackButtonClasses = () => {
    return 'px-3 py-2 rounded-full flex items-center gap-2 transition-colors duration-200 bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300';
  };

  return (
    <div>
      {/* Page Title and Action Buttons */}
      {(title || actionButtons.length > 0 || backButton) && (
        <div className={`flex justify-between items-center ${headerClassName}`}>
          {/* Left Side - Back Button */}
          <div className="flex items-center">
            {backButton && (
              backButton.href ? (
                <Link
                  href={backButton.href}
                  className={getBackButtonClasses()}
                  onClick={backButton.onClick}
                >
                  <FiChevronLeft className="w-4 h-4" />
                  {backButton.label || 'Back'}
                </Link>
              ) : (
                <button
                  onClick={backButton.onClick}
                  className={getBackButtonClasses()}
                >
                  <FiChevronLeft className="w-4 h-4" />
                  {backButton.label || 'Back'}
                </button>
              )
            )}
          </div>

          {/* Center - Title */}
          {title && (
            <div className="flex-1 flex justify-center">
              <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            </div>
          )}

          {/* Right Side - Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Attendance Marking Buttons */}
            {showAttendanceMarking && attendanceData && (
              <>
                {!attendanceData.isCheckedIn ? (
                  <button
                    onClick={onCheckIn}
                    disabled={isMarkingAttendance}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors duration-200"
                  >
                    <FiLogIn className="w-4 h-4" />
                    {isMarkingAttendance ? 'Checking In...' : 'Check In'}
                  </button>
                ) : (
                  <>
                    <div className="px-3 py-2 bg-green-100 text-green-800 rounded-md text-sm font-medium">
                      ✓ Checked In
                    </div>
                    {!attendanceData.checkOutTime && (
                      <button
                        onClick={onCheckOut}
                        disabled={isMarkingAttendance}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors duration-200"
                      >
                        <FiLogOut className="w-4 h-4" />
                        {isMarkingAttendance ? 'Checking Out...' : 'Check Out'}
                      </button>
                    )}
                    {attendanceData.checkOutTime && (
                      <div className="px-3 py-2 bg-red-100 text-red-800 rounded-md text-sm font-medium">
                        ✓ Checked Out
                      </div>
                    )}
                  </>
                )}
              </>
            )}
            
            {/* Regular Action Buttons */}
            {actionButtons.map((button, index) => {
              const buttonContent = (
                <>
                  {button.icon}
                  {button.label}
                </>
              );

              if (button.href) {
                return (
                  <Link
                    key={index}
                    href={button.href}
                    className={`${getButtonClasses(button.variant)} ${
                      button.disabled ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={button.onClick}
                  >
                    {buttonContent}
                  </Link>
                );
              }

              return (
                <button
                  key={index}
                  onClick={button.onClick}
                  disabled={button.disabled}
                  className={`${getButtonClasses(button.variant)} ${
                    button.disabled ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {buttonContent}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Stats and Search Section */}
      {(showStats || showSearch || showFilter || showSecondFilter || showCustomFilters) && (
        <div className="px-6 pb-6 border-b border-gray-200 flex justify-between items-center mt-4">
          {showStats ? (
            <div className="flex items-center gap-6 text-sm text-gray-600">
              {typeof total === 'number' && (
                <span>Total: <span className="font-medium">{total}</span></span>
              )}
              {typeof active === 'number' && (
                <span className="text-green-700">Active: <span className="font-medium">{active}</span></span>
              )}
              {typeof inactive === 'number' && (
                <span className="text-red-700">Inactive: <span className="font-medium">{inactive}</span></span>
              )}
              {dropdown && <span>{dropdown}</span>}
            </div>
          ) : (
            <div className="flex-1"></div>
          )}

          {/* Search and Other Controls - Right Side */}
          <div className="flex items-center gap-4">
            {onRefresh && (
              <Tooltip content="Refresh" position="top" color="blue">
                <button
                  onClick={onRefresh}
                  disabled={isRefreshing}
                  className={`border border-gray-300 p-2 rounded-md transition-all duration-200 ${
                    isRefreshing 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'text-blue-600 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                  aria-label="Refresh data"
                >
                  <FiRefreshCw 
                    className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} 
                  />
                </button>
              </Tooltip>
            )}
            
            {/* Custom Filters - Now on the right side */}
            {showCustomFilters && (
              <>

              {hasActiveFilters && onClearFilters && (
                <button
                  onClick={onClearFilters}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Clear Filters
                </button>
              )}
                {technologyFilterOptions.length > 0 && onTechnologyFilterChange && (
                  <div className="relative">
                    <select
                      value={technologyFilterValue}
                      onChange={(e) => onTechnologyFilterChange(e.target.value)}
                      className="appearance-none border border-gray-300 rounded-md pl-10 pr-8 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-32"
                    >
                      {technologyFilterOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiCpu className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                )}

                {roleFilterOptions.length > 0 && onRoleFilterChange && (
                  <div className="relative">
                    <select
                      value={roleFilterValue}
                      onChange={(e) => onRoleFilterChange(e.target.value)}
                      className="appearance-none border border-gray-300 rounded-md pl-10 pr-8 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-34"
                    >
                      {roleFilterOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUsers className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                )}

                {experienceFilterOptions.length > 0 && onExperienceFilterChange && (
                  <div className="relative">
                    <select
                      value={experienceFilterValue}
                      onChange={(e) => onExperienceFilterChange(e.target.value)}
                      className="appearance-none border border-gray-300 rounded-md pl-10 pr-8 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-32"
                    >
                      {experienceFilterOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiClock className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                )}
              </>
            )}
            
            {showFilter && onFilterChange && (
              <div className="relative">
                <select
                  value={filterValue}
                  onChange={(e) => onFilterChange(e.target.value)}
                  className="appearance-none border border-gray-300 rounded-md pl-10 pr-8 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {filterOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiFilter className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            )}
            {showSecondFilter && onSecondFilterChange && (
              <div className="relative">
                <select
                  value={secondFilterValue}
                  onChange={(e) => onSecondFilterChange(e.target.value)}
                  className="appearance-none border border-gray-300 rounded-md pl-10 pr-8 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {secondFilterOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiFilter className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            )}
            {showSearch && (
              <div className="w-64">
                <SearchBar
                  value={searchValue}
                  onChange={onSearchChange}
                  placeholder={searchPlaceholder}
                  ariaLabel={searchAriaLabel}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Custom Filters Section - REMOVED */}
    </div>
  );
};

export default TableHeader; 