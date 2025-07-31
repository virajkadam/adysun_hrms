'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiEdit, FiTrash2, FiUser, FiBriefcase, FiCalendar, FiDollarSign, FiMapPin } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Employment, Employee } from '@/types';
import toast, { Toaster } from 'react-hot-toast';
import TableHeader from '@/components/ui/TableHeader';
import { useEmployment, useDeleteEmployment } from '@/hooks/useEmployments';
import { useEmployee } from '@/hooks/useEmployees';
import { formatDateToDayMonYear } from '@/utils/documentUtils';

export default function EmploymentViewPage({ params }: { params: Promise<{ id: string }> }) {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  
  const router = useRouter();
  const { id } = use(params);

  // Use Tanstack Query for employment data
  const {
    data: employment,
    isLoading,
    isError,
    error
  } = useEmployment(id);

  // Use Tanstack Query for employee data
  const {
    data: employee,
    isLoading: employeeLoading,
    isError: employeeError
  } = useEmployee(employment?.employeeId || '');

  // Use mutation for delete operation
  const deleteEmploymentMutation = useDeleteEmployment();

  // Handle error states
  if (isError && error) {
    console.error('Employment data error:', error);
    toast.error('Failed to load employment data');
  }

  if (employeeError) {
    console.error('Employee data error:', employeeError);
    toast.error('Failed to load employee data');
  }

  const handleDeleteClick = () => {
    setDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      toast.loading('Deleting employment...', { id: 'delete-employment' });
      await deleteEmploymentMutation.mutateAsync(id);
      toast.success('Employment deleted successfully', { id: 'delete-employment' });
      router.push('/employments');
    } catch (error: any) {
      toast.error('Failed to delete employment', { id: 'delete-employment' });
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  if (isLoading) {
    return (
      <DashboardLayout
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Employments', href: '/employments' },
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
                <div className="bg-gray-200 h-10 w-32 rounded animate-pulse"></div>
                <div className="bg-gray-200 h-10 w-32 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="p-6">
            <div className="animate-pulse space-y-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="bg-gray-200 h-6 w-32 rounded mb-4"></div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, fieldIndex) => (
                      <div key={fieldIndex} className="bg-white p-4 rounded shadow">
                        <div className="bg-gray-200 h-4 w-20 rounded mb-2"></div>
                        <div className="bg-gray-200 h-6 w-full rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Employments', href: '/employments' },
          { label: 'Error', isCurrent: true }
        ]}
      >
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>Failed to load employment data. Please try refreshing the page.</p>
        </div>
        <div className="mt-4">
          <Link href="/employments" className="text-blue-600 hover:underline flex items-center gap-1">
            <FiArrowLeft size={16} /> Back to Employments
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  if (!employment) {
    return (
      <DashboardLayout
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Employments', href: '/employments' },
          { label: 'Not Found', isCurrent: true }
        ]}
      >
        <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p>Employment not found</p>
        </div>
        <div className="mt-4">
          <Link href="/employments" className="text-blue-600 hover:underline flex items-center gap-1">
            <FiArrowLeft size={16} /> Back to Employments
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      breadcrumbItems={
        employee && employment ? [
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Employees', href: '/employees' },
          { label: employee.name, href: `/employees/${employment.employeeId}` },
          { label: 'Employments', href: `/employments?employeeId=${employment.employeeId}` },
          { label: employment.jobTitle || 'Employment Details', isCurrent: true }
        ] : [
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Employments', href: '/employments' },
          { label: 'Loading...', isCurrent: true }
        ]
      }
    >
      <Toaster position="top-center" />
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <TableHeader
          title="Employment Details"
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
            href: "/employments",
            label: 'Back'
          }}
          actionButtons={
            deleteConfirm ? [
              {
                label: 'Edit',
                icon: <FiEdit />,
                variant: 'primary' as const,
                href: `/employments/${id}/edit`
              },
              {
                label: 'Confirm',
                icon: <FiTrash2 />,
                variant: 'danger' as const,
                onClick: confirmDelete,
                disabled: deleteEmploymentMutation.isPending
              },
              {
                label: 'Cancel',
                icon: <FiArrowLeft />,
                variant: 'secondary' as const,
                onClick: cancelDelete,
                disabled: deleteEmploymentMutation.isPending
              }
            ] : [
              {
                label: 'Edit',
                icon: <FiEdit />,
                variant: 'primary' as const,
                href: `/employments/${id}/edit`
              },
              {
                label: 'Delete',
                icon: <FiTrash2 />,
                variant: 'danger' as const,
                onClick: handleDeleteClick,
                disabled: deleteEmploymentMutation.isPending
              }
            ]
          }
        />

      {employee && (
          <div className="px-6 pb-6">
            <div className="bg-white p-4 rounded-lg mb-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <FiUser className="mr-2" /> Employee Information
            </h2>
            <Link
              href={`/employees/${employee.id}`}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <FiUser size={16} /> View Employee Profile
            </Link>
          </div>
          
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-4">
              {employee.imageUrl ? (
                <img
                  src={employee.imageUrl}
                  alt={employee.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xl font-medium text-gray-600">
                    {employee.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">{employee.name}</h3>
                  <p className="text-sm text-gray-600">{employee.email} • {employee.phone}</p>
                  <p className="text-sm text-gray-600">{employment.jobTitle || employee.position} • {employment.department || employee.department}</p>
                </div>
              </div>
          </div>
        </div>
      )}

        <div className="px-6 pb-6">
      {/* Employment Information Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FiBriefcase className="mr-2" /> Employment Information
        </h2>
        
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">{employment.employmentId || '-'}</p>
            <p className="text-sm text-gray-500">Employment ID</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">
              {employment.joiningDate 
                ? formatDateToDayMonYear(employment.joiningDate)
                : employment.startDate 
                  ? formatDateToDayMonYear(employment.startDate)
                  : '-'}
            </p>
            <p className="text-sm text-gray-500">Joining Date</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">
              {employment.incrementDate 
                ? formatDateToDayMonYear(employment.incrementDate)
                : '-'}
            </p>
            <p className="text-sm text-gray-500">Increment Date</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">
              {employment.ctc 
                ? formatCurrency(employment.ctc)
                : employment.salary
                  ? formatCurrency(employment.salary)
                  : '-'}
            </p>
            <p className="text-sm text-gray-500">CTC</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">{employment.inHandCtc ? formatCurrency(employment.inHandCtc) : '-'}</p>
            <p className="text-sm text-gray-500">In-hand CTC</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">{employment.relievingCtc ? formatCurrency(employment.relievingCtc) : '-'}</p>
            <p className="text-sm text-gray-500">Relieving CTC</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">{employment.isIT === true ? 'Yes' : employment.isIT === false ? 'No' : '-'}</p>
            <p className="text-sm text-gray-500">IT</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">{employment.isResignation ? 'Yes' : 'No'}</p>
            <p className="text-sm text-gray-500">Resignation</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <span
              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                employment.contractType === 'full-time'
                  ? 'bg-green-100 text-green-800'
                  : employment.contractType === 'part-time'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
                  {employment.contractType ? employment.contractType.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ') : '-'}
            </span>
            <p className="text-sm text-gray-500 mt-2">Contract Type</p>
          </div>
        </div>
      </div>

      {/* Salary Information */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FiDollarSign className="mr-2" /> Salary Information
        </h2>
        
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">{employment.salaryId || '-'}</p>
            <p className="text-sm text-gray-500">Salary ID</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">{employment.salary ? formatCurrency(employment.salary) : '-'}</p>
            <p className="text-sm text-gray-500">Salary per annum</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">
              {employment.salaryPerMonth 
                ? formatCurrency(employment.salaryPerMonth) 
                : employment.salary 
                  ? formatCurrency(employment.salary / 12)
                  : '-'}
            </p>
            <p className="text-sm text-gray-500">Salary per month</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">{employment.basic ? formatCurrency(employment.basic) : '-'}</p>
            <p className="text-sm text-gray-500">Basic</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">{employment.da ? formatCurrency(employment.da) : '-'}</p>
            <p className="text-sm text-gray-500">DA (Dearness Allowance)</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">{employment.hra ? formatCurrency(employment.hra) : '-'}</p>
            <p className="text-sm text-gray-500">HRA (House Rent Allowance)</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">{employment.pf ? formatCurrency(employment.pf) : '-'}</p>
            <p className="text-sm text-gray-500">PF (Provident Fund)</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">{employment.medicalAllowance ? formatCurrency(employment.medicalAllowance) : '-'}</p>
            <p className="text-sm text-gray-500">Medical Allowance</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">{employment.transport ? formatCurrency(employment.transport) : '-'}</p>
            <p className="text-sm text-gray-500">Transport</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">{employment.gratuity ? formatCurrency(employment.gratuity) : '-'}</p>
            <p className="text-sm text-gray-500">Gratuity</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">{employment.totalLeaves || '-'} {employment.totalLeaves ? 'days/year' : ''}</p>
            <p className="text-sm text-gray-500">Total Leaves</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">{employment.salaryCreditDate || '-'}</p>
            <p className="text-sm text-gray-500">Salary Credit Date</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">{employment.payableDays || '-'}</p>
            <p className="text-sm text-gray-500">Payable Days</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900 capitalize">{employment.paymentMode || '-'}</p>
            <p className="text-sm text-gray-500">Payment Mode</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">{employment.additionalAllowance ? formatCurrency(employment.additionalAllowance) : '-'}</p>
            <p className="text-sm text-gray-500">Additional Allowance</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">{employment.specialAllowance ? formatCurrency(employment.specialAllowance) : '-'}</p>
            <p className="text-sm text-gray-500">Special Allowance</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900 capitalize">
              {employment.paymentFrequency ? (
                employment.paymentFrequency.includes('-') ?
                  employment.paymentFrequency.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ') :
                  employment.paymentFrequency.charAt(0).toUpperCase() + employment.paymentFrequency.slice(1)
              ) : '-'}
            </p>
            <p className="text-sm text-gray-500">Payment Frequency</p>
          </div>
        </div>
      </div>
      
      {/* Job Details */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FiMapPin className="mr-2" /> Job Details
        </h2>
        
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">{employment.jobTitle || '-'}</p>
            <p className="text-sm text-gray-500">Job Title</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">{employment.department || '-'}</p>
            <p className="text-sm text-gray-500">Department</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">{employment.location || '-'}</p>
            <p className="text-sm text-gray-500">Location</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">{employment.reportingManager || '-'}</p>
            <p className="text-sm text-gray-500">Reporting Manager</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
                <p className="text-lg font-medium text-gray-900 capitalize">
                  {employment.employmentType ? (
                    employment.employmentType.includes('-') ?
                      employment.employmentType.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ') :
                      employment.employmentType.charAt(0).toUpperCase() + employment.employmentType.slice(1)
                  ) : employment.contractType ? (
                    employment.contractType.includes('-') ?
                      employment.contractType.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ') :
                      employment.contractType.charAt(0).toUpperCase() + employment.contractType.slice(1)
                  ) : '-'}
            </p>
            <p className="text-sm text-gray-500">Employment Type</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">{employment.workSchedule || '-'}</p>
            <p className="text-sm text-gray-500">Work Schedule</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">
              {employment.joiningDate 
                ? formatDateToDayMonYear(employment.joiningDate)
                : employment.startDate 
                  ? formatDateToDayMonYear(employment.startDate)
                  : '-'}
            </p>
            <p className="text-sm text-gray-500">Start Date</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">
              {employment.endDate ? formatDateToDayMonYear(employment.endDate) : '-'}
            </p>
            <p className="text-sm text-gray-500">End Date</p>
          </div>
        </div>
        
        {/* Benefits */}
        <div className="mt-6">
          <h3 className="text-md font-medium text-gray-700 mb-4">Benefits</h3>
          <div className="bg-white rounded-lg shadow p-5">
            {employment.benefits?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {employment.benefits.map((benefit, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No benefits listed</p>
            )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 