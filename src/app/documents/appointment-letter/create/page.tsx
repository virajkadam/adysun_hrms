'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiSave, FiUser, FiDollarSign, FiCalendar, FiBriefcase } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getEmployees, getCompany, addDocument, calculateSalaryComponents } from '@/utils/documentUtils';
import { Employee, Company } from '@/types';
import toast, { Toaster } from 'react-hot-toast';

interface AppointmentLetterFormData {
  employeeId: string;
  position: string;
  department: string;
  ctc: string;
  joiningDate: string;
  reportingAuthority: string;
  location: string;
  bankDetails: {
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    branchName: string;
  };
  showPF: boolean;
  termsAndConditions: string[];
  salaryComponents?: any;
}

export default function CreateAppointmentLetterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [company, setCompany] = useState<Company | null>(null);
  const [formData, setFormData] = useState<AppointmentLetterFormData>({
    employeeId: '',
    position: '',
    department: '',
    ctc: '',
    joiningDate: '',
    reportingAuthority: '',
    location: '',
    bankDetails: {
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      branchName: ''
    },
    showPF: true,
    termsAndConditions: [
      'Working hours will be 9:00 AM to 6:00 PM (Monday to Friday).',
      'You will be entitled to 20 paid leaves per year.',
      'There will be a probation period of 3 months.',
      'During probation, notice period will be 15 days. Post confirmation, notice period will be 2 months.',
      'Medical insurance will be provided as per company policy.',
      'You will be required to sign a non-disclosure agreement.',
      'You will be eligible for performance-based incentives as per company policy.'
    ]
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
    
    if (name === 'ctc') {
      // Calculate salary components when salary changes
      const lpa = parseFloat(value) || 0;
      const components = calculateSalaryComponents(lpa);
      
      setFormData(prev => ({ 
        ...prev, 
        ctc: value,
        salaryComponents: components
      }));
    } else if (name === 'employeeId') {
      const selectedEmployee = employees.find(emp => emp.id === value);
      setFormData(prev => ({ 
        ...prev, 
        employeeId: value,
        position: selectedEmployee?.position || '',
        department: selectedEmployee?.department || '',
        location: selectedEmployee?.currentAddress || ''
      }));
    } else if (name.startsWith('bankDetails.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        bankDetails: {
          ...prev.bankDetails,
          [field]: value
        }
      }));
    } else if (name === 'showPF') {
      setFormData(prev => ({ ...prev, showPF: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleTermChange = (index: number, value: string) => {
    const updatedTerms = [...formData.termsAndConditions];
    updatedTerms[index] = value;
    setFormData(prev => ({ ...prev, termsAndConditions: updatedTerms }));
  };

  const addTerm = () => {
    setFormData(prev => ({
      ...prev,
      termsAndConditions: [...prev.termsAndConditions, '']
    }));
  };

  const removeTerm = (index: number) => {
    const updatedTerms = [...formData.termsAndConditions];
    updatedTerms.splice(index, 1);
    setFormData(prev => ({ ...prev, termsAndConditions: updatedTerms }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.employeeId) {
      toast.error('Please select an employee');
      return;
    }

    try {
      toast.loading('Creating appointment letter...', { id: 'create-letter' });
      
      const selectedEmployee = employees.find(emp => emp.id === formData.employeeId);
      if (!selectedEmployee) {
        throw new Error('Selected employee not found');
      }

      // Get salary components
      const ctcValue = parseFloat(formData.ctc) || 0;
      const salaryComponents = formData.salaryComponents || calculateSalaryComponents(ctcValue);

      // Create document object
      const documentData = {
        employeeId: formData.employeeId,
        documentType: 'appointment' as 'offer' | 'appointment' | 'relieving' | 'appraisal' | 'increment' | 'payslip',
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
          ctc: ctcValue,
          salaryComponents,
          bankDetails: formData.bankDetails,
          reportingAuthority: formData.reportingAuthority,
          location: formData.location,
          joiningDate: formData.joiningDate,
          showPF: formData.showPF,
          termsAndConditions: formData.termsAndConditions.filter(term => term.trim() !== '')
        }
      };
      
      const documentId = await addDocument(documentData);
      
      toast.success('Appointment letter created successfully', { id: 'create-letter' });
      router.push(`/documents/appointment-letter/${documentId}`);
    } catch (error) {
      console.error('Error creating appointment letter:', error);
      toast.error('Failed to create appointment letter', { id: 'create-letter' });
    }
  };

  return (
    <DashboardLayout>
      <Toaster position="top-center" />
      
      <div className="mb-6">
        <Link href="/documents/appointment-letter" className="text-blue-600 hover:underline flex items-center gap-1 mb-4">
          <FiArrowLeft size={16} /> Back to Appointment Letters
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Create Appointment Letter</h1>
        <p className="text-gray-600">Generate a new appointment letter for an employee</p>
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
            
            <div className="col-span-1 md:col-span-2 border-t pt-6">
              <h2 className="text-lg font-semibold flex items-center">
                <FiBriefcase className="mr-2" /> Job Details
              </h2>
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
              <label htmlFor="ctc" className="block text-sm font-medium text-gray-700 mb-1">
                Annual CTC (₹ in Lakhs)
              </label>
              <input
                type="number"
                id="ctc"
                name="ctc"
                value={formData.ctc}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="e.g. 8"
                min="0"
                step="0.1"
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
              <label htmlFor="reportingAuthority" className="block text-sm font-medium text-gray-700 mb-1">
                Reporting Authority
              </label>
              <input
                type="text"
                id="reportingAuthority"
                name="reportingAuthority"
                value={formData.reportingAuthority}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. John Doe, Technical Manager"
              />
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Work Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Mumbai Office"
              />
            </div>
            
            <div className="col-span-1 md:col-span-2 border-t pt-6">
              <h2 className="text-lg font-semibold flex items-center mb-4">
                <FiDollarSign className="mr-2" /> Bank Details
              </h2>
            </div>
            
            <div>
              <label htmlFor="bankDetails.bankName" className="block text-sm font-medium text-gray-700 mb-1">
                Bank Name
              </label>
              <input
                type="text"
                id="bankDetails.bankName"
                name="bankDetails.bankName"
                value={formData.bankDetails.bankName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. HDFC Bank"
              />
            </div>
            
            <div>
              <label htmlFor="bankDetails.accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Account Number
              </label>
              <input
                type="text"
                id="bankDetails.accountNumber"
                name="bankDetails.accountNumber"
                value={formData.bankDetails.accountNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 12345678901234"
              />
            </div>
            
            <div>
              <label htmlFor="bankDetails.ifscCode" className="block text-sm font-medium text-gray-700 mb-1">
                IFSC Code
              </label>
              <input
                type="text"
                id="bankDetails.ifscCode"
                name="bankDetails.ifscCode"
                value={formData.bankDetails.ifscCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. HDFC0001234"
              />
            </div>
            
            <div>
              <label htmlFor="bankDetails.branchName" className="block text-sm font-medium text-gray-700 mb-1">
                Branch Name
              </label>
              <input
                type="text"
                id="bankDetails.branchName"
                name="bankDetails.branchName"
                value={formData.bankDetails.branchName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Mumbai Main Branch"
              />
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="showPF"
                  name="showPF"
                  checked={formData.showPF}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="showPF" className="ml-2 block text-sm text-gray-900">
                  Include PF details in letter
                </label>
              </div>
            </div>
            
            <div className="col-span-1 md:col-span-2 border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Terms & Conditions</h2>
                <button
                  type="button"
                  onClick={addTerm}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  + Add Term
                </button>
              </div>
              
              {formData.termsAndConditions.map((term, index) => (
                <div key={index} className="mb-3 flex items-start gap-2">
                  <textarea
                    value={term}
                    onChange={(e) => handleTermChange(index, e.target.value)}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                    placeholder="Enter term or condition"
                  />
                  {formData.termsAndConditions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTerm(index)}
                      className="px-2 py-1 text-red-600 hover:text-red-800"
                      title="Remove term"
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="col-span-1 md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
                disabled={!company}
              >
                <FiSave /> Create Appointment Letter
              </button>
            </div>
          </div>
        </form>
      )}
    </DashboardLayout>
  );
} 