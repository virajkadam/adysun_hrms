'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import EmployeeLayout from '@/components/layout/EmployeeLayout';
import { Employee } from '@/types';
import { formatDateToDayMonYear } from '@/utils/documentUtils';
import TableHeader from '@/components/ui/TableHeader';
import { getEmployee } from '@/utils/firebaseUtils';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';

export default function EmployeeProfilePage() {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const { currentUserData } = useAuth();

  useEffect(() => {
    // Check if user is authenticated and is employee
    if (!currentUserData || currentUserData.userType !== 'employee') {
      router.push('/login');
      return;
    }

    const fetchEmployeeData = async () => {
      try {
        setIsLoading(true);
        const employeeData = await getEmployee(currentUserData.id);
        setEmployee(employeeData);
        } catch (error) {
        console.error('Error fetching employee data:', error);
        setError(error instanceof Error ? error.message : 'Failed to load profile data');
        toast.error('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployeeData();
  }, [currentUserData, router]);

  // Handle error state
  if (error) {
    console.error('Employee data error:', error);
    toast.error('Failed to load profile data');
  }

  if (isLoading) {
    return (
      <EmployeeLayout>
        <div className="flex justify-center items-center h-64">
          <p>Loading profile data...</p>
        </div>
      </EmployeeLayout>
    );
  }

  if (!employee) {
    return (
      <EmployeeLayout>
        <div className="flex justify-center items-center h-64">
          <p>Profile not found</p>
        </div>
      </EmployeeLayout>
    );
  }

  return (
    <EmployeeLayout>
      <Toaster position="top-center" />
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <TableHeader
          title="My Profile"
          total={0}
          showStats={false}
          showSearch={false}
          searchValue=""
          onSearchChange={() => { }}
          headerClassName="px-6 py-6"
          backButton={{
            href: '/employee-dashboard',
            label: 'Back'
          }}
          actionButtons={[]}
        />

        <div className="p-6">
          {/* Personal Details Section */}
          <div className="bg-gray-100 p-4 mb-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-2 border-l-4 border-blue-500 pl-2">Personal Details</h2>
            <div className="bg-white p-4 rounded-lg mb-4">
              <h3 className="text-md font-medium text-gray-700 mb-3 border-l-2 border-green-500 pl-2">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium text-gray-900">{employee.name}</p>
                </div>
                                <div>
                  <p className="text-sm text-gray-600">Date of Birth</p>
                  <p className="font-medium text-gray-900">{employee.dateOfBirth ? formatDateToDayMonYear(employee.dateOfBirth) : 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Employee ID</p>
                  <p className="font-medium text-gray-900">{employee.employeeId || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                employee.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
                  }`}>
              {employee.status}
            </span>
          </div>
                <div>
                  <p className="text-sm text-gray-600">Home Town</p>
                  <p className="font-medium text-gray-900">{employee.homeTown || 'Not specified'}</p>
                </div>
          </div>
        </div>
        
            {/* Contact Information */}
            <div className="bg-white p-4 rounded-lg mb-4">
              <h3 className="text-md font-medium text-gray-700 mb-3 border-l-2 border-green-500 pl-2">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                  <p className="text-sm text-gray-600">Mobile No.</p>
                  <p className="font-medium text-gray-900">{employee.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email ID</p>
                  <p className="font-medium text-gray-900">{employee.email}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600">Current Address</p>
                  <p className="font-medium text-gray-900">{employee.currentAddress || 'Not specified'}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600">Permanent Address</p>
                  <p className="font-medium text-gray-900">{employee.permanentAddress || 'Not specified'}</p>
                </div>
          </div>
        </div>
        
        {/* Bank Details */}
            <div className="bg-white p-4 rounded-lg mb-4">
              <h3 className="text-md font-medium text-gray-700 mb-3 border-l-2 border-green-500 pl-2">Bank Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                  <p className="text-sm text-gray-600">Bank Name</p>
                  <p className="font-medium text-gray-900">{employee.bankName || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Account No.</p>
                  <p className="font-medium text-gray-900">{employee.accountNo || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">IFSC Code</p>
                  <p className="font-medium text-gray-900">{employee.ifscCode || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Account Holder Name</p>
                  <p className="font-medium text-gray-900">{employee.accountHolderName || 'Not specified'}</p>
                </div>
          </div>
        </div>
      </div>
      
      {/* Educational Details Section */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-2 border-l-4 border-blue-500 pl-2">Educational Details</h2>
        
        {/* Higher Education */}
            {employee.graduation && (
              <div className="bg-white p-4 rounded-lg mb-4">
                <h3 className="text-md font-medium text-gray-700 mb-3 border-l-2 border-green-500 pl-2">Higher Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div>
                    <p className="text-sm text-gray-600">Degree</p>
                    <p className="font-medium text-gray-900">{employee.graduation.degree || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Branch</p>
                    <p className="font-medium text-gray-900">{employee.graduation.branch || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">College Name</p>
                    <p className="font-medium text-gray-900">{employee.graduation.collegeName || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">University Name</p>
                    <p className="font-medium text-gray-900">{employee.graduation.universityName || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Passing Year</p>
                    <p className="font-medium text-gray-900">{employee.graduation.passingYear || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Marks</p>
                    <p className="font-medium text-gray-900">{employee.graduation.marks || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Grade</p>
                    <p className="font-medium text-gray-900">{employee.graduation.grade || 'Not specified'}</p>
                  </div>
          </div>
          </div>
        )}
        
        {/* 12th Standard */}
            {employee.twelthStandard && (
              <div className="bg-white p-4 rounded-lg mb-4">
                <h3 className="text-md font-medium text-gray-700 mb-3 border-l-2 border-green-500 pl-2">12th Standard</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div>
                    <p className="text-sm text-gray-600">School</p>
                    <p className="font-medium text-gray-900">{employee.twelthStandard.school || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Branch</p>
                    <p className="font-medium text-gray-900">{employee.twelthStandard.branch || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Board</p>
                    <p className="font-medium text-gray-900">{employee.twelthStandard.board || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Passing Year</p>
                    <p className="font-medium text-gray-900">{employee.twelthStandard.passingYear || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Marks</p>
                    <p className="font-medium text-gray-900">{employee.twelthStandard.marks || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Grade</p>
                    <p className="font-medium text-gray-900">{employee.twelthStandard.grade || 'Not specified'}</p>
                  </div>
          </div>
          </div>
        )}
        
        {/* 10th Standard */}
            {employee.tenthStandard && (
              <div className="bg-white p-4 rounded-lg mb-4">
                <h3 className="text-md font-medium text-gray-700 mb-3 border-l-2 border-green-500 pl-2">10th Standard</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div>
                    <p className="text-sm text-gray-600">School</p>
                    <p className="font-medium text-gray-900">{employee.tenthStandard.school || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Board</p>
                    <p className="font-medium text-gray-900">{employee.tenthStandard.board || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Passing Year</p>
                    <p className="font-medium text-gray-900">{employee.tenthStandard.passingYear || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Marks</p>
                    <p className="font-medium text-gray-900">{employee.tenthStandard.marks || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Grade</p>
                    <p className="font-medium text-gray-900">{employee.tenthStandard.grade || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Medium</p>
                    <p className="font-medium text-gray-900">{employee.tenthStandard.medium || 'Not specified'}</p>
                  </div>
          </div>
          </div>
        )}
          </div>
        </div>
      </div>
    </EmployeeLayout>
  );
} 