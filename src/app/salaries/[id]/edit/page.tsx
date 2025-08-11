'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TableHeader from '@/components/ui/TableHeader';
import { Salary } from '@/types';
import toast, { Toaster } from 'react-hot-toast';
import { useSalary, useUpdateSalary } from '@/hooks/useSalaries';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getEmployeeNameById, checkExistingSalary } from '@/utils/firebaseUtils';
import { use } from 'react';

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

type PageParams = {
  params: Promise<{ id: string }>;
};

export default function EditSalaryPage({ params }: PageParams) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [employeeId, setEmployeeId] = useState<string>('');
  const [employeeName, setEmployeeName] = useState<string>('');
  const [hasPeriodChanges, setHasPeriodChanges] = useState(false);

  const router = useRouter();
  const { id } = use(params);

  const { data: salary, isLoading: isSalaryLoading } = useSalary(id);
  const updateSalaryMutation = useUpdateSalary();
  
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<SalaryFormData>();

  // Watch for form changes
  const watchedValues = watch();
  
  // Check for changes whenever form values change
  useEffect(() => {
    if (salary) {
      // Only track month/year changes (which could cause duplicates)
      // Allow salary amount changes freely
      const hasPeriodChanges = 
        watchedValues.month !== salary.month ||
        watchedValues.year !== salary.year;
      
      setHasPeriodChanges(hasPeriodChanges);
    }
  }, [watchedValues, salary]);

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

  // Simplify the form reset logic
  useEffect(() => {
    if (salary) {
      if (salary.employeeId) {
        setEmployeeId(salary.employeeId);
      }
      
      reset({
        employeeId: salary.employeeId || employeeId || '',
        employmentId: salary.employmentId || '',
        month: salary.month || 1,
        year: salary.year || new Date().getFullYear(),
        basicSalary: salary.basicSalary || 0,
        inhandSalary: salary.inhandSalary || 0,
        totalSalary: salary.totalSalary || 0
      });
    }
  }, [salary, reset, employeeId]);

  // Simplify the onSubmit function
  const onSubmit = async (data: SalaryFormData) => {
    try {
      // Only validate for duplicates if month/year changed (which could cause duplicates)
      const hasPeriodChanges = 
        data.month !== salary?.month ||
        data.year !== salary?.year;

      if (hasPeriodChanges) {
        const exists = await checkExistingSalary(data.employeeId, data.month, data.year, id);
        if (exists) {
          toast.error(`Salary for ${getMonthName(data.month)} ${data.year} already exists for this employee.`);
          return;
        }
      }

      setIsSubmitting(true);
      toast.loading('Updating salary...', { id: 'update-salary' });
      
      await updateSalaryMutation.mutateAsync({
        id: id,
        data: {
          ...data
        }
      });
      
      toast.success('Salary updated successfully!', { id: 'update-salary' });
      // Navigate back to employee's salary list if we came from there
      router.push(employeeId ? `/salaries?employeeId=${employeeId}` : `/salaries/${id}`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update salary', { id: 'update-salary' });
      setIsSubmitting(false);
    }
  };

  // Add helper function
  const getMonthName = (month: number) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month - 1] || 'Unknown';
  };

  if (isSalaryLoading) {
    return (
      <DashboardLayout breadcrumbItems={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Salaries', href: '/salaries' },
        { label: 'Loading...', isCurrent: true }
      ]}>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!salary) {
    return (
      <DashboardLayout>
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4">
          <p>Salary not found</p>
        </div>
        <div className="mt-4">
          <Link 
            href={employeeId ? `/salaries?employeeId=${employeeId}` : '/salaries'} 
            className="text-blue-600 hover:underline flex items-center gap-1"
          >
            <FiArrowLeft size={16} /> Back to {employeeId ? `${employeeId}'s Salaries` : 'Salaries'}
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout breadcrumbItems={[
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Salaries', href: '/salaries' },
      ...(employeeId ? [{ label: employeeName || 'Loading...', href: `/salaries?employeeId=${employeeId}` }] : []),
      { label: 'Edit Salary', isCurrent: true }
    ]}>
      <Toaster position="top-center" />
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <TableHeader
          title="Edit Salary"
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
            href: employeeId 
              ? `/salaries?employeeId=${employeeId}` 
              : `/salaries/${id}`
          }}
          actionButtons={[
            {
              label: 'Save',
              icon: <FiSave />,
              variant: 'success',
              onClick: handleSubmit(onSubmit),
              disabled: isSubmitting
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
              href={employeeId ? `/salaries?employeeId=${employeeId}` : `/salaries/${id}`}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
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