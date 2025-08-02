'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser, FiMail, FiPhone, FiCalendar, FiShield, FiLogOut, FiEdit, FiKey } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { formatDateToDayMonYear } from '@/utils/documentUtils';
import toast, { Toaster } from 'react-hot-toast';
import TableHeader from '@/components/ui/TableHeader';

export default function ProfilePage() {
  const { currentUserData, currentAdmin, currentEmployee, logout } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!currentUserData) {
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
  if (!currentUserData) {
    return (
      <DashboardLayout>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const isAdmin = currentUserData.userType === 'admin';
  const user = isAdmin ? currentAdmin : currentEmployee;

  // Helper functions to safely access user properties
  const getUserStatus = () => {
    if (isAdmin && currentAdmin) {
      return currentAdmin.active ? 'Active' : 'Inactive';
    } else if (!isAdmin && currentEmployee) {
      return currentEmployee.status === 'active' ? 'Active' : 'Inactive';
    }
    return 'Unknown';
  };

  const isUserActive = () => {
    if (isAdmin && currentAdmin) {
      return currentAdmin.active;
    } else if (!isAdmin && currentEmployee) {
      return currentEmployee.status === 'active';
    }
    return false;
  };

  const getUserPhone = () => {
    if (isAdmin && currentAdmin) {
      return currentAdmin.mobile;
    } else if (!isAdmin && currentEmployee) {
      return currentEmployee.phone;
    }
    return 'Not provided';
  };

  const getUserCreatedAt = () => {
    const createdAt = isAdmin ? currentAdmin?.createdAt : currentEmployee?.createdAt;
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
    <DashboardLayout
      breadcrumbItems={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Profile', isCurrent: true }
      ]}
    >
      <Toaster position="top-center" />

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <TableHeader
          title="My Profile"
          total={1}
          active={1}
          inactive={0}
          searchValue=""
          onSearchChange={() => {}}
          showSearch={false}
          showStats={false}
          showFilter={false}
          backButton={{ href: '/dashboard', label: 'Back' }}
          actionButtons={[
            {
              label: 'Edit Profile',
              icon: <FiEdit />,
              variant: 'primary' as const,
              href: '/profile/edit'
            },
            {
              label: 'Change Password',
              icon: <FiKey />,
              variant: 'warning' as const,
              href: '/profile/change-password'
            },
            {
              label: isLoggingOut ? 'Logging Out...' : 'Logout',
              icon: <FiLogOut />,
              variant: 'danger' as const,
              onClick: handleLogout,
              disabled: isLoggingOut
            }
          ]}
          headerClassName="px-6 pt-6 pb-6"
        />

        <div className="px-6 pb-6">
          {/* Profile Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <FiUser className="w-10 h-10 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
                <p className="text-gray-600">
                  {isAdmin ? 'Administrator' : 'Employee'}
                </p>
                <div className="flex items-center mt-2">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      isUserActive()
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {getUserStatus()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FiUser className="mr-2" /> Personal Information
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FiUser className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="text-gray-900 font-medium">{user?.name}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <FiMail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="text-gray-900 font-medium">{user?.email || 'Not provided'}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <FiPhone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="text-gray-900 font-medium">{getUserPhone()}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <FiCalendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Account Created</p>
                    <p className="text-gray-900 font-medium">
                      {getUserCreatedAt()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FiShield className="mr-2" /> Account Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">User Type</p>
                  <p className="text-gray-900 font-medium capitalize">
                    {isAdmin ? 'Administrator' : 'Employee'}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">User ID</p>
                  <p className="text-gray-900 font-medium font-mono text-sm">{user?.id}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Account Status</p>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      isUserActive()
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {getUserStatus()}
                  </span>
                </div>

                {isAdmin && (
                  <div>
                    <p className="text-sm text-gray-500">Admin Permissions</p>
                    <p className="text-gray-900 font-medium">
                      {currentAdmin?.isAdmin ? 'Full Access' : 'Limited Access'}
                    </p>
                  </div>
                )}

                {!isAdmin && (
                  <div>
                    <p className="text-sm text-gray-500">Employee Status</p>
                    <p className="text-gray-900 font-medium capitalize">
                      {currentEmployee?.status || 'Unknown'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Session Information */}
          <div className="mt-6 bg-blue-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Session Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Login Time</p>
                <p className="text-gray-900 font-medium">
                  {new Date().toLocaleString()}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Session Duration</p>
                <p className="text-gray-900 font-medium">
                  Active
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Last Activity</p>
                <p className="text-gray-900 font-medium">
                  Just now
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => router.push('/profile/edit')}
                className="p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FiEdit className="w-6 h-6 text-blue-600 mb-2" />
                <p className="font-medium text-gray-900">Edit Profile</p>
                <p className="text-sm text-gray-500">Update your information</p>
              </button>

              <button
                onClick={() => router.push('/profile/change-password')}
                className="p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FiKey className="w-6 h-6 text-amber-600 mb-2" />
                <p className="font-medium text-gray-900">Change Password</p>
                <p className="text-sm text-gray-500">Update your password</p>
              </button>

              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <FiLogOut className="w-6 h-6 text-red-600 mb-2" />
                <p className="font-medium text-gray-900">
                  {isLoggingOut ? 'Logging Out...' : 'Logout'}
                </p>
                <p className="text-sm text-gray-500">Sign out of your account</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 