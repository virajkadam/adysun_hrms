'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiEdit, FiTrash2, FiUser, FiBriefcase, FiCalendar, FiDollarSign, FiMapPin } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getEmployment, deleteEmployment, getEmployee } from '@/utils/firebaseUtils';
import { Employment, Employee } from '@/types';
import toast, { Toaster } from 'react-hot-toast';

export default function EmploymentViewPage({ params }: { params: { id: string } }) {
  const [employment, setEmployment] = useState<Employment | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  
  const router = useRouter();
  const id = params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const employmentData = await getEmployment(id);
        setEmployment(employmentData);
        
        // Fetch related employee
        const employeeData = await getEmployee(employmentData.employeeId);
        setEmployee(employeeData);
      } catch (error: any) {
        setError(error.message || 'Failed to fetch employment data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDeleteClick = () => {
    setDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      toast.loading('Deleting employment...', { id: 'delete-employment' });
      await deleteEmployment(id);
      toast.success('Employment deleted successfully', { id: 'delete-employment' });
      router.push('/employments');
    } catch (error: any) {
      setError(error.message || 'Failed to delete employment');
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

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-200 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
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
      <DashboardLayout>
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
    <DashboardLayout>
      <Toaster position="top-center" />
      
      {/* Header with Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Link href="/employments" className="text-blue-600 hover:underline flex items-center gap-1 text-sm mb-1">
              <FiArrowLeft size={14} /> Back to Employments
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">
              Employment Details
              <span className="ml-2 text-sm font-normal text-gray-500">
                #{employment.employmentId || id.substring(0, 8)}
              </span>
            </h1>
            {employee && (
              <div className="flex items-center text-gray-600 mt-1">
                <span className="inline-flex items-center mr-3">
                  <FiUser className="mr-1" size={14} />
                  {employee.name}
                </span>
                {employment.jobTitle && (
                  <span className="inline-flex items-center mr-3">
                    <FiBriefcase className="mr-1" size={14} />
                    {employment.jobTitle}
                  </span>
                )}
                {employment.department && (
                  <span className="inline-flex items-center">
                    {employment.department}
                  </span>
                )}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Link
              href={`/employments/${id}/edit`}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
              title="Edit Employment"
            >
              <FiEdit size={16} /> Edit
            </Link>
            
            {!deleteConfirm ? (
              <button
                onClick={handleDeleteClick}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
                title="Delete Employment"
              >
                <FiTrash2 size={16} /> Delete
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  title="Confirm Delete"
                >
                  Confirm
                </button>
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  title="Cancel Delete"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Employee Info */}
      {employee && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold flex items-center">
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
                  <span className="text-xl font-medium text-gray-500">
                    {employee.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">{employee.name}</h3>
              <p className="text-sm text-gray-500">{employee.email} • {employee.phone}</p>
              <p className="text-sm text-gray-500">{employment.jobTitle || employee.position} • {employment.department || employee.department}</p>
            </div>
          </div>
        </div>
      )}

      {/* Employment Information Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FiBriefcase className="mr-2" /> Employment Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">{employment.employmentId || '-'}</p>
            <p className="text-sm text-gray-500">Employment ID</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">
              {employment.joiningDate 
                ? new Date(employment.joiningDate).toLocaleDateString() 
                : employment.startDate 
                  ? new Date(employment.startDate).toLocaleDateString()
                  : '-'}
            </p>
            <p className="text-sm text-gray-500">Joining Date</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">
              {employment.incrementDate 
                ? new Date(employment.incrementDate).toLocaleDateString()
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
              {employment.contractType.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                        <p className="text-lg font-medium text-gray-900 capitalize">              {employment.employmentType ? (                employment.employmentType.includes('-') ?                  employment.employmentType.split('-').map(word =>                     word.charAt(0).toUpperCase() + word.slice(1)                  ).join(' ') :                  employment.employmentType.charAt(0).toUpperCase() + employment.employmentType.slice(1)              ) : employment.contractType ? (                employment.contractType.includes('-') ?                  employment.contractType.split('-').map(word =>                     word.charAt(0).toUpperCase() + word.slice(1)                  ).join(' ') :                  employment.contractType.charAt(0).toUpperCase() + employment.contractType.slice(1)              ) : '-'}
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
                ? new Date(employment.joiningDate).toLocaleDateString()
                : employment.startDate 
                  ? new Date(employment.startDate).toLocaleDateString()
                  : '-'}
            </p>
            <p className="text-sm text-gray-500">Start Date</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-lg font-medium text-gray-900">
              {employment.endDate ? new Date(employment.endDate).toLocaleDateString() : '-'}
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
    </DashboardLayout>
  );
} 