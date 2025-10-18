'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser, FiMail, FiPhone, FiCalendar, FiShield, FiLogOut, FiEdit, FiKey, FiMapPin, FiBriefcase, FiDollarSign } from 'react-icons/fi';
import EmployeeLayout from '@/components/layout/EmployeeLayout';
import { useAuth } from '@/context/AuthContext';
import { formatDateToDayMonYear } from '@/utils/documentUtils';
import toast, { Toaster } from 'react-hot-toast';
import TableHeader from '@/components/ui/TableHeader';

export default function EmployeeProfilePage() {
  const { currentUserData, currentEmployee, logout } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Redirect if not authenticated or not an employee
  useEffect(() => {
    if (!currentUserData || currentUserData.userType !== 'employee') {
      router.push('/login');
    }
  }, [currentUserData, router]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out');
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Show loading if no user data
  if (!currentUserData || !currentEmployee) {
    return (
      <EmployeeLayout>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </EmployeeLayout>
    );
  }

  const getUserStatus = () => {
    return currentEmployee.status === 'active' ? 'Active' : 'Inactive';
  };

  const isUserActive = () => {
    return currentEmployee.status === 'active';
  };

  const getUserCreatedAt = () => {
    const createdAt = currentEmployee?.createdAt;
    if (!createdAt) return 'Unknown';
    
    try {
      if (createdAt.toDate) {
        return formatDateToDayMonYear(createdAt.toDate());
      } else {
        return formatDateToDayMonYear(createdAt);
      }
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Unknown';
    }
  };

  return (
    <EmployeeLayout
      breadcrumbItems={[
        { label: 'Dashboard', href: '/employee-dashboard' },
        { label: 'My Profile', isCurrent: true }
      ]}
    >
      <Toaster position="top-center" />
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <TableHeader
          title="My Profile"
          total={0}
          active={0}
          inactive={0}
          searchValue=""
          onSearchChange={() => {}}
          searchPlaceholder=""
          showStats={false}
          showSearch={false}
          showFilter={false}
          headerClassName="px-6 py-6"
          // actionButtons={[
          //   {
          //     label: 'Edit Profile',
          //     icon: <FiEdit />,
          //     variant: 'primary' as const,
          //     href: '/employee/profile/edit'
          //   },
          //   {
          //     label: 'Change Password',
          //     icon: <FiKey />,
          //     variant: 'secondary' as const,
          //     href: '/employee/profile/password'
          //   },
          //   {
          //     label: 'Logout',
          //     icon: <FiLogOut />,
          //     variant: 'danger' as const,
          //     onClick: handleLogout,
          //     disabled: isLoggingOut
          //   }
          // ]}
          backButton={{
            href: '/employee-dashboard',
            label: 'Back'
          }}
        />

        <div className="px-6 pb-6">
          {/* Personal Information */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiUser className="mr-2" /> Personal Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow p-3">
                <p className="text-lg font-medium text-gray-900">{currentEmployee.name || '-'}</p>
                <p className="text-sm text-gray-500">Full Name</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-3">
                <p className="text-lg font-medium text-gray-900">
                  {(() => {
                    // Try multiple sources to get the employeeId
                    let employeeId = (currentEmployee as any).employeeId;
                    
                    // If not found in currentEmployee, try localStorage
                    if (!employeeId) {
                      try {
                        const fullEmployeeData = localStorage.getItem('fullEmployeeData');
                        if (fullEmployeeData) {
                          const parsedData = JSON.parse(fullEmployeeData);
                          if (parsedData.employeeId) {
                            employeeId = parsedData.employeeId;
                            // Update currentEmployee for future reference
                            (currentEmployee as any).employeeId = employeeId;
                          }
                        }
                      } catch (error) {
                        console.error('Error retrieving employee ID:', error);
                      }
                    }
                    
                    return employeeId || 'Not Assigned';
                  })()}
                </p>
                <p className="text-sm text-gray-500">Employee ID</p>
              </div>
               
               <div className="bg-white rounded-lg shadow p-3">
                 <p className="text-lg font-medium text-gray-900">{currentEmployee.email || '-'}</p>
                 <p className="text-sm text-gray-500">Email</p>
               </div>
               
               <div className="bg-white rounded-lg shadow p-3">
                 <p className="text-lg font-medium text-gray-900">{currentEmployee.phone || '-'}</p>
                 <p className="text-sm text-gray-500">Phone</p>
               </div>
               
               <div className="bg-white rounded-lg shadow p-3">
                 <p className="text-lg font-medium text-gray-900">-</p>
                 <p className="text-sm text-gray-500">Position</p>
               </div>
               
               <div className="bg-white rounded-lg shadow p-3">
                 <p className="text-lg font-medium text-gray-900">-</p>
                 <p className="text-sm text-gray-500">Department</p>
               </div>
              
              <div className="bg-white rounded-lg shadow p-3">
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    isUserActive()
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {getUserStatus()}
                </span>
                <p className="text-sm text-gray-500 mt-2">Status</p>
              </div>
              
                             <div className="bg-white rounded-lg shadow p-3">
                 <p className="text-lg font-medium text-gray-900">-</p>
                 <p className="text-sm text-gray-500">Date of Birth</p>
               </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiMapPin className="mr-2" /> Contact Information
            </h2>
            
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="bg-white rounded-lg shadow p-3">
                 <p className="text-lg font-medium text-gray-900">-</p>
                 <p className="text-sm text-gray-500">Current Address</p>
               </div>
               
               <div className="bg-white rounded-lg shadow p-3">
                 <p className="text-lg font-medium text-gray-900">-</p>
                 <p className="text-sm text-gray-500">Permanent Address</p>
               </div>
             </div>
          </div>

          {/* Employment Information */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiBriefcase className="mr-2" /> Employment Information
            </h2>
            
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="bg-white rounded-lg shadow p-3">
                 <p className="text-lg font-medium text-gray-900">-</p>
                 <p className="text-sm text-gray-500">Join Date</p>
               </div>
               
               <div className="bg-white rounded-lg shadow p-3">
                 <p className="text-lg font-medium text-gray-900">-</p>
                 <p className="text-sm text-gray-500">Home Town</p>
               </div>
               
               <div className="bg-white rounded-lg shadow p-3">
                 <p className="text-lg font-medium text-gray-900">
                   {currentEmployee.status === 'active' ? 'Yes' : 'No'}
                 </p>
                 <p className="text-sm text-gray-500">Is Active</p>
               </div>
             </div>
          </div>

          {/* Account Information */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiShield className="mr-2" /> Account Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow p-3">
                <p className="text-lg font-medium text-gray-900">{currentUserData.email}</p>
                <p className="text-sm text-gray-500">Login Email</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-3">
                <p className="text-lg font-medium text-gray-900">{getUserCreatedAt()}</p>
                <p className="text-sm text-gray-500">Account Created</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiDollarSign className="mr-2" /> Quick Actions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-medium text-blue-900 mb-2">View My Salaries</h3>
                <p className="text-sm text-blue-700 mb-3">Check your salary history and current payments</p>
                <button
                  onClick={() => router.push('/employee/salaries')}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View Salaries →
                </button>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h3 className="font-medium text-green-900 mb-2">My Attendance</h3>
                <p className="text-sm text-green-700 mb-3">Track your attendance and working hours</p>
                <button
                  onClick={() => router.push('/employee/attendance')}
                  className="text-green-600 hover:text-green-800 text-sm font-medium"
                >
                  View Attendance →
                </button>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <h3 className="font-medium text-purple-900 mb-2">My Documents</h3>
                <p className="text-sm text-purple-700 mb-3">Access your employment documents</p>
                <button
                  onClick={() => router.push('/employee/documents')}
                  className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                >
                  View Documents →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EmployeeLayout>
  );
} 