'use client';

import React from 'react';
import EmployeeLayout from '@/components/layout/EmployeeLayout';
import { useAuth } from '@/context/AuthContext';
import { getEmployee } from '@/utils/firebaseUtils';
import { useState, useEffect } from 'react';
import { Employee } from '@/types';
import toast, { Toaster } from 'react-hot-toast';

export default function EmployeeIncrementLetterPage() {
  const { currentUserData } = useAuth();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return (
      <EmployeeLayout
        breadcrumbItems={[
          { label: 'Dashboard', href: '/employee-dashboard' },
          { label: 'Documents', href: '/employee/documents' },
          { label: 'Increment Letter', isCurrent: true }
        ]}
      >
        <div className="flex justify-center items-center h-64">
          <p>Loading increment letter...</p>
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
          { label: 'Increment Letter', isCurrent: true }
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
        { label: 'Increment Letter', isCurrent: true }
      ]}
    >
      <Toaster position="top-center" />
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Increment Letter</h1>
          <p className="text-gray-600 mt-2">Your salary increment letter</p>
        </div>
        
        <div className="p-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">SALARY INCREMENT LETTER</h2>
              <p className="text-gray-600">Date: {new Date().toLocaleDateString()}</p>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <p>Dear <strong>{employee.name}</strong>,</p>
              
              <p>We are pleased to inform you that your salary has been increased effective from the next month.</p>
              
              <div className="bg-white p-4 rounded border">
                <h3 className="font-semibold mb-2">Employee Details:</h3>
                <ul className="space-y-1">
                  <li><strong>Name:</strong> {employee.name}</li>
                  <li><strong>Employee ID:</strong> {employee.employeeId || 'Not specified'}</li>
                  <li><strong>Phone:</strong> {employee.phone}</li>
                  <li><strong>Email:</strong> {employee.email}</li>
                  <li><strong>Current Date:</strong> {new Date().toLocaleDateString()}</li>
                </ul>
              </div>
              
              <p>This increment reflects your valuable contributions to our organization.</p>
              
              <div className="mt-8">
                <p>Sincerely,</p>
                <p className="mt-4">HR Department</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button 
              onClick={() => window.print()}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </EmployeeLayout>
  );
} 