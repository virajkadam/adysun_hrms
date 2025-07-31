'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiEdit, FiTrash2, FiBriefcase, FiUser, FiBook } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Employee, Employment } from '@/types';
import { formatDateToDayMonYear, formatDateToDayMonYearWithTime } from '@/utils/documentUtils';
import TableHeader from '@/components/ui/TableHeader';
import { useEmployee, useDeleteEmployee } from '@/hooks/useEmployees';
import { useEmploymentsByEmployee } from '@/hooks/useEmployments';
import { getAdminNameById } from '@/utils/firebaseUtils';
import toast, { Toaster } from 'react-hot-toast';

type PageParams = {
  params: {
    id: string;
  };
};

export default function EmployeeViewPage({ params }: PageParams) {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [createdByAdmin, setCreatedByAdmin] = useState<string>('');
  const [updatedByAdmin, setUpdatedByAdmin] = useState<string>('');
  
  const router = useRouter();
  const id = params.id;

  // Use Tanstack Query for employee data
  const {
    data: employee,
    isLoading,
    isError,
    error
  } = useEmployee(id);

  // Use Tanstack Query for employments data
  const {
    data: employments = [],
    isLoading: employmentsLoading,
    isError: employmentsError
  } = useEmploymentsByEmployee(id);

  // Use mutation for delete operation
  const deleteEmployeeMutation = useDeleteEmployee();

  // Handle error states
  if (isError && error) {
    console.error('Employee data error:', error);
    toast.error('Failed to load employee data');
  }

  if (employmentsError) {
    console.error('Employments data error:', employmentsError);
    toast.error('Failed to load employment data');
  }

  const handleDeleteClick = () => {
    setDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      toast.loading('Deleting employee...', { id: 'delete-employee' });
      await deleteEmployeeMutation.mutateAsync(id);
      toast.success('Employee deleted successfully', { id: 'delete-employee' });
      router.push('/employees');
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete employee';
      toast.error(errorMessage, { id: 'delete-employee' });
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(false);
  };

  // Fetch admin names for audit trail
  useEffect(() => {
    const fetchAdminNames = async () => {
      if (employee) {
        try {
          // Fetch created by admin name
          if (employee.createdBy) {
            const createdByAdminName = await getAdminNameById(employee.createdBy);
            setCreatedByAdmin(createdByAdminName);
          }
          
          // Fetch updated by admin name
          if (employee.updatedBy) {
            const updatedByAdminName = await getAdminNameById(employee.updatedBy);
            setUpdatedByAdmin(updatedByAdminName);
          }
        } catch (error) {
          console.error('Error fetching admin names:', error);
        }
      }
    };

    fetchAdminNames();
  }, [employee]);

  if (isLoading) {
    return (
      <DashboardLayout
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Employees', href: '/employees' },
          { label: 'Loading...', isCurrent: true }
        ]}
      >
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Skeleton for TableHeader */}
          <div className="space-y-6">
            {/* Title and Action Buttons Skeleton */}
            <div className="flex justify-between items-center px-6 py-6">
              <div className="flex items-center">
                <div className="bg-gray-200 h-10 w-20 rounded-full animate-pulse"></div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-gray-200 h-8 w-32 rounded animate-pulse"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-gray-200 h-10 w-24 rounded animate-pulse"></div>
                <div className="bg-gray-200 h-10 w-24 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="px-6 pb-6">
            <div className="animate-pulse space-y-6">
              {/* Personal Details Skeleton */}
              <div>
                <div className="bg-gray-200 h-6 w-32 rounded mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[...Array(8)].map((_, index) => (
                    <div key={index} className="bg-gray-200 h-20 rounded"></div>
                  ))}
                </div>
              </div>
              
              {/* Educational Details Skeleton */}
              <div>
                <div className="bg-gray-200 h-6 w-40 rounded mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="bg-gray-200 h-20 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>Failed to load employee data. Please try refreshing the page.</p>
        </div>
        <div className="mt-4">
          <Link href="/employees" className="text-blue-600 hover:underline flex items-center gap-1">
            <FiArrowLeft size={16} /> Back to Employees
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  if (!employee) {
    return (
      <DashboardLayout>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p>Employee not found</p>
        </div>
        <div className="mt-4">
          <Link href="/employees" className="text-blue-600 hover:underline flex items-center gap-1">
            <FiArrowLeft size={16} /> Back to Employees
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      breadcrumbItems={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Employees', href: '/employees' },
        { label: employee.name, isCurrent: true }
      ]}
    >
      <Toaster position="top-center" />
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <TableHeader
          title="Employee Details"
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
          backButton={{
            href: '/employees',
            label: 'Back'
          }}
          actionButtons={
            deleteConfirm ? [
              { label: 'Edit', icon: <FiEdit />, variant: 'primary' as const, href: `/employees/${id}/edit` },
              { 
                label: 'Confirm', 
                icon: <FiTrash2 />, 
                variant: 'danger' as const, 
                onClick: confirmDelete,
                disabled: deleteEmployeeMutation.isPending
              },
              { 
                label: 'Cancel', 
                icon: <FiArrowLeft />, 
                variant: 'secondary' as const, 
                onClick: cancelDelete,
                disabled: deleteEmployeeMutation.isPending
              }
            ] : [
              { 
                label: 'View Employments', 
                icon: <FiBriefcase />, 
                variant: 'success' as const, 
                href: `/employments?employeeId=${id}` 
              },
              { label: 'Edit', icon: <FiEdit />, variant: 'primary' as const, href: `/employees/${id}/edit` },
              { 
                label: 'Delete', 
                icon: <FiTrash2 />, 
                variant: 'danger' as const, 
                onClick: handleDeleteClick,
                disabled: deleteEmployeeMutation.isPending
              }
            ]
          }
        />

        <div className="px-6 pb-6">
          {/* Personal Details Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiUser className="mr-2" /> Personal Details
            </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Basic Information Card */}
          <div className="bg-white rounded-lg shadow p-3">
            <p className="text-lg font-medium text-gray-900">{employee.name || '-'}</p>
            <p className="text-sm text-gray-500">Full Name</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-3">
            <p className="text-lg font-medium text-gray-900">{employee.employeeId || '-'}</p>
            <p className="text-sm text-gray-500">Employee ID</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-3">
            <p className="text-lg font-medium text-gray-900">
              {employee.dateOfBirth ? formatDateToDayMonYear(employee.dateOfBirth) : '-'}
            </p>
            <p className="text-sm text-gray-500">Date of Birth</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-3">
            <p className="text-lg font-medium text-gray-900">
              {employee.joinDate ? formatDateToDayMonYear(employee.joinDate) : '-'}
            </p>
            <p className="text-sm text-gray-500">Join Date</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-3">
            <span
              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                employee.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {employee.status}
            </span>
            <p className="text-sm text-gray-500 mt-2">Status</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-3">
            <p className="text-lg font-medium text-gray-900">{employee.isActive ? 'Yes' : 'No'}</p>
            <p className="text-sm text-gray-500">Is Active</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-3">
            <p className="text-lg font-medium text-gray-900">{employee.homeTown || '-'}</p>
            <p className="text-sm text-gray-500">Home Town</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-3">
            <p className="text-lg font-medium text-gray-900">{employee.email || '-'}</p>
            <p className="text-sm text-gray-500">Email</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-3">
            <p className="text-lg font-medium text-gray-900">{employee.phone || '-'}</p>
            <p className="text-sm text-gray-500">Phone</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-3">
            <p className="text-lg font-medium text-gray-900">{employee.position || '-'}</p>
            <p className="text-sm text-gray-500">Position</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-3">
            <p className="text-lg font-medium text-gray-900">{employee.department || '-'}</p>
            <p className="text-sm text-gray-500">Department</p>
          </div>
        </div>
        
        {/* Addresses Section */}
        <h3 className="text-md font-medium text-gray-700 mt-6 mb-4">Address Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-3 md:col-span-2">
            <p className="text-lg font-medium text-gray-900 whitespace-pre-wrap">{employee.currentAddress || '-'}</p>
            <p className="text-sm text-gray-500">Current Address</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-3 md:col-span-2">
            <p className="text-lg font-medium text-gray-900 whitespace-pre-wrap">{employee.permanentAddress || '-'}</p>
            <p className="text-sm text-gray-500">Permanent Address</p>
          </div>
        </div>
        
        {/* Identification Documents */}
        <h3 className="text-md font-medium text-gray-700 mt-6 mb-4">Identification Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-3">
            <p className="text-lg font-medium text-gray-900">{employee.aadharCard || '-'}</p>
            <p className="text-sm text-gray-500">Aadhar Card</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-3">
            <p className="text-lg font-medium text-gray-900">{employee.panCard || '-'}</p>
            <p className="text-sm text-gray-500">PAN Card</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-3">
            <p className="text-lg font-medium text-gray-900">{employee.drivingLicense || '-'}</p>
            <p className="text-sm text-gray-500">Driving License</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-3">
            <p className="text-lg font-medium text-gray-900">{employee.voterID || '-'}</p>
            <p className="text-sm text-gray-500">Voter ID</p>
          </div>
        </div>
        
        {/* Bank Details */}
        <h3 className="text-md font-medium text-gray-700 mt-6 mb-4">Bank Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-3">
            <p className="text-lg font-medium text-gray-900">{employee.bankName || '-'}</p>
            <p className="text-sm text-gray-500">Bank Name</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-3">
            <p className="text-lg font-medium text-gray-900">{employee.accountNo || '-'}</p>
            <p className="text-sm text-gray-500">Account Number</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-3">
            <p className="text-lg font-medium text-gray-900">{employee.ifscCode || '-'}</p>
            <p className="text-sm text-gray-500">IFSC Code</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-3">
            <p className="text-lg font-medium text-gray-900">{employee.accountHolderName || '-'}</p>
            <p className="text-sm text-gray-500">Account Holder Name</p>
          </div>
        </div>
      </div>
      
      {/* Educational Details Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FiBook className="mr-2" /> Educational Details
        </h2>
        
        {/* Higher Education */}
        <h3 className="text-md font-medium text-gray-700 mb-4">Higher Education</h3>
        {employee.graduation ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-3">
              <p className="text-lg font-medium text-gray-900">{employee.graduation.degree || '-'}</p>
              <p className="text-sm text-gray-500">Degree</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-3">
              <p className="text-lg font-medium text-gray-900">{employee.graduation.branch || '-'}</p>
              <p className="text-sm text-gray-500">Branch</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-3">
              <p className="text-lg font-medium text-gray-900">
                {employee.graduation.month ? `${employee.graduation.month} ` : ''}
                {employee.graduation.passingYear || '-'}
              </p>
              <p className="text-sm text-gray-500">Passing Year</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-3">
              <p className="text-lg font-medium text-gray-900">{employee.graduation.collegeName || '-'}</p>
              <p className="text-sm text-gray-500">College Name</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-3">
              <p className="text-lg font-medium text-gray-900">{employee.graduation.universityName || '-'}</p>
              <p className="text-sm text-gray-500">University Name</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-3">
              <p className="text-lg font-medium text-gray-900">{employee.graduation.marks || '-'}</p>
              <p className="text-sm text-gray-500">Marks</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-3">
              <p className="text-lg font-medium text-gray-900">{employee.graduation.grade || '-'}</p>
              <p className="text-sm text-gray-500">Grade</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-3 mb-4">
            <p className="text-gray-500 italic">No higher education details available</p>
          </div>
        )}
        
        {/* 12th Standard */}
        <h3 className="text-md font-medium text-gray-700 mt-6 mb-4">12th Standard</h3>
        {employee.twelthStandard ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-3">
              <p className="text-lg font-medium text-gray-900">{employee.twelthStandard.school || '-'}</p>
              <p className="text-sm text-gray-500">School</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-3">
              <p className="text-lg font-medium text-gray-900">{employee.twelthStandard.branch || '-'}</p>
              <p className="text-sm text-gray-500">Branch</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-3">
              <p className="text-lg font-medium text-gray-900">
                {employee.twelthStandard.month ? `${employee.twelthStandard.month} ` : ''}
                {employee.twelthStandard.passingYear || '-'}
              </p>
              <p className="text-sm text-gray-500">Passing Year</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-3">
              <p className="text-lg font-medium text-gray-900">{employee.twelthStandard.schoolName || '-'}</p>
              <p className="text-sm text-gray-500">School Name</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-3">
              <p className="text-lg font-medium text-gray-900">{employee.twelthStandard.board || '-'}</p>
              <p className="text-sm text-gray-500">Board</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-3">
              <p className="text-lg font-medium text-gray-900">{employee.twelthStandard.marks || '-'}</p>
              <p className="text-sm text-gray-500">Marks</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-3">
              <p className="text-lg font-medium text-gray-900">{employee.twelthStandard.grade || '-'}</p>
              <p className="text-sm text-gray-500">Grade</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-3 mb-4">
            <p className="text-gray-500 italic">No 12th standard details available</p>
          </div>
        )}
        
        {/* Other Education */}
        <h3 className="text-md font-medium text-gray-700 mt-6 mb-4">Other Education</h3>
        {employee.otherEducation ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-3">
              <p className="text-lg font-medium text-gray-900">{employee.otherEducation.diploma || '-'}</p>
              <p className="text-sm text-gray-500">Diploma</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-3">
              <p className="text-lg font-medium text-gray-900">{employee.otherEducation.branch || '-'}</p>
              <p className="text-sm text-gray-500">Branch</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-3">
              <p className="text-lg font-medium text-gray-900">
                {employee.otherEducation.month ? `${employee.otherEducation.month} ` : ''}
                {employee.otherEducation.passingYear || '-'}
              </p>
              <p className="text-sm text-gray-500">Passing Year</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-3">
              <p className="text-lg font-medium text-gray-900">{employee.otherEducation.collegeName || '-'}</p>
              <p className="text-sm text-gray-500">College Name</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-3">
              <p className="text-lg font-medium text-gray-900">{employee.otherEducation.institute || '-'}</p>
              <p className="text-sm text-gray-500">Institute</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-3">
              <p className="text-lg font-medium text-gray-900">{employee.otherEducation.marks || '-'}</p>
              <p className="text-sm text-gray-500">Marks</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-3">
              <p className="text-lg font-medium text-gray-900">{employee.otherEducation.grade || '-'}</p>
              <p className="text-sm text-gray-500">Grade</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-3 mb-4">
            <p className="text-gray-500 italic">No other education details available</p>
          </div>
        )}
        
        {/* 10th Standard */}
        <h3 className="text-md font-medium text-gray-700 mt-6 mb-4">10th Standard</h3>
        {employee.tenthStandard ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-3">
              <p className="text-lg font-medium text-gray-900">{employee.tenthStandard.school || '-'}</p>
              <p className="text-sm text-gray-500">School</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-3">
              <p className="text-lg font-medium text-gray-900">
                {employee.tenthStandard.month ? `${employee.tenthStandard.month} ` : ''}
                {employee.tenthStandard.passingYear || '-'}
              </p>
              <p className="text-sm text-gray-500">Passing Year</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-3">
              <p className="text-lg font-medium text-gray-900">{employee.tenthStandard.schoolName || '-'}</p>
              <p className="text-sm text-gray-500">School Name</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-3">
              <p className="text-lg font-medium text-gray-900">{employee.tenthStandard.board || '-'}</p>
              <p className="text-sm text-gray-500">Board</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-3">
              <p className="text-lg font-medium text-gray-900">{employee.tenthStandard.marks || '-'}</p>
              <p className="text-sm text-gray-500">Marks</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-3">
              <p className="text-lg font-medium text-gray-900">{employee.tenthStandard.grade || '-'}</p>
              <p className="text-sm text-gray-500">Grade</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-3">
              <p className="text-lg font-medium text-gray-900">{employee.tenthStandard.medium || '-'}</p>
              <p className="text-sm text-gray-500">Medium</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-3 mb-4">
            <p className="text-gray-500 italic">No 10th standard details available</p>
          </div>
        )}
      </div>

   

      {/* Audit Trail Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FiBook className="mr-2" /> Audit Trail
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Created By */}
          <div className="p-3">
            <p className="text-lg font-medium text-gray-900">
              {createdByAdmin || employee.createdBy || 'System'}
            </p>
            <p className="text-sm text-gray-500">Created By</p>
          </div>
          
          {/* Created At */}
          <div className="p-3">
            <p className="text-lg font-medium text-gray-900">
              {employee.createdAt ? formatDateToDayMonYearWithTime(employee.createdAt) : '-'}
            </p>
            <p className="text-sm text-gray-500">Created At</p>
          </div>
          
          {/* Updated By */}
          <div className="p-3">
            <p className="text-lg font-medium text-gray-900">
              {updatedByAdmin || employee.updatedBy || 'Not Updated'}
            </p>
            <p className="text-sm text-gray-500">Updated By</p>
          </div>
          
          {/* Updated At */}
          <div className="p-3">
            <p className="text-lg font-medium text-gray-900">
              {employee.updatedAt ? formatDateToDayMonYearWithTime(employee.updatedAt) : '-'}
            </p>
            <p className="text-sm text-gray-500">Updated At</p>
          </div>
        </div>
      </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 