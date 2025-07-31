'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiEdit, FiTrash2, FiDollarSign } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Salary } from '@/types';
import { formatDateToDayMonYearWithTime } from '@/utils/documentUtils';
import TableHeader from '@/components/ui/TableHeader';
import { useSalary, useDeleteSalary } from '@/hooks/useSalaries';
import { getEmployeeNameById } from '@/utils/firebaseUtils';
import toast, { Toaster } from 'react-hot-toast';

type PageParams = {
  params: {
    id: string;
  };
};

export default function SalaryViewPage({ params }: PageParams) {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [employeeName, setEmployeeName] = useState<string>('');
  
  const router = useRouter();
  const id = params.id;

  // Use Tanstack Query for salary data
  const { data: apiSalary, isLoading, isError } = useSalary(id);

  // Dummy salary data for demonstration
  const dummySalary = {
    id: '1',
    employeeId: 'EMP001',
    employmentId: 'EMP001',
    basicSalary: 50000,
    totalSalary: 75000,
    netSalary: 65000,
    month: 12,
    year: 2024,
    status: 'paid' as const,
    da: 15000,
    hra: 8000,
    medicalAllowance: 2000,
    transportAllowance: 1000,
    pf: 5000,
    gratuity: 2000,
    healthInsurance: 1500,
    employerPF: 5000,
    statutoryBonus: 3000,
    specialAllowance: 5000,
    educationAllowance: 1000,
    lta: 2000,
    additionalAllowance: 1000,
    monthlyReimbursement: 500,
    totalWorkingDays: 22,
    paidDays: 22,
    lossOfPay: 0,
    paymentFrequency: 'monthly' as const,
    paymentMode: 'Bank Transfer',
    salaryCreditDate: '2024-12-01',
    documentUrl: '',
    issueDate: '2024-12-01',
    paidDate: '2024-12-01',
    createdAt: '2024-12-01T00:00:00Z',
    createdBy: 'admin1',
    updatedAt: '2024-12-01T00:00:00Z',
    updatedBy: 'admin1'
  };

  // Use dummy data for now, fallback to API data when available
  const salary = dummySalary;

  const deleteSalaryMutation = useDeleteSalary();

  useEffect(() => {
    const fetchEmployeeName = async () => {
      if (salary?.employeeId) {
        try {
          const name = await getEmployeeNameById(salary.employeeId);
          setEmployeeName(name);
        } catch (error) {
          console.error('Error fetching employee name:', error);
          setEmployeeName('Unknown Employee');
        }
      }
    };

    fetchEmployeeName();
  }, [salary]);

  const handleDeleteClick = () => setDeleteConfirm(true);
  
  const confirmDelete = async () => {
    try {
      toast.loading('Deleting salary...', { id: 'delete-salary' });
      await deleteSalaryMutation.mutateAsync(id);
      toast.success('Salary deleted successfully', { id: 'delete-salary' });
      // Navigate back to employee's salary list if we came from there
      router.push(salary?.employeeId ? `/salaries?employeeId=${salary.employeeId}` : '/salaries');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete salary', { id: 'delete-salary' });
    }
  };

  const cancelDelete = () => setDeleteConfirm(false);

  const getMonthName = (month: number) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month - 1] || 'Unknown';
  };

  if (isLoading) {
    return (
      <DashboardLayout breadcrumbItems={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Salaries', href: '/salaries' },
        { label: 'Loading...', isCurrent: true }
      ]}>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (isError || !salary) {
    return (
      <DashboardLayout>
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4">
          <p>Failed to load salary data.</p>
        </div>
        <div className="mt-4">
          <Link href="/salaries" className="text-blue-600 hover:underline flex items-center gap-1">
            <FiArrowLeft size={16} /> Back to Salaries
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout breadcrumbItems={[
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Salaries', href: '/salaries' },
      ...(salary?.employeeId ? [{ label: employeeName, href: `/salaries?employeeId=${salary.employeeId}` }] : []),
      { label: `${getMonthName(salary.month)} ${salary.year}`, isCurrent: true }
    ]}>
      <Toaster position="top-center" />
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <TableHeader
          title={`${employeeName}'s Salary Details - ${getMonthName(salary.month)} ${salary.year}`}
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
            href: salary?.employeeId ? `/salaries?employeeId=${salary.employeeId}` : '/salaries', 
            label: 'Back' 
          }}
          actionButtons={
            deleteConfirm ? [
              { 
                label: 'Edit', 
                icon: <FiEdit />, 
                variant: 'primary' as const, 
                href: `/salaries/${id}/edit?employeeId=${salary.employeeId}` 
              },
              { label: 'Confirm', icon: <FiTrash2 />, variant: 'danger' as const, onClick: confirmDelete },
              { label: 'Cancel', icon: <FiArrowLeft />, variant: 'secondary' as const, onClick: cancelDelete }
            ] : [
              { 
                label: 'Edit', 
                icon: <FiEdit />, 
                variant: 'primary' as const, 
                href: `/salaries/${id}/edit?employeeId=${salary.employeeId}` 
              },
              { label: 'Delete', icon: <FiTrash2 />, variant: 'danger' as const, onClick: handleDeleteClick }
            ]
          }
        />

        <div className="px-6 pb-6">
          {/* Basic Information */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiDollarSign className="mr-2" /> Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow p-3">
                <p className="text-lg font-medium text-gray-900">{employeeName}</p>
                <p className="text-sm text-gray-500">Employee</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-3">
                <p className="text-lg font-medium text-gray-900">{getMonthName(salary.month)} {salary.year}</p>
                <p className="text-sm text-gray-500">Period</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-3">
                <p className="text-lg font-medium text-gray-900">₹{salary.basicSalary?.toLocaleString() || '0'}</p>
                <p className="text-sm text-gray-500">Basic Salary</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-3">
                <p className="text-lg font-medium text-gray-900">₹{salary.totalSalary?.toLocaleString() || '0'}</p>
                <p className="text-sm text-gray-500">Total Salary</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-3">
                <p className="text-lg font-medium text-gray-900">₹{salary.netSalary?.toLocaleString() || '0'}</p>
                <p className="text-sm text-gray-500">Net Salary</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-3">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  salary.status === 'paid' ? 'bg-green-100 text-green-800' :
                  salary.status === 'issued' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {salary.status}
                </span>
                <p className="text-sm text-gray-500 mt-2">Status</p>
              </div>
            </div>
          </div>

          {/* Allowances */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiDollarSign className="mr-2" /> Allowances
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow p-3">
                <p className="text-lg font-medium text-gray-900">₹{salary.da?.toLocaleString() || '0'}</p>
                <p className="text-sm text-gray-500">DA</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-3">
                <p className="text-lg font-medium text-gray-900">₹{salary.hra?.toLocaleString() || '0'}</p>
                <p className="text-sm text-gray-500">HRA</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-3">
                <p className="text-lg font-medium text-gray-900">₹{salary.medicalAllowance?.toLocaleString() || '0'}</p>
                <p className="text-sm text-gray-500">Medical Allowance</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-3">
                <p className="text-lg font-medium text-gray-900">₹{salary.transportAllowance?.toLocaleString() || '0'}</p>
                <p className="text-sm text-gray-500">Transport Allowance</p>
              </div>
            </div>
          </div>

          {/* Deductions */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiDollarSign className="mr-2" /> Deductions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow p-3">
                <p className="text-lg font-medium text-gray-900">₹{salary.pf?.toLocaleString() || '0'}</p>
                <p className="text-sm text-gray-500">PF</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-3">
                <p className="text-lg font-medium text-gray-900">₹{salary.gratuity?.toLocaleString() || '0'}</p>
                <p className="text-sm text-gray-500">Gratuity</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-3">
                <p className="text-lg font-medium text-gray-900">₹{salary.healthInsurance?.toLocaleString() || '0'}</p>
                <p className="text-sm text-gray-500">Health Insurance</p>
              </div>
            </div>
          </div>

          {/* Audit Trail */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiDollarSign className="mr-2" /> Audit Trail
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-3">
                <p className="text-lg font-medium text-gray-900">
                  {salary.createdAt ? formatDateToDayMonYearWithTime(salary.createdAt) : '-'}
                </p>
                <p className="text-sm text-gray-500">Created At</p>
              </div>
              
              <div className="p-3">
                <p className="text-lg font-medium text-gray-900">
                  {salary.updatedAt ? formatDateToDayMonYearWithTime(salary.updatedAt) : '-'}
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