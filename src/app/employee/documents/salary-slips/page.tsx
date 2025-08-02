'use client';

import React, { useState } from 'react';
import EmployeeLayout from '@/components/layout/EmployeeLayout';
import { useAuth } from '@/context/AuthContext';
import { getEmployeeSelf } from '@/utils/firebaseUtils';
import { useEffect } from 'react';
import { Employee } from '@/types';
import toast, { Toaster } from 'react-hot-toast';
import { FiDownload, FiCalendar } from 'react-icons/fi';

export default function EmployeeSalarySlipsPage() {
  const { currentUserData } = useAuth();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState<string>('');

  useEffect(() => {
    const fetchEmployeeData = async () => {
      if (!currentUserData) return;
      
      try {
        setIsLoading(true);
        // Use getEmployeeSelf for employee self-access with security checks
        const employeeData = await getEmployeeSelf(currentUserData.id);
        setEmployee(employeeData);
      } catch (error) {
        console.error('Error fetching employee data:', error);
        toast.error('Failed to load employee data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployeeData();
  }, [currentUserData]);

  // Generate last 12 months for salary slips
  const generateMonths = () => {
    const months = [];
    const currentDate = new Date();
    
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthYear = date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
      });
      const value = date.toISOString().slice(0, 7); // YYYY-MM format
      
      months.push({
        label: monthYear,
        value: value
      });
    }
    
    return months;
  };

  const months = generateMonths();

  const handleDownload = (month: string) => {
    // This would typically generate and download the payslip PDF
    // For now, we'll just show a toast message
    const monthLabel = months.find(m => m.value === month)?.label || month;
    toast.success(`Downloading payslip for ${monthLabel}`);
    
    // Simulate download
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '#';
      link.download = `payslip-${month}.pdf`;
      link.click();
    }, 1000);
  };

  if (isLoading) {
    return (
      <EmployeeLayout
        breadcrumbItems={[
          { label: 'Dashboard', href: '/employee-dashboard' },
          { label: 'Documents', href: '/employee/documents' },
          { label: 'Salary Slips', isCurrent: true }
        ]}
      >
        <div className="flex justify-center items-center h-64">
          <p>Loading salary slips...</p>
        </div>
      </EmployeeLayout>
    );
  }

  if (!employee) {
    return (
      <EmployeeLayout
        breadcrumbItems={[
          { label: 'Dashboard', href: '/employee-dashboard' },
          { label: 'Documents', href: '/employee/documents' },
          { label: 'Salary Slips', isCurrent: true }
        ]}
      >
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">Salary Slips</h1>
            <p className="text-gray-600 mt-2">Download your monthly salary slips</p>
          </div>
          
          <div className="p-6">
            <div className="text-center py-12">
              <div className="mx-auto h-16 w-16 text-gray-400 mb-4">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Salary Slips Available</h3>
              <p className="text-gray-500 mb-4">
                Your salary slips are not available at the moment. This could be because:
              </p>
              <ul className="text-sm text-gray-500 space-y-1 mb-6">
                <li>• Your employment details are still being processed</li>
                <li>• No salary slips have been generated yet</li>
                <li>• Your profile information needs to be updated</li>
              </ul>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => window.history.back()}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Go Back
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </EmployeeLayout>
    );
  }

  return (
    <EmployeeLayout
      breadcrumbItems={[
        { label: 'Dashboard', href: '/employee-dashboard' },
        { label: 'Documents', href: '/employee/documents' },
        { label: 'Salary Slips', isCurrent: true }
      ]}
    >
      <Toaster position="top-center" />
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Salary Slips</h1>
          <p className="text-gray-600 mt-2">Download your monthly salary slips</p>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Employee Information</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium text-gray-900">{employee.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Employee ID</p>
                  <p className="font-medium text-gray-900">{employee.employeeId || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Department</p>
                  <p className="font-medium text-gray-900">General</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Available Salary Slips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {months.map((month, index) => (
                <div key={month.value} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FiCalendar className="text-gray-500 mr-2" />
                      <span className="font-medium text-gray-800">{month.label}</span>
                    </div>
                    <button
                      onClick={() => handleDownload(month.value)}
                      className="flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <FiDownload className="mr-1" size={14} />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </EmployeeLayout>
  );
} 