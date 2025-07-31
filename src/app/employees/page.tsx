'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiEdit, FiTrash2, FiPlus, FiSearch, FiEye, FiBriefcase } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Employee } from '@/types';
import toast, { Toaster } from 'react-hot-toast';
import { formatDateToDayMonYear } from '@/utils/documentUtils';
import { ActionButton } from '@/components/ui/ActionButton';
import SearchBar from '@/components/ui/SearchBar';
import TableHeader from '@/components/ui/TableHeader';
import { useEmployees, useDeleteEmployee } from '@/hooks/useEmployees';

// Component to handle employment navigation
const EmploymentActionButton = ({ employeeId }: { employeeId: string }) => {
  return (
    <ActionButton
      icon={<FiBriefcase className="w-5 h-5" />}
      title="View Employments"
      colorClass="bg-green-100 text-green-600 hover:text-green-900"
      href={`/employments?employeeId=${employeeId}`}
    />
  );
};

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('all');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Use Tanstack Query for employee data
  const {
    data: employees = [],
    isLoading,
    isError,
    error,
    refetch
  } = useEmployees();

  // Use mutation for delete operation
  const deleteEmployeeMutation = useDeleteEmployee();

  // Handle refresh with toast feedback
  const handleRefresh = async () => {
    try {
      await refetch();
      toast.success('Data refreshed successfully');
    } catch (error) {
      console.error('Error refreshing employees:', error);
      toast.error('Failed to refresh data');
    }
  };

  // Handle error state
  if (isError && error) {
    console.error('Employee data error:', error);
    toast.error('Failed to load employee data');
  }

  const handleDeleteClick = (id: string) => {
    setDeleteConfirm(id);
  };

  const confirmDelete = async (id: string) => {
    try {
      toast.loading('Deleting employee...', { id: 'delete-employee' });
      await deleteEmployeeMutation.mutateAsync(id);
      setDeleteConfirm(null);
      toast.success('Employee deleted successfully', { id: 'delete-employee' });
    } catch (error) {
      console.error('Error deleting employee:', error);
      toast.error('Failed to delete employee', { id: 'delete-employee' });
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
    employee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.phone?.includes(searchTerm);
    
    const matchesFilter = 
      filterValue === 'all' || 
      (filterValue === 'active' && employee.status === 'active') ||
      (filterValue === 'inactive' && employee.status === 'inactive');
    
    return matchesSearch && matchesFilter;
  });

  const total = filteredEmployees.length;
  const active = filteredEmployees.filter(e => e.status === 'active').length;
  const inactive = filteredEmployees.filter(e => e.status === 'inactive').length;

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Skeleton for TableHeader */}
          <div className="space-y-6">
            {/* Title and Action Buttons Skeleton */}
            <div className="flex justify-between items-center px-6 pt-6 mb-6">
              <div className="flex items-center">
                <div className="bg-gray-200 h-10 w-20 rounded-full animate-pulse"></div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-gray-200 h-8 w-32 rounded animate-pulse"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-gray-200 h-10 w-32 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Stats and Search Skeleton */}
            <div className="px-6 py-6 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="bg-gray-200 h-4 w-16 rounded animate-pulse"></div>
                <div className="bg-gray-200 h-4 w-20 rounded animate-pulse"></div>
                <div className="bg-gray-200 h-4 w-20 rounded animate-pulse"></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-gray-200 h-10 w-10 rounded animate-pulse"></div>
            <div className="bg-gray-200 h-10 w-64 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Table Skeleton */}
          <div className="overflow-x-auto">
            <div className="min-w-full divide-y divide-gray-200">
              <div className="bg-gray-50 px-6 py-3">
                <div className="flex space-x-6">
                  <div className="bg-gray-200 h-4 w-16 rounded animate-pulse"></div>
                  <div className="bg-gray-200 h-4 w-20 rounded animate-pulse"></div>
                  <div className="bg-gray-200 h-4 w-20 rounded animate-pulse"></div>
                  <div className="bg-gray-200 h-4 w-28 rounded animate-pulse"></div>
                  <div className="bg-gray-200 h-4 w-24 rounded animate-pulse"></div>
                  <div className="bg-gray-200 h-4 w-28 rounded animate-pulse"></div>
                  <div className="bg-gray-200 h-4 w-16 rounded animate-pulse"></div>
                  <div className="bg-gray-200 h-4 w-20 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="p-6">
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, index) => (
                    <div key={index} className="flex items-center space-x-6">
                      <div className="bg-gray-200 h-4 w-32 rounded animate-pulse"></div>
                      <div className="bg-gray-200 h-4 w-20 rounded animate-pulse"></div>
                      <div className="bg-gray-200 h-4 w-24 rounded animate-pulse"></div>
                      <div className="bg-gray-200 h-4 w-24 rounded animate-pulse"></div>
                      <div className="bg-gray-200 h-4 w-28 rounded animate-pulse"></div>
                      <div className="bg-gray-200 h-4 w-28 rounded animate-pulse"></div>
                      <div className="bg-gray-200 h-6 w-16 rounded-full animate-pulse"></div>
                      <div className="flex items-center space-x-2 ml-auto">
                        <div className="bg-gray-200 h-8 w-8 rounded animate-pulse"></div>
                        <div className="bg-gray-200 h-8 w-8 rounded animate-pulse"></div>
                        <div className="bg-gray-200 h-8 w-8 rounded animate-pulse"></div>
                        <div className="bg-gray-200 h-8 w-8 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Toaster position="top-center" />

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <TableHeader
          title="Employees"
          total={total}
          active={active}
          inactive={inactive}
          searchValue={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          searchPlaceholder="Search"
          searchAriaLabel="Search employees"
          onRefresh={handleRefresh}
          isRefreshing={false} // Tanstack Query handles refreshing state
          showFilter={true}
          filterValue={filterValue}
          onFilterChange={setFilterValue}
          backButton={{
            href: '/dashboard',
            label: 'Back'
          }}
          actionButtons={[
            {
              label: 'Add Employee',
              href: '/employees/add',
              icon: <FiPlus />,
              variant: 'success'
            }
          ]}
        />

        {isError ? (
          <div className="p-8 text-center text-red-500">
            <p>Failed to load employees. Please try refreshing the page.</p>
            <button 
              onClick={() => refetch()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        ) : filteredEmployees.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {searchTerm && filterValue === 'all' && 'No employees match your search'}
            {searchTerm && filterValue === 'active' && 'No active employees match your search'}
            {searchTerm && filterValue === 'inactive' && 'No inactive employees match your search'}
            {!searchTerm && filterValue === 'active' && 'No active employees found'}
            {!searchTerm && filterValue === 'inactive' && 'No inactive employees found'}
            {!searchTerm && filterValue === 'all' && 'No employees found. Add your first employee!'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Emp ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mobile
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date of Joining
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Curr. Package
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Sal. Cr.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{employee.employeeId || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{employee.phone || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {employee.joinDate ? formatDateToDayMonYear(employee.joinDate) : '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {/* This would come from employment data in a real app */}
                        {new Intl.NumberFormat('en-IN', {
                          style: 'currency',
                          currency: 'INR'
                        }).format(50000)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {/* This would come from salary slips in a real app */}
                        {new Intl.NumberFormat('en-IN', {
                          style: 'currency',
                          currency: 'INR'
                        }).format(600000)}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-center'>{employee.status && (
                              <span
                                className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  employee.status === 'active'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                              </span>
                            )}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {deleteConfirm === employee.id ? (
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => confirmDelete(employee.id)}
                            className="text-red-600 hover:text-red-900"
                            disabled={deleteEmployeeMutation.isPending}
                          >
                            {deleteEmployeeMutation.isPending ? 'Deleting...' : 'Confirm'}
                          </button>
                          <button
                            onClick={cancelDelete}
                            className="text-gray-600 hover:text-gray-900"
                            disabled={deleteEmployeeMutation.isPending}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-3">
                          <ActionButton
                            icon={<FiEye className="w-5 h-5" />}
                            title="View Employee Details"
                            colorClass="bg-blue-100 text-blue-600 hover:text-blue-900"
                            href={`/employees/${employee.id}`}
                          />
                          <EmploymentActionButton employeeId={employee.id} />
                          <ActionButton
                            icon={<FiEdit className="w-5 h-5" />}
                            title="Edit"
                            colorClass="bg-amber-100 text-amber-600 hover:text-amber-900"
                            href={`/employees/${employee.id}/edit`}
                          />
                          <ActionButton
                            icon={<FiTrash2 className="w-5 h-5" />}
                            title="Delete"
                            colorClass="bg-red-100 text-red-600 hover:text-red-900"
                            onClick={() => handleDeleteClick(employee.id)}
                            as="button"
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 