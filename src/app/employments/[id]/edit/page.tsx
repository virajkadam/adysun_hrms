'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { FiSave } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getEmployment, updateEmployment, getEmployees } from '@/utils/firebaseUtils';
import { Employment, Employee } from '@/types';
import toast, { Toaster } from 'react-hot-toast';
import TableHeader from '@/components/ui/TableHeader';


interface EmploymentFormData extends Omit<Employment, 'id' | 'benefits' | 'relievingCtc'> {
  benefits: string | string[];
  relievingCtc?: string; // Form input is string, will be converted to number|null
}

export default function EditEmploymentPage({ params }: { params: Promise<{ id: string }> }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [includePF, setIncludePF] = useState(true); // Default: With PF
  
  const router = useRouter();
  const { id } = use(params);
  
  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<EmploymentFormData>();

  // Watch salary for calculations
  const salary = watch('salary');

  // Calculate salary breakdown when annual salary changes
  useEffect(() => {
    if (salary && salary > 0) {
      const annualSalary = Number(salary);
      
      // Calculate monthly salary
      const monthlySalary = Math.round(annualSalary / 12);
      setValue('salaryPerMonth', monthlySalary);
      
      // Calculate Basic (40% of monthly salary)
      const basic = Math.round(monthlySalary * 0.40);
      setValue('basic', basic);
      
      // Calculate HRA (50% of Basic)
      const hra = Math.round(basic * 0.50);
      setValue('hra', hra);
      
      // Calculate DA (10% of Basic)
      const da = Math.round(basic * 0.10);
      setValue('da', da);
      
      // Fixed allowances as per Indian standards
      const medicalAllowance = 1250;
      const transport = 1600;
      setValue('medicalAllowance', medicalAllowance);
      setValue('transport', transport);
      
      // Calculate PF (12% of Basic - employer contribution) - only if includePF is true
      if (includePF) {
        const pf = Math.round(basic * 0.12);
        setValue('pf', pf);
      } else {
        setValue('pf', 0);
      }
      
      // Calculate Special Allowance (balancing figure)
      const calculatedComponents = includePF 
        ? basic + hra + da + medicalAllowance + transport
        : basic + hra + da + medicalAllowance + transport - Math.round(basic * 0.12);
      const specialAllowance = Math.max(0, monthlySalary - calculatedComponents);
      setValue('specialAllowance', specialAllowance);
    }
  }, [salary, setValue, includePF]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch employees for the dropdown
        const employeesData = await getEmployees();
        setEmployees(employeesData);
        
        // Fetch employment data
        const employmentData = await getEmployment(id);
        
        // Reset form with employment data (excluding audit fields)
        const { 
          id: _id, 
          createdAt: _createdAt, 
          createdBy: _createdBy, 
          updatedAt: _updatedAt, 
          updatedBy: _updatedBy, 
          relievingCtc,
          ...rest 
        } = employmentData;
        
        // Suppress unused variable warnings for destructured audit fields
        void _id; void _createdAt; void _createdBy; void _updatedAt; void _updatedBy;
        
        reset({
          ...rest,
          relievingCtc: relievingCtc ? relievingCtc.toString() : '',
          benefits: employmentData.benefits?.join(', ') || '',
        });
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch data';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, reset]);

  const onSubmit = async (data: EmploymentFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      toast.loading('Updating employment...', { id: 'updateEmployment' });
      
      // Convert benefits string to array
      const benefitsArray = typeof data.benefits === 'string' 
        ? data.benefits.split(',').map(b => b.trim()).filter(b => b !== '')
        : data.benefits;
      
      // Convert string numbers to actual numbers
      const formattedData = {
        ...data,
        salary: Number(data.salary),
        joiningCtc: Number(data.joiningCtc),
        inHandCtc: Number(data.inHandCtc),
        relievingCtc: Number(data.relievingCtc),
        salaryPerMonth: Number(data.salaryPerMonth),
        basic: Number(data.basic),
        da: Number(data.da),
        hra: Number(data.hra),
        pf: Number(data.pf),
        medicalAllowance: Number(data.medicalAllowance),
        transport: Number(data.transport),
        gratuity: Number(data.gratuity),
        totalLeaves: Number(data.totalLeaves),
        payableDays: Number(data.payableDays),
        additionalAllowance: Number(data.additionalAllowance),
        specialAllowance: Number(data.specialAllowance),
        benefits: benefitsArray,
        // Handle empty string fields
        endDate: data.endDate || undefined,
        employmentId: data.employmentId || undefined,
        joiningDate: data.joiningDate || undefined,
        incrementDate: data.incrementDate || undefined,
        salaryCreditDate: data.salaryCreditDate || undefined,
        paymentMode: data.paymentMode || undefined,
        jobTitle: data.jobTitle || undefined,
        department: data.department || undefined,
        location: data.location || undefined,
        reportingManager: data.reportingManager || undefined,
        employmentType: data.employmentType || undefined,
        workSchedule: data.workSchedule || undefined
      };
      
      await updateEmployment(id, formattedData);
      toast.success('Employment updated successfully!', { id: 'updateEmployment' });
      router.push(`/employments/${id}`);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update employment';
      setError(errorMessage);
      toast.error(errorMessage, { id: 'updateEmployment' });
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Skeleton for TableHeader */}
          <div className="space-y-6">
            {/* Title and Action Buttons Skeleton */}
            <div className="flex justify-between items-center px-6 py-6">
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
          </div>

          {/* Form Skeleton */}
          <div className="p-6">
            <div className="animate-pulse space-y-6">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="bg-gray-200 h-6 w-32 rounded mb-4"></div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, fieldIndex) => (
                      <div key={fieldIndex} className="space-y-2">
                        <div className="bg-gray-200 h-4 w-20 rounded"></div>
                        <div className="bg-gray-200 h-10 w-full rounded"></div>
                      </div>
                    ))}
                  </div>
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
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <TableHeader
          title="Edit Employment"
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
            href: `/employments/${id}`,
            label: 'Back'
          }}
          actionButtons={[
            {
              label: 'Save',
              icon: <FiSave />,
              variant: 'success',
              onClick: () => handleSubmit(onSubmit)()
            }
          ]}
        />

      {error && (
          <div className="px-6 pb-4">
            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
          <p>{error}</p>
            </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Basic Information */}
          <div className="px-6 pb-6">
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-l-4 border-blue-500 pl-2">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="text-red-500 mr-1">*</span>Employee
              </label>
              <select
                {...register('employeeId', { required: 'Employee is required' })}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Employee</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name} - {employee.position}
                  </option>
                ))}
              </select>
              {errors.employeeId && (
                <p className="mt-1 text-sm text-red-600">{errors.employeeId.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="text-red-500 mr-1">*</span>Contract Type
              </label>
              <select
                {...register('contractType', { required: 'Contract type is required' })}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
              </select>
              {errors.contractType && (
                <p className="mt-1 text-sm text-red-600">{errors.contractType.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="text-red-500 mr-1">*</span>Start Date
              </label>
              <input
                type="date"
                {...register('startDate', { required: 'Start date is required' })}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.startDate && (
                <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date (Optional)
              </label>
              <input
                type="date"
                {...register('endDate')}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="text-red-500 mr-1">*</span>Salary
              </label>
              <input
                type="number"
                {...register('salary', { 
                  required: 'Salary is required',
                  min: { value: 0, message: 'Salary must be positive' },
                  valueAsNumber: true
                })}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Annual salary"
              />
              {errors.salary && (
                <p className="mt-1 text-sm text-red-600">{errors.salary.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Frequency
              </label>
              <select
                {...register('paymentFrequency')}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="monthly">Monthly</option>
                <option value="bi-weekly">Bi-Weekly</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Employment Information */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-l-4 border-blue-500 pl-2">Employment Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employment ID
              </label>
              <input
                type="text"
                {...register('employmentId')}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="E.g., EMP-001"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Joining Date
              </label>
              <input
                type="date"
                {...register('joiningDate')}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Joining CTC
              </label>
              <input
                type="number"
                {...register('joiningCtc', { 
                  min: { value: 0, message: 'Joining CTC must be positive' },
                  valueAsNumber: true
                })}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Joining CTC amount"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                In-hand CTC
              </label>
              <input
                type="number"
                {...register('inHandCtc', { 
                  min: { value: 0, message: 'In-hand CTC must be positive' },
                  valueAsNumber: true
                })}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="In-hand CTC"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Relieving CTC
              </label>
              <input
                type="number"
                {...register('relievingCtc')}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Relieving CTC"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                IT
              </label>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="true"
                    {...register('isIT')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="false"
                    {...register('isIT')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resignation
              </label>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="true"
                    {...register('isResignation')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="false"
                    {...register('isResignation')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Career Progression/Increment Details (CTP) */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4 border-l-4 border-purple-500 pl-2">
            Career Progression / Increment Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Increment Date
              </label>
              <input
                type="date"
                {...register('incrementDate')}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Incremented Salary (₹)
              </label>
              <input
                type="number"
                {...register('newSalary', { 
                  min: { value: 0, message: 'Amount must be positive' },
                  valueAsNumber: true
                })}
                placeholder="Incremented salary amount"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Incremented CTC (₹)
              </label>
              <input
                type="number"
                {...register('incrementedCtc', { 
                  min: { value: 0, message: 'Amount must be positive' },
                  valueAsNumber: true
                })}
                placeholder="Incremented CTC amount"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Incremented In-hand CTC (₹)
              </label>
              <input
                type="number"
                {...register('incrementedInHandCtc', { 
                  min: { value: 0, message: 'Amount must be positive' },
                  valueAsNumber: true
                })}
                placeholder="Incremented in-hand CTC"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Salary Information */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2 border-l-4 border-green-500 pl-2">
                Salary Information
              </h2>
              <p className="text-sm text-gray-600 italic">
                💡 Enter annual salary - other components will auto-calculate
              </p>
            </div>
            
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIncludePF(false)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  !includePF
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Without PF
              </button>
              <button
                type="button"
                onClick={() => setIncludePF(true)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  includePF
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                With PF
              </button>
            </div>
          </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary per month
              </label>
              <input
                type="number"
                {...register('salaryPerMonth')}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                placeholder="Monthly salary"
              />
              <p className="mt-1 text-xs text-gray-500">Annual salary ÷ 12</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Basic
              </label>
              <input
                type="number"
                {...register('basic')}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                placeholder="Basic pay"
              />
              <p className="mt-1 text-xs text-gray-500">40% of monthly salary</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                DA (Dearness Allowance)
              </label>
              <input
                type="number"
                {...register('da')}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                placeholder="Dearness allowance"
              />
              <p className="mt-1 text-xs text-gray-500">10% of Basic</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                HRA (House Rent Allowance)
              </label>
              <input
                type="number"
                {...register('hra')}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                placeholder="House rent allowance"
              />
              <p className="mt-1 text-xs text-gray-500">50% of Basic</p>
            </div>
            
            {includePF && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PF (Provident Fund)
                </label>
                <input
                  type="number"
                  {...register('pf')}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                  placeholder="Provident fund"
                />
                <p className="mt-1 text-xs text-gray-500">12% of Basic</p>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medical Allowance
              </label>
              <input
                type="number"
                {...register('medicalAllowance')}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                placeholder="Medical allowance"
              />
              <p className="mt-1 text-xs text-gray-500">Fixed ₹1,250</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Transport
              </label>
              <input
                type="number"
                {...register('transport')}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                placeholder="Transport allowance"
              />
              <p className="mt-1 text-xs text-gray-500">Fixed ₹1,600</p>
            </div>
            
            {includePF && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gratuity
                </label>
                <input
                  type="number"
                  {...register('gratuity')}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Gratuity"
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Leaves
              </label>
              <input
                type="number"
                {...register('totalLeaves')}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Total leaves per year"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary Credit Date
              </label>
              <input
                type="text"
                {...register('salaryCreditDate')}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="E.g., 1st of every month"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payable Days
              </label>
              <input
                type="number"
                {...register('payableDays')}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Payable days"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Mode
              </label>
              <input
                type="text"
                {...register('paymentMode')}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="E.g., Bank Transfer, Cash"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Allowance
              </label>
              <input
                type="number"
                {...register('additionalAllowance')}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Additional allowance"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Special Allowance
              </label>
              <input
                type="number"
                {...register('specialAllowance')}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                placeholder="Special allowance"
              />
              <p className="mt-1 text-xs text-gray-500">Balancing amount</p>
            </div>
          </div>
        </div>

        {/* Bank Details Section */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4 border-l-4 border-blue-500 pl-2">Salary Account and Bank Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <span className="text-red-500 mr-1">*</span> Bank Name
              </label>
              <input
                type="text"
                placeholder="Enter bank name"
                {...register('bankName', {
                  required: 'Bank name is required'
                })}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
              />
              {errors.bankName && (
                <p className="mt-1 text-sm text-red-600">{errors.bankName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <span className="text-red-500 mr-1">*</span> Account No.
              </label>
              <input
                type="text"
                placeholder="Enter account number"
                {...register('accountNo', {
                  required: 'Account number is required',
                  pattern: {
                    value: /^\d{9,18}$/,
                    message: 'Please enter a valid account number'
                  }
                })}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
              />
              {errors.accountNo && (
                <p className="mt-1 text-sm text-red-600">{errors.accountNo.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <span className="text-red-500 mr-1">*</span> IFSC Code
              </label>
              <input
                type="text"
                placeholder="e.g., HDFC0000001 (11 characters)"
                maxLength={11}
                {...register('ifscCode', {
                  required: 'IFSC code is required',
                  pattern: {
                    value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                    message: 'Invalid IFSC format. Must be 11 characters: 4 letters + 0 + 6 alphanumeric (e.g., HDFC0000001)'
                  }
                })}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black uppercase"
                style={{ textTransform: 'uppercase' }}
              />
              {errors.ifscCode && (
                <p className="mt-1 text-sm text-red-600">{errors.ifscCode.message}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Format: BANK0BRANCH (e.g., HDFC0000001, SBIN0001234).
                <a 
                  href="https://www.rbi.org.in/Scripts/bs_viewcontent.aspx?Id=2009" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline ml-1"
                >
                  Find IFSC Code
                </a>
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <span className="text-red-500 mr-1">*</span> Account Holder Name
              </label>
              <input
                type="text"
                placeholder="Enter account holder name"
                {...register('accountHolderName', {
                  required: 'Account holder name is required'
                })}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
              />
              {errors.accountHolderName && (
                <p className="mt-1 text-sm text-red-600">{errors.accountHolderName.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Job Details */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-l-4 border-purple-500 pl-2">Job Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                {...register('jobTitle')}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="E.g., Software Developer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <input
                type="text"
                {...register('department')}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="E.g., Engineering, HR"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                {...register('location')}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Work location"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reporting Manager
              </label>
              <input
                type="text"
                {...register('reportingManager')}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Manager name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employment Type
              </label>
              <input
                type="text"
                {...register('employmentType')}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="E.g., Permanent, Contract"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Work Schedule
              </label>
              <input
                type="text"
                {...register('workSchedule')}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="E.g., 9 AM - 6 PM, Mon-Fri"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Benefits (comma separated)
              </label>
              <textarea
                {...register('benefits')}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="E.g., Health Insurance, Paid Leave, Retirement Plan"
                rows={3}
              ></textarea>
              <p className="mt-1 text-xs text-gray-500">Enter benefits separated by commas</p>
            </div>
          </div>
        </div>

            {/* Form Buttons */}
            <div className="flex justify-between items-center gap-4 px-6 py-3">
            <Link
              href={`/employments/${id}`}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2 disabled:opacity-50"
            >
              <FiSave />
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </form>
      </div>
    </DashboardLayout>
  );
} 