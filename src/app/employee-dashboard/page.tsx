'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { FiUser, FiCalendar, FiLogOut, FiFileText } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import EmployeeLayout from '@/components/layout/EmployeeLayout';
import { getEmployeeSelf } from '@/utils/firebaseUtils';
import { Employee } from '@/types';

export default function EmployeeDashboardPage() {
  const { currentEmployee, currentUserData, logout } = useAuth();
  const router = useRouter();
  const [fullEmployeeData, setFullEmployeeData] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  
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

    // Fetch complete employee data
    const fetchEmployeeData = async () => {
      try {
        if (currentUserData.userType === 'employee') {
          const employeeData = await getEmployeeSelf(currentUserData.id);
          setFullEmployeeData(employeeData);
          
          // Store full employee data in localStorage for other components to use
          localStorage.setItem('fullEmployeeData', JSON.stringify(employeeData));
          
          // If employeeData has employeeId but currentEmployee doesn't, update it
          if (employeeData.employeeId && currentEmployee && !(currentEmployee as any).employeeId) {
            console.log('Syncing employeeId to currentEmployee:', employeeData.employeeId);
            (currentEmployee as any).employeeId = employeeData.employeeId;
            
            // Update the stored employee data in localStorage
            const storedEmployeeData = localStorage.getItem('employeeData');
            if (storedEmployeeData) {
              const parsedData = JSON.parse(storedEmployeeData);
              parsedData.employeeId = employeeData.employeeId;
              localStorage.setItem('employeeData', JSON.stringify(parsedData));
            }
          }
          
          // Also make it available globally for components that might need it
          if (typeof window !== 'undefined') {
            (window as any).employeeDashboardData = {
              employeeId: employeeData.employeeId
            };
          }
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
        toast.error('Failed to load employee data');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
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

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-8 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome, {employee?.name}! 👋</h2>
            <p className="text-blue-100 text-lg">
              You&apos;re successfully logged in to your employee portal.  <br />
              Here you can access your profile, attendance, and leave management.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
        {loading ? (
          <div className="text-center py-4">
            <p className="text-gray-500">Loading employee information...</p>
          </div>
        ) : fullEmployeeData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-900">{fullEmployeeData.employeeId || 'Not Assigned'}</p>
              <p className="text-sm text-gray-600">Employee ID</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">{fullEmployeeData.name}</p>
              <p className="text-sm text-gray-600">Name</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">{fullEmployeeData.email}</p>
              <p className="text-sm text-gray-600">Email</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">{fullEmployeeData.phone}</p>
              <p className="text-sm text-gray-600">Phone</p>
            </div>
            <div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                fullEmployeeData.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {fullEmployeeData.status.toUpperCase()}
              </span>
              <p className="text-sm text-gray-600 mt-1">Status</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-red-500">Failed to load employee information</p>
          </div>
        )}
      </div>
    </EmployeeLayout>
  );
} 