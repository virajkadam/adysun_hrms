'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiPlus, FiSearch, FiEye, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getDocuments, deleteDocument, getEmployee } from '@/utils/documentUtils';
import { Document, Employee } from '@/types';
import toast, { Toaster } from 'react-hot-toast';

export default function AppointmentLettersPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [employeeNames, setEmployeeNames] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        // Get all documents
        const allDocs = await getDocuments();
        
        // Filter to only get appointment letters
        const appointmentLetters = allDocs.filter(doc => doc.documentType === 'appointment');
        setDocuments(appointmentLetters);
        
        // Fetch employee names for each document
        const namesMap: Record<string, string> = {};
        for (const doc of appointmentLetters) {
          if (!namesMap[doc.employeeId]) {
            try {
              const employee = await getEmployee(doc.employeeId);
              namesMap[doc.employeeId] = employee.name;
            } catch (error) {
              namesMap[doc.employeeId] = 'Unknown Employee';
            }
          }
        }
        setEmployeeNames(namesMap);
      } catch (error) {
        console.error('Error fetching documents:', error);
        toast.error('Failed to load appointment letters');
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const handleDeleteClick = (id: string) => {
    setDeleteConfirm(id);
  };

  const confirmDelete = async (id: string) => {
    try {
      toast.loading('Deleting appointment letter...', { id: 'delete-letter' });
      await deleteDocument(id);
      setDocuments(documents.filter(doc => doc.id !== id));
      setDeleteConfirm(null);
      toast.success('Appointment letter deleted successfully', { id: 'delete-letter' });
    } catch (error) {
      console.error('Error deleting appointment letter:', error);
      toast.error('Failed to delete appointment letter', { id: 'delete-letter' });
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const filteredDocuments = documents.filter(document => {
    const employeeName = employeeNames[document.employeeId] || '';
    const position = document.data?.position || '';
    const department = document.data?.department || '';
    
    return employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           position.toLowerCase().includes(searchTerm.toLowerCase()) ||
           department.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Appointment Letters</h1>
          <div className="bg-gray-200 h-10 w-32 rounded animate-pulse"></div>
        </div>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <div className="bg-gray-200 h-10 w-full rounded animate-pulse"></div>
          </div>
          <div className="p-8">
            <div className="animate-pulse space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
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
      
      <div className="mb-6">
        <Link href="/documents" className="text-blue-600 hover:underline flex items-center gap-1 mb-4">
          <FiArrowLeft size={16} /> Back to Documents
        </Link>
        
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Appointment Letters</h1>
          <Link
            href="/documents/appointment-letter/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
          >
            <FiPlus /> Create Appointment Letter
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search appointment letters..."
              className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredDocuments.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {searchTerm ? 'No appointment letters match your search' : 'No appointment letters found. Create your first appointment letter!'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CTC
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDocuments.map((document) => (
                  <tr key={document.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {employeeNames[document.employeeId] || 'Unknown Employee'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {document.data?.position || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {document.data?.department || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {document.data?.ctc ? formatCurrency(document.data.ctc) : 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(document.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          document.status === 'draft'
                            ? 'bg-yellow-100 text-yellow-800'
                            : document.status === 'issued'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {deleteConfirm === document.id ? (
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => confirmDelete(document.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={cancelDelete}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            href={`/documents/appointment-letter/${document.id}`}
                            className="text-green-600 hover:text-green-900"
                          >
                            <FiEye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(document.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 