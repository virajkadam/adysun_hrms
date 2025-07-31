'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Salary } from '@/types';
import toast, { Toaster } from 'react-hot-toast';
import { useCreateSalary } from '@/hooks/useSalaries';
import Link from 'next/link';
import { getEmployeeNameById } from '@/utils/firebaseUtils';

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

  const onSubmit = async (data: SalaryFormData) => {
    try {
      setIsLoading(true);
      toast.loading('Creating salary...', { id: 'create-salary' });
      
      await createSalaryMutation.mutateAsync({
        ...data,
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
      router.push('/salaries');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create salary', { id: 'create-salary' });
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout breadcrumbItems={[
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Salaries', href: '/salaries' },
      { label: employeeId ? `Add Salary - ${employeeName || 'Loading...'}` : 'Add Salary', isCurrent: true }
    ]}>
      <Toaster position="top-center" />
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href={employeeId ? `/salaries?employeeId=${employeeId}` : '/salaries'} className="mr-4">
                <FiArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <h1 className="text-2xl font-semibold text-gray-900">
                {employeeId 
                  ? `Add Salary for ${employeeName || 'Loading...'}`
                  : 'Add New Salary'
                }
              </h1>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Employee ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee ID *
              </label>
              <input
                type="text"
                {...register('employeeId', { required: 'Employee ID is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter employee ID"
                disabled={!!employeeId} // Disable if employeeId is provided in URL
              />
              {errors.employeeId && (
                <p className="mt-1 text-sm text-red-600">{errors.employeeId.message}</p>
              )}
            </div>

            {/* Employment ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employment ID *
              </label>
              <input
                type="text"
                {...register('employmentId', { required: 'Employment ID is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter employment ID"
              />
              {errors.employmentId && (
                <p className="mt-1 text-sm text-red-600">{errors.employmentId.message}</p>
              )}
            </div>

            {/* Month */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Month *
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
                Year *
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
                Basic Salary *
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
                Total Salary *
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
                Net Salary *
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
                Status *
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
                Payment Frequency *
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

          <div className="mt-8 flex justify-end space-x-4">
            <Link
              href="/salaries"
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
              {isLoading ? 'Creating...' : 'Create Salary'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
} 