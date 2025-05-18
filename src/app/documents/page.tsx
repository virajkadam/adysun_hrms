'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiFileText, FiPlus, FiSearch, FiEye, FiTrash2, FiUser, FiBriefcase, FiFile, FiCheck, FiDollarSign, FiAward } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getDocuments, getEmployees } from '@/utils/documentUtils';
import { Document, Employee } from '@/types';
import toast, { Toaster } from 'react-hot-toast';

export default function DocumentsPage() {
  const [recentDocuments, setRecentDocuments] = useState<Document[]>([]);
  const [employees, setEmployees] = useState<Record<string, Employee>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Get documents
        const documents = await getDocuments();
        
        // Sort by creation date (descending) and take the most recent 5
        const sortedDocs = documents
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5);
        
        setRecentDocuments(sortedDocs);
        
        // Get employees for the recent documents
        const employeeIds = [...new Set(sortedDocs.map(doc => doc.employeeId))];
        const employeesData = await getEmployees();
        
        const employeesMap: Record<string, Employee> = {};
        employeesData.forEach(employee => {
          employeesMap[employee.id] = employee;
        });
        
        setEmployees(employeesMap);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load documents');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getDocumentTypeName = (type: string) => {
    const types: Record<string, string> = {
      'offer': 'Offer Letter',
      'appointment': 'Appointment Letter',
      'relieving': 'Relieving Letter',
      'appraisal': 'Appraisal Letter',
      'increment': 'Increment Letter',
      'payslip': 'Payslip'
    };
    return types[type] || type;
  };

  const getDocumentIcon = (type: string) => {
    switch(type) {
      case 'offer':
        return <FiFileText className="w-10 h-10 text-blue-500" />;
      case 'appointment':
        return <FiCheck className="w-10 h-10 text-green-500" />;
      case 'relieving':
        return <FiFile className="w-10 h-10 text-red-500" />;
      case 'appraisal':
        return <FiAward className="w-10 h-10 text-yellow-500" />;
      case 'increment':
        return <FiDollarSign className="w-10 h-10 text-purple-500" />;
      case 'payslip':
        return <FiBriefcase className="w-10 h-10 text-indigo-500" />;
      default:
        return <FiFile className="w-10 h-10 text-gray-500" />;
    }
  };

  const documentTypes = [
    { type: 'offer', name: 'Offer Letters', description: 'Create and manage offer letters for new hires', link: '/documents/offer-letter', icon: <FiFileText className="w-8 h-8" /> },
    { type: 'appointment', name: 'Appointment Letters', description: 'Generate appointment letters for employees', link: '/documents/appointment-letter', icon: <FiCheck className="w-8 h-8" /> },
    { type: 'relieving', name: 'Relieving Letters', description: 'Issue relieving letters for exiting employees', link: '/documents/relieving-letter', icon: <FiFile className="w-8 h-8" /> },
    { type: 'appraisal', name: 'Appraisal Letters', description: 'Create appraisal letters for employee performance reviews', link: '/documents/appraisal-letter', icon: <FiAward className="w-8 h-8" /> },
    { type: 'payslip', name: 'Payslips', description: 'Generate monthly payslips for employees', link: '/documents/payslip', icon: <FiBriefcase className="w-8 h-8" /> }
  ];

  return (
    <DashboardLayout>
      <Toaster position="top-center" />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Document Management</h1>
        <Link href="/documents/company" className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700">
          <FiBriefcase className="w-5 h-5" /> Company Settings
        </Link>
      </div>

      {/* Document Type Cards */}
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Document Types</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {documentTypes.map((docType) => (
          <Link
            key={docType.type}
            href={docType.link}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 p-3 bg-blue-50 rounded-full">
                {docType.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{docType.name}</h3>
              <p className="text-sm text-gray-600">{docType.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Documents */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Recent Documents</h2>
        
        {loading ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="animate-pulse space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="bg-gray-200 h-12 w-12 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : recentDocuments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-10 text-center">
            <FiFile className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents yet</h3>
            <p className="text-gray-500 mb-6">Start by creating your first document</p>
            <div className="flex justify-center space-x-3">
              {documentTypes.slice(0, 3).map((docType) => (
                <Link
                  key={docType.type}
                  href={docType.link}
                  className="bg-blue-50 text-blue-700 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-100"
                >
                  {docType.icon} {docType.name}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm divide-y">
            {recentDocuments.map((document) => {
              const employee = employees[document.employeeId];
              return (
                <Link 
                  key={document.id} 
                  href={`/documents/${document.documentType}-letter/${document.id}`}
                  className="flex items-center p-4 hover:bg-gray-50 transition-colors duration-150"
                >
                  <div className="mr-4">
                    {getDocumentIcon(document.documentType)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      {getDocumentTypeName(document.documentType)}
                      <span className={`ml-2 text-xs font-normal px-2 py-1 rounded-full ${
                        document.status === 'draft' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : document.status === 'issued' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                      </span>
                    </h3>
                    <p className="text-sm text-gray-600">
                      {employee ? employee.name : 'Unknown Employee'} 
                      {document.data?.position && ` - ${document.data.position}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {new Date(document.createdAt).toLocaleDateString()}
                    </p>
                    <div className="flex items-center justify-end mt-1">
                      <FiEye className="w-4 h-4 text-blue-600" />
                      <span className="text-xs text-blue-600 ml-1">View</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}