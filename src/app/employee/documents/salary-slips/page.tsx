'use client';

import React, { useState } from 'react';
import EmployeeLayout from '@/components/layout/EmployeeLayout';
import { useAuth } from '@/context/AuthContext';
import { getEmployee } from '@/utils/firebaseUtils';
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
        const employeeData = await getEmployee(currentUserData.id);
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
        <div className="flex justify-center items-center h-64">
          <p>Employee data not found</p>
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