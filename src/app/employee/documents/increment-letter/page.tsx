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
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">Increment Letter</h1>
            <p className="text-gray-600 mt-2">Your salary increment letter</p>
          </div>
          
          <div className="p-6">
            <div className="text-center py-12">
              <div className="mx-auto h-16 w-16 text-gray-400 mb-4">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Increment Letter Available</h3>
              <p className="text-gray-500 mb-4">
                Your increment letter is not available at the moment. This could be because:
              </p>
              <ul className="text-sm text-gray-500 space-y-1 mb-6">
                <li>• Your employment details are still being processed</li>
                <li>• No salary increment has been approved yet</li>
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