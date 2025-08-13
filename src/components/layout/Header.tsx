'use client';

import { useState, useRef, useEffect } from 'react';
import { FiLogOut, FiUser, FiChevronDown } from 'react-icons/fi';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const Header = () => {
  const { logout, currentAdmin, currentEmployee } = useAuth();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleProfileClick = () => {
    if (currentAdmin) {
      router.push('/profile');
    } else if (currentEmployee) {
      router.push('/employee/profile');
    }
    setIsDropdownOpen(false);
  };

  // Get user information
  const getUserInfo = () => {
    if (currentAdmin) {
      return {
        name: currentAdmin.name || 'Admin User',
        type: 'Admin'
      };
    } else if (currentEmployee) {
      return {
        name: currentEmployee.name || 'Employee User',
        type: 'Employee'
      };
    }
    return {
      name: 'User',
      type: 'Unknown'
    };
  };

  const userInfo = getUserInfo();

  return (
    <header className="bg-white shadow-sm h-16 fixed top-0 right-0 left-0 lg:left-64 z-10">
      <div className="flex items-center justify-between h-full px-4">
        {/* Mobile title - centered on mobile, hidden on desktop */}
        <h1 className="text-xl font-semibold text-gray-800 lg:hidden flex-1 text-center">
          {currentAdmin ? 'Admin Dashboard' : 'Employee Portal'}
        </h1>
        
        {/* Center logo and company name - hidden on mobile, visible on desktop */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <a 
            href="https://adysunventures.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center hover:opacity-80 transition-opacity cursor-pointer"
          >
            <Image
              src="/adysun-logo.png"
              alt="Adysun Ventures Logo"
              width={30}
              height={30}
              className="object-contain mr-2"
              priority
            />
            <span className="text-xl font-semibold text-gray-800">Adysun Ventures</span>
          </a>
        </div>
        
        {/* User dropdown on the right side */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              {userInfo.name.charAt(0).toUpperCase()}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-sm font-medium text-gray-900">{userInfo.name}</div>
              <div className="text-xs text-gray-500">{userInfo.type}</div>
            </div>
            <FiChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
              <button
                onClick={handleProfileClick}
                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <FiUser className="w-4 h-4" />
                My Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <FiLogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 