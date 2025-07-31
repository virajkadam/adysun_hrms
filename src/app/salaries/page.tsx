'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiEdit, FiTrash2, FiPlus, FiSearch, FiEye, FiDollarSign } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Salary } from '@/types';
import toast, { Toaster } from 'react-hot-toast';
import { formatDateToDayMonYear } from '@/utils/documentUtils';
import { ActionButton } from '@/components/ui/ActionButton';
import SearchBar from '@/components/ui/SearchBar';
import TableHeader from '@/components/ui/TableHeader';
import { useSalaries, useDeleteSalary } from '@/hooks/useSalaries';
import { getEmployeeNameById } from '@/utils/firebaseUtils';
import SimpleBreadcrumb from '@/components/ui/SimpleBreadcrumb';

// Component to handle employee name display
const EmployeeNameDisplay = ({ employeeId }: { employeeId: string }) => {
  const [employeeName, setEmployeeName] = useState<string>('Loading...');

  useState(() => {
    // Dummy employee names for demonstration
    const dummyNames: { [key: string]: string } = {
      'EMP001': 'John Doe',
      'EMP002': 'Jane Smith',
      'EMP003': 'Mike Johnson'
    };
    
    const name = dummyNames[employeeId] || 'Unknown Employee';
    setEmployeeName(name);
  });

  return <span>{employeeName}</span>;
};

