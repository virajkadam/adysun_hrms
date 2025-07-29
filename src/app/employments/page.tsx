'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiEdit, FiTrash2, FiPlus, FiSearch, FiEye } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getEmployments, deleteEmployment, getEmployee } from '@/utils/firebaseUtils';
import { Employment, Employee } from '@/types';
import toast, { Toaster } from 'react-hot-toast';
import { ActionButton } from '@/components/ui/ActionButton';
import { formatDateToDayMonYear } from '@/utils/documentUtils';
import SearchBar from '@/components/ui/SearchBar';
import TableHeader from '@/components/ui/TableHeader';

export default function EmploymentsPage() {
  const [employments, setEmployments] = useState<Employment[]>([]);
  const [employeeNames, setEmployeeNames] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchEmployments();
  }, []);

  const fetchEmployments = async () => {
    try {
      setLoading(true);
      const data = await getEmployments();
      setEmployments(data);
      
      // Fetch employee names for each employment
      const namesMap: Record<string, string> = {};
      for (const employment of data) {
        try {
          const employee = await getEmployee(employment.employeeId);
          namesMap[employment.employeeId] = employee.name;
        } catch (error) {
          namesMap[employment.employeeId] = 'Unknown Employee';
        }
      }
      setEmployeeNames(namesMap);
    } catch (error) {
      console.error('Error fetching employments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      const data = await getEmployments();
      setEmployments(data);
      
      // Fetch employee names for each employment
      const namesMap: Record<string, string> = {};
      for (const employment of data) {
        try {
          const employee = await getEmployee(employment.employeeId);
          namesMap[employment.employeeId] = employee.name;
        } catch (error) {
          namesMap[employment.employeeId] = 'Unknown Employee';
        }
      }
      setEmployeeNames(namesMap);
      toast.success('Data refreshed successfully');
    } catch (error) {
      console.error('Error refreshing employments:', error);
      toast.error('Failed to refresh data');
    } finally {
      setRefreshing(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteConfirm(id);
  };

  const confirmDelete = async (id: string) => {
    try {
      toast.loading('Deleting employment...', { id: 'delete-employment' });
      await deleteEmployment(id);
      setEmployments(employments.filter(emp => emp.id !== id));
      setDeleteConfirm(null);
      toast.success('Employment deleted successfully', { id: 'delete-employment' });
    } catch (error) {
      console.error('Error deleting employment:', error);
      toast.error('Failed to delete employment', { id: 'delete-employment' });
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const filteredEmployments = employments.filter(employment => {
    const employeeName = employeeNames[employment.employeeId] || '';
    return employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           employment.contractType.toLowerCase().includes(searchTerm.toLowerCase()) ||
           (employment.jobTitle && employment.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
           (employment.department && employment.department.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Employments</h1>
          <div className="bg-gray-200 h-10 w-32 rounded animate-pulse"></div>
        </div>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <div className="bg-gray-200 h-10 w-full rounded animate-pulse"></div>
          </div>
          <div className="p-8">
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Toaster position="top-center" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Employments</h1>
        <Link
          href="/employments/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
        >
          <FiPlus /> Add Employment
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <TableHeader
          total={filteredEmployments.length}
          searchValue={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          searchPlaceholder="Search"
          searchAriaLabel="Search employments"
          onRefresh={handleRefresh}
          isRefreshing={refreshing}
        />

        {filteredEmployments.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {searchTerm ? 'No employments match your search' : 'No employments found. Add your first employment!'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contract Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salary
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployments.map((employment) => (
                  <tr key={employment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {employeeNames[employment.employeeId] || 'Unknown Employee'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          employment.employmentType === 'full-time'
                            ? 'bg-green-100 text-green-800'
                            : employment.employmentType === 'part-time'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {employment.employmentType && employment.employmentType.includes('-') ?
                          employment.employmentType.split('-').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ') : 
                          employment.employmentType ? 
                            employment.employmentType.charAt(0).toUpperCase() + employment.employmentType.slice(1) : 
                            'Unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {employment.joiningDate ? formatDateToDayMonYear(employment.joiningDate) : 
                         employment.startDate ? formatDateToDayMonYear(employment.startDate) : '-'}<br/>
                        {employment.endDate && (
                          <> - {formatDateToDayMonYear(employment.endDate)}</>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatCurrency(employment.salary)} / {
                          employment.paymentFrequency ? (
                            employment.paymentFrequency.includes('-') ?
                              employment.paymentFrequency.split('-').map(word => 
                                word.charAt(0).toUpperCase() + word.slice(1)
                              ).join(' ') :
                              employment.paymentFrequency.charAt(0).toUpperCase() + employment.paymentFrequency.slice(1)
                          ) : 'Monthly'
                        }
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {deleteConfirm === employment.id ? (
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => confirmDelete(employment.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={cancelDelete}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end space-x-2">
                          <ActionButton
                            icon={<FiEye className="w-5 h-5" />}
                            title="View"
                            colorClass="bg-green-100 text-green-600 hover:text-green-900"
                            href={`/employments/${employment.id}`}
                          />
                          <ActionButton
                            icon={<FiEdit className="w-5 h-5" />}
                            title="Edit"
                            colorClass="bg-blue-100 text-blue-600 hover:text-blue-900"
                            href={`/employments/${employment.id}/edit`}
                          />
                          <ActionButton
                            icon={<FiTrash2 className="w-5 h-5" />}
                            title="Delete"
                            colorClass="bg-red-100 text-red-600 hover:text-red-900"
                            onClick={() => handleDeleteClick(employment.id)}
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