'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiUsers, FiBriefcase, FiFileText, FiMenu, FiX, FiFile, FiHome, FiUser, FiCalendar } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import { FiMail } from 'react-icons/fi';

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { currentAdmin } = useAuth();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Function to determine if a menu item is active
  const isActive = (path: string) => {
    if (!pathname) return false;
    
    if (path === '/dashboard') {
      // Only consider dashboard active if we're exactly on the dashboard path
      return pathname === '/dashboard';
    }
    
    if (path === '/dashboard/documents') {
      // For documents, consider any document-related path to be active
      return pathname.includes('/documents') || pathname.includes('/doc_pages');
    }
    
    if (path === '/dashboard/attendance') {
      // For attendance, consider attendance-related paths to be active
      return pathname.includes('/attendance');
    }
    
    if (path === '/employees') {
      // For employees, consider employee-related paths and salary-related paths to be active
      return pathname === '/employees' || 
             pathname.startsWith('/employees/') || 
             pathname.startsWith('/salaries') ||
             pathname.startsWith('/employments');
    }
    
    // For other paths, use the original logic
    return pathname === path || pathname.startsWith(path + '/');
  };

  const menuItems = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: <FiHome className="w-5 h-5" />
    },
    {
      path: '/employees',
      name: 'Employees',
      icon: <FiUsers className="w-5 h-5" />
    },
    {
      path: '/dashboard/documents',
      name: 'Documents',
      icon: <FiFile className="w-5 h-5" />
    },
  ];

  // Add Enquiries link for admins only
  if (currentAdmin) {
    menuItems.push({
      path: '/enquiry',
      name: 'Enquiries',
      icon: <FiMail className="w-5 h-5" />
    });
  }

  // Remove Profile - now handled in header dropdown
  // menuItems.push({
  //   path: '/profile',
  //   name: 'My Profile',
  //   icon: <FiUser className="w-5 h-5" />
  // });

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-gray-800 text-white"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-5 flex flex-col h-full">
          <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
          <nav className="flex-grow">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
                      isActive(item.path)
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-700'
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 