export default function SalariesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('all');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Use Tanstack Query for salary data
  const {
    data: apiSalaries = [],
    isLoading,
    isError,
    error,
    refetch
  } = useSalaries();

  // Dummy salary data for demonstration
  const dummySalaries = [
    {
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
    },
    {
      id: '2',
      employeeId: 'EMP002',
      employmentId: 'EMP002',
      basicSalary: 45000,
      totalSalary: 68000,
      netSalary: 58000,
      month: 12,
      year: 2024,
      status: 'issued' as const,
      da: 12000,
      hra: 7000,
      medicalAllowance: 1800,
      transportAllowance: 900,
      pf: 4500,
      gratuity: 1800,
      healthInsurance: 1200,
      employerPF: 4500,
      statutoryBonus: 2700,
      specialAllowance: 4500,
      educationAllowance: 900,
      lta: 1800,
      additionalAllowance: 900,
      monthlyReimbursement: 450,
      totalWorkingDays: 21,
      paidDays: 20,
      lossOfPay: 4500,
      paymentFrequency: 'monthly' as const,
      paymentMode: 'Bank Transfer',
      salaryCreditDate: '2024-12-01',
      documentUrl: '',
      issueDate: '2024-12-01',
      paidDate: '',
      createdAt: '2024-12-01T00:00:00Z',
      createdBy: 'admin1',
      updatedAt: '2024-12-01T00:00:00Z',
      updatedBy: 'admin1'
    },
    {
      id: '3',
      employeeId: 'EMP003',
      employmentId: 'EMP003',
      basicSalary: 60000,
      totalSalary: 90000,
      netSalary: 78000,
      month: 11,
      year: 2024,
      status: 'draft' as const,
      da: 18000,
      hra: 10000,
      medicalAllowance: 2500,
      transportAllowance: 1200,
      pf: 6000,
      gratuity: 2500,
      healthInsurance: 2000,
      employerPF: 6000,
      statutoryBonus: 4000,
      specialAllowance: 6000,
      educationAllowance: 1200,
      lta: 2500,
      additionalAllowance: 1200,
      monthlyReimbursement: 600,
      totalWorkingDays: 22,
      paidDays: 22,
      lossOfPay: 0,
      paymentFrequency: 'monthly' as const,
      paymentMode: 'Bank Transfer',
      salaryCreditDate: '2024-11-01',
      documentUrl: '',
      issueDate: '',
      paidDate: '',
      createdAt: '2024-11-01T00:00:00Z',
      createdBy: 'admin1',
      updatedAt: '2024-11-01T00:00:00Z',
      updatedBy: 'admin1'
    }
  ];

  // Use dummy data for now, fallback to API data when available
  const salaries = dummySalaries;

  // Use mutation for delete operation
  const deleteSalaryMutation = useDeleteSalary();

  // Handle refresh with toast feedback
  const handleRefresh = async () => {
    try {
      await refetch();
      toast.success('Data refreshed successfully');
    } catch (error) {
      console.error('Error refreshing salaries:', error);
      toast.error('Failed to refresh data');
    }
  };

  // Handle error state
  if (isError && error) {
    console.error('Salary data error:', error);
    toast.error('Failed to load salary data');
  }

  const handleDeleteClick = (id: string) => {
    setDeleteConfirm(id);
  };

  const confirmDelete = async (id: string) => {
    try {
      toast.loading('Deleting salary...', { id: 'delete-salary' });
      await deleteSalaryMutation.mutateAsync(id);
      setDeleteConfirm(null);
      toast.success('Salary deleted successfully', { id: 'delete-salary' });
    } catch (error) {
      console.error('Error deleting salary:', error);
      toast.error('Failed to delete salary', { id: 'delete-salary' });
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const filteredSalaries = salaries.filter(salary => {
    const matchesSearch = 
      salary.employeeId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salary.employmentId?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterValue === 'all' || salary.status === filterValue;
    
    return matchesSearch && matchesFilter;
  });

  const activeSalaries = salaries.filter(salary => salary.status === 'paid').length;
  const inactiveSalaries = salaries.filter(salary => salary.status === 'draft').length;

  const getMonthName = (month: number) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month - 1] || 'Unknown';
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      draft: 'bg-gray-100 text-gray-800',
      issued: 'bg-blue-100 text-blue-800',
      paid: 'bg-green-100 text-green-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  return (
    <DashboardLayout
      breadcrumbItems={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Salaries', isCurrent: true }
      ]}
    >
      <Toaster position="top-center" />
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <TableHeader
          title="Salary Management"
          total={salaries.length}
          active={activeSalaries}
          inactive={inactiveSalaries}
          searchValue={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          searchPlaceholder="Search by employee or employment ID..."
          showStats={true}
          showSearch={true}
          showFilter={true}
          filterOptions={[
            { value: 'all', label: 'All' },
            { value: 'draft', label: 'Draft' },
            { value: 'issued', label: 'Issued' },
            { value: 'paid', label: 'Paid' }
          ]}
          filterValue={filterValue}
          onFilterChange={setFilterValue}
          onRefresh={handleRefresh}
          actionButtons={[
            { 
              label: 'Add Salary', 
              icon: <FiPlus />, 
              variant: 'primary' as const, 
              href: '/salaries/add' 
            }
          ]}
        />

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Basic Salary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Salary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Net Salary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSalaries.map((salary) => (
                <tr key={salary.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <EmployeeNameDisplay employeeId={salary.employeeId} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getMonthName(salary.month)} {salary.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{salary.basicSalary?.toLocaleString() || '0'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{salary.totalSalary?.toLocaleString() || '0'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{salary.netSalary?.toLocaleString() || '0'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(salary.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <ActionButton
                        icon={<FiEye className="w-4 h-4" />}
                        title="View Details"
                        colorClass="bg-blue-100 text-blue-600 hover:text-blue-900"
                        href={`/salaries/${salary.id}`}
                      />
                      <ActionButton
                        icon={<FiEdit className="w-4 h-4" />}
                        title="Edit Salary"
                        colorClass="bg-yellow-100 text-yellow-600 hover:text-yellow-900"
                        href={`/salaries/${salary.id}/edit`}
                      />
                      {deleteConfirm === salary.id ? (
                        <>
                          <button
                            onClick={() => confirmDelete(salary.id)}
                            disabled={deleteSalaryMutation.isPending}
                            className="w-8 h-8 bg-red-100 text-red-600 hover:text-red-900 rounded-md p-1 flex items-center justify-center disabled:opacity-50"
                            title="Confirm Delete"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={cancelDelete}
                            disabled={deleteSalaryMutation.isPending}
                            className="w-8 h-8 bg-gray-100 text-gray-600 hover:text-gray-900 rounded-md p-1 flex items-center justify-center disabled:opacity-50"
                            title="Cancel Delete"
                          >
                            ×
                          </button>
                        </>
                      ) : (
                        <ActionButton
                          icon={<FiTrash2 className="w-4 h-4" />}
                          title="Delete Salary"
                          colorClass="bg-red-100 text-red-600 hover:text-red-900"
                          onClick={() => handleDeleteClick(salary.id)}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredSalaries.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <FiDollarSign className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No salaries found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || filterValue !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by creating a new salary record.'
                }
              </p>
              {!searchTerm && filterValue === 'all' && (
                <div className="mt-6">
                  <Link
                    href="/salaries/add"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FiPlus className="-ml-1 mr-2 h-4 w-4" />
                    Add Salary
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
} 