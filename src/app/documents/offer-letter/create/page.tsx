'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiSave, FiUser, FiDollarSign, FiCalendar } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getEmployees, getCompany, addDocument, calculateSalaryComponents } from '@/utils/documentUtils';
import { Employee, Company } from '@/types';
import toast, { Toaster } from 'react-hot-toast';

interface OfferLetterFormData {
  employeeId: string;
  position: string;
  department: string;
  salary: string;
  joiningDate: string;
  termsAndConditions: string[];
  salaryComponents?: {
    basic: string;
    da: string;
    conveyance: string;
    medical: string;
    gross: string;
    salaryInWords: string;
  };
}

export default function CreateOfferLetterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [company, setCompany] = useState<Company | null>(null);
  const [formData, setFormData] = useState<OfferLetterFormData>({
    employeeId: '',
    position: '',
    department: '',
    salary: '',
    joiningDate: '',
    termsAndConditions: [
      'Working hours will be 9:00 AM to 6:00 PM (Monday to Friday).',
      'You will be entitled to 20 paid leaves per year.',
      'There will be a probation period of 3 months.',
      'During probation, notice period will be 15 days. Post confirmation, notice period will be 2 months.',
      'Medical insurance will be provided as per company policy.'
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
    
    if (name === 'salary') {
      // Calculate salary components when salary changes
      const lpa = parseFloat(value) || 0;
      const calculatedComponents = calculateSalaryComponents(lpa);
      
      setFormData(prev => ({ 
        ...prev, 
        salary: value,
        salaryComponents: {
          basic: calculatedComponents.monthly.basic.toString(),
          da: (calculatedComponents.monthly.specialAllowance / 2).toString(), // Use half of special allowance as DA
          conveyance: calculatedComponents.monthly.monthlyReimbursement.toString(),
          medical: calculatedComponents.monthly.monthlyWellness.toString(),
          gross: calculatedComponents.monthly.totalMonthly.toString(),
          salaryInWords: calculatedComponents.salaryInWords
        }
      }));
    } else if (name === 'employeeId') {
      const selectedEmployee = employees.find(emp => emp.id === value);
      setFormData(prev => ({ 
        ...prev, 
        employeeId: value,
        // Reset position and department when employee changes
        position: selectedEmployee?.position || '',
        department: selectedEmployee?.department || ''
      }));
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
      toast.loading('Creating offer letter...', { id: 'create-letter' });
      
      const selectedEmployee = employees.find(emp => emp.id === formData.employeeId);
      if (!selectedEmployee) {
        throw new Error('Selected employee not found');
      }

      // Get salary components or calculate if not available
      const salaryValue = parseFloat(formData.salary) || 0;
      
      // If salaryComponents is already set, use it
      // Otherwise calculate and transform to the correct format
      let salaryComponents;
      if (formData.salaryComponents) {
        salaryComponents = formData.salaryComponents;
      } else {
        const calculatedComponents = calculateSalaryComponents(salaryValue);
        
        // Transform the calculated components to match the expected structure
        salaryComponents = {
          basic: calculatedComponents.monthly.basic.toString(),
          da: (calculatedComponents.monthly.specialAllowance / 2).toString(), // Use half of special allowance as DA
          conveyance: calculatedComponents.monthly.monthlyReimbursement.toString(),
          medical: calculatedComponents.monthly.monthlyWellness.toString(),
          gross: calculatedComponents.monthly.totalMonthly.toString(),
          salaryInWords: calculatedComponents.salaryInWords
        };
      }

      // Create document object
      const documentData = {
        employeeId: formData.employeeId,
        documentType: 'offer' as 'offer' | 'appointment' | 'relieving' | 'appraisal' | 'increment' | 'payslip',
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
          salary: salaryValue,
          salaryComponents,
          joiningDate: formData.joiningDate,
          termsAndConditions: formData.termsAndConditions.filter(term => term.trim() !== '')
        }
      };
      
      const documentId = await addDocument(documentData);
      
      toast.success('Offer letter created successfully', { id: 'create-letter' });
      router.push(`/documents/offer-letter/${documentId}`);
    } catch (error) {
      console.error('Error creating offer letter:', error);
      toast.error('Failed to create offer letter', { id: 'create-letter' });
    }
  };

  return (
    <DashboardLayout>
      <Toaster position="top-center" />
      
      <div className="mb-6">
        <Link href="/documents/offer-letter" className="text-blue-600 hover:underline flex items-center gap-1 mb-4">
          <FiArrowLeft size={16} /> Back to Offer Letters
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Create Offer Letter</h1>
        <p className="text-gray-600">Generate a new offer letter for an employee</p>
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
                <FiDollarSign className="mr-2" /> Offer Details
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
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                Annual Salary (₹)
              </label>
              <input
                type="number"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="e.g. 800000"
                min="0"
                step="1000"
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
                <FiSave /> Create Offer Letter
              </button>
            </div>
          </div>
        </form>
      )}
    </DashboardLayout>
  );
} 