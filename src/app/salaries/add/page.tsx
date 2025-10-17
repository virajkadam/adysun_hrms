'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TableHeader from '@/components/ui/TableHeader';
import toast, { Toaster } from 'react-hot-toast';
import { useCreateSalary } from '@/hooks/useSalaries';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { getEmployeeNameById, getEmploymentsByEmployee, checkExistingSalary } from '@/utils/firebaseUtils';

// Simplify the Salary interface to only include essential fields
export interface Salary {
  id: string;
  employeeId: string;
  employmentId: string;
  
  // Essential Salary Information Only
  basicSalary: number;
  inhandSalary: number;
  totalSalary: number;
  
  // Period Information
  month: number;
  year: number;
  
  // Audit fields
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
}

// Simplify the SalaryFormData type
type SalaryFormData = {
  employeeId: string;
  employmentId: string;
  month: number;
  year: number;
  basicSalary: number;
  inhandSalary: number;
  totalSalary: number;
};

export default function AddSalaryPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [employeeName, setEmployeeName] = useState<string>('');
  const [employmentId, setEmploymentId] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const employeeId = searchParams?.get('employeeId');
  
  const createSalaryMutation = useCreateSalary();
  const queryClient = useQueryClient();
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<SalaryFormData>({
    defaultValues: {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      employeeId: employeeId || ''
    }
  });

  // Fetch employee name and employment ID when employeeId is available
  useEffect(() => {
    const fetchEmployeeData = async () => {
      if (employeeId) {
        try {
          // Fetch employee name
          const name = await getEmployeeNameById(employeeId);
          setEmployeeName(name);

          // Fetch latest employment
          const employments = await getEmploymentsByEmployee(employeeId);
          if (employments && employments.length > 0) {
            // Get the latest employment
            const latestEmployment = employments[0];
            setEmploymentId(latestEmployment.id);
            setValue('employmentId', latestEmployment.id); // Pre-fill employment ID
          } else {
            // If no employment found, show error
            toast.error('No employment record found for this employee. Please create an employment record first.');
            router.push('/employments/add?employeeId=' + employeeId);
          }
        } catch (error) {
          console.error('Error fetching employee data:', error);
          setEmployeeName('Unknown Employee');
        }
      }
    };

    fetchEmployeeData();
  }, [employeeId, setValue, router]);

  const onSubmit = async (data: SalaryFormData) => {
    try {
      // Check for existing salary BEFORE showing loading toast
      const exists = await checkExistingSalary(data.employeeId, data.month, data.year);
      if (exists) {
        toast.error(`Salary for ${getMonthName(data.month)} ${data.year} already exists for this employee.`);
        return;
      }

      setIsLoading(true);
      toast.loading('Creating salary...', { id: 'create-salary' });
      
      // Create salary record with only essential fields
      const salaryId = await createSalaryMutation.mutateAsync({
        ...data,
        employeeId: employeeId || data.employeeId,
        employmentId: employmentId || data.employmentId
      });
      
      toast.success('Salary created successfully!', { id: 'create-salary' });
      
      // Force invalidate and refetch all salary queries
      await queryClient.invalidateQueries({ queryKey: ['salaries'] });
      await queryClient.invalidateQueries({ queryKey: ['salaries', 'list'] });
      
      if (employeeId) {
        await queryClient.invalidateQueries({ queryKey: ['salaries', 'byEmployee', employeeId] });
      }
      
      // Navigate back to the appropriate page
      if (employeeId) {
        router.push(`/salaries?employeeId=${employeeId}`);
      } else {
        router.push('/salaries');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to create salary', { id: 'create-salary' });
    } finally {
      setIsLoading(false);
    }
  };

  // Add helper function
  const getMonthName = (month: number) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month - 1] || 'Unknown';
  };

  return (
    <DashboardLayout breadcrumbItems={[
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Salaries', href: '/salaries' },
      ...(employeeId ? [{ label: employeeName || 'Loading...', href: `/salaries?employeeId=${employeeId}` }] : []),
      { label: 'Add Salary', isCurrent: true }
    ]}>
      <Toaster position="top-center" />
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <TableHeader
          title="Add New Salary"
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
          backButton={{ href: employeeId ? `/salaries?employeeId=${employeeId}` : '/salaries' }}
          actionButtons={[
            {
              label: 'Save',
              icon: <FiSave />,
              variant: 'success',
              onClick: handleSubmit(onSubmit),
              disabled: isLoading
            }
          ]}
        />

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Month */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Month
              </label>
              <select
                {...register('month', { required: 'Month is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Month</option>
                <option value={1}>January</option>
                <option value={2}>February</option>
                <option value={3}>March</option>
                <option value={4}>April</option>
                <option value={5}>May</option>
                <option value={6}>June</option>
                <option value={7}>July</option>
                <option value={8}>August</option>
                <option value={9}>September</option>
                <option value={10}>October</option>
                <option value={11}>November</option>
                <option value={12}>December</option>
              </select>
              {errors.month && (
                <p className="mt-1 text-sm text-red-600">{errors.month.message}</p>
              )}
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year
              </label>
              <select
                {...register('year', { required: 'Year is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Year</option>
                {Array.from({ length: 10 }, (_, i) => {
                  const year = new Date().getFullYear() - 2 + i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
              {errors.year && (
                <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>
              )}
            </div>

            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {/* Basic Salary - No Change */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Basic Salary
              </label>
              <input
                type="number"
                {...register('basicSalary', { required: 'Basic salary is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter basic salary"
              />
              {errors.basicSalary && (
                <p className="mt-1 text-sm text-red-600">{errors.basicSalary.message}</p>
              )}
            </div>

            {/* Inhand Salary (formerly Total Salary) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Inhand Salary
              </label>
              <input
                type="number"
                {...register('inhandSalary', { required: 'Inhand salary is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter inhand salary"
              />
              {errors.inhandSalary && (
                <p className="mt-1 text-sm text-red-600">{errors.inhandSalary.message}</p>
              )}
            </div>

            {/* Total Salary (formerly Net Salary) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Salary
              </label>
              <input
                type="number"
                {...register('totalSalary', { required: 'Total salary is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter total salary"
              />
              {errors.totalSalary && (
                <p className="mt-1 text-sm text-red-600">{errors.totalSalary.message}</p>
              )}
            </div>

            {/* Empty div to maintain 4-column layout */}
            <div></div>
          </div>

          <div className="mt-8 flex justify-between py-3">
            <Link
              href={employeeId ? `/salaries?employeeId=${employeeId}` : '/salaries'}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <FiSave className="w-4 h-4" />
              Save
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
} 