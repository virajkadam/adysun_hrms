'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { addEmployee } from '@/utils/firebaseUtils';
import { getAdminDataForAudit, checkUserByPhone, validatePANFormat, checkPANExistsAnywhere } from '@/utils/firebaseUtils';
import { Employee } from '@/types';
import { FiSave, FiX, FiPlus, FiEye, FiEyeOff } from 'react-icons/fi';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import TableHeader from '@/components/ui/TableHeader';
import { formatDateToDayMonYear } from '@/utils/documentUtils';

// Define API error type
type ApiError = Error | unknown;

type EmployeeFormData = Omit<Employee, 'id'>;

export default function AddEmployeePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [educationType, setEducationType] = useState<'12th' | 'diploma'>('12th');

  const router = useRouter();

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<EmployeeFormData>({
    defaultValues: {
      status: 'active',
      employeeType: 'insider', // Default to insider
    }
  });

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      toast.loading('Adding employee...', { id: 'add-employee' });

      // Check if phone number is already registered
      const formattedPhoneNumber = `+91${data.phone}`;
      const existingUser = await checkUserByPhone(formattedPhoneNumber);
      
      if (existingUser) {
        const userType = existingUser.userType === 'admin' ? 'admin' : 'employee';
        throw new Error(`Phone number is already registered with an ${userType}`);
      }

      // Validate PAN card if provided
      if (data.panCard && data.panCard.trim()) {
        if (!validatePANFormat(data.panCard)) {
          throw new Error('Please enter a valid PAN number (e.g., ABCDE1234F)');
        }

        // Check if PAN already exists
        const panExists = await checkPANExistsAnywhere(data.panCard.toUpperCase());
        if (panExists) {
          throw new Error('This PAN number is already registered. Please use a different PAN or contact support.');
        }
      }

      // Get admin data for audit fields
      const { adminId, currentTimestamp } = getAdminDataForAudit();

      // Prepare education data based on selected type
      const educationData = educationType === '12th' 
        ? { twelthStandard: data.twelthStandard }
        : { diploma: data.diploma };

      // Add audit fields to employee data and ensure status is active
      const employeeDataWithAudit = {
        ...data,
        ...educationData, // Only include the selected education type
        panCard: data.panCard ? data.panCard.toUpperCase() : undefined,
        status: 'active' as const,
        password: data.password || `${data.phone.slice(-5)}@#$$`,
        createdAt: currentTimestamp,
        createdBy: adminId,
        updatedAt: currentTimestamp,
        updatedBy: adminId,
      };

      await addEmployee(employeeDataWithAudit);
      toast.success('Employee added successfully!', { id: 'add-employee' });
      router.push('/employees');
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add employee';
      setError(errorMessage);
      toast.error(errorMessage, { id: 'add-employee' });
      setIsSubmitting(false);
    }
  };

  const handleRefresh = () => {
    // Refresh functionality for add page - could reload form or fetch latest data
    toast.success('Page refreshed');
  };

  return (
    <DashboardLayout>
      <Toaster position="top-center" />

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <TableHeader
          title="Add New Employee"
          total={0}
          active={0}
          inactive={0}
          searchValue=""
          onSearchChange={() => { }}
          searchPlaceholder="Search"
          searchAriaLabel="Search employees"
          showStats={false}
          showSearch={false}
          showFilter={false}
          headerClassName="px-6 py-6"
          backButton={{
            href: '/employees',
            label: 'Back'
          }}
          actionButtons={[
            {
              label: isSubmitting ? 'Saving...' : 'Save',
              icon: <FiSave />,
              variant: 'success',
              onClick: handleSubmit(onSubmit),
              disabled: isSubmitting
            }
          ]}
        />


        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Personal Details Section */}
          <div className="bg-gray-100 p-4 mb-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-2 border-l-4 border-blue-500 pl-2">Personal Details</h2>

            <div className="bg-white p-4 rounded-lg mb-4">
              <h3 className="text-md font-medium text-gray-700 mb-3 border-l-2 border-green-500 pl-2">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="text-red-500 mr-1">*</span> Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    {...register('name', {
                      required: 'Name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters'
                      },
                      maxLength: {
                        value: 50,
                        message: 'Name cannot exceed 50 characters'
                      }
                    })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="text-red-500 mr-1">*</span> Date of Birth
                  </label>
                  <input
                    type="date"
                    {...register('dateOfBirth')}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={watch('dateOfBirth') ? formatDateToDayMonYear(watch('dateOfBirth')) : 'Select date of birth'}
                  />
                  {errors.dateOfBirth && (
                    <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="text-red-500 mr-1">*</span> Employee ID
                  </label>
                  <input
                    type="text"
                    placeholder="Enter employee ID"
                    {...register('employeeId', {
                      required: 'Employee ID is required',
                      pattern: {
                        value: /^[A-Z0-9-]{3,15}$/i,
                        message: 'Please enter a valid employee ID'
                      }
                    })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                  {errors.employeeId && (
                    <p className="mt-1 text-sm text-red-600">{errors.employeeId.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Home Town
                  </label>
                  <input
                    type="text"
                    placeholder="Enter home town"
                    {...register('homeTown', {
                      maxLength: {
                        value: 50,
                        message: 'Home town cannot exceed 50 characters'
                      }
                    })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                  {errors.homeTown && (
                    <p className="mt-1 text-sm text-red-600">{errors.homeTown.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="text-red-500 mr-1">*</span> Employee Type
                  </label>
                  <select
                    {...register('employeeType', {
                      required: 'Employee type is required'
                    })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  >
                    <option value="insider">Insider</option>
                    <option value="outsider">Outsider</option>
                  </select>
                  {errors.employeeType && (
                    <p className="mt-1 text-sm text-red-600">{errors.employeeType.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white p-4 rounded-lg mb-4">
              <h3 className="text-md font-medium text-gray-700 mb-3 border-l-2 border-green-500 pl-2">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="text-red-500 mr-1">*</span> Mobile No.
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: 'Please enter a valid 10-digit phone number'
                      }
                    })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="text-red-500 mr-1">*</span> Email ID
                  </label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position
                  </label>
                  <input
                    type="text"
                    placeholder="Enter position/designation"
                    {...register('position')}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    placeholder="Enter department"
                    {...register('department')}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="text-red-500 mr-1">*</span> Current Address
                  </label>
                  <input
                    type="text"
                    placeholder="Enter current address"
                    {...register('currentAddress', { required: 'Current address is required' })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                  {errors.currentAddress && (
                    <p className="mt-1 text-sm text-red-600">{errors.currentAddress.message}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Permanent Address
                  </label>
                  <input
                    type="text"
                    placeholder="Enter permanent address (if different from current)"
                    {...register('permanentAddress')}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>
              </div>
            </div>

            {/* Password Section */}
            <div className="bg-white p-4 rounded-lg mb-4">
              <h3 className="text-md font-medium text-gray-700 mb-3 border-l-2 border-green-500 pl-2">Login Credentials (Optional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter password"
                      {...register('password', {
                        minLength: {
                          value: 4,
                          message: 'Password must be at least 4 characters'
                        }
                      })}
                      className="w-full p-2 pr-10 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Identification Documents */}
            <div className="bg-white p-4 rounded-lg mb-4">
              <h3 className="text-md font-medium text-gray-700 mb-3 border-l-2 border-green-500 pl-2">Identification Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="text-red-500 mr-1">*</span> Aadhar Card
                  </label>
                  <input
                    type="text"
                    placeholder="Enter 12-digit Aadhar number"
                    {...register('aadharCard', {
                      pattern: {
                        value: /^\d{12}$/,
                        message: 'Please enter a valid 12-digit Aadhar number'
                      }
                    })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                  {errors.aadharCard && (
                    <p className="mt-1 text-sm text-red-600">{errors.aadharCard.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="text-red-500 mr-1">*</span> PAN Card
                  </label>
                  <input
                    type="text"
                    placeholder="Enter PAN number"
                    {...register('panCard', {
                      pattern: {
                        value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                        message: 'Please enter a valid PAN number (e.g., ABCDE1234F)'
                      }
                    })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                  {errors.panCard && (
                    <p className="mt-1 text-sm text-red-600">{errors.panCard.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Driving License
                  </label>
                  <input
                    type="text"
                    placeholder="Enter driving license number"
                    {...register('drivingLicense')}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Voter ID
                  </label>
                  <input
                    type="text"
                    placeholder="Enter voter ID number"
                    {...register('voterID')}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>


              </div>
            </div>

            {/* Bank Details */}
            <div className="bg-white p-4 rounded-lg mb-4">
              <h3 className="text-md font-medium text-gray-700 mb-3 border-l-2 border-green-500 pl-2">Salary Account and Bank Details</h3>
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
                    placeholder="Enter IFSC code"
                    {...register('ifscCode', {
                      required: 'IFSC code is required',
                      pattern: {
                        value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                        message: 'Please enter a valid IFSC code'
                      }
                    })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                  {errors.ifscCode && (
                    <p className="mt-1 text-sm text-red-600">{errors.ifscCode.message}</p>
                  )}
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
          </div>

          {/* Educational Details Section */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-2 border-l-4 border-blue-500 pl-2">Educational Details</h2>

            {/* Higher Education */}
            <div className="bg-white p-4 rounded-lg mb-4">
              <h3 className="text-md font-medium text-gray-700 mb-3 border-l-2 border-green-500 pl-2">Higher Education</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Degree
                  </label>
                  <input
                    type="text"
                    placeholder="Enter degree name (e.g., B.Tech, MBA)"
                    {...register('graduation.degree')}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Branch
                  </label>
                  <input
                    type="text"
                    placeholder="Enter specialization/branch"
                    {...register('graduation.branch')}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Month
                  </label>
                  <select
                    {...register('graduation.month')}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  >
                    <option value="">Select Month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Passing Year
                  </label>
                  <input
                    type="text"
                    placeholder="YYYY"
                    {...register('graduation.passingYear', {
                      pattern: {
                        value: /^(19|20)\d{2}$/,
                        message: 'Enter a valid 4-digit year'
                      }
                    })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                  {errors.graduation?.passingYear && (
                    <p className="mt-1 text-sm text-red-600">{errors.graduation.passingYear.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    College Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter college/institution name"
                    {...register('graduation.collegeName')}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    University Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter university name"
                    {...register('graduation.universityName')}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Marks
                  </label>
                  <input
                    type="text"
                    placeholder="CGPA or Percentage"
                    {...register('graduation.marks')}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Grade
                  </label>
                  <input
                    type="text"
                    placeholder="Enter grade"
                    {...register('graduation.grade')}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>
              </div>
            </div>

            {/* 12th Standard or Diploma */}
            <div className="bg-white p-4 rounded-lg mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-md font-medium text-gray-700 border-l-2 border-green-500 pl-2">12th or Diploma</h3>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${educationType === '12th' ? 'text-blue-600' : 'text-gray-500'}`}>12th</span>
                  <button
                    type="button"
                    onClick={() => setEducationType(educationType === '12th' ? 'diploma' : '12th')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      educationType === 'diploma' ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        educationType === 'diploma' ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className={`text-sm font-medium ${educationType === 'diploma' ? 'text-blue-600' : 'text-gray-500'}`}>Diploma</span>
                </div>
              </div>

              {/* 12th Standard */}
              {educationType === '12th' && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      School
                    </label>
                    <input
                      type="text"
                      placeholder="Enter school name"
                      {...register('twelthStandard.school')}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Branch
                    </label>
                    <input
                      type="text"
                      placeholder="Enter branch/stream (e.g., Science, Commerce)"
                      {...register('twelthStandard.branch')}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Month
                    </label>
                    <select
                      {...register('twelthStandard.month')}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    >
                      <option value="">Select Month</option>
                      <option value="January">January</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option value="July">July</option>
                      <option value="August">August</option>
                      <option value="September">September</option>
                      <option value="October">October</option>
                      <option value="November">November</option>
                      <option value="December">December</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Passing Year
                    </label>
                    <input
                      type="text"
                      placeholder="YYYY"
                      {...register('twelthStandard.passingYear', {
                        pattern: {
                          value: /^(19|20)\d{2}$/,
                          message: 'Enter a valid 4-digit year'
                        }
                      })}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    />
                    {errors.twelthStandard?.passingYear && (
                      <p className="mt-1 text-sm text-red-600">{errors.twelthStandard.passingYear.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      School Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter full school name"
                      {...register('twelthStandard.schoolName')}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Board
                    </label>
                    <input
                      type="text"
                      placeholder="Enter board name"
                      {...register('twelthStandard.board')}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Marks
                    </label>
                    <input
                      type="text"
                      placeholder="Percentage"
                      {...register('twelthStandard.marks')}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Grade
                    </label>
                    <input
                      type="text"
                      placeholder="Enter grade"
                      {...register('twelthStandard.grade')}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    />
                  </div>
                </div>
              )}

              {/* Diploma */}
              {educationType === 'diploma' && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Diploma Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter diploma name"
                      {...register('diploma.name')}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Branch
                    </label>
                    <input
                      type="text"
                      placeholder="Enter specialization/branch"
                      {...register('diploma.branch')}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Month
                    </label>
                    <select
                      {...register('diploma.month')}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    >
                      <option value="">Select Month</option>
                      <option value="January">January</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option value="July">July</option>
                      <option value="August">August</option>
                      <option value="September">September</option>
                      <option value="October">October</option>
                      <option value="November">November</option>
                      <option value="December">December</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Passing Year
                    </label>
                    <input
                      type="text"
                      placeholder="YYYY"
                      {...register('diploma.passingYear', {
                        pattern: {
                          value: /^(19|20)\d{2}$/,
                          message: 'Enter a valid 4-digit year'
                        }
                      })}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    />
                    {errors.diploma?.passingYear && (
                      <p className="mt-1 text-sm text-red-600">{errors.diploma.passingYear.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      College Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter college/institution name"
                      {...register('diploma.collegeName')}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Institute
                    </label>
                    <input
                      type="text"
                      placeholder="Enter institute name"
                      {...register('diploma.institute')}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Marks
                    </label>
                    <input
                      type="text"
                      placeholder="Percentage"
                      {...register('diploma.marks')}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Grade
                    </label>
                    <input
                      type="text"
                      placeholder="Enter grade"
                      {...register('diploma.grade')}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    />
                  </div>
                </div>
              )}
            </div>
            {/* 10th Standard */}
            <div className="bg-white p-4 rounded-lg mb-4">
              <h3 className="text-md font-medium text-gray-700 mb-3 border-l-2 border-green-500 pl-2">10th Standard</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    School
                  </label>
                  <input
                    type="text"
                    placeholder="Enter school name"
                    {...register('tenthStandard.school')}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Month
                  </label>
                  <select
                    {...register('tenthStandard.month')}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  >
                    <option value="">Select Month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Passing Year
                  </label>
                  <input
                    type="text"
                    placeholder="YYYY"
                    {...register('tenthStandard.passingYear', {
                      pattern: {
                        value: /^(19|20)\d{2}$/,
                        message: 'Enter a valid 4-digit year'
                      }
                    })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                  {errors.tenthStandard?.passingYear && (
                    <p className="mt-1 text-sm text-red-600">{errors.tenthStandard.passingYear.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    School Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter full school name"
                    {...register('tenthStandard.schoolName')}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Board
                  </label>
                  <input
                    type="text"
                    placeholder="Enter board name"
                    {...register('tenthStandard.board')}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Marks
                  </label>
                  <input
                    type="text"
                    placeholder="Percentage"
                    {...register('tenthStandard.marks')}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Grade
                  </label>
                  <input
                    type="text"
                    placeholder="Enter grade"
                    {...register('tenthStandard.grade')}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Medium
                  </label>
                  <input
                    type="text"
                    placeholder="Enter medium of instruction"
                    {...register('tenthStandard.medium')}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center gap-4 px-6 py-3">
            <Link
              href="/employees"
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
              {isSubmitting ? 'Saving...' : 'Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
} 