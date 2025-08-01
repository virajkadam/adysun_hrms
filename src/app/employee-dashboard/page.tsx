'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { FiUser, FiCalendar, FiLogOut, FiFileText } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import EmployeeLayout from '@/components/layout/EmployeeLayout';

export default function EmployeeDashboardPage() {
  const { currentEmployee, currentUserData, logout } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    // Check if user is authenticated
    if (!currentUserData) {
      router.push('/login');
      return;
    }
    
    // If user is admin, redirect to admin dashboard
    if (currentUserData.userType === 'admin') {
      router.push('/dashboard');
      return;
    }
    
    // If user is not employee, redirect to login
    if (currentUserData.userType !== 'employee') {
      router.push('/login');
      return;
    }
  }, [currentUserData, router]);

  // If not employee, don't render dashboard
  if (!currentUserData || currentUserData.userType !== 'employee') {
    return null;
  }

  const employee = currentEmployee || currentUserData;

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logout successful');
      router.push('/login');
    } catch {
      toast.error('Logout failed');
    }
  };

  const cards = [
    {
      title: 'My Profile',
      description: 'View and update your personal information',
      icon: <FiUser className="w-8 h-8 text-blue-500" />,
      link: '/employee/profile',
      color: 'bg-blue-50'
    },
    {
      title: 'Attendance',
      description: 'View your attendance records',
      icon: <FiCalendar className="w-8 h-8 text-purple-500" />,
      link: '/employee/attendance',
      color: 'bg-purple-50'
    },
    {
      title: 'Leaves',
      description: 'Manage your leave requests',
      icon: <FiCalendar className="w-8 h-8 text-green-500" />,
      link: '/employee/leaves',
      color: 'bg-green-50'
    },
    {
      title: 'Documents',
      description: 'Access your HR documents',
      icon: <FiFileText className="w-8 h-8 text-orange-500" />,
      link: '/employee/documents',
      color: 'bg-orange-50'
    },
  ];

  return (
    <EmployeeLayout showBreadcrumb={false}>
      <Toaster position="top-center" />
      
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Employee Dashboard</h1>
          <p className="text-slate-700">Welcome, {employee?.name}!</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Employee ID: {employee?.id}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center space-x-2"
          >
            <FiLogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-8 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome, {employee?.name}! 👋</h2>
            <p className="text-blue-100 text-lg">
              You&apos;re successfully logged in to your employee portal. 
              Here you can access your profile, attendance, and leave management.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <FiUser className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${card.color} p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200`}
            onClick={() => {
              router.push(card.link);
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{card.description}</p>
              </div>
              <div>{card.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Employee Information Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Employee Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-medium">{employee?.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium">{employee?.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Phone</p>
            <p className="font-medium">{employee?.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              employee?.status === 'active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {employee?.status}
            </span>
          </div>
        </div>
      </div>
    </EmployeeLayout>
  );
} 