'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser, FiMail, FiPhone, FiCalendar, FiShield, FiLogOut, FiEdit, FiKey, FiMapPin, FiBriefcase, FiDollarSign, FiX, FiSave } from 'react-icons/fi';
import EmployeeLayout from '@/components/layout/EmployeeLayout';
import { useAuth } from '@/context/AuthContext';
import { formatDateToDayMonYear } from '@/utils/documentUtils';
import toast, { Toaster } from 'react-hot-toast';
import TableHeader from '@/components/ui/TableHeader';
import { updateUserProfile, validateProfileData } from '@/utils/profileUtils';
import { updateEmployee, getEmployeeSelf } from '@/utils/firebaseUtils';

export default function EmployeeProfilePage() {
  const { currentUserData, currentEmployee, logout } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [employeeData, setEmployeeData] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentAddress: '',
    permanentAddress: '',
    dateOfBirth: '',
    homeTown: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Redirect if not authenticated or not an employee
  useEffect(() => {
    if (!currentUserData || currentUserData.userType !== 'employee') {
      router.push('/login');
    }
  }, [currentUserData, router]);

  // Initialize employee data
  useEffect(() => {
    if (currentEmployee) {
      setEmployeeData(currentEmployee);
    }
  }, [currentEmployee]);

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

  // Initialize form data when opening edit modal
  useEffect(() => {
    if (isEditModalOpen) {
      const employee = employeeData || currentEmployee;
      if (employee) {
        const emp = employee as any;
        setFormData({
          name: employee.name || '',
          email: employee.email || '',
          phone: employee.phone || '',
          currentAddress: emp.currentAddress || '',
          permanentAddress: emp.permanentAddress || '',
          dateOfBirth: emp.dateOfBirth || '',
          homeTown: emp.homeTown || ''
        });
        setErrors({});
      }
    }
  }, [isEditModalOpen, employeeData, currentEmployee]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUserData || !currentEmployee) return;

    // Validate basic profile data
    const validation = validateProfileData({
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare update data
      const updateData: any = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim()
      };

      // Add additional fields if provided
      if (formData.currentAddress) updateData.currentAddress = formData.currentAddress.trim();
      if (formData.permanentAddress) updateData.permanentAddress = formData.permanentAddress.trim();
      if (formData.dateOfBirth) updateData.dateOfBirth = formData.dateOfBirth;
      if (formData.homeTown) updateData.homeTown = formData.homeTown.trim();

      // Update basic profile (name, email, phone) using updateUserProfile
      await updateUserProfile(currentUserData.id, {
        name: updateData.name,
        email: updateData.email,
        phone: updateData.phone
      }, 'employee');

      // Update additional fields using updateEmployee
      const additionalData: any = {};
      if (updateData.currentAddress !== undefined) additionalData.currentAddress = updateData.currentAddress;
      if (updateData.permanentAddress !== undefined) additionalData.permanentAddress = updateData.permanentAddress;
      if (updateData.dateOfBirth) additionalData.dateOfBirth = updateData.dateOfBirth;
      if (updateData.homeTown) additionalData.homeTown = updateData.homeTown;

      if (Object.keys(additionalData).length > 0) {
        await updateEmployee(currentUserData.id, additionalData);
      }

      // Fetch updated employee data from Firebase
      const updatedEmployeeData = await getEmployeeSelf(currentUserData.id);

      // Update localStorage with fresh data from Firebase
      const storedData = localStorage.getItem('employeeData');
      if (storedData) {
        const userData = JSON.parse(storedData);
        const mergedData = {
          ...userData,
          ...updatedEmployeeData,
          name: updateData.name,
          email: updateData.email,
          phone: updateData.phone
        };
        localStorage.setItem('employeeData', JSON.stringify(mergedData));
      }

      // Update fullEmployeeData in localStorage if it exists
      localStorage.setItem('fullEmployeeData', JSON.stringify(updatedEmployeeData));

      // Update local state with fresh data
      setEmployeeData(updatedEmployeeData);

      // Dispatch custom event to notify Header and other components of profile update
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('profileUpdated'));
      }

      toast.success('Profile updated successfully!');
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
    setErrors({});
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

  // Use employeeData if available, otherwise fall back to currentEmployee
  const displayEmployee = employeeData || currentEmployee;

  const getUserStatus = () => {
    return displayEmployee?.status === 'active' ? 'Active' : 'Inactive';
  };

  const isUserActive = () => {
    return displayEmployee?.status === 'active';
  };

  const getUserCreatedAt = () => {
    const createdAt = displayEmployee?.createdAt;
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
          actionButtons={[
            {
              label: 'Edit Profile',
              icon: <FiEdit />,
              variant: 'primary' as const,
              onClick: () => setIsEditModalOpen(true)
            },
            // {
            //   label: 'Change Password',
            //   icon: <FiKey />,
            //   variant: 'secondary' as const,
            //   href: '/employee/profile/password'
            // },
            // {
            //   label: 'Logout',
            //   icon: <FiLogOut />,
            //   variant: 'danger' as const,
            //   onClick: handleLogout,
            //   disabled: isLoggingOut
            // }
          ]}
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
                <p className="text-lg font-medium text-gray-900">{displayEmployee?.name || '-'}</p>
                <p className="text-sm text-gray-500">Full Name</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-3">
                <p className="text-lg font-medium text-gray-900">
                  {(() => {
                    // Try multiple sources to get the employeeId
                    let employeeId = (displayEmployee as any)?.employeeId;
                    
                    // If not found, try localStorage
                    if (!employeeId) {
                      try {
                        const fullEmployeeData = localStorage.getItem('fullEmployeeData');
                        if (fullEmployeeData) {
                          const parsedData = JSON.parse(fullEmployeeData);
                          if (parsedData.employeeId) {
                            employeeId = parsedData.employeeId;
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
                 <p className="text-lg font-medium text-gray-900">{displayEmployee?.email || '-'}</p>
                 <p className="text-sm text-gray-500">Email</p>
               </div>
               
               <div className="bg-white rounded-lg shadow p-3">
                 <p className="text-lg font-medium text-gray-900">{displayEmployee?.phone || '-'}</p>
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
                 <p className="text-lg font-medium text-gray-900">{(displayEmployee as any)?.dateOfBirth || '-'}</p>
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
                 <p className="text-lg font-medium text-gray-900">{(displayEmployee as any)?.currentAddress || '-'}</p>
                 <p className="text-sm text-gray-500">Current Address</p>
               </div>
               
               <div className="bg-white rounded-lg shadow p-3">
                 <p className="text-lg font-medium text-gray-900">{(displayEmployee as any)?.permanentAddress || '-'}</p>
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
                 <p className="text-lg font-medium text-gray-900">{(displayEmployee as any)?.homeTown || '-'}</p>
                 <p className="text-sm text-gray-500">Home Town</p>
               </div>
               
               <div className="bg-white rounded-lg shadow p-3">
                 <p className="text-lg font-medium text-gray-900">
                   {displayEmployee?.status === 'active' ? 'Yes' : 'No'}
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

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Edit Profile</h2>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FiUser className="mr-2" /> Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Home Town
                    </label>
                    <input
                      type="text"
                      name="homeTown"
                      value={formData.homeTown}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FiMapPin className="mr-2" /> Contact Information
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Address
                    </label>
                    <textarea
                      name="currentAddress"
                      value={formData.currentAddress}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Permanent Address
                    </label>
                    <textarea
                      name="permanentAddress"
                      value={formData.permanentAddress}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  <FiSave className="w-4 h-4" />
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </EmployeeLayout>
  );
} 