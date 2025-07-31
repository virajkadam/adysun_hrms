'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TableHeader from '@/components/ui/TableHeader';
import { Salary } from '@/types';
import toast, { Toaster } from 'react-hot-toast';
import { useCreateSalary } from '@/hooks/useSalaries';
import Link from 'next/link';
import { getEmployeeNameById, getEmploymentsByEmployee } from '@/utils/firebaseUtils';

type SalaryFormData = {
  employeeId: string;
  employmentId: string;
  month: number;
  year: number;
  basicSalary: number;
  totalSalary: number;
  netSalary: number;
  status: 'draft' | 'issued' | 'paid';
  paymentFrequency: 'monthly' | 'bi-weekly' | 'weekly';
};

export default function AddSalaryPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [employeeName, setEmployeeName] = useState<string>('');
  const [employmentId, setEmploymentId] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const employeeId = searchParams?.get('employeeId');
  
  const createSalaryMutation = useCreateSalary();
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<SalaryFormData>({
    defaultValues: {
      status: 'draft',
      paymentFrequency: 'monthly',
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      employeeId: employeeId || '' // Pre-fill employee ID if available
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
          }
        } catch (error) {
          console.error('Error fetching employee data:', error);
          setEmployeeName('Unknown Employee');
        }
      }
    };

    fetchEmployeeData();
  }, [employeeId, setValue]);

  const onSubmit = async (data: SalaryFormData) => {
    try {
      setIsLoading(true);
      toast.loading('Creating salary...', { id: 'create-salary' });
      
      // Create salary record in Firestore
      const salaryId = await createSalaryMutation.mutateAsync({
        ...data,
        employeeId: employeeId || data.employeeId, // Use URL param if available
        employmentId: employmentId || data.employmentId, // Use fetched ID if available
        da: 0,
        hra: 0,
        medicalAllowance: 0,
        transportAllowance: 0,
        pf: 0,
        gratuity: 0,
        healthInsurance: 0,
        employerPF: 0,
        statutoryBonus: 0,
        specialAllowance: 0,
        educationAllowance: 0,
        lta: 0,
        additionalAllowance: 0,
        monthlyReimbursement: 0,
        totalWorkingDays: 0,
        paidDays: 0,
        lossOfPay: 0,
        paymentMode: '',
        salaryCreditDate: '',
        documentUrl: '',
        issueDate: '',
        paidDate: ''
      });
      
      toast.success('Salary created successfully!', { id: 'create-salary' });
      
      // Navigate back to the appropriate page
      if (employeeId) {
        router.push(`/salaries?employeeId=${employeeId}`);
      } else {
        router.push('/salaries');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to create salary', { id: 'create-salary' });
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout breadcrumbItems={[
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Salaries', href: '/salaries' },
      ...(employeeId ? [{ label: employeeName, href: `/salaries?employeeId=${employeeId}` }] : []),
      { label: 'Add Salary', isCurrent: true }
    ]}>
      <Toaster position="top-center" />
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <TableHeader
          title={employeeId 
            ? `Add Salary for ${employeeName || 'Loading...'}`
            : 'Add New Salary'
          }
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
              variant: 'primary',
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
              <input
                type="number"
                {...register('year', { required: 'Year is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter year"
              />
              {errors.year && (
                <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>
              )}
            </div>

            {/* Basic Salary */}
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

            {/* Total Salary */}
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

            {/* Net Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Net Salary
              </label>
              <input
                type="number"
                {...register('netSalary', { required: 'Net salary is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter net salary"
              />
              {errors.netSalary && (
                <p className="mt-1 text-sm text-red-600">{errors.netSalary.message}</p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                {...register('status', { required: 'Status is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">Draft</option>
                <option value="issued">Issued</option>
                <option value="paid">Paid</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
              )}
            </div>

            {/* Payment Frequency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Frequency
              </label>
              <select
                {...register('paymentFrequency', { required: 'Payment frequency is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="monthly">Monthly</option>
                <option value="bi-weekly">Bi-weekly</option>
                <option value="weekly">Weekly</option>
              </select>
              {errors.paymentFrequency && (
                <p className="mt-1 text-sm text-red-600">{errors.paymentFrequency.message}</p>
              )}
            </div>
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
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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