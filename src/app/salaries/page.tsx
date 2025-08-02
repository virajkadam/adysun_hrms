'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiEdit, FiTrash2, FiPlus, FiSearch, FiEye, FiDollarSign } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Salary } from '@/types';
import toast, { Toaster } from 'react-hot-toast';
import { formatDateToDayMonYear } from '@/utils/documentUtils';
import { ActionButton } from '@/components/ui/ActionButton';
import SearchBar from '@/components/ui/SearchBar';
import TableHeader from '@/components/ui/TableHeader';
import Pagination from '@/components/ui/Pagination';
import { useSalaries, useDeleteSalary, useSalariesByEmployee } from '@/hooks/useSalaries';
import { getEmployeeNameById } from '@/utils/firebaseUtils';
import SimpleBreadcrumb from '@/components/ui/SimpleBreadcrumb';
import { useSearchParams } from 'next/navigation';

// Component to handle employee name display with proper Firebase integration
const EmployeeNameDisplay = ({ employeeId }: { employeeId: string }) => {
  const [employeeName, setEmployeeName] = useState<string>('Loading...');

  useEffect(() => {
    const fetchEmployeeName = async () => {
      if (employeeId) {
        try {
          const name = await getEmployeeNameById(employeeId);
          setEmployeeName(name);
        } catch (error) {
          console.error('Error fetching employee name:', error);
          setEmployeeName('Unknown Employee');
        }
      }
    };

    fetchEmployeeName();
  }, [employeeId]);

  return <span>{employeeName}</span>;
};

export default function SalariesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('all');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [employeeName, setEmployeeName] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  
  const searchParams = useSearchParams();
  const employeeId = searchParams?.get('employeeId') || null;

  // Use appropriate query based on whether we have an employeeId
  const {
    data: employeeSalaries = [],
    isLoading: isEmployeeSalariesLoading,
    isError: isEmployeeSalariesError,
    error: employeeSalariesError,
    refetch: refetchEmployeeSalaries
  } = useSalariesByEmployee(employeeId || '');

  const {
    data: allSalaries = [],
    isLoading: isAllSalariesLoading,
    isError: isAllSalariesError,
    error: allSalariesError,
    refetch: refetchAllSalaries
  } = useSalaries();

  // Use the appropriate data based on context
  const salaries = employeeId ? employeeSalaries : allSalaries;
  const isLoading = employeeId ? isEmployeeSalariesLoading : isAllSalariesLoading;
  const isError = employeeId ? isEmployeeSalariesError : isAllSalariesError;
  const error = employeeId ? employeeSalariesError : allSalariesError;

  // Fetch employee name when employeeId is available
  useEffect(() => {
    const fetchEmployeeName = async () => {
      if (employeeId) {
        try {
          const name = await getEmployeeNameById(employeeId);
          setEmployeeName(name);
        } catch (error) {
          console.error('Error fetching employee name:', error);
          setEmployeeName('Unknown Employee');
        }
      }
    };

    fetchEmployeeName();
  }, [employeeId]);

  // Use mutation for delete operation
  const deleteSalaryMutation = useDeleteSalary();

  // Handle refresh with toast feedback
  const handleRefresh = async () => {
    try {
      if (employeeId) {
        await refetchEmployeeSalaries();
      } else {
        await refetchAllSalaries();
      }
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
    
    const matchesEmployeeId = employeeId ? salary.employeeId === employeeId : true;
    
    return matchesSearch && matchesFilter && matchesEmployeeId;
  });

  // Pagination logic
  const totalItems = filteredSalaries.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedSalaries = filteredSalaries.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterValue, employeeId]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

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
        { label: 'Employee', href: '/employees' },
        ...(employeeId ? [
          { label: employeeName || 'Loading...', href: `/employees/${employeeId}` },
          { label: 'Salaries', href: `/salaries?employeeId=${employeeId}`, isCurrent: true }
        ] : [
          { label: 'Salaries', href: '/salaries', isCurrent: true }
        ])
      ]}
    >
      <Toaster position="top-center" />
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <TableHeader
          title="Salary Management"
          total={filteredSalaries.length}
          searchValue={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          searchPlaceholder="Search"
          showStats={filteredSalaries.length > 0}
          showSearch={filteredSalaries.length > 0}
          showFilter={filteredSalaries.length > 0}
          filterOptions={[
            { value: 'all', label: 'All' },
            { value: 'draft', label: 'Draft' },
            { value: 'issued', label: 'Issued' },
            { value: 'paid', label: 'Paid' }
          ]}
          filterValue={filterValue}
          onFilterChange={setFilterValue}
          onRefresh={filteredSalaries.length > 0 ? handleRefresh : undefined}
          isRefreshing={isLoading}
          actionButtons={[
            { 
              label: 'Create', 
              icon: <FiPlus />, 
              variant: 'success' as const, 
              href: employeeId ? `/salaries/add?employeeId=${employeeId}` : '/salaries/add'
            }
          ]}
          backButton={employeeId ? { href: '/employees' } : { href: '/dashboard' }}
          headerClassName="px-6 pt-6 pb-6"
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
              {paginatedSalaries.map((salary) => (
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
                        href={`/salaries/${salary.id}${employeeId ? `?employeeId=${employeeId}` : ''}`}
                      />
                      <ActionButton
                        icon={<FiEdit className="w-4 h-4" />}
                        title="Edit Salary"
                        colorClass="bg-yellow-100 text-yellow-600 hover:text-yellow-900"
                        href={`/salaries/${salary.id}/edit${employeeId ? `?employeeId=${employeeId}` : ''}`}
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
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                {employeeId ? 'No salary records found for this employee' : 'No salaries found'}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || filterValue !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : employeeId 
                    ? 'Get started by adding a salary record for this employee.'
                    : 'Get started by creating a new salary record.'
                }
              </p>
              {!searchTerm && filterValue === 'all' && (
                <div className="mt-6">
                  <Link
                    href={employeeId ? `/salaries/add?employeeId=${employeeId}` : '/salaries/add'}
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
        
        {/* Pagination */}
        {totalItems > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </div>
    </DashboardLayout>
  );
} 