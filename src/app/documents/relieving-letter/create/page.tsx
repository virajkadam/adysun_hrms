'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiSave, FiUser, FiCalendar } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getEmployees, getCompany, addDocument } from '@/utils/documentUtils';
import { Employee, Company } from '@/types';
import toast, { Toaster } from 'react-hot-toast';

interface RelievingLetterFormData {
  employeeId: string;
  joiningDate: string;
  lastWorkingDate: string;
  department: string;
  position: string;
  relievingReason: string;
  issuedDate: string;
  employeeSignPlace: string;
}

export default function CreateRelievingLetterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [company, setCompany] = useState<Company | null>(null);
  const [formData, setFormData] = useState<RelievingLetterFormData>({
    employeeId: '',
    joiningDate: '',
    lastWorkingDate: '',
    department: '',
    position: '',
    relievingReason: 'We wish to inform you that your resignation has been accepted and you are relieved from your duties effective from the last working date mentioned above.',
    issuedDate: new Date().toISOString().split('T')[0],
    employeeSignPlace: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch employees
        const employeesList = await getEmployees();
        setEmployees(employeesList.filter(emp => emp.status === 'active'));
        
        // Fetch company details
        try {
          const companyData = await getCompany('default');
          setCompany(companyData);
        } catch (error) {
          console.error('Error fetching company details:', error);
          toast.error('Could not fetch company details. Please set up company information first.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load necessary data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'employeeId') {
      const selectedEmployee = employees.find(emp => emp.id === value);
      setFormData(prev => ({ 
        ...prev, 
        employeeId: value,
        position: selectedEmployee?.position || '',
        department: selectedEmployee?.department || '',
        joiningDate: selectedEmployee?.joinDate || ''
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.employeeId) {
      toast.error('Please select an employee');
      return;
    }

    if (!formData.lastWorkingDate) {
      toast.error('Please enter the last working date');
      return;
    }

    try {
      toast.loading('Creating relieving letter...', { id: 'create-letter' });
      
      const selectedEmployee = employees.find(emp => emp.id === formData.employeeId);
      if (!selectedEmployee) {
        throw new Error('Selected employee not found');
      }

      // Create document object
      const documentData = {
        employeeId: formData.employeeId,
        documentType: 'relieving' as 'offer' | 'appointment' | 'relieving' | 'appraisal' | 'increment' | 'payslip',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'draft' as 'draft' | 'issued' | 'signed',
        data: {
          employee: {
            name: selectedEmployee.name,
            email: selectedEmployee.email,
            phone: selectedEmployee.phone,
            address: selectedEmployee.currentAddress || ''
          },
          company: company ? {
            name: company.name,
            address: company.address,
            logo: company.logo || '',
            signatory: company.signatory || {
              name: '',
              designation: ''
            }
          } : null,
          position: formData.position,
          department: formData.department,
          joiningDate: formData.joiningDate,
          lastWorkingDate: formData.lastWorkingDate,
          relievingReason: formData.relievingReason,
          issuedDate: formData.issuedDate,
          employeeSignPlace: formData.employeeSignPlace
        }
      };
      
      const documentId = await addDocument(documentData);
      
      toast.success('Relieving letter created successfully', { id: 'create-letter' });
      router.push(`/documents/relieving-letter/${documentId}`);
    } catch (error) {
      console.error('Error creating relieving letter:', error);
      toast.error('Failed to create relieving letter', { id: 'create-letter' });
    }
  };

  return (
    <DashboardLayout>
      <Toaster position="top-center" />
      
      <div className="mb-6">
        <Link href="/documents/relieving-letter" className="text-blue-600 hover:underline flex items-center gap-1 mb-4">
          <FiArrowLeft size={16} /> Back to Relieving Letters
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Create Relieving Letter</h1>
        <p className="text-gray-600">Generate a new relieving letter for an employee</p>
      </div>
      
      {!company && !loading && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-yellow-700">
            Company details not set up. 
            <Link href="/documents/company" className="underline ml-1">
              Configure company information first
            </Link>
          </p>
        </div>
      )}
      
      {loading ? (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-lg font-semibold flex items-center">
                <FiUser className="mr-2" /> Employee Information
              </h2>
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-1">
                Select Employee
              </label>
              <select
                id="employeeId"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">-- Select an employee --</option>
                {employees.map(employee => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name} - {employee.email}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                Position
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="e.g. Software Engineer"
              />
            </div>
            
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="e.g. Engineering"
              />
            </div>
            
            <div>
              <label htmlFor="joiningDate" className="block text-sm font-medium text-gray-700 mb-1">
                <span className="flex items-center gap-1">
                  <FiCalendar size={16} /> Joining Date
                </span>
              </label>
              <input
                type="date"
                id="joiningDate"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="lastWorkingDate" className="block text-sm font-medium text-gray-700 mb-1">
                <span className="flex items-center gap-1">
                  <FiCalendar size={16} /> Last Working Date
                </span>
              </label>
              <input
                type="date"
                id="lastWorkingDate"
                name="lastWorkingDate"
                value={formData.lastWorkingDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="issuedDate" className="block text-sm font-medium text-gray-700 mb-1">
                <span className="flex items-center gap-1">
                  <FiCalendar size={16} /> Issue Date
                </span>
              </label>
              <input
                type="date"
                id="issuedDate"
                name="issuedDate"
                value={formData.issuedDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="employeeSignPlace" className="block text-sm font-medium text-gray-700 mb-1">
                Place of Signing
              </label>
              <input
                type="text"
                id="employeeSignPlace"
                name="employeeSignPlace"
                value={formData.employeeSignPlace}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Mumbai"
              />
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="relievingReason" className="block text-sm font-medium text-gray-700 mb-1">
                Relieving Reason
              </label>
              <textarea
                id="relievingReason"
                name="relievingReason"
                value={formData.relievingReason}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Enter reason for relieving"
              />
            </div>
            
            <div className="col-span-1 md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
                disabled={!company}
              >
                <FiSave /> Create Relieving Letter
              </button>
            </div>
          </div>
        </form>
      )}
    </DashboardLayout>
  );
} 